import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import RegisterForm from '@/components/auth/RegisterForm';
import { useAuth } from '@/context/auth/AuthContext';
import Link from 'next/link';
import Image from 'next/image';

const RegisterPage: NextPage = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const [language, setLanguage] = useState<'zh' | 'en'>('zh');

  // 如果用户已登录，则重定向到首页
  useEffect(() => {
    if (isAuthenticated && !isLoading) {
      router.push('/');
    }
  }, [isAuthenticated, isLoading, router]);

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'zh' ? 'en' : 'zh'));
  };

  const translations = {
    zh: {
      registerAccount: '注册新账户',
      haveAccount: '已有账户?',
      login: '立即登录',
      backToHome: '返回首页'
    },
    en: {
      registerAccount: 'Register',
      haveAccount: 'Already have an account?',
      login: 'Login Now',
      backToHome: 'Back to Home'
    }
  };

  const t = translations[language];

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="absolute top-4 right-4">
        <button
          onClick={toggleLanguage}
          className="px-3 py-1 text-sm font-medium text-blue-600 bg-white border border-blue-600 rounded hover:bg-blue-50"
        >
          {language === 'zh' ? 'English' : '中文'}
        </button>
      </div>
      
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="mx-auto w-full max-w-md p-6 bg-white rounded-lg shadow-md dark:bg-gray-800">
          <div className="mb-6 flex items-center justify-center">
            <Link href="/" className="flex items-center">
              <Image
                className="h-8 w-auto mr-2"
                src="/holocanlogo-nobg.svg"
                alt="HoloCAN Logo"
                width={32}
                height={32}
              />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{t.registerAccount}</h2>
            </Link>
          </div>
          
          <RegisterForm language={language} />
          
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {t.haveAccount}{' '}
              <Link href="/auth/login" className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400">
                {t.login}
              </Link>
            </p>
          </div>
        </div>
      </div>

      <div className="mt-8 text-center">
        <Link href="/" className="text-sm font-medium text-gray-600 hover:text-gray-500 dark:text-gray-400">
          {t.backToHome}
        </Link>
      </div>
    </div>
  );
};

export default RegisterPage; 