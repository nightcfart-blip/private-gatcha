let player = null;

let activeSaveSlot = null;

let currentBatch = [];

let selectedSaveSlot = null;



/*
=========================================
SAVE NAME
=========================================
*/

function getSaveName(slot) {

  return "privateGachaSave_" + slot;

}



/*
=========================================
SAVE MIGRATION
=========================================
*/

function ensurePlayerShape() {

  if (!player) {
    return;
  }


  if (!player.rolls) {

    player.rolls = {

      available: 10,

      maximum: 10

    };

  }


  if (!player.claims) {

    player.claims = {

      available: 1,

      maximum: 1

    };

  }


  /*
  Stored claims are separate from normal
  currently-available claims.
  */

  if (!player.storedClaims) {

    player.storedClaims = {

      current: 0,

      maximum: 0

    };

  }


  if (!Array.isArray(
    player.claimedCharacters
  )) {

    player.claimedCharacters = [];

  }


  if (!Array.isArray(
    player.wishlist
  )) {

    player.wishlist = [];

  }


  if (!player.keys) {

    player.keys = {};

  }


  if (!player.statistics) {

    player.statistics = {};

  }


  if (!player.upgrades) {

    player.upgrades = {};

  }


  /*
  Profile defaults.
  */

  const upgradeDefaults = {

    wishlistSlots: 10,

    starwishSlots: 0,

    wishValueBonus: 0,

    wishSpawnBonus: 0,

    starwishSpawnBonus: 0,

    reactionPowerCost: 100,

    reactionRegeneration: 1,

    tenthKeyBonus: 10000,

    additionalKeyChance: 0

  };


  for (
    const key in upgradeDefaults
  ) {

    if (
      typeof player.upgrades[key]
      !== "number"
    ) {

      player.upgrades[key] =
        upgradeDefaults[key];

    }

  }


  const statDefaults = {

    totalRolls: 0,

    totalClaims: 0,

    totalCharactersSeen: 0,

    totalCurrencyEarned: 0,

    totalCurrencySpent: 0,

    totalReactions: 0,

    totalKeysEarned: 0

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
=========================================
LOAD SAVE
=========================================
*/

function loadSave(slot) {

  const raw =
    localStorage.getItem(
      getSaveName(slot)
    );


  if (raw) {

    try {

      player =
        JSON.parse(raw);

    }

    catch {

      alert(
        "This save appears damaged."
      );

      return;

    }

  }

  else {

    player =
      createDefaultPlayer();

  }


  activeSaveSlot = slot;


  ensurePlayerShape();


  document
    .getElementById("saveScreen")
    .classList.add("hidden");


  document
    .getElementById("gameScreen")
    .classList.remove("hidden");


  showPage(

    "rolls",

    document.querySelector(
      '[data-page="rolls"]'
    )

  );


  /*
  AUTOMATICALLY CREATE THE DECK.

  No Roll button.
  */

  createAvailableRollDeck();


  updateEverything();

  saveGame();

}



/*
=========================================
SAVE
=========================================
*/

function saveGame(showMessage = false) {

  if (!player) {
    return;
  }


  player.lastSavedAt =
    Date.now();


  localStorage.setItem(

    getSaveName(activeSaveSlot),

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
        "Collection saved.";

    }

  }

}



/*
=========================================
SAVE SELECT
=========================================
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
=========================================
SAVE CARDS
=========================================
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


    if (!raw) {

      title.textContent =
        "New Collection";


      info.textContent =
        "Empty";

      continue;

    }


    try {

      const save =
        JSON.parse(raw);


      title.textContent =
        "Continue Collection";


      info.textContent =

        formatNumber(
          save.claimedCharacters?.length
          ?? 0
        )

        +

        " claimed  ·  "

        +

        formatNumber(
          save.currency?.kakera
          ?? 0
        )

        +

        " ◈";

    }

    catch {

      title.textContent =
        "Damaged Save";


      info.textContent =
        "Unable to read";

    }

  }

}



/*
=========================================
SAVE OPTIONS
=========================================
*/

function openSaveMenu(slot) {

  selectedSaveSlot =
    slot;


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


  selectedSaveSlot =
    null;

}


function overwriteSelectedSave() {

  if (!player) {

    alert(
      "Load a save first."
    );

    return;

  }


  const ok =
    confirm(
      "Overwrite this save?"
    );


  if (!ok) {
    return;
  }


  localStorage.setItem(

    getSaveName(
      selectedSaveSlot
    ),

    JSON.stringify(player)

  );


  closeSaveMenu();

  updateSaveSlotInfo();

}


function resetSelectedSave() {

  const slot =
    selectedSaveSlot;


  if (
    !confirm(
      "Permanently reset Save "
      +
      slot
      +
      "?"
    )
  ) {

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
=========================================
NAVIGATION
=========================================
*/

function showPage(
  pageName,
  button
) {

  document
    .querySelectorAll(".game-page")
    .forEach(

      function (page) {

        page.classList.remove(
          "active-page"
        );

      }

    );


  document
    .getElementById(
      "page-" + pageName
    )
    .classList.add(
      "active-page"
    );


  document
    .querySelectorAll(".nav-button")
    .forEach(

      function (nav) {

        nav.classList.remove(
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
=========================================
CREATE AVAILABLE ROLL DECK
=========================================
*/

function createAvailableRollDeck() {

  if (!player) {
    return;
  }


  if (
    !Array.isArray(
      rollDatabase
    )
    ||
    rollDatabase.length === 0
  ) {

    alert(
      "The database did not load."
    );

    return;

  }


  currentBatch = [];


  const rollAmount =
    Math.floor(
      player.rolls.available
    );


  /*
  No rolls.
  */

  if (
    rollAmount <= 0
  ) {

    renderNoRolls();

    return;

  }


  /*
  Generate one result per available roll.
  */

  for (
    let i = 0;
    i < rollAmount;
    i++
  ) {

    const result =
      getRandomEntry();


    currentBatch.push(
      result
    );


    player.statistics
      .totalRolls += 1;


    if (
      result.type === "character"
    ) {

      player.statistics
        .totalCharactersSeen += 1;

    }


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
  The generated deck used the rolls.
  */

  player.rolls.available = 0;


  renderDeck();

}



/*
=========================================
RANDOM DATABASE ENTRY
=========================================
*/

function getRandomEntry() {

  const index =
    Math.floor(

      Math.random()

      *

      rollDatabase.length

    );


  return rollDatabase[index];

}



/*
=========================================
RENDER DECK
=========================================
*/

function renderDeck() {

  const rail =
    document.getElementById(
      "rollRail"
    );


  rail.innerHTML = "";


  document
    .getElementById("noRollMessage")
    .classList.add("hidden");


  rail.classList.remove(
    "hidden"
  );


  currentBatch.forEach(

    function (
      result,
      index
    ) {

      let card;


      if (
        result.type === "character"
      ) {

        card =
          buildCharacterCard(
            result,
            index
          );

      }

      else if (
        result.type === "currency"
      ) {

        card =
          buildCurrencyCard(
            result
          );

      }

      else {

        card =
          buildEmptyCard();

      }


      rail.appendChild(
        card
      );

    }

  );


  rail.onscroll =
    updateCardPosition;


  setTimeout(
    updateCardPosition,
    50
  );

}



/*
=========================================
NO ROLLS
=========================================
*/

function renderNoRolls() {

  document
    .getElementById("rollRail")
    .classList.add("hidden");


  document
    .getElementById("noRollMessage")
    .classList.remove("hidden");


  setText(
    "cardPosition",
    "EMPTY"
  );

}



/*
=========================================
TEMPORARY REFILL
=========================================

This stays until we build real regeneration.

It prevents you from getting trapped with
zero rolls while we're still developing.
=========================================
*/

function temporaryRefillRolls() {

  if (!player) {
    return;
  }


  player.rolls.available =
    10;


  saveGame();


  createAvailableRollDeck();

  updateEverything();

}



/*
=========================================
CHARACTER CARD
=========================================
*/

function buildCharacterCard(
  character,
  batchIndex
) {

  const card =
    document.createElement(
      "article"
    );


  card.className =
    "roll-card";


  const owned =
    player.claimedCharacters.includes(
      character.id
    );


  const keys =
    player.keys[
      character.id
    ]
    ?? 0;


  card.innerHTML = `

    <div class="card-decoration">
      ✦ ── ◇ ── ✦
    </div>


    <div class="card-top">


      <div class="card-meta">


        <div class="rank-orb">

          #${formatNumber(character.rank)}

        </div>


        <div class="card-value">

          <i>
            ◈
          </i>

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



    <div class="card-art">

      ${
        character.image

        ?

        `
        <img
          src="${escapeHtml(character.image)}"
          alt="${escapeHtml(character.name)}"
          onerror="this.style.display='none'"
        >
        `

        :

        ""
      }

    </div>



    <div class="card-footer">


      <div class="card-info">


        <span class="key-value">

          ◆ ${formatNumber(keys)} keys

        </span>


        <span>

          ${getCharacterProbability()}%

        </span>


      </div>


      <button
        class="claim-button"

        onclick="
          claimCharacter(
            '${escapeHtml(character.id)}'
          )
        "

        ${owned ? "disabled" : ""}
      >

        ${
          owned

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
=========================================
CURRENCY CARD
=========================================
*/

function buildCurrencyCard(
  result
) {

  const card =
    document.createElement(
      "article"
    );


  card.className =
    "roll-card currency-card";


  card.innerHTML = `

    <div class="card-decoration">
      ✦ ── ◇ ── ✦
    </div>


    <div class="currency-result-symbol">
      ◈
    </div>


    <h2 class="currency-result-amount">

      +${formatNumber(result.amount)}

    </h2>


    <p class="currency-result-label">
      CURRENCY
    </p>


    <div class="card-footer">

      <div class="card-info">

        <span>
          added automatically
        </span>

        <span>
          ${getCurrencyProbability()}%
        </span>

      </div>

    </div>

  `;


  return card;

}



/*
=========================================
EMPTY CARD
=========================================
*/

function buildEmptyCard() {

  const card =
    document.createElement(
      "article"
    );


  card.className =
    "roll-card empty-card";


  card.innerHTML = `

    <div class="card-decoration">
      ✦ ── ◇ ── ✦
    </div>


    <div class="empty-face">
      :(
    </div>


    <p class="empty-caption">
      nothing
    </p>


    <div class="card-footer">

      <div class="card-info">

        <span></span>

        <span>
          ${getEmptyProbability()}%
        </span>

      </div>

    </div>

  `;


  return card;

}



/*
=========================================
CLAIM
=========================================
*/

function claimCharacter(
  characterId
) {

  if (
    player.claims.available <= 0
  ) {

    alert(
      "No claims available."
    );

    return;

  }


  if (
    player.claimedCharacters.includes(
      characterId
    )
  ) {

    return;

  }


  player.claimedCharacters.push(
    characterId
  );


  player.claims.available -= 1;


  player.statistics
    .totalClaims += 1;


  renderDeck();

  updateEverything();

  saveGame();

}



/*
=========================================
PROBABILITIES
=========================================
*/

function getCharacterProbability() {

  return percent(
    1 / rollDatabase.length
  );

}


function getCurrencyProbability() {

  return percent(
    2 / rollDatabase.length
  );

}


function getEmptyProbability() {

  return percent(
    1000 / rollDatabase.length
  );

}


function percent(decimal) {

  const value =
    decimal * 100;


  if (
    value >= 1
  ) {

    return value.toFixed(2);

  }


  return value.toFixed(4);

}



/*
=========================================
CARD POSITION
=========================================
*/

function updateCardPosition() {

  const rail =
    document.getElementById(
      "rollRail"
    );


  const cards =
    rail.querySelectorAll(
      ".roll-card"
    );


  if (!cards.length) {
    return;
  }


  const center =
    rail.scrollLeft

    +

    rail.clientWidth / 2;


  let closest =
    0;


  let smallestDistance =
    Infinity;


  cards.forEach(

    function (
      card,
      index
    ) {

      const cardCenter =

        card.offsetLeft

        +

        card.offsetWidth / 2;


      const distance =
        Math.abs(
          center - cardCenter
        );


      if (
        distance
        <
        smallestDistance
      ) {

        smallestDistance =
          distance;

        closest =
          index;

      }

    }

  );


  setText(

    "cardPosition",

    (closest + 1)

    +

    " / "

    +

    cards.length

  );

}



/*
=========================================
PROFILE
=========================================
*/

function updateProfile() {

  if (!player) {
    return;
  }


  const totalKeys =
    Object.values(
      player.keys
    ).reduce(

      function (
        total,
        value
      ) {

        return (
          total
          +
          Number(value || 0)
        );

      },

      0

    );


  setText(
    "profileRolls",
    player.rolls.available
  );


  setText(
    "profileClaims",
    player.claims.available
  );


  setText(

    "profileStoredClaims",

    player.storedClaims.current

    +

    " / "

    +

    player.storedClaims.maximum

  );


  setText(

    "profileWishlistSlots",

    player.upgrades.wishlistSlots

  );


  setText(

    "profileWishBonusValue",

    formatNumber(
      player.upgrades
        .wishValueBonus
    )

  );


  setText(

    "profileStarwishSlots",

    player.upgrades.starwishSlots

  );


  setText(

    "profileWishSpawn",

    player.upgrades
      .wishSpawnBonus

    +

    "%"

  );


  setText(

    "profileStarwishSpawn",

    player.upgrades
      .starwishSpawnBonus

    +

    "%"

  );


  /*
  Roll pool size.

  This includes:

  characters
  currency entries
  :( entries
  */

  setText(

    "profileRollpool",

    formatNumber(
      rollDatabase.length
    )

  );


  setText(

    "profileCurrency",

    formatNumber(
      player.currency.kakera
    )

  );


  setText(

    "profileReactionPower",

    (
      player.reactionPower
        ?.current
      ?? 100
    )

    +

    "%"

  );


  setText(

    "profileReactionCost",

    player.upgrades
      .reactionPowerCost

    +

    "%"

  );


  setText(

    "profilePowerRegen",

    player.upgrades
      .reactionRegeneration

    +

    "%"

  );


  setText(

    "profileTenthKeyBonus",

    formatNumber(
      player.upgrades
        .tenthKeyBonus
    )

    +

    " ◈"

  );


  setText(
    "profileWhiteAmount",
    "3–4"
  );


  setText(

    "profileTotalKeys",

    formatNumber(
      totalKeys
    )

  );


  setText(

    "profileAdditionalKeyChance",

    player.upgrades
      .additionalKeyChance

    +

    "%"

  );

}



/*
=========================================
MAIN UI UPDATE
=========================================
*/

function updateEverything() {

  if (!player) {
    return;
  }


  ensurePlayerShape();


  setText(

    "currentSlot",

    activeSaveSlot

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

    "currencyDisplay",

    formatNumber(
      player.currency.kakera
    )

  );


  setText(

    "towerDisplay",

    player.tower
      ?.currentFloor
    ?? 1

  );


  updateProfile();

}



/*
=========================================
HELPERS
=========================================
*/

function setText(
  id,
  text
) {

  const element =
    document.getElementById(id);


  if (element) {

    element.textContent =
      text;

  }

}


function formatNumber(number) {

  return Number(
    number ?? 0
  ).toLocaleString();

}


function escapeHtml(text) {

  return String(text)

    .replaceAll("&", "&amp;")

    .replaceAll("<", "&lt;")

    .replaceAll(">", "&gt;")

    .replaceAll('"', "&quot;")

    .replaceAll("'", "&#039;");

}



/*
=========================================
AUTOSAVE
=========================================
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
=========================================
START
=========================================
*/

window.addEventListener(

  "DOMContentLoaded",

  function () {

    updateSaveSlotInfo();

  }

);
