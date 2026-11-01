(() => {
  'use strict';

  // 모바일 메뉴 토글
  const menuBtn = document.querySelector('.menu-btn');
  const nav = document.querySelector('#navigation');
  
  if (menuBtn && nav) {
    menuBtn.addEventListener('click', () => {
      const isOpen = menuBtn.getAttribute('aria-expanded') !== 'true';
      menuBtn.setAttribute('aria-expanded', String(isOpen));
      menuBtn.setAttribute('aria-label', isOpen ? '메뉴 닫기' : '메뉴 열기');
      nav.classList.toggle('open', isOpen);
    });
    
    // 메뉴 항목 클릭 시 닫기
    nav.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        nav.classList.remove('open');
        menuBtn.setAttribute('aria-expanded', 'false');
        menuBtn.setAttribute('aria-label', '메뉴 열기');
      });
    });
  }

  // 일정 탭 전환
  const tabs = document.querySelectorAll('.day-tab');
  const panels = document.querySelectorAll('.day-panel');
  
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // 모든 탭 비활성화
      tabs.forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      
      // 모든 패널 숨기기
      panels.forEach(p => {
        p.hidden = true;
      });
      
      // 클릭한 탭 활성화
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');
      
      // 해당 패널 보이기
      const panelId = tab.getAttribute('aria-controls');
      const panel = document.getElementById(panelId);
      if (panel) {
        panel.hidden = false;
      }
    });
  });
})();
