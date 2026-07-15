"use client";

import { Sparkles, ArrowRight } from "lucide-react";


import {
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform
} from "framer-motion";
import Lenis from "lenis";
import {
  RiArrowRightLine,
  RiBriefcaseLine,
  RiCommandLine,
  RiCodeLine,
  RiGraduationCapLine,
  RiLayoutLine,
  RiUserSharedLine,
  RiMailLine,
  RiMapPinLine,
  RiStarLine,
  RiDatabase2Line,
  RiBatteryChargeLine,
  RiCloudLine,
  RiCpuLine,
  RiGitBranchLine,
  RiTeamLine,
  RiCalendarLine,
  RiUserFollowLine,
  RiShieldCheckLine,
  RiShareForwardLine,
  RiBrainLine,
  RiBarChart2Line,
  RiPaletteLine,
  RiServerLine
} from "react-icons/ri";
import {
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiNodedotjs,
  SiExpress,
  SiPython,
  SiPandas
} from "react-icons/si";
import Link from "next/link";
import { type CSSProperties, type FormEvent, useEffect, useMemo, useRef, useState } from "react";
import styles from "./portfolio-experience.module.css";

type GitHubProject = {
  name: string;
  description: string;
  url: string;
  stars: number;
  forks: number;
  language: string;
  updatedAt: string;
  topics: string[];
  homepage: string | null;
};

type PortfolioExperienceProps = {
  githubProjects: GitHubProject[];
  githubUrl: string;
  portfolioUrl: string;
  email: string;
  phone: string;
  location: string;
  visitCount: number;
};

type CursorState = "normal" | "hover" | "button" | "image" | "video" | "drag" | "text" | "clickable";

type SectionLink = {
  id: string;
  label: string;
  icon: React.ComponentType<{ size?: number }>;
};

const sectionLinks: SectionLink[] = [
  { id: "hero", label: "Hero", icon: RiStarLine },
  { id: "about", label: "About", icon: RiLayoutLine },
  { id: "journey", label: "Journey", icon: RiGraduationCapLine },
  { id: "skills", label: "Skills", icon: RiBriefcaseLine },
  { id: "tech-stack", label: "Tech Stack", icon: RiLayoutLine },
  { id: "leadership", label: "Leadership", icon: RiBriefcaseLine },
  { id: "experience", label: "Experience", icon: RiBriefcaseLine },
  { id: "projects", label: "Projects", icon: RiLayoutLine },
  { id: "research", label: "Research", icon: RiStarLine },
  { id: "achievements", label: "Achievements", icon: RiStarLine },
  { id: "github", label: "GitHub", icon: RiCodeLine },
  { id: "beyond", label: "Beyond Coding", icon: RiStarLine },
  { id: "contact", label: "Contact", icon: RiMailLine }
];

const journeyStages = [
  {
    year: "2022",
    title: "NIT Silchar",
    detail: "Started mechanical engineering while diving deep into software development."
  },
  {
    year: "2023",
    title: "Web Development Focus",
    detail: "Shifted from curiosity to consistent product shipping with JavaScript and React."
  },
  {
    year: "2024",
    title: "Technical Leadership",
    detail: "Led teams across E-Cell, GDGC, and hackathon tracks while building systems."
  },
  {
    year: "2025",
    title: "Research + Engineering",
    detail: "Delivered ML-focused research outcomes and practical automation tooling."
  },
  {
    year: "2026",
    title: "Builder in Bengaluru",
    detail: "Positioning for high-impact roles across full stack, backend, quality, and data."
  }
];

const skillBento = [
  { title: "Frontend", emphasis: "Shipping smooth product surfaces", items: ["React", "Next.js", "Tailwind CSS", "HTML", "CSS"] },
  { title: "Backend", emphasis: "Reliable APIs and business logic", items: ["Node.js", "Express.js", "REST APIs", "JWT"] },
  { title: "Testing", emphasis: "Quality with speed", items: ["Selenium", "Postman", "API Testing", "Regression", "Smoke"] },
  { title: "Data", emphasis: "Insight-driven engineering", items: ["Python", "SQL", "Pandas", "Scikit-learn", "Power BI"] },
  { title: "Cloud", emphasis: "Deployment and ops fundamentals", items: ["AWS", "S3", "IAM", "CloudFront"] },
  { title: "Leadership", emphasis: "Execution at scale", items: ["Team Management", "Event Ops", "Stakeholder Coordination", "Mentorship"] }
];

