import { NextPage } from 'next';
import { useState } from 'react';
import ProfileForm from '@/components/auth/ProfileForm';
import BusinessProfileForm from '@/components/auth/BusinessProfileForm';
import AuthGuard from '@/components/auth/AuthGuard';
import { useAuth } from '@/context/auth/AuthContext';
import { UserRole } from '@/types/auth/user';
import Link from 'next/link';
import Image from 'next/image';

const ProfilePage: NextPage = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<'personal' | 'business'>(
    user?.role === UserRole.BUSINESS ? 'business' : 'personal'
  );
  const [language, setLanguage] = useState<'zh' | 'en'>('zh');

  const handleLogout = () => {
    logout();
    // 登出后页面会被AuthGuard重定向到登录页面
  };

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'zh' ? 'en' : 'zh'));
  };

  const translations = {
    zh: {
      home: '首页',
      profile: '个人中心',
      logout: '登出',
      personalProfile: '个人资料',
      businessProfile: '企业资料'
    },
    en: {
      home: 'Home',
      profile: 'Profile',
      logout: 'Logout',
      personalProfile: 'Personal Profile',
      businessProfile: 'Business Profile'
    }
  };

  const t = translations[language];

  return (
    <AuthGuard>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
        {/* 顶部导航栏 */}
        <nav className="bg-white shadow-sm dark:bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <Link href="/" className="flex-shrink-0 flex items-center">
                  <Image
                    className="h-8 w-auto"
                    src="/holocanlogo-nobg.svg"
                    alt="HoloCAN Logo"
                    width={32}
                    height={32}
                  />
                </Link>
                <div className="ml-6 flex space-x-8">
                  <Link 
                    href="/" 
                    className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 text-sm font-medium"
                  >
                    {t.home}
                  </Link>
                  <Link 
                    href="/profile" 
                    className="border-blue-500 text-blue-600 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                    aria-current="page"
                  >
                    {t.profile}
                  </Link>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <button
                  onClick={toggleLanguage}
                  className="px-3 py-1 text-sm font-medium text-blue-600 bg-white border border-blue-600 rounded hover:bg-blue-50"
                >
                  {language === 'zh' ? 'English' : '中文'}
                </button>
                <button
                  onClick={handleLogout}
                  className="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium"
                >
                  {t.logout}
                </button>
              </div>
            </div>
          </div>
        </nav>

        {/* 页面内容 */}
        <div className="py-10">
          <header>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h1 className="text-3xl font-bold leading-tight text-gray-900 dark:text-white">{t.profile}</h1>
            </div>
          </header>
          <main>
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
              <div className="px-4 py-8 sm:px-0">
                {/* 标签切换 */}
                {user?.role === UserRole.BUSINESS && (
                  <div className="border-b border-gray-200 dark:border-gray-700 mb-6">
                    <nav className="-mb-px flex" aria-label="Tabs">
                      <button
                        onClick={() => setActiveTab('personal')}
                        className={`${
                          activeTab === 'personal'
                            ? 'border-blue-500 text-blue-600'
                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                        } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm mr-8`}
                      >
                        {t.personalProfile}
                      </button>
                      <button
                        onClick={() => setActiveTab('business')}
                        className={`${
                          activeTab === 'business'
                            ? 'border-blue-500 text-blue-600'
                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                        } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                      >
                        {t.businessProfile}
                      </button>
                    </nav>
                  </div>
                )}

                {/* 根据当前标签和用户角色显示不同的表单 */}
                {(activeTab === 'personal' || user?.role !== UserRole.BUSINESS) && (
                  <ProfileForm language={language} />
                )}

                {activeTab === 'business' && user?.role === UserRole.BUSINESS && (
                  <BusinessProfileForm language={language} />
                )}
              </div>
            </div>
          </main>
        </div>
      </div>
    </AuthGuard>
  );
};

export default ProfilePage; 