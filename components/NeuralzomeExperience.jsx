"use client";

import { AnimatePresence, motion, useInView, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { forwardRef, useEffect, useRef, useState } from "react";

const navLinks = [
  ["Home", "#home"],
  ["Products", "#products"],
  ["About Us", "#about"],
  ["Case Study", "#case-study"],
  ["Contact Us", "#contact"]
];

const productLinks = [
  ["Mowack Lite", "/products/mowack-lite", "Compact autonomy for precise field work."],
  ["Mowack Pro", "#mowack-pro", "Flagship power for bigger field programs."]
];

const footerGroups = [
  {
    title: "Products",
    links: [
      ["Mowack Lite", "/products/mowack-lite"],
      ["Mowack Pro", "#mowack-pro"],
      ["Mission Control", "#mission-control"]
    ]
  },
  {
    title: "Company",
    links: [
      ["About Us", "#about"],
      ["Case Study", "#case-study"],
      ["Contact Us", "#contact"]
    ]
  },
  {
    title: "Field Programs",
    links: [
      ["Orchards", "#use-cases"],
      ["Vineyards", "#use-cases"],
      ["Fire Breaks", "#use-cases"]
    ]
  }
];

const products = [
  {
    id: "mowack-lite",
    name: "Mowack Lite",
    eyebrow: "Compact autonomy",
    statement: "Compact autonomy for precise field work.",
    description: "Built for close-range control, repeatable row maintenance, and agile movement around crops.",
    highlights: ["Precision", "Compact Control", "Repeatable Operation"],
    images: {
      primary: "/products/mowack-lite-side.png",
      hover: "/products/mowack-lite-front.png",
      top: "/products/mowack-lite-top.png"
    },
    href: "/products/mowack-lite"
  },
  {
    id: "mowack-pro",
    name: "Mowack Pro",
    eyebrow: "Flagship machine",
    statement: "The flagship machine for bigger field programs.",
    description: "Designed for power, coverage, durability, and confident field presence across demanding terrain.",
    highlights: ["Power", "Coverage", "Durability"],
    images: {
      primary: "/products/mowack-pro-side.png",
      hover: "/products/mowack-pro-front.png",
      top: "/products/mowack-pro-top.png"
    },
    href: "#mowack-pro"
  }
];

const whyItems = [
  ["Rugged field mobility", "Tracked platforms built for uneven soil, slopes, brush, and long outdoor duty cycles."],
  ["Autonomous repeatability", "Repeatable missions help field teams move from reactive work to planned coverage."],
  ["Reduced manual exposure", "Machines handle repetitive terrain work so crews spend less time in risky conditions."],
  ["Performance visibility", "Operational insight turns field activity into routes, coverage, runtime, and ROI signals."]
];

const missionItems = [
  ["Mission planning", "Build routes and coverage plans before the machine enters the row."],
  ["Telemetry", "Monitor slope, speed, battery, runtime, and task status in one calm view."],
  ["Live oversight", "Track active machines and route progress without a cluttered control room."],
  ["Remote intervention", "Step in when the field requires human judgment."],
  ["Performance insights", "Understand coverage, hours saved, and operating efficiency over time."]
];

const useCases = [
  {
    title: "Orchards",
    copy: "Maintain tree rows with controlled movement and lower manual exposure.",
    image: "/products/mowack-lite-side.png"
  },
  {
    title: "Vineyards",
    copy: "Navigate narrow corridors with compact autonomous passes.",
    image: "/products/mowack-lite-front.png"
  },
  {
    title: "Farmlands",
    copy: "Run repeatable vegetation maintenance across larger working areas.",
    image: "/products/mowack-pro-side.png"
  },
  {
    title: "Fire breaks",
    copy: "Reduce fuel loads in places where access and timing matter.",
    image: "/products/mowack-pro-front.png"
  },
  {
    title: "Material handling",
    copy: "Extend autonomy into repeatable movement support for field operations.",
    image: "/products/mowack-pro-rear.png"
  }
];

const metrics = [
  { value: 120, suffix: "+", label: "acres cleared" },
  { value: 80, suffix: "%", label: "cost reduction potential" },
  { value: 600, suffix: "+", label: "crew hours saved" },
  { value: 3, suffix: "x", label: "faster recurring operations" }
];

const preloadedProductImages = [
  ...new Set([
    ...products.flatMap((product) => Object.values(product.images)),
    ...useCases.map((useCase) => useCase.image)
  ])
];

const reveal = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.72, ease: [0.16, 1, 0.3, 1] } }
};

