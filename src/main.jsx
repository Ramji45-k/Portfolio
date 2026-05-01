import React, { useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

const navItems = [
  { path: "/", label: "Home" },
  { path: "/about", label: "About" },
  { path: "/skills", label: "Skills" },
  { path: "/projects", label: "Projects" },
  { path: "/achievements", label: "Achievements" },
  { path: "/education", label: "Education" },
  { path: "/contact", label: "Contact" },
];

const skills = [
  {
    title: "Data Analytics",
    items: ["Power BI", "Tableau", "SQL", "Excel", "Python Pandas"],
  },
  {
    title: "Web Development",
    items: ["HTML", "CSS", "JavaScript", "Responsive UI", "React Basics"],
  },
  {
    title: "Programming",
    items: ["Java", "Problem Solving", "Data Structures", "Algorithms"],
  },
  {
    title: "Core Concepts",
    items: [
      "Data Cleaning",
      "ETL",
      "Data Visualization",
      "Dashboard Development",
    ],
  },
];

const projects = [
  {
    title: "Sales Performance Dashboard",
    type: "Power BI",
    description:
      "Developed an interactive dashboard to analyze regional sales performance, revenue, profit, and business trends using Power Query and DAX.",
    highlights: ["Revenue KPIs", "Regional trends", "DAX measures"],
  },
  {
    title: "Student Performance Analytics System",
    type: "Analytics",
    description:
      "Built an end-to-end academic analytics workflow covering data collection, preprocessing, analysis, and visualization for performance insights.",
    highlights: ["Data pipeline", "Pattern analysis", "Academic insights"],
  },
  {
    title: "World Population Data Analysis",
    type: "Python",
    description:
      "Performed exploratory data analysis on global population data using Pandas and Matplotlib to study growth, distribution, and demographic changes.",
    highlights: ["EDA", "Data cleaning", "Visualization"],
  },
  {
    title: "Retail Sales & Customer Behavior Dashboard",
    type: "Power BI",
    description:
      "Created an interactive dashboard to understand purchasing behavior, customer segments, sales trends, and business performance.",
    highlights: ["Customer segments", "Power Query", "Dynamic visuals"],
  },
  {
    title: "Library Management System",
    type: "Web Project",
    description:
      "Developed a responsive web application for book records, user interactions, borrowing, and return operations using HTML, CSS, and JavaScript.",
    highlights: ["Responsive UI", "Record management", "JavaScript logic"],
  },
];

const achievements = [
  "Solved 1200+ problems on Skillrack, including Data Structures and Algorithms.",
  "Solved 100+ problems on LeetCode.",
  "Completed Linux Fundamentals and Networking Basics certifications from Cisco Networking Academy.",
  "Completed SQL Certification from MongoDB Learning Platform.",
];

const statCards = [
  { value: "1200+", label: "Skillrack Problems" },
  { value: "100+", label: "LeetCode Problems" },
  { value: "5", label: "Featured Projects" },
  { value: "7.77", label: "Current CGPA" },
];

function useRoute() {
  const [path, setPath] = useState(window.location.pathname);

  useEffect(() => {
    const onPopState = () => setPath(window.location.pathname);
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  const navigate = (nextPath) => {
    if (nextPath === window.location.pathname) return;
    window.history.pushState({}, "", nextPath);
    setPath(nextPath);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return { path, navigate };
}

function App() {
  const { path, navigate } = useRoute();
  const Page = useMemo(() => {
    const routes = {
      "/": Home,
      "/about": About,
      "/skills": Skills,
      "/projects": Projects,
      "/achievements": Achievements,
      "/education": Education,
      "/contact": Contact,
    };
    return routes[path] || NotFound;
  }, [path]);

  return (
    <div className="app">
      <Header activePath={path} navigate={navigate} />
      <main>
        <Page navigate={navigate} />
      </main>
      <Footer navigate={navigate} />
    </div>
  );
}

function Header({ activePath, navigate }) {
  const [open, setOpen] = useState(false);

  const go = (path) => {
    navigate(path);
    setOpen(false);
  };

  return (
    <header className="site-header">
      <button className="brand" onClick={() => go("/")} aria-label="Go home">
        <span className="brand-mark">RK</span>
        <span>
          <strong>Ramji K S</strong>
          <small>Data Analyst</small>
        </span>
      </button>
      <button
        className="menu-button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-label="Toggle navigation"
      >
        <span />
        <span />
        <span />
      </button>
      <nav className={open ? "nav open" : "nav"}>
        {navItems.map((item) => (
          <button
            key={item.path}
            className={activePath === item.path ? "active" : ""}
            onClick={() => go(item.path)}
          >
            {item.label}
          </button>
        ))}
      </nav>
    </header>
  );
}

function PageShell({ eyebrow, title, children, aside }) {
  return (
    <section className="page-shell">
      <div className="page-heading">
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
      </div>
      <div className={aside ? "page-grid" : "page-content"}>
        <div>{children}</div>
        {aside}
      </div>
    </section>
  );
}

function Home({ navigate }) {
  return (
    <section className="hero">
      <div className="hero-copy">
        <p className="eyebrow">Data Analyst | Web Developer | Problem Solver</p>
        <h1>Ramji K S</h1>
        <p className="hero-text">
          Computer Science Engineering student focused on transforming raw data
          into meaningful insights and building interactive, user-friendly web
          applications.
        </p>
        <div className="hero-actions">
          <button className="primary-button" onClick={() => navigate("/projects")}>
            View Projects
          </button>
          <button className="secondary-button" onClick={() => navigate("/contact")}>
            Contact Me
          </button>
        </div>
      </div>
      <div className="hero-panel" aria-label="Portfolio summary">
        <div className="dashboard-top">
          <span />
          <span />
          <span />
        </div>
        <div className="analytics-card large">
          <p>Career Objective</p>
          <strong>
            Secure a challenging role in data analytics or web development where
            I can apply technical skills, contribute to meaningful projects, and
            grow as a professional.
          </strong>
        </div>
        <div className="mini-grid">
          {statCards.map((stat) => (
            <div className="analytics-card" key={stat.label}>
              <strong>{stat.value}</strong>
              <p>{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <PageShell
      eyebrow="About Me"
      title="A data-minded developer who likes turning complexity into clarity."
      aside={<ProfileCard />}
    >
      <div className="rich-text">
        <p>
          I am currently pursuing my Bachelor of Engineering in Computer Science
          at National Engineering College, Kovilpatti, where I have built a
          strong foundation in programming, data analysis, and software
          development.
        </p>
        <p>
          My core interest lies in data analytics. I enjoy working with datasets
          to uncover trends, patterns, and actionable insights through data
          cleaning, transformation, visualization, and dashboard creation using
          tools like Power BI and Python.
        </p>
        <p>
          Alongside analytics, I build responsive web applications using HTML,
          CSS, and JavaScript. I enjoy combining both domains to create
          data-driven web experiences that are clear, practical, and useful.
        </p>
        <p>
          Solving 1200+ Skillrack problems and 100+ LeetCode problems has
          strengthened my logical thinking, coding discipline, and confidence in
          approaching real-world challenges.
        </p>
      </div>
    </PageShell>
  );
}

function ProfileCard() {
  return (
    <aside className="profile-card">
      <div className="profile-avatar">RK</div>
      <h2>Ramji K S</h2>
      <p>Computer Science Engineering Student</p>
      <dl>
        <div>
          <dt>College</dt>
          <dd>National Engineering College</dd>
        </div>
        <div>
          <dt>Focus</dt>
          <dd>Data Analytics and Web Development</dd>
        </div>
        <div>
          <dt>Location</dt>
          <dd>Kovilpatti, Tamil Nadu</dd>
        </div>
      </dl>
    </aside>
  );
}

function Skills() {
  return (
    <PageShell
      eyebrow="Skills"
      title="Tools, technologies, and concepts I use to build solutions."
    >
      <div className="skill-grid">
        {skills.map((group) => (
          <article className="skill-card" key={group.title}>
            <h2>{group.title}</h2>
            <div className="chip-list">
              {group.items.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </PageShell>
  );
}

function Projects() {
  return (
    <PageShell
      eyebrow="Projects"
      title="Selected work across dashboards, analytics systems, and web apps."
    >
      <div className="project-grid">
        {projects.map((project) => (
          <article className="project-card" key={project.title}>
            <div>
              <span className="project-type">{project.type}</span>
              <h2>{project.title}</h2>
              <p>{project.description}</p>
            </div>
            <div className="project-highlights">
              {project.highlights.map((highlight) => (
                <span key={highlight}>{highlight}</span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </PageShell>
  );
}

function Achievements() {
  return (
    <PageShell
      eyebrow="Achievements"
      title="Practice, certifications, and proof of consistent learning."
      aside={
        <div className="score-panel">
          {statCards.slice(0, 2).map((stat) => (
            <div key={stat.label}>
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
            </div>
          ))}
        </div>
      }
    >
      <div className="achievement-list">
        {achievements.map((achievement) => (
          <article key={achievement}>
            <span className="check-mark">✓</span>
            <p>{achievement}</p>
          </article>
        ))}
      </div>
    </PageShell>
  );
}

function Education() {
  return (
    <PageShell
      eyebrow="Education"
      title="Academic background and current progress."
    >
      <div className="timeline">
        <article>
          <span>2023 - 2027</span>
          <h2>B.E. Computer Science Engineering</h2>
          <p>National Engineering College, Kovilpatti</p>
          <strong>CGPA: 7.77</strong>
        </article>
        <article>
          <span>Higher Secondary</span>
          <h2>12th Grade</h2>
          <p>Raja Higher Secondary School, Ettayapuram</p>
          <strong>Score: 86.3%</strong>
        </article>
      </div>
    </PageShell>
  );
}

function Contact() {
  return (
    <PageShell
      eyebrow="Contact"
      title="Let us connect for analytics, dashboards, and web projects."
    >
      <div className="contact-grid">
        <a href="mailto:rks051500@gmail.com">
          <span>Email</span>
          <strong>rks051500@gmail.com</strong>
        </a>
        <a href="tel:+917845800501">
          <span>Phone</span>
          <strong>+91 7845800501</strong>
        </a>
        <a href="https://github.com/Ramji45-k" target="_blank" rel="noreferrer">
          <span>GitHub</span>
          <strong>github.com/Ramji45-k</strong>
        </a>
        <a
          href="https://linkedin.com/in/ramji-k-s"
          target="_blank"
          rel="noreferrer"
        >
          <span>LinkedIn</span>
          <strong>linkedin.com/in/ramji-k-s</strong>
        </a>
      </div>
    </PageShell>
  );
}

function NotFound({ navigate }) {
  return (
    <PageShell eyebrow="404" title="This page is not available.">
      <button className="primary-button" onClick={() => navigate("/")}>
        Back to Home
      </button>
    </PageShell>
  );
}

function Footer({ navigate }) {
  return (
    <footer className="footer">
      <p>Ramji K S</p>
      <button onClick={() => navigate("/contact")}>Start a Conversation</button>
    </footer>
  );
}

createRoot(document.getElementById("root")).render(<App />);
