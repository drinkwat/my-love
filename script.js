// 配置项
const CONFIG = {
    START_DATE: '2024-04-05', // 纪念日
    NEXT_MEET_DATE: '2025-2-14', // 下次见面日
    QUOTES: [ // 浪漫语录
        '" 你在时，你是世界；你不在时，世界是你 "',
        '" 我们的时间以心跳为单位计量 "',
        '" 宇宙从不失约任何秘密悸动 "',
        '" 爱你，是写进我基因的程序 "'
    ],
    PHOTOS: [ // 合照列表
        'images/photo1.jpg',
        'images/photo2.jpg',
        'images/photo3.jpg'
    ]
};

// 初始化
document.addEventListener('DOMContentLoaded', () => {
    // 自动播放背景音乐（需要用户交互后生效）
    document.addEventListener('click', () => {
        const bgm = document.getElementById('bgm');
        bgm.play().catch(() => {});
    });

    // 初始化语录
    const quoteEl = document.querySelector('.quote');
    let quoteIndex = 0;
    setInterval(() => {
        quoteEl.style.opacity = 0;
        setTimeout(() => {
            quoteIndex = (quoteIndex + 1) % CONFIG.QUOTES.length;
            quoteEl.textContent = CONFIG.QUOTES[quoteIndex];
            quoteEl.style.opacity = 1;
        }, 1000);
    }, 10000);

    // 生成心形气球
    setInterval(createHeartBalloon, 3000);

    // 点击爱心特效
    document.addEventListener('click', createClickHeart);

    // 倒计时逻辑
    setInterval(updateCountdown, 1000);
    updateCountdown();

    // 合照点击放大
    const photoBg = document.querySelector('.photo-background');
    photoBg.addEventListener('click', () => {
        photoBg.classList.toggle('zoomed');
    });
});

// 功能函数
function createHeartBalloon() {
    const heart = document.createElement('div');
    heart.className = 'heart-balloon';
    heart.innerHTML = '❤';
    heart.style.left = Math.random() * 95 + '%';
    heart.style.animationDuration = 5 + Math.random() * 5 + 's';
    document.querySelector('.hearts').appendChild(heart);
    setTimeout(() => heart.remove(), 8000);
}

function createClickHeart(e) {
    const heart = document.createElement('div');
    heart.className = 'click-heart';
    heart.style.left = e.clientX + 'px';
    heart.style.top = e.clientY + 'px';
    heart.innerHTML = '❤';
    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 1000);
}

function updateCountdown() {
    const now = new Date();
    const start = new Date(CONFIG.START_DATE);
    const meet = new Date(CONFIG.NEXT_MEET_DATE);

    // 计算天数
    const togetherDays = Math.floor((now - start) / 86400000);
    document.getElementById('togetherDays').textContent = togetherDays;

    // 计算倒计时
    const diff = meet - now;
    if (diff < 0) return;

    const days = Math.floor(diff / 86400000);
    const hours = Math.floor((diff % 86400000) / 3600000);
    const minutes = Math.floor((diff % 3600000) / 60000);
    const seconds = Math.floor((diff % 60000) / 1000);

    document.getElementById('days').textContent = days.toString().padStart(2, '0');
    document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
    document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
    document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
}