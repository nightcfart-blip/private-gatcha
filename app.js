/*
========================================================
PRIVATE GACHA
STABLE MOBILE CORE
========================================================
*/


let player = null;

let activeSaveSlot = null;

let selectedSaveSlot = null;

let currentBatch = [];

let currentCardIndex = 0;


/*
Manual mobile dragging variables.
*/

let dragActive = false;

let dragStartX = 0;

let dragStartScrollLeft = 0;

let dragMoved = false;



/*
========================================================
REACTIONS
========================================================
*/


const BASE_REACTION_CHANCE = 10;


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
BADGES
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
          "Unlock Silver Badge"
        ]
      },

      {
        cost: 12500,
        effects: [
          "Unlock Starwish Trading",
          "+1 Starwish Slot"
        ]
      },

      {
        cost: 25000,
        effects: [
          "+5 Wishlist Slots",
          "Claiming earns Character ◈ value"
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
          "+25% Wish spawn chance"
        ]
      },

      {
        cost: 5000,
        effects: [
          "+40% Wish spawn chance"
        ]
      },

      {
        cost: 10000,
        effects: [
          "+55% Wish spawn chance",
          "Unlock Gold Badge"
        ]
      },

      {
        cost: 25000,
        effects: [
          "+80% Wish spawn chance",
          "+120% Starwish bonus"
        ]
      },

      {
        cost: 50000,
        effects: [
          "+100% Wish spawn chance",
          "+180% Starwish bonus"
        ]
      },

      {
        cost: 150000,
        effects: [
          "+50% Wish spawn chance",
          "+100% Starwish bonus"
        ]
      },

      {
        cost: 450000,
        effects: [
          "+50% Wish spawn chance",
          "+100% Starwish bonus"
        ]
      },

      {
        cost: 1350000,
        effects: [
          "+50% Wish spawn chance",
          "+100% Starwish bonus"
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
          "+10% Power Cap",
          "Unlock Sapphire"
        ]
      },

      {
        cost: 50000,
        effects: [
          "-10% Reaction Cost",
          "+20% Power Cap"
        ]
      },

      {
        cost: 100000,
        effects: [
          "-20% Reaction Cost",
          "Upgrade the lowest eligible Reaction once per Round"
        ]
      },

      {
        cost: 300000,
        effects: [
          "+10% Power Cap"
        ]
      },

      {
        cost: 900000,
        effects: [
          "+10% Power Cap"
        ]
      },

      {
        cost: 2700000,
        effects: [
          "+10% Power Cap"
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
          "Unlock Ruby"
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
          "Unlock Emerald"
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
          "+2 Power Regeneration"
        ]
      },

      {
        cost: 80000,
        effects: [
          "+3 Power Regeneration"
        ]
      },

      {
        cost: 160000,
        effects: [
          "+3 Power Regeneration",
          "+10% Power Cap",
          "Unlock Diamond"
        ]
      },

      {
        cost: 400000,
        effects: [
          "+2 Power Regeneration",
          "+50 ◈ every 5 Rounds"
        ]
      },

      {
        cost: 800000,
        effects: [
          "+5 Power Regeneration"
        ]
      },

      {
        cost: 2400000,
        effects: [
          "+5 Power Regeneration"
        ]
      },

      {
        cost: 7200000,
        effects: [
          "+5 Power Regeneration"
        ]
      },

      {
        cost: 21600000,
        effects: [
          "+5 Power Regeneration"
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
          "Unlock Spheres",
          "+2 Sphere draws when claiming"
        ]
      },

      {
        cost: 160000,
        effects: [
          "+3 Sphere draws when claiming"
        ]
      },

      {
        cost: 320000,
        effects: [
          "+5 Sphere draws when claiming",
          "Unlock Obsidian"
        ]
      },

      {
        cost: 800000,
        effects: [
          "+5 Sphere draws when claiming a Wish",
          "Unlock Rainbow Spheres"
        ]
      },

      {
        cost: 1600000,
        effects: [
          "+10 Sphere draws when claiming",
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
          "Blue Spheres deactivated"
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
          "-200 :( entries"
        ]
      },

      {
        cost: 320000,
        effects: [
          "-200 :( entries"
        ]
      },

      {
        cost: 640000,
        effects: [
          "-200 :( entries"
        ]
      },

      {
        cost: 1600000,
        effects: [
          "-200 :( entries"
        ]
      },

      {
        cost: 3200000,
        effects: [
          "-200 :( entries"
        ]
      },

      {
        cost: 9600000,
        effects: [
          "Remove +1–100 Currency entries"
        ]
      },

      {
        cost: 28800000,
        effects: [
          "Remove +101–200 Currency entries"
        ]
      },

      {
        cost: 86400000,
        effects: [
          "Remove +201–300 Currency entries"
        ]
      }

    ]

  }

};



/*
========================================================
NEW PLAYER
========================================================
*/


