const cards = document.querySelectorAll('.card');
	let num = document.querySelector('.count')
	let cardTimes = 0;
	let hasOpen_Card = false;
	let cardFrt, cardScd;
	let lock = false;
	let cardFrontImg = document.querySelectorAll('.card-front-img');
	let pop = document.querySelector('.pop');
	let popImage = document.querySelector('.pop-image');
	let btnClose = document.querySelector('.close');
	let modalShow = document.querySelector('.modal');
	let modalContentShow = document.querySelector('.modal-body');
	let again = document.querySelector('.again');
	let cancel = document.querySelector('.cancel');
	let shows;

	// 確認正反卡面翻轉並加入翻轉動畫 start
	function cardChange() {
			if (lock) {
					return;
			}
			if (this === cardFrt) return;
			this.classList.add('card-turn');
			if (!hasOpen_Card) {
					hasOpen_Card = true;
					cardFrt = this;
					return;
			}
			hasOpen_Card = false;
			cardScd = this;
			cardMatch();
	}
	// 確認正反卡面翻轉並加入翻轉動畫 end

	// 確認反轉卡面圖形是否吻合 start
	// 如吻合就套用 disableEven() 函式，如不吻合就套用 returnCover 函式() 
	function cardMatch() {
			let cardMatching = cardFrt.dataset.target === cardScd.dataset.target;
			cardMatching ? disableEvent() : returnCover();
	}
	// 確認反轉卡面圖形是否吻合 end

	// 設定當卡面圖形吻合時移除事件監聽，與重置計數器和動態變更彈跳視窗內容 start
	// 當卡面圖形吻合時移除事件監聽，並加入配對計數器當圖形吻合時計數器會自動 +1 的數値，
	// 當計數器數値到 6 時會重置計數器，並動態彈出視窗與變更彈跳視窗內文字內容
	function disableEvent() {
			cardTimes += 1;
			if (cardTimes == 6) {
					cardTimes = 0;
					modalHeader_Text();
					modalContent_Text();
					modalBtn_Cancel_TextOpen();
					modalBtn_Again_Text();
					modalShow.style.display = 'block';
					modalShow.style.transition = '1s ease';
					shows = setTimeout(show, 100);
			}
			cardFrt.removeEventListener('click', cardChange);
			cardScd.removeEventListener('click', cardChange);
			reset();
			// checkpopUps();
	}
	// 設定當卡面圖形吻合時移除事件監聽，與重置計數器和動態變更彈跳視窗內容 end

	// 設定配對成功顯示的大卡片
	// function checkpopUps(){
		// let pop_image = document.querySelector('.pop-image');
		// let _this = $(this);
		// let bigimg = document.querySelector('.big-img');
		// pop.style.display = 'block';
		// let src = _this.attr('src');
		// $(bigimg).attr('src,src');
			
			// pop.style.transition = '1s ease';
				// pop_image.innerHTML = cardFrt cardFrontImg;
					// pop_image.innerHTML = "<img src=" + "https://images.unsplash.com/photo-1589199335398-6956da1d3412?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" + ">"
	// }
	// pop.style.cursor = "pointer";
  // pop.onclick = function () { 
	// 	pop.style.display = "none"};




	// 設定如不吻合時，延遲刪除 class 動畫 start
	// 如無設定翻轉時只要圖形不吻和另一張卡面則無法翻轉，加入lock為了翻轉時內容
	function returnCover() {
			lock = true;
			setTimeout(() => {
					cardFrt.classList.remove('card-turn');
					cardScd.classList.remove('card-turn');
					reset();
			}, 1000);
	}
	// 設定如不吻合時，延遲刪除 class 動畫 end end

	// 設定卡面點擊時將卡面的値 ture 與 false 動態變更為原始値 start  
	function reset() {
			[hasOpen_Card, lock] = [false, false];
			[cardFrt, cardScd] = [null, null];
	}
	// 設定卡面點擊時將卡面的値 ture 與 false 動態變更為原始値 end

	// 設定卡牌順序亂數，與重新加入監聽事件 strat
	// 使用 forEach 為設定卡牌亂數，
	// 並加入刪除 class 翻轉動畫將卡面蓋回，
	// 再將原本配對成功時已刪除的監聽式件重新加回來
	function resetAll() {
			cards.forEach(card => {
					let resetBoard = Math.floor(Math.random() * 12);
					card.style.order = resetBoard;
					card.classList.remove('card-turn');
					card.addEventListener('click', cardChange);
			})
	}
	// 設定卡牌順序亂數，與重新加入監聽事件 end

	// 設定動態變更彈出視窗文字與樣式內容 strat
	function modalHeader_Text() {
			let modalText_header = document.querySelector('.header-text');
			if (modalText_header.textContent == '') {
					modalText_header.innerHTML = '遊戲說明';
			} else if (modalText_header.textContent == '遊戲說明') {
					modalText_header.innerHTML = '挑戰成功';
			} else {
					modalText_header.innerHTML = '挑戰成功';
			}
	}

	function modalContent_Text() {
			let modalText_content = document.querySelector('.content-text')
			if (modalText_content.textContent == '') {
					modalText_content.innerHTML = '點擊卡片對應相同的卡片的圖案<br>直到將整面卡面配對正確';
			} else if (modalText_content.textContent == '點擊卡片對應相同的卡片的圖案<br>直到將整面卡面配對正確') {
					modalText_content.innerHTML = '您已將卡牌全數對應成功囉，恭喜 !';
			} else {
					modalText_content.innerHTML = '您已將卡牌全數對應成功囉，恭喜 !';
			}
	}

	function modalBtn_Cancel_TextClose() {
			let cancelText = document.querySelector('.cancel-text');
			if (cancel.classList == 'cancel') {
					cancel.classList.remove('cancel');
			}
	}

	function modalBtn_Cancel_TextOpen() {
			let cancelText = document.querySelector('.cancel-text');
			if (cancelText.textContent == '' && cancel.classList == '') {
					cancel.classList.add('cancel');
					cancelText.innerHTML = '取消';
			}
	}

	function modalBtn_Again_Text() {
			let againText = document.querySelector('.again-text')
			if (againText.textContent == '') {
					againText.innerHTML = '確定';
			} else if (againText.textContent == '確定') {
					againText.innerHTML = '重新挑戰';
			} else {
					againText.innerHTML = '重新挑戰';
			}
	}
	// 設定動態變更彈出視窗文字與樣式內容 end

	// 設定彈出視窗淡入延遲 start
	function show() {
			modalShow.classList.add('modal-toggle');
			modalContentShow.classList.add('modal-body-toggle');
	}
	// 設定彈出視窗淡入延遲 end

	// 設定彈出視窗淡出延遲 start
	function close() {
			modalShow.style.display = 'none';
	}
	// 設定彈出視窗淡出延遲 end

	// 監聽所有卡牌及時觸發 cardChange() 函式 start
	cards.forEach(function(card) {
					card.addEventListener('click', cardChange);
			})
			// 監聽所有卡牌及時觸發 cardChange() 函式 end

	// 監聽畫面載入時加載彈出視窗與變更彈出視窗內容文字樣式 start
	window.addEventListener('load', function() {
					modalShow.style.display = 'block';
					modalShow.style.transition = '1s ease';
					shows = setTimeout(show, 100);
					modalHeader_Text();
					modalContent_Text();
					modalBtn_Again_Text();
					modalBtn_Cancel_TextClose();
			})
			// 監聽畫面載入時加載彈出視窗與變更彈出視窗內容文字樣式 end

	// 監聽點擊彈出視窗本體內部架構 X 按鈕 start
	btnClose.addEventListener('click', function() {
					modalShow.classList.remove('modal-toggle');
					modalContentShow.classList.remove('modal-body-toggle');
					shows = setTimeout(close, 750);
			})
			// 監聽點擊彈出視窗本體內部架構 X 按鈕 end

	// 監聽點擊彈出視窗本體內部架構確認按鈕，並觸發 resetAll()函式 start
	again.addEventListener('click', function() {
					modalShow.classList.remove('modal-toggle');
					modalContentShow.classList.remove('modal-body-toggle');
					shows = setTimeout(close, 750);
					resetAll();
			})
			// 監聽點擊彈出視窗本體內部架構確認按鈕，並觸發 resetAll()函式 end

	// 監聽點擊彈出視窗本體內部架構取消按鈕 start
	cancel.addEventListener('click', function() {
					modalShow.classList.remove('modal-toggle');
					modalContentShow.classList.remove('modal-body-toggle');
					shows = setTimeout(close, 750);
			})
			// 監聽點擊彈出視窗本體內部架構取消按鈕 end

	// 監聽點擊彈出視窗本體架構外部網頁空白區域 window (整個網頁當前視窗)，當點擊外部區域時一樣可關閉彈出視窗 start
	window.addEventListener('click', function(e) {
					if (e.target == modalShow) {
							modalShow.classList.remove('modal-toggle');
							modalContentShow.classList.remove('modal-body-toggle');
							shows = setTimeout(close, 750);
					}
			})
			// 監聽點擊彈出視窗本體架構外部網頁空白區域 window (整個網頁當前視窗)，當點擊外部區域時一樣可關閉彈出視窗 end