/*
=============================================
PRIVATE GACHA
MAIN APPLICATION
=============================================
*/


let player = null;

let activeSaveSlot = null;

let currentRoll = null;



/*
=============================================
SAVE NAMES
=============================================
*/


function getSaveName(slot) {

  return "privateGachaSave_" + slot;

}



/*
=============================================
LOAD SAVE
=============================================
*/


function loadSave(slot) {

  const saveName =
    getSaveName(slot);


  const savedData =
    localStorage.getItem(
      saveName
    );


  /*
  If this save exists,
  load it.
  */

  if (savedData !== null) {

    try {

      player =
        JSON.parse(
          savedData
        );

    }

    catch (error) {

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
  create a fresh player.
  */

  else {

    player =
      createDefaultPlayer();

  }


  activeSaveSlot =
    slot;


  currentRoll =
    null;


  saveGame();


  updateScreen();

  updateSaveSlotInfo();

  clearRollDisplay();


  setStatus(
    "Save " +
    slot +
    " loaded."
  );


  document.getElementById(
    "rollNotice"
  ).textContent =
    "Ready to roll.";

}



/*
=============================================
SAVE GAME
=============================================
*/


function saveGame(showMessage = false) {

  if (
    player === null ||
    activeSaveSlot === null
  ) {

    return;

  }


  player.lastSavedAt =
    Date.now();


  const saveText =
    JSON.stringify(player);


  localStorage.setItem(

    getSaveName(
      activeSaveSlot
    ),

    saveText

  );


  updateSaveSlotInfo();


  if (showMessage) {

    setStatus(
      "Save " +
      activeSaveSlot +
      " saved."
    );

  }

}



/*
=============================================
COPY CURRENT SAVE INTO ANOTHER SLOT
=============================================
*/


function overwriteSave(slot) {

  if (player === null) {

    alert(
      "Load a save file first."
    );

    return;

  }


  const confirmed =
    confirm(

      "Copy your current progress into Save " +
      slot +
      "?\n\n" +

      "Anything already stored there will be replaced."

    );


  if (!confirmed) {

    return;

  }


  const copiedPlayer =
    JSON.parse(
      JSON.stringify(player)
    );


  copiedPlayer.lastSavedAt =
    Date.now();


  localStorage.setItem(

    getSaveName(slot),

    JSON.stringify(
      copiedPlayer
    )

  );


  updateSaveSlotInfo();


  setStatus(
    "Current progress copied to Save " +
    slot +
    "."
  );

}



/*
=============================================
RESET SAVE
=============================================
*/


function resetSave(slot) {

  const confirmed =
    confirm(

      "Reset Save " +
      slot +
      "?\n\n" +

      "Everything in this slot will be permanently erased."

    );


  if (!confirmed) {

    return;

  }


  localStorage.removeItem(
    getSaveName(slot)
  );


  if (
    activeSaveSlot === slot
  ) {

    player = null;

    activeSaveSlot = null;

    currentRoll = null;

    clearRollDisplay();

  }


  updateScreen();

  updateSaveSlotInfo();


  setStatus(
    "Save " +
    slot +
    " was reset."
  );

}



/*
=============================================
STATUS MESSAGE
=============================================
*/


function setStatus(message) {

  document.getElementById(
    "saveStatus"
  ).textContent =
    message;

}



/*
=============================================
PLAYER SCREEN
=============================================
*/


function updateScreen() {

  /*
  No player loaded.
  */

  if (player === null) {

    document.getElementById(
      "currentSlot"
    ).textContent =
      "—";


    document.getElementById(
      "currencyDisplay"
    ).textContent =
      "0";


    document.getElementById(
      "claimedDisplay"
    ).textContent =
      "0";


    document.getElementById(
      "wishlistDisplay"
    ).textContent =
      "0";


    document.getElementById(
      "towerDisplay"
    ).textContent =
      "—";


    document.getElementById(
      "reactionPowerDisplay"
    ).textContent =
      "0";


    document.getElementById(
      "rollsDisplay"
    ).textContent =
      "0";


    return;

  }



  /*
  Player loaded.
  */


  document.getElementById(
    "currentSlot"
  ).textContent =
    activeSaveSlot;


  document.getElementById(
    "currencyDisplay"
  ).textContent =
    formatNumber(
      player.currency.kakera
    );


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

    formatNumber(
      player.reactionPower.current
    )

    +

    " / "

    +

    formatNumber(
      player.reactionPower.maximum
    );


  document.getElementById(
    "rollsDisplay"
  ).textContent =
    formatNumber(
      player.statistics.totalRolls
    );

}



/*
=============================================
SAVE SLOT INFORMATION
=============================================
*/


function updateSaveSlotInfo() {

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
        "slot" +
        slot +
        "Info"
      );


    if (savedData === null) {

      infoElement.textContent =
        "Empty";

      continue;

    }


    try {

      const save =
        JSON.parse(
          savedData
        );


      const rolls =
        save.statistics?.totalRolls
        ?? 0;


      const currency =
        save.currency?.kakera
        ?? 0;


      const claimed =
        save.claimedCharacters?.length
        ?? 0;


      infoElement.textContent =

        formatNumber(currency)

        +

        " ka · "

        +

        formatNumber(rolls)

        +

        " rolls · "

        +

        formatNumber(claimed)

        +

        " claimed";

    }


    catch (error) {

      infoElement.textContent =
        "Save damaged";

    }

  }

}



