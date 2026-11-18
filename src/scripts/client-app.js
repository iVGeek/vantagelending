import {
  BANDS, TARGETS, GLOSS, PRODUCTS,
  rbfBand, rbfCalc, unsecCalc, bridgeCalc, investCalc, G, pct,
} from '../data/client-site.mjs';

const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];

function initMenu() {
  const btn = $('#menuBtn');
  const nav = $('#nav');
  if (!btn || !nav) return;
  btn.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    btn.setAttribute('aria-expanded', String(open));
  });
}

function initCalc(id) {
  const root = $('#' + id);
  if (!root) return;
  const st = { prod: root.querySelector('[data-pg]:not([hidden]) [aria-pressed=true]').dataset.v, int: 'ret' };
  const g = (k) => root.querySelector(`[data-g=${k}]`);
  const o = (k) => root.querySelector(`[data-o=${k}]`);
  const v = (s) => +root.querySelector('#' + id + '-' + s).value;

  function draw() {
    const p = st.prod;
    g('rbf').hidden = p !== 'rbf';
    g('unsec').hidden = p !== 'unsec';
    g('prop').hidden = !BANDS[p];
    if (p === 'rbf') {
      const a = v('ra'), [lo, hi] = rbfBand(a), rc = root.querySelector('#' + id + '-rc');
      rc.min = lo; rc.max = hi;
      if (+rc.value < lo) rc.value = lo;
      if (+rc.value > hi) rc.value = hi;
      const c = +rc.value, r = rbfCalc({ amount: a, cost: c });
      o('raL').textContent = G(a);
      o('rcL').textContent = c + '% (band ' + lo + '% to ' + hi + '%)';
      o('headL').textContent = 'Advance of ' + G(a);
      o('hero').textContent = G(r.total);
      o('sub').textContent = 'total repayable, as a share of your sales';
      o('grid').innerHTML = [[G(r.cost), 'Fixed cost'], [G(0), 'Application and early-repayment fees']]
        .map(([x, y]) => `<div><b>${x}</b><span>${y}</span></div>`).join('');
      o('warn').textContent = 'Indicative. Your exact cost is fixed once we have seen your takings.';
    } else if (p === 'unsec') {
      const a = v('ua'), m = v('um'), r = unsecCalc({ amount: a, months: m });
      o('uaL').textContent = G(a);
      o('umL').textContent = m + ' months';
      o('headL').textContent = 'Loan of ' + G(a) + ' over ' + m + ' months';
      o('hero').textContent = G(r.pay) + ' a month';
      o('sub').textContent = 'at ' + pct(r.rate) + ' per 30 days on the reducing balance';
      o('grid').innerHTML = [[pct(r.rate), 'Rate per 30 days'], [G(r.total), 'Total repayable'], [G(r.cost), 'Total cost of credit']]
        .map(([x, y]) => `<div><b>${x}</b><span>${y}</span></div>`).join('');
      o('warn').textContent = 'Indicative. Repay early for free. A personal guarantee may be required.';
    } else {
      const value = v('val'), ltv = v('ltv'), mo = v('mo');
      const r = bridgeCalc({ key: p, value, ltv, months: mo, retained: st.int === 'ret' });
      o('valL').textContent = G(value);
      o('ltvL').textContent = ltv + '%';
      o('moL').textContent = mo + ' months';
      o('headL').textContent = BANDS[p].name + ': ' + G(r.loan) + ' at ' + ltv + '% LTV';
      if (r.rate === null) {
        o('hero').textContent = 'Over our LTV limit';
        o('sub').textContent = 'Reduce the loan to see a price.';
        o('grid').innerHTML = '';
        o('warn').textContent = 'Maximum LTV for ' + BANDS[p].name.toLowerCase() + ' is ' + BANDS[p].bands.slice(-1)[0][0] + '%.';
        return;
      }
      o('hero').textContent = G(r.monthly) + ' a month';
      o('sub').textContent = 'interest at ' + pct(r.rate) + ' per month';
      o('grid').innerHTML = [
        [pct(r.rate), 'Monthly rate'],
        [G(r.arr), 'Arrangement fee (2% added to the facility)'],
        [G(r.interest), 'Interest over term'],
        [G(r.total), 'Total cost'],
        [G(r.net), 'Net advance'],
      ].map(([x, y]) => `<div><b>${x}</b><span>${y}</span></div>`).join('');
      o('warn').textContent = 'Indicative. Includes a £30 transfer fee. Excludes valuation (paid direct to the valuer) and legal costs. Exact pricing is confirmed after credit approval.';
    }
  }

  root.addEventListener('input', draw);
  root.addEventListener('click', (e) => {
    const b = e.target.closest('.seg button');
    if (!b) return;
    if (b.parentElement.dataset.k === 'grp') {
      root.querySelectorAll('[data-pg]').forEach((x) => { x.hidden = x.dataset.pg !== b.dataset.v; });
      st.prod = root.querySelector('[data-pg]:not([hidden]) [aria-pressed=true]').dataset.v;
    } else {
      st[b.parentElement.dataset.k] = b.dataset.v;
    }
    b.parentElement.querySelectorAll('button').forEach((x) => x.setAttribute('aria-pressed', x === b));
    draw();
  });
  draw();
}

