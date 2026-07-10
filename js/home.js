const HOME_WEATHER_CACHE_MINUTES = 15;

function getWeatherText(weatherCode, isDay = 1) {
  const weatherMap = {
    0: {
      en: isDay ? "Clear sky" : "Clear night",
      zh: isDay ? "晴朗" : "晴朗夜空",
      icon: isDay ? "☀️" : "🌙"
    },

    1: {
      en: "Mainly clear",
      zh: "大致晴朗",
      icon: isDay ? "🌤️" : "🌙"
    },

    2: {
      en: "Partly cloudy",
      zh: "局部多云",
      icon: "⛅"
    },

    3: {
      en: "Overcast",
      zh: "阴天",
      icon: "☁️"
    },

    45: {
      en: "Foggy",
      zh: "有雾",
      icon: "🌫️"
    },

    48: {
      en: "Icy fog",
      zh: "冻雾",
      icon: "🌫️"
    },

    51: {
      en: "Light drizzle",
      zh: "小毛毛雨",
      icon: "🌦️"
    },

    53: {
      en: "Drizzle",
      zh: "毛毛雨",
      icon: "🌦️"
    },

    55: {
      en: "Heavy drizzle",
      zh: "较强毛毛雨",
      icon: "🌧️"
    },

    56: {
      en: "Freezing drizzle",
      zh: "冻毛毛雨",
      icon: "🌧️"
    },

    57: {
      en: "Heavy freezing drizzle",
      zh: "较强冻毛毛雨",
      icon: "🌧️"
    },

    61: {
      en: "Light rain",
      zh: "小雨",
      icon: "🌦️"
    },

    63: {
      en: "Rain",
      zh: "下雨",
      icon: "🌧️"
    },

    65: {
      en: "Heavy rain",
      zh: "大雨",
      icon: "🌧️"
    },

    66: {
      en: "Freezing rain",
      zh: "冻雨",
      icon: "🌧️"
    },

    67: {
      en: "Heavy freezing rain",
      zh: "强冻雨",
      icon: "🌧️"
    },

    71: {
      en: "Light snow",
      zh: "小雪",
      icon: "🌨️"
    },

    73: {
      en: "Snow",
      zh: "下雪",
      icon: "🌨️"
    },

    75: {
      en: "Heavy snow",
      zh: "大雪",
      icon: "❄️"
    },

    77: {
      en: "Snow grains",
      zh: "米雪",
      icon: "❄️"
    },

    80: {
      en: "Light rain showers",
      zh: "小阵雨",
      icon: "🌦️"
    },

    81: {
      en: "Rain showers",
      zh: "阵雨",
      icon: "🌧️"
    },

    82: {
      en: "Heavy rain showers",
      zh: "强阵雨",
      icon: "🌧️"
    },

    85: {
      en: "Light snow showers",
      zh: "小阵雪",
      icon: "🌨️"
    },

    86: {
      en: "Heavy snow showers",
      zh: "强阵雪",
      icon: "❄️"
    },

    95: {
      en: "Thunderstorm",
      zh: "雷暴",
      icon: "⛈️"
    },

    96: {
      en: "Thunderstorm with hail",
      zh: "雷暴伴冰雹",
      icon: "⛈️"
    },

    99: {
      en: "Severe thunderstorm with hail",
      zh: "强雷暴伴冰雹",
      icon: "⛈️"
    }
  };

  return weatherMap[weatherCode] || {
    en: "Current conditions",
    zh: "当前天气",
    icon: "🌦️"
  };
}


function getCachedHomeWeather(city) {
  try {
    const cacheKey =
      `nz-home-weather-${city.toLowerCase()}`;

    const cachedValue =
      sessionStorage.getItem(cacheKey);

    if (!cachedValue) {
      return null;
    }

    const cachedWeather =
      JSON.parse(cachedValue);

    const cacheAge =
      Date.now() - cachedWeather.savedAt;

    const maximumAge =
      HOME_WEATHER_CACHE_MINUTES *
      60 *
      1000;

    if (cacheAge > maximumAge) {
      sessionStorage.removeItem(cacheKey);

      return null;
    }

    return cachedWeather.data;
  } catch (error) {
    console.warn(
      "Could not read cached weather:",
      error
    );

    return null;
  }
}