/*
=============================================
NUMBER FORMATTING
=============================================
*/


function formatNumber(number) {

  return Number(
    number
  ).toLocaleString();

}



/*
=============================================
ROLL SYSTEM
=============================================

The actual database will be added to
data.js in the next step.

This function already expects an array
named:

rollDatabase

Each entry in that array will have a
type:

"character"
"currency"
"empty"

=============================================
*/


function rollCharacter() {

  if (player === null) {

    alert(
      "Load a save file before rolling."
    );

    return;

  }


  /*
  Make sure data.js actually contains
  the database before attempting a roll.
  */

  if (
    typeof rollDatabase === "undefined"
    ||
    !Array.isArray(rollDatabase)
    ||
    rollDatabase.length === 0
  ) {

    document.getElementById(
      "rollNotice"
    ).textContent =
      "Character database has not been added yet.";

    return;

  }


  /*
  Pick an entry using spawn weights.
  */

  const result =
    weightedRandom(
      rollDatabase
    );


  currentRoll =
    result;


  /*
  Every result counts as a roll.
  */

  player.statistics.totalRolls += 1;


  /*
  Characters seen can be tracked
  separately later.
  */

  if (
    result.type === "character"
  ) {

    player.statistics
      .totalCharactersSeen += 1;

  }


  /*
  Currency results immediately give
  currency to the player.
  */

  if (
    result.type === "currency"
  ) {

    const amount =
      result.amount ?? 0;


    player.currency.kakera +=
      amount;


    player.statistics
      .totalCurrencyEarned +=
      amount;

  }


  displayRoll(
    result
  );


  updateScreen();

  saveGame();

}



/*
=============================================
WEIGHTED RANDOM SELECTION
=============================================

Instead of every database entry having
the exact same chance, each result has
a spawnWeight.

Example:

spawnWeight: 1
spawnWeight: 5
spawnWeight: 20

Higher number =
more likely to appear.

=============================================
*/


function weightedRandom(database) {

  let totalWeight = 0;


  for (
    const entry of database
  ) {

    totalWeight +=
      Number(
        entry.spawnWeight ?? 1
      );

  }


  let random =
    Math.random()
    *
    totalWeight;


  for (
    const entry of database
  ) {

    random -=
      Number(
        entry.spawnWeight ?? 1
      );


    if (random <= 0) {

      return entry;

    }

  }


  /*
  Safety fallback.
  */

  return database[
    database.length - 1
  ];

}



/*
=============================================
DISPLAY ROLL
=============================================
*/


function displayRoll(result) {

  /*
  CHARACTER
  */

  if (
    result.type === "character"
  ) {

    displayCharacter(
      result
    );

    return;

  }


  /*
  CURRENCY
  */

  if (
    result.type === "currency"
  ) {

    displayCurrencyRoll(
      result
    );

    return;

  }


  /*
  EMPTY :(
  */

  displayEmptyRoll(
    result
  );

}



/*
=============================================
DISPLAY CHARACTER
=============================================
*/


function displayCharacter(character) {

  const isClaimed =
    player.claimedCharacters.includes(
      character.id
    );


  const keys =
    player.keys[
      character.id
    ]
    ?? 0;


  document.getElementById(
    "characterSeries"
  ).textContent =
    character.series;


  document.getElementById(
    "characterName"
  ).textContent =
    character.name;


  document.getElementById(
    "characterRank"
  ).textContent =
    "#" +
    formatNumber(
      character.rank
    );


  document.getElementById(
    "characterValue"
  ).textContent =
    formatNumber(
      character.value
    )
    +
    " ka";


  document.getElementById(
    "characterWeight"
  ).textContent =
    formatNumber(
      character.spawnWeight
    );


  document.getElementById(
    "characterKeys"
  ).textContent =
    formatNumber(
      keys
    );


  /*
  Claim status.
  */

  const claimBadge =
    document.getElementById(
      "claimBadge"
    );


  if (isClaimed) {

    claimBadge.textContent =
      "CLAIMED";

    claimBadge.className =
      "claim-badge claimed";

  }

  else {

    claimBadge.textContent =
      "UNCLAIMED";

    claimBadge.className =
      "claim-badge unclaimed";

  }


  /*
  Character image.
  */

  showCharacterImage(
    character
  );


  document.getElementById(
    "rollNotice"
  ).textContent =
    "Character rolled.";

}



/*
=============================================
CHARACTER IMAGE
=============================================

A character can eventually have:

image: "images/nami.jpg"

or

image: "https://..."

If image is blank, the placeholder
will appear instead.
=============================================
*/


