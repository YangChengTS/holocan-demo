import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import Layout from '@/components/layout/Layout';
import { FaSearch, FaVrCardboard, FaChartLine, FaRobot } from 'react-icons/fa';
import { useLanguage } from '@/context/LanguageContext';

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6 }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

// Brand slogans to cycle through
const getBrandSlogans = (t) => [
  t('hero.slogan1'),
  t('hero.slogan2'),
  t('hero.slogan3')
];

export default function Home() {
  const { t } = useLanguage();
  const [currentSlogan, setCurrentSlogan] = useState(0);
  const brandSlogans = getBrandSlogans(t);

  // Cycle through slogans
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlogan(prev => (prev + 1) % brandSlogans.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [brandSlogans.length]);

  return (
    <Layout title="HoloCAN - Canada-China Smart Trade Matching Platform">
      <Head>
        <meta name="description" content="HoloCAN is an intelligent cross-border trade platform connecting Chinese and Canadian businesses, offering virtual exhibitions, AI matching, and supply chain management services." />
      </Head>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center p-4 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/canda_photo.png"
            alt="Canadian Business Environment"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-white/60"></div>
        </div>

        <div className="container relative z-10 mx-auto">
          <motion.div 
            className="max-w-3xl mx-auto text-center"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6 hero-text leading-tight">
              <span className="text-primary">{t('hero.title')}</span>
            </h1>
            <div className="h-16 mb-6">
              <AnimatePresence mode="wait">
                <motion.p
                  key={currentSlogan}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="text-2xl md:text-3xl font-bold text-gray-800"
                >
                  {brandSlogans[currentSlogan]}
                </motion.p>
              </AnimatePresence>
            </div>
            <p className="text-xl md:text-2xl mb-8 text-gray-700">
              {t('hero.description')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/matching" className="bg-primary hover:bg-button-hover text-white font-medium rounded-md text-lg px-8 py-4 transition-all duration-300">
                {t('hero.button.matching')}
              </Link>
              <Link href="/exhibition" className="bg-white border-2 border-primary text-primary hover:bg-primary/5 font-medium rounded-md text-lg px-8 py-4 transition-all duration-300">
                {t('hero.button.exhibition')}
              </Link>
            </div>
          </motion.div>
        </div>

        <div className="absolute bottom-10 left-0 right-0 flex justify-center">
          <motion.div 
            className="animate-bounce"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
          >
            <svg className="w-8 h-8 text-primary" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
              <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
            </svg>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background-dark">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center max-w-3xl mx-auto mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeIn}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-6">
              {t('features.title')}
            </h2>
            <p className="text-text-secondary text-lg">
              {t('features.description')}
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            <motion.div variants={fadeIn} className="bg-white p-6 rounded-xl shadow-card hover:shadow-lg transition-shadow duration-300">
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-primary text-2xl mb-4">
                <FaVrCardboard />
              </div>
              <h3 className="text-xl font-bold text-text-primary mt-6 mb-4">{t('features.virtual.title')}</h3>
              <p className="text-text-secondary">
                {t('features.virtual.description')}
              </p>
            </motion.div>

            <motion.div variants={fadeIn} className="bg-white p-6 rounded-xl shadow-card hover:shadow-lg transition-shadow duration-300">
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-primary text-2xl mb-4">
                <FaRobot />
              </div>
              <h3 className="text-xl font-bold text-text-primary mt-6 mb-4">{t('features.ai.title')}</h3>
              <p className="text-text-secondary">
                {t('features.ai.description')}
              </p>
            </motion.div>

            <motion.div variants={fadeIn} className="bg-white p-6 rounded-xl shadow-card hover:shadow-lg transition-shadow duration-300">
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-primary text-2xl mb-4">
                <FaSearch />
              </div>
              <h3 className="text-xl font-bold text-text-primary mt-6 mb-4">{t('features.market.title')}</h3>
              <p className="text-text-secondary">
                {t('features.market.description')}
              </p>
            </motion.div>

            <motion.div variants={fadeIn} className="bg-white p-6 rounded-xl shadow-card hover:shadow-lg transition-shadow duration-300">
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-primary text-2xl mb-4">
                <FaChartLine />
              </div>
              <h3 className="text-xl font-bold text-text-primary mt-6 mb-4">{t('features.growth.title')}</h3>
              <p className="text-text-secondary">
                {t('features.growth.description')}
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Virtual Exhibition Demo Section */}
      <section className="py-20 bg-background-light relative">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeIn}
              className="order-2 lg:order-1"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-6">
                {t('exhibition.title')}
              </h2>
              <p className="text-text-secondary text-lg mb-6">
                {t('exhibition.description')}
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-primary flex items-center justify-center mt-1">
                    <span className="text-xs font-bold text-white">✓</span>
                  </div>
                  <span className="ml-3 text-text-secondary">{t('exhibition.point1')}</span>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-primary flex items-center justify-center mt-1">
                    <span className="text-xs font-bold text-white">✓</span>
                  </div>
                  <span className="ml-3 text-text-secondary">{t('exhibition.point2')}</span>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-primary flex items-center justify-center mt-1">
                    <span className="text-xs font-bold text-white">✓</span>
                  </div>
                  <span className="ml-3 text-text-secondary">{t('exhibition.point3')}</span>
                </li>
              </ul>
              <Link href="/exhibition" className="bg-primary hover:bg-button-hover text-white font-medium rounded-md px-6 py-3 transition-all duration-300">
                {t('exhibition.button')}
              </Link>
            </motion.div>

            {/* Preserve the right side with exhibition image */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeIn}
              className="order-1 lg:order-2"
            >
              <div className="relative h-80 md:h-[500px] w-full rounded-xl overflow-hidden shadow-lg">
                <Image
                  src="/canda_photo (2).png"
                  alt="Virtual Exhibition"
                  fill
                  className="object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* AI Matching Demo Section */}
      <section className="py-20 bg-background-darker relative">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeIn}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-primary/20 aspect-video">
                <Image
                  src="/canda_photo (3).png"
                  alt="AI Matching System"
                  width={800}
                  height={450}
                  className="object-cover w-full h-full"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background-darker/80 to-transparent"></div>
              </div>
              
              <div className="absolute -top-6 -right-6 bg-primary text-white p-4 rounded-lg shadow-xl">
                <span className="block text-3xl font-bold">98%</span>
                <span className="text-sm">Matching Success Rate</span>
              </div>
            </motion.div>
            
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeIn}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
                {t('matching.title')}
              </h2>
              <p className="text-gray-700 text-lg mb-6 font-medium">
                {t('matching.description')}
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-primary flex items-center justify-center mt-1">
                    <span className="text-xs font-bold">✓</span>
                  </div>
                  <span className="ml-3 text-gray-700 font-medium">{t('matching.point1')}</span>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-primary flex items-center justify-center mt-1">
                    <span className="text-xs font-bold">✓</span>
                  </div>
                  <span className="ml-3 text-gray-700 font-medium">{t('matching.point2')}</span>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-primary flex items-center justify-center mt-1">
                    <span className="text-xs font-bold">✓</span>
                  </div>
                  <span className="ml-3 text-gray-700 font-medium">{t('matching.point3')}</span>
                </li>
              </ul>
              <Link href="/matching" className="btn-primary">
                {t('matching.button')}
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Case Display Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center max-w-3xl mx-auto mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeIn}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              {t('cases.title')}
            </h2>
            <p className="text-gray-700 text-lg font-medium">
              {t('cases.description')}
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            <motion.div variants={fadeIn} className="bg-white rounded-xl overflow-hidden shadow-xl">
              <div className="relative h-56">
                <Image
                  src="/canda_photo (5).png"
                  alt="Vancouver Technology Company"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">{t('cases.case1.title')}</h3>
                <p className="text-gray-700 mb-4">
                  {t('cases.case1.description')}
                </p>
                <div className="flex items-center text-primary">
                  <span className="text-sm font-medium">{t('cases.learnMore')}</span>
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
              </div>
            </motion.div>

            <motion.div variants={fadeIn} className="bg-white rounded-xl overflow-hidden shadow-xl">
              <div className="relative h-56">
                <Image
                  src="/canda_photo (6).png"
                  alt="Shanghai Trading Company"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">{t('cases.case2.title')}</h3>
                <p className="text-gray-700 mb-4">
                  {t('cases.case2.description')}
                </p>
                <div className="flex items-center text-primary">
                  <span className="text-sm font-medium">{t('cases.learnMore')}</span>
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
              </div>
            </motion.div>

            <motion.div variants={fadeIn} className="bg-white rounded-xl overflow-hidden shadow-xl">
              <div className="relative h-56">
                <Image
                  src="/canda_photo (7).png"
                  alt="Toronto Food Company"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">{t('cases.case3.title')}</h3>
                <p className="text-gray-700 mb-4">
                  {t('cases.case3.description')}
                </p>
                <div className="flex items-center text-primary">
                  <span className="text-sm font-medium">{t('cases.learnMore')}</span>
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/canda_photo (8).png"
            alt="Canadian Business Environment"
            fill
            className="object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white/80 to-white/60"></div>
        </div>

        <div className="container relative z-10 mx-auto px-4">
          <motion.div 
            className="max-w-3xl mx-auto text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeIn}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-gray-800 leading-tight">
              {t('cta.title')}
            </h2>
            <p className="text-xl mb-8 text-gray-700 font-medium">
              {t('cta.description')}
            </p>
            <Link href="/register" className="btn-primary text-lg px-10 py-4">
              {t('cta.button')}
            </Link>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
} 