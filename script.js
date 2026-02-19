document.addEventListener('DOMContentLoaded', () => {
    // 1. システム時刻の表示
    const updateTime = () => {
        const el = document.getElementById('access-date');
        if (el) el.textContent = new Date().toLocaleString('ja-JP');
    };
    setInterval(updateTime, 1000);
    updateTime();

    // 2. 黒塗り解除 (Redacted)
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

    // 3. 正体判明ギミック (吉武更紗 -> 髙寄彩葉)
    const identitySpans = document.querySelectorAll('.identity-reveal');
    identitySpans.forEach(span => {
        span.addEventListener('click', function() {
            if (this.classList.contains('revealed') || this.classList.contains('processing')) return;

            const trueName = this.getAttribute('data-true-name');
            this.classList.add('processing');
            
            // 0.8秒間バグらせた後に名前を確定させる
            setTimeout(() => {
                this.classList.remove('processing');
                this.textContent = trueName;
                this.classList.add('revealed');
            }, 800);
        });
    });

    console.log("--- SECURE SYSTEM RECOVERY COMPLETE ---");
});