const body = document.body;
const header = document.querySelector("[data-header]");
const menuToggle = document.querySelector("[data-menu-toggle]");
const mobileMenu = document.querySelector("[data-mobile-menu]");
const mobileLinks = document.querySelectorAll("[data-mobile-link]");
const revealItems = document.querySelectorAll(".reveal");
const faqItems = document.querySelectorAll("[data-faq-item]");
const yearTargets = document.querySelectorAll("[data-year]");
const countUpItems = document.querySelectorAll("[data-count-up]");
const serviceShowcase = document.querySelector("[data-service-showcase]");
const hero = document.querySelector("[data-hero]");
const reduceMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

const setHeaderState = () => {
  if (!header) return;
  header.classList.toggle("is-scrolled", window.scrollY > 20);
};

const setMenuState = (isOpen) => {
  if (!menuToggle || !mobileMenu) return;
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  mobileMenu.classList.toggle("is-open", isOpen);
  body.classList.toggle("menu-open", isOpen);
};

const closeMenu = () => setMenuState(false);

setHeaderState();
window.addEventListener("scroll", setHeaderState, { passive: true });

if (menuToggle && mobileMenu) {
  menuToggle.addEventListener("click", () => {
    const expanded = menuToggle.getAttribute("aria-expanded") === "true";
    setMenuState(!expanded);
  });

  mobileMenu.addEventListener("click", (event) => {
    if (event.target === mobileMenu) closeMenu();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu();
  });
}

mobileLinks.forEach((link) => {
  link.addEventListener("click", closeMenu);
});

faqItems.forEach((item) => {
  const button = item.querySelector("[data-faq-question]");
  if (!button) return;

  button.addEventListener("click", () => {
    const isOpen = item.classList.contains("is-open");
    faqItems.forEach((faq) => {
      faq.classList.remove("is-open");
      const faqButton = faq.querySelector("[data-faq-question]");
      if (faqButton) faqButton.setAttribute("aria-expanded", "false");
    });

    if (!isOpen) {
      item.classList.add("is-open");
      button.setAttribute("aria-expanded", "true");
    }
  });
});

if ("IntersectionObserver" in window && revealItems.length) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.14 }
  );

  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

yearTargets.forEach((target) => {
  target.textContent = String(new Date().getFullYear());
});

const formatCountValue = (value, suffix = "", prefix = "", decimals = 0) =>
  `${prefix}${Number(value).toFixed(decimals)}${suffix}`;

const runCountUp = (element) => {
  if (!element || element.dataset.countAnimated === "true") return;

  const target = Number.parseFloat(element.dataset.countTarget || "0");
  const suffix = element.dataset.countSuffix || "";
  const prefix = element.dataset.countPrefix || "";
  const decimals = Number.parseInt(element.dataset.countDecimals || "0", 10);

  if (!Number.isFinite(target)) return;

  element.dataset.countAnimated = "true";

  if (reduceMotionQuery.matches) {
    element.textContent = formatCountValue(target, suffix, prefix, decimals);
    return;
  }

  const duration = Math.min(1800, 900 + target * 1.2);
  const startTime = performance.now();

  const tick = (currentTime) => {
    const progress = Math.min((currentTime - startTime) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const multiplier = 10 ** decimals;
    const currentValue = Math.round(target * eased * multiplier) / multiplier;

    element.textContent = formatCountValue(currentValue, suffix, prefix, decimals);

    if (progress < 1) {
      window.requestAnimationFrame(tick);
    } else {
      element.textContent = formatCountValue(target, suffix, prefix, decimals);
    }
  };

  window.requestAnimationFrame(tick);
};

if ("IntersectionObserver" in window && countUpItems.length) {
  const countObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        runCountUp(entry.target);
        countObserver.unobserve(entry.target);
      });
    },
    { threshold: 0.45 }
  );

  countUpItems.forEach((item) => countObserver.observe(item));
} else {
  countUpItems.forEach((item) => runCountUp(item));
}

