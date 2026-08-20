/*
=========================================
MAIN GAME / SAVE SYSTEM
=========================================
*/


/*
The player variable will hold the
CURRENTLY LOADED player's information.
*/

let player = null;


/*
This tells us which of the three
save files we're currently playing.
*/

let activeSaveSlot = null;


/*
=========================================
SAVE SLOT NAMES
=========================================

localStorage needs a text name for
every piece of saved information.

Save 1 becomes:
privateGachaSave_1

Save 2 becomes:
privateGachaSave_2

Save 3 becomes:
privateGachaSave_3
*/


function getSaveName(slot) {

  return "privateGachaSave_" + slot;

}


/*
=========================================
CREATE / LOAD SAVE
=========================================
*/


function loadSave(slot) {

  const saveName = getSaveName(slot);

  const savedData = localStorage.getItem(saveName);


  /*
  If the save already exists...
  */

  if (savedData !== null) {

    try {

      player = JSON.parse(savedData);

    } catch (error) {

      alert(
        "Save " +
        slot +
        " appears to be damaged."
      );

      console.error(error);

      return;

    }

  }


  /*
  If the slot is empty,
  create a brand-new player.
  */

  else {

    player = createDefaultPlayer();

  }


  /*
  Remember which save we're playing.
  */

  activeSaveSlot = slot;


  /*
  Immediately save it.

  This means loading an empty slot
  officially creates that save file.
  */

  saveGame();


  /*
  Update everything shown on screen.
  */

  updateScreen();

  updateSaveSlotInfo();


  document.getElementById(
    "saveStatus"
  ).textContent =
    "Save " + slot + " loaded";

}


/*
=========================================
SAVE CURRENT GAME
=========================================
*/


function saveGame() {

  /*
  Don't save if nothing is loaded.
  */

  if (
    player === null ||
    activeSaveSlot === null
  ) {

    return;

  }


  /*
  Record when we saved.
  */

  player.lastSavedAt = Date.now();


  /*
  Turn the JavaScript object into text.
  */

  const saveText = JSON.stringify(player);


  /*
  Put that text into browser storage.
  */

  localStorage.setItem(

    getSaveName(activeSaveSlot),

    saveText

  );


  document.getElementById(
    "saveStatus"
  ).textContent =
    "Save " +
    activeSaveSlot +
    " saved automatically";


  updateSaveSlotInfo();

}


/*
=========================================
OVERWRITE ANOTHER SAVE SLOT
=========================================
*/


function overwriteSave(slot) {

  /*
  We need an active player first.
  */

  if (player === null) {

    alert(
      "Load a save file first."
    );

    return;

  }


  const confirmed = confirm(

    "Overwrite Save " +
    slot +
    " with your current game?"

  );


  if (!confirmed) {

    return;

  }


  /*
  Copy the current player data.
  */

  const copiedPlayer =
    JSON.parse(
      JSON.stringify(player)
    );


  copiedPlayer.lastSavedAt =
    Date.now();


  /*
  Store the copy in the chosen slot.
  */

  localStorage.setItem(

    getSaveName(slot),

    JSON.stringify(copiedPlayer)

  );


  updateSaveSlotInfo();


  alert(
    "Save " +
    slot +
    " has been overwritten."
  );

}


/*
=========================================
RESET A SAVE SLOT
=========================================
*/


function resetSave(slot) {

  const confirmed = confirm(

    "Reset Save " +
    slot +
    "?\n\n" +
    "Everything in this slot will be erased."

  );


  if (!confirmed) {

    return;

  }


  /*
  Completely remove that slot.
  */

  localStorage.removeItem(
    getSaveName(slot)
  );


  /*
  If we're currently playing the slot
  that was deleted, unload the player.
  */

  if (activeSaveSlot === slot) {

    player = null;

    activeSaveSlot = null;

  }


  updateScreen();

  updateSaveSlotInfo();


  document.getElementById(
    "saveStatus"
  ).textContent =
    "Save " + slot + " was reset";

}


/*
=========================================
UPDATE THE SCREEN
=========================================
*/


