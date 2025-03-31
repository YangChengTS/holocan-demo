import { NextPage } from 'next';
import { useState, useEffect, Suspense } from 'react';
import dynamic from 'next/dynamic';
import Layout from '../components/layout/Layout';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FaBuildingUser, FaCircleInfo, FaCompass, FaVrCardboard } from 'react-icons/fa6';
import { useLanguage } from '@/context/LanguageContext';

// 动态导入Three.js组件，避免服务端渲染问题
const ExhibitionViewer = dynamic(
  () => import('../components/exhibition/ExhibitionViewer'),
  { ssr: false, loading: () => <ExhibitionLoading /> }
);

// 加载状态组件
const ExhibitionLoading = () => {
  const { t } = useLanguage();
  return (
    <div className="flex h-[600px] items-center justify-center bg-background-dark/50 rounded-xl">
      <div className="text-center">
        <div className="inline-block h-16 w-16 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
        <p className="mt-4 text-lg">{t('exhibitionPage.loading')}</p>
      </div>
    </div>
  );
};

const Exhibition: NextPage = () => {
  const { t } = useLanguage();
  const [isClient, setIsClient] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [isFullscreen, setIsFullscreen] = useState(false);

  // 避免服务端渲染Three.js内容
  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const handleFullscreenToggle = () => {
    setIsFullscreen(!isFullscreen);
  };

  return (
    <Layout
      title="HoloCAN - Virtual Exhibition"
      description={t('exhibitionPage.description')}
    >
      {/* Hero Banner */}
      <section className="relative h-[40vh] min-h-[300px] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/canda_photo (4).png"
            alt="Virtual Exhibition"
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
              <span className="text-gradient gradient-text">{t('exhibitionPage.title')}</span>
            </h1>
            <p className="text-lg text-white max-w-2xl">
              {t('exhibitionPage.description')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Exhibition Content */}
      <section className="py-12 bg-background-dark">
        <div className="container-custom">
          {/* Navigation Tabs */}
          <div className="flex flex-wrap gap-2 mb-8 border-b border-gray-700 pb-2">
            <button
              onClick={() => handleTabChange('overview')}
              className={`px-4 py-2 rounded-t-lg font-medium text-sm transition-colors ${
                activeTab === 'overview'
                  ? 'bg-primary text-white'
                  : 'text-text-secondary hover:text-white'
              }`}
            >
              {t('exhibitionPage.tab.overview')}
            </button>
            <button
              onClick={() => handleTabChange('canadian')}
              className={`px-4 py-2 rounded-t-lg font-medium text-sm transition-colors ${
                activeTab === 'canadian'
                  ? 'bg-primary text-white'
                  : 'text-text-secondary hover:text-white'
              }`}
            >
              {t('exhibitionPage.tab.canadian')}
            </button>
            <button
              onClick={() => handleTabChange('chinese')}
              className={`px-4 py-2 rounded-t-lg font-medium text-sm transition-colors ${
                activeTab === 'chinese'
                  ? 'bg-primary text-white'
                  : 'text-text-secondary hover:text-white'
              }`}
            >
              {t('exhibitionPage.tab.chinese')}
            </button>
            <button
              onClick={() => handleTabChange('meeting')}
              className={`px-4 py-2 rounded-t-lg font-medium text-sm transition-colors ${
                activeTab === 'meeting'
                  ? 'bg-primary text-white'
                  : 'text-text-secondary hover:text-white'
              }`}
            >
              {t('exhibitionPage.tab.meeting')}
            </button>
          </div>

          {/* 3D Viewer Area */}
          <div className={`relative mb-8 ${isFullscreen ? 'fixed inset-0 z-50 p-4 bg-black' : ''}`}>
            <div className={`relative ${isFullscreen ? 'h-full' : 'h-[600px]'} rounded-xl overflow-hidden`}>
              {isClient && (
                <Suspense fallback={<ExhibitionLoading />}>
                  <ExhibitionViewer activeZone={activeTab} />
                </Suspense>
              )}
              
              {/* Controls Overlay */}
              <div className="absolute bottom-4 right-4 flex gap-2">
                <button
                  onClick={handleFullscreenToggle}
                  className="bg-accent/80 hover:bg-accent p-2 rounded-full text-white"
                  aria-label={t('exhibitionPage.fullscreen')}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    {isFullscreen ? (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    ) : (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5" />
                    )}
                  </svg>
                </button>
                <button className="bg-accent/80 hover:bg-accent p-2 rounded-full text-white" aria-label={t('exhibitionPage.vrMode')}>
                  <FaVrCardboard className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Exhibition Info */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Info */}
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold mb-4">
                {activeTab === 'overview' && t('exhibitionPage.overview.title')}
                {activeTab === 'canadian' && t('exhibitionPage.tab.canadian')}
                {activeTab === 'chinese' && t('exhibitionPage.tab.chinese')}
                {activeTab === 'meeting' && t('exhibitionPage.tab.meeting')}
              </h2>
              
              {activeTab === 'overview' && (
                <div>
                  <p className="text-text-secondary mb-4">
                    {t('exhibitionPage.overview.description')}
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                    <div className="card-gradient p-6 rounded-xl">
                      <FaBuildingUser className="text-primary text-3xl mb-3" />
                      <h3 className="text-xl font-semibold mb-2">{t('exhibitionPage.overview.booth.title')}</h3>
                      <p className="text-text-secondary text-sm">
                        {t('exhibitionPage.overview.booth.description')}
                      </p>
                    </div>
                    
                    <div className="card-gradient p-6 rounded-xl">
                      <FaCompass className="text-primary text-3xl mb-3" />
                      <h3 className="text-xl font-semibold mb-2">{t('exhibitionPage.overview.tour.title')}</h3>
                      <p className="text-text-secondary text-sm">
                        {t('exhibitionPage.overview.tour.description')}
                      </p>
                    </div>
                    
                    <div className="card-gradient p-6 rounded-xl">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                      </svg>
                      <h3 className="text-xl font-semibold mb-2">{t('exhibitionPage.overview.interaction.title')}</h3>
                      <p className="text-text-secondary text-sm">
                        {t('exhibitionPage.overview.interaction.description')}
                      </p>
                    </div>
                    
                    <div className="card-gradient p-6 rounded-xl">
                      <FaCircleInfo className="text-primary text-3xl mb-3" />
                      <h3 className="text-xl font-semibold mb-2">{t('exhibitionPage.overview.info.title')}</h3>
                      <p className="text-text-secondary text-sm">
                        {t('exhibitionPage.overview.info.description')}
                      </p>
                    </div>
                  </div>
                </div>
              )}
              
              {activeTab === 'canadian' && (
                <div>
                  <p className="text-text-secondary mb-6">
                    加拿大企业展区汇集了来自加拿大各行业的优质企业，展示他们的产品、技术和服务。这里的展商涵盖农业食品、清洁技术、数字科技、先进制造业等领域，为寻求加拿大合作伙伴的中国企业提供了丰富选择。
                  </p>
                  
                  <div className="space-y-6">
                    <div className="card-gradient p-6 rounded-xl">
                      <div className="flex flex-col md:flex-row gap-6">
                        <div className="relative w-full md:w-40 h-40 rounded-lg overflow-hidden">
                          <Image 
                            src="/canda_photo (7).png" 
                            alt="Maple Foods Inc." 
                            fill 
                            style={{ objectFit: 'cover' }}
                          />
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <h3 className="text-xl font-semibold">枫叶食品公司</h3>
                            <span className="bg-green-600/20 text-green-400 text-xs px-2 py-1 rounded-full">线上展示中</span>
                          </div>
                          <p className="text-primary text-sm mb-2">农产品与食品加工</p>
                          <p className="text-text-secondary text-sm mb-4">
                            专注于加拿大特色农产品和食品的生产与出口，提供高品质的枫糖、野生浆果制品、有机谷物等。
                          </p>
                          <div className="flex flex-wrap gap-2">
                            <span className="text-xs bg-accent/20 px-2 py-1 rounded-full">有机食品</span>
                            <span className="text-xs bg-accent/20 px-2 py-1 rounded-full">枫糖产品</span>
                            <span className="text-xs bg-accent/20 px-2 py-1 rounded-full">谷物加工</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="card-gradient p-6 rounded-xl">
                      <div className="flex flex-col md:flex-row gap-6">
                        <div className="relative w-full md:w-40 h-40 rounded-lg overflow-hidden">
                          <Image 
                            src="/canda_photo (2).png" 
                            alt="Arctic Bay Fisheries" 
                            fill 
                            style={{ objectFit: 'cover' }}
                          />
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <h3 className="text-xl font-semibold">北极湾渔业</h3>
                            <span className="bg-green-600/20 text-green-400 text-xs px-2 py-1 rounded-full">线上展示中</span>
                          </div>
                          <p className="text-primary text-sm mb-2">海产品加工与出口</p>
                          <p className="text-text-secondary text-sm mb-4">
                            加拿大领先的海产品公司，专注于冷水鱼类、贝类和海鲜的可持续捕捞、加工与出口，产品远销全球。
                          </p>
                          <div className="flex flex-wrap gap-2">
                            <span className="text-xs bg-accent/20 px-2 py-1 rounded-full">冷水鱼类</span>
                            <span className="text-xs bg-accent/20 px-2 py-1 rounded-full">贝类</span>
                            <span className="text-xs bg-accent/20 px-2 py-1 rounded-full">可持续渔业</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {activeTab === 'chinese' && (
                <div>
                  <p className="text-text-secondary mb-6">
                    中国企业展区汇集了来自中国各行业的创新企业，展示他们希望向加拿大市场推广的产品和服务。这里的展商涵盖消费电子、智能制造、新能源、数字技术等领域，为寻求中国供应链和技术的加拿大企业提供了丰富选择。
                  </p>
                  
                  <div className="space-y-6">
                    <div className="card-gradient p-6 rounded-xl">
                      <div className="flex flex-col md:flex-row gap-6">
                        <div className="relative w-full md:w-40 h-40 rounded-lg overflow-hidden">
                          <Image 
                            src="/canda_photo (5).png" 
                            alt="Smart Tech Inc." 
                            fill 
                            style={{ objectFit: 'cover' }}
                          />
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <h3 className="text-xl font-semibold">睿智科技</h3>
                            <span className="bg-green-600/20 text-green-400 text-xs px-2 py-1 rounded-full">线上展示中</span>
                          </div>
                          <p className="text-primary text-sm mb-2">智能家居与消费电子</p>
                          <p className="text-text-secondary text-sm mb-4">
                            中国领先的智能家居设备制造商，提供智能照明、安防、环境控制和家电互联产品，采用先进物联网技术。
                          </p>
                          <div className="flex flex-wrap gap-2">
                            <span className="text-xs bg-accent/20 px-2 py-1 rounded-full">智能家居</span>
                            <span className="text-xs bg-accent/20 px-2 py-1 rounded-full">物联网</span>
                            <span className="text-xs bg-accent/20 px-2 py-1 rounded-full">人工智能</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="card-gradient p-6 rounded-xl">
                      <div className="flex flex-col md:flex-row gap-6">
                        <div className="relative w-full md:w-40 h-40 rounded-lg overflow-hidden">
                          <Image 
                            src="/canda_photo (1).png" 
                            alt="Green Energy Solutions" 
                            fill 
                            style={{ objectFit: 'cover' }}
                          />
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <h3 className="text-xl font-semibold">绿源能源科技</h3>
                            <span className="bg-green-600/20 text-green-400 text-xs px-2 py-1 rounded-full">线上展示中</span>
                          </div>
                          <p className="text-primary text-sm mb-2">新能源技术</p>
                          <p className="text-text-secondary text-sm mb-4">
                            专注于太阳能和储能解决方案的高科技企业，提供高效光伏组件、智能储能系统和新能源整体解决方案。
                          </p>
                          <div className="flex flex-wrap gap-2">
                            <span className="text-xs bg-accent/20 px-2 py-1 rounded-full">光伏技术</span>
                            <span className="text-xs bg-accent/20 px-2 py-1 rounded-full">储能系统</span>
                            <span className="text-xs bg-accent/20 px-2 py-1 rounded-full">清洁能源</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {activeTab === 'meeting' && (
                <div>
                  <p className="text-text-secondary mb-6">
                    商务会议区提供虚拟会议室和洽谈空间，支持企业间进行一对一或多方商务洽谈。会议区配备了先进的虚拟会议工具，支持文件共享、产品演示和实时翻译功能，为跨境商务沟通创造理想环境。
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    <div className="card-gradient p-6 rounded-xl">
                      <h3 className="text-xl font-semibold mb-3">预约会议</h3>
                      <p className="text-text-secondary text-sm mb-4">
                        选择您感兴趣的企业，预约一对一商务会议。系统将自动安排会议时间，并提供日历提醒。
                      </p>
                      <button className="btn btn-sm btn-primary rounded-full">
                        查看可预约企业
                      </button>
                    </div>
                    
                    <div className="card-gradient p-6 rounded-xl">
                      <h3 className="text-xl font-semibold mb-3">加入行业论坛</h3>
                      <p className="text-text-secondary text-sm mb-4">
                        参与行业专题讨论，了解最新行业趋势和商机，与同业者建立联系。
                      </p>
                      <button className="btn btn-sm btn-primary rounded-full">
                        查看论坛日程
                      </button>
                    </div>
                  </div>
                  
                  <div className="mt-8">
                    <h3 className="text-xl font-semibold mb-4">即将举行的活动</h3>
                    <div className="space-y-4">
                      {[
                        {
                          title: "中加清洁技术合作论坛",
                          date: "2024-05-20 10:00",
                          participants: 48
                        },
                        {
                          title: "农产品与食品加工业对接会",
                          date: "2024-05-22 14:00",
                          participants: 36
                        },
                        {
                          title: "数字技术创新与合作研讨会",
                          date: "2024-05-25 09:00",
                          participants: 52
                        }
                      ].map((event, index) => (
                        <div key={index} className="flex justify-between items-center p-4 border border-gray-700 rounded-lg hover:border-primary transition-colors">
                          <div>
                            <h4 className="font-medium">{event.title}</h4>
                            <p className="text-text-secondary text-sm">{event.date}</p>
                          </div>
                          <div className="flex items-center">
                            <span className="text-sm text-text-secondary mr-2">{event.participants}人已报名</span>
                            <button className="btn btn-xs btn-outline-white rounded-full">
                              报名参加
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="card-gradient p-6 rounded-xl mb-6">
                <h3 className="text-xl font-semibold mb-4">展厅数据</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-text-secondary">参展企业数</span>
                      <span className="font-medium">86</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div className="bg-primary h-2 rounded-full" style={{ width: '86%' }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-text-secondary">加拿大企业</span>
                      <span className="font-medium">42</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div className="bg-primary h-2 rounded-full" style={{ width: '42%' }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-text-secondary">中国企业</span>
                      <span className="font-medium">44</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div className="bg-secondary h-2 rounded-full" style={{ width: '44%' }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-text-secondary">本月访问量</span>
                      <span className="font-medium">12,486</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full" style={{ width: '76%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="card-gradient p-6 rounded-xl mb-6">
                <h3 className="text-xl font-semibold mb-4">热门行业</h3>
                <div className="space-y-3">
                  {[
                    { name: "农产品与食品", count: 18 },
                    { name: "清洁技术", count: 14 },
                    { name: "智能制造", count: 12 },
                    { name: "数字科技", count: 11 },
                    { name: "医疗健康", count: 9 }
                  ].map((industry, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <span className="text-text-secondary text-sm">{industry.name}</span>
                      <span className="bg-accent/20 text-xs px-2 py-1 rounded-full">{industry.count}家</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="card-gradient p-6 rounded-xl">
                <h3 className="text-xl font-semibold mb-4">创建您的展位</h3>
                <p className="text-text-secondary text-sm mb-4">
                  注册成为展商，创建您的3D虚拟展位，向全球客户展示产品和服务。
                </p>
                <button className="btn btn-primary w-full rounded-lg">
                  申请参展
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Exhibition; 