const leadershipImpact = [
  { label: "Developers Led", value: 120 },
  { label: "Events Organized", value: 18 },
  { label: "Participants Managed", value: 1500 },
  { label: "Cross-team Projects", value: 24 }
];

const experienceCards = [
  {
    role: "General Secretary (Technical)",
    org: "Gymkhana Union Body, NIT Silchar",
    impact: "Coordinated institute-wide technical initiatives with execution ownership end-to-end.",
    focus: ["Leadership", "Planning", "Coordination"]
  },
  {
    role: "Technical Head",
    org: "E-Cell NIT Silchar",
    impact: "Guided technical delivery and platform maintenance with a strong quality bar.",
    focus: ["Mentorship", "Delivery", "Systems"]
  },
  {
    role: "Cloud Moderator",
    org: "GDGC NIT Silchar",
    impact: "Ran cloud sessions and labs with high engagement and student impact.",
    focus: ["Teaching", "Hands-on Labs", "Cloud Basics"]
  },
  {
    role: "Machine Learning Research Intern",
    org: "SN Bose National Centre for Basic Sciences",
    impact: "Built predictive ML models for electro-deposition process analysis.",
    focus: ["Modeling", "Analysis", "Research"]
  }
];

const projectStories = [
  {
    name: "TalentFlow",
    problem: "Hiring pipelines for campus-scale candidate flows are often fragmented and hard to operate.",
    architecture: "Next.js frontend + Express API + MongoDB persistence + IndexedDB for offline handling.",
    challenge: "Maintaining a smooth UX while handling large candidate journeys and auth boundaries.",
    decision: "Kept core workflows modular so tests and iterations could move quickly.",
    lessons: "Product speed matters, but clarity in architecture matters more long term.",
    stack: ["Next.js", "Express.js", "MongoDB", "JWT", "IndexedDB"],
    github: "https://github.com/ruler45"
  },
  {
    name: "Linkedfy",
    problem: "Manual outreach is repetitive and creates low-leverage time usage.",
    architecture: "Node.js CLI orchestrating Puppeteer sessions with command-driven flows.",
    challenge: "Balancing automation with message personalization and reliability.",
    decision: "Built prompt-driven user control instead of hardcoded scripts.",
    lessons: "Automation succeeds only when it respects context and user intent.",
    stack: ["Node.js", "Puppeteer", "Commander"],
    github: "https://github.com/ruler45"
  },
  {
    name: "Sales Analytics Dashboard",
    problem: "Raw reporting did not offer actionable decision support for operations.",
    architecture: "SQL pipelines + PostgreSQL + Power BI visual model.",
    challenge: "Keeping metrics interpretable across varied stakeholders.",
    decision: "Prioritized visual hierarchy and concise KPI layers.",
    lessons: "Clear data stories outperform dense metric dumps.",
    stack: ["SQL", "PostgreSQL", "Power BI", "Excel"],
    github: "https://github.com/ruler45"
  }
];

const researchHighlights = [
  {
    title: "TIG Weld Surface Defect Detection",
    detail: "Used ResNet50 + OpenCV + transfer learning for defect classification workflows.",
    signal: "Applied research with clear industrial relevance."
  },
  {
    title: "Electro-deposition Modeling",
    detail: "Built predictive models during internship at SN Bose National Centre.",
    signal: "Data-to-decision framing with constrained datasets."
  }
];

const achievements = [
  "Adobe GenSolve Semi-Finalist (Top 5%)",
  "Flipkart Grid 6.0 Information Security Semi-Finalist",
  "Research Internship at SN Bose National Centre for Basic Sciences"
];