function updateScreen() {

  /*
  If no save is loaded, display
  the default empty information.
  */

  if (player === null) {

    document.getElementById(
      "currentSlot"
    ).textContent = "None";


    document.getElementById(
      "currencyDisplay"
    ).textContent = "0";


    document.getElementById(
      "claimedDisplay"
    ).textContent = "0";


    document.getElementById(
      "wishlistDisplay"
    ).textContent = "0";


    document.getElementById(
      "towerDisplay"
    ).textContent = "-";


    document.getElementById(
      "reactionPowerDisplay"
    ).textContent = "0";


    document.getElementById(
      "rollsDisplay"
    ).textContent = "0";


    return;

  }


  /*
  Otherwise display the currently
  loaded player's real information.
  */


  document.getElementById(
    "currentSlot"
  ).textContent =
    activeSaveSlot;


  document.getElementById(
    "currencyDisplay"
  ).textContent =
    player.currency.kakera;


  document.getElementById(
    "claimedDisplay"
  ).textContent =
    player.claimedCharacters.length;


  document.getElementById(
    "wishlistDisplay"
  ).textContent =
    player.wishlist.length;


  document.getElementById(
    "towerDisplay"
  ).textContent =
    player.tower.currentFloor;


  document.getElementById(
    "reactionPowerDisplay"
  ).textContent =

    player.reactionPower.current +
    " / " +
    player.reactionPower.maximum;


  document.getElementById(
    "rollsDisplay"
  ).textContent =
    player.statistics.totalRolls;

}


/*
=========================================
SAVE SLOT INFORMATION
=========================================
*/


function updateSaveSlotInfo() {

  /*
  Check Save 1, Save 2 and Save 3.
  */

  for (
    let slot = 1;
    slot <= 3;
    slot++
  ) {

    const savedData =
      localStorage.getItem(
        getSaveName(slot)
      );


    const infoElement =
      document.getElementById(
        "slot" + slot + "Info"
      );


    /*
    Empty slot.
    */

    if (savedData === null) {

      infoElement.textContent =
        "Empty";

      continue;

    }


    /*
    Existing save.
    */

    try {

      const save =
        JSON.parse(savedData);


      const rolls =
        save.statistics?.totalRolls ?? 0;


      const currency =
        save.currency?.kakera ?? 0;


      infoElement.textContent =

        "Currency: " +
        currency +
        " | Rolls: " +
        rolls;

    }


    /*
    If something is wrong with
    the saved information.
    */

    catch (error) {

      infoElement.textContent =
        "Save damaged";

    }

  }

}


/*
=========================================
TEMPORARY TEST BUTTONS
=========================================
*/


function testAddCurrency() {

  if (player === null) {

    alert(
      "Load a save first!"
    );

    return;

  }


  player.currency.kakera += 100;


  player.statistics
    .totalCurrencyEarned += 100;


  /*
  Whenever the player changes,
  update the screen...
  */

  updateScreen();


  /*
  ...and save.
  */

  saveGame();

}


function testAddRoll() {

  if (player === null) {

    alert(
      "Load a save first!"
    );

    return;

  }


  player.statistics.totalRolls += 1;


  updateScreen();

  saveGame();

}


/*
=========================================
AUTOMATIC BACKUP SAVE
=========================================

Every 5 seconds, save the active game.

This is NOT the only saving method.

Most game actions will also call saveGame()
immediately after something important changes.
*/


setInterval(

  function () {

    if (
      player !== null &&
      activeSaveSlot !== null
    ) {

      saveGame();

    }

  },

  5000

);


/*
=========================================
SAVE BEFORE LEAVING PAGE
=========================================
*/


window.addEventListener(

  "beforeunload",

  function () {

    saveGame();

  }

);


/*
=========================================
PAGE STARTUP
=========================================
*/


window.addEventListener(

  "DOMContentLoaded",

  function () {

    /*
    Show information about all
    three save slots.
    */

    updateSaveSlotInfo();


    /*
    Start with no save loaded.

    I am deliberately NOT automatically
    choosing Save 1.

    This means when you open the game,
    YOU decide which save to enter.
    */

    updateScreen();

  }

);
