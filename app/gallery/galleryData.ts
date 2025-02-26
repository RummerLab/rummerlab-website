interface GalleryImage {
    src: string;
    alt: string;
    caption: string;
    credit: string;
}

interface GallerySection {
    title: string;
    description: string;
    images: GalleryImage[];
}

export const gallerySections: GallerySection[] = [
    {
        title: "Blacktip Reef Sharks",
        description: "Our research on blacktip reef sharks in French Polynesia, focusing on their behavior, habitat, and conservation",
        images: [
            {
                src: "/images/gallery/blacktip-reef-shark-nursery-habitat-french-polynesia-huertas.jpg",
                alt: "Blacktip reef shark in its nursery habitat",
                caption: "Natural nursery habitat of blacktip reef sharks in French Polynesia",
                credit: "Photo: Victor Huertas"
            },
            {
                src: "/images/gallery/blacktip-reef-shark-french-polynesia-vierus.jpg",
                alt: "Blacktip reef shark in French Polynesia",
                caption: "Blacktip reef shark in its natural habitat",
                credit: "Photo: Tom Vierus"
            },
            {
                src: "/images/gallery/baby-blacktip-shark-degraded-coral-french-polynesia-vierus.jpg",
                alt: "Baby blacktip shark in degraded coral",
                caption: "Young blacktip shark navigating through degraded coral habitat",
                credit: "Photo: Tom Vierus"
            },
            {
                src: "/images/gallery/blacktip-shark-nursery-sampling-french-polynesia-edwards-ingle.jpg",
                alt: "Sampling in blacktip shark nursery",
                caption: "Research sampling in a blacktip shark nursery area",
                credit: "Photo: Jake Edwards-Ingle"
            },
            {
                src: "/images/gallery/blacktip-shark-school-blue-water-french-polynesia-thiault.jpg",
                alt: "School of blacktip sharks in blue water",
                caption: "A school of blacktip sharks swimming in crystal clear waters",
                credit: "Photo: Lauric Thiault"
            },
            {
                src: "/images/gallery/blacktip-shark-temperature-tolerance-research-french-polynesia-vierus.jpg",
                alt: "Temperature tolerance research on blacktip sharks",
                caption: "Conducting temperature tolerance research on blacktip sharks",
                credit: "Photo: Tom Vierus"
            },
            {
                src: "/images/gallery/blacktip-shark-lab-aquaria-french-polynesia-huertas.jpg",
                alt: "Blacktip shark in laboratory aquaria",
                caption: "Blacktip shark being studied in controlled laboratory conditions",
                credit: "Photo: Victor Huertas"
            },
            {
                src: "/images/gallery/blacktip-shark-aquaria-french-polynesia-huertas.jpg",
                alt: "Blacktip shark in aquaria",
                caption: "Blacktip shark in research aquaria facility",
                credit: "Photo: Victor Huertas"
            },
            {
                src: "/images/gallery/blacktip-shark-stingray-french-polynesia-huertas.jpg",
                alt: "Blacktip shark with stingray",
                caption: "Interaction between a blacktip shark and stingray",
                credit: "Photo: Victor Huertas"
            },
            {
                src: "/images/gallery/blacktip-shark-blue-lagoon-french-polynesia-huertas.jpg",
                alt: "Blacktip shark in blue lagoon",
                caption: "Blacktip shark swimming in the pristine blue lagoon",
                credit: "Photo: Victor Huertas"
            },
            {
                src: "/images/gallery/blacktip-shark-black-background-french-polynesia-huertas.jpg",
                alt: "Blacktip shark against black background",
                caption: "Dramatic portrait of a blacktip shark",
                credit: "Photo: Victor Huertas"
            },
            {
                src: "/images/gallery/blacktip-reef-shark-eye-closeup-french-polynesia-huertas.jpg",
                alt: "Close-up of blacktip reef shark eye",
                caption: "Detailed view of a blacktip reef shark's eye",
                credit: "Photo: Victor Huertas"
            },
            {
                src: "/images/gallery/blacktip-reef-shark-ampullae-lorenzini-french-polynesia-huertas.jpg",
                alt: "Ampullae of Lorenzini on blacktip reef shark",
                caption: "Close-up of the sensory organs (ampullae of Lorenzini)",
                credit: "Photo: Victor Huertas"
            },
            {
                src: "/images/gallery/adult-blacktip-shark-lagoon-french-polynesia-huertas.jpg",
                alt: "Adult blacktip shark in lagoon",
                caption: "Adult blacktip shark swimming in the lagoon waters",
                credit: "Photo: Victor Huertas"
            },
            {
                src: "/images/gallery/adult-blacktip-shark-french-polynesia-thiault.jpg",
                alt: "Adult blacktip shark",
                caption: "Adult blacktip shark in its natural habitat",
                credit: "Photo: Lauric Thiault"
            },
            {
                src: "/images/gallery/adult-blacktip-reef-shark-blue-french-polynesia-thiault.jpg",
                alt: "Adult blacktip reef shark in blue water",
                caption: "Adult blacktip reef shark swimming in blue waters",
                credit: "Photo: Lauric Thiault"
            },
            {
                src: "/images/gallery/pregnant-blacktip-shark-french-polynesia-thiault.jpg",
                alt: "Pregnant blacktip shark",
                caption: "Pregnant blacktip shark being studied",
                credit: "Photo: Lauric Thiault"
            }
        ]
    },
    {
        title: "Epaulette Sharks",
        description: "Research on epaulette sharks at Heron Island, Great Barrier Reef, studying their unique adaptations and behavior",
        images: [
            {
                src: "/images/gallery/epaulette-shark-swimming-reef-flats-kristian-laine.jpg",
                alt: "Epaulette shark swimming in reef flats",
                caption: "Epaulette shark gracefully moving across reef flats",
                credit: "Photo: Kristian Laine"
            },
            {
                src: "/images/gallery/epaulette-shark-coral-habitat-johnny-gaskell.jpg",
                alt: "Epaulette shark in coral habitat",
                caption: "Epaulette shark navigating through coral habitat",
                credit: "Photo: Johnny Gaskell"
            },
            {
                src: "/images/gallery/epaulette-shark-research-specimen-heron-island-grumpy-turtle.jpg",
                alt: "Epaulette shark research specimen",
                caption: "Examining an epaulette shark specimen at Heron Island",
                credit: "Photo: Grumpy Turtle Films"
            },
            {
                src: "/images/gallery/epaulette-shark-research-heron-island-gbr-grumpy-turtle.jpg",
                alt: "Epaulette shark research at GBR",
                caption: "Research activities with epaulette sharks at the Great Barrier Reef",
                credit: "Photo: Grumpy Turtle Films"
            },
            {
                src: "/images/gallery/epaulette-shark-measurement-research-gbr-grumpy-turtle.jpg",
                alt: "Epaulette shark measurements",
                caption: "Taking measurements during epaulette shark research",
                credit: "Photo: Grumpy Turtle Films"
            },
            {
                src: "/images/gallery/epaulette-shark-shallow-habitat-gaskell.jpg",
                alt: "Epaulette shark in shallow habitat",
                caption: "Epaulette shark in its natural shallow water habitat",
                credit: "Photo: Johnny Gaskell"
            },
            {
                src: "/images/gallery/epaulette-shark-embryo-development-rummerlab.jpg",
                alt: "Epaulette shark embryo development",
                caption: "Early developmental stages of an epaulette shark",
                credit: "Photo: RummerLab"
            },
            {
                src: "/images/gallery/epaulette-shark-eggs-early-stages-rummerlab.jpg",
                alt: "Epaulette shark eggs",
                caption: "Epaulette shark eggs in early developmental stages",
                credit: "Photo: RummerLab"
            },
            {
                src: "/images/gallery/epaulette-shark-shallow-water-laine.jpg",
                alt: "Epaulette shark in shallow water",
                caption: "Epaulette shark navigating shallow waters",
                credit: "Photo: Kristian Laine"
            },
            {
                src: "/images/gallery/epaulette-shark-tail-heron-island-laine.jpg",
                alt: "Epaulette shark tail detail",
                caption: "Detailed view of an epaulette shark's tail",
                credit: "Photo: Kristian Laine"
            },
            {
                src: "/images/gallery/epaulette-shark-hunting-behavior-laine.jpg",
                alt: "Epaulette shark hunting",
                caption: "Epaulette shark displaying hunting behavior",
                credit: "Photo: Kristian Laine"
            },
            {
                src: "/images/gallery/epaulette-shark-closeup-portrait-huertas.jpg",
                alt: "Epaulette shark portrait",
                caption: "Close-up portrait of an epaulette shark",
                credit: "Photo: Victor Huertas"
            },
            {
                src: "/images/gallery/epaulette-shark-coral-habitat-heron-island-laine.jpg",
                alt: "Epaulette shark in Heron Island coral habitat",
                caption: "Epaulette shark in its natural coral habitat at Heron Island",
                credit: "Photo: Kristian Laine"
            },
            {
                src: "/images/gallery/epaulette-shark-reef-flats-heron-island-laine.jpg",
                alt: "Epaulette shark on reef flats",
                caption: "Epaulette shark exploring Heron Island reef flats",
                credit: "Photo: Kristian Laine"
            },
            {
                src: "/images/gallery/epaulette-shark-swimming-heron-island-laine.jpg",
                alt: "Swimming epaulette shark",
                caption: "Epaulette shark swimming at Heron Island",
                credit: "Photo: Kristian Laine"
            },
            {
                src: "/images/gallery/juvenile-epaulette-sharks-pair-rummer.jpg",
                alt: "Pair of juvenile epaulette sharks",
                caption: "Two juvenile epaulette sharks",
                credit: "Photo: Jodie Rummer"
            },
            {
                src: "/images/gallery/juvenile-epaulette-shark-feeding-session-gervais.jpg",
                alt: "Juvenile epaulette shark feeding",
                caption: "Juvenile epaulette shark during feeding session",
                credit: "Photo: Connor Gervais"
            },
            {
                src: "/images/gallery/adult-epaulette-sharks-research-heron-island-gervais.jpg",
                alt: "Adult epaulette sharks research",
                caption: "Research with adult epaulette sharks at Heron Island",
                credit: "Photo: Connor Gervais"
            },
            {
                src: "/images/gallery/adult-epaulette-sharks-research-capture-grumpy-turtle.jpg",
                alt: "Adult epaulette sharks capture",
                caption: "Careful capture of adult epaulette sharks for research",
                credit: "Photo: Grumpy Turtle Films"
            }
        ]
    },
    {
        title: "Field Research",
        description: "Our team conducting groundbreaking research in various marine environments",
        images: [
            {
                src: "/images/gallery/dr-rummer-reef-research-heron-island-grumpy-turtle.jpg",
                alt: "Dr. Rummer conducting reef research",
                caption: "Field research on the reef flats of Heron Island",
                credit: "Photo: Grumpy Turtle Films"
            },
            {
                src: "/images/gallery/dr-rummer-wheeler-shark-measurement-grumpy-turtle.jpg",
                alt: "Dr. Rummer and Dr. Wheeler measuring shark",
                caption: "Taking precise measurements of a shark specimen",
                credit: "Photo: Grumpy Turtle Films"
            },
            {
                src: "/images/gallery/dr-rummer-wheeler-epaulette-shark-ultrasound-grumpy-turtle.jpg",
                alt: "Ultrasound examination of epaulette shark",
                caption: "Conducting ultrasound examination on an epaulette shark",
                credit: "Photo: Grumpy Turtle Films"
            },
            {
                src: "/images/gallery/dr-rummer-wheeler-epaulette-shark-release-gbr-laine.jpg",
                alt: "Releasing epaulette shark",
                caption: "Dr. Rummer and Dr. Wheeler releasing an epaulette shark",
                credit: "Photo: Kristian Laine"
            },
            {
                src: "/images/gallery/dr-rummer-snorkeling-southern-gbr-grumpy-turtle.jpg",
                alt: "Dr. Rummer snorkeling in GBR",
                caption: "Field observations in the Southern Great Barrier Reef",
                credit: "Photo: Grumpy Turtle Films"
            },
            {
                src: "/images/gallery/dr-rummer-snorkeling-heron-island-gbr-grumpy-turtle.jpg",
                alt: "Dr. Rummer snorkeling at Heron Island",
                caption: "Research observations at Heron Island",
                credit: "Photo: Grumpy Turtle Films"
            },
            {
                src: "/images/gallery/dr-rummer-shark-tagging-pregnant-moore.jpg",
                alt: "Dr. Rummer tagging pregnant shark",
                caption: "Tagging procedure on a pregnant shark",
                credit: "Photo: Rachel Moore"
            },
            {
                src: "/images/gallery/dr-rummer-pregnant-shark-measurement-moore.jpg",
                alt: "Measuring pregnant shark",
                caption: "Taking measurements of a pregnant shark",
                credit: "Photo: Rachel Moore"
            },
            {
                src: "/images/gallery/dr-rummer-epaulette-shark-measurement-grumpy-turtle.jpg",
                alt: "Measuring epaulette shark",
                caption: "Taking precise measurements of an epaulette shark",
                credit: "Photo: Grumpy Turtle Films"
            },
            {
                src: "/images/gallery/dr-rummer-epaulette-shark-capture-grumpy-turtle.jpg",
                alt: "Capturing epaulette shark",
                caption: "Careful capture of an epaulette shark for research",
                credit: "Photo: Grumpy Turtle Films"
            },
            {
                src: "/images/gallery/dr-rummer-epaulette-shark-release-laine.jpg",
                alt: "Releasing epaulette shark",
                caption: "Releasing an epaulette shark after research",
                credit: "Photo: Kristian Laine"
            },
            {
                src: "/images/gallery/dr-rummer-epaulette-shark-pre-release-heron-island-laine.jpg",
                alt: "Pre-release examination",
                caption: "Final examination before releasing an epaulette shark",
                credit: "Photo: Kristian Laine"
            },
            {
                src: "/images/gallery/dr-rummer-epaulette-shark-release-post-experiment-grumpy-turtle.jpg",
                alt: "Post-experiment release",
                caption: "Releasing an epaulette shark after experimental procedures",
                credit: "Photo: Grumpy Turtle Films"
            },
            {
                src: "/images/gallery/dr-rummer-epaulette-shark-release-post-research-grumpy-turtle.jpg",
                alt: "Post-research release",
                caption: "Releasing an epaulette shark after research",
                credit: "Photo: Grumpy Turtle Films"
            },
            {
                src: "/images/gallery/dr-rummer-diving-preparation-heron-island-gbr-grumpy-turtle.jpg",
                alt: "Diving preparation at Heron Island",
                caption: "Preparing for a research dive at Heron Island",
                credit: "Photo: Grumpy Turtle Films"
            },
            {
                src: "/images/gallery/dr-rummer-dive-preparation-grumpy-turtle.jpg",
                alt: "Dive preparation",
                caption: "Getting ready for underwater research",
                credit: "Photo: Grumpy Turtle Films"
            },
            {
                src: "/images/gallery/dr-rummer-bouyoucos-blacktip-shark-photography-french-polynesia-vierus.jpg",
                alt: "Research photography of blacktip shark",
                caption: "Documenting blacktip shark research in French Polynesia",
                credit: "Photo: Tom Vierus"
            },
            {
                src: "/images/gallery/dr-rummer-blacktip-shark-release-french-polynesia-huertas.jpg",
                alt: "Dr. Rummer releasing blacktip shark",
                caption: "Dr. Rummer releasing a blacktip shark in French Polynesia",
                credit: "Photo: Victor Huertas"
            },
            {
                src: "/images/gallery/dr-rummer-blacktip-shark-release-french-polynesia-vierus.jpg",
                alt: "Dr. Rummer releasing blacktip shark",
                caption: "Dr. Rummer releasing a blacktip shark in French Polynesia",
                credit: "Photo: Tom Vierus"
            },
            {
                src: "/images/gallery/dr-rummer-lab-research-blacktip-sharks-french-polynesia-vierus.jpg",
                alt: "Laboratory research with blacktip sharks",
                caption: "Laboratory studies on blacktip sharks",
                credit: "Photo: Tom Vierus"
            },
            {
                src: "/images/gallery/dr-rummer-gill-net-research-french-polynesia-vierus.jpg",
                alt: "Gill net research",
                caption: "Conducting gill net research in French Polynesia",
                credit: "Photo: Tom Vierus"
            },
            {
                src: "/images/gallery/drone-field-setup-french-polynesia-vierus.jpg",
                alt: "Drone view of field setup",
                caption: "Aerial view of our field research station",
                credit: "Photo: Tom Vierus"
            },
            {
                src: "/images/gallery/dr-rummer-shark-release-french-polynesia-vierus.jpg",
                alt: "Dr. Rummer releasing shark",
                caption: "Dr. Rummer releasing a shark after research",
                credit: "Photo: Tom Vierus"
            },
            {
                src: "/images/gallery/dr-rummer-releasing-blacktip-shark-french-polynesia-huertas.jpg",
                alt: "Dr. Rummer releasing blacktip shark",
                caption: "Releasing a blacktip shark back to its habitat",
                credit: "Photo: Victor Huertas"
            },
            {
                src: "/images/gallery/dr-rummer-preparing-blacktip-shark-release-french-polynesia-vierus.jpg",
                alt: "Preparing shark for release",
                caption: "Final preparations before releasing a blacktip shark",
                credit: "Photo: Tom Vierus"
            },
            {
                src: "/images/gallery/dr-rummer-field-research-blacktip-shark-french-polynesia-vierus.jpg",
                alt: "Field research with blacktip sharks",
                caption: "Conducting field research with blacktip sharks",
                credit: "Photo: Tom Vierus"
            }
        ]
    },
    {
        title: "Marine Ecosystems",
        description: "The diverse and beautiful marine environments where we conduct our research",
        images: [
            {
                src: "/images/gallery/healthy-reef-great-barrier-reef-rummer.jpg",
                alt: "Healthy coral reef ecosystem",
                caption: "Vibrant coral reef ecosystem on the Great Barrier Reef",
                credit: "Photo: Jodie Rummer"
            },
            {
                src: "/images/gallery/grey-reef-sharks-surgeonfish-fakarava-weschke.jpg",
                alt: "Grey reef sharks with surgeonfish",
                caption: "Grey reef sharks swimming among surgeonfish in Fakarava",
                credit: "Photo: Emma Weschke"
            },
            {
                src: "/images/gallery/healthy-coral-seascape-outer-gbr-rummer.jpg",
                alt: "Healthy coral seascape",
                caption: "Beautiful coral seascape in the outer Great Barrier Reef",
                credit: "Photo: Jodie Rummer"
            },
            {
                src: "/images/gallery/outer-great-barrier-reef-healthy-corals-rummer.jpg",
                alt: "Outer reef coral formations",
                caption: "Pristine coral formations on the outer Great Barrier Reef",
                credit: "Photo: Jodie Rummer"
            },
            {
                src: "/images/gallery/stingrays-snorkelling-french-polynesia-huertas.jpg",
                alt: "Stingrays and snorkelling",
                caption: "Observing stingrays in their natural habitat",
                credit: "Photo: Victor Huertas"
            },
            {
                src: "/images/gallery/dr-rummer-heron-island-beach-gbr-grumpy-turtle.jpg",
                alt: "Heron Island beach",
                caption: "Beautiful beach at Heron Island research station",
                credit: "Photo: Grumpy Turtle Films"
            },
            {
                src: "/images/gallery/dr-rummer-heron-island-southern-gbr-grumpy-turtle.jpg",
                alt: "Southern Great Barrier Reef",
                caption: "Research location in the Southern Great Barrier Reef",
                credit: "Photo: Grumpy Turtle Films"
            }
        ]
    }
]; 