const beyondCoding = [
  "Organizing technical ecosystems, not just projects.",
  "Mentoring peers and building collaborative momentum.",
  "Turning abstract ideas into repeatable systems.",
  "Operating with ownership under pressure."
];

const skillIconMap: Record<string, React.ReactNode> = {
  "React": <SiReact size={16} />,
  "Next.js": <SiNextdotjs size={16} />,
  "Tailwind CSS": <SiTailwindcss size={16} />,
  "HTML": <RiCodeLine size={16} />,
  "CSS": <RiPaletteLine size={16} />,
  "Node.js": <SiNodedotjs size={16} />,
  "Express.js": <SiExpress size={16} />,
  "REST APIs": <RiCodeLine size={16} />,
  "JWT": <RiShieldCheckLine size={16} />,
  "Python": <SiPython size={16} />,
  "SQL": <RiDatabase2Line size={16} />,
  "Pandas": <SiPandas size={16} />,
  "Scikit-learn": <RiBrainLine size={16} />,
  "Power BI": <RiBarChart2Line size={16} />,
  "AWS": <RiCloudLine size={16} />,
  "S3": <RiServerLine size={16} />,
  "IAM": <RiShieldCheckLine size={16} />,
  "CloudFront": <RiCloudLine size={16} />,
  "Team Management": <RiTeamLine size={16} />,
  "Event Ops": <RiCalendarLine size={16} />,
  "Stakeholder Coordination": <RiUserSharedLine size={16} />,
  "Mentorship": <RiUserFollowLine size={16} />
};

const SkillDisplay = ({ skill }: { skill: string }) => {
  const icon = skillIconMap[skill];
  return icon ? (
    <span className={styles.skillWithIcon} title={skill}>
      {icon}
    </span>
  ) : (
    <span>{skill}</span>
  );
};

function useLenisSmoothScroll(disabled: boolean) {
  useEffect(() => {
    if (disabled) {
      return;
    }

    const lenis = new Lenis({
      duration: 1.08,
      lerp: 0.09,
      wheelMultiplier: 0.95,
      touchMultiplier: 1
    });

    let frameId = 0;

    const raf = (time: number) => {
      lenis.raf(time);
      frameId = window.requestAnimationFrame(raf);
    };

    frameId = window.requestAnimationFrame(raf);

    return () => {
      window.cancelAnimationFrame(frameId);
      lenis.destroy();
    };
  }, [disabled]);
}

function useCursorState() {
  const reduced = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [state, setState] = useState<CursorState>("normal");
  const x = useMotionValue(-120);
  const y = useMotionValue(-120);

  const leadX = useSpring(x, { stiffness: 380, damping: 28, mass: 0.7 });
  const leadY = useSpring(y, { stiffness: 380, damping: 28, mass: 0.7 });
  const tail1X = useSpring(x, { stiffness: 220, damping: 24, mass: 0.85 });
  const tail1Y = useSpring(y, { stiffness: 220, damping: 24, mass: 0.85 });
  const tail2X = useSpring(x, { stiffness: 160, damping: 22, mass: 0.92 });
  const tail2Y = useSpring(y, { stiffness: 160, damping: 22, mass: 0.92 });

  useEffect(() => {
    if (reduced || !window.matchMedia("(pointer: fine)").matches) {
      return;
    }

    setEnabled(true);
    document.body.style.cursor = "none";

    const resolveState = (target: HTMLElement | null): CursorState => {
      if (!target) {
        return "normal";
      }

      const explicit = target.closest<HTMLElement>("[data-cursor]")?.dataset.cursor as CursorState | undefined;

      if (explicit) {
        return explicit;
      }

      if (target.closest("button")) {
        return "button";
      }
      if (target.closest("a")) {
        return "clickable";
      }
      if (target.closest("input, textarea")) {
        return "text";
      }

      return "normal";
    };

    const onMove = (event: PointerEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);
      setState(resolveState(event.target as HTMLElement | null));
    };

    const onLeave = () => setState("normal");

    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerleave", onLeave);

    return () => {
      document.body.style.cursor = "";
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
    };
  }, [reduced, x, y]);

  return {
    enabled,
    state,
    leadX,
    leadY,
    tail1X,
    tail1Y,
    tail2X,
    tail2Y
  };
}

