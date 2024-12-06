let trashCleaned =  0;
let trashPerSecond = 0;
let trashStack = 0;
let money = 0;
let DARK_UI = 0;
let gameRunSpeed = 1000;
let clickedSomething = false;
let isOnQuestion = false
let clickPerSecond = 0;
let speedValidated = false




/*
Upgrade tree
- Cost multiplier - - - - - - - - - 0.2.1
    - Cost multiplier level 1
    - Cost multiplier level 2
    - Cost multiplier level 3
    - Cost multiplier level 4
- Production multiplier - - - - - - - 0.1.2
    - Production multiplier level 1
    - Production multiplier level 2
    - Production multiplier level 3
    - Production multiplier level 4
    - Production multiplier level 5
    - Production multiplier level 6
    - Production multiplier level 7
    - Production multiplier level 8
    - Production multiplier level 9
    - Production multiplier level 10
    - Production multiplier level 11
    - Production multiplier level 12
- Efficiency multiplier  - - - - - - 0.2.2.2
    - Efficiency multiplier level 1
    - Efficiency multiplier level 2
    - Efficiency multiplier level 3
    - Efficiency multiplier level 4
    - Efficiency multiplier level 5
    - Efficiency multiplier level 6
- Max sell per sec multiplier - - - - 0.2.1
    - Max sell per sec multiplier level 1
    - Max sell per sec multiplier level 2
    - Max sell per sec multiplier level 3
    - Max sell per sec multiplier level 4
    - Max sell per sec multiplier level 5
    - Max sell per sec multiplier level 6

upgrade menu 0
    fast  0.1
        faster 0.1.1
            individual 0.1.1.1
            all 0.1.1.2
        more 0.1.2
            individual 0.1.2.1
            all 0.1.2.2
    cheap 0.2
        cheaper 0.2.1
            individual 0.2.1.1
            all 0.2.1.2
        efficient 0.2.2
            individual 0.2.2.1
            all 0.2.2.2
*/
// upgrade Class

class Upgrade {
    constructor(name, effect, cost, unlockedAt, unlocked, bought) {
        this.name = name;
        this.effect = effect;
        this.cost = cost;
        this.unlockedAt = unlockedAt;
        this.unlocked = unlocked;
        this.bought = bought;
    }
    buy() {
        if (money >= this.cost && this.unlocked) {
            window.dispatchEvent(new CustomEvent("moneyUpdate", {
                detail: {
                    money: -this.cost,
                    sell: false
                }
            }))
            this.name *= this.effect;
            this.bought = true;
        }
    }
}

// Upgrade Constants
//const costMultiplier = new Upgrade("CostMultiplier", [1,2,3,4,5], [1,0.9,0.75,0.55,0.40], [0,4000,8000,12000,16000]);




// catcher Upgrade

let costMultiplierLevel = [1,0.9,0.75,0.55] // the multiplier of the cost of the catcher
let costMultiplierLevelCost = [100,500,1000,2500]; // the cost of the multiplier
let costMultiplier = 0; // the current global multiplier
let costMultiplierTab = [0,0,0,0,0,0,0,0,0,0,0,0,0] // the current level of individual multiplier

let productionMultiplierLevel = [1,1.5,2,4,6,9,12,15,18,21,24,27]; // the multiplier of the amount of trash that can be cleaned
let productionMultiplierLevelCost = [100,500,1000,2000,4000,8000,16000,32000,64000,128000,256000,512000]; // the cost of the multiplier
let productionMultiplier = 1; // the current global multiplier
let productionMultiplierTab = [1,1,1,1,1,1,1,1] // the current level of individual multiplier

// seller Upgrade

let efficiencyMultiplierLevel = [1,1.5,2,3,4,5,6]; // the mutliplier of the amount of money that can be made of trash
let efficiencyMultiplierLevelCost = [100,500,1000,2000,4000,8000,16000]; // the cost of the multiplier
let efficiencyMultiplier = 1; // the current global multiplier
let efficiencyMultiplierTab = [1,1,1,1,1,1,1,1] // the current level of individual multiplier

