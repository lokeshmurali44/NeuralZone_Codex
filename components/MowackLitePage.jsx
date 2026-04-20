"use client";

import {
  AnimatePresence,
  motion,
  useInView,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform
} from "framer-motion";
import { forwardRef, useEffect, useRef, useState } from "react";

const navLinks = [
  ["Home", "/#home"],
  ["Products", "/#products"],
  ["About Us", "/#about"],
  ["Case Study", "/#case-study"],
  ["Contact Us", "/#contact"]
];

const productLinks = [
  ["Mowack Lite", "/products/mowack-lite", "Compact autonomy for precise field work."],
  ["Mowack Pro", "/#mowack-pro", "Flagship power for bigger field programs."]
];

const liteViews = [
  {
    view: "Front",
    label: "Autonomy and sensing posture",
    copy: "Forward-facing supervision and a low, measured stance support controlled work in tight rows.",
    callout: "Autonomy stack",
    src: "/products/mowack-lite-front.png"
  },
  {
    view: "Side",
    label: "Compact tracked mobility",
    copy: "A narrow tracked profile helps the machine move with confidence around vines, trees, edges, and structures.",
    callout: "Tracked control",
    src: "/products/mowack-lite-side.png"
  },
  {
    view: "Top",
    label: "Protected architecture",
    copy: "A clean enclosed body keeps core systems protected while preserving a compact working footprint.",
    callout: "Protected body",
    src: "/products/mowack-lite-top.png"
  },
  {
    view: "Rear",
    label: "Close-range working footprint",
    copy: "The machine is built for repeatable passes where crop proximity, turning space, and control matter.",
    callout: "Tight geometry",
    src: "/products/mowack-lite-rear.png"
  }
];

const specs = [
  ["5HP", "gas-powered engine"],
  ["2 hrs", "operation before refuelling"],
  ["0-32", "degree slope compatibility"],
  ["Compact", "close-to-crop footprint"]
];

const specDetails = [
  ["Ideal environments", "Orchards, vineyards, tree rows, edges, and structured farm corridors."],
  ["Control mode", "Autonomous mission execution with operator visibility through the Neuralzome platform."],
  ["Maintenance posture", "Accessible, practical hardware layout for recurring field programs."],
  ["Best fit", "Precision mowing and weeding near trees, vines, posts, and structures."]
];

const whyLite = [
  ["Precision", "Work close to trees and vines with a compact machine built for measured movement."],
  ["Compact Control", "Tracked mobility supports repeatable passes in constrained agricultural geometry."],
  ["Repeatable Autonomy", "Make recurring mowing and weeding less dependent on variable manual passes."],
  ["Lower Manual Exposure", "Move people away from repetitive work near tight edges and obstacles."]
];

const engineeringCallouts = [
  ["Enclosed form", "A clean body shape protects core systems and keeps visual complexity low."],
  ["Tight footprint", "Compact geometry supports work near crop rows, posts, and structures."],
  ["Tracked movement", "Low tracked mobility helps maintain controlled contact with uneven farm surfaces."],
  ["Field-ready design", "Built around repeatable outdoor maintenance rather than showroom-only robotics."]
];

const movementPoints = [
  ["Structured terrain", "Designed for orchards, vineyards, row corridors, and predictable recurring zones."],
  ["Close-range control", "The side profile keeps the machine visually readable around crop edges and row ends."],
  ["Measured passes", "Autonomy is framed around consistency: planned movement, supervised operation, and repeatable coverage."]
];

const performanceHighlights = [
  ["Control", "Autonomous mission execution with operator visibility."],
  ["Field suitability", "Best for close-to-crop mowing and structured agricultural spaces."],
  ["Footprint", "Compact profile for places where larger equipment feels oversized."],
  ["Efficiency", "Supports recurring maintenance cycles with less manual intervention."],
  ["Repeatability", "Built for controlled passes across the same zones over time."],
  ["Architecture", "Autonomy-ready hardware connected to Neuralzome Mission Control."]
];

