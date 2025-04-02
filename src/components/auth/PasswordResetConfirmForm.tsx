import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Link from 'next/link';
import { useAuth } from '@/context/auth/AuthContext';
import { passwordResetConfirmSchema } from '@/types/auth/schema';

// 使用之前定义的Schema类型
type PasswordResetConfirmValues = z.infer<typeof passwordResetConfirmSchema>;

interface PasswordResetConfirmFormProps {
  token: string;
  language?: 'zh' | 'en';
}

const PasswordResetConfirmForm: React.FC<PasswordResetConfirmFormProps> = ({ token, language = 'zh' }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [resetSuccess, setResetSuccess] = useState(false);
  const { confirmPasswordReset } = useAuth();

  const translations = {
    zh: {
      newPassword: '新密码',
      confirmPassword: '确认新密码',
      passwordRequirements: '密码必须至少包含8个字符，包括大小写字母、数字和特殊字符',
      resetPassword: '重置密码',
      resetting: '重置中...',
      resetSuccess: '密码重置成功!',
      resetSuccessMessage: '您的密码已成功重置。现在您可以使用新密码登录您的账户。',
      goToLogin: '前往登录',
      requestNewLink: '请求新的重置链接',
      resetFailed: '密码重置失败，可能是令牌已过期，请重新发起密码重置请求',
      resetError: '重置过程中发生错误，请稍后再试'
    },
    en: {
      newPassword: 'New Password',
      confirmPassword: 'Confirm New Password',
      passwordRequirements: 'Password must contain at least 8 characters, including uppercase, lowercase, numbers and special characters',
      resetPassword: 'Reset Password',
      resetting: 'Resetting...',
      resetSuccess: 'Password Reset Successful!',
      resetSuccessMessage: 'Your password has been successfully reset. You can now log in to your account with your new password.',
      goToLogin: 'Go to Login',
      requestNewLink: 'Request a new reset link',
      resetFailed: 'Password reset failed, the token may have expired. Please request a new password reset',
      resetError: 'An error occurred during the reset process, please try again later'
    }
  };

  const t = translations[language];

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PasswordResetConfirmValues>({
    resolver: zodResolver(passwordResetConfirmSchema),
    defaultValues: {
      token: token,
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (data: PasswordResetConfirmValues) => {
    setIsLoading(true);
    setServerError(null);
    
    try {
      const success = await confirmPasswordReset(data.token, data.password);
      
      if (success) {
        setResetSuccess(true);
      } else {
        setServerError(t.resetFailed);
      }
    } catch (error) {
      setServerError(t.resetError);
      console.error('Password reset confirm error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (resetSuccess) {
    return (
      <div className="text-center">
        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
          <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{t.resetSuccess}</h2>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          {t.resetSuccessMessage}
        </p>
        <div className="mt-6">
          <Link 
            href="/auth/login" 
            className="text-sm font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400"
          >
            {t.goToLogin}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      {serverError && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {serverError}
        </div>
      )}
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input type="hidden" {...register('token')} />
        
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            {t.newPassword}
          </label>
          <input
            id="password"
            type="password"
            autoComplete="new-password"
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.password ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
            } bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
            {...register('password')}
          />
          {errors.password && (
            <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
          )}
          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
            {t.passwordRequirements}
          </p>
        </div>
        
        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            {t.confirmPassword}
          </label>
          <input
            id="confirmPassword"
            type="password"
            autoComplete="new-password"
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.confirmPassword ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
            } bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
            {...register('confirmPassword')}
          />
          {errors.confirmPassword && (
            <p className="mt-1 text-sm text-red-600">{errors.confirmPassword.message}</p>
          )}
        </div>
        
        <div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
          >
            {isLoading ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                </svg>
                {t.resetting}
              </span>
            ) : t.resetPassword}
          </button>
        </div>
      </form>
      
      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          <Link href="/auth/reset-password" className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400">
            {t.requestNewLink}
          </Link>
        </p>
      </div>
    </>
  );
};

export default PasswordResetConfirmForm; 