function saveHomeWeatherToCache(
  city,
  weatherData
) {
  try {
    sessionStorage.setItem(
      `nz-home-weather-${city.toLowerCase()}`,

      JSON.stringify({
        savedAt: Date.now(),
        data: weatherData
      })
    );
  } catch (error) {
    console.warn(
      "Could not cache weather:",
      error
    );
  }
}


async function fetchCurrentWeather(city) {
  const cachedWeather =
    getCachedHomeWeather(city);

  if (cachedWeather) {
    return cachedWeather;
  }

  const geocodingParameters =
    new URLSearchParams({
      name: city,
      count: "1",
      language: "en",
      format: "json",
      countryCode: "NZ"
    });

  const geocodingResponse =
    await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?${geocodingParameters}`
    );

  if (!geocodingResponse.ok) {
    throw new Error(
      "Could not find the weather location."
    );
  }

  const geocodingData =
    await geocodingResponse.json();

  const location =
    geocodingData.results &&
    geocodingData.results[0];

  if (!location) {
    throw new Error(
      `No New Zealand location found for ${city}.`
    );
  }

  const weatherParameters =
    new URLSearchParams({
      latitude:
        String(location.latitude),

      longitude:
        String(location.longitude),

      current: [
        "temperature_2m",
        "apparent_temperature",
        "weather_code",
        "is_day"
      ].join(","),

      temperature_unit: "celsius",
      timezone: "auto"
    });

  const weatherResponse =
    await fetch(
      `https://api.open-meteo.com/v1/forecast?${weatherParameters}`
    );

  if (!weatherResponse.ok) {
    throw new Error(
      "Could not retrieve the current weather."
    );
  }

  const weatherData =
    await weatherResponse.json();

  if (!weatherData.current) {
    throw new Error(
      "Current weather data was unavailable."
    );
  }

  const result = {
    city:
      location.name || city,

    temperature:
      weatherData.current.temperature_2m,

    apparentTemperature:
      weatherData.current.apparent_temperature,

    weatherCode:
      weatherData.current.weather_code,

    isDay:
      weatherData.current.is_day
  };

  saveHomeWeatherToCache(
    city,
    result
  );

  return result;
}


function displayHomeWeather(
  weather,
  displayCity
) {
  const weatherIconElement =
    document.getElementById(
      "homeWeatherIcon"
    );

  const weatherValueElement =
    document.getElementById(
      "homeWeatherValue"
    );

  const weatherPlaceElement =
    document.getElementById(
      "homeWeatherPlace"
    );

  const weatherDescriptionElement =
    document.getElementById(
      "homeWeatherDescription"
    );

  if (
    !weatherIconElement ||
    !weatherValueElement ||
    !weatherPlaceElement ||
    !weatherDescriptionElement
  ) {
    return;
  }

  const condition =
    getWeatherText(
      Number(weather.weatherCode),
      Number(weather.isDay)
    );

  const roundedTemperature =
    Math.round(
      weather.temperature
    );

  const roundedApparentTemperature =
    Math.round(
      weather.apparentTemperature
    );

  weatherIconElement.textContent =
    condition.icon;

  weatherValueElement.textContent =
    `${roundedTemperature}°C`;

  weatherPlaceElement.textContent =
    displayCity || weather.city;

  weatherDescriptionElement.textContent =
    language === "zh"
      ? `${condition.zh} · 体感 ${roundedApparentTemperature}°C`
      : `${condition.en} · Feels like ${roundedApparentTemperature}°C`;
}


function displayHomeWeatherError(
  displayCity
) {
  const weatherIconElement =
    document.getElementById(
      "homeWeatherIcon"
    );

  const weatherValueElement =
    document.getElementById(
      "homeWeatherValue"
    );

  const weatherPlaceElement =
    document.getElementById(
      "homeWeatherPlace"
    );

  const weatherDescriptionElement =
    document.getElementById(
      "homeWeatherDescription"
    );

  if (weatherIconElement) {
    weatherIconElement.textContent =
      "🌦️";
  }

  if (weatherValueElement) {
    weatherValueElement.textContent =
      "--°C";
  }

  if (weatherPlaceElement) {
    weatherPlaceElement.textContent =
      displayCity;
  }

  if (weatherDescriptionElement) {
    weatherDescriptionElement.textContent =
      language === "zh"
        ? "暂时无法加载天气，请稍后再试。"
        : "Weather is unavailable right now. Please try again later.";
  }
}


