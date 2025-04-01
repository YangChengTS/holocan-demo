import React from 'react';
import Layout from '../components/layout/Layout';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';

const FinancingPage = () => {
  const { t } = useLanguage();

  const services = [
    {
      id: 1,
      title: t('financing.trade.title'),
      description: t('financing.trade.description'),
      icon: '/icons/trade-finance.svg'
    },
    {
      id: 2,
      title: t('financing.credit.title'),
      description: t('financing.credit.description'),
      icon: '/icons/credit-service.svg'
    },
    {
      id: 3,
      title: t('financing.insurance.title'),
      description: t('financing.insurance.description'),
      icon: '/icons/insurance-service.svg'
    }
  ];

  const processSteps = [
    {
      id: 1,
      title: t('financing.process.step1'),
      description: t('financing.process.step1.desc')
    },
    {
      id: 2,
      title: t('financing.process.step2'),
      description: t('financing.process.step2.desc')
    },
    {
      id: 3,
      title: t('financing.process.step3'),
      description: t('financing.process.step3.desc')
    },
    {
      id: 4,
      title: t('financing.process.step4'),
      description: t('financing.process.step4.desc')
    }
  ];

  return (
    <Layout
      title={`${t('financing.title')} | HoloCAN`}
      description={t('financing.subtitle')}
    >
      <div className="container mx-auto px-4 pt-24 pb-8">
        {/* 标题区域 */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold mb-4">{t('financing.title')}</h1>
          <p className="text-gray-600 dark:text-gray-300">{t('financing.subtitle')}</p>
        </div>

        {/* 服务卡片区域 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
            >
              <Image
                src={service.icon}
                alt={service.title}
                width={48}
                height={48}
                className="mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
              <p className="text-gray-600 dark:text-gray-300">{service.description}</p>
            </motion.div>
          ))}
        </div>

        {/* 申请流程 */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-center mb-8">{t('financing.process.title')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  {step.id}
                </div>
                <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* 合作机构 */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-center mb-8">{t('financing.partners.title')}</h2>
          <div className="grid grid-cols-3 gap-8 max-w-4xl mx-auto">
            <Image src="/RBC.svg" alt="RBC" width={200} height={80} className="mx-auto" />
            <Image src="/BMO.svg" alt="BMO" width={200} height={80} className="mx-auto" />
            <Image src="/CIBC.svg" alt="CIBC" width={200} height={80} className="mx-auto" />
          </div>
        </section>

        {/* 申请表单 */}
        <section className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-8">{t('financing.form.title')}</h2>
          <form className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2" htmlFor="company">
                {t('financing.form.company')}
              </label>
              <input
                type="text"
                id="company"
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2" htmlFor="contact">
                {t('financing.form.contact')}
              </label>
              <input
                type="email"
                id="contact"
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2" htmlFor="requirements">
                {t('financing.form.requirements')}
              </label>
              <textarea
                id="requirements"
                rows={4}
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary"
              />
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="px-8 py-3 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors"
              >
                {t('financing.form.submit')}
              </button>
            </div>
          </form>
        </section>
      </div>
    </Layout>
  );
};

export default FinancingPage; 