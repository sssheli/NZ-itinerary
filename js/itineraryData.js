const tripData = {
  startDate: "2026-09-10",
  endDate: "2026-09-23",
  totalDays: 14,

  days: [
    {
    day: 1,
    date: "10/9/2026",
    isoDate: "2026-09-10",
    displayDate: "10 Sep 2026",
    weekday: "Thursday",
    city: "Auckland",
    title: "Arrival in Auckland",
    summary: "Arrive in Auckland, collect the rental car, check in and settle down.",
    banner: "images/banners/auckland.jpg",

    accommodation: {
        name: "Avani Auckland Metropolis Residence",
        room: "2 Bedroom Suite",
        checkIn: "3:30 PM",
        checkOut: "9:00 AM next morning",
        map: "https://maps.app.goo.gl/xHXCWvaXpwFXemzH9"
    },

    drive: {
        from: "Auckland Airport",
        to: "Avani Auckland Hotel",
        duration: "30 mins"
    },

    timeline: [
        {
        type: "flight",
        icon: "✈️",
        time: "12:20 PM",
        title: "Arrive at Auckland Airport",
        desc: "Flight SQ285 reaches AKL."
        },
        {
        type: "car",
        icon: "🚗",
        time: "2:00 PM",
        title: "Collect rental car",
        desc: "Car rental from 10–14 Sep."
        },
        {
        type: "hotel",
        icon: "🏨",
        time: "3:30 PM",
        title: "Check in hotel",
        desc: "Avani Auckland Metropolis Residence."
        },
        {
        type: "shopping",
        icon: "🛒",
        time: "After check-in",
        title: "Visit Woolworths",
        desc: "Supermarket nearby."
        },
        {
        type: "food",
        icon: "🍜",
        time: "Dinner",
        title: "Dinner nearby",
        desc: "Pocha Korean or Thai food option."
        }
    ],

    places: [
        {
        type: "hotel",
        name: "Avani Auckland Metropolis Residence",
        map: "https://maps.app.goo.gl/xHXCWvaXpwFXemzH9"
        },
        {
        type: "shopping",
        name: "Woolworths",
        map: "https://maps.app.goo.gl/4eg5znfhdiqhzb8q7"
        },
        {
        type: "food",
        name: "Pocha Korean",
        map: "https://maps.app.goo.gl/E2WvAJZiwjn9DvJB9"
        },
        {
        type: "food",
        name: "Thai Food",
        map: "https://maps.app.goo.gl/k4Ua9gfBnqdu8mJk7"
        }
    ],

    food: [
        {
        name: "Pocha Korean",
        note: "Dinner suggestion, walking distance.",
        map: "https://maps.app.goo.gl/E2WvAJZiwjn9DvJB9"
        },
        {
        name: "Thai Food",
        note: "Alternative option, around 10 minutes drive.",
        map: "https://maps.app.goo.gl/k4Ua9gfBnqdu8mJk7"
        }
    ],

    reminders: [
    "Car rental: 10–14 Sep, total cost NZ$781.68.",
    "Check out at 9:00 AM the next morning.",
    "Woolworths supermarket nearby."
    ],

    notes: [
        "Car rental: 10–14 Sep, total cost NZ$781.68.",
        "Check out at 9:00 AM the next morning.",
        "Woolworths supermarket nearby."
    ]
    }
  ]
};