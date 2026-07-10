let searchQuery = "";
let selectedCategory = "all";


function escapeExploreHTML(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}


function getExploreText() {
  const exploreText = {
    en: {
      subtitle: "Discover New Zealand",
      title: "Explore New Zealand",
      desc:
        "Discover attractions, cafés, restaurants, shopping and hidden gems throughout your 14-day adventure.",

      searchPlaceholder:
        "🔍 Search New Zealand...",

      all: "All",
      attractions: "Attractions",
      food: "Food",
      cafe: "Café",
      hotel: "Hotel",
      shopping: "Shopping",
      airport: "Airport",

      attraction: "Attraction",
      place: "Place",

      day: "Day",
      openMaps: "Open Maps",

      noMatchTitle:
        "No itinerary match found",

      noMatchDesc:
        "Try searching Google Maps instead.",

      searchGoogleMaps:
        "Search Google Maps"
    },

    zh: {
      subtitle: "探索新西兰",
      title: "探索新西兰",
      desc:
        "探索14天旅程中的景点、咖啡馆、餐厅、购物地点与隐藏景点。",

      searchPlaceholder:
        "🔍 搜索新西兰地点...",

      all: "全部",
      attractions: "景点",
      food: "美食",
      cafe: "咖啡馆",
      hotel: "酒店",
      shopping: "购物",
      airport: "机场",

      attraction: "景点",
      place: "地点",

      day: "第",
      daySuffix: "天",
      openMaps: "打开地图",

      noMatchTitle:
        "行程中没有找到相符地点",

      noMatchDesc:
        "可以尝试在 Google 地图中搜索。",

      searchGoogleMaps:
        "在 Google 地图中搜索"
    }
  };

  return (
    exploreText[language] ||
    exploreText.en
  );
}


function getAllPlaces() {
  const places = [];

  tripData.days.forEach(rawDay => {
    const localizedDay =
      getLocalizedTripDay(rawDay);

    (rawDay.places || []).forEach(
      (rawPlace, index) => {
        const localizedPlace =
          localizedDay.places[index] ||
          rawPlace;

        places.push({
          ...localizedPlace,

          day:
            rawDay.day,

          name:
            localizedPlace.name,

          city:
            localizedPlace.city ||
            localizedDay.city,

          originalName:
            rawPlace.name,

          originalCity:
            rawPlace.city ||
            rawDay.city,

          type:
            rawPlace.type,

          map:
            rawPlace.map
        });
      }
    );
  });

  return places;
}


function getExploreTypeLabel(type) {
  const t = getExploreText();

  const labels = {
    hotel:
      `🏨 ${t.hotel}`,

    shopping:
      `🛍️ ${t.shopping}`,

    food:
      `🍴 ${t.food}`,

    attraction:
      `🏞️ ${t.attraction}`,

    cafe:
      `☕ ${t.cafe}`,

    airport:
      `✈️ ${t.airport}`
  };

  return (
    labels[type] ||
    `📍 ${t.place}`
  );
}


function getPlaceEmoji(type) {
  const icons = {
    hotel: "🏨",
    shopping: "🛍️",
    food: "🍴",
    attraction: "🏞️",
    cafe: "☕",
    airport: "✈️"
  };

  return icons[type] || "📍";
}


