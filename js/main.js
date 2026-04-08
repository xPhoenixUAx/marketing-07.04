const body = document.body;
const header = document.querySelector("[data-header]");
const menuToggle = document.querySelector("[data-menu-toggle]");
const mobileMenu = document.querySelector("[data-mobile-menu]");
const siteNav = document.querySelector(".site-nav");
const revealItems = document.querySelectorAll(".reveal");
const faqItems = document.querySelectorAll("[data-faq-item]");
const yearTargets = document.querySelectorAll("[data-year]");
const countUpItems = document.querySelectorAll("[data-count-up]");
const serviceShowcase = document.querySelector("[data-service-showcase]");
const whyUs = document.querySelector(".why-us");
const brandTransform = document.querySelector("[data-brand-transform]");
const testimonialSection = document.querySelector("[data-testimonials]");
const ctaBanners = document.querySelectorAll("[data-cta-banner]");
const hero = document.querySelector("[data-hero]");
const formStatus = document.querySelector("[data-form-status]");
const contactSuccessModal = document.querySelector("[data-contact-success-modal]");
const reduceMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
const currentPath = window.location.pathname.split("/").pop() || "index.html";
const servicePages = [
  { href: "brand-strategy.html", label: "Brand Strategy" },
  { href: "paid-advertising.html", label: "Paid Advertising" },
  { href: "seo.html", label: "SEO" },
  { href: "content-marketing.html", label: "Content Marketing" },
  { href: "social-media-campaigns.html", label: "Social Media Campaigns" },
  { href: "web-design-cro.html", label: "Web Design & CRO" },
  { href: "email-automation.html", label: "Email Automation" },
  { href: "analytics-reporting.html", label: "Analytics & Reporting" },
];
const COOKIE_PREFS_KEY = "primeset_cookie_preferences_v1";
const COOKIE_PREFS_MAX_AGE = 60 * 60 * 24 * 365;

const readCookiePreferences = () => {
  try {
    const raw = window.localStorage.getItem(COOKIE_PREFS_KEY);
    if (!raw) return null;

    const parsed = JSON.parse(raw);
    return {
      essential: true,
      analytics: Boolean(parsed.analytics),
      marketing: Boolean(parsed.marketing),
      consentedAt: parsed.consentedAt || null,
    };
  } catch (error) {
    return null;
  }
};

const writeCookiePreferences = (preferences) => {
  const payload = {
    essential: true,
    analytics: Boolean(preferences.analytics),
    marketing: Boolean(preferences.marketing),
    consentedAt: new Date().toISOString(),
  };

  window.localStorage.setItem(COOKIE_PREFS_KEY, JSON.stringify(payload));

  const cookieValue = `essential:1|analytics:${payload.analytics ? 1 : 0}|marketing:${payload.marketing ? 1 : 0}`;
  document.cookie = `cookie_consent=${encodeURIComponent(cookieValue)}; max-age=${COOKIE_PREFS_MAX_AGE}; path=/; SameSite=Lax`;

  return payload;
};

if (siteNav) {
  const servicesLink = siteNav.querySelector('a[href="services.html"]');

  if (servicesLink && !siteNav.querySelector(".site-nav__dropdown")) {
    const isServicesOverview = currentPath === "services.html";
    const activeService = servicePages.find((item) => item.href === currentPath);
    const dropdown = document.createElement("div");
    dropdown.className = "site-nav__dropdown";

    if (isServicesOverview || activeService) {
      dropdown.classList.add("is-current");
    }

    const toggle = document.createElement("a");
    toggle.className = "site-nav__dropdown-toggle";
    toggle.href = "services.html";
    toggle.innerHTML =
      'Services <span class="site-nav__dropdown-icon" aria-hidden="true">▾</span>';

    if (isServicesOverview) {
      toggle.setAttribute("aria-current", "page");
    }

    const menu = document.createElement("div");
    menu.className = "site-nav__dropdown-menu";

    servicePages.forEach((item) => {
      const link = document.createElement("a");
      link.href = item.href;
      link.textContent = item.label;

      if (item.href === currentPath) {
        link.setAttribute("aria-current", "page");
      }

      menu.appendChild(link);
    });

    dropdown.append(toggle, menu);
    servicesLink.replaceWith(dropdown);
  }
}

if (mobileMenu) {
  const mobileServicesLink = mobileMenu.querySelector('.mobile-menu__link[href="services.html"]');

  if (mobileServicesLink && !mobileMenu.querySelector(".mobile-menu__item--dropdown")) {
    const parentItem = mobileServicesLink.closest(".mobile-menu__item");
    const isServicesOverview = currentPath === "services.html";
    const activeService = servicePages.find((item) => item.href === currentPath);
    const dropdownItem = document.createElement("div");
    dropdownItem.className = "mobile-menu__item mobile-menu__item--dropdown";

    if (parentItem?.getAttribute("style")) {
      dropdownItem.setAttribute("style", parentItem.getAttribute("style"));
    }

    if (isServicesOverview || activeService) {
      dropdownItem.classList.add("is-current", "is-open");
    }

    const toggle = document.createElement("button");
    toggle.type = "button";
    toggle.className = "mobile-menu__link mobile-menu__dropdown-toggle";
    toggle.setAttribute("data-mobile-dropdown-toggle", "");
    toggle.setAttribute("aria-expanded", isServicesOverview || activeService ? "true" : "false");
    toggle.innerHTML =
      'Services <span class="mobile-menu__dropdown-icon" aria-hidden="true">▾</span>';

    const menu = document.createElement("div");
    menu.className = "mobile-menu__submenu";

    servicePages.forEach((item) => {
      const link = document.createElement("a");
      link.href = item.href;
      link.className = "mobile-menu__submenu-link";
      link.dataset.mobileLink = "";
      link.innerHTML = `${item.label}<span aria-hidden="true">↗</span>`;

      if (item.href === currentPath) {
        link.setAttribute("aria-current", "page");
      }

      menu.appendChild(link);
    });

    dropdownItem.append(toggle, menu);
    parentItem?.replaceWith(dropdownItem);
  }
}

