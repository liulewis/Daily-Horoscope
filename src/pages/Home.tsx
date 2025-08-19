import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { useDailyFortune } from '@/hooks/useDailyFortune';
import FortuneDisplay from '@/components/FortuneDisplay';
import { cn } from '@/lib/utils';

export default function Home() {
  const { fortune, isLoading, refreshFortune } = useDailyFortune();
  
  // 生成渐变背景颜色
  const getRandomGradient = () => {
    const gradients = [
      'from-blue-50 via-indigo-50 to-purple-50',
      'from-pink-50 via-rose-50 to-red-50',
      'from-green-50 via-teal-50 to-cyan-50',
      'from-yellow-50 via-amber-50 to-orange-50',
      'from-gray-50 via-slate-50 to-blue-50',
      'from-purple-50 via-pink-50 to-red-50',
      'from-teal-50 via-emerald-50 to-green-50'
    ];
    return gradients[Math.floor(Math.random() * gradients.length)];
  };

  // 添加粒子背景效果
  useEffect(() => {
    const canvas = document.createElement('canvas');
    const container = document.querySelector('.gradient-container');
    
    if (container) {
      canvas.classList.add('absolute', 'inset-0', 'w-full', 'h-full', 'pointer-events-none');
      container.appendChild(canvas);
      
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      
      let width = window.innerWidth;
      let height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      
      const particles: {x: number, y: number, size: number, speedX: number, speedY: number, color: string}[] = [];
      const particleCount = Math.floor((width * height) / 15000);
      
      // 创建粒子
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size: Math.random() * 3 + 1,
          speedX: (Math.random() - 0.5) * 0.5,
          speedY: (Math.random() - 0.5) * 0.5,
          color: `rgba(${Math.random() * 100 + 50}, ${Math.random() * 100 + 150}, ${Math.random() * 255}, ${Math.random() * 0.5 + 0.1})`
        });
      }
      
      // 动画循环
      const animate = () => {
        ctx.clearRect(0, 0, width, height);
        
        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          
          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
          
          // 更新粒子位置
          p.x += p.speedX;
          p.y += p.speedY;
          
          // 边界检测
          if (p.x > width) p.x = 0;
          if (p.x < 0) p.x = width;
          if (p.y > height) p.y = 0;
          if (p.y < 0) p.y = height;
        }
        
        requestAnimationFrame(animate);
      };
      
      animate();
      
      // 窗口大小变化时重新调整
      const handleResize = () => {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
      };
      
      window.addEventListener('resize', handleResize);
      
      // 清理函数
      return () => {
        window.removeEventListener('resize', handleResize);
        container.removeChild(canvas);
      };
    }
  }, []);
  
   return (
    <div className={cn(
      'min-h-screen flex items-center justify-center p-4 relative overflow-hidden gradient-container',
      getRandomGradient()
    )}>
      {isLoading ? (
        <motion.div 
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
           <div className="text-center p-8 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg">
             <div className="w-20 h-20 border-4 border-blue-100 border-t-blue-500 rounded-full animate-spin mx-auto mb-6"></div>
             <h3 className="text-xl font-semibold text-gray-700 mb-2">正在生成今日运势...</h3>
             <p className="text-gray-500 max-w-xs mx-auto">
               宇宙正在为您计算今日最佳运势，请稍候...
             </p>
           </div>
         </motion.div>
      ) : fortune ? (
        <FortuneDisplay fortune={fortune} refreshFortune={refreshFortune} />
      ) : (
        <div className="text-center text-red-500">
          <i className="fa-solid fa-exclamation-circle text-2xl mb-2"></i>
          <p>无法加载今日运势，请稍后重试</p>
        </div>
      )}
    </div>
  );
}
import { useEffect } from 'react';