/**
 * Umeed Ki Kiran Foundation (Trust)
 * Main JavaScript Controller
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  initStickyHeader();
  initPackagePicker();
  initGoodDeedBasket();
  initFaqAccordion();
  initLazyYouTube();
  initCelebrateBookingForm();
  initDonateCausesFilterAndBasket();
  initGalleryTabsAndLightbox();
  initContactForm();
});

/* --------------------------------------------------------------------------
   1. Mobile Navigation
   -------------------------------------------------------------------------- */
function initMobileNav() {
  const hamburgerBtn = document.querySelector('.hamburger-btn');
  const mobileDrawer = document.querySelector('.mobile-nav-drawer');

  if (!hamburgerBtn || !mobileDrawer) return;

  hamburgerBtn.addEventListener('click', () => {
    const isExpanded = hamburgerBtn.getAttribute('aria-expanded') === 'true';
    hamburgerBtn.setAttribute('aria-expanded', !isExpanded);
    mobileDrawer.classList.toggle('is-open', !isExpanded);
  });

  // Close when clicking mobile link
  mobileDrawer.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburgerBtn.setAttribute('aria-expanded', 'false');
      mobileDrawer.classList.remove('is-open');
    });
  });
}

/* --------------------------------------------------------------------------
   2. Sticky Header Shadow
   -------------------------------------------------------------------------- */
function initStickyHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      header.classList.add('is-scrolled');
    } else {
      header.classList.remove('is-scrolled');
    }
  }, { passive: true });
}

/* --------------------------------------------------------------------------
   3. Interactive Package Picker (Home Page)
   -------------------------------------------------------------------------- */
function initPackagePicker() {
  const packagePicker = document.querySelector('.package-picker');
  if (!packagePicker || !window.SITE_CONFIG) return;

  const tabs = packagePicker.querySelectorAll('.package-tab-btn');
  const titleEl = document.getElementById('pkg-title');
  const priceEl = document.getElementById('pkg-price');
  const packetsEl = document.getElementById('pkg-packets');
  const inclusionsEl = document.getElementById('pkg-inclusions');
  const bookBtn = document.getElementById('pkg-book-btn');
  const waBtn = document.getElementById('pkg-wa-btn');

  function updateView(pkgId) {
    const pkg = window.SITE_CONFIG.packages.find(p => p.id === pkgId) || window.SITE_CONFIG.packages[0];
    if (!pkg) return;

    if (titleEl) titleEl.textContent = `${pkg.name} (${pkg.badge})`;
    if (priceEl) priceEl.textContent = `₹${pkg.price.toLocaleString('en-IN')}`;
    if (packetsEl) packetsEl.textContent = `${pkg.packets} Food Packets`;

    if (inclusionsEl) {
      inclusionsEl.innerHTML = pkg.inclusions.map(inc => `
        <li>
          <span class="tick-icon">✓</span>
          <span>${inc}</span>
        </li>
      `).join('');
    }

    if (bookBtn) {
      bookBtn.href = `celebrate.html?package=${pkg.id}`;
      bookBtn.textContent = `Book for ₹${pkg.price.toLocaleString('en-IN')}`;
    }

    if (waBtn) {
      const msg = encodeURIComponent(`Namaste, I want to book the ${pkg.name} (₹${pkg.price}) for celebrating with children in Varanasi.`);
      waBtn.href = `https://wa.me/${window.SITE_CONFIG.org.whatsapp}?text=${msg}`;
    }
  }

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const pkgId = tab.getAttribute('data-package-id');
      updateView(pkgId);
    });
  });

  // Default to first package
  if (tabs.length > 0) {
    updateView(tabs[0].getAttribute('data-package-id'));
  }
}

/* --------------------------------------------------------------------------
   4. Good-Deed Basket (Home Page & Donate Page)
   -------------------------------------------------------------------------- */
const basketState = {};

