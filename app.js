/*
==================================================
PRIVATE GACHA
APP.JS
==================================================
*/


let player = null;

let activeSaveSlot = null;

let currentBatch = [];

let selectedSaveSlot = null;



/*
==================================================
SAVE KEY
==================================================
*/

function getSaveName(slot) {

  return "privateGachaSave_" + slot;

}



/*
==================================================
OLD SAVE MIGRATION
==================================================

This adds newer properties to saves created
before this version.

That means you should NOT need to reset
your existing saves.
==================================================
*/

function ensurePlayerShape() {

  if (!player) {
    return;
  }


  /*
  Roll system.
  */

  if (!player.rolls) {

    player.rolls = {

      available: 10,

      maximum: 10

    };

  }


  if (
    typeof player.rolls.available
    !== "number"
  ) {

    player.rolls.available = 10;

  }


  if (
    typeof player.rolls.maximum
    !== "number"
  ) {

    player.rolls.maximum = 10;

  }


  /*
  Claims.
  */

  if (!player.claims) {

    player.claims = {

      available: 1,

      maximum: 1

    };

  }


  /*
  Collection.
  */

  if (
    !Array.isArray(
      player.claimedCharacters
    )
  ) {

    player.claimedCharacters = [];

  }


  /*
  Keys.
  */

  if (!player.keys) {

    player.keys = {};

  }


  /*
  Wishlist.
  */

  if (
    !Array.isArray(player.wishlist)
  ) {

    player.wishlist = [];

  }


  /*
  Statistics.
  */

  if (!player.statistics) {

    player.statistics = {};

  }


  const statDefaults = {

    totalRolls: 0,

    totalClaims: 0,

    totalCharactersSeen: 0,

    totalCurrencyEarned: 0,

    totalCurrencySpent: 0,

    totalReactions: 0,

    totalKeysEarned: 0,

    totalSpheresEarned: 0,

    totalGambles: 0,

    playTimeSeconds: 0

  };


  for (
    const key in statDefaults
  ) {

    if (
      typeof player.statistics[key]
      !== "number"
    ) {

      player.statistics[key] =
        statDefaults[key];

    }

  }

}



/*
==================================================
LOAD SAVE
==================================================
*/

function loadSave(slot) {

  const savedData =
    localStorage.getItem(
      getSaveName(slot)
    );


  if (savedData !== null) {

    try {

      player =
        JSON.parse(savedData);

    }

    catch (error) {

      alert(
        "Save " +
        slot +
        " appears to be damaged."
      );

      return;

    }

  }

  else {

    player =
      createDefaultPlayer();

  }


  activeSaveSlot = slot;

  currentBatch = [];


  ensurePlayerShape();

  saveGame();


  document
    .getElementById("saveScreen")
    .classList.add("hidden");


  document
    .getElementById("gameScreen")
    .classList.remove("hidden");


  showGamePage(
    "rolls",
    document.querySelector(
      '[data-screen="rolls"]'
    )
  );


  clearRollRail();

  updateScreen();

}



/*
==================================================
SAVE
==================================================
*/

function saveGame(showMessage = false) {

  if (
    !player ||
    activeSaveSlot === null
  ) {

    return;

  }


  player.lastSavedAt =
    Date.now();


  localStorage.setItem(

    getSaveName(
      activeSaveSlot
    ),

    JSON.stringify(player)

  );


  updateSaveSlotInfo();


  if (showMessage) {

    const status =
      document.getElementById(
        "saveStatus"
      );


    if (status) {

      status.textContent =
        "Saved successfully.";

    }

  }

}



/*
==================================================
SAVE SELECT
==================================================
*/

function showSaveScreen() {

  saveGame();


  document
    .getElementById("gameScreen")
    .classList.add("hidden");


  document
    .getElementById("saveScreen")
    .classList.remove("hidden");


  updateSaveSlotInfo();

}



