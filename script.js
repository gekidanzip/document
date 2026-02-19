document.addEventListener('DOMContentLoaded', () => {
    // アクセス時刻のリアルタイム表示
    const updateTime = () => {
        const now = new Date();
        document.getElementById('access-date').textContent = now.toLocaleString();
    };
    setInterval(updateTime, 1000);
    updateTime();

    // 解読（黒塗り解除）の処理
    const redactedItems = document.querySelectorAll('.redacted');
    
    redactedItems.forEach(item => {
        item.addEventListener('click', function() {
            if (this.classList.contains('active')) return;

            // タップ音の代わりの演出：一瞬テキストを変える
            const originalText = this.getAttribute('data-text');
            this.setAttribute('data-text', "DECRYPTING...");
            
            setTimeout(() => {
                this.classList.add('active');
                // 完了後に少し「ノイズ」が入ったようなコンソールログを出す
                console.log(">> CRITICAL DATA RESTORED.");
            }, 600); // 0.6秒の「タメ」を作る
        });
    });
});