if (serviceShowcase) {
  const tabs = serviceShowcase.querySelectorAll("[data-service-tab]");
  const badge = serviceShowcase.querySelector("[data-service-badge]");
  const media = serviceShowcase.querySelector("[data-service-media]");
  const mediaImage = serviceShowcase.querySelector("[data-service-image]");
  const icon = serviceShowcase.querySelector("[data-service-icon]");
  const title = serviceShowcase.querySelector("[data-service-title]");
  const copy = serviceShowcase.querySelector("[data-service-copy]");
  const list = serviceShowcase.querySelector("[data-service-list]");
  const link = serviceShowcase.querySelector("[data-service-link]");
  const reducedMotion = reduceMotionQuery.matches;
  let activeServiceKey =
    serviceShowcase.querySelector(".service-showcase__tab.is-active")?.dataset.serviceTab || "google-ads";
  let panelSwapTimeline = null;

  const serviceContent = {
    "google-ads": {
      badge: "Google Ads Management",
      icon: '<i class="fa-brands fa-google"></i>',
      iconTheme: "brand",
      title: "Google Ads systems built for qualified demand that converts, not vanity traffic.",
      copy: "Paid search built around lead quality, efficiency, and cleaner decision-making.",
      items: [
        "Search and Performance Max structure",
        "Landing-page and form-flow alignment",
        "Budget and search-term cleanup",
        ],
        link: "service-detail.html",
        mediaSrc: "img/services/main-page/google-ads.jpg",
        mediaAlt: "Google Ads campaign management visual",
      },
    "meta-ads": {
      badge: "Meta Ads Campaigns",
      icon: '<i class="fa-brands fa-meta"></i>',
      iconTheme: "brand",
      title: "Paid social built around creative testing, offer clarity, and funnel progression.",
      copy: "Paid social programs structured to create demand and improve follow-through after the click.",
      items: [
        "Prospecting and retargeting campaign structure",
        "Creative testing by audience and offer stage",
        "Signal cleanup and clearer paid social reporting",
        ],
        link: "services.html",
        mediaSrc: "img/services/main-page/meta-ads.jpg",
        mediaAlt: "Meta Ads campaign planning visual",
      },
    "landing-pages": {
      badge: "Landing Pages & CRO",
      icon: '<i class="fa-solid fa-window-maximize"></i>',
      iconTheme: "solid",
      title: "Landing pages designed to convert paid clicks into booked calls and qualified forms.",
      copy: "Conversion-focused pages that reduce friction and make offers easier to act on.",
      items: [
        "Offer-page structure and page messaging",
        "Form-flow improvements and CTA clarity",
        "CRO testing priorities and path analysis",
        ],
        link: "services.html",
        mediaSrc: "img/services/main-page/landing.jpg",
        mediaAlt: "Landing page and CRO strategy visual",
      },
    "seo-content": {
      badge: "SEO & Commercial Content",
      icon: '<i class="fa-solid fa-magnifying-glass-chart"></i>',
      iconTheme: "solid",
      title: "Search visibility built around revenue pages, not disconnected publishing.",
      copy: "Organic growth designed to support the same demand goals as your paid channels.",
      items: [
        "Revenue-page SEO and intent mapping",
        "Commercial content briefs and page structure",
        "Technical fixes and internal linking improvements",
        ],
        link: "services.html",
        mediaSrc: "img/services/main-page/seo.jpg",
        mediaAlt: "SEO and commercial content planning visual",
      },
    analytics: {
      badge: "Analytics & Attribution",
      icon: '<i class="fa-solid fa-chart-line"></i>',
      iconTheme: "solid",
      title: "Tracking and reporting that help teams make confident budget decisions.",
      copy: "Measurement systems built to reduce noise and improve budget decisions.",
      items: [
        "GA4 and GTM conversion integrity checks",
        "Looker Studio reporting for teams and leadership",
        "Attribution review across paid and organic traffic",
        ],
        link: "services.html",
        mediaSrc: "img/services/main-page/analytics.jpg",
        mediaAlt: "Analytics and attribution reporting visual",
      },
    remarketing: {
      badge: "Remarketing & Retention",
      icon: '<i class="fa-solid fa-rotate"></i>',
      iconTheme: "solid",
      title: "Follow-up systems that recover intent and lift efficiency across the funnel.",
      copy: "Remarketing flows that recover intent and keep acquisition spend working longer.",
      items: [
        "Audience rebuilds across search and social",
        "Nurture sequencing by offer stage",
        "Retention touchpoints for return visits",
        ],
        link: "services.html",
        mediaSrc: "img/services/main-page/remarketing.jpg",
        mediaAlt: "Remarketing and retention campaign visual",
      },
    };

  const updateServicePanel = (key) => {
      const content = serviceContent[key];
      if (!content || !badge || !media || !icon || !title || !copy || !list || !link) return;

      badge.textContent = content.badge;
      icon.innerHTML = content.icon;
      icon.classList.toggle("is-brand", content.iconTheme === "brand");
      title.textContent = content.title;
      copy.textContent = content.copy;
      if (mediaImage) {
        mediaImage.src = content.mediaSrc;
        mediaImage.alt = content.mediaAlt;
      }
      link.href = content.link;
      link.textContent = key === "google-ads" ? "View service detail" : "Explore service";
      list.innerHTML = content.items.map((item) => `<li>${item}</li>`).join("");
    };

  const animateServicePanel = (key) => {
    if (key === activeServiceKey) return;

    if (!window.gsap || reducedMotion) {
      updateServicePanel(key);
      activeServiceKey = key;
      return;
    }

    const gsap = window.gsap;
    const panelTargets = [badge, media, icon, title, copy, list, link].filter(Boolean);

    if (panelSwapTimeline) {
      panelSwapTimeline.kill();
      gsap.set(panelTargets, { clearProps: "all" });
    }

    panelSwapTimeline = gsap.timeline({
      defaults: { ease: "power2.out" },
      onComplete: () => {
        gsap.set(panelTargets, { clearProps: "opacity,transform" });
        panelSwapTimeline = null;
      },
    });

    panelSwapTimeline
      .to([badge, icon, title, copy, list, link], {
        opacity: 0,
        y: 12,
        duration: 0.2,
        stagger: 0.025,
      })
      .to(
        media,
        {
          opacity: 0,
          scale: 0.985,
          duration: 0.24,
        },
        0
      )
      .add(() => {
        updateServicePanel(key);
        activeServiceKey = key;
        gsap.set([badge, icon, title, copy, list, link], { opacity: 0, y: 14 });
        gsap.set(media, { opacity: 0, scale: 1.035 });
      })
      .to(
        media,
        {
          opacity: 1,
          scale: 1,
          duration: 0.42,
        },
        "+=0.02"
      )
      .to(
        badge,
        {
          opacity: 1,
          y: 0,
          duration: 0.24,
        },
        "-=0.3"
      )
      .to(
        [icon, title, copy],
        {
          opacity: 1,
          y: 0,
          duration: 0.32,
          stagger: 0.05,
        },
        "-=0.18"
      )
      .to(
        list,
        {
          opacity: 1,
          y: 0,
          duration: 0.28,
        },
        "-=0.14"
      )
      .to(
        link,
        {
          opacity: 1,
          y: 0,
          duration: 0.28,
        },
        "-=0.14"
      );
  };

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const key = tab.dataset.serviceTab;
      if (!key) return;

      tabs.forEach((item) => {
        item.classList.remove("is-active");
        item.setAttribute("aria-selected", "false");
      });

      tab.classList.add("is-active");
      tab.setAttribute("aria-selected", "true");
      animateServicePanel(key);
    });
  });

  if (window.gsap) {
    const gsap = window.gsap;

    if (window.ScrollTrigger) {
      const ScrollTrigger = window.ScrollTrigger;
      gsap.registerPlugin(ScrollTrigger);

      if (reducedMotion) {
        gsap.set(tabs, { clearProps: "all" });
      } else {
        gsap.from(tabs, {
          opacity: 0,
          x: -34,
          y: 10,
          duration: 0.68,
          ease: "power3.out",
          stagger: 0.12,
          clearProps: "opacity,transform",
          scrollTrigger: {
            trigger: serviceShowcase,
            start: "top 72%",
            once: true,
          },
        });
      }
    }
  }
}

