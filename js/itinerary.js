let selectedDay = 0;
let daySelectorScrollPosition = 0;

function getDayIcon(city) {

    switch(city) {

        case "Auckland":
            return "🏙️";

        case "Taupo":
            return "🚗";

        case "Wellington":
            return "🌊";

        case "Queenstown":
            return "🏔️";

        case "Christchurch":
            return "🌸";

        default:
            return "📍";

    }

}

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
          <div
            class="day-pill-image"
            style="background-image:url('${day.banner}')"
          ></div>

        <div class="day-pill-content">

            <span>
                ${getDayIcon(day.city)} ${day.city}
            </span>

            <small>
                Day ${day.day} • ${day.displayDate}
            </small>

        </div>
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

        <section class="info-grid">
        <article class="info-card accommodation-card">
    <div class="card-header">
        <span class="card-icon">🏨</span>

        <div>
        <p class="card-label">Accommodation</p>
        <h2>${currentDay.accommodation.name}</h2>
        </div>
    </div>

    <p class="room-type">
        ${currentDay.accommodation.room || ""}
    </p>

    <div class="info-row">
        <span>🕒 Check-in</span>
        <strong>${currentDay.accommodation.checkIn || "-"}</strong>
    </div>

    <div class="info-row">
        <span>🚪 Check-out</span>
        <strong>${currentDay.accommodation.checkOut || "-"}</strong>
    </div>

    <a class="map-link" href="${currentDay.accommodation.map}" target="_blank">
        📍 Open in Google Maps
    </a>
    </article>

    <article class="info-card drive-card">
    <div class="card-header">
        <span class="card-icon drive-icon">🚗</span>

        <div>
        <p class="card-label">Today&apos;s Drive</p>
        <h2>${currentDay.drive.duration}</h2>
        </div>
    </div>

    <div class="route-line">
        <div>
        <span class="route-dot"></span>
        <p>${currentDay.drive.from}</p>
        </div>

        <div>
        <span class="route-dot end"></span>
        <p>${currentDay.drive.to}</p>
        </div>
    </div>
    </article>

    <article class="info-card notes-card">
        <h2>📝 Notes</h2>

        <ul>
        ${currentDay.notes.map(note => `<li>${note}</li>`).join("")}
        </ul>
    </article>
    </section>
    <section class="places-card">
    <div class="section-title">
        <h2>Places Today</h2>
    </div>

    <div class="places-grid">
        ${currentDay.places.map(place => `
        <article class="place-item">
            <div>
            <p class="place-type">
            ${
                place.type === "hotel" ? "🏨 Hotel" :
                place.type === "shopping" ? "🛒 Shopping" :
                place.type === "food" ? "🍜 Food" :
                "📍 Place"
            }
            </p>
            <h3>${place.name}</h3>
            </div>

            <a href="${place.map}" target="_blank">
            Open Maps →
            </a>
        </article>
        `).join("")}
    </div>
    </section>

  </section>
`;

const daySelector = document.querySelector(".day-selector");

if (daySelector) {

    daySelector.scrollLeft = daySelectorScrollPosition;

    daySelector.addEventListener("scroll", () => {
        daySelectorScrollPosition = daySelector.scrollLeft;
    });

}

    document.querySelectorAll(".day-pill").forEach(button => {

        button.addEventListener("click", () => {

            const currentDaySelector = document.querySelector(".day-selector");

            if (currentDaySelector) {
                daySelectorScrollPosition = currentDaySelector.scrollLeft;
            }

            selectedDay = Number(button.dataset.day);

            renderItineraryPage(container);

            requestAnimationFrame(() => {

                const newDaySelector = document.querySelector(".day-selector");

                if (newDaySelector) {
                    newDaySelector.scrollLeft = daySelectorScrollPosition;
                }

            });

            setTimeout(() => {

                const newDaySelector = document.querySelector(".day-selector");

                if (newDaySelector) {
                    newDaySelector.scrollLeft = daySelectorScrollPosition;
                }

            }, 50);

        });

    });


}