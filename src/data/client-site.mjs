const BRAND="SME Lending Platform";
const CONUM="XXXXXXXX", PHONE="020 7000 0000", EMAIL="hello@smelending.co.uk", ICO="XXXXXXXX";

const BANDS={
  res:{name:"Residential bridging",bands:[[55,.64],[65,.69],[75,.74]],arr:2},
  com:{name:"Commercial bridging",bands:[[65,.89],[70,.95],[75,.99]],arr:2},
  light:{name:"Light refurbishment",bands:[[75,.74]],arr:2},
  heavy:{name:"Heavy refurbishment",bands:[[70,.79]],arr:2},
  btl:{name:"Bridge-to-let",bands:[[55,.64],[65,.69],[75,.74]],arr:2}
};
const TT=30, UNSEC=[[50000,1.9],[250000,1.5],[1000000,1.2]], RBF=[[50000,6,14],[250000,8,16],[2000000,10,25]];
const TARGETS={btl:["Bridge-to-let",9.5],com:["Commercial bridging",11],rbf:["Revenue-based facilities",8.5],dev:["Development finance",12]};

function bridgeRate(k,ltv){for(const [m,r] of BANDS[k].bands){if(ltv<=m)return r}return null}
function bridgeCalc({key,value,ltv,months,retained}){const loan=value*ltv/100,rate=bridgeRate(key,ltv);if(rate===null)return{loan,rate:null};const monthly=loan*rate/100,interest=monthly*months,arr=loan*BANDS[key].arr/100;return{loan,rate,monthly,interest,arr,net:loan-arr-TT-(retained?interest:0),total:interest+arr+TT}}
function unsecRate(a){for(const [m,r] of UNSEC){if(a<=m)return r}return UNSEC[UNSEC.length-1][1]}
function unsecCalc({amount,months}){const r=unsecRate(amount)/100,pay=amount*r/(1-Math.pow(1+r,-months));return{rate:r*100,pay,total:pay*months,cost:pay*months-amount}}
function rbfBand(a){for(const [m,lo,hi] of RBF){if(a<=m)return[lo,hi]}const l=RBF[RBF.length-1];return[l[1],l[2]]}
function rbfCalc({amount,cost}){const c=amount*cost/100;return{cost:c,total:amount+c}}
function investCalc({amount,months,gross,lossPct}){const g=amount*gross/100*months/12,loss=amount*lossPct/100;return{g,loss,out:g-loss}}
const G=n=>"£"+Math.round(n).toLocaleString("en-GB"), pct=(n,d=2)=>n.toFixed(d)+"%";