async function updateHomeWeather(
  rawDay,
  localizedDay
) {
  try {
    const weather =
      await fetchCurrentWeather(
        rawDay.city
      );

    displayHomeWeather(
      weather,
      localizedDay.city
    );
  } catch (error) {
    console.error(
      "Could not load home weather:",
      error
    );

    displayHomeWeatherError(
      localizedDay.city
    );
  }
}


function getUpcomingTripDay() {
  const tripStartDate =
    new Date(2026, 8, 10);

  const today =
    new Date();

  const startOfToday =
    new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    );

  const difference =
    startOfToday - tripStartDate;

  const dayIndex =
    Math.floor(
      difference /
      (1000 * 60 * 60 * 24)
    );

  if (dayIndex < 0) {
    return tripData.days[0];
  }

  if (
    dayIndex <
    tripData.days.length
  ) {
    return tripData.days[dayIndex];
  }

  return tripData.days[
    tripData.days.length - 1
  ];
}


function calculateDaysLeft() {
  const tripStartDate =
    new Date(2026, 8, 10);

  const today =
    new Date();

  const startOfToday =
    new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    );

  const difference =
    tripStartDate - startOfToday;

  return Math.ceil(
    difference /
    (1000 * 60 * 60 * 24)
  );
}


function getCountdownDisplay() {
  const daysLeft =
    calculateDaysLeft();

  if (daysLeft > 0) {
    return {
      value: daysLeft,

      unit:
        language === "zh"
          ? "天"
          : daysLeft === 1
            ? "day"
            : "days"
    };
  }

  if (daysLeft === 0) {
    return {
      value:
        language === "zh"
          ? "今天!"
          : "Today!",

      unit: ""
    };
  }

  return {
    value:
      language === "zh"
        ? "已开始"
        : "Started",

    unit: ""
  };
}


function updateCountdown() {
  const countdownTextElement =
    document.getElementById(
      "countdownText"
    );

  if (!countdownTextElement) {
    return;
  }

  const countdown =
    getCountdownDisplay();

  if (countdown.unit === "") {
    countdownTextElement.textContent =
      countdown.value;
  } else {
    countdownTextElement.innerHTML = `
      ${countdown.value}
      <span>${countdown.unit}</span>
    `;
  }
}


function displayHomeMemoriesCount(
  count
) {
  const memoriesValueElement =
    document.getElementById(
      "homeMemoriesValue"
    );

  if (memoriesValueElement) {
    memoriesValueElement.textContent =
      String(count);
  }
}


async function updateHomeMemoriesCount() {
  const memoriesValueElement =
    document.getElementById(
      "homeMemoriesValue"
    );

  if (!memoriesValueElement) {
    return;
  }

  const firebaseReady =
    Boolean(
      window.nzFirebase &&
      window.nzFirebase.getUser &&
      window.nzFirebase.getUser()
    );

  if (!firebaseReady) {
    setTimeout(() => {
      if (
        document.getElementById(
          "homeMemoriesValue"
        )
      ) {
        updateHomeMemoriesCount();
      }
    }, 700);

    return;
  }

  try {
    const snapshot =
      await window.nzFirebase.db
        .collection("trips")
        .doc("NZ2026")
        .collection("memories")
        .get();

    const memoryCount =
      snapshot.docs.filter(doc => {
        const data = doc.data();

        return Boolean(
          data &&
          data.url
        );
      }).length;

    displayHomeMemoriesCount(
      memoryCount
    );
  } catch (error) {
    console.error(
      "Could not load memories count:",
      error
    );

    displayHomeMemoriesCount(0);
  }
}


