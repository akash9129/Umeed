import React, { createContext, useContext, useState, useEffect } from 'react';
import { initialCampaigns, initialDonations, initialVolunteers } from '../lib/mockData';
import { SITE_CONFIG } from '../lib/config';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import confetti from 'canvas-confetti';

const DonationContext = createContext();

export const DonationProvider = ({ children }) => {
  const [campaigns, setCampaigns] = useState(() => {
    const saved = localStorage.getItem('umeed_campaigns');
    return saved ? JSON.parse(saved) : initialCampaigns;
  });

  const [donations, setDonations] = useState(() => {
    const saved = localStorage.getItem('umeed_donations');
    return saved ? JSON.parse(saved) : initialDonations;
  });

  const [volunteers, setVolunteers] = useState(() => {
    const saved = localStorage.getItem('umeed_volunteers');
    return saved ? JSON.parse(saved) : initialVolunteers;
  });

  const [contactMessages, setContactMessages] = useState(() => {
    const saved = localStorage.getItem('umeed_messages');
    return saved ? JSON.parse(saved) : [
      {
        id: "MSG-01",
        name: "Rahul Srivastava",
        email: "rahul.s@example.com",
        phone: "+91 94150 12345",
        subject: "Wants to partner for food distribution in Assi Ghat",
        message: "Namaste team, we run a local bakery and would love to donate 100 fresh buns every Sunday.",
        status: "Unread",
        created_at: "2026-03-27 10:15"
      }
    ];
  });

  // Global Seva Basket: { [packageId]: quantity }
  const [basket, setBasket] = useState(() => {
    const saved = localStorage.getItem('umeed_basket');
    return saved ? JSON.parse(saved) : {
      'pkg-edu-kit': 5,
      'pkg-dog-food': 10
    };
  });

  // Modal states
  const [isDonateModalOpen, setIsDonateModalOpen] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [modalPresetAmount, setModalPresetAmount] = useState(1500);
  const [basketCheckoutMode, setBasketCheckoutMode] = useState(false);

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isVolunteerModalOpen, setIsVolunteerModalOpen] = useState(false);
  const [lastDonationSuccess, setLastDonationSuccess] = useState(null);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('umeed_campaigns', JSON.stringify(campaigns));
  }, [campaigns]);

  useEffect(() => {
    localStorage.setItem('umeed_donations', JSON.stringify(donations));
  }, [donations]);

  useEffect(() => {
    localStorage.setItem('umeed_volunteers', JSON.stringify(volunteers));
  }, [volunteers]);

  useEffect(() => {
    localStorage.setItem('umeed_messages', JSON.stringify(contactMessages));
  }, [contactMessages]);

  useEffect(() => {
    localStorage.setItem('umeed_basket', JSON.stringify(basket));
  }, [basket]);

  // Basket helper functions
  const updateBasketQty = (pkgId, newQty) => {
    setBasket(prev => {
      const updated = { ...prev };
      if (newQty <= 0) {
        delete updated[pkgId];
      } else {
        updated[pkgId] = newQty;
      }
      return updated;
    });
  };

  const addToBasket = (pkgId, delta = 1) => {
    setBasket(prev => ({
      ...prev,
      [pkgId]: (prev[pkgId] || 0) + delta
    }));
  };

  const removeFromBasket = (pkgId) => {
    setBasket(prev => {
      const updated = { ...prev };
      delete updated[pkgId];
      return updated;
    });
  };

  const clearBasket = () => {
    setBasket({});
  };

  const getBasketItems = () => {
    const items = [];
    for (const [pkgId, qty] of Object.entries(basket)) {
      if (qty > 0) {
        const pkg = SITE_CONFIG.causePackages.find(p => p.id === pkgId);
        if (pkg) {
          items.push({
            ...pkg,
            quantity: qty,
            totalCost: pkg.unitPrice * qty
          });
        }
      }
    }
    return items;
  };

  const getBasketTotal = () => {
    return getBasketItems().reduce((sum, item) => sum + item.totalCost, 0);
  };

  const getBasketCount = () => {
    return Object.values(basket).reduce((sum, qty) => sum + (qty > 0 ? qty : 0), 0);
  };

  const openDonateModal = (campaign = null, presetAmount = 1500) => {
    setBasketCheckoutMode(false);
    setSelectedCampaign(campaign);
    setModalPresetAmount(presetAmount);
    setIsDonateModalOpen(true);
  };

  const openDonateModalForBasket = () => {
    const total = getBasketTotal();
    if (total <= 0) return;
    setBasketCheckoutMode(true);
    setSelectedCampaign({
      title: 'Umeed Seva Basket (Multi-Item Sponsorship)',
      category: 'Foundation Seva Basket'
    });
    setModalPresetAmount(total);
    setIsDonateModalOpen(true);
  };

  const closeDonateModal = () => {
    setIsDonateModalOpen(false);
    setBasketCheckoutMode(false);
  };

  // Process a donation
  const submitDonation = async (donationData) => {
    const newDonation = {
      id: `DON-${Math.floor(10000 + Math.random() * 90000)}`,
      donor_name: donationData.name,
      donor_email: donationData.email,
      donor_phone: donationData.phone,
      donor_pan: donationData.pan || 'N/A',
      amount: Number(donationData.amount),
      campaign_title: donationData.campaignTitle || 'General Charity & Foundation Fund',
      campaign_id: donationData.campaignId || null,
      payment_method: donationData.paymentMethod || 'UPI Instant',
      status: 'Completed',
      created_at: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })
    };

    setDonations(prev => [newDonation, ...prev]);

    // If basket checkout -> clear basket
    if (basketCheckoutMode) {
      clearBasket();
    }

    // Trigger celebration confetti
    try {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 }
      });
    } catch (e) {}

    setLastDonationSuccess(newDonation);
    return newDonation;
  };

  // Campaign CRUD
  const addCampaign = async (campaignData) => {
    const newCamp = {
      ...campaignData,
      id: `camp-${Date.now()}`,
      raised_amount: Number(campaignData.raised_amount || 0),
      goal_amount: Number(campaignData.goal_amount || 100000),
      donors_count: Number(campaignData.donors_count || 0),
      is_active: true,
      created_at: new Date().toISOString().split('T')[0]
    };
    setCampaigns(prev => [newCamp, ...prev]);
  };

  const updateCampaign = async (id, updatedFields) => {
    setCampaigns(prev => prev.map(c => c.id === id ? { ...c, ...updatedFields } : c));
  };

  const deleteCampaign = async (id) => {
    setCampaigns(prev => prev.filter(c => c.id !== id));
  };

  const submitVolunteer = async (volunteerData) => {
    const newVol = {
      id: `VOL-${Math.floor(100 + Math.random() * 900)}`,
      ...volunteerData,
      status: 'Pending',
      created_at: new Date().toISOString().split('T')[0]
    };
    setVolunteers(prev => [newVol, ...prev]);
    return newVol;
  };

  const updateVolunteerStatus = async (id, newStatus) => {
    setVolunteers(prev => prev.map(v => v.id === id ? { ...v, status: newStatus } : v));
  };

  const submitContactMessage = async (msgData) => {
    const newMsg = {
      id: `MSG-${Math.floor(100 + Math.random() * 900)}`,
      ...msgData,
      status: 'Unread',
      created_at: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })
    };
    setContactMessages(prev => [newMsg, ...prev]);
    return newMsg;
  };

  return (
    <DonationContext.Provider value={{
      campaigns,
      donations,
      volunteers,
      contactMessages,
      basket,
      basketCheckoutMode,
      isDonateModalOpen,
      selectedCampaign,
      modalPresetAmount,
      isAuthModalOpen,
      isVolunteerModalOpen,
      lastDonationSuccess,
      addToBasket,
      updateBasketQty,
      removeFromBasket,
      clearBasket,
      getBasketItems,
      getBasketTotal,
      getBasketCount,
      openDonateModal,
      openDonateModalForBasket,
      closeDonateModal,
      setIsAuthModalOpen,
      setIsVolunteerModalOpen,
      setLastDonationSuccess,
      submitDonation,
      addCampaign,
      updateCampaign,
      deleteCampaign,
      submitVolunteer,
      updateVolunteerStatus,
      submitContactMessage
    }}>
      {children}
    </DonationContext.Provider>
  );
};

export const useDonations = () => useContext(DonationContext);
