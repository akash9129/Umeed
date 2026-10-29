// Central Configuration for Umeed Ki Kiran Foundation
export const SITE_CONFIG = {
  org: {
    name: "Umeed Ki Kiran Foundation",
    hindiName: "उम्मीद की किरण फाउंडेशन",
    tagline: "Spreading Joy & Hope",
    hindiTagline: "खुशियाँ बाँटिए, उम्मीद जगाइए",
    trustDeedDate: "29 October 2025",
    pan: "AABTU5801C",
    location: "Varanasi, Uttar Pradesh, India",
    address: "B-21/118, Kamachha, Varanasi, Uttar Pradesh - 221010",
    phone: "+91 91616 43671",
    whatsapp: "919161643671",
    email: "contact@umeedkikiran.org",
    registrationNo: "IV-1029/2025",
    ngoDarpanId: "UP/2025/0548123",
    bankDetails: {
      accountName: "Umeed Ki Kiran Foundation",
      accountNumber: "42109823412",
      ifscCode: "SBIN0000211",
      bankName: "State Bank of India, Main Branch Varanasi",
      upiId: "9161643671@upi"
    }
  },
  social: {
    facebook: "https://facebook.com/umeedkikiran",
    instagram: "https://instagram.com/umeedkikiran",
    youtube: "https://youtube.com/@umeedkikiran",
    twitter: "https://twitter.com/umeedkikiran"
  },
  // All 10 Distinct Causes with Dedicated, Non-Repeating Authentic Varanasi Photos
  causePackages: [
    {
      id: "pkg-edu-kit",
      number: 1,
      title: "Education Kit — ₹50 per child",
      unitTitle: "Education Kit",
      category: "Child Education",
      unitPrice: 50,
      unitLabel: "per child",
      headline: "A basic educational kit to support children's daily studies",
      description: "Providing essential foundational learning tools to underprivileged children across slum clusters in Varanasi.",
      inclusions: [
        "3-in-1 notebook or combined notebook",
        "Pencil",
        "Eraser",
        "Sharpener",
        "Scale (ruler)",
        "Other basic stationery items, depending on availability"
      ],
      defaultQty: 10,
      presetQuantities: [5, 10, 20, 50, 100],
      imageUrl: "/images/child_education.jpg",
      badge: "⭐ Core Educational Kit"
    },
    {
      id: "pkg-sanitary-pad",
      number: 2,
      title: "Sanitary Pad Kit — ₹80 per kit",
      unitTitle: "Sanitary Pad Kit",
      category: "Women Health",
      unitPrice: 80,
      unitLabel: "per kit",
      headline: "A menstrual hygiene kit to support girls and women",
      description: "Supporting menstrual health, hygiene, and personal dignity for adolescent girls and women in rural areas.",
      inclusions: [
        "Sanitary pads",
        "Basic hygiene supplies, depending on availability",
        "Menstrual hygiene awareness information, where possible"
      ],
      defaultQty: 10,
      presetQuantities: [5, 10, 25, 50],
      imageUrl: "/images/sanitary_pad.jpg",
      badge: "Health & Hygiene"
    },
    {
      id: "pkg-dog-food",
      number: 3,
      title: "Dog Food — ₹20 per dog",
      unitTitle: "Dog Food",
      category: "Animal Welfare",
      unitPrice: 20,
      unitLabel: "per dog",
      headline: "Food distribution to stray and needy dogs",
      description: "Daily feeding drive ensuring street dogs across Varanasi ghats receive nutritious food and clean drinking water.",
      inclusions: [
        "Dog food or suitable animal food",
        "Feeding support for one dog",
        "Clean drinking water, where possible"
      ],
      defaultQty: 10,
      presetQuantities: [5, 10, 25, 50, 100],
      imageUrl: "/images/dog_food.jpg",
      badge: "🐾 Animal Care"
    },
    {
      id: "pkg-medicine-kit",
      number: 4,
      title: "Medicine Kit — ₹149 per kit",
      unitTitle: "Medicine Kit",
      category: "Healthcare",
      unitPrice: 149,
      unitLabel: "per kit",
      headline: "A basic first-aid and healthcare support kit",
      description: "Essential first-aid and medical care supplies for immediate treatment of injuries and minor health needs.",
      inclusions: [
        "Bandages and gauze",
        "Cotton",
        "Antiseptic supplies",
        "Medical tape",
        "Other basic first-aid materials, depending on the final kit"
      ],
      defaultQty: 5,
      presetQuantities: [1, 2, 5, 10, 25],
      imageUrl: "/images/medicine_kit.jpg",
      badge: "Emergency First-Aid"
    },
    {
      id: "pkg-school-bag",
      number: 5,
      title: "School Bag — ₹300 per child",
      unitTitle: "School Bag",
      category: "Child Education",
      unitPrice: 300,
      unitLabel: "per child",
      headline: "A school bag to help children carry their study materials",
      description: "Durable school bags helping children carry their books and supplies safely, proudly, and with self-respect.",
      inclusions: [
        "One school bag",
        "Storage space for books and notebooks",
        "Compartments for stationery and other school essentials"
      ],
      defaultQty: 3,
      presetQuantities: [1, 2, 5, 10, 20],
      imageUrl: "/images/children_group.jpg",
      badge: "School Pride"
    },
    {
      id: "pkg-tuition",
      number: 6,
      title: "Tuition Fees — ₹1,000 per child monthly",
      unitTitle: "Monthly Tuition",
      category: "Child Education",
      unitPrice: 1000,
      unitLabel: "per child / mo",
      headline: "Educational support to improve children's learning",
      description: "Remedial teaching, academic mentoring, and daily homework support for first-generation school learners.",
      inclusions: [
        "Tuition or coaching fee assistance",
        "Homework support",
        "Help with basic academic subjects",
        "Regular learning and academic guidance"
      ],
      defaultQty: 1,
      presetQuantities: [1, 2, 3, 5, 10],
      imageUrl: "/images/tuition_class.jpg",
      badge: "Academic Mentoring"
    },
    {
      id: "pkg-cow-food",
      number: 7,
      title: "Cow Food (Gau Seva) — ₹200",
      unitTitle: "Cow Food",
      category: "Animal Welfare",
      unitPrice: 200,
      unitLabel: "per cow",
      headline: "Feeding support for cows to provide suitable nutrition",
      description: "Supplying wholesome green fodder, grass, and nutritious cattle feed to stray and sheltered cows in Varanasi.",
      inclusions: [
        "Green fodder or grass",
        "Dry fodder or hay",
        "Other suitable cattle feed, depending on availability",
        "Clean drinking water, where possible"
      ],
      defaultQty: 5,
      presetQuantities: [1, 2, 5, 10, 20],
      imageUrl: "/images/animal_gau_seva.jpg",
      badge: "Gau Seva"
    },
    {
      id: "pkg-restaurant-feast",
      number: 8,
      title: "Restaurant Food Distribution — Normal: ₹10,000 / Grand: ₹20,000",
      unitTitle: "Restaurant Food Distribution",
      category: "Celebration Special",
      unitPrice: 10000,
      unitLabel: "feast",
      plans: [
        { name: "Normal Plan", price: 10000, kids: 25, label: "25 Children (₹10,000)" },
        { name: "Grand Plan", price: 20000, kids: 60, label: "60 Children (₹20,000)" }
      ],
      headline: "Restaurant-prepared meals for 25 or 60 children with personalized banner & video",
      description: "Celebrate your birthday or anniversary by sponsoring fresh restaurant meals for underprivileged children in Varanasi.",
      inclusions: [
        "Restaurant-prepared fresh meals (25 or 60 children)",
        "Food distribution & clean table serving arrangements",
        "Personalized banner with donor's photo & name",
        "Cake cutting & children's prayer blessings",
        "Guaranteed Full HD WhatsApp video proof within 24 hours"
      ],
      defaultQty: 1,
      presetQuantities: [1],
      imageUrl: "/images/restaurant_feast.jpg",
      badge: "🎉 Birthday & Anniversary Special"
    },
    {
      id: "pkg-food-packet",
      number: 9,
      title: "Food Packets — ₹25 per packet",
      unitTitle: "Food Packet",
      category: "Hunger Relief",
      unitPrice: 25,
      unitLabel: "per packet",
      headline: "A basic food packet for children and people in need",
      description: "Freshly packed meals distributed to daily wagers, patients, and hungry children at railway stations and roadsides.",
      inclusions: [
        "Basic meal or snack",
        "Hygienic packed food box",
        "Immediate hunger relief on ground"
      ],
      defaultQty: 20,
      presetQuantities: [10, 20, 40, 100, 200],
      imageUrl: "/images/food_packets.jpg",
      badge: "Hunger Relief"
    },
    {
      id: "pkg-thali",
      number: 10,
      title: "THALI Meal — ₹80 per packet / plate",
      unitTitle: "THALI Meal",
      category: "Hunger Relief",
      unitPrice: 80,
      unitLabel: "per thali",
      headline: "A complete wholesome meal for people in need",
      description: "Warm, fresh, full-course meal served with dignity to hospital attendants, elderly destitute, and hungry children.",
      inclusions: [
        "Basic meal or snack",
        "Rice, roti or another food item, depending on the menu",
        "Accompaniment, where included",
        "Drinking water, if included in the budget"
      ],
      defaultQty: 10,
      presetQuantities: [5, 10, 25, 50, 100],
      imageUrl: "/images/elderly_meal.jpg",
      badge: "Annapurna Rasoi"
    }
  ]
};