const STEPS=[["Send a quick enquiry","Tell us what you need, what it is for and how you will repay. A short form, a call or an email. No credit-file footprint."],["Indicative terms, fast","A named underwriter comes back with indicative terms once criteria are met. You see the price before you commit."],["Checks and legals in parallel","Documents, valuations (for property) and legal work run side by side to save time."],["Funds released","Funds are released on completion or approval. Repay early whenever you like, with no early-repayment charge."]];
const PRODUCTS=[
 {id:"rbf",grp:"Business finance",name:"Revenue-based finance and MCAs",tag:"Repay as a share of what you take",cost:"single fixed cost",amt:"£3,000 to £2,000,000",term:"Repaid from sales",sec:"Unsecured",calc:"rbf",
  head:"Repay as you earn.",sum:"An advance for UK businesses with steady card or bank takings. One fixed cost agreed upfront, repaid as a percentage of sales, so quiet weeks cost you less.",
  fig:[["£3k to £2m","advance"],["6% to 25%","fixed cost by size"],["% of sales","repayment"],["£0","early-repayment charge"]],
  uses:["Stock ahead of a seasonal peak","Marketing and growth spend","Equipment and fit-out","Smoothing payroll and supplier gaps","Refurbishing premises"],
  why:["One fixed cost, confirmed in writing","Repayments move with your sales","No application fee, no early-repayment charge","A named underwriter, not a queue"],
  crit:["UK limited company, LLP or partnership","Steady card or bank takings","Trading history and recent bank statements","Soft check at application"],
  fees:["No application fee","No early-repayment charge","One fixed total cost, confirmed in writing","No brokerage fee when dealing directly"],
  ex:[["Advance","£10,000"],["Fixed cost","25%"],["Total repayable","£12,500"],["Repaid","as a percentage of sales"]]},
 {id:"unsecured",grp:"Business finance",name:"Unsecured business loans",tag:"Working capital without security",cost:"from 1.2% per 30 days",amt:"£10,000 to £1,000,000",term:"12 to 60 months",sec:"Unsecured",calc:"unsec",
  head:"Fund growth without putting property up.",sum:"Fixed-term loans for established businesses. The rate falls as the amount rises, interest runs daily, and you can repay early for free.",
  fig:[["£10k to £1m","loan size"],["12 to 60","months"],["from 1.2%","per 30 days"],["£0","early-repayment charge"]],
  uses:["Hiring and payroll","Stock and equipment","Tax and VAT bills","Bridging a late-paying customer","Acquisitions and expansion"],
  why:["Rates published by size band","Daily interest, charged only for days used","Repay early for free","Decisions from a named underwriter"],
  crit:["UK limited company or LLP","Established trading history","Latest accounts and bank statements","A personal guarantee may be required"],
  fees:["No application fee","No early-repayment charge","No brokerage fee when dealing directly"],
  ex:[["Loan","£25,000"],["Term","24 months"],["Rate","1.5% per 30 days"],["Interest","falls as the balance reduces"]]},
 {id:"embedded",grp:"Business finance",name:"Embedded finance",tag:"Offer funding inside your platform",cost:"partner terms",amt:"Sized to your merchants",term:"Product by product",sec:"Unsecured",calc:null,
  head:"Funding, inside the product your customers already use.",sum:"Marketplaces, software and payments platforms can offer their merchants revenue-based finance and loans through us, under your brand or ours.",
  fig:[["Your flow","offer shown in your product"],["Pre-sized","offers from your data"],["Shared","economics with you"],["One partner","underwriting and funding"]],
  uses:["Marketplaces funding their sellers","Software platforms funding subscribers","Payment providers funding merchants","Wholesalers funding trade customers"],
  why:["Offers sized from your own data","Hosted flow or API, your choice [to confirm]","Funding capacity from our corporate capital partners","You keep the customer relationship"],
  crit:["A platform with a merchant or customer base","Transaction or revenue data we can underwrite against","Agreement on eligibility and data sharing"],
  fees:["Partner economics agreed per programme","No cost to the end customer beyond the agreed price of the finance"],
  ex:[["Merchant","an online seller doing £40,000 a month through your platform"],["Offer","pre-approved advance shown in their dashboard"],["Repayment","a share of sales settled through your platform"]]},
 {id:"residential",grp:"Property finance",name:"Residential bridging",tag:"Keep your chain moving",cost:"from 0.64% per month",amt:"£50,000 to £10,000,000",term:"3 to 24 months",sec:"First legal charge",calc:"res",
  head:"Keep your chain moving. Bridge the gap.",sum:"Bridging for chain breaks, auction purchases, capital raising and refurbishment. Interest only for the days used, and no exit fee.",
  fig:[["from 0.64%","per month, by LTV band"],["75%","maximum LTV"],["£50k to £10m","loan range"],["24 months","maximum term"]],
  uses:["Breaking a chain to complete a purchase","Auction and part-exchange purchases","Raising capital on property you own","Downsizing, divorce or probate where timing matters","Light to heavy refurbishment before sale, refinance or letting"],
  why:["One named underwriter from enquiry to completion","No exit fee or early-repayment charge","Daily interest, only for days used","Interest can be serviced, retained or rolled up"],
  crit:["Minimum loan £50,000, maximum £10,000,000","Terms of 3 to 24 months","Residential, semi-commercial and portfolio property","Full, AV and desktop valuations used as appropriate","Business and investment purposes only"],
  fees:["2% arrangement fee, optionally added to the loan","Valuation paid directly to the panel valuer","£30 telegraphic transfer fee at completion","No exit fee, no early-repayment charge, no monthly servicing fee","Interest rebated for unused days after completion"],
  ex:[["Loan amount","£850,000"],["LTV","62%"],["Rate band","0.69% per month"],["Monthly interest","£5,865"],["Arrangement fee (2%)","£17,000"],["Scenario","12-day completion, repaid from the onward sale"]]},
 {id:"commercial",grp:"Property finance",name:"Commercial bridging",tag:"Short-term money on commercial property",cost:"from 0.89% per month",amt:"£100,000 to £10,000,000",term:"Up to 24 months",sec:"First or second charge",calc:"com",
  head:"Move on commercial property before the window closes.",sum:"First and second charge bridging on commercial and semi-commercial property, with the exit planned from day one.",
  fig:[["from 0.89%","per month, by LTV band"],["75%","maximum LTV"],["£100k to £10m","loan range"],["24 months","maximum term"]],
  uses:["Owner-occupier purchases","Mixed-use and trading property","Land and higher-LTV positions","Refinancing before a term loan completes"],
  why:["Rate bands by LTV","Second charge available","No exit fee, no early-repayment charge","Dual representation where it saves time"],
  crit:["Minimum loan £100,000","Commercial and semi-commercial security","A credible exit: sale or refinance","Larger facilities considered by referral"],
  fees:["2% arrangement fee","Valuation paid to the panel valuer","£30 telegraphic transfer fee","No exit fee, no early-repayment charge"],
  ex:[["Loan amount","£1,150,000"],["LTV","55%"],["Rate band","0.89% per month"],["Monthly interest","£10,235"],["Scenario","completed in seven days, exit to a commercial mortgage"]]},
 {id:"development",grp:"Property finance",name:"Development and refurbishment",tag:"Fund the works, not just the purchase",cost:"from 0.74% per month",amt:"£100,000 to £10,000,000",term:"Up to 24 months",sec:"First legal charge",calc:"light",
  head:"Fund the build as well as the buy.",sum:"Light and heavy refurbishment, conversions, ground-up schemes and development exits, sized against purchase price, build cost and completed value.",
  fig:[["from 0.74%","per month"],["75%","max LTV (light refurb)"],["65% of GDV","ground-up"],["24 months","maximum term"]],
  uses:["Light and heavy refurbishment","Conversions and change of use","Ground-up development","Development exit while sales complete"],
  why:["Staged drawdowns against works","Build cost funding on qualifying schemes [to confirm]","One consolidated fee schedule","The same underwriter from build to exit"],
  crit:["Minimum loan £100,000","Costed scope of works and schedule","Experience and a clear exit","Planning and building regulation consents where relevant"],
  fees:["2% arrangement fee","Monitoring surveyor costs as agreed","No exit fee, no early-repayment charge"],
  ex:[["Heavy refurbishment","from 0.79% per month, up to 70% LTV"],["Ground-up","from 0.84% per month, up to 65% of GDV"],["Exit","from 0.79% per month, up to 70%"]]},
 {id:"bridge-to-let",grp:"Property finance",name:"Bridge-to-let and exit finance",tag:"Bridge now, term finance after",cost:"from 0.64% per month",amt:"£100,000 to £10,000,000",term:"Bridge 12 months, exit up to 25 years",sec:"First legal charge",calc:"btl",
  head:"Buy now. Settle into a long-term hold.",sum:"A bridge to buy or improve, with the exit facility agreed at the outset, so you do not pay a second arrangement fee to convert.",
  fig:[["from 0.64%","per month, bridge"],["12 to 18 months","bridge term"],["up to 25 years","exit term"],["agreed day one","exit facility"]],
  uses:["Auction purchases to let","Buying and improving before refinance","Moving a bridge onto a long-term buy-to-let or commercial loan"],
  why:["The exit is underwritten from the start","No second arrangement fee on conversion","No exit fee or early-repayment charge"],
  crit:["Investment purposes only","Rent roll and completed value assessed at the exit stage","Exit terms are indicative at the bridge stage"],
  fees:["2% arrangement fee","£30 telegraphic transfer fee","No exit fee, no early-repayment charge"],
  ex:[["Loan amount","£320,000"],["LTV","70%"],["Outcome","let in six weeks, exit converted without a second arrangement fee"]]}
];
const CASES=[
 ["Chain break rescue completed in 12 days","Residential bridging","£850k","62%","0.69% pm","A bank declined because the purchase and sale completed in the same fortnight, outside its mortgage timetable.","A 62% LTV bridge released funds secured against the new home.","Completed in 12 days and repaid from the onward sale.","Terms in hours, completion in days.","Solicitor"],
 ["Working capital for a seasonal retailer","Revenue-based finance","£120k","n/a","fixed cost","A bank's fixed-term structure could not flex with quiet months.","Repayments as a percentage of sales, so they tracked trading. Stock arrived before the Christmas peak.","Facility cleared after 14 months.","Straight answers, no hidden fees, and funds landed the next day.","Founder, e-commerce brand"],
 ["Cash-flow cover for an outsourcing firm","Unsecured business loan","£75k","n/a","1.5% per 30 days","A 60-day invoice gap clashed with monthly payroll.","A loan with daily interest, sized to the gap and repaid as cash flow recovered.","Repaid after 21 months, nine months early, with no early-repayment fee.","Pay early for free was the line that won it.","COO, outsourcing company"],
 ["Refurbishment bridge to 73% LTV","Light refurbishment","£1.2m","73%","0.74% pm","A high-street lender refused because the property was uninhabitable during works on three flats.","A bridge with funded works, drawn down in stages and interest serviced during the build.","Works finished on budget and refinanced at improved value.","Refurb agreed and completed in under three weeks.","Director, residential developer"],
 ["Commercial purchase completed in seven days","Commercial bridging","£1.15m","55%","0.89% pm","An owner-occupier needed to buy semi-commercial premises before a competing bidder pushed the price up.","An unregulated commercial bridge with dual representation.","Completed in seven days and exited to a longer-term commercial mortgage.","Both stages agreed from day one made a competitive purchase possible.","Managing director, consulting firm"],
 ["Development exit after a four-house scheme","Development exit","£1.9m","70%","0.79% pm","Two lenders declined because the scheme was complete but not yet rental-producing.","Equity released while retaining two houses for a rental portfolio.","Refinanced at improved value.","The same underwriter stayed with us from the build through to the exit.","Property developer"],
 ["Auction bridge for a probate property","Auction finance","£260k","68%","pm rate by band","A buyer needed to complete inside a 28-day auction window.","An AVM valuation kept the process fast and the fee low.","Completed in 14 days.","AVM kept the valuation fee tiny and the timeline was never in doubt.","Private investor"],
 ["Buy now, steady into a long-term hold","Bridge-to-let","£320k","70%","pm rate by band","An investor bought a high-yield flat at auction and needed time to let it before refinancing.","The exit facility was underwritten from the start.","Let within six weeks and exited without a second arrangement fee.","Knowing the exit was agreed up front changed every decision we made afterwards.","Landlord"]
];
const GLOSS=[["LTV","Loan to value. The loan as a percentage of the property's value. £300,000 against £500,000 is 60% LTV."],["GDV","Gross development value. What a finished development is expected to be worth."],["ERC","Early-repayment charge. A fee for repaying early. We do not charge one."],["Factor rate","A flat multiplier used in revenue-based finance. A factor of 1.10 on £10,000 means £11,000 repayable."],["Revenue-based finance","An advance repaid as a share of future card or bank takings."],["MCA","Merchant cash advance. The older name for revenue-based finance."],["Embedded finance","Funding offered inside another company's product, for example a marketplace offering loans to its sellers."],["Retained interest","Interest taken from the loan upfront so you do not pay monthly. It reduces the money you receive."],["Serviced interest","Interest you pay each month. The full loan is advanced."],["Net advance","What reaches you after fees and retained interest."],["First legal charge","Our legal claim over a property, ranking ahead of other lenders."],["Exit strategy","How the loan will be repaid, usually a sale or refinance."],["Drawdown","Receiving funds from an agreed facility, in one go or in stages."],["Arrangement fee","A fee for setting up a loan, shown as a percentage of the gross loan."],["Personal guarantee","A director's promise to repay if the company cannot."],["Bridge-to-let","A short bridge to buy or improve, followed by a longer buy-to-let loan."],["Forward flow","An agreement where an investor funds loans that meet agreed criteria as they are originated."]];
const FAQ=[
 ["How are rates set?","Bridging rates move with LTV band; unsecured loans move with the amount; revenue-based finance is a single fixed cost. The Rates page shows every band. Final pricing is confirmed after underwriting."],
 ["Is this regulated by the FCA?","We lend for business and investment purposes. [Legal to confirm the exact regulatory position for each product before launch.]"],
 ["Do you lend to individuals buying their own home?","No. We lend for business and investment purposes only."],
 ["What if the valuation comes in lower than expected?","We re-cut the loan to the same LTV band on the new value, or you can bring more equity. You see revised numbers before you decide."],
 ["What if my exit slips?","Talk to us early. Extensions are considered case by case and priced on the monthly rate. No exit fee, no early-repayment charge."],
 ["How does revenue-based finance repay?","As a percentage of your sales until the fixed total is repaid. Quiet weeks cost you less."],
 ["Do you charge broker fees?","Not when you deal with us directly. A broker will tell you their own fee."],
 ["Can brokers and platforms work with you?","Yes. There is a broker route and an embedded-finance partner route on the Apply page."],
 ["Who funds the lending?","Private corporate investors and our own capital. We do not take money from consumers."]
];
const DOCS={"Business finance (revenue-based, unsecured)":["Photo ID for each director","Last 6 months of business bank statements","Latest filed accounts","Latest management accounts if over 6 months old","Details of existing borrowing","Card terminal statements (revenue-based finance)"],"Property finance (bridging, development)":["Photo ID and proof of address for each borrower","Property address and purchase price or current value","A clear exit plan: sale or refinance","Schedule of existing borrowing and assets","Last 3 months of bank statements","Scope and budget for works (refurbishment and development)","Planning permission and building regs if relevant"]};
const EXCL=["Loans secured on a borrower's main home for personal use","Consumer lending for personal purposes","Businesses in gambling, adult entertainment or weapons","Property with no credible exit","Overseas property","Borrowers with active insolvency proceedings"];


