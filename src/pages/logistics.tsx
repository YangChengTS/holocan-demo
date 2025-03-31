import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Layout from '@/components/layout/Layout';
import { useLanguage } from '@/context/LanguageContext';
import { FaShip, FaPlane, FaTruck, FaBoxOpen, FaFileAlt, FaSearch, FaChartLine } from 'react-icons/fa';
import { MdSecurity, MdTimeline } from 'react-icons/md';
import { BiWorld } from 'react-icons/bi';

// 物流解决方案数据
const logisticsSolutions = [
  {
    id: 1,
    title: {
      en: 'Air Freight',
      zh: '空运服务'
    },
    description: {
      en: 'Fast and reliable air transport solutions between Canada and China for time-sensitive shipments.',
      zh: '中加之间快速可靠的空运方案，适用于时间敏感的货物。'
    },
    icon: <FaPlane className="text-4xl text-primary" />,
    features: [
      { en: 'Express delivery within 3-5 business days', zh: '3-5个工作日内快速送达' },
      { en: 'Real-time shipment tracking', zh: '实时货物追踪' },
      { en: 'Customs clearance assistance', zh: '海关清关协助' },
      { en: 'Suitable for high-value and urgent goods', zh: '适合高价值和紧急货物' }
    ]
  },
  {
    id: 2,
    title: {
      en: 'Sea Freight',
      zh: '海运服务'
    },
    description: {
      en: 'Cost-effective ocean shipping for bulk cargo and large shipments between Canadian and Chinese ports.',
      zh: '中加港口之间的大宗货物和大型货物的经济高效海运。'
    },
    icon: <FaShip className="text-4xl text-primary" />,
    features: [
      { en: 'Full container load (FCL) and less than container load (LCL) options', zh: '整箱(FCL)和拼箱(LCL)选项' },
      { en: 'Regular sailing schedules', zh: '定期船期安排' },
      { en: 'Competitive rates for large shipments', zh: '大货物优惠运费' },
      { en: 'Specialized handling for oversized cargo', zh: '超大货物专业处理' }
    ]
  },
  {
    id: 3,
    title: {
      en: 'Multimodal Transport',
      zh: '多式联运'
    },
    description: {
      en: 'Integrated transportation solutions combining air, sea, and land for optimal efficiency and cost-effectiveness.',
      zh: '结合空运、海运和陆运的综合运输解决方案，实现最佳效率和成本效益。'
    },
    icon: <BiWorld className="text-4xl text-primary" />,
    features: [
      { en: 'Door-to-door delivery service', zh: '门到门配送服务' },
      { en: 'Optimized routing for cost and time', zh: '成本和时间优化路线' },
      { en: 'Single point of contact for entire shipment', zh: '整个运输过程的单一联系点' },
      { en: 'Flexible transportation options', zh: '灵活的运输选择' }
    ]
  },
  {
    id: 4,
    title: {
      en: 'Warehousing & Distribution',
      zh: '仓储与配送'
    },
    description: {
      en: 'Strategic storage and distribution services in both Canada and China to support your supply chain needs.',
      zh: '在中国和加拿大的战略仓储和配送服务，支持您的供应链需求。'
    },
    icon: <FaBoxOpen className="text-4xl text-primary" />,
    features: [
      { en: 'Temperature-controlled facilities', zh: '温控仓储设施' },
      { en: 'Inventory management systems', zh: '库存管理系统' },
      { en: 'Order fulfillment services', zh: '订单履行服务' },
      { en: 'Cross-docking capabilities', zh: '直接转运能力' }
    ]
  }
];