function getHomeText(
  localizedDay
) {
  const countdown =
    getCountdownDisplay();

  const homeText = {
    en: {
      route:
        "Auckland → Christchurch",

      title:
        "New Zealand Adventure Awaits",

      desc:
        "Auckland to Christchurch, planned day by day.",

      start:
        "Start Journey",

      countdownLabel:
        "Trip Starts In",

      countdownValue:
        countdown.value,

      countdownUnit:
        countdown.unit,

      countdownDate:
        "10 Sep 2026",

      weatherLabel:
        "Today's Weather",

      weatherValue:
        "--°C",

      weatherPlace:
        localizedDay.city,

      weatherDesc:
        "Loading current weather...",

      locationLabel:
        "Current Location",

      locationValue:
        localizedDay.city,

      locationDesc:
        `Day ${localizedDay.day} / ${tripData.totalDays}`,

      memoriesLabel:
        "Memories Uploaded",

      memoriesValue:
        "0",

      memoriesDesc:
        "Photos and videos shared",

      todayTitle:
        "Today at a Glance",

      viewFull:
        "View Full Itinerary",

      dayLabel:
        `Day ${localizedDay.day} · ${localizedDay.displayDate}`,

      todayCity:
        localizedDay.city,

      todayDesc:
        localizedDay.title ||
        "Welcome to New Zealand!",

      quickTitle:
        "Quick Access"
    },

    zh: {
      route:
        "奥克兰 → 基督城",

      title:
        "新西兰冒险之旅",

      desc:
        "从奥克兰到基督城，每一天都为你规划好。",

      start:
        "开始旅程",

      countdownLabel:
        "距离出发还有",

      countdownValue:
        countdown.value,

      countdownUnit:
        countdown.unit,

      countdownDate:
        "2026年9月10日",

      weatherLabel:
        "今日天气",

      weatherValue:
        "--°C",

      weatherPlace:
        localizedDay.city,

      weatherDesc:
        "正在加载当前天气...",

      locationLabel:
        "当前位置",

      locationValue:
        localizedDay.city,

      locationDesc:
        `第 ${localizedDay.day} / ${tripData.totalDays} 天`,

      memoriesLabel:
        "已上传回忆",

      memoriesValue:
        "0",

      memoriesDesc:
        "家人分享的照片与视频",

      todayTitle:
        "今日行程概览",

      viewFull:
        "查看完整行程",

      dayLabel:
        `第 ${localizedDay.day} 天 · ${localizedDay.displayDate}`,

      todayCity:
        localizedDay.city,

      todayDesc:
        localizedDay.title ||
        "欢迎来到新西兰！",

      quickTitle:
        "快速入口"
    }
  };

  return (
    homeText[language] ||
    homeText.en
  );
}


