function getUpcomingTripDay() {
  return tripData.days[0];
}

function calculateDaysLeft() {
  // Month is 0-based in JavaScript, so 8 = September
  const tripStartDate = new Date(2026, 8, 10);

  const today = new Date();

  const startOfToday = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  );

  const difference = tripStartDate - startOfToday;

  return Math.ceil(difference / (1000 * 60 * 60 * 24));
}

function getCountdownDisplay() {
  const daysLeft = calculateDaysLeft();

  if (daysLeft > 0) {
    return {
      value: daysLeft,
      unit: language === "zh" ? "天" : daysLeft === 1 ? "day" : "days"
    };
  }

  if (daysLeft === 0) {
    return {
      value: language === "zh" ? "今天!" : "Today!",
      unit: ""
    };
  }

  return {
    value: language === "zh" ? "已开始" : "Started",
    unit: ""
  };
}

function updateCountdown() {
  const countdownElement = document.getElementById("countdownDays");
  const countdownUnitElement = document.getElementById("countdownUnit");

  if (!countdownElement || !countdownUnitElement) {
    return;
  }

  const countdown = getCountdownDisplay();

  countdownElement.textContent = countdown.value;
  countdownUnitElement.textContent = countdown.unit;
}

function getHomeText() {
  const currentDay = getUpcomingTripDay();
  const countdown = getCountdownDisplay();

  return {
    en: {
      route: "Auckland → Christchurch",
      title: "New Zealand Adventure Awaits",
      desc: "Auckland to Christchurch, planned day by day.",
      start: "Start Journey",

      countdownLabel: "Trip Starts In",
      countdownValue: countdown.value,
      countdownUnit: countdown.unit,
      countdownDate: "10 Sep 2026",

      weatherLabel: "Today's Weather",
      weatherValue: "18°C",
      weatherPlace: currentDay.city,
      weatherDesc: "Weather API later",

      locationLabel: "Current Location",
      locationValue: currentDay.city,
      locationDesc: `Day ${currentDay.day} / ${tripData.totalDays}`,

      memoriesLabel: "Photos Uploaded",
      memoriesValue: "0",
      memoriesDesc: "Memories made",

      todayTitle: "Today at a Glance",
      viewFull: "View Full Itinerary",
      dayLabel: `Day ${currentDay.day} · 10 Sep 2026`,
      todayCity: currentDay.city,
      todayDesc: currentDay.title || "Welcome to New Zealand!",

      quickTitle: "Quick Access"
    },

    zh: {
      route: "奥克兰 → 基督城",
      title: "新西兰冒险之旅",
      desc: "从奥克兰到基督城，每一天都为你规划好。",
      start: "开始旅程",

      countdownLabel: "距离出发还有",
      countdownValue: countdown.value,
      countdownUnit: countdown.unit,
      countdownDate: "2026年9月10日",

      weatherLabel: "今日天气",
      weatherValue: "18°C",
      weatherPlace: currentDay.city,
      weatherDesc: "之后会连接天气 API",

      locationLabel: "当前位置",
      locationValue: currentDay.city,
      locationDesc: `第 ${currentDay.day} / ${tripData.totalDays} 天`,

      memoriesLabel: "已上传照片",
      memoriesValue: "0",
      memoriesDesc: "旅途回忆",

      todayTitle: "今日行程概览",
      viewFull: "查看完整行程",
      dayLabel: `第 ${currentDay.day} 天 · 2026年9月10日`,
      todayCity: currentDay.city,
      todayDesc: currentDay.title || "欢迎来到新西兰！",

      quickTitle: "快速入口"
    }
  }[language];
}