function showCharacterImage(character) {

  const image =
    document.getElementById(
      "characterImage"
    );


  const placeholder =
    document.getElementById(
      "imagePlaceholder"
    );


  if (
    character.image
    &&
    character.image.trim() !== ""
  ) {

    image.src =
      character.image;


    image.alt =
      character.name;


    image.classList.remove(
      "hidden"
    );


    placeholder.classList.add(
      "hidden"
    );


    /*
    If the image URL is broken,
    restore the placeholder.
    */

    image.onerror =
      function () {

        image.classList.add(
          "hidden"
        );

        placeholder.classList.remove(
          "hidden"
        );

      };

  }

  else {

    image.src =
      "";


    image.classList.add(
      "hidden"
    );


    placeholder.classList.remove(
      "hidden"
    );

  }

}



/*
=============================================
DISPLAY CURRENCY RESULT
=============================================
*/


function displayCurrencyRoll(result) {

  document.getElementById(
    "characterSeries"
  ).textContent =
    "BONUS";


  document.getElementById(
    "characterName"
  ).textContent =

    "+"

    +

    formatNumber(
      result.amount
    )

    +

    " Currency";


  document.getElementById(
    "characterRank"
  ).textContent =
    "—";


  document.getElementById(
    "characterValue"
  ).textContent =

    "+"

    +

    formatNumber(
      result.amount
    )

    +

    " ka";


  document.getElementById(
    "characterWeight"
  ).textContent =
    formatNumber(
      result.spawnWeight
    );


  document.getElementById(
    "characterKeys"
  ).textContent =
    "—";


  const claimBadge =
    document.getElementById(
      "claimBadge"
    );


  claimBadge.textContent =
    "BONUS";


  claimBadge.className =
    "claim-badge unclaimed";


  hideCharacterImage();


  document.getElementById(
    "rollNotice"
  ).textContent =

    "+"

    +

    formatNumber(
      result.amount
    )

    +

    " currency added.";

}



/*
=============================================
DISPLAY EMPTY :( RESULT
=============================================
*/


function displayEmptyRoll(result) {

  document.getElementById(
    "characterSeries"
  ).textContent =
    "NOTHING";


  document.getElementById(
    "characterName"
  ).textContent =
    ":(";


  document.getElementById(
    "characterRank"
  ).textContent =
    "—";


  document.getElementById(
    "characterValue"
  ).textContent =
    "0 ka";


  document.getElementById(
    "characterWeight"
  ).textContent =
    formatNumber(
      result.spawnWeight ?? 1
    );


  document.getElementById(
    "characterKeys"
  ).textContent =
    "—";


  const claimBadge =
    document.getElementById(
      "claimBadge"
    );


  claimBadge.textContent =
    "EMPTY";


  claimBadge.className =
    "claim-badge unclaimed";


  hideCharacterImage();


  document.getElementById(
    "rollNotice"
  ).textContent =
    "Nothing this time.";

}



/*
=============================================
HIDE CHARACTER IMAGE
=============================================
*/


function hideCharacterImage() {

  const image =
    document.getElementById(
      "characterImage"
    );


  const placeholder =
    document.getElementById(
      "imagePlaceholder"
    );


  image.src =
    "";


  image.classList.add(
    "hidden"
  );


  placeholder.classList.remove(
    "hidden"
  );

}



/*
=============================================
CLEAR ROLL DISPLAY
=============================================
*/


function clearRollDisplay() {

  document.getElementById(
    "characterSeries"
  ).textContent =
    "No series";


  document.getElementById(
    "characterName"
  ).textContent =
    "No roll yet";


  document.getElementById(
    "characterRank"
  ).textContent =
    "—";


  document.getElementById(
    "characterValue"
  ).textContent =
    "—";


  document.getElementById(
    "characterWeight"
  ).textContent =
    "—";


  document.getElementById(
    "characterKeys"
  ).textContent =
    "0";


  const claimBadge =
    document.getElementById(
      "claimBadge"
    );


  claimBadge.textContent =
    "UNCLAIMED";


  claimBadge.className =
    "claim-badge unclaimed";


  hideCharacterImage();

}



/*
=============================================
TEMPORARY CURRENCY TEST
=============================================
*/


function testAddCurrency() {

  if (player === null) {

    alert(
      "Load a save first."
    );

    return;

  }


  player.currency.kakera +=
    100;


  player.statistics
    .totalCurrencyEarned +=
    100;


  updateScreen();

  saveGame();

}



/*
=============================================
AUTOSAVE
=============================================
*/


setInterval(

  function () {

    if (
      player !== null
      &&
      activeSaveSlot !== null
    ) {

      saveGame();

    }

  },

  5000

);



/*
=============================================
SAVE WHEN PAGE CLOSES
=============================================
*/


window.addEventListener(

  "beforeunload",

  function () {

    saveGame();

  }

);



/*
=============================================
PAGE STARTUP
=============================================
*/


window.addEventListener(

  "DOMContentLoaded",

  function () {

    updateSaveSlotInfo();

    updateScreen();

    clearRollDisplay();

  }

);
