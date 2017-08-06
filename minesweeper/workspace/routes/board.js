var express = require('express');
var router = express.Router();

function getRandomNumber(max) {
    return Math.floor((Math.random() * 1000) + 1) % max;
}

function containsMine(obj, list) {
    for (var i = 0; i < list.length; i++) {
        if (list[i].x == obj.x && list[i].y == obj.y) {
            return i;
        }
    }
    return -1;
}

function getIndexes(x,y)
{
    var indexes = [];
    
    indexes.push([x - 1,y - 1]);
    indexes.push([x, y - 1]);
    indexes.push([x + 1,y - 1]);
    indexes.push([x + 1, y]);
    indexes.push([x + 1, y + 1]);
    indexes.push([x, y + 1]);
    indexes.push([x - 1, y + 1]);
    indexes.push([x - 1, y]);
    
    return indexes;
}


function plantMines(dimension) {
    var minesPlanted = 0, x, y, mines, bombsLocation = [];
    if (dimension == 10)
        mines = 14;
    else if (dimension == 25)
        mines = 88;
    else
        mines = 352;

    while (minesPlanted < mines) {
        x = getRandomNumber(dimension);
        y = getRandomNumber(dimension);
        if (containsMine({x: x, y: y}, bombsLocation) < 0) {
            bombsLocation.push({x: x, y: y});
            minesPlanted++;
        }
    }
    
    return addNumbers(dimension,bombsLocation);
}

function addNumbers(dimension,bombsLocation){
    
    var arrayOfNumbers = [];
    
    for(var x = 0; x < dimension; x++){
        arrayOfNumbers[x] = [];    
        for(var y = 0; y < dimension; y++){ 
            arrayOfNumbers[x][y] = 0;    
        }    
    }
    
    bombsLocation.forEach(function(bombLoc){
       var indexes = getIndexes(bombLoc.x,bombLoc.y);
       indexes.forEach(function(index){
           var  x = index[0],
                y = index[1];
           if(x >= 0 && y >= 0 && x < dimension && y < dimension)
           {
               arrayOfNumbers[x][y]++;
           }
       })
    });
    
    return [arrayOfNumbers,bombsLocation];
}

router.post('/board', function(req, res) {
    var dimension = req.body.bodySize;

    var minesAndNumbers = plantMines(dimension);
    
    var mines = minesAndNumbers[1];
    var numbers = minesAndNumbers[0];
    
    var tableContent = '<table><tbody>';
    
    for(var i = 0; i < dimension; i++)
    {
        tableContent += "<tr>";
        for(var j = 0; j < dimension; j++){
            
            if(containsMine({x:i,y:j},mines) > -1)
            {
                tableContent += "<td id = 'location" + i +"-"+ j + "' class = 'bomb' >" +  "<button></button></td>";
            }
            else if(numbers[i][j] > 0){
                tableContent += "<td id = 'location" + i +"-"+ j + "'><span>"+numbers[i][j]+"</span><button></button></td>";
            }
            else
                tableContent += "<td id = 'location" + i +"-"+ j + "'>"+"<button></button></td>";
        }
        tableContent += "</tr>";
    }
    tableContent+="</tbody></table>";

	res.json(tableContent);
});

module.exports = router;