function initGoodDeedBasket() {
  const basketContainer = document.querySelector('.good-deed-basket-section');
  if (!basketContainer) return;

  const totalCountEl = document.getElementById('basket-total-count');
  const grandTotalEl = document.getElementById('basket-grand-total');
  const checkoutBtn = document.getElementById('basket-checkout-btn');
  const totalBar = document.querySelector('.basket-total-bar');

  function recalculate() {
    let totalItems = 0;
    let grandTotal = 0;

    Object.keys(basketState).forEach(id => {
      const item = basketState[id];
      if (item && item.qty > 0) {
        totalItems += item.qty;
        grandTotal += item.qty * item.price;
      }
    });

    if (totalCountEl) totalCountEl.textContent = totalItems;
    if (grandTotalEl) grandTotalEl.textContent = `₹${grandTotal.toLocaleString('en-IN')}`;
    if (checkoutBtn) {
      checkoutBtn.textContent = grandTotal > 0 ? `Donate ₹${grandTotal.toLocaleString('en-IN')}` : 'Donate Now';
      checkoutBtn.disabled = grandTotal <= 0;
    }

    if (totalBar) {
      totalBar.style.display = grandTotal > 0 ? 'block' : 'none';
    }
  }

  // Handle + and - clicks
  document.querySelectorAll('.qty-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const card = e.target.closest('[data-cause-id]');
      if (!card) return;

      const causeId = card.getAttribute('data-cause-id');
      const price = parseInt(card.getAttribute('data-price'), 10) || 0;
      const title = card.getAttribute('data-title') || causeId;
      const countEl = card.querySelector('.qty-count');

      if (!basketState[causeId]) {
        basketState[causeId] = { title, price, qty: 0 };
      }

      if (btn.classList.contains('qty-plus')) {
        basketState[causeId].qty += 1;
      } else if (btn.classList.contains('qty-minus') && basketState[causeId].qty > 0) {
        basketState[causeId].qty -= 1;
      }

      if (countEl) countEl.textContent = basketState[causeId].qty;
      recalculate();
    });
  });

  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
      let grandTotal = 0;
      const itemsList = [];
      Object.keys(basketState).forEach(id => {
        const item = basketState[id];
        if (item && item.qty > 0) {
          grandTotal += item.qty * item.price;
          itemsList.push(`${item.title} (x${item.qty})`);
        }
      });

      if (grandTotal <= 0) {
        alert("Please select at least one cause or item.");
        return;
      }

      triggerDonationCheckout({
        amount: grandTotal,
        description: `Donation: ${itemsList.slice(0, 3).join(', ')}${itemsList.length > 3 ? '...' : ''}`
      });
    });
  }
}

/* --------------------------------------------------------------------------
   5. FAQ Accordion
   -------------------------------------------------------------------------- */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');
  if (!faqItems.length) return;

  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');

    if (!question || !answer) return;

    question.addEventListener('click', () => {
      const isOpen = item.classList.contains('is-open');

      // Close all other FAQs in same list
      faqItems.forEach(other => {
        if (other !== item) {
          other.classList.remove('is-open');
          const otherAns = other.querySelector('.faq-answer');
          if (otherAns) otherAns.style.maxHeight = null;
        }
      });

      if (isOpen) {
        item.classList.remove('is-open');
        answer.style.maxHeight = null;
      } else {
        item.classList.add('is-open');
        answer.style.maxHeight = answer.scrollHeight + 30 + 'px';
      }
    });
  });
}

/* --------------------------------------------------------------------------
   6. Lazy YouTube Loader (Thumb + on-tap load)
   -------------------------------------------------------------------------- */
function initLazyYouTube() {
  const lazyVideos = document.querySelectorAll('.lazy-youtube');
  lazyVideos.forEach(container => {
    const videoId = container.getAttribute('data-youtube-id') || 'dQw4w9WgXcQ';
    container.addEventListener('click', () => {
      container.innerHTML = `
        <iframe
          src="https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0"
          title="Celebration Video"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
          style="position:absolute;top:0;left:0;width:100%;height:100%;border-radius:inherit;"
        ></iframe>
      `;
    });
  });
}