function makeNewPlayer() {

  return {

    currency: {

      kakera: 0,

      spheres: 0

    },


    rounds: {

      current: 1,

      rollsPerRound: 6,

      currentBatch: []

    },


    claims: {

      available: 1

    },


    storedClaims: {

      current: 0,

      maximum: 0

    },


    claimedCharacters: [],


    wishlist: [],


    starwishes: [],


    keys: {},


    badges: {

      bronze: 0,

      silver: 0,

      gold: 0,

      sapphire: 0,

      ruby: 0,

      emerald: 0,

      diamond: 0,

      obsidian: 0

    },


    reactionPower: {

      current: 100,

      maximum: 100

    },


    sphereInventory: {

      blue: 0,

      teal: 0,

      green: 0,

      yellow: 0,

      orange: 0,

      red: 0,

      rainbow: 0

    },


    starwishTrading: {

      trades: 0,

      wishlistSlotsSpent: 0

    },


    statistics: {

      totalRolls: 0,

      totalClaims: 0,

      totalCharactersSeen: 0,

      totalCurrencyEarned: 0,

      totalCurrencySpent: 0,

      totalReactions: 0,

      totalSphereDraws: 0

    },


    upgrades: {},


    tower: {

      currentFloor: 1

    }

  };

}



/*
========================================================
SAVE MIGRATION
========================================================
*/