function getFilteredPlaces() {
  const query =
    searchQuery
      .trim()
      .toLowerCase();

  const places =
    getAllPlaces();

  return places.filter(place => {
    const searchableText = [
      place.name,
      place.city,
      place.originalName,
      place.originalCity,
      place.type,
      getExploreTypeLabel(place.type)
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();

    const matchesSearch =
      query === "" ||
      searchableText.includes(query);

    const matchesCategory =
      selectedCategory === "all" ||
      place.type === selectedCategory;

    return (
      matchesSearch &&
      matchesCategory
    );
  });
}


function getExploreMapLink(place) {
  if (
    place.map &&
    place.map.trim() !== ""
  ) {
    return place.map;
  }

  const searchLocation =
    `${place.originalName} ` +
    `${place.originalCity} ` +
    "New Zealand";

  return (
    "https://www.google.com/maps/search/" +
    encodeURIComponent(searchLocation)
  );
}


function getExploreDayLabel(day) {
  const t = getExploreText();

  if (language === "zh") {
    return (
      `${t.day} ${day} ${t.daySuffix}`
    );
  }

  return `${t.day} ${day}`;
}


function renderExploreResults() {
  const t =
    getExploreText();

  const resultsContainer =
    document.getElementById(
      "exploreResults"
    );

  if (!resultsContainer) {
    return;
  }

  const filteredPlaces =
    getFilteredPlaces();

  resultsContainer.innerHTML = `
    ${
      filteredPlaces.length > 0
        ? filteredPlaces
            .map(place => `
              <article class="explore-card">
                <div class="explore-card-image">
                  <span>
                    ${getPlaceEmoji(place.type)}
                  </span>
                </div>

                <div class="explore-card-body">
                  <p class="explore-type">
                    ${getExploreTypeLabel(place.type)}
                  </p>

                  <h3>
                    ${escapeExploreHTML(place.name)}
                  </h3>

                  <small>
                    ${getExploreDayLabel(place.day)}
                    •
                    ${escapeExploreHTML(place.city)}
                  </small>

                  <a
                    href="${getExploreMapLink(place)}"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    ${t.openMaps} →
                  </a>
                </div>
              </article>
            `)
            .join("")
        : `
            <article class="explore-empty">
              <h3>
                ${t.noMatchTitle}
              </h3>

              <p>
                ${t.noMatchDesc}
              </p>

              <a
                href="https://www.google.com/maps/search/${encodeURIComponent(
                  searchQuery ||
                  "New Zealand"
                )}"
                target="_blank"
                rel="noopener noreferrer"
              >
                ${t.searchGoogleMaps} →
              </a>
            </article>
          `
    }
  `;
}


function renderExplorePage(container) {
  const t =
    getExploreText();

  const categories = [
    {
      id: "all",
      icon: "🌍",
      label: t.all
    },
    {
      id: "attraction",
      icon: "🏞️",
      label: t.attractions
    },
    {
      id: "food",
      icon: "🍴",
      label: t.food
    },
    {
      id: "cafe",
      icon: "☕",
      label: t.cafe
    },
    {
      id: "hotel",
      icon: "🏨",
      label: t.hotel
    },
    {
      id: "shopping",
      icon: "🛍️",
      label: t.shopping
    },
    {
      id: "airport",
      icon: "✈️",
      label: t.airport
    }
  ];

  container.innerHTML = `
    <section class="explore-page">
      <div class="explore-header">
        <p class="explore-subtitle">
          ${t.subtitle}
        </p>

        <h1>
          ${t.title}
        </h1>

        <p class="explore-description">
          ${t.desc}
        </p>
      </div>

      <div class="explore-search">
        <input
          id="exploreSearchInput"
          type="text"
          placeholder="${t.searchPlaceholder}"
          value="${escapeExploreHTML(searchQuery)}"
        />
      </div>

      <div class="category-filter">
        ${categories
          .map(category => `
            <button
              type="button"
              class="category-pill ${
                selectedCategory ===
                category.id
                  ? "active"
                  : ""
              }"
              data-category="${category.id}"
            >
              ${category.icon}
              ${category.label}
            </button>
          `)
          .join("")}
      </div>

      <div
        class="explore-grid"
        id="exploreResults"
      ></div>
    </section>
  `;

  const searchInput =
    document.getElementById(
      "exploreSearchInput"
    );

  searchInput.addEventListener(
    "input",
    () => {
      searchQuery =
        searchInput.value;

      renderExploreResults();
    }
  );

  container
    .querySelectorAll(
      ".category-pill"
    )
    .forEach(button => {
      button.addEventListener(
        "click",
        () => {
          selectedCategory =
            button.dataset.category;

          renderExplorePage(
            container
          );
        }
      );
    });

  renderExploreResults();
}