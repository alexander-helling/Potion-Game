
// intial store regents
var itemsArray = [
    {    'name': 'blueReg',    'img': './image/blueReg.jpg', 'type': 'reg',  },
    {    'name': 'redReg',    'img': "./image/redReg.jpg",'type': 'reg',     },
    {    'name': 'greenReg',    'img': './image/greenReg.jpg', 'type': 'reg',  },
  ];

// intial inventory
var inventoryArray = [];


// Grab the div with an id of the store and assign to a variable storeShop
var storeShop = document.getElementById('store');
// Create a section element and assign it to a variable grid
var storeGrid = document.createElement('section');
// Give section element a class of grid
storeGrid.setAttribute('class','grid');
//Append the grid section to the game-board div
storeShop.appendChild(storeGrid);


var inventoryBag = document.getElementById('inventory');
var potionBag = document.getElementById('potions');

// buy an item and refresh the inventory on click of regent
storeGrid.addEventListener('click',function(event){
var clicked = event.target;
if (clicked.nodeName === 'SECTION'|| gold <= 0){
  return;
}
var itemName = clicked.dataset.name;
var itemPurchased = itemsArray.filter(item => item.name === itemName);
inventoryArray.push(itemPurchased[0]);
gold -= 50;
refreshInfo();
});



// Loop thorugh each item in our store array
for (i = 0; i < itemsArray.length; i++) {
    // create a div element and assign to variable card
    var storeItem = document.createElement('div');
    // Apply a card class to that div
    storeItem.classList.add('item');
    // set the data-name attribute of the div to the cardsArray name
    storeItem.dataset.name = itemsArray[i].name;
    // add image
    storeItem.style.backgroundImage = `url(${itemsArray[i].img})`;
    // Append card to grid
    storeGrid.appendChild(storeItem);
};



// refreshes current values of info and inventory
var refreshInfo = function(){
var dayCurrent = `Day = ${day}`;
var dayList = document.querySelector("#day");
dayList.innerHTML = dayCurrent;
var goldCurrent = `Gold = ${gold}`;
var goldList = document.querySelector("#gold");
goldList.innerHTML = goldCurrent;

// remove all current inventory and potion items
while (potionBag.firstChild){
  potionBag.removeChild(potionBag.firstChild);
};

while (inventoryBag.firstChild){
  inventoryBag.removeChild(inventoryBag.firstChild);
};


// repopulate inventory and potion items
for (i = 0; i< inventoryArray.length; i++) {
  var inventoryItem = document.createElement('div');
  inventoryItem.classList.add('item');
  inventoryItem.dataset.name = inventoryArray[i].name;
  inventoryItem.style.backgroundImage = `url(${inventoryArray[i].img})`;
  inventoryBag.appendChild(inventoryItem);
};

// repopulate potion items
for (i = 0; i< currentPotionInventory.length; i++) {
  var potionItem = document.createElement('div');
  potionItem.classList.add('itemP');
  potionItem.dataset.name = currentPotionInventory[i].name;
  potionItem.style.backgroundImage = `url(${currentPotionInventory[i].img})`;
  potionBag.appendChild(potionItem);
};
};


// sell item
var sellRegent = function() {
if (inventoryArray.length < 1) {
  return;
};
console.log("Sold Regent");
gold += 50;
inventoryArray.pop();
refreshInfo();
};

// select 2 regent to mix to a potion
count = 0;
var resetSelected = function () {
  count = 0;
  var selected = document.querySelectorAll('.selected',);
  for (i=0; i < selected.length; i++) {
    selected[i].classList.remove('selected');
  }
}

inventoryBag.addEventListener('click',function(event){
  var clickedReg = event.target;
  if (clickedReg.classList[0] === 'item'&& count < 2){
    clickedReg.classList.add('selected');
    count += 1;
  }
  else {
    resetSelected();
    return;
  }
  });

