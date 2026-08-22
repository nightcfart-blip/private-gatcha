/*
========================================================
PRIVATE GACHA
ROUNDS + WISHES + REACTIONS + BADGES
========================================================
*/


let player = null;

let activeSaveSlot = null;

let currentBatch = [];

let selectedSaveSlot = null;



/*
========================================================
GAME CONSTANTS
========================================================
*/


/*
You did not specify the chance that a CHARACTER
spawns a reaction.

For now it is 10%.

Change this one number later if you want.
*/

const BASE_REACTION_SPAWN_CHANCE = 10;


/*
Your reaction rarity percentages add to 100.2%.

Rather than silently changing your numbers,
we use them as relative WEIGHTS.
*/

const REACTION_TYPES = [

  {
    id: "purple",
    name: "Purple",
    weight: 4.4,
    min: 1000,
    max: 1000
  },

  {
    id: "blue",
    name: "Blue",
    weight: 30.1,
    min: 1001,
    max: 1500
  },

  {
    id: "teal",
    name: "Teal",
    weight: 10.1,
    min: 1701,
    max: 2200
  },

  {
    id: "green",
    name: "Green",
    weight: 10.1,
    min: 2501,
    max: 3000
  },

  {
    id: "yellow",
    name: "Yellow",
    weight: 30.1,
    min: 4001,
    max: 5000
  },

  {
    id: "orange",
    name: "Orange",
    weight: 10.1,
    min: 7001,
    max: 8000
  },

  {
    id: "red",
    name: "Red",
    weight: 0.26,
    min: 14001,
    max: 15000
  },

  {
    id: "rainbow",
    name: "Rainbow",
    weight: 0.044,
    min: 30001,
    max: 31000
  },

  {
    id: "white",
    name: "White",
    weight: 4.4,
    min: 0,
    max: 0
  },

  {
    id: "black",
    name: "Black",
    weight: 0.596,
    min: 0,
    max: 0
  }

];



/*
========================================================
BADGE DATA
========================================================
*/


const BADGES = {


  bronze: {

    name: "Bronze",

    unlock: null,

    levels: [

      {
        cost: 1250,
        effects: [
          "+2 Wishlist Slots"
        ]
      },

      {
        cost: 2500,
        effects: [
          "+2 Wishlist Slots",
          "+25 ◈ when rolling a Wish"
        ]
      },

      {
        cost: 5000,
        effects: [
          "+3 Wishlist Slots",
          "Unlocks Silver Badge"
        ]
      },

      {
        cost: 12500,
        effects: [
          "Unlocks Starwish Trading",
          "+1 Starwish Slot"
        ]
      },

      {
        cost: 25000,
        effects: [
          "+5 Wishlist Slots",
          "Claiming a Character earns its ◈ value"
        ]
      },

      {
        cost: 75000,
        effects: [
          "+10 Wishlist Slots"
        ]
      },

      {
        cost: 225000,
        effects: [
          "+15 Wishlist Slots"
        ]
      },

      {
        cost: 675000,
        effects: [
          "+20 Wishlist Slots"
        ]
      }

    ]

  },



  silver: {

    name: "Silver",

    unlock: {
      badge: "bronze",
      level: 3
    },

    levels: [

      {
        cost: 2500,
        effects: [
          "+25% Wished Character chance"
        ]
      },

      {
        cost: 5000,
        effects: [
          "+40% Wished Character chance"
        ]
      },

      {
        cost: 10000,
        effects: [
          "+55% Wished Character chance",
          "Unlocks Gold Badge"
        ]
      },

      {
        cost: 25000,
        effects: [
          "+120% additional Starwish chance",
          "+80% Wished Character chance"
        ]
      },

      {
        cost: 50000,
        effects: [
          "+180% additional Starwish chance",
          "+100% Wished Character chance"
        ]
      },

      {
        cost: 150000,
        effects: [
          "+100% additional Starwish chance",
          "+50% Wished Character chance"
        ]
      },

      {
        cost: 450000,
        effects: [
          "+100% additional Starwish chance",
          "+50% Wished Character chance"
        ]
      },

      {
        cost: 1350000,
        effects: [
          "+100% additional Starwish chance",
          "+50% Wished Character chance"
        ]
      }

    ]

  },



  gold: {

    name: "Gold",

    unlock: {
      badge: "silver",
      level: 3
    },

    levels: [

      {
        cost: 5000,
        effects: [
          "-10% Reaction Cost"
        ]
      },

      {
        cost: 10000,
        effects: [
          "-10% Reaction Cost"
        ]
      },

      {
        cost: 20000,
        effects: [
          "-10% Reaction Cost",
          "+10% Reaction Power Cap",
          "Unlocks Sapphire Badge"
        ]
      },

      {
        cost: 50000,
        effects: [
          "-10% Reaction Cost",
          "+20% Reaction Power Cap"
        ]
      },

      {
        cost: 100000,
        effects: [
          "-20% Reaction Cost",
          "Once per Round, the lowest eligible Reaction is upgraded"
        ]
      },

      {
        cost: 300000,
        effects: [
          "+10% Reaction Power Cap"
        ]
      },

      {
        cost: 900000,
        effects: [
          "+10% Reaction Power Cap"
        ]
      },

      {
        cost: 2700000,
        effects: [
          "+10% Reaction Power Cap"
        ]
      }

    ]

  },



  sapphire: {

    name: "Sapphire",

    unlock: {
      badge: "gold",
      level: 3
    },

    levels: [

      {
        cost: 10000,
        effects: [
          "+2 Rolls per Round"
        ]
      },

      {
        cost: 20000,
        effects: [
          "+3 Rolls per Round"
        ]
      },

      {
        cost: 40000,
        effects: [
          "+5 Rolls per Round",
          "Unlocks Ruby Badge"
        ]
      },

      {
        cost: 100000,
        effects: [
          "+8 Rolls per Round"
        ]
      },

      {
        cost: 200000,
        effects: [
          "+10 Rolls per Round",
          "Roll Currency doubles"
        ]
      },

      {
        cost: 600000,
        effects: [
          "+10 Rolls per Round"
        ]
      },

      {
        cost: 1800000,
        effects: [
          "+10 Rolls per Round"
        ]
      },

      {
        cost: 5400000,
        effects: [
          "+10 Rolls per Round"
        ]
      }

    ]

  },



  ruby: {

    name: "Ruby",

    unlock: {
      badge: "sapphire",
      level: 3
    },

    levels: [

      {
        cost: 20000,
        effects: [
          "Claims regenerate every 4 Rounds"
        ]
      },

      {
        cost: 40000,
        effects: [
          "+1 Stored Claim Cap"
        ]
      },

      {
        cost: 80000,
        effects: [
          "+1 Stored Claim Cap",
          "Unlocks Emerald Badge"
        ]
      },

      {
        cost: 200000,
        effects: [
          "Claims regenerate every 3 Rounds"
        ]
      },

      {
        cost: 400000,
        effects: [
          "+1 Stored Claim Cap"
        ]
      },

      {
        cost: 1200000,
        effects: [
          "+1 Stored Claim Cap"
        ]
      },

      {
        cost: 3600000,
        effects: [
          "+1 Stored Claim Cap"
        ]
      },

      {
        cost: 10800000,
        effects: [
          "+1 Stored Claim Cap"
        ]
      }

    ]

  },



  emerald: {

    name: "Emerald",

    unlock: {
      badge: "ruby",
      level: 3
    },

    levels: [

      {
        cost: 40000,
        effects: [
          "+2 Reaction Power regeneration per Round"
        ]
      },

      {
        cost: 80000,
        effects: [
          "+3 Reaction Power regeneration per Round"
        ]
      },

      {
        cost: 160000,
        effects: [
          "+3 Reaction Power regeneration per Round",
          "+10% Reaction Power Cap",
          "Unlocks Diamond Badge"
        ]
      },

      {
        cost: 400000,
        effects: [
          "+2 Reaction Power regeneration per Round",
          "+50 ◈ every 5 Rounds"
        ]
      },

      {
        cost: 800000,
        effects: [
          "+5 Reaction Power regeneration per Round"
        ]
      },

      {
        cost: 2400000,
        effects: [
          "+5 Reaction Power regeneration per Round"
        ]
      },

      {
        cost: 7200000,
        effects: [
          "+5 Reaction Power regeneration per Round"
        ]
      },

      {
        cost: 21600000,
        effects: [
          "+5 Reaction Power regeneration per Round"
        ]
      }

    ]

  },



  diamond: {

    name: "Diamond",

    unlock: {
      badge: "emerald",
      level: 3
    },

    levels: [

      {
        cost: 80000,
        effects: [
          "Unlocks Spheres",
          "Claiming a Character gives +2 Sphere draws"
        ]
      },

      {
        cost: 160000,
        effects: [
          "Claiming a Character gives +3 Sphere draws"
        ]
      },

      {
        cost: 320000,
        effects: [
          "Claiming a Character gives +5 Sphere draws",
          "Unlocks Obsidian Badge"
        ]
      },

      {
        cost: 800000,
        effects: [
          "Claiming a Wished Character gives +5 Sphere draws",
          "Unlocks Rainbow Spheres"
        ]
      },

      {
        cost: 1600000,
        effects: [
          "Claiming a Character gives +10 Sphere draws",
          "Blue Spheres become rarer"
        ]
      },

      {
        cost: 4800000,
        effects: [
          "Blue Spheres become rarer"
        ]
      },

      {
        cost: 14400000,
        effects: [
          "Blue Spheres become rarer"
        ]
      },

      {
        cost: 43200000,
        effects: [
          "Blue Spheres are deactivated"
        ]
      }

    ]

  },



  obsidian: {

    name: "Obsidian",

    unlock: {
      badge: "diamond",
      level: 3
    },

    levels: [

      {
        cost: 160000,
        effects: [
          "-200 :( entries from Rollpool"
        ]
      },

      {
        cost: 320000,
        effects: [
          "-200 :( entries from Rollpool"
        ]
      },

      {
        cost: 640000,
        effects: [
          "-200 :( entries from Rollpool"
        ]
      },

      {
        cost: 1600000,
        effects: [
          "-200 :( entries from Rollpool"
        ]
      },

      {
        cost: 3200000,
        effects: [
          "-200 :( entries from Rollpool"
        ]
      },

      {
        cost: 9600000,
        effects: [
          "Removes +1 through +100 Currency rolls"
        ]
      },

      {
        cost: 28800000,
        effects: [
          "Removes +101 through +200 Currency rolls"
        ]
      },

      {
        cost: 86400000,
        effects: [
          "Removes +201 through +300 Currency rolls"
        ]
      }

    ]

  }

};



