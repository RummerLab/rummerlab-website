'use client';

import { useCallback, useEffect } from 'react';
import { createPortal } from 'react-dom';
import {
  getCollaboratorHref,
  getCollaboratorsForInstitution,
  type CollaboratorPerson,
} from '@/data/collaborators';
import type { CollaboratorLocation } from '@/data/collaborator-locations';

interface CollaboratorLocationModalProps {
  location: CollaboratorLocation;
  isOpen: boolean;
  onClose: () => void;
}

export function CollaboratorLocationModal({
  location,
  isOpen,
  onClose,
}: CollaboratorLocationModalProps) {
  const people = getCollaboratorsForInstitution(location.university);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    },
    [onClose],
  );

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, handleKeyDown]);

  if (!isOpen || typeof document === 'undefined') return null;

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="collaborator-location-modal-title"
    >
      <div
        className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-gray-200/60 bg-surface-elevated p-6 shadow-2xl animate-fade-in dark:border-gray-700/60 sm:p-8"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-3 top-3 rounded-lg p-2 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-800 dark:hover:bg-gray-800 dark:hover:text-gray-100"
          aria-label={`Close ${location.university} details`}
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="pr-8">
          <h3
            id="collaborator-location-modal-title"
            className="text-xl font-bold text-gray-900 dark:text-gray-100 sm:text-2xl"
          >
            {location.university}
          </h3>
          <p className="mt-1 text-blue-600 dark:text-blue-400">{location.country}</p>
          <p className="mt-3 text-sm text-muted">
            {location.n} mapped collaborator{location.n === 1 ? '' : 's'} at this institution
          </p>
        </div>

        {people.length > 0 ? (
          <div className="mt-6 border-t border-gray-200 pt-4 dark:border-gray-700">
            <h4 className="mb-3 text-sm font-semibold text-gray-900 dark:text-gray-100">
              Collaborators
            </h4>
            <ul className="space-y-3">
              {people.map((person) => (
                <CollaboratorModalPerson key={`${person.name}-${person.affiliation}`} person={person} />
              ))}
            </ul>
          </div>
        ) : (
          <p className="mt-6 text-sm text-muted">
            See the regional collaborator lists below for people linked with this network.
          </p>
        )}
      </div>
    </div>,
    document.body,
  );
}

const CollaboratorModalPerson = ({ person }: { person: CollaboratorPerson }) => {
  const href = getCollaboratorHref(person);

  return (
    <li className="rounded-xl border border-gray-200/60 bg-blue-50/30 p-3 dark:border-gray-800/60 dark:bg-blue-950/20">
      {href ? (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
        >
          {person.name}
        </a>
      ) : (
        <span className="font-medium text-gray-900 dark:text-gray-100">{person.name}</span>
      )}
      <p className="mt-1 text-sm text-muted">{person.affiliation}</p>
    </li>
  );
};
