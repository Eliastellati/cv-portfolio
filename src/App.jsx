import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  ArrowRight,
  Sparkles,
  Wand2,
  Bot,
  Workflow,
  FileText,
  ShieldCheck,
  Timer,
  Search,
  Layers,
  BadgeCheck,
} from "lucide-react";

// ----
// Single-file, responsive CV + Portfolio page
// - Minimal + modern “liquid glass” aesthetic
// - Fast: no heavy images; uses gradients + CSS effects
// - All personal info is placeholder
// ----

const cn = (...classes) => classes.filter(Boolean).join(" ");

const Pill = ({ icon: Icon, children }) => (
  <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80 backdrop-blur-md">
    {Icon ? <Icon className="h-3.5 w-3.5 opacity-80" /> : null}
    {children}
  </span>
);

const Section = ({ id, eyebrow, title, subtitle, children }) => (
  <section id={id} className="scroll-mt-28">
    <div className="mx-auto max-w-6xl px-4 sm:px-6">
      <div className="mb-8 flex flex-col gap-3">
        {eyebrow ? (
          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs tracking-wide text-white/70 backdrop-blur-md">
            <Sparkles className="h-3.5 w-3.5" /> {eyebrow}
          </div>
        ) : null}
        <h2 className="text-balance text-2xl font-semibold text-white sm:text-3xl">
          {title}
        </h2>
        {subtitle ? (
          <p className="max-w-2xl text-pretty text-sm text-white/70 sm:text-base">
            {subtitle}
          </p>
        ) : null}
      </div>
      {children}
    </div>
  </section>
);

const GlassCard = ({ className, children }) => (
  <div
    className={cn(
      "rounded-2xl border border-white/10 bg-white/5 p-5 shadow-[0_0_0_1px_rgba(255,255,255,0.03),0_18px_40px_rgba(0,0,0,0.35)] backdrop-blur-xl",
      className
    )}
  >
    {children}
  </div>
);

const GradientBlob = ({ className }) => (
  <div
    className={cn(
      "pointer-events-none absolute -z-10 h-72 w-72 rounded-full blur-3xl opacity-60",
      className
    )}
  />
);

const NavLink = ({ href, children }) => (
  <a
    href={href}
    className="text-sm text-white/70 hover:text-white transition-colors"
  >
    {children}
  </a>
);

const PrimaryButton = ({ as = "a", href, onClick, children }) => {
  const Comp = as;
  return (
    <Comp
      href={href}
      onClick={onClick}
      className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-white/10 to-white/5 px-4 py-2 text-sm font-medium text-white shadow-[0_10px_30px_rgba(0,0,0,0.35)] ring-1 ring-white/15 backdrop-blur-xl hover:ring-white/25 transition"
    >
      {children} <ArrowRight className="h-4 w-4" />
    </Comp>
  );
};

const AccentButton = ({ as = "a", href, onClick, children }) => {
  const Comp = as;
  return (
    <Comp
      href={href}
      onClick={onClick}
      className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#ff6a00] px-4 py-2 text-sm font-semibold text-black shadow-[0_10px_30px_rgba(255,106,0,0.25)] hover:brightness-110 transition"
    >
      {children} <ExternalLink className="h-4 w-4" />
    </Comp>
  );
};

const Metric = ({ icon: Icon, label, value }) => (
  <div className="flex items-start gap-3">
    <div className="rounded-xl border border-white/10 bg-white/5 p-2 backdrop-blur-md">
      <Icon className="h-4 w-4 text-white/80" />
    </div>
    <div>
      <div className="text-sm font-semibold text-white">{value}</div>
      <div className="text-xs text-white/60">{label}</div>
    </div>
  </div>
);

