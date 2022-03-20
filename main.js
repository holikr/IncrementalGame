//pelin lataus
 var savegame = JSON.parse(localStorage.getItem("myIncrementalGameSave"))
 if (savegame !== null) {
     gameData = savegame
 }

var gameData = {
    gold: 0.0,
    goldPerClickTotal: 1.0,
    goldPerSecondTotal: 0.0,
    lastTick: Date.now(),

    goldPerClickSword: 0.0,
    goldPerSecondSword: 0.0,
    goldPerClickCostSword: 10,
    swordLevel: 0,
    swordTier: "Wooden Sword",
    swordMulti: 1,

    goldPerClickAxe: 0,
    goldPerSecondAxe: 0.0,
    goldPerClickCostAxe: 1000,
    axeLevel: 0,
    axeTier: "Wooden Axe",
    axeMulti: 1,

    goldPerClickBow: 0,
    goldPerSecondBow: 0.0,
    goldPerClickCostBow: 5000,
    bowLevel: 0,
    bowTier: "Wooden Bow",
    bowMulti: 1
}

function update(id, content) {
    document.getElementById(id).innerHTML = content;
}

function grindGold() {
    gameData.gold += gameData.goldPerClickTotal
    update("goldGround", format(gameData.gold, "scientific") + " Gold")
}

function buySwordLevel() {
    if (gameData.gold >= gameData.goldPerClickCostSword){
        gameData.gold -= gameData.goldPerClickCostSword
        gameData.goldPerClickSword += (2.0 * gameData.swordMulti)
        gameData.goldPerClickTotal += (2.0 * gameData.swordMulti)
        gameData.goldPerClickCostSword *= 1.5
        gameData.swordLevel += 1
        gameData.goldPerSecondSword += (2.0 * gameData.swordMulti)
        gameData.goldPerSecondTotal += (2.0 * gameData.swordMulti)
        update("goldGround", format(gameData.gold, "scientific") + " Gold")
        update("swordPerClickLevel", gameData.swordTier + " (Level " + gameData.swordLevel + ") Cost: " + format(gameData.goldPerClickCostSword, "scientific") + " Gold")
        update("goldPerSecondTotal", format(gameData.goldPerSecondTotal, "scientific") + " Gold Per Second")
        update("goldPerClickTotal", format(gameData.goldPerClickTotal, "scientific") + " Gold Per Click")
        if (gameData.swordLevel >= 10) {
            document.getElementById("swordUpgrade").disabled = false
        }
    }
}

function buySwordUpgrade() {
    if (gameData.gold >= 1000.0 & gameData.swordLevel >= 10) {
        gameData.swordTier = "Copper Sword"
        gameData.gold -= 100.0
        gameData.swordMulti += 1
        if (gameData.goldPerClickSword != 0) {
            gameData.goldPerClickSword = gameData.goldPerClickSword * gameData.swordMulti
            gameData.goldPerClickTotal = 1 + gameData.goldPerClickSword + gameData.goldPerClickAxe + gameData.goldPerClickBow
        }
        gameData.goldPerSecondSword = gameData.goldPerSecondSword * gameData.swordMulti
        gameData.goldPerSecondTotal = gameData.goldPerSecondSword + gameData.goldPerSecondAxe + gameData.goldPerSecondBow
        update("goldGround", format(gameData.gold, "scientific") + " Gold")
        update("swordPerClickLevel", gameData.swordTier + " (Level " + gameData.swordLevel + ") Cost: " + format(gameData.goldPerClickCostSword, "scientific") + " Gold")
        update("goldPerSecondTotal", format(gameData.goldPerSecondTotal, "scientific") + " Gold Per Second")
        update("goldPerClickTotal", format(gameData.goldPerClickTotal, "scientific") + " Gold Per Click")
        document.getElementById("swordUpgrade").remove()
     }
 }

function buyAxeLevel() {
    if (gameData.gold >= gameData.goldPerClickCostAxe){
        gameData.gold -= gameData.goldPerClickCostAxe
        gameData.goldPerClickAxe += (5.0 * gameData.axeMulti)
        gameData.goldPerClickTotal += (5.0 * gameData.axeMulti)
        gameData.goldPerClickCostAxe *= 1.5
        gameData.axeLevel += 1
        gameData.goldPerSecondAxe += (5.0 * gameData.axeMulti)
        gameData.goldPerSecondTotal += (5.0 * gameData.axeMulti)
        update("goldGround", format(gameData.gold, "scientific") + " Gold")
        update("axePerClickLevel", gameData.axeTier + " (Level " + gameData.axeLevel + ") Cost: " + format(gameData.goldPerClickCostAxe, "scientific") + " Gold")
        update("goldPerSecondTotal", format(gameData.goldPerSecondTotal, "scientific") + " Gold Per Second")
        update("goldPerClickTotal", format(gameData.goldPerClickTotal, "scientific") + " Gold Per Click")
    }
}

