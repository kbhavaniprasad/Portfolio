import { useState, useEffect } from 'react';
import Lenis from 'lenis';
import PageLoader from './components/PageLoader.jsx';
import CustomCursor from './components/CustomCursor.jsx';
import ScrollProgressBar from './components/ScrollProgressBar.jsx';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import AboutSection from './components/AboutSection.jsx';
import ExperienceSection from './components/ExperienceSection.jsx';
import ProjectsSection from './components/ProjectsSection.jsx';
import SkillsSection from './components/SkillsSection.jsx';
import ContactSection from './components/ContactSection.jsx';
import QuestionnaireSection from './components/QuestionnaireSection.jsx';
import Footer from './components/Footer.jsx';
import BackToTop from './components/BackToTop.jsx';

export default function App() {
  const [activeSection, setActiveSection] = useState('hero');

  // 1. Initialize Lenis Smooth Scrolling
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.5
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    const rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  // 2. Active Section Spy via IntersectionObserver (Strict Order)
  useEffect(() => {
    const sectionIds = [
      'hero',
      'about',
      'experience',
      'projects',
      'skills',
      'contact',
      'questionnaire'
    ];

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      rootMargin: '-30% 0px -40% 0px',
      threshold: 0
    });

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      // 5. Trigger slide-in animation from left edge to right: translateX(-100%) -> translateX(0)
      element.classList.remove('page-slide-in');
      void element.offsetWidth; // Force reflow to restart animation reliably
      element.classList.add('page-slide-in');

      element.scrollIntoView({ behavior: 'smooth' });

      const handleAnimationEnd = () => {
        element.classList.remove('page-slide-in');
        element.removeEventListener('animationend', handleAnimationEnd);
      };
      element.addEventListener('animationend', handleAnimationEnd, { once: true });
    }
  };

  return (
    <div className="portfolio-app">
      {/* Preloader */}
      <PageLoader />

      {/* Custom Glowing Cursor Follower */}
      <CustomCursor />

      {/* Top Scroll Progress Bar */}
      <ScrollProgressBar />

      {/* Soft Aurora Light-Blue Gradient Blobs */}
      <div className="aurora-blobs-layer" aria-hidden="true">
        <div className="aurora-blob blob-1" />
        <div className="aurora-blob blob-2" />
        <div className="aurora-blob blob-3" />
      </div>

      {/* Sticky Glass Navbar */}
      <Navbar activeSection={activeSection} scrollToSection={scrollToSection} />

      {/* Main Content Sections (Strict Order) */}
      <main className="portfolio-main">
        {/* 1. My Digital Page (Home/Hero) */}
        <Hero scrollToSection={scrollToSection} />

        {/* 2. About Us */}
        <AboutSection />

        {/* 3. Internships */}
        <ExperienceSection />

        {/* 4. Projects */}
        <ProjectsSection />

        {/* 5. Skills */}
        <SkillsSection />

        {/* 6. Contact Us */}
        <ContactSection />

        {/* 7. Questionnaire (New Section) */}
        <QuestionnaireSection />
      </main>

      {/* Footer */}
      <Footer scrollToSection={scrollToSection} />

      {/* Floating Back to Top Button */}
      <BackToTop scrollToSection={scrollToSection} />
    </div>
  );
}