if (body && !body.querySelector("[data-cookie-console]")) {
  const existingPreferences = readCookiePreferences();
  let draftPreferences = existingPreferences
    ? { ...existingPreferences }
    : { essential: true, analytics: false, marketing: false };

  const cookieConsole = document.createElement("aside");
  cookieConsole.className = "cookie-console";
  cookieConsole.dataset.cookieConsole = "true";
  cookieConsole.setAttribute("aria-live", "polite");

  cookieConsole.innerHTML = `
    <div class="cookie-console__panel" role="dialog" aria-modal="false" aria-labelledby="cookie-console-title">
      <div class="cookie-console__top">
        <div>
          <span class="cookie-console__eyebrow">Privacy controls</span>
          <h2 class="cookie-console__title" id="cookie-console-title">Shape the <span>data trail</span> you allow.</h2>
        </div>
        <button class="cookie-console__close" type="button" aria-label="Close cookie settings" data-cookie-close>&times;</button>
      </div>
      <p class="cookie-console__copy">
        We use essential cookies to keep the site working, and optional analytics or marketing cookies only if you allow them.
        <a href="cookie.html">Read the policy</a>
      </p>
      <div class="cookie-console__chips" aria-hidden="true">
        <span class="cookie-console__chip cookie-console__chip--essential">Essential</span>
        <span class="cookie-console__chip cookie-console__chip--analytics">Analytics</span>
        <span class="cookie-console__chip cookie-console__chip--marketing">Marketing</span>
      </div>
      <div class="cookie-console__actions">
        <button class="cookie-console__button cookie-console__button--primary" type="button" data-cookie-accept-all>Accept all</button>
        <button class="cookie-console__button cookie-console__button--ghost" type="button" data-cookie-essential>Essential only</button>
        <button class="cookie-console__button cookie-console__button--link" type="button" data-cookie-customize>Customize</button>
      </div>
      <div class="cookie-console__prefs" data-cookie-prefs>
        <div class="cookie-console__pref">
          <div>
            <strong>Strictly necessary</strong>
            <p>Required for navigation, security, and form delivery.</p>
          </div>
          <button class="cookie-console__switch" type="button" aria-pressed="true" disabled aria-label="Strictly necessary cookies are always enabled"></button>
        </div>
        <div class="cookie-console__pref">
          <div>
            <strong>Analytics</strong>
            <p>Helps us understand page visits, scroll depth, and site performance.</p>
          </div>
          <button class="cookie-console__switch" type="button" aria-pressed="false" data-cookie-toggle="analytics" aria-label="Toggle analytics cookies"></button>
        </div>
        <div class="cookie-console__pref">
          <div>
            <strong>Marketing</strong>
            <p>Supports remarketing, campaign attribution, and ad platform signals.</p>
          </div>
          <button class="cookie-console__switch" type="button" aria-pressed="false" data-cookie-toggle="marketing" aria-label="Toggle marketing cookies"></button>
        </div>
      </div>
      <div class="cookie-console__footer">
        <span class="cookie-console__note">You can reopen this panel any time.</span>
        <button class="cookie-console__button cookie-console__button--ghost" type="button" data-cookie-save>Save preferences</button>
      </div>
    </div>
    <button class="cookie-console__launcher" type="button" data-cookie-launcher>Cookie settings</button>
  `;

  body.appendChild(cookieConsole);

  const analyticsToggle = cookieConsole.querySelector('[data-cookie-toggle="analytics"]');
  const marketingToggle = cookieConsole.querySelector('[data-cookie-toggle="marketing"]');
  const launcher = cookieConsole.querySelector("[data-cookie-launcher]");
  const closeButton = cookieConsole.querySelector("[data-cookie-close]");
  const customizeButton = cookieConsole.querySelector("[data-cookie-customize]");
  const saveButton = cookieConsole.querySelector("[data-cookie-save]");
  const acceptAllButton = cookieConsole.querySelector("[data-cookie-accept-all]");
  const essentialOnlyButton = cookieConsole.querySelector("[data-cookie-essential]");

  const syncCookieConsole = () => {
    if (analyticsToggle) {
      analyticsToggle.setAttribute("aria-pressed", String(Boolean(draftPreferences.analytics)));
    }

    if (marketingToggle) {
      marketingToggle.setAttribute("aria-pressed", String(Boolean(draftPreferences.marketing)));
    }
  };

  const openCookieConsole = (configure = false) => {
    cookieConsole.classList.add("is-open");
    cookieConsole.classList.toggle("is-configuring", configure);
  };

  const closeCookieConsole = () => {
    cookieConsole.classList.remove("is-open");
    cookieConsole.classList.remove("is-configuring");
  };

  const saveCookiePreferences = (preferences) => {
    draftPreferences = writeCookiePreferences(preferences);
    syncCookieConsole();
    closeCookieConsole();
  };

  syncCookieConsole();

  if (!existingPreferences) {
    openCookieConsole(false);
  }

  launcher?.addEventListener("click", () => {
    openCookieConsole(true);
  });

  closeButton?.addEventListener("click", () => {
    closeCookieConsole();
  });

  customizeButton?.addEventListener("click", () => {
    const nextState = !cookieConsole.classList.contains("is-configuring");
    cookieConsole.classList.toggle("is-configuring", nextState);
    cookieConsole.classList.add("is-open");
  });

  acceptAllButton?.addEventListener("click", () => {
    saveCookiePreferences({ essential: true, analytics: true, marketing: true });
  });

  essentialOnlyButton?.addEventListener("click", () => {
    saveCookiePreferences({ essential: true, analytics: false, marketing: false });
  });

  saveButton?.addEventListener("click", () => {
    saveCookiePreferences(draftPreferences);
  });

  [analyticsToggle, marketingToggle].forEach((toggle) => {
    toggle?.addEventListener("click", () => {
      const key = toggle.dataset.cookieToggle;
      draftPreferences = {
        ...draftPreferences,
        [key]: !draftPreferences[key],
      };
      syncCookieConsole();
    });
  });
}

