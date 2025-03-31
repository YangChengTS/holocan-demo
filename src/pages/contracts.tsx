import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaBalanceScale, FaFileContract, FaGlobe, FaHandshake, FaQuestion, FaUniversity } from 'react-icons/fa';
import { HiDocumentText, HiOutlineDocumentSearch } from 'react-icons/hi';
import Image from 'next/image';
import Layout from '@/components/layout/Layout';
import { useLanguage } from '@/context/LanguageContext';

// 合同模板数据
const contractTemplates = [
  {
    id: 1,
    title: {
      en: 'International Sales Contract',
      zh: '国际销售合同'
    },
    description: {
      en: 'Standard template for cross-border product sales between Canadian and Chinese enterprises.',
      zh: '加中企业间跨境产品销售的标准合同模板。'
    },
    icon: <FaFileContract className="text-4xl text-primary" />
  },
  {
    id: 2,
    title: {
      en: 'Distribution Agreement',
      zh: '分销协议'
    },
    description: {
      en: 'Legal framework for establishing distribution channels in foreign markets.',
      zh: '在海外市场建立分销渠道的法律框架。'
    },
    icon: <FaGlobe className="text-4xl text-primary" />
  },
  {
    id: 3,
    title: {
      en: 'Joint Venture Agreement',
      zh: '合资企业协议'
    },
    description: {
      en: 'Comprehensive template for establishing joint ventures between Canadian and Chinese companies.',
      zh: '加中企业建立合资企业的综合协议模板。'
    },
    icon: <FaHandshake className="text-4xl text-primary" />
  },
  {
    id: 4,
    title: {
      en: 'Intellectual Property License',
      zh: '知识产权许可协议'
    },
    description: {
      en: 'Protection framework for IP rights in cross-border business cooperation.',
      zh: '跨境业务合作中知识产权保护的框架协议。'
    },
    icon: <FaUniversity className="text-4xl text-primary" />
  }
];

// 法律服务数据
const legalServices = [
  {
    id: 1,
    title: {
      en: 'Contract Review',
      zh: '合同审核'
    },
    description: {
      en: 'Professional review of international contracts by legal experts familiar with both Canadian and Chinese laws.',
      zh: '由熟悉加拿大和中国法律的专业人士对国际合同进行审核。'
    }
  },
  {
    id: 2,
    title: {
      en: 'Legal Consultation',
      zh: '法律咨询'
    },
    description: {
      en: 'One-on-one consultation with experienced international trade attorneys.',
      zh: '与经验丰富的国际贸易律师一对一咨询。'
    }
  },
  {
    id: 3,
    title: {
      en: 'Dispute Resolution',
      zh: '争议解决'
    },
    description: {
      en: 'Mediation and arbitration services for cross-border trade disputes.',
      zh: '跨境贸易纠纷的调解和仲裁服务。'
    }
  }
];

// 法规指南数据
const regulations = [
  {
    id: 1,
    title: {
      en: 'Canadian Import Regulations',
      zh: '加拿大进口法规'
    },
    description: {
      en: 'Guidelines on Canadian customs procedures, tariffs, and product standards.',
      zh: '关于加拿大海关程序、关税和产品标准的指南。'
    }
  },
  {
    id: 2,
    title: {
      en: 'Chinese Export Controls',
      zh: '中国出口管制'
    },
    description: {
      en: 'Information on Chinese export requirements, licenses, and compliance issues.',
      zh: '关于中国出口要求、许可证和合规问题的信息。'
    }
  },
  {
    id: 3,
    title: {
      en: 'Intellectual Property Protection',
      zh: '知识产权保护'
    },
    description: {
      en: 'Comparative analysis of IP protection in Canada and China with practical recommendations.',
      zh: '加拿大和中国知识产权保护的比较分析，并提供实用建议。'
    }
  },
  {
    id: 4,
    title: {
      en: 'Tax Considerations',
      zh: '税务考量'
    },
    description: {
      en: 'Overview of tax implications for cross-border trade between Canada and China.',
      zh: '加中跨境贸易的税务影响概述。'
    }
  }
];

