(() => {
  const popup = document.getElementById('booth-popup');
  if (!popup || typeof popup.showModal !== 'function') return;

  const STORAGE_KEY = 'mokhaeng-booth-popup-hidden-day-v1';

  // 한국 시간 기준 오늘 날짜 (YYYY-MM-DD)
  function getKoreaToday() {
    return new Intl.DateTimeFormat('en-CA', {
      timeZone: 'Asia/Seoul',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    }).format(new Date());
  }

  // 오늘 하루 보지 않기 체크했으면 팝업 안 띄움
  try {
    if (localStorage.getItem(STORAGE_KEY) === getKoreaToday()) return;
  } catch (e) {}

  // 팝업 닫기 함수
  function closePopup() {
    popup.close();
  }

  // X 버튼, 닫기 버튼
  popup.querySelectorAll('[data-popup-close]').forEach(btn => {
    btn.addEventListener('click', closePopup);
  });

  // 바깥 영역 클릭 (backdrop)
  popup.addEventListener('click', (e) => {
    if (e.target === popup) {
      const rect = popup.getBoundingClientRect();
      if (
        e.clientX < rect.left ||
        e.clientX > rect.right ||
        e.clientY < rect.top ||
        e.clientY > rect.bottom
      ) {
        closePopup();
      }
    }
  });

  // 팝업 닫힐 때
  popup.addEventListener('close', () => {
    // 오늘 하루 보지 않기 체크됐으면 저장
    const checkbox = document.getElementById('popup-hide-today');
    if (checkbox && checkbox.checked) {
      try {
        localStorage.setItem(STORAGE_KEY, getKoreaToday());
      } catch (e) {}
    }
    // 스크롤 복원
    document.documentElement.classList.remove('popup-open');
  });

  // 팝업 열기
  document.documentElement.classList.add('popup-open');
  popup.showModal();
})();