if (body.classList.contains("page-service")) {
  const pageMain = document.querySelector(".page-main");

  if (pageMain && !pageMain.querySelector("[data-service-prints]")) {
    const printLayer = document.createElement("div");
    printLayer.className = "service-print-layer";
    printLayer.setAttribute("aria-hidden", "true");
    printLayer.dataset.servicePrints = "true";

    const prints = [
      { icon: "fa-google", theme: "google", top: "8%", left: "4%", size: "2.8rem", rotate: "-16deg" },
      { icon: "fa-meta", theme: "meta", top: "12%", right: "6%", size: "3.4rem", rotate: "14deg" },
      { icon: "fa-youtube", theme: "youtube", top: "24%", left: "9%", size: "2.5rem", rotate: "-12deg" },
      { icon: "fa-linkedin-in", theme: "linkedin", top: "18%", left: "26%", size: "2rem", rotate: "8deg" },
      { icon: "fa-instagram", theme: "instagram", top: "20%", right: "24%", size: "2.4rem", rotate: "-14deg" },
      { icon: "fa-linkedin-in", theme: "linkedin", top: "31%", right: "10%", size: "2.3rem", rotate: "11deg" },
      { icon: "fa-instagram", theme: "instagram", top: "43%", left: "5%", size: "3rem", rotate: "-10deg" },
      { icon: "fa-google", theme: "google", top: "36%", left: "22%", size: "2.1rem", rotate: "13deg" },
      { icon: "fa-youtube", theme: "youtube", top: "39%", right: "22%", size: "2.2rem", rotate: "-18deg" },
      { icon: "fa-google", theme: "google", top: "49%", right: "7%", size: "2.6rem", rotate: "10deg" },
      { icon: "fa-meta", theme: "meta", top: "61%", left: "8%", size: "2.9rem", rotate: "-18deg" },
      { icon: "fa-linkedin-in", theme: "linkedin", top: "55%", left: "28%", size: "2.1rem", rotate: "12deg" },
      { icon: "fa-instagram", theme: "instagram", top: "58%", right: "28%", size: "2.4rem", rotate: "-9deg" },
      { icon: "fa-youtube", theme: "youtube", top: "69%", right: "12%", size: "2.4rem", rotate: "16deg" },
      { icon: "fa-linkedin-in", theme: "linkedin", top: "78%", left: "3%", size: "3.2rem", rotate: "-8deg" },
      { icon: "fa-google", theme: "google", top: "74%", left: "24%", size: "2rem", rotate: "15deg" },
      { icon: "fa-meta", theme: "meta", top: "72%", right: "25%", size: "2.7rem", rotate: "-16deg" },
      { icon: "fa-instagram", theme: "instagram", top: "85%", right: "6%", size: "2.8rem", rotate: "12deg" },
      { icon: "fa-google", theme: "google", top: "90%", left: "18%", size: "2.2rem", rotate: "-14deg" },
      { icon: "fa-meta", theme: "meta", top: "94%", right: "20%", size: "2.5rem", rotate: "9deg" },
      { icon: "fa-youtube", theme: "youtube", top: "88%", left: "36%", size: "2rem", rotate: "-11deg" },
      { icon: "fa-linkedin-in", theme: "linkedin", top: "92%", right: "34%", size: "2.1rem", rotate: "14deg" },
    ];

    prints.forEach((item) => {
      const mark = document.createElement("span");
      mark.className = `service-print service-print--${item.theme}`;
      mark.style.top = item.top;
      mark.style.fontSize = item.size;
      mark.style.transform = `rotate(${item.rotate})`;

      if (item.left) mark.style.left = item.left;
      if (item.right) mark.style.right = item.right;

      mark.innerHTML = `<i class="fa-brands ${item.icon}"></i>`;
      printLayer.appendChild(mark);
    });

    pageMain.prepend(printLayer);
  }
}

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

    const dropdownToggle = event.target.closest("[data-mobile-dropdown-toggle]");
    if (dropdownToggle) {
      const dropdownItem = dropdownToggle.closest(".mobile-menu__item--dropdown");
      const isOpen = dropdownItem?.classList.contains("is-open");

      mobileMenu
        .querySelectorAll(".mobile-menu__item--dropdown")
        .forEach((item) => {
          item.classList.remove("is-open");
          const toggle = item.querySelector("[data-mobile-dropdown-toggle]");
          if (toggle) toggle.setAttribute("aria-expanded", "false");
        });

      if (dropdownItem && !isOpen) {
        dropdownItem.classList.add("is-open");
        dropdownToggle.setAttribute("aria-expanded", "true");
      }

      return;
    }

    const link = event.target.closest("[data-mobile-link]");
    if (link) {
      closeMenu();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu();
  });
}

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