const ProjectCard = ({ p }) => (
  <GlassCard className="group relative overflow-hidden">
    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity">
      <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-[#ff6a00]/20 blur-3xl" />
    </div>

    <div className="flex items-start justify-between gap-4">
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm font-semibold text-white">{p.title}</span>
          <span className="text-xs text-white/50">·</span>
          <span className="text-xs text-white/70">{p.category}</span>
        </div>
        <p className="mt-2 text-sm text-white/70">{p.description}</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {p.tags.map((t) => (
            <Pill key={t}>{t}</Pill>
          ))}
        </div>
      </div>
      <div className="shrink-0">
        <a
          href={p.link}
          className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-white/80 backdrop-blur-md hover:border-white/20 transition"
        >
          View <ExternalLink className="h-3.5 w-3.5" />
        </a>
      </div>
    </div>

    <div className="mt-5 grid grid-cols-2 gap-3">
      <Metric icon={Timer} label="Impact" value={p.impact} />
      <Metric icon={ShieldCheck} label="Focus" value={p.focus} />
    </div>
  </GlassCard>
);

const ToolCard = ({ t, onTry }) => (
  <GlassCard className="relative overflow-hidden">
    <div className="absolute -left-24 -top-24 h-56 w-56 rounded-full bg-white/10 blur-3xl" />
    <div className="relative">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="rounded-xl bg-white/5 p-2 ring-1 ring-white/10 backdrop-blur-md">
              <t.icon className="h-4 w-4 text-white/80" />
            </div>
            <h3 className="text-sm font-semibold text-white">{t.name}</h3>
          </div>
          <p className="mt-2 text-sm text-white/70">{t.pitch}</p>
        </div>
        <AccentButton as="button" onClick={() => onTry(t)}>
          Try
        </AccentButton>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {t.tags.map((x) => (
          <Pill key={x}>{x}</Pill>
        ))}
      </div>
    </div>
  </GlassCard>
);

const Modal = ({ open, title, children, onClose }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />
      <motion.div
        initial={{ opacity: 0, y: 10, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.2 }}
        className="relative w-full max-w-xl"
      >
        <div className="rounded-2xl border border-white/10 bg-[#0f1115]/90 p-5 shadow-[0_20px_80px_rgba(0,0,0,0.6)] backdrop-blur-xl">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="text-xs tracking-wide text-white/60">Try My AI Tools</div>
              <div className="mt-1 text-lg font-semibold text-white">{title}</div>
            </div>
            <button
              onClick={onClose}
              className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-white/70 hover:text-white hover:border-white/20 transition"
            >
              Close
            </button>
          </div>
          <div className="mt-4">{children}</div>
          <div className="mt-4 text-xs text-white/50">
            Placeholder demo UI — connect your real endpoints (n8n/webhook/API) later.
          </div>
        </div>
      </motion.div>
    </div>
  );
};

function TextArea({ label, placeholder, value, onChange }) {
  return (
    <label className="block">
      <div className="mb-2 text-xs font-medium text-white/70">{label}</div>
      <textarea
        className="min-h-[120px] w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/90 placeholder:text-white/40 outline-none ring-0 focus:border-white/20"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </label>
  );
}

function Input({ label, placeholder, value, onChange, type = "text" }) {
  return (
    <label className="block">
      <div className="mb-2 text-xs font-medium text-white/70">{label}</div>
      <input
        type={type}
        className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/90 placeholder:text-white/40 outline-none ring-0 focus:border-white/20"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </label>
  );
}