// FAQs数据
const faqs = [
  {
    id: 1,
    question: {
      en: 'What legal system applies to contracts between Canadian and Chinese companies?',
      zh: '加拿大和中国公司之间的合同适用哪种法律体系？'
    },
    answer: {
      en: 'Contracts between Canadian and Chinese companies should explicitly state the governing law. Parties can choose either Canadian or Chinese law, or opt for a neutral third country's law. The choice of law will significantly impact contract interpretation and enforcement.',
      zh: '加中公司间的合同应明确规定适用法律。双方可以选择加拿大法律、中国法律，或选择中立的第三国法律。法律选择将显著影响合同解释和执行。'
    }
  },
  {
    id: 2,
    question: {
      en: 'How can we ensure contract enforceability across borders?',
      zh: '如何确保合同在跨境情况下的可执行性？'
    },
    answer: {
      en: 'To ensure enforceability, contracts should include clear dispute resolution mechanisms (preferably arbitration), explicit governing law clauses, proper authentication of documents, and consideration of both countries' mandatory legal requirements.',
      zh: '为确保可执行性，合同应包含明确的争议解决机制（最好是仲裁），明确的适用法律条款，文件的适当认证，并考虑两国的强制性法律要求。'
    }
  },
  {
    id: 3,
    question: {
      en: 'What are the main regulatory challenges in Canada-China trade?',
      zh: '加中贸易面临的主要监管挑战是什么？'
    },
    answer: {
      en: 'Main challenges include differing product standards and certification requirements, import/export restrictions on certain goods, intellectual property protection disparities, and data privacy regulations that vary significantly between the two countries.',
      zh: '主要挑战包括不同的产品标准和认证要求，某些商品的进出口限制，知识产权保护差异，以及两国之间差异显著的数据隐私法规。'
    }
  }
];

