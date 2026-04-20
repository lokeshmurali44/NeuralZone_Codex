"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

const navItems = [
  ["Platform", "#platform"],
  ["Mowack Lite", "#lite"],
  ["Mowack Pro", "#pro"],
  ["Control", "#mission-control"],
  ["Impact", "#impact"]
];

const liteFrames = [
  {
    view: "Front",
    src: "/products/mowack-lite-front.png",
    label: "Autonomy stack",
    copy: "A compact sensing profile for close-range field decisions."
  },
  {
    view: "Side",
    src: "/products/mowack-lite-side.png",
    label: "Rugged mobility",
    copy: "Tracked movement for controlled passes through difficult rows."
  },
  {
    view: "Top",
    src: "/products/mowack-lite-top.png",
    label: "Low center of gravity",
    copy: "Mass sits low and centered for confident slope behavior."
  },
  {
    view: "Rear",
    src: "/products/mowack-lite-rear.png",
    label: "Protected engineering",
    copy: "Critical systems stay contained as the machine works through debris."
  }
];

const heroFrame = {
  view: "Side",
  src: "/products/mowack-lite-hero.png",
  label: "Mowack Lite",
  copy: "Compact autonomous field robot"
};

const proFrames = [
  {
    view: "Front",
    src: "/products/mowack-pro-front.png",
    label: "Flagship presence",
    copy: "A distinctive enclosed machine built to command larger field programs."
  },
  {
    view: "Side",
    src: "/products/mowack-pro-side.png",
    label: "Coverage power",
    copy: "A stable tracked platform for long, repeatable clearing runs."
  },
  {
    view: "Top",
    src: "/products/mowack-pro-top.png",
    label: "Durable architecture",
    copy: "A protected body designed for rough terrain and sustained operation."
  },
  {
    view: "Rear",
    src: "/products/mowack-pro-rear.png",
    label: "Field-ready service",
    copy: "Clean access thinking without compromising the protected shell."
  }
];

const terrainItems = [
  ["Steep slopes", "Stable tracked movement where conventional machines slow down."],
  ["Dense overgrowth", "Consistent clearing through recurring vegetation loads."],
  ["Narrow rows", "Controlled movement around crops, trunks, and tight corridors."],
  ["Labor-heavy maintenance", "Repeatable work that helps crews focus where judgment matters."]
];

const useCases = [
  ["Orchards", "Maintain rows with controlled passes and reduced manual exposure."],
  ["Vineyards", "Navigate tight geometry with precise close-to-crop operation."],
  ["Farmlands", "Clear recurring vegetation across larger working areas."],
  ["Fire breaks", "Reduce fuel loads in difficult, time-sensitive terrain."],
  ["Material handling", "Extend robotic assistance into repeated field movement."]
];

const metrics = [
  { value: 120, suffix: "+", label: "acres cleared" },
  { value: 80, suffix: "%", label: "cost reduction potential" },
  { value: 600, suffix: "+", label: "crew hours saved" },
  { value: 3, suffix: "x", label: "faster recurring operations" }
];

function clampIndex(progress, length) {
  return Math.min(length - 1, Math.max(0, Math.floor(progress * length)));
}

