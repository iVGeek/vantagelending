const SITE_URL = import.meta.env.PUBLIC_SITE_URL || 'https://example.com';

export const site = {
  name: 'Vantage Lending',
  shortName: 'VL',
  tagline: 'Straightforward business and bridging finance.',
  url: SITE_URL,
  formEndpoint: '',
  phone: '020 7000 0000',
  email: 'hello@vantagelending.co.uk',
  address: 'London, UK (placeholder office address)',
  hours: 'Mon–Fri, 9:00–17:30',
  fca: 'FCA reference XXXXXX',
  companyNo: 'Company no. 12345678',
  trust: [
    'Soft credit check at application',
    'No early-repayment fees',
    'Funds in 24–48 hours for business finance',
  ],
  stats: [
    { value: '25+', label: 'years combined experience' },
    { value: '£500m+', label: 'lent' },
    { value: '4.7/5', label: 'Trustpilot' },
  ],
  footerNote:
    'Placeholder disclosure — replace with the real regulatory statement before launch. Products vary by regulation; commercial and certain other products are unregulated. Not all products are covered by the FOS or FSCS.',
};