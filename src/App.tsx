import React, { useState, useMemo, useRef, useEffect } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import {
  Search,
  Menu,
  X,
  MapPin,
  Calendar,
  BedDouble,
  ChevronDown,
  ChevronsDown,
  ArrowUpRight,
  Check,
  Phone,
  Mail,
  RotateCcw,
} from 'lucide-react';
import { GoldhouseLogo } from './components/GoldhouseLogo';
import { PropertyModal } from './components/PropertyModal';
import {
  HERO_BACKDROP_IMAGE,
  PROPERTIES,
  SERVICES,
  PRICING_TIERS,
  TRANSLATIONS,
  LanguageCode,
  PropertyItem,
} from './data/properties';

const CITIES = ['Aspen', 'Malibu', 'Lake Tahoe', 'Austin', 'Scottsdale'];
const PROPERTY_TYPES: PropertyItem['type'][] = [
  'Modern Villa',
  'Stone Pavilion',
  'Timber Courtyard',
  'Glass Residence',
];
const BEDROOM_OPTIONS = [
  { label: '3+ Bedrooms', value: '3' },
  { label: '4+ Bedrooms', value: '4' },
  { label: '5+ Bedrooms', value: '5' },
];
const LANGUAGES: { code: LanguageCode; label: string }[] = [
  { code: 'EN', label: 'English' },
  { code: 'ES', label: 'Español' },
  { code: 'FR', label: 'Français' },
  { code: 'DE', label: 'Deutsch' },
];

