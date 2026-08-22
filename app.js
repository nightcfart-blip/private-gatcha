/*
==================================================
PRIVATE GACHA
ROUNDS + WISHLIST
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
PLAYER MIGRATION
==================================================
*/

function ensurePlayerShape() {

  if (!player) {
    return;
  }


  /*
  --------------------------------
  ROUND SYSTEM
  --------------------------------
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
  --------------------------------
  CLAIMS
  --------------------------------
  */

  if (!player.claims) {

    player.claims = {

      available: 0,

      maximum: 1

    };

  }


  /*
  Older versions began with 1 claim.

  If this save has never made a claim,
  we convert that old starter claim to
  the new Round system.
  */

  if (
    player.rounds.current === 1
    &&
    player.statistics?.totalClaims === 0
    &&
    player.claims.available === 1
  ) {

    player.claims.available = 0;

  }


  if (!player.storedClaims) {

    player.storedClaims = {

      current: 0,

      maximum: 0

    };

  }


  /*
  --------------------------------
  WISHLIST
  --------------------------------
  */

  if (
    !Array.isArray(player.wishlist)
  ) {

    player.wishlist = [];

  }


  /*
  --------------------------------
  COLLECTION
  --------------------------------
  */

  if (
    !Array.isArray(
      player.claimedCharacters
    )
  ) {

    player.claimedCharacters = [];

  }


  /*
  --------------------------------
  KEYS
  --------------------------------
  */

  if (!player.keys) {

    player.keys = {};

  }


  /*
  --------------------------------
  UPGRADES
  --------------------------------
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
  --------------------------------
  STATS
  --------------------------------
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
        "This save appears damaged."
      );

      return;

    }

  }

  else {

    player =
      createDefaultPlayer();

  }


  activeSaveSlot =
    slot;


  ensurePlayerShape();


  /*
  Restore the current Round's deck.

  If there isn't one yet, create it once.
  */

  if (
    player.rounds.currentBatch.length === 0
  ) {

    generateRoundDeck();

  }

  else {

    currentBatch =
      player.rounds.currentBatch;

  }


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


  renderDeck();

  updateEverything();

  saveGame();

}



/*
==================================================
SAVE
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


  player.rounds.currentBatch =
    currentBatch;


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
SAVE CARDS
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

        "Round "

        +

        formatNumber(
          save.rounds?.current
          ?? 1
        )

        +

        "  ·  "

        +

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
    !confirm(
      "Overwrite this save?"
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


  document
    .getElementById(
      "page-" + pageName
    )
    .classList.add(
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
ROUND SYSTEM
==================================================

Round 1:
6 rolls
0 claims

Round 5:
+1 claim

Round 10:
+1 claim

Round 15:
+1 claim

etc.
==================================================
*/

function startNextRound() {

  if (!player) {
    return;
  }


  player.rounds.current += 1;


  /*
  Every fifth Round awards one claim.
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


  /*
  Return the horizontal deck to
  the first card.
  */

  const rail =
    document.getElementById(
      "rollRail"
    );


  rail.scrollTo({

    left: 0,

    behavior: "smooth"

  });

}



/*
==================================================
GENERATE ONE ROUND
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
    Make a plain copy.

    This means the save file can safely
    remember the exact result.
    */

    const savedResult =
      JSON.parse(
        JSON.stringify(result)
      );


    currentBatch.push(
      savedResult
    );


    player.statistics
      .totalRolls += 1;


    if (
      result.type === "character"
    ) {

      player.statistics
        .totalCharactersSeen += 1;

    }


    /*
    Currency rolls pay immediately,
    ONCE when the Round is created.
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


  player.rounds.currentBatch =
    currentBatch;

}



/*
==================================================
EQUAL RANDOM ENTRY
==================================================
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
==================================================
RENDER ROUND DECK
==================================================
*/

function renderDeck() {

  const rail =
    document.getElementById(
      "rollRail"
    );


  rail.innerHTML = "";


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

  renderCollection();

  renderWishlistPage();

  updateEverything();

  saveGame();

}



/*
==================================================
WISHLIST
==================================================

OWNED characters are allowed.

Wishlist capacity comes from:

player.upgrades.wishlistSlots

So later upgrades only need to change that number.
==================================================
*/

function toggleWishlist(
  characterId
) {

  const index =
    player.wishlist.indexOf(
      characterId
    );


  /*
  Already wished:
  remove it.
  */

  if (
    index !== -1
  ) {

    player.wishlist.splice(
      index,
      1
    );

  }


  /*
  Not wished:
  add it if there is room.
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


  container.innerHTML = "";


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
SEARCH WISHLIST CHARACTERS
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


  /*
  Don't dump thousands of characters
  onto the phone before the user searches.
  */

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
      .slice(0, 30);


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
COLLECTION PAGE
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

  return characterDatabase.find(

    function (character) {

      return character.id === id;

    }

  );

}



/*
==================================================
PROBABILITIES
==================================================
*/

function getCharacterProbability() {

  return formatPercent(

    1 / rollDatabase.length

  );

}


function getCurrencyProbability() {

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
  decimal
) {

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
==================================================
CARD POSITION
==================================================
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
==================================================
NEXT CLAIM DISPLAY
==================================================
*/

function updateNextClaimNotice() {

  const round =
    player.rounds.current;


  const remainder =
    round % 5;


  let nextClaimRound;


  if (
    remainder === 0
  ) {

    nextClaimRound =
      round + 5;

  }

  else {

    nextClaimRound =
      round
      +
      (5 - remainder);

  }


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
          Number(amount || 0)
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
UPDATE APP
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
START
==================================================
*/

window.addEventListener(

  "DOMContentLoaded",

  function () {

    updateSaveSlotInfo();

  }

);
