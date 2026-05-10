import about from "../images/about.svg"
import "../index.css";
import { useLayoutEffect, useRef } from "react";

const projects = [
    {
        title: "uc san diego",
        status: "previous",
        role: "undergraduate research",
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
        role: "graduate research",
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
        role: "research internship",
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
            <span className={`project-status project-status-${status}`}>
                {status}
            </span>
            <span>{role}</span>
        </div>
    );
}

function ProjectCard({ title, status, role, details }) {
    const cardRef = useRef(null);
    const contentRef = useRef(null);

    useLayoutEffect(() => {
        const card = cardRef.current;
        const content = contentRef.current;

        if (!card || !content) {
            return;
        }

        const setFitHeight = () => {
            const styles = window.getComputedStyle(card);
            const verticalPadding = parseFloat(styles.paddingTop) + parseFloat(styles.paddingBottom);

            card.style.setProperty(
                "--project-fit-height",
                `${content.scrollHeight + verticalPadding}px`
            );
        };

        setFitHeight();

        const resizeObserver = new ResizeObserver(setFitHeight);
        resizeObserver.observe(content);
        window.addEventListener("resize", setFitHeight);

        return () => {
            resizeObserver.disconnect();
            window.removeEventListener("resize", setFitHeight);
        };
    }, []);

    return (
        <div className="project-card-shell">
            <div
                aria-label={`${title}: ${status} ${role}. Focus or hover to learn more.`}
                className="test group"
                ref={cardRef}
                tabIndex="0"
            >
                <div className="project-idle">
                    <h1 className="project-idle-title">
                        {title}
                    </h1>
                    <ProjectMeta status={status} role={role} />
                    <p className="project-hint">
                        <span className="sr-only">Hover or focus to learn more</span>
                        <span aria-hidden="true">+</span>
                    </p>
                </div>
                <div className="project-content" ref={contentRef}>
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
            </div>
        </div>
    );
}

export default function Projects() {
    return(
        <section 
            id="projects"
            style=
            {{backgroundImage: `url(${about})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover"}}
              className="relative grid min-h-screen w-full grid-cols-1 items-start gap-5 bg-[#001220] px-5 py-8 sm:px-8 md:grid-cols-3 md:gap-6 md:p-10"
          >
            {projects.map((project, index) => (
                <ProjectCard
                    key={`${project.title}-${index}`}
                    title={project.title}
                    status={project.status}
                    role={project.role}
                    details={project.details}
                />
            ))}
        </section>
    );
}