function buyAxeUpgrade() {
    if (gameData.gold >= 10000.0 & gameData.axeLevel >= 10) {
        gameData.axeTier = "Copper Axe"
        gameData.gold -= 10000.0
        gameData.axeMulti += 1
        if (gameData.goldPerClickAxe != 0) {
            gameData.goldPerClickAxe = gameData.goldPerClickAxe * gameData.axeMulti
            gameData.goldPerClickTotal = 1 + gameData.goldPerClickSword + gameData.goldPerClickAxe + gameData.goldPerClickBow
        }
        gameData.goldPerSecondAxe = gameData.goldPerSecondAxe * gameData.axeMulti
        gameData.goldPerSecondTotal = gameData.goldPerSecondSword + gameData.goldPerSecondAxe + gameData.goldPerSecondBow
        update("goldGround", format(gameData.gold, "scientific") + " Gold")
        update("axePerClickLevel", gameData.axeTier + " (Level " + gameData.axeLevel + ") Cost: " + format(gameData.goldPerClickCostAxe, "scientific") + " Gold")
        update("goldPerSecondTotal", format(gameData.goldPerSecondTotal, "scientific") + " Gold Per Second")
        update("goldPerClickTotal", format(gameData.goldPerClickTotal, "scientific") + " Gold Per Click")
        document.getElementById("axeUpgrade").remove()
     }
 }

function buyBowLevel() {
    if (gameData.gold >= gameData.goldPerClickCostBow){
        gameData.gold -= gameData.goldPerClickCostBow
        gameData.goldPerClickBow += (10.0 *gameData.bowMulti)
        gameData.goldPerClickTotal += (10.0 * gameData.bowMulti)
        gameData.goldPerClickCostBow *= 1.5
        gameData.bowLevel += 1
        gameData.goldPerSecondBow += (10.0 *gameData.bowMulti)
        gameData.goldPerSecondTotal += (10.0 *gameData.bowMulti)
        update("goldGround", format(gameData.gold, "scientific") + " Gold")
        update("bowPerClickLevel", gameData.bowTier + " (Level " + gameData.bowLevel + ") Cost: " + format(gameData.goldPerClickCostBow, "scientific") + " Gold")
        update("goldPerSecondTotal", format(gameData.goldPerSecondTotal, "scientific") + " Gold Per Second")
        update("goldPerClickTotal", format(gameData.goldPerClickTotal, "scientific") + " Gold Per Click")
    }
}

function buyBowUpgrade() {
    if (gameData.gold >= 50000.0 & gameData.bowLevel >= 10) {
        gameData.bowTier = "Copper Bow"
        gameData.gold -= 50000.0
        gameData.bowMulti += 1
        if (gameData.goldPerClickBow != 0) {
            gameData.goldPerClickBow = gameData.goldPerClickBow * gameData.bowMulti
            gameData.goldPerClickTotal = 1 + gameData.goldPerClickSword + gameData.goldPerClickAxe + gameData.goldPerClickBow
        }
        gameData.goldPerSecondBow = gameData.goldPerSecondBow * gameData.bowMulti
        gameData.goldPerSecondTotal = gameData.goldPerSecondSword + gameData.goldPerSecondAxe + gameData.goldPerSecondBow
        update("goldGround", format(gameData.gold, "scientific") + " Gold")
        update("bowPerClickLevel", gameData.bowTier + " (Level " + gameData.bowLevel + ") Cost: " + format(gameData.goldPerClickCostBow, "scientific") + " Gold")
        update("goldPerSecondTotal", format(gameData.goldPerSecondTotal, "scientific") + " Gold Per Second")
        update("goldPerClickTotal", format(gameData.goldPerClickTotal, "scientific") + " Gold Per Click")
        document.getElementById("bowUpgrade").remove()
     }
 }

//pelin tickeri millisekunteina
var mainGameLoop = window.setInterval(function() {
    diff = Date.now() - gameData.lastTick;
    gameData.lastTick = Date.now()
    gameData.gold += gameData.goldPerSecondTotal
    update("goldGround", format(gameData.gold, "scientific") + " Gold")
  }, 1000)

//pelin tallennus
var saveGameLoop = window.setInterval(function() {
    localStorage.setItem("myIncrementalGameSave", JSON.stringify(gameData))
}, 15000)

function format(number, type) {
	let exponent = Math.floor(Math.log10(number))
	let mantissa = number / Math.pow(10, exponent)
	if (exponent < 6) return number.toFixed(1)
	if (type == "scientific") return mantissa.toFixed(2) + "e" + exponent
	if (type == "engineering") return (Math.pow(10, exponent % 3) * mantissa).toFixed(2) + "e" + (Math.floor(exponent / 3) * 3)
}


if (typeof saveGame.gold !== "undefined") gameData.gold = saveGame.gold;
if (typeof saveGame.goldPerClickTotal !== "undefined") gameData.goldPerClickTotal = saveGame.goldPerClickTotal;
if (typeof saveGame.goldPerClickSword !== "undefined") gameData.goldPerClickSword = saveGame.goldPerClickSword;
if (typeof saveGame.goldPerClickAxe !== "undefined") gameData.goldPerClickAxe = saveGame.goldPerClickAxe;
if (typeof saveGame.goldPerClickBow !== "undefined") gameData.goldPerClickBow = saveGame.goldPerClickBow;
if (typeof saveGame.goldPerClickCostSword !== "undefined") gameData.goldPerClickCostSword = saveGame.goldPerClickCostSword;
if (typeof saveGame.goldPerClickCostAxe !== "undefined") gameData.goldPerClickCostAxe = saveGame.goldPerClickCostAxe;
if (typeof saveGame.goldPerClickCostBow !== "undefined") gameData.goldPerClickCostBow = saveGame.goldPerClickCostBow;
if (typeof saveGame.lastTick !== "undefined") gameData.lastTick = saveGame.lastTick;