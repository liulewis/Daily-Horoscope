import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface FortuneDisplayProps {
  fortune: {
    date: string;
    weekday: string;
    lunarDate: string;
    suitable: string[];
    avoid: string[];
    luckyColor: string;
    luckyItem: string;
    luckyWord: string;
  };
  refreshFortune: () => void;
}

export default function FortuneDisplay({ fortune, refreshFortune }: FortuneDisplayProps) {
  // 格式化运势为文本格式
  const formatFortuneText = () => {
    return `日运播报：${fortune.date}，${fortune.weekday}，农历${fortune.lunarDate}。
宜${fortune.suitable.join('，宜')}。
忌${fortune.avoid.join('，忌')}。
今日幸运色：${fortune.luckyColor}
今日幸运随身物：${fortune.luckyItem}
今日幸运词：${fortune.luckyWord}`;
  };

  // 复制文本到剪贴板
  const handleCopy = async () => {
    try {
      const text = formatFortuneText();
      await navigator.clipboard.writeText(text);
      toast.success('运势文本已复制到剪贴板！');
    } catch (err) {
      toast.error('复制失败，请手动复制');
      console.error('复制失败:', err);
    }
  };
  // 提取幸运色用于样式
  const luckyColors = fortune.luckyColor.split(' ');
  
  return (
    <motion.div 
      className="w-full max-w-md mx-auto bg-white rounded-2xl shadow-xl overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
  {/* 头部区域 */}
   <div className="relative bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6 rounded-t-2xl shadow-lg overflow-hidden">
     {/* 装饰元素 */}
     <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full filter blur-3xl -mr-20 -mt-20"></div>
     <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full filter blur-2xl -ml-10 -mb-10"></div>
    <div className="flex justify-between items-start mb-2">
      <h1 className="text-2xl font-bold">日运播报</h1>
       <div className="flex gap-2">
         <button 
           onClick={handleCopy}
           className="bg-white/20 hover:bg-white/30 transition-all duration-300 px-4 py-2 rounded-full text-sm flex items-center backdrop-blur-sm shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
         >
           <i className="fa-solid fa-copy mr-1.5"></i> 复制文本
         </button>
         <button 
           onClick={() => {
             refreshFortune();
             toast.success('运势内容已刷新！');
           }}
           className="bg-white/20 hover:bg-white/30 transition-all duration-300 px-4 py-2 rounded-full text-sm flex items-center backdrop-blur-sm shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
         >
           <i className="fa-solid fa-refresh mr-1.5"></i> 刷新
         </button>
       </div>
    </div>
    <div className="text-center space-y-1">
      <p className="text-lg">{fortune.date}</p>
      <p>{fortune.weekday}，农历{fortune.lunarDate}</p>
    </div>
  </div>
      
      {/* 内容区域 */}
      <div className="p-6 space-y-6">
        {/* 宜做事项 */}
        <div className="space-y-2">
          <h2 className="text-lg font-semibold text-green-600 flex items-center">
            <i className="fa-solid fa-check-circle mr-2"></i>宜
          </h2>
           <div className="grid grid-cols-2 gap-3">
             {fortune.suitable.map((item, index) => (
               <motion.div 
                 key={index}
                 className="bg-green-50 p-4 rounded-xl text-green-800 text-sm shadow-sm hover:shadow-md transition-all duration-300 border border-green-100"
                 whileHover={{ scale: 1.03, y: -2 }}
                 initial={{ opacity: 0, y: 10 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ delay: index * 0.05 }}
               >
                 <div className="flex items-center">
                   <i className="fa-solid fa-check-circle text-green-500 mr-2"></i>
                   {item}
                 </div>
               </motion.div>
             ))}
           </div>
        </div>
        
        {/* 忌做事项 */}
        <div className="space-y-2">
          <h2 className="text-lg font-semibold text-red-600 flex items-center">
            <i className="fa-solid fa-times-circle mr-2"></i>忌
          </h2>
           <div className="grid grid-cols-2 gap-3">
             {fortune.avoid.map((item, index) => (
               <motion.div 
                 key={index}
                 className="bg-red-50 p-4 rounded-xl text-red-800 text-sm shadow-sm hover:shadow-md transition-all duration-300 border border-red-100"
                 whileHover={{ scale: 1.03, y: -2 }}
                 initial={{ opacity: 0, y: 10 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ delay: index * 0.05 }}
               >
                 <div className="flex items-center">
                   <i className="fa-solid fa-times-circle text-red-500 mr-2"></i>
                   {item}
                 </div>
               </motion.div>
             ))}
           </div>
        </div>
        
        {/* 幸运元素 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* 幸运色 */}
           <motion.div 
             className="bg-white p-5 rounded-2xl text-center shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100"
             whileHover={{ y: -5, scale: 1.02 }}
             initial={{ opacity: 0, y: 10 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.3 }}
           >
             <div className="w-14 h-14 mx-auto mb-3 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
               <i className="fa-solid fa-palette text-2xl text-gray-600"></i>
             </div>
             <h3 className="text-sm font-medium text-gray-500 mb-1">今日幸运色</h3>
             <p className="font-semibold mb-3">{fortune.luckyColor}</p>
             
             {/* 幸运色展示 */}
             <div className="mt-2 flex justify-center space-x-2">
               {luckyColors.map((color, index) => (
                 <div 
                   key={index}
                   className="w-8 h-8 rounded-full shadow-md transform transition-transform hover:scale-110 border-2 border-white"
                   style={{ 
                     backgroundColor: getColorValue(color)
                   }}
                   title={color}
                 ></div>
               ))}
             </div>
           </motion.div>
          
          {/* 幸运随身物 */}
           <motion.div 
             className="bg-white p-5 rounded-2xl text-center shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100"
             whileHover={{ y: -5, scale: 1.02 }}
             initial={{ opacity: 0, y: 10 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.3, delay: 0.1 }}
           >
             <div className="w-14 h-14 mx-auto mb-3 rounded-full bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center">
               <i className="fa-solid fa-gift text-2xl text-blue-600"></i>
             </div>
             <h3 className="text-sm font-medium text-gray-500 mb-1">今日幸运随身物</h3>
             <p className="font-semibold text-lg">{fortune.luckyItem}</p>
             <div className="mt-2 h-1 w-12 bg-blue-100 rounded-full mx-auto"></div>
           </motion.div>
          
          {/* 幸运词 */}
           <motion.div 
             className="bg-white p-5 rounded-2xl text-center shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100"
             whileHover={{ y: -5, scale: 1.02 }}
             initial={{ opacity: 0, y: 10 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.3, delay: 0.2 }}
           >
             <div className="w-14 h-14 mx-auto mb-3 rounded-full bg-gradient-to-br from-purple-50 to-purple-100 flex items-center justify-center">
               <i className="fa-solid fa-comment text-2xl text-purple-600"></i>
             </div>
             <h3 className="text-sm font-medium text-gray-500 mb-1">今日幸运词</h3>
             <div className="my-2">
               <span className="inline-block bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 font-bold text-xl px-4 py-2 rounded-full shadow-sm transform transition-transform hover:scale-105">
                 {fortune.luckyWord}
               </span>
             </div>
           </motion.div>
        </div>
      </div>
      
      {/* 页脚 */}
       <div className="bg-gray-50 py-4 px-6 text-center text-sm text-gray-500 rounded-b-2xl border-t border-gray-100">
         <p className="flex items-center justify-center space-x-1">
           <i className="fa-regular fa-star text-yellow-400"></i>
           每日更新，仅供娱乐
           <i className="fa-regular fa-star text-yellow-400"></i>
         </p>
       </div>
    </motion.div>
  );
}

// 辅助函数：将颜色名称转换为实际颜色值
function getColorValue(colorName: string): string {
  const colorMap: Record<string, string> = {
    "红色": "#ff4444",
    "蓝色": "#3498db",
    "灰色": "#95a5a6",
    "绿色": "#2ecc71",
    "黄色": "#f1c40f",
    "紫色": "#9b59b6",
    "粉色": "#ff69b4",
    "橙色": "#e67e22",
    "黑色": "#333333",
    "白色": "#ffffff",
    "棕色": "#8e44ad",
    "金色": "#f39c12",
    "银色": "#bdc3c7",
    "青色": "#1abc9c",
    "靛蓝色": "#34495e"
  };
  
  return colorMap[colorName] || "#95a5a6"; // 默认灰色
}