function CustomCursor() {
  const cursor = useCursorState();

  if (!cursor.enabled) {
    return null;
  }

  return (
    <>
      <motion.div className={`${styles.cursorLead} ${styles[`cursor${cursor.state}`]}`} style={{ x: cursor.leadX, y: cursor.leadY }} />
      <motion.div className={styles.cursorTrailOne} style={{ x: cursor.tail1X, y: cursor.tail1Y }} />
      <motion.div className={styles.cursorTrailTwo} style={{ x: cursor.tail2X, y: cursor.tail2Y }} />
    </>
  );
}

function MagneticButton({ href, children, className, icon: Icon }: { href: string; children: string; className?: string; icon?: React.ComponentType<{ size?: number }> }) {
  const ref = useRef<HTMLAnchorElement | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const onMove = (event: React.MouseEvent<HTMLAnchorElement>) => {
    const element = ref.current;
    if (!element) {
      return;
    }

    const bounds = element.getBoundingClientRect();
    const offsetX = event.clientX - (bounds.left + bounds.width / 2);
    const offsetY = event.clientY - (bounds.top + bounds.height / 2);

    x.set(offsetX * 0.22);
    y.set(offsetY * 0.22);
  };

  const reset = () => {
    animate(x, 0, { type: "spring", stiffness: 220, damping: 20 });
    animate(y, 0, { type: "spring", stiffness: 220, damping: 20 });
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noreferrer" : undefined}
      className={`${styles.magneticButton} ${className ?? ""}`}
      style={{ x, y }}
      onMouseMove={onMove}
      onMouseLeave={reset}
      data-cursor="button"
    >
      {Icon ? <Icon size={16} /> : null}
      <span>{children}</span>
    </motion.a>
  );
}

function AnimatedNumber({ value, suffix = "" }: { value: number; suffix?: string }) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const controls = animate(0, value, {
      duration: 1.2,
      ease: [0.2, 0.9, 0.2, 1],
      onUpdate: (latest) => setDisplay(Math.round(latest))
    });

    return () => controls.stop();
  }, [value]);

  return (
    <strong>
      {display}
      {suffix}
    </strong>
  );
}

