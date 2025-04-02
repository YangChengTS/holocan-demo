import { z } from 'zod';
import { UserRole } from './user';

/**
 * 登录表单验证Schema
 */
export const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: '邮箱不能为空' })
    .email({ message: '请输入有效的邮箱地址' }),
  password: z
    .string()
    .min(1, { message: '密码不能为空' })
    .min(8, { message: '密码长度至少为8个字符' }),
  rememberMe: z.boolean().optional(),
});

/**
 * 注册表单验证Schema
 */
export const registerSchema = z
  .object({
    email: z
      .string()
      .min(1, { message: '邮箱不能为空' })
      .email({ message: '请输入有效的邮箱地址' }),
    password: z
      .string()
      .min(1, { message: '密码不能为空' })
      .min(8, { message: '密码长度至少为8个字符' })
      .regex(/[A-Z]/, { message: '密码必须包含至少一个大写字母' })
      .regex(/[a-z]/, { message: '密码必须包含至少一个小写字母' })
      .regex(/[0-9]/, { message: '密码必须包含至少一个数字' })
      .regex(/[^A-Za-z0-9]/, { message: '密码必须包含至少一个特殊字符' }),
    confirmPassword: z.string().min(1, { message: '请确认密码' }),
    firstName: z.string().min(1, { message: '名字不能为空' }),
    lastName: z.string().min(1, { message: '姓氏不能为空' }),
    role: z.nativeEnum(UserRole).default(UserRole.USER),
    language: z.enum(['zh', 'en']).default('zh'),
    agreeToTerms: z.boolean().refine(val => val === true, {
      message: '请同意服务条款和隐私政策',
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: '两次输入的密码不一致',
    path: ['confirmPassword'],
  });

/**
 * 密码重置请求验证Schema
 */
export const passwordResetRequestSchema = z.object({
  email: z
    .string()
    .min(1, { message: '邮箱不能为空' })
    .email({ message: '请输入有效的邮箱地址' }),
});

/**
 * 密码重置确认验证Schema
 */
export const passwordResetConfirmSchema = z
  .object({
    token: z.string().min(1, { message: '令牌不能为空' }),
    password: z
      .string()
      .min(1, { message: '密码不能为空' })
      .min(8, { message: '密码长度至少为8个字符' })
      .regex(/[A-Z]/, { message: '密码必须包含至少一个大写字母' })
      .regex(/[a-z]/, { message: '密码必须包含至少一个小写字母' })
      .regex(/[0-9]/, { message: '密码必须包含至少一个数字' })
      .regex(/[^A-Za-z0-9]/, { message: '密码必须包含至少一个特殊字符' }),
    confirmPassword: z.string().min(1, { message: '请确认密码' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: '两次输入的密码不一致',
    path: ['confirmPassword'],
  });

/**
 * 个人资料验证Schema
 */
export const profileSchema = z.object({
  firstName: z.string().min(1, { message: '名字不能为空' }),
  lastName: z.string().min(1, { message: '姓氏不能为空' }),
  displayName: z.string().optional(),
  email: z.string().email({ message: '请输入有效的邮箱地址' }),
  phoneNumber: z
    .string()
    .regex(/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/, {
      message: '请输入有效的电话号码',
    })
    .optional(),
  jobTitle: z.string().optional(),
  location: z.string().optional(),
  bio: z.string().max(500, { message: '简介不能超过500个字符' }).optional(),
  language: z.enum(['zh', 'en']).default('zh'),
  darkMode: z.boolean().optional(),
});

/**
 * 个人资料更新验证Schema
 */
export const profileUpdateSchema = z.object({
  firstName: z.string().min(1, { message: '名字不能为空' }).optional(),
  lastName: z.string().min(1, { message: '姓氏不能为空' }).optional(),
  displayName: z.string().optional(),
  phoneNumber: z
    .string()
    .regex(/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/, {
      message: '请输入有效的电话号码',
    })
    .optional(),
  language: z.enum(['zh', 'en']).optional(),
  jobTitle: z.string().optional(),
  location: z.string().optional(),
  bio: z.string().max(500, { message: '简介不能超过500个字符' }).optional(),
  prefersDarkMode: z.boolean().optional(),
});

/**
 * 企业信息更新验证Schema
 */
export const businessInfoUpdateSchema = z.object({
  companyName: z.string().min(1, { message: '公司名称不能为空' }).optional(),
  companyNameEn: z.string().optional(),
  registrationNumber: z.string().optional(),
  businessType: z.string().min(1, { message: '企业类型不能为空' }).optional(),
  businessSize: z.string().min(1, { message: '企业规模不能为空' }).optional(),
  country: z.string().min(1, { message: '国家不能为空' }).optional(),
  province: z.string().min(1, { message: '省/州不能为空' }).optional(),
  city: z.string().min(1, { message: '城市不能为空' }).optional(),
  address: z.string().min(1, { message: '详细地址不能为空' }).optional(),
  contactPerson: z.string().min(1, { message: '联系人不能为空' }).optional(),
  contactPhone: z
    .string()
    .regex(/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/, {
      message: '请输入有效的电话号码',
    })
    .optional(),
  contactEmail: z
    .string()
    .email({ message: '请输入有效的邮箱地址' })
    .optional(),
  website: z
    .string()
    .url({ message: '请输入有效的URL' })
    .or(z.literal(''))
    .optional(),
  foundingYear: z
    .number()
    .int()
    .min(1800, { message: '请输入有效的成立年份' })
    .max(new Date().getFullYear(), { message: '成立年份不能超过当前年份' })
    .optional(),
  description: z
    .string()
    .max(1000, { message: '公司简介不能超过1000个字符' })
    .optional(),
}); 