function initGlossary() {
  const input = $('#gs');
  const box = $('#gl');
  if (!input || !box) return;
  const draw = () => {
    const q = input.value.toLowerCase();
    box.innerHTML = GLOSS.filter(([a, b]) => (a + b).toLowerCase().includes(q))
      .map(([a, b]) => `<div class="card"><h4>${a}</h4><p class="muted small" style="margin-top:6px">${b}</p></div>`).join('') ||
      '<p class="muted">No matching terms.</p>';
  };
  input.addEventListener('input', draw);
  draw();
}

function wireApply() {
  const root = $('#ap');
  if (!root || root.dataset.wired) return;
  root.dataset.wired = '1';
  const S = { step: 0, type: 'direct', prod: PRODUCTS[0].name };
  const steps = ['You', 'Product', 'Details', 'Contact'];
  const draw = () => {
    const dots = `<div class="steps">${steps.map((_, i) => `<i class="${i <= S.step ? 'on' : ''}"></i>`).join('')}</div><p class="eyebrow" style="margin-bottom:12px">Step ${S.step + 1} of 4: ${steps[S.step]}</p>`;
    let b = '';
    if (S.step === 0) b = `<h3>Who are you?</h3><div class="seg" style="margin:14px 0" data-k="type">${[['direct', 'Borrower'], ['broker', 'Broker or introducer'], ['partner', 'Platform partner']].map(([v, l]) => `<button type="button" data-v="${v}" aria-pressed="${S.type === v}">${l}</button>`).join('')}</div>`;
    if (S.step === 1) b = `<h3>What do you need?</h3><div class="seg" style="margin:14px 0" data-k="prod">${PRODUCTS.map((p) => `<button type="button" data-v="${p.name}" aria-pressed="${S.prod === p.name}">${p.name}</button>`).join('')}</div>`;
    if (S.step === 2) b = `<h3>The details</h3><div class="stack" style="margin-top:12px"><div class="field"><label for="a1">How much do you need?</label><input id="a1" type="text" inputmode="numeric" placeholder="£"></div><div class="field"><label for="a2">What is it for?</label><textarea id="a2" rows="3"></textarea></div><div class="field"><label for="a3">How will it be repaid?</label><input id="a3" type="text"></div></div>`;
    if (S.step === 3) b = `<h3>How do we reach you?</h3><div class="stack" style="margin-top:12px"><div class="field"><label for="a4">Name</label><input id="a4" type="text"></div><div class="field"><label for="a5">Email</label><input id="a5" type="email"></div><div class="field"><label for="a6">Phone</label><input id="a6" type="tel"></div><label class="chk" style="border:0"><input type="checkbox" id="a7"><span class="small">I agree to be contacted about this enquiry. See the privacy policy.</span></label></div>`;
    if (S.step === 4) b = `<h3>Thanks, that is everything we need.</h3><p class="muted" style="margin-top:10px">Once connected, your enquiry goes to our team and you hear back from a named person.</p><div class="note" style="margin-top:14px">Prototype notice: this form does not transmit yet, so nothing was sent. The form handler is to be connected before launch.</div>`;
    root.innerHTML = (S.step < 4 ? dots : '') + b + (S.step < 4 ? `<div class="row" style="margin-top:22px">${S.step > 0 ? '<button class="btn alt" type="button" id="bk">Back</button>' : ''}<button class="btn" type="button" id="nx">${S.step === 3 ? 'Submit' : 'Continue'}</button></div>` : '');
    const nx = $('#nx', root), bk = $('#bk', root);
    if (nx) nx.addEventListener('click', () => { S.step++; draw(); });
    if (bk) bk.addEventListener('click', () => { S.step--; draw(); });
    $$('.seg button', root).forEach((btn) => btn.addEventListener('click', () => { S[btn.parentElement.dataset.k] = btn.dataset.v; draw(); }));
  };
  draw();
}