export default function NeuralzomeExperience() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [productMenuOpen, setProductMenuOpen] = useState(false);
  const [activeUseCase, setActiveUseCase] = useState(0);
  const reducedMotion = useReducedMotion();
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const smoothX = useSpring(pointerX, { stiffness: 90, damping: 24, mass: 0.35 });
  const smoothY = useSpring(pointerY, { stiffness: 90, damping: 24, mass: 0.35 });
  const liteX = useTransform(smoothX, [-0.5, 0.5], [-20, 20]);
  const liteY = useTransform(smoothY, [-0.5, 0.5], [-10, 10]);
  const proX = useTransform(smoothX, [-0.5, 0.5], [18, -18]);
  const proY = useTransform(smoothY, [-0.5, 0.5], [8, -8]);

  const activeUse = useCases[activeUseCase];

  useEffect(() => {
    preloadedProductImages.forEach((src) => {
      const image = new window.Image();
      image.src = src;
    });
  }, []);

  function handleHeroPointer(event) {
    if (reducedMotion) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    pointerX.set((event.clientX - bounds.left) / bounds.width - 0.5);
    pointerY.set((event.clientY - bounds.top) / bounds.height - 0.5);
  }

  return (
    <main className="nz-home" id="home">
      <Header
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        productMenuOpen={productMenuOpen}
        setProductMenuOpen={setProductMenuOpen}
      />

      <section className="hero" onPointerMove={handleHeroPointer} onPointerLeave={() => { pointerX.set(0); pointerY.set(0); }}>
        <div className="hero-copy">
          <motion.p className="eyebrow" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}>
            Neuralzome
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.72, delay: 0.06 }}>
            Autonomous machines for real field terrain
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.72, delay: 0.13 }}>
            Rugged autonomous systems for mowing, clearing, and repeatable agricultural field operations.
          </motion.p>
          <motion.div className="hero-actions" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.72, delay: 0.2 }}>
            <a className="button button-dark" href="#products">Explore Products</a>
            <a className="button button-light" href="#contact">Book a Demo</a>
          </motion.div>
        </div>

        <div className="hero-stage" aria-label="Mowack Lite and Mowack Pro product preview">
          <motion.img
            className="hero-machine hero-machine-lite"
            src="/products/mowack-lite-side.png"
            alt="Mowack Lite autonomous field robot"
            style={{ x: liteX, y: liteY }}
            loading="eager"
            decoding="async"
          />
          <motion.img
            className="hero-machine hero-machine-pro"
            src="/products/mowack-pro-side.png"
            alt="Mowack Pro autonomous field robot"
            style={{ x: proX, y: proY }}
            loading="eager"
            decoding="async"
          />
          <div className="hero-surface" />
        </div>
      </section>

      <section id="products" className="section product-section">
        <RevealBlock className="section-heading">
          <p className="eyebrow">Products</p>
          <h2>Two machines. One field autonomy platform.</h2>
          <p>Mowack Lite and Mowack Pro are built for different terrain, coverage, and precision requirements.</p>
        </RevealBlock>
        <div className="product-grid">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className="section why-section">
        <RevealBlock className="section-heading section-heading-left">
          <p className="eyebrow">Why Neuralzome</p>
          <h2>Designed for field work that has to happen again and again.</h2>
        </RevealBlock>
        <div className="why-grid">
          {whyItems.map(([title, copy], index) => (
            <RevealBlock className="why-item" key={title} delay={index * 0.06}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{title}</h3>
              <p>{copy}</p>
            </RevealBlock>
          ))}
        </div>
      </section>

      <section id="mission-control" className="control-section">
        <RevealBlock className="control-copy">
          <p className="eyebrow">Mission Control</p>
          <h2>Hardware, supervised through a clear operations layer.</h2>
          <p>Plan, monitor, intervene, and measure field performance without turning autonomy into visual noise.</p>
        </RevealBlock>
        <RevealBlock className="dashboard-shell" delay={0.12}>
          <MissionDashboard />
        </RevealBlock>
      </section>

      <section id="use-cases" className="section use-section">
        <RevealBlock className="section-heading section-heading-left">
          <p className="eyebrow">Use Cases</p>
          <h2>Autonomy for the recurring work between the rows.</h2>
        </RevealBlock>
        <div className="use-layout">
          <div className="use-list">
            {useCases.map((useCase, index) => (
              <button
                className={activeUseCase === index ? "use-row active" : "use-row"}
                type="button"
                key={useCase.title}
                onMouseEnter={() => setActiveUseCase(index)}
                onFocus={() => setActiveUseCase(index)}
              >
                <span>{useCase.title}</span>
                <p>{useCase.copy}</p>
              </button>
            ))}
          </div>
          <div className="use-preview">
            <AnimatePresence mode="wait">
              <motion.img
                key={activeUse.image}
                src={activeUse.image}
                alt={`${activeUse.title} use case product preview`}
                initial={{ opacity: 0, scale: 0.96, y: 16 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 1.03, y: -12 }}
                transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
                loading="lazy"
                decoding="async"
              />
            </AnimatePresence>
            <div>
              <span>{activeUse.title}</span>
              <p>{activeUse.copy}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section outcomes-section">
        <RevealBlock className="section-heading">
          <p className="eyebrow">Outcomes</p>
          <h2>Confident numbers. Measured field value.</h2>
        </RevealBlock>
        <div className="metrics-grid">
          {metrics.map((metric) => (
            <MetricCounter key={metric.label} metric={metric} />
          ))}
        </div>
      </section>

      <section id="case-study" className="section case-section">
        <RevealBlock className="case-card">
          <div className="case-copy">
            <p className="eyebrow">Case Study</p>
            <h2>Clearing difficult terrain with less manual exposure.</h2>
            <p>
              A field deployment story focused on repeatable coverage, reduced labor pressure, and safer terrain maintenance.
            </p>
            <a className="text-link" href="#case-study">View Case Study</a>
          </div>
          <div className="case-image">
            <img src="/products/mowack-pro-side.png" alt="Mowack Pro case study preview" loading="lazy" decoding="async" />
          </div>
        </RevealBlock>
      </section>

      <section id="about" className="section about-section">
        <RevealBlock className="about-copy">
          <p className="eyebrow">About Us</p>
          <h2>Neuralzome is building practical autonomy for the physical work of agriculture.</h2>
          <p>
            We combine rugged robotic hardware, teachable autonomy, and operations software so farms can run recurring terrain work with more consistency and control.
          </p>
          <a className="text-link" href="#about">About Us</a>
        </RevealBlock>
      </section>

      <section id="contact" className="final-section">
        <RevealBlock className="final-copy">
          <p className="eyebrow">Contact Us</p>
          <h2>Bring autonomous field work into your operating plan.</h2>
          <div className="hero-actions">
            <a className="button button-dark" href="mailto:info@neuralzome.com">Book a Demo</a>
            <a className="button button-light" href="mailto:info@neuralzome.com">Contact Us</a>
          </div>
        </RevealBlock>
      </section>

      <SiteFooter />
    </main>
  );
}

