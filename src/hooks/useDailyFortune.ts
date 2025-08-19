import { useEffect, useState } from 'react';
import { fortuneData } from '@/lib/fortuneData';

// 定义运势数据类型
interface Fortune {
  date: string;
  weekday: string;
  lunarDate: string;
  suitable: string[];
  avoid: string[];
  luckyColor: string;
  luckyItem: string;
  luckyWord: string;
  generatedDate: string;
}

// 随机数生成函数
const getRandomInt = (max: number) => {
  return Math.floor(Math.random() * max);
};

// 从数组中随机选择n个不重复元素
const getRandomItems = <T>(array: T[], count: number): T[] => {
  const shuffled = [...array].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

// 获取农历日期的简单模拟函数
const getLunarDate = () => {
  // 实际应用中应该使用农历转换库，这里简化处理
  const lunarMonths = ["正月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "冬月", "腊月"];
  const lunarDays = ["初一", "初二", "初三", "初四", "初五", "初六", "初七", "初八", "初九", "初十", 
                    "十一", "十二", "十三", "十四", "十五", "十六", "十七", "十八", "十九", "二十",
                    "廿一", "廿二", "廿三", "廿四", "廿五", "廿六", "廿七", "廿八", "廿九", "三十"];
  
  return `${lunarMonths[getRandomInt(12)]}${lunarDays[getRandomInt(30)]}`;
};

export function useDailyFortune() {
  const [fortune, setFortune] = useState<Fortune | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // 生成新运势的函数
  const generateNewFortune = (): Fortune => {
    const today = new Date();
    const dateStr = today.toISOString().split('T')[0]; // 格式: YYYY-MM-DD
    const weekdays = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
    
    return {
      date: today.toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' }),
      weekday: weekdays[today.getDay()],
      lunarDate: getLunarDate(),
      suitable: getRandomItems(fortuneData.suitableActivities, 5),
      avoid: getRandomItems(fortuneData.avoidActivities, 5),
      luckyColor: fortuneData.luckyColors[getRandomInt(fortuneData.luckyColors.length)],
      luckyItem: fortuneData.luckyItems[getRandomInt(fortuneData.luckyItems.length)],
      luckyWord: fortuneData.luckyWords[getRandomInt(fortuneData.luckyWords.length)],
      generatedDate: dateStr
    };
  };

  // 刷新运势的函数
   const refreshFortune = () => {
     setIsLoading(true);
     // 添加短暂延迟以展示动画效果
     setTimeout(() => {
       const newFortune = generateNewFortune();
       // 确保在客户端环境中使用 localStorage
       if (typeof window !== 'undefined') {
         localStorage.setItem('dailyFortune', JSON.stringify(newFortune));
       }
       setFortune(newFortune);
       setIsLoading(false);
     }, 600); // 600ms延迟，足够展示过渡动画
   };

  useEffect(() => {
    // 确保在客户端环境中执行
    if (typeof window === 'undefined') {
      return;
    }
    
    // 从localStorage获取保存的运势
    const savedFortune = localStorage.getItem('dailyFortune');
    if (savedFortune) {
      const parsedFortune: Fortune = JSON.parse(savedFortune);
      const today = new Date().toISOString().split('T')[0];
      
      // 检查是否是同一天
      if (parsedFortune.generatedDate === today) {
        setFortune(parsedFortune);
        setIsLoading(false);
        return;
      }
    }
    
    // 生成新的运势
    refreshFortune();
  }, []);

  return { fortune, isLoading, refreshFortune };
}