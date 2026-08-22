/*
==================================================
PRIVATE GACHA
ROUNDS + WISHLIST
STABLE VERSION
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
CHECK DATABASE
==================================================
*/

function databaseIsReady() {

  return (

    typeof characterDatabase
      !== "undefined"

    &&

    Array.isArray(
      characterDatabase
    )

    &&

    characterDatabase.length > 0

    &&

    typeof rollDatabase
      !== "undefined"

    &&

    Array.isArray(
      rollDatabase
    )

    &&

    rollDatabase.length > 0

  );

}



/*
==================================================
FIX / UPGRADE OLD SAVES
==================================================
*/

function ensurePlayerShape() {

  if (!player) {
    return;
  }


  /*
  CURRENCY
  */

  if (!player.currency) {

    player.currency = {
      kakera: 0
    };

  }


  if (
    typeof player.currency.kakera
    !== "number"
  ) {

    player.currency.kakera = 0;

  }


  /*
  STATISTICS FIRST.

  We create this BEFORE anything tries
  to read from it.
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


  /*
  ROUND SYSTEM
  */

  if (!player.rounds) {

    player.rounds = {

      current: 1,

      rollsPerRound: 6,

      currentBatch: []

    };

  }


  if (
    typeof player.rounds.current
    !== "number"
  ) {

    player.rounds.current = 1;

  }


  if (
    typeof player.rounds.rollsPerRound
    !== "number"
  ) {

    player.rounds.rollsPerRound = 6;

  }


  /*
  Older experimental saves may have
  rollsPerRound set incorrectly.
  */

  if (
    player.rounds.rollsPerRound < 1
  ) {

    player.rounds.rollsPerRound = 6;

  }


  if (
    !Array.isArray(
      player.rounds.currentBatch
    )
  ) {

    player.rounds.currentBatch = [];

  }


  /*
  CLAIMS
  */

  if (!player.claims) {

    player.claims = {

      available: 0,

      maximum: 1

    };

  }


  if (
    typeof player.claims.available
    !== "number"
  ) {

    player.claims.available = 0;

  }


  if (
    typeof player.claims.maximum
    !== "number"
  ) {

    player.claims.maximum = 1;

  }


  /*
  Old test saves started with a free
  claim at Round 1.

  Remove that old starter claim only
  if nothing has ever been claimed.
  */

  if (

    player.rounds.current === 1

    &&

    player.statistics.totalClaims === 0

    &&

    player.claims.available === 1

  ) {

    player.claims.available = 0;

  }


  /*
  STORED CLAIMS
  */

  if (!player.storedClaims) {

    player.storedClaims = {

      current: 0,

      maximum: 0

    };

  }


  if (
    typeof player.storedClaims.current
    !== "number"
  ) {

    player.storedClaims.current = 0;

  }


  if (
    typeof player.storedClaims.maximum
    !== "number"
  ) {

    player.storedClaims.maximum = 0;

  }


  /*
  COLLECTION
  */

  if (
    !Array.isArray(
      player.claimedCharacters
    )
  ) {

    player.claimedCharacters = [];

  }


  /*
  WISHLIST
  */

  if (
    !Array.isArray(
      player.wishlist
    )
  ) {

    player.wishlist = [];

  }


  /*
  KEYS
  */

  if (!player.keys) {

    player.keys = {};

  }


  /*
  REACTION POWER
  */

  if (!player.reactionPower) {

    player.reactionPower = {

      current: 100,

      maximum: 100,

      regeneration: 1

    };

  }


  /*
  UPGRADES
  */

  if (!player.upgrades) {

    player.upgrades = {};

  }


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


  /*
  TOWER
  */

  if (!player.tower) {

    player.tower = {

      currentFloor: 1,

      highestFloor: 1,

      totalFloorsCleared: 0

    };

  }

}



/*
==================================================
LOAD SAVE
==================================================
*/