export default function NeuralzomeExperience() {
  const reducedMotion = useReducedMotion();
  const [menuOpen, setMenuOpen] = useState(false);
  const [revealProgress, setRevealProgress] = useState(0);
  const [liteProgress, setLiteProgress] = useState(0);
  const [proProgress, setProProgress] = useState(0);

  const revealRef = useRef(null);
  const revealPinRef = useRef(null);
  const liteRef = useRef(null);
  const litePinRef = useRef(null);
  const proRef = useRef(null);
  const proPinRef = useRef(null);
  const terrainRef = useRef(null);

  const revealFrames = useMemo(() => [...liteFrames, ...proFrames], []);
  const revealFrame = revealFrames[clampIndex(revealProgress, revealFrames.length)];
  const liteFrame = liteFrames[clampIndex(liteProgress, liteFrames.length)];
  const proFrame = proFrames[clampIndex(proProgress, proFrames.length)];

  useEffect(() => {
    if (reducedMotion) return undefined;

    const lenis = new Lenis({
      duration: 1.05,
      smoothWheel: true,
      wheelMultiplier: 0.82
    });
    const raf = (time) => lenis.raf(time * 1000);

    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(raf);
    };
  }, [reducedMotion]);

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 900px) and (prefers-reduced-motion: no-preference)", () => {
      const triggers = [];

      const pinSequence = (section, pin, onUpdate, end = "+=280%") => {
        if (!section || !pin) return;
        triggers.push(
          ScrollTrigger.create({
            trigger: section,
            pin,
            start: "top top",
            end,
            scrub: 0.9,
            anticipatePin: 1,
            onUpdate: (self) => onUpdate(self.progress)
          })
        );
      };

      pinSequence(revealRef.current, revealPinRef.current, setRevealProgress, "+=360%");
      pinSequence(liteRef.current, litePinRef.current, setLiteProgress, "+=300%");
      pinSequence(proRef.current, proPinRef.current, setProProgress, "+=300%");

      gsap.utils.toArray("[data-reveal]").forEach((item) => {
        gsap.fromTo(
          item,
          { autoAlpha: 0, y: 34 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: item,
              start: "top 78%"
            }
          }
        );
      });

      if (terrainRef.current) {
        gsap.utils.toArray(".terrain-line").forEach((line, index) => {
          gsap.fromTo(
            line,
            { autoAlpha: 0.52, x: index % 2 ? 18 : -18 },
            {
              autoAlpha: 1,
              x: 0,
              ease: "power2.out",
              scrollTrigger: {
                trigger: line,
                start: "top 72%",
                end: "bottom 42%",
                scrub: 0.5
              }
            }
          );
        });
      }

      return () => triggers.forEach((trigger) => trigger.kill());
    });

    return () => mm.revert();
  }, []);

  return (
    <main className="nz-site">
      <Navigation menuOpen={menuOpen} setMenuOpen={setMenuOpen} />

      <section id="hero" className="nz-hero">
        <div className="hero-visual" aria-hidden="true">
          <ProductFrame frame={heroFrame} product="lite" priority />
        </div>
        <motion.div
          className="hero-content"
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="eyebrow">Neuralzome</p>
          <h1>Autonomy for Demanding Farm Terrain</h1>
          <p>
            Autonomous field robots designed to mow, clear, and operate across
            steep, rugged agricultural environments.
          </p>
          <div className="button-row">
            <a className="button button-dark" href="#final-cta">
              Book a Demo
            </a>
            <a className="button button-light" href="#platform">
              Explore the Platform
            </a>
          </div>
        </motion.div>
      </section>

      <section id="platform" ref={revealRef} className="sequence-section product-reveal">
        <div ref={revealPinRef} className="sequence-pin">
          <SectionIntro
            eyebrow="Product emergence"
            title="A machine you understand one view at a time."
            copy="Scroll through the robot as if it were being inspected in a quiet product studio."
          />
          <SequenceStage
            frame={revealFrame}
            frames={revealFrames}
            progress={revealProgress}
            product={revealProgress < 0.5 ? "lite" : "pro"}
            label={revealProgress < 0.5 ? "Mowack Lite" : "Mowack Pro"}
          />
        </div>
      </section>

      <section id="terrain" ref={terrainRef} className="terrain-section">
        <div className="terrain-visual" aria-hidden="true">
          <ProductFrame frame={liteFrames[1]} product="lite" />
        </div>
        <div className="terrain-copy" data-reveal>
          <p className="eyebrow">Terrain challenge</p>
          <h2>The field sets the standard.</h2>
          <p>
            Neuralzome is built for recurring work where terrain, vegetation,
            and labor availability make conventional maintenance hard to scale.
          </p>
        </div>
        <div className="terrain-lines">
          {terrainItems.map(([title, copy]) => (
            <article className="terrain-line" key={title}>
              <h3>{title}</h3>
              <p>{copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="lite" ref={liteRef} className="sequence-section chapter chapter-lite">
        <div ref={litePinRef} className="sequence-pin chapter-pin">
          <ProductChapter
            eyebrow="Mowack Lite"
            title="Compact autonomy for precise field work."
            copy="Mowack Lite is the compact enclosed machine for close-range precision, maneuverability, and controlled row operation."
            frame={liteFrame}
            frames={liteFrames}
            progress={liteProgress}
            product="lite"
            stats={[
              ["Precision", "close-range mowing"],
              ["Compact", "row-ready footprint"],
              ["Controlled", "tracked maneuvering"]
            ]}
          />
        </div>
      </section>

      <section id="pro" ref={proRef} className="sequence-section chapter chapter-pro">
        <div ref={proPinRef} className="sequence-pin chapter-pin">
          <ProductChapter
            eyebrow="Mowack Pro"
            title="The flagship machine for bigger field programs."
            copy="Mowack Pro is the open-frame tracked machine for power, coverage, durability, and all-day field presence."
            frame={proFrame}
            frames={proFrames}
            progress={proProgress}
            product="pro"
            stats={[
              ["Power", "heavy clearing runs"],
              ["Coverage", "large-area operation"],
              ["Durability", "protected shell"]
            ]}
          />
        </div>
      </section>

      <section id="mission-control" className="control-section">
        <div className="control-copy" data-reveal>
          <p className="eyebrow">Mission Control</p>
          <h2>More than hardware.</h2>
          <p>
            Plan routes, supervise machines, intervene remotely, and understand
            field performance from one refined operations layer.
          </p>
        </div>
        <MissionControl />
      </section>

      <section id="use-cases" className="use-section">
        <SectionIntro
          eyebrow="Use cases"
          title="Built for work that repeats."
          copy="Five operating environments. One clear platform story."
        />
        <div className="use-list" data-reveal>
          {useCases.map(([title, copy]) => (
            <article key={title}>
              <h3>{title}</h3>
              <p>{copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="impact" className="impact-section">
        <div className="impact-copy" data-reveal>
          <p className="eyebrow">Outcomes</p>
          <h2>Quiet numbers. Real operating value.</h2>
        </div>
        <div className="metric-list">
          {metrics.map((metric) => (
            <MetricCounter key={metric.label} metric={metric} reducedMotion={reducedMotion} />
          ))}
        </div>
      </section>

      <section id="final-cta" className="final-section">
        <div className="final-content" data-reveal>
          <p className="eyebrow">Neuralzome</p>
          <h2>Modernize field operations with autonomous machines built for real terrain.</h2>
          <div className="button-row">
            <a className="button button-dark" href="mailto:info@neuralzome.com">
              Book a Demo
            </a>
            <a className="button button-light" href="mailto:info@neuralzome.com">
              Talk to the Team
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}

function Navigation({ menuOpen, setMenuOpen }) {
  return (
    <header className="site-nav">
      <a className="brand" href="#hero" aria-label="Neuralzome home">
        <span className="brand-mark" />
        <span>NEURALZOME</span>
      </a>
      <nav className="desktop-nav" aria-label="Primary navigation">
        {navItems.map(([label, href]) => (
          <a key={label} href={href}>
            {label}
          </a>
        ))}
      </nav>
      <a className="nav-cta" href="#final-cta">
        Book Demo
      </a>
      <button
        className="menu-toggle"
        type="button"
        aria-expanded={menuOpen}
        aria-controls="mobile-nav"
        onClick={() => setMenuOpen((open) => !open)}
      >
        <span />
        <span />
      </button>
      {menuOpen ? (
        <nav id="mobile-nav" className="mobile-nav" aria-label="Mobile navigation">
          {navItems.map(([label, href]) => (
            <a key={label} href={href} onClick={() => setMenuOpen(false)}>
              {label}
            </a>
          ))}
          <a href="#final-cta" onClick={() => setMenuOpen(false)}>
            Book Demo
          </a>
        </nav>
      ) : null}
    </header>
  );
}

function SectionIntro({ eyebrow, title, copy }) {
  return (
    <div className="section-intro" data-reveal>
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      {copy ? <p>{copy}</p> : null}
    </div>
  );
}

function SequenceStage({ frame, frames, progress, product, label }) {
  return (
    <div className="sequence-stage">
      <div className="sequence-product">
        <ProductFrame frame={frame} product={product} priority />
      </div>
      <div className="sequence-caption" aria-live="polite">
        <span>{label}</span>
        <strong>{frame.view}</strong>
        <p>{frame.label}</p>
      </div>
      <FrameRail frames={frames} progress={progress} />
      <Callout label={frame.label} copy={frame.copy} product={product} />
    </div>
  );
}

function ProductChapter({ eyebrow, title, copy, frame, frames, progress, product, stats }) {
  return (
    <div className="chapter-layout">
      <div className="chapter-copy">
        <p className="eyebrow">{eyebrow}</p>
        <h2>{title}</h2>
        <p>{copy}</p>
        <div className="spec-row">
          {stats.map(([value, label]) => (
            <article key={label}>
              <strong>{value}</strong>
              <span>{label}</span>
            </article>
          ))}
        </div>
      </div>
      <div className="chapter-stage">
        <ProductFrame frame={frame} product={product} priority />
        <FrameRail frames={frames} progress={progress} compact />
      </div>
    </div>
  );
}

function ProductFrame({ frame, product, priority = false }) {
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    setFailed(false);
  }, [frame.src]);

  return (
    <div className={`product-frame product-${product}`}>
      {!failed ? (
        <img
          src={frame.src}
          alt={`${product === "lite" ? "Mowack Lite" : "Mowack Pro"} ${frame.view.toLowerCase()} view`}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          onError={() => setFailed(true)}
        />
      ) : (
        <RobotSilhouette product={product} view={frame.view} />
      )}
      <div className="product-shadow" />
    </div>
  );
}

function RobotSilhouette({ product, view }) {
  const isPro = product === "pro";

  return (
    <div className={`robot-fallback ${isPro ? "robot-pro" : "robot-lite"}`} aria-hidden="true">
      <div className="fallback-topline">{view}</div>
      <div className="fallback-body">
        <div className="fallback-shell" />
        <div className="fallback-sensor" />
        <div className="fallback-track fallback-track-left" />
        <div className="fallback-track fallback-track-right" />
      </div>
      <span>{isPro ? "Mowack Pro image slot" : "Mowack Lite image slot"}</span>
    </div>
  );
}

function FrameRail({ frames, progress, compact = false }) {
  const activeIndex = clampIndex(progress, frames.length);

  if (frames.length > 4) {
    const productIndex = progress < 0.5 ? 0 : 1;

    return (
      <div className={`frame-rail frame-rail-products ${compact ? "frame-rail-compact" : ""}`}>
        {["Mowack Lite", "Mowack Pro"].map((label, index) => (
          <span className={index === productIndex ? "active" : ""} key={label}>
            {label}
          </span>
        ))}
      </div>
    );
  }

  return (
    <div className={`frame-rail ${compact ? "frame-rail-compact" : ""}`}>
      {frames.map((frame, index) => (
        <span className={index === activeIndex ? "active" : ""} key={`${frame.view}-${index}`}>
          {frame.view}
        </span>
      ))}
    </div>
  );
}

function Callout({ label, copy, product }) {
  return (
    <aside className={`callout callout-${product}`}>
      <span>{label}</span>
      <p>{copy}</p>
    </aside>
  );
}

function MissionControl() {
  const rows = [
    ["Mission planning", "12 route segments queued"],
    ["Telemetry", "Slope, speed, runtime, coverage"],
    ["Live oversight", "Two machines active"],
    ["Remote intervention", "Operator link ready"],
    ["Performance insights", "Coverage cost trending down"]
  ];

  return (
    <div className="dashboard" data-reveal>
      <div className="dashboard-map">
        <div className="field-line field-line-a" />
        <div className="field-line field-line-b" />
        <div className="field-line field-line-c" />
        <span className="machine-dot machine-dot-a" />
        <span className="machine-dot machine-dot-b" />
      </div>
      <div className="dashboard-panel">
        <div className="dashboard-header">
          <span>Mission 04</span>
          <strong>Orchard North</strong>
        </div>
        {rows.map(([label, value]) => (
          <div className="dashboard-row" key={label}>
            <span>{label}</span>
            <p>{value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function MetricCounter({ metric, reducedMotion }) {
  const valueRef = useRef(null);

  useEffect(() => {
    if (!valueRef.current) return undefined;

    if (reducedMotion) {
      valueRef.current.textContent = `${metric.value}${metric.suffix}`;
      return undefined;
    }

    const count = { value: 0 };
    const trigger = ScrollTrigger.create({
      trigger: valueRef.current,
      start: "top 84%",
      once: true,
      onEnter: () => {
        gsap.to(count, {
          value: metric.value,
          duration: 1.25,
          ease: "power3.out",
          onUpdate: () => {
            if (valueRef.current) {
              valueRef.current.textContent = `${Math.round(count.value)}${metric.suffix}`;
            }
          }
        });
      }
    });

    return () => trigger.kill();
  }, [metric, reducedMotion]);

  return (
    <article className="metric" data-reveal>
      <strong ref={valueRef}>0{metric.suffix}</strong>
      <span>{metric.label}</span>
    </article>
  );
}
