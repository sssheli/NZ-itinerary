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
    banner: "images/banners/day01-auckland.png",

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
    banner: "images/banners/day02-taupo.png",

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
    banner: "images/banners/day03-wellington.png",

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
    banner: "images/banners/day04-wellington.png",

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
    },
    {
    day: 5,
    date: "14/9/2026",
    isoDate: "2026-09-14",
    displayDate: "14 Sep 2026",
    weekday: "Monday",
    city: "Queenstown",
    title: "Wellington to Queenstown",
    summary: "Check out from Wellington, fly to Queenstown, collect the rental car and settle into the Airbnb.",
    banner: "images/banners/day05-queenstown.png",

    accommodation: {
        name: "Contemporary & Plush - 4 Bedroom House",
        room: "Airbnb",
        checkIn: "5:00 PM",
        checkOut: "18 Sep morning",
        map: "https://maps.app.goo.gl/2eas7JnukB6fVQGcA"
    },

    drive: {
        from: "Queenstown Airport",
        to: "Queenstown Airbnb",
        duration: "After car collection"
    },

    timeline: [
        {
        type: "hotel",
        icon: "🚪",
        time: "8:00 AM",
        duration: "",
        title: "Check out from Wellington",
        desc: "Check out early and return the car at Wellington Airport."
        },
        {
        type: "flight",
        icon: "✈️",
        time: "1:55 PM",
        duration: "1 hr 25 mins",
        title: "Fly to Queenstown",
        desc: "Flight NZ607 from Wellington to Queenstown, arriving around 3:20 PM."
        },
        {
        type: "car",
        icon: "🚗",
        time: "4:00 PM",
        duration: "",
        title: "Collect South Island rental car",
        desc: "Car rental from 14–23 Sep, total cost NZ$1178.95."
        },
        {
        type: "shopping",
        icon: "🛒",
        time: "After car collection",
        duration: "",
        title: "Stock up groceries",
        desc: "Go Pak'nSave or Woolworths near the airport."
        },
        {
        type: "food",
        icon: "🥐",
        time: "Before check-in",
        duration: "",
        title: "FergBaker",
        desc: "Buy breads before heading to the Airbnb."
        },
        {
        type: "hotel",
        icon: "🏡",
        time: "5:00 PM",
        duration: "",
        title: "Check in Airbnb",
        desc: "Settle into Contemporary & Plush - 4 Bedroom House."
        }
    ],

    places: [
        {
        id: "queenstown-airbnb",
        type: "hotel",
        name: "Contemporary & Plush - 4 Bedroom House",
        city: "Queenstown",
        image: "",
        description: "Airbnb stay in Queenstown.",
        rating: "Stay",
        map: "https://maps.app.goo.gl/2eas7JnukB6fVQGcA"
        },
        {
        id: "paknsave-queenstown",
        type: "shopping",
        name: "Pak'nSave or Woolworths",
        city: "Queenstown",
        image: "",
        description: "Supermarket near Queenstown Airport.",
        rating: "Shopping",
        map: ""
        },
        {
        id: "fergbaker",
        type: "food",
        name: "FergBaker",
        city: "Queenstown",
        image: "",
        description: "Buy breads before checking in.",
        rating: "Recommended",
        map: ""
        }
    ],

    food: [
        {
        name: "FergBaker",
        note: "Buy breads before checking into the Airbnb.",
        map: ""
        }
    ],

    reminders: [
        "Check out from Wellington early.",
        "Return Wellington rental car by 12:00 PM.",
        "Collect Queenstown rental car at 4:00 PM.",
        "Stock up groceries after collecting the car."
    ],

    notes: [
        "Check out from Wellington early.",
        "Return Wellington rental car by 12:00 PM.",
        "Collect Queenstown rental car at 4:00 PM.",
        "Stock up groceries after collecting the car."
    ]
    },
    {
        day: 6,
        date: "15/9/2026",
        isoDate: "2026-09-15",
        displayDate: "15 Sep 2026",
        weekday: "Tuesday",
        city: "Queenstown",
        title: "Arrowtown and Wanaka",
        summary: "Explore Arrowtown, Crown Range Summit, Wānaka Tree, Puzzling World and optional Wānaka activities.",
        banner: "images/banners/day06-wanaka.png",

        accommodation: {
            name: "Contemporary & Plush - 4 Bedroom House",
            room: "Airbnb",
            checkIn: "Already checked in",
            checkOut: "18 Sep morning",
            map: "https://maps.app.goo.gl/2eas7JnukB6fVQGcA"
        },

        drive: {
            from: "Queenstown",
            to: "Wanaka",
            duration: "Day trip"
        },

        timeline: [
            {
            type: "drive",
            icon: "🚗",
            time: "9:00 AM",
            duration: "",
            title: "Start Wanaka day trip",
            desc: "Route includes Arrowtown, Crown Range Summit, Wānaka Tree, Puzzling World, Lavender Farm and Toy Museum."
            },
            {
            type: "attraction",
            icon: "🏘️",
            time: "Morning",
            duration: "",
            title: "Arrowtown",
            desc: "Explore the historic town."
            },
            {
            type: "attraction",
            icon: "⛰️",
            time: "Along the way",
            duration: "",
            title: "Crown Range Summit",
            desc: "Scenic stop on the way to Wānaka."
            },
            {
            type: "attraction",
            icon: "🌳",
            time: "Afternoon",
            duration: "",
            title: "Wānaka Tree",
            desc: "Visit the famous tree by the lake."
            },
            {
            type: "attraction",
            icon: "🧩",
            time: "Optional",
            duration: "",
            title: "Puzzling World",
            desc: "Paid optional activity."
            },
            {
            type: "attraction",
            icon: "🌿",
            time: "Optional",
            duration: "",
            title: "Wānaka Lavender Farm",
            desc: "Paid optional stop. No lavender in season, but farm animals and lavender products may still be available."
            }
        ],

        places: [
            {
            id: "arrowtown",
            type: "attraction",
            name: "Arrowtown",
            city: "Queenstown",
            image: "",
            description: "Historic town near Queenstown.",
            rating: "Recommended",
            map: ""
            },
            {
            id: "crown-range-summit",
            type: "attraction",
            name: "Crown Range Summit",
            city: "Otago",
            image: "",
            description: "Scenic lookout on the way to Wānaka.",
            rating: "Recommended",
            map: ""
            },
            {
            id: "wanaka-tree",
            type: "attraction",
            name: "Wānaka Tree",
            city: "Wānaka",
            image: "",
            description: "Famous lakeside tree.",
            rating: "Recommended",
            map: "https://maps.app.goo.gl/yVXL2f9hxeaNtcCa6"
            },
            {
            id: "puzzling-world",
            type: "attraction",
            name: "Puzzling World",
            city: "Wānaka",
            image: "",
            description: "Paid optional attraction.",
            rating: "Optional",
            map: "https://www.puzzlingworld.co.nz/"
            },
            {
            id: "wanaka-lavender-farm",
            type: "attraction",
            name: "Wānaka Lavender Farm",
            city: "Wānaka",
            image: "",
            description: "Optional paid farm visit.",
            rating: "Optional",
            map: "https://www.wanakalavenderfarm.com/"
            },
            {
            id: "crossfire-wanaka",
            type: "attraction",
            name: "Crossfire Wanaka",
            city: "Wānaka",
            image: "",
            description: "Optional activities such as archery and rifle range.",
            rating: "Optional",
            map: "https://crossfirewanaka.co.nz/activities/"
            }
        ],

        food: [],

        reminders: [
            "Wānaka Lavender Farm is optional and paid.",
            "Puzzling World is optional and paid.",
            "Crossfire Wanaka is optional.",
            "Lavender may not be visible in September, but animals and shop may still be available."
        ],

        notes: [
            "Wānaka Lavender Farm is optional and paid.",
            "Puzzling World is optional and paid.",
            "Crossfire Wanaka is optional.",
            "Lavender may not be visible in September, but animals and shop may still be available."
        ]
        },
        {
        day: 7,
        date: "16/9/2026",
        isoDate: "2026-09-16",
        displayDate: "16 Sep 2026",
        weekday: "Wednesday",
        city: "Queenstown",
        title: "Blue Pools and Thunder Creek Falls",
        summary: "Start early for a long scenic day trip to Blue Pools and Thunder Creek Falls.",
        banner: "images/banners/day07-blue-pools.png",

        accommodation: {
            name: "Contemporary & Plush - 4 Bedroom House",
            room: "Airbnb",
            checkIn: "Already checked in",
            checkOut: "18 Sep morning",
            map: "https://maps.app.goo.gl/2eas7JnukB6fVQGcA"
        },

        drive: {
            from: "Queenstown",
            to: "Thunder Creek Falls",
            duration: "Long day trip"
        },

        timeline: [
            {
            type: "drive",
            icon: "🚗",
            time: "8:30 AM",
            duration: "Long drive",
            title: "Start early",
            desc: "Best to start before 9:00 AM. Bring your own food."
            },
            {
            type: "attraction",
            icon: "💙",
            time: "Day trip",
            duration: "",
            title: "Blue Pools",
            desc: "Scenic stop on the day trip route."
            },
            {
            type: "food",
            icon: "☕",
            time: "Break",
            duration: "",
            title: "Makarora Gas Station",
            desc: "Coffee and toilet break."
            },
            {
            type: "attraction",
            icon: "💦",
            time: "Afternoon",
            duration: "",
            title: "Thunder Creek Falls",
            desc: "Waterfall stop, around 3 hours drive from Queenstown."
            }
        ],

        places: [
            {
            id: "blue-pools",
            type: "attraction",
            name: "Blue Pools",
            city: "Makarora",
            image: "",
            description: "Scenic blue water pools.",
            rating: "Recommended",
            map: "https://maps.app.goo.gl/GSLZzPDpYmtdiCPD6"
            },
            {
            id: "makarora-gas-station",
            type: "cafe",
            name: "Makarora Gas Station",
            city: "Makarora",
            image: "",
            description: "Coffee and toilet break stop.",
            rating: "Break Stop",
            map: ""
            },
            {
            id: "thunder-creek-falls",
            type: "attraction",
            name: "Thunder Creek Falls",
            city: "Haast Pass",
            image: "",
            description: "Waterfall stop during the long day trip.",
            rating: "Recommended",
            map: ""
            }
        ],

        food: [],

        reminders: [
            "Start early, ideally before 9:00 AM.",
            "Bring your own food for the long drive.",
            "Use Makarora Gas Station for coffee and toilet break."
        ],

        notes: [
            "Start early, ideally before 9:00 AM.",
            "Bring your own food for the long drive.",
            "Use Makarora Gas Station for coffee and toilet break."
        ]
        },
        {
        day: 8,
        date: "17/9/2026",
        isoDate: "2026-09-17",
        displayDate: "17 Sep 2026",
        weekday: "Thursday",
        city: "Queenstown",
        title: "Glenorchy Day",
        summary: "Visit Glenorchy lakefront, the red boat shed, the scenic walkway, cafés and local shops.",
        banner: "images/banners/day08-glenorchy.png",

        accommodation: {
            name: "Contemporary & Plush - 4 Bedroom House",
            room: "Airbnb",
            checkIn: "Already checked in",
            checkOut: "Next morning",
            map: "https://maps.app.goo.gl/2eas7JnukB6fVQGcA"
        },

        drive: {
            from: "Queenstown",
            to: "Glenorchy",
            duration: "Day trip"
        },

        timeline: [
            {
            type: "drive",
            icon: "🚗",
            time: "9:00 AM",
            duration: "",
            title: "Drive to Glenorchy",
            desc: "Visit Glenorchy and do a scenic walk."
            },
            {
            type: "attraction",
            icon: "🌊",
            time: "Morning",
            duration: "",
            title: "Glenorchy Lakefront and Red Boat Shed",
            desc: "Visit the lakefront and red boat shed."
            },
            {
            type: "attraction",
            icon: "🚶",
            time: "Late morning",
            duration: "1–1.5 hrs",
            title: "Glenorchy Lagoon Scenic Walkway",
            desc: "Easy scenic loop walk."
            },
            {
            type: "cafe",
            icon: "☕",
            time: "Lunch / Break",
            duration: "",
            title: "Mrs Glen's Cafe",
            desc: "Cafe stop in Glenorchy."
            },
            {
            type: "shopping",
            icon: "🛍️",
            time: "Afternoon",
            duration: "",
            title: "Mrs Woolly's General Store",
            desc: "Local shop stop before returning."
            },
            {
            type: "drive",
            icon: "🚗",
            time: "Afternoon",
            duration: "",
            title: "Return to Queenstown",
            desc: "Drive back to Queenstown downtown to shop."
            }
        ],

        places: [
            {
            id: "glenorchy",
            type: "attraction",
            name: "Glenorchy",
            city: "Glenorchy",
            image: "",
            description: "Scenic town near Queenstown with lakefront views.",
            rating: "Recommended",
            map: "https://maps.app.goo.gl/2gddduanfJSJH5Gs7"
            },
            {
            id: "glenorchy-lakefront",
            type: "attraction",
            name: "Glenorchy Lakefront",
            city: "Glenorchy",
            image: "",
            description: "Lakefront and red boat shed.",
            rating: "Recommended",
            map: ""
            },
            {
            id: "glenorchy-lagoon-walkway",
            type: "attraction",
            name: "Glenorchy Lagoon Scenic Walkway",
            city: "Glenorchy",
            image: "",
            description: "1–1.5 hour scenic loop walk.",
            rating: "Recommended",
            map: ""
            },
            {
            id: "mrs-glens-cafe",
            type: "cafe",
            name: "Mrs Glen's Cafe",
            city: "Glenorchy",
            image: "",
            description: "Cafe stop in Glenorchy.",
            rating: "Recommended",
            map: ""
            },
            {
            id: "mrs-woollys-general-store",
            type: "shopping",
            name: "Mrs Woolly's General Store",
            city: "Glenorchy",
            image: "",
            description: "Local general store.",
            rating: "Recommended",
            map: ""
            }
        ],

        food: [
            {
            name: "Mrs Glen's Cafe",
            note: "Cafe stop in Glenorchy.",
            map: ""
            }
        ],

        reminders: [
            "Glenorchy Lagoon Scenic Walkway takes around 1–1.5 hours.",
            "Allow 1–2 hours for waterfront, café and local shops.",
            "Prepare for Queenstown checkout the next morning.",
            "Clear rubbish and wash utensils before leaving the house."
        ],

        notes: [
            "Glenorchy Lagoon Scenic Walkway takes around 1–1.5 hours.",
            "Allow 1–2 hours for waterfront, café and local shops.",
            "Prepare for Queenstown checkout the next morning.",
            "Clear rubbish and wash utensils before leaving the house."
        ]
        },
        {
    day: 9,
    date: "18/9/2026",
    isoDate: "2026-09-18",
    displayDate: "18 Sep 2026",
    weekday: "Friday",
    city: "Twizel",
    title: "Queenstown to Twizel",
    summary: "Check out from Queenstown and drive to Twizel with stops at Cromwell, Highlands and Lake Pukaki.",
    banner: "images/banners/day09-twizel.png",

    accommodation: {
        name: "Alps Motel",
        room: "Premium Studio Apartment",
        checkIn: "Afternoon",
        checkOut: "20 Sep morning",
        map: "https://maps.app.goo.gl/JuC28tuTCS3eMmbR6"
    },

    drive: {
        from: "Queenstown",
        to: "Twizel",
        duration: "2.5 hrs"
    },

    timeline: [
        {
        type: "hotel",
        icon: "🚪",
        time: "8:30 AM",
        duration: "",
        title: "Check out from Queenstown",
        desc: "Clear rubbish and wash utensils before leaving."
        },
        {
        type: "drive",
        icon: "🚗",
        time: "9:00 AM",
        duration: "2.5 hrs",
        title: "Drive from Queenstown to Twizel",
        desc: "Drive via Cromwell and scenic stops."
        },
        {
        type: "attraction",
        icon: "🏎️",
        time: "Along the way",
        duration: "",
        title: "Highlands Motorsport Museum",
        desc: "Optional stop at Highlands Motorsport Park / National Motorsport Museum."
        },
        {
        type: "attraction",
        icon: "🏘️",
        time: "Along the way",
        duration: "",
        title: "Cromwell Heritage Precinct",
        desc: "Stop by Cromwell town and heritage precinct."
        },
        {
        type: "attraction",
        icon: "🌊",
        time: "If time allows",
        duration: "",
        title: "Lake Tekapo / Lake Pukaki Viewpoint",
        desc: "If you reach Twizel early, maybe drive to Lake Tekapo and pass by Lake Pukaki viewpoint."
        }
    ],

    places: [
        {
        id: "alps-motel",
        type: "hotel",
        name: "Alps Motel",
        city: "Twizel",
        image: "",
        description: "Premium Studio Apartment for two nights.",
        rating: "Stay",
        map: "https://maps.app.goo.gl/JuC28tuTCS3eMmbR6"
        },
        {
        id: "highlands-motorsport-museum",
        type: "attraction",
        name: "Highlands National Motorsport Museum",
        city: "Cromwell",
        image: "",
        description: "Motorsport museum and go-kart stop.",
        rating: "Optional",
        map: "https://www.highlands.co.nz/highlands-museum"
        },
        {
        id: "cromwell-heritage-precinct",
        type: "attraction",
        name: "Cromwell Heritage Precinct",
        city: "Cromwell",
        image: "",
        description: "Historic precinct stop on the way to Twizel.",
        rating: "Recommended",
        map: ""
        },
        {
        id: "lake-pukaki-viewpoint",
        type: "attraction",
        name: "Lake Pukaki Viewpoint",
        city: "Mackenzie",
        image: "",
        description: "Scenic viewpoint near Twizel.",
        rating: "If Time",
        map: ""
        },
        {
        id: "lake-tekapo",
        type: "attraction",
        name: "Lake Tekapo",
        city: "Tekapo",
        image: "",
        description: "Optional visit if reaching Twizel early.",
        rating: "If Time",
        map: "https://maps.app.goo.gl/xXK7GcYMERefCGXj8"
        }
    ],

    food: [],

    reminders: [
        "Check out from Queenstown around 8:30 AM to 9:00 AM.",
        "Clear all rubbish and wash all utensils before leaving the house.",
        "Drop by Cromwell town on the way to Twizel.",
        "If reaching Twizel early, consider Lake Tekapo on the same day."
    ],

    notes: [
        "Check out from Queenstown around 8:30 AM to 9:00 AM.",
        "Clear all rubbish and wash all utensils before leaving the house.",
        "Drop by Cromwell town on the way to Twizel.",
        "If reaching Twizel early, consider Lake Tekapo on the same day."
    ]
    },
    {
    day: 10,
    date: "19/9/2026",
    isoDate: "2026-09-19",
    displayDate: "19 Sep 2026",
    weekday: "Saturday",
    city: "Twizel",
    title: "Hooker Valley and Lake Tekapo",
    summary: "Start very early for Hooker Valley Walk, Kea Point and Lake Tekapo.",
    banner: "images/banners/day10-hooker-valley.png",

    accommodation: {
        name: "Alps Motel",
        room: "Premium Studio Apartment",
        checkIn: "Already checked in",
        checkOut: "20 Sep morning",
        map: "https://maps.app.goo.gl/JuC28tuTCS3eMmbR6"
    },

    drive: {
        from: "Twizel",
        to: "Hooker Valley Track",
        duration: "Early morning drive"
    },

    timeline: [
        {
        type: "drive",
        icon: "🚗",
        time: "6:00 AM",
        duration: "",
        title: "Leave early for Hooker Valley",
        desc: "Best to leave around 6:00 AM and reach around 7:00 AM. It may be crowded if late."
        },
        {
        type: "hike",
        icon: "🥾",
        time: "Morning",
        duration: "10 km",
        title: "Hooker Valley Walk",
        desc: "Main hiking activity of the day."
        },
        {
        type: "hike",
        icon: "🏔️",
        time: "After Hooker Valley",
        duration: "2.8 km",
        title: "Kea Point",
        desc: "Easy and short route after Hooker Valley."
        },
        {
        type: "attraction",
        icon: "🌊",
        time: "After hike",
        duration: "",
        title: "Lake Tekapo",
        desc: "Go Lake Tekapo after Hooker Valley."
        }
    ],

    places: [
        {
        id: "hooker-valley-track",
        type: "attraction",
        name: "Hooker Valley Track",
        city: "Aoraki / Mount Cook",
        image: "",
        description: "10 km walk and one of the main highlights of the trip.",
        rating: "Must Visit",
        map: "https://maps.app.goo.gl/vAqS8Y4xwqw3dQ976"
        },
        {
        id: "kea-point",
        type: "attraction",
        name: "Kea Point",
        city: "Aoraki / Mount Cook",
        image: "",
        description: "Short and easy walk after Hooker Valley.",
        rating: "Recommended",
        map: ""
        },
        {
        id: "lake-tekapo-day10",
        type: "attraction",
        name: "Lake Tekapo",
        city: "Tekapo",
        image: "",
        description: "Visit after Hooker Valley and Kea Point.",
        rating: "Recommended",
        map: "https://maps.app.goo.gl/XrjYebZeGsAj5YyP7"
        }
    ],

    food: [],

    reminders: [
        "Best to leave around 6:00 AM and reach around 7:00 AM.",
        "It will be crowded if late and many cars arrive.",
        "Bring your own food such as sandwich and bread.",
        "After Hooker Valley, walk Kea Point if energy allows."
    ],

    notes: [
        "Best to leave around 6:00 AM and reach around 7:00 AM.",
        "It will be crowded if late and many cars arrive.",
        "Bring your own food such as sandwich and bread.",
        "After Hooker Valley, walk Kea Point if energy allows."
    ]
    },
    {
    day: 11,
    date: "20/9/2026",
    isoDate: "2026-09-20",
    displayDate: "20 Sep 2026",
    weekday: "Sunday",
    city: "Christchurch",
    title: "Twizel to Christchurch",
    summary: "Check out from Twizel and drive to Christchurch via Rakaia Gorge, Fairlie and Geraldine.",
    banner: "images/banners/day11-christchurch.png",

    accommodation: {
        name: "Quest On Manchester",
        room: "Two Bedroom Interconnecting",
        checkIn: "Afternoon",
        checkOut: "23 Sep morning",
        map: "https://maps.app.goo.gl/Pbdjjqu6aCmG5ieV7"
    },

    drive: {
        from: "Twizel",
        to: "Christchurch",
        duration: "4 hrs"
    },

    timeline: [
        {
        type: "hotel",
        icon: "🚪",
        time: "8:30 AM",
        duration: "",
        title: "Check out from Twizel",
        desc: "Start the drive towards Christchurch."
        },
        {
        type: "drive",
        icon: "🚗",
        time: "Morning",
        duration: "4 hrs",
        title: "Drive to Christchurch",
        desc: "Drive to Rakaia Gorge before heading to Christchurch."
        },
        {
        type: "food",
        icon: "🥧",
        time: "First break",
        duration: "",
        title: "Fairlie Bakehouse",
        desc: "First break stop during the drive."
        },
        {
        type: "food",
        icon: "🛒",
        time: "Along the way",
        duration: "",
        title: "Barker's Foodstore at Geraldine",
        desc: "Drop by Barker's Foodstore before continuing."
        },
        {
        type: "attraction",
        icon: "🌉",
        time: "Along the way",
        duration: "",
        title: "Rakaia Gorge",
        desc: "Take another route to Rakaia Gorge, avoiding the Ashburton route."
        }
    ],

    places: [
        {
        id: "quest-on-manchester",
        type: "hotel",
        name: "Quest On Manchester",
        city: "Christchurch",
        image: "",
        description: "Two Bedroom Interconnecting accommodation in Christchurch.",
        rating: "Stay",
        map: "https://maps.app.goo.gl/Pbdjjqu6aCmG5ieV7"
        },
        {
        id: "fairlie-bakehouse",
        type: "food",
        name: "Fairlie Bakehouse",
        city: "Fairlie",
        image: "",
        description: "First break stop during the drive.",
        rating: "Recommended",
        map: ""
        },
        {
        id: "barkers-foodstore",
        type: "food",
        name: "Barker's Foodstore",
        city: "Geraldine",
        image: "",
        description: "Foodstore stop at Geraldine.",
        rating: "Recommended",
        map: ""
        },
        {
        id: "rakaia-gorge",
        type: "attraction",
        name: "Rakaia Gorge",
        city: "Canterbury",
        image: "",
        description: "Scenic gorge route before Christchurch.",
        rating: "Recommended",
        map: ""
        }
    ],

    food: [
        {
        name: "Fairlie Bakehouse",
        note: "First break during the drive.",
        map: ""
        },
        {
        name: "Barker's Foodstore",
        note: "Stop at Geraldine.",
        map: ""
        }
    ],

    reminders: [
        "Check out from Twizel around 8:30 AM.",
        "Drive to Rakaia Gorge before heading to Christchurch.",
        "First break at Fairlie Bakehouse.",
        "Drop by Barker's Foodstore at Geraldine.",
        "Take another route to Rakaia Gorge and avoid Ashburton route."
    ],

    notes: [
        "Check out from Twizel around 8:30 AM.",
        "Drive to Rakaia Gorge before heading to Christchurch.",
        "First break at Fairlie Bakehouse.",
        "Drop by Barker's Foodstore at Geraldine.",
        "Take another route to Rakaia Gorge and avoid Ashburton route."
    ]
    },
    {
    day: 12,
    date: "21/9/2026",
    isoDate: "2026-09-21",
    displayDate: "21 Sep 2026",
    weekday: "Monday",
    city: "Christchurch",
    title: "Castle Hill and Arthur's Pass",
    summary: "Drive from Christchurch to Castle Hill, Arthur's Pass and Otira Viaduct Lookout, with garden options if time allows.",
    banner: "images/banners/day12-arthurs-pass.png",

    accommodation: {
        name: "Quest On Manchester",
        room: "Two Bedroom Interconnecting",
        checkIn: "Already checked in",
        checkOut: "23 Sep morning",
        map: "https://maps.app.goo.gl/Pbdjjqu6aCmG5ieV7"
    },

    drive: {
        from: "Christchurch",
        to: "Arthur's Pass",
        duration: "Day trip"
    },

    timeline: [
        {
        type: "drive",
        icon: "🚗",
        time: "8:30 AM",
        duration: "",
        title: "Drive to Castle Hill and Arthur's Pass",
        desc: "Route includes Castle Hill, Arthur's Pass and Otira Viaduct Lookout."
        },
        {
        type: "attraction",
        icon: "🪨",
        time: "Morning",
        duration: "",
        title: "Castle Hill",
        desc: "Scenic rock formation stop."
        },
        {
        type: "attraction",
        icon: "🏔️",
        time: "Midday",
        duration: "",
        title: "Arthur's Pass",
        desc: "Arthur's Pass Village has cafés if needed."
        },
        {
        type: "attraction",
        icon: "🌉",
        time: "Afternoon",
        duration: "",
        title: "Otira Viaduct Lookout",
        desc: "Scenic lookout stop."
        },
        {
        type: "attraction",
        icon: "🌸",
        time: "Either day",
        duration: "",
        title: "Hagley Park / Botanic Garden",
        desc: "Optional Christchurch garden visit."
        }
    ],

    places: [
        {
        id: "castle-hill",
        type: "attraction",
        name: "Castle Hill",
        city: "Canterbury",
        image: "",
        description: "Scenic rock formations on the way to Arthur's Pass.",
        rating: "Recommended",
        map: "https://maps.app.goo.gl/FHAGzB5n7MtNDnMJ8"
        },
        {
        id: "arthurs-pass",
        type: "attraction",
        name: "Arthur's Pass",
        city: "Canterbury",
        image: "",
        description: "Mountain village and scenic stop.",
        rating: "Recommended",
        map: ""
        },
        {
        id: "otira-viaduct-lookout",
        type: "attraction",
        name: "Otira Viaduct Lookout",
        city: "Arthur's Pass",
        image: "",
        description: "Scenic lookout point.",
        rating: "Recommended",
        map: ""
        },
        {
        id: "hagley-park",
        type: "attraction",
        name: "Hagley Park",
        city: "Christchurch",
        image: "",
        description: "Optional Christchurch garden stop.",
        rating: "Optional",
        map: ""
        },
        {
        id: "christchurch-botanic-garden",
        type: "attraction",
        name: "Christchurch Botanic Garden",
        city: "Christchurch",
        image: "",
        description: "Optional garden visit.",
        rating: "Optional",
        map: ""
        }
    ],

    food: [],

    reminders: [
        "There is a café in Springfield for the first toilet break.",
        "Arthur's Pass Village has cafés as well.",
        "No need to spend too much time in Arthur's Pass Village.",
        "Pack your own food."
    ],

    notes: [
        "There is a café in Springfield for the first toilet break.",
        "Arthur's Pass Village has cafés as well.",
        "No need to spend too much time in Arthur's Pass Village.",
        "Pack your own food."
    ]
    },
    {
    day: 13,
    date: "22/9/2026",
    isoDate: "2026-09-22",
    displayDate: "22 Sep 2026",
    weekday: "Tuesday",
    city: "Christchurch",
    title: "Akaroa Day Trip",
    summary: "Spend the day exploring Akaroa before returning to Christchurch CBD and the Botanic Garden.",
    banner: "images/banners/day13-akaroa.png",

    accommodation: {
        name: "Quest On Manchester",
        room: "Two Bedroom Interconnecting",
        checkIn: "Already checked in",
        checkOut: "23 Sep morning",
        map: "https://maps.app.goo.gl/Pbdjjqu6aCmG5ieV7"
    },

    drive: {
        from: "Christchurch",
        to: "Akaroa",
        duration: "Day trip"
    },

    timeline: [
        {
        type: "drive",
        icon: "🚗",
        time: "9:00 AM",
        duration: "",
        title: "Drive to Akaroa",
        desc: "Scenic drive from Christchurch to Akaroa."
        },
        {
        type: "attraction",
        icon: "⚓",
        time: "Morning",
        duration: "",
        title: "Explore Akaroa",
        desc: "Walk around the harbour, cafés and waterfront."
        },
        {
        type: "drive",
        icon: "🚗",
        time: "Afternoon",
        duration: "",
        title: "Return to Christchurch",
        desc: "Head back to Christchurch CBD."
        },
        {
        type: "attraction",
        icon: "🌸",
        time: "Evening",
        duration: "",
        title: "Christchurch Botanic Garden / Hagley Park",
        desc: "Look out for cherry blossoms before the final night."
        }
    ],

    places: [
        {
        id: "akaroa",
        type: "attraction",
        name: "Akaroa",
        city: "Akaroa",
        image: "",
        description: "French-inspired seaside town.",
        rating: "Must Visit",
        map: "https://maps.app.goo.gl/UL6vyjkqykzcp54Q6"
        },
        {
        id: "christchurch-cbd",
        type: "attraction",
        name: "Christchurch CBD",
        city: "Christchurch",
        image: "",
        description: "Explore the city centre before your final day.",
        rating: "Recommended",
        map: ""
        },
        {
        id: "botanic-garden-final",
        type: "attraction",
        name: "Christchurch Botanic Garden",
        city: "Christchurch",
        image: "",
        description: "See the spring flowers and cherry blossoms.",
        rating: "Recommended",
        map: ""
        }
    ],

    food: [],

    reminders: [
        "Enjoy your final full day in New Zealand.",
        "Return to Christchurch before evening.",
        "Prepare luggage for tomorrow's flight."
    ],

    notes: [
        "Enjoy your final full day in New Zealand.",
        "Return to Christchurch before evening.",
        "Prepare luggage for tomorrow's flight."
    ]
    },
    {
    day: 14,
    date: "23/9/2026",
    isoDate: "2026-09-23",
    displayDate: "23 Sep 2026",
    weekday: "Wednesday",
    city: "Christchurch",
    title: "Return to Singapore",
    summary: "Check out, return the rental car and fly home to Singapore.",
    banner: "images/banners/day14-home.png",

    accommodation: {
        name: "Quest On Manchester",
        room: "Checkout",
        checkIn: "-",
        checkOut: "7:00 AM",
        map: "https://maps.app.goo.gl/Pbdjjqu6aCmG5ieV7"
    },

    drive: {
        from: "Quest On Manchester",
        to: "Christchurch Airport",
        duration: "30 mins"
    },

    timeline: [
        {
        type: "hotel",
        icon: "🧳",
        time: "7:00 AM",
        duration: "",
        title: "Check out",
        desc: "Leave Quest On Manchester."
        },
        {
        type: "car",
        icon: "🚗",
        time: "Morning",
        duration: "",
        title: "Return rental car",
        desc: "Drop everyone at the airport before returning the car to APEX."
        },
        {
        type: "flight",
        icon: "✈️",
        time: "10:50 AM",
        duration: "",
        title: "SQ298 to Singapore",
        desc: "Depart Christchurch for Singapore."
        },
        {
        type: "travel",
        icon: "❤️",
        time: "End of Trip",
        duration: "",
        title: "See you next adventure!",
        desc: "Thank you for travelling through New Zealand 🇳🇿"
        }
    ],

    places: [
        {
        id: "christchurch-airport",
        type: "airport",
        name: "Christchurch Airport",
        city: "Christchurch",
        image: "",
        description: "Return rental car and board your flight home.",
        rating: "Departure",
        map: "https://maps.app.goo.gl/opLQ4WTK3pnbGhYn9"
        }
    ],

    food: [],

    reminders: [
        "Check out by 7:00 AM.",
        "Drop everyone at the airport before returning the car.",
        "Allow plenty of time for rental car return and check-in.",
        "Check NZ road conditions before leaving.",
        "Have a safe flight home!"
    ],

    notes: [
        "Check out by 7:00 AM.",
        "Drop everyone at the airport before returning the car.",
        "Allow plenty of time for rental car return and check-in.",
        "Check NZ road conditions before leaving.",
        "https://www.journeys.nzta.govt.nz/highway-conditions"
    ]
    }
  ]
};