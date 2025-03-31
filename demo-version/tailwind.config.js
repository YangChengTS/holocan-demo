/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#366cbb',       // 主色: 蓝色
        secondary: '#ac2317',     // 辅助色: 红色
        accent: '#2b2d42',        // 强调色: 深色
        background: {
          dark: '#f0f2f5',        // 更深一点的浅色背景
          light: '#ffffff'        // 白色背景
        },
        text: {
          primary: '#1a202c',     // 主要文本色（更深的深灰色）
          secondary: '#374151',   // 次要文本色（更深的中灰色）
          dark: '#111827'         // 最深色文本
        },
        button: {
          primary: '#366cbb',
          hover: '#2a539e',
          secondary: '#ac2317',
          accent: '#fca311'
        },
        border: '#e2e8f0',        // 浅色边框
        card: '#ffffff',          // 白色卡片背景
        overlay: 'rgba(255, 255, 255, 0.9)' // 浅色覆盖层
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Poppins', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif']
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-pattern': 'linear-gradient(to bottom, rgba(255, 255, 255, 0.8), rgba(248, 249, 250, 0.9))',
        'feature-gradient': 'linear-gradient(to bottom right, rgba(54, 108, 187, 0.1), rgba(172, 35, 23, 0.05))',
        'button-gradient': 'linear-gradient(to right, #366cbb, #2a539e)',
        'button-gradient-hover': 'linear-gradient(to right, #2a539e, #1e3b76)'
      },
      boxShadow: {
        'card': '0 4px 20px rgba(0, 0, 0, 0.1)',
        'nav': '0 2px 10px rgba(0, 0, 0, 0.05)',
        'button': '0 4px 14px rgba(54, 108, 187, 0.2)'
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in-up': 'fadeInUp 0.7s ease-out forwards'
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        }
      },
      gridTemplateColumns: {
        'feature': 'repeat(auto-fit, minmax(300px, 1fr))'
      }
    },
  },
  plugins: [],
} 