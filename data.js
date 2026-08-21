/*
==================================================
PRIVATE GACHA
DATA.JS — PART 1 OF 2
==================================================

This file contains:

1. Default player/save data
2. Manual character-image overrides
3. First half of the character database

PART 2 will add:
- remaining characters
- database conversion
- +1 through +1250 currency rolls, twice
- 1,000 :( rolls
- final rollDatabase
==================================================
*/


/*
==================================================
DEFAULT PLAYER SAVE
==================================================
*/

function createDefaultPlayer() {

  return {

    saveVersion: 1,

    createdAt: Date.now(),

    lastSavedAt: Date.now(),


    /*
    ------------------------------
    CURRENCIES
    ------------------------------
    */

    currency: {

      kakera: 0,

      spheres: 0,

      towerCurrency: 0,

      gambleCurrency: 0

    },


    /*
    ------------------------------
    CHARACTER COLLECTION
    ------------------------------
    */

    claimedCharacters: [],


    /*
    ------------------------------
    WISHES
    ------------------------------
    */

    wishlist: [],

    starwishes: [],


    /*
    ------------------------------
    CHARACTER KEYS
    ------------------------------

    Example later:

    keys: {
      "one_piece_6": 3
    }

    */

    keys: {},


    /*
    ------------------------------
    BADGES
    ------------------------------
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
    ------------------------------
    INFINITE TOWER
    ------------------------------
    */

    tower: {

      currentFloor: 1,

      highestFloor: 1,

      totalFloorsCleared: 0

    },


    /*
    ------------------------------
    REACTION POWER
    ------------------------------
    */

    reactionPower: {

      current: 100,

      maximum: 100,

      regeneration: 1

    },


    /*
    ------------------------------
    CHARACTER SPHERES
    ------------------------------
    */

    characterSpheres: {},


    /*
    ------------------------------
    GLOBAL SPHERE UPGRADES
    ------------------------------
    */

    sphereUpgrades: {},


    /*
    ------------------------------
    GENERAL UPGRADES
    ------------------------------
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
    ------------------------------
    CLAIMS
    ------------------------------
    */

    claims: {

      available: 1,

      maximum: 1

    },


    /*
    ------------------------------
    GAMBLING
    ------------------------------
    */

    gambling: {

      totalGambles: 0,

      totalWon: 0,

      totalLost: 0

    },


    /*
    ------------------------------
    STATISTICS
    ------------------------------
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



/*
==================================================
MANUAL CHARACTER IMAGES
==================================================

This lets you add pictures WITHOUT editing the
actual character database.

Later, if you have an image for Nami:

characterImages["one_piece_6"] =
  "images/nami.jpg";

Or an online image URL:

characterImages["one_piece_6"] =
  "https://example.com/nami.jpg";


HOW CHARACTER IDs WORK:

series + rank

ONE PIECE #6
becomes:

one_piece_6

GENSHIN IMPACT #32
becomes:

genshin_impact_32


Leave this object empty until you want pictures.
==================================================
*/

const characterImages = {

  /*
  EXAMPLES:

  "one_piece_6": "images/nami.jpg",

  "jujutsu_kaisen_4": "images/gojo.jpg",

  "vocaloid_3": "images/miku.jpg"

  */

};



/*
==================================================
CHARACTER DATABASE — PART 1
==================================================

Each character uses:

[
  rank,
  "name",
  value
]

The SERIES is written once for the entire group.

This saves a LOT of space compared with writing:

{
  name:
  series:
  rank:
  value:
  spawnWeight:
  image:
}

thousands of times.

Part 2 will automatically convert these short
entries into the full character objects that
app.js expects.

Every character will initially get:

type: "character"
spawnWeight: 1
image: manually chosen image or ""
==================================================
*/


const characterSeriesPart1 = [

  {
    series: "ONE PIECE",

    characters: [

      [6, "Nami", 982],
      [8, "Monkey D. Luffy", 894],
      [17, "Roronoa Zoro", 823],
      [23, "Nico Robin", 879],
      [39, "Sanji", 675],
      [95, "Boa Hancock", 617],
      [139, "Tony Tony Chopper", 416],
      [182, "Yamato", 514],
      [192, "Trafalgar Law", 349],
      [202, "Portgas D. Ace", 398],
      [248, "Usopp", 301],
      [257, "Shanks", 292],
      [285, "Brook", 282],
      [388, "Perona", 304],
      [413, "Franky", 233],
      [469, "Sabo", 213],
      [679, "Jinbe", 168],
      [756, "Nefertari Vivi", 226],
      [851, "Dracule Mihawk", 152],
      [856, "Carrot", 194],
      [880, "Whitebeard", 141],
      [992, "Donquixote Doflamingo", 143],
      [1013, "Charlotte Katakuri", 138],
      [1215, "Donquixote Rosinante", 128],
      [1219, "Buggy", 132],
      [1293, "Crocodile", 123],
      [1396, "Gol D. Roger", 125],
      [1421, "Bon Clay", 155],
      [1422, "Vinsmoke Reiju", 147],
      [1613, "Kaidou", 107],
      [1731, "Shirahoshi", 140],
      [1859, "Jewelry Bonney", 131],
      [1917, "Eustass Kid", 105],
      [2000, "Koala", 121],
      [2018, "Monkey D. Garp", 102],
      [2071, "Tashigi", 119],
      [2090, "Smoker", 99],
      [2170, "Marco", 90],
      [2171, "Aokiji", 92],
      [2232, "Rebecca (OP)", 117],
      [2237, "Big Mom", 105],
      [2398, "Silvers Rayleigh", 92],
      [2483, "Koby", 94],
      [2498, "Enel", 83],
      [2683, "Ulti", 104],
      [2710, "Charlotte Pudding", 103],
      [2783, "Kozuki Oden", 78],
      [2860, "Komurasaki", 100],
      [3045, "Bartholomew Kuma", 81],
      [3111, "Bartolomeo", 73],
      [3157, "Blackbeard", 80],
      [3245, "Monet", 83],
      [3461, "Kizaru", 71],
      [3484, "Kikunojo", 81],
      [3827, "Baby 5", 75],
      [3948, "Monkey D. Dragon", 73],
      [4026, "Bepo", 64],
      [4063, "Viola (OP)", 80],
      [4090, "Rob Lucci", 69],
      [4228, "Fujitora", 63],
      [4259, "Akainu", 70],
      [4511, "Black Maria", 74],
      [4603, "Emporio Ivankov", 76],
      [4815, "Imu", 76],
      [5274, "Kalifa", 68],
      [5309, "Laboon", 61],
      [5418, "Lilith (OP)", 72],
      [5460, "Nojiko", 67],
      [5469, "Camie", 66],
      [5723, "Killer", 57],
      [5949, "Pedro", 46],
      [5968, "Charlotte Smoothie", 62],
      [6064, "Stussy", 64],
      [6115, "Bellemere", 63],
      [6160, "Karoo", 55],
      [6371, "Alvida", 66],
      [6494, "Caesar Clown", 53],
      [6581, "Loki (OP)", 56],
      [6591, "O-Tama", 59],
      [6890, "Hina (OP)", 61],
      [7066, "Makino", 60],
      [7091, "Cavendish", 53],
      [7193, "King (OP)", 53],
      [7376, "Kin'emon", 50],
      [7470, "Going Merry's Klabautermann", 58],
      [7603, "Rocks D. Xebec", 54],
      [7636, "Shyarly", 57],
      [7638, "Kaya", 58],
      [7952, "Kaku", 49]

    ]

  },


  {
    series: "JUJUTSU KAISEN",

    characters: [

      [4, "Satoru Gojo", 977],
      [26, "Sukuna", 766],
      [40, "Yuji Itadori", 721],
      [58, "Maki Zenin", 705],
      [71, "Megumi Fushiguro", 590],
      [73, "Toji Fushiguro", 592],
      [75, "Nobara Kugisaki", 664],
      [85, "Suguru Geto", 557],
      [93, "Kento Nanami", 550],
      [155, "Choso", 444],
      [158, "Yuta Okkotsu", 437],
      [222, "Toge Inumaki", 338],
      [433, "Mahito", 241],
      [460, "Aoi Todo", 245],
      [655, "Kasumi Miwa", 240],
      [775, "Mei Mei", 221],
      [869, "Yuki Tsukumo", 212],
      [942, "Hiromi Higuruma", 168],
      [991, "Shoko Ieiri", 192],
      [1138, "Kinji Hakari", 140],
      [1150, "Kirara Hoshi", 179],
      [1157, "Mahoraga", 195],
      [1160, "Mai Zenin", 177],
      [1253, "Utahime Iori", 170],
      [1462, "Panda (JJK)", 127],
      [2177, "Junpei Yoshino", 105],
      [2239, "Naoya Zenin", 105],
      [2301, "Rika Orimoto", 121],
      [2320, "Kenjaku", 131],
      [2360, "Hajime Kashimo", 103],
      [2920, "Jogo", 87],
      [3199, "Riko Amanai", 99],
      [3349, "Hanami", 103],
      [3354, "Uraume", 104],
      [3436, "Ultimate Mechamaru", 77],
      [4939, "Fumihiko Takaba", 68],
      [4971, "Momo Nishimiya", 73],
      [5325, "Noritoshi Kamo", 68],
      [5401, "Ryu Ishigori", 67],
      [5543, "Takako Uro", 68],
      [6161, "Yorozu", 69],
      [6662, "Takuma Ino", 59],
      [7279, "Atsuya Kusakabe", 62],
      [7418, "Takada-chan", 63],
      [7839, "Hana Kurusu", 61]

    ]

  },


  {
    series: "NARUTO",

    characters: [

      [13, "Naruto Uzumaki", 691],
      [44, "Sasuke Uchiha", 555],
      [48, "Hinata Hyuuga", 725],
      [70, "Itachi Uchiha", 509],
      [106, "Kakashi Hatake", 450],
      [121, "Tsunade", 507],
      [187, "Sakura Haruno", 418],
      [217, "Madara Uchiha", 286],
      [313, "Gaara", 247],
      [385, "Minato Namikaze", 222],
      [414, "Obito Uchiha", 214],
      [461, "Pain", 205],
      [522, "Shikamaru Nara", 177],
      [561, "Rock Lee", 181],
      [644, "Konan", 227],
      [670, "Jiraiya", 168],
      [688, "Temari", 214],
      [759, "Ino Yamanaka", 214],
      [935, "Orochimaru", 211],
      [967, "Deidara", 143],
      [968, "Neji Hyuuga", 142],
      [1018, "Kushina Uzumaki", 183],
      [1239, "Sasori", 127],
      [1241, "Tobi", 140],
      [1286, "Tenten", 141],
      [1316, "Shisui Uchiha", 119],
      [1441, "Hanabi Hyuuga", 145],
      [1537, "Killer Bee", 99],
      [1722, "Might Guy", 111],
      [2012, "Hidan", 93],
      [2067, "Sai", 104],
      [2109, "Hashirama Senju", 102],
      [2125, "Tobirama Senju", 101],
      [2317, "Kyuubi", 101],
      [2381, "Nagato", 94],
      [2394, "Ay", 64],
      [2414, "Mei Terumi", 114],
      [2428, "Kiba Inuzuka", 92],
      [2720, "Rin Nohara", 107],
      [2787, "Haku (Naruto)", 86],
      [2826, "Kurenai Yuuhi", 107],
      [2854, "Zabuza Momochi", 86],
      [3233, "Kisame Hoshigaki", 77],
      [3321, "Karin", 88],
      [3357, "Kaguya Ōtsutsuki", 92],
      [3433, "Anko Mitarashi", 89],
      [4043, "Kakuzu", 64],
      [4275, "Akamaru", 71],
      [4308, "Asuma Sarutobi", 71],
      [4445, "Itachi's Crow", 80],
      [4808, "Iruka Umino", 69],
      [5300, "Shino Aburame", 57],
      [5612, "Kabuto Yakushi", 60],
      [5741, "Suigetsu Hoozuki", 60],
      [5777, "Yahiko", 61],
      [5931, "Yamato (Naruto)", 60],
      [6025, "Shizune", 63],
      [6066, "Kimimaro", 56],
      [6213, "Samui", 56],
      [6665, "Zetsu", 55],
      [6949, "Chouji Akimichi", 52],
      [7224, "Indra Ōtsutsuki", 55],
      [7313, "Kankurou", 51],
      [7353, "Konohamaru Sarutobi", 52],
      [7393, "Tayuya", 50]

    ]

  },


  {
    series: "ATTACK ON TITAN",

    characters: [

      [15, "Mikasa Ackerman", 917],
      [21, "Levi", 777],
      [36, "Eren Jaeger", 687],
      [76, "Hange Zoë", 710],
      [174, "Sasha Braus", 461],
      [205, "Armin Arlert", 351],
      [212, "Annie Leonhart", 440],
      [318, "Krista Lenz", 340],
      [412, "Pieck Finger", 291],
      [434, "Erwin Smith", 226],
      [571, "Ymir", 260],
      [698, "Reiner Braun", 174],
      [734, "Jean Kirstein", 168],
      [1305, "Zeke", 120],
      [1714, "Connie Springer", 109],
      [2139, "Gabi Braun", 112],
      [2292, "Yelena", 106],
      [2553, "Bertholdt Hoover", 95],
      [2626, "Petra Ral", 101],
      [3128, "Falco Grice", 71],
      [3468, "Hitch Dreyse", 84],
      [3623, "Kenny the Ripper", 75],
      [4067, "Porco Galliard", 69],
      [4247, "Marco Bott", 66],
      [4565, "Carla Jaeger", 75],
      [4897, "Ymir Fritz", 69],
      [5484, "Frieda Reiss", 71],
      [6043, "Niccolo", 55],
      [6634, "Floch Forster", 51],
      [6741, "Riko Brzenska", 57],
      [7144, "Dot Pixis", 51],
      [7745, "Onyankopon", 50],
      [7768, "Grisha Jaeger", 54]

    ]

  },


  {
    series: "GENSHIN IMPACT",

    characters: [

      [32, "Hu Tao", 590],
      [74, "Raiden Shogun", 445],
      [80, "Ganyu", 426],
      [86, "Xiao", 334],
      [90, "Zhongli", 302],
      [117, "Venti", 273],
      [118, "Furina", 424],
      [127, "Tartaglia", 288],
      [135, "Yae Miko", 341],
      [137, "Diluc", 243],
      [206, "Wanderer", 259],
      [211, "Kaeya", 218],
      [226, "Eula", 240],
      [232, "Arlecchino", 297],
      [236, "Kaedehara Kazuha", 209],
      [265, "Keqing", 224],
      [275, "Mona", 220],
      [301, "Beidou", 199],
      [325, "Lisa", 197],
      [328, "Klee", 167],
      [334, "Jean", 193],
      [342, "Kamisato Ayaka", 204],
      [343, "Yelan", 200],
      [345, "Amber", 216],
      [365, "Fischl", 193],
      [383, "Arataki Itto", 191],
      [384, "Columbina", 219],
      [390, "Paimon", 170],
      [401, "Yoimiya", 186],
      [402, "Shenhe", 187],
      [404, "Lumine", 207],
      [440, "Albedo (GI)", 196],
      [475, "Sangonomiya Kokomi", 171],
      [480, "Neuvillette", 165],
      [491, "Alhaitham", 182],
      [534, "Noelle", 156],
      [584, "Wriothesley", 159],
      [600, "Ningguang", 152],
      [608, "Razor", 124],
      [623, "Aether", 172],
      [659, "Sucrose", 148],
      [675, "Nahida", 143],
      [693, "Navia", 150],
      [695, "Chongyun", 121],
      [699, "Kaveh", 144],
      [711, "Qiqi", 121],
      [713, "Kamisato Ayato", 128],
      [724, "Yanfei", 139],
      [753, "Bennett", 124],
      [806, "Cyno", 128],
      [843, "Rosaria", 134],
      [878, "Barbara", 129],
      [890, "Thoma", 119],
      [930, "Dainsleif", 127],
      [943, "Mavuika", 135],
      [1022, "Gorou", 112],
      [1052, "Xingqiu", 109],
      [1062, "Il Dottore", 126],
      [1125, "Xiangling", 121],
      [1149, "Nilou", 121],
      [1184, "Flins", 113],
      [1248, "Lyney", 114],
      [1276, "Il Capitano", 117],
      [1280, "Baizhu", 116],
      [1289, "Tighnari", 105],
      [1300, "Diona", 104],
      [1322, "Clorinde", 122],
      [1337, "Kinich", 104],
      [1342, "La Signora", 112],
      [1350, "Dehya", 112],
      [1468, "Skirk", 109],
      [1495, "Kujou Sara", 107],
      [1536, "Varka", 101],
      [1609, "Xinyan", 99],
      [1620, "Citlali", 110],
      [1628, "Shikanoin Heizou", 95],
      [1679, "Sandrone", 107],
      [1716, "Collei", 128],
      [1783, "Mualani", 94],
      [1787, "Lynette", 101],
      [1814, "Kuki Shinobu", 99],
      [1860, "Layla", 101],
      [1892, "Xilonen", 93],
      [1907, "Pantalone", 94],
      [2220, "Yun Jin", 87],
      [2224, "Sayu", 74],
      [2265, "Xianyun", 95],
      [2344, "Varesa", 89],
      [2376, "Nefer", 84],
      [2395, "Freminet", 79],
      [2567, "Durin", 83],
      [2778, "Kirara", 79],
      [2794, "Lauma", 76],
      [3060, "Yaoyao", 72],
      [3113, "Candace", 76],
      [3143, "Chiori", 74],
      [3193, "Gaming", 71],
      [3278, "Faruzan", 73],
      [3610, "Lohen", 61],
      [3957, "Chasca", 68],
      [4096, "Alice (GI)", 75],
      [4105, "Ororon", 64],
      [4225, "Sigewinne", 62],
      [4543, "Ifa", 64],
      [4878, "Ineffa", 62],
      [4894, "Escoffier", 61],
      [5184, "Dvalin", 57],
      [5246, "Nicole (GI)", 63],
      [5385, "Yumemizuki Mizuki", 62],
      [5648, "Dori", 56],
      [5749, "Chevreuse", 62],
      [5839, "Kazuha's Friend", 60],
      [5895, "Pierro", 58],
      [6158, "Sethos", 55],
      [6206, "Katheryne", 59],
      [6269, "Guoba", 52],
      [6340, "Ronova", 58],
      [6365, "Charlotte (GI)", 59],
      [6372, "Makoto (GI)", 61],
      [6503, "Jahoda", 54],
      [6564, "Rerir", 55],
      [6863, "Greater Lord Rukkhadevata", 58],
      [6981, "Iansan", 51],
      [7231, "Emilie", 55],
      [7254, "The Tsaritsa", 49],
      [7362, "Bonanus", 53],
      [7411, "Jeht", 51],
      [7792, "Madame Ping", 44],
      [7854, "Guizhong", 52],
      [7946, "Kachina", 48]

    ]

  },


  {
    series: "DEMON SLAYER",

    characters: [

      [18, "Nezuko Kamado", 886],
      [31, "Shinobu Kochou", 820],
      [57, "Tanjirou Kamado", 544],
      [78, "Mitsuri Kanroji", 660],
      [94, "Giyuu Tomioka", 479],
      [128, "Inosuke Hashibira", 402],
      [133, "Zenitsu Agatsuma", 385],
      [154, "Kyoujurou Rengoku", 429],
      [239, "Tengen Uzui", 309],
      [251, "Kanao Tsuyuri", 394],
      [296, "Akaza", 311],
      [307, "Muichirou Tokitou", 282],
      [425, "Obanai Igurou", 243],
      [583, "Douma", 190],
      [606, "Sanemi Shinazugawa", 204],
      [686, "Muzan Kibutsuji", 185],
      [689, "Daki", 230],
      [765, "Kokushibou", 172],
      [796, "Kanae Kochou", 225],
      [811, "Sabito", 156],
      [1105, "Yoriichi Tsugikuni", 158],
      [1114, "Gyoumei Himejima", 151],
      [1181, "Genya Shinazugawa", 140],
      [1223, "Tamayo", 169],
      [1740, "Gyuutarou", 111],
      [1808, "Makomo", 132],
      [1903, "Suma", 133],
      [1943, "Makio", 130],
      [1965, "Aoi Kanzaki", 134],
      [2028, "Rui", 104],
      [2166, "Enmu", 101],
      [2365, "Hinatsuru", 117],
      [2584, "Spider Demon (Mother)", 109],
      [2995, "Hotaru Haganezuka", 80],
      [3087, "Yushiro", 83],
      [3348, "Susamaru", 90],
      [4425, "Kagaya Ubuyashiki", 76],
      [5071, "Sakonji Urokodaki", 66],
      [5342, "Senjurou Rengoku", 71],
      [5464, "Kaigaku", 66],
      [5551, "Nakime", 67],
      [5678, "Chachamaru", 71],
      [6859, "Hantengu", 51],
      [6865, "Ukogi", 50]

    ]

  },


  {
    series: "MY HERO ACADEMIA",

    characters: [

      [45, "Himiko Toga", 759],
      [50, "Izuku Midoriya", 562],
      [61, "Katsuki Bakugou", 595],
      [68, "Shoto Todoroki", 521],
      [96, "Ochako Uraraka", 603],
      [146, "Dabi", 365],
      [148, "Mirko", 509],
      [172, "Tsuyu Asui", 458],
      [197, "Hawks", 320],
      [215, "Momo Yaoyorozu", 408],
      [246, "All Might", 309],
      [250, "Shouta Aizawa", 291],
      [264, "Eijirou Kirishima", 285],
      [292, "Mina Ashido", 347],
      [329, "Kyouka Jirou", 343],
      [332, "Denki Kaminari", 231],
      [362, "Eri", 292],
      [371, "Nejire Hadou", 319],
      [395, "Midnight", 308],
      [411, "Tomura Shigaraki", 243],
      [415, "Tamaki Amajiki", 224],
      [656, "Mt. Lady", 245],
      [663, "Mirio Togata", 165],
      [730, "Hitoshi Shinsou", 162],
      [820, "Mei Hatsume", 211],
      [902, "Lady Nagant", 191],
      [944, "Fumikage Tokoyami", 151],
      [1036, "Overhaul", 141],
      [1235, "Endeavor", 123],
      [1244, "Tenya Iida", 127],
      [1249, "Camie Utsushimi", 162],
      [1296, "Twice", 117],
      [1476, "Tooru Hagakure", 148],
      [1505, "Mitsuki Bakugou", 153],
      [1656, "Fat Gum", 102],
      [1658, "Fuyumi Todoroki", 144],
      [1690, "Nana Shimura", 141],
      [1702, "Neito Monoma", 108],
      [1742, "Hanta Sero", 109],
      [1866, "Present Mic", 103],
      [2420, "Stain", 91],
      [2434, "Itsuka Kendou", 108],
      [2551, "Ms. Joke", 107],
      [2692, "La Brava", 86],
      [2864, "All For One", 88],
      [3089, "Toya Todoroki", 79],
      [3129, "Ragdoll", 88],
      [3179, "Mr. Compress", 76],
      [3305, "Gentle Criminal", 67],
      [3350, "Mandalay", 88],
      [3456, "Burnin", 83],
      [3467, "Inko Midoriya", 81],
      [3637, "Sir Nighteye", 72],
      [3733, "Ryuukyuu", 77],
      [3847, "Pixie-Bob", 82],
      [3880, "Kinoko Komori", 75],
      [3905, "Yuuga Aoyama", 73],
      [3960, "Kurogiri", 73],
      [4320, "Rei Todoroki", 73],
      [4492, "You Shindou", 64],
      [4601, "Tetsutetsu Tetsutetsu", 64],
      [4637, "Gang Orca", 58],
      [4716, "Best Jeanist", 66],
      [4788, "Setsuna Tokage", 72],
      [4857, "Bubble Girl", 64],
      [4864, "10t", 69],
      [4990, "Star and Stripe", 70],
      [5039, "Minoru Mineta", 58],
      [5109, "Natsuo Todoroki", 60],
      [5289, "Mezou Shouji", 58],
      [5628, "Nezu", 51],
      [5650, "Inasa Yoarashi", 58],
      [5653, "Edgeshot", 57],
      [5715, "Ibara Shiozaki", 64],
      [5952, "Mashirao Ojiro", 58],
      [5962, "Saiko Intelli", 62],
      [6053, "Gran Torino", 52],
      [6180, "Pony Tsunotori", 57],
      [6532, "Thirteen (BnHA)", 57],
      [6627, "Yui Kodai", 59],
      [7088, "Curious", 56],
      [7141, "Uwabami", 58],
      [7382, "Spinner", 51],
      [7401, "Sirius (BnHA)", 53]

    ]

  },


  {
    series: "BLEACH",

    characters: [

      [91, "Ichigo Kurosaki", 495],
      [113, "Yoruichi Shihōin", 567],
      [116, "Rukia Kuchiki", 569],
      [227, "Orihime Inoue", 421],
      [281, "Sōsuke Aizen", 244],
      [450, "Rangiku Matsumoto", 286],
      [506, "Nelliel Tu Odelschwanck", 281],
      [540, "Kisuke Urahara", 187],
      [651, "Ulquiorra Cifer", 167],
      [680, "Grimmjow Jaegerjaquez", 180],
      [768, "Kenpachi Zaraki", 143],
      [776, "Soi Fon", 204],
      [896, "Tier Harribel", 189],
      [921, "Tōshirō Hitsugaya", 141],
      [949, "Retsu Unohana", 169],
      [1064, "Byakuya Kuchiki", 132],
      [1543, "Gin Ichimaru", 109],
      [1622, "Bambietta Basterbine", 138],
      [1704, "Renji Abarai", 107],
      [1911, "Shinji Hirako", 95],
      [2016, "Shunsui Kyōraku", 100],
      [2118, "Nemu Kurotsuchi", 123],
      [2132, "Riruka Dokugamine", 115],
      [2330, "Chad", 83],
      [2436, "Uryū Ishida", 83],
      [2443, "White", 99],
      [2589, "Coyote Starrk", 80],
      [2762, "Zangetsu", 84],
      [2773, "Yhwach", 80],
      [3322, "Yachiru Kusajishi", 87],
      [3324, "Kūkaku Shiba", 89],
      [3617, "Giselle Gewelle", 81],
      [4112, "Candice Catnipp", 80],
      [4158, "Kon", 66],
      [4389, "Genryūsai Shigekuni Yamamoto", 70],
      [4433, "Shūhei Hisagi", 66],
      [4690, "Mayuri Kurotsuchi", 60],
      [4786, "Jūshirō Ukitake", 62],
      [5301, "Isane Kotetsu", 64],
      [5321, "Senjumaru Shutara", 69],
      [6014, "Hiyori Sarugaki", 67],
      [6312, "Lisa Yadōmaru", 64],
      [6339, "Ikkaku Madarame", 53],
      [6900, "Momo Hinamori", 61],
      [7020, "Jugram Haschwalth", 55],
      [7235, "White Zangetsu", 58],
      [7280, "Kirio Hikifune", 61],
      [7378, "Masaki Kurosaki", 59],
      [7511, "Nanao Ise", 57],
      [7523, "Isshin Kurosaki", 51],
      [7820, "Äs Nödt", 50]

    ]

  },


  {
    series: "CHAINSAW MAN",

    characters: [

      [11, "Power", 963],
      [16, "Makima", 921],
      [35, "Denji", 660],
      [47, "Reze", 756],
      [171, "Aki Hayakawa", 432],
      [207, "Kobeni Higashiyama", 439],
      [242, "Himeno", 406],
      [268, "Asa Mitaka", 390],
      [269, "Pochita", 286],
      [280, "Yoru", 380],
      [310, "Angel Devil", 307],
      [527, "Quanxi", 261],
      [1011, "Beam", 140],
      [1226, "Kishibe", 132],
      [1272, "Nayuta", 168],
      [1387, "Hirofumi Yoshida", 128],
      [1425, "Fami", 152],
      [1752, "Meowy", 143],
      [2404, "Cosmo (CSM)", 105],
      [4077, "Long", 82],
      [4363, "Violence Fiend", 64],
      [4612, "Fox Devil", 83],
      [5305, "Gun Devil", 76],
      [5903, "Falling Devil", 61],
      [6226, "Darkness Devil", 65],
      [6426, "Samurai Sword", 60],
      [7394, "Future Devil", 52],
      [7434, "Fumiko Mifune", 63],
      [7628, "Pingtsi", 56],
      [7732, "Akane Sawatari", 61],
      [7959, "Master", 60]

    ]

  },


  {
    series: "HUNTER X HUNTER",

    characters: [

      [41, "Killua Zoldyck", 657],
      [83, "Gon Freecss", 433],
      [99, "Kurapika", 449],
      [150, "Hisoka", 300],
      [243, "Neferpitou", 448],
      [290, "Chrollo Lucilfer", 257],
      [382, "List (HxH)", 52],
      [497, "Shizuku Murasaki", 284],
      [536, "Leorio Paladiknight", 200],
      [577, "Meruem", 163],
      [702, "Alluka Zoldyck", 229],
      [844, "Feitan Portor", 154],
      [859, "Illumi Zoldyck", 148],
      [973, "Nanika", 214],
      [1115, "Kite", 125],
      [1168, "Machi Komachine", 162],
      [1265, "Biscuit Krueger", 149],
      [1400, "Komugi", 136],
      [2044, "Isaac Netero", 92],
      [2321, "Pakunoda", 100],
      [2547, "Ging Freecss", 84],
      [3369, "Shalnark", 73],
      [3376, "Shaiapouf", 71],
      [3811, "Knuckle Bine", 64],
      [4051, "Canary", 64],
      [4082, "Kalluto Zoldyck", 67],
      [4576, "Ponzu", 71],
      [5324, "Wing", 55],
      [5587, "Zeno Zoldyck", 57],
      [5608, "Palm Siberia", 62],
      [5736, "Ikalgo", 49],
      [5858, "Uvogin", 54],
      [6037, "Silva Zoldyck", 57],
      [6368, "Menchi", 61],
      [7472, "Nobunaga Hazama", 51],
      [7539, "Pariston Hill", 45],
      [7799, "Mito Freecss", 56],
      [7862, "Neon Nostrade", 56]

    ]

  },


  {
    series: "HAIKYUU",

    characters: [

      [141, "Shouyou Hinata", 359],
      [167, "Tobio Kageyama", 312],
      [200, "Kenma Kozume", 311],
      [253, "Tooru Oikawa", 263],
      [315, "Yuu Nishinoya", 231],
      [330, "Kei Tsukishima", 237],
      [340, "Tetsurou Kuroo", 230],
      [438, "Koutarou Bokuto", 207],
      [552, "Koushi Sugawara", 183],
      [628, "Keiji Akaashi", 164],
      [745, "Atsumu Miya", 164],
      [782, "Kiyoko Shimizu", 196],
      [1038, "Satori Tendou", 124],
      [1116, "Osamu Miya", 131],
      [1193, "Tadashi Yamaguchi", 127],
      [1354, "Wakatoshi Ushijima", 117],
      [1393, "Daichi Sawamura", 121],
      [1398, "Hajime Iwaizumi", 114],
      [1439, "Rintarou Suna", 111],
      [1473, "Ryuunosuke Tanaka", 115],
      [1562, "Asahi Azumane", 114],
      [1584, "Kiyoomi Sakusa", 105],
      [1627, "Hitoka Yachi", 122],
      [2191, "Lev Haiba", 91],
      [2212, "Saeko Tanaka", 107],
      [2333, "Keishin Ukai", 84],
      [2470, "Shinsuke Kita", 88],
      [3020, "Eita Semi", 72],
      [3656, "Alisa Haiba", 76],
      [3680, "Yuuji Terushima", 69],
      [3861, "Morisuke Yaku", 67],
      [4512, "Kourai Hoshiumi", 69],
      [5037, "Little Giant", 64],
      [5152, "Takanobu Aone", 59],
      [5491, "Tsutomu Goshiki", 56],
      [5726, "Akira Kunimi", 60],
      [5862, "Ittetsu Takeda", 55],
      [6441, "Kentarou Kyoutani", 57],
      [7014, "Chikara Ennoshita", 51]

    ]

  },


  {
    series: "RE:ZERO",

    characters: [

      [2, "Rem", 1026],
      [14, "Ram", 869],
      [24, "Emilia", 862],
      [114, "Echidna", 519],
      [193, "Subaru Natsuki", 284],
      [373, "Ferris", 173],
      [455, "Beatrice (RZ)", 280],
      [779, "Satella", 217],
      [1474, "Crusch Karsten", 142],
      [1597, "Puck", 85],
      [1617, "Reinhard van Astrea", 85],
      [1682, "Felt", 119],
      [1945, "Frederica Baumann", 129],
      [2052, "Shaula", 110],
      [2113, "Priscilla Barielle", 120],
      [2120, "Elsa Granhiert", 119],
      [2719, "Otto Suwen", 61],
      [3255, "Garfiel Tinsel", 58],
      [3447, "Minerva (RZ)", 82],
      [3662, "Petra Leyte", 80],
      [3713, "Theresia van Astrea", 79],
      [3792, "Anastasia Hoshin", 81],
      [5016, "Daphne", 66],
      [5025, "Regulus Corneas", 54],
      [5105, "Julius Euclius", 54],
      [5169, "Sekhmet", 68],
      [5237, "Capella Emerada Lugunica", 69],
      [5318, "Pandora (RZ)", 64],
      [5566, "Patrasche", 59],
      [6118, "Wilhelm van Astrea", 39],
      [6230, "Carmilla (RZ)", 56],
      [6594, "Petelgeuse Romanée-Conti", 43],
      [6656, "Roswaal L. Mathers", 47],
      [7148, "Mimi Pearlbaton", 58],
      [7395, "Typhon", 50],
      [7555, "Aldebaran", 47],
      [7879, "Fortuna", 57]

    ]

  },


  {
    series: "HONKAI: STAR RAIL",

    characters: [

      [180, "Kafka", 319],
      [420, "Acheron", 218],
      [474, "Dan Heng", 174],
      [482, "Firefly", 212],
      [488, "Blade", 161],
      [500, "Aventurine", 183],
      [558, "Sunday", 171],
      [559, "Phainon", 166],
      [638, "Boothill", 146],
      [649, "Herta", 167],
      [741, "Sparkle", 152],
      [750, "Jing Yuan", 135],
      [763, "March 7th", 158],
      [772, "Castorice", 144],
      [925, "Mydei", 127],
      [966, "Silver Wolf", 139],
      [982, "Robin (HSR)", 133],
      [1027, "Himeko", 124],
      [1078, "Seele", 122],
      [1106, "Black Swan", 126],
      [1129, "Cyrene", 135],
      [1156, "Trailblazer (F)", 126],
      [1302, "Ruan Mei", 114],
      [1320, "Anaxa", 109],
      [1340, "Jingliu", 113],
      [1391, "Dr. Ratio", 105],
      [1472, "Bronya", 108],
      [1512, "Cipher", 106],
      [1545, "Feixiao", 106],
      [1561, "Argenti", 102],
      [1581, "Tingyun", 110],
      [1659, "Sampo", 93],
      [1820, "Topaz", 101],
      [1997, "Gallagher", 91],
      [2025, "Luocha", 85],
      [2083, "Fu Xuan", 90],
      [2276, "Gepard", 81],
      [2280, "Aglaea", 94],
      [2283, "Huohuo", 82],
      [2328, "Evernight", 90],
      [2489, "Trailblazer (M)", 83],
      [2571, "Serval (HSR)", 84],
      [2741, "Clara", 74],
      [2977, "Hyacine", 79],
      [3192, "Jiaoqiu", 74],
      [3232, "Hysilens", 75],
      [3786, "Lingsha", 70],
      [3809, "Qingque", 67],
      [3842, "Rappa", 68],
      [3873, "Yanqing", 63],
      [4335, "Moze", 63],
      [4356, "Nanook", 74],
      [4430, "Hanya", 66],
      [4457, "Cerydra", 65],
      [4463, "The Dahlia", 65],
      [4502, "Guinaifen", 63],
      [4550, "Asta (HSR)", 67],
      [4572, "Jade (HSR)", 68],
      [4588, "Natasha", 66],
      [4643, "Pela", 61],
      [4727, "Pom-Pom", 72],
      [4802, "Bailu", 57],
      [4998, "Sparxie", 58],
      [5049, "Dan Feng", 65],
      [5303, "Tribbie", 56],
      [5463, "Sushang", 59],
      [5486, "Yukong", 60],
      [5716, "Evanescia", 55],
      [5990, "Xueyi", 58],
      [6057, "Arlan", 54],
      [6329, "Misha (HSR)", 55],
      [6337, "Luka (HSR)", 55],
      [6528, "Yunli", 55],
      [6569, "Lynx", 53],
      [6948, "Ashveil", 50],
      [6992, "Mr. Reca", 52],
      [7038, "Svarog", 49],
      [7359, "Yaoshi", 60],
      [7437, "Yao Guang", 50],
      [7593, "Screwllum", 51],
      [7827, "Hook", 46]

    ]

  },


  {
    series: "DANGANRONPA",

    characters: [

      [97, "Chiaki Nanami", 596],
      [136, "Nagito Komaeda", 402],
      [323, "Ibuki Mioda", 322],
      [462, "Mikan Tsumiki", 273],
      [498, "Hajime Hinata", 196],
      [616, "Gundham Tanaka", 155],
      [852, "Peko Pekoyama", 194],
      [957, "Sonia Nevermind", 167],
      [1189, "Kazuichi Souda", 120],
      [1358, "Akane Owari", 157],
      [1444, "Fuyuhiko Kuzuryu", 105],
      [1792, "Izuru Kamukura", 109],
      [1861, "Hiyoko Saionji", 122],
      [2077, "Mahiru Koizumi", 109],
      [2648, "Monomi", 85],
      [3189, "Nekomaru Nidai", 70],
      [4908, "Cham-P", 73],
      [5706, "Byakuya Togami (DR2)", 69],
      [6860, "Maga-Z", 60],
      [7051, "Jum-P", 59],
      [7058, "San-D", 58],
      [4001, "Chisa Yukizome", 68],
      [4735, "Seiko Kimura", 56],
      [6642, "Ryouta Mitarai", 51],
      [1809, "Komaru Naegi", 117],
      [4288, "Monaca", 69],
      [4493, "Kotoko Utsugi", 58],
      [6739, "Nagisa Shingetsu", 44],
      [260, "Kokichi Ouma", 165],
      [468, "Shuichi Saihara", 134],
      [635, "Miu Iruma", 140],
      [650, "Kaede Akamatsu", 136],
      [864, "Maki Harukawa", 123],
      [989, "Rantaro Amami", 103],
      [1210, "K1-B0", 86],
      [1459, "Kaito Momota", 82],
      [1694, "Kirumi Tojo", 93],
      [1824, "Himiko Yumeno", 80],
      [2014, "Korekiyo Shinguji", 82],
      [2093, "Gonta Gokuhara", 73],
      [2185, "Angie Yonaga", 77],
      [2486, "Tenko Chabashira", 73],
      [2518, "Tsumugi Shirogane", 76],
      [4480, "Ryoma Hoshi", 49],
      [140, "Kyoko Kirigiri", 492],
      [162, "Junko Enoshima", 479],
      [308, "Celestia Ludenberg", 345],
      [592, "Makoto Naegi", 181],
      [703, "Monokuma", 164],
      [728, "Chihiro Fujisaki", 159],
      [737, "Byakuya Togami", 161],
      [821, "Aoi Asahina", 194],
      [841, "Touko Fukawa", 196],
      [1221, "Genocider Syo", 156],
      [1297, "Mukuro Ikusaba", 142],
      [1349, "Sayaka Maizono", 151],
      [1710, "Kiyotaka Ishimaru", 104],
      [1957, "Mondo Oowada", 92],
      [2038, "Sakura Oogami", 99],
      [2642, "Leon Kuwata", 82],
      [3769, "Alter Ego", 77],
      [3863, "Yasuhiro Hagakure", 66]

    ]

  },


  {
    series: "DEATH NOTE",

    characters: [

      [28, "L", 648],
      [77, "Light Yagami", 463],
      [98, "Misa Amane", 598],
      [451, "Ryuk", 220],
      [946, "Near", 151],
      [1072, "Mello", 142],
      [2542, "Naomi Misora", 100],
      [3106, "Teru Mikami", 86],
      [3312, "Rem (DN)", 84],
      [3767, "Touta Matsuda", 66],
      [4091, "Matt (DN)", 70]

    ]

  },


  {
    series: "TOKYO GHOUL",

    characters: [

      [43, "Ken Kaneki", 626],
      [138, "Touka Kirishima", 510],
      [392, "Juuzou Suzuya", 227],
      [459, "Eto", 253],
      [587, "Rize Kamishiro", 248],
      [1164, "Uta (TG)", 117],
      [1478, "Hideyoshi Nagachika", 111],
      [1614, "Ayato Kirishima", 105],
      [1929, "Kishou Arima", 94],
      [2647, "Hinami Fueguchi", 96],
      [2760, "Shuu Tsukiyama", 78],
      [3316, "Akira Mado", 86],
      [3888, "Nishiki Nishio", 65],
      [4374, "Renji Yomo", 59],
      [4804, "Koutarou Amon", 55],
      [5279, "Seidou Takizawa", 61],
      [5417, "Nimura Furuta", 60],
      [6633, "Itori", 55],
      [7567, "Kurona Yasuhisa", 55]

    ]

  },


  {
    series: "SWORD ART ONLINE",

    characters: [

      [7, "Asuna", 955],
      [82, "Sinon", 629],
      [88, "Kirito", 339],
      [353, "Alice Synthesis Thirty", 333],
      [630, "Leafa", 227],
      [716, "Yuuki", 212],
      [941, "Eugeo", 110],
      [1431, "Yui (SAO)", 138],
      [1489, "Silica", 133],
      [1497, "Alice Zuberg", 143],
      [1649, "Quinella", 132],
      [1763, "Lisbeth", 120],
      [2401, "Yuna (SAO)", 108],
      [3540, "Klein", 55],
      [4604, "Sachi (SAO)", 70],
      [6764, "Argo", 53],
      [7245, "Fanatio Synthesis Two", 52],
      [7269, "Tiese Shtolienen", 53],
      [7783, "Bercouli", 38]

    ]

  },


  {
    series: "KONO SUBARASHII SEKAI NI SHUKUFUKO WO!",

    characters: [

      [5, "Megumin", 1001],
      [22, "Aqua", 851],
      [65, "Darkness", 662],
      [293, "Wiz", 316],
      [423, "Yunyun", 268],
      [599, "Kazuma Satou", 138],
      [1905, "Chomusuke", 113],
      [2049, "Eris (KS)", 109],
      [2754, "Chris", 86],
      [3017, "Komekko", 86],
      [3552, "Luna (KS)", 81],
      [3832, "Receptionist Succubus", 80],
      [5128, "Newbie Succubus", 58],
      [5663, "Iris Stylish-Sword Belzerg", 57],
      [5767, "Sylvia (KS)", 61],
      [6542, "Arue", 60],
      [7895, "Vanir", 38]

    ]

  },


  {
    series: "BUNGOU STRAY DOGS",

    characters: [

      [66, "Osamu Dazai", 549],
      [185, "Chuuya Nakahara", 328],
      [288, "Ranpo Edogawa", 242],
      [542, "Ryuunosuke Akutagawa", 187],
      [582, "Atsushi Nakajima", 179],
      [839, "Fyodor Dostoevsky", 152],
      [881, "Akiko Yosano", 186],
      [1067, "Kyouka Izumi", 151],
      [1092, "Nikolai Gogol", 127],
      [1145, "Doppo Kunikida", 120],
      [1262, "Edgar Allan Poe", 124],
      [1643, "Sigma (BSD)", 102],
      [1665, "Sakunosuke Oda", 103],
      [2390, "Gin (BSD)", 83],
      [2726, "Kenji Miyazawa", 77],
      [2839, "Yukichi Fukuzawa", 77],
      [3014, "Tetchou Suehiro", 78],
      [3136, "Kyuusaku Yumeno", 94],
      [3475, "Lucy Maud Montgomery", 72],
      [3638, "Junichirou Tanizaki", 70],
      [4386, "Saigiku Jouno", 64],
      [4486, "Michizou Tachihara", 66],
      [4674, "Ango Sakaguchi", 65],
      [5005, "Kouyou Ozaki", 59],
      [5137, "Ougai Mori", 61],
      [5732, "Karl", 50],
      [6110, "Naomi Tanizaki", 57],
      [6192, "Bram Stoker", 52],
      [6580, "Ichiyou Higuchi", 53]

    ]

  },


  {
    series: "FAIRY TAIL",

    characters: [

      [62, "Erza Scarlet", 687],
      [122, "Lucy Heartfilia", 550],
      [230, "Natsu Dragneel", 264],
      [319, "Juvia Lockser", 327],
      [490, "Gray Fullbuster", 178],
      [605, "Mirajane Strauss", 223],
      [937, "Wendy Marvell", 170],
      [1170, "Happy", 112],
      [1174, "Mavis Vermillion", 150],
      [1178, "Levy McGarden", 152],
      [1282, "Zeref", 111],
      [1416, "Gajeel Redfox", 101],
      [1461, "Jellal Fernandes", 108],
      [1843, "Aquarius", 120],
      [2050, "Cana Alberona", 104],
      [2175, "Aries", 114],
      [2387, "Virgo", 95],
      [2411, "Laxus Dreyar", 73],
      [2837, "Brandish μ", 84],
      [2971, "Loke", 56],
      [2978, "Ultear Milkovich", 82],
      [3153, "Erza Knightwalker", 101],
      [3258, "Sting Eucliffe", 62],
      [3346, "Irene Belserion", 79],
      [3486, "Lisanna Strauss", 73],
      [3654, "Kagura Mikazuchi", 72],
      [3850, "Frosch", 73],
      [4055, "Rogue Cheney", 52],
      [4337, "Yukino Agria", 71],
      [4570, "Acnologia", 59],
      [4784, "Carla", 62],
      [5001, "Angel (FT)", 70],
      [5262, "Gildarts Clive", 52],
      [5331, "Flare Corona", 61],
      [5389, "Millianna", 62],
      [5964, "Mystogan", 46],
      [6479, "Igneel", 46],
      [6517, "Evergreen", 56],
      [6551, "Freed Justine", 47],
      [6590, "Minerva Orland", 59],
      [6802, "Zera", 49],
      [6840, "Meredy", 50],
      [6873, "Seilah", 55],
      [7320, "Sherria Blendy", 49],
      [7479, "Gemini", 48],
      [7589, "Panther Lily", 39],
      [7760, "Ur", 45]

    ]

  },


  {
    series: "HOLOLIVE",

    characters: [

      [89, "Gawr Gura", 625],
      [240, "Mori Calliope", 383],
      [267, "Inugami Korone", 358],
      [297, "Amelia Watson", 333],
      [386, "Houshou Marine", 309],
      [393, "Hoshimachi Suisei", 307],
      [409, "Usada Pekora", 271],
      [454, "Shirakami Fubuki", 263],
      [502, "Ninomae Ina'nis", 250],
      [516, "Nekomata Okayu", 248],
      [621, "Kiryu Coco", 226],
      [719, "Uruha Rushia", 196],
      [795, "Ouro Kronii", 199],
      [809, "Takanashi Kiara", 197],
      [819, "Minato Aqua", 191],
      [833, "Nakiri Ayame", 183],
      [916, "Nanashi Mumei", 180],
      [1032, "Sakura Miko", 153],
      [1047, "Ceres Fauna", 173],
      [1087, "Shishiro Botan", 162],
      [1088, "Tokoyami Towa", 164],
      [1096, "Oozora Subaru", 149],
      [1192, "Tsunomaki Watame", 149],
      [1194, "Ookami Mio", 150],
      [1199, "Shirogane Noel", 150],
      [1224, "Hakos Baelz", 154],
      [1255, "Akai Haato", 149],
      [1491, "Amane Kanata", 126],
      [1568, "Moona Hoshinova", 121],
      [1577, "Omaru Polka", 126],
      [1602, "Kureiji Ollie", 131],
      [1788, "Sakamata Chloe", 119],
      [1812, "Yukihana Lamy", 119],
      [1842, "Mococo Abyssgard", 114],
      [1867, "Momosuzu Nene", 112],
      [1883, "Fuwawa Abyssgard", 116],
      [1914, "Nerissa Ravencroft", 117],
      [1932, "Natsuiro Matsuri", 108],
      [1975, "IRyS", 112],
      [1988, "Tokino Sora", 109],
      [2055, "Shiori Novella", 115],
      [2062, "Kobo Kanaeru", 106],
      [2202, "Yuzuki Choco", 106],
      [2248, "Ayunda Risu", 102],
      [2262, "Murasaki Shion", 103],
      [2426, "Koseki Bijou", 99],
      [2495, "Pavolia Reine", 97],
      [2502, "Gigi Murin", 93],
      [2554, "Shiranui Flare", 97],
      [2587, "La+ Darknesss", 93],
      [2605, "Vestia Zeta", 83],
      [2684, "Roboco", 89],
      [2747, "Himemori Luna", 89],
      [2771, "Yozora Mel", 87],
      [2802, "Airani Iofifteen", 94],
      [2953, "AZKi", 85],
      [2956, "Raora Panthera", 88],
      [2966, "Tsukumo Sana", 83],
      [2975, "Mano Aloe", 86],
      [3075, "Aki Rosenthal", 89],
      [3262, "Anya Melfissa", 78],
      [3391, "Hakui Koyori", 80],
      [3574, "Cecilia Immergreen", 80],
      [3632, "Pekomama", 82],
      [3635, "Takane Lui", 75],
      [3689, "Kaela Kovalskia", 75],
      [3709, "Elizabeth Rose Bloodflame", 77],
      [3837, "Kazama Iroha", 72],
      [5776, "Coco Kaine", 63],
      [6703, "Todoroki Hajime", 54],
      [7082, "Civia", 53],
      [7121, "Artia", 52],
      [7135, "Juufuutei Raden", 54],
      [7176, "Yogiri", 52],
      [7250, "Kikirara Vivi", 58],
      [7506, "Doris", 50],
      [7828, "Ichijou Ririka", 54]

    ]

  },


  {
    series: "BLACK CLOVER",

    characters: [

      [103, "Asta", 337],
      [220, "Noelle Silva", 393],
      [255, "Nero", 333],
      [348, "Yuno", 180],
      [379, "Yami Sukehiro", 188],
      [827, "Mimosa Vermillion", 193],
      [865, "Mereoleona Vermillion", 187],
      [1169, "Vanessa Enoteca", 164],
      [1518, "Luck Voltia", 108],
      [1813, "Charmy Pappitson", 118],
      [2269, "Charlotte Roselei", 110],
      [2392, "Zora Ideale", 80],
      [2403, "Liebe", 89],
      [2463, "Julius Novachrono", 81],
      [2887, "Nacht", 68],
      [3099, "Grey", 86],
      [3460, "Sister Lily", 90],
      [3469, "Finral Roulacase", 68],
      [3576, "Magna Swing", 69],
      [3911, "Vanica Zogratis", 77],
      [3945, "Fuegoleon Vermillion", 63],
      [4121, "Dorothy Unsworth", 73],
      [5165, "Nozel Silva", 54],
      [5824, "Leopold Vermillion", 54],
      [6178, "William Vangeance", 55],
      [6699, "Fana", 54],
      [7074, "Licht", 49],
      [7409, "Sol Marron", 55],
      [7676, "Bell", 55],
      [7705, "Zenon Zogratis", 52]

    ]

  },


  {
    series: "UMAMUSUME",

    characters: [

      [465, "Agnes Tachyon", 289],
      [563, "Gold Ship", 241],
      [574, "Oguri Cap", 233],
      [1071, "Rice Shower", 164],
      [1158, "Haru Urara", 164],
      [1242, "Manhattan Cafe", 155],
      [1365, "Tokai Teio", 153],
      [1533, "Special Week", 142],
      [1753, "Mejiro McQueen", 123],
      [1779, "Matikanetannhauser", 126],
      [1782, "T.M. Opera O", 127],
      [1854, "Meisho Doto", 128],
      [1885, "Silence Suzuka", 120],
      [1897, "Daiwa Scarlet", 121],
      [2069, "Kitasan Black", 115],
      [2085, "Still in Love", 112],
      [2664, "Tamamo Cross", 97],
      [2725, "Symboli Rudolf", 98],
      [2739, "Super Creek", 99],
      [2897, "Vodka", 93],
      [3044, "Orfevre", 85],
      [3070, "Stay Gold", 87],
      [3112, "Maruzensky", 89],
      [3127, "Daitaku Helios", 91],
      [3227, "El Condor Pasa", 88],
      [3463, "Gentildonna", 85],
      [3523, "Agnes Digital", 85],
      [3822, "Nice Nature", 79],
      [3825, "Satono Diamond", 82],
      [3870, "Mihono Bourbon", 82],
      [3990, "Taiki Shuttle", 79],
      [4072, "Jungle Pocket", 79],
      [4171, "Matikanefukukitaru", 75],
      [4208, "Twin Turbo", 75],
      [4283, "Mayano Top Gun", 76],
      [4317, "Fenomeno", 74],
      [4360, "Cheval Grand", 75],
      [4364, "Curren Chan", 74],
      [4395, "Seiun Sky", 75],
      [4489, "Almond Eye", 65],
      [4515, "Dream Journey", 74],
      [4936, "Biwa Hayahide", 71],
      [5244, "Narita Brian", 68],
      [5374, "Obey Your Master", 66],
      [5383, "Sakura Bakushin O", 70],
      [5393, "Vivlos", 68],
      [5734, "Hishi Amazon", 63],
      [5755, "Gold City", 65],
      [5967, "Fuji Kiseki", 64],
      [5989, "Aston Machan", 66],
      [6013, "Admire Vega", 67],
      [6048, "Air Groove", 66],
      [6152, "Nakayama Festa", 65],
      [6364, "Grass Wonder", 64],
      [6450, "Sakura Chiyono O", 65],
      [6561, "King Halo", 63],
      [6737, "Sirius Symboli", 63],
      [7477, "Eishin Flash", 61],
      [7681, "Duramente", 59]

    ]

  },


  {
    series: "ONE PUNCH MAN",

    characters: [

      [100, "Saitama", 352],
      [120, "Tatsumaki", 545],
      [134, "Fubuki", 509],
      [294, "Genos", 230],
      [546, "Garou", 174],
      [1644, "Speed-o'-Sound Sonic", 109],
      [1982, "Metal Bat", 89],
      [2313, "Mumen Rider", 73],
      [3418, "King", 69],
      [3708, "Do-S", 79],
      [4236, "Bang", 64],
      [4365, "Captain Mizuki", 65],
      [4372, "Boros", 64],
      [4830, "Zombieman", 53],
      [5029, "Psykos", 67],
      [5145, "Mosquito Girl", 68],
      [7352, "Watchdog Man", 49]

    ]

  },


  {
    series: "FULLMETAL ALCHEMIST",

    characters: [

      [164, "Edward Elric", 367],
      [286, "Roy Mustang", 239],
      [458, "Winry Rockbell", 268],
      [466, "Alphonse Elric", 200],
      [636, "Riza Hawkeye", 222],
      [1159, "Lust", 151],
      [1207, "Envy", 172],
      [1384, "Greed", 86],
      [1551, "Olivier Mira Armstrong", 122],
      [1743, "Ling Yao", 87],
      [1948, "Maes Hughes", 89],
      [2745, "Lan Fan", 86],
      [2814, "Izumi Curtis", 80],
      [2902, "Scar (FMA)", 72],
      [2906, "Alex Louis Armstrong", 73],
      [3923, "King Bradley", 61],
      [4221, "Van Hohenheim", 62],
      [4388, "Truth", 77],
      [5639, "May Chang", 59],
      [6776, "Tucker's Chimera", 66],
      [6976, "Selim Bradley", 37],
      [7694, "Jean Havoc", 44]

    ]

  },


  {
    series: "FRIEREN",

    characters: [

      [38, "Frieren", 808],
      [168, "Fern", 467],
      [709, "Stark", 155],
      [790, "Himmel", 172],
      [1208, "Übel", 159],
      [2819, "Flamme", 93],
      [3323, "Serie", 91],
      [4325, "Aura (SnF)", 79],
      [4348, "Heiter", 61],
      [4779, "Eisen", 57],
      [5992, "Sense", 63],
      [6589, "Sein", 48],
      [6601, "Methode", 58],
      [7996, "Lawine", 53]

    ]

  },


  {
    series: "VOCALOID",

    characters: [

      [3, "Hatsune Miku", 1031],
      [233, "Kagamine Rin", 406],
      [273, "Kagamine Len", 295],
      [283, "Megurine Luka", 357],
      [337, "GUMI", 312],
      [352, "KAITO", 246],
      [786, "MEIKO", 192],
      [1055, "IA", 155],
      [1104, "flower", 117],
      [1331, "Kamui Gakupo", 107],
      [1806, "Fukase", 83],
      [2749, "Oliver", 59],
      [3748, "Yuzuki Yukari", 71],
      [4163, "Otomachi Una", 59],
      [4509, "SeeU", 54],
      [4766, "MEIKA Mikoto", 70],
      [4789, "MEIKA Hime", 68],
      [4825, "Kaai Yuki", 54],
      [5209, "MAYU", 53],
      [5594, "VY2", 55],
      [6937, "Utatane Piko", 43],
      [7302, "Lily (V)", 56],
      [7412, "Nekomura Iroha", 47],
      [7474, "MAIKA", 48]

    ]

  }

];


/*
==================================================
END OF DATA.JS — PART 1

DO NOT PUT ANYTHING ELSE HERE YOURSELF.

PART 2 GETS PASTED DIRECTLY UNDER THIS LINE.
==================================================
*/