/*
==================================================
SAVE SLOT INFORMATION
==================================================
*/

function updateSaveSlotInfo() {

  for (
    let slot = 1;
    slot <= 3;
    slot++
  ) {

    const raw =
      localStorage.getItem(
        getSaveName(slot)
      );


    const title =
      document.getElementById(
        "slot" + slot + "Title"
      );


    const info =
      document.getElementById(
        "slot" + slot + "Info"
      );


    const action =
      document.getElementById(
        "slot" + slot + "Action"
      );


    if (!raw) {

      title.textContent =
        "New Save";


      info.textContent =
        "Empty";


      action.textContent =
        "START";


      continue;

    }


    try {

      const save =
        JSON.parse(raw);


      const currency =
        save.currency?.kakera
        ?? 0;


      const rolls =
        save.statistics?.totalRolls
        ?? 0;


      const claimed =
        save.claimedCharacters?.length
        ?? 0;


      title.textContent =
        "Continue";


      info.textContent =

        formatNumber(currency)

        +

        " ◈   ·   "

        +

        formatNumber(rolls)

        +

        " rolls   ·   "

        +

        formatNumber(claimed)

        +

        " claimed";


      action.textContent =
        "CONTINUE";

    }

    catch (error) {

      title.textContent =
        "Damaged Save";


      info.textContent =
        "Unable to read save data";


      action.textContent =
        "OPEN";

    }

  }

}



/*
==================================================
SAVE OPTIONS MODAL
==================================================
*/

function openSaveMenu(slot) {

  selectedSaveSlot = slot;


  document.getElementById(
    "saveModalTitle"
  ).textContent =
    "Save " + slot;


  document
    .getElementById("saveModal")
    .classList.remove("hidden");

}


function closeSaveMenu() {

  document
    .getElementById("saveModal")
    .classList.add("hidden");


  selectedSaveSlot = null;

}


function overwriteSelectedSave() {

  if (
    selectedSaveSlot === null
  ) {

    return;

  }


  if (!player) {

    alert(
      "Load a save first before copying progress."
    );

    return;

  }


  const confirmed =
    confirm(

      "Replace Save "

      +

      selectedSaveSlot

      +

      " with your current progress?"

    );


  if (!confirmed) {
    return;
  }


  const copy =
    JSON.parse(
      JSON.stringify(player)
    );


  localStorage.setItem(

    getSaveName(
      selectedSaveSlot
    ),

    JSON.stringify(copy)

  );


  closeSaveMenu();

  updateSaveSlotInfo();

}


function resetSelectedSave() {

  if (
    selectedSaveSlot === null
  ) {

    return;

  }


  const slot =
    selectedSaveSlot;


  const confirmed =
    confirm(

      "Permanently erase Save "

      +

      slot

      +

      "?"

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

    currentBatch = [];

  }


  closeSaveMenu();

  updateSaveSlotInfo();

}



/*
==================================================
PAGE NAVIGATION
==================================================
*/

function showGamePage(
  pageName,
  button
) {

  const pages =
    document.querySelectorAll(
      ".game-page"
    );


  pages.forEach(
    function (page) {

      page.classList.remove(
        "active-page"
      );

    }
  );


  const target =
    document.getElementById(
      "page-" + pageName
    );


  if (target) {

    target.classList.add(
      "active-page"
    );

  }


  const navButtons =
    document.querySelectorAll(
      ".nav-item"
    );


  navButtons.forEach(
    function (navButton) {

      navButton.classList.remove(
        "active"
      );

    }
  );


  if (button) {

    button.classList.add(
      "active"
    );

  }

}



/*
==================================================
UPDATE UI
==================================================
*/

