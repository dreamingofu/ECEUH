/* ECEUH file preview module
   Drop-in script for any course file library page.

   Usage:
   1) Define a global FILE_DATA array in your page like:
        const FILE_DATA = [
          {
            type: 'homework',          // chip class: quiz | exam | reference | homework | lab
            label: 'Homework',         // chip label
            title: 'HW1 — Tagged',
            desc:  'Spring 2026 homework 1',
            date:  'Apr 2026',
            versions: [
              { label: 'PDF',  url: 'https://.../HW1.pdf'  },
              { label: 'DOCX', url: 'https://.../HW1.docx' }
            ]
          },
          ...
        ];
   2) Add an empty <div class="file-list" id="file-list"></div> where cards
      should render.
   3) Include this script with `defer`.

   The module also auto-binds to any pre-existing <article class="file-entry">
   that has a single <a class="action-btn" href="…"> — it upgrades that link
   into a Preview + Download pair so old static pages keep working.
*/
(function () {
  if (window.eceuhFilePreview) return;

  /* ───── Modal markup + styles (injected once) ───── */
  function injectModal() {
    if (document.getElementById('file-preview-styles')) return;

    const style = document.createElement('style');
    style.id = 'file-preview-styles';
    style.textContent = `
      .file-actions { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
      .file-actions .action-btn,
      .file-actions .action-btn-ghost {
        display: inline-flex; align-items: center; gap: 6px;
        padding: 8px 14px;
        border-radius: 9999px;
        font-family: 'Inter', sans-serif;
        font-size: 12px;
        font-weight: 700;
        letter-spacing: 0.4px;
        text-decoration: none;
        cursor: pointer;
        border: 1px solid transparent;
        transition: filter .15s, background .15s, border-color .15s, transform .1s;
      }
      .file-actions .action-btn {
        background: #FF6363;
        color: #fff;
      }
      .file-actions .action-btn:hover { filter: brightness(1.08); }
      .file-actions .action-btn:active { transform: scale(0.96); }
      .file-actions .action-btn-ghost {
        background: rgba(255, 99, 99, 0.10);
        color: #FF6363;
        border-color: rgba(255, 99, 99, 0.25);
      }
      .file-actions .action-btn-ghost:hover {
        background: rgba(255, 99, 99, 0.18);
        border-color: #FF6363;
      }
      .file-actions .action-btn-ghost:active { transform: scale(0.96); }
      .file-actions .action-btn svg, .file-actions .action-btn-ghost svg {
        width: 14px; height: 14px;
      }

      .versions-menu {
        position: relative;
      }
      .versions-menu summary {
        display: inline-flex; align-items: center; gap: 6px;
        padding: 8px 14px;
        border-radius: 9999px;
        background: rgba(255, 255, 255, 0.05);
        border: 1px solid rgba(255, 255, 255, 0.1);
        color: #94A3B8;
        font-family: 'Inter', sans-serif;
        font-size: 12px;
        font-weight: 700;
        letter-spacing: 0.4px;
        list-style: none;
        cursor: pointer;
      }
      html.light .versions-menu summary {
        background: rgba(26, 26, 46, 0.04);
        border-color: rgba(26, 26, 46, 0.10);
        color: #475569;
      }
      .versions-menu summary::-webkit-details-marker { display: none; }
      .versions-menu summary:hover { color: #fff; border-color: #FF6363; }
      html.light .versions-menu summary:hover { color: #1A1A2E; }
      .versions-menu summary::after {
        content: '▾';
        font-size: 10px; line-height: 1;
        margin-left: 2px;
      }
      .versions-menu[open] summary::after { content: '▴'; }
      .versions-list {
        position: absolute;
        right: 0; top: calc(100% + 6px);
        min-width: 200px;
        background: #0f0f1c;
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 12px;
        padding: 6px;
        box-shadow: 0 25px 50px -12px rgba(0,0,0,0.5);
        z-index: 50;
        display: flex; flex-direction: column; gap: 2px;
        animation: vmFade .15s ease-out;
      }
      html.light .versions-list {
        background: #fff5f3;
        border-color: rgba(26, 26, 46, 0.12);
      }
      @keyframes vmFade { from { opacity: 0; transform: translateY(-4px); } to { opacity: 1; transform: translateY(0); } }
      .versions-list a, .versions-list button {
        display: flex; align-items: center; justify-content: space-between; gap: 10px;
        padding: 10px 12px;
        border-radius: 8px;
        background: none; border: none;
        color: #e2e8f0;
        font-family: 'Inter', sans-serif;
        font-size: 12px;
        text-decoration: none;
        cursor: pointer;
        text-align: left;
      }
      html.light .versions-list a, html.light .versions-list button { color: #1A1A2E; }
      .versions-list a:hover, .versions-list button:hover {
        background: rgba(255, 99, 99, 0.12);
        color: #FF6363;
      }
      .versions-list .ext {
        font-family: 'JetBrains Mono', monospace;
        font-size: 10px;
        color: #94A3B8;
      }

      /* ── Preview modal ── */
      #file-preview-modal {
        position: fixed; inset: 0;
        display: none;
        z-index: 1500;
      }
      #file-preview-modal.open { display: block; animation: fpFade .2s ease-out; }
      @keyframes fpFade { from { opacity: 0; } to { opacity: 1; } }
      #file-preview-modal .preview-backdrop {
        position: absolute; inset: 0;
        background: rgba(0, 0, 0, 0.75);
        backdrop-filter: blur(6px);
        -webkit-backdrop-filter: blur(6px);
      }
      #file-preview-modal .preview-shell {
        position: absolute;
        top: 32px; bottom: 32px; left: 32px; right: 32px;
        background: #0f0f1c;
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 18px;
        display: flex; flex-direction: column;
        overflow: hidden;
        box-shadow: 0 25px 60px -12px rgba(0,0,0,0.6);
      }
      #file-preview-modal .preview-head {
        padding: 14px 18px;
        border-bottom: 1px solid rgba(255,255,255,0.08);
        display: flex; align-items: center; justify-content: space-between;
        gap: 16px;
        flex: none;
      }
      #file-preview-modal .preview-title {
        font-family: 'Inter', sans-serif;
        font-size: 13px;
        font-weight: 700;
        color: #fff;
        overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
        flex: 1; min-width: 0;
      }
      #file-preview-modal .preview-actions { display: flex; align-items: center; gap: 6px; flex: none; }
      #file-preview-modal .preview-actions a,
      #file-preview-modal .preview-actions button {
        display: inline-flex; align-items: center; gap: 6px;
        padding: 7px 12px;
        border-radius: 9999px;
        background: rgba(255, 255, 255, 0.06);
        color: #e2e8f0;
        text-decoration: none;
        font-family: 'Inter', sans-serif;
        font-size: 12px;
        font-weight: 600;
        border: none;
        cursor: pointer;
        transition: background .15s, color .15s;
      }
      #file-preview-modal .preview-actions a:hover,
      #file-preview-modal .preview-actions button:hover {
        background: rgba(255, 99, 99, 0.2);
        color: #fff;
      }
      #file-preview-modal .preview-actions svg { width: 14px; height: 14px; }
      #file-preview-modal .preview-frame {
        flex: 1;
        width: 100%;
        border: none;
        background: #fff;
      }
      #file-preview-modal .preview-fallback {
        flex: 1;
        display: none;
        align-items: center; justify-content: center;
        flex-direction: column;
        gap: 12px;
        padding: 40px;
        text-align: center;
        color: #94A3B8;
        font-family: 'Inter', sans-serif;
      }
      #file-preview-modal .preview-fallback strong {
        color: #fff;
        font-size: 16px;
        display: block;
      }
      #file-preview-modal .preview-fallback a {
        color: #FF6363;
        text-decoration: underline;
      }
      #file-preview-modal.fallback .preview-frame { display: none; }
      #file-preview-modal.fallback .preview-fallback { display: flex; }

      body.preview-open { overflow: hidden; }

      @media (max-width: 700px) {
        #file-preview-modal .preview-shell { top: 0; bottom: 0; left: 0; right: 0; border-radius: 0; }
      }
    `;
    document.head.appendChild(style);

    const modal = document.createElement('div');
    modal.id = 'file-preview-modal';
    modal.innerHTML = `
      <div class="preview-backdrop"></div>
      <div class="preview-shell">
        <header class="preview-head">
          <span class="preview-title">Preview</span>
          <div class="preview-actions">
            <a class="preview-open" target="_blank" rel="noopener">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
              New tab
            </a>
            <a class="preview-download" download>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
              Download
            </a>
            <button class="preview-close" aria-label="Close">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
          </div>
        </header>
        <iframe class="preview-frame" allowfullscreen></iframe>
        <div class="preview-fallback">
          <strong>This file can't be previewed inline.</strong>
          <span>Use the buttons above to <a class="preview-fallback-open" target="_blank" rel="noopener">open it in a new tab</a> or download it.</span>
        </div>
      </div>
    `;
    document.body.appendChild(modal);

    modal.querySelector('.preview-close').addEventListener('click', closeModal);
    modal.querySelector('.preview-backdrop').addEventListener('click', closeModal);
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('open')) closeModal();
    });
  }

  function modalEl() { return document.getElementById('file-preview-modal'); }

  function openModal(url, name, ext) {
    const modal = modalEl();
    if (!modal) return;
    const frame = modal.querySelector('.preview-frame');
    const ext2 = (ext || (url.split('?')[0].split('.').pop() || '')).toLowerCase();
    const titleEl = modal.querySelector('.preview-title');
    titleEl.textContent = name || decodeURIComponent(url.split('/').pop() || 'Preview');
    modal.querySelector('.preview-open').href = url;
    modal.querySelector('.preview-download').href = url;
    modal.querySelector('.preview-fallback-open').href = url;

    modal.classList.remove('fallback');
    if (ext2 === 'pdf') {
      frame.src = url;
    } else if (['docx', 'doc', 'pptx', 'ppt', 'xlsx', 'xls'].includes(ext2)) {
      frame.src = 'https://view.officeapps.live.com/op/embed.aspx?src=' + encodeURIComponent(url);
    } else if (['png', 'jpg', 'jpeg', 'gif', 'webp', 'svg'].includes(ext2)) {
      frame.src = url;
    } else {
      modal.classList.add('fallback');
      frame.src = 'about:blank';
    }
    document.body.classList.add('preview-open');
    modal.classList.add('open');
  }

  function closeModal() {
    const modal = modalEl();
    if (!modal) return;
    modal.classList.remove('open');
    document.body.classList.remove('preview-open');
    setTimeout(() => { modal.querySelector('.preview-frame').src = 'about:blank'; }, 250);
  }

  /* ───── Card rendering ───── */
  function iconSvg(name) {
    const icons = {
      preview:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>',
      download: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>',
    };
    return icons[name] || '';
  }

  function pickPrimary(versions) {
    return versions.find(v => /\.pdf(\?|$)/i.test(v.url)) || versions[0];
  }

  function renderCards(host, items) {
    host.innerHTML = items.map((item) => {
      const primary = pickPrimary(item.versions);
      const primaryExt = (primary.url.split('?')[0].split('.').pop() || '').toLowerCase();
      const verName = primary.label || primaryExt.toUpperCase();
      const versionsBlock = item.versions.length > 1 ? `
        <details class="versions-menu">
          <summary>${item.versions.map(v => v.label || (v.url.split('.').pop() || '').toUpperCase()).join(' · ')}</summary>
          <div class="versions-list">
            ${item.versions.map(v => `
              <a href="${v.url}" target="_blank" rel="noopener" data-preview-src="${v.url}" data-preview-name="${(item.title + ' — ' + (v.label || ''))}">
                <span>${v.label || ''}</span>
                <span class="ext">${(v.url.split('?')[0].split('.').pop() || '').toUpperCase()}</span>
              </a>
            `).join('')}
          </div>
        </details>
      ` : '';
      return `
        <article class="file-entry" data-type="${item.type || 'reference'}" data-upgraded="1">
          <div class="file-content">
            <div class="file-meta">
              <span class="type-chip ${item.type || 'reference'}">${item.label || (item.type || 'Reference')}</span>
              <span class="file-label">${verName.toUpperCase() === primaryExt.toUpperCase() ? verName : verName + ' · ' + primaryExt.toUpperCase()}</span>
            </div>
            <h3 class="file-title">${item.title}</h3>
            ${item.desc ? `<p class="file-desc">${item.desc}</p>` : ''}
          </div>
          <div class="file-actions">
            ${item.date ? `<span class="file-date">${item.date}</span>` : ''}
            <button class="action-btn-ghost" data-preview-src="${primary.url}" data-preview-name="${item.title}">
              ${iconSvg('preview')} Preview
            </button>
            <a class="action-btn" href="${primary.url}" download>
              ${iconSvg('download')} Download
            </a>
            ${versionsBlock}
          </div>
        </article>
      `;
    }).join('');
  }

  /* ───── Auto-upgrade old static cards (single Open File link) ───── */
  function upgradeLegacy() {
    document.querySelectorAll('.file-entry').forEach((entry) => {
      if (entry.dataset.upgraded) return;
      const link = entry.querySelector('.file-actions a.action-btn[href]');
      if (!link) return;
      const url = link.href;
      if (!url || url === window.location.href) return;
      const title = entry.querySelector('.file-title')?.textContent?.trim() || 'File';
      const ext = (url.split('?')[0].split('.').pop() || '').toLowerCase();
      const actions = entry.querySelector('.file-actions');
      // Replace the old single link with Preview + Download
      link.remove();
      actions.insertAdjacentHTML('beforeend', `
        <button class="action-btn-ghost" data-preview-src="${url}" data-preview-name="${title.replace(/"/g, '&quot;')}">
          ${iconSvg('preview')} Preview
        </button>
        <a class="action-btn" href="${url}" download>
          ${iconSvg('download')} Download
        </a>
      `);
      entry.dataset.upgraded = '1';
    });
  }

  /* ───── Bind clicks (event delegation) ───── */
  document.addEventListener('click', (e) => {
    const target = e.target.closest('[data-preview-src]');
    if (!target) return;
    e.preventDefault();
    const src = target.dataset.previewSrc;
    const name = target.dataset.previewName || decodeURIComponent(src.split('/').pop() || '');
    const ext = target.dataset.previewExt;
    openModal(src, name, ext);
  });

  /* ───── Boot ───── */
  function boot() {
    injectModal();
    // If page exposed a FILE_DATA + #file-list, render cards
    if (window.FILE_DATA && Array.isArray(window.FILE_DATA)) {
      const host = document.getElementById('file-list');
      if (host) renderCards(host, window.FILE_DATA);
    }
    upgradeLegacy();
  }

  window.eceuhFilePreview = {
    open: openModal,
    close: closeModal,
    render: (host, items) => renderCards(host, items),
    upgradeLegacy,
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();