function loadSave(slot) {

  /*
  Step 1:
  Read save data.
  */

  const raw =
    localStorage.getItem(
      getSaveName(slot)
    );


  if (raw) {

    try {

      player =
        JSON.parse(raw);

    }

    catch (error) {

      alert(
        "Save "
        +
        slot
        +
        " could not be read."
      );

      console.error(error);

      return;

    }

  }

  else {

    /*
    Make sure data.js actually supplied
    createDefaultPlayer.
    */

    if (
      typeof createDefaultPlayer
      !== "function"
    ) {

      alert(
        "data.js did not load correctly."
      );

      return;

    }


    player =
      createDefaultPlayer();

  }


  activeSaveSlot =
    slot;


  /*
  Step 2:
  Repair old save structure.
  */

  ensurePlayerShape();


  /*
  Step 3:
  SHOW THE GAME NOW.

  This is intentionally before rolling.

  Even if the database has an error,
  you will no longer be stuck at the
  save-selection screen.
  */

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
  Step 4:
  Load/generate the Round.
  */

  if (!databaseIsReady()) {

    showGameError(
      "The character database did not finish loading. Check data.js."
    );


    currentBatch = [];


    updateEverything();


    return;

  }


  hideGameError();


  if (
    player.rounds.currentBatch.length > 0
  ) {

    currentBatch =
      player.rounds.currentBatch;

  }

  else {

    generateRoundDeck();

  }


  /*
  Step 5:
  Draw screen.
  */

  renderDeck();

  updateEverything();

  saveGame();

}



/*
==================================================
GAME ERROR
==================================================
*/

function showGameError(message) {

  const box =
    document.getElementById(
      "gameError"
    );


  if (!box) {
    return;
  }


  box.textContent =
    message;


  box.classList.remove(
    "hidden"
  );

}


function hideGameError() {

  const box =
    document.getElementById(
      "gameError"
    );


  if (!box) {
    return;
  }


  box.classList.add(
    "hidden"
  );

}



/*
==================================================
SAVE GAME
==================================================
*/

function saveGame(
  showMessage = false
) {

  if (
    !player
    ||
    activeSaveSlot === null
  ) {

    return;

  }


  if (player.rounds) {

    player.rounds.currentBatch =
      currentBatch;

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

    setText(
      "saveStatus",
      "Collection saved."
    );

  }

}



/*
==================================================
RETURN TO SAVE SELECT
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
SAVE FILE DISPLAY
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
        "slot"
        +
        slot
        +
        "Title"
      );


    const info =
      document.getElementById(
        "slot"
        +
        slot
        +
        "Info"
      );


    if (!title || !info) {
      continue;
    }


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


      const round =
        save.rounds?.current
        ?? 1;


      const claimed =
        save.claimedCharacters?.length
        ?? 0;


      const currency =
        save.currency?.kakera
        ?? 0;


      title.textContent =
        "Continue Collection";


      info.textContent =

        "Round "

        +

        formatNumber(round)

        +

        " · "

        +

        formatNumber(claimed)

        +

        " claimed · "

        +

        formatNumber(currency)

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
==================================================
SAVE OPTIONS
==================================================
*/

