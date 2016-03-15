var theDeck = [];
var placeInDeck = 0;
var playerTotalCards = 2;
var dealerTotalCards = 2;
var timer;
var bank = 500;
var bet = 0;

$(document).ready(function(){

	$("button").click(function(){
		var clickedButton = ($(this).attr("id"));
		if(clickedButton == "deal-button"){
			deal();
		}else if(clickedButton == "hit-button"){
			hit();
		}else if(clickedButton == "stand-button"){
			stand();
		}
	});
	$(".chips").click(function(){
		thisBet = Number($(this).attr("value"));
		if(thisBet > bank){
			$("#message").html("Not Enough Funds!");
		}else{
			bet = bet + thisBet;
			bank = bank - thisBet;
			$(".bets").html(bet);
			$(".bank").html(bank);
		}
	});
});

function deal(){
	if(($(".bets").html()) < 1){
		$("#message").html("Nothing bet!");
	}else{
		$(".card").addClass("empty");
		$("div[id^='dealer-card-']").css('background-position', "0px -482px");
		$("div[id^='player-card-']").css('background-position', "0px -482px");
		$("#message").html("");
		$(".cover, .player-total").css("visibility", "visible");
		$(".dealer-total").css("visibility", "hidden");
		playerTotalCards = 2;
		dealerTotalCards = 2;
		shuffleDeck();
		playerHand = [theDeck[0], theDeck[2]];
		dealerHand = [theDeck[1], theDeck[3]];
		placeInDeck = 4;
		placeCard(playerHand[0], "player", "one");
		placeCard(dealerHand[0], "dealer", "one");
		placeCard(playerHand[1], "player", "two");
		placeCard(dealerHand[1], "dealer", "two");
		calculateTotal(playerHand, "player");
		calculateTotal(dealerHand, "dealer");
		$("button").removeAttr("disabled");
		$("#deal-button").attr("disabled", "disabled");
		$(".chips").css("pointerEvents", "none");
	}
}

function placeCard(card, who, slot){
	var position = (card[1] + "px ") + card[2];
	var currID = "#" + who + "-card-" + slot;
	$(currID).removeClass("empty");
	$(currID).css('background-position', position);
	$(currID).attr("value", card[0]);
}
function calculateTotal(hand, who){
	var total = 0;
	for(var i = 0; i < hand.length; i++){
		var cardValue = Number(hand[i][0].slice(0,-1));
		if(cardValue === 11 || cardValue === 12 || cardValue ===13){
			cardValue = 10;
		}else if(cardValue === 14){
			cardValue = 11;
		}
		total += cardValue
	}
	var idToGet = "." + who + "-total";
	$(idToGet).html(total);
	if(total === 21){
		checkWin();
	}else if(total > 21){
		bust(who);
	}
	return total;
}


// s1 = hearts, s2=spades, s3=diamonds, s4=clubs
function shuffleDeck(){
	theDeck = [];
	var x = 0;
	var y = 0;
	for(var s = 1; s <= 4; s++)	{
		var suit = "";
		if(s === 1){
			suit = "h";
			y = "0px";
			x = 0;
		}else if(s===2){
			suit = "d";
			y = "-120px";
			x = 0;
		}else if(s===3){
			suit = "c";
			y = "-240.5px";
			x = 0;
		}else if(s===4){
			suit = "s";
			y = "-361px";
			x = 0;
		}
		for(var i = 2; i <= 14; i++){
			var valueToPush = [];
			valueToPush[0] = (i+suit);
			valueToPush[1] = x;
			valueToPush[2] = y;
			theDeck.push(valueToPush);
			x = (x - 86.2);
		}
		console.log(theDeck.length);
	}
	var numberOFTimesToShuffle = 500;
	for(var i = 1; i < numberOFTimesToShuffle; i++){
		card1 = Math.floor(Math.random()*theDeck.length);
		card2 = Math.floor(Math.random()*theDeck.length);
		if(card1 != card2){
			temp = theDeck[card1];
			theDeck[card1] = theDeck[card2];
			theDeck[card2] = temp;
		}
	}
}

function hit(){
	var slot = "two";
	if(playerTotalCards === 2){
		slot = "three";
	}else if(playerTotalCards === 3){
		slot = "four";
	}else if(playerTotalCards === 4){
		slot = "five";
	}else if(playerTotalCards === 5){
		slot = "six";
	}

	placeCard(theDeck[placeInDeck], "player", slot);
	playerHand.push(theDeck[placeInDeck]);
	placeInDeck++;
	playerTotalCards++;
	calculateTotal(playerHand, "player");	
}

function stand(){
	$(".cover").css("visibility", "hidden");
	$(".dealer-total").css("visibility", "visible");
	var dealerTotal = $(".dealer-total").html();
		if(dealerTotal < 17){
			if(dealerTotalCards == 2){
				slot = "three";
			}else if(dealerTotalCards === 3){
				slot = "four";
			}else if(dealerTotalCards === 4){
				slot = "five";
			}else if(dealerTotalCards === 5){
				slot = "six";
			}
			setTimeout(function(){			
			placeCard(theDeck[placeInDeck], "dealer", slot);
			dealerHand.push(theDeck[placeInDeck]);
			placeInDeck++;
			dealerTotalCards++;
			calculateTotal(dealerHand, "dealer");
			dealerTotal = $(".dealer-total").html();
			stand();
			}, 1000);
		}else	{	
			checkWin(); 
		}
}	

function checkWin(){
	var playerHas = Number($(".player-total").html());
	var dealerHas = Number($(".dealer-total").html());
	if(dealerHas>21){
		bust("dealer");
	}else{
		if(playerHas > dealerHas){
			$("#message").html("You have won!");
			bank = bank + (bet * 2);
			$(".bank").html(bank);
			bet = 0;
			$(".bets").html(bet);
			$(".chips").css("pointerEvents", "auto");
		}else if(dealerHas > playerHas){
			$("#message").html("Dealer has won!");
			bet = 0;
			$(".bets").html(bet);
			$(".chips").css("pointerEvents", "auto");
		}else{
			$("#message").html("It\'s a push!");
			bank = bank + bet;
			$(".bank").html(bank);
			bet = 0;
			$(".bets").html(bet);
			$(".chips").css("pointerEvents", "auto");
		}	
	}
	$("button").attr("disabled", "disabled");
	$("#deal-button").removeAttr("disabled");
}

function bust(who){
	if(who === "player"){
		$("#message").html("You have busted!");
		bet = 0;
		$(".bets").html(bet);
		$(".chips").css("pointerEvents", "auto");
		$(".cover").css("visibility", "hidden");
		$(".dealer-total").css("visibility", "visible");
	}else{
		$("#message").html("The dealer has busted!");
		bank = bank + (bet * 2);
		$(".bank").html(bank);
		bet = 0;
		$(".bets").html(bet);
		$(".chips").css("pointerEvents", "auto");
	}
	$("button").attr("disabled", "disabled");
	$("#deal-button").removeAttr("disabled");
}












