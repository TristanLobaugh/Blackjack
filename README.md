#Blackjack game using jQuery, HTML and CSS

###Setup the table using Bootstrap. Create a dealers hand and players hand to hold the toals.
Set each card to a custom width(adjusted col-sm-2 to 11% to avoid having to write 3 extra divs).
Add 3 button to the bottom of the table so the user can interact with the game.

###Write Javascript functionality

Bind each button to a jQuery click function and call the correct function depending on the click.

- bind a function called deal to the deal button.

-when called it will create a deck in default order, then swap 2 cards in the array 500 times.

-once swaps are done, the deck will be shuffled. The number can be changed from 500 for varrying degress of randomness.

- After the deck is shuffled, the Player Hand and Dealer Hand arrays are created with the 0,2 and 1,3 cards in theDeck array.

- The Placecard function is then called which takes 3 paramenter: the playersHand array, who's turn it is, and the slot the card goes into.

-placeCard then removes the "empty" class to accomadate styling and updates the HTML to use the card value.

- calculateTotal fuction is then called which is sent two paramentes: the playerHand array and who's turn it is. It slices each card in the array via a loop and removes the letter on the end. The result is turned int o a Number to ensure we can run math functions on it and then the toal is updated with the new number.

### Author: Tristan Lobaugh 
+ Github - https://github.com/TristanLobaugh
+ Homepage - http://tristanlobaugh.com

## Demo

[Live Demo](http://tristanlobaugh.com/blackjack)

## Screenshots

### Main page:
![alt text](https://raw.githubusercontent.com/TristanLobaugh/blackjack/master/img/screen_shot.png)

### After deal:
![alt text](https://raw.githubusercontent.com/TristanLobaugh/blackjack/master/img/screen_shot2.png)


##Code Examples

### Deal function, assigns the cards to the player and dealer and shows the proper cards and scores on the page
```
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
```

### Function used to create and shuffle the deck
```
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
```

## To Do
Minor bugs to fix