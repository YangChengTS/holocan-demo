import { NextPage } from 'next';
import { useState } from 'react';
import Layout from '../components/layout/Layout';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FaArrowRight, FaChartPie, FaCheck, FaHandshake, FaLightbulb, FaPercentage } from 'react-icons/fa';
import { useLanguage } from '@/context/LanguageContext';

const Matching: NextPage = () => {
  const { t } = useLanguage();
  const [activeStep, setActiveStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [selectedIndustry, setSelectedIndustry] = useState('');
  const [selectedCompanySize, setSelectedCompanySize] = useState('');
  const [selectedProductType, setSelectedProductType] = useState('');
  const [selectedMarket, setSelectedMarket] = useState('');

  const handleNext = () => {
    if (activeStep < 3) {
      setActiveStep(activeStep + 1);
    } else {
      // Simulate AI matching process
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setShowResults(true);
      }, 3000);
    }
  };

  const handleBack = () => {
    if (activeStep > 1) {
      setActiveStep(activeStep - 1);
    }
  };

  const resetForm = () => {
    setActiveStep(1);
    setSelectedIndustry('');
    setSelectedCompanySize('');
    setSelectedProductType('');
    setSelectedMarket('');
    setShowResults(false);
  };

  const matchingCompanies = [
    {
      id: 1,
      name: '枫叶食品公司',
      country: 'CA',
      industry: '农产品与食品加工',
      image: '/canda_photo (7).png',
      matchScore: 95,
      description: '专注于加拿大特色农产品和食品的生产与出口，提供高品质的枫糖、野生浆果制品、有机谷物等。',
      matchPoints: [
        { label: '产品互补性', score: 98 },
        { label: '市场需求', score: 95 },
        { label: '业务规模匹配', score: 92 },
        { label: '出口意愿', score: 98 },
      ]
    },
    {
      id: 2,
      name: '北极湾渔业',
      country: 'CA',
      industry: '海产品加工与出口',
      image: '/canda_photo (2).png',
      matchScore: 89,
      description: '加拿大领先的海产品公司，专注于冷水鱼类、贝类和海鲜的可持续捕捞、加工与出口，产品远销全球。',
      matchPoints: [
        { label: '产品互补性', score: 87 },
        { label: '市场需求', score: 94 },
        { label: '业务规模匹配', score: 85 },
        { label: '出口意愿', score: 90 },
      ]
    },
    {
      id: 3,
      name: '清风能源',
      country: 'CA',
      industry: '清洁能源技术',
      image: '/canda_photo (8).png',
      matchScore: 82,
      description: '专注于风能和氢能技术的加拿大企业，提供清洁能源解决方案和相关技术咨询服务。',
      matchPoints: [
        { label: '产品互补性', score: 78 },
        { label: '市场需求', score: 90 },
        { label: '业务规模匹配', score: 75 },
        { label: '出口意愿', score: 85 },
      ]
    },
  ];

  return (
    <Layout
      title="HoloCAN - AI Smart Matching"
      description="HoloCAN AI Smart Matching System helps Chinese and Canadian businesses find ideal commercial partners and promotes cross-border trade cooperation."
    >
      {/* Hero Banner */}
      <section className="relative h-[40vh] min-h-[300px] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/canda_photo (6).png"
            alt="AI Matching System"
            fill
            priority
            style={{ objectFit: 'cover' }}
            className="brightness-[0.4]"
          />
        </div>
        
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              <span className="text-gradient gradient-text">{t('matchingPage.title')}</span>
            </h1>
            <p className="text-lg text-white max-w-2xl">
              {t('matching.heroDescription')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Matching Content */}
      <section className="py-12 bg-background-dark">
        <div className="container-custom">
          {/* Features Description */}
          {!showResults && !loading && (
            <div className="mb-12">
              <div className="text-center mb-10">
                <h2 className="text-3xl font-bold mb-4">{t('matchingPage.howItWorks')}</h2>
                <p className="text-text-secondary max-w-2xl mx-auto">
                  {t('matchingPage.description')}
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="card-gradient p-6 rounded-xl text-center">
                  <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-primary/20 text-primary mb-4">
                    <FaLightbulb className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{t('matchingPage.analysis.title')}</h3>
                  <p className="text-text-secondary text-sm">
                    {t('matchingPage.analysis.description')}
                  </p>
                </div>
                
                <div className="card-gradient p-6 rounded-xl text-center">
                  <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-primary/20 text-primary mb-4">
                    <FaChartPie className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{t('matchingPage.matching.title')}</h3>
                  <p className="text-text-secondary text-sm">
                    {t('matchingPage.matching.description')}
                  </p>
                </div>
                
                <div className="card-gradient p-6 rounded-xl text-center">
                  <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-primary/20 text-primary mb-4">
                    <FaHandshake className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{t('matchingPage.cooperation.title')}</h3>
                  <p className="text-text-secondary text-sm">
                    {t('matchingPage.cooperation.description')}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Matching Form or Results */}
          <div className="max-w-4xl mx-auto">
            {!showResults && !loading && (
              <div className="card-gradient p-8 rounded-xl">
                <div className="flex items-center mb-8">
                  {[1, 2, 3].map((step) => (
                    <div key={step} className="flex items-center">
                      <div
                        className={`h-10 w-10 rounded-full flex items-center justify-center font-semibold ${
                          step === activeStep
                            ? 'bg-primary text-white'
                            : step < activeStep
                            ? 'bg-green-500 text-white'
                            : 'bg-gray-700 text-text-secondary'
                        }`}
                      >
                        {step < activeStep ? <FaCheck className="h-4 w-4" /> : step}
                      </div>
                      {step < 3 && (
                        <div
                          className={`h-1 w-16 ${
                            step < activeStep ? 'bg-green-500' : 'bg-gray-700'
                          }`}
                        ></div>
                      )}
                    </div>
                  ))}
                </div>

                <div className="mb-8">
                  <h3 className="text-2xl font-bold mb-4">
                    {activeStep === 1 && '基本信息'}
                    {activeStep === 2 && '业务需求'}
                    {activeStep === 3 && '匹配偏好'}
                  </h3>

                  {activeStep === 1 && (
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          您的企业所属行业
                        </label>
                        <select
                          value={selectedIndustry}
                          onChange={(e) => setSelectedIndustry(e.target.value)}
                          className="w-full bg-gray-800 border border-gray-700 rounded-lg py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-primary"
                        >
                          <option value="">请选择行业</option>
                          <option value="food">食品与农产品</option>
                          <option value="tech">科技与电子</option>
                          <option value="manufacture">制造业</option>
                          <option value="energy">能源与环保</option>
                          <option value="medical">医疗健康</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">
                          企业规模
                        </label>
                        <select
                          value={selectedCompanySize}
                          onChange={(e) => setSelectedCompanySize(e.target.value)}
                          className="w-full bg-gray-800 border border-gray-700 rounded-lg py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-primary"
                        >
                          <option value="">请选择企业规模</option>
                          <option value="micro">微型企业（10人以下）</option>
                          <option value="small">小型企业（10-49人）</option>
                          <option value="medium">中型企业（50-249人）</option>
                          <option value="large">大型企业（250人以上）</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">
                          企业所在国家/地区
                        </label>
                        <div className="flex gap-4">
                          <div className="flex items-center">
                            <input
                              type="radio"
                              id="china"
                              name="country"
                              className="h-4 w-4 text-primary focus:ring-primary bg-gray-800 border-gray-700"
                              defaultChecked
                            />
                            <label htmlFor="china" className="ml-2 block text-sm">
                              中国
                            </label>
                          </div>
                          <div className="flex items-center">
                            <input
                              type="radio"
                              id="canada"
                              name="country"
                              className="h-4 w-4 text-primary focus:ring-primary bg-gray-800 border-gray-700"
                            />
                            <label htmlFor="canada" className="ml-2 block text-sm">
                              加拿大
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeStep === 2 && (
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          您的主要产品/服务类型
                        </label>
                        <select
                          value={selectedProductType}
                          onChange={(e) => setSelectedProductType(e.target.value)}
                          className="w-full bg-gray-800 border border-gray-700 rounded-lg py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-primary"
                        >
                          <option value="">请选择产品/服务类型</option>
                          <option value="raw">原材料/初级产品</option>
                          <option value="components">零部件/组件</option>
                          <option value="finished">成品/终端产品</option>
                          <option value="service">服务/解决方案</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">
                          您希望寻找的合作类型（可多选）
                        </label>
                        <div className="space-y-3">
                          {['采购/供应', '销售/分销', '技术合作', '投资/融资', '联合研发'].map((type) => (
                            <div key={type} className="flex items-center">
                              <input
                                type="checkbox"
                                id={type}
                                className="h-4 w-4 text-primary focus:ring-primary bg-gray-800 border-gray-700"
                              />
                              <label htmlFor={type} className="ml-2 block text-sm">
                                {type}
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">
                          业务痛点/需求描述
                        </label>
                        <textarea
                          rows={4}
                          className="w-full bg-gray-800 border border-gray-700 rounded-lg py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-primary"
                          placeholder="请描述您的业务需求或面临的挑战..."
                        ></textarea>
                      </div>
                    </div>
                  )}

                  {activeStep === 3 && (
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          目标市场
                        </label>
                        <select
                          value={selectedMarket}
                          onChange={(e) => setSelectedMarket(e.target.value)}
                          className="w-full bg-gray-800 border border-gray-700 rounded-lg py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-primary"
                        >
                          <option value="">请选择目标市场</option>
                          <option value="cn">中国市场</option>
                          <option value="ca">加拿大市场</option>
                          <option value="both">两国市场</option>
                          <option value="global">全球市场</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">
                          匹配优先考虑因素（拖动排序）
                        </label>
                        <div className="space-y-2">
                          {['产品互补性', '市场需求契合度', '企业规模相似性', '合作意愿强度'].map((factor, index) => (
                            <div
                              key={factor}
                              className="flex items-center p-3 bg-gray-800 border border-gray-700 rounded-lg"
                            >
                              <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-gray-700 text-white text-xs mr-3">
                                {index + 1}
                              </span>
                              <span>{factor}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">
                          是否愿意参加线上商务对接会议
                        </label>
                        <div className="flex gap-4">
                          <div className="flex items-center">
                            <input
                              type="radio"
                              id="meeting-yes"
                              name="meeting"
                              className="h-4 w-4 text-primary focus:ring-primary bg-gray-800 border-gray-700"
                              defaultChecked
                            />
                            <label htmlFor="meeting-yes" className="ml-2 block text-sm">
                              是
                            </label>
                          </div>
                          <div className="flex items-center">
                            <input
                              type="radio"
                              id="meeting-no"
                              name="meeting"
                              className="h-4 w-4 text-primary focus:ring-primary bg-gray-800 border-gray-700"
                            />
                            <label htmlFor="meeting-no" className="ml-2 block text-sm">
                              否
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex justify-between">
                  <button
                    onClick={handleBack}
                    className={`btn btn-outline-white px-6 ${
                      activeStep === 1 ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                    disabled={activeStep === 1}
                  >
                    上一步
                  </button>
                  <button onClick={handleNext} className="btn btn-primary px-6">
                    {activeStep === 3 ? '开始匹配' : '下一步'}
                  </button>
                </div>
              </div>
            )}

            {loading && (
              <div className="card-gradient p-8 rounded-xl text-center">
                <div className="inline-block h-20 w-20 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
                <h3 className="text-xl font-bold mt-6 mb-2">AI匹配进行中</h3>
                <p className="text-text-secondary">
                  正在分析您的业务需求并寻找最佳的潜在合作伙伴...
                </p>
                <div className="max-w-md mx-auto mt-8">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-text-secondary">数据分析</span>
                    <span className="font-medium">72%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full animate-pulse" style={{ width: '72%' }}></div>
                  </div>
                </div>
              </div>
            )}

            {showResults && (
              <div>
                <div className="card-gradient p-8 rounded-xl mb-8">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-bold">匹配结果</h3>
                    <button onClick={resetForm} className="text-sm text-primary hover:underline">
                      重新匹配
                    </button>
                  </div>
                  
                  <p className="text-text-secondary mb-8">
                    基于您提供的信息，我们的AI系统从全球2,846家企业中筛选出以下最匹配的潜在合作伙伴。匹配分数基于产品互补性、市场需求、业务规模等多维度评估。
                  </p>
                  
                  <div className="space-y-8">
                    {matchingCompanies.map((company, index) => (
                      <div key={company.id} className="flex flex-col md:flex-row gap-6 p-6 border border-gray-700 rounded-xl hover:border-primary transition-colors">
                        <div className="relative w-full md:w-48 h-48 rounded-lg overflow-hidden">
                          <Image 
                            src={company.image} 
                            alt={company.name} 
                            fill 
                            style={{ objectFit: 'cover' }}
                          />
                          <div className="absolute top-2 right-2 bg-accent/90 text-white text-sm py-1 px-2 rounded-lg">
                            {company.country === 'CA' ? '加拿大' : '中国'}
                          </div>
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex flex-col md:flex-row justify-between md:items-center mb-4">
                            <div>
                              <h4 className="text-xl font-semibold">{company.name}</h4>
                              <p className="text-primary text-sm">{company.industry}</p>
                            </div>
                            <div className="flex items-center mt-2 md:mt-0">
                              <div className="relative h-16 w-16">
                                <svg viewBox="0 0 36 36" className="h-16 w-16">
                                  <path
                                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                    fill="none"
                                    stroke="#444"
                                    strokeWidth="3"
                                  />
                                  <path
                                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                    fill="none"
                                    stroke={company.matchScore > 90 ? "#48bb78" : company.matchScore > 80 ? "#4299e1" : "#ed8936"}
                                    strokeWidth="3"
                                    strokeDasharray={`${company.matchScore}, 100`}
                                  />
                                </svg>
                                <div className="absolute inset-0 flex items-center justify-center">
                                  <span className="text-lg font-bold">{company.matchScore}</span>
                                </div>
                              </div>
                              <span className="text-sm text-text-secondary ml-2">匹配度</span>
                            </div>
                          </div>
                          
                          <p className="text-text-secondary text-sm mb-4">
                            {company.description}
                          </p>
                          
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-4">
                            {company.matchPoints.map((point, idx) => (
                              <div key={idx} className="bg-gray-800 p-2 rounded text-center">
                                <div className="text-sm text-text-secondary mb-1">{point.label}</div>
                                <div className="text-lg font-medium flex items-center justify-center">
                                  <FaPercentage className="h-3 w-3 mr-1" /> {point.score}
                                </div>
                              </div>
                            ))}
                          </div>
                          
                          <div className="flex flex-wrap gap-2 mt-4">
                            <button className="btn btn-sm btn-primary rounded-full">
                              <span>查看详情</span> <FaArrowRight className="ml-1 h-3 w-3" />
                            </button>
                            <button className="btn btn-sm btn-outline-white rounded-full">
                              预约会议
                            </button>
                            <button className="btn btn-sm btn-outline-white rounded-full">
                              保存匹配
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="bg-primary/10 border border-primary/30 rounded-xl p-6 text-center">
                  <h3 className="text-xl font-semibold mb-2">需要更多匹配结果？</h3>
                  <p className="text-text-secondary max-w-xl mx-auto mb-4">
                    完善您的企业档案和需求描述，获取更精准的匹配结果。或联系我们的商务顾问获取定制化匹配服务。
                  </p>
                  <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <button className="btn btn-primary rounded-full">
                      完善企业档案
                    </button>
                    <button className="btn btn-outline-white rounded-full">
                      联系商务顾问
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Matching; 