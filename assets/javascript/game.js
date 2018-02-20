var defaultCharacters = [
    {
        id: 1,
        name: "Jhin",
        img: "http://ddragon.leagueoflegends.com/cdn/8.3.1/img/champion/Jhin.png",
        attack: 8,
        attackIncrease: 8,
        cAttack: 12,
        health: 150
    },
    {
        id: 2,
        name: "Ashe",
        img: "http://ddragon.leagueoflegends.com/cdn/8.3.1/img/champion/Ashe.png",
        attack: 10,
        attackIncrease: 10,
        cAttack: 15,
        health: 200
    },
    {
        id: 3,
        name: "Aatrox",
        img: "http://ddragon.leagueoflegends.com/cdn/8.3.1/img/champion/Aatrox.png",
        attack: 12,
        attackIncrease: 12,
        cAttack: 17,
        health: 225
    },
    {
        id: 4,
        name: "Sona",
        img: "http://ddragon.leagueoflegends.com/cdn/8.3.1/img/champion/Sona.png",
        attack: 8,
        attackIncrease: 8,
        cAttack: 15,
        health: 120

    }
]

var selection = {};
var defender = {};
var currentDefenders;
var selectionModel;
var characters = [];

start();



function start(){
    characters = defaultCharacters.map(x => $.extend(true, {}, x));
    currentDefenders = [];
    $('.selection').empty();
    $('.current-defender').empty();
    for(let char of characters){
        $(".characters").append($(`<div class="col-${Math.floor(12/characters.length)}"><img class="img-responsive char" src="${char.img}" alt="${char.name}" ><h4>${char.health}</h4></div>`));
    }
    $('.char').on('click', function(){
        console.log($(this).attr("alt"))
        characters.forEach((char, index) => {
            if($(this).attr("alt") == char.name){
                selection = char;
                selectionModel = $(`<div class="col-4"><img class="img-responsive char-selected" src="${char.img}" alt="${char.name}" ><h4>${char.health}</h4></div>`);
                $('.selection').append(selectionModel);
            }else{
                currentDefenders.push(char);
            }
        })
        
        
        $('.char').off();
        $('.characters').empty();
        renderDefenders();
        handleDefender();
        
        
        
    });
    
}
//render the characters.







function attackHandler(){
    defender.health -= selection.attack;
    selection.attack += selection.attackIncrease;
    selection.health -= defender.cAttack;
    updateCharAndDefenderImages();
    console.log(defaultCharacters);
        console.log("clone", characters);
    //check if one of chars die.
    // debugger;
    if(currentDefenders.length == 0){
        const play = confirm('You killed all defenders! Congratulations! Play Again?')
        if(play){
            start();
        }
    }
    if(selection.health <= 0){
        const play = confirm('You died! Game Over. Play again?')
        if(play){
            start();
        }
    }
    
    if(defender.health <= 0){
        // alert('Defender dead, new defender on the way.');
        $('.current-defender').empty();
        
        defender = {};
        renderDefenders();
        handleDefender();
        $('.attack-button').off();
    }
    
}


function renderDefenders(){
    currentDefenders.forEach(function(char, index){

        $('.defenders').append(`<div class="col-4"><img class="img-responsive char-defenders" src="${char.img}" alt="${char.name}" ><h4>${char.health}</h4></div>`);
    })
}
function handleDefender(){
    $('.char-defenders').on("click", function(){
        var currentThis = $(this);
        currentDefenders.forEach((char, index) => {
            console.log("outside if", currentThis);
            if(currentThis.attr("alt") == char.name){
                console.log("inside if", currentThis);
                defender = char;
                console.log(defender);
                $('.current-defender').append(`<div class="col-4"><img class="img-responsive char-defender" src="${char.img}" alt="${char.name}" ><h4>${char.health}</h4></div>`)
                currentDefenders.splice(index, 1);
                $('.attack-button').on('click', attackHandler);
            }
            
        });
        $('char-defenders').off();
        $('.defenders').empty();
        console.log("def", currentDefenders);
        
    })

}

function updateCharAndDefenderImages(){
    $('.current-defender h4').text(defender.health);
    $('.selection h4').text(selection.health);
}


