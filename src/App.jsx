import React, { useEffect, useMemo, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { motion } from "framer-motion";
import { ShaderGradientCanvas, ShaderGradient } from "@shadergradient/react";
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
  BadgeCheck,
  Layers,
  Check,
  ChevronRight,
  X,
  Play,
  Pause,
  Download,
  Cpu,
} from "lucide-react";

// ----
// CV / Portfolio — Minimal Glass w/ Orange Accent
// - Single-file React component
// - TailwindCSS required
// - Uses lucide-react + framer-motion
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
const SerifAccent = ({ children, className }) => (
  <span
    className={cn("italic text-[#ff6a00]", className)}
    style={{ fontFamily: "Fraunces, ui-serif, Georgia, serif" }}
  >
    {children}
  </span>
);

const Section = ({ id, eyebrow, title, subtitle, children }) => (
  <section id={id} className="scroll-mt-28 pt-16 sm:pt-20">
    <div className="mx-auto max-w-6xl px-4 sm:px-6">
      <div className="mb-8 flex flex-col gap-3">
        {eyebrow ? (
          <h3 className="text-xs sm:text-sm font-semibold tracking-[0.22em] uppercase text-white/75">
            {eyebrow}
          </h3>
        ) : null}

        <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-white">
          {title}
        </h2>

        {subtitle ? (
          <p className="max-w-3xl text-[15px] leading-relaxed text-white/85 sm:text-base">
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
      "rounded-2xl border border-white/15 bg-white/[0.06] p-6 backdrop-blur-xl",
      "ring-1 ring-white/10",
      "shadow-[0_18px_55px_rgba(0,0,0,0.35)]",
      "transition duration-200 will-change-transform",
      "hover:-translate-y-1 hover:bg-white/[0.075] hover:shadow-[0_26px_80px_rgba(0,0,0,0.45)]",
      className
    )}
  >
    {children}
  </div>
);



const GradientBlob = ({ className }) => (
  <div
    className={cn(
      "pointer-events-none absolute h-72 w-72 rounded-full blur-3xl opacity-60",
      className
    )}
  />
);

const ShaderBackground = () => (
  <div className="fixed inset-0 z-0">
    <ShaderGradientCanvas
      style={{ position: "absolute", inset: 0 }}
      pixelDensity={1.25}
      fov={45}
    >
     <ShaderGradient
  animate="off"
  axesHelper="on"
  bgColor1="#000000"
  bgColor2="#000000"
  brightness={0.9}
  cAzimuthAngle={180}
  cDistance={2.9}
  cPolarAngle={115}
  cameraZoom={1}
  color1="#6b360b"
  color2="#fe9859"
  color3="#000000"
  destination="onCanvas"
  embedMode="off"
  envPreset="city"
  format="gif"
  fov={45}
  frameRate={10}
  gizmoHelper="hide"
  grain="on"
  lightType="3d"
  pixelDensity={1}
  positionX={-0.5}
  positionY={0.1}
  positionZ={0}
  range="disabled"
  rangeEnd={40}
  rangeStart={0}
  reflection={0.1}
  rotationX={0}
  rotationY={0}
  rotationZ={235}
  shader="defaults"
  type="waterPlane"
  uAmplitude={0}
  uDensity={1.1}
  uFrequency={5.5}
  uSpeed={0.1}
  uStrength={2.4}
  uTime={0.2}
  wireframe={false}
  zoomOut={false}
/>
    </ShaderGradientCanvas>

    {/* subtle vignette so text stays readable */}
    <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/35 via-black/10 to-black/55" />

    {/* film grain overlay */}
    <div
      className="pointer-events-none absolute inset-0 opacity-[0.14] mix-blend-overlay"
      style={{
        backgroundImage:
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='220' height='220'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='220' height='220' filter='url(%23n)' opacity='.55'/%3E%3C/svg%3E\")",
      }}
    />
  </div>
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
      <div className="text-xs text-white/60">{label}</div>
      <div className="mt-0.5 text-sm font-semibold">{value}</div>
    </div>
  </div>
);

const AppIcon = ({ children }) => (
  <div
    className={cn(
      "shrink-0 relative grid place-items-center",
      "h-11 w-11 rounded-2xl",
      "border border-white/15 bg-white/[0.08] backdrop-blur-md",
      "shadow-[0_12px_30px_rgba(0,0,0,0.35)]",
      "ring-1 ring-white/10"
    )}
  >
    <span className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-b from-white/10 to-transparent" />
    <span className="relative">{children}</span>
  </div>
);