/*
========================================================
SAVE
========================================================
*/


function getSaveName(slot) {

  return "privateGachaSave_" + slot;

}



/*
========================================================
PLAYER MIGRATION
========================================================
*/


function ensurePlayerShape() {

  if (!player) {
    return;
  }


  if (!player.currency) {

    player.currency = {
      kakera: 0,
      spheres: 0
    };

  }


  if (
    typeof player.currency.kakera
    !== "number"
  ) {

    player.currency.kakera = 0;

  }


  if (
    typeof player.currency.spheres
    !== "number"
  ) {

    player.currency.spheres = 0;

  }


  if (!player.statistics) {

    player.statistics = {};

  }


  const stats = {

    totalRolls: 0,
    totalClaims: 0,
    totalCharactersSeen: 0,
    totalCurrencyEarned: 0,
    totalCurrencySpent: 0,
    totalReactions: 0,
    totalKeysEarned: 0,
    totalSphereDraws: 0

  };


  for (
    const key in stats
  ) {

    if (
      typeof player.statistics[key]
      !== "number"
    ) {

      player.statistics[key] =
        stats[key];

    }

  }



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
    !Array.isArray(
      player.rounds.currentBatch
    )
  ) {

    player.rounds.currentBatch = [];

  }



  if (!player.claims) {

    player.claims = {
      available: 1,
      maximum: 1
    };

  }


  /*
  We now START WITH A CLAIM.

  Old saves that were stuck at 0 on Round 1
  get their starter claim restored.
  */

  if (
    player.rounds.current === 1
    &&
    player.statistics.totalClaims === 0
    &&
    player.claims.available === 0
  ) {

    player.claims.available = 1;

  }



  if (!player.storedClaims) {

    player.storedClaims = {
      current: 0,
      maximum: 0
    };

  }



  if (
    !Array.isArray(
      player.claimedCharacters
    )
  ) {

    player.claimedCharacters = [];

  }


  if (
    !Array.isArray(player.wishlist)
  ) {

    player.wishlist = [];

  }


  if (
    !Array.isArray(player.starwishes)
  ) {

    player.starwishes = [];

  }


  if (!player.keys) {

    player.keys = {};

  }



  if (!player.badges) {

    player.badges = {};

  }


  for (
    const badgeId
    of Object.keys(BADGES)
  ) {

    if (
      typeof player.badges[badgeId]
      !== "number"
    ) {

      player.badges[badgeId] = 0;

    }

  }



  if (!player.starwishTrading) {

    player.starwishTrading = {
      trades: 0
    };

  }



  if (!player.reactionPower) {

    player.reactionPower = {
      current: 100,
      maximum: 100
    };

  }


  if (
    typeof player.reactionPower.current
    !== "number"
  ) {

    player.reactionPower.current = 100;

  }


  if (
    typeof player.reactionPower.maximum
    !== "number"
  ) {

    player.reactionPower.maximum = 100;

  }



  if (!player.sphereInventory) {

    player.sphereInventory = {
      blue: 0,
      teal: 0,
      green: 0,
      yellow: 0,
      orange: 0,
      red: 0,
      rainbow: 0
    };

  }


  if (!player.upgrades) {

    player.upgrades = {};

  }


  if (!player.tower) {

    player.tower = {
      currentFloor: 1
    };

  }


  recalculateBonuses();

}