// 清关服务数据
const customsServices = [
  {
    id: 1,
    title: {
      en: 'Import Customs Clearance',
      zh: '进口清关服务'
    },
    description: {
      en: 'Comprehensive customs clearance services for goods entering Canada and China, ensuring compliance with import regulations.',
      zh: '全面的中加两国进口清关服务，确保符合进口法规。'
    },
    icon: <FaFileAlt className="text-3xl text-primary" />
  },
  {
    id: 2,
    title: {
      en: 'Export Documentation',
      zh: '出口文件准备'
    },
    description: {
      en: 'Professional preparation of all required export documents for smooth customs processing.',
      zh: '专业准备所有必需的出口文件，确保顺利通关。'
    },
    icon: <FaSearch className="text-3xl text-primary" />
  },
  {
    id: 3,
    title: {
      en: 'Tariff Classification',
      zh: '关税分类'
    },
    description: {
      en: 'Expert determination of the correct tariff codes for your products to optimize duty payments.',
      zh: '专业确定产品的正确关税代码，优化关税支付。'
    },
    icon: <FaChartLine className="text-3xl text-primary" />
  },
  {
    id: 4,
    title: {
      en: 'Customs Compliance',
      zh: '海关合规服务'
    },
    description: {
      en: 'Ensuring your cross-border shipments meet all regulatory requirements in both countries.',
      zh: '确保您的跨境货物符合两国的所有监管要求。'
    },
    icon: <MdSecurity className="text-3xl text-primary" />
  }
];

// 模拟跟踪数据
const trackingSteps = [
  {
    status: {
      en: 'Order Confirmed',
      zh: '订单确认'
    },
    date: '2023-12-15 08:30',
    location: {
      en: 'Shanghai, China',
      zh: '中国上海'
    },
    description: {
      en: 'Your shipment has been confirmed and is awaiting pickup.',
      zh: '您的货物已确认，等待取件。'
    },
    completed: true
  },
  {
    status: {
      en: 'Picked Up',
      zh: '已取件'
    },
    date: '2023-12-16 14:45',
    location: {
      en: 'Shanghai Logistics Center',
      zh: '上海物流中心'
    },
    description: {
      en: 'Your shipment has been picked up and is being prepared for export.',
      zh: '您的货物已取件，正在准备出口。'
    },
    completed: true
  },
  {
    status: {
      en: 'Export Customs Clearance',
      zh: '出口清关'
    },
    date: '2023-12-17 09:15',
    location: {
      en: 'Shanghai Customs',
      zh: '上海海关'
    },
    description: {
      en: 'Your shipment is undergoing export customs clearance procedures.',
      zh: '您的货物正在接受出口清关程序。'
    },
    completed: true
  },
  {
    status: {
      en: 'In Transit',
      zh: '运输中'
    },
    date: '2023-12-18 22:30',
    location: {
      en: 'International',
      zh: '国际航线'
    },
    description: {
      en: 'Your shipment is in transit to the destination country.',
      zh: '您的货物正在运往目的国。'
    },
    completed: true
  },
  {
    status: {
      en: 'Arrived at Destination',
      zh: '到达目的地'
    },
    date: '2023-12-22 06:45',
    location: {
      en: 'Vancouver, Canada',
      zh: '加拿大温哥华'
    },
    description: {
      en: 'Your shipment has arrived in the destination country.',
      zh: '您的货物已抵达目的国。'
    },
    completed: true
  },
  {
    status: {
      en: 'Import Customs Clearance',
      zh: '进口清关'
    },
    date: '2023-12-23 11:20',
    location: {
      en: 'Canadian Customs',
      zh: '加拿大海关'
    },
    description: {
      en: 'Your shipment is undergoing import customs clearance procedures.',
      zh: '您的货物正在接受进口清关程序。'
    },
    completed: true
  },
  {
    status: {
      en: 'Out for Delivery',
      zh: '派送中'
    },
    date: '2023-12-24 09:30',
    location: {
      en: 'Vancouver Distribution Center',
      zh: '温哥华配送中心'
    },
    description: {
      en: 'Your shipment is out for delivery to the final destination.',
      zh: '您的货物正在派送至最终目的地。'
    },
    completed: false
  },
  {
    status: {
      en: 'Delivered',
      zh: '已送达'
    },
    date: '',
    location: {
      en: 'Toronto, Canada',
      zh: '加拿大多伦多'
    },
    description: {
      en: 'Your shipment has been delivered successfully.',
      zh: '您的货物已成功送达。'
    },
    completed: false
  }
];