if (formStatus) {
  const params = new URLSearchParams(window.location.search);
  const formState = params.get("form");
  const successCloseControls = contactSuccessModal?.querySelectorAll("[data-contact-success-close]");
  const successDialog = contactSuccessModal?.querySelector(".contact-success-modal__dialog");

  const closeContactSuccessModal = () => {
    if (!contactSuccessModal) return;
    contactSuccessModal.hidden = true;
    body?.classList.remove("contact-modal-open");
  };

  if (formState === "success") {
    if (contactSuccessModal) {
      contactSuccessModal.hidden = false;
      body?.classList.add("contact-modal-open");
      window.setTimeout(() => {
        successCloseControls?.[0]?.focus();
      }, 40);
    } else {
      formStatus.hidden = false;
      formStatus.classList.add("form-status--success");
      formStatus.textContent =
        "Thanks. Your inquiry was sent successfully. We will continue the conversation by email.";
    }
  } else if (formState === "invalid" || formState === "error") {
    formStatus.hidden = false;
    formStatus.classList.add("form-status--error");
    formStatus.textContent =
      "We could not send your inquiry. Please check the required fields and try again, or email support@primesetltd.com.";
  }

  successCloseControls?.forEach((control) => {
    control.addEventListener("click", closeContactSuccessModal);
  });

  contactSuccessModal?.addEventListener("click", (event) => {
    if (!successDialog) return;
    if (!successDialog.contains(event.target)) {
      closeContactSuccessModal();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && contactSuccessModal && !contactSuccessModal.hidden) {
      closeContactSuccessModal();
    }
  });

  if (formState && window.history.replaceState) {
    window.history.replaceState({}, "", window.location.pathname + window.location.hash);
  }
}

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
        link: "paid-advertising.html",
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
        link: "social-media-campaigns.html",
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
        link: "web-design-cro.html",
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
        link: "seo.html",
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
        link: "analytics-reporting.html",
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
        link: "email-automation.html",
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

if (whyUs && window.gsap) {
  const gsap = window.gsap;
  const ScrollTrigger = window.ScrollTrigger;
  const reducedMotion = reduceMotionQuery.matches;
  const visual = whyUs.querySelector(".why-us__visual");
  const backdrop = whyUs.querySelector(".why-us__backdrop");
  const image = whyUs.querySelector(".why-us__image");
  const statCard = whyUs.querySelector(".why-us__stat-card");
  const statLabel = whyUs.querySelector(".why-us__stat-label");
  const statRing = whyUs.querySelector(".why-us__stat-ring");
  const statLines = whyUs.querySelectorAll(".why-us__stat-lines span");
  const content = whyUs.querySelector(".why-us__content");
  const heading = whyUs.querySelector(".why-us__content h2");
  const lead = whyUs.querySelector(".why-us__lead");
  const listItems = whyUs.querySelectorAll(".why-us__list li");
  const cta = whyUs.querySelector(".why-us__cta");

  if (ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);
  }

  if (!reducedMotion) {
    const introTargets = [visual, heading, lead, ...listItems, cta].filter(Boolean);
    gsap.set(introTargets, { willChange: "transform, opacity" });

    gsap
      .timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: {
          trigger: whyUs,
          start: "top 72%",
          once: true,
        },
      })
      .from(
        visual,
        {
          opacity: 0,
          x: -26,
          duration: 0.7,
        },
        0
      )
      .from(
        [heading, lead],
        {
          opacity: 0,
          y: 28,
          duration: 0.62,
          stagger: 0.08,
        },
        0.08
      )
      .from(
        listItems,
        {
          opacity: 0,
          y: 18,
          duration: 0.44,
          stagger: 0.07,
        },
        0.24
      )
      .from(
        cta,
        {
          opacity: 0,
          y: 16,
          duration: 0.4,
        },
        0.42
      )
      .from(
        statCard,
        {
          opacity: 0,
          y: 18,
          scale: 0.94,
          duration: 0.48,
        },
        0.28
      );

    if (image) {
      gsap.to(image, {
        y: 12,
        rotation: -0.8,
        duration: 7.4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        transformOrigin: "50% 60%",
      });
    }

    if (statCard) {
      gsap.to(statCard, {
        y: -10,
        rotation: 1.2,
        duration: 5.8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        transformOrigin: "50% 50%",
      });
    }

    if (backdrop) {
      gsap.to(backdrop, {
        yPercent: -2,
        xPercent: 1.2,
        scale: 1.018,
        duration: 10.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        transformOrigin: "50% 50%",
      });

      if (ScrollTrigger) {
        gsap.to(backdrop, {
          y: 34,
          ease: "none",
          scrollTrigger: {
            trigger: whyUs,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.9,
          },
        });
      }
    }

    if (statRing) {
      gsap.to(statRing, {
        rotation: 18,
        duration: 6.8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        transformOrigin: "50% 50%",
      });
    }

    if (statLines.length) {
      gsap.to(statLines, {
        scaleX: (index) => (index === 0 ? 1.08 : 1.14),
        duration: 2.8,
        repeat: -1,
        yoyo: true,
        stagger: 0.18,
        ease: "sine.inOut",
        transformOrigin: "0% 50%",
      });
    }

    if (statLabel) {
      gsap.to(statLabel, {
        opacity: 0.76,
        duration: 2.4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }
  } else {
    gsap.set(
      [visual, backdrop, image, statCard, statLabel, statRing, ...statLines, heading, lead, ...listItems, cta].filter(Boolean),
      { clearProps: "all" }
    );
  }
}

