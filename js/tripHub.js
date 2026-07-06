function getUniqueHotels() {
  const hotels = [];

  tripData.days.forEach(day => {
    const hotel = day.accommodation;

    if (!hotel || !hotel.name) {
      return;
    }

    const alreadyAdded = hotels.some(item => item.name === hotel.name);

    if (!alreadyAdded) {
      hotels.push({
        name: hotel.name,
        city: day.city,
        room: hotel.room || "Accommodation booking",
        checkIn: hotel.checkIn || "-",
        checkOut: hotel.checkOut || "-",
        map: hotel.map || "#"
      });
    }
  });

  return hotels;
}

function renderTripHubPage(container) {
  const hotels = getUniqueHotels();

  container.innerHTML = `
    <section class="trip-hub-page">

      <section class="trip-hub-hero">
        <p class="trip-hub-subtitle">Travel Control Centre</p>
        <h1>Trip Hub</h1>
        <p>
          All the important travel details for your New Zealand family trip,
          kept in one place.
        </p>
      </section>

      <section class="hub-grid">

        <article class="hub-card large-card">
          <div class="hub-card-header">
            <div class="hub-icon blue">✈️</div>

            <div>
              <p>Flights</p>
              <h2>Flight Details</h2>
            </div>
          </div>

          <div class="flight-list">
            <div class="flight-item">
              <div>
                <strong>SQ285</strong>
                <p>Singapore → Auckland</p>
              </div>

              <span>Arrives 10 Sep, 12:20 PM</span>
            </div>

            <div class="flight-item">
              <div>
                <strong>NZ607</strong>
                <p>Wellington → Queenstown</p>
              </div>

              <span>14 Sep, 1:55 PM → 3:20 PM</span>
            </div>

            <div class="flight-item">
              <div>
                <strong>SQ298</strong>
                <p>Christchurch → Singapore</p>
              </div>

              <span>23 Sep, 10:50 AM</span>
            </div>
          </div>
        </article>

        <article class="hub-card">
          <div class="hub-card-header">
            <div class="hub-icon green">🚗</div>

            <div>
              <p>Transport</p>
              <h2>Car Rental</h2>
            </div>
          </div>

          <div class="hub-detail">
            <span>Auckland → Wellington</span>
            <strong>10 Sep – 14 Sep</strong>
            <small>NZ$781.68</small>
          </div>

          <div class="hub-detail">
            <span>Queenstown → Christchurch</span>
            <strong>14 Sep – 23 Sep</strong>
            <small>NZ$1178.95</small>
          </div>
        </article>

        <article class="hub-card">
          <div class="hub-card-header">
            <div class="hub-icon red">🚨</div>

            <div>
              <p>Safety</p>
              <h2>Emergency</h2>
            </div>
          </div>

          <div class="emergency-number">
            <span>New Zealand Emergency</span>
            <strong>111</strong>
          </div>

          <p class="hub-note">
            Use 111 for police, fire, or ambulance emergencies in New Zealand.
          </p>
        </article>

      </section>

      <section class="hub-section">
        <div class="section-title">
          <h2>Hotel Bookings</h2>
        </div>

        <div class="hotel-grid">
          ${hotels.map(hotel => `
            <article class="hotel-card">
              <div>
                <p>${hotel.city}</p>
                <h3>${hotel.name}</h3>
                <span>${hotel.room}</span>
              </div>

              <div class="hotel-info">
                <small>Check-in: ${hotel.checkIn}</small>
                <small>Check-out: ${hotel.checkOut}</small>
              </div>

              <a href="${hotel.map}" target="_blank">
                Open Maps →
              </a>
            </article>
          `).join("")}
        </div>
      </section>

      <section class="hub-grid bottom-grid">

        <article class="hub-card">
          <div class="hub-card-header">
            <div class="hub-icon purple">📄</div>

            <div>
              <p>Documents</p>
              <h2>Important Docs</h2>
            </div>
          </div>

          <ul class="document-list">
            <li>Passport</li>
            <li>Flight tickets</li>
            <li>Hotel booking confirmations</li>
            <li>Car rental confirmation</li>
            <li>Driving licence</li>
            <li>Travel insurance</li>
          </ul>
        </article>

        <article class="hub-card">
          <div class="hub-card-header">
            <div class="hub-icon yellow">🔗</div>

            <div>
              <p>Links</p>
              <h2>Useful Links</h2>
            </div>
          </div>

          <div class="link-list">
            <a href="https://www.google.com/maps" target="_blank">
              Google Maps →
            </a>

            <a href="https://www.journeys.nzta.govt.nz" target="_blank">
              NZTA Road Conditions →
            </a>

            <a href="https://www.metservice.com" target="_blank">
              New Zealand Weather →
            </a>

            <a href="https://www.newzealand.com" target="_blank">
              New Zealand Travel Guide →
            </a>
          </div>
        </article>

        <article class="hub-card">
          <div class="hub-card-header">
            <div class="hub-icon pink">📝</div>

            <div>
              <p>Notes</p>
              <h2>Family Reminders</h2>
            </div>
          </div>

          <ul class="document-list">
            <li>Check highway conditions before long drives.</li>
            <li>Pack food before remote road trips.</li>
            <li>Charge phones and power banks every night.</li>
            <li>Keep passports and documents together.</li>
          </ul>
        </article>

      </section>

    </section>
  `;
}