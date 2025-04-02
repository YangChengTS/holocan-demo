import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuth } from '@/context/auth/AuthContext';
import { businessInfoUpdateSchema } from '@/types/auth/schema';
import { BusinessSize, BusinessType } from '@/types/auth/user';

// 使用之前定义的Schema类型
type BusinessFormValues = z.infer<typeof businessInfoUpdateSchema>;

// 国家数据
const countries = [
  { code: 'CN', name: '中国' },
  { code: 'CA', name: '加拿大' },
  { code: 'US', name: '美国' },
  { code: 'JP', name: '日本' },
  { code: 'KR', name: '韩国' },
  { code: 'GB', name: '英国' },
  { code: 'DE', name: '德国' },
  { code: 'FR', name: '法国' },
  { code: 'AU', name: '澳大利亚' },
  { code: 'NZ', name: '新西兰' },
  { code: 'RU', name: '俄罗斯' },
  { code: 'SG', name: '新加坡' },
  { code: 'IN', name: '印度' },
];

// 中国省份数据
const chinaProvinces = [
  '北京市', '天津市', '河北省', '山西省', '内蒙古自治区', 
  '辽宁省', '吉林省', '黑龙江省', '上海市', '江苏省', 
  '浙江省', '安徽省', '福建省', '江西省', '山东省', 
  '河南省', '湖北省', '湖南省', '广东省', '广西壮族自治区', 
  '海南省', '重庆市', '四川省', '贵州省', '云南省', 
  '西藏自治区', '陕西省', '甘肃省', '青海省', '宁夏回族自治区', 
  '新疆维吾尔自治区', '香港特别行政区', '澳门特别行政区', '台湾省'
];

// 加拿大省份数据
const canadaProvinces = [
  '艾伯塔省', '不列颠哥伦比亚省', '曼尼托巴省', '新不伦瑞克省',
  '纽芬兰与拉布拉多省', '新斯科舍省', '安大略省', '爱德华王子岛省',
  '魁北克省', '萨斯喀彻温省', '西北地区', '育空地区', '努纳武特地区'
];

// 模拟翻译API
const mockTranslate = async (text: string, targetLang: 'zh' | 'en'): Promise<string> => {
  // 在实际应用中，这里应该调用真实的翻译API
  // 例如Google Translate API或百度翻译API
  
  // 仅作演示用途的简单模拟
  if (targetLang === 'en') {
    // 中文转英文的简单模拟
    const simpleMappings: Record<string, string> = {
      '霍尔坎科技有限公司': 'HoloCAN Technology Co., Ltd.',
      '中国移动': 'China Mobile',
      '腾讯': 'Tencent',
      '阿里巴巴': 'Alibaba',
      '百度': 'Baidu',
      '华为': 'Huawei',
      '小米': 'Xiaomi',
      '霍尔坎': 'HoloCAN',
    };
    
    return Promise.resolve(simpleMappings[text] || `${text} (EN)`);
  } else {
    // 英文转中文的简单模拟
    const simpleMappings: Record<string, string> = {
      'HoloCAN Technology': '霍尔坎科技有限公司',
      'China Mobile': '中国移动',
      'Tencent': '腾讯',
      'Alibaba': '阿里巴巴',
      'Baidu': '百度',
      'Huawei': '华为',
      'Xiaomi': '小米',
      'HoloCAN': '霍尔坎',
    };
    
    return Promise.resolve(simpleMappings[text] || `${text} (中文)`);
  }
};

// 修改组件接口，添加language参数
interface BusinessProfileFormProps {
  language?: 'zh' | 'en';
}

