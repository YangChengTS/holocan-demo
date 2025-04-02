import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function LoginRedirect() {
  const router = useRouter();
  
  useEffect(() => {
    // 获取当前URL的查询参数
    const query = router.query;
    
    // 构建新的URL，保留原始查询参数
    const queryString = Object.keys(query)
      .map(key => `${key}=${encodeURIComponent(query[key] as string)}`)
      .join('&');
      
    const destination = `/auth/login${queryString ? `?${queryString}` : ''}`;
    
    // 执行重定向
    router.replace(destination);
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <p className="text-gray-600">重定向到登录页面...</p>
        <a href="/auth/login" className="text-blue-500 hover:underline">
          点击此处如果没有自动跳转
        </a>
      </div>
    </div>
  );
} 