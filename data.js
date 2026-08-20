/*
=========================================
DEFAULT PLAYER DATA
=========================================

Every NEW save file starts as a copy
of this object.

Later, we will add more systems here.
*/


function createDefaultPlayer() {

  return {

    /*
    ---------------------------------
    SAVE INFORMATION
    ---------------------------------
    */

    saveVersion: 1,

    createdAt: Date.now(),

    lastSavedAt: Date.now(),


    /*
    ---------------------------------
    BASIC CURRENCIES
    ---------------------------------
    */

    currency: {
      kakera: 0,

      spheres: 0,

      towerCurrency: 0,

      gambleCurrency: 0
    },


    /*
    ---------------------------------
    CHARACTER COLLECTION
    ---------------------------------
    */

    claimedCharacters: [],


    /*
    This will eventually look something like:

    claimedCharacters: [
      "character_001",
      "character_205",
      "character_992"
    ]

    We store CHARACTER IDs rather than copying
    the entire character into the save.
    */


    /*
    ---------------------------------
    WISHLIST
    ---------------------------------
    */

    wishlist: [],

    starwishes: [],


    /*
    ---------------------------------
    KEYS
    ---------------------------------
    */

    keys: {},


    /*
    Later this could look like:

    keys: {
      character_001: 3,
      character_205: 8
    }
    */


    /*
    ---------------------------------
    BADGES
    ---------------------------------
    */

    badges: {

      badge1: 0,

      badge2: 0,

      badge3: 0,

      badge4: 0,

      badge5: 0,

      badge6: 0,

      badge7: 0,

      badge8: 0

    },


    /*
    Each badge currently starts at Level 0.

    Eventually:

    0 = not purchased
    1 = level 1
    ...
    8 = level 8
    */


    /*
    ---------------------------------
    INFINITE TOWER
    ---------------------------------
    */

    tower: {

      currentFloor: 1,

      highestFloor: 1,

      totalFloorsCleared: 0

    },


    /*
    ---------------------------------
    REACTION POWER
    ---------------------------------
    */

    reactionPower: {

      current: 100,

      maximum: 100,

      regeneration: 1

    },


    /*
    ---------------------------------
    CHARACTER SPHERES
    ---------------------------------
    */

    characterSpheres: {},


    /*
    Example later:

    characterSpheres: {

      character_001: {
        level: 3,
        value: 10
      }

    }
    */


    /*
    ---------------------------------
    GLOBAL SPHERE UPGRADES
    ---------------------------------
    */

    sphereUpgrades: {},


    /*
    ---------------------------------
    GENERAL UPGRADES
    ---------------------------------
    */

    upgrades: {

      wishlistSlots: 10,

      starwishSlots: 1,

      roles: 0,

      claims: 1,

      spawnChanceBonus: 0,

      reactionPowerBonus: 0,

      reactionCostReduction: 0,

      reactionRegenerationBonus: 0,

      reactionRarityBonus: 0,

      reactionValueBonus: 0,

      gambleQuantity: 1,

      gambleQuality: 1,

      additionalKeyChance: 0,

      sphereValueBonus: 0

    },


    /*
    ---------------------------------
    CLAIM INFORMATION
    ---------------------------------
    */

    claims: {

      available: 1,

      maximum: 1

    },


    /*
    ---------------------------------
    GAMBLING
    ---------------------------------
    */

    gambling: {

      totalGambles: 0,

      totalWon: 0,

      totalLost: 0

    },


    /*
    ---------------------------------
    GAME STATISTICS
    ---------------------------------
    */

    statistics: {

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

    }

  };

}
