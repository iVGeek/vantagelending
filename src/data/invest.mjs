export const invest = {
  howItWorks: [
    {
      n: '1',
      title: 'Choose your route',
      copy: 'Retail-size tickets start from as little as £25,000; institutional and family-office capital starts at £2m+. Both routes fund the same underlying lending book.',
    },
    {
      n: '2',
      title: 'Self certify',
      copy: 'Investment promotion is restricted while we are unregulated, so you must self certify as high net worth, sophisticated or institutional before you see actual deal terms or return figures.',
    },
    {
      n: '3',
      title: 'Review live deals',
      copy: 'Each deal shows the type, security, LTV, term, target return and funding progress. Returns are indicative projections.',
    },
    {
      n: '4',
      title: 'Register interest',
      copy: 'The current site captures interest — it is not a live investment or checkout. Once the regulatory route and solicitors have signed off, vetted investors are invited to meet deals in order of registration.',
    },
  ],
  categories: [
    {
      name: 'High net worth',
      def: 'An individual with net income of £100,000+ a year, or net assets of £250,000+, excluding pension and principal residence.',
      tags: ['Self certified for the fixed term of any deal', 'Applies to individuals'],
    },
    {
      name: 'Sophisticated',
      def: 'A certified sophisticated investor — a member of a recognised VC/angel network, holder of relevant professional certificates or similar certification.',
      tags: ['Certification required, not just a tick box', 'Applies to individuals'],
    },
    {
      name: 'Institutional',
      def: 'A corporate body, trust or partnership with substantial assets — pension schemes, family offices, funds, insurers and similar professional investors.',
      tags: ['Larger tickets: £2m+ across a book', 'Direct relationships and bespoke notes'],
    },
  ],
  returns: {
    lead: 'Indicative target returns by the kind of paper, before costs. These are projections, not guarantees.',
    rows: [
      ['Bridge-to-let', 'up to 9.5% p.a.', 'First charge paper, 12 months'],
      ['Commercial bridging', 'up to 11% p.a.', 'First charge paper, 9–12 months'],
      ['Revenue-based facilities', 'up to 8.5% p.a. equivalent', 'Unsecured, sales linked'],
      ['Development finance', 'up to 12% p.a.', '55% of GDV, 24 months'],
    ],
  },
  risks: [
    'Capital at risk — borrowers may default and enforcement may recover less than the loan',
    'Returns are indicative projections, not commitments',
    'Bridging and development carry property-market and valuation risk',
    'Revenue-based facilities are unsecured and depend on borrower sales performance',
    'Promotion of this investment route is restricted while the platform is unregulated — and holding client money requires FCA authorisation',
  ],
};