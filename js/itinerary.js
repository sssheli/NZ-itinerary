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

                    <h1>Itinerary</h1>
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

        </section>
    `;

    document.querySelectorAll(".day-pill").forEach(button => {

        button.addEventListener("click", () => {

            selectedDay = Number(button.dataset.day);

            renderItineraryPage(container);

        });

    });

}