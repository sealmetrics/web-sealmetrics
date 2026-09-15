"use client";

import { Picture } from "@/components/ui/Picture";
import Link from "next/link";
import { useState, useRef, useEffect, useCallback } from "react";
import type { Locale } from "@/lib/i18n/types";
import { getDictionary } from "@/lib/i18n/getDictionary";
import { localizedHref } from "@/lib/i18n/navigation";
import { LanguageSwitcher } from "./LanguageSwitcher";

/* ===========================================
   Dropdown data
   =========================================== */

interface DropdownItem {
  href: string;
  label: string;
  desc: string;
}

interface DropdownGroup {
  title?: string;
  items: DropdownItem[];
  /**
   * Column for wide dropdowns. Solutions grew to 16 links once "By problem"
   * joined it — about 1,090px tall as a single column, taller than a laptop
   * viewport inside a fixed header that cannot scroll. Groups that set a
   * column render side by side instead.
   */
  column?: number;
}

interface NavDropdown {
  label: string;
  groups: DropdownGroup[];
}

// Product was a bare link until the brand-monitoring report shipped: one page, one slot.
// It earns a dropdown now for the same reason /why-sealmetrics has one — the trigger still
// goes to /product, and the free report needs a way in that is not the URL bar.
function getProductDropdown(t: ReturnType<typeof getDictionary>["header"], locale: Locale): NavDropdown {
  return {
    label: t.product,
    groups: [
      {
        items: [
          { href: localizedHref("/product", locale), label: t.productOverview, desc: t.productOverviewDesc },
          {
            href: localizedHref("/ai-brand-monitoring", locale),
            label: t.aiBrandMonitoring,
            desc: t.aiBrandMonitoringDesc,
          },
        ],
      },
    ],
  };
}

// The trigger itself links to /why-sealmetrics (the site's strongest sales
// page — it earns a top-level slot, not a slot inside its own dropdown); the
// dropdown keeps the pillar links the nav must carry per SEO-STRATEGY §4.
function getWhyDropdown(t: ReturnType<typeof getDictionary>["header"], locale: Locale): NavDropdown {
  return {
    label: t.why,
    groups: [
      {
        items: [
          { href: localizedHref("/cookieless-analytics", locale), label: t.cookielessAnalytics, desc: t.cookielessAnalyticsDesc },
          { href: localizedHref("/consentless-analytics", locale), label: t.consentlessAnalytics, desc: t.consentlessAnalyticsDesc },
          { href: localizedHref("/complete-data", locale), label: t.completeData, desc: t.completeDataDesc },
          {
            href: "/privacy-end-to-end",
            label: locale === "es" ? "Privacidad de extremo a extremo" : "Privacy end to end",
            desc:
              locale === "es"
                ? "Privado desde el hit hasta la IA privada."
                : "Private from the first hit to private-AI processing.",
          },
          { href: localizedHref("/how-it-works", locale), label: t.howItWorks, desc: t.howItWorksDesc },
        ],
      },
    ],
  };
}

function getSolutionsDropdown(t: ReturnType<typeof getDictionary>["header"], locale: Locale): NavDropdown {
  return {
    label: t.solutions,
    groups: [
      // First, because the site is positioned by the problem a buyer has, not
      // by feature — CONTENT-PLAN-PROBLEM-POSITIONING.md, Phase 2. It lives in
      // Solutions rather than the top bar: the desktop nav has no room for a
      // sixth item at lg (see the note on the <nav> below).
      {
        title: t.byProblem,
        column: 0,
        items: [
          { href: localizedHref("/complete-data", locale), label: t.problemGa4, desc: t.problemGa4Desc },
          { href: localizedHref("/use-cases/revenue-attribution", locale), label: t.problemCampaigns, desc: t.problemCampaignsDesc },
          { href: localizedHref("/use-cases/single-source-of-truth", locale), label: t.problemOneNumber, desc: t.problemOneNumberDesc },
          { href: localizedHref("/gdpr-analytics", locale), label: t.problemCompliance, desc: t.problemComplianceDesc },
        ],
      },
      {
        title: t.byRole,
        column: 1,
        items: [
          { href: localizedHref("/for/cmo", locale), label: t.forCmos, desc: t.forCmosDesc },
          { href: localizedHref("/for/cto", locale), label: t.forCtos, desc: t.forCtosDesc },
          { href: localizedHref("/for/dpo", locale), label: t.forDpos, desc: t.forDposDesc },
        ],
      },
      {
        title: t.byIndustry,
        column: 2,
        items: [
          { href: localizedHref("/for/ecommerce", locale), label: t.ecommerce, desc: t.ecommerceDesc },
          { href: localizedHref("/for/hotels", locale), label: t.hotels, desc: t.hotelsDesc },
          { href: localizedHref("/for/saas", locale), label: t.saas, desc: t.saasDesc },
          { href: localizedHref("/for/agencies", locale), label: t.agencies, desc: t.agenciesDesc },
          { href: localizedHref("/for/media", locale), label: t.media, desc: t.mediaDesc },
          { href: localizedHref("/for/finance", locale), label: t.finance, desc: t.financeDesc },
          { href: localizedHref("/for/healthcare", locale), label: t.healthcare, desc: t.healthcareDesc },
          { href: localizedHref("/for/education", locale), label: t.education, desc: t.educationDesc },
        ],
      },
      {
        column: 1,
        items: [
          { href: localizedHref("/data-loss-calculator", locale), label: t.dataLossCalc, desc: t.dataLossCalcDesc },
        ],
      },
    ],
  };
}

