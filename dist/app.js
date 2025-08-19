// 运势数据
const fortuneData = {
  suitableActivities: [
    "和稀泥", "下班就溜", "打折早餐", "面试顺利", "蛙泳",
    "整理房间", "多喝水", "微笑待人", "听轻音乐", "阅读",
    "分享美食", "写日记", "散步", "冥想", "主动沟通",
    "尝试新事物", "整理邮件", "帮助他人", "早睡早起", "储蓄",
    "晒太阳", "整理桌面", "深呼吸", "看喜剧", "赞美他人"
  ],
  avoidActivities: [
    "马虎大意", "纠结", "没话找话", "讲个不停", "不学习",
    "熬夜", "暴饮暴食", "负面思考", "拖延", "冲动消费",
    "久坐不动", "过度使用手机", "背后议论", "迟到", "打断别人",
    "过度承诺", "忽视健康", "抱怨", "固执己见", "浪费食物",
    "逃避问题", "追求完美", "记仇", "沉迷游戏", "不喝水"
  ],
  luckyColors: [
    "红色", "蓝色", "灰色", "绿色", "黄色", "紫色", "粉色", "橙色",
    "黑色", "白色", "棕色", "金色", "银色", "青色", "靛蓝色"
  ],
  luckyItems: [
    "小风扇", "钥匙扣", "笔记本", "钢笔", "耳机", "钱包", "手帕",
    "书签", "保温杯", "墨镜", "帽子", "手链", "手表", "背包",
    "雨伞", "唇膏", "发夹", "零钱袋", "香水", "梳子", "镜子"
  ],
  luckyWords: [
    "唉", "加油", "淡定", "微笑", "坚持", "放松", "好运",
    "顺利", "成功", "开心", "平和", "努力", "相信", "感恩",
    "珍惜", "机会", "梦想", "希望", "勇气", "智慧", "耐心"
  ]
};

// 工具函数
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function getRandomItems(array, count) {
  const shuffled = [...array].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

function getLunarDate() {
  const lunarMonths = ["正月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "冬月", "腊月"];
  const lunarDays = ["初一", "初二", "初三", "初四", "初五", "初六", "初七", "初八", "初九", "初十", 
                    "十一", "十二", "十三", "十四", "十五", "十六", "十七", "十八", "十九", "二十",
                    "廿一", "廿二", "廿三", "廿四", "廿五", "廿六", "廿七", "廿八", "廿九", "三十"];
  return `${lunarMonths[getRandomInt(12)]}${lunarDays[getRandomInt(30)]}`;
}

function getColorValue(colorName) {
  const colorMap = {
    "红色": "#ff4444", "蓝色": "#3498db", "灰色": "#95a5a6", "绿色": "#2ecc71",
    "黄色": "#f1c40f", "紫色": "#9b59b6", "粉色": "#ff69b4", "橙色": "#e67e22",
    "黑色": "#333333", "白色": "#ffffff", "棕色": "#8e44ad", "金色": "#f39c12",
    "银色": "#bdc3c7", "青色": "#1abc9c", "靛蓝色": "#34495e"
  };
  return colorMap[colorName] || "#95a5a6";
}

// 生成运势
function generateFortune() {
  const today = new Date();
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
    generatedDate: today.toISOString().split('T')[0]
  };
}

// 渲染运势
function renderFortune(fortune) {
  document.getElementById('current-date').textContent = fortune.date;
  document.getElementById('current-weekday').textContent = `${fortune.weekday}，农历${fortune.lunarDate}`;
  
  // 渲染宜做事项
  const suitableContainer = document.getElementById('suitable-items');
  suitableContainer.innerHTML = fortune.suitable.map(item => `
    <div class="bg-green-50 p-4 rounded-xl text-green-800 text-sm shadow-sm hover:shadow-md transition-all duration-300 border border-green-100">
      <div class="flex items-center">
        <i class="fa-solid fa-check-circle text-green-500 mr-2"></i>
        ${item}
      </div>
    </div>
  `).join('');

  // 渲染忌做事项
  const avoidContainer = document.getElementById('avoid-items');
  avoidContainer.innerHTML = fortune.avoid.map(item => `
    <div class="bg-red-50 p-4 rounded-xl text-red-800 text-sm shadow-sm hover:shadow-md transition-all duration-300 border border-red-100">
      <div class="flex items-center">
        <i class="fa-solid fa-times-circle text-red-500 mr-2"></i>
        ${item}
      </div>
    </div>
  `).join('');

  // 渲染幸运元素
  document.getElementById('lucky-color').textContent = fortune.luckyColor;
  document.getElementById('lucky-item').textContent = fortune.luckyItem;
  document.getElementById('lucky-word').textContent = fortune.luckyWord;

  // 渲染颜色展示
  const colorDisplay = document.getElementById('color-display');
  const colors = fortune.luckyColor.split(' ');
  colorDisplay.innerHTML = colors.map(color => `
    <div class="w-8 h-8 rounded-full shadow-md transform transition-transform hover:scale-110 border-2 border-white"
         style="background-color: ${getColorValue(color)}"
         title="${color}"></div>
  `).join('');
}

// 复制功能
function copyFortune() {
  const fortune = getCurrentFortune();
  const text = `日运播报：${fortune.date}，${fortune.weekday}，农历${fortune.lunarDate}。
宜${fortune.suitable.join('，宜')}。
忌${fortune.avoid.join('，忌')}。
今日幸运色：${fortune.luckyColor}
今日幸运随身物：${fortune.luckyItem}
今日幸运词：${fortune.luckyWord}`;

  if (navigator.clipboard) {
    navigator.clipboard.writeText(text).then(() => {
      showToast('运势文本已复制到剪贴板！');
    }).catch(() => {
      showToast('复制失败，请手动复制');
    });
  } else {
    showToast('浏览器不支持复制功能');
  }
}

// 刷新运势
function refreshFortune() {
  const newFortune = generateFortune();
  if (typeof(Storage) !== "undefined") {
    localStorage.setItem('dailyFortune', JSON.stringify(newFortune));
  }
  renderFortune(newFortune);
  showToast('运势内容已刷新！');
}

// 获取当前运势
function getCurrentFortune() {
  if (typeof(Storage) !== "undefined") {
    const saved = localStorage.getItem('dailyFortune');
    if (saved) {
      return JSON.parse(saved);
    }
  }
  return generateFortune();
}

// 显示提示
function showToast(message) {
  const toast = document.createElement('div');
  toast.className = 'fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50 transform transition-all duration-300';
  toast.textContent = message;
  document.body.appendChild(toast);
  
  setTimeout(() => {
    toast.style.transform = 'translateX(100%)';
    setTimeout(() => {
      document.body.removeChild(toast);
    }, 300);
  }, 2000);
}

// 初始化
function init() {
  let fortune;
  
  if (typeof(Storage) !== "undefined") {
    const saved = localStorage.getItem('dailyFortune');
    if (saved) {
      const parsedFortune = JSON.parse(saved);
      const today = new Date().toISOString().split('T')[0];
      
      if (parsedFortune.generatedDate === today) {
        fortune = parsedFortune;
      } else {
        fortune = generateFortune();
        localStorage.setItem('dailyFortune', JSON.stringify(fortune));
      }
    } else {
      fortune = generateFortune();
      localStorage.setItem('dailyFortune', JSON.stringify(fortune));
    }
  } else {
    fortune = generateFortune();
  }
  
  renderFortune(fortune);
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', init);