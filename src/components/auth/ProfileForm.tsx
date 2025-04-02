import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuth } from '@/context/auth/AuthContext';
import { profileSchema } from '@/types/auth/schema';

// 使用之前定义的Schema类型
type ProfileFormValues = z.infer<typeof profileSchema>;

interface ProfileFormProps {
  language?: 'zh' | 'en';
}

const ProfileForm = ({ language = 'zh' }: ProfileFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const { user, updateProfile } = useAuth();

  const translations = {
    zh: {
      firstName: '名字',
      lastName: '姓氏',
      displayName: '显示名称',
      email: '邮箱',
      phoneNumber: '电话号码',
      jobTitle: '职位',
      location: '所在地',
      bio: '个人简介',
      languagePreference: '语言偏好',
      chinese: '中文',
      english: 'English',
      darkMode: '深色模式',
      saveChanges: '保存更改',
      saving: '保存中...',
      profileUpdated: '个人资料已更新!',
      updateFailed: '更新失败，请稍后再试',
      updateError: '更新过程中发生错误，请稍后再试'
    },
    en: {
      firstName: 'First Name',
      lastName: 'Last Name',
      displayName: 'Display Name',
      email: 'Email',
      phoneNumber: 'Phone Number',
      jobTitle: 'Job Title',
      location: 'Location',
      bio: 'Bio',
      languagePreference: 'Language Preference',
      chinese: 'Chinese',
      english: 'English',
      darkMode: 'Dark Mode',
      saveChanges: 'Save Changes',
      saving: 'Saving...',
      profileUpdated: 'Profile Updated!',
      updateFailed: 'Update failed, please try again later',
      updateError: 'An error occurred during update, please try again later'
    }
  };

  const t = translations[language];

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      displayName: user?.displayName || '',
      email: user?.email || '',
      phoneNumber: user?.phoneNumber || '',
      jobTitle: user?.jobTitle || '',
      location: user?.location || '',
      bio: user?.bio || '',
      language: user?.language || language,
      darkMode: user?.darkMode || false,
    },
  });

  // 当用户数据加载时重置表单
  useEffect(() => {
    if (user) {
      reset({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        displayName: user.displayName || '',
        email: user.email || '',
        phoneNumber: user.phoneNumber || '',
        jobTitle: user.jobTitle || '',
        location: user.location || '',
        bio: user.bio || '',
        language: user.language || language,
        darkMode: user.darkMode || false,
      });
    }
  }, [user, reset, language]);

  const onSubmit = async (data: ProfileFormValues) => {
    setIsLoading(true);
    setUpdateSuccess(false);
    setServerError(null);
    
    try {
      const response = await updateProfile(data);
      
      if (response.success) {
        setUpdateSuccess(true);
        setTimeout(() => setUpdateSuccess(false), 3000); // 3秒后隐藏成功信息
      } else {
        setServerError(response.error || t.updateFailed);
      }
    } catch (error) {
      setServerError(t.updateError);
      console.error('Profile update error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg dark:bg-gray-800">
      <div className="px-4 py-5 sm:p-6">
        {updateSuccess && (
          <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
            {t.profileUpdated}
          </div>
        )}
        
        {serverError && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {serverError}
          </div>
        )}
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                {t.firstName}
              </label>
              <input
                id="firstName"
                type="text"
                className={`mt-1 block w-full border rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${
                  errors.firstName ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                } bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
                {...register('firstName')}
              />
              {errors.firstName && (
                <p className="mt-1 text-sm text-red-600">{errors.firstName.message}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                {t.lastName}
              </label>
              <input
                id="lastName"
                type="text"
                className={`mt-1 block w-full border rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${
                  errors.lastName ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                } bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
                {...register('lastName')}
              />
              {errors.lastName && (
                <p className="mt-1 text-sm text-red-600">{errors.lastName.message}</p>
              )}
            </div>
          </div>
          
          <div>
            <label htmlFor="displayName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              {t.displayName}
            </label>
            <input
              id="displayName"
              type="text"
              className={`mt-1 block w-full border rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${
                errors.displayName ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
              } bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
              {...register('displayName')}
            />
            {errors.displayName && (
              <p className="mt-1 text-sm text-red-600">{errors.displayName.message}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              {t.email}
            </label>
            <input
              id="email"
              type="email"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 bg-gray-100 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed sm:text-sm"
              disabled
              {...register('email')}
            />
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              Email cannot be changed
            </p>
          </div>
          
          <div>
            <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              {t.phoneNumber}
            </label>
            <input
              id="phoneNumber"
              type="text"
              className={`mt-1 block w-full border rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${
                errors.phoneNumber ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
              } bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
              {...register('phoneNumber')}
            />
            {errors.phoneNumber && (
              <p className="mt-1 text-sm text-red-600">{errors.phoneNumber.message}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="jobTitle" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              {t.jobTitle}
            </label>
            <input
              id="jobTitle"
              type="text"
              className={`mt-1 block w-full border rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${
                errors.jobTitle ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
              } bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
              {...register('jobTitle')}
            />
            {errors.jobTitle && (
              <p className="mt-1 text-sm text-red-600">{errors.jobTitle.message}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              {t.location}
            </label>
            <input
              id="location"
              type="text"
              className={`mt-1 block w-full border rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${
                errors.location ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
              } bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
              {...register('location')}
            />
            {errors.location && (
              <p className="mt-1 text-sm text-red-600">{errors.location.message}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="bio" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              {t.bio}
            </label>
            <textarea
              id="bio"
              rows={3}
              className={`mt-1 block w-full border rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${
                errors.bio ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
              } bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
              {...register('bio')}
            />
            {errors.bio && (
              <p className="mt-1 text-sm text-red-600">{errors.bio.message}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="language" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              {t.languagePreference}
            </label>
            <select
              id="language"
              className={`mt-1 block w-full border rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${
                errors.language ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
              } bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
              {...register('language')}
            >
              <option value="zh">{t.chinese}</option>
              <option value="en">{t.english}</option>
            </select>
            {errors.language && (
              <p className="mt-1 text-sm text-red-600">{errors.language.message}</p>
            )}
          </div>
          
          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                id="darkMode"
                type="checkbox"
                className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                {...register('darkMode')}
              />
            </div>
            <div className="ml-3 text-sm">
              <label htmlFor="darkMode" className="font-medium text-gray-700 dark:text-gray-300">
                {t.darkMode}
              </label>
            </div>
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
                  {t.saving}
                </span>
              ) : t.saveChanges}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileForm; 