/* --------------------------------------------------------------------------
   7. Celebrate With Us Booking Form
   -------------------------------------------------------------------------- */
function initCelebrateBookingForm() {
  const bookingForm = document.getElementById('celebrate-booking-form');
  if (!bookingForm) return;

  const pkgSelect = document.getElementById('booking-package');
  const waSubmitBtn = document.getElementById('btn-book-whatsapp');

  // Pre-select package from URL parameter ?package=grand-party
  const urlParams = new URLSearchParams(window.location.search);
  const pkgParam = urlParams.get('package');
  if (pkgParam && pkgSelect) {
    pkgSelect.value = pkgParam;
  }

  // Pre-select package from cards clicking "Select This Package"
  document.querySelectorAll('[data-select-pkg]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const pkgId = btn.getAttribute('data-select-pkg');
      if (pkgSelect) {
        pkgSelect.value = pkgId;
        pkgSelect.scrollIntoView({ behavior: 'smooth', block: 'center' });
        pkgSelect.focus();
      }
    });
  });

  // Handle "Book on WhatsApp" button
  if (waSubmitBtn) {
    waSubmitBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const name = document.getElementById('booking-name')?.value.trim();
      const phone = document.getElementById('booking-whatsapp')?.value.trim();
      const occasion = document.getElementById('booking-occasion')?.value;
      const celebrateName = document.getElementById('booking-celebrate-name')?.value.trim();
      const date = document.getElementById('booking-date')?.value;
      const selectedPkg = pkgSelect ? pkgSelect.options[pkgSelect.selectedIndex]?.text : '';
      const message = document.getElementById('booking-message')?.value.trim() || 'None';

      if (!name || !phone || !date) {
        alert("Please fill your Name, WhatsApp number, and Celebration Date.");
        return;
      }

      const text = `*New Celebration Booking Request - Varanasi*\n\n` +
        `• *Booked By:* ${name}\n` +
        `• *WhatsApp:* ${phone}\n` +
        `• *Occasion:* ${occasion}\n` +
        `• *Name to Celebrate:* ${celebrateName || name}\n` +
        `• *Celebration Date:* ${date}\n` +
        `• *Package:* ${selectedPkg}\n` +
        `• *Special Message/Banner:* ${message}\n\n` +
        `Please confirm availability for this date.`;

      const waUrl = `https://wa.me/${window.SITE_CONFIG?.org?.whatsapp || '919161643671'}?text=${encodeURIComponent(text)}`;
      window.open(waUrl, '_blank');
    });
  }

  // Handle "Pay & Book" form submission
  bookingForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const pkgId = pkgSelect?.value;
    const pkg = window.SITE_CONFIG?.packages?.find(p => p.id === pkgId) || window.SITE_CONFIG?.packages[0];
    const amount = pkg ? pkg.price : 500;
    const name = document.getElementById('booking-name')?.value.trim();
    const phone = document.getElementById('booking-whatsapp')?.value.trim();

    triggerDonationCheckout({
      amount: amount,
      description: `Celebration Booking: ${pkg.name}`,
      donorName: name,
      donorPhone: phone
    });
  });
}

/* --------------------------------------------------------------------------
   8. Donate Page: Causes Filter, Custom Amount & Checkout
   -------------------------------------------------------------------------- */
