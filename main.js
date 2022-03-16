var gameData = {
    update: 0.1,
    gold: 0,
    goldPerClick: 1,
    goldPerClickCost: 10
}

function grindGold() {
    gameData.gold += gameData.goldPerClick
    document.getElementById("goldGround").innerHTML = gameData.gold + " Gold"
}

function buyGoldPerClick () {
    if (gameData.gold >= gameData.goldPerClickCost){
        gameData.gold -= gameData.goldPerClickCost
        gameData.goldPerClick += 1
        gameData.goldPerClickCost *= 2
        document.getElementById("goldGround").innerHTML = gameData.gold + " Gold"
        document.getElementById("perClickUpgrade").innerHTML = "Upgrade Sword (Currently Level " + gameData.goldPerClick + ") Cost: " + gameData.goldPerClickCost + " Gold"
    }
}

//pelin tickeri millisekunteina
var mainGameLoop = window.setInterval(function() {
    grindGold()
  }, 1000)

//pelin tallennus
var saveGameLoop = window.setInterval(function() {
    localStorage.setItem("myIncrementalGameSave", JSON.stringify(gameData))
}, 15000)

//pelin lataus
var savegame = JSON.parse(localStorage.getItem("myIncrementalGameSave"))
if (savegame !== null) {
    gameData = savegame
//if (typeof savegame.dwarves !== "undefined") gameData.dwarves = savegame.dwarves;
}