function renderHomePage(container) {
  const h = getHomeText();
  const currentDay = getUpcomingTripDay();

  container.innerHTML = `
    <section class="home-page">
      <section class="home-hero">
        <p class="hero-route">${h.route}</p>

        <div class="home-hero-content">
          <h1>${h.title}</h1>
          <p>${h.desc}</p>

          <button class="hero-btn" id="openItineraryBtn">
            ${h.start} →
          </button>
        </div>
      </section>

      <section class="home-stats">
        <article class="stat-card">
          <div class="stat-icon green">📅</div>

          <div>
            <p>${h.countdownLabel}</p>

            <h3 id="countdownText">
            ${h.countdownValue} <span>${h.countdownUnit}</span>
            </h3>

            <small>${h.countdownDate}</small>
          </div>
        </article>

        <article class="stat-card">
          <div class="stat-icon yellow">☀️</div>

          <div>
            <p>${h.weatherLabel}</p>
            <h3>${h.weatherValue}</h3>
            <small>${h.weatherPlace}<br>${h.weatherDesc}</small>
          </div>
        </article>

        <article class="stat-card">
          <div class="stat-icon purple">📍</div>

          <div>
            <p>${h.locationLabel}</p>
            <h3>${h.locationValue}</h3>
            <small>${h.locationDesc}</small>
          </div>
        </article>

        <article class="stat-card">
          <div class="stat-icon red">📷</div>

          <div>
            <p>${h.memoriesLabel}</p>
            <h3>${h.memoriesValue}</h3>
            <small>${h.memoriesDesc}</small>
          </div>
        </article>
      </section>

      <section class="home-lower-grid">
        <article class="today-card">
          <div class="section-header">
            <h2>${h.todayTitle}</h2>

            <button id="viewFullItineraryBtn">
              ${h.viewFull} →
            </button>
          </div>

          <div class="today-main">
            <div
              class="today-image"
              style="background-image: url('${currentDay.banner}')"
            ></div>

            <div>
              <p>${h.dayLabel}</p>
              <h3>${h.todayCity}</h3>
              <span>${h.todayDesc}</span>
            </div>
          </div>

          <div class="today-timeline">
            ${currentDay.timeline.map((item, index) => `
              <div class="timeline-step">
                <div class="timeline-icon">${item.icon}</div>
                <h4>${item.title}</h4>
                <small>${item.time}</small>
              </div>

              ${index < currentDay.timeline.length - 1 ? `<span class="timeline-arrow">→</span>` : ""}
            `).join("")}
          </div>
        </article>

        <article class="quick-card">
          <h2>${h.quickTitle}</h2>

          <div class="quick-grid">
            ${[
              {
                page: "itinerary",
                icon: "🗓️",
                title: text[language].nav.itinerary,
                desc: language === "zh" ? "查看完整行程" : "View full plan"
              },
              {
                page: "explore",
                icon: "🧭",
                title: text[language].nav.explore,
                desc: language === "zh" ? "景点与活动" : "Places & activities"
              },
              {
                page: "memories",
                icon: "🖼️",
                title: text[language].nav.memories,
                desc: language === "zh" ? "你的照片" : "Your photos"
              },
              {
                page: "tripHub",
                icon: "🧳",
                title: text[language].nav.tripHub,
                desc: language === "zh" ? "旅行资料" : "Travel info"
              },
              {
                page: "checklist",
                icon: "☑️",
                title: text[language].nav.checklist,
                desc: language === "zh" ? "打包与任务" : "Packing & tasks"
              },
              {
                page: "memories",
                icon: "♡",
                title: language === "zh" ? "收藏" : "Favourites",
                desc: language === "zh" ? "收藏地点" : "Saved places"
              }
            ].map(card => `
              <button class="quick-item" data-page="${card.page}">
                <div class="quick-icon">${card.icon}</div>
                <h3>${card.title}</h3>
                <p>${card.desc}</p>
              </button>
            `).join("")}
          </div>
        </article>
      </section>
    </section>
  `;

  function updateCountdown() {
  const countdownTextElement = document.getElementById("countdownText");

  if (!countdownTextElement) {
    return;
  }

  const countdown = getCountdownDisplay();

  if (countdown.unit === "") {
    countdownTextElement.textContent = countdown.value;
  } else {
    countdownTextElement.innerHTML = `
      ${countdown.value} <span>${countdown.unit}</span>
    `;
    }
    }
}