const head=(e,t,l)=>`<div class="stack" style="margin-bottom:28px">${e?`<span class="eyebrow">${e}</span>`:""}<h2>${t}</h2>${l?`<p class="lead">${l}</p>`:""}</div>`;
const table=(h,rows)=>`<div class="tw"><table><thead><tr>${h.map(x=>`<th>${x}</th>`).join("")}</tr></thead><tbody>${rows.map(r=>`<tr>${r.map(c=>`<td class="${/^[£\d]|%|^from/i.test(String(c))?"n":""}">${c}</td>`).join("")}</tr>`).join("")}</tbody></table></div>`;
const cta=(t,s)=>`<section class="s"><div class="cta"><div class="stack" style="gap:8px"><h2>${t}</h2><p>${s}</p></div><div class="row"><a class="btn lg" href="#apply">Start an application</a><a class="btn lg alt" href="#contact">Talk it through</a></div></div></section>`;
const processHTML=()=>`<div class="grid g2">${STEPS.map((s,i)=>`<div class="step"><b class="n">${i+1}</b><div><h4>${s[0]}</h4><p class="muted small">${s[1]}</p></div></div>`).join("")}</div>`;
const caseCards=n=>CASES.slice(0,n).map(c=>`<div class="card stack"><span class="pill">${c[1]}</span><h3>${c[0]}</h3><p class="small muted">${c[5]}</p><p class="small"><b>Result.</b> ${c[7]}</p><p class="small muted">${c[2]}${c[3]!=="n/a"?" · "+c[3]+" LTV":""} · ${c[4]}</p></div>`).join("");

const subnav=cur=>`<nav class="subnav" aria-label="Invest">${[["invest","Overview"],["invest-how","How it works"],["invest-deals","Example facilities"],["invest-calc","Return calculator"],["invest-eligibility","Eligibility"],["invest-register","Register interest"]].map(([h,l])=>`<a href="#${h}" ${h===cur?'aria-current="page"':""}>${l}</a>`).join("")}</nav>`;

