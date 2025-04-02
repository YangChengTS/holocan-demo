import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Link from 'next/link';
import { useAuth } from '@/context/auth/AuthContext';
import { passwordResetRequestSchema } from '@/types/auth/schema';

// 使用之前定义的schema类型
type PasswordResetRequestFormValues = z.infer<typeof passwordResetRequestSchema>;

interface PasswordResetRequestFormProps {
  language?: 'zh' | 'en';
}

const PasswordResetRequestForm = ({ language = 'zh' }: PasswordResetRequestFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [resetRequestSuccess, setResetRequestSuccess] = useState(false);
  const { requestPasswordReset } = useAuth();

  const translations = {
    zh: {
      email: '邮箱',
      sendResetLink: '发送重置链接',
      sending: '发送中...',
      resetLinkSent: '重置链接已发送!',
      checkEmail: '请查看您的邮箱，我们已经向您发送了一封包含密码重置链接的邮件。',
      resetFailed: '发送重置链接失败，请稍后再试',
      resetError: '发送重置链接过程中发生错误，请稍后再试'
    },
    en: {
      email: 'Email',
      sendResetLink: 'Send Reset Link',
      sending: 'Sending...',
      resetLinkSent: 'Reset Link Sent!',
      checkEmail: 'Please check your email, we have sent you an email containing a password reset link.',
      resetFailed: 'Failed to send reset link, please try again later',
      resetError: 'An error occurred while sending the reset link, please try again later'
    }
  };

  const t = translations[language];

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PasswordResetRequestFormValues>({
    resolver: zodResolver(passwordResetRequestSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async (data: PasswordResetRequestFormValues) => {
    setIsLoading(true);
    setServerError(null);
    
    try {
      const response = await requestPasswordReset(data.email);
      
      if (response.success) {
        setResetRequestSuccess(true);
      } else {
        setServerError(response.error || t.resetFailed);
      }
    } catch (error) {
      setServerError(t.resetError);
      console.error('Password reset request error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (resetRequestSuccess) {
    return (
      <div className="text-center">
        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
          <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{t.resetLinkSent}</h2>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          {t.checkEmail}
        </p>
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
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            {t.email}
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.email ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
            } bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
            {...register('email')}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
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
                {t.sending}
              </span>
            ) : t.sendResetLink}
          </button>
        </div>
      </form>
    </>
  );
};

export default PasswordResetRequestForm; 