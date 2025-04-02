import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '@/context/auth/AuthContext';

interface AuthGuardProps {
  children: React.ReactNode;
  fallbackUrl?: string;
  requireAdmin?: boolean;
}

/**
 * 认证守卫组件
 * 保护需要登录才能访问的页面，如果用户未认证则重定向到登录页面
 */
const AuthGuard: React.FC<AuthGuardProps> = ({ 
  children, 
  fallbackUrl = '/auth/login', 
  requireAdmin = false 
}) => {
  const { user, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    // 等待认证状态加载完成
    if (!isLoading) {
      // 如果用户未认证，则重定向到登录页面
      if (!isAuthenticated) {
        router.push({
          pathname: fallbackUrl,
          query: { returnUrl: router.asPath },
        });
      } 
      // 如果需要管理员权限，但用户不是管理员，则重定向到首页
      else if (requireAdmin && user?.role !== 'admin') {
        router.push('/');
      } 
      // 通过认证检查
      else {
        setIsChecking(false);
      }
    }
  }, [isAuthenticated, isLoading, router, fallbackUrl, requireAdmin, user]);

  // 在检查认证状态时，显示加载中
  if (isLoading || isChecking) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // 通过认证检查，显示子组件
  return <>{children}</>;
};

export default AuthGuard; 