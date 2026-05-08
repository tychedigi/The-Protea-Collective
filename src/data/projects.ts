import { BookHeart, Home, Stethoscope, ShieldSession, TreePine, Scale, Users, Building, Lotus, HandHelping } from "lucide-react";
import React from 'react';

export interface Project {
  id: string;
  title: string;
  slug: string;
  category: string;
  shortDescription: string;
  fullDescription: string;
  imageUrl: string;
  goal: number;
  raised: number;
  donors: number;
  icon: string;
}

export const PROJECTS: Project[] = [
  {
    id: "p1",
    slug: "inner-city-rehab-clinic",
    title: "Inner-City Rehab Clinic Setup",
    category: "Rehabilitative Service",
    shortDescription: "Funding the equipment and facility setup for a new physical therapy center in a low-income urban area.",
    fullDescription: "Our new inner-city clinic aims to provide accessible outpatient therapeutic care to those who cannot afford private medical fees. Your donations go directly towards purchasing foundational physical therapy equipment, specialized beds, and securing the initial lease for the facility. By establishing this clinic, we aim to serve over 200 patients weekly, ensuring physical health is not a luxury but a fundamental right.",
    imageUrl: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=2053&auto=format&fit=crop",
    goal: 150000,
    raised: 85400,
    donors: 312,
    icon: "Stethoscope"
  },
  {
    id: "p2",
    slug: "crisis-hotline-expansion",
    title: "24/7 Crisis Hotline Expansion",
    category: "Crisis Intervention",
    shortDescription: "Expanding our suicide prevention hotline to support multiple languages and text-based crisis intervention.",
    fullDescription: "Acute mental health situations require immediate, culturally competent care. This project expands our existing crisis hotline by hiring and training multilingual counselors and implementing a secure text-based intervention platform. This is critical for reaching young adults and non-native speakers who may be hesitant to use traditional phone services during a crisis.",
    imageUrl: "https://images.unsplash.com/photo-1573497620053-ea5300f94f21?q=80&w=2070&auto=format&fit=crop",
    goal: 50000,
    raised: 42100,
    donors: 890,
    icon: "ShieldSession"
  },
  {
    id: "p3",
    slug: "emergency-housing-legal-fund",
    title: "Emergency Eviction Defense Fund",
    category: "Housing Assistance",
    shortDescription: "Providing immediate legal services to families facing sudden and unjust evictions.",
    fullDescription: "Housing retention is the most effective way to prevent homelessness. This fund provides pro-bono legal retention and emergency stipends for families facing imminent, unjust eviction. We partner with local tenant rights lawyers to ensure families have representation in court, keeping them in their homes and providing them with a secure foundation.",
    imageUrl: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=2112&auto=format&fit=crop",
    goal: 75000,
    raised: 20000,
    donors: 150,
    icon: "Scale"
  },
  {
    id: "p4",
    slug: "nature-cure-retreat",
    title: "Nature Cure Retreat Subsidies",
    category: "Rehabilitative Service",
    shortDescription: "Subsidizing holistic outpatient care for severe trauma survivors at our nature cure center.",
    fullDescription: "Healing from profound trauma often requires removing oneself from triggering environments. Our nature cure centers provide outpatient therapeutic care integrating ecotherapy, guided meditation, and somatic healing. This project provides full subsidies for survivors of assault and abuse to attend month-long healing programs, covering their treatment, travel, and meals.",
    imageUrl: "https://images.unsplash.com/photo-1511497584788-876760111969?q=80&w=2532&auto=format&fit=crop",
    goal: 40000,
    raised: 38000,
    donors: 205,
    icon: "TreePine"
  },
  {
    id: "p5",
    slug: "survivor-support-network",
    title: "Domestic Abuse Support Network",
    category: "Crisis Intervention",
    shortDescription: "Establishing safe meeting spaces and continuous outpatient counsel for victims of domestic abuse.",
    fullDescription: "Leaving an abusive situation is only the first step. This project funds long-term outpatient counsel and the creation of secure, anonymous meeting spaces for survivor support groups. The network aims to provide a continuum of care that prevents isolation, builds community resilience, and fosters profound psychological healing.",
    imageUrl: "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?q=80&w=2069&auto=format&fit=crop",
    goal: 60000,
    raised: 12500,
    donors: 85,
    icon: "Users"
  },
  {
    id: "p6",
    slug: "winter-shelter-program",
    title: "Winter Housing Search Program",
    category: "Housing Assistance",
    shortDescription: "Accelerated housing search and placement assistance for the chronically unhoused during winter.",
    fullDescription: "Winter introduces severe, life-threatening conditions for the unhoused. This project rapidly deploys field agents to assist individuals with housing search logistics, paperwork processing, and overcoming bureaucratic hurdles to secure transitional or permanent housing before the cold peaks. Funds also cover initial security deposits and essential winter clothing.",
    imageUrl: "https://images.unsplash.com/photo-1518116345689-53e778d9b158?q=80&w=2070&auto=format&fit=crop",
    goal: 100000,
    raised: 45000,
    donors: 420,
    icon: "Home"
  },
  {
    id: "p7",
    slug: "npo-capacity-grants",
    title: "Federated Capacity Building Grant",
    category: "Philanthropy",
    shortDescription: "A collective fund-raising effort to provide operational grants to small, grassroots sub-organizations.",
    fullDescription: "As a philanthropic intermediary, we know that small, grassroots organizations are often highly effective but chronically underfunded. This federated fundraising drive pools resources to provide unrestricted, capacity-building grants to 10 local NGOs focused on health and housing. Your donation strengthens the entire non-profit ecosystem.",
    imageUrl: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?q=80&w=2074&auto=format&fit=crop",
    goal: 250000,
    raised: 190000,
    donors: 1100,
    icon: "Building"
  },
  {
    id: "p8",
    slug: "community-yoga-therapy",
    title: "Community Yoga Therapy Access",
    category: "Rehabilitative Service",
    shortDescription: "Free, trauma-informed yoga clinics serving low-income neighborhoods and marginalized groups.",
    fullDescription: "Yoga therapy is a powerful rehabilitative tool for managing chronic pain, PTSD, and physical disability, but it is often priced out of reach for those who need it most. We are funding mobile trauma-informed yoga clinics that operate in community centers across underserved areas, providing free classes, mats, and individualized outpatient therapeutic care.",
    imageUrl: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=2070&auto=format&fit=crop",
    goal: 30000,
    raised: 8000,
    donors: 60,
    icon: "Lotus"
  },
  {
    id: "p9",
    slug: "youth-mental-health-ward",
    title: "Youth Mental Health Ward Upgrade",
    category: "Crisis Intervention",
    shortDescription: "Modernizing acute outpatient facilities dedicated specifically to adolescent crisis intervention.",
    fullDescription: "Teenagers facing acute mental health emergencies require environments that are both secure and comforting. We are renovating an existing, sterile intervention facility into a welcoming, sensory-friendly youth ward. The project includes introducing art therapy rooms, private counseling pods, and advanced safety measures tailored to adolescent care.",
    imageUrl: "https://images.unsplash.com/photo-1516627145497-ae6968895b74?q=80&w=2040&auto=format&fit=crop",
    goal: 120000,
    raised: 95000,
    donors: 630,
    icon: "BookHeart"
  },
  {
    id: "p10",
    slug: "veterans-housing-initiative",
    title: "Veterans Housing & Rehab Initiative",
    category: "Housing Assistance",
    shortDescription: "A dual-pronged approach offering housing assistance combined with physical and mental rehabilitative services.",
    fullDescription: "Veterans often face complex challenges that intersect housing insecurity, physical injuries, and mental trauma. This ambitious project aims to secure housing for 50 veterans while simultaneously enrolling them in our rehabilitative care and mental health intervention programs. We are not just building homes; we are rebuilding comprehensive support structures.",
    imageUrl: "https://images.unsplash.com/photo-1506869640319-a1b945ae7884?q=80&w=2070&auto=format&fit=crop",
    goal: 200000,
    raised: 30000,
    donors: 110,
    icon: "HandHelping"
  }
];