function repairPlayer() {

  if (!player) {
    return;
  }


  if (!player.currency) {

    player.currency = {};

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



  if (!player.rounds) {

    player.rounds = {};

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

    player.claims = {};

  }


  if (
    typeof player.claims.available
    !== "number"
  ) {

    player.claims.available = 1;

  }


  if (
    player.rounds.current === 1
    &&
    player.claims.available === 0
    &&
    (
      player.statistics?.totalClaims
      ??
      0
    )
    === 0
  ) {

    player.claims.available = 1;

  }



  if (!player.storedClaims) {

    player.storedClaims = {};

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



  if (
    !Array.isArray(
      player.claimedCharacters
    )
  ) {

    player.claimedCharacters = [];

  }


  if (
    !Array.isArray(
      player.wishlist
    )
  ) {

    player.wishlist = [];

  }


  if (
    !Array.isArray(
      player.starwishes
    )
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
    const id
    of Object.keys(BADGES)
  ) {

    if (
      typeof player.badges[id]
      !== "number"
    ) {

      player.badges[id] = 0;

    }

  }



  if (!player.reactionPower) {

    player.reactionPower = {};

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

    player.sphereInventory = {};

  }


  for (
    const color
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

    if (
      typeof player.sphereInventory[color]
      !== "number"
    ) {

      player.sphereInventory[color] = 0;

    }

  }



  if (!player.starwishTrading) {

    player.starwishTrading = {};

  }


  if (
    typeof player.starwishTrading.trades
    !== "number"
  ) {

    player.starwishTrading.trades = 0;

  }


  if (
    typeof player.starwishTrading
      .wishlistSlotsSpent
    !== "number"
  ) {

    player.starwishTrading
      .wishlistSlotsSpent = 0;

  }



  if (!player.statistics) {

    player.statistics = {};

  }


  const stats = [

    "totalRolls",

    "totalClaims",

    "totalCharactersSeen",

    "totalCurrencyEarned",

    "totalCurrencySpent",

    "totalReactions",

    "totalSphereDraws"

  ];


  for (
    const stat
    of stats
  ) {

    if (
      typeof player.statistics[stat]
      !== "number"
    ) {

      player.statistics[stat] = 0;

    }

  }


  if (!player.upgrades) {

    player.upgrades = {};

  }


  recalculateBonuses();

}



/*
========================================================
BADGE BONUSES
========================================================
*/


function recalculateBonuses() {

  const b =
    player.badges;


  let wishlistSlots = 10;

  let starwishSlots = 0;

  let wishCurrencyBonus = 0;

  let wishSpawnBonus = 0;

  let starwishSpawnBonus = 0;

  let reactionCost = 100;

  let reactionMaximum = 100;

  let reactionRegen = 1;

  let rollsPerRound = 6;

  let claimInterval = 5;

  let storedClaimCap = 0;

  let rollCurrencyMultiplier = 1;

  let claimValueReward = false;

  let goldReactionUpgrade = false;

  let spheresUnlocked = false;

  let sphereClaimDraws = 0;

  let wishedSphereBonus = 0;



  /*
  Bronze
  */

  if (b.bronze >= 1) {
    wishlistSlots += 2;
  }


  if (b.bronze >= 2) {

    wishlistSlots += 2;

    wishCurrencyBonus += 25;

  }


  if (b.bronze >= 3) {
    wishlistSlots += 3;
  }


  if (b.bronze >= 4) {
    starwishSlots += 1;
  }


  if (b.bronze >= 5) {

    wishlistSlots += 5;

    claimValueReward = true;

  }


  if (b.bronze >= 6) {
    wishlistSlots += 10;
  }


  if (b.bronze >= 7) {
    wishlistSlots += 15;
  }


  if (b.bronze >= 8) {
    wishlistSlots += 20;
  }



  /*
  Silver
  */

  if (b.silver >= 1) {
    wishSpawnBonus += 25;
  }


  if (b.silver >= 2) {
    wishSpawnBonus += 40;
  }


  if (b.silver >= 3) {
    wishSpawnBonus += 55;
  }


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
  Gold
  */

  if (b.gold >= 1) {
    reactionCost -= 10;
  }


  if (b.gold >= 2) {
    reactionCost -= 10;
  }


  if (b.gold >= 3) {

    reactionCost -= 10;

    reactionMaximum += 10;

  }


  if (b.gold >= 4) {

    reactionCost -= 10;

    reactionMaximum += 20;

  }


  if (b.gold >= 5) {

    reactionCost -= 20;

    goldReactionUpgrade = true;

  }


  if (b.gold >= 6) {
    reactionMaximum += 10;
  }


  if (b.gold >= 7) {
    reactionMaximum += 10;
  }


  if (b.gold >= 8) {
    reactionMaximum += 10;
  }



  /*
  Sapphire
  */

  if (b.sapphire >= 1) {
    rollsPerRound += 2;
  }


  if (b.sapphire >= 2) {
    rollsPerRound += 3;
  }


  if (b.sapphire >= 3) {
    rollsPerRound += 5;
  }


  if (b.sapphire >= 4) {
    rollsPerRound += 8;
  }


  if (b.sapphire >= 5) {

    rollsPerRound += 10;

    rollCurrencyMultiplier = 2;

  }


  if (b.sapphire >= 6) {
    rollsPerRound += 10;
  }


  if (b.sapphire >= 7) {
    rollsPerRound += 10;
  }


  if (b.sapphire >= 8) {
    rollsPerRound += 10;
  }



  /*
  Ruby
  */

  if (b.ruby >= 1) {
    claimInterval = 4;
  }


  if (b.ruby >= 2) {
    storedClaimCap += 1;
  }


  if (b.ruby >= 3) {
    storedClaimCap += 1;
  }


  if (b.ruby >= 4) {
    claimInterval = 3;
  }


  if (b.ruby >= 5) {
    storedClaimCap += 1;
  }


  if (b.ruby >= 6) {
    storedClaimCap += 1;
  }


  if (b.ruby >= 7) {
    storedClaimCap += 1;
  }


  if (b.ruby >= 8) {
    storedClaimCap += 1;
  }



  /*
  Emerald
  */

  if (b.emerald >= 1) {
    reactionRegen += 2;
  }


  if (b.emerald >= 2) {
    reactionRegen += 3;
  }


  if (b.emerald >= 3) {

    reactionRegen += 3;

    reactionMaximum += 10;

  }


  if (b.emerald >= 4) {
    reactionRegen += 2;
  }


  if (b.emerald >= 5) {
    reactionRegen += 5;
  }


  if (b.emerald >= 6) {
    reactionRegen += 5;
  }


  if (b.emerald >= 7) {
    reactionRegen += 5;
  }


  if (b.emerald >= 8) {
    reactionRegen += 5;
  }



  /*
  Diamond
  */

  if (b.diamond >= 1) {

    spheresUnlocked = true;

    sphereClaimDraws += 2;

  }


  if (b.diamond >= 2) {
    sphereClaimDraws += 3;
  }


  if (b.diamond >= 3) {
    sphereClaimDraws += 5;
  }


  if (b.diamond >= 4) {
    wishedSphereBonus += 5;
  }


  if (b.diamond >= 5) {
    sphereClaimDraws += 10;
  }



  /*
  Starwish trades are permanent.
  */

  wishlistSlots -=
    player.starwishTrading
      .wishlistSlotsSpent;


  starwishSlots +=
    player.starwishTrading
      .trades;



  player.upgrades = {

    wishlistSlots:
      Math.max(
        0,
        wishlistSlots
      ),

    starwishSlots:
      Math.max(
        0,
        starwishSlots
      ),

    wishCurrencyBonus,

    wishSpawnBonus,

    starwishSpawnBonus,

    reactionCost:
      Math.max(
        1,
        reactionCost
      ),

    reactionRegen,

    claimInterval,

    rollCurrencyMultiplier,

    claimValueReward,

    goldReactionUpgrade,

    spheresUnlocked,

    sphereClaimDraws,

    wishedSphereBonus

  };


  player.rounds.rollsPerRound =
    rollsPerRound;


  player.storedClaims.maximum =
    storedClaimCap;


  player.reactionPower.maximum =
    reactionMaximum;


  player.reactionPower.current =
    Math.min(

      player.reactionPower.current,

      player.reactionPower.maximum

    );

}



/*
========================================================
SAVE FILE NAME
========================================================
*/


function getSaveName(slot) {

  return "privateGachaSave_" + slot;

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

      player =
        makeNewPlayer();

    }

  }

  else {

    player =
      makeNewPlayer();

  }


  activeSaveSlot =
    slot;


  repairPlayer();


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
    player.rounds.currentBatch.length
    >
    0
  ) {

    currentBatch =
      player.rounds.currentBatch;

  }

  else {

    generateRound();

  }


  renderRollDeck();

  updateAllDisplays();

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


  localStorage.setItem(

    getSaveName(
      activeSaveSlot
    ),

    JSON.stringify(player)

  );


  updateSaveCards();


  if (showMessage) {

    setText(
      "saveStatus",
      "Saved."
    );

  }

}



