let searchQuery = "";
let activeCategory = "all";

function getAllPlaces() {
  const places = [];

  tripData.days.forEach(day => {
    (day.places || []).forEach(place => {
      places.push({
        ...place,
        day: day.day,
        city: day.city
      });
    });
  });

  return places;
}

function getFilteredPlaces() {
  const query = searchQuery.toLowerCase();
  const places = getAllPlaces();

  return places.filter(place => {
    const matchesSearch =
      place.name.toLowerCase().includes(query) ||
      place.type.toLowerCase().includes(query) ||
      place.city.toLowerCase().includes(query);

    const matchesCategory =
      activeCategory === "all" || place.type === activeCategory;

    return matchesSearch && matchesCategory;
  });
}

function renderExploreResults() {
  const resultsContainer = document.getElementById("exploreResults");
  const filteredPlaces = getFilteredPlaces();

  resultsContainer.innerHTML = `
    ${
      filteredPlaces.length > 0
        ? filteredPlaces.map(place => `
          <article class="explore-card">
            <div class="explore-card-image">
                <span>${getPlaceEmoji(place.type)}</span>
            </div>

            <div class="explore-card-body">
                <p class="explore-type">${formatPlaceType(place.type)}</p>
                <h3>${place.name}</h3>
                <small>Day ${place.day} • ${place.city}</small>

                <a href="${place.map}" target="_blank">
                Open Maps →
                </a>
            </div>
          </article>
        `).join("")
        : `
          <article class="explore-empty">
            <h3>No itinerary match found</h3>
            <p>Try searching Google Maps instead.</p>

            <a
              href="https://www.google.com/maps/search/${encodeURIComponent(searchQuery)}"
              target="_blank"
            >
              Search Google Maps →
            </a>
          </article>
        `
    }
  `;
}

function renderExplorePage(container) {
  container.innerHTML = `
    <section class="explore-page">
      <div class="explore-header">
        <p class="explore-subtitle">Discover New Zealand</p>
        <h1>Explore</h1>
        <p class="explore-description">
          Browse attractions, restaurants, supermarkets and hotels throughout your journey.
        </p>
      </div>

      <div class="explore-search">
        <input
          id="exploreSearchInput"
          type="text"
          placeholder="Search destinations..."
          value="${searchQuery}"
        />
      </div>

      <div class="category-tabs">
        ${[
          { id: "all", label: "All" },
          { id: "hotel", label: "🏨 Hotels" },
          { id: "attraction", label: "🏞 Attractions" },
          { id: "food", label: "🍜 Food" },
          { id: "shopping", label: "🛒 Shopping" },
          { id: "cafe", label: "☕ Cafés" }
        ].map(category => `
          <button
            class="category-tab ${activeCategory === category.id ? "active" : ""}"
            data-category="${category.id}"
          >
            ${category.label}
          </button>
        `).join("")}
      </div>

      <div class="explore-grid" id="exploreResults"></div>
    </section>
  `;

  const searchInput = document.getElementById("exploreSearchInput");

  searchInput.addEventListener("input", () => {
    searchQuery = searchInput.value;
    renderExploreResults();
  });

  document.querySelectorAll(".category-tab").forEach(button => {
    button.addEventListener("click", () => {
      activeCategory = button.dataset.category;
      renderExplorePage(container);
    });
  });

  renderExploreResults();
}

function formatPlaceType(type) {
  if (type === "hotel") return "🏨 Hotel";
  if (type === "shopping") return "🛒 Shopping";
  if (type === "food") return "🍜 Food";
  if (type === "attraction") return "🏞 Attraction";
  if (type === "cafe") return "☕ Cafe";
  return "📍 Place";
}

function getPlaceEmoji(type) {
  if (type === "hotel") return "🏨";
  if (type === "shopping") return "🛒";
  if (type === "food") return "🍜";
  if (type === "attraction") return "🏞️";
  if (type === "cafe") return "☕";
  return "📍";
}