function openSaveMenu(slot) {

  selectedSaveSlot =
    slot;


  setText(
    "saveModalTitle",
    "Save " + slot
  );


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


  if (
    selectedSaveSlot === null
  ) {

    return;

  }


  if (
    !confirm(
      "Overwrite Save "
      +
      selectedSaveSlot
      +
      "?"
    )
  ) {

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

  if (
    selectedSaveSlot === null
  ) {

    return;

  }


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
==================================================
NAVIGATION
==================================================
*/

function showPage(
  pageName,
  button
) {

  const target =
    document.getElementById(
      "page-" + pageName
    );


  if (!target) {
    return;
  }


  document
    .querySelectorAll(
      ".game-page"
    )
    .forEach(

      function (page) {

        page.classList.remove(
          "active-page"
        );

      }

    );


  target.classList.add(
    "active-page"
  );


  document
    .querySelectorAll(
      ".nav-button"
    )
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


  if (
    pageName === "wishlist"
  ) {

    renderWishlistPage();

  }


  if (
    pageName === "collection"
  ) {

    renderCollection();

  }

}



/*
==================================================
START NEXT ROUND
==================================================
*/

function startNextRound() {

  if (!player) {
    return;
  }


  if (!databaseIsReady()) {

    showGameError(
      "Cannot start a Round because data.js is not loaded."
    );

    return;

  }


  player.rounds.current += 1;


  /*
  Claims arrive every 5 Rounds.
  */

  if (
    player.rounds.current % 5 === 0
  ) {

    player.claims.available += 1;

  }


  generateRoundDeck();


  renderDeck();

  updateEverything();

  saveGame();


  const rail =
    document.getElementById(
      "rollRail"
    );


  if (rail) {

    rail.scrollLeft = 0;

  }

}



/*
==================================================
GENERATE ROUND
==================================================
*/

function generateRoundDeck() {

  if (!databaseIsReady()) {

    showGameError(
      "Roll database is unavailable."
    );

    return;

  }


  currentBatch = [];


  const amount =
    Math.max(

      1,

      Math.floor(
        Number(
          player.rounds.rollsPerRound
        )
        ||
        6
      )

    );


  for (
    let i = 0;
    i < amount;
    i++
  ) {

    const result =
      getRandomEntry();


    if (!result) {
      continue;
    }


    const copy =
      JSON.parse(
        JSON.stringify(result)
      );


    currentBatch.push(copy);


    player.statistics.totalRolls += 1;


    if (
      result.type === "character"
    ) {

      player.statistics
        .totalCharactersSeen += 1;

    }


    if (
      result.type === "currency"
    ) {

      const amountWon =
        Number(
          result.amount
        )
        ||
        0;


      player.currency.kakera +=
        amountWon;


      player.statistics
        .totalCurrencyEarned +=
        amountWon;

    }

  }


  player.rounds.currentBatch =
    currentBatch;

}



/*
==================================================
RANDOM RESULT
==================================================
*/

function getRandomEntry() {

  if (!databaseIsReady()) {
    return null;
  }


  const index =
    Math.floor(

      Math.random()

      *

      rollDatabase.length

    );


  return rollDatabase[index];

}



/*
==================================================
RENDER ROUND
==================================================
*/

function renderDeck() {

  const rail =
    document.getElementById(
      "rollRail"
    );


  if (!rail) {
    return;
  }


  rail.innerHTML =
    "";


  if (
    currentBatch.length === 0
  ) {

    rail.innerHTML = `

      <article class="roll-card empty-card">

        <div class="empty-face">
          —
        </div>

        <p class="empty-caption">
          no cards available
        </p>

      </article>

    `;


    setText(
      "cardPosition",
      "0 / 0"
    );


    return;

  }


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


      rail.appendChild(card);

    }

  );


  rail.onscroll =
    updateCardPosition;


  setTimeout(
    updateCardPosition,
    100
  );

}



/*
==================================================
CHARACTER CARD
==================================================
*/