function calcHTML(id,preset){
  const biz=[["rbf","Revenue-based"],["unsec","Unsecured"]],prop=[["res","Residential bridge"],["com","Commercial bridge"],["light","Light refurb"],["heavy","Heavy refurb"],["btl","Bridge-to-let"]];
  const isProp=prop.some(m=>m[0]===preset),seg=(arr,on)=>arr.map(([k,l])=>`<button type="button" data-v="${k}" aria-pressed="${on?k===preset:k===arr[0][0]}">${l}</button>`).join("");
  return `<div class="meter" id="${id}"><div class="stack" style="gap:16px">
  <div class="field"><span class="lbl">I need</span><div class="seg" data-k="grp"><button type="button" data-v="biz" aria-pressed="${!isProp}">Business finance</button><button type="button" data-v="prop" aria-pressed="${isProp}">Property finance</button></div></div>
  <div class="field" data-pg="biz" ${isProp?"hidden":""}><span class="lbl">Product</span><div class="seg" data-k="prod">${seg(biz,!isProp)}</div></div>
  <div class="field" data-pg="prop" ${isProp?"":"hidden"}><span class="lbl">Product</span><div class="seg" data-k="prod">${seg(prop,isProp)}</div></div>
  <div data-g="rbf" class="stack" style="gap:14px" hidden>
    <div class="field"><label for="${id}-ra">Advance <b class="num" data-o="raL"></b></label><input id="${id}-ra" type="range" min="3000" max="2000000" step="1000" value="50000"></div>
    <div class="field"><label for="${id}-rc">Fixed cost <b class="num" data-o="rcL"></b></label><input id="${id}-rc" type="range" min="6" max="14" step="0.5" value="10"></div></div>
  <div data-g="unsec" class="stack" style="gap:14px" hidden>
    <div class="field"><label for="${id}-ua">Loan amount <b class="num" data-o="uaL"></b></label><input id="${id}-ua" type="range" min="10000" max="1000000" step="5000" value="75000"></div>
    <div class="field"><label for="${id}-um">Term <b class="num" data-o="umL"></b></label><input id="${id}-um" type="range" min="12" max="60" step="6" value="24"></div></div>
  <div data-g="prop" class="stack" style="gap:14px" hidden>
    <div class="field"><label for="${id}-val">Property value <b class="num" data-o="valL"></b></label><input id="${id}-val" type="range" min="100000" max="5000000" step="25000" value="545000"></div>
    <div class="field"><label for="${id}-ltv">Loan to value <b class="num" data-o="ltvL"></b></label><input id="${id}-ltv" type="range" min="20" max="80" step="1" value="55"></div>
    <div class="field"><label for="${id}-mo">Term <b class="num" data-o="moL"></b></label><input id="${id}-mo" type="range" min="3" max="24" step="1" value="12"></div>
    <div class="field"><span class="lbl">Interest</span><div class="seg" data-k="int"><button type="button" data-v="ret" aria-pressed="true">Retained</button><button type="button" data-v="ser" aria-pressed="false">Paid monthly</button></div></div></div>
  <div class="result"><span class="eyebrow" style="color:#34344F" data-o="headL"></span><span class="big" data-o="hero"></span><span class="small" data-o="sub"></span></div>
  <div class="out" data-o="grid"></div><p class="small muted" data-o="warn"></p></div></div>`;
}

const LEARN=[
 ["Revenue-based finance explained","Repay as a share of what you take.","You receive an advance and agree one fixed cost. Repayments are a percentage of sales, so a slow week costs you less. It suits businesses with steady card or bank takings. Compare the total repayable, not just the headline percentage."],
 ["Business loans by amount","How size changes price and paperwork.","Bigger unsecured loans carry lower rates but more scrutiny. Under £50,000 is mostly about cash flow. Over £250,000 expect accounts, forecasts and often a personal guarantee."],
 ["Embedded finance for platforms","Offering funding inside your product.","Platforms can show pre-sized offers to merchants based on transaction data. The platform keeps the relationship; the lender underwrites and funds. Agree data sharing, eligibility and economics up front."],
 ["Bridging loans","What they are, how interest works, planning an exit.","Bridging loans are short-term and secured on property. Interest is quoted per month, and can be retained or paid monthly. The main risk is the exit: have a plan A and a plan B."],
 ["Commercial property finance","Bridging, refinancing and exits.","Commercial bridges move on first or second charge security. Plan the exit before you borrow, and make sure the term loan terms are agreed or likely."],
 ["Landlord hub","Bridge, improve, refinance.","Plan the chain: bridge to buy, works to add value, revalue, then refinance to a long-term loan. Check rental cover before you buy."]
];

