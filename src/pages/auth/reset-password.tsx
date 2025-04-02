import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import PasswordResetRequestForm from '@/components/auth/PasswordResetRequestForm';
import { useAuth } from '@/context/auth/AuthContext';
import Link from 'next/link';
import Image from 'next/image';

const PasswordResetRequestPage: NextPage = () => {
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
      resetPassword: '重置密码',
      emailPrompt: '请输入您的邮箱，我们将向您发送密码重置链接',
      backToLogin: '返回登录',
      language: '中文'
    },
    en: {
      resetPassword: 'Reset Password',
      emailPrompt: 'Enter your email and we will send you a password reset link',
      backToLogin: 'Back to Login',
      language: 'English'
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
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{t.resetPassword}</h2>
            </Link>
          </div>
          
          <p className="mb-4 text-center text-sm text-gray-600 dark:text-gray-400">
            {t.emailPrompt}
          </p>
          
          <PasswordResetRequestForm language={language} />
          
          <div className="mt-6 text-center">
            <Link href="/auth/login" className="text-sm font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400">
              {t.backToLogin}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PasswordResetRequestPage; 