function initDonateCausesFilterAndBasket() {
  const chips = document.querySelectorAll('.filter-chip');
  const causeCards = document.querySelectorAll('.cause-card-item');

  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      chips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');

      const filter = chip.getAttribute('data-filter');
      causeCards.forEach(card => {
        const cat = card.getAttribute('data-category');
        if (filter === 'all' || cat === filter) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // Amount preset chips
  const amountChips = document.querySelectorAll('.amount-chip');
  const customAmountInput = document.getElementById('custom-donation-amount');

  amountChips.forEach(chip => {
    chip.addEventListener('click', () => {
      amountChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      const val = chip.getAttribute('data-amount');
      if (customAmountInput) customAmountInput.value = val;
    });
  });

  if (customAmountInput) {
    customAmountInput.addEventListener('input', () => {
      amountChips.forEach(c => c.classList.remove('active'));
    });
  }

  const directDonateForm = document.getElementById('direct-donation-form');
  if (directDonateForm) {
    directDonateForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const amount = parseInt(customAmountInput?.value, 10);
      const name = document.getElementById('donor-name')?.value.trim();
      const phone = document.getElementById('donor-phone')?.value.trim();
      const email = document.getElementById('donor-email')?.value.trim();

      if (!amount || amount < 10) {
        alert("Please enter a valid donation amount (minimum ₹10).");
        return;
      }

      triggerDonationCheckout({
        amount: amount,
        description: `Direct Charitable Donation to Umeed Ki Kiran Foundation`,
        donorName: name,
        donorPhone: phone,
        donorEmail: email
      });
    });
  }
}

/* --------------------------------------------------------------------------
   9. Gallery Tabs & Lightbox
   -------------------------------------------------------------------------- */
function initGalleryTabsAndLightbox() {
  const galleryTabs = document.querySelectorAll('.gallery-tab-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');
  const lightbox = document.getElementById('gallery-lightbox');
  const lightboxTitle = document.getElementById('lightbox-title');
  const lightboxCategory = document.getElementById('lightbox-category');
  const lightboxClose = document.getElementById('lightbox-close');

  if (galleryTabs.length) {
    galleryTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        galleryTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        const filter = tab.getAttribute('data-filter');

        galleryItems.forEach(item => {
          const category = item.getAttribute('data-category');
          if (filter === 'all' || category === filter) {
            item.style.display = 'block';
          } else {
            item.style.display = 'none';
          }
        });
      });
    });
  }

  if (lightbox) {
    galleryItems.forEach(item => {
      item.addEventListener('click', () => {
        const title = item.getAttribute('data-title') || 'Varanasi Drive Photo';
        const category = item.getAttribute('data-category') || 'Celebration';
        if (lightboxTitle) lightboxTitle.textContent = title;
        if (lightboxCategory) lightboxCategory.textContent = category.toUpperCase();
        lightbox.classList.add('is-active');
      });
    });

    if (lightboxClose) {
      lightboxClose.addEventListener('click', () => {
        lightbox.classList.remove('is-active');
      });
    }

    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        lightbox.classList.remove('is-active');
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && lightbox.classList.contains('is-active')) {
        lightbox.classList.remove('is-active');
      }
    });
  }
}

/* --------------------------------------------------------------------------
   10. Contact & Volunteer Forms
   -------------------------------------------------------------------------- */
function initContactForm() {
  const contactForm = document.getElementById('general-contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('contact-name')?.value.trim();
      const phone = document.getElementById('contact-phone')?.value.trim();
      const msg = document.getElementById('contact-message')?.value.trim();

      alert(`Thank you, ${name}! Your message has been received. Our Varanasi team will get in touch on WhatsApp (${phone}) shortly.`);
      contactForm.reset();
    });
  }

  const volunteerForm = document.getElementById('volunteer-form');
  if (volunteerForm) {
    volunteerForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('vol-name')?.value.trim();
      alert(`Thank you, ${name}! We appreciate your willingness to support children in Varanasi. We will reach out to you soon.`);
      volunteerForm.reset();
    });
  }
}

/* --------------------------------------------------------------------------
   11. Razorpay Checkout Flow (Live + Simulation Fallback)
   -------------------------------------------------------------------------- */