if (hero && window.gsap) {
  const gsap = window.gsap;
  const ScrollTrigger = window.ScrollTrigger;
  const reducedMotion = reduceMotionQuery.matches;
  const motionFactor = reducedMotion ? 0.35 : 1;
  const heroCopy = hero.querySelector(".hero-copy--showcase");
  const heroTitle = hero.querySelector(".hero-title");
  const heroTitleLines = heroTitle ? heroTitle.querySelectorAll("span") : [];
  const heroScript = hero.querySelector(".hero-script");
  const heroLead = hero.querySelector(".hero-lead");
  const heroActions = hero.querySelector(".hero-actions--showcase");
  const heroSignal = hero.querySelector(".hero-signal");
  const heroVisual = hero.querySelector(".hero-visual");
  const layers = hero.querySelectorAll("[data-hero-layer]");
  const image = hero.querySelector(".hero-visual__image");
  const leftCard = hero.querySelector(".hero-float-card--left");
  const rightCard = hero.querySelector(".hero-float-card--right");
  const chartLine = hero.querySelector(".hero-float-card__chart-line");
  const chartArea = hero.querySelector(".hero-float-card__chart-area");
  const chartPoints = hero.querySelectorAll(".hero-float-card__chart-point");
  const bars = hero.querySelectorAll(".hero-float-card__bars span");

  body.classList.add("has-gsap-motion");

  if (ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);
  }

  const restoreHeroVisuals = () => {
    [heroTitle, ...heroTitleLines, heroScript, heroLead, heroActions, image, leftCard, rightCard, heroSignal]
      .filter(Boolean)
      .forEach((node) => {
        gsap.set(node, { clearProps: "opacity,transform,willChange" });
      });

    if (chartArea) {
      gsap.set(chartArea, { opacity: 1, y: 0, clearProps: "transform" });
    }

    if (chartLine) {
      gsap.set(chartLine, { clearProps: "strokeDasharray,strokeDashoffset" });
    }

    if (chartPoints.length) {
      gsap.set(chartPoints, { scale: 1, clearProps: "transform" });
    }

    if (bars.length) {
      gsap.set(bars, { scaleY: 1, clearProps: "transform" });
    }
  };

  if (!reducedMotion) {
    try {
      const introTargets = [
        heroTitle,
        ...heroTitleLines,
        heroScript,
        heroLead,
        heroActions,
        image,
        leftCard,
        rightCard,
        heroSignal,
      ].filter(Boolean);

      gsap.set(introTargets, { willChange: "transform, opacity" });

      if (chartArea) {
        gsap.set(chartArea, { opacity: 0, y: 10 });
      }

      if (chartLine) {
        const lineLength = chartLine.getTotalLength();
        gsap.set(chartLine, {
          strokeDasharray: lineLength,
          strokeDashoffset: lineLength,
        });
      }

      if (chartPoints.length) {
        gsap.set(chartPoints, { scale: 0, transformOrigin: "50% 50%" });
      }

      if (bars.length) {
        gsap.set(bars, { scaleY: 0, transformOrigin: "50% 100%" });
      }

      const heroIntro = gsap.timeline({ delay: 0.15, defaults: { ease: "power3.out" } });

      heroIntro
        .from(heroTitle, { y: 34, opacity: 0, duration: 0.85 })
        .from(
          heroTitleLines,
          {
            yPercent: 26,
            opacity: 0,
            duration: 0.72,
            stagger: 0.1,
          },
          0.05
        )
        .from(heroScript, { y: 26, opacity: 0, duration: 0.7 }, 0.28)
        .from(heroLead, { y: 22, opacity: 0, duration: 0.72 }, 0.42)
        .from(heroActions, { y: 18, opacity: 0, duration: 0.6 }, 0.56)
        .from(heroVisual, { x: 34, opacity: 0, duration: 0.9 }, 0.18)
        .from(image, { y: 36, opacity: 0, scale: 0.96, duration: 0.95 }, 0.28)
        .from(leftCard, { y: 24, opacity: 0, rotate: -3, duration: 0.72 }, 0.78)
        .from(rightCard, { y: 24, opacity: 0, rotate: 3, duration: 0.72 }, 0.88)
        .from(heroSignal, { y: 20, opacity: 0, duration: 0.62 }, 0.98);

      if (chartArea) {
        heroIntro.to(
          chartArea,
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
          },
          1.08
        );
      }

      if (chartLine) {
        heroIntro.to(
          chartLine,
          {
            strokeDashoffset: 0,
            duration: 1.05,
            ease: "power2.inOut",
          },
          1.02
        );
      }

      if (chartPoints.length) {
        heroIntro.to(
          chartPoints,
          {
            scale: 1,
            duration: 0.38,
            stagger: 0.1,
            ease: "back.out(2.2)",
          },
          1.48
        );
      }

      if (bars.length) {
        heroIntro.to(
          bars,
          {
            scaleY: 1,
            duration: 0.65,
            stagger: 0.08,
            ease: "back.out(1.4)",
          },
          1.06
        );

        bars.forEach((bar, index) => {
          gsap.to(bar, {
            scaleY: 0.82 + (index % 2 === 0 ? 0.16 : 0.24),
            duration: 1.8 + index * 0.18,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: 1.7 + index * 0.05,
            transformOrigin: "50% 100%",
          });
        });
      }
    } catch (error) {
      restoreHeroVisuals();
      console.error("Hero intro animation failed:", error);
    }
  }

  layers.forEach((layer, index) => {
    const inner = layer.querySelector(".hero-motion-layer__shape") || layer;
    const duration = 14 + index * 2.2;
    const yPercent = (index === 0 ? 10 : index === 1 ? -13 : 16) * motionFactor;
    const scale = 1 + (index === 0 ? 0.05 : index === 1 ? 0.08 : 0.11) * motionFactor;

    gsap.to(inner, {
      yPercent,
      scale,
      duration,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
    });

    if (ScrollTrigger) {
      gsap.to(layer, {
        y: (48 + index * 30) * motionFactor,
        ease: "none",
        scrollTrigger: {
          trigger: hero,
          start: "top top",
          end: "bottom top",
          scrub: 1.1,
        },
      });
    }
  });

  if (image) {
    gsap.to(image, {
      y: 14 * motionFactor,
      rotation: -0.9 * motionFactor,
      scale: 1 + 0.012 * motionFactor,
      duration: 8.8,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      transformOrigin: "50% 60%",
    });
  }

  const layerSetups = Array.from(layers).map((layer) => {
    const depth = parseFloat(layer.getAttribute("data-hero-layer")) || 0.2;
    const inner = layer.querySelector(".hero-motion-layer__shape") || layer;
    return {
      depth,
      xTo: gsap.quickTo(inner, "x", { duration: 0.7, ease: "power2.out" }),
      yTo: gsap.quickTo(inner, "y", { duration: 0.8, ease: "power2.out" }),
      rotateTo: gsap.quickTo(inner, "rotation", { duration: 0.9, ease: "power2.out" }),
    };
  });

  if (!reducedMotion) {
    hero.addEventListener("pointermove", (event) => {
      const rect = hero.getBoundingClientRect();
      const normalizedX = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
      const normalizedY = ((event.clientY - rect.top) / rect.height - 0.5) * 2;

      layerSetups.forEach(({ depth, xTo, yTo, rotateTo }, index) => {
        const layerStrength = index === 0 ? 90 : index === 1 ? 132 : 176;
        const verticalStrength = index === 0 ? 56 : index === 1 ? 82 : 104;
        const rotationStrength = index === 0 ? 2.4 : index === 1 ? 3.8 : 5.2;

        xTo(normalizedX * layerStrength * depth);
        yTo(normalizedY * verticalStrength * depth);
        rotateTo(normalizedX * rotationStrength * depth);
      });
    });

    hero.addEventListener("pointerleave", () => {
      layerSetups.forEach(({ xTo, yTo, rotateTo }) => {
        xTo(0);
        yTo(0);
        rotateTo(0);
      });
    });
  }
}
