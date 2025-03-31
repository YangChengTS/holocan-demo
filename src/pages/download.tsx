import React from 'react';
import Layout from '../components/layout/Layout';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { FaWindows, FaApple, FaAndroid, FaAppStore } from 'react-icons/fa';
import { useLanguage } from '@/context/LanguageContext';

const DownloadPage = () => {
  const { t } = useLanguage();

  const desktopDownloads = [
    {
      id: 1,
      name: 'Windows',
      icon: <FaWindows className="text-6xl text-primary" />,
      version: 'v1.0.0',
      description: t('download.windows.description'),
      downloadUrl: '#'
    },
    {
      id: 2,
      name: 'macOS',
      icon: <FaApple className="text-6xl text-primary" />,
      version: 'v1.0.0',
      description: t('download.macos.description'),
      downloadUrl: '#'
    }
  ];

  const mobileDownloads = [
    {
      id: 1,
      name: 'Android',
      icon: <FaAndroid className="text-6xl text-primary" />,
      description: t('download.android.description'),
      downloadUrl: '#',
      buttonText: t('download.button.apk'),
      qrCode: '/qr-codes/android-qr.png'
    },
    {
      id: 2,
      name: 'iOS',
      icon: <FaAppStore className="text-6xl text-primary" />,
      description: t('download.ios.description'),
      downloadUrl: '#',
      buttonText: t('download.button.appstore'),
      qrCode: '/qr-codes/ios-qr.png'
    }
  ];

  const features = [
    {
      id: 1,
      title: t('download.features.virtual.title'),
      description: t('download.features.virtual.description'),
      icon: '/icons/virtual-exhibition.svg'
    },
    {
      id: 2,
      title: t('download.features.translation.title'),
      description: t('download.features.translation.description'),
      icon: '/icons/translation.svg'
    },
    {
      id: 3,
      title: t('download.features.chat.title'),
      description: t('download.features.chat.description'),
      icon: '/icons/video-chat.svg'
    }
  ];

  const systemRequirements = [
    {
      id: 1,
      platform: t('download.system.desktop'),
      requirements: [
        t('download.windows.description'),
        'CPU: Intel i5/AMD Ryzen 5或更高',
        '内存：8GB RAM或更高',
        '显卡：支持OpenGL 4.0',
        '存储空间：2GB可用空间'
      ]
    },
    {
      id: 2,
      platform: t('download.system.mobile'),
      requirements: [
        t('download.android.description'),
        '至少3GB RAM',
        '1GB可用存储空间',
        '支持ARCore/ARKit的设备',
        '稳定的网络连接'
      ]
    }
  ];

  return (
    <Layout
      title={`${t('download.title')} | HoloCAN - 加中商贸服务平台`}
      description="下载HoloCAN客户端，体验虚拟展厅、在线洽谈、实时翻译等功能，助力中加企业开展跨境贸易。"
    >
      <div className="container mx-auto px-4 pt-24 pb-8">
        {/* 桌面端下载区域 */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-center mb-8">{t('download.desktop.title')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {desktopDownloads.map((platform, index) => (
              <motion.div
                key={platform.id}
                initial={{ opacity: 0, x: index === 0 ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 flex flex-col items-center"
              >
                {platform.icon}
                <h3 className="text-xl font-semibold mt-4 mb-2">{platform.name}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-center mb-4">
                  {platform.description}
                </p>
                <button
                  onClick={() => window.open(platform.downloadUrl, '_blank')}
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-primary-dark"
                >
                  {t('download.button.download')}
                  <span className="ml-2 text-sm">({platform.version})</span>
                </button>
              </motion.div>
            ))}
          </div>
        </section>

        {/* 移动端下载区域 */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-center mb-8">{t('download.mobile.title')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {mobileDownloads.map((platform, index) => (
              <motion.div
                key={platform.id}
                initial={{ opacity: 0, x: index === 0 ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 flex flex-col items-center"
              >
                {platform.icon}
                <h3 className="text-xl font-semibold mt-4 mb-2">{platform.name}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-center mb-4">
                  {platform.description}
                </p>
                <div className="flex space-x-4">
                  {platform.qrCode && (
                    <div className="text-center">
                      <Image
                        src={platform.qrCode}
                        alt={`${platform.name} QR Code`}
                        width={120}
                        height={120}
                        className="mb-2"
                      />
                      <p className="text-sm text-gray-500">{t('download.qr.scan')}</p>
                    </div>
                  )}
                  <button
                    onClick={() => window.open(platform.downloadUrl, '_blank')}
                    className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-primary-dark"
                  >
                    {platform.buttonText}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* 功能特点展示 */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-center mb-8">{t('download.features.title')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
              >
                <Image
                  src={feature.icon}
                  alt={feature.title}
                  width={48}
                  height={48}
                  className="mb-4"
                />
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* 系统要求说明 */}
        <section className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-8">{t('download.system.title')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {systemRequirements.map((system, index) => (
              <motion.div
                key={system.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
              >
                <h3 className="text-xl font-semibold mb-4">{system.platform}</h3>
                <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                  {system.requirements.map((req, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="mr-2">•</span>
                      {req}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default DownloadPage; 