const pages={};
pages.home=()=>`
<div class="band hero"><div class="wrap in"><div class="stack" style="gap:24px">
  <span class="sticker">Soft check. No exit fees. No jargon.</span>
  <h1>Money for businesses that move fast.</h1>
  <p class="lead">Revenue-based finance, cash advances, unsecured loans and embedded finance, plus property bridging. Published rates, live pricing, and private corporate capital behind every deal.</p>
  <div class="paths"><a class="btn onlem lg" href="#borrow">I need finance</a><a class="btn onlem alt lg" href="#invest">Corporate investors</a></div></div>
  <div id="heroCalc">${calcHTML("hc","rbf")}</div></div></div>
<section class="s tight"><div class="grid g3">
  <div class="card coral"><div class="big" style="font-size:2.4rem">£500m+<span class="ph">PLACEHOLDER</span></div><p>lent to SMEs and property</p></div>
  <div class="card" style="background:var(--blue);color:var(--blue-ink)"><div class="big" style="font-size:2.4rem">25+ years<span class="ph">PLACEHOLDER</span></div><p>combined experience</p></div>
  <div class="card mint"><div class="big" style="font-size:2.4rem">4.7/5<span class="ph">PLACEHOLDER</span></div><p>borrower feedback</p></div></div></section>
<section class="s">${head("Borrow","Pick your product.","Each has its own live cost calculator, rate bands and criteria.")}
<div class="grid g3">${PRODUCTS.map((p,i)=>`<a class="card ${["lemon","","mint","","","coral",""][i]||""}" href="#p-${p.id}"><span class="pill">${p.grp}</span><h3 style="margin:12px 0 6px">${p.name}</h3><p class="muted small">${p.tag}</p><p style="margin-top:14px;font-weight:700">${p.cost}</p></a>`).join("")}</div>
<div class="row" style="margin-top:22px"><a class="btn alt" href="#compare">Compare all products</a><a class="btn alt" href="#rates">See every rate</a></div></section>
<section class="s">${head("How it works","From enquiry to funds in four steps")}${processHTML()}</section>
<section class="s">${head("Case studies","How it plays out","Illustrative placeholder cases while real ones are collected.")}<div class="grid g3">${caseCards(3)}</div><p style="margin-top:16px"><a href="#case-studies">All case studies</a></p></section>
<section class="s"><div class="grid g2"><div class="card lemon stack"><span class="eyebrow" style="color:#34344F">For corporate investors</span><h2>Fund a diversified book of business loans</h2><p>We take capital from private corporate investors only, never from consumers. Agreed criteria, loan-level data and direct reporting.</p><a class="btn onlem" href="#invest" style="align-self:flex-start">How investing works</a></div>
<div class="card stack"><span class="eyebrow">For brokers and platforms</span><h2>Send us a deal, or build us in</h2><p class="muted">Brokers use the same published rates. Platforms can offer funding to their customers through embedded finance.</p><div class="row"><a class="btn alt" href="#apply">Broker route</a><a class="btn alt" href="#p-embedded">Embedded finance</a></div></div></div></section>
${cta("Know what you need?","Tell us about it. You will see indicative terms before any commitment.")}`;
pages.borrow=()=>`<section class="s">${head("Borrow","Products","Direct lending, priced in the open.")}
${["Business finance","Property finance"].map(gname=>`<h3 style="margin:8px 0 14px">${gname}</h3><div class="grid g2" style="margin-bottom:30px">${PRODUCTS.filter(p=>p.grp===gname).map(p=>`<a class="card stack" href="#p-${p.id}"><div class="row" style="justify-content:space-between"><h3>${p.name}</h3><span class="pill lemon">${p.cost}</span></div><p class="muted">${p.tag}</p><div class="grid g2 small" style="gap:8px"><div><span class="eyebrow">Amount</span><br>${p.amt}</div><div><span class="eyebrow">Term</span><br>${p.term}</div></div></a>`).join("")}</div>`).join("")}
<div class="row"><a class="btn alt" href="#compare">Compare all products</a><a class="btn alt" href="#eligibility">What we do not lend on</a></div></section>${cta("Not sure which fits?","Describe what you need and we will point you to the right product.")}`;
pages.product=id=>{const p=PRODUCTS.find(x=>x.id===id);if(!p)return pages.borrow();const rel=PRODUCTS.filter(x=>x.id!==id).slice(0,4);
 return `<section class="s"><p class="small"><a href="#home">Home</a> / <a href="#borrow">Products</a> / ${p.name}</p>
 <div class="stack" style="margin:16px 0 28px"><span class="pill lemon" style="align-self:flex-start">${p.name}</span><h1 style="font-size:clamp(2.1rem,5.2vw,3.6rem)">${p.head}</h1><p class="lead">${p.sum}</p><div class="row"><a class="btn lg" href="#apply">Apply now</a><a class="btn lg alt" href="#rates">See rates</a></div></div>
 <div class="grid g4" style="margin-bottom:36px">${p.fig.map(f=>`<div class="card sunk"><div class="big" style="font-size:1.6rem">${f[0]}</div><p class="small muted">${f[1]}</p></div>`).join("")}</div>
 <div class="grid g2" style="align-items:start;margin-bottom:40px"><div class="stack" style="gap:22px">
   <div><h3 style="margin-bottom:10px">Typical uses</h3><ul class="tick">${p.uses.map(x=>`<li>${x}</li>`).join("")}</ul></div>
   <div><h3 style="margin-bottom:10px">Why borrowers choose us</h3><ul class="tick">${p.why.map(x=>`<li>${x}</li>`).join("")}</ul></div>
   <div><h3 style="margin-bottom:10px">Key criteria</h3><ul class="tick">${p.crit.map(x=>`<li>${x}</li>`).join("")}</ul></div></div>
  <div class="stack">${p.calc?`<h3>Cost calculator</h3><div id="pcWrap">${calcHTML("pc",p.calc)}</div>`:`<div class="card mint stack"><h3>Become a partner</h3><p>Tell us about your platform, the customers you serve and the data you hold. We will come back with how a programme could work.</p><a class="btn onlem" href="#apply" style="align-self:flex-start">Talk to the partnerships team</a></div>`}</div></div>
 <div class="grid g2" style="margin-bottom:40px"><div class="stack"><h3>Fees</h3><ul class="tick">${p.fees.map(x=>`<li>${x}</li>`).join("")}</ul></div><div class="stack"><h3>Worked example</h3>${table(["Item","Detail"],p.ex)}<p class="small muted">Illustrative only. Standard terms apply on application.</p></div></div>
 <h2 style="margin-bottom:20px">How it works</h2>${processHTML()}
 <h3 style="margin:44px 0 14px">Related products</h3><div class="grid g4">${rel.map(r=>`<a class="card" href="#p-${r.id}"><b>${r.name}</b><p class="small muted" style="margin-top:6px">${r.cost}</p></a>`).join("")}</div></section>${cta("Ready to talk numbers?","Apply now, or talk it through with a named underwriter.")}`};
pages.rates=()=>`<section class="s">${head("Rates","Published lending rates","Every rate and fee on one page. Move the sliders to price a facility. Rates are indicative until our pricing is final.")}
 <div style="margin-bottom:44px">${calcHTML("rc","rbf")}</div>
 <h2 style="margin-bottom:16px">Business finance</h2><div class="grid g2" style="margin-bottom:36px">
  <div class="stack"><h4>Revenue-based finance (single fixed cost)</h4>${table(["Advance","Fixed cost (typical)","Repayment"],[["£3,000 to £50,000","6% to 14% of advance","Fixed % of monthly card sales"],["£50,000 to £250,000","8% to 16%","Fixed % of monthly card sales"],["£250,000 to £2,000,000","10% to 25%","Agreed % of turnover or sales"]])}<p class="small muted">Example: £10,000 at 25% fixed cost is £12,500 repayable in total, paid as a percentage of sales.</p></div>
  <div class="stack"><h4>Unsecured business loans (12 to 60 months)</h4>${table(["Loan amount","Rate per 30 days"],[["Up to £50,000","from 1.9%"],["£50,000 to £250,000","from 1.5%"],["£250,000 to £1,000,000","from 1.2%"]])}<p class="small muted">Rates accrue daily. Regular repayments reduce actual interest. Exact pricing is confirmed on application.</p></div></div>
 <h2 style="margin-bottom:16px">Property finance</h2><div class="grid g2" style="margin-bottom:36px">
  <div class="stack"><h4>Residential bridging (first charge)</h4>${table(["LTV","Rate per month","Notes"],[["Up to 55%","0.64%","Fast Track or AVM cases welcome"],["Up to 65%","0.69%","Full valuation usually required"],["Up to 75%","0.74%","Highest LTV band"]])}</div>
  <div class="stack"><h4>Commercial bridging (first charge)</h4>${table(["LTV","Rate per month","Notes"],[["Up to 65%","0.89%","Commercial and semi-commercial"],["Up to 70%","0.95%","Mixed-use and trading property"],["Up to 75%","0.99%","Land and higher-LTV positions"]])}<p class="small muted">Second charge pricing is slightly higher. Minimum loan £100,000.</p></div>
  <div class="stack"><h4>Development and refurbishment</h4>${table(["Product","Rate per month","Max LTV"],[["Light refurbishment","from 0.74%","75%"],["Heavy refurbishment","from 0.79%","70%"],["Ground-up development","from 0.84%","65% of GDV"],["Development exit","from 0.79%","70%"]])}</div>
  <div class="stack"><h4>Bridge-to-let and exit</h4>${table(["Stage","Rate","Term"],[["Bridge","from 0.64% per month","up to 12 months"],["Bridge with refurbishment","from 0.69% per month","up to 18 months"],["Exit (buy-to-let or commercial)","agreed at outset","up to 25 years"]])}</div></div>
 <h2 style="margin-bottom:16px">Fee schedule</h2><div class="grid g2"><div class="stack"><h4>Bridging and development</h4>${table(["Fee","Amount"],[["Arrangement fee","2%, can be added to the loan"],["Valuation","Paid direct to the panel valuer"],["Telegraphic transfer","£30 at completion"],["Exit fee","None"],["Early-repayment charge","None"],["Monthly servicing fee","None"]])}</div><div class="stack"><h4>Business finance</h4>${table(["Fee","Amount"],[["Application fee","None"],["Early-repayment charge","None"],["Revenue-based","One fixed total cost, confirmed in writing"],["Brokerage fee (dealing direct)","None"]])}</div></div>
 <div class="note" style="margin-top:26px">Indicative pricing. Rates, fees and limits are placeholders until our pricing decision is final. Your price is confirmed in writing after underwriting.</div></section>`;
