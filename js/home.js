function renderHomePage(container) {
  const t = text[language];

  container.innerHTML = `
    <section class="home-page">
      <section class="home-hero">
        <p class="hero-route">AUCKLAND → CHRISTCHURCH</p>

        <div class="home-hero-content">
          <h1>${t.homeTitle}</h1>
          <p>${t.homeDesc}</p>

          <button class="hero-btn" id="openItineraryBtn">
            ${t.startJourney} →
          </button>
        </div>
      </section>

      <section class="home-stats">
        <article class="stat-card">
          <div class="stat-icon">📅</div>
          <div>
            <p>Trip Starts In</p>
            <h3>Coming Soon</h3>
            <span>9 Oct 2026</span>
          </div>
        </article>

        <article class="stat-card">
          <div class="stat-icon">📍</div>
          <div>
            <p>Route</p>
            <h3>Auckland</h3>
            <span>to Christchurch</span>
          </div>
        </article>

        <article class="stat-card">
          <div class="stat-icon">🚗</div>
          <div>
            <p>Road Trip</p>
            <h3>14 Days</h3>
            <span>Across New Zealand</span>
          </div>
        </article>

        <article class="stat-card">
          <div class="stat-icon">📸</div>
          <div>
            <p>Memories</p>
            <h3>0</h3>
            <span>Photos uploaded</span>
          </div>
        </article>
      </section>
    </section>
  `;

  document.getElementById("openItineraryBtn").addEventListener("click", () => {
    renderLayout("itinerary");
  });
}