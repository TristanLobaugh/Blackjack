var theDeck = [];
var placeInDeck = 0;

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
}

function placeCard(card, who, slot){
	var currID = "#" + who + "-card-" + slot;
	$(currID).removeClass("empty");
	$(currID).html(card);
}
function calculateTotal(hand, who){
	var total = 0;
	for(var i = 0; i<hand.length; i++){
// purposely not fixing 11, 12, 13 or 1
		var cardValue = Number(hand[i].slice(0,-1));
		total += cardValue
	}
	var idToGet = "." + who + "-total";
	$(idToGet).html(total);
	//what if the total is over 21? this would be a good place to check for bust.
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