pages.compare=()=>`<section class="s">${head("Compare","All products side by side")}${table(["Product","Amount","Term","Cost","Security"],PRODUCTS.map(p=>[`<a href="#p-${p.id}">${p.name}</a>`,p.amt,p.term,p.cost,p.sec]))}</section>${cta("Found your match?","Apply in a few minutes.")}`;
pages.eligibility=()=>`<section class="s">${head("Eligibility","What we lend on, and what we do not")}<div class="grid g2"><div class="card"><h3 style="margin-bottom:12px">We lend to</h3><ul class="tick"><li>UK limited companies, LLPs and partnerships</li><li>Established SMEs for unsecured and revenue-based products</li><li>Platforms and marketplaces funding their own merchants</li><li>Property investors, landlords and developers with a clear exit</li></ul></div><div class="card"><h3 style="margin-bottom:12px">We do not lend on</h3><ul class="tick cross">${EXCL.map(x=>`<li>${x}</li>`).join("")}</ul></div></div><p class="muted small" style="margin-top:18px">A guide, not a rulebook. If your case sits outside it, ask.</p></section>${cta("Check fit in two minutes","Start an application and we will tell you quickly.")}`;
pages.documents=()=>`<section class="s">${head("Document checklist","Exactly what to send us","Tick items off as you collect them. Ticks stay on this page only.")}<div class="grid g2">${Object.entries(DOCS).map(([k,v])=>`<div class="card"><h3>${k}</h3><div style="margin-top:8px">${v.map(d=>`<label class="chk"><input type="checkbox"><span>${d}</span></label>`).join("")}</div></div>`).join("")}</div></section>${cta("Got your documents?","Start your application.")}`;
pages["case-studies"]=()=>`<section class="s">${head("Case studies","Where other lenders said no","Illustrative placeholder cases. Not specific borrowers: figures and quotes are placeholders pending real underwriting cases.")}<div class="grid g2">${CASES.map(c=>`<div class="card stack"><div class="row"><span class="pill lemon">${c[1]}</span><span class="pill">${c[2]}${c[3]!=="n/a"?" · "+c[3]+" LTV":""} · ${c[4]}</span></div><h3>${c[0]}</h3><p class="small"><b>Situation.</b> <span class="muted">${c[5]}</span></p><p class="small"><b>Solution.</b> <span class="muted">${c[6]}</span></p><p class="small"><b>Result.</b> <span class="muted">${c[7]}</span></p><p class="small muted" style="border-top:2px solid var(--sunk);padding-top:10px">"${c[8]}" (${c[9]}) <span class="ph">PLACEHOLDER</span></p></div>`).join("")}</div></section>${cta("Been turned down elsewhere?","Tell us why. We may be able to help.")}`;
pages.faqs=()=>`<section class="s">${head("FAQs","Questions we get asked")}<div style="max-width:780px">${FAQ.map(([q,a])=>`<details><summary>${q}</summary><p>${a}</p></details>`).join("")}</div></section>`;
pages.learn=()=>`<section class="s">${head("Learn","Plain-English guides")}<div class="grid g3">${LEARN.map(([t,s,b])=>`<div class="card"><h3>${t}</h3><p class="muted small">${s}</p><details style="border:0;padding-bottom:0"><summary>Read more</summary><p>${b}</p></details></div>`).join("")}</div><div class="row" style="margin-top:22px"><a class="btn alt" href="#glossary">Glossary</a><a class="btn alt" href="#faqs">FAQs</a><a class="btn alt" href="#case-studies">Case studies</a></div></section>`;
pages.guide=(t,b)=>`<section class="s">${head("Learn",t,"Plain-English guide")}<div class="card stack"><p class="lead">${b}</p><p class="small muted">Rates and terms shown across this site are indicative placeholders until our pricing and legal documents are final.</p></div><div class="row" style="margin-top:22px"><a class="btn alt" href="#learn">All guides</a><a class="btn alt" href="#glossary">Glossary</a><a class="btn alt" href="/products/">Products</a></div></section>`;
pages.glossary=()=>`<section class="s">${head("Glossary","Terms, translated")}<div class="field" style="max-width:420px;margin-bottom:20px"><label for="gs">Search</label><input id="gs" type="text" placeholder="LTV, ERC, factor rate..."></div><div class="grid g2" id="gl"></div></section>`;
pages.about=()=>`<section class="s">${head("About","Why we are building this","[Founder story placeholder: two or three honest paragraphs on who you are and why you are building a direct lender.]")}
<div class="grid g3"><div class="card mint"><h3>Say the price</h3><p class="small">If a number matters to you, it is on the page.</p></div><div class="card lemon"><h3>No surprises at the end</h3><p class="small">No exit fees. No early-repayment charges. Retained interest is shown as retained.</p></div><div class="card coral"><h3>Straight answers</h3><p class="small">If a deal does not fit, we say so early.</p></div></div>
<div class="card sunk stack" style="margin-top:26px"><h3>Trust and regulation</h3><p>${BRAND} (pre-launch working name; legal entity to confirm), company number ${CONUM}, ICO ${ICO}. We lend for business purposes and do not hold client money. We do not take money from consumers.</p><p class="muted small">[Legal to confirm: exact regulatory status and permissions for each product, and for the investor side, before launch.]</p></div></section>`;
pages.contact=()=>`<section class="s">${head("Contact","Talk to us")}<div class="grid g2"><div class="card stack"><h3>Direct</h3><p>Phone: <b>${PHONE}</b></p><p>Email: <b>${EMAIL}</b></p><p class="muted small">[Placeholder London address]. Brokers, platforms and investors: use the routes on the Apply and Invest pages.</p></div><div class="card">${formHTML("ct",[["Name","text"],["Email","email"],["Message","area"]],"Send message")}</div></div></section>`;
pages.legal=()=>`<section class="s">${head("Legal and compliance","Terms, privacy and risk")}<div class="stack" style="max-width:780px"><div class="note risk"><b>Risk.</b> Lending carries risk of loss. Capital invested in loans can be lost in full and returns are not guaranteed. Investments are not protected by the Financial Services Compensation Scheme.</div><details open><summary>Terms of use</summary><p>[To be supplied by solicitors.]</p></details><details><summary>Privacy policy</summary><p>[To be supplied by solicitors: what we collect, why, how long we keep it, who we share it with.]</p></details><details><summary>Complaints</summary><p>[To be supplied by solicitors.]</p></details><details><summary>Cookies</summary><p>[To be supplied.]</p></details></div></section>`;