/*
========================================================
CALCULATE ALL BADGE BONUSES
========================================================
*/


function recalculateBonuses() {

  if (!player) {
    return;
  }


  const b = player.badges;


  let wishlistSlots = 10;

  let starwishSlots = 0;

  let wishCurrencyBonus = 0;

  let wishSpawnBonus = 0;

  let starwishSpawnBonus = 0;

  let claimValueReward = false;

  let reactionCost = 100;

  let reactionMax = 100;

  let reactionRegen = 1;

  let rollsPerRound = 6;

  let claimInterval = 5;

  let storedClaimCap = 0;

  let currencyRollMultiplier = 1;

  let goldReactionUpgrade = false;

  let spheresUnlocked = false;

  let sphereClaimDraws = 0;

  let wishedSphereBonus = 0;



  /*
  BRONZE
  */

  if (b.bronze >= 1) wishlistSlots += 2;

  if (b.bronze >= 2) {

    wishlistSlots += 2;

    wishCurrencyBonus += 25;

  }

  if (b.bronze >= 3) wishlistSlots += 3;

  if (b.bronze >= 4) starwishSlots += 1;

  if (b.bronze >= 5) {

    wishlistSlots += 5;

    claimValueReward = true;

  }

  if (b.bronze >= 6) wishlistSlots += 10;

  if (b.bronze >= 7) wishlistSlots += 15;

  if (b.bronze >= 8) wishlistSlots += 20;



  /*
  SILVER
  */

  if (b.silver >= 1) wishSpawnBonus += 25;

  if (b.silver >= 2) wishSpawnBonus += 40;

  if (b.silver >= 3) wishSpawnBonus += 55;

  if (b.silver >= 4) {

    wishSpawnBonus += 80;

    starwishSpawnBonus += 120;

  }

  if (b.silver >= 5) {

    wishSpawnBonus += 100;

    starwishSpawnBonus += 180;

  }

  if (b.silver >= 6) {

    wishSpawnBonus += 50;

    starwishSpawnBonus += 100;

  }

  if (b.silver >= 7) {

    wishSpawnBonus += 50;

    starwishSpawnBonus += 100;

  }

  if (b.silver >= 8) {

    wishSpawnBonus += 50;

    starwishSpawnBonus += 100;

  }



  /*
  GOLD
  */

  if (b.gold >= 1) reactionCost -= 10;

  if (b.gold >= 2) reactionCost -= 10;

  if (b.gold >= 3) {

    reactionCost -= 10;

    reactionMax += 10;

  }

  if (b.gold >= 4) {

    reactionCost -= 10;

    reactionMax += 20;

  }

  if (b.gold >= 5) {

    reactionCost -= 20;

    goldReactionUpgrade = true;

  }

  if (b.gold >= 6) reactionMax += 10;

  if (b.gold >= 7) reactionMax += 10;

  if (b.gold >= 8) reactionMax += 10;



  /*
  SAPPHIRE
  */

  if (b.sapphire >= 1) rollsPerRound += 2;

  if (b.sapphire >= 2) rollsPerRound += 3;

  if (b.sapphire >= 3) rollsPerRound += 5;

  if (b.sapphire >= 4) rollsPerRound += 8;

  if (b.sapphire >= 5) {

    rollsPerRound += 10;

    currencyRollMultiplier = 2;

  }

  if (b.sapphire >= 6) rollsPerRound += 10;

  if (b.sapphire >= 7) rollsPerRound += 10;

  if (b.sapphire >= 8) rollsPerRound += 10;



  /*
  RUBY
  */

  if (b.ruby >= 1) claimInterval = 4;

  if (b.ruby >= 2) storedClaimCap += 1;

  if (b.ruby >= 3) storedClaimCap += 1;

  if (b.ruby >= 4) claimInterval = 3;

  if (b.ruby >= 5) storedClaimCap += 1;

  if (b.ruby >= 6) storedClaimCap += 1;

  if (b.ruby >= 7) storedClaimCap += 1;

  if (b.ruby >= 8) storedClaimCap += 1;



  /*
  EMERALD
  */

  if (b.emerald >= 1) reactionRegen += 2;

  if (b.emerald >= 2) reactionRegen += 3;

  if (b.emerald >= 3) {

    reactionRegen += 3;

    reactionMax += 10;

  }

  if (b.emerald >= 4) reactionRegen += 2;

  if (b.emerald >= 5) reactionRegen += 5;

  if (b.emerald >= 6) reactionRegen += 5;

  if (b.emerald >= 7) reactionRegen += 5;

  if (b.emerald >= 8) reactionRegen += 5;



  /*
  DIAMOND
  */

  if (b.diamond >= 1) {

    spheresUnlocked = true;

    sphereClaimDraws += 2;

  }

  if (b.diamond >= 2) sphereClaimDraws += 3;

  if (b.diamond >= 3) sphereClaimDraws += 5;

  if (b.diamond >= 4) wishedSphereBonus += 5;

  if (b.diamond >= 5) sphereClaimDraws += 10;



  player.upgrades = {

    ...player.upgrades,

    wishlistSlots,

    starwishSlots,

    wishValueBonus:
      wishCurrencyBonus,

    wishSpawnBonus,

    starwishSpawnBonus,

    claimValueReward,

    reactionPowerCost:
      Math.max(
        1,
        reactionCost
      ),

    reactionRegeneration:
      reactionRegen,

    tenthKeyBonus:
      10000,

    additionalKeyChance:
      player.upgrades.additionalKeyChance
      ?? 0,

    claimInterval,

    currencyRollMultiplier,

    goldReactionUpgrade,

    spheresUnlocked,

    sphereClaimDraws,

    wishedSphereBonus

  };


  player.rounds.rollsPerRound =
    rollsPerRound;


  player.storedClaims.maximum =
    storedClaimCap;


  if (
    player.storedClaims.current
    >
    storedClaimCap
  ) {

    player.storedClaims.current =
      storedClaimCap;

  }


  player.reactionPower.maximum =
    reactionMax;


  if (
    player.reactionPower.current
    >
    reactionMax
  ) {

    player.reactionPower.current =
      reactionMax;

  }

}



/*
========================================================
LOAD
========================================================
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
        "This save could not be read."
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


  if (
    Array.isArray(
      player.rounds.currentBatch
    )
    &&
    player.rounds.currentBatch.length > 0
  ) {

    currentBatch =
      player.rounds.currentBatch;

  }

  else {

    generateRoundDeck();

  }


  renderDeck();

  updateEverything();

  saveGame();

}



/*
========================================================
SAVE
========================================================
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


  player.rounds.currentBatch =
    currentBatch;


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
========================================================
SAVE SCREEN
========================================================
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

        " · "

        +

        formatNumber(
          save.claimedCharacters?.length
          ?? 0
        )

        +

        " claimed · "

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
========================================================
SAVE OPTIONS
========================================================
*/


function openSaveMenu(slot) {

  selectedSaveSlot = slot;


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


  selectedSaveSlot = null;

}


