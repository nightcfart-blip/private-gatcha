/*
==================================================
PRIVATE GACHA
APP.JS

ROUNDS + CLAIMS + WISHLIST
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
MAKE SURE OLD SAVES HAVE NEW DATA
==================================================
*/

function ensurePlayerShape() {

  if (!player) {
    return;
  }


  /*
  ------------------------------
  CURRENCY
  ------------------------------
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
  ------------------------------
  ROUND SYSTEM
  ------------------------------
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


  if (
    !Array.isArray(
      player.rounds.currentBatch
    )
  ) {

    player.rounds.currentBatch = [];

  }



  /*
  ------------------------------
  CLAIMS
  ------------------------------
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
  ------------------------------
  STORED CLAIMS
  ------------------------------
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
  ------------------------------
  COLLECTION
  ------------------------------
  */

  if (
    !Array.isArray(
      player.claimedCharacters
    )
  ) {

    player.claimedCharacters = [];

  }



  /*
  ------------------------------
  WISHLIST
  ------------------------------
  */

  if (
    !Array.isArray(
      player.wishlist
    )
  ) {

    player.wishlist = [];

  }



  /*
  ------------------------------
  KEYS
  ------------------------------
  */

  if (!player.keys) {

    player.keys = {};

  }



  /*
  ------------------------------
  REACTION POWER
  ------------------------------
  */

  if (!player.reactionPower) {

    player.reactionPower = {

      current: 100,

      maximum: 100,

      regeneration: 1

    };

  }



  /*
  ------------------------------
  TOWER
  ------------------------------
  */

  if (!player.tower) {

    player.tower = {

      currentFloor: 1,

      highestFloor: 1,

      totalFloorsCleared: 0

    };

  }



  /*
  ------------------------------
  UPGRADES
  ------------------------------
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
  ------------------------------
  STATISTICS
  ------------------------------
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

}



/*
==================================================
LOAD SAVE
==================================================
*/

function loadSave(slot) {

  console.log(
    "Opening Save",
    slot
  );


  const raw =
    localStorage.getItem(
      getSaveName(slot)
    );


  /*
  Load existing save.
  */

  if (raw) {

    try {

      player =
        JSON.parse(raw);

    }

    catch (error) {

      console.error(error);

      alert(
        "Save " +
        slot +
        " could not be read."
      );

      return;

    }

  }


  /*
  Or create new save.
  */

  else {

    try {

      player =
        createDefaultPlayer();

    }

    catch (error) {

      console.error(error);

      alert(
        "The default save data could not be created."
      );

      return;

    }

  }


  activeSaveSlot =
    slot;


  /*
  Upgrade older saves.
  */

  ensurePlayerShape();



  /*
  IMPORTANT FIX:

  Enter the app FIRST.

  The deck gets generated AFTER the
  Save screen disappears.
  */

  const saveScreen =
    document.getElementById(
      "saveScreen"
    );


  const gameScreen =
    document.getElementById(
      "gameScreen"
    );


  if (saveScreen) {

    saveScreen.classList.add(
      "hidden"
    );

  }


  if (gameScreen) {

    gameScreen.classList.remove(
      "hidden"
    );

  }



  /*
  Show Rolls page.
  */

  const rollsButton =
    document.querySelector(
      '[data-page="rolls"]'
    );


  showPage(
    "rolls",
    rollsButton
  );



  /*
  Now prepare current Round.
  */

  prepareCurrentRound();


  updateEverything();

  saveGame();

}



/*
==================================================
PREPARE CURRENT ROUND
==================================================
*/

function prepareCurrentRound() {

  /*
  Safety check so a database problem
  cannot crash the entire app.
  */

  if (
    typeof rollDatabase === "undefined"
  ) {

    console.error(
      "rollDatabase is undefined."
    );


    alert(
      "The app opened, but the roll database did not load."
    );


    currentBatch = [];

    return;

  }


  if (
    !Array.isArray(rollDatabase)
  ) {

    console.error(
      "rollDatabase is not an array."
    );


    alert(
      "The roll database has the wrong format."
    );


    currentBatch = [];

    return;

  }


  if (
    rollDatabase.length === 0
  ) {

    alert(
      "The roll database is empty."
    );


    currentBatch = [];

    return;

  }



  /*
  Restore saved Round if one exists.
  */

  if (
    Array.isArray(
      player.rounds.currentBatch
    )
    &&
    player.rounds.currentBatch.length > 0
  ) {

    currentBatch =
      player.rounds.currentBatch;


    renderDeck();

    return;

  }



  /*
  Otherwise create Round 1.
  */

  generateRoundDeck();

  renderDeck();

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


  player.lastSavedAt =
    Date.now();


  /*
  Remember current cards too.
  */

  if (player.rounds) {

    player.rounds.currentBatch =
      currentBatch;

  }


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


  const gameScreen =
    document.getElementById(
      "gameScreen"
    );


  const saveScreen =
    document.getElementById(
      "saveScreen"
    );


  if (gameScreen) {

    gameScreen.classList.add(
      "hidden"
    );

  }


  if (saveScreen) {

    saveScreen.classList.remove(
      "hidden"
    );

  }


  updateSaveSlotInfo();

}



/*
==================================================
SAVE SELECT INFORMATION
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
        "slot" +
        slot +
        "Title"
      );


    const info =
      document.getElementById(
        "slot" +
        slot +
        "Info"
      );


    if (
      !title
      ||
      !info
    ) {

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


      title.textContent =
        "Continue Collection";


      const round =
        save.rounds?.current
        ?? 1;


      const claimed =
        save.claimedCharacters?.length
        ?? 0;


      const currency =
        save.currency?.kakera
        ?? 0;


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


    catch (error) {

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


  const modal =
    document.getElementById(
      "saveModal"
    );


  if (modal) {

    modal.classList.remove(
      "hidden"
    );

  }

}


function closeSaveMenu() {

  const modal =
    document.getElementById(
      "saveModal"
    );


  if (modal) {

    modal.classList.add(
      "hidden"
    );

  }


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
PAGE NAVIGATION
==================================================
*/

function showPage(
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


  const page =
    document.getElementById(
      "page-" + pageName
    );


  if (page) {

    page.classList.add(
      "active-page"
    );

  }


  const buttons =
    document.querySelectorAll(
      ".nav-button"
    );


  buttons.forEach(

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


  if (
    pageName === "profile"
  ) {

    updateProfile();

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


  player.rounds.current += 1;



  /*
  Every fifth Round gives +1 Claim.

  5
  10
  15
  20
  ...
  */

  if (
    player.rounds.current % 5
    === 0
  ) {

    player.claims.available += 1;

  }



  generateRoundDeck();

  renderDeck();

  updateEverything();

  saveGame();



  /*
  Scroll back to card 1.
  */

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
GENERATE ROUND DECK
==================================================
*/

function generateRoundDeck() {

  currentBatch = [];


  const amount =
    Math.max(

      1,

      Math.floor(
        player.rounds.rollsPerRound
      )

    );


  for (
    let i = 0;
    i < amount;
    i++
  ) {

    const result =
      getRandomEntry();


    /*
    Save a clean independent copy.
    */

    const copy =
      JSON.parse(
        JSON.stringify(result)
      );


    currentBatch.push(
      copy
    );


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

      const amount =
        Number(
          result.amount || 0
        );


      player.currency.kakera +=
        amount;


      player.statistics
        .totalCurrencyEarned +=
        amount;

    }

  }


  player.rounds.currentBatch =
    currentBatch;

}



/*
==================================================
EQUAL RANDOM RESULT
==================================================
*/

function getRandomEntry() {

  const index =
    Math.floor(

      Math.random()

      *

      rollDatabase.length

    );


  return rollDatabase[
    index
  ];

}



/*
==================================================
RENDER DECK
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

    function () {

      updateCardPosition();

    },

    50

  );

}



/*
==================================================
CHARACTER CARD
==================================================
*/

function buildCharacterCard(
  character,
  batchIndex
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
    player.keys[
      character.id
    ]
    ?? 0;


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

          #${formatNumber(
            character.rank
          )}

        </div>


        <div class="card-value">

          <i>
            ◈
          </i>

          ${formatNumber(
            character.value
          )}

        </div>


      </div>


      <h2 class="card-name">

        ${escapeHtml(
          character.name
        )}

      </h2>


      <p class="card-series">

        ${escapeHtml(
          character.series
        )}

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



      <div class="card-buttons">


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



        <button
          class="
            wish-button
            ${wished ? "active" : ""}
          "

          onclick="
            toggleWishlist(
              '${escapeHtml(character.id)}'
            )
          "
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

      +${formatNumber(
        result.amount
      )}

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
CLAIM CHARACTER
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
      "You have no claims available."
    );

    return;

  }


  player.claimedCharacters.push(
    characterId
  );


  player.claims.available -= 1;


  player.statistics.totalClaims += 1;


  renderDeck();

  renderWishlistPage();

  renderCollection();

  updateEverything();

  saveGame();

}