function updateScreen() {

  if (!player) {
    return;
  }


  ensurePlayerShape();


  setText(
    "currentSlot",
    activeSaveSlot
  );


  setText(

    "currencyDisplay",

    formatNumber(
      player.currency.kakera
    )

  );


  setText(

    "rollsAvailableDisplay",

    formatNumber(
      player.rolls.available
    )

  );


  setText(

    "claimsDisplay",

    formatNumber(
      player.claims.available
    )

  );


  setText(

    "towerDisplay",

    player.tower?.currentFloor
    ?? 1

  );


  setText(

    "totalRollsDisplay",

    formatNumber(
      player.statistics.totalRolls
    )

  );


  setText(

    "seenDisplay",

    formatNumber(
      player.statistics
        .totalCharactersSeen
    )

  );


  setText(

    "claimedDisplay",

    formatNumber(
      player.claimedCharacters.length
    )

  );


  setText(

    "collectionCount",

    formatNumber(
      player.claimedCharacters.length
    )

    +

    " claimed"

  );


  setText(

    "wishlistDisplay",

    formatNumber(
      player.wishlist.length
    )

  );


  setText(

    "currencyEarnedDisplay",

    formatNumber(
      player.statistics
        .totalCurrencyEarned
    )

  );


  setText(

    "reactionPowerDisplay",

    formatNumber(
      player.reactionPower?.current
      ?? 0
    )

    +

    " / "

    +

    formatNumber(
      player.reactionPower?.maximum
      ?? 0
    )

  );


  const batchButton =
    document.getElementById(
      "generateRollsButton"
    );


  if (batchButton) {

    batchButton.disabled =
      player.rolls.available <= 0;

  }

}



/*
==================================================
SMALL UI HELPERS
==================================================
*/

function setText(id, value) {

  const element =
    document.getElementById(id);


  if (element) {

    element.textContent =
      value;

  }

}


function formatNumber(value) {

  return Number(
    value ?? 0
  ).toLocaleString();

}



/*
==================================================
GENERATE ROLL BATCH
==================================================

Instead of pressing Roll for every character,
we use ALL currently available rolls.

Example:

10 rolls available
→
10 cards are created
→
rolls available becomes 0

Later we'll add regeneration and upgrades.
==================================================
*/

function generateRollBatch() {

  if (!player) {

    alert(
      "Load a save first."
    );

    return;

  }


  if (
    typeof rollDatabase === "undefined"
    ||
    !Array.isArray(rollDatabase)
    ||
    rollDatabase.length === 0
  ) {

    alert(
      "The roll database is unavailable."
    );

    return;

  }


  const amount =
    Math.floor(
      player.rolls.available
    );


  if (amount <= 0) {

    alert(
      "You currently have no rolls available."
    );

    return;

  }


  currentBatch = [];


  for (
    let i = 0;
    i < amount;
    i++
  ) {

    const result =
      equalRandomResult();


    currentBatch.push(
      result
    );


    player.statistics.totalRolls += 1;


    if (
      result.type === "character"
    ) {

      player.statistics
        .totalCharactersSeen += 1;

    }


    /*
    Currency is awarded immediately.
    */

    if (
      result.type === "currency"
    ) {

      player.currency.kakera +=
        result.amount;


      player.statistics
        .totalCurrencyEarned +=
        result.amount;

    }

  }


  /*
  All available rolls were consumed.
  */

  player.rolls.available = 0;


  renderRollBatch();

  updateScreen();

  saveGame();

}



/*
==================================================
EQUAL RANDOM RESULT
==================================================

EVERY ENTRY in rollDatabase is equally likely.

Characters:
1 entry each

Currency amount:
2 entries each

:( result:
1000 entries total

This is exactly the probability rule you wanted.
==================================================
*/

function equalRandomResult() {

  const randomIndex =
    Math.floor(

      Math.random()

      *

      rollDatabase.length

    );


  return rollDatabase[
    randomIndex
  ];

}



/*
==================================================
RENDER BATCH
==================================================
*/

