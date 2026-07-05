const tripData = {
  startDate: "2026-09-10",
  endDate: "2026-09-23",
  totalDays: 14,

  days: [
    {
      day: 1,
      date: "2026-09-10",
      displayDate: "10 Sep 2026",
      weekday: "Thursday",
      city: "Auckland",
      title: "Arrival in Auckland",
      summary: "Arrive in Auckland, collect the rental car, check in and settle down.",

      accommodation: {
        name: "Avani Auckland Metropolis Residence",
        room: "2 Bedroom Suite",
        checkIn: "3:30 PM",
        checkOut: "9:00 AM next morning",
        map: "https://maps.app.goo.gl/xHXCWvaXpwFXemzH9"
      },

      drive: {
        from: "Auckland Airport",
        to: "Avani Auckland",
        duration: "30 mins"
      },

      timeline: [
        {
          icon: "✈️",
          time: "12:20 PM",
          title: "Arrive at Auckland Airport",
          desc: "Flight SQ285 reaches AKL."
        },
        {
          icon: "🚗",
          time: "2:00 PM",
          title: "Collect rental car",
          desc: "Car rental from 10–14 Sep."
        },
        {
          icon: "🏨",
          time: "3:30 PM",
          title: "Check in hotel",
          desc: "Avani Auckland Metropolis Residence."
        },
        {
          icon: "🛒",
          time: "After check-in",
          title: "Visit Woolworths",
          desc: "Supermarket nearby."
        },
        {
          icon: "🍜",
          time: "Dinner",
          title: "Dinner nearby",
          desc: "Pocha Korean or Thai food option."
        }
      ],

      maps: [
        {
          label: "Hotel",
          url: "https://maps.app.goo.gl/xHXCWvaXpwFXemzH9"
        },
        {
          label: "Woolworths",
          url: "https://maps.app.goo.gl/4eg5znfhdiqhzb8q7"
        },
        {
          label: "Pocha Korean",
          url: "https://maps.app.goo.gl/E2WvAJZiwjn9DvJB9"
        },
        {
          label: "Thai Food",
          url: "https://maps.app.goo.gl/k4Ua9gfBnqdu8mJk7"
        }
      ],

      notes: [
        "Car rental: 10–14 Sep, total cost NZ$781.68.",
        "Check out at 9:00 AM the next morning.",
        "Drive from airport to hotel is around 30 minutes."
      ]
    }
  ]
};