let maxSellPerSecMultiplierLevel = [1,1.5,2,3,4,5,6]; // the multiplier of the amount of trash that can be sold per second
let maxSellPerSecMultiplierLevelCost = [100,500,1000,2000,4000,8000,16000]; // the cost of the multiplier
let maxSellPerSecMultiplier = 1; // the current global multiplier
let maxSellPerSecMultiplierTab = [1,1,1,1,1,1,1,1] // the current level of individual multiplier

// Upgrade menu unlocked at
let upgradeMenuUnlockedAt = 200; // clean 1000 trash to unlock the upgrade menu
let upgradeCheapUnlockedAt = 4000; // clean 1000 trash to unlock the upgrade cheap menu
let upgradeFastUnlockedAt = 4000; // clean 1000 trash to unlock the upgrade fast menu
let upgradeFasterUnlockedAt = 8000; // clean 1000 trash to unlock the upgrade faster menu
let upgradeMoreUnlockedAt = 32000; // clean 1000 trash to unlock the upgrade more menu
let upgradeCheaperUnlockedAt = 8000; // clean 1000 trash to unlock the upgrade cheaper menu
let upgradeEfficientUnlockedAt = 32000; // clean 1000 trash to unlock the upgrade efficient menu
let upgradeGlobalUnlockedAt = 8000; // clean 1000 trash to unlock the upgrade faster global menu
let upgradeIndividualsUnlockedAt = [40000,80000,160000.320000,640000,1280000,2560000,5120000,10240000,20480000,20480000,20480000]; // clean 1000 trash to unlock the upgrade levels menu


// Upgrade menu unlocked
let upgradeMenuUnlocked = false;


// First Rank upgrade

let upgradeCheapUnlocked = false;
let upgradeFastUnlocked = false;


// Second Rank upgrade

let upgradeFasterUnlocked = false;
let upgradeMoreUnlocked = false;
let upgradeCheaperUnlocked = false;
let upgradeEfficientUnlocked = false;


// Third Global Rank upgrade

let upgradeFasterGlobalUnlocked = false;
let upgradeMoreGlobalUnlocked = false;
let upgradeCheaperGlobalUnlocked = false;
let upgradeEfficientGlobalUnlocked = false;


// Third Individual Rank upgrade

let upgradeFasterIndividualUnlocked = false;
let upgradeMoreIndividualUnlocked = false;
let upgradeCheaperIndividualUnlocked = false;
let upgradeEfficientIndividualUnlocked = false;