/*
========================================================
SAVE SELECT
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


  updateSaveCards();

}



function updateSaveCards() {

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
          ??
          1
        )

        +

        " · "

        +

        formatNumber(
          save.claimedCharacters?.length
          ??
          0
        )

        +

        " claimed · "

        +

        formatNumber(
          save.currency?.kakera
          ??
          0
        )

        +

        " ◈";

    }

    catch {

      title.textContent =
        "Damaged Save";


      info.textContent =
        "Tap to repair";

    }

  }

}



/*
========================================================
SAVE OPTIONS
========================================================
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

  selectedSaveSlot =
    null;


  document
    .getElementById("saveModal")
    .classList.add("hidden");

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

  updateSaveCards();

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
      "Permanently erase Save "
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


  closeSaveMenu();

  updateSaveCards();

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


  const target =
    document.getElementById(
      "page-" + pageName
    );


  if (target) {

    target.classList.add(
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

    renderWishlist();


    const input =
      document.getElementById(
        "wishlistSearch"
      );


    if (input) {

      searchWishlistCharacters(
        input.value
      );

    }

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
ROUND
========================================================
*/


function startNextRound() {

  player.rounds.current += 1;


  recalculateBonuses();


  const messages = [];


  /*
  Claim regeneration.
  */

  if (

    player.rounds.current

    %

    player.upgrades
      .claimInterval

    ===

    0

  ) {

    regenerateClaim();


    messages.push(
      "+1 Claim"
    );

  }


  /*
  Emerald IV.
  */

  if (

    player.badges.emerald >= 4

    &&

    player.rounds.current % 5 === 0

  ) {

    player.currency.kakera +=
      50;


    player.statistics
      .totalCurrencyEarned +=
      50;


    messages.push(
      "+50 ◈"
    );

  }


  /*
  Reaction Power regeneration.
  */

  player.reactionPower.current =
    Math.min(

      player.reactionPower.maximum,

      player.reactionPower.current

      +

      player.upgrades
        .reactionRegen

    );


  generateRound();


  renderRollDeck();

  updateAllDisplays();

  saveGame();


  showRoundNotice(
    messages.join(" · ")
  );

}



/*
========================================================
CLAIM REGENERATION
========================================================
*/


