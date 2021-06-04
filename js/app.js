$('#newgame').click(function () {

    $("#newgame").attr('disabled', true);

    
    const gameBoard = $('#game-board');

    let cardArray = ['A', 'A', 'B', 'B', 'C', 'C', 'D', 'D', 'E', 'E', 'F', 'F', 'G', 'G', 'H', 'H', 'I', 'I', 'J', 'J', 'K', 'K', 'L', 'L'];
    let comparisonArray = [];

    let clickCount = 0;
    let pairs = 0;
    let attempts = 0;

    
    createBoard();



    $(document).on('click', '.fa-undo', function () {
        location.reload();
    });




   
    $('.card').click(function (event) {


        //flip card if it is not already open or the comparison array full

        if ($(this).hasClass("flipped") || $(this).hasClass("solved") || comparisonArray.length >= 2) {

            return;

        } else {

            flipCard($(event.target).parent());
        };

        //open the card and store the card information in an array

        comparisonArray.push($(this).data("card-type"));

        //if this is the first card clicked simply count the click and number of attempts

        if (clickCount === 0) {

            clickCount++;
            recordAttempts();

        } else {

            //if this is the second card clicked compare whether it is the same as the other stored card. If yes, add to the number of pairs and change the css attribute to permanently leave the card open.

            if (comparisonArray[0] === comparisonArray[1]) {


                $("[data-card-type=" + comparisonArray[0] + "]").removeClass('flipped').addClass('solved');

                pairs++;

                if (pairs === 12) {
                    gameOver();
                }
            }

            //close all unsuccessfully opened cards and clear the comparison array with a short delay

            setTimeout(function () {
                flipCard($('.flipped'));
                comparisonArray = [];

            }, 1000);

            //reset the click count

            clickCount = 0;

        }

    });




    // All function declaration


    function createBoard() {

        cardArray = shuffle(cardArray);

        for (i = 1; i <= cardArray.length; i++) {
            gameBoard.append($(`<div class='container'><div class='card' data-card-type='${cardArray[i-1]}'><figure class='front'></figure><figure class='back'></figure></div></div>'`));
        }
    };



    function shuffle(array) {
        var currentIndex = array.length,
            temporaryValue, randomIndex;

        while (currentIndex !== 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    }

    
    function flipCard(element) {
        $(element).toggleClass('flipped');

    }


    function gameOver() {

        messageWin();
    }
    function messageWin() {

        $(`<section class="game-over"><div class="message-box"><h2>You have found all pairs!</h2><p>Number of attempts:</p><p>Time required:</p><p><i class="fas fa-undo"></i></p></div></section>`).insertAfter($('.game'));
        $('.message-box').fadeIn(1000);

    }


    function recordAttempts() {
        attempts++;
        $('#attempts').html(attempts);

    }


});