// mix potion result
function mixPotion() {
if (count === 2) {
  regOne = document.querySelectorAll('.selected')[0].dataset.name;
  regTwo = document.querySelectorAll('.selected')[1].dataset.name;
  console.log(regOne,regTwo);
  if (regOne === "blueReg") {
    if (regTwo ==="blueReg") { currentPotionInventory.push(potionComboArray[0])}
    else if (regTwo === "greenReg"){currentPotionInventory.push(potionComboArray[4])}
    else if (regTwo === "redReg"){currentPotionInventory.push(potionComboArray[3])}
  }
  else if (regOne === "redReg"){
  if (regTwo ==="blueReg") {currentPotionInventory.push(potionComboArray[3])}
    else if (regTwo === "greenReg"){currentPotionInventory.push(potionComboArray[5])}
    else if (regTwo === "redReg"){currentPotionInventory.push(potionComboArray[1])}
  }
  else if (regOne === 'greenReg'){
    if (regTwo ==="blueReg") {currentPotionInventory.push(potionComboArray[4])}
    else if (regTwo === "greenReg"){currentPotionInventory.push(potionComboArray[2])}
    else if (regTwo === "redReg"){currentPotionInventory.push(potionComboArray[5])}
  }
}else {
  resetSelected();
return;}

//remove both regents used
inventoryArray.unshift("placeholder");
var arrayValue1 = inventoryArray.map(x => x.name);
var num1 = arrayValue1.indexOf(`${regOne}`);
inventoryArray.splice(num1,1);
var arrayValue2 = inventoryArray.map(x => x.name);
var num2 = arrayValue2.indexOf(`${regTwo}`);
inventoryArray.splice(num2,1);
inventoryArray.shift();
day += 1;
taxMan();
refreshInfo();
resetSelected();
};

//select Potions in bag

countP = 0;
var resetSelectedP = function () {
  countP = 0;
  var selected = document.querySelectorAll('.selectedP',);
  for (i=0; i < selected.length; i++) {
    selected[i].classList.remove('selectedP');
  }
}


potionBag.addEventListener('click',function(event){
  var clickedReg = event.target;
  if (clickedReg.classList[0] === 'itemP'&& countP < 1){
    clickedReg.classList.add('selectedP');
    countP +=1;
  }
  else {
    resetSelectedP();
    return;
  }
  });


// potion results
currentPotionInventory = [];
potionComboArray = [
  {    'name': 'bluePotion',    'img': './image/bluePotion.png', 'type': 'pot',  },
  {    'name': 'redPotion',    'img': './image/redPotion.png', 'type': 'pot', },
  {    'name': 'greenPotion',    'img': './image/greenPotion.png', 'type': 'pot', },
  {    'name': 'purplePotion',    'img': './image/purplePotion.png', 'type': 'pot', },
  {    'name': 'cyanPotion',    'img': './image/cyanPotion.png', 'type': 'pot', },
  {    'name': 'blackPotion',    'img': './image/blackPotion.png', 'type': 'pot', },

];

// potion inventory
// sell potion button
function sellPotion(){
if (countP === 1) {
  //remove potion from inventory
var potionCurrent = document.querySelector(".selectedP").dataset.name;
console.log(potionCurrent)
currentPotionInventory.unshift("placeholder");
potionArray = currentPotionInventory.map(x => x.name );
var num1p = potionArray.indexOf(`${potionCurrent}`);
currentPotionInventory.splice(num1p,1);
currentPotionInventory.shift();
  //add gold
  // day advancer that advances every time you sell a potion
gold += 200;
day += 1;
taxMan();
refreshInfo();
console.log("sold Potion");
}
else {
  console.log("select potion to sell");
  return;
}
};

// taxes every 10 days
function taxMan(){
  if (day % 10 === 0){
    gold -= 250;
    console.log("You have been taxed 250 gold");
  } else {
    return;}
}

//newGame
function newGame() {
  day = 1;
  gold = 250;
  inventoryArray=[];
  currentPotionInventory = [];
  refreshInfo();
  console.log("Game has been reset");
}

//saveGame
function saveGame(){
localStorage.setItem("gold", gold);
localStorage.setItem("day", day);
localStorage.setItem("itemArray", JSON.stringify(inventoryArray));
localStorage.setItem("potionArray",JSON.stringify(currentPotionInventory));
console.log('game has been saved');
}

//loadGame
function loadGame() {
gold = localStorage.getItem("gold") ? localStorage.getItem("gold") : 250 ;
day = localStorage.getItem("day") ? localStorage.getItem("day") : 1 ;
inventoryArray = localStorage.getItem('itemArray') ? JSON.parse(localStorage.getItem('itemArray')) : [];
currentPotionInventory = localStorage.getItem('potionArray') ? JSON.parse(localStorage.getItem('potionArray')) : [];
console.log('game has been loaded');
day = parseInt(day,10);
gold = parseInt(gold,10);
refreshInfo();
}

// Stuff for when page runs
loadGame();