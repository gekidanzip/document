document.addEventListener('DOMContentLoaded', () => {
    // 1. ローディング演出の制御
    const loadingScreen = document.getElementById('loading-screen');
    const progressBar = document.querySelector('.progress-bar');
    const loadingText = document.getElementById('loading-text');
    
    // 表示させるテキストのリスト
    const statusMessages = ["CONNECTING", "AUTHORIZING", "DECRYPTING", "READY"];
    let step = 0;

    // バーを段階的に伸ばすシミュレーション
    const loadingInterval = setInterval(() => {
        step++;
        const progress = (step / statusMessages.length) * 100;
        progressBar.style.width = `${progress}%`;
        loadingText.textContent = statusMessages[step - 1];

        if (step >= statusMessages.length) {
            clearInterval(loadingInterval);
            // 完了後、少し間を置いてから画面を隠す
            setTimeout(() => {
                loadingScreen.classList.add('loaded');
            }, 500);
        }
    }, 600); // 段階ごとの速度

    // 2. システム時刻の更新表示
    const updateTime = () => {
        const el = document.getElementById('access-date');
        if (el) el.textContent = new Date().toLocaleString('ja-JP');
    };
    setInterval(updateTime, 1000);
    updateTime();

    // 3. マップ切り替えギミック
    const mapBtns = document.querySelectorAll('.map-btn');
    const mapDisplay = document.getElementById('map-display');
    const mapImages = document.querySelectorAll('.map-image');

    mapBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            if (this.classList.contains('active')) return;

            mapBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            mapDisplay.classList.add('switching');
            const targetId = this.getAttribute('data-map');

            setTimeout(() => {
                mapImages.forEach(img => {
                    img.style.display = 'none';
                    img.classList.remove('active');
                });
                const targetImg = document.getElementById(targetId);
                if (targetImg) {
                    targetImg.style.display = 'block';
                    targetImg.classList.add('active');
                }
                mapDisplay.classList.remove('switching');
            }, 800);
        });
    });

    // 4. 黒塗り解除 (Redacted)
    const redactedItems = document.querySelectorAll('.redacted');
    redactedItems.forEach(item => {
        item.addEventListener('click', function() {
            if (this.classList.contains('active')) return;
            this.setAttribute('data-text', "DECRYPTING...");
            setTimeout(() => {
                this.classList.add('active');
            }, 600);
        });
    });

    // 5. 正体判明ギミック (吉武更紗 -> 髙寄彩葉)
    const identitySpans = document.querySelectorAll('.identity-reveal');
    identitySpans.forEach(span => {
        span.addEventListener('click', function() {
            if (this.classList.contains('revealed') || this.classList.contains('processing')) return;
            const trueName = this.getAttribute('data-true-name');
            this.classList.add('processing');
            setTimeout(() => {
                this.classList.remove('processing');
                this.textContent = trueName;
                this.classList.add('revealed');
            }, 800);
        });
    });
});