function renderRollBatch() {

  const rail =
    document.getElementById(
      "rollRail"
    );


  rail.innerHTML = "";


  currentBatch.forEach(

    function (result, index) {

      let card;


      if (
        result.type === "character"
      ) {

        card =
          createCharacterCard(
            result,
            index
          );

      }

      else if (
        result.type === "currency"
      ) {

        card =
          createCurrencyCard(
            result
          );

      }

      else {

        card =
          createEmptyCard();

      }


      rail.appendChild(card);

    }

  );


  updateBatchPosition();


  rail.onscroll =
    function () {

      updateBatchPosition();

    };

}



/*
==================================================
CHARACTER CARD
==================================================
*/

function createCharacterCard(
  character,
  index
) {

  const card =
    document.createElement(
      "article"
    );


  card.className =
    "roll-card";


  const claimed =
    player.claimedCharacters.includes(
      character.id
    );


  const keys =
    player.keys?.[
      character.id
    ]
    ?? 0;


  const chance =
    getCharacterProbability();


  card.innerHTML = `

    <div class="card-top">

      <div class="card-meta-row">

        <div class="rank-sphere">
          #${formatNumber(character.rank)}
        </div>

        <div class="card-value">

          <span class="card-value-symbol">
            ◈
          </span>

          ${formatNumber(character.value)}

        </div>

      </div>


      <h2 class="card-name">
        ${escapeHtml(character.name)}
      </h2>


      <p class="card-series">
        ${escapeHtml(character.series)}
      </p>

    </div>


    <div class="card-image-area">

      ${
        character.image

        ?

        `
        <img
          class="card-image"
          src="${escapeAttribute(character.image)}"
          alt="${escapeAttribute(character.name)}"
          onerror="this.classList.add('hidden')"
        >
        `

        :

        ""
      }

    </div>


    <div class="card-footer">


      <div class="card-info-row">

        <div class="card-keys">

          <span>
            ◆
          </span>

          ${formatNumber(keys)} keys

        </div>


        <div class="card-chance">

          ${chance}% spawn

        </div>

      </div>


      <button
        class="claim-button"
        onclick="claimCharacter('${escapeAttribute(character.id)}', ${index})"
        ${claimed ? "disabled" : ""}
      >

        ${
          claimed

          ?

          "OWNED"

          :

          (
            player.claims.available > 0

            ?

            "CLAIM"

            :

            "NO CLAIMS"
          )
        }

      </button>


    </div>

  `;


  return card;

}



/*
==================================================
CURRENCY CARD
==================================================
*/

function createCurrencyCard(
  result
) {

  const card =
    document.createElement(
      "article"
    );


  card.className =
    "roll-card currency-card";


  const chance =
    getCurrencyAmountProbability();


  card.innerHTML = `

    <div class="special-center">

      <div class="currency-icon">
        ◈
      </div>


      <h2 class="currency-amount">

        +${formatNumber(result.amount)}

      </h2>


      <p class="special-label">
        CURRENCY
      </p>

    </div>


    <div class="card-footer">

      <div class="card-info-row">

        <div class="card-keys">
          Added automatically
        </div>

        <div class="card-chance">
          ${chance}% spawn
        </div>

      </div>

    </div>

  `;


  return card;

}



/*
==================================================
EMPTY CARD
==================================================
*/

function createEmptyCard() {

  const card =
    document.createElement(
      "article"
    );


  card.className =
    "roll-card empty-result-card";


  const chance =
    getEmptyProbability();


  card.innerHTML = `

    <div class="empty-face">
      :(
    </div>


    <div class="empty-text">
      nothing this time
    </div>


    <div class="card-footer">

      <div class="card-info-row">

        <div></div>

        <div class="card-chance">
          ${chance}% spawn
        </div>

      </div>

    </div>

  `;


  return card;

}



/*
==================================================
PROBABILITY
==================================================

One character:
1 database entry.

One currency number:
2 database entries.

:( collectively:
1000 database entries.
==================================================
*/

