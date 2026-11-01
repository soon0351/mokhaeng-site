(() => {
  // night 서브도메인으로 접속하면 야시장 페이지로 자동 이동
  const isNightDomain = location.hostname.startsWith('night.');
  if (isNightDomain) {
    location.replace('/night-market.html' + location.search + location.hash);
  }
})();