// Upgrade menu unlocked
function unlockUpgradeMenu() {
    let upgradeMenu = document.getElementById("upgradeMenu");

    let upgradeFast = document.getElementById("upgradeFast");
    let upgradeFaster = document.getElementById("upgradeFaster");
    let upgradeMore = document.getElementById("upgradeMore");


    let upgradeCheap = document.getElementById("upgradeCheap");
    let upgradeCheaper = document.getElementById("upgradeCheaper");
    let upgradeEfficient = document.getElementById("upgradeEfficient");


    let upgradeFasterGlobal = document.getElementById("upgradeFasterGlobal");
    let upgradeMoreGlobal = document.getElementById("upgradeMoreGlobal");
    let upgradeCheaperGlobal = document.getElementById("upgradeCheaperGlobal");
    let upgradeEfficientGlobal = document.getElementById("upgradeEfficientGlobal");


    let upgradeFasterIndividual = document.getElementById("upgradeFasterIndividual");
    let upgradeMoreIndividual = document.getElementById("upgradeMoreIndividual");
    let upgradeCheaperIndividual = document.getElementById("upgradeCheaperIndividual");
    let upgradeEfficientIndividual = document.getElementById("upgradeEfficientIndividual");



    if (trashCleaned >= upgradeMenuUnlockedAt) {
        upgradeMenu.style.display = "block";


        if (trashCleaned >= upgradeFastUnlockedAt && upgradeMenuUnlocked === true) {
            upgradeFast.style.display = "block";

            if (trashCleaned >= upgradeFasterUnlockedAt && upgradeFastUnlocked === true) {
                upgradeFaster.style.display = "block";

                if (trashCleaned >= upgradeGlobalUnlockedAt && upgradeFasterUnlocked === true) {
                    upgradeFasterGlobal.style.display = "block";
                }else {
                    upgradeFasterGlobal.style.display = "none";
                }

                if (trashCleaned >= upgradeIndividualsUnlockedAt && upgradeFasterUnlocked === true) {
                    upgradeFasterIndividual.style.display = "block";
                }else {
                    upgradeFasterIndividual.style.display = "none";
                }
            }else {
                upgradeFaster.style.display = "none";
            }



            if (trashCleaned >= upgradeMoreUnlockedAt && upgradeFastUnlocked === true) {
                upgradeMore.style.display = "block";

                if (trashCleaned >= upgradeGlobalUnlockedAt && upgradeMoreUnlocked === true) {
                    upgradeMoreGlobal.style.display = "block";
                }else {
                    upgradeMoreGlobal.style.display = "none";
                }

                if (trashCleaned >= upgradeIndividualsUnlockedAt && upgradeMoreUnlocked === true) {
                    upgradeMoreIndividual.style.display = "block";
                }else {
                    upgradeMoreIndividual.style.display = "none";
                }
            } else {
                upgradeMore.style.display = "none";
            }
        } else {
            upgradeFast.style.display = "none";
        }



        if (trashCleaned >= upgradeCheapUnlockedAt && upgradeMenuUnlocked === true) {
            upgradeCheap.style.display = "block";
            if (trashCleaned >= upgradeEfficientUnlockedAt && upgradeCheapUnlocked === true) {
                upgradeEfficient.style.display = "block";

                if (trashCleaned >= upgradeGlobalUnlockedAt && upgradeEfficientUnlocked === true) {
                    upgradeEfficientGlobal.style.display = "block";
                }else {
                    upgradeEfficientGlobal.style.display = "none";
                }

                if (trashCleaned >= upgradeIndividualsUnlockedAt && upgradeEfficientUnlocked === true) {
                    upgradeEfficientIndividual.style.display = "block";
                } else {
                    upgradeEfficientIndividual.style.display = "none";
                }
            }else {
                upgradeEfficient.style.display = "none";
            }


            if (trashCleaned >= upgradeCheaperUnlockedAt && upgradeCheapUnlocked === true) {
                upgradeCheap.style.display = "block";

                if (trashCleaned >= upgradeGlobalUnlockedAt && upgradeCheaperUnlocked === true) {
                    upgradeCheaperGlobal.style.display = "block";
                } else {
                    upgradeCheaperGlobal.style.display = "none";
                }

                if (trashCleaned >= upgradeIndividualsUnlockedAt && upgradeCheaperUnlocked === true) {
                    upgradeCheaperIndividual.style.display = "block";
                } else {
                    upgradeCheaperIndividual.style.display = "none";
                }
            } else {
                upgradeCheap.style.display = "none";
            }
        } else {
            upgradeCheap.style.display = "none";
        }

    } else {
        upgradeMenu.style.display = "none";
    }
}




function initializeUpgrade() {


}











let hundred = 0;
let ten = 0;
let unit = 0;
let multiplier = 1;

const ColorValues = {
    PINK: 0,
    BROWN: 1,
    RED: 2,
    GOLD: 3,
    YELLOW: 4,
    GREEN: 5,
    BLUE: 6,
    PURPLE: 7,
    GREY: 8,
    WHITE: 9
};

