/**
 * 认证API相关类型定义
 */
import { SafeUser } from './user';

/**
 * API响应基本接口
 */
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

/**
 * 认证响应接口
 */
export interface AuthResponse extends ApiResponse<{ user: SafeUser; token: string }> {
  // 继承ApiResponse并指定返回数据类型
}

/**
 * 登录请求接口
 */
export interface LoginRequest {
  email: string;
  password: string;
}

/**
 * 注册请求接口
 */
export interface RegisterRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role?: string;
  language: 'zh' | 'en';
}

/**
 * 邮箱验证请求接口
 */
export interface VerifyEmailRequest {
  token: string;
}

/**
 * 密码重置请求接口
 */
export interface RequestPasswordResetRequest {
  email: string;
}

/**
 * 密码重置确认请求接口
 */
export interface ConfirmPasswordResetRequest {
  token: string;
  password: string;
}

/**
 * 用户信息更新请求接口
 */
export interface UpdateProfileRequest {
  firstName?: string;
  lastName?: string;
  displayName?: string;
  phoneNumber?: string;
  avatarUrl?: string;
  language?: 'zh' | 'en';
  jobTitle?: string;
  location?: string;
  bio?: string;
  prefersDarkMode?: boolean;
}

/**
 * 企业信息更新请求接口
 */
export interface UpdateBusinessInfoRequest {
  companyName?: string;
  companyNameEn?: string;
  registrationNumber?: string;
  businessType?: string;
  businessSize?: string;
  country?: string;
  province?: string;
  city?: string;
  address?: string;
  contactPerson?: string;
  contactPhone?: string;
  contactEmail?: string;
  website?: string;
  foundingYear?: number;
  description?: string;
  logoUrl?: string;
} 