const Feature = ({ icon: Icon, title, desc }) => (
  <div className="flex items-start gap-4">
    <div
      className={cn(
        "shrink-0 grid place-items-center",
        "h-11 w-11 rounded-2xl", // apple-ish rounding
        "border border-white/15 bg-white/[0.08] backdrop-blur-md",
        "shadow-[0_12px_30px_rgba(0,0,0,0.35)]",
        "ring-1 ring-white/10"
      )}
    >
      <Icon className="h-[18px] w-[18px] text-white/85" />
    </div>

    <div className="min-w-0">
      <div className="text-sm font-semibold">{title}</div>
      <div className="mt-1 text-sm text-white/70">{desc}</div>
    </div>
  </div>
);


const Stat = ({ value, label }) => (
  <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 backdrop-blur-xl">
    <div className="text-xl font-semibold">{value}</div>
    <div className="mt-1 text-xs text-white/60">{label}</div>
  </div>
);

const Chip = ({ children }) => (
  <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
    {children}
  </span>
);

const ProjectCard = ({ title, desc, tags, bullets, linkLabel = "View" }) => (
  <GlassCard className="group relative overflow-hidden border-white/15 bg-white/[0.06] p-7 shadow-[0_20px_60px_rgba(0,0,0,0.35)]">

    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition">
      <div className="absolute -left-20 -top-20 h-48 w-48 rounded-full bg-[#ff6a00]/20 blur-3xl" />
      <div className="absolute -right-20 -bottom-20 h-48 w-48 rounded-full bg-white/10 blur-3xl" />
    </div>

    <div className="relative">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-lg font-semibold">{title}</div>
          <p className="mt-2 text-sm text-white/70">{desc}</p>
        </div>
        <a
          href="#"
          className="inline-flex items-center gap-1 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-white/80 backdrop-blur-md hover:border-white/20 transition"
        >
          {linkLabel} <ArrowRight className="h-4 w-4" />
        </a>
      </div>

      {tags?.length ? (
        <div className="mt-4 flex flex-wrap gap-2">
          {tags.map((t) => (
            <Chip key={t}>{t}</Chip>
          ))}
        </div>
      ) : null}

      {bullets?.length ? (
        <ul className="mt-4 space-y-2 text-sm text-white/70">
          {bullets.map((b, i) => (
            <li key={i} className="flex gap-2">
              <Check className="mt-0.5 h-4 w-4 text-[#ff6a00]" />
              <span>{b}</span>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  </GlassCard>
);

const ResumeItem = ({ role, company, time, bullets }) => (
  <div className="grid gap-2 rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-xl">
    <div className="flex flex-wrap items-center justify-between gap-2">
      <div>
        <div className="text-sm font-semibold">
          {role} · <span className="text-white/70">{company}</span>
        </div>
        <div className="mt-1 text-xs text-white/60">{time}</div>
      </div>
      <Pill icon={BadgeCheck}>Impact</Pill>
    </div>
    <ul className="mt-1 space-y-2 text-sm text-white/70">
      {bullets.map((b, i) => (
        <li key={i} className="flex gap-2">
          <ChevronRight className="mt-0.5 h-4 w-4 text-[#ff6a00]" />
          <span>{b}</span>
        </li>
      ))}
    </ul>
  </div>
);

const Input = ({ label, ...props }) => (
  <label className="grid gap-2 text-sm">
    <span className="text-white/70">{label}</span>
    <input
      {...props}
      className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2 text-white placeholder:text-white/40 outline-none ring-0 focus:border-[#ff6a00]/50 focus:shadow-[0_0_0_4px_rgba(255,106,0,0.12)] transition"
    />
  </label>
);

const TextArea = ({ label, ...props }) => (
  <label className="grid gap-2 text-sm">
    <span className="text-white/70">{label}</span>
    <textarea
      {...props}
      className="min-h-[120px] resize-y rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2 text-white placeholder:text-white/40 outline-none ring-0 focus:border-[#ff6a00]/50 focus:shadow-[0_0_0_4px_rgba(255,106,0,0.12)] transition"
    />
  </label>
);

const Modal = ({ open, title, onClose, children }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[60] grid place-items-center p-4">
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative w-full max-w-3xl overflow-hidden rounded-2xl border border-white/10 bg-[#0b0d10]/80 shadow-2xl backdrop-blur-xl">
        <div className="flex items-center justify-between gap-3 border-b border-white/10 px-5 py-4">
          <div className="text-sm font-semibold">{title}</div>
          <button
            onClick={onClose}
            className="rounded-xl border border-white/10 bg-white/5 p-2 text-white/80 hover:border-white/20 hover:text-white transition"
            aria-label="Close modal"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="p-5">{children}</div>
      </div>
    </div>
  );
};

export default function CVPortfolioGlass() {
  const [toolModal, setToolModal] = useState(null);
  const [toolInput, setToolInput] = useState("");
  const [toolOutput, setToolOutput] = useState("");

  const [sessionId] = useState(() => `session-${Date.now()}`);
const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
  // 1) carica CSS della chat
  const css = document.createElement("link");
  css.rel = "stylesheet";
  css.href = "https://cdn.jsdelivr.net/npm/@n8n/chat/dist/style.css";
  document.head.appendChild(css);

  // 2) carica la libreria e crea la chat
  let cleanup = null;

  import("https://cdn.jsdelivr.net/npm/@n8n/chat/dist/chat.bundle.es.js")
    .then(({ createChat }) => {
      cleanup = createChat({
        webhookUrl:
          "/api/n8n-chat",
      });
    })
    .catch(console.error);

  // cleanup (se supportato)
  return () => {
    css.remove();
    if (typeof cleanup === "function") cleanup();
  };
}, []);


  const TOOL_ENDPOINTS = {
  "lead-scorer": "/api/lead-qualifier",
  // in futuro:
   "content-brief": "/api/content-brief",
  // "doc-bot": "/api/doc-bot",
};


  const tools = useMemo(
    () => [
      {
        id: "lead-scorer",
        name: "Lead Qualifier",
        icon: ShieldCheck,
        demo:
          "Paste a lead description and get a quick score + next steps (placeholder).",
        placeholder: "e.g. 'SaaS founder, 10k MRR, wants outbound system…'",
      },
      {
        id: "content-brief",
        name: "Content Brief",
        icon: FileText,
        demo:
          "Turn a topic into a structured brief: angle, outline, SEO notes (placeholder).",
        placeholder: "e.g. 'AI automation for small businesses'",
      },
      {
         id: "gdpr-assistant", // 👈 NUOVO
      name: "GDPR Assistant",
      icon: ShieldCheck,
      demo: "Ask questions about GDPR compliance. Powered by RAG + Claude AI.",
      placeholder: "e.g. 'What are personal data under GDPR?'",
      isChat: true, // 👈 Flag per mostrare UI diversa
      },
    ],
    []
  );

  const skills = [
    "Automation (Zapier/Make/n8n)",
    "LLM apps",
    "Prompting",
    "RAG basics",
    "APIs",
    "Webhooks",
    "Python",
    "TypeScript",
    "React",
    "Tailwind",
    "Notion",
    "Airtable",
    "GSheets",
  ];

  const projects = [
    {
      title: "Lead Qualification Pipeline",
      desc: "Score inbound leads, enrich data, route to CRM, and generate a next-step email draft.",
      tags: ["Automation", "CRM", "LLMs"],
      bullets: [
        "Reduced manual triage time by ~70% (placeholder).",
        "Auto-tags, assigns owner, and generates follow-ups.",
        "Slack alerts + weekly summary dashboard.",
      ],
    },
    {
      title: "AI Content Ops System",
      desc: "Brief → outline → draft → review checklist → publish, with versioned Notion workflows.",
      tags: ["Notion", "Workflow", "SEO"],
      bullets: [
        "Standardized briefs and reduced revision loops.",
        "Reusable templates + tone guardrails.",
        "Pluggable research + citations step (placeholder).",
      ],
    },
    {
      title: "Internal Knowledge Bot",
      desc: "RAG-style assistant that answers questions from docs with sources (placeholder).",
      tags: ["RAG", "Docs", "Search"],
      bullets: [
        "Improved discovery of SOPs and policies.",
        "Permission-aware access layer (placeholder).",
        "Citations for accountability.",
      ],
    },
  ];

  const experience = [
    {
      role: "AI Automation Specialist",
      company: "Freelance / Agency",
      time: "2023 — Present",
      bullets: [
        "Built end-to-end automations that connect CRM, email, docs, and internal tools.",
        "Designed “human-in-the-loop” flows to keep quality high while scaling output.",
        "Shipped quick prototypes → hardened into maintainable systems.",
      ],
    },
    {
      role: "Ops & Systems Builder",
      company: "Startup Team",
      time: "2021 — 2023",
      bullets: [
        "Implemented lightweight analytics + reporting loops for leadership.",
        "Reduced tool sprawl by standardizing on a single source of truth.",
        "Created onboarding SOPs and training docs for non-technical teams.",
      ],
    },
  ];

 const handleFakeToolRun = async () => {
  const trimmed = toolInput.trim();
  if (!trimmed) {
    setToolOutput("Please enter a question first.");
    return;
  }

  setIsLoading(true);

  // ===== GDPR ASSISTANT - API VERA =====
  if (toolModal?.id === "gdpr-assistant") {
    try {
      const res = await fetch("/api/gdpr-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chatInput: trimmed,
          sessionId: sessionId,
        }),
      });

      const data = await res.json();

      if (data.ok && data.response) {
        setToolOutput(data.response);
      } else {
        setToolOutput("❌ Error: " + (data.error || "Unknown error"));
      }
    } catch (e) {
      console.error("GDPR Chat Error:", e);
      setToolOutput("❌ Connection error. Please try again.");
    } finally {
      setIsLoading(false);
    }
    return;
  }

  // ===== LEAD SCORER =====
  if (toolModal?.id === "lead-scorer") {
    try {
      const res = await fetch("/api/lead-qualifier", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          leadDescription: trimmed,  // ← CAMBIATO
          // Aggiungi altri campi se necessario
        }),
      });

      const data = await res.json();
      
      // Mostra il risultato formattato
      if (data.upstreamStatus === 200) {
        setToolOutput(JSON.stringify(data, null, 2));
      } else {
        setToolOutput("❌ Error: " + JSON.stringify(data, null, 2));
      }
    } catch (e) {
      console.error("Lead Scorer Error:", e);
      setToolOutput("❌ Connection error: " + String(e));
    } finally {
      setIsLoading(false);
    }
    return;
  }

  // ===== CONTENT BRIEF =====
  if (toolModal?.id === "content-brief") {
    try {
      const res = await fetch("/api/content-brief", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topic: trimmed,  // ← CAMBIATO
          // Aggiungi altri campi se necessario
        }),
      });

      const data = await res.json();
      
      // Se la risposta è testo, mostrala; altrimenti JSON
      if (typeof data === 'string') {
        setToolOutput(data);
      } else {
        setToolOutput(JSON.stringify(data, null, 2));
      }
    } catch (e) {
      console.error("Content Brief Error:", e);
      setToolOutput("❌ Connection error: " + String(e));
    } finally {
      setIsLoading(false);
    }
    return;
  }

  // ===== FALLBACK =====
  await new Promise((r) => setTimeout(r, 800));
  setToolOutput("Tool not configured yet.");
  setIsLoading(false);
};

  return (
    <div className="relative min-h-screen bg-transparent text-white">
      <ShaderBackground />

      <div className="relative z-10 overflow-hidden">
        {/* Blobs (stronger presence lower on the page) */}
        <div className="pointer-events-none absolute inset-0 z-0">
          <GradientBlob className="left-[-6rem] top-[-6rem] bg-[#ff6a00]/25" />
          <GradientBlob className="right-[-5rem] top-[10rem] bg-white/10" />
          <GradientBlob className="left-[20%] top-[40rem] bg-[#ff6a00]/15" />
          <GradientBlob className="left-[10%] top-[70rem] bg-[#ff6a00]/14" />
          <GradientBlob className="right-[12%] top-[110rem] bg-[#ff6a00]/12" />
          <GradientBlob className="left-[35%] top-[155rem] bg-white/10" />
        </div>

        <div className="relative z-10">
          {/* Top nav */}
          {/* Top nav (glass) */}
<header className="sticky top-4 z-50">
  <div className="mx-auto max-w-6xl px-4 sm:px-6">
    <div
      className={cn(
        "flex items-center justify-between px-4 py-3 sm:px-5",
        "rounded-2xl border border-white/10",
        "bg-white/[0.06] backdrop-blur-xl",
        "shadow-[0_10px_35px_rgba(0,0,0,0.35)]",
        "ring-1 ring-white/10"
      )}
    >
      <a href="#top" className="flex items-center gap-2">
        <div className="h-8 w-8 rounded-xl bg-white/10 ring-1 ring-white/10 backdrop-blur-md" />
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
          className="hidden rounded-xl border border-white/15 bg-white/10 px-4 py-2 text-sm text-white/80 backdrop-blur-md hover:border-white/25 hover:bg-white/15 transition sm:inline-flex"
        >
          Let’s talk
        </a>

        <a
          href="/Elia-Stellati-CV.pdf"
  download="Elia-Stellati-CV.pdf"
  className="inline-flex items-center gap-2 rounded-xl bg-[#ff6a00] px-4 py-2 text-sm font-semibold text-black hover:brightness-110 hover:text-white transition"
> 
          Download CV <ArrowRight className="h-3.5 w-3.5" />
        </a>
      </div>
    </div>
  </div>
</header>


          <main id="top">
            {/* Hero */}
            <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
              <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
                <div>
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80 backdrop-blur-xl"
                  >
                    <Sparkles className="h-3.5 w-3.5" />
                    I Made This Website Using ShaderGradient + React plus n8n Workflows
                  </motion.div>

                  <motion.h1
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45, delay: 0.05 }}
                    className="mt-4 text-balance text-4xl font-regular leading-tight sm:text-5xl"
                  >
                    I build <span className="font-serif italic tracking-tight text-[#ff6a00] drop-shadow-[0_10px_25px_rgba(255,106,0,0.25)]">AI-powered</span>{" "}
                    workflows that turn chaos into systems.
                  </motion.h1>

                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45, delay: 0.1 }}
                    className="mt-4 max-w-xl text-pretty text-white/70"
                  >
                    Automation specialist and graphic designer focused on practical, shippable tools:
                    lead scoring, content operations, internal knowledge bots,
                    and clean dashboards.
                  </motion.p>

                  <div className="mt-6 flex flex-wrap items-center gap-3">
                    <PrimaryButton href="#contact">
                      Work with me <ArrowRight className="h-4 w-4" />
                    </PrimaryButton>
                    <a
                      href="#projects"
                      className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80 backdrop-blur-md hover:border-white/20 hover:text-white transition"
                    >
                      View projects <ArrowRight className="h-4 w-4" />
                    </a>
                    <a
                     href="/Elia-Stellati-CV.pdf"
  download="Elia-Stellati-CV.pdf"
                      className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80 backdrop-blur-md hover:border-white/20 transition"
                    >
                      Download CV <Download className="h-4 w-4" />
                    </a>
                  </div>

                  <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3">
                    <Stat value="10+" label="Automations shipped" />
                    <Stat value="3x" label="Faster ops cycles" />
                    <Stat value="24/7" label="Always-on systems" />
                  </div>

                  <div className="mt-6 flex flex-wrap gap-2">
                    <Pill icon={Workflow}>Workflows</Pill>
                    <Pill icon={Bot}>LLM tools</Pill>
                    <Pill icon={Cpu}>APIs</Pill>
                    <Pill icon={Layers}>Dashboards</Pill>
                  </div>
                </div>

                <GlassCard className="relative">
                  <div className="absolute inset-0 -z-10">
                    <div className="absolute left-[-5rem] top-[-5rem] h-48 w-48 rounded-full bg-[#ff6a00]/20 blur-3xl" />
                    <div className="absolute right-[-5rem] bottom-[-5rem] h-48 w-48 rounded-full bg-white/10 blur-3xl" />
                  </div>

                  <div className="flex flex-col gap-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm text-white/60">Current focus</div>
                        <div className="mt-1 text-lg font-semibold">
                          AI toolkits for ops teams
                        </div>
                      </div>
                      <div className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-white/80">
                        Available
                      </div>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-2">
                      <Metric icon={Timer} label="Avg delivery" value="1–2 weeks" />
                      <Metric icon={ShieldCheck} label="Reliability" value="Fail-safes" />
                      <Metric icon={Wand2} label="Craft" value="Polished UX" />
                      <Metric icon={BadgeCheck} label="Quality" value="Human review" />
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                      <div className="text-sm font-semibold">Stack</div>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {skills.slice(0, 10).map((s) => (
                          <Chip key={s}>{s}</Chip>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-3">
                      <a
                        href="#tools"
                        className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80 backdrop-blur-md hover:border-white/20 transition"
                      >
                        <Play className="h-4 w-4" /> Tool demos
                      </a>
                      <a
                        href="#contact"
                        className="inline-flex items-center gap-2 rounded-xl bg-[#ff6a00] px-4 py-2 text-sm font-semibold text-black hover:brightness-110 transition"
                      >
                        <Mail className="h-4 w-4" /> Contact
                      </a>
                    </div>
                  </div>
                </GlassCard>
              </div>
            </div>

            {/* What I do */}
           <Section
  id="about"
  eyebrow={
    <>
      <SerifAccent>What</SerifAccent> I do
    </>
  }
  title="Systems that run themselves (almost)."
  subtitle={
    <>
      I build automation + AI layers that remove <SerifAccent>busywork</SerifAccent>,
      standardize <SerifAccent>decisions</SerifAccent>, and keep humans{" "}
      <SerifAccent>in control</SerifAccent>.
    </>
  }
>
  {/* Mobile: swipeable cards */}
  <div className="md:hidden -mx-4 px-4">
    <div className="flex gap-4 overflow-x-auto pb-2 snap-x snap-mandatory [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
      <div className="snap-start min-w-[86%]">
        <GlassCard className="relative overflow-hidden">
          <div className="pointer-events-none absolute -left-16 -top-16 h-40 w-40 rounded-full bg-[#ff6a00]/20 blur-3xl" />
          <Feature
            icon={Workflow}
            title="Workflow design"
            desc="Map the process, define rules, and automate the boring parts while keeping review points."
          />
        </GlassCard>
      </div>

      <div className="snap-start min-w-[86%]">
        <GlassCard className="relative overflow-hidden">
          <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-white/10 blur-3xl" />
          <Feature
            icon={Bot}
            title="LLM tools"
            desc="Small, focused AI utilities: scoring, drafting, summarizing, and QA with guardrails."
          />
        </GlassCard>
      </div>

      <div className="snap-start min-w-[86%]">
        <GlassCard className="relative overflow-hidden">
          <div className="pointer-events-none absolute -left-16 -bottom-16 h-40 w-40 rounded-full bg-[#ff6a00]/16 blur-3xl" />
          <Feature
            icon={ShieldCheck}
            title="Reliability"
            desc="Monitoring, retries, logs, and human-in-the-loop fallbacks—so it doesn’t break silently."
          />
        </GlassCard>
      </div>
    </div>

    <div className="mt-3 text-xs text-white/55">Tip: swipe to see more →</div>
  </div>

  {/* Desktop: clean 3-up grid */}
  <div className="hidden md:grid gap-6 lg:grid-cols-3">
    <GlassCard className="relative overflow-hidden">
      <div className="pointer-events-none absolute -left-20 -top-20 h-52 w-52 rounded-full bg-[#ff6a00]/18 blur-3xl" />
      <Feature
        icon={Workflow}
        title="Workflow design"
        desc="Map the process, define rules, and automate the boring parts while keeping review points."
      />
    </GlassCard>

    <GlassCard className="relative overflow-hidden">
      <div className="pointer-events-none absolute -right-20 -top-20 h-52 w-52 rounded-full bg-white/10 blur-3xl" />
      <Feature
        icon={Bot}
        title="LLM tools"
        desc="Small, focused AI utilities: scoring, drafting, summarizing, and QA with guardrails."
      />
    </GlassCard>

    <GlassCard className="relative overflow-hidden">
      <div className="pointer-events-none absolute -left-20 -bottom-20 h-52 w-52 rounded-full bg-[#ff6a00]/14 blur-3xl" />
      <Feature
        icon={ShieldCheck}
        title="Reliability"
        desc="Monitoring, retries, logs, and human-in-the-loop fallbacks—so it doesn’t break silently."
      />
    </GlassCard>
  </div>
</Section>


            {/* Tools */}
            <Section
              id="tools"
              eyebrow={<><SerifAccent>AI</SerifAccent> Tools</>}
              title="Tiny demos (wired to placeholder endpoints)."
              subtitle="Click a tool to open a modal. You can connect these to your backend / functions later."
            >
              <div className="grid gap-6 md:grid-cols-3">
                {tools.map((t, idx) => (
                  <motion.button
                    key={t.id}
                    onClick={() => {
                      setToolModal(t);
                      setToolInput("");
                      setToolOutput("");
                    }}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.99 }}
                    className="text-left focus:outline-none"
                  >
                    <GlassCard className="h-full">
                      <div className="flex items-start justify-between gap-4">
  <div className="flex items-start gap-4">
    <AppIcon>
      <t.icon className="h-[18px] w-[18px] text-white/85" />
    </AppIcon>

    <div className="min-w-0">
      <div className="text-sm font-semibold">{t.name}</div>
      <p className="mt-2 text-sm text-white/70">{t.demo}</p>
    </div>
  </div>

  <div className="shrink-0 rounded-xl border border-white/10 bg-white/5 p-2 text-white/70 backdrop-blur-md">
    <ArrowRight className="h-4 w-4" />
  </div>
</div>


                      <div className="mt-5 flex flex-wrap gap-2">
                        <Pill icon={Sparkles}>Demo</Pill>
                        <Pill icon={ShieldCheck}>Guardrails</Pill>
                        <Pill icon={Timer}>Fast</Pill>
                      </div>
                    </GlassCard>
                  </motion.button>
                ))}
              </div>
            </Section>

            {/* Projects */}
            <Section
              id="projects"
              eyebrow={<>My <SerifAccent>Projects</SerifAccent></>}
              title="Selected work"
              subtitle="Examples of systems I build: scalable, maintainable, and easy for teams to use."
            >
              <div className="grid gap-6 lg:grid-cols-3">
                {projects.map((p) => (
                  <ProjectCard key={p.title} {...p} />
                ))}
              </div>
            </Section>

            {/* CV */}
            <Section
              id="cv"
              eyebrow="CV"
              title="Experience"
              subtitle="Short and impact-focused. Swap in your real roles and metrics."
            >
              <div className="grid gap-6 lg:grid-cols-2">
                <div className="grid gap-4">
                  {experience.map((e) => (
                    <ResumeItem key={e.role} {...e} />
                  ))}
                </div>

                <GlassCard>
                  <div className="text-sm font-semibold">Highlights</div>
                  <div className="mt-4 grid gap-4">
                    <Feature
                      icon={BadgeCheck}
                      title="Outcome-driven"
                      desc="I optimize for measurable wins: time saved, fewer errors, faster cycles."
                    />
                    <Feature
                      icon={ShieldCheck}
                      title="Maintainable builds"
                      desc="Clear docs + modular components so you can extend the system later."
                    />
                    <Feature
                      icon={Sparkles}
                      title="Polished delivery"
                      desc="Clean UX, quick feedback loops, and pragmatic defaults."
                    />
                  </div>

                  <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                    <div className="text-sm font-semibold">Skills</div>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {skills.map((s) => (
                        <Chip key={s}>{s}</Chip>
                      ))}
                    </div>
                  </div>
                </GlassCard>
              </div>
            </Section>

            {/* Contact */}
            <Section
              id="contact"
              eyebrow="CONTACT"
              title="Let’s build something useful."
              subtitle="Send a message (placeholder form) or use the links."
            >
              <div className="grid gap-4 lg:grid-cols-3">
                <GlassCard className="lg:col-span-1">
                  <div className="text-sm font-semibold">Quick links</div>
                  <div className="mt-4 space-y-3">
                    <a
                      href="#"
                      className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/80 hover:border-white/20 transition"
                    >
                      LinkedIn <ExternalLink className="h-4 w-4" />
                    </a>
                    <a
                      href="#"
                      className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/80 hover:border-white/20 transition"
                    >
                      GitHub <ExternalLink className="h-4 w-4" />
                    </a>
                    <a
                      href="#"
                      className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/80 hover:border-white/20 transition"
                    >
                      Email <ExternalLink className="h-4 w-4" />
                    </a>
                  </div>

                  <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                    <div className="text-sm font-semibold">Availability</div>
                    <p className="mt-2 text-sm text-white/70">
                      Taking on small-to-medium automation builds. (Placeholder.)
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      <Pill icon={Timer}>1–2 weeks</Pill>
                      <Pill icon={ShieldCheck}>Reliable</Pill>
                    </div>
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
                      <Input
                        label="Name"
                        placeholder="Elia Stellati"
                        value={""}
                        onChange={() => {}}
                      />
                      <Input
                        label="Email"
                        placeholder="you@email.com"
                        type="email"
                        value={""}
                        onChange={() => {}}
                      />
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
                        Send <ArrowRight className="h-4 w-4" />
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
                      href="https://www.linkedin.com/in/elia-stellati/"
                      target="_blank"
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
      </div>

      {/* Tool modal */}
      {/* Tool modal */}
<Modal
  open={!!toolModal}
  title={toolModal?.name}
  onClose={() => {
    setToolModal(null);
    setToolInput("");
    setToolOutput("");
  }}
>
  {toolModal?.isChat ? (
    // ===== GDPR CHAT UI =====
    <div className="space-y-4">
      <div className="text-sm text-white/70">{toolModal?.demo}</div>

      {/* Chat history */}
      <div className="max-h-96 overflow-y-auto space-y-3 rounded-xl border border-white/10 bg-black/40 p-4">
        {isLoading ? (
  <div className="flex items-center gap-2 text-sm text-white/70">
    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/20 border-t-[#ff6a00]"></div>
    Thinking...
  </div>
) : !toolOutput ? (
  <div className="text-sm text-white/40">
    💬 Ask a question about GDPR to get started.
  </div>
) : (
          <div className="space-y-3">
            {/* User message */}
            <div className="flex justify-end">
              <div className="max-w-[80%] rounded-xl bg-[#ff6a00]/20 border border-[#ff6a00]/30 px-4 py-2 text-sm">
                {toolInput}
              </div>
            </div>

            {/* Bot response */}
            <div className="flex justify-start">
              <div className="max-w-[85%] rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm leading-relaxed">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    h1: (p) => <h1 className="mb-2 text-base font-semibold" {...p} />,
                    h2: (p) => <h2 className="mt-3 mb-1 text-sm font-semibold" {...p} />,
                    ul: (p) => <ul className="ml-4 list-disc space-y-1 my-2" {...p} />,
                    li: (p) => <li {...p} />,
                    strong: (p) => <strong className="font-semibold text-white" {...p} />,
                    code: (p) => (
                      <code className="rounded bg-white/10 px-1 py-0.5" {...p} />
                    ),
                  }}
                >
                  {toolOutput}
                </ReactMarkdown>

                {/* Sources (se disponibili) */}
                {toolOutput.includes("📚") && (
                  <div className="mt-3 pt-3 border-t border-white/10 text-xs text-white/60">
                    Sources from GDPR Regulation 2016/679
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input area */}
      <div className="flex gap-2">
        <input
          type="text"
          value={toolInput}
          onChange={(e) => setToolInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleFakeToolRun();
            }
          }}
          placeholder={toolModal?.placeholder}
          className="flex-1 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-white placeholder:text-white/40 outline-none focus:border-[#ff6a00]/50 focus:shadow-[0_0_0_4px_rgba(255,106,0,0.12)] transition"
        />
        <button
          onClick={handleFakeToolRun}
          disabled={!toolInput.trim() || isLoading}
          className="shrink-0 inline-flex items-center gap-2 rounded-xl bg-[#ff6a00] px-4 py-2 text-sm font-semibold text-black hover:brightness-110 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Send <Play className="h-4 w-4" />
        </button>
      </div>

      {/* Suggested questions */}
      {!toolOutput && (
        <div className="flex flex-wrap gap-2">
          <div className="text-xs text-white/50">Try asking:</div>
          {[
            "What are personal data?",
            "What are my rights as a user?",
            "What are the penalties for violations?",
          ].map((q) => (
            <button
              key={q}
              onClick={() => {
                setToolInput(q);
                setTimeout(handleFakeToolRun, 100);
              }}
              className="text-xs rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-white/70 hover:border-[#ff6a00]/30 hover:bg-[#ff6a00]/10 transition"
            >
              {q}
            </button>
          ))}
        </div>
      )}
    </div>
  ) : (
    // ===== ORIGINAL TOOL UI (Lead Scorer, Content Brief) =====
    <div className="space-y-4">
      <div className="text-sm text-white/70">{toolModal?.demo}</div>
      <TextArea
        label="Input"
        value={toolInput}
        onChange={(e) => setToolInput(e.target.value)}
        placeholder={toolModal?.placeholder}
      />
      <div className="flex flex-wrap items-center justify-between gap-3">
        <button
          onClick={handleFakeToolRun}
          className="inline-flex items-center gap-2 rounded-xl bg-[#ff6a00] px-4 py-2 text-sm font-semibold text-black hover:brightness-110 transition"
        >
          Run <Play className="h-4 w-4" />
        </button>
        <button
          onClick={() => {
            setToolInput("");
            setToolOutput("");
          }}
          className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80 hover:border-white/20 transition"
        >
          Clear <Pause className="h-4 w-4" />
        </button>
      </div>

      <label className="grid gap-2">
        <span className="text-sm text-white/70">Output</span>
        <div className="max-h-72 overflow-auto rounded-xl border border-white/10 bg-black/40 p-4 text-xs text-white/80">
          {!toolOutput ? (
            <div className="text-white/40">Output will appear here.</div>
          ) : toolModal?.id === "content-brief" ? (
            <div className="text-sm leading-6">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  h1: (p) => <h1 className="mb-3 text-lg font-semibold" {...p} />,
                  h2: (p) => <h2 className="mt-4 mb-2 text-base font-semibold" {...p} />,
                  ul: (p) => <ul className="ml-5 list-disc space-y-1" {...p} />,
                  li: (p) => <li {...p} />,
                  strong: (p) => <strong className="font-semibold text-white" {...p} />,
                  code: (p) => (
                    <code className="rounded bg-white/10 px-1 py-0.5" {...p} />
                  ),
                }}
              >
                {toolOutput}
              </ReactMarkdown>
            </div>
          ) : (
            <pre className="whitespace-pre-wrap">{toolOutput}</pre>
          )}
        </div>
      </label>
    </div>
  )}
</Modal>

      {/* Small global styles */}
      <style>{`
        html { scroll-behavior: smooth; }
        ::selection { background: rgba(255,106,0,0.35); }
      `}</style>
    </div>
  );
}
