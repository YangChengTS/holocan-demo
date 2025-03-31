import { motion, AnimatePresence } from 'framer-motion';
import { FaBuilding, FaMapMarkerAlt, FaIndustry, FaUser, FaSpinner } from 'react-icons/fa';
import Image from 'next/image';
import type { MatchResult } from '@/pages/matching';

type MatchingResultsProps = {
  results: MatchResult[];
  isLoading: boolean;
  hasSearched: boolean;
};

const MatchingResults = ({ results, isLoading, hasSearched }: MatchingResultsProps) => {
  if (isLoading) {
    return (
      <div className="bg-dark-card rounded-xl p-8 h-full flex flex-col items-center justify-center shadow-lg min-h-[500px]">
        <FaSpinner className="animate-spin text-4xl text-primary mb-4" />
        <h3 className="text-xl font-semibold text-white mb-2">AI匹配进行中</h3>
        <p className="text-gray-400 text-center max-w-md">
          我们的AI系统正在分析您的需求，并从加拿大企业数据库中筛选最合适的合作伙伴...
        </p>
      </div>
    );
  }

  if (!hasSearched) {
    return (
      <div className="bg-dark-card rounded-xl p-8 h-full flex flex-col items-center justify-center shadow-lg min-h-[500px]">
        <div className="bg-primary/10 p-4 rounded-full mb-4">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-12 w-12 text-primary"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={1.5} 
              d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" 
            />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-white mb-2">请设置匹配条件</h3>
        <p className="text-gray-400 text-center max-w-md">
          在左侧表单中选择您的业务需求和偏好，我们将为您匹配最合适的加拿大企业合作伙伴。
          匹配结果将根据多种因素进行排名，帮助您更快地找到理想的商业合作机会。
        </p>
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <div className="bg-dark-card rounded-xl p-8 h-full flex flex-col items-center justify-center shadow-lg min-h-[500px]">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-16 w-16 text-gray-500 mb-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={1.5} 
            d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
          />
        </svg>
        <h3 className="text-xl font-semibold text-white mb-2">未找到匹配结果</h3>
        <p className="text-gray-400 text-center max-w-md">
          根据您的筛选条件，我们未能找到匹配的企业。请尝试调整您的匹配条件，或联系我们的客服获取更多帮助。
        </p>
        <button className="mt-6 px-6 py-2 bg-primary/20 hover:bg-primary/30 text-primary font-medium rounded-lg transition-colors">
          调整匹配条件
        </button>
      </div>
    );
  }

  return (
    <div className="bg-dark-card rounded-xl p-6 shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-white">匹配结果</h2>
        <span className="text-sm text-gray-400">找到 {results.length} 个匹配企业</span>
      </div>

      <AnimatePresence>
        <div className="space-y-4">
          {results.map((result, index) => (
            <motion.div
              key={result.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="border border-gray-800 rounded-lg p-4 hover:border-gray-700 transition-all duration-200"
            >
              <div className="flex items-start">
                <div className="relative w-16 h-16 bg-gray-800 rounded-lg overflow-hidden flex-shrink-0 mr-4">
                  {/* 企业logo，这里使用占位图 */}
                  <div className="absolute inset-0 flex items-center justify-center text-xl font-bold text-white">
                    {result.companyName.charAt(0)}
                  </div>
                </div>
                
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h3 className="text-lg font-semibold text-white">{result.companyName}</h3>
                    <div className="flex items-center bg-primary/20 px-2 py-1 rounded-full">
                      <span className="text-sm font-medium text-primary">匹配度 {result.matchScore}%</span>
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-400 mt-1 mb-3">{result.description}</p>
                  
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="flex items-center text-gray-400">
                      <FaMapMarkerAlt className="mr-2 text-gray-500" />
                      {result.location}
                    </div>
                    <div className="flex items-center text-gray-400">
                      <FaIndustry className="mr-2 text-gray-500" />
                      {result.industry}
                    </div>
                    <div className="flex items-center text-gray-400">
                      <FaUser className="mr-2 text-gray-500" />
                      {result.contactPerson}
                    </div>
                  </div>
                  
                  <div className="mt-4 flex justify-end space-x-2">
                    <button className="px-3 py-1 text-sm border border-gray-700 rounded hover:bg-gray-800 text-gray-300 transition-colors">
                      查看详情
                    </button>
                    <button className="px-3 py-1 text-sm bg-primary/20 hover:bg-primary/30 text-primary rounded transition-colors">
                      联系企业
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </AnimatePresence>

      <div className="mt-6 pt-4 border-t border-gray-800">
        <p className="text-sm text-gray-500">
          匹配结果基于您提供的需求和偏好，按照匹配度从高到低排序。
          您可以点击"查看详情"了解更多企业信息，或直接"联系企业"开始商务对接。
        </p>
      </div>
    </div>
  );
};

export default MatchingResults; 