pages.apply=()=>`<section class="s">${head("Apply","Tell us what you need","A few minutes. You will see indicative terms before any commitment.")}<div class="card" style="max-width:780px" id="ap"></div></section>`;

const gateHTML=inner=>`<div class="gate-wrap" data-gate><div class="card stack" style="max-width:760px;margin-top:16px"><span class="pill lemon" style="align-self:flex-start">Investor confirmation</span><h3>Before we show you the numbers</h3><p class="muted">We take capital from private corporate investors only. Confirm who you are acting for.</p>
<form data-gate-form class="stack"><div class="field"><label for="gt">I am acting for</label><select id="gt"><option value="">Choose one</option><option>A corporate body or company</option><option>A fund or investment manager</option><option>A family office</option><option>A trust, partnership or pension scheme</option></select></div>
<label class="chk"><input type="checkbox" id="g1"><span>I am a professional investor acting on behalf of that entity, not a consumer.</span></label><label class="chk"><input type="checkbox" id="g2"><span>I am not relying on this site as advice, and I understand capital is at risk and returns are illustrative.</span></label>
<p class="small" data-gate-error role="alert" style="color:var(--danger)"></p><button class="btn" type="submit" style="align-self:flex-start">Confirm and continue</button></form>
<p class="small muted">[Draft wording and gate logic need solicitor sign-off. A production gate must be enforced on the server, not only in the page.]</p></div><div data-gated-inner hidden>${inner}</div></div>`;
pages.invest=()=>`<section class="s tight">${subnav("invest")}<div class="stack" style="margin:26px 0 30px"><span class="eyebrow">Invest</span><h1 style="font-size:clamp(2.1rem,5.4vw,3.6rem)">Fund a diversified book of business loans.</h1><p class="lead">We take capital from private corporate investors only: family offices, funds, treasuries, corporates, trusts and pension schemes. Loans we originate fund through agreed criteria, with loan-level data and direct reporting.</p></div>
<div class="note risk" style="margin-bottom:24px"><b>Not a live offer.</b> This investment route is not yet open. We do not hold client money. Capital is at risk and returns are illustrative.</div>
<div class="grid g3"><div class="card lemon"><h3>Family offices</h3><p class="small">Direct SME credit exposure with a named underwriter and reporting.</p></div><div class="card mint"><h3>Funds and treasuries</h3><p class="small">Forward-flow and funding lines against agreed lending criteria.</p></div><div class="card coral"><h3>Corporates and trusts</h3><p class="small">Surplus cash in short-duration business lending.</p></div></div>
<div class="row" style="margin-top:24px"><a class="btn" href="#invest-how">How it works</a><a class="btn alt" href="#invest-register">Register interest</a></div>
<h2 style="margin:44px 0 16px">What we lend into</h2><div class="grid g2">${[["Revenue-based finance and MCAs","Short-duration advances repaid from sales."],["Unsecured business loans","Amortising SME loans from £10k to £1m."],["Embedded finance programmes","Funding offered inside partner platforms."],["Secured property bridging","First charge bridging, development and exit."]].map(([t,s])=>`<div class="card"><h4>${t}</h4><p class="small muted" style="margin-top:6px">${s}</p></div>`).join("")}</div></section>`;
pages["invest-how"]=()=>`<section class="s tight">${subnav("invest-how")}<div class="stack" style="margin:26px 0"><h1 style="font-size:clamp(2rem,5vw,3.2rem)">How investing works</h1><p class="lead">Four steps from first conversation to capital deployed.</p></div><div class="grid g2">${[["Choose your route","Direct facility, forward-flow line or participation in a programme, depending on size and structure."],["Confirm your status","Confirm you are a corporate or professional investor before seeing deal terms or return figures."],["Review the book","Product mix, security, tenor, concentration and target returns, shown as illustrative projections."],["Register interest","This site captures interest only. Vetted investors are invited to meet facilities in order of registration once sign-off is complete."]].map((s,i)=>`<div class="step"><b class="n">${i+1}</b><div><h4>${s[0]}</h4><p class="muted small">${s[1]}</p></div></div>`).join("")}</div>
<div class="card sunk stack" style="margin-top:28px"><h3>What this is not</h3><ul class="tick"><li>Not a live investment or checkout. The site captures interest only.</li><li>Not authorised to hold client money. Nothing is payable through the site.</li><li>Not advice and not a guarantee. Capital is at risk.</li></ul></div></section>`;
pages["invest-deals"]=()=>{const inner=`<div class="stack" style="margin:24px 0"><span class="pill lemon" style="align-self:flex-start">Illustrative, not a live offer</span><h1 style="font-size:clamp(2rem,5vw,3.2rem)">Example facilities</h1><p class="muted">Target returns are placeholders. Capital is at risk.</p></div>
 ${table(["Instrument","Target return (illustrative)","Profile"],[["Revenue-based facilities","up to 8.5% p.a. equivalent","Unsecured, sales-linked, short duration"],["Commercial bridging","up to 11% p.a.","First charge, 9 to 12 months"],["Bridge-to-let","up to 9.5% p.a.","First charge, 12 months"],["Development finance","up to 12% p.a.","Up to 55% of GDV, 24 months"]])}
 <div class="card" style="margin-top:20px"><div class="row" style="justify-content:space-between"><b>Example facility funding progress</b><span class="num small">62% of £2,000,000</span></div><div class="bar2" style="margin-top:10px"><i style="width:62%"></i></div><p class="small muted" style="margin-top:10px">Each facility will show type, security, concentration limits, term, target return and funding progress.</p></div>`;
 return `<section class="s tight">${subnav("invest-deals")}${gateHTML(inner)}</section>`};