function wirePrototypeForms() {
  $$('form').forEach((form) => {
    if (form.hasAttribute('data-gate-form') || form.dataset.wired) return;
    form.dataset.wired = '1';
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const msg = $('p[role=status]', form);
      if (msg) msg.textContent = 'Prototype: this form is not connected yet, so nothing was sent.';
    });
  });
}

function revealGate(wrap) {
  const form = $('[data-gate-form]', wrap);
  if (form) form.remove();
  const inner = $('[data-gated-inner]', wrap);
  if (inner) inner.hidden = false;
}

function initGates() {
  let gated = false;
  try { gated = sessionStorage.getItem('gate') === '1'; } catch (e) { /* storage unavailable */ }
  $$('[data-gate]').forEach((wrap) => {
    if (gated) revealGate(wrap);
    const form = $('[data-gate-form]', wrap);
    if (!form) return;
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const err = $('[data-gate-error]', wrap);
      const select = $('#gt', wrap);
      const checks = $$('input[type=checkbox]', wrap);
      if (!select.value || !checks.every((c) => c.checked)) {
        err.textContent = 'Choose an entity type and tick both statements.';
        return;
      }
      try { sessionStorage.setItem('gate', '1'); } catch (x) { /* storage unavailable */ }
      revealGate(wrap);
    });
  });
}

function initInvestCalc() {
  if (!$('#ia')) return;
  let k = 'btl';
  const f = () => {
    const a = +$('#ia').value, m = +$('#im').value, l = +$('#il').value;
    const [n, rate] = TARGETS[k];
    $('#iaL').textContent = G(a);
    $('#imL').textContent = m + ' months';
    $('#ilL').textContent = l + '%';
    const r = investCalc({ amount: a, months: m, gross: rate, lossPct: l });
    $('#io').textContent = (r.out >= 0 ? '+' : '-') + G(Math.abs(r.out));
    $('#isub').textContent = n + ' at an illustrative ' + rate + '% p.a. over ' + m + ' months';
    $('#ig').innerHTML = [[G(r.g), 'Gross interest'], ['-' + G(r.loss), 'Capital lost'], [G(a + r.out), 'Value at end']]
      .map(([x, y]) => `<div><b>${x}</b><span>${y}</span></div>`).join('');
  };
  $('#isel').addEventListener('click', (e) => {
    const b = e.target.closest('button');
    if (!b) return;
    k = b.dataset.v;
    $$('#isel button').forEach((x) => x.setAttribute('aria-pressed', x === b));
    f();
  });
  $('.calc').addEventListener('input', f);
  f();
}

export function initPage() {
  initMenu();
  $$('.meter[id]').forEach((m) => initCalc(m.id));
  const key = $('#app')?.dataset.page || '';
  if (key === 'glossary') initGlossary();
  if (key === 'apply') wireApply();
  if (key === 'invest-calc') initInvestCalc();
  wirePrototypeForms();
  initGates();
}
