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
    
    nav.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        nav.classList.remove('open');
        menuBtn.setAttribute('aria-expanded', 'false');
        menuBtn.setAttribute('aria-label', '메뉴 열기');
      });
    });
  }

  // 존 탭 전환
  const zoneTabs = document.querySelectorAll('.zone-tab');
  const zonePanels = document.querySelectorAll('.zone-panel');
  
  zoneTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      zoneTabs.forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      zonePanels.forEach(p => p.hidden = true);
      
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');
      const panelId = tab.getAttribute('aria-controls');
      const panel = document.getElementById(panelId);
      if (panel) panel.hidden = false;
    });
  });

  // 슬라이더
  const slides = document.querySelectorAll('.slide');
  const dots = document.querySelectorAll('.dot');
  const prevBtn = document.querySelector('.slider-prev');
  const nextBtn = document.querySelector('.slider-next');
  const pauseBtn = document.querySelector('.slider-pause');
  let currentSlide = 0;
  let autoPlay = true;
  let slideInterval;

  function showSlide(n) {
    slides.forEach((s, i) => {
      s.classList.toggle('active', i === n);
    });
    dots.forEach((d, i) => {
      d.classList.toggle('active', i === n);
    });
    currentSlide = n;
  }

  function nextSlide() {
    showSlide((currentSlide + 1) % slides.length);
  }

  function prevSlide() {
    showSlide((currentSlide - 1 + slides.length) % slides.length);
  }

  function startAutoPlay() {
    slideInterval = setInterval(nextSlide, 4000);
  }

  function stopAutoPlay() {
    clearInterval(slideInterval);
  }

  if (prevBtn) prevBtn.addEventListener('click', () => { stopAutoPlay(); prevSlide(); if (autoPlay) startAutoPlay(); });
  if (nextBtn) nextBtn.addEventListener('click', () => { stopAutoPlay(); nextSlide(); if (autoPlay) startAutoPlay(); });
  
  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => { stopAutoPlay(); showSlide(i); if (autoPlay) startAutoPlay(); });
  });

  if (pauseBtn) {
    pauseBtn.addEventListener('click', () => {
      autoPlay = !autoPlay;
      pauseBtn.textContent = autoPlay ? '❚❚' : '▶';
      pauseBtn.setAttribute('aria-label', autoPlay ? '자동 넘김 일시정지' : '자동 넘김 재생');
      if (autoPlay) startAutoPlay(); else stopAutoPlay();
    });
  }

  if (slides.length > 0) startAutoPlay();

  // 큰 이미지 모달
  const modal = document.getElementById('image-modal');
  const modalImg = document.getElementById('modal-image');
  const modalDownload = document.getElementById('modal-download');
  const viewLargeBtn = document.querySelector('.btn-view-large');

  if (viewLargeBtn && modal) {
    viewLargeBtn.addEventListener('click', () => {
      const activeSlide = document.querySelector('.slide.active img');
      if (activeSlide) {
        modalImg.src = activeSlide.src;
        modalImg.alt = activeSlide.alt;
        modalDownload.href = activeSlide.src;
        modal.showModal();
      }
    });
  }

  document.querySelectorAll('[data-modal-close]').forEach(btn => {
    btn.addEventListener('click', () => modal.close());
  });

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.close();
    });
  }

  // === 일정 데이터 ===
  const scheduleData = {
    day1: [
      { time: '16:30–17:30', program: '식전행사·레크레이션', start: '16:30', end: '17:30' },
      { time: '17:30–18:00', program: '낭만섹소폰(한사랑)', start: '17:30', end: '18:00' },
      { time: '18:00–18:30', program: '개막식', start: '18:00', end: '18:30' },
      { time: '18:30–19:00', program: '낭만노래쟁이 공연', start: '18:30', end: '19:00' },
      { time: '19:00–19:30', program: '미스터리박스 도전', start: '19:00', end: '19:30' },
      { time: '19:30–20:00', program: '낭만 마술쇼 및 버블쇼', start: '19:30', end: '20:00' },
      { time: '20:00–21:00', program: '레크레이션', start: '20:00', end: '21:00' },
      { time: '21:00–21:30', program: '낭만노래쟁이 공연', start: '21:00', end: '21:30' },
      { time: '21:30–22:00', program: '부스별 마감 확인 및 행사정리', start: '21:30', end: '22:00' }
    ],
    day2: [
      { time: '16:00–17:30', program: '레크레이션', start: '16:00', end: '17:30' },
      { time: '17:30–18:30', program: '낭만섹소폰(안단텐)', start: '17:30', end: '18:30' },
      { time: '18:30–19:00', program: '낭만댄스팀 공연', start: '18:30', end: '19:00' },
      { time: '19:00–19:30', program: '시상식(파크골프)', start: '19:00', end: '19:30' },
      { time: '19:30–20:30', program: '낭만 색소폰(호반T)·전통 장구 공연', start: '19:30', end: '20:30' },
      { time: '20:30–21:00', program: '미스터리박스 도전', start: '20:30', end: '21:00' },
      { time: '21:00–21:30', program: '낭만명창 공연', start: '21:00', end: '21:30' },
      { time: '21:30–22:00', program: '지역가수 공연', start: '21:30', end: '22:00' },
      { time: '22:30', program: '부스별 마감 확인 및 행사정리', start: '22:30', end: '23:00' }
    ]
  };

  // 일정 테이블 렌더링
  function renderSchedule(dayKey, containerId, eventDate) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    const now = new Date();
    const isToday = now.toDateString() === eventDate.toDateString();
    const currentMinutes = now.getHours() * 60 + now.getMinutes();
    
    container.innerHTML = scheduleData[dayKey].map(item => {
      const [startH, startM] = item.start.split(':').map(Number);
      const startMinutes = startH * 60 + startM;
      let endMinutes = startMinutes + 60;
      if (item.end) {
        const [endH, endM] = item.end.split(':').map(Number);
        endMinutes = endH * 60 + endM;
      }
      
      const isCurrent = isToday && currentMinutes >= startMinutes && currentMinutes < endMinutes;
      
      return `<tr class="${isCurrent ? 'current' : ''}">
        <td>${item.time}</td>
        <td>${item.program}</td>
      </tr>`;
    }).join('');
  }

  // 일정 렌더링 실행
  renderSchedule('day1', 'schedule-body-day1', new Date('2026-11-07'));
  renderSchedule('day2', 'schedule-body-day2', new Date('2026-11-08'));

  // 데이 탭 전환
  const dayTabs = document.querySelectorAll('.day-tab');
  const schedulePanels = document.querySelectorAll('.schedule-panel');
  
  dayTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      dayTabs.forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      schedulePanels.forEach(p => p.hidden = true);
      
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');
      const panelId = tab.getAttribute('aria-controls');
      const panel = document.getElementById(panelId);
      if (panel) panel.hidden = false;
    });
  });

  // 홍보물 크게 보기
  document.querySelectorAll('[data-view-image]').forEach(btn => {
    btn.addEventListener('click', () => {
      const imgSrc = btn.getAttribute('data-view-image');
      if (modal && modalImg && modalDownload) {
        modalImg.src = imgSrc;
        modalImg.alt = '홍보물 확대 이미지';
        modalDownload.href = imgSrc;
        modal.showModal();
      }
    });
  });

  // 공유 기능
  const shareBtn = document.getElementById('share-btn');
  if (shareBtn) {
    shareBtn.addEventListener('click', async () => {
      const shareData = {
        title: '목행 낭만상회 야시장',
        text: '낭만행, 목적지는 목행. 11월 7-8일 충주 목행시장에서 만나요!',
        url: window.location.href
      };
      
      if (navigator.share) {
        try {
          await navigator.share(shareData);
        } catch (err) {
          if (err.name !== 'AbortError') {
            copyToClipboard();
          }
        }
      } else {
        copyToClipboard();
      }
    });
  }

  function copyToClipboard() {
    navigator.clipboard.writeText(window.location.href).then(() => {
      alert('주소가 복사되었습니다. 함께 가고 싶은 사람에게 보내주세요!');
    }).catch(() => {
      prompt('아래 주소를 복사해 주세요:', window.location.href);
    });
  }
})();
