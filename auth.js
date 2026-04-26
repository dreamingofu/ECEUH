/* ECEUH auth + progress
   Single-file client for Supabase auth (X-style modal) and per-unit
   progress tracking. Loads on every page; auto-injects styles, modal,
   and the topbar sign-in pill. No build step. */

(() => {
  if (window.ECEUH) return; // idempotent

  const SUPABASE_URL = 'https://bnbpuhixxsjhrxkxvddh.supabase.co';
  const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJuYnB1aGl4eHNqaHJ4a3h2ZGRoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzcxNDY0NjMsImV4cCI6MjA5MjcyMjQ2M30.NXLYBpzeyrekLCcyHn_6WV1S4aZm_7jZNSGDKXB1E34';

  const STATUS_CYCLE = ['todo', 'in-progress', 'done'];
  const PROGRESS_LS_KEY = 'eceuh:progress';

  /* ───── Supabase client (loaded from the CDN script tag in <head>) ───── */
  function client() {
    if (!window.supabase) return null;
    if (!window.__eceuhClient) {
      window.__eceuhClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
        auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true }
      });
    }
    return window.__eceuhClient;
  }

  /* ───── Style block (injected once) ───── */
  function injectStyles() {
    if (document.getElementById('eceuh-auth-styles')) return;
    const css = `
      .eceuh-pill {
        display:inline-flex;align-items:center;gap:8px;
        font-family:'Inter',system-ui,sans-serif;
        font-weight:700;font-size:13px;letter-spacing:-0.2px;
        padding:8px 14px;border-radius:9999px;cursor:pointer;
        background:#FF6363;color:#fff;border:none;transition:filter .15s,transform .1s;
      }
      .eceuh-pill:hover { filter:brightness(1.08); }
      .eceuh-pill:active { transform:translateY(1px); }
      .eceuh-pill.ghost { background:transparent;color:#94A3B8;border:1px solid rgba(255,255,255,0.15); }
      .eceuh-pill.ghost:hover { color:#fff;border-color:#FF6363; }
      .eceuh-avatar-btn {
        display:inline-flex;align-items:center;gap:8px;background:rgba(255,255,255,0.06);
        border:1px solid rgba(255,255,255,0.1);border-radius:9999px;padding:4px 12px 4px 4px;
        cursor:pointer;font-family:'Inter',sans-serif;color:#fff;font-size:12px;font-weight:700;
        transition:background .15s;
      }
      .eceuh-avatar-btn:hover { background:rgba(255,255,255,0.12); }
      .eceuh-avatar {
        width:28px;height:28px;border-radius:9999px;display:grid;place-items:center;
        background:linear-gradient(135deg,#FF6363,#a83838);color:#fff;font-weight:900;font-size:11px;
      }
      .eceuh-menu {
        position:absolute;right:0;top:calc(100% + 8px);min-width:220px;
        background:#0f0f1c;border:1px solid rgba(255,255,255,0.1);border-radius:12px;
        box-shadow:0 25px 50px -12px rgba(0,0,0,0.5);padding:8px;z-index:300;
        font-family:'Inter',sans-serif;
      }
      .eceuh-menu button, .eceuh-menu a {
        display:flex;align-items:center;gap:10px;width:100%;padding:10px 12px;
        background:none;border:none;color:#e2e8f0;font-size:13px;text-align:left;
        border-radius:8px;cursor:pointer;text-decoration:none;
      }
      .eceuh-menu button:hover, .eceuh-menu a:hover { background:rgba(255,255,255,0.06);color:#fff; }
      .eceuh-menu .meta { padding:10px 12px;border-bottom:1px solid rgba(255,255,255,0.08);margin-bottom:4px; }
      .eceuh-menu .meta strong { display:block;color:#fff;font-size:13px; }
      .eceuh-menu .meta small { color:#64748B;font-size:11px; }

      /* X-style modal */
      .eceuh-backdrop {
        position:fixed;inset:0;background:rgba(0,0,0,0.6);backdrop-filter:blur(4px);
        display:none;align-items:flex-start;justify-content:center;z-index:1000;
        padding:40px 16px;overflow-y:auto;animation:eceuhFade .2s ease;
      }
      .eceuh-backdrop.open { display:flex; }
      @keyframes eceuhFade { from{opacity:0} to{opacity:1} }
      .eceuh-modal {
        background:#0f0f1c;border:1px solid rgba(255,255,255,0.08);border-radius:16px;
        width:100%;max-width:440px;padding:32px 80px 36px;color:#fff;
        font-family:'Inter',system-ui,sans-serif;position:relative;
        box-shadow:0 25px 60px -12px rgba(0,0,0,0.6);
      }
      .eceuh-modal .close {
        position:absolute;top:14px;left:14px;width:34px;height:34px;border-radius:9999px;
        display:grid;place-items:center;background:none;border:none;color:#e2e8f0;cursor:pointer;
        transition:background .15s;
      }
      .eceuh-modal .close:hover { background:rgba(255,255,255,0.08); }
      .eceuh-modal .logo {
        display:grid;place-items:center;margin:8px auto 28px;width:36px;height:36px;
        background:#FF6363;border-radius:8px;font-family:'Inter';font-weight:900;color:#67000E;font-size:18px;
      }
      .eceuh-modal h2 {
        font-family:'Lora',serif;font-weight:700;font-size:30px;line-height:1.15;margin-bottom:24px;
      }
      .eceuh-modal label { display:block;position:relative;margin-bottom:14px; }
      .eceuh-modal input {
        width:100%;background:transparent;border:1px solid #2a2a3e;border-radius:6px;
        padding:22px 12px 8px;color:#fff;font-size:16px;font-family:inherit;outline:none;
        transition:border-color .15s;
      }
      .eceuh-modal input:focus { border-color:#FF6363; }
      .eceuh-modal label span {
        position:absolute;left:13px;top:18px;color:#64748B;font-size:16px;
        pointer-events:none;transition:transform .15s,font-size .15s,color .15s;
      }
      .eceuh-modal input:focus + span,
      .eceuh-modal input:not(:placeholder-shown) + span {
        transform:translateY(-12px);font-size:11px;color:#94A3B8;
      }
      .eceuh-modal .btn {
        width:100%;padding:14px 12px;border-radius:9999px;font-weight:700;font-size:15px;
        font-family:inherit;cursor:pointer;border:none;transition:filter .15s,background .15s;
      }
      .eceuh-modal .btn-primary { background:#fff;color:#0f0f1c; }
      .eceuh-modal .btn-primary:hover { filter:brightness(0.92); }
      .eceuh-modal .btn-primary:disabled { opacity:0.5;cursor:not-allowed; }
      .eceuh-modal .btn-ghost {
        background:transparent;color:#fff;border:1px solid #536471;
      }
      .eceuh-modal .btn-ghost:hover { background:rgba(255,255,255,0.05); }
      .eceuh-modal .divider {
        display:flex;align-items:center;gap:12px;color:#64748B;font-size:13px;margin:18px 0;
      }
      .eceuh-modal .divider::before, .eceuh-modal .divider::after {
        content:'';flex:1;height:1px;background:rgba(255,255,255,0.12);
      }
      .eceuh-modal .switch {
        margin-top:24px;color:#64748B;font-size:14px;
      }
      .eceuh-modal .switch a { color:#FF6363;cursor:pointer;text-decoration:none; }
      .eceuh-modal .switch a:hover { text-decoration:underline; }
      .eceuh-modal .err {
        color:#ff8a8a;font-size:13px;margin-top:8px;min-height:18px;
      }
      .eceuh-modal .ok {
        color:#4ADE80;font-size:13px;margin-top:8px;
      }
      .eceuh-modal .gbtn {
        display:flex;align-items:center;justify-content:center;gap:10px;
        width:100%;background:#fff;color:#0f0f1c;border:none;border-radius:9999px;
        padding:12px;font-weight:700;font-size:14px;cursor:pointer;font-family:inherit;
        margin-bottom:10px;
      }
      .eceuh-modal .gbtn:hover { filter:brightness(0.95); }
      .eceuh-modal .gbtn svg { width:18px;height:18px; }
      @media (max-width: 540px) {
        .eceuh-modal { padding: 28px 24px; }
      }

      /* Progress checkmark on unit cards */
      .eceuh-check {
        position:absolute;top:12px;right:12px;width:28px;height:28px;border-radius:9999px;
        display:grid;place-items:center;cursor:pointer;
        background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.12);
        color:transparent;transition:all .15s;z-index:5;
      }
      .eceuh-check:hover { background:rgba(255,255,255,0.12);border-color:#FF6363; }
      .eceuh-check[data-status="in-progress"] {
        background:rgba(255,99,99,0.15);border-color:#FF6363;color:#FF6363;
      }
      .eceuh-check[data-status="done"] {
        background:#FF6363;border-color:#FF6363;color:#fff;
      }
      .eceuh-check svg { width:14px;height:14px;display:block; }
      [data-progress] { position:relative; }
    `;
    const tag = document.createElement('style');
    tag.id = 'eceuh-auth-styles';
    tag.textContent = css;
    document.head.appendChild(tag);
  }

  /* ───── Modal element ───── */
  function buildModal() {
    if (document.getElementById('eceuh-modal-root')) return;
    const root = document.createElement('div');
    root.id = 'eceuh-modal-root';
    root.className = 'eceuh-backdrop';
    root.innerHTML = `
      <form class="eceuh-modal" autocomplete="on" novalidate>
        <button type="button" class="close" aria-label="Close" data-modal-close>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 6l12 12M18 6l-12 12"/></svg>
        </button>
        <div class="logo">E</div>
        <h2 data-mode-title>Sign in to ECEUH</h2>
        <button type="button" class="gbtn" data-google>
          <svg viewBox="0 0 24 24"><path fill="#4285F4" d="M21.6 12.2c0-.7-.1-1.4-.2-2H12v3.8h5.4c-.2 1.3-.9 2.4-2 3.1v2.6h3.3c1.9-1.8 3-4.4 3-7.5z"/><path fill="#34A853" d="M12 22c2.7 0 5-1 6.7-2.5l-3.3-2.6c-.9.6-2.1 1-3.4 1-2.6 0-4.8-1.7-5.6-4.1H3v2.6C4.7 19.6 8.1 22 12 22z"/><path fill="#FBBC05" d="M6.4 13.7c-.2-.6-.3-1.2-.3-1.7s.1-1.1.3-1.7V7.7H3C2.4 9 2 10.4 2 12s.4 3 1 4.3l3.4-2.6z"/><path fill="#EA4335" d="M12 6.4c1.5 0 2.8.5 3.8 1.5l2.9-2.9C16.9 3.4 14.7 2.5 12 2.5 8.1 2.5 4.7 4.9 3 8.4l3.4 2.6C7.2 8.1 9.4 6.4 12 6.4z"/></svg>
          Continue with Google
        </button>
        <div class="divider">or</div>
        <label data-field="username" style="display:none">
          <input type="text" name="username" placeholder=" " autocomplete="username" />
          <span>Username</span>
        </label>
        <label data-field="email">
          <input type="email" name="email" placeholder=" " autocomplete="email" required />
          <span>Email</span>
        </label>
        <label data-field="password">
          <input type="password" name="password" placeholder=" " autocomplete="current-password" required minlength="6" />
          <span>Password</span>
        </label>
        <button type="submit" class="btn btn-primary" data-submit>Sign in</button>
        <div class="err" data-err></div>
        <p class="switch">
          <span data-switch-text>Don't have an account?</span>
          <a data-switch-link>Sign up</a>
        </p>
      </form>
    `;
    document.body.appendChild(root);

    const form = root.querySelector('form');
    const errEl = form.querySelector('[data-err]');
    const userField = form.querySelector('[data-field="username"]');
    const titleEl = form.querySelector('[data-mode-title]');
    const submitBtn = form.querySelector('[data-submit]');
    const switchText = form.querySelector('[data-switch-text]');
    const switchLink = form.querySelector('[data-switch-link]');
    const passInput = form.querySelector('input[name="password"]');

    let mode = 'signin';
    function setMode(next) {
      mode = next;
      errEl.textContent = '';
      if (mode === 'signin') {
        titleEl.textContent = 'Sign in to ECEUH';
        submitBtn.textContent = 'Sign in';
        userField.style.display = 'none';
        passInput.setAttribute('autocomplete', 'current-password');
        switchText.textContent = "Don't have an account?";
        switchLink.textContent = 'Sign up';
      } else {
        titleEl.textContent = 'Create your ECEUH account';
        submitBtn.textContent = 'Sign up';
        userField.style.display = 'block';
        passInput.setAttribute('autocomplete', 'new-password');
        switchText.textContent = 'Already have an account?';
        switchLink.textContent = 'Sign in';
      }
    }
    switchLink.addEventListener('click', () => setMode(mode === 'signin' ? 'signup' : 'signin'));

    form.querySelector('[data-modal-close]').addEventListener('click', closeModal);
    root.addEventListener('click', (e) => { if (e.target === root) closeModal(); });

    form.querySelector('[data-google]').addEventListener('click', async () => {
      const c = client();
      if (!c) return setErr('Auth client not loaded yet.');
      errEl.textContent = '';
      const { error } = await c.auth.signInWithOAuth({
        provider: 'google',
        options: { redirectTo: window.location.href }
      });
      if (error) setErr(error.message);
    });

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const c = client();
      if (!c) return setErr('Auth client not loaded yet.');
      const fd = new FormData(form);
      const email = fd.get('email').toString().trim();
      const password = fd.get('password').toString();
      const username = (fd.get('username') || '').toString().trim();
      submitBtn.disabled = true;
      errEl.textContent = '';
      try {
        if (mode === 'signin') {
          const { error } = await c.auth.signInWithPassword({ email, password });
          if (error) throw error;
          closeModal();
        } else {
          if (!username || username.length < 3) throw new Error('Username must be at least 3 characters');
          const { data, error } = await c.auth.signUp({
            email, password,
            options: { data: { username } }
          });
          if (error) throw error;
          if (!data.session) {
            errEl.classList.replace('err', 'ok');
            errEl.textContent = 'Account created — check your email to confirm, then sign in.';
            setTimeout(() => { errEl.classList.replace('ok', 'err'); }, 6000);
          } else {
            closeModal();
          }
        }
      } catch (err) { setErr(err.message || String(err)); }
      finally { submitBtn.disabled = false; }
    });

    function setErr(msg) { errEl.classList.remove('ok'); errEl.classList.add('err'); errEl.textContent = msg; }
    root.__setMode = setMode;
  }

  function openModal(mode = 'signin') {
    const root = document.getElementById('eceuh-modal-root');
    if (!root) return;
    root.__setMode?.(mode);
    root.classList.add('open');
  }
  function closeModal() {
    document.getElementById('eceuh-modal-root')?.classList.remove('open');
  }

  /* ───── Topbar slot: replace placeholder account button ───── */
  function injectAuthSlot() {
    if (document.getElementById('eceuh-auth-slot')) return;
    const slot = document.createElement('div');
    slot.id = 'eceuh-auth-slot';
    slot.style.cssText = 'position:relative;display:inline-flex;align-items:center;';

    // Find a host: prefer .eceuh-actions (shared topbar), then .topbar-actions (home), then .topbar-right (legacy)
    const host = document.querySelector('.eceuh-actions, .topbar-actions, .topbar-right');
    if (!host) return;

    // Hide the placeholder "Account" icon button on the new layout
    host.querySelector('button[aria-label="Account"]')?.remove();
    host.appendChild(slot);
    renderSlot();
  }

  async function renderSlot() {
    const slot = document.getElementById('eceuh-auth-slot');
    if (!slot) return;
    const user = await currentUser();
    if (!user) {
      slot.innerHTML = `<button class="eceuh-pill" type="button" data-open-signin>Sign in</button>`;
      slot.querySelector('[data-open-signin]').addEventListener('click', () => openModal('signin'));
      return;
    }
    const c = client();
    const { data: prof } = await c.from('profiles').select('username,display_name,avatar_url').eq('id', user.id).maybeSingle();
    const name = prof?.username || user.email.split('@')[0];
    const initials = name.slice(0, 2).toUpperCase();
    slot.innerHTML = `
      <button class="eceuh-avatar-btn" type="button" data-toggle-menu>
        <span class="eceuh-avatar">${initials}</span>
        <span>${name}</span>
      </button>
    `;
    slot.querySelector('[data-toggle-menu]').addEventListener('click', (e) => {
      e.stopPropagation();
      const existing = slot.querySelector('.eceuh-menu');
      if (existing) { existing.remove(); return; }
      const menu = document.createElement('div');
      menu.className = 'eceuh-menu';
      menu.innerHTML = `
        <div class="meta"><strong>@${name}</strong><small>${user.email}</small></div>
        <button type="button" data-signout>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
          Sign out
        </button>
      `;
      slot.appendChild(menu);
      menu.querySelector('[data-signout]').addEventListener('click', async () => {
        await client().auth.signOut();
        menu.remove();
      });
      const off = (ev) => { if (!menu.contains(ev.target)) { menu.remove(); document.removeEventListener('click', off); } };
      setTimeout(() => document.addEventListener('click', off), 0);
    });
  }

  async function currentUser() {
    const c = client();
    if (!c) return null;
    const { data } = await c.auth.getUser();
    return data?.user || null;
  }

  /* ───── Progress: localStorage fallback + Supabase sync ───── */
  function lsRead() {
    try { return JSON.parse(localStorage.getItem(PROGRESS_LS_KEY) || '{}'); }
    catch { return {}; }
  }
  function lsWrite(map) {
    localStorage.setItem(PROGRESS_LS_KEY, JSON.stringify(map));
  }
  function progressKey(course, item) { return `${course}:${item}`; }

  async function getProgress() {
    const local = lsRead();
    const user = await currentUser();
    if (!user) return local;
    try {
      const { data, error } = await client().from('progress').select('course,item_key,status').eq('user_id', user.id);
      if (error) return local;
      const map = {};
      for (const row of data) map[progressKey(row.course, row.item_key)] = row.status;
      // Merge local-only keys into supabase (one-way sync from local on first login)
      for (const k of Object.keys(local)) {
        if (!(k in map) && local[k]) {
          const [course, item] = k.split(':');
          await client().from('progress').upsert({ user_id: user.id, course, item_key: item, status: local[k], updated_at: new Date().toISOString() });
          map[k] = local[k];
        }
      }
      lsWrite(map);
      return map;
    } catch { return local; }
  }

  async function setProgress(course, item, status) {
    const map = lsRead();
    map[progressKey(course, item)] = status;
    lsWrite(map);
    const user = await currentUser();
    if (user) {
      await client().from('progress').upsert({
        user_id: user.id, course, item_key: item, status, updated_at: new Date().toISOString()
      });
    }
  }

  /* ───── Auto-bind: any [data-progress="course:item"] gets a check button ───── */
  async function bindProgress() {
    const targets = document.querySelectorAll('[data-progress]');
    if (!targets.length) return;
    const map = await getProgress();
    targets.forEach((el) => {
      const [course, item] = el.dataset.progress.split(':');
      let btn = el.querySelector('.eceuh-check');
      if (!btn) {
        btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'eceuh-check';
        btn.setAttribute('aria-label', 'Toggle unit progress');
        btn.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`;
        el.appendChild(btn);
        btn.addEventListener('click', async (e) => {
          e.preventDefault(); e.stopPropagation();
          const cur = btn.dataset.status || 'todo';
          const next = STATUS_CYCLE[(STATUS_CYCLE.indexOf(cur) + 1) % STATUS_CYCLE.length];
          btn.dataset.status = next === 'todo' ? '' : next;
          await setProgress(course, item, next);
        });
      }
      const status = map[progressKey(course, item)] || 'todo';
      btn.dataset.status = status === 'todo' ? '' : status;
    });
  }

  /* ───── Theme toggle wiring (for the standardized topbar) ───── */
  function wireThemeToggle() {
    const btn = document.getElementById('eceuh-theme-toggle');
    if (!btn || btn.__bound) return;
    btn.__bound = true;
    btn.addEventListener('click', () => {
      const root = document.documentElement;
      const next = root.classList.contains('light') ? 'dark' : 'light';
      if (next === 'light') root.classList.add('light'); else root.classList.remove('light');
      localStorage.setItem('ee-theme', next);
    });
  }

  /* ───── Boot ───── */
  function boot() {
    injectStyles();
    buildModal();
    injectAuthSlot();
    wireThemeToggle();
    bindProgress();

    const c = client();
    if (c) {
      c.auth.onAuthStateChange((_event, _session) => {
        renderSlot();
        bindProgress();
      });
    }

    // Cross-tab progress sync (localStorage fallback)
    window.addEventListener('storage', (e) => {
      if (e.key === PROGRESS_LS_KEY) bindProgress();
    });
  }

  window.ECEUH = { openModal, closeModal, currentUser, getProgress, setProgress, bindProgress, renderSlot };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => waitForSupabase(boot));
  } else {
    waitForSupabase(boot);
  }

  function waitForSupabase(cb) {
    if (window.supabase) return cb();
    let n = 0;
    const t = setInterval(() => {
      if (window.supabase || ++n > 100) { clearInterval(t); cb(); }
    }, 50);
  }
})();
