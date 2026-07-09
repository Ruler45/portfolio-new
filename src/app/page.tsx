const socialLinks = [
  { label: "GitHub", href: "https://github.com/ruler45" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/sahin-alam-96250324a/" },
  { label: "LeetCode", href: "https://leetcode.com/u/sahinalam/" },
  { label: "Website", href: "https://sahin.codes" }
];

const stats = [
  { value: "3", label: "featured projects" },
  { value: "2x", label: "networking efficiency gain" },
  { value: "100+", label: "students reached in cloud sessions" },
  { value: "Top 5%", label: "Adobe GenSolve ranking" }
];

const projects = [
  {
    name: "Linkedfy",
    type: "LinkedIn automation tool",
    tech: ["Node.js", "Puppeteer", "Commander", "Inquirer"],
    summary:
      "Automates connection requests and personalized messaging so users can spend less time on repetitive outreach and more time on meaningful conversations.",
    impact: [
      "Saved 2-3 hours of manual work each week",
      "Improved networking efficiency by 2x",
      "Designed secure local storage with no third-party dependency"
    ]
  },
  {
    name: "ED Process Parameter Optimization Model",
    type: "Intern project",
    tech: ["NumPy", "Pandas", "Matplotlib", "Scikit-learn"],
    summary:
      "Built predictive models for mass deposition and coating hardness from a small dataset, then tuned and compared candidates to identify the most accurate and interpretable approach.",
    impact: [
      "Created models using just 27 data points",
      "Used RandomizedSearchCV to tune hyperparameters",
      "Reduced manual analysis effort by 50%"
    ]
  },
  {
    name: "TalentFlow",
    type: "Mini hiring platform",
    tech: ["Next.js", "Node.js", "Express.js", "MongoDB", "Mongoose"],
    summary:
      "A lightweight hiring flow for posting jobs, registering candidates, and running assessments with strong offline support and fast prototyping.",
    impact: [
      "Supported 1,000+ test candidates",
      "Handled 25 job entries without backend dependency",
      "Used IndexedDB for stable offline storage"
    ]
  }
];

const skills = [
  {
    title: "Frontend & Web",
    items: ["React.js", "Next.js", "Tailwind CSS", "Responsive Web Design", "Context API"]
  },
  {
    title: "Backend & Data",
    items: ["Node.js", "Express.js", "MongoDB", "MySQL", "PostgreSQL", "REST API"]
  },
  {
    title: "Programming",
    items: ["JavaScript", "TypeScript", "Java", "C", "DSA", "OOP"]
  },
  {
    title: "Cloud & Tools",
    items: ["AWS EC2", "S3", "IAM", "CloudFront", "Lambda", "Git", "GitHub"]
  }
];

const timeline = [
  {
    title: "Technical Head, E-cell NIT Silchar",
    period: "2024-25",
    detail:
      "Led a 10-member tech team to develop, maintain, and deploy organizational platforms."
  },
  {
    title: "Cloud Moderator, GDGC NIT Silchar",
    period: "2024-25",
    detail:
      "Conducted cloud sessions and hands-on labs for 100+ students, doubling engagement compared to the previous year."
  },
  {
    title: "Adobe GenSolve semi-finalist",
    period: "Nationwide",
    detail:
      "Ranked among the top 5% of 28,000+ participants."
  },
  {
    title: "Flipkart Grid 6.0 semi-finalist",
    period: "Information Security track",
    detail:
      "Qualified for Round 2 of the national competition."
  }
];

export default function Home() {
  return (
    <main className="page-shell">
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />

      <section className="hero">
        <div className="hero-copy reveal">
          <p className="eyebrow">NIT Silchar · Full Stack · Automation · Cloud</p>
          <h1>Sahin Alam</h1>
          <p className="headline">
            I build practical products that automate repetitive work, simplify hiring workflows,
            and turn small datasets into useful decisions.
          </p>
          <p className="body-copy">
            I am a B.Tech student at National Institute of Technology, Silchar, focused on web
            development, workflow automation, and applied machine learning. My work blends clean
            execution with measurable impact.
          </p>

          <div className="cta-row">
            {socialLinks.map((link) => (
              <a key={link.label} href={link.href} target="_blank" rel="noreferrer" className="cta">
                {link.label}
              </a>
            ))}
            <a href="mailto:sahin0945.work@gmail.com" className="cta cta-primary">
              Contact me
            </a>
          </div>

          <div className="stats-grid">
            {stats.map((stat) => (
              <article key={stat.label} className="stat-card">
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </article>
            ))}
          </div>
        </div>

        <aside className="hero-panel reveal delay-1">
          <div className="panel-card panel-top">
            <p className="panel-label">Currently focused on</p>
            <ul>
              <li>Next.js portfolio and product work</li>
              <li>Automation tools that remove friction</li>
              <li>ML models that stay interpretable</li>
            </ul>
          </div>
          <div className="panel-card panel-bottom">
            <p className="panel-label">Quick facts</p>
            <div className="fact-row">
              <span>Education</span>
              <strong>B.Tech, NIT Silchar</strong>
            </div>
            <div className="fact-row">
              <span>Location</span>
              <strong>Bengaluru, India</strong>
            </div>
            <div className="fact-row">
              <span>Focus</span>
              <strong>Web, automation, Cloud</strong>
            </div>
          </div>
        </aside>
      </section>

      <section className="section reveal delay-2">
        <div className="section-heading">
          <p className="eyebrow">Featured Projects</p>
          <h2>Work with clear outcomes.</h2>
        </div>
        <div className="project-grid">
          {projects.map((project) => (
            <article key={project.name} className="project-card">
              <div className="project-top">
                <p className="project-type">{project.type}</p>
                <h3>{project.name}</h3>
                <p>{project.summary}</p>
              </div>
              <div className="tag-row">
                {project.tech.map((tech) => (
                  <span key={tech} className="tag">
                    {tech}
                  </span>
                ))}
              </div>
              <ul className="impact-list">
                {project.impact.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="section split-section reveal delay-3">
        <div>
          <div className="section-heading">
            <p className="eyebrow">Skills</p>
            <h2>Stack built for shipping.</h2>
          </div>
          <div className="skills-grid">
            {skills.map((group) => (
              <article key={group.title} className="skill-card">
                <h3>{group.title}</h3>
                <div className="tag-row">
                  {group.items.map((item) => (
                    <span key={item} className="tag tag-soft">
                      {item}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>

        <div>
          <div className="section-heading">
            <p className="eyebrow">Leadership & Recognition</p>
            <h2>Roles that show range and ownership.</h2>
          </div>
          <div className="timeline">
            {timeline.map((item) => (
              <article key={item.title} className="timeline-item">
                <div className="timeline-marker" />
                <div>
                  <div className="timeline-head">
                    <h3>{item.title}</h3>
                    <span>{item.period}</span>
                  </div>
                  <p>{item.detail}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section contact-card reveal delay-4">
        <div>
          <p className="eyebrow">Contact</p>
          <h2>Open to internships, product work, and collaboration.</h2>
        </div>
        <div className="contact-links">
          <a href="mailto:sahin0945.work@gmail.com" className="cta cta-primary">
            sahin0945.work@gmail.com
          </a>
          <a href="https://github.com/ruler45" target="_blank" rel="noreferrer" className="cta">
            GitHub profile
          </a>
          <a
            href="https://www.linkedin.com/in/sahin-alam-96250324a/"
            target="_blank"
            rel="noreferrer"
            className="cta"
          >
            LinkedIn
          </a>
        </div>
      </section>
    </main>
  );
}
