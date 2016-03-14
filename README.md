#Blackjack game using jQuery, HTML and CSS

###Setup the table using Bootstrap. Create a dealers hand and players hand to hold the toals.
Set each card to a custom width(adjusted col-sm-2 to 11% to avoid having to write 3 extra divs).
Add 3 button to the bottom of the table so the user can interact with the game.

###Write some Javascript

Bind each button to a jQuery click function and call the correct function depending on the click.

- bind a function called deal to the deal button.

-when called it will create a deck in default order, then swap 2 cards in the array 500 times.

-once swaps are done, the deck will be shuffled. The number can be changed from 500 for varrying degress of randomness.

- After the deck is shuffled, the Player Hand and Dealer Hand arrays are created with the 0,2 and 1,3 cards in theDeck array.

- The Placecard function is then called which takes 3 paramenter: the playersHand array, who's turn it is, and the slot the card goes into.

-placeCard then removes the "empty" class to accomadate styling and updates the HTML to use the card value.

- calculateTotal fuction is then called which is sent two paramentes: the playerHand array and who's turn it is. It slices each card in the array via a loop and removes the letter on the end. The result is turned int o a Number to ensure we can run math functions on it and then the toal is updated with the new number.