pages["invest-calc"]=()=>{const inner=`<div class="stack" style="margin:24px 0"><h1 style="font-size:clamp(2rem,5vw,3.2rem)">Return calculator</h1><p class="muted">Plain interest projection only. No compounding, fees, defaults or early repayment unless you move the loss slider. Illustrative, not guaranteed.</p></div>
 <div class="card"><div class="calc"><div class="stack" style="gap:16px"><div class="field"><span class="lbl">Instrument</span><div class="seg" id="isel">${Object.entries(TARGETS).map(([k,[n,r]],i)=>`<button type="button" data-v="${k}" aria-pressed="${i===0}">${n}</button>`).join("")}</div></div>
 <div class="field"><label for="ia">Commitment <b class="num" id="iaL"></b></label><input id="ia" type="range" min="250000" max="10000000" step="250000" value="2000000"></div>
 <div class="field"><label for="im">Term <b class="num" id="imL"></b></label><input id="im" type="range" min="6" max="36" step="1" value="12"></div>
 <div class="field"><label for="il">What if loans go wrong? Capital lost <b class="num" id="ilL"></b></label><input id="il" type="range" min="0" max="50" step="1" value="0"></div></div>
 <div class="stack"><div class="result"><span class="eyebrow" style="color:#34344F">Projected outcome</span><span class="big" id="io"></span><span class="small" id="isub"></span></div><div class="out" id="ig"></div></div></div></div><div class="note risk" style="margin-top:16px">Illustrative figures are not a reliable guide to results. You can lose all of your capital.</div>`;
 return `<section class="s tight">${subnav("invest-calc")}${gateHTML(inner)}</section>`};
pages["invest-eligibility"]=()=>`<section class="s tight">${subnav("invest-eligibility")}<div class="stack" style="margin:26px 0"><h1 style="font-size:clamp(2rem,5vw,3.2rem)">Who can invest</h1><p class="lead">Private corporate investors only. We do not take money from consumers.</p></div><div class="grid g2">${[["Corporate bodies and companies","Operating companies and holding companies deploying surplus capital."],["Funds and investment managers","Credit funds, debt funds and managers investing on behalf of others."],["Family offices","Single and multi-family offices with direct relationships and bespoke notes."],["Trusts, partnerships and pension schemes","Entities with substantial assets investing on a professional basis."]].map(([t,s])=>`<div class="card"><h3>${t}</h3><p class="muted small" style="margin-top:6px">${s}</p></div>`).join("")}</div><p class="muted small" style="margin-top:18px">[Legal to confirm the exact investor categories and any minimum net asset tests.]</p><div class="row" style="margin-top:18px"><a class="btn" href="#invest-register">Register interest</a><a class="btn alt" href="#legal">Risk warnings in full</a></div></section>`;
pages["invest-register"]=()=>`<section class="s tight">${subnav("invest-register")}<div class="stack" style="margin:26px 0"><h1 style="font-size:clamp(2rem,5vw,3.2rem)">Register interest</h1><p class="muted">This captures interest only. It is not an application and no money is taken.</p></div><div class="card" style="max-width:660px">${formHTML("rg",[["Your name","text"],["Entity name","text"],["Work email","email"],["Indicative commitment (£)","text"]],"Register interest")}</div></section>`;
function formHTML(id,f,l){return `<form id="${id}-f" class="stack">${f.map(([x,t],i)=>`<div class="field"><label for="${id}${i}">${x}</label>${t==="area"?`<textarea id="${id}${i}" rows="4"></textarea>`:`<input id="${id}${i}" type="${t}">`}</div>`).join("")}<button class="btn" type="submit" style="align-self:flex-start">${l}</button><p class="small muted" id="${id}-m" role="status"></p></form>`}

// ---- Routing helpers for the Astro multi-page build ----
// Client product ids are kept internally, but published URLs keep their
// existing slugs so the Astro sitemap and inbound links do not change.
export const PRODUCT_PATHS = {
  rbf: 'revenue-based-finance',
  unsecured: 'unsecured-business-loans',
  embedded: 'embedded-finance',
  residential: 'residential-bridging',
  commercial: 'commercial-bridging',
  development: 'development-refurbishment',
  'bridge-to-let': 'bridge-to-let',
};
export const PRODUCT_IDS = PRODUCTS.map((p) => p.id);
export const PRODUCT_ROUTES = PRODUCTS.map((p) => ({ slug: PRODUCT_PATHS[p.id], id: p.id }));

// The original guide URLs are retained; the new client-only guide is added.
// Each guide reuses the exact summary supplied in the client's standalone HTML.
export const GUIDES = [
  { slug: 'bridging-loans-guide', title: 'The guide to bridging loans', blurb: LEARN[3][2] },
  { slug: 'commercial-property-finance-guide', title: 'Guide to commercial property finance', blurb: LEARN[4][2] },
  { slug: 'business-loans-by-amount', title: 'Business loans by amount', blurb: LEARN[1][2] },
  { slug: 'revenue-based-finance-explained', title: 'Revenue-based finance explained', blurb: LEARN[0][2] },
  { slug: 'business-loans-by-purpose', title: 'Business loans by purpose', blurb: LEARN[0][2] },
  { slug: 'landlord-hub-guide', title: 'The landlord hub', blurb: LEARN[5][2] },
  { slug: 'industry-finance-hospitality', title: 'Industry finance: hospitality', blurb: LEARN[0][2] },
  { slug: 'industry-finance-ecommerce', title: 'Industry finance: e-commerce', blurb: LEARN[2][2] },
  { slug: 'finance-glossary-guide', title: 'A finance glossary', blurb: 'Plain-English definitions of the lending terms you will see on this site, from LTV and GDV to retained interest and forward flow.' },
  { slug: 'embedded-finance-for-platforms', title: 'Embedded finance for platforms', blurb: LEARN[2][2] },
];

const ROUTES = {
  home: '/', borrow: '/products/', rates: '/rates/', invest: '/invest/',
  learn: '/learn/', about: '/about/', apply: '/apply/', compare: '/compare/',
  eligibility: '/eligibility/', documents: '/documents/', faqs: '/faqs/',
  'case-studies': '/case-studies/', glossary: '/learn/glossary/', legal: '/legal/',
  contact: '/contact/', 'invest-how': '/invest/how-it-works/',
  'invest-deals': '/invest/deals/', 'invest-calc': '/invest/calculator/',
  'invest-eligibility': '/invest/eligibility/', 'invest-register': '/invest/register/',
};

function linkify(html) {
  return html
    .replace(/href="#p-([a-z0-9-]+)"/g, (_, id) => `href="/products/${PRODUCT_PATHS[id] || id}/"`)
    .replace(/href="#([a-z0-9-]+)"/g, (_, key) => (ROUTES[key] ? `href="${ROUTES[key]}"` : `#${key}`));
}

export function renderPage(key, slug) {
  const fn = pages[key] || pages.home;
  if (key === 'product') return linkify(fn(slug));
  if (key === 'guide') {
    const guide = GUIDES.find((g) => g.slug === slug);
    return linkify(pages.guide(guide?.title || 'Guide', guide?.blurb || ''));
  }
  return linkify(fn());
}

export {
  BRAND, CONUM, PHONE, EMAIL, ICO,
  BANDS, TT, UNSEC, RBF, TARGETS,
  bridgeRate, bridgeCalc, unsecRate, unsecCalc, rbfBand, rbfCalc, investCalc, G, pct,
  STEPS, PRODUCTS, CASES, GLOSS, FAQ, DOCS, EXCL, LEARN,
  head, table, cta, processHTML, caseCards, subnav, calcHTML, formHTML, gateHTML, pages,
};