function regenerateClaim() {

  if (
    player.claims.available < 1
  ) {

    player.claims.available = 1;

    return;

  }


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
ROLLPOOL
========================================================
*/


function getBaseRollPool() {

  if (
    typeof rollDatabase
    === "undefined"
    ||
    !Array.isArray(
      rollDatabase
    )
  ) {

    return [];

  }


  return rollDatabase;

}



function getCharacterEntries() {

  return getBaseRollPool()
    .filter(

      function (entry) {

        return (
          entry
          &&
          entry.type
          ===
          "character"
        );

      }

    );

}



function getEffectiveRollPool() {

  const pool =
    getBaseRollPool();


  const obsidian =
    player.badges.obsidian;


  const emptyRemoval =
    Math.min(
      obsidian,
      5
    )
    *
    200;


  let emptiesRemoved = 0;


  return pool.filter(

    function (entry) {


      if (
        entry.type === "empty"
        &&
        emptiesRemoved
        <
        emptyRemoval
      ) {

        emptiesRemoved += 1;

        return false;

      }


      if (
        entry.type === "currency"
      ) {

        if (
          obsidian >= 6
          &&
          entry.amount >= 1
          &&
          entry.amount <= 100
        ) {

          return false;

        }


        if (
          obsidian >= 7
          &&
          entry.amount >= 101
          &&
          entry.amount <= 200
        ) {

          return false;

        }


        if (
          obsidian >= 8
          &&
          entry.amount >= 201
          &&
          entry.amount <= 300
        ) {

          return false;

        }

      }


      return true;

    }

  );

}



/*
========================================================
WEIGHTED ROLL
========================================================
*/


function chooseRollResult() {

  const pool =
    getEffectiveRollPool();


  if (
    pool.length === 0
  ) {

    return null;

  }


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


        totalWeight +=
          weight;


        return {

          entry,

          weight

        };

      }

    );


  let number =
    Math.random()
    *
    totalWeight;


  for (
    const item
    of weighted
  ) {

    number -=
      item.weight;


    if (
      number <= 0
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
GENERATE ROUND
========================================================
*/


function generateRound() {

  currentBatch = [];


  recalculateBonuses();


  const rollCount =
    player.rounds
      .rollsPerRound;


  for (
    let i = 0;
    i < rollCount;
    i++
  ) {

    const original =
      chooseRollResult();


    if (!original) {
      continue;
    }


    const result =
      JSON.parse(
        JSON.stringify(original)
      );


    /*
    Character.
    */

    if (
      result.type === "character"
    ) {

      player.statistics
        .totalCharactersSeen += 1;


      /*
      Wish currency bonus.
      */

      if (
        player.wishlist.includes(
          result.id
        )
        &&
        player.upgrades
          .wishCurrencyBonus > 0
      ) {

        player.currency.kakera +=
          player.upgrades
            .wishCurrencyBonus;


        player.statistics
          .totalCurrencyEarned +=
          player.upgrades
            .wishCurrencyBonus;


        result.wishBonus =
          player.upgrades
            .wishCurrencyBonus;

      }


      /*
      Reaction.
      */

      if (
        Math.random() * 100
        <
        BASE_REACTION_CHANCE
      ) {

        result.reaction =
          makeReaction();

      }

    }


    /*
    Currency result.
    */

    if (
      result.type === "currency"
    ) {

      result.finalAmount =

        Number(
          result.amount
        )

        *

        player.upgrades
          .rollCurrencyMultiplier;


      player.currency.kakera +=
        result.finalAmount;


      player.statistics
        .totalCurrencyEarned +=
        result.finalAmount;

    }


    currentBatch.push(
      result
    );


    player.statistics
      .totalRolls += 1;

  }


  if (
    player.upgrades
      .goldReactionUpgrade
  ) {

    upgradeLowestReaction();

  }


  player.rounds.currentBatch =
    currentBatch;


  currentCardIndex = 0;

}



/*
========================================================
REACTIONS
========================================================
*/


function makeReaction() {

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



function upgradeLowestReaction() {

  const order = [

    "blue",

    "teal",

    "green",

    "yellow"

  ];


  const next = {

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

      const target =
        REACTION_TYPES.find(

          function (type) {

            return (
              type.id
              ===
              next[color]
            );

          }

        );


      result.reaction = {

        type: target.id,

        name: target.name,

        value:
          randomInteger(
            target.min,
            target.max
          ),

        collected: false

      };


      return;

    }

  }

}



function collectReaction(index) {

  const result =
    currentBatch[index];


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
      .reactionCost;


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


  const reaction =
    result.reaction;


  let earned = 0;


  if (
    reaction.type === "white"
  ) {

    const amount =
      randomInteger(
        3,
        4
      );


    for (
      let i = 0;
      i < amount;
      i++
    ) {

      earned +=
        makeNormalReactionValue();

    }

  }

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


  renderRollDeck();

  updateAllDisplays();

  saveGame();

}



function makeNormalReactionValue() {

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
    weightedChoice(
      options
    );


  return randomInteger(
    type.min,
    type.max
  );

}



/*
========================================================
RENDER ROLLS
========================================================
*/


function renderRollDeck() {

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


  setupDeckDragging();


  setTimeout(

    function () {

      goToCard(
        currentCardIndex,
        false
      );

    },

    50

  );

}



/*
========================================================
MANUAL MOBILE SWIPE
========================================================
*/


function setupDeckDragging() {

  const rail =
    document.getElementById(
      "rollRail"
    );


  /*
  Remove old handlers by replacing with
  direct property handlers.
  */

  rail.ontouchstart =
    function (event) {

      if (
        event.touches.length !== 1
      ) {

        return;

      }


      dragActive = true;

      dragMoved = false;


      dragStartX =
        event.touches[0]
          .clientX;


      dragStartScrollLeft =
        rail.scrollLeft;


      rail.classList.add(
        "dragging"
      );

    };


  rail.ontouchmove =
    function (event) {

      if (!dragActive) {
        return;
      }


      const currentX =
        event.touches[0]
          .clientX;


      const distance =
        currentX
        -
        dragStartX;


      if (
        Math.abs(distance) > 5
      ) {

        dragMoved = true;

      }


      /*
      Only hijack clear horizontal movement.
      */

      if (
        Math.abs(distance) > 8
      ) {

        rail.scrollLeft =

          dragStartScrollLeft

          -

          distance;


        event.preventDefault();

      }

    };


  rail.ontouchend =
    function (event) {

      if (!dragActive) {
        return;
      }


      const endX =
        event.changedTouches[0]
          .clientX;


      const distance =
        endX
        -
        dragStartX;


      dragActive = false;


      rail.classList.remove(
        "dragging"
      );


      if (
        Math.abs(distance) > 45
      ) {

        if (
          distance < 0
        ) {

          currentCardIndex += 1;

        }

        else {

          currentCardIndex -= 1;

        }

      }


      currentCardIndex =
        clamp(

          currentCardIndex,

          0,

          currentBatch.length - 1

        );


      goToCard(
        currentCardIndex,
        true
      );

    };


  /*
  Normal scroll also keeps counter synced.
  */

  rail.onscroll =
    function () {

      updateCardIndexFromScroll();

    };

}



/*
========================================================
CARD NAVIGATION
========================================================
*/


function moveCard(direction) {

  currentCardIndex +=
    direction;


  currentCardIndex =
    clamp(

      currentCardIndex,

      0,

      currentBatch.length - 1

    );


  goToCard(
    currentCardIndex,
    true
  );

}



function goToCard(
  index,
  smooth = true
) {

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


  const card =
    cards[index];


  if (!card) {
    return;
  }


  /*
  Center card manually.
  */

  const target =

    card.offsetLeft

    -

    (
      rail.clientWidth
      -
      card.offsetWidth
    )
    /
    2;


  rail.scrollTo({

    left:
      Math.max(
        0,
        target
      ),

    behavior:
      smooth
      ?
      "smooth"
      :
      "auto"

  });


  setText(

    "cardPosition",

    (index + 1)

    +

    " / "

    +

    cards.length

  );

}



function updateCardIndexFromScroll() {

  if (dragActive) {
    return;
  }


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


  let bestIndex = 0;

  let bestDistance =
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
          cardCenter - center
        );


      if (
        distance < bestDistance
      ) {

        bestDistance =
          distance;


        bestIndex =
          index;

      }

    }

  );


  currentCardIndex =
    bestIndex;


  setText(

    "cardPosition",

    (bestIndex + 1)

    +

    " / "

    +

    cards.length

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


  card.className =
    "roll-card";


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


  const keys =
    player.keys[
      character.id
    ]
    ??
    0;


  let reactionHtml = "";


  if (
    character.reaction
  ) {

    reactionHtml =
      buildReactionHtml(
        character.reaction,
        batchIndex
      );

  }


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
          draggable="false"
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
          ${getCharacterChance(character)}%
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

              "NO CLAIM"
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
========================================================
REACTION CARD SECTION
========================================================
*/


function buildReactionHtml(
  reaction,
  batchIndex
) {

  let valueText;


  if (
    reaction.type === "white"
  ) {

    valueText =
      "3–4 random";

  }

  else if (
    reaction.type === "black"
  ) {

    valueText =
      "Black Reaction";

  }

  else {

    valueText =
      formatNumber(
        reaction.value
      )
      +
      " ◈";

  }


  return `

    <div class="reaction-box">

      <div class="reaction-left">

        <i
          class="
            reaction-gem
            reaction-${reaction.type}
          "
        >
          ◈
        </i>

        <div>

          <span class="reaction-name">
            ${reaction.name}
          </span>

          <span class="reaction-value">
            ${valueText}
          </span>

        </div>

      </div>


      <button
        class="reaction-collect"
        onclick="collectReaction(${batchIndex})"
        ${
          reaction.collected
          ?
          "disabled"
          :
          ""
        }
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
          ${getCurrencyChance(result)}%
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
          ${getEmptyChance()}%
        </span>

      </div>

    </div>

  `;


  return card;

}



/*
========================================================
CLAIM
========================================================
*/


function claimCharacter(
  characterId
) {

  const character =
    findCharacter(
      characterId
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
      "No claim available."
    );

    return;

  }


  const wished =
    player.wishlist.includes(
      characterId
    );


  player.claimedCharacters.push(
    characterId
  );


  player.claims.available = 0;


  /*
  Bring one stored claim forward.
  */

  if (
    player.storedClaims.current > 0
  ) {

    player.storedClaims.current -= 1;


    player.claims.available = 1;

  }


  player.statistics
    .totalClaims += 1;


  /*
  Bronze V.
  */

  if (
    player.upgrades
      .claimValueReward
  ) {

    player.currency.kakera +=
      character.value;


    player.statistics
      .totalCurrencyEarned +=
      character.value;

  }


  /*
  Diamond Spheres.
  */

  let sphereDraws =
    player.upgrades
      .sphereClaimDraws;


  if (wished) {

    sphereDraws +=
      player.upgrades
        .wishedSphereBonus;

  }


  if (
    sphereDraws > 0
  ) {

    awardSpheres(
      sphereDraws
    );

  }


  renderRollDeck();

  renderCollection();

  updateAllDisplays();

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
    index >= 0
  ) {

    player.wishlist.splice(
      index,
      1
    );


    const starIndex =
      player.starwishes.indexOf(
        characterId
      );


    if (
      starIndex >= 0
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
        "Wishlist is full."
      );

      return;

    }


    player.wishlist.push(
      characterId
    );

  }


  renderRollDeck();

  renderWishlist();

  renderCollection();

  updateAllDisplays();

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
      "Wish the character first."
    );

    return;

  }


  const index =
    player.starwishes.indexOf(
      characterId
    );


  if (
    index >= 0
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
        "No Starwish slot available."
      );

      return;

    }


    player.starwishes.push(
      characterId
    );

  }


  renderRollDeck();

  renderWishlist();

  saveGame();

}



