import about from "../images/about.svg"
import "../index.css";
import { useEffect, useRef, useState } from "react";

const projects = [
    {
        title: "uc san diego",
        status: "previous",
        role: "B.S. Computer Engineering",
        details: [
            "worked on a grid-free model of presynaptic diffusion for use in neuromorphic hardware",
            "led work of software simulation for two-compartment, conductance-based neurons featured in our lab's integrate-and-fire-array transceiver",
            "designed an algorithm for chip-in-the-loop spiking neural network training without backpropagation",
            "trained machine learning models for quality control testing graphene field-effect transistors",
            "analyzed EEG-data collected from a memory study paradigm designed in lab",
        ],
    },
    {
        title: "yale",
        status: "current",
        role: "Ph.D. Electrical Engineering",
        details: [
            "contributed to a open-source tool for designing neuromorphic algorithms (fugu)",
            "leading effort to develop infrastructure for neuromorphic software & hardware co-design",
            "developing neuromorphic benchmarking tools",
            "designing next-gen neuromorphic chips",
        ],
    },
    {
        title: "stanford",
        status: "previous",
        role: "internship",
        details: [
            "worked on a neuromorphic chip for edge computation",
            "implemented dendrocentric computation with multi-gate ferroelectric field-effect transistors (fefets) for edge detection of spatiotemporal sequences",
            "fit and stabilized circuit compatible of a fefet",
            "gained experience with industry standard circuit development tools",
            "presented work as a poster for the 2024 stanford electrical engineering research experience for undergraduates",
        ],
    },

];

function ProjectMeta({ status, role }) {
    return (
        <div className="project-meta" aria-label={`${status} ${role}`}>
            <span>{role}</span>
        </div>
    );
}

function ProjectEyebrow({ status }) {
    return (
        <p className="project-eyebrow">
            {status === "current" ? "currently" : "previously"}
        </p>
    );
}

function ProjectDetails({ title, status, role, details }) {
    return (
        <div className="project-content">
            <ProjectEyebrow status={status} />
            <h1 className="project-title">
                {title}
            </h1>
            <ProjectMeta status={status} role={role} />
            <div className="project-details">
                {details.map((detail) => (
                    <div key={detail}>{detail}</div>
                ))}
            </div>
        </div>
    );
}

function ProjectCard({ project, onOpen }) {
    const { title, status, role } = project;

    const handleKeyDown = (event) => {
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            onOpen();
        }
    };

    return (
        <div className="project-card-shell">
            <div
                aria-label={`${title}: ${status} ${role}. Open details.`}
                className={`test group${status === "current" ? " project-card-current" : ""}`}
                onClick={onOpen}
                onKeyDown={handleKeyDown}
                role="button"
                tabIndex="0"
            >
                <div className="project-idle">
                    <ProjectEyebrow status={status} />
                    <h1 className="project-idle-title">
                        {title}
                    </h1>
                    <ProjectMeta status={status} role={role} />
                    <p className="project-hint">
                        <span className="sr-only">Open details</span>
                        <span aria-hidden="true">+</span>
                    </p>
                </div>
                <ProjectDetails {...project} />
            </div>
        </div>
    );
}

function ProjectModal({ isClosing, project, onClose }) {
    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === "Escape") {
                onClose();
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [onClose]);

    if (!project) {
        return null;
    }

    return (
        <div
            aria-modal="true"
            className={`project-modal-backdrop${isClosing ? " project-modal-backdrop-closing" : ""}`}
            onClick={onClose}
            role="dialog"
        >
            <div
                className={`project-modal${isClosing ? " project-modal-closing" : ""}`}
                onClick={(event) => event.stopPropagation()}
            >
                <button
                    aria-label="Close project details"
                    className="project-modal-close"
                    onClick={onClose}
                    type="button"
                >
                    x
                </button>
                <ProjectDetails {...project} />
            </div>
        </div>
    );
}

export default function Projects() {
    const [activeProject, setActiveProject] = useState(null);
    const [isClosing, setIsClosing] = useState(false);
    const closeTimerRef = useRef(null);

    const scrollToLanding = () => {
        const startPosition = window.scrollY;
        const targetPosition = 0;
        const distance = targetPosition - startPosition;
        const duration = 100;
        let startTime = null;

        const easeOutQuad = (progress) => 1 - (1 - progress) * (1 - progress);

        const animateScroll = (currentTime) => {
            if (!startTime) {
                startTime = currentTime;
            }

            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easedProgress = easeOutQuad(progress);

            window.scrollTo(0, startPosition + distance * easedProgress);

            if (progress < 1) {
                window.requestAnimationFrame(animateScroll);
                return;
            }

            window.history.pushState(null, "", window.location.pathname);
        };

        window.scrollTo(0, startPosition + distance * 0.08);
        window.requestAnimationFrame(animateScroll);
    };

    useEffect(() => {
        return () => {
            if (closeTimerRef.current) {
                window.clearTimeout(closeTimerRef.current);
            }
        };
    }, []);

    const openProject = (index) => {
        if (closeTimerRef.current) {
            window.clearTimeout(closeTimerRef.current);
        }

        setIsClosing(false);
        setActiveProject(index);
    };

    const closeProject = () => {
        if (activeProject === null || isClosing) {
            return;
        }

        setIsClosing(true);

        closeTimerRef.current = window.setTimeout(() => {
            setActiveProject(null);
            setIsClosing(false);
        }, 260);
    };

    return(
        <section 
            id="projects"
            style=
            {{backgroundImage: `url(${about})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover"}}
              className="project-grid relative grid min-h-screen w-full grid-cols-1 items-start gap-5 bg-[#001220] px-5 pb-8 pt-14 sm:px-8 md:grid-cols-3 md:gap-6 md:px-10 md:pb-10 md:pt-16"
          >
            <h2 id="research" className="sr-only scroll-mt-8">
                research
            </h2>
            <button
                aria-label="Back to landing page"
                className="back-to-landing"
                onClick={scrollToLanding}
                type="button"
            >
                <span aria-hidden="true" />
            </button>
            {projects.map((project, index) => (
                <ProjectCard
                    key={`${project.title}-${index}`}
                    project={project}
                    onOpen={() => openProject(index)}
                />
            ))}
            <ProjectModal
                isClosing={isClosing}
                onClose={closeProject}
                project={activeProject !== null ? projects[activeProject] : null}
            />
        </section>
    );
}