function buildCharacterCard(
  character
) {

  const card =
    document.createElement(
      "article"
    );


  const owned =
    player.claimedCharacters.includes(
      character.id
    );


  const wished =
    player.wishlist.includes(
      character.id
    );


  const keys =
    Number(
      player.keys[
        character.id
      ]
      ??
      0
    );


  card.className =
    wished
    ?
    "roll-card wished"
    :
    "roll-card";


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

          <i>◈</i>

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
          src="${escapeAttribute(character.image)}"
          alt="${escapeAttribute(character.name)}"
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



      <div class="card-buttons">


        <button
          class="claim-button"

          onclick="claimCharacter('${escapeAttribute(character.id)}')"

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



        <button
          class="wish-button ${wished ? "active" : ""}"

          onclick="toggleWishlist('${escapeAttribute(character.id)}')"
        >

          ${
            wished
            ?
            "★ WISHED"
            :
            "☆ WISH"
          }

        </button>


      </div>


    </div>

  `;


  return card;

}



/*
==================================================
CURRENCY CARD
==================================================
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
==================================================
EMPTY CARD
==================================================
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
==================================================
CLAIM
==================================================
*/

function claimCharacter(
  characterId
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
      "No claims available."
    );

    return;

  }


  player.claimedCharacters.push(
    characterId
  );


  player.claims.available -= 1;


  player.statistics.totalClaims += 1;


  renderDeck();

  updateEverything();

  saveGame();

}



/*
==================================================
WISHLIST
==================================================
*/

function toggleWishlist(
  characterId
) {

  if (!player) {
    return;
  }


  const existingIndex =
    player.wishlist.indexOf(
      characterId
    );


  /*
  REMOVE
  */

  if (
    existingIndex !== -1
  ) {

    player.wishlist.splice(
      existingIndex,
      1
    );

  }


  /*
  ADD
  */

  else {

    const maximum =
      Number(
        player.upgrades
          .wishlistSlots
      )
      ||
      0;


    if (
      player.wishlist.length
      >=
      maximum
    ) {

      alert(
        "Your wishlist is full."
      );

      return;

    }


    player.wishlist.push(
      characterId
    );

  }


  renderDeck();

  renderWishlistPage();

  renderCollection();

  updateEverything();

  saveGame();

}



/*
==================================================
WISHLIST SCREEN
==================================================
*/

function renderWishlistPage() {

  if (!player) {
    return;
  }


  setText(
    "wishlistUsed",
    player.wishlist.length
  );


  setText(

    "wishlistMaximum",

    player.upgrades
      .wishlistSlots

  );


  const container =
    document.getElementById(
      "wishlistCurrent"
    );


  if (!container) {
    return;
  }


  container.innerHTML =
    "";


  if (
    player.wishlist.length === 0
  ) {

    container.innerHTML = `

      <div class="empty-list">
        Your wishlist is empty.
      </div>

    `;

  }


  else {

    player.wishlist.forEach(

      function (id) {

        const character =
          findCharacterById(id);


        if (!character) {
          return;
        }


        container.appendChild(

          buildCharacterListItem(
            character
          )

        );

      }

    );

  }


  searchWishlistCharacters();

}



/*
==================================================
SEARCH
==================================================
*/

function searchWishlistCharacters() {

  const input =
    document.getElementById(
      "wishlistSearch"
    );


  const results =
    document.getElementById(
      "wishlistSearchResults"
    );


  if (
    !input
    ||
    !results
  ) {

    return;

  }


  results.innerHTML =
    "";


  const query =
    input.value
      .trim()
      .toLowerCase();


  if (
    query.length < 2
  ) {

    results.innerHTML = `

      <div class="empty-list">
        Type at least 2 letters to search.
      </div>

    `;


    return;

  }


  if (!databaseIsReady()) {

    results.innerHTML = `

      <div class="empty-list">
        Character database unavailable.
      </div>

    `;


    return;

  }


  const matches =
    characterDatabase

      .filter(

        function (character) {

          const name =
            String(
              character.name
            )
            .toLowerCase();


          const series =
            String(
              character.series
            )
            .toLowerCase();


          return (
            name.includes(query)
            ||
            series.includes(query)
          );

        }

      )

      .slice(
        0,
        30
      );


  if (
    matches.length === 0
  ) {

    results.innerHTML = `

      <div class="empty-list">
        No characters found.
      </div>

    `;


    return;

  }


  matches.forEach(

    function (character) {

      results.appendChild(

        buildCharacterListItem(
          character
        )

      );

    }

  );

}



/*
==================================================
CHARACTER LIST ROW
==================================================
*/

function buildCharacterListItem(
  character
) {

  const item =
    document.createElement(
      "article"
    );


  item.className =
    "character-list-item";


  const wished =
    player.wishlist.includes(
      character.id
    );


  const owned =
    player.claimedCharacters.includes(
      character.id
    );


  item.innerHTML = `

    <div class="character-list-info">


      <h3>

        ${escapeHtml(character.name)}

      </h3>


      <p>

        ${escapeHtml(character.series)}

      </p>


      <small>

        #${formatNumber(character.rank)}

        ·

        ◈ ${formatNumber(character.value)}

        ${owned ? " · OWNED" : ""}

      </small>


    </div>



    <button
      class="list-wish-button ${wished ? "active" : ""}"

      onclick="toggleWishlist('${escapeAttribute(character.id)}')"
    >

      ${
        wished
        ?
        "★ WISHED"
        :
        "☆ WISH"
      }

    </button>

  `;


  return item;

}



/*
==================================================
COLLECTION
==================================================
*/

function renderCollection() {

  const container =
    document.getElementById(
      "collectionList"
    );


  if (
    !container
    ||
    !player
  ) {

    return;

  }


  container.innerHTML =
    "";


  if (
    player.claimedCharacters.length
    === 0
  ) {

    container.innerHTML = `

      <div class="empty-list">
        No claimed characters yet.
      </div>

    `;


    return;

  }


  player.claimedCharacters.forEach(

    function (id) {

      const character =
        findCharacterById(id);


      if (!character) {
        return;
      }


      container.appendChild(

        buildCharacterListItem(
          character
        )

      );

    }

  );

}



/*
==================================================
FIND CHARACTER
==================================================
*/

function findCharacterById(id) {

  if (
    typeof characterDatabase
    === "undefined"
  ) {

    return null;

  }


  return characterDatabase.find(

    function (character) {

      return (
        character.id === id
      );

    }

  );

}



/*
==================================================
PROBABILITY
==================================================
*/

function getCharacterProbability() {

  if (!databaseIsReady()) {
    return "0";
  }


  return formatPercent(

    1 / rollDatabase.length

  );

}


function getCurrencyProbability() {

  if (!databaseIsReady()) {
    return "0";
  }


  return formatPercent(

    2 / rollDatabase.length

  );

}


function getEmptyProbability() {

  if (!databaseIsReady()) {
    return "0";
  }


  return formatPercent(

    1000 / rollDatabase.length

  );

}


function formatPercent(decimal) {

  const percentage =
    decimal * 100;


  if (
    percentage >= 1
  ) {

    return percentage.toFixed(2);

  }


  if (
    percentage >= 0.1
  ) {

    return percentage.toFixed(3);

  }


  return percentage.toFixed(4);

}



/*
==================================================
CARD POSITION
==================================================
*/

function updateCardPosition() {

  const rail =
    document.getElementById(
      "rollRail"
    );


  if (!rail) {
    return;
  }


  const cards =
    rail.querySelectorAll(
      ".roll-card"
    );


  if (
    cards.length === 0
  ) {

    setText(
      "cardPosition",
      "0 / 0"
    );


    return;

  }


  const center =
    rail.scrollLeft

    +

    rail.clientWidth / 2;


  let closest =
    0;


  let smallest =
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
          center
          -
          cardCenter
        );


      if (
        distance < smallest
      ) {

        smallest =
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
==================================================
NEXT CLAIM ROUND
==================================================
*/

function updateNextClaimNotice() {

  if (!player) {
    return;
  }


  const round =
    player.rounds.current;


  const next =
    round

    +

    (
      5
      -
      (round % 5 || 5)
    );


  /*
  Above formula gives current round when
  divisible by 5, so correct it.
  */

  const nextClaimRound =
    round % 5 === 0

    ?

    round + 5

    :

    next;


  setText(

    "nextClaimNotice",

    "Next claim on Round "

    +

    nextClaimRound

  );

}



/*
==================================================
PROFILE
==================================================
*/

function updateProfile() {

  if (!player) {
    return;
  }


  const totalKeys =
    Object.values(
      player.keys
    )
    .reduce(

      function (
        total,
        amount
      ) {

        return (

          total

          +

          Number(
            amount || 0
          )

        );

      },

      0

    );


  setText(

    "profileRound",

    player.rounds.current

  );


  setText(

    "profileRolls",

    player.rounds
      .rollsPerRound

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

    player.upgrades
      .wishlistSlots

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

    player.upgrades
      .starwishSlots

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


  setText(

    "profileRollpool",

    databaseIsReady()

    ?

    formatNumber(
      rollDatabase.length
    )

    :

    "Unavailable"

  );


  setText(

    "profileCurrency",

    formatNumber(
      player.currency.kakera
    )

  );


  setText(

    "profileReactionPower",

    formatNumber(
      player.reactionPower.current
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
==================================================
UPDATE UI
==================================================
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
    "roundDisplay",
    player.rounds.current
  );


  setText(

    "rollsDisplay",

    player.rounds
      .rollsPerRound

  );


  setText(

    "claimsDisplay",

    player.claims.available

  );


  setText(

    "currencyDisplay",

    formatNumber(
      player.currency.kakera
    )

  );


  setText(

    "wishlistUsed",

    player.wishlist.length

  );


  setText(

    "wishlistMaximum",

    player.upgrades
      .wishlistSlots

  );


  updateNextClaimNotice();

  updateProfile();

}



/*
==================================================
HELPERS
==================================================
*/

function setText(
  id,
  value
) {

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


function escapeHtml(value) {

  return String(value)

    .replaceAll(
      "&",
      "&amp;"
    )

    .replaceAll(
      "<",
      "&lt;"
    )

    .replaceAll(
      ">",
      "&gt;"
    )

    .replaceAll(
      '"',
      "&quot;"
    )

    .replaceAll(
      "'",
      "&#039;"
    );

}


function escapeAttribute(value) {

  return escapeHtml(value);

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