const BusinessProfileForm = ({ language = 'zh' }: BusinessProfileFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [updateStatus, setUpdateStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isTranslating, setIsTranslating] = useState(false);
  const { user, updateProfile } = useAuth();

  const translations = {
    zh: {
      businessProfile: '企业资料',
      companyName: '公司名称',
      companyNameEn: '公司英文名称',
      registrationNumber: '营业执照号码',
      businessType: '企业类型',
      businessSize: '企业规模',
      country: '国家',
      province: '省/州',
      city: '城市',
      address: '详细地址',
      contactPerson: '联系人',
      contactPhone: '联系电话',
      contactEmail: '联系邮箱',
      website: '公司网站',
      foundingYear: '成立年份',
      description: '公司简介',
      saveChanges: '保存修改',
      saving: '保存中...',
      updateSuccess: '企业资料更新成功！',
      selectCountry: '请选择国家',
      selectProvince: '请选择省/州',
      optional: '如无公司网站可不填',
      companyDescription: '简要描述公司业务和特点（最多1000个字符）',
      autoTranslating: '自动翻译中...'
    },
    en: {
      businessProfile: 'Business Profile',
      companyName: 'Company Name',
      companyNameEn: 'Company Name (English)',
      registrationNumber: 'Registration Number',
      businessType: 'Business Type',
      businessSize: 'Business Size',
      country: 'Country',
      province: 'Province/State',
      city: 'City',
      address: 'Address',
      contactPerson: 'Contact Person',
      contactPhone: 'Contact Phone',
      contactEmail: 'Contact Email',
      website: 'Website',
      foundingYear: 'Founding Year',
      description: 'Company Description',
      saveChanges: 'Save Changes',
      saving: 'Saving...',
      updateSuccess: 'Business profile updated successfully!',
      selectCountry: 'Select Country',
      selectProvince: 'Select Province/State',
      optional: 'Website is optional',
      companyDescription: 'Brief description of company business and features (max 1000 characters)',
      autoTranslating: 'Auto-translating...'
    }
  };

  const t = translations[language];

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isDirty },
  } = useForm<BusinessFormValues>({
    resolver: zodResolver(businessInfoUpdateSchema),
    defaultValues: {
      companyName: user?.businessInfo?.companyName || '',
      companyNameEn: user?.businessInfo?.companyNameEn || '',
      registrationNumber: user?.businessInfo?.registrationNumber || '',
      businessType: user?.businessInfo?.businessType || BusinessType.OTHER,
      businessSize: user?.businessInfo?.businessSize || BusinessSize.SMALL,
      country: user?.businessInfo?.country || '',
      province: user?.businessInfo?.province || '',
      city: user?.businessInfo?.city || '',
      address: user?.businessInfo?.address || '',
      contactPerson: user?.businessInfo?.contactPerson || '',
      contactPhone: user?.businessInfo?.contactPhone || '',
      contactEmail: user?.businessInfo?.contactEmail || '',
      website: user?.businessInfo?.website || '',
      foundingYear: user?.businessInfo?.foundingYear || undefined,
      description: user?.businessInfo?.description || '',
    },
  });

  // 监听公司名称变化
  const companyName = watch('companyName');
  const companyNameEn = watch('companyNameEn');
  const [lastTranslatedCN, setLastTranslatedCN] = useState('');
  const [lastTranslatedEN, setLastTranslatedEN] = useState('');

  // 检测公司名称变化并自动翻译
  useEffect(() => {
    const translateName = async () => {
      // 如果公司名称变化，且是中文，则翻译成英文
      if (companyName && companyName !== lastTranslatedCN && /[\u4e00-\u9fa5]/.test(companyName)) {
        setIsTranslating(true);
        try {
          const translated = await mockTranslate(companyName, 'en');
          if (!companyNameEn || companyNameEn === lastTranslatedEN) {
            setValue('companyNameEn', translated);
            setLastTranslatedEN(translated);
          }
        } catch (error) {
          console.error('Translation error:', error);
        } finally {
          setIsTranslating(false);
          setLastTranslatedCN(companyName);
        }
      }
    };
    
    translateName();
  }, [companyName, companyNameEn, lastTranslatedCN, lastTranslatedEN, setValue]);

  // 检测公司英文名称变化并自动翻译
  useEffect(() => {
    const translateName = async () => {
      // 如果公司英文名称变化，且无中文，则翻译成中文
      if (companyNameEn && companyNameEn !== lastTranslatedEN && !/[\u4e00-\u9fa5]/.test(companyNameEn)) {
        setIsTranslating(true);
        try {
          const translated = await mockTranslate(companyNameEn, 'zh');
          if (!companyName || companyName === lastTranslatedCN) {
            setValue('companyName', translated);
            setLastTranslatedCN(translated);
          }
        } catch (error) {
          console.error('Translation error:', error);
        } finally {
          setIsTranslating(false);
          setLastTranslatedEN(companyNameEn);
        }
      }
    };
    
    translateName();
  }, [companyNameEn, companyName, lastTranslatedEN, lastTranslatedCN, setValue]);

  // 监听国家变化
  const country = watch('country');
  const [provinces, setProvinces] = useState<string[]>([]);
  
  // 根据国家更新省份列表
  useEffect(() => {
    if (country === '中国') {
      setProvinces(chinaProvinces);
    } else if (country === '加拿大') {
      setProvinces(canadaProvinces);
    } else {
      setProvinces([]);
    }
  }, [country]);

  const onSubmit = async (data: BusinessFormValues) => {
    setIsLoading(true);
    setUpdateStatus('idle');
    setErrorMessage(null);
    
    try {
      // 在实际应用中，您可能需要创建一个专门的更新企业信息的方法
      // 这里我们模拟成功更新
      const success = await updateProfile({ businessInfo: data });
      
      if (success) {
        setUpdateStatus('success');
        // 自动清除成功消息
        setTimeout(() => {
          setUpdateStatus('idle');
        }, 3000);
      } else {
        setUpdateStatus('error');
        setErrorMessage('更新企业资料失败，请稍后再试');
      }
    } catch (error) {
      setUpdateStatus('error');
      setErrorMessage('更新过程中发生错误，请稍后再试');
      console.error('Business profile update error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md dark:bg-gray-800">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">{t.businessProfile}</h2>
      
      {updateStatus === 'success' && (
        <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
          {t.updateSuccess}
        </div>
      )}
      
      {updateStatus === 'error' && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {errorMessage}
        </div>
      )}
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              {t.companyName} <span className="text-red-500">*</span>
            </label>
            <input
              id="companyName"
              type="text"
              className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.companyName ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
              } bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
              {...register('companyName')}
            />
            {errors.companyName && (
              <p className="mt-1 text-sm text-red-600">{errors.companyName.message}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="companyNameEn" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              {t.companyNameEn} <span className="text-red-500">*</span>
              {isTranslating && (
                <span className="ml-2 text-xs text-blue-500 animate-pulse">{t.autoTranslating}</span>
              )}
            </label>
            <input
              id="companyNameEn"
              type="text"
              className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.companyNameEn ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
              } bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
              {...register('companyNameEn')}
            />
            {errors.companyNameEn && (
              <p className="mt-1 text-sm text-red-600">{errors.companyNameEn.message}</p>
            )}
          </div>
        </div>
        
        <div>
          <label htmlFor="registrationNumber" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            {t.registrationNumber}
          </label>
          <input
            id="registrationNumber"
            type="text"
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.registrationNumber ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
            } bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
            {...register('registrationNumber')}
          />
          {errors.registrationNumber && (
            <p className="mt-1 text-sm text-red-600">{errors.registrationNumber.message}</p>
          )}
        </div>
        
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="businessType" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              {t.businessType} <span className="text-red-500">*</span>
            </label>
            <select
              id="businessType"
              className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.businessType ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
              } bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
              {...register('businessType')}
            >
              <option value={BusinessType.MANUFACTURING}>制造业</option>
              <option value={BusinessType.TRADING}>贸易业</option>
              <option value={BusinessType.TECH}>科技业</option>
              <option value={BusinessType.AGRICULTURE}>农业</option>
              <option value={BusinessType.ENERGY}>能源业</option>
              <option value={BusinessType.SERVICE}>服务业</option>
              <option value={BusinessType.OTHER}>其他</option>
            </select>
            {errors.businessType && (
              <p className="mt-1 text-sm text-red-600">{errors.businessType.message}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="businessSize" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              {t.businessSize} <span className="text-red-500">*</span>
            </label>
            <select
              id="businessSize"
              className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.businessSize ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
              } bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
              {...register('businessSize')}
            >
              <option value={BusinessSize.MICRO}>微型 (&lt;10人)</option>
              <option value={BusinessSize.SMALL}>小型 (10-49人)</option>
              <option value={BusinessSize.MEDIUM}>中型 (50-249人)</option>
              <option value={BusinessSize.LARGE}>大型 (250人以上)</option>
            </select>
            {errors.businessSize && (
              <p className="mt-1 text-sm text-red-600">{errors.businessSize.message}</p>
            )}
          </div>
        </div>
        
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div>
            <label htmlFor="country" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              {t.country} <span className="text-red-500">*</span>
            </label>
            <select
              id="country"
              className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.country ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
              } bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
              {...register('country')}
            >
              <option value="">{t.selectCountry}</option>
              {countries.map(country => (
                <option key={country.code} value={country.name}>
                  {country.name}
                </option>
              ))}
            </select>
            {errors.country && (
              <p className="mt-1 text-sm text-red-600">{errors.country.message}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="province" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              {t.province} <span className="text-red-500">*</span>
            </label>
            {provinces.length > 0 ? (
              <select
                id="province"
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.province ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                } bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
                {...register('province')}
              >
                <option value="">{t.selectProvince}</option>
                {provinces.map(province => (
                  <option key={province} value={province}>
                    {province}
                  </option>
                ))}
              </select>
            ) : (
              <input
                id="province"
                type="text"
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.province ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                } bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
                {...register('province')}
              />
            )}
            {errors.province && (
              <p className="mt-1 text-sm text-red-600">{errors.province.message}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="city" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              {t.city} <span className="text-red-500">*</span>
            </label>
            <input
              id="city"
              type="text"
              className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.city ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
              } bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
              {...register('city')}
            />
            {errors.city && (
              <p className="mt-1 text-sm text-red-600">{errors.city.message}</p>
            )}
          </div>
        </div>
        
        <div>
          <label htmlFor="address" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            {t.address} <span className="text-red-500">*</span>
          </label>
          <input
            id="address"
            type="text"
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.address ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
            } bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
            {...register('address')}
          />
          {errors.address && (
            <p className="mt-1 text-sm text-red-600">{errors.address.message}</p>
          )}
        </div>
        
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div>
            <label htmlFor="contactPerson" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              {t.contactPerson} <span className="text-red-500">*</span>
            </label>
            <input
              id="contactPerson"
              type="text"
              className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.contactPerson ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
              } bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
              {...register('contactPerson')}
            />
            {errors.contactPerson && (
              <p className="mt-1 text-sm text-red-600">{errors.contactPerson.message}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="contactPhone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              {t.contactPhone} <span className="text-red-500">*</span>
            </label>
            <input
              id="contactPhone"
              type="tel"
              className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.contactPhone ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
              } bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
              {...register('contactPhone')}
            />
            {errors.contactPhone && (
              <p className="mt-1 text-sm text-red-600">{errors.contactPhone.message}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="contactEmail" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              {t.contactEmail} <span className="text-red-500">*</span>
            </label>
            <input
              id="contactEmail"
              type="email"
              className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.contactEmail ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
              } bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
              {...register('contactEmail')}
            />
            {errors.contactEmail && (
              <p className="mt-1 text-sm text-red-600">{errors.contactEmail.message}</p>
            )}
          </div>
        </div>
        
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="website" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              {t.website}
            </label>
            <input
              id="website"
              type="url"
              placeholder="https://"
              className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.website ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
              } bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
              {...register('website')}
            />
            {errors.website && (
              <p className="mt-1 text-sm text-red-600">{errors.website.message}</p>
            )}
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              {t.optional}
            </p>
          </div>
          
          <div>
            <label htmlFor="foundingYear" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              {t.foundingYear}
            </label>
            <input
              id="foundingYear"
              type="number"
              min="1800"
              max={new Date().getFullYear()}
              className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.foundingYear ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
              } bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
              {...register('foundingYear', { valueAsNumber: true })}
            />
            {errors.foundingYear && (
              <p className="mt-1 text-sm text-red-600">{errors.foundingYear.message}</p>
            )}
          </div>
        </div>
        
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            {t.companyDescription}
          </label>
          <textarea
            id="description"
            rows={4}
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.description ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
            } bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
            {...register('description')}
          />
          {errors.description && (
            <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
          )}
        </div>
        
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isLoading || !isDirty}
            className="inline-flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
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
  );
};

export default BusinessProfileForm; 