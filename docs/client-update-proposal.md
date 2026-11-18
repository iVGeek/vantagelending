# Website update — proposal for client review

## Purpose

This document compares the website **before the latest client update** with the **new version now built into the Astro site**, and suggests a shortlist of brand names for the client to choose from.

- **Before:** the previous multi-page Astro site (generic “SME Lending Platform” branding, six products, retail/HNW investor language).
- **After:** the client’s latest standalone design and content, ported into the same Astro routes and sitemap.

The new version is already built and live-ready in structure, but it deliberately keeps all rates, statistics, case studies, legal wording and company details clearly flagged as placeholders.

---

## 1. Suggested names

These are proposed **trading names**. The corresponding legal entity would be e.g. `[Name] Ltd`, subject to Companies House, trademark and domain checks. Domains shown are suggestions only and have not been verified as available.

| # | Name | Why it works | Suggested domain | Suggested tagline |
|---:|---|---|---|---|
| 1 | **Clearline** | Directly reflects the site’s strongest promise: published rates, plain numbers and no surprises. Short, modern and easy to say. | clearline.co.uk | *Business finance, plainly priced.* |
| 2 | **Ledgerlane** | Finance-led and memorable; suggests a clear route through cash flow, funding and repayment. | ledgerlane.co.uk | *Funding built around your numbers.* |
| 3 | **Northstar Credit** | Conveys guidance and stability without sounding like a consumer lender. Works well with corporate-investor messaging. | northstarcredit.co.uk | *Straight funding, steady hands.* |
| 4 | **Meridian Lending** | The most institutional-sounding option; credible for funds, family offices and corporate treasuries. | meridianlending.co.uk | *Direct business lending, corporate backing.* |
| 5 | **Pillar Capital** | Suggests strength and backing; suits the “private corporate capital” story in the business plan. | pillarcapital.co.uk | *Backing solid businesses.* |
| 6 | **Growthbridge** | Joins the two core themes: helping SMEs grow, and bridging/property finance as the secondary line. | growthbridge.co.uk | *Bridge today. Grow tomorrow.* |
| 7 | **Kestrel Finance** | Distinctly UK, agile and ownable. Less descriptive, but stronger long-term brand potential. | kestrelfinance.co.uk | *Fast, focused business funding.* |
| 8 | **Brightwell Credit** | Friendly and trustworthy while still sounding like a lender. Good fit for the softened sticker design. | brightwellcredit.co.uk | *Clear terms. Quick decisions.* |
| 9 | **Straightline Lending** | Reinforces the no-jargon, no-exit-fee, no-hidden-charge positioning. | straightlinelending.co.uk | *No jargon. No surprises.* |
| 10 | **Altbury Capital** | Invented name, so it is more likely to be unique and easier to protect. Modern but still British-sounding. | altburycapital.co.uk | *Modern credit, old-fashioned clarity.* |

### Recommended shortlist

1. **Clearline** — best match for the new site’s transparency-led design and copy.
2. **Meridian Lending** — best if the corporate-investor side is the primary audience.
3. **Kestrel Finance** — best if the client wants a distinctive, ownable brand rather than a descriptive one.

---

## 2. Before vs after — feature scorecard

Scores are out of 10. Weights reflect the priorities in the business plan: website-first demand testing, corporate-only funding, plain-English transparency and launch readiness.

| Feature | Weight | Before | After | Notes |
|---|---:|---:|---:|---|
| Brand identity & differentiation | 10% | 5 | 9 | Before: generic “SME Lending Platform”. After: a distinct visual system and confident voice. |
| Visual design & polish | 10% | 6 | 9 | Before: clean but conventional green/white. After: bold lemon/mint/blue sticker style, hard shadows, dark mode. |
| Content depth & clarity | 12% | 7 | 9 | After adds sharper copy, published rate bands, fee schedules, 8 case studies, 17 glossary terms and 9 FAQs. |
| Product coverage | 10% | 7 | 9 | Before: 6 products. After: 7, including embedded finance for platforms. |
| Investor proposition & plan alignment | 12% | 4 | 9 | Before: retail/HNW self-certification conflicted with the business plan. After: private corporate investors only, with an entity gate. |
| Calculators & interactivity | 10% | 8 | 9 | Both had live calculators; the new version puts them on more pages and adds an investor return calculator. |
| Transparency & placeholder discipline | 8% | 7 | 9 | After keeps explicit `PLACEHOLDER` badges and prototype notices instead of implying figures are final. |
| UX & information architecture | 8% | 7 | 8 | Clearer paths, mobile menu and investor route links; slight added complexity from the investor gate. |
| SEO & technical structure | 8% | 8 | 9 | Both are static Astro with a sitemap. After preserves all existing URLs and adds only the new product/guide routes. |
| Conversion & enquiry paths | 7% | 6 | 8 | After adds a role-based Apply wizard (borrower/broker/partner) and a dedicated investor register route. |
| Prototype readiness / launch risk | 5% | 6 | 7 | Forms remain prototypes in both; the new version is clearer about it, but legal wording and server-side gating are still outstanding. |

### Weighted totals

| Version | Weighted score | Plain average |
|---|---:|---:|
| Before client update | **6.4 / 10** | 6.5 / 10 |
| After client update | **8.8 / 10** | 8.6 / 10 |

**Outcome:** the new version is the stronger direction across almost every category, especially brand identity and alignment with the corporate-investor-only business plan.

---

## 3. What is deliberately still unresolved

These are not defects in the new design; they are the launch gates the business plan itself calls out.

1. **No real company identity yet** — trading name, legal entity, company number, ICO and contact details remain placeholders.
2. **Rates and statistics are indicative** — all figures are flagged as placeholders and must be confirmed by pricing/legal before launch.
3. **Forms are prototypes** — Apply, Contact and Investor Register do not transmit anything and say so on screen.
4. **Investor gate needs server-side enforcement** — the current gate is a client-side prototype and needs solicitor-approved wording plus server-side controls.
5. **Regulatory copy needs sign-off** — Terms, Privacy, Complaints, Cookies and product-by-product FCA position are drafted as `[To be supplied by solicitors.]`.
6. **Analytics and form endpoint** — still to be connected before the site is used for demand testing.

---

## 4. Recommendation

Proceed with the **new version** as the basis for launch, and use this review to agree:

- the final name from the shortlist above;
- which placeholder data must be replaced first;
- who supplies the legal wording and investor-gate rules;
- where form submissions should be sent.

Once those four items are settled, the remaining work is content replacement and form/CRM wiring — the design and page structure are already in place.

---

## Security note (internal, not for the client)

A dependency upgrade was attempted to close open npm/Dependabot alerts. It was reverted because the newer Astro toolchain loads a native binding that is blocked by Application Control on this machine, which broke the local build. The repository was restored to the last known-good state and `npm run build` passes again. The remaining alerts are transitive `picomatch` advisories with no published fix, plus a Node-adapter image-path issue that does not apply to this static site. They can be handled separately via a controlled override or an alert dismissal with justification.
