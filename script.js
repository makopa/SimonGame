$(document).ready(function(){

	var arr = [], userArr = [], computerArr = [], step = 1, tileIds = [1,2,3,4],
		interval,counter = 0, random, count = 0, mode = 0, score = 0;

	function endGame () {
		clearInterval(interval);
		deactivate();
		$(".game-status").html("Simon Game");
		arr = []; userArr = []; computerArr = []; step = 1; 
		counter = 0; count = 0; mode = 0; score = 0;
	}

	function deactivate(){
		$("#tile-" + random).removeClass("tile-" + random + "-activated");
		$("#btn-reset").prop('disabled', false);
	}

	function activate(){
		$("#tile-" + random).addClass("tile-" + random + "-activated");
	}

	function triggerClick () {
		$("#tile-" + random).trigger('click', function (e) {});
	}

	function setMode () {
		mode = 1;
		$(".game-status").html("Your Turn");
	}

	function timeout () {
		if (step > 20) {
			alert ("you Won the Game! ");
		}
		$("#btn-reset").prop('disabled', 'disabled');
		$(".game-status").html("Computer's Turn");
		$("#steps-no").html(step);
		$("#score-no").html(score);
		mode = 0;
		arr = computerArr;
		computerArr = [];
		userArr = [];

		interval = setInterval(function () {
			count = 0;
			deactivate();
			random = Math.floor((Math.random() * 4))+1;
			if (arr[counter] !== undefined) {
				random = arr[counter];
			}
			setTimeout(triggerClick, 500);
			setTimeout(activate, 500);
			counter++;

			if (counter == step) {
				clearInterval(interval);
				setTimeout(deactivate, 750);
				count = 0;
				setTimeout(setMode, 1000);
			}
		}, 750);
	}

	$(".tile").click(function (e) {
		var idNum = e.currentTarget.id.substr(5);
		function playAudio () {
			var audio = document.getElementById("sound-" + idNum);		
			audio.play();
		}
		playAudio();
		if (e.isTrigger) {
			computerArr.push(idNum);
		}

		else if (mode == 1) {
			userArr.push(idNum);
			if (computerArr[count] !== userArr[count]) {
				alert('Wrong Button! ');
				endGame();
			}
			else {console.log('Success');}
			count++;
			if (count == computerArr.length) {
				mode = 0;
				counter = 0;
				step++;
				score++;
				setTimeout(timeout, 400);
				$("score-no").html(score);
			}
		}
	});

	$("#btn-start").click(function () {
		$(this).addClass('hidden');
		$('#btn-start').addClass("hidden")
		timeout();
	});

	$("#btn-reset").click(function () {
		setTimeout(endGame, 100);
		$('#btn-start').removeClass("hidden")
	});
});