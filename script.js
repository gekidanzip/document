document.addEventListener('DOMContentLoaded', () => {
    // 1. システム時刻の表示
    const updateTime = () => {
        const el = document.getElementById('access-date');
        if (el) el.textContent = new Date().toLocaleString('ja-JP');
    };
    setInterval(updateTime, 1000);
    updateTime();

    // 2. マップ切り替えギミック
    const mapBtns = document.querySelectorAll('.map-btn');
    const mapDisplay = document.getElementById('map-display');
    const mapImages = document.querySelectorAll('.map-image');

    mapBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            if (this.classList.contains('active')) return;

            // ボタンの見た目を変更
            mapBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            // ノイズ演出を開始
            mapDisplay.classList.add('switching');

            const targetId = this.getAttribute('data-map');

            // 0.4秒後に画像を切り替え、ノイズを消す
            setTimeout(() => {
                mapImages.forEach(img => {
                    img.style.display = 'none';
                    img.classList.remove('active');
                });
                const targetImg = document.getElementById(targetId);
                targetImg.style.display = 'block';
                targetImg.classList.add('active');
                
                mapDisplay.classList.remove('switching');
                console.log(`>> AREA_VIEW_SWITCH: ${targetId} CONNECTED.`);
            }, 400);
        });
    });

    // 3. 黒塗り解除 (Redacted)
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

    // 4. 正体判明ギミック (吉武更紗 -> 髙寄彩葉)
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

    console.log("--- ARCHIVE SYSTEM RECOVERY COMPLETE ---");
});