let clickItem = document.getElementById("clickItem")
let fakeClickItem = document.getElementById("fakeClickItem")
let darkUxCheckBox = document.getElementById("darkUxCheckBox")


class TrashSellerObjet {
    name = "";
    sellRation = 0;
    maxSellPerSec = 0;
    unlockedAt = 0;
    unlocked = false;
    intervalId = -Infinity;

    constructor(name, SellRatio, MaxSellPerSec, UnlockedAt) {
        this.name = name;
        this.sellRation = SellRatio;
        this.maxSellPerSec = MaxSellPerSec;
        this.unlockedAt = UnlockedAt;
    }
    sell() {
        this.intervalId = setInterval(() => {
            if (this.unlocked) {
                for (let i = 0; i < this.maxSellPerSec; i++) {
                    if (trashStack >= this.sellRation) {
                        window.dispatchEvent(new CustomEvent("trashUpdate", {
                            detail: {
                                trash: -this.sellRation,
                                removeBase: false
                            }
                        }))
                        window.dispatchEvent(new CustomEvent("moneyUpdate", {
                            detail: {
                                money: 1,
                                sell: true
                            }
                        }))
                        document.getElementById("Money").innerText = money;
                    }
                }
            }
        }, 1000)
    }

    stop() {
        clearInterval(this.intervalId)
    }
}
// Trash sellers constants
const incinerator = new TrashSellerObjet("Incinerator", 1, 10, 0);
const trashFactory = new TrashSellerObjet("TrashFactory", 2, 50, 100);
const recyclingPlant = new TrashSellerObjet("RecyclingPlant", 5, 100, 1000);
const TrashFactoryMkII = new TrashSellerObjet("Trash Factory MkII", 10, 200, 10000);
const recyclingPlantMkII = new TrashSellerObjet("Recycling Plant MkII", 20, 500, 100000);
const trashFactoryMkIII = new TrashSellerObjet("Trash Factory MkIII", 50, 1000, 1000000);
const recyclingPlantMkIII = new TrashSellerObjet("Recycling Plant MkIII", 100, 2000, 10000000);

const trashSellerObjects = [incinerator, trashFactory, recyclingPlant, TrashFactoryMkII, recyclingPlantMkII, trashFactoryMkIII, recyclingPlantMkIII];






class TrashCleanerObject {

    name = "";
    timeBetweenProduction = 0;
    basePrice = 0;
    multiplierPrice =0;
    count = 0;
    unlockAt = 0;
    unlocked = false;
    maxNumber = 0;
    production = 0;
    intervalId = -Infinity;

    constructor(name, basePrice, multiplierPrice, unlockAt, timeBetweenProduction, maxNumber, production=1) {
        this.name = name;
        this.basePrice = basePrice;
        this.multiplierPrice = multiplierPrice;
        this.unlockAt = unlockAt
        this.timeBetweenProduction = timeBetweenProduction;
        this.maxNumber = maxNumber
        this.production = production
    }


    run() {
        this.intervalId = setInterval(() => {
            if (this.count !== 0) {
                window.dispatchEvent(new CustomEvent("trashUpdate", {
                    detail: {
                        trash: (gameRunSpeed/this.timeBetweenProduction)*this.production*this.count,
                    }
                }))
            }
        }, gameRunSpeed)
    }

    stop() {
        clearInterval(this.intervalId)
    }