const advantages = [
  ["Compact control", "A smaller machine profile for field work where space is the constraint."],
  ["Obstacle-aware work", "Built for mowing near trunks, posts, row ends, and farm structures."],
  ["Recurring maintenance", "Better consistency for routine vegetation control in the same zones."],
  ["Reduced exposure", "Keep people out of repetitive work in tight, uneven, or awkward areas."],
  ["Calm supervision", "Operate the machine as part of a planned, visible field workflow."]
];

const environments = [
  {
    title: "Orchards",
    copy: "Maintain tree-row vegetation with compact control and repeatable passes.",
    image: "/products/mowack-lite-side.png"
  },
  {
    title: "Vineyards",
    copy: "Navigate tight corridors where precision matters more than brute scale.",
    image: "/products/mowack-lite-front.png"
  },
  {
    title: "Tree rows",
    copy: "Support close-to-trunk mowing while keeping the machine footprint measured.",
    image: "/products/mowack-lite-top.png"
  },
  {
    title: "Tight farm edges",
    copy: "Work near fences, posts, service lanes, and structures with controlled movement.",
    image: "/products/mowack-lite-rear.png"
  },
  {
    title: "Recurring zones",
    copy: "Run planned maintenance where the same areas need consistent coverage over time.",
    image: "/products/mowack-lite-side.png"
  }
];

const platformRows = [
  ["Mission planning", "Plan routes, passes, and repeatable work zones before deployment."],
  ["Telemetry", "Monitor runtime, slope, speed, and machine state from a clean operations view."],
  ["Operator visibility", "Keep the machine visible to the team while it works through constrained rows."],
  ["Remote oversight", "Intervene when field conditions require human judgment."],
  ["Performance insight", "Review coverage, time saved, and recurring maintenance activity."]
];

const outcomes = [
  ["More consistent passes", "Repeat work with less variation across rows and recurring zones."],
  ["Less manual exposure", "Move people away from repetitive mowing near tight edges and obstacles."],
  ["Tighter control", "Fit autonomy into places that larger field machines cannot comfortably reach."],
  ["Clearer planning", "Turn recurring field maintenance into visible, trackable operations."]
];

const productAngles = [
  ["Side", "The working profile for narrow-row movement.", "/products/mowack-lite-side.png"],
  ["Front", "Autonomy posture and controlled forward presence.", "/products/mowack-lite-front.png"],
  ["Top", "Protected architecture and compact footprint.", "/products/mowack-lite-top.png"],
  ["Rear", "Close-range geometry for structured field passes.", "/products/mowack-lite-rear.png"]
];

const footerGroups = [
  {
    title: "Products",
    links: [
      ["Mowack Lite", "/products/mowack-lite"],
      ["Mowack Pro", "/#mowack-pro"],
      ["Mission Control", "#mission-control"]
    ]
  },
  {
    title: "Company",
    links: [
      ["About Us", "/#about"],
      ["Case Study", "/#case-study"],
      ["Contact Us", "/#contact"]
    ]
  },
  {
    title: "Page",
    links: [
      ["Specifications", "#specifications"],
      ["Use Cases", "#ideal-environments"],
      ["Book a Demo", "#contact"]
    ]
  }
];

const preloadedLiteImages = [...new Set(liteViews.map((view) => view.src))];

const reveal = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.72, ease: [0.16, 1, 0.3, 1] } }
};

