/**
 * 用户认证与信息相关类型定义
 */

/**
 * 用户角色枚举
 */
export enum UserRole {
  USER = 'user',         // 普通用户
  BUSINESS = 'business', // 企业用户
  ADMIN = 'admin',       // 管理员
}

/**
 * 用户账户状态枚举
 */
export enum UserStatus {
  PENDING = 'pending',     // 待验证
  ACTIVE = 'active',       // 已激活
  SUSPENDED = 'suspended', // 已暂停
  DELETED = 'deleted',     // 已删除
}

/**
 * 企业规模枚举
 */
export enum BusinessSize {
  MICRO = 'micro',         // 微型 (<10人)
  SMALL = 'small',         // 小型 (10-49人)
  MEDIUM = 'medium',       // 中型 (50-249人)
  LARGE = 'large',         // 大型 (250人以上)
}

/**
 * 企业类型枚举
 */
export enum BusinessType {
  MANUFACTURING = 'manufacturing',   // 制造业
  TRADING = 'trading',               // 贸易业
  TECH = 'tech',                     // 科技业
  AGRICULTURE = 'agriculture',       // 农业
  ENERGY = 'energy',                 // 能源业
  SERVICE = 'service',               // 服务业
  OTHER = 'other',                   // 其他
}

/**
 * 企业信息接口
 */
export interface BusinessInfo {
  companyName: string;         // 公司名称
  companyNameEn?: string;      // 公司英文名称
  registrationNumber?: string; // 注册号
  businessType: BusinessType;  // 企业类型
  businessSize: BusinessSize;  // 企业规模
  country: string;             // 国家
  province: string;            // 省/州
  city: string;                // 城市
  address: string;             // 详细地址
  contactPerson: string;       // 联系人
  contactPhone: string;        // 联系电话
  contactEmail: string;        // 联系邮箱
  website?: string;            // 公司网站
  foundingYear?: number;       // 成立年份
  description?: string;        // 公司简介
  logoUrl?: string;            // 公司标志URL
}

/**
 * 用户基本信息接口
 */
export interface UserProfile {
  firstName: string;           // 名
  lastName: string;            // 姓
  displayName?: string;        // 显示名称
  avatarUrl?: string;          // 头像URL
  phoneNumber?: string;        // 电话号码
  language: 'zh' | 'en';       // 偏好语言
  jobTitle?: string;           // 职位
  location?: string;           // 位置
  bio?: string;                // 简介
}

/**
 * 用户认证信息接口
 */
export interface UserAuth {
  email: string;               // 邮箱(唯一)
  emailVerified: boolean;      // 邮箱是否已验证
  passwordHash?: string;       // 密码哈希(仅服务端)
  lastLogin?: Date;            // 最近登录时间
  failedLoginAttempts?: number;// 登录失败次数
  pwdResetToken?: string;      // 密码重置令牌
  pwdResetExpires?: Date;      // 密码重置令牌过期时间
}

/**
 * 完整用户信息接口
 */
export interface User {
  id: string;                  // 用户ID
  auth: UserAuth;              // 认证信息
  profile: UserProfile;        // 个人资料
  role: UserRole;              // 用户角色
  status: UserStatus;          // 账户状态
  businessInfo?: BusinessInfo; // 企业信息(可选)
  prefersDarkMode?: boolean;   // 偏好深色模式
  createdAt: Date;             // 创建时间
  updatedAt: Date;             // 更新时间
}

/**
 * 简化的用户信息(客户端使用)
 */
export interface SafeUser {
  id: string;
  email: string;
  emailVerified: boolean;
  profile: UserProfile;
  role: UserRole;
  status: UserStatus;
  businessInfo?: BusinessInfo;
  prefersDarkMode?: boolean;
}

/**
 * 注册表单数据接口
 */
export interface RegisterFormData {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  language: 'zh' | 'en';
  agreeToTerms: boolean;
}

/**
 * 登录表单数据接口
 */
export interface LoginFormData {
  email: string;
  password: string;
  rememberMe?: boolean;
}

/**
 * 密码重置请求接口
 */
export interface PasswordResetRequestData {
  email: string;
}

/**
 * 密码重置确认接口
 */
export interface PasswordResetConfirmData {
  token: string;
  password: string;
  confirmPassword: string;
} 