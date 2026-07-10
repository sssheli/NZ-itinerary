let selectedDay = 0;
let daySelectorScrollPosition = 0;


function getDayIcon(city) {
  switch (city) {
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


function getItineraryText() {
  const itineraryText = {
    en: {
      route:
        "Auckland → Christchurch • 10–23 Sep 2026",

      title:
        "Trip Itinerary",

      day:
        "Day",

      timeline:
        "Today's Timeline",

      accommodation:
        "Accommodation",

      checkIn:
        "Check-in",

      checkOut:
        "Check-out",

      openGoogleMaps:
        "Open in Google Maps",

      drive:
        "Today's Drive",

      notes:
        "Notes",

      places:
        "Places Today",

      openMaps:
        "Open Maps",

      placeTypes: {
        hotel:
          "Hotel",

        shopping:
          "Shopping",

        food:
          "Food",

        cafe:
          "Café",

        airport:
          "Airport",

        attraction:
          "Attraction",

        default:
          "Place"
      }
    },

    zh: {
      route:
        "奥克兰 → 基督城 • 2026年9月10日至23日",

      title:
        "旅行行程",

      day:
        "第",

      daySuffix:
        "天",

      timeline:
        "今日时间表",

      accommodation:
        "住宿",

      checkIn:
        "入住时间",

      checkOut:
        "退房时间",

      openGoogleMaps:
        "在 Google 地图中打开",

      drive:
        "今日车程",

      notes:
        "注意事项",

      places:
        "今日地点",

      openMaps:
        "打开地图",

      placeTypes: {
        hotel:
          "酒店",

        shopping:
          "购物",

        food:
          "美食",

        cafe:
          "咖啡馆",

        airport:
          "机场",

        attraction:
          "景点",

        default:
          "地点"
      }
    }
  };

  return (
    itineraryText[language] ||
    itineraryText.en
  );
}


function getPlaceTypeDetails(
  type,
  itineraryText
) {
  const icons = {
    hotel: "🏨",
    shopping: "🛒",
    food: "🍜",
    cafe: "☕",
    airport: "✈️",
    attraction: "📍"
  };

  return {
    icon:
      icons[type] || "📍",

    label:
      itineraryText
        .placeTypes[type] ||
      itineraryText
        .placeTypes.default
  };
}


function getItineraryMapLink(
  place,
  currentDay
) {
  if (
    place.map &&
    place.map.trim() !== ""
  ) {
    return place.map;
  }

  const placeName =
    place.originalName ||
    place.name;

  const city =
    place.originalCity ||
    currentDay.originalCity ||
    currentDay.city ||
    "New Zealand";

  return `https://www.google.com/maps/search/${encodeURIComponent(
    `${placeName} ${city} New Zealand`
  )}`;
}


function getDayPillLabel(
  day,
  itineraryText
) {
  if (language === "zh") {
    return (
      `第 ${day.day} 天` +
      ` • ${day.displayDate}`
    );
  }

  return (
    `${itineraryText.day} ` +
    `${day.day} • ` +
    `${day.displayDate}`
  );
}


function renderItineraryPage(
  container
) {
  const itineraryText =
    getItineraryText();

  const rawCurrentDay =
    tripData.days[selectedDay];

  const currentDay =
    getLocalizedTripDay(
      rawCurrentDay
    );

  const localizedDays =
    getLocalizedTripDays();

  container.innerHTML = `
    <section class="itinerary-page">

      <div class="itinerary-header">
        <div>
          <p class="itinerary-subtitle">
            ${itineraryText.route}
          </p>

          <h1>
            ${itineraryText.title}
          </h1>
        </div>
      </div>


      <div class="day-selector">
        ${localizedDays
          .map((day, index) => `
            <button
              type="button"
              class="day-pill ${
                index === selectedDay
                  ? "active"
                  : ""
              }"
              data-day="${index}"
            >
              <div
                class="day-pill-image"
                style="background-image:url('${day.banner}')"
              ></div>

              <div class="day-pill-content">
                <span>
                  ${getDayIcon(
                    tripData.days[index].city
                  )}

                  ${day.city}
                </span>

                <small>
                  ${getDayPillLabel(
                    day,
                    itineraryText
                  )}
                </small>
              </div>
            </button>
          `)
          .join("")}
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
          <h2>
            ${itineraryText.timeline}
          </h2>
        </div>

        <div class="timeline-list">
          ${currentDay.timeline
            .map(item => `
              <div class="timeline-item">

                <div class="timeline-time">
                  ${item.time}
                </div>

                <div class="timeline-dot">
                  ${item.icon}
                </div>

                <div class="timeline-content">
                  <h3>
                    ${item.title}
                  </h3>

                  <p>
                    ${item.desc}
                  </p>
                </div>

              </div>
            `)
            .join("")}
        </div>
      </section>


      <section class="info-grid">

        <article class="info-card accommodation-card">

          <div class="card-header">
            <span class="card-icon">
              🏨
            </span>

            <div>
              <p class="card-label">
                ${itineraryText.accommodation}
              </p>

              <h2>
                ${currentDay.accommodation.name}
              </h2>
            </div>
          </div>

          <p class="room-type">
            ${
              currentDay
                .accommodation
                .room || ""
            }
          </p>

          <div class="info-row">
            <span>
              🕒 ${itineraryText.checkIn}
            </span>

            <strong>
              ${
                currentDay
                  .accommodation
                  .checkIn || "-"
              }
            </strong>
          </div>

          <div class="info-row">
            <span>
              🚪 ${itineraryText.checkOut}
            </span>

            <strong>
              ${
                currentDay
                  .accommodation
                  .checkOut || "-"
              }
            </strong>
          </div>

          <a
            class="map-link"
            href="${currentDay.accommodation.map}"
            target="_blank"
            rel="noopener noreferrer"
          >
            📍 ${itineraryText.openGoogleMaps}
          </a>

        </article>


        <article class="info-card drive-card">

          <div class="card-header">
            <span class="card-icon drive-icon">
              🚗
            </span>

            <div>
              <p class="card-label">
                ${itineraryText.drive}
              </p>

              <h2>
                ${currentDay.drive.duration}
              </h2>
            </div>
          </div>

          <div class="route-line">
            <div>
              <span class="route-dot"></span>

              <p>
                ${currentDay.drive.from}
              </p>
            </div>

            <div>
              <span class="route-dot end"></span>

              <p>
                ${currentDay.drive.to}
              </p>
            </div>
          </div>

        </article>


        <article class="info-card notes-card">
          <h2>
            📝 ${itineraryText.notes}
          </h2>

          <ul>
            ${currentDay.notes
              .map(note => `
                <li>
                  ${note}
                </li>
              `)
              .join("")}
          </ul>
        </article>

      </section>


      <section class="places-card">
        <div class="section-title">
          <h2>
            ${itineraryText.places}
          </h2>
        </div>

        <div class="places-grid">
          ${currentDay.places
            .map(place => {
              const typeDetails =
                getPlaceTypeDetails(
                  place.type,
                  itineraryText
                );

              return `
                <article class="place-item">

                  <div>
                    <p class="place-type">
                      ${typeDetails.icon}
                      ${typeDetails.label}
                    </p>

                    <h3>
                      ${place.name}
                    </h3>
                  </div>

                  <a
                    href="${getItineraryMapLink(
                      place,
                      currentDay
                    )}"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    ${itineraryText.openMaps} →
                  </a>

                </article>
              `;
            })
            .join("")}
        </div>
      </section>

    </section>
  `;


  const daySelector =
    container.querySelector(
      ".day-selector"
    );

  if (daySelector) {
    daySelector.scrollLeft =
      daySelectorScrollPosition;

    daySelector.addEventListener(
      "scroll",
      () => {
        daySelectorScrollPosition =
          daySelector.scrollLeft;
      }
    );
  }


  container
    .querySelectorAll(
      ".day-pill"
    )
    .forEach(button => {
      button.addEventListener(
        "click",
        () => {
          const currentDaySelector =
            container.querySelector(
              ".day-selector"
            );

          if (currentDaySelector) {
            daySelectorScrollPosition =
              currentDaySelector.scrollLeft;
          }

          selectedDay =
            Number(
              button.dataset.day
            );

          renderItineraryPage(
            container
          );

          const restoreDaySelectorScroll =
            () => {
              const newDaySelector =
                container.querySelector(
                  ".day-selector"
                );

              if (newDaySelector) {
                newDaySelector.scrollLeft =
                  daySelectorScrollPosition;
              }
            };

          requestAnimationFrame(
            restoreDaySelectorScroll
          );

          setTimeout(
            restoreDaySelectorScroll,
            50
          );
        }
      );
    });
}