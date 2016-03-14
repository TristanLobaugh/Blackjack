var theDeck = [];
var placeInDeck = 0;
var playerTotalCards = 2;
var dealerTotalCards = 2;
var timer;

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
});

function deal(){
	$(".card").addClass("empty").html("");
	$("#message").html("");
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
}

function placeCard(card, who, slot){
	var currID = "#" + who + "-card-" + slot;
	$(currID).removeClass("empty");
	$(currID).html(card);
}
function calculateTotal(hand, who){
	var total = 0;
	for(var i = 0; i<hand.length; i++){
		var cardValue = Number(hand[i].slice(0,-1));
		if(cardValue === 11 || cardValue === 12 || cardValue ===13){
			cardValue = 10;
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
	for(var s = 1; s <= 4; s++)	{
		var suit = "";
		if(s === 1){
			suit = "h";
		}else if(s===2){
			suit = "s";
		}else if(s===3){
			suit = "d";
		}else if(s===4){
			suit = "c";
		}
		for(var i = 1; i <= 13; i++){
			theDeck.push(i+suit);
		}
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
	var slot = "";
	if(playerTotalCards === 2){
		slot = "three";
	}else if(playerTotalCards === 3){
		slot = "four";
	}else if(playerTotalCards === 4){
		slot = "five";
	}else if(playerTotalCards === 5){
		slot = "five";
	}

	placeCard(theDeck[placeInDeck], "player", slot);
	playerHand.push(theDeck[placeInDeck]);
	placeInDeck++;
	playerTotalCards++;
	calculateTotal(playerHand, "player");	
}

function stand(){
	var dealerTotal = $(".dealer-total").html();
	setTimeout(function(){
		while(dealerTotal < 17){
				if(dealerTotalCards == 2){
					slot = "three";
				}else if(dealerTotalCards === 3){
					slot = "four";
				}else if(dealerTotalCards === 4){
					slot = "five";
				}else if(dealerTotalCards === 5){
					slot = "five";
				}				
				placeCard(theDeck[placeInDeck], "dealer", slot);				
				dealerHand.push(theDeck[placeInDeck]);
				placeInDeck++;
				dealerTotalCards++;
				calculateTotal(dealerHand, "dealer");
				dealerTotal = $(".dealer-total").html();	
		}
	}, 1000);		
	checkWin(); 
}	

function checkWin(){
	var playerHas = Number($(".player-total").html());
	var dealerHas = Number($(".dealer-total").html());
	if(dealerHas>21){
		//dealer bust
		bust("dealer");
	}else{
		//neither player has busted and the dealer has at least 17
		if(playerHas>dealerHas){
			//player wins
			$("#message").html("You have won!");
		}else if(dealerHas>playerHas){
			//dealer wins
			$("#message").html("Dealer has won!");
		}else{
			//draw
			$("#message").html("It\'s a push!");
		}	
	}
	$("button").attr("disabled", "disabled");
	$("#deal-button").removeAttr("disabled");
}

function bust(who){
	if(who === "player"){
		$("#message").html("You have busted!");
	}else{
		$("#message").html("The dealer has busted!");
	}
	$("button").attr("disabled", "disabled");
	$("#deal-button").removeAttr("disabled");
}