function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-main">
        <div className="footer-brand">
          <a className="brand footer-logo" href="#home" aria-label="Neuralzome home">
            <span className="brand-mark" />
            <span>NEURALZOME</span>
          </a>
          <p>
            Rugged autonomous field machines and operations software for repeatable agricultural terrain work.
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
          <a href="#home">Back to top</a>
          <a href="#contact">Book a Demo</a>
        </div>
      </div>
    </footer>
  );
}

function Header({ menuOpen, setMenuOpen, productMenuOpen, setProductMenuOpen }) {
  return (
    <header className="site-header">
      <a className="brand" href="#home" aria-label="Neuralzome home">
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

function ProductCard({ product }) {
  const [hovered, setHovered] = useState(false);

  return (
    <RevealBlock
      id={product.id}
      className="product-card"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="product-card-copy">
        <p className="eyebrow">{product.eyebrow}</p>
        <h3>{product.name}</h3>
        <p>{product.statement}</p>
      </div>
      <div className="product-image-stage">
        <AnimatePresence mode="wait">
          <motion.img
            key={hovered ? product.images.hover : product.images.primary}
            src={hovered ? product.images.hover : product.images.primary}
            alt={`${product.name} product preview`}
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: hovered ? 1.04 : 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.02, y: -10 }}
            transition={{ duration: 0.34, ease: [0.16, 1, 0.3, 1] }}
            loading="lazy"
            decoding="async"
          />
        </AnimatePresence>
      </div>
      <div className="product-highlights">
        {product.highlights.map((highlight) => (
          <span key={highlight}>{highlight}</span>
        ))}
      </div>
      <a className="text-link" href={product.href}>View Product</a>
    </RevealBlock>
  );
}

function MissionDashboard() {
  return (
    <div className="mission-dashboard">
      <div className="dashboard-map">
        <span className="map-route map-route-a" />
        <span className="map-route map-route-b" />
        <span className="map-route map-route-c" />
        <span className="map-dot map-dot-a" />
        <span className="map-dot map-dot-b" />
      </div>
      <div className="dashboard-content">
        <div className="dashboard-title">
          <span>Mission 04</span>
          <strong>Orchard North</strong>
        </div>
        {missionItems.map(([title, copy]) => (
          <div className="dashboard-row" key={title}>
            <span>{title}</span>
            <p>{copy}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function MetricCounter({ metric }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return undefined;

    const duration = 1100;
    const start = performance.now();
    let frame = 0;

    function tick(now) {
      const progress = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(metric.value * eased));
      if (progress < 1) frame = requestAnimationFrame(tick);
    }

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, metric.value]);

  return (
    <RevealBlock className="metric" ref={ref}>
      <strong>{value}{metric.suffix}</strong>
      <span>{metric.label}</span>
    </RevealBlock>
  );
}

const RevealBlock = forwardRef(function RevealBlock(
  { children, className = "", delay = 0, id, onMouseEnter, onMouseLeave },
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
      viewport={{ once: true, amount: 0.22 }}
      transition={{ delay }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </motion.div>
  );
});
