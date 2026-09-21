/**
 * The one consent model every calculator on the site derives from.
 *
 * Founder decision 2026-09-21: the only approved inputs are client experience,
 * not a study, and they are always shown as a range:
 *   - between 40% and 60% of traffic doesn't accept cookies;
 *   - of the visitors who do accept, 40% don't accept on the first pageview, so
 *     the landing pageview (the one that carries the ad click / UTM) is lost for
 *     them and GA4 records the visit without its source, or not that hit at all.
 *
 * There is no approved figure for ad blockers, sampling, exits before the tag
 * fires or per-country differences, so none is built in. A calculator that
 * exposes them does so as optional user inputs that default to 0.
 *
 * Conversions and revenue are derived from visits under one stated assumption:
 * the conversion rate is the same for traffic GA4 sees and traffic it doesn't.
 * Pages that show those outputs must say so.
 */

export const REJECTION_MIN = 0.4;
export const REJECTION_MAX = 0.6;
export const REJECTION_DEFAULT = 0.5;
/** Share of consenting visitors who accept after the first pageview. */
export const LATE_CONSENT_SHARE = 0.4;

export function clampRejection(r: number): number {
  if (!Number.isFinite(r)) return REJECTION_DEFAULT;
  return Math.min(REJECTION_MAX, Math.max(REJECTION_MIN, r));
}

export interface ConsentModelOptions {
  /** Share of all traffic that rejects cookies, 0–1. Clamped to 40–60%. */
  rejection?: number;
  /** Optional, user-supplied: share of consenting visitors whose tag is blocked. Default 0. */
  adBlockers?: number;
  /** Optional, user-supplied: share of remaining visitors who leave before the tag fires. Default 0. */
  earlyExits?: number;
}

export interface ConsentShares {
  rejection: number;
  /** Share of real visits GA4 records at all. */
  seen: number;
  /** Share of real visits GA4 records with the source they arrived with. */
  attributed: number;
  /** Share of real visits GA4 records, but without their source. */
  seenWithoutSource: number;
  /** Share of real visits GA4 does not record. */
  unseen: number;
}

const unit = (x: number | undefined) =>
  Number.isFinite(x) ? Math.min(1, Math.max(0, x as number)) : 0;

/** Shares of real traffic, for one rejection rate. */
export function consentShares(opts: ConsentModelOptions = {}): ConsentShares {
  const rejection = clampRejection(opts.rejection ?? REJECTION_DEFAULT);
  const seen = (1 - rejection) * (1 - unit(opts.adBlockers)) * (1 - unit(opts.earlyExits));
  const attributed = seen * (1 - LATE_CONSENT_SHARE);
  return {
    rejection,
    seen,
    attributed,
    seenWithoutSource: seen - attributed,
    unseen: 1 - seen,
  };
}

/** The same shares at both ends of the approved range. */
export function consentRange(opts: Omit<ConsentModelOptions, "rejection"> = {}) {
  return {
    low: consentShares({ ...opts, rejection: REJECTION_MIN }),
    high: consentShares({ ...opts, rejection: REJECTION_MAX }),
  };
}