export default function MowackLitePage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [productMenuOpen, setProductMenuOpen] = useState(false);
  const [activeEnvironment, setActiveEnvironment] = useState(0);
  const reducedMotion = useReducedMotion();
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const smoothX = useSpring(pointerX, { stiffness: 90, damping: 24, mass: 0.35 });
  const smoothY = useSpring(pointerY, { stiffness: 90, damping: 24, mass: 0.35 });
  const heroX = useTransform(smoothX, [-0.5, 0.5], [-22, 22]);
  const heroY = useTransform(smoothY, [-0.5, 0.5], [-10, 10]);

  useEffect(() => {
    preloadedLiteImages.forEach((src) => {
      const image = new window.Image();
      image.src = src;
    });
  }, []);

  function handlePointer(event) {
    if (reducedMotion) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    pointerX.set((event.clientX - bounds.left) / bounds.width - 0.5);
    pointerY.set((event.clientY - bounds.top) / bounds.height - 0.5);
  }

  return (
    <main className="product-page lite-page" id="top">
      <ProductHeader
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        productMenuOpen={productMenuOpen}
        setProductMenuOpen={setProductMenuOpen}
      />

      <section className="lite-hero" onPointerMove={handlePointer} onPointerLeave={() => { pointerX.set(0); pointerY.set(0); }}>
        <div className="lite-hero-copy">
          <motion.p className="eyebrow" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}>
            Mowack Lite
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.05 }}>
            Compact autonomy for precise field work
          </motion.h1>
          <motion.p className="lite-hero-subhead" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}>
            Mowack Lite is designed for controlled, repeatable operation across structured agricultural environments.
          </motion.p>
          <motion.p initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.15 }}>
            Designed for narrow rows, close-to-crop mowing, and repeatable operation in demanding farm environments.
          </motion.p>
          <motion.div className="hero-actions" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}>
            <a className="button button-dark" href="#contact">Book a Demo</a>
            <a className="button button-light" href="mailto:info@neuralzome.com">Contact Sales</a>
            <a className="text-link lite-hero-link" href="#specifications">View Specifications</a>
          </motion.div>
        </div>

        <div className="lite-hero-stage" aria-label="Mowack Lite side profile">
          <motion.img
            className="lite-hero-machine"
            src="/products/mowack-lite-side.png"
            alt="Mowack Lite compact autonomous field robot side view"
            style={{ x: heroX, y: heroY }}
            loading="eager"
            decoding="async"
          />
          <div className="lite-hero-shadow" />
        </div>
      </section>

      <LiteViewReveal />

      <section className="lite-intro section">
        <RevealBlock className="lite-intro-copy">
          <p className="eyebrow">Positioning</p>
          <h2>Built for the tight geometry of real farms.</h2>
          <p>
            Mowack Lite is the compact member of the Neuralzome platform, designed for precise mowing and weeding near trees, vines, posts, and farm structures.
          </p>
        </RevealBlock>
        <RevealBlock className="lite-intro-visual" delay={0.1}>
          <img src="/products/mowack-lite-top.png" alt="Mowack Lite top view showing compact protected architecture" loading="lazy" decoding="async" />
        </RevealBlock>
      </section>

      <section className="section lite-why">
        <RevealBlock className="section-heading section-heading-left">
          <p className="eyebrow">Why Mowack Lite</p>
          <h2>Precision where larger machines feel oversized.</h2>
        </RevealBlock>
        <div className="lite-why-grid">
          {whyLite.map(([title, copy], index) => (
            <RevealBlock className="lite-why-item" key={title} delay={index * 0.05}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{title}</h3>
              <p>{copy}</p>
            </RevealBlock>
          ))}
        </div>
      </section>

      <section className="section lite-engineering">
        <RevealBlock className="section-heading">
          <p className="eyebrow">Engineering</p>
          <h2>Purpose-built around compact autonomous work.</h2>
          <p>Mowack Lite keeps the product language simple: protected form, tracked movement, and a footprint designed for close field geometry.</p>
        </RevealBlock>
        <div className="lite-engineering-stage">
          <RevealBlock className="lite-engineering-image">
            <img src="/products/mowack-lite-top.png" alt="Mowack Lite top view with enclosed compact architecture" loading="lazy" decoding="async" />
          </RevealBlock>
          <div className="lite-engineering-callouts">
            {engineeringCallouts.map(([title, copy], index) => (
              <RevealBlock className="lite-engineering-callout" key={title} delay={index * 0.05}>
                <span>{title}</span>
                <p>{copy}</p>
              </RevealBlock>
            ))}
          </div>
        </div>
      </section>

      <section className="section lite-movement">
        <RevealBlock className="lite-movement-copy">
          <p className="eyebrow">How It Moves</p>
          <h2>Controlled movement for structured field conditions.</h2>
          <p>Mowack Lite is suited for environments where the route is known, the available space is limited, and pass quality matters.</p>
          <div className="lite-movement-points">
            {movementPoints.map(([title, copy]) => (
              <article key={title}>
                <span>{title}</span>
                <p>{copy}</p>
              </article>
            ))}
          </div>
        </RevealBlock>
        <RevealBlock className="lite-movement-visual" delay={0.08}>
          <img src="/products/mowack-lite-side.png" alt="Mowack Lite side view showing tracked movement profile" loading="lazy" decoding="async" />
        </RevealBlock>
      </section>

      <section id="specifications" className="section lite-specs">
        <RevealBlock className="section-heading">
          <p className="eyebrow">Performance Highlights</p>
          <h2>Compact machine. Practical field capability.</h2>
          <p>Core product facts are presented clearly, with qualitative context where exact measurements are not defined.</p>
        </RevealBlock>
        <div className="lite-spec-grid">
          {specs.map(([value, label]) => (
            <RevealBlock className="lite-spec" key={label}>
              <strong>{value}</strong>
              <span>{label}</span>
            </RevealBlock>
          ))}
        </div>
        <div className="lite-performance-grid">
          {performanceHighlights.map(([title, copy]) => (
            <RevealBlock className="lite-performance-card" key={title}>
              <span>{title}</span>
              <p>{copy}</p>
            </RevealBlock>
          ))}
        </div>
        <div className="lite-spec-detail-grid">
          {specDetails.map(([title, copy]) => (
            <RevealBlock className="lite-spec-detail" key={title}>
              <span>{title}</span>
              <p>{copy}</p>
            </RevealBlock>
          ))}
        </div>
      </section>

      <section className="section lite-advantages">
        <RevealBlock className="section-heading section-heading-left">
          <p className="eyebrow">Operating Advantages</p>
          <h2>Made for the work crews repeat every season.</h2>
        </RevealBlock>
        <div className="lite-advantage-list">
          {advantages.map(([title, copy]) => (
            <RevealBlock className="lite-advantage" key={title}>
              <h3>{title}</h3>
              <p>{copy}</p>
            </RevealBlock>
          ))}
        </div>
      </section>

      <section id="ideal-environments" className="section lite-environments">
        <RevealBlock className="section-heading section-heading-left">
          <p className="eyebrow">Ideal Environments</p>
          <h2>Best where control, proximity, and repeatability matter.</h2>
        </RevealBlock>
        <div className="lite-env-layout">
          <div className="lite-env-list">
            {environments.map((item, index) => (
              <button
                className={activeEnvironment === index ? "lite-env-row active" : "lite-env-row"}
                type="button"
                key={item.title}
                onMouseEnter={() => setActiveEnvironment(index)}
                onFocus={() => setActiveEnvironment(index)}
              >
                <span>{item.title}</span>
                <p>{item.copy}</p>
              </button>
            ))}
          </div>
          <div className="lite-env-preview">
            <AnimatePresence mode="wait">
              <motion.img
                key={environments[activeEnvironment].image}
                src={environments[activeEnvironment].image}
                alt={`${environments[activeEnvironment].title} Mowack Lite operating environment`}
                initial={{ opacity: 0, y: 16, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -12, scale: 1.02 }}
                transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
                loading="lazy"
                decoding="async"
              />
            </AnimatePresence>
            <div>
              <span>{environments[activeEnvironment].title}</span>
              <p>{environments[activeEnvironment].copy}</p>
            </div>
          </div>
        </div>
      </section>

      <section id="mission-control" className="lite-platform">
        <RevealBlock className="control-copy">
          <p className="eyebrow">Mission Control</p>
          <h2>Compact hardware, connected to the Neuralzome operations layer.</h2>
          <p>Plan work, supervise the machine, monitor telemetry, and review performance from the same calm platform language used across Neuralzome.</p>
        </RevealBlock>
        <RevealBlock className="dashboard-shell" delay={0.1}>
          <LiteMissionDashboard />
        </RevealBlock>
      </section>

      <section className="section lite-outcomes">
        <RevealBlock className="section-heading">
          <p className="eyebrow">Outcomes</p>
          <h2>Operational value in the places that slow crews down.</h2>
        </RevealBlock>
        <div className="lite-outcome-grid">
          {outcomes.map(([title, copy]) => (
            <RevealBlock className="lite-outcome" key={title}>
              <h3>{title}</h3>
              <p>{copy}</p>
            </RevealBlock>
          ))}
        </div>
      </section>

      <ProductAngles />

      <section id="contact" className="final-section lite-final">
        <RevealBlock className="final-copy">
          <p className="eyebrow">Mowack Lite</p>
          <h2>Bring compact autonomy into your field maintenance plan.</h2>
          <div className="hero-actions">
            <a className="button button-dark" href="mailto:info@neuralzome.com">Book a Demo</a>
            <a className="button button-light" href="mailto:info@neuralzome.com">Talk to the Team</a>
          </div>
        </RevealBlock>
      </section>

      <ProductFooter />
    </main>
  );
}

