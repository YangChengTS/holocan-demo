import { NextPage } from 'next';
import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FaEnvelope, FaLock, FaUser, FaWeixin, FaGoogle } from 'react-icons/fa';

const Login: NextPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setError('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Validate inputs
    if (!email || !password || (!isLogin && !companyName)) {
      setError('请填写所有必填项');
      setLoading(false);
      return;
    }

    // Simulate authentication
    setTimeout(() => {
      setLoading(false);
      
      // Demo purpose - always succeeds
      if (isLogin) {
        // Redirect to dashboard or homepage
        window.location.href = '/';
      } else {
        // Show success message for registration
        setError('success');
      }
    }, 1500);
  };

  return (
    <>
      <Head>
        <title>{isLogin ? '登录' : '注册'} | HoloCAN - 中加虚拟贸易展示平台</title>
        <meta name="description" content="登录或注册HoloCAN平台，连接中加企业，开启跨境贸易之旅。" />
      </Head>

      <div className="min-h-screen flex">
        {/* Left panel - Form */}
        <div className="flex-1 flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 bg-background-dark">
          <div className="max-w-md w-full space-y-8">
            <div>
              <Link href="/" className="flex justify-center">
                <Image 
                  src="/holocanlogo-nobg.svg"
                  alt="HoloCAN Logo"
                  width={180}
                  height={40}
                  priority
                />
              </Link>
              <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-800">
                {isLogin ? '登录您的账户' : '创建新账户'}
              </h2>
              <p className="mt-2 text-center text-sm text-gray-600">
                {isLogin ? '或' : '已有账户？'}{' '}
                <button 
                  onClick={toggleMode} 
                  className="font-medium text-primary hover:text-primary/80"
                >
                  {isLogin ? '创建新账户' : '登录您的账户'}
                </button>
              </p>
            </div>

            {error && error !== 'success' && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 text-sm text-red-400">
                {error}
              </div>
            )}

            {error === 'success' && (
              <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 text-sm text-green-400">
                注册成功！您现在可以使用您的电子邮件和密码登录。
              </div>
            )}

            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-4">
                {!isLogin && (
                  <div>
                    <label htmlFor="company-name" className="sr-only">
                      公司名称
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <FaUser className="h-5 w-5 text-gray-500" />
                      </div>
                      <input
                        id="company-name"
                        name="company"
                        type="text"
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        className="input-primary pl-10 w-full"
                        placeholder="公司名称"
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label htmlFor="email-address" className="sr-only">
                    电子邮件
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <FaEnvelope className="h-5 w-5 text-gray-500" />
                    </div>
                    <input
                      id="email-address"
                      name="email"
                      type="email"
                      autoComplete="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="input-primary pl-10 w-full"
                      placeholder="电子邮件地址"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="password" className="sr-only">
                    密码
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <FaLock className="h-5 w-5 text-gray-500" />
                    </div>
                    <input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete={isLogin ? "current-password" : "new-password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="input-primary pl-10 w-full"
                      placeholder="密码"
                    />
                  </div>
                </div>
              </div>

              {isLogin && (
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 text-primary focus:ring-primary bg-gray-800 border-gray-700 rounded"
                    />
                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-400">
                      记住我
                    </label>
                  </div>

                  <div className="text-sm">
                    <a href="#" className="font-medium text-primary hover:text-primary/80">
                      忘记密码?
                    </a>
                  </div>
                </div>
              )}

              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className="btn btn-primary w-full rounded-lg relative"
                >
                  {loading ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      处理中...
                    </span>
                  ) : (
                    <span>{isLogin ? '登录' : '注册'}</span>
                  )}
                </button>
              </div>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-700"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-background-dark text-gray-400">或通过以下方式继续</span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <button
                  type="button"
                  className="inline-flex justify-center items-center px-4 py-2 border border-gray-700 rounded-md shadow-sm bg-background-dark hover:bg-gray-800 text-sm font-medium text-gray-300"
                >
                  <FaWeixin className="h-5 w-5 text-green-500 mr-2" />
                  <span>微信登录</span>
                </button>
                <button
                  type="button"
                  className="inline-flex justify-center items-center px-4 py-2 border border-gray-700 rounded-md shadow-sm bg-background-dark hover:bg-gray-800 text-sm font-medium text-gray-300"
                >
                  <FaGoogle className="h-5 w-5 text-red-400 mr-2" />
                  <span>Google登录</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right panel - Image */}
        <div className="hidden lg:block lg:w-1/2 relative">
          <div className="absolute inset-0">
            <Image
              src="/canda_photo (4).png"
              alt="Canada Skyline"
              fill
              style={{ objectFit: 'cover' }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-white/90 to-white/70"></div>
          </div>
          <div className="absolute inset-0 flex flex-col items-start justify-center pl-20 pr-16">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl font-bold mb-4 text-gray-800">
                连接<span className="text-primary">中国</span>与<span className="text-secondary">加拿大</span>，
                <br />开启跨境贸易新时代
              </h1>
              <p className="text-lg text-gray-800 mb-6 font-medium">
                加入HoloCAN平台，利用AI智能匹配和3D虚拟展会空间，
                克服语言、文化和市场准入障碍，高效开展跨境贸易。
              </p>
              <ul className="space-y-2">
                {[
                  'AI智能匹配最佳合作伙伴',
                  '3D虚拟展厅展示产品和服务',
                  '双语商务对接消除沟通障碍',
                  '全流程贸易支持和市场洞察'
                ].map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <div className="h-2 w-2 rounded-full bg-primary mr-3"></div>
                    <span className="text-gray-800 font-medium">{feature}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login; 