export default function App() {
  const prefersReducedMotion = useReducedMotion();
  const [language, setLanguage] = useState<LanguageCode>('EN');
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Search & filter state wired across Hero pill bar, Find Properties card, and Projects grid
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedBeds, setSelectedBeds] = useState('');

  const [activeProperty, setActiveProperty] = useState<PropertyItem | null>(null);
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

  // Consultation form state
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactCity, setContactCity] = useState('Aspen');
  const [contactProgram, setContactProgram] = useState('Turnkey Modern Home');
  const [contactNotes, setContactNotes] = useState('');
  const [contactError, setContactError] = useState('');
  const [contactSubmitted, setContactSubmitted] = useState(false);

  const heroSearchInputRef = useRef<HTMLInputElement>(null);
  const langDropdownRef = useRef<HTMLDivElement>(null);

  const t = TRANSLATIONS[language];

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        langDropdownRef.current &&
        !langDropdownRef.current.contains(event.target as Node)
      ) {
        setLangMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  const filteredProperties = useMemo(() => {
    return PROPERTIES.filter((item) => {
      const q = searchQuery.trim().toLowerCase();
      const matchesQuery =
        !q ||
        item.title.toLowerCase().includes(q) ||
        item.city.toLowerCase().includes(q) ||
        item.type.toLowerCase().includes(q) ||
        item.summary.toLowerCase().includes(q) ||
        item.materials.some((m) => m.toLowerCase().includes(q));

      const matchesCity = !selectedCity || item.city === selectedCity;
      const matchesType = !selectedType || item.type === selectedType;
      const matchesBeds =
        !selectedBeds || item.bedrooms >= Number.parseInt(selectedBeds, 10);

      return matchesQuery && matchesCity && matchesType && matchesBeds;
    });
  }, [searchQuery, selectedCity, selectedType, selectedBeds]);

  const hasActiveFilters = Boolean(
    searchQuery.trim() || selectedCity || selectedType || selectedBeds
  );

  const scrollToSection = (id: string) => {
    setDrawerOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleHeroSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    scrollToSection('projects');
  };

  const handleFindPropertiesSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    scrollToSection('projects');
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCity('');
    setSelectedType('');
    setSelectedBeds('');
  };

  const handleSelectProgram = (programName: string) => {
    setContactProgram(programName);
    setContactSubmitted(false);
    scrollToSection('contact');
  };

  const handleScheduleTour = (propertyTitle: string, city: string) => {
    setContactCity(city);
    setContactNotes(`Requesting a private architectural tour of ${propertyTitle} in ${city}.`);
    setContactSubmitted(false);
    scrollToSection('contact');
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setContactError('');
    if (!contactName.trim()) {
      setContactError('Please enter your full name.');
      return;
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(contactEmail.trim())) {
      setContactError('Please enter a valid email address.');
      return;
    }
    setContactSubmitted(true);
  };

  const markImageFailed = (key: string) => {
    setFailedImages((prev) => ({ ...prev, [key]: true }));
  };

  return (
    <div id="home" className="min-h-screen bg-[#FAF5EF] text-[#23211E]">
      {/* =====================================================================
          HERO SECTION — Faithfully matching the provided reference layout & background
      ====================================================================== */}
      <section className="relative w-full min-h-[780px] sm:min-h-[840px] lg:min-h-[900px] xl:min-h-[940px] flex flex-col justify-between overflow-hidden bg-[#F7F1EA]">
        {/* Architectural Hero Background Image */}
        <div className="absolute inset-0 z-0 pointer-events-none select-none">
          {!failedImages['hero'] ? (
            <img
              src={HERO_BACKDROP_IMAGE}
              alt="Modern single-story stone and dark walnut residence glowing warmly at twilight surrounded by lush trees and misty cream hills"
              referrerPolicy="no-referrer"
              onError={() => markImageFailed('hero')}
              className="w-full h-full object-cover object-[center_78%] sm:object-bottom"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-b from-[#FAF5EF] via-[#EDE3D8] to-[#3B4C32]" />
          )}
          {/* Seamless top warm-ivory atmospheric veil for crisp navigation & display legibility */}
          <div
            className="absolute inset-x-0 top-0 h-[44%] pointer-events-none"
            style={{
              background:
                'linear-gradient(180deg, rgba(250,245,239,0.92) 0%, rgba(250,245,239,0.68) 42%, rgba(250,245,239,0) 100%)',
            }}
          />
          {/* Subtle bottom grass vignette so the floating Find Properties card anchors naturally */}
          <div
            className="absolute inset-x-0 bottom-0 h-32 pointer-events-none"
            style={{
              background:
                'linear-gradient(0deg, rgba(26,34,20,0.28) 0%, rgba(26,34,20,0) 100%)',
            }}
          />
        </div>

        {/* Top Navigation Bar — Exact 3-zone structure matching the reference */}
        <header className="relative z-30 w-full max-w-[1380px] mx-auto px-6 sm:px-10 lg:px-14 pt-6 sm:pt-7 pb-3 flex items-center justify-between gap-8">
          {/* Zone 1: Goldhouse Brand Mark */}
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('home');
            }}
            className="focus-visible:outline-2 focus-visible:outline-[#9E6853] rounded-md"
            aria-label="Goldhouse Real Estate Home"
          >
            <GoldhouseLogo />
          </a>

          {/* Zone 2: Centered Navigation Links with subtle dot separators */}
          <nav
            aria-label="Primary"
            className="hidden md:flex items-center gap-4 lg:gap-6 text-[13.5px] font-medium text-[#2A2723]"
          >
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('home');
              }}
              className="hover:text-[#9E6853] transition-colors whitespace-nowrap shrink-0"
            >
              {t.nav.home}
            </a>
            <span className="w-1 h-1 rounded-full bg-[#2A2723]" aria-hidden="true" />
            <a
              href="#about"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('about');
              }}
              className="hover:text-[#9E6853] transition-colors whitespace-nowrap shrink-0"
            >
              {t.nav.about}
            </a>
            <span className="w-1 h-1 rounded-full bg-[#2A2723]" aria-hidden="true" />
            <a
              href="#projects"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('projects');
              }}
              className="hover:text-[#9E6853] transition-colors whitespace-nowrap shrink-0"
            >
              {t.nav.projects}
            </a>
            <span className="w-1 h-1 rounded-full bg-[#2A2723]" aria-hidden="true" />
            <a
              href="#services"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('services');
              }}
              className="hover:text-[#9E6853] transition-colors whitespace-nowrap shrink-0"
            >
              {t.nav.services}
            </a>
            <span className="w-1 h-1 rounded-full bg-[#2A2723]" aria-hidden="true" />
            <a
              href="#pricing"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('pricing');
              }}
              className="hover:text-[#9E6853] transition-colors whitespace-nowrap shrink-0"
            >
              {t.nav.pricing}
            </a>
          </nav>

          {/* Zone 3: Language Switcher, Quick Search Focus, Menu Drawer Trigger */}
          <div className="flex items-center gap-4 sm:gap-5 shrink-0">
            <div className="relative" ref={langDropdownRef}>
              <button
                type="button"
                onClick={() => setLangMenuOpen((prev) => !prev)}
                aria-expanded={langMenuOpen}
                aria-haspopup="listbox"
                className="inline-flex items-center gap-1 text-[13px] font-semibold text-[#2A2723] hover:text-[#9E6853] transition-colors cursor-pointer py-1 px-1.5 rounded-md focus-visible:outline-2 focus-visible:outline-[#9E6853] whitespace-nowrap"
              >
                <span>{language}</span>
                <ChevronsDown className="w-3.5 h-3.5 stroke-[2]" />
              </button>

              {langMenuOpen && (
                <div
                  role="listbox"
                  className="absolute right-0 mt-2 w-36 bg-[#FBF8F5] rounded-xl shadow-lg border border-[#E5DBD0] py-1.5 z-40"
                >
                  {LANGUAGES.map((item) => (
                    <button
                      key={item.code}
                      type="button"
                      role="option"
                      aria-selected={language === item.code}
                      onClick={() => {
                        setLanguage(item.code);
                        setLangMenuOpen(false);
                      }}
                      className={`w-full px-3.5 py-2 text-left text-xs font-medium flex items-center justify-between transition-colors cursor-pointer ${
                        language === item.code
                          ? 'text-[#9E6853] bg-[#EFE7DE]/70'
                          : 'text-[#3A3530] hover:bg-[#EFE7DE]/50'
                      }`}
                    >
                      <span>{item.label}</span>
                      <span className="text-[11px] opacity-70">{item.code}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={() => {
                heroSearchInputRef.current?.focus();
                heroSearchInputRef.current?.scrollIntoView({
                  behavior: 'smooth',
                  block: 'center',
                });
              }}
              aria-label="Focus property search"
              className="p-1.5 text-[#2A2723] hover:text-[#9E6853] transition-colors cursor-pointer rounded-full focus-visible:outline-2 focus-visible:outline-[#9E6853]"
            >
              <Search className="w-[19px] h-[19px] stroke-[1.8]" />
            </button>

            <button
              type="button"
              onClick={() => setDrawerOpen(true)}
              aria-label="Open navigation menu"
              className="p-1.5 text-[#2A2723] hover:text-[#9E6853] transition-colors cursor-pointer rounded-md focus-visible:outline-2 focus-visible:outline-[#9E6853]"
            >
              <Menu className="w-[21px] h-[21px] stroke-[2]" />
            </button>
          </div>
        </header>

        {/* Left Edge Vertical Stats Rail — Exact graduated visual rhythm from the screenshot */}
        <aside
          aria-label="Company milestones"
          className="hidden md:flex flex-col gap-6 lg:gap-7 absolute left-0 top-[155px] lg:top-[168px] z-20 select-none"
        >
          {/* Stat 1: 150+ Completed Projects */}
          <div className="group flex items-start transition-opacity duration-200">
            <div className="flex items-center mt-2.5">
              <span className="w-16 lg:w-28 xl:w-36 h-px bg-[#D7CFC7] group-hover:bg-[#9E6853] transition-colors" />
              <span className="w-1.5 h-1.5 rounded-full bg-[#C2B9B0] group-hover:bg-[#9E6853] transition-colors shrink-0" />
            </div>
            <div className="pl-2.5">
              <div className="text-[20px] lg:text-[22px] font-semibold leading-none tracking-tight text-[#C2B9B0] group-hover:text-[#26231F] transition-colors tabular-nums">
                150+
              </div>
              <div className="mt-1 text-[10.5px] leading-[1.25] font-medium text-[#C5BDB4] group-hover:text-[#5F574F] transition-colors max-w-[78px]">
                {t.hero.stats.projects}
              </div>
            </div>
          </div>

          {/* Stat 2: 10+ Years of Experience */}
          <div className="group flex items-start transition-opacity duration-200">
            <div className="flex items-center mt-2.5">
              <span className="w-16 lg:w-28 xl:w-36 h-px bg-[#C9C0B7] group-hover:bg-[#9E6853] transition-colors" />
              <span className="w-1.5 h-1.5 rounded-full bg-[#8D857D] group-hover:bg-[#9E6853] transition-colors shrink-0" />
            </div>
            <div className="pl-2.5">
              <div className="text-[20px] lg:text-[22px] font-semibold leading-none tracking-tight text-[#8E867E] group-hover:text-[#26231F] transition-colors tabular-nums">
                10+
              </div>
              <div className="mt-1 text-[10.5px] leading-[1.25] font-medium text-[#9B938A] group-hover:text-[#5F574F] transition-colors max-w-[78px]">
                {t.hero.stats.experience}
              </div>
            </div>
          </div>

          {/* Stat 3: 500+ Happy Clients */}
          <div className="group flex items-start transition-opacity duration-200">
            <div className="flex items-center mt-2.5">
              <span className="w-16 lg:w-28 xl:w-36 h-px bg-[#9E958C] group-hover:bg-[#9E6853] transition-colors" />
              <span className="w-1.5 h-1.5 rounded-full bg-[#26231F] group-hover:bg-[#9E6853] transition-colors shrink-0" />
            </div>
            <div className="pl-2.5">
              <div className="text-[20px] lg:text-[22px] font-semibold leading-none tracking-tight text-[#26231F] tabular-nums">
                500+
              </div>
              <div className="mt-1 text-[10.5px] leading-[1.25] font-semibold text-[#3C3732] max-w-[78px]">
                {t.hero.stats.clients}
              </div>
            </div>
          </div>
        </aside>

        {/* Center Hero Headline & Inline Search Pill */}
        <div className="relative z-20 w-full max-w-4xl mx-auto px-6 pt-5 sm:pt-7 lg:pt-8 text-center">
          <h1
            className="font-display-serif font-bold tracking-[-0.02em] leading-[0.98] text-balance"
            style={{ fontSize: 'clamp(2.85rem, 6.2vw, 5.55rem)' }}
          >
            <span className="block text-[#24211D]">{t.hero.line1}</span>
            <span className="block text-[#9F6852] mt-0.5">{t.hero.line2}</span>
          </h1>

          {/* Hero Pill Search Bar */}
          <form
            onSubmit={handleHeroSearchSubmit}
            className="mt-5 sm:mt-6 mx-auto max-w-[420px] w-full bg-white/95 backdrop-blur-xs rounded-full p-1.5 pl-6 shadow-[0_14px_38px_rgba(35,33,30,0.09)] border border-white/80 flex items-center justify-between gap-2 focus-within:ring-2 focus-within:ring-[#9F6852]/40 transition-shadow"
          >
            <input
              ref={heroSearchInputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.hero.searchPlaceholder}
              aria-label="Search architectural designs or cities"
              className="flex-1 min-w-0 bg-transparent text-[13.5px] text-[#23211E] placeholder:text-[#8E867D] outline-none"
            />
            <button
              type="submit"
              className="bg-[#27251F] hover:bg-[#3B3830] active:scale-[0.98] text-[#FAF5EF] text-[13px] font-medium px-6 py-2.5 rounded-full transition-all whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#9E6853]"
            >
              {t.hero.searchCta}
            </button>
          </form>

          {/* Compact stats row on small mobile screens only */}
          <div className="mt-5 flex md:hidden items-center justify-center gap-6 text-xs text-[#3C3732]">
            <span>
              <strong className="tabular-nums font-bold">150+</strong> Projects
            </span>
            <span aria-hidden="true">·</span>
            <span>
              <strong className="tabular-nums font-bold">10+</strong> Years
            </span>
            <span aria-hidden="true">·</span>
            <span>
              <strong className="tabular-nums font-bold">500+</strong> Clients
            </span>
          </div>
        </div>

        {/* Unobstructed Visual Window for the Modern Stone & Timber House */}
        <div className="flex-1 min-h-[250px] sm:min-h-[320px] lg:min-h-[370px]" aria-hidden="true" />

        {/* Bottom Floating "Find Properties" Filter Card over the Green Lawn */}
        <div className="relative z-20 w-full px-4 sm:px-6 pb-7 sm:pb-9">
          <motion.form
            onSubmit={handleFindPropertiesSubmit}
            initial={prefersReducedMotion ? false : { opacity: 0, y: 36, scale: 0.96 }}
            animate={
              prefersReducedMotion
                ? { opacity: 1 }
                : {
                    opacity: 1,
                    scale: 1,
                    y: [0, -5, 0],
                  }
            }
            transition={
              prefersReducedMotion
                ? { duration: 0 }
                : {
                    opacity: { duration: 0.65, ease: [0.16, 1, 0.3, 1] },
                    scale: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
                    y: {
                      duration: 5.5,
                      delay: 0.75,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    },
                  }
            }
            whileHover={
              prefersReducedMotion
                ? undefined
                : { y: -6, transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] } }
            }
            className="relative overflow-hidden max-w-[660px] w-full mx-auto bg-[#FBF8F5]/98 backdrop-blur-xs rounded-[24px] shadow-[0_24px_60px_rgba(16,22,14,0.3)] hover:shadow-[0_30px_70px_rgba(16,22,14,0.36)] transition-shadow duration-300 px-5 sm:px-8 py-5 sm:py-6 border border-white/70"
          >
            {/* Subtle ambient warm sheen sweep across the card */}
            {!prefersReducedMotion && (
              <motion.span
                aria-hidden="true"
                initial={{ x: '-140%', opacity: 0 }}
                animate={{ x: '240%', opacity: [0, 0.45, 0] }}
                transition={{
                  duration: 2.6,
                  delay: 0.9,
                  repeat: Infinity,
                  repeatDelay: 4.5,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="pointer-events-none absolute inset-y-0 left-0 w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/75 to-transparent"
              />
            )}

            <motion.h2
              initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.14, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-10 text-[19px] sm:text-[21px] font-bold text-[#23211E] text-center tracking-tight mb-4"
            >
              {t.hero.findProperties}
            </motion.h2>

            <div className="relative z-10 grid grid-cols-1 sm:grid-cols-[1fr_1fr_1fr_auto] gap-3 items-center">
              {/* City Select */}
              <motion.div
                initial={prefersReducedMotion ? false : { opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.48, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
                whileHover={prefersReducedMotion ? undefined : { y: -2, scale: 1.01 }}
                className="relative flex items-center bg-[#EAE0D7] hover:bg-[#E2D6CB] focus-within:ring-2 focus-within:ring-[#9D634E]/35 transition-colors rounded-xl px-3.5 h-11"
              >
                <MapPin className="w-4 h-4 text-[#857A70] shrink-0 mr-2 pointer-events-none" />
                <select
                  aria-label="Filter by city"
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="w-full appearance-none bg-transparent text-[13px] font-medium text-[#5E554D] outline-none pr-5 cursor-pointer truncate"
                >
                  <option value="">{t.hero.cityLabel}</option>
                  {CITIES.map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-4 h-4 text-[#7C7167] absolute right-3 pointer-events-none" />
              </motion.div>

              {/* Property Type Select */}
              <motion.div
                initial={prefersReducedMotion ? false : { opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.48, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                whileHover={prefersReducedMotion ? undefined : { y: -2, scale: 1.01 }}
                className="relative flex items-center bg-[#EAE0D7] hover:bg-[#E2D6CB] focus-within:ring-2 focus-within:ring-[#9D634E]/35 transition-colors rounded-xl px-3.5 h-11"
              >
                <Calendar className="w-4 h-4 text-[#857A70] shrink-0 mr-2 pointer-events-none" />
                <select
                  aria-label="Filter by property type"
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="w-full appearance-none bg-transparent text-[13px] font-medium text-[#5E554D] outline-none pr-5 cursor-pointer truncate"
                >
                  <option value="">{t.hero.propertiesLabel}</option>
                  {PROPERTY_TYPES.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-4 h-4 text-[#7C7167] absolute right-3 pointer-events-none" />
              </motion.div>

              {/* Bedroom Select */}
              <motion.div
                initial={prefersReducedMotion ? false : { opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.48, delay: 0.38, ease: [0.16, 1, 0.3, 1] }}
                whileHover={prefersReducedMotion ? undefined : { y: -2, scale: 1.01 }}
                className="relative flex items-center bg-[#EAE0D7] hover:bg-[#E2D6CB] focus-within:ring-2 focus-within:ring-[#9D634E]/35 transition-colors rounded-xl px-3.5 h-11"
              >
                <BedDouble className="w-4 h-4 text-[#857A70] shrink-0 mr-2 pointer-events-none" />
                <select
                  aria-label="Filter by minimum bedrooms"
                  value={selectedBeds}
                  onChange={(e) => setSelectedBeds(e.target.value)}
                  className="w-full appearance-none bg-transparent text-[13px] font-medium text-[#5E554D] outline-none pr-5 cursor-pointer truncate"
                >
                  <option value="">{t.hero.bedroomLabel}</option>
                  {BEDROOM_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-4 h-4 text-[#7C7167] absolute right-3 pointer-events-none" />
              </motion.div>

              {/* Circular Terracotta Search Button */}
              <motion.button
                type="submit"
                aria-label="Search matching properties"
                initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  type: 'spring',
                  stiffness: 340,
                  damping: 22,
                  delay: 0.46,
                }}
                whileHover={prefersReducedMotion ? undefined : { scale: 1.08 }}
                whileTap={prefersReducedMotion ? undefined : { scale: 0.93 }}
                className="w-full sm:w-11 h-11 rounded-xl sm:rounded-full bg-[#9D634E] hover:bg-[#86513E] text-white flex items-center justify-center gap-2 shrink-0 transition-colors shadow-sm hover:shadow-md cursor-pointer focus-visible:outline-2 focus-visible:outline-[#23211E]"
              >
                <Search className="w-[18px] h-[18px] stroke-[2.2]" />
                <span className="sm:hidden text-sm font-medium">Find Properties</span>
              </motion.button>
            </div>
          </motion.form>
        </div>
      </section>

      {/* =====================================================================
          FEATURED PROJECTS & FILTERABLE RESIDENCES
      ====================================================================== */}
      <section
        id="projects"
        className="w-full max-w-[1280px] mx-auto px-6 sm:px-10 lg:px-14 py-20 lg:py-24"
      >
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-[#E5DBD0]">
          <div>
            <p className="text-xs font-semibold text-[#9E6853] mb-2">
              Curated Architectural Portfolio
            </p>
            <h2 className="font-display-serif text-3xl sm:text-4xl font-bold text-[#23211E] tracking-tight text-balance">
              Signature Modern Residences
            </h2>
          </div>

          {/* Interactive Type Filter Bar */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="inline-flex flex-wrap items-center gap-1 p-1 bg-[#EFE7DE] rounded-xl">
              <button
                type="button"
                onClick={() => setSelectedType('')}
                className={`px-3.5 py-2 text-xs font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                  selectedType === ''
                    ? 'bg-[#26241F] text-[#FAF5EF] shadow-xs'
                    : 'text-[#5C544C] hover:text-[#23211E]'
                }`}
              >
                All Residences
              </button>
              {PROPERTY_TYPES.map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setSelectedType(type)}
                  className={`px-3.5 py-2 text-xs font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                    selectedType === type
                      ? 'bg-[#26241F] text-[#FAF5EF] shadow-xs'
                      : 'text-[#5C544C] hover:text-[#23211E]'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>

            {hasActiveFilters && (
              <button
                type="button"
                onClick={handleResetFilters}
                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-[#9E6853] hover:text-[#7D4F3E] transition-colors cursor-pointer whitespace-nowrap"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Reset
              </button>
            )}
          </div>
        </div>

        {/* Active Search Status Summary */}
        {hasActiveFilters && (
          <div className="mt-5 flex flex-wrap items-center justify-between gap-3 text-sm text-[#5F574F]">
            <p>
              Showing{' '}
              <span className="font-semibold text-[#23211E] tabular-nums">
                {filteredProperties.length}
              </span>{' '}
              {filteredProperties.length === 1 ? 'residence' : 'residences'}
              {searchQuery.trim() ? ` matching “${searchQuery.trim()}”` : ''}
              {selectedCity ? ` in ${selectedCity}` : ''}
              {selectedType ? ` · ${selectedType}` : ''}
              {selectedBeds ? ` · ${selectedBeds}+ Bedrooms` : ''}
            </p>
          </div>
        )}

        {/* Property Cards Grid */}
        {filteredProperties.length > 0 ? (
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProperties.map((property) => (
              <article
                key={property.id}
                className="group flex flex-col bg-[#FBF8F5] rounded-2xl overflow-hidden border border-[#E6DDD2] transition-transform duration-200 hover:-translate-y-1"
              >
                <button
                  type="button"
                  onClick={() => setActiveProperty(property)}
                  className="relative aspect-[4/3] w-full overflow-hidden bg-[#EAE0D7] text-left cursor-pointer focus-visible:outline-2 focus-visible:outline-[#9E6853]"
                >
                  {!failedImages[property.id] ? (
                    <img
                      src={property.image}
                      alt={`${property.title} — modern architectural home in ${property.city}`}
                      referrerPolicy="no-referrer"
                      onError={() => markImageFailed(property.id)}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#EAE0D7] to-[#D9CCC0] p-6 text-center">
                      <span className="font-display-serif text-xl font-bold text-[#23211E]">
                        {property.title}
                      </span>
                    </div>
                  )}
                </button>

                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-xs font-medium text-[#7D7369]">
                        {property.city}, {property.state} · {property.type}
                      </span>
                      <span className="text-sm font-bold text-[#9E6853] tabular-nums shrink-0">
                        {property.priceFormatted}
                      </span>
                    </div>

                    <h3 className="mt-2 font-display-serif text-2xl font-bold text-[#23211E] tracking-tight">
                      <button
                        type="button"
                        onClick={() => setActiveProperty(property)}
                        className="text-left hover:text-[#9E6853] transition-colors cursor-pointer"
                      >
                        {property.title}
                      </button>
                    </h3>

                    <p className="mt-2.5 text-sm leading-relaxed text-[#5D554D] line-clamp-2">
                      {property.summary}
                    </p>
                  </div>

                  <div className="mt-5 pt-4 border-t border-[#EAE0D7] flex items-center justify-between gap-4">
                    <div className="text-xs font-medium text-[#524B44] tabular-nums">
                      {property.bedrooms} Beds · {property.bathrooms} Baths ·{' '}
                      {property.sqft.toLocaleString()} sq ft
                    </div>

                    <button
                      type="button"
                      onClick={() => setActiveProperty(property)}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-[#23211E] hover:text-[#9E6853] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                    >
                      View Details
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="mt-10 py-16 px-6 text-center bg-[#F4ECE3] rounded-2xl border border-[#E5DBD0]">
            <h3 className="font-display-serif text-2xl font-bold text-[#23211E]">
              No matching residences found
            </h3>
            <p className="mt-2 text-sm text-[#615850] max-w-md mx-auto">
              Adjust your city, property type, or bedroom selection to explore our full collection of custom modern homes.
            </p>
            <button
              type="button"
              onClick={handleResetFilters}
              className="mt-5 inline-flex items-center gap-2 bg-[#26241F] hover:bg-[#3B3830] text-[#FAF5EF] text-sm font-medium px-6 py-2.5 rounded-full transition-colors cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              Show All Residences
            </button>
          </div>
        )}
      </section>

      {/* =====================================================================
          ABOUT US — Architectural Philosophy & Material Craft
      ====================================================================== */}
      <section
        id="about"
        className="w-full bg-[#F3ECE3] border-y border-[#E5DBD0]"
      >
        <div className="max-w-[1280px] mx-auto px-6 sm:px-10 lg:px-14 py-20 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
            <div className="lg:col-span-6 flex flex-col justify-between">
              <div>
                <p className="text-xs font-semibold text-[#9E6853] mb-2">
                  About Goldhouse Real Estate
                </p>
                <h2 className="font-display-serif text-3xl sm:text-4xl font-bold text-[#23211E] tracking-tight leading-tight text-balance">
                  Architecture grounded in natural stone, warm timber, and quiet light
                </h2>
                <p className="mt-5 text-[15px] leading-relaxed text-[#524B44]">
                  For over a decade, Goldhouse has united architectural design, precision
                  structural engineering, and real estate advisory under one roof. Each residence
                  is composed around natural topography—cantilevered dark wood rooflines,
                  hand-dressed limestone walls, and full-height thermal glass that invites golden
                  hour light deep into every room.
                </p>
                <p className="mt-4 text-[15px] leading-relaxed text-[#524B44]">
                  Whether you are acquiring a move-in-ready signature pavilion or commissioning a
                  custom estate from raw land, our principal architects and master builders stay
                  accountable from initial site study to key handover.
                </p>
              </div>

              <div className="mt-10 pt-8 border-t border-[#DFD4C8] grid grid-cols-2 sm:grid-cols-4 gap-6">
                <div>
                  <div className="font-display-serif text-3xl font-bold text-[#23211E] tabular-nums">
                    150+
                  </div>
                  <div className="mt-1 text-xs text-[#6B6259]">Completed Projects</div>
                </div>
                <div>
                  <div className="font-display-serif text-3xl font-bold text-[#23211E] tabular-nums">
                    10+
                  </div>
                  <div className="mt-1 text-xs text-[#6B6259]">Years Practice</div>
                </div>
                <div>
                  <div className="font-display-serif text-3xl font-bold text-[#23211E] tabular-nums">
                    500+
                  </div>
                  <div className="mt-1 text-xs text-[#6B6259]">Homeowner Families</div>
                </div>
                <div>
                  <div className="font-display-serif text-3xl font-bold text-[#9E6853] tabular-nums">
                    98%
                  </div>
                  <div className="mt-1 text-xs text-[#6B6259]">On-Schedule Handover</div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="relative h-full min-h-[340px] rounded-2xl overflow-hidden bg-[#E5DBD0]">
                {!failedImages['about-house'] ? (
                  <img
                    src="/src/assets/images/property_ridge_glass_1795179042845.jpg"
                    alt="Goldhouse modern stone and glass architectural home overlooking misty hills"
                    referrerPolicy="no-referrer"
                    onError={() => markImageFailed('about-house')}
                    className="w-full h-full lg:h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-[#E5DBD0] text-[#524B44] text-sm">
                    Goldhouse Architectural Studio
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SERVICES — Editorial Numbered Capabilities
      ====================================================================== */}
      <section
        id="services"
        className="w-full max-w-[1280px] mx-auto px-6 sm:px-10 lg:px-14 py-20 lg:py-24"
      >
        <div className="max-w-2xl">
          <p className="text-xs font-semibold text-[#9E6853] mb-2">End-to-End Services</p>
          <h2 className="font-display-serif text-3xl sm:text-4xl font-bold text-[#23211E] tracking-tight text-balance">
            One accountable studio from site selection to final keys
          </h2>
        </div>

        <div className="mt-12 divide-y divide-[#E5DBD0] border-y border-[#E5DBD0]">
          {SERVICES.map((service) => (
            <div
              key={service.number}
              className="py-8 grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-start"
            >
              <div className="md:col-span-4 flex items-baseline gap-3">
                <span className="font-display-serif text-xl font-bold text-[#9E6853] tabular-nums">
                  {service.number}
                </span>
                <h3 className="text-lg font-bold text-[#23211E] tracking-tight">
                  {service.title}
                </h3>
              </div>
              <p className="md:col-span-5 text-sm leading-relaxed text-[#575049]">
                {service.description}
              </p>
              <div className="md:col-span-3 md:text-right text-xs font-semibold text-[#7A7168]">
                {service.deliverable}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =====================================================================
          PRICING & COMMISSION PROGRAMS
      ====================================================================== */}
      <section
        id="pricing"
        className="w-full bg-[#F3ECE3] border-y border-[#E5DBD0]"
      >
        <div className="max-w-[1280px] mx-auto px-6 sm:px-10 lg:px-14 py-20 lg:py-24">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
            <div className="max-w-xl">
              <p className="text-xs font-semibold text-[#9E6853] mb-2">
                Transparent Investment Structure
              </p>
              <h2 className="font-display-serif text-3xl sm:text-4xl font-bold text-[#23211E] tracking-tight text-balance">
                Clear design and turnkey build programs
              </h2>
            </div>
            <p className="text-sm text-[#615850] max-w-sm">
              Every project includes a fixed architectural schedule, transparent material ledger,
              and dedicated principal oversight.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-7 items-stretch">
            {PRICING_TIERS.map((tier) => (
              <div
                key={tier.id}
                className={`rounded-2xl p-7 sm:p-8 flex flex-col justify-between border transition-colors ${
                  tier.featured
                    ? 'bg-[#26241F] text-[#FAF5EF] border-[#26241F]'
                    : 'bg-[#FBF8F5] text-[#23211E] border-[#E5DBD0]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="text-lg font-bold tracking-tight">{tier.name}</h3>
                    {tier.featured && (
                      <span className="text-xs font-semibold text-[#D69D85]">
                        Most Commissioned
                      </span>
                    )}
                  </div>

                  <div className="mt-5 flex items-baseline gap-2">
                    <span className="font-display-serif text-4xl font-bold tabular-nums">
                      {tier.rate}
                    </span>
                    <span
                      className={`text-xs ${
                        tier.featured ? 'text-[#C9C1B8]' : 'text-[#7A7168]'
                      }`}
                    >
                      {tier.unit}
                    </span>
                  </div>

                  <p
                    className={`mt-4 text-sm leading-relaxed ${
                      tier.featured ? 'text-[#D7CFC6]' : 'text-[#5C544C]'
                    }`}
                  >
                    {tier.summary}
                  </p>

                  <ul
                    className={`mt-6 pt-6 border-t space-y-3 text-sm ${
                      tier.featured ? 'border-[#3E3A33]' : 'border-[#EAE0D7]'
                    }`}
                  >
                    {tier.features.map((feat) => (
                      <li key={feat} className="flex items-start gap-2.5">
                        <Check
                          className={`w-4 h-4 shrink-0 mt-0.5 ${
                            tier.featured ? 'text-[#D69D85]' : 'text-[#9E6853]'
                          }`}
                        />
                        <span className={tier.featured ? 'text-[#EFE9E1]' : 'text-[#453E38]'}>
                          {feat}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  type="button"
                  onClick={() => handleSelectProgram(tier.name)}
                  className={`mt-8 w-full py-3 px-5 rounded-full text-sm font-medium transition-colors cursor-pointer whitespace-nowrap ${
                    tier.featured
                      ? 'bg-[#9E6853] hover:bg-[#B27760] text-white'
                      : 'bg-[#26241F] hover:bg-[#3A3730] text-[#FAF5EF]'
                  }`}
                >
                  Request Proposal
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          PRIVATE CONSULTATION FORM
      ====================================================================== */}
      <section
        id="contact"
        className="w-full max-w-[1280px] mx-auto px-6 sm:px-10 lg:px-14 py-20 lg:py-24"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-5">
            <p className="text-xs font-semibold text-[#9E6853] mb-2">Private Consultation</p>
            <h2 className="font-display-serif text-3xl sm:text-4xl font-bold text-[#23211E] tracking-tight text-balance">
              Begin your residence with our architectural desk
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-[#5C544C]">
              Share your preferred location, timeline, or property of interest. A senior Goldhouse
              architect will respond within one business day with tailored floor plans and site
              availability.
            </p>

            <div className="mt-8 space-y-4 text-sm text-[#3F3933]">
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#9E6853] shrink-0" />
                <span className="tabular-nums">+1 (970) 555-0194</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#9E6853] shrink-0" />
                <span>advisory@goldhouse-estates.com</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-[#9E6853] shrink-0" />
                <span>Aspen · Malibu · Lake Tahoe · Austin</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 bg-[#FBF8F5] rounded-2xl p-6 sm:p-9 border border-[#E5DBD0]">
            {contactSubmitted ? (
              <div className="py-10 text-center">
                <div className="w-12 h-12 rounded-full bg-[#9E6853]/15 text-[#9E6853] flex items-center justify-center mx-auto mb-4">
                  <Check className="w-6 h-6" />
                </div>
                <h3 className="font-display-serif text-2xl font-bold text-[#23211E]">
                  Consultation Request Received
                </h3>
                <p className="mt-2 text-sm text-[#5C544C] max-w-md mx-auto">
                  Thank you, {contactName}. Our architectural advisor for {contactCity} will email{' '}
                  <span className="font-medium text-[#23211E]">{contactEmail}</span> within 24
                  hours regarding {contactProgram}.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setContactSubmitted(false);
                    setContactNotes('');
                  }}
                  className="mt-6 px-6 py-2.5 rounded-full bg-[#26241F] text-[#FAF5EF] text-sm font-medium hover:bg-[#3A3730] transition-colors cursor-pointer"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} noValidate className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="block text-xs font-semibold text-[#3C3732] mb-1.5"
                    >
                      Full Name
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      placeholder="Claire Henderson"
                      className="w-full h-11 px-4 rounded-xl bg-[#F3ECE3] border border-[#E2D8CC] text-sm text-[#23211E] placeholder:text-[#978E84] outline-none focus:border-[#9E6853] transition-colors"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="contact-email"
                      className="block text-xs font-semibold text-[#3C3732] mb-1.5"
                    >
                      Email Address
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      placeholder="claire@domain.com"
                      className="w-full h-11 px-4 rounded-xl bg-[#F3ECE3] border border-[#E2D8CC] text-sm text-[#23211E] placeholder:text-[#978E84] outline-none focus:border-[#9E6853] transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="contact-city"
                      className="block text-xs font-semibold text-[#3C3732] mb-1.5"
                    >
                      Preferred Location
                    </label>
                    <div className="relative">
                      <select
                        id="contact-city"
                        value={contactCity}
                        onChange={(e) => setContactCity(e.target.value)}
                        className="w-full h-11 px-4 pr-9 appearance-none rounded-xl bg-[#F3ECE3] border border-[#E2D8CC] text-sm text-[#23211E] outline-none focus:border-[#9E6853] cursor-pointer"
                      >
                        {CITIES.map((city) => (
                          <option key={city} value={city}>
                            {city}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="w-4 h-4 text-[#7C7167] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="contact-program"
                      className="block text-xs font-semibold text-[#3C3732] mb-1.5"
                    >
                      Program Interest
                    </label>
                    <div className="relative">
                      <select
                        id="contact-program"
                        value={contactProgram}
                        onChange={(e) => setContactProgram(e.target.value)}
                        className="w-full h-11 px-4 pr-9 appearance-none rounded-xl bg-[#F3ECE3] border border-[#E2D8CC] text-sm text-[#23211E] outline-none focus:border-[#9E6853] cursor-pointer"
                      >
                        {PRICING_TIERS.map((tier) => (
                          <option key={tier.id} value={tier.name}>
                            {tier.name}
                          </option>
                        ))}
                        <option value="Private Residence Acquisition">
                          Private Residence Acquisition
                        </option>
                      </select>
                      <ChevronDown className="w-4 h-4 text-[#7C7167] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="contact-notes"
                    className="block text-xs font-semibold text-[#3C3732] mb-1.5"
                  >
                    Architectural Brief or Questions
                  </label>
                  <textarea
                    id="contact-notes"
                    rows={3}
                    value={contactNotes}
                    onChange={(e) => setContactNotes(e.target.value)}
                    placeholder="Tell us about your lot, preferred square footage, or desired move-in schedule..."
                    className="w-full p-4 rounded-xl bg-[#F3ECE3] border border-[#E2D8CC] text-sm text-[#23211E] placeholder:text-[#978E84] outline-none focus:border-[#9E6853] transition-colors resize-none"
                  />
                </div>

                {contactError && (
                  <p role="alert" className="text-xs font-medium text-[#A43E2D]">
                    {contactError}
                  </p>
                )}

                <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
                  <span className="text-xs text-[#7D7369]">
                    Direct response from a licensed Goldhouse architect.
                  </span>
                  <button
                    type="submit"
                    className="bg-[#9D634E] hover:bg-[#86513E] text-white text-sm font-medium px-7 py-3 rounded-full transition-colors cursor-pointer whitespace-nowrap"
                  >
                    Schedule Consultation
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* =====================================================================
          QUIET FOOTER
      ====================================================================== */}
      <footer className="w-full border-t border-[#E5DBD0] bg-[#F5EFE7]">
        <div className="max-w-[1280px] mx-auto px-6 sm:px-10 lg:px-14 py-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <GoldhouseLogo />

          <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-medium text-[#5F574F]">
            <button
              type="button"
              onClick={() => scrollToSection('home')}
              className="hover:text-[#23211E] transition-colors cursor-pointer"
            >
              {t.nav.home}
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('about')}
              className="hover:text-[#23211E] transition-colors cursor-pointer"
            >
              {t.nav.about}
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('projects')}
              className="hover:text-[#23211E] transition-colors cursor-pointer"
            >
              {t.nav.projects}
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('services')}
              className="hover:text-[#23211E] transition-colors cursor-pointer"
            >
              {t.nav.services}
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('pricing')}
              className="hover:text-[#23211E] transition-colors cursor-pointer"
            >
              {t.nav.pricing}
            </button>
          </div>

          <p className="text-xs text-[#7D7369]">
            © {new Date().getFullYear()} Goldhouse Real Estate. All rights reserved.
          </p>
        </div>
      </footer>

      {/* =====================================================================
          SLIDE-OVER NAVIGATION DRAWER
      ====================================================================== */}
      {drawerOpen && (
        <div
          className="fixed inset-0 z-50 flex justify-end bg-[#1C1A17]/50 backdrop-blur-xs"
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
          onClick={() => setDrawerOpen(false)}
        >
          <div
            className="w-full max-w-sm h-full bg-[#FAF5EF] shadow-2xl p-8 flex flex-col justify-between border-l border-[#E5DBD0]"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-[#E5DBD0]">
                <GoldhouseLogo />
                <button
                  type="button"
                  onClick={() => setDrawerOpen(false)}
                  aria-label="Close navigation menu"
                  className="p-2 rounded-full text-[#23211E] hover:bg-[#EAE0D7] transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <nav className="mt-8 flex flex-col gap-5">
                {[
                  { id: 'home', label: t.nav.home },
                  { id: 'about', label: t.nav.about },
                  { id: 'projects', label: t.nav.projects },
                  { id: 'services', label: t.nav.services },
                  { id: 'pricing', label: t.nav.pricing },
                  { id: 'contact', label: 'Private Consultation' },
                ].map((link) => (
                  <button
                    key={link.id}
                    type="button"
                    onClick={() => scrollToSection(link.id)}
                    className="text-left font-display-serif text-2xl font-bold text-[#23211E] hover:text-[#9E6853] transition-colors cursor-pointer"
                  >
                    {link.label}
                  </button>
                ))}
              </nav>
            </div>

            <div className="pt-6 border-t border-[#E5DBD0] space-y-3 text-xs text-[#6B6259]">
              <div className="font-semibold text-[#23211E]">Architectural Advisory Desk</div>
              <div>+1 (970) 555-0194</div>
              <div>advisory@goldhouse-estates.com</div>
              <button
                type="button"
                onClick={() => scrollToSection('contact')}
                className="mt-3 w-full py-3 rounded-full bg-[#26241F] text-[#FAF5EF] text-sm font-medium hover:bg-[#3A3730] transition-colors cursor-pointer"
              >
                Schedule Private Viewing
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Property Detail Modal */}
      <PropertyModal
        property={activeProperty}
        onClose={() => setActiveProperty(null)}
        onScheduleTour={handleScheduleTour}
      />
    </div>
  );
}
