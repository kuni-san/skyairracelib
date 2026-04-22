/**
 * main.js
 * ①ヘッダーとモーダルをfetch()で読み込む
 * ②ドロワー（ハンバーガーメニュー）の開閉
 * ③検索モーダルの開閉
 * ④検索処理（カードのdata-titleとテキストを対象）
 */

// ===========================
// ① fetch() でHTMLを読み込む
// ===========================

/**
 * 指定URLのHTMLを取得し、指定要素の中に挿入する汎用関数
 * @param {string} url       読み込むHTMLファイルのパス
 * @param {string} targetId  挿入先のdivのid
 */
async function loadHTML(url, targetId) {
  try {
    const res = await fetch(url);

    // レスポンスがOKでなければエラーを投げる
    if (!res.ok) throw new Error(`fetch失敗: ${url} (${res.status})`);

    const html = await res.text();
    document.getElementById(targetId).innerHTML = html;

  } catch (err) {
    console.error(err);
  }
}

// ===========================
// メイン処理（読み込み順が重要）
// ===========================

async function init() {

  // モーダルを読み込む
  await Promise.all([
    loadHTML('modal.html',  'modal-placeholder'),
  ]);

  // HTMLが挿入されてからイベントを設定する
  setupDrawer();
  setupSearchModal();
  setupSearch();
}

init();

// ===========================
// ② ドロワー（ハンバーガー）
// ===========================

function setupDrawer() {
  const hamburger     = document.getElementById('hamburger');
  const drawer        = document.getElementById('drawer');
  const drawerOverlay = document.getElementById('drawer-overlay');

  if (!hamburger || !drawer) return;

  // 開閉トグル
  hamburger.addEventListener('click', () => {
    const isOpen = drawer.classList.toggle('is-open');
    hamburger.classList.toggle('is-open', isOpen);
    drawerOverlay.classList.toggle('is-visible', isOpen);
  });

  // オーバーレイクリックで閉じる
  drawerOverlay.addEventListener('click', closeDrawer);

  function closeDrawer() {
    drawer.classList.remove('is-open');
    hamburger.classList.remove('is-open');
    drawerOverlay.classList.remove('is-visible');
  }
}

// ===========================
// ③ 検索モーダルの開閉
// ===========================

function setupSearchModal() {
  const openBtn      = document.getElementById('open-search');
  const closeBtn     = document.getElementById('close-search');
  const modal        = document.getElementById('search-modal');
  const modalOverlay = document.getElementById('modal-overlay');
  const searchInput  = document.getElementById('search-input');

  if (!openBtn || !modal) return;

  // モーダルを開く
  openBtn.addEventListener('click', () => {
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    modalOverlay.classList.add('is-visible');

    // ドロワーも閉じる
    document.getElementById('drawer')?.classList.remove('is-open');
    document.getElementById('hamburger')?.classList.remove('is-open');
    document.getElementById('drawer-overlay')?.classList.remove('is-visible');

    // 少し遅らせてからフォーカス（アニメーション後）
    setTimeout(() => searchInput?.focus(), 100);
  });

  // モーダルを閉じる（×ボタン）
  closeBtn?.addEventListener('click', closeModal);

  // モーダルを閉じる（背景クリック）
  modalOverlay.addEventListener('click', closeModal);

  // Escキーで閉じる
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });

  function closeModal() {
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    modalOverlay.classList.remove('is-visible');
  }
}

// ===========================
// ④ 検索処理
// ===========================

function setupSearch() {
  const searchInput   = document.getElementById('search-input');
  const searchResults = document.getElementById('search-results');

  if (!searchInput || !searchResults) return;

  // ページ上のカードを検索対象として収集
  // ※ 実際のサイトではここをAPIやJSONファイルからのデータに置き換える
  const searchData = Array.from(document.querySelectorAll('.card')).map(card => ({
    title:   card.querySelector('h2')?.textContent || '',
    snippet: card.querySelector('p')?.textContent  || '',
  }));

  // 入力のたびに検索実行（debounce付き）
  let debounceTimer;
  searchInput.addEventListener('input', () => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      runSearch(searchInput.value.trim(), searchData, searchResults);
    }, 200); // 200ms待ってから実行（過剰なDOM更新を防ぐ）
  });
}

/**
 * 検索実行 & 結果表示
 * @param {string} query       検索キーワード
 * @param {Array}  data        検索対象データ [{title, snippet}]
 * @param {Element} container  結果を表示するDOM要素
 */
function runSearch(query, data, container) {

  // キーワードが空のとき
  if (!query) {
    container.innerHTML = '<p class="search-hint">キーワードを入力して検索</p>';
    return;
  }

  // 大文字小文字を無視してフィルタリング
  const lowerQuery = query.toLowerCase();
  const results = data.filter(item =>
    item.title.toLowerCase().includes(lowerQuery) ||
    item.snippet.toLowerCase().includes(lowerQuery)
  );

  // 結果なし
  if (results.length === 0) {
    container.innerHTML = `<p class="search-no-result">「${escapeHTML(query)}」に一致する結果はありません</p>`;
    return;
  }

  // 結果を表示（キーワードをハイライト）
  container.innerHTML = results.map(item => `
    <div class="result-item">
      <div class="result-title">${highlight(item.title, query)}</div>
      <div class="result-snippet">${highlight(item.snippet, query)}</div>
    </div>
  `).join('');
}

/**
 * テキスト内のキーワードを<mark>でハイライト
 * @param {string} text
 * @param {string} query
 */
function highlight(text, query) {
  const escaped = escapeHTML(text);
  const escapedQuery = escapeRegExp(query);
  const regex = new RegExp(`(${escapedQuery})`, 'gi');
  return escaped.replace(regex, '<mark>$1</mark>');
}

/** XSS対策: HTMLエスケープ */
function escapeHTML(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/** 正規表現の特殊文字をエスケープ */
function escapeRegExp(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