const ContractsPage = () => {
  const { language, t } = useLanguage();
  const [activeTab, setActiveTab] = useState('templates');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const toggleFaq = (id: number) => {
    setExpandedFaq(expandedFaq === id ? null : id);
  };
  
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };
  
  return (
    <Layout title={language === 'en' ? 'Contracts & Legal Services | HoloCAN' : '合同与法务服务 | HoloCAN'}>
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-b from-background-dark to-background-light overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <motion.h1 
              className="text-4xl md:text-5xl font-bold mb-4 text-text-light"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {language === 'en' ? 'Contracts & Legal Services' : '合同与法务服务'}
            </motion.h1>
            <motion.p 
              className="text-xl text-text-secondary max-w-3xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {language === 'en' 
                ? 'Comprehensive legal support for smooth cross-border business cooperation between Canadian and Chinese enterprises' 
                : '为中加企业跨境商务合作提供全面法律支持'}
            </motion.p>
          </div>
          
          {/* Navigation Tabs */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <button
              onClick={() => setActiveTab('templates')}
              className={`px-5 py-3 rounded-lg font-medium transition-all ${
                activeTab === 'templates' 
                  ? 'bg-primary text-white shadow-lg' 
                  : 'bg-white/10 text-text-light hover:bg-white/20'
              }`}
            >
              <div className="flex items-center gap-2">
                <HiDocumentText />
                <span>{language === 'en' ? 'Contract Templates' : '合同模板'}</span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab('services')}
              className={`px-5 py-3 rounded-lg font-medium transition-all ${
                activeTab === 'services' 
                  ? 'bg-primary text-white shadow-lg' 
                  : 'bg-white/10 text-text-light hover:bg-white/20'
              }`}
            >
              <div className="flex items-center gap-2">
                <FaBalanceScale />
                <span>{language === 'en' ? 'Legal Services' : '法律服务'}</span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab('regulations')}
              className={`px-5 py-3 rounded-lg font-medium transition-all ${
                activeTab === 'regulations' 
                  ? 'bg-primary text-white shadow-lg' 
                  : 'bg-white/10 text-text-light hover:bg-white/20'
              }`}
            >
              <div className="flex items-center gap-2">
                <HiOutlineDocumentSearch />
                <span>{language === 'en' ? 'Trade Regulations' : '贸易法规'}</span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab('faq')}
              className={`px-5 py-3 rounded-lg font-medium transition-all ${
                activeTab === 'faq' 
                  ? 'bg-primary text-white shadow-lg' 
                  : 'bg-white/10 text-text-light hover:bg-white/20'
              }`}
            >
              <div className="flex items-center gap-2">
                <FaQuestion />
                <span>{language === 'en' ? 'FAQs' : '常见问题'}</span>
              </div>
            </button>
          </div>
        </div>
        
        {/* Background decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
          <div className="absolute top-10 right-10 w-64 h-64 bg-primary/5 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-10 left-10 w-96 h-96 bg-secondary/5 rounded-full filter blur-3xl"></div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 bg-background-light">
        <div className="container mx-auto px-4">
          {/* Contract Templates */}
          {activeTab === 'templates' && (
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
            >
              <div className="max-w-4xl mx-auto mb-12 text-center">
                <h2 className="text-3xl font-bold mb-4 text-text-dark">
                  {language === 'en' ? 'Standard Contract Templates' : '标准合同模板'}
                </h2>
                <p className="text-text-secondary text-lg mb-8">
                  {language === 'en' 
                    ? 'Pre-drafted templates to streamline your cross-border business arrangements' 
                    : '预先起草的模板，简化您的跨境商业安排'}
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                {contractTemplates.map((template) => (
                  <motion.div
                    key={template.id}
                    className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all border border-border"
                    whileHover={{ y: -5 }}
                  >
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-primary/10 rounded-lg">
                        {template.icon}
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold mb-2 text-text-dark">
                          {template.title[language as 'en' | 'zh']}
                        </h3>
                        <p className="text-text-secondary mb-4">
                          {template.description[language as 'en' | 'zh']}
                        </p>
                        <button className="text-primary font-medium flex items-center gap-1 hover:underline">
                          {language === 'en' ? 'Preview template' : '预览模板'}
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              <div className="bg-primary/5 rounded-2xl p-8 max-w-4xl mx-auto">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                  <div>
                    <h3 className="text-2xl font-bold mb-2 text-text-dark">
                      {language === 'en' ? 'Need a Customized Contract?' : '需要定制合同？'}
                    </h3>
                    <p className="text-text-secondary">
                      {language === 'en' 
                        ? 'Our legal experts can tailor contracts to your specific business needs' 
                        : '我们的法律专家可以根据您的特定业务需求定制合同'}
                    </p>
                  </div>
                  <button className="bg-primary hover:bg-button-hover text-white px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition whitespace-nowrap">
                    {language === 'en' ? 'Request Custom Template' : '请求定制模板'}
                  </button>
                </div>
              </div>
            </motion.div>
          )}
          
          {/* Legal Services */}
          {activeTab === 'services' && (
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
            >
              <div className="max-w-4xl mx-auto mb-12 text-center">
                <h2 className="text-3xl font-bold mb-4 text-text-dark">
                  {language === 'en' ? 'Expert Legal Services' : '专家法律服务'}
                </h2>
                <p className="text-text-secondary text-lg mb-8">
                  {language === 'en' 
                    ? 'Professional support from legal experts familiar with Canada-China trade regulations' 
                    : '来自熟悉中加贸易法规的法律专家的专业支持'}
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                {legalServices.map((service) => (
                  <motion.div
                    key={service.id}
                    className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all border border-border h-full flex flex-col"
                    whileHover={{ y: -5 }}
                  >
                    <h3 className="text-xl font-semibold mb-3 text-text-dark">
                      {service.title[language as 'en' | 'zh']}
                    </h3>
                    <p className="text-text-secondary mb-6 flex-grow">
                      {service.description[language as 'en' | 'zh']}
                    </p>
                    <button className="text-primary font-medium flex items-center gap-1 hover:underline mt-auto">
                      {language === 'en' ? 'Learn more' : '了解更多'}
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </motion.div>
                ))}
              </div>
              
              <div className="bg-gradient-to-r from-primary/80 to-primary rounded-2xl p-8 max-w-4xl mx-auto text-white">
                <div className="flex flex-col md:flex-row items-center gap-8">
                  <div className="flex-shrink-0 w-24 h-24 bg-white/20 rounded-full flex items-center justify-center">
                    <FaBalanceScale className="text-4xl" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-3">
                      {language === 'en' ? 'Schedule a Consultation' : '预约咨询'}
                    </h3>
                    <p className="mb-4 text-white/90">
                      {language === 'en' 
                        ? 'Connect with our bilingual legal advisors to discuss your specific business needs and challenges' 
                        : '与我们的双语法律顾问联系，讨论您的特定业务需求和挑战'}
                    </p>
                    <button className="bg-white text-primary hover:bg-white/90 px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition">
                      {language === 'en' ? 'Book Appointment' : '预约会议'}
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
          
          {/* Trade Regulations */}
          {activeTab === 'regulations' && (
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
            >
              <div className="max-w-4xl mx-auto mb-12 text-center">
                <h2 className="text-3xl font-bold mb-4 text-text-dark">
                  {language === 'en' ? 'Cross-Border Trade Regulations' : '跨境贸易法规'}
                </h2>
                <p className="text-text-secondary text-lg mb-8">
                  {language === 'en' 
                    ? 'Essential information on regulatory requirements for Canada-China business' 
                    : '中加业务监管要求的重要信息'}
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                {regulations.map((regulation) => (
                  <motion.div
                    key={regulation.id}
                    className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all border border-border"
                    whileHover={{ y: -5 }}
                  >
                    <h3 className="text-xl font-semibold mb-3 text-text-dark">
                      {regulation.title[language as 'en' | 'zh']}
                    </h3>
                    <p className="text-text-secondary mb-4">
                      {regulation.description[language as 'en' | 'zh']}
                    </p>
                    <div className="flex justify-between items-center">
                      <button className="text-primary font-medium flex items-center gap-1 hover:underline">
                        {language === 'en' ? 'Read full guide' : '阅读完整指南'}
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                      <span className="text-sm text-text-secondary">PDF, 1.2MB</span>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              <div className="bg-secondary/10 rounded-2xl p-8 max-w-4xl mx-auto">
                <h3 className="text-2xl font-bold mb-4 text-text-dark">
                  {language === 'en' ? 'Regulatory Updates Service' : '法规更新服务'}
                </h3>
                <p className="text-text-secondary mb-6">
                  {language === 'en' 
                    ? 'Stay informed about the latest changes in cross-border trade regulations between Canada and China' 
                    : '及时了解中加跨境贸易法规的最新变化'}
                </p>
                <div className="flex flex-wrap gap-4">
                  <input 
                    type="email" 
                    placeholder={language === 'en' ? 'Your email address' : '您的电子邮箱'} 
                    className="px-4 py-3 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary/50 flex-grow"
                  />
                  <button className="bg-secondary hover:bg-secondary/90 text-white px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition whitespace-nowrap">
                    {language === 'en' ? 'Subscribe to Updates' : '订阅更新'}
                  </button>
                </div>
              </div>
            </motion.div>
          )}
          
          {/* FAQs */}
          {activeTab === 'faq' && (
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              className="max-w-4xl mx-auto"
            >
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4 text-text-dark">
                  {language === 'en' ? 'Frequently Asked Questions' : '常见问题'}
                </h2>
                <p className="text-text-secondary text-lg">
                  {language === 'en' 
                    ? 'Common legal questions about Canada-China business cooperation' 
                    : '关于中加商业合作的常见法律问题'}
                </p>
              </div>
              
              <div className="space-y-6">
                {faqs.map((faq) => (
                  <div 
                    key={faq.id} 
                    className="bg-white rounded-xl shadow-md overflow-hidden border border-border"
                  >
                    <button 
                      className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50"
                      onClick={() => toggleFaq(faq.id)}
                    >
                      <h3 className="text-lg font-medium text-text-dark">
                        {faq.question[language as 'en' | 'zh']}
                      </h3>
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className={`h-5 w-5 transition-transform ${expandedFaq === faq.id ? 'transform rotate-180' : ''}`} 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    {expandedFaq === faq.id && (
                      <motion.div 
                        className="px-6 py-4 bg-gray-50"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <p className="text-text-secondary">
                          {faq.answer[language as 'en' | 'zh']}
                        </p>
                      </motion.div>
                    )}
                  </div>
                ))}
              </div>
              
              <div className="mt-12 bg-primary/5 rounded-2xl p-8 text-center">
                <h3 className="text-xl font-bold mb-4 text-text-dark">
                  {language === 'en' ? 'Still Have Questions?' : '还有疑问？'}
                </h3>
                <p className="text-text-secondary mb-6">
                  {language === 'en' 
                    ? 'Our legal team is ready to assist with your specific inquiries' 
                    : '我们的法律团队随时准备协助解答您的具体问题'}
                </p>
                <button className="bg-primary hover:bg-button-hover text-white px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition">
                  {language === 'en' ? 'Contact Legal Support' : '联系法律支持'}
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default ContractsPage; 