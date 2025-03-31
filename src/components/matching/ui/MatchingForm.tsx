import { useState, FormEvent } from 'react';
import { motion } from 'framer-motion';
import { FaSearch, FaSpinner } from 'react-icons/fa';

// 预定义的行业类型选项
const INDUSTRY_TYPES = [
  { id: 'tech', name: '科技与信息技术' },
  { id: 'manufacturing', name: '制造业' },
  { id: 'agriculture', name: '农业与食品' },
  { id: 'healthcare', name: '医疗健康' },
  { id: 'energy', name: '能源与环保' },
  { id: 'education', name: '教育与培训' },
  { id: 'retail', name: '零售与电商' },
  { id: 'finance', name: '金融服务' },
  { id: 'tourism', name: '旅游与酒店' },
  { id: 'logistics', name: '物流与供应链' },
];

// 合作类型选项
const COOPERATION_TYPES = [
  { id: 'export', name: '产品出口' },
  { id: 'import', name: '产品进口' },
  { id: 'distribution', name: '分销合作' },
  { id: 'technology', name: '技术合作' },
  { id: 'investment', name: '投资合作' },
  { id: 'joint_venture', name: '合资企业' },
];

// 加拿大地区选项
const CANADA_REGIONS = [
  { id: 'ontario', name: '安大略省' },
  { id: 'quebec', name: '魁北克省' },
  { id: 'bc', name: '不列颠哥伦比亚省' },
  { id: 'alberta', name: '艾伯塔省' },
  { id: 'manitoba', name: '曼尼托巴省' },
  { id: 'saskatchewan', name: '萨斯喀彻温省' },
  { id: 'nova_scotia', name: '新斯科舍省' },
  { id: 'new_brunswick', name: '新不伦瑞克省' },
  { id: 'pei', name: '爱德华王子岛省' },
  { id: 'newfoundland', name: '纽芬兰与拉布拉多省' },
  { id: 'any', name: '不限地区' },
];

type MatchingFormProps = {
  onSubmit: (formData: any) => void;
  isLoading: boolean;
};

const MatchingForm = ({ onSubmit, isLoading }: MatchingFormProps) => {
  const [formData, setFormData] = useState({
    industryType: '',
    cooperationType: '',
    region: '',
    companySize: 'any',
    keywords: '',
    yearsInBusiness: 'any',
  });

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="bg-dark-card rounded-xl p-6 shadow-lg"
    >
      <h2 className="text-xl font-semibold mb-6 text-white">合作伙伴筛选条件</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          {/* 行业选择 */}
          <div>
            <label htmlFor="industryType" className="block text-sm font-medium text-gray-300 mb-1">
              行业类型
            </label>
            <select
              id="industryType"
              name="industryType"
              value={formData.industryType}
              onChange={handleChange}
              className="w-full bg-dark-input border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:ring-primary focus:border-primary"
              required
            >
              <option value="">请选择行业</option>
              {INDUSTRY_TYPES.map((industry) => (
                <option key={industry.id} value={industry.id}>
                  {industry.name}
                </option>
              ))}
            </select>
          </div>

          {/* 合作类型 */}
          <div>
            <label htmlFor="cooperationType" className="block text-sm font-medium text-gray-300 mb-1">
              合作类型
            </label>
            <select
              id="cooperationType"
              name="cooperationType"
              value={formData.cooperationType}
              onChange={handleChange}
              className="w-full bg-dark-input border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:ring-primary focus:border-primary"
              required
            >
              <option value="">请选择合作类型</option>
              {COOPERATION_TYPES.map((type) => (
                <option key={type.id} value={type.id}>
                  {type.name}
                </option>
              ))}
            </select>
          </div>

          {/* 地区选择 */}
          <div>
            <label htmlFor="region" className="block text-sm font-medium text-gray-300 mb-1">
              加拿大地区
            </label>
            <select
              id="region"
              name="region"
              value={formData.region}
              onChange={handleChange}
              className="w-full bg-dark-input border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:ring-primary focus:border-primary"
            >
              <option value="">请选择地区</option>
              {CANADA_REGIONS.map((region) => (
                <option key={region.id} value={region.id}>
                  {region.name}
                </option>
              ))}
            </select>
          </div>

          {/* 公司规模 */}
          <div>
            <label htmlFor="companySize" className="block text-sm font-medium text-gray-300 mb-1">
              公司规模
            </label>
            <select
              id="companySize"
              name="companySize"
              value={formData.companySize}
              onChange={handleChange}
              className="w-full bg-dark-input border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:ring-primary focus:border-primary"
            >
              <option value="any">不限</option>
              <option value="small">小型 (1-50人)</option>
              <option value="medium">中型 (51-200人)</option>
              <option value="large">大型 (200+人)</option>
            </select>
          </div>

          {/* 经营年限 */}
          <div>
            <label htmlFor="yearsInBusiness" className="block text-sm font-medium text-gray-300 mb-1">
              经营年限
            </label>
            <select
              id="yearsInBusiness"
              name="yearsInBusiness"
              value={formData.yearsInBusiness}
              onChange={handleChange}
              className="w-full bg-dark-input border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:ring-primary focus:border-primary"
            >
              <option value="any">不限</option>
              <option value="1-3">1-3年</option>
              <option value="3-5">3-5年</option>
              <option value="5-10">5-10年</option>
              <option value="10+">10年以上</option>
            </select>
          </div>

          {/* 关键词 */}
          <div>
            <label htmlFor="keywords" className="block text-sm font-medium text-gray-300 mb-1">
              关键词/具体需求
            </label>
            <input
              type="text"
              id="keywords"
              name="keywords"
              value={formData.keywords}
              onChange={handleChange}
              placeholder="输入关键词或具体需求描述"
              className="w-full bg-dark-input border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:ring-primary focus:border-primary"
            />
          </div>

          {/* 提交按钮 */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-gradient-to-r from-primary to-secondary hover:from-primary-dark hover:to-secondary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-70 transition-all duration-200"
            >
              {isLoading ? (
                <>
                  <FaSpinner className="animate-spin mr-2" />
                  匹配中...
                </>
              ) : (
                <>
                  <FaSearch className="mr-2" />
                  开始匹配
                </>
              )}
            </button>
          </div>
        </div>
      </form>

      <div className="mt-6 pt-4 border-t border-gray-700">
        <p className="text-sm text-gray-400">
          我们的AI系统将分析您的需求和偏好，从我们的加拿大企业数据库中匹配最适合的合作伙伴。
          匹配结果基于多维度评分，包括业务契合度、地理位置、市场表现等因素。
        </p>
      </div>
    </motion.div>
  );
};

export default MatchingForm; 