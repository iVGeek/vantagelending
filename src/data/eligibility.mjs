export const eligibility = {
  overview: [
    'We lend to UK-registered businesses, directors, landlords and property investors. The first check is always soft — it leaves no footprint on your credit file.',
    'For bridging, the deal has to stack up: a sensible loan-to-value, a valuation that supports it, and an exit strategy we believe. For business finance, the numbers matter more than the credit file: turnover, trading history and how you take payment.',
    'We are clear about what we do not lend on, and we would rather tell you straight than chase a case that will not complete.',
  ],
  basics: [
    { label: 'Business finance', items: ['UK registered limited company or LLP', 'Typically 6+ months of trading history', '12 months of statements or an Open Banking link', 'Personal guarantee required on most unsecured facilities'] },
    { label: 'Bridging & property', items: ['Minimum £50,000 (residential) / £100,000 (commercial)', 'Clear exit strategy: sale, refinance, inheritance or draw-down', 'Full, desktop or AVM valuation depending on the case', 'Regulated route capped at 70% LTV where your main home is involved'] },
  ],
  excluded: {
    heading: 'What we don’t lend on',
    intro: 'Some cases are not right for us, no matter how well presented. We are upfront about the exclusions so you do not waste your time.',
    items: [
      'Property held in bankruptcy or subject to an undischarged arrangement',
      'Regulated bridging above 70% LTV on your main residential home',
      'Cases where the true owner or source of funds cannot be verified',
      'Consumer lending to individuals for personal, non-property purposes',
      'Gambling, money-service businesses or sanctions-exposed activity',
      'Schemes with no identifiable exit strategy',
    ],
  },
};

export const documents = {
  business: {
    label: 'Business finance',
    intro: 'The plain-English version of exactly what to send us — nothing more.',
    items: [
      { what: 'Company details', why: 'Registered name, number, and the directors who will sign.' },
      { what: 'Turnover and history', why: 'One figure and a rough trading history — six-plus months for most products.' },
      { what: 'Bank statements or Open Banking link', why: '12 months of statements, or a consented Open Banking connection. This (not a business plan) drives the decision.' },
      { what: 'Directors’ ID', why: 'Confirmed at application, standard anti-money-laundering check.' },
      { what: 'Card/sales data (revenue-based only)', why: 'A link to your card processing or platform sales for percentage-of-sales repayment.' },
    ],
  },
  bridging: {
    label: 'Bridging & property',
    intro: 'The exit is the document. Everything else supports it.',
    items: [
      { what: 'Property details', why: 'Address, purchase price or current value, and tenure.' },
      { what: 'Exit strategy in writing', why: 'Sale, refinance, inheritance or draw-down — the single biggest input to your rate.' },
      { what: 'Proof of deposit and source of funds', why: 'Required by law for every secured case.' },
      { what: 'ID for all applicants', why: 'Standard at application.' },
      { what: 'Appraisal (development only)', why: 'GDV, build programme and budget for larger schemes.' },
    ],
  },
};