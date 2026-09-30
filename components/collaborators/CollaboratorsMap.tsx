'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import {
  AttributionControl,
  GlobeControl,
  Map,
  NavigationControl,
  Popup,
  setWorkerUrl,
  type Map as MapLibreMap,
  type MapLayerMouseEvent,
} from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { CollaboratorLocationModal } from '@/components/collaborators/CollaboratorLocationModal';
import {
  collaboratorLocations,
  type CollaboratorLocation,
} from '@/data/collaborator-locations';

// Next.js does not emit the worker's shared sibling; serve both from /public/maplibre.
setWorkerUrl('/maplibre/maplibre-gl-worker.mjs');

const AUTO_ROTATE_INTERVAL = 12000;
const ROTATION_DEGREES = 40;
const DEFAULT_CENTER: [number, number] = [20, 10];
const DEFAULT_ZOOM = 1.35;
const DEFAULT_PROJECTION = { type: 'mercator' as const };

export const CollaboratorsMap = () => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<MapLibreMap | null>(null);
  const rotationEnabledRef = useRef(true);
  const rotationHandlerRef = useRef<(() => void) | null>(null);
  const popupRef = useRef<Popup | null>(null);
  const handlePointEnterRef = useRef<((event: MapLayerMouseEvent) => void) | null>(null);
  const handlePointLeaveRef = useRef<(() => void) | null>(null);
  const handlePointClickRef = useRef<((event: MapLayerMouseEvent) => void) | null>(null);
  const clearRotationHandlerRef = useRef<(() => void) | null>(null);
  const scheduleRotationRef = useRef<(() => void) | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<CollaboratorLocation | null>(null);

  const totalCollaborators = useMemo(
    () => collaboratorLocations.reduce((sum, location) => sum + location.n, 0),
    [],
  );
  const totalInstitutions = collaboratorLocations.length;
  const totalCountries = useMemo(
    () => new Set(collaboratorLocations.map((location) => location.country)).size,
    [],
  );

  useEffect(() => {
    // Re-enable after React Strict Mode remounts (cleanup sets this to false).
    rotationEnabledRef.current = true;

    const POPUP_STYLE_ID = 'rummerlab-collaborators-popup-style';
    if (typeof document !== 'undefined' && !document.getElementById(POPUP_STYLE_ID)) {
      const style = document.createElement('style');
      style.id = POPUP_STYLE_ID;
      style.innerHTML = `
        .collaborators-popup .maplibregl-popup-content {
          background: rgba(15, 23, 42, 0.95);
          color: #f8fafc;
          border-radius: 12px;
          padding: 12px 16px;
          box-shadow: 0 18px 36px rgba(15, 23, 42, 0.35);
          border: 1px solid rgba(148, 163, 184, 0.3);
          backdrop-filter: blur(12px);
        }
        .collaborators-popup .maplibregl-popup-tip {
          border-top-color: rgba(15, 23, 42, 0.95);
          border-bottom-color: rgba(15, 23, 42, 0.95);
        }
        .collaborators-popup .collaborators-popup-title {
          font-weight: 600;
          font-size: 0.95rem;
          line-height: 1.3;
          color: #e0f2fe;
        }
        .collaborators-popup .collaborators-popup-subtitle {
          margin-top: 4px;
          font-size: 0.85rem;
          line-height: 1.4;
          color: #cbd5e1;
        }
        .collaborators-popup .collaborators-popup-metric {
          margin-top: 8px;
          font-size: 0.85rem;
          line-height: 1.4;
          color: #38bdf8;
        }
      `;
      document.head.appendChild(style);
    }

    if (!mapContainerRef.current) return;

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const clearPendingRotation = () => {
      if (!mapRef.current || !rotationHandlerRef.current) return;
      mapRef.current.off('moveend', rotationHandlerRef.current);
      rotationHandlerRef.current = null;
    };
    clearRotationHandlerRef.current = clearPendingRotation;

    const scheduleRotation = () => {
      if (!mapRef.current || !rotationEnabledRef.current || prefersReducedMotion) return;

      const mapInstance = mapRef.current;
      const currentCenter = mapInstance.getCenter();

      const handleMoveEnd = () => {
        rotationHandlerRef.current = null;
        if (!rotationEnabledRef.current) return;
        scheduleRotation();
      };

      clearPendingRotation();
      rotationHandlerRef.current = handleMoveEnd;
      mapInstance.once('moveend', handleMoveEnd);

      mapInstance.easeTo({
        center: [currentCenter.lng + ROTATION_DEGREES, currentCenter.lat],
        bearing: 0,
        pitch: 0,
        duration: AUTO_ROTATE_INTERVAL,
        easing: (t) => t,
      });
    };
    scheduleRotationRef.current = scheduleRotation;

    const handleUserInteractionStart = () => {
      if (!rotationEnabledRef.current) return;
      rotationEnabledRef.current = false;
      clearPendingRotation();
      mapRef.current?.stop();
    };

    const collaboratorGeoJson = {
      type: 'FeatureCollection' as const,
      features: collaboratorLocations.map((location) => ({
        type: 'Feature' as const,
        geometry: {
          type: 'Point' as const,
          coordinates: [location.lon, location.lat] as [number, number],
        },
        properties: {
          university: location.university,
          country: location.country,
          count: location.n,
          lon: location.lon,
          lat: location.lat,
        },
      })),
    };

    const map = new Map({
      container: mapContainerRef.current,
      style: 'https://maps.wanderstories.space/gl/dark-gl-style/style.json',
      center: DEFAULT_CENTER,
      zoom: DEFAULT_ZOOM,
      pitch: 0,
      bearing: 0,
      dragRotate: true,
      scrollZoom: false,
      attributionControl: false,
    });

    mapRef.current = map;

    map.on('style.load', () => {
      // Flat mercator by default; GlobeControl lets visitors switch to globe.
      map.setProjection(DEFAULT_PROJECTION);
      map.addSource('collaborators', {
        type: 'geojson',
        data: collaboratorGeoJson,
      });

      map.addLayer({
        id: 'collaborator-glow',
        type: 'circle',
        source: 'collaborators',
        paint: {
          'circle-radius': ['interpolate', ['linear'], ['get', 'count'], 1, 4, 5, 9, 15, 14],
          'circle-color': '#38bdf8',
          'circle-opacity': 1,
          'circle-blur': 0.25,
        },
      });

      map.addLayer({
        id: 'collaborator-core',
        type: 'circle',
        source: 'collaborators',
        paint: {
          'circle-radius': ['interpolate', ['linear'], ['get', 'count'], 1, 2.5, 5, 5, 15, 9],
          'circle-color': '#e0f2fe',
          'circle-opacity': 1,
          'circle-stroke-color': '#0ea5e9',
          'circle-stroke-width': 1.5,
          'circle-stroke-opacity': 1,
        },
      });

      const popup = new Popup({
        closeButton: false,
        offset: 12,
        className: 'collaborators-popup',
      });
      popupRef.current = popup;

      const handlePointEnter = (event: MapLayerMouseEvent) => {
        const feature = event.features?.[0];
        if (!feature?.properties) return;

        const { university, country, count } = feature.properties as {
          university: string;
          country: string;
          count: number;
        };

        map.getCanvas().style.cursor = 'pointer';
        popup
          .setLngLat(event.lngLat)
          .setHTML(
            `<div>
              <div class="collaborators-popup-title">${university}</div>
              <div class="collaborators-popup-subtitle">${country}</div>
              <div class="collaborators-popup-metric">${count} collaborator${count > 1 ? 's' : ''} · click for details</div>
            </div>`,
          )
          .addTo(map);
      };
      handlePointEnterRef.current = handlePointEnter;

      const handlePointLeave = () => {
        map.getCanvas().style.cursor = '';
        popup.remove();
      };
      handlePointLeaveRef.current = handlePointLeave;

      const handlePointClick = (event: MapLayerMouseEvent) => {
        const feature = event.features?.[0];
        if (!feature?.properties) return;

        const { university, country, count, lon, lat } = feature.properties as {
          university: string;
          country: string;
          count: number;
          lon: number;
          lat: number;
        };

        handleUserInteractionStart();
        popup.remove();
        setSelectedLocation({
          university,
          country,
          n: count,
          lon,
          lat,
        });
      };
      handlePointClickRef.current = handlePointClick;

      map.on('mouseenter', 'collaborator-core', handlePointEnter);
      map.on('mouseleave', 'collaborator-core', handlePointLeave);
      map.on('mouseenter', 'collaborator-glow', handlePointEnter);
      map.on('mouseleave', 'collaborator-glow', handlePointLeave);
      map.on('click', 'collaborator-core', handlePointClick);
      map.on('click', 'collaborator-glow', handlePointClick);

      map.jumpTo({
        center: DEFAULT_CENTER,
        zoom: DEFAULT_ZOOM,
        pitch: 0,
        bearing: 0,
      });

      // Start panning once the map is idle so jumpTo does not cancel the first easeTo.
      map.once('idle', () => {
        if (!rotationEnabledRef.current) return;
        scheduleRotation();
      });
    });

    map.addControl(new NavigationControl({ showCompass: true }), 'top-right');
    map.addControl(new GlobeControl(), 'top-right');
    map.addControl(new AttributionControl({ compact: false }));

    map.on('mousedown', handleUserInteractionStart);
    map.on('touchstart', handleUserInteractionStart);

    return () => {
      rotationEnabledRef.current = false;
      clearPendingRotation();
      clearRotationHandlerRef.current = null;
      scheduleRotationRef.current = null;
      if (mapRef.current) {
        const handlePointEnter = handlePointEnterRef.current;
        const handlePointLeave = handlePointLeaveRef.current;
        const handlePointClick = handlePointClickRef.current;
        if (handlePointEnter) {
          mapRef.current.off('mouseenter', 'collaborator-core', handlePointEnter);
          mapRef.current.off('mouseenter', 'collaborator-glow', handlePointEnter);
        }
        if (handlePointLeave) {
          mapRef.current.off('mouseleave', 'collaborator-core', handlePointLeave);
          mapRef.current.off('mouseleave', 'collaborator-glow', handlePointLeave);
        }
        if (handlePointClick) {
          mapRef.current.off('click', 'collaborator-core', handlePointClick);
          mapRef.current.off('click', 'collaborator-glow', handlePointClick);
        }
        mapRef.current.off('mousedown', handleUserInteractionStart);
        mapRef.current.off('touchstart', handleUserInteractionStart);
        mapRef.current.remove();
        mapRef.current = null;
      }
      if (popupRef.current) {
        popupRef.current.remove();
        popupRef.current = null;
      }
    };
  }, []);

  const handleResetView = () => {
    const map = mapRef.current;
    if (!map) return;

    rotationEnabledRef.current = true;
    clearRotationHandlerRef.current?.();
    map.stop();
    map.setProjection(DEFAULT_PROJECTION);
    map.easeTo({
      center: DEFAULT_CENTER,
      zoom: DEFAULT_ZOOM,
      pitch: 0,
      bearing: 0,
      duration: 1200,
      easing: (t) => t,
    });
    map.once('moveend', () => {
      if (!rotationEnabledRef.current) return;
      scheduleRotationRef.current?.();
    });
  };

  const handleCloseModal = () => {
    setSelectedLocation(null);
  };

  return (
    <div className="rounded-2xl border border-gray-200/60 bg-surface-elevated p-4 shadow-sm dark:border-gray-800/60 sm:p-6">
      <div className="relative">
        <div
          ref={mapContainerRef}
          className="h-[420px] w-full overflow-hidden rounded-2xl sm:h-[480px]"
          role="img"
          aria-label="Interactive map showing RummerLab collaborator institutions"
        />
        <button
          type="button"
          onClick={handleResetView}
          className="absolute left-4 top-4 z-10 rounded-md bg-white/90 px-3 py-2 text-sm font-medium text-gray-900 shadow-md backdrop-blur transition hover:bg-white dark:bg-gray-900/90 dark:text-gray-100 dark:hover:bg-gray-900"
          aria-label="Reset map view"
        >
          Reset View
        </button>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {[
          { label: 'Collaborators', value: totalCollaborators },
          { label: 'Institutions', value: totalInstitutions },
          { label: 'Countries', value: totalCountries },
        ].map((item) => (
          <div
            key={item.label}
            className="rounded-xl border border-gray-200/60 bg-blue-50/40 p-4 text-center dark:border-gray-800/60 dark:bg-blue-950/20"
          >
            <p className="text-3xl font-semibold text-blue-600 dark:text-blue-400">{item.value}</p>
            <p className="mt-1 text-sm text-muted">{item.label}</p>
          </div>
        ))}
      </div>

      {selectedLocation && (
        <CollaboratorLocationModal
          location={selectedLocation}
          isOpen
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};
