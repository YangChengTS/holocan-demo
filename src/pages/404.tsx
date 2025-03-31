import { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

const Custom404: NextPage = () => {
  return (
    <>
      <Head>
        <title>页面未找到 | HoloCAN - 中加虚拟贸易展示平台</title>
        <meta name="description" content="抱歉，您访问的页面不存在或已被移除。" />
      </Head>

      <div className="min-h-screen flex flex-col bg-background-dark">
        <header className="py-6">
          <div className="container-custom">
            <Link href="/" className="inline-block">
              <Image
                src="/holocanlogo-dark.svg"
                alt="HoloCAN Logo"
                width={150}
                height={36}
                priority
              />
            </Link>
          </div>
        </header>

        <main className="flex-grow flex items-center justify-center px-4">
          <div className="max-w-3xl w-full text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="relative h-40 w-40 mx-auto mb-8">
                <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-full opacity-20 animate-pulse"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-7xl font-bold text-gradient gradient-text">404</span>
                </div>
              </div>

              <h1 className="text-3xl md:text-4xl font-bold mb-4">页面未找到</h1>
              <p className="text-text-secondary text-lg mb-8 max-w-xl mx-auto">
                抱歉，您访问的页面不存在或已被移除。请检查您输入的URL是否正确，或通过下方链接返回首页。
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/" className="btn btn-primary rounded-lg">
                  返回首页
                </Link>
                <Link href="/exhibition" className="btn btn-outline-white rounded-lg">
                  探索虚拟展厅
                </Link>
              </div>
            </motion.div>

            <div className="mt-16">
              <p className="text-text-secondary">
                需要帮助？请 <Link href="#" className="text-primary hover:underline">联系我们</Link>
              </p>
            </div>
          </div>
        </main>

        <footer className="py-6">
          <div className="container-custom">
            <div className="text-center text-sm text-text-secondary">
              &copy; {new Date().getFullYear()} HoloCAN. All rights reserved.
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Custom404; 