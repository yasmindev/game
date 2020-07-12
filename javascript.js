$(document).ready(function(){
			$("#restart").prop('disabled', true);
			let count = 0;
			let gameTimer = null;
			var app= {
				cards: ['fa-car', 'fa-bed', 'fa-truck', 'fa-umbrella', 'fa-coffee', 'fa-tree', 'fa-hashtag', 'fa-tachometer','fa-car', 'fa-bed', 'fa-truck', 'fa-umbrella', 'fa-coffee', 'fa-tree', 'fa-hashtag', 'fa-tachometer'],
				shuffle: function(arr){
					var random = 0;
					var tmp = 0;
					for (var i = 1; i < arr.length; i++) {
						random = Math.round(Math.random() * i);
						tmp = app.cards[i];
						app.cards[i] = app.cards[random];
						app.cards[random] = tmp;
					}
					return arr;
				},
				init: function(){
					/*$(".card").each(function(index){
						$(this).children().addClass(app.cards[index]).hide();
					});*/
					let shuffleArr = app.shuffle(app.cards);
					for (var i = 0; i < shuffleArr.length; i++) {
			let newCard='<div class="card unmatched"><i class="fa '+shuffleArr[i]+'"></i></div>';

			$(".game").append(newCard);
		}

					$('#game-ovarlay').addClass('game-container-overlay');
					let counter = 10;
					let interval = setInterval(function() {
					counter--;
					$(".card").children().show();
					// Display 'counter' wherever you want to display it.
					if (counter <= 0) {
						clearInterval(interval);
						$('#game-ovarlay').removeClass('game-container-overlay').css("display", "none");
						$('#game-ovarlay').text('');
						app.timer(20);
						app.startGame();
						return;
					} else {
						$('#game-ovarlay').text(counter);
					}
				}, 1000);
				},
				startGame: function () {
					
					$(".card").children().hide();
					app.clickCards();	
				}, 
				clickCards:function(){
						$(".card").on("click", function(){
							$(this).addClass("selected");
							$(this).children().show();
							app.checkMatch();
						});
					},
				checkMatch:function(){
					if($(".selected").length === 2)
					{
						if($(".selected").first().children().attr("class") === $(".selected").last().children().attr("class"))
						{
							//match remove card
							$(".selected").animate({opacity: 0}).removeClass("unmatched").addClass("matched");
							$(".matched").each(function(){
								$(this).removeClass("selected");
							});
							app.checkWin();
						}
						else{
							setTimeout(function(){
							$(".selected").children().hide();
							$(".selected").removeClass("selected");
						}, 500);
						}
						
					}
				},
				checkWin: function(){
					if($(".unmatched").length === 0)
						{
							$('#game-ovarlay').css("display", "block").addClass('game-container-overlay');
							$('#game-ovarlay').text('You win!');
							clearInterval(gameTimer);
						}
				},
				 timer: function(num) {
						let counter = num;

						gameTimer = setInterval(function() {
							counter--;

							// Display 'counter' wherever you want to display it.
							if (counter <= 0) {
								clearInterval(gameTimer);
								$(".selected").children().hide();
								$(".selected").removeClass("selected");
								$('#game-ovarlay').css("display", "block").addClass('game-container-overlay');
								$('#game-ovarlay').text('Game Over!');
								$('.timer span').text('0');
								$("#restart").prop('disabled', false);
								return;
							} else {
								$('.timer span').text(counter);
							}
						}, 1000);
					}, 


			};

			app.init();

		});