/*
========================================================
STARWISH TRADING
========================================================
*/


function tradeForStarwishSlot() {

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


  const unusedWishlistSlots =

    player.upgrades
      .wishlistSlots

    -

    player.wishlist.length;


  if (
    unusedWishlistSlots < cost
  ) {

    alert(
      "Not enough unused Wishlist slots."
    );

    return;

  }


  player.starwishTrading
    .trades += 1;


  player.starwishTrading
    .wishlistSlotsSpent +=
    cost;


  recalculateBonuses();

  renderWishlist();

  updateAllDisplays();

  saveGame();

}



/*
========================================================
WISHLIST DISPLAY
========================================================
*/


function renderWishlist() {

  if (!player) {
    return;
  }


  recalculateBonuses();


  setText(
    "wishlistUsed",
    player.wishlist.length
  );


  setText(
    "wishlistMax",
    player.upgrades
      .wishlistSlots
  );


  setText(
    "starwishUsed",
    player.starwishes.length
  );


  setText(
    "starwishMax",
    player.upgrades
      .starwishSlots
  );


  /*
  Trading panel.
  */

  const panel =
    document.getElementById(
      "starwishTradePanel"
    );


  if (
    player.badges.bronze >= 4
  ) {

    panel.classList.remove(
      "hidden"
    );


    const cost =
      player.starwishTrading
        .trades
      +
      1;


    setText(

      "starwishTradeText",

      "Next trade: "

      +

      cost

      +

      " Wishlist slot"

      +

      (
        cost === 1
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

    panel.classList.add(
      "hidden"
    );

  }


  /*
  Current wishes.
  */

  const list =
    document.getElementById(
      "wishlistCurrent"
    );


  list.innerHTML = "";


  if (
    player.wishlist.length === 0
  ) {

    list.innerHTML = `

      <div class="empty-list">
        Your wishlist is empty.
      </div>

    `;

  }

  else {

    for (
      const id
      of player.wishlist
    ) {

      const character =
        findCharacter(id);


      if (character) {

        list.appendChild(

          buildCharacterRow(
            character
          )

        );

      }

    }

  }

}



/*
========================================================
SEARCH
========================================================
*/


function searchWishlistCharacters(
  rawQuery
) {

  const results =
    document.getElementById(
      "wishlistSearchResults"
    );


  const status =
    document.getElementById(
      "searchStatus"
    );


  if (
    !results
    ||
    !status
  ) {

    return;

  }


  const query =
    String(
      rawQuery
      ??
      ""
    )
    .trim()
    .toLowerCase();


  results.innerHTML = "";


  if (
    query.length < 2
  ) {

    status.textContent =
      "Type at least 2 letters.";


    return;

  }


  const characters =
    getCharacterEntries();


  if (
    characters.length === 0
  ) {

    status.textContent =
      "No character entries were found in data.js.";


    return;

  }


  const matches =
    characters
      .filter(

        function (character) {

          const name =
            String(
              character.name
              ??
              ""
            )
            .toLowerCase();


          const series =
            String(
              character.series
              ??
              ""
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
        50
      );


  status.textContent =

    matches.length

    +

    (
      matches.length === 1
      ?
      " result"
      :
      " results"
    );


  if (
    matches.length === 0
  ) {

    results.innerHTML = `

      <div class="empty-list">
        No matching character.
      </div>

    `;


    return;

  }


  for (
    const character
    of matches
  ) {

    results.appendChild(

      buildCharacterRow(
        character
      )

    );

  }

}



/*
========================================================
CHARACTER ROW
========================================================
*/


function buildCharacterRow(
  character
) {

  const row =
    document.createElement(
      "article"
    );


  row.className =
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


  row.innerHTML = `

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


      <button
        class="list-star-button ${starwished ? "active" : ""}"
        onclick="toggleStarwish('${escapeAttribute(character.id)}')"
        ${
          player.upgrades
            .starwishSlots <= 0
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


  return row;

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


  if (!list) {
    return;
  }


  list.innerHTML = "";


  if (
    player.claimedCharacters.length
    === 0
  ) {

    list.innerHTML = `

      <div class="empty-list">
        No claimed characters yet.
      </div>

    `;


    return;

  }


  for (
    const id
    of player.claimedCharacters
  ) {

    const character =
      findCharacter(id);


    if (character) {

      list.appendChild(

        buildCharacterRow(
          character
        )

      );

    }

  }

}



/*
========================================================
BADGES
========================================================
*/


function badgeUnlocked(
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



function buyBadge(
  badgeId
) {

  const badge =
    BADGES[badgeId];


  if (
    !badge
    ||
    !badgeUnlocked(
      badgeId
    )
  ) {

    return;

  }


  const current =
    player.badges[
      badgeId
    ];


  if (
    current >= 8
  ) {

    return;

  }


  const level =
    badge.levels[current];


  if (
    player.currency.kakera
    <
    level.cost
  ) {

    alert(
      "Not enough ◈."
    );

    return;

  }


  player.currency.kakera -=
    level.cost;


  player.statistics
    .totalCurrencySpent +=
    level.cost;


  player.badges[
    badgeId
  ] += 1;


  recalculateBonuses();


  renderBadges();

  updateAllDisplays();

  saveGame();

}



function renderBadges() {

  setText(
    "badgeBalance",
    formatNumber(
      player.currency.kakera
    )
  );


  const list =
    document.getElementById(
      "badgeList"
    );


  list.innerHTML = "";


  for (
    const badgeId
    of Object.keys(BADGES)
  ) {

    const badge =
      BADGES[badgeId];


    const level =
      player.badges[
        badgeId
      ];


    const unlocked =
      badgeUnlocked(
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


    let levels = "";


    badge.levels.forEach(

      function (
        info,
        index
      ) {

        const number =
          index + 1;


        const owned =
          level >= number;


        const next =
          level + 1 === number;


        levels += `

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

              <span>
                ◈ ${formatNumber(info.cost)}
              </span>

            </div>


            <ul class="badge-effects">

              ${
                info.effects
                  .map(
                    function (effect) {

                      return (
                        "<li>"
                        +
                        effect
                        +
                        "</li>"
                      );

                    }
                  )
                  .join("")
              }

            </ul>


            ${
              next
              &&
              unlocked

              ?

              `
              <button
                class="badge-buy"
                onclick="buyBadge('${badgeId}')"
                ${
                  player.currency.kakera
                  <
                  info.cost
                  ?
                  "disabled"
                  :
                  ""
                }
              >
                PURCHASE ${roman(number)}
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
            level
            +
            " / 8"
            :
            "LOCKED"
          }

        </span>

      </div>

      ${levels}

    `;


    list.appendChild(
      card
    );

  }

}



/*
========================================================
SPHERES
========================================================
*/


function awardSpheres(
  amount
) {

  for (
    let i = 0;
    i < amount;
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



function rollSphere() {

  const level =
    player.badges.diamond;


  const d100 =
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

          d100 >= entry[1]

          &&

          d100 <= entry[2]

        );

      }

    );


  return {

    type:
      result[0],

    value:
      result[3]

  };

}



function renderSpheres() {

  setText(

    "sphereUnlocked",

    player.upgrades
      .spheresUnlocked
    ?
    "Yes"
    :
    "No"

  );


  setText(

    "sphereValue",

    formatNumber(
      player.currency.spheres
    )

  );


  setText(

    "sphereDraws",

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


  const colors = [

    "blue",

    "teal",

    "green",

    "yellow",

    "orange",

    "red",

    "rainbow"

  ];


  for (
    const color
    of colors
  ) {

    const item =
      document.createElement(
        "div"
      );


    item.className =
      "sphere-item";


    item.innerHTML = `

      ${capitalize(color)}

      <strong>

        ${formatNumber(
          player.sphereInventory[
            color
          ]
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


function getCharacterChance(
  character
) {

  const pool =
    getEffectiveRollPool();


  let totalWeight = 0;

  let characterWeight = 1;


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

      characterWeight =
        weight;

    }


    totalWeight +=
      weight;

  }


  return formatPercent(

    characterWeight
    /
    totalWeight

  );

}



function getCurrencyChance(
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

          Number(entry.amount)
          ===
          Number(result.amount)

        );

      }

    ).length;


  return formatPercent(

    copies
    /
    pool.length

  );

}



function getEmptyChance() {

  const pool =
    getEffectiveRollPool();


  const empties =
    pool.filter(

      function (entry) {

        return (
          entry.type === "empty"
        );

      }

    ).length;


  return formatPercent(

    empties
    /
    pool.length

  );

}



/*
========================================================
PROFILE
========================================================
*/


function updateAllDisplays() {

  if (!player) {
    return;
  }


  recalculateBonuses();


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
    player.claims
      .available
  );


  setText(

    "currencyDisplay",

    formatNumber(
      player.currency
        .kakera
    )

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
    player.claims
      .available
  );


  setText(

    "profileStoredClaims",

    player.storedClaims
      .current

    +

    " / "

    +

    player.storedClaims
      .maximum

  );


  setText(
    "profileWishlistSlots",
    player.upgrades
      .wishlistSlots
  );


  setText(
    "profileWishBonus",
    formatNumber(
      player.upgrades
        .wishCurrencyBonus
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
      getEffectiveRollPool()
        .length
    )

  );


  setText(

    "profileCurrency",

    formatNumber(
      player.currency
        .kakera
    )

  );


  setText(

    "profileReactionPower",

    formatNumber(
      player.reactionPower
        .current
    )

    +

    "% / "

    +

    formatNumber(
      player.reactionPower
        .maximum
    )

    +

    "%"

  );


  setText(

    "profileReactionCost",

    player.upgrades
      .reactionCost

    +

    "%"

  );


  setText(

    "profileReactionRegen",

    player.upgrades
      .reactionRegen

    +

    "%"

  );


  setText(

    "profileKeys",

    formatNumber(
      getTotalKeys()
    )

  );


  setText(

    "profileSphereValue",

    formatNumber(
      player.currency
        .spheres
    )

  );


  updateNextClaim();

}



/*
========================================================
NEXT CLAIM
========================================================
*/


function updateNextClaim() {

  const interval =
    player.upgrades
      .claimInterval;


  const current =
    player.rounds.current;


  let next =
    current + 1;


  while (
    next % interval !== 0
  ) {

    next += 1;

  }


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

  const notice =
    document.getElementById(
      "roundNotice"
    );


  if (!text) {

    notice.classList.add(
      "hidden"
    );

    return;

  }


  notice.textContent =
    text;


  notice.classList.remove(
    "hidden"
  );

}



/*
========================================================
FIND CHARACTER
========================================================
*/


function findCharacter(
  id
) {

  return getCharacterEntries()
    .find(

      function (character) {

        return (
          character.id === id
        );

      }

    );

}



/*
========================================================
TOTAL KEYS
========================================================
*/


function getTotalKeys() {

  return Object.values(
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
          amount
          ??
          0
        )

      );

    },

    0

  );

}



/*
========================================================
HELPERS
========================================================
*/


function weightedChoice(
  array
) {

  const total =
    array.reduce(

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
    of array
  ) {

    random -=
      item.weight;


    if (
      random <= 0
    ) {

      return item;

    }

  }


  return array[
    array.length - 1
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



function clamp(
  value,
  minimum,
  maximum
) {

  return Math.min(

    maximum,

    Math.max(
      minimum,
      value
    )

  );

}



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
  value
) {

  return Number(
    value
    ??
    0
  ).toLocaleString();

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


  if (
    value >= 0.1
  ) {

    return value.toFixed(3);

  }


  return value.toFixed(4);

}



function escapeHtml(
  value
) {

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



function escapeAttribute(
  value
) {

  return escapeHtml(value);

}



function capitalize(
  value
) {

  return (

    value.charAt(0)
      .toUpperCase()

    +

    value.slice(1)

  );

}



function roman(
  value
) {

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

  ][value];

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

    updateSaveCards();

  }

);