function triggerDonationCheckout({ amount, description, donorName, donorPhone, donorEmail }) {
  const key = window.SITE_CONFIG?.payment?.razorpayKeyId || 'rzp_test_placeholder_key';

  // If Razorpay SDK is loaded
  if (typeof Razorpay !== 'undefined' && key && !key.includes('placeholder')) {
    const options = {
      key: key,
      amount: amount * 100, // in paise
      currency: "INR",
      name: "Umeed Ki Kiran Foundation",
      description: description || "Donation / Booking",
      image: "assets/images/logo.svg",
      prefill: {
        name: donorName || "",
        contact: donorPhone || "",
        email: donorEmail || ""
      },
      theme: {
        color: "#F28C28"
      },
      handler: function(response) {
        showThankYouModal({
          paymentId: response.razorpay_payment_id,
          amount: amount
        });
      }
    };
    const rzp = new Razorpay(options);
    rzp.open();
  } else {
    // Graceful simulation modal when placeholder key is used
    const confirmPayment = confirm(
      `[PAYMENT GATEWAY PLACEHOLDER]\n\n` +
      `Amount: ₹${amount.toLocaleString('en-IN')}\n` +
      `Purpose: ${description}\n\n` +
      `In production with your real Razorpay Key (${key}), the Razorpay modal will open here.\n\n` +
      `Click OK to simulate a successful payment and view the Thank You confirmation, or Cancel to open WhatsApp directly.`
    );

    if (confirmPayment) {
      showThankYouModal({
        paymentId: 'PAY_' + Math.random().toString(36).substring(2, 9).toUpperCase(),
        amount: amount
      });
    } else {
      const waMsg = encodeURIComponent(`Namaste, I want to donate ₹${amount} for ${description}. Please share UPI / bank transfer details.`);
      window.open(`https://wa.me/${window.SITE_CONFIG?.org?.whatsapp || '919161643671'}?text=${waMsg}`, '_blank');
    }
  }
}

function showThankYouModal({ paymentId, amount }) {
  const modalHtml = `
    <div id="thankyou-modal" class="lightbox-modal is-active">
      <div class="lightbox-content" style="text-align: center;">
        <div style="width: 60px; height: 60px; border-radius: 50%; background-color: #E7F3EC; color: #2E7D4F; display: inline-flex; align-items: center; justify-content: center; font-size: 2rem; margin-bottom: 1rem;">✓</div>
        <h3 style="margin-bottom: 0.5rem; color: #0F3D3E;">धन्यवाद! Thank You for Your Kindness</h3>
        <p style="font-size: 1.1rem; color: #1C2B2D; margin-bottom: 1rem;">
          Your donation of <strong>₹${amount.toLocaleString('en-IN')}</strong> has been recorded successfully.
        </p>
        <div style="background-color: #F7EFE3; padding: 1rem; border-radius: 12px; margin-bottom: 1.5rem; font-size: 0.9375rem; text-align: left;">
          <p><strong>Trust:</strong> Umeed Ki Kiran Foundation (Reg. 29 Oct 2025)</p>
          <p><strong>PAN:</strong> AABTU5801C · Varanasi, UP</p>
          <p><strong>Transaction Ref:</strong> <code>${paymentId}</code></p>
        </div>
        <p style="font-size: 0.9375rem; color: #5A6B6D; margin-bottom: 1.5rem;">
          You will receive delivery and celebration updates directly on WhatsApp (+91 91616 43671).
        </p>
        <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
          <a href="https://wa.me/${window.SITE_CONFIG?.org?.whatsapp || '919161643671'}?text=Namaste,%20I%20have%20completed%20donation%20ref%20${paymentId}" target="_blank" class="btn btn-whatsapp">
            Notify on WhatsApp
          </a>
          <button onclick="document.getElementById('thankyou-modal').remove()" class="btn btn-secondary">
            Close
          </button>
        </div>
      </div>
    </div>
  `;
  document.body.insertAdjacentHTML('beforeend', modalHtml);
}