function renderHomePage(container) {
  const rawCurrentDay =
    getUpcomingTripDay();

  const currentDay =
    getLocalizedTripDay(
      rawCurrentDay
    );

  const h =
    getHomeText(currentDay);

  const quickCards = [
    {
      page: "itinerary",
      icon: "🗓️",

      title:
        text[language]
          .nav
          .itinerary,

      desc:
        language === "zh"
          ? "查看完整行程"
          : "View full plan"
    },

    {
      page: "explore",
      icon: "🧭",

      title:
        text[language]
          .nav
          .explore,

      desc:
        language === "zh"
          ? "景点与活动"
          : "Places & activities"
    },

    {
      page: "memories",
      icon: "🖼️",

      title:
        text[language]
          .nav
          .memories,

      desc:
        language === "zh"
          ? "照片与视频"
          : "Photos & videos"
    },

    {
      page: "tripHub",
      icon: "🧳",

      title:
        text[language]
          .nav
          .tripHub,

      desc:
        language === "zh"
          ? "旅行资料"
          : "Travel info"
    },

    {
      page: "checklist",
      icon: "☑️",

      title:
        text[language]
          .nav
          .checklist,

      desc:
        language === "zh"
          ? "打包与任务"
          : "Packing & tasks"
    },

    {
      page: "explore",
      icon: "♡",

      title:
        language === "zh"
          ? "收藏"
          : "Favourites",

      desc:
        language === "zh"
          ? "收藏地点"
          : "Saved places"
    }
  ];

  container.innerHTML = `
    <section class="home-page">

      <section class="home-hero">
        <p class="hero-route">
          ${h.route}
        </p>

        <div class="home-hero-content">
          <h1>
            ${h.title}
          </h1>

          <p>
            ${h.desc}
          </p>

          <button
            type="button"
            class="hero-btn"
            id="openItineraryBtn"
          >
            ${h.start} →
          </button>
        </div>
      </section>


      <section class="home-stats">

        <article class="stat-card">
          <div class="stat-icon green">
            📅
          </div>

          <div>
            <p>
              ${h.countdownLabel}
            </p>

            <h3 id="countdownText">
              ${h.countdownValue}

              <span>
                ${h.countdownUnit}
              </span>
            </h3>

            <small>
              ${h.countdownDate}
            </small>
          </div>
        </article>


        <article class="stat-card">
          <div
            class="stat-icon yellow"
            id="homeWeatherIcon"
          >
            ⏳
          </div>

          <div>
            <p>
              ${h.weatherLabel}
            </p>

            <h3 id="homeWeatherValue">
              ${h.weatherValue}
            </h3>

            <small>
              <span id="homeWeatherPlace">
                ${h.weatherPlace}
              </span>

              <br>

              <span id="homeWeatherDescription">
                ${h.weatherDesc}
              </span>
            </small>
          </div>
        </article>


        <article class="stat-card">
          <div class="stat-icon purple">
            📍
          </div>

          <div>
            <p>
              ${h.locationLabel}
            </p>

            <h3>
              ${h.locationValue}
            </h3>

            <small>
              ${h.locationDesc}
            </small>
          </div>
        </article>


        <article class="stat-card">
          <div class="stat-icon red">
            📷
          </div>

          <div>
            <p>
              ${h.memoriesLabel}
            </p>

            <h3 id="homeMemoriesValue">
              ${h.memoriesValue}
            </h3>

            <small>
              ${h.memoriesDesc}
            </small>
          </div>
        </article>

      </section>


      <section class="home-lower-grid">

        <article class="today-card">
          <div class="section-header">
            <h2>
              ${h.todayTitle}
            </h2>

            <button
              type="button"
              id="viewFullItineraryBtn"
            >
              ${h.viewFull} →
            </button>
          </div>

          <div class="today-main">
            <div
              class="today-image"
              style="background-image: url('${currentDay.banner}')"
            ></div>

            <div>
              <p>
                ${h.dayLabel}
              </p>

              <h3>
                ${h.todayCity}
              </h3>

              <span>
                ${h.todayDesc}
              </span>
            </div>
          </div>

          <div class="today-timeline">
            ${currentDay.timeline
              .map((item, index) => `
                <div class="timeline-step">
                  <div class="timeline-icon">
                    ${item.icon}
                  </div>

                  <h4>
                    ${item.title}
                  </h4>

                  <small>
                    ${item.time}
                  </small>
                </div>

                ${
                  index <
                  currentDay.timeline.length - 1
                    ? `
                        <span class="timeline-arrow">
                          →
                        </span>
                      `
                    : ""
                }
              `)
              .join("")}
          </div>
        </article>


        <article class="quick-card">
          <h2>
            ${h.quickTitle}
          </h2>

          <div class="quick-grid">
            ${quickCards
              .map(card => `
                <button
                  type="button"
                  class="quick-item"
                  data-page="${card.page}"
                >
                  <div class="quick-icon">
                    ${card.icon}
                  </div>

                  <h3>
                    ${card.title}
                  </h3>

                  <p>
                    ${card.desc}
                  </p>
                </button>
              `)
              .join("")}
          </div>
        </article>

      </section>
    </section>
  `;

  updateCountdown();

  updateHomeWeather(
    rawCurrentDay,
    currentDay
  );

  updateHomeMemoriesCount();

  document
    .getElementById(
      "openItineraryBtn"
    )
    .addEventListener(
      "click",
      () => {
        renderLayout(
          "itinerary"
        );
      }
    );

  document
    .getElementById(
      "viewFullItineraryBtn"
    )
    .addEventListener(
      "click",
      () => {
        renderLayout(
          "itinerary"
        );
      }
    );

  container
    .querySelectorAll(
      ".quick-item"
    )
    .forEach(button => {
      button.addEventListener(
        "click",
        event => {
          event.preventDefault();

          const page =
            button.dataset.page;

          if (page) {
            renderLayout(page);
          }
        }
      );
    });
}