if (brandTransform) {
  const viewport = brandTransform.querySelector("[data-brand-viewport]");
  const track = brandTransform.querySelector("[data-brand-track]");
  const dots = brandTransform.querySelectorAll("[data-brand-dot]");
  const prevButton = brandTransform.querySelector("[data-brand-prev]");
  const nextButton = brandTransform.querySelector("[data-brand-next]");
  const backgroundLayers = brandTransform.querySelectorAll("[data-brand-bg-layer]");
  const modal = document.querySelector("[data-brand-modal]");
  const modalImage = modal?.querySelector("[data-brand-modal-image]");
  const modalTag = modal?.querySelector("[data-brand-modal-tag]");
  const modalTitle = modal?.querySelector("[data-brand-modal-title]");
  const modalCopy = modal?.querySelector("[data-brand-modal-copy]");
  const modalOverview = modal?.querySelector("[data-brand-modal-overview]");
  const modalList = modal?.querySelector("[data-brand-modal-list]");
  const modalResult = modal?.querySelector("[data-brand-modal-result]");
  const modalCloseControls = modal?.querySelectorAll("[data-brand-modal-close]");
  const reducedMotion = reduceMotionQuery.matches;
  const loopBuffer = 2;
  let activeBrandIndex = 0;
  let currentRenderIndex = loopBuffer;
  let currentTrackX = 0;
  let isAnimating = false;
  let isDragging = false;
  let dragStartX = 0;
  let dragStartTranslate = 0;
  let dragDelta = 0;

  const brandSlides = [
    {
      tag: "Growth Systems",
      title: "Lead flow architecture built around demand quality, not just volume.",
      copy: "We connect Google Ads, Meta Ads, landing pages, and reporting into one system so budget decisions become clearer and conversion efficiency improves.",
      link: "brand-strategy.html",
      image: "img/home/gallery/growth.jpg",
      imageAlt: "Growth systems showcase",
      overview:
        "This engagement focused on turning fragmented acquisition into one decision-ready growth system. Search, paid social, landing pages, and attribution had been managed separately, which made budget allocation reactive and lead quality inconsistent.",
      details: [
        "Rebuilt campaign structure around offer and demand stage instead of channel silos.",
        "Aligned Google Ads, Meta retargeting, and landing-page messaging to one qualification path.",
        "Defined cleaner conversion events in GA4 and GTM so teams could compare traffic quality, not just volume.",
      ],
      result:
        "Leadership got a much clearer view of which traffic sources were actually creating qualified pipeline, which made scaling decisions faster and less political.",
    },
    {
      tag: "Paid Media",
      title: "Search rebuild for a regional service brand.",
      copy: "Intent structure, landing-page alignment, and reporting cleanup that reduced wasted clicks and improved lead fit.",
      link: "paid-advertising.html",
      image: "img/home/gallery/paid.jpg",
      imageAlt: "Paid media showcase",
      overview:
        "The account had spend, but not enough control. High-intent and low-intent traffic were blended together, landing pages were too generic, and reporting didnвЂ™t explain which ad groups were producing useful sales conversations.",
      details: [
        "Separated campaigns by intent depth, service category, and location economics.",
        "Reworked ad copy and extensions to pre-qualify before the click.",
        "Matched landing-page structure and proof to the actual search language driving demand.",
      ],
      result:
        "The rebuild reduced wasted search spend and improved the consistency of lead quality coming into the sales team.",
    },
    {
      tag: "Analytics",
      title: "Reporting system rebuilt for leadership visibility.",
      copy: "GA4, GTM, attribution cleanup, and cleaner weekly decision signals for budget and pipeline reviews.",
      link: "analytics-reporting.html",
      image: "img/home/gallery/analytics.jpg",
      imageAlt: "Analytics showcase",
      overview:
        "This case was less about traffic and more about visibility. Teams had data in multiple places, inconsistent definitions of a lead, and too much manual interpretation every time budget questions came up.",
      details: [
        "Standardized GA4 events and GTM triggers around meaningful business actions.",
        "Cleaned up attribution logic so paid, organic, and retargeting could be evaluated on the same framework.",
        "Built decision-oriented reporting views for leadership, channel owners, and weekly performance reviews.",
      ],
      result:
        "Instead of debating what the numbers meant, teams could review one clearer operating picture and move faster on budget, funnel, and channel priorities.",
    },
    {
      tag: "Creative Testing",
      title: "Offer-led creative system rolled out across paid social.",
      copy: "Creative variations were structured around audience stage, offer clarity, and handoff into landing-page conversion paths.",
      link: "social-media-campaigns.html",
      image: "img/home/gallery/creative.jpg",
      imageAlt: "Creative testing showcase",
      overview:
        "The goal here was to stop treating creative like isolated assets and start treating it like a testing system. Performance had plateaued because ads were being refreshed visually, but not strategically.",
      details: [
        "Mapped concepts to cold, warm, and retargeting audiences instead of using one generic narrative.",
        "Structured tests around hooks, proof, CTA framing, and offer clarity rather than surface-level design swaps.",
        "Connected each winning concept to the right landing-page path so click-through gains translated into better conversion behavior.",
      ],
      result:
        "Creative output became easier to scale because each new iteration had a clear strategic role inside the acquisition system, not just a visual variation.",
    },
  ];

  const normalizeBrandIndex = (index) => {
    const total = brandSlides.length;
    return ((index % total) + total) % total;
  };

  const buildRenderSlides = () => [
    ...brandSlides.slice(-loopBuffer),
    ...brandSlides,
    ...brandSlides.slice(0, loopBuffer),
  ];

  const renderSlides = buildRenderSlides();

  const renderBrandTransform = () => {
    if (!track) return;
    track.innerHTML = renderSlides
      .map(
        (slide, index) => `
          <article class="brand-transform__card" data-brand-slide="${index}">
            <div class="brand-transform__media">
              <img src="${slide.image}" alt="${slide.imageAlt}" loading="lazy" />
            </div>
            <div class="brand-transform__body">
              <span class="brand-transform__tag">${slide.tag}</span>
              <h3>${slide.title}</h3>
              <p>${slide.copy}</p>
              <a class="brand-transform__link" href="${slide.link}">View details</a>
            </div>
          </article>
        `
      )
      .join("");
  };

  const openBrandModal = (slideIndex) => {
    if (!modal) return;
    const slide = brandSlides[slideIndex];
    if (!slide) return;

    if (modalImage) {
      modalImage.src = slide.image;
      modalImage.alt = slide.imageAlt;
    }
    if (modalTag) modalTag.textContent = slide.tag;
    if (modalTitle) modalTitle.textContent = slide.title;
    if (modalCopy) modalCopy.textContent = slide.copy;
    if (modalOverview) modalOverview.textContent = slide.overview;
    if (modalResult) modalResult.textContent = slide.result;

    if (modalList) {
      modalList.innerHTML = slide.details.map((item) => `<li>${item}</li>`).join("");
    }

    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    body.classList.add("modal-open");
  };

  const closeBrandModal = () => {
    if (!modal) return;
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    body.classList.remove("modal-open");
  };

  const updateBrandState = () => {
    if (!track) return;
    const slides = track.querySelectorAll("[data-brand-slide]");
    slides.forEach((slide, index) => {
      const isActive = index === currentRenderIndex;
      const isPrev = index === currentRenderIndex - 1;
      const isNext = index === currentRenderIndex + 1;
      slide.classList.toggle("is-active", isActive);
      slide.classList.toggle("is-prev", isPrev);
      slide.classList.toggle("is-next", isNext);
      slide.classList.toggle(
        "is-far",
        index < currentRenderIndex - 1 || index > currentRenderIndex + 1
      );
      slide.setAttribute("aria-hidden", String(!isActive && !isPrev && !isNext));
      slide.style.pointerEvents = isActive || isPrev || isNext ? "auto" : "none";
      slide.dataset.brandRole = isActive ? "active" : isPrev ? "prev" : isNext ? "next" : "far";
    });

    const actualIndex = normalizeBrandIndex(currentRenderIndex - loopBuffer);
    activeBrandIndex = actualIndex;
    dots.forEach((dot, dotIndex) => {
      const isActive = dotIndex === actualIndex;
      dot.classList.toggle("is-active", isActive);
      dot.setAttribute("aria-pressed", String(isActive));
    });
  };

  const getTrackTarget = (renderIndex) => {
    if (!viewport || !track) return 0;
    const slides = track.querySelectorAll("[data-brand-slide]");
    const slide = slides[renderIndex];
    if (!slide) return 0;
    const viewportRect = viewport.getBoundingClientRect();
    const slideRect = slide.getBoundingClientRect();
    const viewportStyles = window.getComputedStyle(viewport);
    const viewportPaddingLeft = parseFloat(viewportStyles.paddingLeft || "0");
    const viewportPaddingRight = parseFloat(viewportStyles.paddingRight || "0");
    const visibleCenter =
      viewportRect.left +
      viewportPaddingLeft +
      (viewportRect.width - viewportPaddingLeft - viewportPaddingRight) / 2;
    const slideCenter = slideRect.left + slideRect.width / 2;
    return currentTrackX + (visibleCenter - slideCenter);
  };

  const applyTrackX = (value) => {
    if (!track) return;
    currentTrackX = value;
    if (window.gsap) {
      window.gsap.set(track, { x: value });
    } else {
      track.style.transform = `translate3d(${value}px, 0, 0)`;
    }
  };

  const setTrackPosition = (renderIndex, animate = true) => {
    if (!track) return;
    const targetX = getTrackTarget(renderIndex);

    if (window.gsap && !reducedMotion && animate) {
      isAnimating = true;
      window.gsap.to(track, {
        x: targetX,
        duration: 0.62,
        ease: "power3.out",
        onComplete: () => {
          isAnimating = false;
        },
      });
    } else {
      isAnimating = false;
      applyTrackX(targetX);
    }
  };

  const snapIfClone = () => {
    if (!track) return;
    let didSnap = false;
    if (currentRenderIndex < loopBuffer) {
      currentRenderIndex += brandSlides.length;
      didSnap = true;
    } else if (currentRenderIndex >= brandSlides.length + loopBuffer) {
      currentRenderIndex -= brandSlides.length;
      didSnap = true;
    }

    if (didSnap) {
      brandTransform.classList.add("is-snapping");
      applyTrackX(getTrackTarget(currentRenderIndex));
      updateBrandState();

      window.requestAnimationFrame(() => {
        brandTransform.classList.remove("is-snapping");
      });
    }
  };

  const goToRenderIndex = (nextRenderIndex, animate = true) => {
    if (!track || isAnimating) return;
    currentRenderIndex = nextRenderIndex;
    updateBrandState();
    if (window.gsap && !reducedMotion && animate) {
      isAnimating = true;
      window.gsap.to(track, {
        x: getTrackTarget(currentRenderIndex),
        duration: 0.62,
        ease: "power3.out",
        onUpdate: () => {
          currentTrackX = window.gsap.getProperty(track, "x");
        },
        onComplete: () => {
          isAnimating = false;
          snapIfClone();
        },
      });
    } else {
      setTrackPosition(currentRenderIndex, false);
      snapIfClone();
    }
  };

  const goToBrandSlide = (nextIndex, animate = true) => {
    const normalized = normalizeBrandIndex(nextIndex);
    goToRenderIndex(normalized + loopBuffer, animate);
  };

  const moveByStep = (direction) => {
    goToRenderIndex(currentRenderIndex + direction);
  };

  const stopTrackTween = () => {
    if (!window.gsap || !track) return;
    window.gsap.killTweensOf(track);
  };

  const onPointerDown = (event) => {
    if (!viewport || !track) return;
    if (event.pointerType === "mouse" && event.button !== 0) return;
    if (isAnimating) return;
    if (event.target.closest("a, button")) return;

    isDragging = true;
    dragStartX = event.clientX;
    dragStartTranslate = currentTrackX;
    dragDelta = 0;
    viewport.classList.add("is-dragging");
    stopTrackTween();
    viewport.setPointerCapture(event.pointerId);
  };

  const onPointerMove = (event) => {
    if (!isDragging || !track) return;
    dragDelta = event.clientX - dragStartX;
    applyTrackX(dragStartTranslate + dragDelta);
  };

  const onPointerUp = (event) => {
    if (!isDragging || !viewport) return;
    isDragging = false;
    viewport.classList.remove("is-dragging");

    const threshold = Math.max(40, viewport.clientWidth * 0.08);
    if (dragDelta <= -threshold) {
      moveByStep(1);
    } else if (dragDelta >= threshold) {
      moveByStep(-1);
    } else {
      setTrackPosition(currentRenderIndex);
    }

    dragDelta = 0;

    if (viewport.hasPointerCapture(event.pointerId)) {
      viewport.releasePointerCapture(event.pointerId);
    }
  };

  renderBrandTransform();
  updateBrandState();
  setTrackPosition(currentRenderIndex, false);

  dots.forEach((dot) => {
    dot.addEventListener("click", () => {
      const nextIndex = Number.parseInt(dot.dataset.brandDot || "0", 10);
      if (!Number.isFinite(nextIndex)) return;
      goToBrandSlide(nextIndex);
    });
  });

  if (viewport) {
    viewport.addEventListener("pointerdown", onPointerDown);
    viewport.addEventListener("pointermove", onPointerMove);
    viewport.addEventListener("pointerup", onPointerUp);
    viewport.addEventListener("pointercancel", onPointerUp);
    viewport.addEventListener("pointerleave", (event) => {
      if (isDragging) onPointerUp(event);
    });

    viewport.setAttribute("tabindex", "0");
    viewport.addEventListener("keydown", (event) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        moveByStep(-1);
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        moveByStep(1);
      }
    });
  }

  if (track) {
    track.addEventListener("click", (event) => {
      const trigger = event.target.closest(".brand-transform__link");
      if (trigger) {
        event.preventDefault();
        const card = trigger.closest("[data-brand-slide]");
        const renderIndex = Number.parseInt(card?.dataset.brandSlide || "", 10);
        if (Number.isFinite(renderIndex)) {
          openBrandModal(normalizeBrandIndex(renderIndex - loopBuffer));
        }
        return;
      }

      const card = event.target.closest("[data-brand-slide]");
      if (!card) return;
      const slideIndex = Number.parseInt(card.dataset.brandSlide || "", 10);
      if (!Number.isFinite(slideIndex)) return;

      if (slideIndex === currentRenderIndex - 1) {
        event.preventDefault();
        moveByStep(-1);
      } else if (slideIndex === currentRenderIndex + 1) {
        event.preventDefault();
        moveByStep(1);
      }
    });
  }

  prevButton?.addEventListener("click", () => moveByStep(-1));
  nextButton?.addEventListener("click", () => moveByStep(1));

  modalCloseControls?.forEach((control) => {
    control.addEventListener("click", closeBrandModal);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && modal?.classList.contains("is-open")) {
      closeBrandModal();
    }
  });

  window.addEventListener("resize", () => {
    stopTrackTween();
    isAnimating = false;
    setTrackPosition(currentRenderIndex, false);
  });

  if (window.gsap && backgroundLayers.length && !reducedMotion) {
    const gsap = window.gsap;
    const backgroundMotion = [
      { baseX: 0, baseY: 0, driftX: 28, driftY: -18, scale: 1.08, rotate: -4, opacity: 0.8, factor: 18 },
      { baseX: 0, baseY: 0, driftX: -34, driftY: 22, scale: 1.12, rotate: 3.5, opacity: 0.92, factor: 26 },
      { baseX: 0, baseY: 0, driftX: 20, driftY: 12, scale: 1.05, rotate: -2, opacity: 0.5, factor: 14 },
    ];

    backgroundLayers.forEach((layer, index) => {
      const motion = backgroundMotion[index] || backgroundMotion[backgroundMotion.length - 1];

      gsap.to(layer, {
        x: motion.driftX,
        y: motion.driftY,
        scale: motion.scale,
        rotation: motion.rotate,
        opacity: motion.opacity,
        duration: 9.5 + index * 2.1,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });
    });

    const pointerXSetters = Array.from(backgroundLayers, (layer, index) =>
      gsap.quickTo(layer, "x", {
        duration: 0.9,
        ease: "power3.out",
        overwrite: "auto",
      })
    );
    const pointerYSetters = Array.from(backgroundLayers, (layer) =>
      gsap.quickTo(layer, "y", {
        duration: 0.9,
        ease: "power3.out",
        overwrite: "auto",
      })
    );

    brandTransform.addEventListener("pointermove", (event) => {
      const rect = brandTransform.getBoundingClientRect();
      const normalizedX = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
      const normalizedY = ((event.clientY - rect.top) / rect.height - 0.5) * 2;

      pointerXSetters.forEach((setX, index) => {
        const motion = backgroundMotion[index] || backgroundMotion[backgroundMotion.length - 1];
        setX(motion.baseX + normalizedX * motion.factor);
        pointerYSetters[index](motion.baseY + normalizedY * motion.factor * 0.55);
      });
    });

    brandTransform.addEventListener("pointerleave", () => {
      pointerXSetters.forEach((setX, index) => {
        const motion = backgroundMotion[index] || backgroundMotion[backgroundMotion.length - 1];
        setX(motion.baseX);
        pointerYSetters[index](motion.baseY);
      });
    });
  }
}

