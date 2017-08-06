$(document).ready(function() {
    var gameOver = false;
    $('form').submit(function(event) {
        var dimension = $(this).serialize().split('&').pop().split('=').pop();
        event.preventDefault();
        createBoard(dimension);
    });

    $(document).on('click','td button',function(){
        var parent = $(this).parents('td');
        
        if(parent.children('span').length > 0 || parent.hasClass('bomb'))
        {
            parent.children('button').hide();
            
            if(parent.hasClass('bomb')){
                gameOver = true;
                $('table button').hide();
                var newGame = prompt("Game Over!, Would you like to start new game?");
                startNewGame(newGame);
                //return;
            }
        }
        else
        {
            var parentTag = parent.get(0);
            var index = $(parentTag).attr('id').split('location')[1].split('-');
            // console.log("Before! : " + index);
            var numOfRows =  $('table tr').length;
            revealEmptyCells({x:index[0], y:index[1]},numOfRows);
        }
        
        // check if the user won the game
        if(!gameOver && $('table button:not(:hidden)').length == $('.bomb button:not(:hidden)').length){
            var gameWin = prompt("Congrats! you won!!!! you want to play another game?");
            startNewGame(gameWin);
        }
        // var btParent = parent.children('span').length;
        // var parentTag = $(this).parent().get(0);
        // var index = $(parentTag).attr('id').split('location')[1].split('-');
        // console.log("id is: " + index + ", " + index.y);
        // underTheButton(btParent);
        // switch (expression) {
        //     case 'number':
        //         // code
        //         break;
        //     case '':
        //         break;
        //     default:
        //         // code
        // }
        // console.log({x:index[0], y:index[1]});
        // console.log(btParent);
    });
});


function revealEmptyCells(indexOfButton, numRows){
    var el = $('#location'+indexOfButton.x + '-'+indexOfButton.y);
    console.log("the button that pressed is: " + indexOfButton.x + "," + indexOfButton.y);
    if(el.children('span').length > 0 || ((indexOfButton.x < 0 || indexOfButton.x > numRows - 1)|| (indexOfButton.y < 0 || indexOfButton.y > numRows - 1)) || el.children('button').is(":hidden"))
        return;
    el.children('button').hide();
    revealEmptyCells({x:Number(indexOfButton.x) + 1, y:indexOfButton.y},numRows);
    revealEmptyCells({x:indexOfButton.x , y:Number(indexOfButton.y) + 1},numRows);
    revealEmptyCells({x:indexOfButton.x , y:Number(indexOfButton.y) - 1},numRows);
    revealEmptyCells({x:Number(indexOfButton.x) - 1, y:indexOfButton.y},numRows);
};

function startNewGame(decision)
{
    switch(decision.toLowerCase()) {
        case "yes":
            $.ajax({
                  url: "/",
                  type: 'get'
            }).done(function(){
                $('#boardPage').hide();
                $('#homePage').show();
            });
            break;
        case "no":
            alert("Thank you for playing the game");
            break;
        default:
            var defaultDecision = prompt("Please Enter yes or no");
            startNewGame(defaultDecision);
            break;
    }
}

    
function createBoard(dimension){
    $.ajax({
          url: "/board/board",
          type: 'post',
          data: {bodySize:dimension}
    }).done(function(res){
        $('#boardPage').show();
        $('#container').html(res);
        $('#homePage').hide();
    });
};