    calculatePrice() {
        //return Math.pow(this.basePrice * this.multiplierPrice, this.count);
        return this.basePrice * Math.pow(this.multiplierPrice, this.count)
    }
    buy() {
        if (money >= this.calculatePrice() && this.count < this.maxNumber) {
            window.dispatchEvent(new CustomEvent("moneyUpdate", {
                detail: {
                    money: -this.calculatePrice(),
                    sell: false
                }
            }))

            this.count++;
            document.getElementById(`${this.name}Count`).innerText = this.count;
            document.getElementById(`${this.name}Production`).innerText = 1000 * this.production / this.timeBetweenProduction * this.count
        }
    }


}
// Trash cleaner constants
const MULTIPLIER = 1.15;
const smallNet = new TrashCleanerObject("Small Net", 5, MULTIPLIER, 50, 5000, 100)
const bigNet = new TrashCleanerObject("Big Net", 20, MULTIPLIER, 200, 2500, 100)
const hugeNet = new TrashCleanerObject("Huge Net", 50, MULTIPLIER, 500, 1000, 100)
const fullNet = new TrashCleanerObject("Full Net", 100, MULTIPLIER, 1000, 500, 100)
const smallSeaNet = new TrashCleanerObject("Small Sea Net", 200, MULTIPLIER, 2000, 250, 100)
const bigSeaNet = new TrashCleanerObject("Big Sea Net", 500, MULTIPLIER, 5000, 100, 100)
const hugeSeaNet = new TrashCleanerObject("Huge Sea Net", 1000, MULTIPLIER, 10000, 50, 100)
const smallBoat = new TrashCleanerObject("Small Boat", 2000, MULTIPLIER, 20000, 25, 100)
const internationalRegulation = new TrashCleanerObject("International Regulation", 5000, MULTIPLIER, 50000, 10, 1)
const mediumBoat = new TrashCleanerObject("Medium Boat", 10000, MULTIPLIER, 100000, 5, 100)
const internationalHelp = new TrashCleanerObject("International Help", 20000, MULTIPLIER, 200000, 2, 1)
const bigBoat = new TrashCleanerObject("Big Boat", 50000, MULTIPLIER, 500000, 1, 100)
const everyoneIsHelping = new TrashCleanerObject("Everyone is Helping", 100000, MULTIPLIER, 1000000, 1, 1 ,2)

const trashCleanerObjects = [smallNet, bigNet, hugeNet, fullNet, smallSeaNet, bigSeaNet, hugeSeaNet, smallBoat, internationalRegulation, mediumBoat, internationalHelp, bigBoat, everyoneIsHelping]

// Trash catcher ----------------------------------------------------------------------------

function initializeCatchers() {
    const tableBody = document.getElementById("catcherTableBody");
    trashCleanerObjects.forEach(catcher => {
        let row = document.createElement("tr");
        row.id = `${catcher.name}Row`

        const nameCell = document.createElement("td");
        nameCell.innerText = catcher.name;
        row.appendChild(nameCell);

        const buyCell = document.createElement("td");
        const buyButton = document.createElement("button");
        buyButton.innerText = `Buy (${catcher.calculatePrice()})`;
        buyButton.onclick = () => {
            catcher.buy();
            buyButton.innerText = `Buy (${catcher.calculatePrice()})`;
        };
        buyCell.appendChild(buyButton);
        row.appendChild(buyCell);

        const productionCell = document.createElement("td");
        productionCell.id = `${catcher.name}Production`
        productionCell.innerText = 1000 * catcher.production / catcher.timeBetweenProduction;
        row.appendChild(productionCell);

        const countCell = document.createElement("td");
        countCell.id = `${catcher.name}Count`;
        countCell.innerText = catcher.count;
        row.appendChild(countCell);
        tableBody.appendChild(row);
        unlockCatcher(catcher)
        catcher.run();
    });
}

function unlockCatcher(catcher) {
    if (catcher.unlocked) {
        return
    }
    let row = document.getElementById(`${catcher.name}Row`)
    if (!catcher.unlocked && trashCleaned < catcher.unlockAt) {
        row.style.display = "none";
    } else if (!catcher.unlocked && trashCleaned >= catcher.unlockAt) {
        catcher.unlocked = true
        row.style.display = "table-row";
    }
}

function unlockAllCatchers() {
    trashCleanerObjects.forEach(catcher => {
        unlockCatcher(catcher)
    })
}

// Trash seller ----------------------------------------------------------------------------