function getCharacterProbability() {

  return formatPercent(
    1 / rollDatabase.length
  );

}


function getCurrencyAmountProbability() {

  return formatPercent(
    2 / rollDatabase.length
  );

}


function getEmptyProbability() {

  return formatPercent(
    1000 / rollDatabase.length
  );

}


function formatPercent(
  decimalChance
) {

  const percentage =
    decimalChance * 100;


  if (percentage >= 1) {

    return percentage.toFixed(2);

  }


  if (percentage >= 0.1) {

    return percentage.toFixed(3);

  }


  return percentage.toFixed(4);

}



/*
==================================================
CLAIM CHARACTER
==================================================
*/

function claimCharacter(
  characterId,
  batchIndex
) {

  if (!player) {
    return;
  }


  if (
    player.claimedCharacters.includes(
      characterId
    )
  ) {

    return;

  }


  if (
    player.claims.available <= 0
  ) {

    alert(
      "You have no claims available."
    );

    return;

  }


  player.claimedCharacters.push(
    characterId
  );


  player.claims.available -= 1;


  player.statistics.totalClaims += 1;


  /*
  Re-render so the button becomes OWNED.
  */

  renderRollBatch();

  updateScreen();

  saveGame();

}



/*
==================================================
CARD POSITION
==================================================
*/

function updateBatchPosition() {

  const rail =
    document.getElementById(
      "rollRail"
    );


  if (
    currentBatch.length === 0
  ) {

    setText(
      "cardPosition",
      "No rolls yet"
    );


    setText(
      "batchHint",
      "Generate your available rolls"
    );


    return;

  }


  const cards =
    rail.querySelectorAll(
      ".roll-card"
    );


  if (
    cards.length === 0
  ) {

    return;

  }


  const railCenter =
    rail.scrollLeft

    +

    rail.clientWidth / 2;


  let closestIndex = 0;

  let closestDistance =
    Infinity;


  cards.forEach(

    function (card, index) {

      const cardCenter =

        card.offsetLeft

        +

        card.offsetWidth / 2;


      const distance =
        Math.abs(
          cardCenter - railCenter
        );


      if (
        distance < closestDistance
      ) {

        closestDistance =
          distance;

        closestIndex =
          index;

      }

    }

  );


  setText(

    "cardPosition",

    "ROLL "

    +

    (closestIndex + 1)

    +

    " / "

    +

    currentBatch.length

  );


  setText(

    "batchHint",

    currentBatch.length > 1

    ?

    "Swipe left or right"

    :

    "1 result"

  );

}



/*
==================================================
CLEAR RAIL
==================================================
*/

function clearRollRail() {

  const rail =
    document.getElementById(
      "rollRail"
    );


  rail.innerHTML = `

    <article class="welcome-card">

      <div class="welcome-symbol">
        ◈
      </div>

      <h2>
        Ready to roll
      </h2>

      <p>
        Your results will appear here as a swipeable card collection.
      </p>

    </article>

  `;


  setText(
    "cardPosition",
    "No rolls yet"
  );


  setText(
    "batchHint",
    "Generate your available rolls"
  );

}



/*
==================================================
SAFE TEXT
==================================================
*/

function escapeHtml(text) {

  return String(text)

    .replaceAll("&", "&amp;")

    .replaceAll("<", "&lt;")

    .replaceAll(">", "&gt;")

    .replaceAll('"', "&quot;")

    .replaceAll("'", "&#039;");

}


function escapeAttribute(text) {

  return escapeHtml(text);

}



/*
==================================================
AUTOSAVE
==================================================
*/

setInterval(

  function () {

    if (player) {

      saveGame();

    }

  },

  5000

);



window.addEventListener(

  "beforeunload",

  function () {

    saveGame();

  }

);



/*
==================================================
STARTUP
==================================================
*/

window.addEventListener(

  "DOMContentLoaded",

  function () {

    updateSaveSlotInfo();

  }

);