const LogisticsPage = () => {
  const { language, t } = useLanguage();
  const [activeTab, setActiveTab] = useState('solutions');
  const [trackingNumber, setTrackingNumber] = useState('');
  const [showTracking, setShowTracking] = useState(false);
  
  // 模拟跟踪提交
  const handleTrackingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (trackingNumber.trim() !== '') {
      setShowTracking(true);
    }
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
    <Layout title={language === 'en' ? 'Cross-border Logistics | HoloCAN' : '跨境物流 | HoloCAN'}>
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
              {language === 'en' ? 'Cross-border Logistics Solutions' : '跨境物流解决方案'}
            </motion.h1>
            <motion.p 
              className="text-xl text-text-secondary max-w-3xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {language === 'en' 
                ? 'Reliable and efficient logistics services between Canada and China to streamline your cross-border trade' 
                : '可靠高效的中加物流服务，简化您的跨境贸易流程'}
            </motion.p>
          </div>
          
          {/* Tracking Form */}
          <motion.div 
            className="max-w-2xl mx-auto bg-white rounded-xl shadow-xl p-6 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h3 className="text-xl font-semibold mb-4 text-text-dark">
              {language === 'en' ? 'Track Your Shipment' : '追踪您的货物'}
            </h3>
            <form onSubmit={handleTrackingSubmit} className="flex flex-col md:flex-row gap-4">
              <input
                type="text"
                placeholder={language === 'en' ? 'Enter tracking number' : '输入追踪号码'}
                className="flex-grow px-4 py-3 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary/50"
                value={trackingNumber}
                onChange={(e) => setTrackingNumber(e.target.value)}
                required
              />
              <button
                type="submit"
                className="bg-primary hover:bg-button-hover text-white px-6 py-3 rounded-lg transition-all"
              >
                {language === 'en' ? 'Track' : '追踪'}
              </button>
            </form>
          </motion.div>
          
          {/* Navigation Tabs */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <button
              onClick={() => setActiveTab('solutions')}
              className={`px-5 py-3 rounded-lg font-medium transition-all ${
                activeTab === 'solutions' 
                  ? 'bg-primary text-white shadow-lg' 
                  : 'bg-white/10 text-text-light hover:bg-white/20'
              }`}
            >
              <div className="flex items-center gap-2">
                <FaTruck />
                <span>{language === 'en' ? 'Logistics Solutions' : '物流方案'}</span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab('customs')}
              className={`px-5 py-3 rounded-lg font-medium transition-all ${
                activeTab === 'customs' 
                  ? 'bg-primary text-white shadow-lg' 
                  : 'bg-white/10 text-text-light hover:bg-white/20'
              }`}
            >
              <div className="flex items-center gap-2">
                <FaFileAlt />
                <span>{language === 'en' ? 'Customs Clearance' : '清关服务'}</span>
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
          {/* Logistics Solutions */}
          {activeTab === 'solutions' && (
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
            >
              <div className="max-w-4xl mx-auto mb-12 text-center">
                <h2 className="text-3xl font-bold mb-4 text-text-dark">
                  {language === 'en' ? 'Comprehensive Logistics Solutions' : '全方位物流解决方案'}
                </h2>
                <p className="text-text-secondary text-lg mb-8">
                  {language === 'en' 
                    ? 'Tailored transportation services to meet your cross-border shipping needs' 
                    : '根据您的跨境运输需求量身定制的运输服务'}
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                {logisticsSolutions.map((solution) => (
                  <motion.div
                    key={solution.id}
                    className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all border border-border"
                    whileHover={{ y: -5 }}
                  >
                    <div className="flex items-start gap-4 mb-4">
                      <div className="p-3 bg-primary/10 rounded-lg">
                        {solution.icon}
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold mb-2 text-text-dark">
                          {solution.title[language as 'en' | 'zh']}
                        </h3>
                        <p className="text-text-secondary">
                          {solution.description[language as 'en' | 'zh']}
                        </p>
                      </div>
                    </div>
                    <div className="pl-16">
                      <h4 className="font-medium text-text-dark mb-2">
                        {language === 'en' ? 'Key Features:' : '主要特点：'}
                      </h4>
                      <ul className="space-y-2">
                        {solution.features.map((feature, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <svg className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="text-text-secondary">
                              {feature[language as 'en' | 'zh']}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              {/* CTA Section */}
              <div className="bg-gradient-to-r from-primary/90 to-primary rounded-2xl p-8 max-w-4xl mx-auto text-white">
                <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                  <div>
                    <h3 className="text-2xl font-bold mb-3">
                      {language === 'en' ? 'Need a Customized Logistics Solution?' : '需要定制物流解决方案？'}
                    </h3>
                    <p className="mb-4 text-white/90">
                      {language === 'en' 
                        ? 'Our logistics experts can design a tailored solution for your specific needs' 
                        : '我们的物流专家可以为您的特定需求设计定制解决方案'}
                    </p>
                  </div>
                  <button className="bg-white text-primary hover:bg-white/90 px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition whitespace-nowrap">
                    {language === 'en' ? 'Request a Quote' : '获取报价'}
                  </button>
                </div>
              </div>
            </motion.div>
          )}
          
          {/* Customs Clearance */}
          {activeTab === 'customs' && (
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
            >
              <div className="max-w-4xl mx-auto mb-12 text-center">
                <h2 className="text-3xl font-bold mb-4 text-text-dark">
                  {language === 'en' ? 'Customs Clearance Services' : '清关服务'}
                </h2>
                <p className="text-text-secondary text-lg mb-8">
                  {language === 'en' 
                    ? 'Expert assistance with import and export customs procedures between Canada and China' 
                    : '中加之间进出口海关程序的专业协助'}
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                {customsServices.map((service) => (
                  <motion.div
                    key={service.id}
                    className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all border border-border"
                    whileHover={{ y: -5 }}
                  >
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-primary/10 rounded-lg">
                        {service.icon}
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold mb-2 text-text-dark">
                          {service.title[language as 'en' | 'zh']}
                        </h3>
                        <p className="text-text-secondary mb-4">
                          {service.description[language as 'en' | 'zh']}
                        </p>
                        <button className="text-primary font-medium flex items-center gap-1 hover:underline">
                          {language === 'en' ? 'Learn more' : '了解更多'}
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              {/* Regulation Info */}
              <div className="bg-secondary/10 rounded-2xl p-8 max-w-4xl mx-auto mb-12">
                <h3 className="text-2xl font-bold mb-4 text-text-dark">
                  {language === 'en' ? 'Trade Regulation Updates' : '贸易法规更新'}
                </h3>
                <p className="text-text-secondary mb-6">
                  {language === 'en' 
                    ? 'Stay informed about the latest customs regulations and trade policies between Canada and China' 
                    : '及时了解中加之间最新的海关法规和贸易政策'}
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
              
              {/* Benefits List */}
              <div className="max-w-4xl mx-auto">
                <h3 className="text-2xl font-bold mb-6 text-center text-text-dark">
                  {language === 'en' ? 'Benefits of Our Customs Services' : '我们清关服务的优势'}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-lg font-medium mb-2 text-text-dark">
                        {language === 'en' ? 'Faster Clearance' : '更快的清关'}
                      </h4>
                      <p className="text-text-secondary">
                        {language === 'en' 
                          ? 'Expedited customs processing to minimize delays in your supply chain' 
                          : '加快海关处理流程，减少供应链延误'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-lg font-medium mb-2 text-text-dark">
                        {language === 'en' ? 'Compliance Assurance' : '合规保证'}
                      </h4>
                      <p className="text-text-secondary">
                        {language === 'en' 
                          ? 'Ensure full compliance with all applicable regulations and avoid penalties' 
                          : '确保完全符合所有适用法规，避免罚款'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-lg font-medium mb-2 text-text-dark">
                        {language === 'en' ? 'Cost Optimization' : '成本优化'}
                      </h4>
                      <p className="text-text-secondary">
                        {language === 'en' 
                          ? 'Strategic tariff classification to minimize duties and taxes where legally possible' 
                          : '战略性关税分类，在法律允许的范围内最大程度地减少关税和税费'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-lg font-medium mb-2 text-text-dark">
                        {language === 'en' ? 'Bilingual Support' : '双语支持'}
                      </h4>
                      <p className="text-text-secondary">
                        {language === 'en' 
                          ? 'Professional support in both English and Chinese to facilitate smooth communication' 
                          : '提供中英双语专业支持，促进顺畅沟通'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
          
          {/* Shipment Tracking Results (Conditional) */}
          {showTracking && (
            <motion.div 
              className="mt-16 max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8 border border-border"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h3 className="text-2xl font-bold text-text-dark">
                    {language === 'en' ? 'Shipment Tracking' : '货物追踪'}
                  </h3>
                  <p className="text-text-secondary">
                    {language === 'en' ? 'Tracking Number:' : '追踪号码：'} <span className="font-medium">{trackingNumber}</span>
                  </p>
                </div>
                <div className="bg-primary/10 text-primary font-medium px-4 py-2 rounded-lg">
                  {language === 'en' ? 'In Transit' : '运输中'}
                </div>
              </div>
              
              <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200 ml-0.5"></div>
                
                {/* Timeline steps */}
                <div className="space-y-8">
                  {trackingSteps.map((step, index) => (
                    <div key={index} className="flex gap-4">
                      <div className={`relative flex items-center justify-center w-6 h-6 rounded-full mt-1 z-10 ${
                        step.completed 
                          ? 'bg-primary' 
                          : 'bg-gray-300'
                      }`}>
                        {step.completed && (
                          <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                      <div className="flex-grow">
                        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-1">
                          <h4 className={`font-semibold ${step.completed ? 'text-text-dark' : 'text-text-secondary'}`}>
                            {step.status[language as 'en' | 'zh']}
                          </h4>
                          <span className={`text-sm ${step.completed ? 'text-text-secondary' : 'text-gray-400'}`}>
                            {step.date || (language === 'en' ? 'Pending' : '待处理')}
                          </span>
                        </div>
                        <p className={`mb-1 ${step.completed ? 'text-text-secondary' : 'text-gray-400'}`}>
                          {step.location[language as 'en' | 'zh']}
                        </p>
                        <p className={`text-sm ${step.completed ? 'text-text-secondary' : 'text-gray-400'}`}>
                          {step.description[language as 'en' | 'zh']}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="mt-10 pt-6 border-t border-gray-200">
                <div className="flex flex-wrap justify-between gap-6">
                  <div>
                    <p className="text-sm text-text-secondary mb-1">
                      {language === 'en' ? 'Estimated Delivery' : '预计送达'}
                    </p>
                    <p className="font-semibold text-text-dark">
                      Dec 24, 2023 - End of Day
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-text-secondary mb-1">
                      {language === 'en' ? 'Service Type' : '服务类型'}
                    </p>
                    <p className="font-semibold text-text-dark">
                      {language === 'en' ? 'International Priority' : '国际优先'}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-text-secondary mb-1">
                      {language === 'en' ? 'Weight' : '重量'}
                    </p>
                    <p className="font-semibold text-text-dark">
                      25.8 kg
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default LogisticsPage; 