function getResourcesDropdown(t: ReturnType<typeof getDictionary>["header"], locale: Locale): NavDropdown {
  return {
    label: t.resources,
    groups: [
      {
        items: [
          { href: localizedHref("/blog", locale), label: t.blog, desc: t.blogDesc },
          { href: localizedHref("/open", locale), label: t.open, desc: t.openDesc },
          { href: localizedHref("/growth", locale), label: t.growth, desc: t.growthDesc },
          { href: localizedHref("/videos", locale), label: t.videos, desc: t.videosDesc },
          { href: localizedHref("/glossary", locale), label: t.glossary, desc: t.glossaryDesc },
          { href: localizedHref("/platforms", locale), label: t.platforms, desc: t.platformsDesc },
          { href: localizedHref("/vs-ga4", locale), label: t.vsGa4, desc: t.vsGa4Desc },
          { href: localizedHref("/changelog", locale), label: t.changelog, desc: t.changelogDesc },
        ],
      },
    ],
  };
}

/* ===========================================
   Dropdown component
   =========================================== */

function Dropdown({
  dropdown,
  isOpen,
  onToggle,
  onClose,
  labelHref,
}: {
  dropdown: NavDropdown;
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
  // When set, the label navigates there and only the chevron toggles the menu.
  labelHref?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const hasColumns = dropdown.groups.some((g) => g.column !== undefined);
  const columns: DropdownGroup[][] = hasColumns
    ? Array.from(
        { length: Math.max(...dropdown.groups.map((g) => g.column ?? 0)) + 1 },
        (_, i) => dropdown.groups.filter((g) => (g.column ?? 0) === i)
      )
    : [dropdown.groups];

  useEffect(() => {
    if (!isOpen) return;
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [isOpen, onClose]);

  const chevron = (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
    >
      <path d="M3 4.5L6 7.5L9 4.5" />
    </svg>
  );

  return (
    <div ref={ref} className="relative">
      {labelHref ? (
        <span className="flex items-center gap-1 whitespace-nowrap text-[0.9rem] text-text-secondary">
          <Link
            href={labelHref}
            className="no-underline text-text-secondary hover:text-text-primary transition-colors"
          >
            {dropdown.label}
          </Link>
          <button
            type="button"
            onClick={onToggle}
            aria-expanded={isOpen}
            aria-haspopup="true"
            aria-label={`${dropdown.label} menu`}
            className="flex items-center cursor-pointer bg-transparent border-none p-0 text-text-secondary hover:text-text-primary transition-colors"
          >
            {chevron}
          </button>
        </span>
      ) : (
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={isOpen}
          aria-haspopup="true"
          className="flex items-center gap-1 whitespace-nowrap text-[0.9rem] text-text-secondary hover:text-text-primary transition-colors cursor-pointer bg-transparent border-none p-0"
        >
          {dropdown.label}
          {chevron}
        </button>
      )}

      {/* Always in the DOM, hidden with `display:none` when closed.
          It used to be `{isOpen && …}`, which meant the entire nav shipped
          seven crawlable links: every dropdown destination existed only after
          a click no crawler performs. /privacy-end-to-end/ was reachable from
          nowhere else and had zero inbound links site-wide as a result. */}
      {/* A column dropdown is wider than the space around its trigger, so it is
          centred on the header rather than on the button (centred on "Solutions"
          it overflowed a 1024px viewport by 18px). `fixed` resolves against the
          header, not the viewport, because the header's backdrop-filter makes it
          the containing block — so top-full sits right under the 76px bar. */}
      <div
        className={
          !isOpen
            ? "hidden"
            : hasColumns
              ? "fixed top-full left-1/2 -translate-x-1/2 pt-3 z-50"
              : "absolute top-full left-1/2 -translate-x-1/2 pt-3 z-50"
        }
        aria-hidden={!isOpen}
      >
          <div
            role="menu"
            className={
              columns.length > 1
                ? "bg-paper-white border border-signal-ink shadow-hard py-2 grid grid-flow-col auto-cols-[minmax(240px,1fr)] w-max max-w-[calc(100vw-32px)] divide-x divide-warm-100"
                : "bg-paper-white border border-signal-ink shadow-hard py-2 min-w-[260px]"
            }
          >
            {columns.map((groups, ci) => (
              <div key={ci}>
                {groups.map((group, gi) => (
                  <div key={gi}>
                    {gi > 0 && (
                      <div className="my-1.5 mx-5 border-t border-warm-100" />
                    )}
                    {group.title && (
                      <span className="block px-5 pt-2 pb-1 text-[0.65rem] font-medium uppercase tracking-[0.08em] text-text-tertiary">
                        {group.title}
                      </span>
                    )}
                    {group.items.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        role="menuitem"
                        onClick={onClose}
                        className="block px-5 py-2 no-underline hover:bg-warm-50 transition-colors"
                      >
                        <span className="block text-[0.85rem] font-medium text-text-primary leading-snug">
                          {item.label}
                        </span>
                        <span className="block text-[0.75rem] text-text-tertiary mt-0.5">
                          {item.desc}
                        </span>
                      </Link>
                    ))}
                  </div>
                ))}
              </div>
            ))}
          </div>
      </div>
    </div>
  );
}