/*
==================================================
TOGGLE WISHLIST
==================================================
*/

function toggleWishlist(
  characterId
) {

  if (!player) {
    return;
  }


  const currentIndex =
    player.wishlist.indexOf(
      characterId
    );


  /*
  Character is already wished.

  Remove them.
  */

  if (
    currentIndex !== -1
  ) {

    player.wishlist.splice(
      currentIndex,
      1
    );

  }


  /*
  Otherwise add them.
  */

  else {

    const maximum =
      player.upgrades
        .wishlistSlots;


    if (
      player.wishlist.length
      >=
      maximum
    ) {

      alert(

        "Wishlist full: "

        +

        maximum

        +

        " / "

        +

        maximum

      );


      return;

    }


    player.wishlist.push(
      characterId
    );

  }


  /*
  Refresh everything that might show
  Wishlist state.
  */

  renderDeck();

  renderWishlistPage();

  renderCollection();

  updateEverything();

  saveGame();

}



/*
==================================================
WISHLIST PAGE
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

      function (characterId) {

        const character =
          findCharacterById(
            characterId
          );


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
SEARCH CHARACTERS
==================================================
*/

function searchWishlistCharacters() {

  const input =
    document.getElementById(
      "wishlistSearch"
    );


  const container =
    document.getElementById(
      "wishlistSearchResults"
    );


  if (
    !input
    ||
    !container
  ) {

    return;

  }


  const query =
    input.value
      .trim()
      .toLowerCase();


  container.innerHTML =
    "";


  if (
    query.length < 2
  ) {

    container.innerHTML = `

      <div class="empty-list">

        Type at least 2 letters to search.

      </div>

    `;


    return;

  }


  const matches =
    characterDatabase
      .filter(

        function (character) {

          return (

            character.name
              .toLowerCase()
              .includes(query)

            ||

            character.series
              .toLowerCase()
              .includes(query)

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

    container.innerHTML = `

      <div class="empty-list">

        No characters found.

      </div>

    `;


    return;

  }


  matches.forEach(

    function (character) {

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
CHARACTER LIST ITEM
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

        ${escapeHtml(
          character.name
        )}

      </h3>


      <p>

        ${escapeHtml(
          character.series
        )}

      </p>


      <small>

        #${formatNumber(
          character.rank
        )}

        ·

        ◈ ${formatNumber(
          character.value
        )}

        ${owned ? " · OWNED" : ""}

      </small>


    </div>



    <button
      class="
        list-wish-button
        ${wished ? "active" : ""}
      "

      onclick="
        toggleWishlist(
          '${escapeHtml(character.id)}'
        )
      "
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

  if (!player) {
    return;
  }


  const container =
    document.getElementById(
      "collectionList"
    );


  if (!container) {
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

    function (characterId) {

      const character =
        findCharacterById(
          characterId
        );


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

function findCharacterById(
  characterId
) {

  return characterDatabase.find(

    function (character) {

      return (
        character.id
        ===
        characterId
      );

    }

  );

}



/*
==================================================
SPAWN PROBABILITIES
==================================================
*/

function getCharacterProbability() {

  return formatPercent(

    1
    /
    rollDatabase.length

  );

}


function getCurrencyProbability() {

  return formatPercent(

    2
    /
    rollDatabase.length

  );

}


function getEmptyProbability() {

  return formatPercent(

    1000
    /
    rollDatabase.length

  );

}


function formatPercent(
  decimal
) {

  const percentage =
    decimal * 100;


  if (
    percentage >= 1
  ) {

    return percentage.toFixed(2);

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

    return;

  }


  const center =
    rail.scrollLeft
    +
    (
      rail.clientWidth
      /
      2
    );


  let closestIndex =
    0;


  let closestDistance =
    Infinity;


  cards.forEach(

    function (
      card,
      index
    ) {

      const cardCenter =

        card.offsetLeft

        +

        (
          card.offsetWidth
          /
          2
        );


      const distance =
        Math.abs(
          center
          -
          cardCenter
        );


      if (
        distance
        <
        closestDistance
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

    (closestIndex + 1)

    +

    " / "

    +

    cards.length

  );

}



/*
==================================================
NEXT CLAIM
==================================================
*/

function updateNextClaimNotice() {

  const currentRound =
    player.rounds.current;


  const nextClaimRound =

    (
      Math.floor(
        currentRound / 5
      )

      +

      1

    )

    *

    5;


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
UPDATE ALL DISPLAY VALUES
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
    document.getElementById(
      id
    );


  if (element) {

    element.textContent =
      value;

  }

}


function formatNumber(
  number
) {

  return Number(
    number ?? 0
  ).toLocaleString();

}


function escapeHtml(
  text
) {

  return String(text)

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
