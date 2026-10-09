const SITE_URL = import.meta.env.PUBLIC_SITE_URL || 'https://vantage-lending.onrender.com';

export const site = {
  name: 'SME Lending Platform',
  shortName: 'SLP',
  tagline: 'Direct SME lending and property bridging — with an invest side of the table.',
  url: SITE_URL,
  formEndpoint: '',
  phone: '020 7000 0000',
  email: 'hello@smelending.co.uk',
  address: 'London, UK (placeholder office address)',
  hours: 'Mon–Fri, 9:00–17:30',
  fca: 'FCA reference XXXXXX',
  companyNo: 'Company no. 12345678',
  ico: 'ICO reference XXXXXXXX (placeholder)',
  publishNote: 'Updated Oct 2026. All rates are indicative placeholder pricing from market ranges, not committed quotes.',
  trust: [
    'Soft checks at application — no credit-score footprint',
    'No early-repayment fees, no exit fees',
    'Terms and fees set out in writing before you sign',
  ],
  stats: [
    { value: '25+', label: 'years combined experience' },
    { value: '£500m+', label: 'lent to SMEs and property' },
    { value: '4.7/5', label: 'borrower feedback (placeholder)' },
  ],
  investNote:
    'Investment route is a pre-launch placeholder. Promotion of investment opportunities is a restricted activity and this platform has no FCA authorisation to hold client money or promote investments. Structure, gating and wording need solicitor sign-off before launch.',
  footerNote:
    'Placeholder disclosure — replace with the real regulatory statement before launch. SME Lending Platform (placeholder, company no. XXXXXXXX) is authorised and regulated by the Financial Conduct Authority as a consumer credit firm under FCA reference XXXXXX. Commercial and certain other products, including most bridging loans and all investment activities shown on this site, are unregulated or restricted and are not covered by the FOS or FSCS except as required by law. Nothing on this site is financial advice.',
};