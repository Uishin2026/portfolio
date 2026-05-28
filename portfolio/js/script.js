window.addEventListener('load', () => {
    const loaderWrapper = document.getElementById('loader-wrapper');
    // セッションストレージから訪問フラグを取得
    const isFirstVisit = sessionStorage.getItem('portfolioVisited');
    
    // index.htmlで、かつローディング画面要素が存在する場合のみ処理
    if (loaderWrapper) {
        if (!isFirstVisit) {
            // 初回訪問時: ローディング画面を表示し、セッションストレージにフラグをセット
            
            // ページが完全に読み込まれてから0.5秒後に開始
            setTimeout(() => {
                loaderWrapper.classList.add('fadeout');
                // スクロールバーの固定を解除
                document.body.classList.remove('no-scroll');
                
                // アニメーション終了後、要素を完全に非表示にする
                loaderWrapper.addEventListener('transitionend', () => {
                    loaderWrapper.style.display = 'none';
                }, { once: true });
                
                // 初回訪問フラグをセット
                sessionStorage.setItem('portfolioVisited', 'true');
            }, 500);
            
        } else {
            // 2回目以降の訪問（セッション内）: ローディング画面を非表示にする
            loaderWrapper.style.display = 'none';
            document.body.classList.remove('no-scroll');
        }
    }
});

document.addEventListener('DOMContentLoaded', () => {
    // 必要な要素を取得
    const menuBtn = document.querySelector('.menu-btn');
    const navUl = document.querySelector('.main-nav');
    const navLinks = document.querySelectorAll('.main-nav a');
    
    // ★ローディング画面がある場合のみ、初期状態でスクロールを固定
    // かつ、初回訪問時のみスクロールを固定するよう条件を追加
    const loaderWrapper = document.getElementById('loader-wrapper');
    const isFirstVisit = sessionStorage.getItem('portfolioVisited');

    if (loaderWrapper && !isFirstVisit) {
        document.body.classList.add('no-scroll');
    }

    // ハンバーガーメニューの開閉機能
    const toggleMenu = () => {
        // nullチェック
        if (!navUl || !menuBtn) return;
        
        navUl.classList.toggle('open');
        menuBtn.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
    };

    // 1. メニューボタンがクリックされたら開閉を実行
    if (menuBtn && navUl) {
        menuBtn.addEventListener('click', toggleMenu);
    }

    // 2. ナビゲーションリンクがクリックされたらメニューを閉じる
    if (navLinks.length > 0 && navUl) {
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                // メニューが開いている状態でのみ閉じる処理を実行
                if (navUl.classList.contains('open')) {
                    // 遅延を設けることでスムーズスクロールとメニューを閉じる動作を両立
                    setTimeout(() => {
                        // toggleMenuを呼ぶことでopen/active/no-scrollクラスを削除
                        toggleMenu();
                    }, 300); 
                }
            });
        });
    }
    // 3. デスクトップサイズになったらメニューを強制的に閉じる処理
    const mediaQuery = window.matchMedia('(min-width: 600px)');
    
    const handleDesktopChange = (e) => {
        if (e.matches && navUl && menuBtn) { // 600px以上になったら
            // 'open', 'active', 'no-scroll' クラスを強制的に削除
            navUl.classList.remove('open');
            menuBtn.classList.remove('active');
            document.body.classList.remove('no-scroll');
        }
    }
    
    // イベントリスナーを追加
    mediaQuery.addEventListener('change', handleDesktopChange);
    // 初回実行
    handleDesktopChange(mediaQuery);
});