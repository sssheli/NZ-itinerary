let selectedDay = 0;

function renderItineraryPage(container) {
    const currentDay = tripData.days[selectedDay];

    container.innerHTML = `
  <section class="itinerary-page">

    <div class="itinerary-header">

      <div>
        <p class="itinerary-subtitle">
          Auckland → Christchurch • 10–23 Sep 2026
        </p>

        <h1>Trip Itinerary</h1>
      </div>

    </div>

    <div class="day-selector">

      ${tripData.days.map((day, index) => `
        <button
          class="day-pill ${index === selectedDay ? "active" : ""}"
          data-day="${index}"
        >
          <span>Day ${day.day}</span>
          <small>${day.displayDate}</small>
        </button>
      `).join("")}

    </div>

    <div
      class="day-hero"
      style="background-image: url('${currentDay.banner}')"
    >
      <div class="day-overlay">

        <p class="day-weekday">
          ${currentDay.weekday}
        </p>

        <h2>
          ${currentDay.displayDate}
        </h2>

        <h1>
          ${currentDay.city}
        </h1>

        <p class="day-summary">
          ${currentDay.summary}
        </p>

      </div>
    </div>

    <section class="timeline-card">

      <div class="section-title">
        <h2>Today's Timeline</h2>
      </div>

      <div class="timeline-list">

        ${currentDay.timeline.map(item => `

          <div class="timeline-item">

            <div class="timeline-time">
              ${item.time}
            </div>

            <div class="timeline-dot">
              ${item.icon}
            </div>

            <div class="timeline-content">

              <h3>${item.title}</h3>

              <p>${item.desc}</p>

            </div>

          </div>

        `).join("")}

      </div>

    </section>

  </section>
`;

    document.querySelectorAll(".day-pill").forEach(button => {

        button.addEventListener("click", () => {

            selectedDay = Number(button.dataset.day);

            renderItineraryPage(container);

        });

    });

}