function initializeSellers() {
    const tableBody = document.getElementById("sellerTableBody");
    trashSellerObjects.forEach(seller => {
        let row = document.createElement("tr");
        row.id = `${seller.name}Row`

        const nameCell = document.createElement("td");
        nameCell.innerText = seller.name;
        row.appendChild(nameCell);

        const maxSellPerSecCell = document.createElement("td");
        maxSellPerSecCell.innerText = seller.maxSellPerSec;
        row.appendChild(maxSellPerSecCell);

        const sellRationCell = document.createElement("td");
        sellRationCell.innerText = seller.sellRation;
        row.appendChild(sellRationCell);

        tableBody.appendChild(row);
        unlockSeller(seller)
        seller.sell()
    });

}

function unlockSeller(seller) {
    if (seller.unlocked) {
        return
    }
    let row = document.getElementById(`${seller.name}Row`)
    if (!seller.unlocked && trashCleaned < seller.unlockedAt) {
        row.style.display = "none";
    }else if (trashCleaned >= seller.unlockedAt) {
        seller.unlocked = true
        let row = document.getElementById(`${seller.name}Row`)
        row.style.display = "table-row"
    }
}

function unlockAllSellers() {
    trashSellerObjects.forEach(seller => {
        unlockSeller(seller)
    })
}

// General functions ----------------------------------------------------------------------------

function convertNumberToStandard(number) {
    if (number <= 1) return number
    const suffixes = ["", "", "", "B", "T", "Qa", "Qi", "Sx", "Sp", "Oc", "No", "Dc"] //TODO: Add more suffixes
    const suffixIndex = Math.floor(Math.log10(number) / 3)
    const suffix = suffixes[suffixIndex]
    if (suffix === "") {
        return number
    }
    const numberToDisplay = number / Math.pow(10, suffixIndex*3)
    return `${numberToDisplay.toFixed(2)} ${suffix}`
}

function teleportBlocks() {
    for (let elt of [clickItem, fakeClickItem]) {
        if (elt.style.position !== "absolute") {
            elt.style.position = "absolute"
            if (elt === fakeClickItem) {
                elt.style.display = "block"
            }
        }
        elt.style.top = Math.random() * 100 + "%"
        elt.style.left = Math.random() * 100 + "%"
    }
}


function setColor(colorName, bandId) {
    const colorValue = ColorValues[colorName];
    document.getElementById(bandId).style.backgroundColor = colorName.toLowerCase();
    if (bandId === 'band1') {
        hundred = colorValue;
    } else if (bandId === 'band2') {
        ten = colorValue;
    } else if (bandId === 'band3') {
        unit = colorValue;
    } else if (bandId === 'band4') {
        setMultiplier(colorValue);
    }
    calculateSpeed();
}

function setMultiplier(value) {
    multiplier = value;
    calculateSpeed();
}

function calculateSpeed() {
    const speed = (hundred * 100 + ten * 10 + unit) * multiplier;
    gameRunSpeed = speed;
    for (let catcher of trashCleanerObjects) {
        if (catcher.intervalId !== -Infinity) catcher.stop()
        catcher.run()
    }
    for (let seller of trashSellerObjects) {
        if (seller.intervalId !== -Infinity) seller.stop()
        seller.sell()
    }
}

function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

// Event listeners ----------------------------------------------------------------------------

window.addEventListener("trashUpdate", (event) => {
    let trash = event.detail.trash
    let removeBase = event.detail.removeBase
    if (removeBase === undefined) {
        removeBase = true
    }
    if (removeBase) {
        trashCleaned += trash
    }
    trashStack += trash
    if (removeBase) {
        document.getElementById("trashCount").innerText = convertNumberToStandard(trashCleaned)
    }
    document.getElementById("trashStack").innerText = convertNumberToStandard(trashStack)
    let trashPerSecond = 0
    for (let catcher of trashCleanerObjects) {
        trashPerSecond += 1000 * catcher.production / catcher.timeBetweenProduction * catcher.count
    }
    document.getElementById("trashPerSecond").innerText = trashPerSecond;

    unlockAllCatchers()
    unlockAllSellers()
})