function CommandPalette() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen((current) => !current);
      }

      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    window.addEventListener("keydown", onKey);

    return () => window.removeEventListener("keydown", onKey);
  }, []);

  if (!open) {
    return null;
  }

  return (
    <div className={styles.commandOverlay} role="dialog" aria-modal="true" aria-label="Command palette">
      <div className={styles.commandCard}>
        <div className={styles.commandHeader}>
          <RiCommandLine size={16} />
          <p>Jump to a section</p>
        </div>
        <div className={styles.commandList}>
          {sectionLinks.map((item) => (
            <a key={item.id} href={`#${item.id}`} className={styles.commandItem} onClick={() => setOpen(false)} data-cursor="clickable">
              <item.icon size={16} />
              <span>{item.label}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

function DockNav() {
  return (
    <nav className={styles.dockNav} aria-label="Section navigation">
      {sectionLinks.slice(0, 7).map((item) => (
        <a key={item.id} href={`#${item.id}`} className={styles.dockItem} data-cursor="clickable" aria-label={item.label}>
          <item.icon size={15} />
          <span>{item.label}</span>
        </a>
      ))}
    </nav>
  );
}

function HeroParticles() {
  const particles = useMemo(
    () =>
      Array.from({ length: 22 }, (_, index) => ({
        id: index,
        left: `${(index * 17) % 100}%`,
        top: `${(index * 29) % 100}%`,
        delay: `${(index % 7) * 0.7}s`
      })),
    []
  );

  return (
    <div className={styles.particlesLayer} aria-hidden="true">
      {particles.map((particle) => (
        <span
          key={particle.id}
          className={styles.particle}
          style={{
            left: particle.left,
            top: particle.top,
            animationDelay: particle.delay
          }}
        />
      ))}
    </div>
  );
}

function FloatingTechIcons() {
  const icons = useMemo(
    () => [
      { Icon: RiCodeLine, delay: 0, x: 20, y: -30 },
      { Icon: RiDatabase2Line, delay: 0.3, x: -25, y: -20 },
      { Icon: RiCloudLine, delay: 0.6, x: 15, y: 25 },
      { Icon: RiBatteryChargeLine, delay: 0.9, x: -20, y: 15 },
      { Icon: RiCpuLine, delay: 1.2, x: 28, y: -10 },
      { Icon: RiGitBranchLine, delay: 1.5, x: -28, y: 28 }
    ],
    []
  );

  return (
    <div className={styles.techIconsContainer} aria-hidden="true">
      {icons.map((item, idx) => (
        <motion.div
          key={idx}
          className={styles.floatingTechIcon}
          initial={{ opacity: 0, scale: 0.3 }}
          animate={{ 
            opacity: 0.7, 
            scale: 1,
            y: [0, item.y, 0],
            x: [0, item.x, 0],
            rotate: [0, 360, 0]
          }}
          transition={{
            opacity: { delay: item.delay, duration: 0.8 },
            scale: { delay: item.delay, duration: 0.8 },
            y: { duration: 6 + item.delay, repeat: Infinity, ease: "easeInOut", delay: 0.8 },
            x: { duration: 6 + item.delay, repeat: Infinity, ease: "easeInOut", delay: 0.8 },
            rotate: { duration: 6 + item.delay, repeat: Infinity, ease: "easeInOut", delay: 0.8 }
          }}
        >
          <item.Icon size={32} />
        </motion.div>
      ))}
    </div>
  );
}

function AnimatedBackground() {
  return (
    <div className={styles.heroBackground} aria-hidden="true">
      <motion.div
        className={styles.gradientOrb1}
        animate={{
          x: [0, 100, -50, 0],
          y: [0, -100, 50, 0]
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className={styles.gradientOrb2}
        animate={{
          x: [0, -80, 60, 0],
          y: [0, 120, -40, 0]
        }}
        transition={{
          duration: 16,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
      />
    </div>
  );
}

function ContactForm({ email }: { email: string }) {
  const [status, setStatus] = useState("Ready when you are.");

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("Contact form backend is under development. Please email directly for now.");
    event.currentTarget.reset();
  };

  return (
    <form className={styles.contactForm} onSubmit={onSubmit}>
      <label>
        Name
        <input name="name" placeholder="Your name" required data-cursor="text" />
      </label>
      <label>
        Email
        <input name="email" type="email" placeholder="you@example.com" required data-cursor="text" />
      </label>
      <label>
        Message
        <textarea name="message" rows={5} placeholder="Tell me about your project or team." required data-cursor="text" />
      </label>
      <div className={styles.contactActions}>
        <button type="submit" className={styles.primaryButton} data-cursor="button">
          Send message
          <RiArrowRightLine size={16} />
        </button>
        <a href={`mailto:${email}`} className={styles.secondaryButton} data-cursor="clickable">
          Email directly
        </a>
      </div>
      <p className={styles.contactStatus} aria-live="polite">
        {status}
      </p>
    </form>
  );
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en", { month: "short", year: "numeric" }).format(new Date(value));
}

export function PortfolioExperience({
  githubProjects,
  githubUrl,
  portfolioUrl,
  email,
  phone,
  location,
  visitCount
}: PortfolioExperienceProps) {
  const reducedMotion = useReducedMotion();
  useLenisSmoothScroll(Boolean(reducedMotion));

  const wrapperRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start start", "end end"]
  });

  const heroShift = useTransform(scrollYProgress, [0, 0.4], [0, -70]);
  const glowShift = useTransform(scrollYProgress, [0, 1], [0, -220]);

  return (
    <main ref={wrapperRef} className={styles.page}>
      <CustomCursor />
      <CommandPalette />
      <DockNav />

      <motion.div className={styles.progressBar} style={{ scaleX: scrollYProgress }} />
      <motion.div className={styles.glowOne} style={{ y: heroShift }} aria-hidden="true" />
      <motion.div className={styles.glowTwo} style={{ y: glowShift }} aria-hidden="true" />

      <header className={styles.glassNav}>
        <div className={styles.brand}>Sahin Alam</div>
        <div className={styles.navMeta}>
          <span>
            <RiMapPinLine size={14} />
            {location}
          </span>
          <button type="button" className={styles.commandHint} data-cursor="button">
            <RiCommandLine size={14} />
            Ctrl+K
          </button>
        </div>
      </header>

      <section id="hero" className={styles.heroSection}>
        <AnimatedBackground />
        <HeroParticles />
        <motion.div 
          className={styles.heroCopy} 
          initial={{ opacity: 0, y: 34 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.8 }}
        >
          <motion.p 
            className={styles.availability}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Available for high-impact engineering roles
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.7 }}
          >
            Builder. Leader. Engineer. Researcher.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.7 }}
          >
            I am Sahin, a software engineer shaping products that blend full-stack execution,
            quality engineering, and data-informed decisions.
          </motion.p>
          <motion.div 
            className={styles.heroActions}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            <MagneticButton href="/resume-cta" className={styles.primaryButton} icon={RiStarLine}>
              Resume CTA
            </MagneticButton>
            <MagneticButton href={githubUrl} className={styles.secondaryButton} icon={RiCodeLine}>
              GitHub
            </MagneticButton>
            <MagneticButton href="https://linkedin.com/in/sahin-alam-96250324a" className={styles.secondaryButton} icon={RiShareForwardLine}>
              LinkedIn
            </MagneticButton>
          </motion.div>
          <motion.div 
            className={styles.heroStats}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.0, duration: 0.5 }}
          >
            <article>
              <AnimatedNumber value={visitCount} suffix="+" />
              <span>Visits</span>
            </article>
            <article>
              <AnimatedNumber value={githubProjects.length} />
              <span>Open source repos</span>
            </article>
            <article>
              <AnimatedNumber value={3} />
              <span>Major competitions</span>
            </article>
          </motion.div>
        </motion.div>

        <motion.div className={styles.heroVisual} style={{ y: heroShift }} data-cursor="image">
          <FloatingTechIcons />
          <motion.div 
            className={styles.profileOrb}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            whileHover={{ scale: 1.05 }}
          >
            <span className={styles.orbRing} />
            <span className={styles.orbRing} />
            <span className={styles.orbRing} />
            <motion.div 
              className={styles.orbCore}
              animate={{
                boxShadow: [
                  "inset 0 0 40px rgba(255, 255, 255, 0.08)",
                  "inset 0 0 60px rgba(94, 224, 255, 0.2)",
                  "inset 0 0 40px rgba(255, 255, 255, 0.08)"
                ]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "linear"
                }}
              >
                <Sparkles size={22} />
              </motion.div>
              <p>Engineering storyteller</p>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      <section id="about" className={styles.sectionBlock}>
        <div className={styles.sectionHead}>
          <p>About</p>
          <h2>From mechanical foundations to software leadership.</h2>
        </div>
        <div className={styles.storyGrid}>
          <article>
            <p>
              My path into software was non-linear. During my mechanical engineering journey at NIT Silchar,
              software moved from curiosity to obsession. I learned by building, testing, failing, and shipping.
            </p>
          </article>
          <article>
            <p>
              Today, I design interfaces, implement APIs, automate workflows, and build systems with ownership.
              I do not just deliver code. I deliver outcomes.
            </p>
          </article>
        </div>
      </section>

      <section id="journey" className={styles.sectionBlock}>
        <div className={styles.sectionHead}>
          <p>Journey</p>
          <h2>Each chapter expanded the scope of impact.</h2>
        </div>
        <div className={`${styles.timeline} ${styles.bentoBorderSecondary}`}>
          {journeyStages.map((item, index) => (
            <motion.article 
              key={item.title} 
              className={styles.timelineCard} 
              initial={{ opacity: 0, x: -32 }} 
              whileInView={{ opacity: 1, x: 0 }} 
              transition={{ delay: index * 0.12, duration: 0.5 }}
              viewport={{ once: false, amount: 0.3 }}
              whileHover={{ x: 12 }}
            >
              <span>{item.year}</span>
              <div>
                <h3>{item.title}</h3>
                <p>{item.detail}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      <section id="skills" className={styles.sectionBlock}>
        <div className={styles.sectionHead}>
          <p>Skills</p>
          <h2>Capabilities organized around product delivery.</h2>
        </div>
        <div className={`${styles.bentoGrid} ${styles.bentoBorder}`}>
          {skillBento.map((group) => (
            <motion.article 
              key={group.title} 
              className={styles.bentoCard}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: false, amount: 0.3 }}
              whileHover={{ y: -8 }}
            >
              <h3>{group.title}</h3>
              <p>{group.emphasis}</p>
              <div className={styles.pillWrap}>
                {group.items.map((item) => (
                  <motion.span 
                    key={item}
                    whileHover={{ scale: 1.1, backgroundColor: "rgba(124, 247, 192, 0.3)" }}
                    transition={{ duration: 0.2 }}
                  >
                    <SkillDisplay skill={item} />
                  </motion.span>
                ))}
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      <section id="tech-stack" className={styles.sectionBlock}>
        <div className={styles.sectionHead}>
          <p>Tech Stack</p>
          <h2>An ecosystem built for velocity and reliability.</h2>
        </div>
        <div className={`${styles.marqueeOuter} ${styles.bentoBorderSecondary}`} aria-label="Technology marquee">
          <div className={styles.marqueeTrack}>
            {skillBento.flatMap((group) => group.items).concat(skillBento.flatMap((group) => group.items)).map((item, index) => (
              <div key={`${item}-${index}`}>
                <SkillDisplay skill={item} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="leadership" className={styles.sectionBlock}>
        <div className={styles.sectionHead}>
          <p>Leadership</p>
          <h2>Leadership measured by outcomes, not titles.</h2>
        </div>
        <div className={`${styles.metricGrid} ${styles.bentoBorder}`}>
          {leadershipImpact.map((item) => (
            <article key={item.label}>
              <AnimatedNumber value={item.value} suffix={item.label.includes("Participants") ? "+" : ""} />
              <span>{item.label}</span>
            </article>
          ))}
        </div>
      </section>

      <section id="experience" className={styles.sectionBlock}>
        <div className={styles.sectionHead}>
          <p>Experience</p>
          <h2>Built across organizations, communities, and research.</h2>
        </div>
        <div className={`${styles.experienceGrid} ${styles.bentoBorderSecondary}`}>
          {experienceCards.map((item) => (
            <article key={item.role} className={styles.experienceCard}>
              <h3>{item.role}</h3>
              <h4>{item.org}</h4>
              <p>{item.impact}</p>
              <div className={styles.pillWrap}>
                {item.focus.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="projects" className={styles.sectionBlock}>
        <div className={styles.sectionHead}>
          <p>Projects</p>
          <h2>Progressive stack of engineering stories.</h2>
        </div>
        <div className={`${styles.progressiveStack} ${styles.bentoBorderSecondary}`}>
          {projectStories.map((project, index) => (
            <motion.article 
              key={project.name} 
              className={styles.stackCard} 
              style={{ ["--stack-index" as string]: index } as CSSProperties} 
              data-cursor="drag"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15, duration: 0.6 }}
              viewport={{ once: false, amount: 0.3 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className={styles.stackHead}>
                <motion.span animate={{ backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"] }} transition={{ duration: 6, repeat: Infinity }}>0{index + 1}</motion.span>
                <h3>{project.name}</h3>
              </div>
              <p><strong>Problem:</strong> {project.problem}</p>
              <p><strong>Architecture:</strong> {project.architecture}</p>
              <p><strong>Challenge:</strong> {project.challenge}</p>
              <p><strong>Decision:</strong> {project.decision}</p>
              <p><strong>Lesson:</strong> {project.lessons}</p>
              <div className={styles.pillWrap}>
                {project.stack.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
              <a href={project.github} target="_blank" rel="noreferrer" className={styles.inlineAction} data-cursor="clickable">
                Open code <RiArrowRightLine size={14} />
              </a>
            </motion.article>
          ))}
        </div>
      </section>

      <section id="research" className={styles.sectionBlock}>
        <div className={styles.sectionHead}>
          <p>Research</p>
          <h2>Applied experimentation with practical outcomes.</h2>
        </div>
        <div className={`${styles.researchGrid} ${styles.bentoBorderSecondary}`}>
          {researchHighlights.map((item) => (
            <article key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.detail}</p>
              <em>{item.signal}</em>
            </article>
          ))}
        </div>
      </section>

      <section id="achievements" className={styles.sectionBlock}>
        <div className={styles.sectionHead}>
          <p>Achievements</p>
          <h2>Signals of execution under pressure.</h2>
        </div>
        <div className={`${styles.achievementRail} ${styles.bentoBorder}`}>
          {achievements.map((item) => (
            <article key={item} className={styles.achievementCard}>
              <Sparkles size={16} />
              <p>{item}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="github" className={styles.sectionBlock}>
        <div className={styles.sectionHead}>
          <p>GitHub</p>
          <h2>Live open-source pulse.</h2>
        </div>
        <div className={`${styles.githubGrid} ${styles.bentoBorderAccent}`}>
          {githubProjects.slice(0, 6).map((repo) => (
            <article key={repo.name} className={styles.githubCard}>
              <div>
                <p>{repo.language}</p>
                <h3>{repo.name}</h3>
                <span>Updated {formatDate(repo.updatedAt)}</span>
              </div>
              <p>{repo.description}</p>
              <div className={styles.repoMeta}>
                <span>{repo.stars} stars</span>
                <span>{repo.forks} forks</span>
              </div>
              <a href={repo.url} target="_blank" rel="noreferrer" className={styles.inlineAction} data-cursor="clickable">
                View repository <ArrowRight size={14} />
              </a>
            </article>
          ))}
        </div>
      </section>

      <section id="beyond" className={styles.sectionBlock}>
        <div className={styles.sectionHead}>
          <p>Beyond Coding</p>
          <h2>I optimize systems, teams, and outcomes.</h2>
        </div>
        <div className={`${styles.beyondGrid} ${styles.bentoBorderSecondary}`}>
          {beyondCoding.map((item) => (
            <article key={item}>
              <Sparkles size={16} />
              <p>{item}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="contact" className={styles.sectionBlock}>
        <div className={styles.sectionHead}>
          <p>Contact</p>
          <h2>Let us build something meaningful together.</h2>
        </div>
        <div className={`${styles.contactGrid} ${styles.bentoBorderAccent}`}>
          <div className={styles.contactMeta}>
            <a href={`mailto:${email}`} data-cursor="clickable">
              <RiMailLine size={16} /> {email}
            </a>
            <a href={githubUrl} target="_blank" rel="noreferrer" data-cursor="clickable">
              <RiCodeLine size={16} /> GitHub
            </a>
            <a href="https://linkedin.com/in/sahin-alam-96250324a" target="_blank" rel="noreferrer" data-cursor="clickable">
              <RiShareForwardLine size={16} /> LinkedIn
            </a>
            <p>
              <RiMapPinLine size={16} /> {location}
            </p>
            <p>
              <RiBriefcaseLine size={16} /> {phone}
            </p>
            <Link href="/" className={styles.inlineAction} data-cursor="clickable">
              Back to landing <ArrowRight size={14} />
            </Link>
          </div>
          <ContactForm email={email} />
        </div>
      </section>
    </main>
  );
}