export default function CVPortfolioGlass() {
  const [toolModal, setToolModal] = useState(null);
  const [toolInput, setToolInput] = useState("");
  const [toolOutput, setToolOutput] = useState("");

  const tools = useMemo(
    () => [
      {
        id: "lead-scorer",
        name: "Lead Qualifier",
        icon: BadgeCheck,
        pitch:
          "Paste a lead description and get a quick qualification score + suggested next step.",
        tags: ["AI", "Sales Ops", "Fast triage"],
        placeholder:
          "Example: Name, company, budget, why they reached out, timeline…",
        demo:
          "This is a placeholder demo. In the real version, this would call an n8n webhook that runs an AI agent and returns JSON.",
      },
      {
        id: "content-brief",
        name: "Content Brief Generator",
        icon: Wand2,
        pitch:
          "Generate a tight SEO/marketing brief: angle, outline, keywords, and CTA.",
        tags: ["SEO", "Marketing", "Strategy"],
        placeholder:
          "Example: Topic + target audience + goal + brand tone…",
        demo:
          "Placeholder: connect to your multi-agent content workflow in n8n.",
      },
      {
        id: "doc-bot",
        name: "Document Q&A Bot",
        icon: Bot,
        pitch:
          "Ask a question about a document (PDF/knowledge base). Perfect for support.",
        tags: ["RAG", "Support", "Knowledge"],
        placeholder:
          "Example: ‘How do I reset the device?’",
        demo:
          "Placeholder: connect to your document chatbot pipeline (store Q&A to Airtable, fallback to Zendesk).",
      },
    ],
    []
  );

  const projects = useMemo(
    () => [
      {
        title: "Gmail → Drive Attachment Automation",
        category: "Workflow Automation",
        description:
          "n8n flow that monitors a Gmail inbox, downloads attachments, and auto-archives them in Google Drive.",
        tags: ["n8n", "Gmail", "Google Drive"],
        link: "#",
        impact: "Less manual handling",
        focus: "Reliability",
      },
      {
        title: "Lead Search + AI Enrichment → Airtable",
        category: "Lead Gen & Data",
        description:
          "Daily keyword-driven searches (Google Search API), AI formatting, and structured lead loading into Airtable.",
        tags: ["APIs", "AI", "Airtable"],
        link: "#",
        impact: "Faster prospecting",
        focus: "Data quality",
      },
      {
        title: "Formbricks Survey → AI Scoring → Zendesk/Slack",
        category: "Sales Ops & Support",
        description:
          "Automated lead capture, AI-based qualification, tailored emails, and ticket creation + Slack alerts for hot leads.",
        tags: ["Formbricks", "Zendesk", "Slack"],
        link: "#",
        impact: "Smarter follow-ups",
        focus: "Automation logic",
      },
      {
        title: "AI Document Chatbot + Ticket Fallback",
        category: "Customer Support",
        description:
          "Q&A bot over a specific document with Airtable logging. If unanswered, opens a Zendesk ticket automatically.",
        tags: ["AI", "Airtable", "Zendesk"],
        link: "#",
        impact: "Scalable support",
        focus: "UX & traceability",
      },
      {
        title: "Multi-Agent Campaign Engine",
        category: "Content Automation",
        description:
          "Agents generate brand tone + editorial timeline (engagement → hype → pre-launch) and create assets via specialized subflows.",
        tags: ["Agents", "Content", "n8n"],
        link: "#",
        impact: "Faster production",
        focus: "Brand consistency",
      },
    ],
    []
  );

  const experience = useMemo(
    () => [
      {
        role: "Graphic Designer",
        company: "The ScoutingApp",
        time: "(Placeholder dates)",
        bullets: [
          "Created on-brand graphics for social posts, certificates, reels creatives, and promotional banners.",
          "Translated scouting insights into clear, high-impact visuals optimized for mobile-first channels.",
        ],
      },
      {
        role: "Freelance Graphic Designer",
        company: "Self-employed",
        time: "2022 – 2025",
        bullets: [
          "Designed branding concepts, social media content and marketing materials for small businesses and personal projects.",
          "Delivered creative assets under tight deadlines, collaborating remotely with clients when needed.",
        ],
      },
    ],
    []
  );

  const education = useMemo(
    () => [
      {
        title: "AI & Business Automation — Academy Rapido",
        meta: "3-month intensive program",
        desc:
          "Built end-to-end automation systems with n8n, AI agents and SaaS tools across marketing, lead gen and support.",
      },
      {
        title: "Full-Stack Web Development — Boolean",
        meta: "Feb 2022 – Sept 2022",
        desc: "Foundations in web development and product thinking.",
      },
      {
        title: "Graphic Design & Branding — CalArts (Coursera)",
        meta: "May 2022 – Jun 2024",
        desc:
          "Brand strategy, identity systems, typography and hands-on projects for digital assets.",
      },
      {
        title: "Scientific High School Diploma",
        meta: "Secondary Education",
        desc:
          "Strong foundation in math, physics and analytical reasoning; structured problem-solving approach.",
      },
    ],
    []
  );

  const skills = useMemo(
    () => [
      { icon: Workflow, text: "AI & Automation (n8n, AI agents, prompting)" },
      { icon: Layers, text: "Workflow & process design" },
      { icon: Search, text: "API integrations & SaaS ecosystems" },
      { icon: FileText, text: "Data structuring (Airtable)" },
    ],
    []
  );

  const softSkills = useMemo(
    () => [
      "Clear communication",
      "Measurable goal setting",
      "Time management",
      "Growth mindset",
      "Learning from errors",
    ],
    []
  );

  const onTry = (t) => {
    setToolModal(t);
    setToolInput("");
    setToolOutput("");
  };

  const runDemo = async () => {
  const trimmed = toolInput.trim();
  if (!trimmed) {
    setToolOutput("Add some input to see a response.");
    return;
  }

  setToolOutput("Loading...");

  const endpoint =
    toolModal?.id === "lead-scorer"
      ? "/api/lead-qualifier"
      : toolModal?.id === "content-brief"
      ? "/api/content-brief"
      : "/api/doc-bot";

  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        input: trimmed,
        tool: toolModal?.id,
      }),
    });

    const data = await res.json();
    setToolOutput(JSON.stringify(data, null, 2));
  } catch (e) {
    setToolOutput(`Error: ${String(e)}`);
  }
};


  return (
    <div className="min-h-screen bg-[#0b0d10] text-white">
      {/* Background */}
      <div className="relative overflow-hidden">
        <GradientBlob className="left-[-6rem] top-[-6rem] bg-[#ff6a00]/25" />
        <GradientBlob className="right-[-5rem] top-[10rem] bg-white/10" />
        <GradientBlob className="left-[20%] top-[40rem] bg-[#ff6a00]/15" />

        {/* Top nav */}
        <header className="sticky top-0 z-40 border-b border-white/10 bg-[#0b0d10]/70 backdrop-blur-xl">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
            <a href="#top" className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-xl bg-white/5 ring-1 ring-white/10 backdrop-blur-md" />
              <div className="leading-tight">
                <div className="text-sm font-semibold">Elia Stellati</div>
                <div className="text-xs text-white/60">AI & Automation</div>
              </div>
            </a>
            <nav className="hidden items-center gap-6 md:flex">
              <NavLink href="#tools">AI Tools</NavLink>
              <NavLink href="#projects">Projects</NavLink>
              <NavLink href="#cv">CV</NavLink>
              <NavLink href="#contact">Contact</NavLink>
            </nav>
            <div className="flex items-center gap-2">
              <a
                href="#contact"
                className="hidden rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-white/80 backdrop-blur-md hover:border-white/20 transition sm:inline-flex"
              >
                Let’s talk
              </a>
              <a
                href="#"
                className="inline-flex items-center gap-2 rounded-xl bg-[#ff6a00] px-3 py-2 text-xs font-semibold text-black hover:brightness-110 transition"
              >
                Download CV <ArrowRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        </header>

        {/* Hero */}
        <main id="top">
          <div className="mx-auto max-w-6xl px-4 pb-16 pt-14 sm:px-6 sm:pt-20">
            <div className="grid items-center gap-10 md:grid-cols-2">
              <div>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35 }}
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70 backdrop-blur-md"
                >
                  <Sparkles className="h-3.5 w-3.5" />
                  Minimal · Glass · Fast · Responsive
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: 0.05 }}
                  className="mt-4 text-balance text-4xl font-semibold leading-tight sm:text-5xl"
                >
                  I build <span className="text-[#ff6a00]">AI-powered</span> workflows that
                  turn chaos into systems.
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: 0.1 }}
                  className="mt-4 max-w-xl text-pretty text-sm text-white/70 sm:text-base"
                >
                  (Placeholder) Tech-enabled creative specialized in AI & business automation.
                  I design end-to-end pipelines across marketing, lead generation and customer
                  support—optimized for speed, clarity and measurable impact.
                </motion.p>

                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <AccentButton href="#tools">Try my AI tools</AccentButton>
                  <PrimaryButton href="#projects">See projects</PrimaryButton>
                  <div className="flex items-center gap-2">
                    <a
                      href="#"
                      className="rounded-xl border border-white/10 bg-white/5 p-2 text-white/70 hover:text-white hover:border-white/20 transition"
                      aria-label="GitHub"
                    >
                      <Github className="h-4 w-4" />
                    </a>
                    <a
                      href="https://www.linkedin.com/in/elia-stellati/" target="_blank"
                      className="rounded-xl border border-white/10 bg-white/5 p-2 text-white/70 hover:text-white hover:border-white/20 transition"
                      aria-label="LinkedIn"
                    >
                      <Linkedin className="h-4 w-4" />
                    </a>
                    <a
                      href="#contact"
                      className="rounded-xl border border-white/10 bg-white/5 p-2 text-white/70 hover:text-white hover:border-white/20 transition"
                      aria-label="Email"
                    >
                      <Mail className="h-4 w-4" />
                    </a>
                  </div>
                </div>

                <div className="mt-8 flex flex-wrap gap-2">
                  <Pill icon={Workflow}>n8n Automations</Pill>
                  <Pill icon={Bot}>AI Agents</Pill>
                  <Pill icon={Search}>API Integrations</Pill>
                  <Pill icon={FileText}>Airtable Systems</Pill>
                </div>
              </div>

              {/* Hero “glass portrait” */}
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="relative"
              >
                <div className="absolute -inset-2 rounded-[28px] bg-gradient-to-br from-white/10 via-transparent to-[#ff6a00]/15 blur-2xl" />
                <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xs text-white/60">Now</div>
                      <div className="mt-1 text-lg font-semibold">AI & Automation</div>
                    </div>
                    <Pill icon={Sparkles}>Open to remote</Pill>
                  </div>

                  <div className="mt-5 grid gap-3 sm:grid-cols-2">
                    <Metric icon={Timer} label="Delivery" value="Fast prototypes" />
                    <Metric icon={ShieldCheck} label="Quality" value="Reliable flows" />
                    <Metric icon={Search} label="Focus" value="Business impact" />
                    <Metric icon={Layers} label="Style" value="Minimal & clean" />
                  </div>

                  <div className="mt-5 rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-white/0 p-4">
                    <div className="text-xs text-white/60">Featured stack</div>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {["n8n", "Airtable", "Gmail", "Google Drive", "Zendesk", "Slack", "AI Agents"].map(
                        (x) => (
                          <Pill key={x}>{x}</Pill>
                        )
                      )}
                    </div>
                  </div>

                  <div className="mt-5 text-xs text-white/50">
                    Replace this card with your portrait or a product screenshot (optional).
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Tools */}
          <Section
            id="tools"
            eyebrow="Interactive"
            title="Try My AI Tools"
            subtitle="Mini demos (placeholder UI). Later you can connect each card to your real n8n webhook or API endpoint."
          >
            <div className="grid gap-4 md:grid-cols-3">
              {tools.map((t) => (
                <ToolCard key={t.id} t={t} onTry={onTry} />
              ))}
            </div>
          </Section>

          {/* Projects */}
          <div className="py-14" />
          <Section
            id="projects"
            eyebrow="Proof of work"
            title="Project Showcase"
            subtitle="Automation systems across lead gen, support, and content. Swap the links with your real case studies."
          >
            <div className="grid gap-4 md:grid-cols-2">
              {projects.map((p) => (
                <ProjectCard key={p.title} p={p} />
              ))}
            </div>
          </Section>

          {/* CV */}
          <div className="py-14" />
          <Section
            id="cv"
            eyebrow="Curriculum"
            title="CV Snapshot"
            subtitle="Keep this section concise. You can link a full PDF CV from the top button."
          >
            <div className="grid gap-4 lg:grid-cols-3">
              <GlassCard className="lg:col-span-1">
                <div className="text-sm font-semibold">Core Skills</div>
                <div className="mt-4 space-y-3">
                  {skills.map((s) => (
                    <div key={s.text} className="flex items-start gap-3">
                      <div className="rounded-xl border border-white/10 bg-white/5 p-2 backdrop-blur-md">
                        <s.icon className="h-4 w-4 text-white/80" />
                      </div>
                      <div className="text-sm text-white/70">{s.text}</div>
                    </div>
                  ))}
                </div>

                <div className="mt-6">
                  <div className="text-sm font-semibold">Soft Skills</div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {softSkills.map((x) => (
                      <Pill key={x}>{x}</Pill>
                    ))}
                  </div>
                </div>

                <div className="mt-6">
                  <div className="text-sm font-semibold">Languages</div>
                  <div className="mt-3 space-y-2 text-sm text-white/70">
                    <div>Italian — Native</div>
                    <div>English — Fluent</div>
                    <div>Spanish — Intermediate</div>
                  </div>
                </div>
              </GlassCard>

              <GlassCard className="lg:col-span-2">
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <div className="text-sm font-semibold">Experience</div>
                    <div className="mt-4 space-y-5">
                      {experience.map((e) => (
                        <div key={e.role + e.company}>
                          <div className="flex flex-wrap items-baseline justify-between gap-2">
                            <div className="text-sm font-semibold text-white">
                              {e.role} · <span className="text-white/70">{e.company}</span>
                            </div>
                            <div className="text-xs text-white/50">{e.time}</div>
                          </div>
                          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-white/70">
                            {e.bullets.map((b) => (
                              <li key={b}>{b}</li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="text-sm font-semibold">Education</div>
                    <div className="mt-4 space-y-4">
                      {education.map((ed) => (
                        <div key={ed.title} className="rounded-xl border border-white/10 bg-white/5 p-3">
                          <div className="text-sm font-semibold text-white">{ed.title}</div>
                          <div className="mt-1 text-xs text-white/50">{ed.meta}</div>
                          <div className="mt-2 text-sm text-white/70">{ed.desc}</div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-6 rounded-2xl border border-[#ff6a00]/25 bg-[#ff6a00]/10 p-4">
                      <div className="text-sm font-semibold text-white">Value I bring</div>
                      <p className="mt-2 text-sm text-white/80">
                        I connect business goals to practical automation: I prototype quickly,
                        ship reliable workflows, and keep systems maintainable—while caring
                        about UX and brand consistency.
                      </p>
                    </div>
                  </div>
                </div>
              </GlassCard>
            </div>
          </Section>

          {/* Contact */}
          <div className="py-14" />
          <Section
            id="contact"
            eyebrow="Let’s build"
            title="Contact"
            subtitle="Use this form as a placeholder. Connect it to your email service, a webhook or a CRM later."
          >
            <div className="grid gap-4 lg:grid-cols-3">
              <GlassCard className="lg:col-span-1">
                <div className="text-sm font-semibold">Quick links</div>
                <div className="mt-4 space-y-3">
                  <a href="#" className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/80 hover:border-white/20 transition">
                    LinkedIn <ExternalLink className="h-4 w-4" />
                  </a>
                  <a href="#" className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/80 hover:border-white/20 transition">
                    GitHub <ExternalLink className="h-4 w-4" />
                  </a>
                  <a href="#" className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/80 hover:border-white/20 transition">
                    Email <ExternalLink className="h-4 w-4" />
                  </a>
                </div>

                <div className="mt-6">
                  <div className="text-sm font-semibold">Availability</div>
                  <p className="mt-2 text-sm text-white/70">
                    (Placeholder) Open to remote roles and project-based collaborations.
                  </p>
                </div>
              </GlassCard>

              <GlassCard className="lg:col-span-2">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    alert("Form submitted (placeholder). Connect to your backend later.");
                  }}
                  className="grid gap-4"
                >
                  <div className="grid gap-4 md:grid-cols-2">
                    <Input label="Name" placeholder="Elia Stellati" value={""} onChange={() => {}} />
                    <Input label="Email" placeholder="you@email.com" type="email" value={""} onChange={() => {}} />
                  </div>
                  <Input
                    label="Subject"
                    placeholder="How can we collaborate?"
                    value={""}
                    onChange={() => {}}
                  />
                  <TextArea
                    label="Message"
                    placeholder="Tell me what you’re building and what you need…"
                    value={""}
                    onChange={() => {}}
                  />
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="text-xs text-white/50">
                      By sending, you agree to be contacted back. (Placeholder text)
                    </div>
                    <button
                      type="submit"
                      className="inline-flex items-center gap-2 rounded-xl bg-[#ff6a00] px-4 py-2 text-sm font-semibold text-black hover:brightness-110 transition"
                    >
                      Send message <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </form>
              </GlassCard>
            </div>
          </Section>

          {/* Footer */}
          <footer className="mt-16 border-t border-white/10 bg-[#0b0d10]/60">
            <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
              <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
                <div>
                  <div className="text-sm font-semibold">Elia Stellati</div>
                  <div className="mt-1 text-xs text-white/60">
                    Minimal glass CV + portfolio · Built for speed & clarity
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <a
                    href="https://www.linkedin.com/in/elia-stellati/" target="_blank"
                    className="rounded-xl border border-white/10 bg-white/5 p-2 text-white/70 hover:text-white hover:border-white/20 transition"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="h-4 w-4" />
                  </a>
                  <a
                    href="mailto:eliastellatibvb@gmail.com"
                    className="rounded-xl border border-white/10 bg-white/5 p-2 text-white/70 hover:text-white hover:border-white/20 transition"
                    aria-label="Email"
                  >
                    <Mail className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>
          </footer>
        </main>
      </div>

      {/* Tool modal */}
      <Modal
        open={!!toolModal}
        title={toolModal?.name}
        onClose={() => setToolModal(null)}
      >
        <div className="space-y-4">
          <div className="text-sm text-white/70">{toolModal?.demo}</div>
          <TextArea
            label="Input"
            placeholder={toolModal?.placeholder}
            value={toolInput}
            onChange={setToolInput}
          />
          <div className="flex items-center gap-3">
            <button
              onClick={runDemo}
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white hover:border-white/20 transition"
            >
              Run demo <ArrowRight className="h-4 w-4" />
            </button>
            <div className="text-xs text-white/50">
              Input is sent to a demo API endpoint (no personal data stored)
            </div>
          </div>
          <label className="block">
            <div className="mb-2 text-xs font-medium text-white/70">Output</div>
            <pre className="max-h-56 overflow-auto rounded-xl border border-white/10 bg-black/40 p-3 text-xs text-white/80">
              {toolOutput || "(Run the demo to see output)"}
            </pre>
          </label>
        </div>
      </Modal>

      {/* Small global styles */}
      <style>{`
        html { scroll-behavior: smooth; }
        ::selection { background: rgba(255,106,0,0.35); }
      `}</style>
    </div>
  );
}


