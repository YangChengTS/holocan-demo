import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import PasswordResetConfirmForm from '@/components/auth/PasswordResetConfirmForm';
import { useAuth } from '@/context/auth/AuthContext';
import Link from 'next/link';
import Image from 'next/image';

const PasswordResetConfirmPage: NextPage = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const { token } = router.query;
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
      resetPassword: '设置新密码',
      instructions: '请输入您的新密码',
      invalidToken: '无效或已过期的重置令牌',
      tokenError: '无法验证密码重置令牌，请重新请求重置密码',
      backToReset: '返回重置密码页面'
    },
    en: {
      resetPassword: 'Set New Password',
      instructions: 'Please enter your new password',
      invalidToken: 'Invalid or expired reset token',
      tokenError: 'Unable to verify password reset token, please request a new reset',
      backToReset: 'Back to Reset Password'
    }
  };

  const t = translations[language];

  // 处理无效或缺失的token
  if (!token) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div className="mx-auto w-full max-w-md p-6 bg-white rounded-lg shadow-md dark:bg-gray-800">
              <div className="text-center">
                <svg className="mx-auto h-12 w-12 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <h3 className="mt-2 text-xl font-medium text-gray-900 dark:text-white">{t.invalidToken}</h3>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{t.tokenError}</p>
                <div className="mt-6">
                  <Link href="/auth/reset-password" className="text-sm font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400">
                    {t.backToReset}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

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
            {t.instructions}
          </p>
          
          <PasswordResetConfirmForm token={token as string} language={language} />
        </div>
      </div>
    </div>
  );
};

export default PasswordResetConfirmPage; 