function overwriteSelectedSave() {

  if (
    !player
    ||
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
========================================================
NAVIGATION
========================================================
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


  const page =
    document.getElementById(
      "page-" + pageName
    );


  if (page) {

    page.classList.add(
      "active-page"
    );

  }


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


  if (
    pageName === "badges"
  ) {

    renderBadges();

  }


  if (
    pageName === "spheres"
  ) {

    renderSpheres();

  }

}



/*
========================================================
ROUND SYSTEM
========================================================
*/


function startNextRound() {

  if (!player) {
    return;
  }


  player.rounds.current += 1;


  recalculateBonuses();


  let notices = [];


  /*
  CLAIM REGENERATION
  */

  const interval =
    player.upgrades.claimInterval;


  if (
    player.rounds.current
    %
    interval
    ===
    0
  ) {

    regenerateClaim();


    notices.push(
      "+1 claim regenerated"
    );

  }


  /*
  EMERALD IV

  +50 currency every 5 rounds.
  */

  if (
    player.badges.emerald >= 4
    &&
    player.rounds.current % 5 === 0
  ) {

    player.currency.kakera += 50;


    player.statistics
      .totalCurrencyEarned += 50;


    notices.push(
      "+50 ◈ Emerald bonus"
    );

  }


  /*
  REACTION POWER REGEN
  */

  player.reactionPower.current =
    Math.min(

      player.reactionPower.maximum,

      player.reactionPower.current

      +

      player.upgrades
        .reactionRegeneration

    );


  generateRoundDeck();


  renderDeck();

  updateEverything();

  saveGame();


  showRoundNotice(
    notices.join(" · ")
  );


  const rail =
    document.getElementById(
      "rollRail"
    );


  rail.scrollLeft = 0;

}



/*
========================================================
CLAIM REGEN
========================================================
*/


function regenerateClaim() {

  /*
  One active claim.
  */

  if (
    player.claims.available < 1
  ) {

    player.claims.available = 1;

    return;

  }


  /*
  Active claim already exists.

  Store the extra if storage exists.
  */

  if (
    player.storedClaims.current
    <
    player.storedClaims.maximum
  ) {

    player.storedClaims.current += 1;

  }

}



/*
========================================================
ROUND DECK
========================================================
*/


function generateRoundDeck() {

  currentBatch = [];


  const rollCount =
    player.rounds.rollsPerRound;


  for (
    let i = 0;
    i < rollCount;
    i++
  ) {

    const result =
      getWeightedRollResult();


    if (!result) {
      continue;
    }


    const copy =
      JSON.parse(
        JSON.stringify(result)
      );


    /*
    CHARACTER REACTION
    */

    if (
      copy.type === "character"
    ) {

      player.statistics
        .totalCharactersSeen += 1;


      if (
        Math.random() * 100
        <
        BASE_REACTION_SPAWN_CHANCE
      ) {

        copy.reaction =
          createReaction();

      }

    }


    /*
    CURRENCY PLACEHOLDER RESULT
    */

    if (
      copy.type === "currency"
    ) {

      const amount =
        Number(copy.amount)
        *
        player.upgrades
          .currencyRollMultiplier;


      copy.finalAmount =
        amount;


      player.currency.kakera +=
        amount;


      player.statistics
        .totalCurrencyEarned +=
        amount;

    }


    currentBatch.push(copy);


    player.statistics.totalRolls += 1;

  }


  /*
  GOLD V:
  upgrade the lowest eligible reaction.
  */

  if (
    player.upgrades.goldReactionUpgrade
  ) {

    upgradeLowestReaction();

  }


  player.rounds.currentBatch =
    currentBatch;

}



/*
========================================================
EFFECTIVE ROLLPOOL
========================================================
*/


function getEffectiveRollPool() {

  const obsidian =
    player.badges.obsidian;


  let emptyToRemove =
    Math.min(
      obsidian,
      5
    )
    *
    200;


  let removedEmpty = 0;


  return rollDatabase.filter(

    function (entry) {


      /*
      REMOVE :( ENTRIES
      */

      if (
        entry.type === "empty"
        &&
        removedEmpty < emptyToRemove
      ) {

        removedEmpty += 1;

        return false;

      }


      /*
      OBSIDIAN VI

      Remove +1 through +100.
      */

      if (
        obsidian >= 6
        &&
        entry.type === "currency"
        &&
        entry.amount >= 1
        &&
        entry.amount <= 100
      ) {

        return false;

      }


      /*
      OBSIDIAN VII

      Remove +101 through +200.
      */

      if (
        obsidian >= 7
        &&
        entry.type === "currency"
        &&
        entry.amount >= 101
        &&
        entry.amount <= 200
      ) {

        return false;

      }


      /*
      OBSIDIAN VIII

      Remove +201 through +300.
      */

      if (
        obsidian >= 8
        &&
        entry.type === "currency"
        &&
        entry.amount >= 201
        &&
        entry.amount <= 300
      ) {

        return false;

      }


      return true;

    }

  );

}



/*
========================================================
WEIGHTED ROLLING
========================================================

Normal entry:
weight 1

Wished character:
1 + Wish Bonus

Starwish:
Wish bonus
+
additional Starwish bonus

This preserves equal base probability while
allowing Silver upgrades to work.
========================================================
*/


function getWeightedRollResult() {

  const pool =
    getEffectiveRollPool();


  let totalWeight = 0;


  const weighted =
    pool.map(

      function (entry) {

        let weight = 1;


        if (
          entry.type === "character"
        ) {

          if (
            player.wishlist.includes(
              entry.id
            )
          ) {

            weight *=
              1
              +
              (
                player.upgrades
                  .wishSpawnBonus
                /
                100
              );

          }


          if (
            player.starwishes.includes(
              entry.id
            )
          ) {

            weight *=
              1
              +
              (
                player.upgrades
                  .starwishSpawnBonus
                /
                100
              );

          }

        }


        totalWeight += weight;


        return {
          entry,
          weight
        };

      }

    );


  let random =
    Math.random()
    *
    totalWeight;


  for (
    const item
    of weighted
  ) {

    random -= item.weight;


    if (
      random <= 0
    ) {

      return item.entry;

    }

  }


  return weighted[
    weighted.length - 1
  ].entry;

}



/*
========================================================
REACTION CREATION
========================================================
*/


function createReaction() {

  const type =
    weightedChoice(
      REACTION_TYPES
    );


  let value = 0;


  if (
    type.id !== "white"
    &&
    type.id !== "black"
  ) {

    value =
      randomInteger(
        type.min,
        type.max
      );

  }


  return {

    type: type.id,

    name: type.name,

    value,

    collected: false

  };

}



/*
========================================================
GOLD V REACTION UPGRADE
========================================================
*/


function upgradeLowestReaction() {

  const order = [
    "blue",
    "teal",
    "green",
    "yellow"
  ];


  const nextColor = {

    blue: "teal",

    teal: "green",

    green: "yellow",

    yellow: "orange"

  };


  for (
    const color
    of order
  ) {

    const result =
      currentBatch.find(

        function (entry) {

          return (
            entry.reaction
            &&
            entry.reaction.type
            ===
            color
          );

        }

      );


    if (result) {

      const next =
        REACTION_TYPES.find(

          function (type) {

            return (
              type.id
              ===
              nextColor[color]
            );

          }

        );


      result.reaction = {

        type: next.id,

        name: next.name,

        value:
          randomInteger(
            next.min,
            next.max
          ),

        collected: false

      };


      return;

    }

  }

}



/*
========================================================
COLLECT REACTION
========================================================
*/


function collectReaction(
  batchIndex
) {

  const result =
    currentBatch[
      batchIndex
    ];


  if (
    !result
    ||
    !result.reaction
    ||
    result.reaction.collected
  ) {

    return;

  }


  const cost =
    player.upgrades
      .reactionPowerCost;


  if (
    player.reactionPower.current
    <
    cost
  ) {

    alert(
      "Not enough Reaction Power."
    );

    return;

  }


  player.reactionPower.current -=
    cost;


  let earned = 0;


  const reaction =
    result.reaction;


  /*
  WHITE:
  3-4 random reactions.
  */

  if (
    reaction.type === "white"
  ) {

    const quantity =
      randomInteger(
        3,
        4
      );


    for (
      let i = 0;
      i < quantity;
      i++
    ) {

      const randomReaction =
        createNonWhiteReaction();


      earned +=
        randomReaction.value;

    }

  }


  /*
  BLACK:
  currently worth no currency.
  */

  else if (
    reaction.type === "black"
  ) {

    earned = 0;

  }


  else {

    earned =
      reaction.value;

  }


  player.currency.kakera +=
    earned;


  player.statistics
    .totalCurrencyEarned +=
    earned;


  player.statistics
    .totalReactions += 1;


  reaction.collected = true;


  renderDeck();

  updateEverything();

  saveGame();

}



/*
========================================================
NON-WHITE REACTION FOR WHITE RESULT
========================================================
*/


function createNonWhiteReaction() {

  const options =
    REACTION_TYPES.filter(

      function (type) {

        return (
          type.id !== "white"
          &&
          type.id !== "black"
        );

      }

    );


  const type =
    weightedChoice(options);


  return {

    type: type.id,

    name: type.name,

    value:
      randomInteger(
        type.min,
        type.max
      )

  };

}



/*
========================================================
RENDER DECK
========================================================
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


      rail.appendChild(card);

    }

  );


  rail.addEventListener(
    "scroll",
    updateCardPosition,
    {
      passive: true
    }
  );


  requestAnimationFrame(
    updateCardPosition
  );

}



/*
========================================================
CHARACTER CARD
========================================================
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


  const starwished =
    player.starwishes.includes(
      character.id
    );


  const keys =
    player.keys[
      character.id
    ]
    ?? 0;


  card.className =
    "roll-card";


  if (wished) {

    card.classList.add(
      "wished"
    );

  }


  if (starwished) {

    card.classList.remove(
      "wished"
    );

    card.classList.add(
      "starwished"
    );

  }


  const reactionHtml =
    character.reaction
    ?
    buildReactionHtml(
      character.reaction,
      batchIndex
    )
    :
    "";


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
          src="${escapeHtml(character.image)}"
          alt="${escapeHtml(character.name)}"
          onerror="this.style.display='none'"
        >
        `

        :

        ""
      }

    </div>


    ${reactionHtml}


    <div class="card-footer">

      <div class="card-info">

        <span class="key-value">
          ◆ ${formatNumber(keys)} keys
        </span>

        <span>
          ${getDisplayedCharacterChance(character)}%
        </span>

      </div>


      <div class="card-buttons">

        <button
          class="claim-button"
          onclick="claimCharacter('${escapeHtml(character.id)}')"
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
          onclick="toggleWishlist('${escapeHtml(character.id)}')"
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
========================================================
REACTION HTML
========================================================
*/


function buildReactionHtml(
  reaction,
  batchIndex
) {

  const cssClass =
    "reaction-"
    +
    reaction.type;


  let displayValue;


  if (
    reaction.type === "white"
  ) {

    displayValue =
      "3–4 random";

  }

  else if (
    reaction.type === "black"
  ) {

    displayValue =
      "Black";

  }

  else {

    displayValue =
      formatNumber(
        reaction.value
      )
      +
      " ◈";

  }


  return `

    <div class="reaction-box">

      <div class="reaction-left">

        <i class="reaction-gem ${cssClass}">
          ◈
        </i>

        <div>

          <span class="reaction-name">
            ${reaction.name} Reaction
          </span>

          <span class="reaction-value">
            ${displayValue}
          </span>

        </div>

      </div>


      <button
        class="reaction-collect"

        onclick="collectReaction(${batchIndex})"

        ${reaction.collected ? "disabled" : ""}
      >

        ${
          reaction.collected
          ?
          "COLLECTED"
          :
          "COLLECT"
        }

      </button>

    </div>

  `;

}



/*
========================================================
CURRENCY CARD
========================================================
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


  const amount =
    result.finalAmount
    ??
    result.amount;


  card.innerHTML = `

    <div class="card-decoration">
      ✦ ── ◇ ── ✦
    </div>

    <div class="currency-result-symbol">
      ◈
    </div>

    <h2 class="currency-result-amount">
      +${formatNumber(amount)}
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
          ${getCurrencyProbability(result)}%
        </span>

      </div>

    </div>

  `;


  return card;

}



/*
========================================================
EMPTY CARD
========================================================
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
========================================================
CLAIM CHARACTER
========================================================
*/


function claimCharacter(
  characterId
) {

  const character =
    getCharacterEntries()
      .find(

        function (item) {

          return (
            item.id
            ===
            characterId
          );

        }

      );


  if (!character) {
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


  const wasWished =
    player.wishlist.includes(
      characterId
    );


  player.claimedCharacters.push(
    characterId
  );


  player.claims.available = 0;


  /*
  If stored claims exist,
  automatically move one into
  the active claim position.
  */

  if (
    player.storedClaims.current > 0
  ) {

    player.storedClaims.current -= 1;

    player.claims.available = 1;

  }


  player.statistics.totalClaims += 1;


  /*
  BRONZE V
  */

  if (
    player.upgrades.claimValueReward
  ) {

    player.currency.kakera +=
      character.value;


    player.statistics
      .totalCurrencyEarned +=
      character.value;

  }


  /*
  DIAMOND SPHERES
  */

  let sphereDraws =
    player.upgrades
      .sphereClaimDraws;


  if (
    wasWished
  ) {

    sphereDraws +=
      player.upgrades
        .wishedSphereBonus;

  }


  if (
    sphereDraws > 0
  ) {

    awardSphereDraws(
      sphereDraws
    );

  }


  renderDeck();

  renderCollection();

  updateEverything();

  saveGame();

}



/*
========================================================
WISHLIST
========================================================
*/


function toggleWishlist(
  characterId
) {

  const index =
    player.wishlist.indexOf(
      characterId
    );


  if (
    index !== -1
  ) {

    player.wishlist.splice(
      index,
      1
    );


    /*
    Starwish requires Wishlist,
    so removing Wish removes Starwish too.
    */

    const starIndex =
      player.starwishes.indexOf(
        characterId
      );


    if (
      starIndex !== -1
    ) {

      player.starwishes.splice(
        starIndex,
        1
      );

    }

  }

  else {

    if (
      player.wishlist.length
      >=
      player.upgrades
        .wishlistSlots
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
========================================================
STARWISH
========================================================
*/


function toggleStarwish(
  characterId
) {

  if (
    !player.wishlist.includes(
      characterId
    )
  ) {

    alert(
      "A character must be Wished before it can be Starwished."
    );

    return;

  }


  const index =
    player.starwishes.indexOf(
      characterId
    );


  if (
    index !== -1
  ) {

    player.starwishes.splice(
      index,
      1
    );

  }

  else {

    if (
      player.starwishes.length
      >=
      player.upgrades
        .starwishSlots
    ) {

      alert(
        "You have no open Starwish slots."
      );

      return;

    }


    player.starwishes.push(
      characterId
    );

  }


  renderDeck();

  renderWishlistPage();

  saveGame();

}



/*
========================================================
STARWISH TRADING
========================================================

Bronze IV unlocks this.

Trade 1 costs 1 Wishlist slot.
Trade 2 costs 2 Wishlist slots.
Trade 3 costs 3 Wishlist slots.
etc.

This permanently converts those Wishlist
slots into +1 Starwish slot.
========================================================
*/


function tradeWishlistSlotsForStarwish() {

  if (
    player.badges.bronze < 4
  ) {

    return;

  }


  const cost =
    player.starwishTrading
      .trades
    +
    1;


  if (
    player.upgrades.wishlistSlots
    -
    cost
    <
    player.wishlist.length
  ) {

    alert(
      "You need enough unused Wishlist slots to make this trade."
    );

    return;

  }


  /*
  Store permanent conversion separately.
  */

  if (
    typeof player.starwishTrading
      .wishlistSlotsSpent
    !== "number"
  ) {

    player.starwishTrading
      .wishlistSlotsSpent = 0;

  }


  player.starwishTrading
    .wishlistSlotsSpent += cost;


  player.starwishTrading
    .trades += 1;


  recalculateBonuses();


  /*
  Apply converted slots after badge bonuses.
  */

  applyStarwishTrades();


  renderWishlistPage();

  updateEverything();

  saveGame();

}



/*
========================================================
APPLY STARWISH TRADES
========================================================
*/


function applyStarwishTrades() {

  const spent =
    player.starwishTrading
      .wishlistSlotsSpent
    ??
    0;


  const trades =
    player.starwishTrading
      .trades
    ??
    0;


  player.upgrades.wishlistSlots -=
    spent;


  player.upgrades.starwishSlots +=
    trades;

}



/*
========================================================
WISHLIST SCREEN
========================================================
*/


function renderWishlistPage() {

  if (!player) {
    return;
  }


  recalculateBonuses();

  applyStarwishTrades();


  setText(
    "wishlistUsed",
    player.wishlist.length
  );


  setText(
    "wishlistMaximum",
    player.upgrades
      .wishlistSlots
  );


  setText(
    "starwishUsed",
    player.starwishes.length
  );


  setText(
    "starwishMaximum",
    player.upgrades
      .starwishSlots
  );


  const tradePanel =
    document.getElementById(
      "starwishTradingPanel"
    );


  if (
    player.badges.bronze >= 4
  ) {

    tradePanel.classList.remove(
      "hidden"
    );


    const nextCost =
      player.starwishTrading
        .trades
      +
      1;


    setText(

      "starwishTradeText",

      "Next trade: "
      +
      nextCost
      +
      " Wishlist slot"
      +
      (
        nextCost === 1
        ?
        ""
        :
        "s"
      )
      +
      " → +1 Starwish slot"

    );

  }

  else {

    tradePanel.classList.add(
      "hidden"
    );

  }



  const current =
    document.getElementById(
      "wishlistCurrent"
    );


  current.innerHTML = "";


  if (
    player.wishlist.length === 0
  ) {

    current.innerHTML = `

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


        if (character) {

          current.appendChild(

            buildCharacterListItem(
              character
            )

          );

        }

      }

    );

  }


  searchWishlistCharacters();

}



/*
========================================================
FIXED SEARCH
========================================================
*/


function setupWishlistSearch() {

  const input =
    document.getElementById(
      "wishlistSearch"
    );


  if (!input) {
    return;
  }


  input.addEventListener(

    "input",

    function () {

      searchWishlistCharacters();

    }

  );


  input.addEventListener(

    "keyup",

    function () {

      searchWishlistCharacters();

    }

  );

}



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


  const query =
    input.value
      .trim()
      .toLowerCase();


  results.innerHTML = "";


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


  /*
  IMPORTANT FIX:

  We search characters directly from
  rollDatabase instead of depending on
  characterDatabase.
  */

  const characters =
    getCharacterEntries();


  const matches =
    characters

      .filter(

        function (character) {

          return (

            String(
              character.name
            )
            .toLowerCase()
            .includes(query)

            ||

            String(
              character.series
            )
            .toLowerCase()
            .includes(query)

          );

        }

      )

      .slice(
        0,
        40
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
========================================================
CHARACTER ROW
========================================================
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


  const starwished =
    player.starwishes.includes(
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


    <div class="character-list-buttons">

      <button
        class="list-wish-button ${wished ? "active" : ""}"
        onclick="toggleWishlist('${escapeHtml(character.id)}')"
      >

        ${
          wished
          ?
          "★ WISHED"
          :
          "☆ WISH"
        }

      </button>


      <button
        class="list-star-button ${starwished ? "active" : ""}"
        onclick="toggleStarwish('${escapeHtml(character.id)}')"
        ${
          player.upgrades.starwishSlots <= 0
          ?
          "disabled"
          :
          ""
        }
      >

        ${
          starwished
          ?
          "✦ STAR"
          :
          "◇ STAR"
        }

      </button>

    </div>

  `;


  return item;

}



/*
========================================================
COLLECTION
========================================================
*/


function renderCollection() {

  const list =
    document.getElementById(
      "collectionList"
    );


  list.innerHTML = "";


  if (
    player.claimedCharacters.length === 0
  ) {

    list.innerHTML = `

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


      if (character) {

        list.appendChild(

          buildCharacterListItem(
            character
          )

        );

      }

    }

  );

}



/*
========================================================
BADGE UI
========================================================
*/


function renderBadges() {

  recalculateBonuses();

  applyStarwishTrades();


  setText(
    "badgeBalance",
    formatNumber(
      player.currency.kakera
    )
  );


  const container =
    document.getElementById(
      "badgeList"
    );


  container.innerHTML = "";


  for (
    const badgeId
    of Object.keys(BADGES)
  ) {

    const badge =
      BADGES[badgeId];


    const currentLevel =
      player.badges[badgeId];


    const unlocked =
      badgeIsUnlocked(
        badgeId
      );


    const card =
      document.createElement(
        "article"
      );


    card.className =
      "badge-card";


    if (!unlocked) {

      card.classList.add(
        "locked"
      );

    }


    let levelsHtml = "";


    badge.levels.forEach(

      function (
        level,
        index
      ) {

        const number =
          index + 1;


        const owned =
          currentLevel >= number;


        const next =
          currentLevel + 1
          ===
          number;


        levelsHtml += `

          <div
            class="
              badge-level-row
              ${owned ? "owned" : ""}
            "
          >

            <div class="badge-level-top">

              <span class="badge-level-name">
                ${roman(number)}
              </span>

              <span class="badge-cost">
                ◈ ${formatNumber(level.cost)}
              </span>

            </div>


            <ul class="badge-effects">

              ${
                level.effects
                  .map(
                    effect =>
                    `<li>${effect}</li>`
                  )
                  .join("")
              }

            </ul>


            ${
              next && unlocked

              ?

              `
              <button
                class="badge-buy"
                onclick="buyBadgeLevel('${badgeId}')"
                ${
                  player.currency.kakera
                  <
                  level.cost
                  ?
                  "disabled"
                  :
                  ""
                }
              >
                PURCHASE LEVEL ${roman(number)}
              </button>
              `

              :

              ""
            }

          </div>

        `;

      }

    );


    card.innerHTML = `

      <div class="badge-card-header">

        <h2 class="badge-title">
          ${badge.name}
        </h2>

        <span class="badge-level">
          ${
            unlocked
            ?
            "LEVEL "
            +
            currentLevel
            +
            " / 8"
            :
            "LOCKED"
          }
        </span>

      </div>


      <div class="badge-level-list">
        ${levelsHtml}
      </div>

    `;


    container.appendChild(card);

  }

}



/*
========================================================
BADGE UNLOCK
========================================================
*/


function badgeIsUnlocked(
  badgeId
) {

  const badge =
    BADGES[badgeId];


  if (!badge.unlock) {

    return true;

  }


  return (

    player.badges[
      badge.unlock.badge
    ]

    >=

    badge.unlock.level

  );

}



/*
========================================================
BUY BADGE
========================================================
*/


function buyBadgeLevel(
  badgeId
) {

  const badge =
    BADGES[badgeId];


  if (
    !badge
    ||
    !badgeIsUnlocked(
      badgeId
    )
  ) {

    return;

  }


  const current =
    player.badges[badgeId];


  if (
    current >= 8
  ) {

    return;

  }


  const nextLevel =
    badge.levels[current];


  if (
    player.currency.kakera
    <
    nextLevel.cost
  ) {

    alert(
      "Not enough currency."
    );

    return;

  }


  player.currency.kakera -=
    nextLevel.cost;


  player.statistics
    .totalCurrencySpent +=
    nextLevel.cost;


  player.badges[badgeId] += 1;


  recalculateBonuses();

  applyStarwishTrades();


  renderBadges();

  updateEverything();

  saveGame();

}



/*
========================================================
SPHERES
========================================================
*/


function awardSphereDraws(
  quantity
) {

  for (
    let i = 0;
    i < quantity;
    i++
  ) {

    const sphere =
      rollSphere();


    player.sphereInventory[
      sphere.type
    ] += 1;


    player.currency.spheres +=
      sphere.value;


    player.statistics
      .totalSphereDraws += 1;

  }

}



/*
========================================================
SPHERE TABLE
========================================================
*/


function rollSphere() {

  const level =
    player.badges.diamond;


  const roll =
    randomInteger(
      1,
      100
    );


  let table;


  if (
    level >= 8
  ) {

    table = [

      ["teal", 1, 33, 20],
      ["green", 34, 56, 35],
      ["yellow", 57, 71, 55],
      ["orange", 72, 84, 90],
      ["red", 85, 93, 150],
      ["rainbow", 94, 100, 500]

    ];

  }


  else if (
    level >= 7
  ) {

    table = [

      ["blue", 1, 16, 10],
      ["teal", 17, 41, 20],
      ["green", 42, 61, 35],
      ["yellow", 62, 76, 55],
      ["orange", 77, 87, 90],
      ["red", 88, 95, 150],
      ["rainbow", 96, 100, 500]

    ];

  }


  else if (
    level >= 6
  ) {

    table = [

      ["blue", 1, 25, 10],
      ["teal", 26, 47, 20],
      ["green", 48, 65, 35],
      ["yellow", 66, 79, 55],
      ["orange", 80, 89, 90],
      ["red", 90, 96, 150],
      ["rainbow", 97, 100, 500]

    ];

  }


  else if (
    level >= 5
  ) {

    table = [

      ["blue", 1, 32, 10],
      ["teal", 33, 54, 20],
      ["green", 55, 72, 35],
      ["yellow", 73, 85, 55],
      ["orange", 86, 91, 90],
      ["red", 92, 97, 150],
      ["rainbow", 98, 100, 500]

    ];

  }


  else if (
    level >= 4
  ) {

    table = [

      ["blue", 1, 50, 10],
      ["teal", 51, 69, 20],
      ["green", 70, 84, 35],
      ["yellow", 85, 94, 55],
      ["orange", 95, 97, 90],
      ["red", 98, 99, 150],
      ["rainbow", 100, 100, 500]

    ];

  }


  else {

    table = [

      ["blue", 1, 50, 10],
      ["teal", 51, 75, 20],
      ["green", 76, 90, 35],
      ["yellow", 91, 97, 55],
      ["orange", 98, 99, 90],
      ["red", 100, 100, 150]

    ];

  }


  const result =
    table.find(

      function (entry) {

        return (
          roll >= entry[1]
          &&
          roll <= entry[2]
        );

      }

    );


  return {

    type: result[0],

    value: result[3]

  };

}



/*
========================================================
SPHERE SCREEN
========================================================
*/


function renderSpheres() {

  const unlocked =
    player.upgrades
      .spheresUnlocked;


  setText(
    "sphereUnlocked",
    unlocked
    ?
    "Yes"
    :
    "No"
  );


  setText(
    "sphereCurrencyDisplay",
    formatNumber(
      player.currency.spheres
    )
  );


  setText(
    "sphereDrawsDisplay",
    formatNumber(
      player.statistics
        .totalSphereDraws
    )
  );


  const inventory =
    document.getElementById(
      "sphereInventory"
    );


  inventory.innerHTML = "";


  for (
    const type
    of [
      "blue",
      "teal",
      "green",
      "yellow",
      "orange",
      "red",
      "rainbow"
    ]
  ) {

    const item =
      document.createElement(
        "div"
      );


    item.className =
      "sphere-item";


    item.innerHTML = `

      ${capitalize(type)}

      <strong>

        ${formatNumber(
          player.sphereInventory[type]
        )}

      </strong>

    `;


    inventory.appendChild(
      item
    );

  }

}



/*
========================================================
PROBABILITIES
========================================================
*/


function getDisplayedCharacterChance(
  character
) {

  const pool =
    getEffectiveRollPool();


  let totalWeight = 0;

  let targetWeight = 1;


  for (
    const entry
    of pool
  ) {

    let weight = 1;


    if (
      entry.type === "character"
    ) {

      if (
        player.wishlist.includes(
          entry.id
        )
      ) {

        weight *=
          1
          +
          (
            player.upgrades
              .wishSpawnBonus
            /
            100
          );

      }


      if (
        player.starwishes.includes(
          entry.id
        )
      ) {

        weight *=
          1
          +
          (
            player.upgrades
              .starwishSpawnBonus
            /
            100
          );

      }

    }


    if (
      entry.id === character.id
    ) {

      targetWeight =
        weight;

    }


    totalWeight +=
      weight;

  }


  return formatPercent(

    targetWeight
    /
    totalWeight

  );

}



/*
========================================================
WISH ROLL BONUS
========================================================

Bronze II:
when a Wished Character is generated,
award the configured bonus immediately.
========================================================
*/


function applyWishRollBonus() {

  for (
    const result
    of currentBatch
  ) {

    if (
      result.type === "character"
      &&
      player.wishlist.includes(
        result.id
      )
      &&
      !result.wishBonusPaid
      &&
      player.upgrades
        .wishValueBonus > 0
    ) {

      player.currency.kakera +=
        player.upgrades
          .wishValueBonus;


      player.statistics
        .totalCurrencyEarned +=
        player.upgrades
          .wishValueBonus;


      result.wishBonusPaid =
        true;

    }

  }

}



/*
========================================================
CURRENCY / EMPTY PROBABILITIES
========================================================
*/


function getCurrencyProbability(
  result
) {

  const pool =
    getEffectiveRollPool();


  const copies =
    pool.filter(

      function (entry) {

        return (
          entry.type === "currency"
          &&
          entry.amount
          ===
          result.amount
        );

      }

    ).length;


  return formatPercent(

    copies
    /
    pool.length

  );

}


function getEmptyProbability() {

  const pool =
    getEffectiveRollPool();


  const empties =
    pool.filter(

      entry =>
      entry.type === "empty"

    ).length;


  return formatPercent(

    empties
    /
    pool.length

  );

}



/*
========================================================
CARD POSITION
========================================================
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


  if (
    cards.length === 0
  ) {

    return;

  }


  const center =
    rail.scrollLeft
    +
    rail.clientWidth / 2;


  let closest = 0;

  let distance =
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


      const currentDistance =
        Math.abs(
          cardCenter
          -
          center
        );


      if (
        currentDistance
        <
        distance
      ) {

        distance =
          currentDistance;


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
========================================================
PROFILE
========================================================
*/


function updateEverything() {

  if (!player) {
    return;
  }


  recalculateBonuses();

  applyStarwishTrades();


  applyWishRollBonus();


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
    player.rounds.rollsPerRound
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
    "profileRound",
    player.rounds.current
  );


  setText(
    "profileRolls",
    player.rounds.rollsPerRound
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


  setText(

    "profileRollpool",

    formatNumber(
      getEffectiveRollPool()
        .length
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

    "% / "

    +

    formatNumber(
      player.reactionPower.maximum
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
    "10,000 ◈"
  );


  setText(

    "profileTotalKeys",

    formatNumber(
      getTotalKeys()
    )

  );


  setText(

    "profileAdditionalKeyChance",

    (
      player.upgrades
        .additionalKeyChance
      ??
      0
    )

    +

    "%"

  );


  setText(

    "profileSphereValue",

    formatNumber(
      player.currency.spheres
    )

  );


  updateNextClaimNotice();

}



/*
========================================================
NEXT CLAIM
========================================================
*/


function updateNextClaimNotice() {

  const interval =
    player.upgrades
      .claimInterval;


  const current =
    player.rounds.current;


  const next =
    current
    +
    (
      interval
      -
      (
        current
        %
        interval
      )
    );


  setText(

    "nextClaimNotice",

    "Next claim regeneration on Round "

    +

    next

  );

}



/*
========================================================
ROUND NOTICE
========================================================
*/


function showRoundNotice(
  text
) {

  const box =
    document.getElementById(
      "roundRewardNotice"
    );


  if (!text) {

    box.classList.add(
      "hidden"
    );

    return;

  }


  box.textContent = text;


  box.classList.remove(
    "hidden"
  );

}



/*
========================================================
UTILITIES
========================================================
*/


function getCharacterEntries() {

  return rollDatabase.filter(

    function (entry) {

      return (
        entry.type
        ===
        "character"
      );

    }

  );

}


function findCharacterById(
  id
) {

  return getCharacterEntries()
    .find(

      function (character) {

        return (
          character.id
          ===
          id
        );

      }

    );

}


function getTotalKeys() {

  return Object.values(
    player.keys
  )
  .reduce(

    function (
      total,
      value
    ) {

      return (
        total
        +
        Number(
          value || 0
        )
      );

    },

    0

  );

}


function weightedChoice(
  choices
) {

  const total =
    choices.reduce(

      function (
        sum,
        item
      ) {

        return (
          sum
          +
          item.weight
        );

      },

      0

    );


  let random =
    Math.random()
    *
    total;


  for (
    const item
    of choices
  ) {

    random -=
      item.weight;


    if (
      random <= 0
    ) {

      return item;

    }

  }


  return choices[
    choices.length - 1
  ];

}


function randomInteger(
  minimum,
  maximum
) {

  return Math.floor(

    Math.random()
    *
    (
      maximum
      -
      minimum
      +
      1
    )

  )
  +
  minimum;

}


function formatPercent(
  decimal
) {

  const percent =
    decimal
    *
    100;


  if (
    percent >= 1
  ) {

    return percent.toFixed(2);

  }


  if (
    percent >= 0.1
  ) {

    return percent.toFixed(3);

  }


  return percent.toFixed(4);

}


function formatNumber(
  value
) {

  return Number(
    value ?? 0
  ).toLocaleString();

}


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


function escapeHtml(
  value
) {

  return String(value)

    .replaceAll("&", "&amp;")

    .replaceAll("<", "&lt;")

    .replaceAll(">", "&gt;")

    .replaceAll('"', "&quot;")

    .replaceAll("'", "&#039;");

}


function capitalize(
  text
) {

  return (
    text.charAt(0).toUpperCase()
    +
    text.slice(1)
  );

}


function roman(number) {

  return [
    "",
    "I",
    "II",
    "III",
    "IV",
    "V",
    "VI",
    "VII",
    "VIII"
  ][number];

}



/*
========================================================
AUTOSAVE
========================================================
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
========================================================
START
========================================================
*/


window.addEventListener(

  "DOMContentLoaded",

  function () {

    updateSaveSlotInfo();

    setupWishlistSearch();

  }

);
