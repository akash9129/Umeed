/**
 * Umeed Ki Kiran Foundation (Trust)
 * Central Configuration File
 *
 * Edit contact details, package pricing, donation causes, and payment keys
 * in this single file. Any updates here automatically sync across the site.
 */

const SITE_CONFIG = {
  // Organisation Details
  org: {
    name: "Umeed Ki Kiran Foundation",
    legalType: "Registered Public Charitable Trust",
    tagline: "Spreading Joy & Hope",
    taglineHindi: "खुशियाँ बाँटिए, उम्मीद जगाइए",
    trustDeedDate: "29 October 2025",
    pan: "AABTU5801C",
    phone: "+91 91616 43671",
    whatsapp: "919161643671",
    location: "Varanasi, Uttar Pradesh",
    // Placeholders for client to fill:
    email: "[PLACEHOLDER: contact@umeedkikiran.org]",
    address: "[PLACEHOLDER: Office Address, Varanasi, Uttar Pradesh - 221001]",
    registrationNo: "[PLACEHOLDER: Trust Reg No. e.g. IV-1234/2025]",
    ngoDarpanId: "[PLACEHOLDER: UP/2025/XXXXXXX]",
    founder: "Kunal Singh",
    founderRole: "Founder / Managing Trustee",
    vicePresident: "Ayush Singh",
    vicePresidentRole: "Vice-President",
    // Bank & UPI Details (Placeholders)
    bankDetails: {
      accountName: "Umeed Ki Kiran Foundation",
      accountNumber: "[PLACEHOLDER: 00000000000000]",
      ifscCode: "[PLACEHOLDER: SBIN000XXXX]",
      bankName: "[PLACEHOLDER: State Bank of India, Main Branch, Varanasi]",
      accountType: "Current Account",
      upiId: "[PLACEHOLDER: umeedkikiran@upi]"
    },
    // Social Links
    social: {
      instagram: "[PLACEHOLDER: https://instagram.com/umeedkikiran]",
      facebook: "[PLACEHOLDER: https://facebook.com/umeedkikiran]",
      youtube: "[PLACEHOLDER: https://youtube.com/@umeedkikiran]"
    }
  },

  // Payment Gateway & API Endpoints
  payment: {
    // Razorpay Test / Live Key
    razorpayKeyId: "rzp_test_placeholder_key",
    currency: "INR",
    // Form submission endpoint (Google Apps Script / Formspree)
    formEndpoint: "[PLACEHOLDER_FORM_ENDPOINT: https://formspree.io/f/your_form_id]"
  },

  // Feature Flags
  features: {
    // STRICT RULE: Keep 80G tax exemption hidden until the certificate is issued
    enable80G: false,
    enableGoogleAnalytics: false,
    googleAnalyticsId: "G-XXXXXXXXXX",
    enableMetaPixel: false,
    metaPixelId: "XXXXXXXXXXXXXXXX"
  },

  // Celebration Packages (Prices & Inclusions)
  packages: [
    {
      id: "basic",
      name: "Basic Plan",
      price: 500,
      packets: 20,
      badge: "Essential",
      shortDesc: "A warm, wholesome celebration meal with 20 children.",
      inclusions: [
        "20 nutritious basic meal packets",
        "Personalized video wishes recorded from children",
        "Well-edited celebration video reel delivered on WhatsApp",
        "Digital appreciation certificate"
      ]
    },
    {
      id: "food-cake",
      name: "Food & Cake",
      price: 1050,
      packets: 20,
      badge: "Sweet Touch",
      shortDesc: "Nutritious meals paired with cake cutting and joyful smiles.",
      inclusions: [
        "20 fresh food packets",
        "Fresh celebratory cake cutting ceremony",
        "Video wishes recorded with name mention",
        "Edited celebration clip shared on WhatsApp",
        "Digital appreciation certificate"
      ]
    },
    {
      id: "mini-party",
      name: "Mini Party",
      price: 1500,
      packets: 30,
      badge: "Popular",
      shortDesc: "Bigger feast with cake, snacks and festive cheer for 30 kids.",
      inclusions: [
        "30 fresh food packets",
        "Delicious cake cutting ceremony",
        "Tasty party snacks for all children",
        "High-definition video wishes from children",
        "Complete event photos & video on WhatsApp",
        "Digital certificate of gratitude"
      ]
    },
    {
      id: "special-party",
      name: "Special Party",
      price: 2500,
      packets: 45,
      badge: "Grand Festive",
      shortDesc: "A vibrant party for 45 children with personalized banner & snacks.",
      inclusions: [
        "45 nutritious food packets",
        "Celebration cake with candle lighting",
        "Assorted fresh party snacks",
        "Personalized digital event banner with your photo/name",
        "Extended video greetings from the children",
        "Curated HD photo gallery & video on WhatsApp"
      ]
    },
    {
      id: "grand-party",
      name: "Grand Party",
      price: 4500,
      packets: 70,
      badge: "Most Loved",
      isFeatured: true,
      shortDesc: "The ultimate celebration feast for 70 children with full treats and custom banner.",
      inclusions: [
        "70 wholesome food packets",
        "Purified drinking water for all",
        "Grand celebration cake",
        "Party snacks, chocolates & cold drinks",
        "Custom printed celebration banner in Varanasi",
        "Full celebration coverage video & photo reel",
        "Live/recorded WhatsApp delivery on the same day"
      ]
    }
  ],

  // Donation Causes (All upfront prices & quantities)
  causes: [
    {
      id: "education-kit",
      title: "Education Kit",
      price: 50,
      unit: "child",
      category: "children",
      categoryLabel: "Children",
      inclusions: "Notebook, pencil, eraser, sharpener, scale, and stationery set",
      imageLabel: "Stationery & Notebooks for Varanasi Students",
      tag: "Education"
    },
    {
      id: "sanitary-kit",
      title: "Sanitary Pad Kit",
      price: 80,
      unit: "kit",
      category: "health",
      categoryLabel: "Health",
      inclusions: "Quality sanitary pads, hygiene supplies & basic awareness guide",
      imageLabel: "Hygiene & Menstrual Care Kit",
      tag: "Women Health"
    },
    {
      id: "dog-food",
      title: "Stray Dog Food & Water",
      price: 20,
      unit: "dog",
      category: "animals",
      categoryLabel: "Animals",
      inclusions: "Nutritious meal & clean drinking water for one stray dog",
      imageLabel: "Feeding Stray Animals in Varanasi Ghats",
      tag: "Animal Care"
    },
    {
      id: "medicine-kit",
      title: "First-Aid Medicine Kit",
      price: 149,
      unit: "kit",
      category: "health",
      categoryLabel: "Health",
      inclusions: "Bandages, sterile gauze, antiseptic liquid, cotton & medical tape",
      imageLabel: "First Aid & Basic Medical Supplies",
      tag: "Medical"
    },
    {
      id: "school-bag",
      title: "Sturdy School Bag",
      price: 300,
      unit: "child",
      category: "children",
      categoryLabel: "Children",
      inclusions: "[CONFIRM inclusions: Durable backpack with bottle holder and compartment]",
      imageLabel: "School Bag for Underprivileged Child",
      tag: "Education"
    },
    {
      id: "tuition-fee",
      title: "Monthly Tuition Support",
      price: 500, // [CONFIRM]
      unit: "child/mo",
      category: "children",
      categoryLabel: "Children",
      inclusions: "Coaching fee, homework support & guidance across basic subjects",
      imageLabel: "Evening Tuition & Learning Center",
      tag: "Monthly Tuition",
      isMonthly: true
    },
    {
      id: "cow-food",
      title: "Gau Seva (Cow Food)",
      price: 200,
      unit: "day / cow",
      category: "animals",
      categoryLabel: "Animals",
      inclusions: "[CONFIRM unit: Fresh green fodder, dry hay, cattle feed & fresh water]",
      imageLabel: "Fodder & Care for Street Cattle",
      tag: "Animal Care"
    },
    {
      id: "restaurant-drive",
      title: "Restaurant Meal Experience",
      price: 10000,
      unit: "25 children",
      category: "food",
      categoryLabel: "Food",
      inclusions: "Dine-in restaurant meal drive for 25 children with respectful table service and photos (Grand option: ₹20,000 for 60 children)",
      imageLabel: "Dine-in Joy Meal for Varanasi Children",
      tag: "Special Drive"
    },
    {
      id: "food-packet",
      title: "Nutritious Food Packet",
      price: 25,
      unit: "packet",
      category: "food",
      categoryLabel: "Food",
      inclusions: "Freshly prepared wholesome basic meal or nutritious snack packet",
      imageLabel: "Fresh Food Distribution Drive",
      tag: "Hunger Relief"
    },
    {
      id: "nutritious-thali",
      title: "Complete Fresh Thali",
      price: 80,
      unit: "thali",
      category: "food",
      categoryLabel: "Food",
      inclusions: "Cooked rice, fresh rotis, dal/curry, seasonal vegetable & mineral water",
      imageLabel: "Wholesome Fresh Thali Meal",
      tag: "Hot Meals"
    }
  ]
};

// Expose on window for global access
if (typeof window !== "undefined") {
  window.SITE_CONFIG = SITE_CONFIG;
}
