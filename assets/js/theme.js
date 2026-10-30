(function () {
  var root = document.documentElement;
  var toggle = document.getElementById('themeToggle');
  if (!toggle) return;

  var SUN = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>';
  var MOON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>';

  function sysDark() {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  }

  function apply(theme) {
    if (theme === 'light' || theme === 'dark') {
      root.setAttribute('data-theme', theme);
    } else {
      root.removeAttribute('data-theme');
    }
    var dark = theme === 'dark' || (theme !== 'light' && sysDark());
    // 当前是深色 -> 显示太阳(点一下去亮色)；当前是浅色 -> 显示月亮(点一下去深色)
    toggle.innerHTML = dark ? SUN : MOON;
  }

  apply(localStorage.getItem('theme'));

  toggle.addEventListener('click', function () {
    var current = root.getAttribute('data-theme');
    var dark = current === 'dark' || (current !== 'light' && sysDark());
    var next = dark ? 'light' : 'dark';
    localStorage.setItem('theme', next);
    apply(next);
  });
})();