window.addEventListener("moneyUpdate", (event) => {
    let sold = event.detail.sell
    if (sold) {
        money += 1;
    } else {
        money += event.detail.money
    }
    document.getElementById("Money").innerText = money;
})


clickItem.addEventListener("click", () => {
    if (!speedValidated) return;
    // Dark UI
    if (DARK_UI){
        let msg = ""
        while(msg !== "Y" && msg !== "Yes") {
            msg = prompt("Are you sure you want to click ? Type 'Y' for yes and 'Yes' for no", "Yes")
        }
        if (msg === "Yes") {
            return;
        }

        teleportBlocks()

    }
    window.dispatchEvent(new CustomEvent("trashUpdate", {
        detail: {
            trash: 1,
        },
    }))



    const smallNetRiverSection = document.getElementById("smallNetRiverSection");
    if (smallNetRiverSection.style.display === "block") {
        return;
    }
    if (trashCleaned >= 20) {
        smallNetRiverSection.style.display = "block";
    } else {
        smallNetRiverSection.style.display = "none";
    }
})

fakeClickItem.addEventListener("click", () => {
    window.dispatchEvent(new CustomEvent("trashUpdate", {
        detail: {
            trash: -1,
        },
    }))

    teleportBlocks()
})

darkUxCheckBox.addEventListener("click", (event) => {
    let stylesCircle = window.getComputedStyle(darkUxCheckBox, ":after")
    let stylesGreen = window.getComputedStyle(darkUxCheckBox, ":before")
    let contentCircle = parseInt(stylesCircle["transform"].split(",")[4])
    let contentGreen = parseInt(stylesGreen["transform"].split(",")[4])
    let rect = darkUxCheckBox.getBoundingClientRect()
    let startGreenRect = rect.left + contentGreen
    let endGreenRect = startGreenRect + parseInt(stylesGreen["width"].replaceAll("px", ""))
    let centerCircle = rect.left + contentCircle + parseInt(stylesCircle["width"].replaceAll("px", "")) / 2
    if (centerCircle >= startGreenRect && centerCircle <= endGreenRect) {
        DARK_UI = !DARK_UI
        document.getElementById("darkUxActual").innerText = (DARK_UI) ? "Disable" : "Enable"
    }
})

document.getElementById("validButton").addEventListener("click", () => {
    document.getElementById("resistorDiv").style.display = "none";
    speedValidated = true
})

window.addEventListener("click", () => {
    clickedSomething = true;
    clickPerSecond++
})


window.addEventListener("DOMContentLoaded", () => {
    initializeCatchers()
    initializeSellers()

    setInterval(() => {
        if (DARK_UI && !clickedSomething && !isOnQuestion) {
            isOnQuestion = true
            let a = random(5, 250)
            let b = random(5, 250)
            let res = parseInt(prompt(`Are you here ? To be sure you are concentrate, please respond to this simple addition : ${a} + ${b} :`))
            if (res !== a + b) {
                alert("You are not concentrate, Bye Bye")
                window.location.href = "https://www.youtube.com/watch?v=aANye84HC_I"
                return
            }
            setTimeout(() => {
                isOnQuestion = false
            }, 3000)
        }
        clickedSomething = false
    }, 10000)
    setInterval(() => {
        if (clickPerSecond > 30) {
            window.dispatchEvent(new CustomEvent("trashUpdate", {
                detail: {
                    trash: -10000000000,
                }
            }))
            window.dispatchEvent(new CustomEvent("moneyUpdate", {
                detail: {
                    money: -10000000000,
                }
            }))
        }
        clickPerSecond = 0
    }, 1000)

})
