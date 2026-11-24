# Website update — proposal for client review

## Purpose

This document answers the client's questions directly:

- **What was missing** from the site we had built, compared with the latest website they sent?
- **What has now been added** — in content, functionality and design?
- **Which name should we use?**
- **Does the result deliver the concept: “finance is fun, borrowing is not scary”?**

- **Before:** the previous multi-page Astro site — generic “SME Lending Platform” branding, six products, retail/HNW investor language.
- **Source of truth:** `SME-Lending-Website-standalone use this html.html`. The other attachment (`SME-Lending-Website.html`) is an earlier working version; the two are almost identical except for the calculator's product selector.
- **After:** the client's latest design and content, ported into the same Astro routes and sitemap. It is live at **https://vantagelending.onrender.com/**.

The previous working name, **SME Lending Platform**, is now used across the site instead of the `brandname` placeholder. All rates, statistics, case studies, legal wording and company details remain clearly flagged as placeholders.

---

## 1. Gap analysis — “Is anything missing?”

| Area | Before (what he built) | After (client's latest site) | Verdict |
|---|---|---|---|
| Brand identity | Generic “SME Lending Platform”, conventional green/white styling | Distinct sticker-style visual system, bold colours, confident plain-English voice | **Was missing — now added** |
| Products | 6 products | 7 products: adds **Embedded finance** for platforms | **Was missing — now added** |
| Guides | Existing guides | Adds **Embedded finance for platforms** guide and updated guides | **Was missing — now added** |
| Investor proposition | Retail/HNW self-certification language, which conflicted with the business plan | **Private corporate investors only**, with an entity-confirmation gate and corporate-only copy | **Was wrong — now corrected** |
| Apply journey | One generic form | Role-based wizard: borrower / broker / partner | **Was missing — now added** |
| Calculators | Borrower calculators and an investor return calculator already existed | Calculators extended across more pages, with a grouped business/property selector | **Improved, not new** |
| Case studies | 8 existed | 8 reworked into result-led cards with amounts, LTVs and outcomes | **Improved, not new** |
| Glossary & FAQs | 10 glossary terms, around 30 FAQs, no glossary search | 17 glossary terms with live search, 9 concise FAQs | **Improved, not new** |
| Rates & fees | Indicative figures, less consistent presentation | Published rate bands and per-product fee schedules | **Improved, still placeholder** |
| UX & navigation | Conventional layout | Mobile menu, clearer paths, investor route links | **Improved** |
| SEO & structure | Static Astro with sitemap | Same URLs preserved; only the new product/guide routes added | **Preserved** |
| Forms | Prototype only | Prototype only, now visibly labelled “not connected” | **Still missing** |
| Legal wording | Placeholder | Placeholder | **Still missing** |
| Real company identity and rates | Placeholder | Placeholder | **Still missing** |

**Direct answer:** the built site was missing the new brand system, embedded-finance product and guide, the corporate-only investor proposition, the role-based Apply flow, the grouped calculator, the searchable glossary, the reworked case studies and the published rate/fee tables. Before launch we still need the name, real rates and company details, solicitor-approved legal wording, a CRM/email endpoint, analytics and server-side enforcement of the investor gate.

---

## 2. Concept check — “finance is fun, borrowing is not scary”

**Where the new version delivers it**

- Playful sticker-style visuals and bold colours make the site feel approachable rather than corporate.
- Plain-English glossary, published rates and live calculators let people self-serve without fear of a hidden number.
- No exit fees, no early-repayment charges, named underwriter and clear fee schedules reduce the sense of risk.
- Case studies show outcomes in human terms, not just product specs.
- The Apply wizard asks what role the visitor has before asking for data.

**Where it does not deliver it yet**

- A risk warning is the first line on the page. It must be there in some form, but its placement and tone need solicitor sign-off so it informs without alarming.
- `brandname` and `[Company name] Ltd` have now been replaced with the working name and the previous placeholder details; `[PLACEHOLDER]` rates and `[To be supplied by solicitors.]` sections still undermine confidence.
- Long fee tables and the “what we do not lend on” list are necessary, but they currently read as legal text rather than friendly guidance.
- The investor entity gate adds friction; it is required for the corporate-only rule but should be explained clearly.

**Recommendation:** keep the required risk and legal content, but lead with the plain-number, no-surprises message; replace identity and rate placeholders as soon as they are supplied; and pick a name that sounds human rather than institutional.

---

## 3. Suggested names

The site currently uses **SME Lending Platform** as the working name. The names below are proposed **final trading names** for the client to choose from. The corresponding legal entity would be e.g. `[Name] Ltd`, subject to Companies House, UKIPO, trademark and domain checks. Domains shown are suggestions only and have not been verified as available.

| # | Name | Why it works | Suggested domain | Suggested tagline |
|---:|---|---|---|---|
| 1 | **Clearline** | Directly reflects the site's strongest promise: published rates, plain numbers and no surprises. Short, modern and easy to say. | clearline.co.uk | *Business finance, plainly priced.* |
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

**Best fit for “finance is fun, borrowing is not scary”:**

1. **Clearline** — clearest match to the transparency-led design and copy.
2. **Brightwell Credit** — friendly, trustworthy, and works with the playful visual system.
3. **Kestrel Finance** — distinctive and ownable, if the client wants a brand rather than a description.
4. **Ledgerlane** — memorable and finance-led without feeling intimidating.

**Alternatives if the corporate-investor side is the primary audience:** **Meridian Lending** and **Pillar Capital**. These sound more institutional, which is credible with funds and treasuries but less aligned with the stated concept.

---

## 4. Before vs after — feature scorecard

Scores are out of 10. Weights reflect the priorities in the business plan: website-first demand testing, corporate-only funding, plain-English transparency and launch readiness.

| Feature | Weight | Before | After | Notes |
|---|---:|---:|---:|---|
| Brand identity & differentiation | 10% | 5 | 9 | Before: generic “SME Lending Platform”. After: a distinct visual system and confident voice. |
| Visual design & polish | 10% | 6 | 9 | Before: clean but conventional green/white. After: bold lemon/mint/blue sticker style, hard shadows, dark mode. |
| Content depth & clarity | 12% | 7 | 9 | Before had 30 FAQs, 10 glossary terms and 8 case studies. After reworks these into sharper copy, published rate bands, fee schedules, 17 searchable glossary terms, 9 concise FAQs and result-led case studies. |
| Product coverage | 10% | 7 | 9 | Before: 6 products. After: 7, including embedded finance for platforms. |
| Investor proposition & plan alignment | 12% | 4 | 9 | Before: retail/HNW self-certification conflicted with the business plan. After: private corporate investors only, with an entity gate. |
| Calculators & interactivity | 10% | 8 | 9 | Both had borrower and investor calculators; the new version extends them across more pages and adds a grouped business/property selector. |
| Transparency & placeholder discipline | 8% | 7 | 9 | After keeps explicit `PLACEHOLDER` badges and prototype notices instead of implying figures are final. |
| UX & information architecture | 8% | 7 | 8 | Clearer paths, mobile menu and investor route links; slight added complexity from the investor gate. |
| SEO & technical structure | 8% | 8 | 9 | Both are static Astro with a sitemap. After preserves all existing URLs and adds only the new product/guide routes. |
| Conversion & enquiry paths | 7% | 6 | 8 | After adds a role-based Apply wizard (borrower/broker/partner); the investor register route already existed but now uses corporate-only copy. |
| Prototype readiness / launch risk | 5% | 6 | 7 | Forms remain prototypes in both; the new version is clearer about it, but legal wording and server-side gating are still outstanding. |

### Weighted totals

| Version | Weighted score | Plain average |
|---|---:|---:|
| Before client update | **6.4 / 10** | 6.5 / 10 |
| After client update | **8.8 / 10** | 8.6 / 10 |

**Outcome:** the new version is stronger across almost every category, especially brand identity and alignment with the corporate-investor-only business plan.

---

## 5. Launch gates — what we still need from the client

These are not defects in the new design; they are the gates the business plan itself calls out.

1. **No real company identity yet** — the working name is now “SME Lending Platform”, but the legal entity, company number, ICO and registered address remain placeholders.
2. **Rates and statistics are indicative** — all figures are flagged as placeholders and must be confirmed by pricing/legal before launch.
3. **Forms are prototypes** — Apply, Contact and Investor Register do not transmit anything and say so on screen.
4. **Investor gate needs server-side enforcement** — the current gate is a client-side prototype and needs solicitor-approved wording plus server-side controls.
5. **Regulatory copy needs sign-off** — Terms, Privacy, Complaints, Cookies and product-by-product FCA position are drafted as `[To be supplied by solicitors.]`.
6. **Analytics and form endpoint** — still to be connected before the site is used for demand testing.

---

## 6. Recommendation

Proceed with the **new version** as the basis for launch, and use this review to agree:

- the final name, using the concept-led shortlist in section 3;
- which placeholder data must be replaced first;
- who supplies the legal wording and investor-gate rules;
- where form submissions should be sent.

Once those four items are settled, the remaining work is content replacement and form/CRM wiring — the design and page structure are already in place.
