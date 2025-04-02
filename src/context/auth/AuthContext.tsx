import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { SafeUser } from '@/types/auth/user';
import { AuthResponse } from '@/types/auth/api';

// 认证上下文接口
interface AuthContextType {
  user: SafeUser | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<AuthResponse>;
  register: (formData: any) => Promise<AuthResponse>;
  logout: () => void;
  resetPassword: (email: string) => Promise<boolean>;
  confirmPasswordReset: (token: string, password: string) => Promise<boolean>;
  updateProfile: (profileData: any) => Promise<boolean>;
}

// 默认上下文值
const defaultContext: AuthContextType = {
  user: null,
  token: null,
  isLoading: true,
  isAuthenticated: false,
  login: async () => ({ success: false, error: "Context not initialized" }),
  register: async () => ({ success: false, error: "Context not initialized" }),
  logout: () => {},
  resetPassword: async () => false,
  confirmPasswordReset: async () => false,
  updateProfile: async () => false,
};

// 创建上下文
const AuthContext = createContext<AuthContextType>(defaultContext);

// 使用上下文Hook
export const useAuth = () => useContext(AuthContext);

// 认证Provider属性接口
interface AuthProviderProps {
  children: ReactNode;
}

/**
 * 认证服务提供者
 */
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<SafeUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // 从本地存储加载认证状态
  useEffect(() => {
    const loadAuthState = () => {
      try {
        const storedToken = localStorage.getItem('authToken');
        const storedUser = localStorage.getItem('authUser');
        
        if (storedToken && storedUser) {
          setToken(storedToken);
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error('Failed to load auth state:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadAuthState();
  }, []);

  // 登录功能
  const login = async (email: string, password: string): Promise<AuthResponse> => {
    setIsLoading(true);
    try {
      // 实际项目中这里应该是API调用
      // const response = await fetch('/api/auth/login', {...})
      
      // 模拟成功登录 - 设置为企业用户
      const mockResponse: AuthResponse = {
        success: true,
        data: {
          user: {
            id: '1',
            email,
            emailVerified: true,
            profile: {
              firstName: 'Demo',
              lastName: 'User',
              language: 'zh',
            },
            role: 'business',
            status: 'active',
            businessInfo: {
              companyName: '示例公司',
              companyNameEn: 'Example Company',
              businessType: 'tech',
              businessSize: 'medium',
              country: '中国',
              province: '北京',
              city: '北京',
              address: '朝阳区某街道100号',
              contactPerson: '联系人',
              contactPhone: '13800138000',
              contactEmail: email,
            }
          },
          token: 'mock-jwt-token'
        },
        message: '登录成功'
      };
      
      // 保存认证状态
      if (mockResponse.success && mockResponse.data) {
        const { user: userData, token: authToken } = mockResponse.data;
        setUser(userData);
        setToken(authToken);
        
        // 存储到本地
        localStorage.setItem('authToken', authToken);
        localStorage.setItem('authUser', JSON.stringify(userData));
      }
      
      return mockResponse;
    } catch (error) {
      console.error('Login error:', error);
      return {
        success: false,
        error: '登录失败，请稍后再试'
      };
    } finally {
      setIsLoading(false);
    }
  };

  // 注册功能
  const register = async (formData: any): Promise<AuthResponse> => {
    setIsLoading(true);
    try {
      // 实际项目中这里应该是API调用
      // const response = await fetch('/api/auth/register', {...})
      
      // 模拟成功注册
      const mockResponse: AuthResponse = {
        success: true,
        data: {
          user: {
            id: '2',
            email: formData.email,
            emailVerified: false,
            profile: {
              firstName: formData.firstName,
              lastName: formData.lastName,
              language: formData.language || 'zh',
            },
            role: formData.role || 'user',
            status: 'pending',
          },
          token: 'mock-jwt-token'
        },
        message: '注册成功，请验证您的邮箱'
      };
      
      // 保存认证状态
      if (mockResponse.success && mockResponse.data) {
        const { user: userData, token: authToken } = mockResponse.data;
        setUser(userData);
        setToken(authToken);
        
        // 存储到本地
        localStorage.setItem('authToken', authToken);
        localStorage.setItem('authUser', JSON.stringify(userData));
      }
      
      return mockResponse;
    } catch (error) {
      console.error('Registration error:', error);
      return {
        success: false,
        error: '注册失败，请稍后再试'
      };
    } finally {
      setIsLoading(false);
    }
  };

  // 登出功能
  const logout = () => {
    setUser(null);
    setToken(null);
    
    // 清除本地存储
    localStorage.removeItem('authToken');
    localStorage.removeItem('authUser');
  };

  // 密码重置请求
  const resetPassword = async (email: string): Promise<boolean> => {
    try {
      // 实际项目中这里应该是API调用
      // const response = await fetch('/api/auth/reset-password', {...})
      
      // 模拟成功请求
      return true;
    } catch (error) {
      console.error('Password reset request error:', error);
      return false;
    }
  };

  // 确认密码重置
  const confirmPasswordReset = async (token: string, password: string): Promise<boolean> => {
    try {
      // 实际项目中这里应该是API调用
      // const response = await fetch('/api/auth/confirm-reset', {...})
      
      // 模拟成功重置
      return true;
    } catch (error) {
      console.error('Confirm password reset error:', error);
      return false;
    }
  };

  // 更新用户资料
  const updateProfile = async (profileData: any): Promise<boolean> => {
    try {
      // 实际项目中这里应该是API调用
      // const response = await fetch('/api/user/profile', {...})
      
      // 模拟成功更新
      if (user) {
        const updatedUser = {
          ...user,
          profile: {
            ...user.profile,
            ...profileData
          }
        };
        
        setUser(updatedUser);
        localStorage.setItem('authUser', JSON.stringify(updatedUser));
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Update profile error:', error);
      return false;
    }
  };

  // 提供上下文值
  const contextValue: AuthContextType = {
    user,
    token,
    isLoading,
    isAuthenticated: !!user && !!token,
    login,
    register,
    logout,
    resetPassword,
    confirmPasswordReset,
    updateProfile,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext; 