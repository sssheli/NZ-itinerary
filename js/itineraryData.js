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
    banner: "images/banners/day01-auckland.jpg",

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
    },
    {
    day: 2,
    date: "11/9/2026",
    isoDate: "2026-09-11",
    displayDate: "11 Sep 2026",
    weekday: "Friday",
    city: "Taupo",
    title: "Auckland to Taupo",
    summary: "Drive from Auckland to Taupo with scenic stops, honey tasting and Huka Falls.",
    banner: "images/banners/day02-taupo.jpg",

    accommodation: {
        name: "Acacia Lake View Motel",
        room: "Family Room with Lake View",
        checkIn: "4:00 PM",
        checkOut: "8:30 AM next morning",
        map: "https://maps.app.goo.gl/QrBBnAx8bxoQGhuR7"
    },

    drive: {
        from: "Auckland",
        to: "Taupo",
        duration: "4 hrs+"
    },

    timeline: [
        {
        type: "drive",
        icon: "🚗",
        time: "9:30 AM",
        duration: "4 hrs+",
        title: "Drive from Auckland to Taupo",
        desc: "Leave before 9:30 AM if possible. Drive may take longer if traffic is heavy."
        },
        {
        type: "attraction",
        icon: "🏯",
        time: "Along the way",
        duration: "",
        title: "Fo Guang Shan Buddhist Temple",
        desc: "Optional stop on the way to Taupo."
        },
        {
        type: "attraction",
        icon: "🏘️",
        time: "Along the way",
        duration: "",
        title: "Cambridge Town",
        desc: "Short town stop during the drive."
        },
        {
        type: "attraction",
        icon: "🍯",
        time: "Along the way",
        duration: "",
        title: "Huka Honey Hive",
        desc: "Try honey varieties, but note that items may be overpriced."
        },
        {
        type: "attraction",
        icon: "💦",
        time: "Afternoon",
        duration: "",
        title: "Huka Falls",
        desc: "Visit before heading to the motel."
        },
        {
        type: "hotel",
        icon: "🏨",
        time: "4:00 PM",
        duration: "",
        title: "Check in at Acacia Lake View Motel",
        desc: "Stay overnight in Taupo."
        }
    ],

    places: [
        {
        id: "acacia-lake-view-motel",
        type: "hotel",
        name: "Acacia Lake View Motel",
        city: "Taupo",
        image: "",
        description: "Family room with lake view.",
        rating: "Stay",
        map: "https://maps.app.goo.gl/QrBBnAx8bxoQGhuR7"
        },
        {
        id: "fo-guang-shan-temple",
        type: "attraction",
        name: "Fo Guang Shan Buddhist Temple",
        city: "Auckland",
        image: "",
        description: "Optional cultural stop on the way to Taupo.",
        rating: "Optional",
        map: ""
        },
        {
        id: "cambridge-town",
        type: "attraction",
        name: "Cambridge Town",
        city: "Cambridge",
        image: "",
        description: "Town stop along the route.",
        rating: "Optional",
        map: ""
        },
        {
        id: "huka-honey-hive",
        type: "attraction",
        name: "Huka Honey Hive",
        city: "Taupo",
        image: "",
        description: "Taste different varieties of honey.",
        rating: "Optional",
        map: ""
        },
        {
        id: "huka-falls",
        type: "attraction",
        name: "Huka Falls",
        city: "Taupo",
        image: "",
        description: "Famous waterfall stop near Taupo.",
        rating: "Must Visit",
        map: ""
        }
    ],

    food: [],

    reminders: [
        "Try to leave Auckland before 9:30 AM.",
        "Go supermarket in Taupo to buy snacks for the next day road trip.",
        "Huka Honey Hive is mainly for tasting; don’t buy too much as it may be overpriced.",
        "Check out at 8:30 AM next morning because the next day is a long drive."
    ],

    notes: [
        "Try to leave Auckland before 9:30 AM.",
        "Go supermarket in Taupo to buy snacks for the next day road trip.",
        "Huka Honey Hive is mainly for tasting; don’t buy too much as it may be overpriced.",
        "Check out at 8:30 AM next morning because the next day is a long drive."
    ]
    },
    {
    day: 3,
    date: "12/9/2026",
    isoDate: "2026-09-12",
    displayDate: "12 Sep 2026",
    weekday: "Saturday",
    city: "Wellington",
    title: "Taupo to Wellington",
    summary: "A long drive from Taupo to Wellington with town stops, food breaks and Mount Victoria if time allows.",
    banner: "images/banners/day03-wellington.jpg",

    accommodation: {
        name: "Sojourn Apartment Hotel Ghuznee",
        room: "2 Bedroom Interconnecting",
        checkIn: "4:00 PM",
        checkOut: "10:00 AM on 14 Sep",
        map: "https://maps.app.goo.gl/zjr4hTXLXzqhrFH6A"
    },

    drive: {
        from: "Taupo",
        to: "Wellington",
        duration: "5 hrs+"
    },

    timeline: [
        {
        type: "drive",
        icon: "🚗",
        time: "9:00 AM",
        duration: "5 hrs+",
        title: "Drive from Taupo to Wellington",
        desc: "Long drive with stops along the way."
        },
        {
        type: "food",
        icon: "☕",
        time: "Along the way",
        duration: "",
        title: "MOOMAA Cafe or Brown Sugar Café",
        desc: "If MOOMAA is closed, take the next break at Brown Sugar Café in Taihape."
        },
        {
        type: "attraction",
        icon: "🏙️",
        time: "Before check-in",
        duration: "",
        title: "Mount Victoria Lookout",
        desc: "Drive up before checking in if there is enough time."
        },
        {
        type: "shopping",
        icon: "🛒",
        time: "Afternoon",
        duration: "",
        title: "New World Supermarket Wellington City",
        desc: "Supermarket stop before hotel."
        },
        {
        type: "hotel",
        icon: "🏨",
        time: "4:00 PM",
        duration: "",
        title: "Check in at Sojourn Apartment Hotel",
        desc: "Stay in Wellington for two nights."
        },
        {
        type: "attraction",
        icon: "🚶",
        time: "Evening",
        duration: "",
        title: "Explore Cuba Street",
        desc: "Walk around Cuba Street after check-in."
        }
    ],

    places: [
        {
        id: "sojourn-apartment-hotel-ghuznee",
        type: "hotel",
        name: "Sojourn Apartment Hotel Ghuznee",
        city: "Wellington",
        image: "",
        description: "Two-bedroom interconnecting apartment with free off-site parking.",
        rating: "Stay",
        map: "https://maps.app.goo.gl/zjr4hTXLXzqhrFH6A"
        },
        {
        id: "moomaa-cafe-design-store",
        type: "cafe",
        name: "MOOMAA Cafe • Design Store",
        city: "Taihape",
        image: "",
        description: "Suggested café stop on the way to Wellington.",
        rating: "Optional",
        map: ""
        },
        {
        id: "brown-sugar-cafe",
        type: "cafe",
        name: "Brown Sugar Café",
        city: "Taihape",
        image: "",
        description: "Backup café stop if MOOMAA is closed.",
        rating: "Backup",
        map: ""
        },
        {
        id: "mount-victoria-lookout",
        type: "attraction",
        name: "Mount Victoria Lookout",
        city: "Wellington",
        image: "",
        description: "Scenic lookout over Wellington.",
        rating: "If Time",
        map: ""
        },
        {
        id: "cuba-street",
        type: "attraction",
        name: "Cuba Street",
        city: "Wellington",
        image: "",
        description: "Popular street to explore in Wellington.",
        rating: "Recommended",
        map: ""
        }
    ],

    food: [
        {
        name: "MOOMAA Cafe • Design Store",
        note: "Suggested break stop during the drive.",
        map: ""
        },
        {
        name: "Brown Sugar Café",
        note: "Backup café stop in Taihape.",
        map: ""
        }
    ],

    reminders: [
        "Long drive day, so leave Taupo around 9:00 AM.",
        "Drive to Mount Victoria Lookout before hotel check-in if there is enough time.",
        "Explore Cuba Street in the evening.",
        "Hotel is paid upon check-in."
    ],

    notes: [
        "Long drive day, so leave Taupo around 9:00 AM.",
        "Drive to Mount Victoria Lookout before hotel check-in if there is enough time.",
        "Explore Cuba Street in the evening.",
        "Hotel is paid upon check-in."
    ]
    },
    {
    day: 4,
    date: "13/9/2026",
    isoDate: "2026-09-13",
    displayDate: "13 Sep 2026",
    weekday: "Sunday",
    city: "Wellington",
    title: "Wellington Day Trip",
    summary: "Explore Cape Palliser Lighthouse, fur seal colony, waterfront walks and food options around Wellington.",
    banner: "images/banners/day04-wellington.jpg",

    accommodation: {
        name: "Sojourn Apartment Hotel Ghuznee",
        room: "2 Bedroom Interconnecting",
        checkIn: "Already checked in",
        checkOut: "10:00 AM on 14 Sep",
        map: "https://maps.app.goo.gl/zjr4hTXLXzqhrFH6A"
    },

    drive: {
        from: "Wellington",
        to: "Cape Palliser Lighthouse",
        duration: "Day trip"
    },

    timeline: [
        {
        type: "attraction",
        icon: "🗼",
        time: "9:00 AM",
        duration: "",
        title: "Cape Palliser Lighthouse",
        desc: "Drive to Cape Palliser Lighthouse."
        },
        {
        type: "attraction",
        icon: "🦭",
        time: "Late morning",
        duration: "",
        title: "Fur Seal Colony",
        desc: "Visit the fur seal colony viewpoint."
        },
        {
        type: "food",
        icon: "🍟",
        time: "Lunch",
        duration: "",
        title: "Captains Table Food Truck",
        desc: "Buy takeaway fish and chips at Ngawi to eat at the beach."
        },
        {
        type: "attraction",
        icon: "🌊",
        time: "Afternoon",
        duration: "",
        title: "Wellington Waterfront",
        desc: "Return to Wellington for a waterfront walk."
        },
        {
        type: "food",
        icon: "🍜",
        time: "Dinner",
        duration: "",
        title: "K C Cafe & Takeaway",
        desc: "Chinese food option."
        }
    ],

    places: [
        {
        id: "cape-palliser-lighthouse",
        type: "attraction",
        name: "Cape Palliser Lighthouse",
        city: "Wellington",
        image: "",
        description: "Lighthouse day trip from Wellington.",
        rating: "Recommended",
        map: "https://maps.app.goo.gl/GHaXRLEETbPP5HJTA"
        },
        {
        id: "fur-seal-colony",
        type: "attraction",
        name: "Fur Seal Colony",
        city: "Cape Palliser",
        image: "",
        description: "Viewpoint to see fur seals near Cape Palliser.",
        rating: "Recommended",
        map: ""
        },
        {
        id: "captains-table-food-truck",
        type: "food",
        name: "Captains Table Food Truck",
        city: "Ngawi",
        image: "",
        description: "Takeaway fish and chips option on the way.",
        rating: "Recommended",
        map: ""
        },
        {
        id: "wellington-waterfront",
        type: "attraction",
        name: "Wellington Waterfront",
        city: "Wellington",
        image: "",
        description: "Relaxing waterfront walk after the day trip.",
        rating: "Recommended",
        map: ""
        },
        {
        id: "kc-cafe-takeaway",
        type: "food",
        name: "K C Cafe & Takeaway",
        city: "Wellington",
        image: "",
        description: "Chinese food option.",
        rating: "Food Option",
        map: "https://maps.app.goo.gl/hLQFnFZKmjUebda18"
        }
    ],

    food: [
        {
        name: "Captains Table Food Truck",
        note: "Buy takeaway fish and chips at Ngawi to eat at the beach.",
        map: ""
        },
        {
        name: "K C Cafe & Takeaway",
        note: "Chinese food option in Wellington.",
        map: "https://maps.app.goo.gl/hLQFnFZKmjUebda18"
        }
    ],

    reminders: [
        "Bring some snacks for the Cape Palliser day trip.",
        "Buy takeaway fish and chips from Captains Table Food Truck at Ngawi.",
        "Walk along Wellington Waterfront after returning.",
        "Alternative plan: Botanic Garden, Cable Car Museum, Cable Car, Wind Turbine, Cuba Street and Waterfront walk."
    ],

    notes: [
        "Bring some snacks for the Cape Palliser day trip.",
        "Buy takeaway fish and chips from Captains Table Food Truck at Ngawi.",
        "Walk along Wellington Waterfront after returning.",
        "Alternative plan: Botanic Garden, Cable Car Museum, Cable Car, Wind Turbine, Cuba Street and Waterfront walk."
    ]
    }
  ]
};