if (testimonialSection) {
  const prevButton = testimonialSection.querySelector("[data-testimonial-prev]");
  const nextButton = testimonialSection.querySelector("[data-testimonial-next]");
  const caption = testimonialSection.querySelector("[data-testimonial-caption]");
  const quote = testimonialSection.querySelector("[data-testimonial-quote]");
  const name = testimonialSection.querySelector("[data-testimonial-name]");
  const role = testimonialSection.querySelector("[data-testimonial-role]");
  const card = testimonialSection.querySelector("[data-testimonial-card]");
  const reducedMotion = reduceMotionQuery.matches;
  let activeTestimonialIndex = 0;
  let testimonialSwapTween = null;

  const testimonials = [
    {
      caption: "A growth partner that brings clarity to every decision.",
      quote:
        "PRIMESET LIMITED helped us stop treating Google Ads, Meta, and our landing pages as separate projects. Once the tracking and conversion flow were rebuilt, the quality of inbound leads improved and the team finally had one clear view of what was working.",
      name: "Amelia R.",
      role: "VP of Marketing, regional healthcare group",
    },
    {
      caption: "They gave our internal team a cleaner operating system.",
      quote:
        "What stood out was how quickly they found the disconnect between ad intent, page structure, and reporting. We were getting traffic before. After the rebuild, we were getting conversations that sales actually wanted.",
      name: "Daniel C.",
      role: "Founder, multi-location professional services brand",
    },
    {
      caption: "Senior thinking, direct execution, no performance theater.",
      quote:
        "We had worked with agencies that reported activity but not insight. PRIMESET LIMITED brought discipline to campaign structure, attribution, and creative testing, and it changed how confidently we could scale paid spend.",
      name: "Lauren M.",
      role: "Director of Growth, B2B SaaS company",
    },
    {
      caption: "They improved both performance and confidence in the numbers.",
      quote:
        "Before the engagement, we were making channel decisions with too much guesswork. After the cleanup across reporting, landing pages, and paid traffic, the team finally trusted what the numbers were telling us and knew where to scale.",
      name: "Marcus B.",
      role: "COO, home services growth brand",
    },
  ];

  const renderTestimonial = (index) => {
    const item = testimonials[index];
    if (!item) return;
    if (caption) caption.textContent = `"${item.caption}"`;
    if (quote) quote.textContent = `"${item.quote}"`;
    if (name) name.textContent = item.name;
    if (role) role.textContent = item.role;
  };

  const swapTestimonial = (nextIndex, direction = 1) => {
    const normalized = (nextIndex + testimonials.length) % testimonials.length;
    if (normalized === activeTestimonialIndex) return;

    if (!window.gsap || reducedMotion || !card) {
      activeTestimonialIndex = normalized;
      renderTestimonial(activeTestimonialIndex);
      return;
    }

    if (testimonialSwapTween) testimonialSwapTween.kill();

    const rotateOut = direction > 0 ? -18 : 18;
    const rotateIn = direction > 0 ? 18 : -18;
    const shiftOut = direction > 0 ? -34 : 34;
    const shiftIn = direction > 0 ? 34 : -34;

    testimonialSwapTween = window.gsap.timeline({
      defaults: { ease: "power2.out" },
      onComplete: () => {
        testimonialSwapTween = null;
      },
    });

    testimonialSwapTween
      .to(card, {
        opacity: 0,
        x: shiftOut,
        rotateY: rotateOut,
        scale: 0.96,
        duration: 0.22,
        transformOrigin: direction > 0 ? "100% 50%" : "0% 50%",
      })
      .add(() => {
        activeTestimonialIndex = normalized;
        renderTestimonial(activeTestimonialIndex);
        window.gsap.set(card, {
          x: shiftIn,
          rotateY: rotateIn,
          scale: 0.96,
          transformOrigin: direction > 0 ? "0% 50%" : "100% 50%",
        });
      })
      .to(card, {
        opacity: 1,
        x: 0,
        rotateY: 0,
        scale: 1,
        duration: 0.38,
        ease: "power3.out",
      });
  };

  renderTestimonial(activeTestimonialIndex);

  prevButton?.addEventListener("click", () => {
    swapTestimonial(activeTestimonialIndex - 1, -1);
  });

  nextButton?.addEventListener("click", () => {
    swapTestimonial(activeTestimonialIndex + 1, 1);
  });
}

if (ctaBanners.length && window.gsap && !reduceMotionQuery.matches) {
  const gsap = window.gsap;
  const ScrollTrigger = window.ScrollTrigger;

  if (ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);

    ctaBanners.forEach((ctaBanner) => {
      const image = ctaBanner.querySelector("[data-cta-banner-image]");
      if (!image) return;

      gsap.set(image, {
        yPercent: -8,
        scale: 1.14,
      });

      gsap.to(image, {
        yPercent: 8,
        scale: 1.18,
        ease: "none",
        scrollTrigger: {
          trigger: ctaBanner,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.1,
        },
      });
    });
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