/* ===========================================
   Header
   =========================================== */

export function Header({ locale = "en" }: { locale?: Locale }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const t = getDictionary(locale).header;
  const productDropdown = getProductDropdown(t, locale);
  const whyDropdown = getWhyDropdown(t, locale);
  const solutionsDropdown = getSolutionsDropdown(t, locale);
  const resourcesDropdown = getResourcesDropdown(t, locale);

  const handleToggle = useCallback(
    (label: string) => {
      setOpenDropdown(openDropdown === label ? null : label);
    },
    [openDropdown]
  );

  const handleClose = useCallback(() => {
    setOpenDropdown(null);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-paper/95 backdrop-blur-xl border-b border-hairline">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 flex items-center justify-between h-[76px]">
        <Link href={localizedHref("/", locale)} className="flex items-center no-underline">
          <Picture
            src="/logos/logo-sealmetrics.svg"
            alt="Sealmetrics"
            width={157}
            height={28}
            className="h-7 w-auto"
            loading="eager"
            fetchPriority="high"
            decoding="sync"
          />
        </Link>

        {/* Desktop nav */}
        {/* Desktop nav starts at lg, not md: five items + two CTAs + the
            language switcher need ~1000px. Below that the hamburger carries
            the same links and both CTAs. */}
        <nav aria-label="Main navigation" className="hidden lg:flex items-center gap-6 xl:gap-7">
          <Dropdown
            dropdown={productDropdown}
            isOpen={openDropdown === "Product"}
            onToggle={() => handleToggle("Product")}
            onClose={handleClose}
            labelHref={localizedHref("/product", locale)}
          />

          <Dropdown
            dropdown={whyDropdown}
            isOpen={openDropdown === "Why"}
            onToggle={() => handleToggle("Why")}
            onClose={handleClose}
            labelHref={localizedHref("/why-sealmetrics", locale)}
          />

          <Dropdown
            dropdown={solutionsDropdown}
            isOpen={openDropdown === "Solutions"}
            onToggle={() => handleToggle("Solutions")}
            onClose={handleClose}
          />

          <Link
            href={localizedHref("/pricing", locale)}
            className="whitespace-nowrap text-[0.9rem] text-text-secondary no-underline hover:text-text-primary transition-colors"
          >
            {t.pricing}
          </Link>

          <Dropdown
            dropdown={resourcesDropdown}
            isOpen={openDropdown === "Resources"}
            onToggle={() => handleToggle("Resources")}
            onClose={handleClose}
          />

          {/* Secondary CTA only from xl: between lg and xl there is room for
              the primary ask but not both. The trial stays reachable from every
              page hero and from the mobile menu. */}
          <a
            href="https://my.sealmetrics.com/register"
            className="hidden xl:inline-flex items-center whitespace-nowrap min-h-[44px] px-4 py-2.5 text-[0.875rem] font-semibold text-signal-ink border border-signal-ink no-underline hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-hard transition-all"
          >
            {t.startTrial}
          </a>
          <Link
            href={localizedHref("/demo", locale)}
            className="inline-flex items-center whitespace-nowrap min-h-[44px] px-5 py-2.5 text-[0.875rem] font-semibold text-signal-ink bg-acid border border-signal-ink no-underline hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-hard transition-all"
          >
            {t.bookDemo}
          </Link>
          <LanguageSwitcher locale={locale} />
        </nav>

        {/* Mobile: language switcher + hamburger */}
        <div className="lg:hidden flex items-center gap-1">
          <LanguageSwitcher locale={locale} />
          <button
            className="p-2 inline-flex items-center justify-center min-w-[44px] min-h-[44px]"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? t.closeMenu : t.openMenu}
            aria-expanded={mobileOpen}
          >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            {mobileOpen ? (
              <path d="M5 5l10 10M15 5l-10 10" />
            ) : (
              <path d="M3 6h14M3 10h14M3 14h14" />
            )}
          </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-paper border-t border-hairline px-4 sm:px-6 py-6 max-h-[calc(100vh-76px)] overflow-y-auto">
          <nav aria-label="Mobile navigation" className="flex flex-col gap-1">
            {/* Product group — label links to the page itself, items are its pages */}
            <div className="py-2.5">
              <Link
                href={localizedHref("/product", locale)}
                className="text-[0.7rem] font-medium uppercase tracking-[0.06em] text-text-tertiary no-underline hover:text-text-primary"
                onClick={() => setMobileOpen(false)}
              >
                {t.product} →
              </Link>
              <div className="mt-2 flex flex-col gap-1 pl-3 border-l border-warm-100">
                {productDropdown.groups.map((group) =>
                  group.items.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="py-1.5 text-[0.9rem] text-text-secondary no-underline hover:text-text-primary"
                      onClick={() => setMobileOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))
                )}
              </div>
            </div>

            {/* Why group — label links to the page itself, items are the pillars */}
            <div className="py-2.5">
              <Link
                href={localizedHref("/why-sealmetrics", locale)}
                className="text-[0.7rem] font-medium uppercase tracking-[0.06em] text-text-tertiary no-underline hover:text-text-primary"
                onClick={() => setMobileOpen(false)}
              >
                {t.why} →
              </Link>
              <div className="mt-2 flex flex-col gap-1 pl-3 border-l border-warm-100">
                {whyDropdown.groups.map((group) =>
                  group.items.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="py-1.5 text-[0.9rem] text-text-secondary no-underline hover:text-text-primary"
                      onClick={() => setMobileOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))
                )}
              </div>
            </div>

            {/* Solutions group */}
            <div className="py-2.5">
              <span className="text-[0.7rem] font-medium uppercase tracking-[0.06em] text-text-tertiary">
                {t.solutions}
              </span>
              <div className="mt-2 flex flex-col gap-1 pl-3 border-l border-warm-100">
                {/* Sixteen links read as one list without their group titles. */}
                {solutionsDropdown.groups.map((group, gi) => (
                  <div key={gi} className="flex flex-col gap-1">
                    {group.title && (
                      <span className="pt-2 text-[0.65rem] font-medium uppercase tracking-[0.08em] text-text-tertiary">
                        {group.title}
                      </span>
                    )}
                    {group.items.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="py-1.5 text-[0.9rem] text-text-secondary no-underline hover:text-text-primary"
                        onClick={() => setMobileOpen(false)}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            <Link
              href={localizedHref("/pricing", locale)}
              className="py-2.5 text-text-secondary no-underline hover:text-text-primary"
              onClick={() => setMobileOpen(false)}
            >
              {t.pricing}
            </Link>

            {/* Resources group */}
            <div className="py-2.5">
              <span className="text-[0.7rem] font-medium uppercase tracking-[0.06em] text-text-tertiary">
                {t.resources}
              </span>
              <div className="mt-2 flex flex-col gap-1 pl-3 border-l border-warm-100">
                {resourcesDropdown.groups.map((group) =>
                  group.items.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="py-1.5 text-[0.9rem] text-text-secondary no-underline hover:text-text-primary"
                      onClick={() => setMobileOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))
                )}
              </div>
            </div>

            <Link
              href={localizedHref("/demo", locale)}
              className="inline-flex items-center justify-center min-h-[44px] px-5 py-2.5 text-[0.875rem] font-semibold text-signal-ink bg-acid border border-signal-ink no-underline mt-3"
              onClick={() => setMobileOpen(false)}
            >
              {t.bookDemo}
            </Link>
            <a
              href="https://my.sealmetrics.com/register"
              className="inline-flex items-center justify-center min-h-[44px] px-5 py-2.5 text-[0.875rem] font-semibold text-signal-ink border border-signal-ink no-underline mt-2"
              onClick={() => setMobileOpen(false)}
            >
              {t.startTrial}
            </a>

            <div className="mt-3 flex justify-center">
              <LanguageSwitcher locale={locale} />
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
