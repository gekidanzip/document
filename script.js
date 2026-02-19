document.addEventListener('DOMContentLoaded', () => {
    /**
     * 1. システム時刻のリアルタイム更新
     * 画面上部のアクセスログ等に使用
     */
    const updateTime = () => {
        const el = document.getElementById('access-date');
        if (el) {
            const now = new Date();
            // 日本のタイムゾーンで表示
            el.textContent = now.toLocaleString('ja-JP');
        }
    };
    setInterval(updateTime, 1000);
    updateTime();

    /**
     * 2. マップ切り替えギミック（サイバー・グリッチ版）
     * 信号途絶演出を挟んでフロアマップを切り替える
     */
    const mapBtns = document.querySelectorAll('.map-btn');
    const mapDisplay = document.getElementById('map-display');
    const mapImages = document.querySelectorAll('.map-image');

    mapBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // すでに選択されている場合は何もしない
            if (this.classList.contains('active')) return;

            // ボタンの活性状態を切り替え
            mapBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            // 激しいグリッチ演出（SIGNAL LOST）を開始
            mapDisplay.classList.add('switching');

            const targetId = this.getAttribute('data-map');

            // 0.8秒間のノイズ演出の後に画像を差し替える
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
                
                // ノイズ演出を終了
                mapDisplay.classList.remove('switching');
                console.log(`>> SYSTEM: Monitor switched to ${targetId}. Connection stable.`);
            }, 800); // サイバー感を出すため少し長めに設定
        });
    });

    /**
     * 3. 黒塗り（Redacted）解除ギミック
     * タップすると「DECRYPTING...」と表示された後、中身が露呈する
     */
    const redactedItems = document.querySelectorAll('.redacted');
    redactedItems.forEach(item => {
        item.addEventListener('click', function() {
            if (this.classList.contains('active')) return;

            // 解読中アニメーション
            this.setAttribute('data-text', "DECRYPTING...");
            
            setTimeout(() => {
                this.classList.add('active');
                console.log(">> ARCHIVE: Encrypted data fragment restored.");
            }, 600);
        });
    });

    /**
     * 4. 正体判明ギミック（Identity Reveal）
     * 吉武更紗をタップすると、激しいバグの後に「髙寄 彩葉」へ書き換わる
     */
    const identitySpans = document.querySelectorAll('.identity-reveal');
    identitySpans.forEach(span => {
        span.addEventListener('click', function() {
            // すでに判明済み、または処理中の場合は無視
            if (this.classList.contains('revealed') || this.classList.contains('processing')) return;

            const trueName = this.getAttribute('data-true-name');
            
            // 強制書き換え（バグ）演出を開始
            this.classList.add('processing');
            console.warn(">> ALERT: Database inconsistency detected. Forced overwrite...");

            // 0.8秒間バグらせた後に、真実の名前を上書き
            setTimeout(() => {
                this.classList.remove('processing');
                this.textContent = trueName;
                this.classList.add('revealed');
                console.log(">> SUCCESS: Subject identity confirmed as " + trueName);
            }, 800);
        });
    });

    console.log("--- GEKIDAN.zip IMMERSIVE PROJECT: SECURE ARCHIVE LOADED ---");
    console.log(">> STATUS: ALL NODES OPERATIONAL.");
});

