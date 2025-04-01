import React, { createContext, useContext, useState, useEffect } from 'react';

// 定义语言类型
export type Language = 'en' | 'zh';

// 定义上下文类型
type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
};

// 创建语言上下文
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// 翻译对象
export const translations = {
  en: {
    // Navbar
    'navbar.home': 'Home',
    'navbar.exhibition': 'Our Exhibition',
    'navbar.matching': 'AI Matching',
    'navbar.contracts': 'Contracts & Legal',
    'navbar.logistics': 'Cross-border Logistics',
    'navbar.finance': 'Financing Platform',
    'navbar.downloads': 'Client Downloads',
    'navbar.signIn': 'Sign In',
    'navbar.language': 'English',
    
    // Hero section
    'hero.title': 'HoloCAN',
    'hero.slogan1': 'Hello, Canada. Hello, Opportunity.',
    'hero.slogan2': 'HoloCan — See the Future of Trade',
    'hero.slogan3': 'HoloCan — You Can, We Can',
    'hero.description': 'Breaking geographical barriers, connecting Canadian and Chinese businesses, opening the door to global market opportunities',
    'hero.button.matching': 'Start Smart Matching',
    'hero.button.exhibition': 'Explore Virtual Exhibition',
    
    // Features section
    'features.title': 'Intelligent Cross-Border Trade Solutions',
    'features.description': 'HoloCAN platform utilizes digital technology to provide comprehensive cross-border trade services, making collaboration between Canadian and Chinese enterprises simpler and more efficient',
    'features.virtual.title': 'Virtual Exhibition',
    'features.virtual.description': 'Immersive 3D display spaces that break geographical limitations, showcase products and services anytime, anywhere',
    'features.ai.title': 'AI Smart Matching',
    'features.ai.description': 'AI-based business needs analysis, precisely connecting quality enterprises from both Canada and China',
    'features.market.title': 'Market Insights',
    'features.market.description': 'Providing real-time dynamics of Canadian and Chinese markets, empowering precise business decisions and strategic planning',
    'features.growth.title': 'Growth Support',
    'features.growth.description': 'One-on-one business consulting from professional teams, providing comprehensive support for cross-border business development',
    
    // AI Matching section
    'matching.title': 'AI Smart Enterprise Matching',
    'matching.description': 'Based on artificial intelligence technology, analyze business needs, product features, and market conditions to help enterprises quickly find ideal partners and improve trade success rate.',
    'matching.point1': 'Accurate Enterprise Matching, Saving Search Time',
    'matching.point2': 'Multi-dimensional Demand Analysis, Improving Cooperation Fit',
    'matching.point3': 'Continuous Optimization of Matching Algorithm, Continuously Improving Success Rate',
    'matching.button': 'Start Matching',
    'matching.heroDescription': 'Our AI system analyzes enterprise needs and product features to help Chinese and Canadian businesses find ideal commercial partners, reducing cross-border trade barriers.',
    
    // Cases section
    'cases.title': 'Successful Cooperation Cases',
    'cases.description': 'Many enterprises have found ideal partners through HoloCAN platform to start their cross-border business growth journey',
    'cases.case1.title': 'Vancouver Technology Company',
    'cases.case1.description': 'Through the platform, a Chinese manufacturing partner was found to successfully establish a stable supply chain, reducing product costs by 15%.',
    'cases.case2.title': 'Shanghai Trading Company',
    'cases.case2.description': 'Utilized the platform\'s virtual exhibition to showcase products, attracting attention from Canadian dealers, and boosting export business by 30% within a year.',
    'cases.case3.title': 'Toronto Food Company',
    'cases.case3.description': 'Found a Chinese regional agent through AI matching to quickly enter the Asian market, significantly improving brand recognition.',
    'cases.learnMore': 'Learn More',
    
    // CTA section
    'cta.title': 'Join HoloCAN, Break Trade Barriers',
    'cta.description': 'Register Now to Start Your Cross-Border Trade Journey',
    'cta.button': 'Register for Free',
    
    // Login page
    'login.title': 'Sign In',
    'login.email': 'Email Address',
    'login.password': 'Password',
    'login.forgot': 'Forgot Password?',
    'login.button': 'Sign In',
    'login.or': 'Or',
    'login.register': 'Create Account',
    'login.remember': 'Remember me',
    
    // Virtual Exhibition section
    'exhibition.title': 'Immersive Virtual Exhibition Experience',
    'exhibition.description': 'Through 3D display technology, your products and services break geographical limitations and can be presented to potential customers and partners anytime, anywhere, while providing real-time interaction and communication.',
    'exhibition.point1': 'High-definition 3D product display with seamless browsing experience',
    'exhibition.point2': 'Online real-time connection, appointment for business talks',
    'exhibition.point3': 'Multimedia company introduction to enhance brand image',
    'exhibition.button': 'Visit Exhibition',
    
    // Exhibition page
    'exhibitionPage.title': '3D Virtual Exhibition',
    'exhibitionPage.description': 'Experience a new way of business presentation that breaks geographical limitations. Visit company exhibitions from China and Canada to learn about products and services without leaving home.',
    'exhibitionPage.tab.overview': 'Exhibition Overview',
    'exhibitionPage.tab.canadian': 'Canadian Enterprises',
    'exhibitionPage.tab.chinese': 'Chinese Enterprises',
    'exhibitionPage.tab.meeting': 'Business Meeting Area',
    'exhibitionPage.loading': 'Loading virtual exhibition...',
    'exhibitionPage.fullscreen': 'Toggle fullscreen',
    'exhibitionPage.vrMode': 'VR Mode',
    'exhibitionPage.overview.title': 'Virtual Exhibition Introduction',
    'exhibitionPage.overview.description': 'HoloCAN virtual exhibition is an innovative 3D interactive space providing a platform for product display and business exchange between Chinese and Canadian enterprises without geographical limitations. Here, businesses can create personalized booths to showcase products and services, while visitors can freely explore, interact, and connect with exhibitors.',
    'exhibitionPage.overview.booth.title': 'Enterprise Booths',
    'exhibitionPage.overview.booth.description': 'Create personalized 3D booths for your enterprise to showcase products and services. Supporting 3D product model display, video demonstrations, and online consultation.',
    'exhibitionPage.overview.tour.title': 'Virtual Tour',
    'exhibitionPage.overview.tour.description': 'Freely explore the exhibition space or use the smart guide function to quickly find exhibitors and products of interest. Supporting multiple perspectives and immersive VR mode.',
    'exhibitionPage.overview.interaction.title': 'Real-time Interaction',
    'exhibitionPage.overview.interaction.description': 'Engage in real-time text, voice, or video communication with exhibitors, with support for Chinese-English bilingual real-time translation to eliminate language barriers.',
    'exhibitionPage.overview.info.title': 'Information Access',
    'exhibitionPage.overview.info.description': 'Access detailed information about companies and products, including specifications, pricing, certifications, and contact information, with one-click save and export support.',
    
    // AI Matching page
    'matchingPage.title': 'AI Smart Matching',
    'matchingPage.howItWorks': 'How It Works',
    'matchingPage.description': 'Our AI matching system is based on multi-dimensional data analysis, conducting intelligent matching from aspects such as enterprise information, product characteristics, and market demands.',
    'matchingPage.analysis.title': 'Intelligent Analysis',
    'matchingPage.analysis.description': 'AI depth analysis of enterprise information, product characteristics and market demands, building accurate enterprise and product profiles.',
    'matchingPage.matching.title': 'Multi-dimensional Matching',
    'matchingPage.matching.description': 'Matching from product interactions, market demands, business requirements and other multi-dimensions, ensuring matching results are comprehensive and feasible.',
    'matchingPage.cooperation.title': 'Facilitating Cooperation',
    'matchingPage.cooperation.description': 'Providing enterprises with contact channels, business meeting arrangements and partnership guidance, accelerating cooperation processes.',
    
    // Download page
    'download.title': 'Client Downloads',
    'download.desktop.title': 'Desktop Client',
    'download.mobile.title': 'Mobile Client',
    'download.windows.description': 'Supports Windows 10 and above',
    'download.macos.description': 'Supports macOS 10.15 and above',
    'download.android.description': 'Supports Android 8.0 and above',
    'download.ios.description': 'Supports iOS 13.0 and above',
    'download.button.download': 'Download Now',
    'download.button.appstore': 'App Store',
    'download.button.apk': 'Download APK',
    'download.qr.scan': 'Scan to Download',
    'download.features.title': 'Features',
    'download.features.virtual.title': 'Virtual Exhibition',
    'download.features.virtual.description': '3D virtual exhibition, visit trade shows without leaving home',
    'download.features.translation.title': 'Real-time Translation',
    'download.features.translation.description': 'AI-powered real-time translation, breaking language barriers',
    'download.features.chat.title': 'Online Negotiation',
    'download.features.chat.description': 'HD video conferencing, supporting multi-party online negotiations',
    'download.system.title': 'System Requirements',
    'download.system.desktop': 'Windows/macOS',
    'download.system.mobile': 'Android/iOS',
    
    // Financing Platform Page
    'financing.title': 'Cross-border Financing Solutions',
    'financing.subtitle': 'Providing comprehensive cross-border trade financing services for Chinese and Canadian enterprises',
    'financing.trade.title': 'Trade Financing',
    'financing.trade.description': 'Providing comprehensive financing support for import and export trade, including order financing and accounts receivable financing.',
    'financing.credit.title': 'Credit Services',
    'financing.credit.description': 'Providing credit certification, verification, and tax services to reduce international trade risks.',
    'financing.insurance.title': 'Insurance Services',
    'financing.insurance.description': 'Providing investment insurance, trade insurance, and various insurance services.',
    'financing.process.title': 'Financing Application Process',
    'financing.process.step1': 'Submit Application',
    'financing.process.step1.desc': 'Fill in basic financing requirements',
    'financing.process.step2': 'Material Preparation',
    'financing.process.step2.desc': 'Professional team reviews business materials',
    'financing.process.step3': 'Solution Determination',
    'financing.process.step3.desc': 'Determine financing solution based on needs',
    'financing.process.step4': 'Quick Disbursement',
    'financing.process.step4.desc': 'Complete approval and quick disbursement',
    'financing.partners.title': 'Partner Financial Institutions',
    'financing.form.title': 'Get Financing Solution',
    'financing.form.company': 'Company Name',
    'financing.form.contact': 'Contact Information',
    'financing.form.requirements': 'Financing Requirements',
    'financing.form.submit': 'Submit Application'
  },
  zh: {
    // 导航栏
    'navbar.home': '首页',
    'navbar.exhibition': '虚拟展厅',
    'navbar.matching': 'AI智能匹配',
    'navbar.contracts': '合同与法务',
    'navbar.logistics': '跨境物流',
    'navbar.finance': '融资平台',
    'navbar.downloads': '客户端下载',
    'navbar.signIn': '登录',
    'navbar.language': '中文',
    
    // Hero section
    'hero.title': 'HoloCAN',
    'hero.slogan1': '你好，加拿大。你好，新机遇。',
    'hero.slogan2': 'HoloCan — 见证贸易的未来',
    'hero.slogan3': 'HoloCan — 你能行，我们能行',
    'hero.description': '打破地域壁垒，连接中国与加拿大企业，开启全球市场机遇之门',
    'hero.button.matching': '开始智能匹配',
    'hero.button.exhibition': '探索虚拟展厅',
    
    // Features section
    'features.title': '智能跨境贸易解决方案',
    'features.description': 'HoloCAN平台利用数字技术提供全面的跨境贸易服务，使中加企业间的协作更简单、更高效',
    'features.virtual.title': '虚拟展厅',
    'features.virtual.description': '沉浸式3D展示空间，打破地域限制，随时随地展示产品和服务',
    'features.ai.title': 'AI智能匹配',
    'features.ai.description': '基于AI的业务需求分析，精准连接中加两国优质企业',
    'features.market.title': '市场洞察',
    'features.market.description': '提供中加市场实时动态，赋能精准商业决策和战略规划',
    'features.growth.title': '成长支持',
    'features.growth.description': '专业团队一对一商务咨询，为跨境业务发展提供全方位支持',
    
    // AI匹配部分
    'matching.title': 'AI智能企业匹配',
    'matching.description': '基于人工智能技术，分析业务需求、产品特点和市场条件，帮助企业快速找到理想合作伙伴，提高贸易成功率。',
    'matching.point1': '精准企业匹配，节省搜寻时间',
    'matching.point2': '多维度需求分析，提高合作契合度',
    'matching.point3': '匹配算法持续优化，不断提升成功率',
    'matching.button': '开始匹配',
    'matching.heroDescription': '我们的人工智能系统分析企业需求和产品特点，帮助中加企业找到最理想的商业伙伴，降低跨境贸易壁垒。',
    
    // Cases section
    'cases.title': '成功合作案例',
    'cases.description': '众多企业通过HoloCAN平台找到理想合作伙伴，开启跨境业务增长之旅',
    'cases.case1.title': '温哥华科技公司',
    'cases.case1.description': '通过平台找到中国制造业合作伙伴，成功建立稳定供应链，降低产品成本15%。',
    'cases.case2.title': '上海贸易公司',
    'cases.case2.description': '利用平台虚拟展示产品，吸引加拿大经销商关注，一年内出口业务提升30%。',
    'cases.case3.title': '多伦多食品公司',
    'cases.case3.description': '通过AI匹配找到中国区域代理，快速进入亚洲市场，显著提高品牌认知度。',
    'cases.learnMore': '了解更多',
    
    // CTA section
    'cta.title': '加入HoloCAN，突破贸易壁垒',
    'cta.description': '立即注册，开启您的跨境贸易之旅',
    'cta.button': '免费注册',
    
    // Login page
    'login.title': '登录',
    'login.email': '电子邮箱',
    'login.password': '密码',
    'login.forgot': '忘记密码？',
    'login.button': '登录',
    'login.or': '或',
    'login.register': '创建账户',
    'login.remember': '记住我',
    
    // Virtual Exhibition section
    'exhibition.title': '沉浸式虚拟展览体验',
    'exhibition.description': '通过3D展示技术，您的产品和服务打破地域限制，可随时随地向潜在客户和合作伙伴展示，同时提供实时互动和沟通。',
    'exhibition.point1': '高清3D产品展示，浏览体验流畅无阻',
    'exhibition.point2': '在线实时连接，预约商务洽谈',
    'exhibition.point3': '多媒体公司介绍，提升品牌形象',
    'exhibition.button': '访问展厅',
    
    // Exhibition page
    'exhibitionPage.title': '3D虚拟展厅',
    'exhibitionPage.description': '体验突破地域限制的全新商务展示方式，足不出户即可参观来自中国和加拿大的企业展厅，了解产品和服务。',
    'exhibitionPage.tab.overview': '展厅概览',
    'exhibitionPage.tab.canadian': '加拿大企业区',
    'exhibitionPage.tab.chinese': '中国企业区',
    'exhibitionPage.tab.meeting': '商务会议区',
    'exhibitionPage.loading': '加载虚拟展厅中...',
    'exhibitionPage.fullscreen': '切换全屏',
    'exhibitionPage.vrMode': 'VR模式',
    'exhibitionPage.overview.title': '虚拟展厅介绍',
    'exhibitionPage.overview.description': 'HoloCAN虚拟展厅是一个创新的3D交互空间，为中加两国企业提供了不受地理限制的产品展示和商务交流平台。在这里，企业可以创建个性化的展位，展示产品和服务，而访客则可以自由探索、互动，并与展商建立联系。',
    'exhibitionPage.overview.booth.title': '企业展位',
    'exhibitionPage.overview.booth.description': '为您的企业创建个性化3D展位，展示产品和服务。支持产品3D模型展示、视频演示和在线咨询功能。',
    'exhibitionPage.overview.tour.title': '虚拟导览',
    'exhibitionPage.overview.tour.description': '自由探索展厅空间，或使用智能导览功能快速找到感兴趣的展商和产品。支持多视角和沉浸式VR模式。',
    'exhibitionPage.overview.interaction.title': '实时互动',
    'exhibitionPage.overview.interaction.description': '与展商进行实时文字、语音或视频交流，支持中英双语实时翻译，消除语言障碍。',
    'exhibitionPage.overview.info.title': '信息获取',
    'exhibitionPage.overview.info.description': '获取企业和产品的详细信息，包括规格、价格、认证和联系方式，支持一键保存和导出。',
    
    // AI匹配页面
    'matchingPage.title': 'AI智能匹配',
    'matchingPage.howItWorks': '如何工作',
    'matchingPage.description': '我们的AI匹配系统基于多维度数据分析，从企业资料、产品特性、市场需求等方面进行智能匹配。',
    'matchingPage.analysis.title': '智能分析',
    'matchingPage.analysis.description': 'AI深度分析企业资料、产品特性和市场需求，建立精准的企业与产品画像。',
    'matchingPage.matching.title': '多维匹配',
    'matchingPage.matching.description': '从产品互补性、市场需求、业务规模等多个维度进行匹配评估，确保匹配结果全面可行。',
    'matchingPage.cooperation.title': '促成合作',
    'matchingPage.cooperation.description': '为匹配企业提供联系渠道、商务会议安排和协作指导，加速合作进程。',
    
    // 下载页面
    'download.title': '客户端下载',
    'download.desktop.title': '桌面客户端',
    'download.mobile.title': '移动客户端',
    'download.windows.description': '支持Windows 10及以上版本',
    'download.macos.description': '支持macOS 10.15及以上版本',
    'download.android.description': '支持Android 8.0及以上版本',
    'download.ios.description': '支持iOS 13.0及以上版本',
    'download.button.download': '立即下载',
    'download.button.appstore': 'App Store',
    'download.button.apk': '下载APK',
    'download.qr.scan': '扫码下载',
    'download.features.title': '功能特点',
    'download.features.virtual.title': '虚拟展厅',
    'download.features.virtual.description': '3D虚拟展厅，让您足不出户即可参观展会',
    'download.features.translation.title': '实时翻译',
    'download.features.translation.description': 'AI驱动的实时翻译功能，突破语言障碍',
    'download.features.chat.title': '在线洽谈',
    'download.features.chat.description': '高清视频会议，支持多人在线洽谈',
    'download.system.title': '系统要求',
    'download.system.desktop': 'Windows/macOS',
    'download.system.mobile': 'Android/iOS',
    
    // 融资平台页面
    'financing.title': '跨境融资解决方案',
    'financing.subtitle': '为中加企业提供全方位的跨境贸易融资服务',
    'financing.trade.title': '贸易融资',
    'financing.trade.description': '为进出口贸易提供全方位的融资支持，包括订单融资、应收账款融资等。',
    'financing.credit.title': '信用证服务',
    'financing.credit.description': '提供信用证开立、通知、保兑等服务，降低国际贸易风险。',
    'financing.insurance.title': '保函服务',
    'financing.insurance.description': '提供投标保函、履约保函、预付款保函等多种保函服务。',
    'financing.process.title': '融资申请流程',
    'financing.process.step1': '提交申请',
    'financing.process.step1.desc': '填写基本信息和融资需求',
    'financing.process.step2': '材料审核',
    'financing.process.step2.desc': '专业团队审核业务资料',
    'financing.process.step3': '方案制定',
    'financing.process.step3.desc': '根据需求决定融资方案',
    'financing.process.step4': '快速放款',
    'financing.process.step4.desc': '完成审批后快速放款',
    'financing.partners.title': '合作金融机构',
    'financing.form.title': '获取融资方案',
    'financing.form.company': '公司名称',
    'financing.form.contact': '联系邮箱',
    'financing.form.requirements': '融资需求',
    'financing.form.submit': '提交咨询'
  }
};

// 语言提供者组件
export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState<Language>('zh');

  // 从localStorage加载语言设置
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage) {
      setLanguage(savedLanguage as Language);
    }
  }, []);

  // 保存语言设置到localStorage
  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  // 翻译函数
  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

// 使用语言上下文的钩子
export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export default LanguageContext;