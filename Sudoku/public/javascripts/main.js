$(document).ready(function() {
    $('input').bind("keyup", changed).bind("change", changed);
    function changed() {
        this.innerHTML = this.value;
    }
    var lvl=1;
    var difficultyLvL = lvlD.firstChild.textContent;
    switch(difficultyLvL) {
        case "Level: Easy":
            lvl=0.7
            break;
        case "Level: Medium":
            lvl=0.8
            break;
        case "Level: Hard":
            lvl=1
        default:
            lvl=0.8
    }
    for(i=0;i<=8;i++) {
        for (j = 0; j <= 8; j++) {
            num = (Math.random() * 1);
            console.log(lvl);
            console.log(num);
            if(num<lvl)
                document.getElementById('cell_'+i+'_'+j+'').firstChild.value=''
        }
    }
});
$(document).on('click','button',function(){
    var myTable = document.getElementById('sudoku');
    //myTable.rows[0].cells[1].innerHTML = 3;
    var columnsTest=true;
    var rowsTest =true;
    var first = true;
    var ans = testRowsOrColumns(true)&&testRowsOrColumns(false)&&testSquers();
    console.log(ans);
    alert(ans);
    if(ans)
        document.getElementById('win').innerHTML="Win !!";
});

function testRowsOrColumns(rows) {
    var row,clo =0;
    for(i=0;i<=8;i++){
        var listOfNum = [-1,-1,-1,-1,-1,-1,-1,-1,-1];
        var lineOrColumn =true;
        for(j=0;j<=8;j++) {
            //if(myTable.rows[i].cells[j].innerHTML==5)
            for (k = 0; k < listOfNum.length; k++)
                if(rows)
                    if (!document.getElementById('cell_' + i + '_' + j + '').firstChild.value == listOfNum[k] || document.getElementById('cell_' + i + '_' + j + '').firstChild.value == '')
                        listOfNum[(document.getElementById('cell_' + i + '_' + j + '').firstChild.value) - 1] = (document.getElementById('cell_' + i + '_' + j + '').firstChild.value);
                else
                    if (!document.getElementById('cell_' + j + '_' + i + '').firstChild.value == listOfNum[k] || document.getElementById('cell_' + j + '_' + i + '').firstChild.value == '')
                        listOfNum[(document.getElementById('cell_' + j + '_' + i + '').firstChild.value) - 1] = (document.getElementById('cell_' + j + '_' + i + '').firstChild.value);
        }
        for(k=0;k<listOfNum.length;k++)
            if(listOfNum[k]==-1)
                squersTest=false;
    }
    return lineOrColumn;
}
function testSquers() {
    var listOfNum = [-1,-1,-1,-1,-1,-1,-1,-1,-1];
    var squersTest =true;
    var offsets = [[0,0],[0,3],[0,6],[3,0],[3,3],[3,6],[6,0],[6,3],[6,6]];
    for (squerNum = 0; squerNum <9; squerNum++) {
        listOfNum = [-1,-1,-1,-1,-1,-1,-1,-1,-1];
        for (i = offsets[squerNum][0]; i < offsets[squerNum][0]+3; i++) {
            for (j = offsets[squerNum][1]; j <offsets[squerNum][1]+3; j++) {
                for (k = 0; k < listOfNum.length; k++)
                    if (!(document.getElementById('cell_' + j + '_' + i + '').firstChild.value == listOfNum[k] || document.getElementById('cell_' + j + '_' + i + '').firstChild.value == ''))
                        listOfNum[(document.getElementById('cell_' + j + '_' + i + '').firstChild.value) - 1] = (document.getElementById('cell_' + j + '_' + i + '').firstChild.value);
            }
        }
        for(k=0;k<listOfNum.length;k++)
            if(listOfNum[k]==-1)
                squersTest=false;
    }
    return squersTest;
}
