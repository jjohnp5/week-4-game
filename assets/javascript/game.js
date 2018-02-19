var characters = [
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
//render the characters.
for(let char of characters){
    $(".characters").append($(`<img class="img-responsive char" src="${char.img}" alt="${char.name}" >`));
}
$('.char').on('click', function(){
    console.log($(this).attr("alt"))
    characters.forEach((char, index) => {
        if($(this).attr("alt") == char.name){
            console.log($(this).attr("alt"));
            selection = char;
            console.log(selection);
            selectionModel = $(`<img class="img-responsive char-selected" src="${char.img}" alt="${char.name}" >`);
            $('.selection').append(selectionModel);
        }else{
            currentDefenders.push(char);
        }
    })
    console.log(currentDefenders);
    
    $('.char').off().hide();
    renderDefenders();
    $('.char-defenders').on("click", function(){
        var currentThis = $(this);
        currentDefenders.forEach((char, index) => {
            console.log("outside if", currentThis);
            if(currentThis.attr("alt") == char.name){
                console.log("inside if", currentThis);
                defender = char;
                console.log(defender);
                $('.current-defender').append(`<img class="img-responsive char-defender" src="${char.img}" alt="${char.name}" >`)
                currentDefenders.slice(index, 1);
            }
        });
        $('.char-defenders').hide();
    })
    
    
});



var selection = {};
var defender = {};
var currentDefenders = [];
var selectionModel;




function attackHandler(){
    defender.health -= selection.attack;
    selection.attack += selection.attackIncrease;
    selection.health -= defender.cAttack;
    //check if one of chars die.
    if(selection.health <= 0){
        alert('You died! Game Over. Play again.')
    }else if(defender.health <= 0 && currentDefenders.length > 0){
        alert('Defender dead, new defender on the way.');
    }
    else if(currentDefenders.length = 0){
        alert('You killed all defenders! Congratulations!')
    }
}


function renderDefenders(){
    for(let char of currentDefenders){

        $('.defenders').append(`<img class="img-responsive char-defenders" src="${char.img}" alt="${char.name}" >`);
    }
}

function updateCharAndDefenderImages(){
    const mainChar = $('.char-selected');
    const def = $('.char-defender');
}