function LiteViewReveal() {
  const sectionRef = useRef(null);
  const reducedMotion = useReducedMotion();
  const [activeView, setActiveView] = useState(0);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"]
  });
  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [0.94, 1.04]);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (reducedMotion) return;
    const next = Math.min(liteViews.length - 1, Math.max(0, Math.floor(latest * liteViews.length)));
    setActiveView(next);
  });

  const active = liteViews[activeView];

  return (
    <section className="lite-view-story" ref={sectionRef}>
      <div className="lite-view-pin">
        <div className="lite-view-grid">
          <div className="lite-view-copy">
            <p className="eyebrow">View-by-view reveal</p>
            <AnimatePresence mode="wait">
              <motion.div
                key={active.view}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.36, ease: [0.16, 1, 0.3, 1] }}
              >
                <span className="lite-view-kicker">{active.view} view</span>
                <h2>{active.label}</h2>
                <p>{active.copy}</p>
              </motion.div>
            </AnimatePresence>
            <div className="lite-view-rail" aria-label="Mowack Lite reveal progress">
              <motion.span style={{ width: progressWidth }} />
            </div>
            <div className="lite-view-tabs">
              {liteViews.map((view, index) => (
                <button
                  className={activeView === index ? "active" : ""}
                  type="button"
                  key={view.view}
                  onClick={() => setActiveView(index)}
                >
                  {view.view}
                </button>
              ))}
            </div>
          </div>

          <div className="lite-view-media">
            <AnimatePresence mode="wait">
              <motion.img
                key={active.src}
                src={active.src}
                alt={`Mowack Lite ${active.view.toLowerCase()} view`}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                style={{ scale: reducedMotion ? 1 : imageScale }}
                transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
                loading="eager"
                decoding="async"
              />
            </AnimatePresence>
            <div className="lite-view-shadow" />
            <div className="lite-hotspot">
              <span>{active.callout}</span>
              <p>{active.label}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function LiteMissionDashboard() {
  return (
    <div className="mission-dashboard lite-dashboard">
      <div className="dashboard-map">
        <span className="map-route map-route-a" />
        <span className="map-route map-route-b" />
        <span className="map-route map-route-c" />
        <span className="map-dot map-dot-a" />
        <span className="map-dot map-dot-b" />
      </div>
      <div className="dashboard-content">
        <div className="dashboard-title">
          <span>Mowack Lite</span>
          <strong>Vine Row Pass</strong>
        </div>
        {platformRows.map(([title, copy]) => (
          <div className="dashboard-row" key={title}>
            <span>{title}</span>
            <p>{copy}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProductAngles() {
  const [activeAngle, setActiveAngle] = useState(0);
  const active = productAngles[activeAngle];

  return (
    <section className="section lite-angles">
      <RevealBlock className="section-heading">
        <p className="eyebrow">Product Angles</p>
        <h2>Designed to be read from every working view.</h2>
        <p>Each angle reveals a different part of the compact-field story: movement, autonomy posture, protection, and close-range geometry.</p>
      </RevealBlock>
      <div className="lite-angle-stage">
        <div className="lite-angle-preview">
          <AnimatePresence mode="wait">
            <motion.img
              key={active[2]}
              src={active[2]}
              alt={`Mowack Lite ${active[0].toLowerCase()} product angle`}
              initial={{ opacity: 0, y: 16, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 1.02 }}
              transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
              loading="lazy"
              decoding="async"
            />
          </AnimatePresence>
        </div>
        <div className="lite-angle-list">
          {productAngles.map(([title, copy], index) => (
            <button
              className={activeAngle === index ? "lite-angle-row active" : "lite-angle-row"}
              type="button"
              key={title}
              onMouseEnter={() => setActiveAngle(index)}
              onFocus={() => setActiveAngle(index)}
              onClick={() => setActiveAngle(index)}
            >
              <span>{title}</span>
              <p>{copy}</p>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProductHeader({ menuOpen, setMenuOpen, productMenuOpen, setProductMenuOpen }) {
  return (
    <header className="site-header">
      <a className="brand" href="/#home" aria-label="Neuralzome home">
        <span className="brand-mark" />
        <span>NEURALZOME</span>
      </a>
      <nav className="desktop-nav" aria-label="Primary navigation">
        {navLinks.map(([label, href]) => {
          if (label === "Products") {
            return (
              <div
                className="nav-product"
                key={label}
                onMouseEnter={() => setProductMenuOpen(true)}
                onMouseLeave={() => setProductMenuOpen(false)}
              >
                <a href={href} aria-haspopup="true" aria-expanded={productMenuOpen}>
                  Products
                </a>
                <AnimatePresence>
                  {productMenuOpen ? (
                    <motion.div
                      className="product-menu"
                      initial={{ opacity: 0, y: 10, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.98 }}
                      transition={{ duration: 0.2 }}
                    >
                      {productLinks.map(([name, link, copy]) => (
                        <a href={link} key={name}>
                          <strong>{name}</strong>
                          <span>{copy}</span>
                        </a>
                      ))}
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>
            );
          }

          return (
            <a href={href} key={label}>
              {label}
            </a>
          );
        })}
      </nav>
      <a className="nav-cta" href="#contact">Book a Demo</a>
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
      <AnimatePresence>
        {menuOpen ? (
          <motion.nav
            id="mobile-nav"
            className="mobile-nav"
            aria-label="Mobile navigation"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
          >
            {navLinks.map(([label, href]) => (
              <a href={href} key={label} onClick={() => setMenuOpen(false)}>
                {label}
              </a>
            ))}
            {productLinks.map(([label, href]) => (
              <a href={href} key={label} onClick={() => setMenuOpen(false)}>
                {label}
              </a>
            ))}
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </header>
  );
}

function ProductFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-main">
        <div className="footer-brand">
          <a className="brand footer-logo" href="/#home" aria-label="Neuralzome home">
            <span className="brand-mark" />
            <span>NEURALZOME</span>
          </a>
          <p>
            Compact autonomous field robotics for precise mowing, weeding, and recurring maintenance.
          </p>
          <a className="footer-contact" href="mailto:info@neuralzome.com">info@neuralzome.com</a>
        </div>

        <nav className="footer-nav" aria-label="Footer navigation">
          {footerGroups.map((group) => (
            <div className="footer-group" key={group.title}>
              <span>{group.title}</span>
              {group.links.map(([label, href]) => (
                <a href={href} key={label}>{label}</a>
              ))}
            </div>
          ))}
        </nav>
      </div>

      <div className="footer-bottom">
        <span>&copy; 2026 Neuralzome. All rights reserved.</span>
        <div>
          <a href="#top">Back to top</a>
          <a href="#contact">Book a Demo</a>
        </div>
      </div>
    </footer>
  );
}

const RevealBlock = forwardRef(function RevealBlock(
  { children, className = "", delay = 0, id },
  forwardedRef
) {
  return (
    <motion.div
      id={id}
      ref={forwardedRef}
      className={className}
      variants={reveal}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
});
