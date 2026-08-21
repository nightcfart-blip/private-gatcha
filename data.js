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

/*
==================================================
PRIVATE GACHA
DATA.JS — PART 2 OF 2
==================================================
*/


const characterSeriesPart2 = [

  {
    series: "ZENLESS ZONE ZERO",

    characters: [

      [513, "Ellen Joe", 180],
      [544, "Jane Doe", 178],
      [640, "Hoshimi Miyabi", 170],
      [1195, "Burnice", 123],
      [1413, "Von Lycaon", 104],
      [1552, "Nicole Demara", 111],
      [1618, "Vivian", 105],
      [1707, "Evelyn", 101],
      [1718, "Zhu Yuan", 104],
      [1956, "Belle (ZZZ)", 100],
      [1968, "Anby Demara", 93],
      [2024, "Astra Yao", 97],
      [2051, "Billy Kid", 89],
      [2184, "Yixuan", 89],
      [2405, "Caesar (ZZZ)", 86],
      [2479, "Lighter", 77],
      [2617, "Ye Shunguang", 83],
      [2968, "Grace Howard", 79],
      [3253, "Rina", 76],
      [3266, "Asaba Harumasa", 68],
      [3309, "Komano Manato", 69],
      [3462, "Corin", 71],
      [3687, "Tsukishiro Yanagi", 73],
      [3697, "Wise", 69],
      [3714, "Hugo", 64],
      [3755, "Ukinami Yuzuha", 69],
      [3815, "Trigger", 69],
      [3925, "Remielle", 72],
      [4140, "Sunna", 63],
      [4217, "Nekomata", 57],
      [4218, "Yidhari", 64],
      [4253, "Alice Thymefield", 66],
      [4355, "Aria", 64],
      [4506, "Seth Lowell", 58],
      [4756, "Ju Fufu", 63],
      [4911, "Qingyi", 60],
      [4915, "Soukaku", 57],
      [5134, "Pulchra", 59],
      [5453, "Nangong Yu", 61],
      [5489, "Lucy (ZZZ)", 60],
      [5838, "Koleda Belobog", 55],
      [5865, "Soldier 11", 57],
      [5951, "Orphie", 59],
      [6850, "Ben Bigger", 47],
      [7153, "Cissia", 49],
      [7361, "Piper (ZZZ)", 49],
      [7656, "Dialyn", 49]

    ]

  },


  {
    series: "BLUE LOCK",

    characters: [

      [303, "Yoichi Isagi", 239],
      [437, "Meguru Bachira", 191],
      [439, "Seishiro Nagi", 203],
      [562, "Rin Itoshi", 171],
      [665, "Michael Kaiser", 163],
      [707, "Sae Itoshi", 156],
      [1000, "Hyoma Chigiri", 136],
      [1336, "Reo Mikage", 121],
      [1367, "Ryusei Shidou", 121],
      [1909, "Shoei Baro", 94],
      [1996, "Rensuke Kunigami", 93],
      [2250, "Oliver Aiku", 92],
      [2936, "Anri Teieri", 91],
      [3169, "Alexis Ness", 81],
      [3471, "Yo Hiori", 77],
      [3641, "Ranze Kurona", 74],
      [3690, "Jinpachi Ego", 72],
      [4176, "Gin Gagamaru", 66],
      [4490, "Kenyu Yukimiya", 65],
      [4771, "Tabito Karasu", 68],
      [5582, "Don Lorenzo", 57],
      [5880, "Ikki Niko", 62],
      [5988, "Eita Otoya", 59],
      [6567, "Charles Chevalier", 58],
      [7833, "Jyubei Aryu", 51]

    ]

  },


  {
    series: "OVERLORD",

    characters: [

      [20, "Albedo", 894],
      [397, "Shalltear Bloodfallen", 281],
      [556, "Ainz Ooal Gown", 165],
      [1281, "Narberal Gamma", 141],
      [1878, "Lupusregina Beta", 116],
      [2255, "Evileye", 104],
      [2580, "Entoma Vasilissa Zeta", 93],
      [3063, "CZ2128 Delta", 80],
      [3080, "Yuri Alpha", 85],
      [3105, "Aura Bella Fiora", 82],
      [3267, "Sebas Tian", 52],
      [3273, "Demiurge", 55],
      [3515, "Solution Epsilon", 79],
      [3947, "Mare Bello Fiore", 54],
      [4770, "Cocytus", 45],
      [5380, "Zesshi Zetsumei", 62],
      [5613, "Pandora's Actor", 45],
      [5937, "Clementine (OL)", 61],
      [6904, "Renner Theiere Chardelon Ryle Vaiself", 52]

    ]

  },


  {
    series: "PERSONA 5",

    characters: [

      [69, "Joker", 599],
      [191, "Futaba Sakura", 447],
      [309, "Makoto Niijima", 354],
      [341, "Goro Akechi", 267],
      [347, "Ann Takamaki", 341],
      [652, "Ryuji Sakamoto", 186],
      [781, "Haru Okumura", 216],
      [816, "Yusuke Kitagawa", 158],
      [874, "Tae Takemi", 194],
      [974, "Morgana", 134],
      [1445, "Sadayo Kawakami", 140],
      [1496, "Sae Niijima", 134],
      [1898, "Hifumi Togo", 123],
      [2939, "Arsène", 80],
      [3751, "Lavenza", 77],
      [3942, "Justine", 75],
      [4109, "Caroline", 72],
      [4494, "Sojiro Sakura", 56],
      [6360, "Munehisa Iwai", 55],
      [6755, "Chihaya Mifune", 59],
      [7838, "Yuuki Mishima", 49]

    ]

  },


  {
    series: "DARLING IN THE FRANXX",

    characters: [

      [1, "Zero Two", 1037],
      [160, "Ichigo", 384],
      [953, "Hiro", 127],
      [1778, "Kokoro", 123],
      [1827, "Princess of Klaxosaurs", 128],
      [2901, "Miku (DitF)", 95],
      [5002, "Ikuno", 69],
      [5638, "Goro (DitF)", 43],
      [7637, "Zorome", 41]

    ]

  },


  {
    series: "LEAGUE OF LEGENDS",

    characters: [

      [112, "Jinx", 586],
      [266, "Ahri", 253],
      [344, "Vi", 328],
      [521, "Akali", 154],
      [593, "Caitlyn", 256],
      [858, "Lux", 111],
      [861, "Ekko", 156],
      [1003, "Viktor", 141],
      [1020, "Evelynn", 117],
      [1024, "Sett", 95],
      [1127, "Kai'Sa", 106],
      [1264, "Yasuo", 68],
      [1307, "Miss Fortune", 106],
      [1426, "Kayn", 80],
      [1482, "Xayah", 96],
      [1484, "Neeko", 94],
      [1506, "Seraphine", 98],
      [1564, "Katarina", 98],
      [1591, "Sona", 96],
      [1639, "Yone", 74],
      [1734, "Jhin", 70],
      [1804, "Irelia", 88],
      [1891, "Ezreal", 70],
      [1919, "Mel", 116],
      [2073, "Ashe", 81],
      [2151, "Aphelios", 71],
      [2242, "Jayce", 86],
      [2253, "Kindred", 91],
      [2327, "Zoe", 65],
      [2408, "Teemo", 57],
      [2475, "Gwen (LoL)", 80],
      [2529, "Soraka", 70],
      [2531, "Riven", 75],
      [2600, "Yuumi", 68],
      [2618, "Rakan", 57],
      [2776, "Viego", 68],
      [2789, "Morgana (LoL)", 77],
      [2793, "Zed", 53],
      [3109, "Lillia", 70],
      [3186, "Samira", 64],
      [3242, "Warwick", 63],
      [3337, "Qiyana", 61],
      [3359, "Thresh", 58],
      [3443, "Aatrox", 64],
      [3485, "Mordekaiser", 53],
      [3526, "Lulu", 59],
      [3620, "Briar", 69],
      [3775, "Poppy", 60],
      [3851, "Vex", 62],
      [3928, "Pyke", 53],
      [4114, "Syndra", 58],
      [4168, "Senna", 60],
      [4254, "Vayne", 58],
      [4280, "Janna", 55],
      [4380, "Tristana", 56],
      [4762, "LeBlanc", 56],
      [4764, "Annie", 49],
      [4865, "Gragas", 48],
      [4968, "Veigar", 49],
      [5034, "Leona (LoL)", 56],
      [5090, "Nami (LoL)", 53],
      [5310, "Heimerdinger", 64],
      [5408, "Zeri", 55],
      [5445, "Shaco", 46],
      [5472, "Hwei", 52],
      [5483, "Karma", 51],
      [5488, "Darius", 44],
      [5677, "Fiora", 54],
      [5854, "Kayle", 53],
      [5866, "Aurelion Sol", 49],
      [5953, "Garen", 40],
      [6112, "Poro", 70],
      [6261, "Draven", 41],
      [6418, "Pantheon", 45],
      [6424, "Nidalee", 50],
      [6459, "Ambessa", 62],
      [6463, "Diana (LoL)", 52],
      [6544, "Volibear", 46],
      [6558, "Fiddlesticks", 55],
      [6584, "Shyvana", 49],
      [6657, "Sylas", 45],
      [6752, "Braum", 45],
      [6762, "Zyra", 48],
      [6770, "Nasus", 42],
      [7007, "Gnar", 40],
      [7158, "Camille", 45],
      [7237, "Swain", 45],
      [7561, "Amumu", 42],
      [7617, "Blitzcrank", 54],
      [7640, "Shen", 44],
      [7673, "Rengar", 41],
      [7840, "Orianna", 48]

    ]

  },


  {
    series: "KAKEGURUI",

    characters: [

      [46, "Yumeko Jabami", 754],
      [271, "Mary Saotome", 363],
      [618, "Kirari Momobami", 236],
      [848, "Ririka Momobami", 201],
      [979, "Midari Ikishima", 178],
      [1031, "Runa Yomozuki", 176],
      [1833, "Yumemi Yumemite", 124],
      [2981, "Itsuki Sumeragi", 91],
      [3395, "Rei Batsubami", 72],
      [4527, "Sayaka Igarashi", 71],
      [4538, "Ryota Suzui", 58],
      [6881, "Kaede Manyuda", 45],
      [7289, "Erimi Mushibami", 55]

    ]

  },


  {
    series: "AKAME GA KILL",

    characters: [

      [30, "Akame", 814],
      [34, "Esdeath", 796],
      [295, "Mine", 330],
      [479, "Leone", 268],
      [690, "Chelsea", 222],
      [1068, "Sheele", 174],
      [1205, "Kurome", 154],
      [1327, "Tatsumi", 109],
      [2047, "Lubbock", 77],
      [2095, "Najenda", 110],
      [2830, "Bulat", 66],
      [6297, "Susanoo", 44],
      [7729, "Wave", 43]

    ]

  },


  {
    series: "SOUL EATER",

    characters: [

      [258, "Crona", 419],
      [274, "Maka Albarn", 356],
      [306, "Death the Kid", 247],
      [378, "Soul Eater Evans", 223],
      [761, "Blair", 215],
      [961, "Franken Stein", 140],
      [1076, "Black☆Star", 133],
      [1610, "Tsubaki Nakatsukasa", 133],
      [2266, "Medusa Gorgon", 98],
      [2272, "Patty Thompson", 104],
      [2484, "Liz Thompson", 104],
      [2697, "Shinigami", 77],
      [3164, "Excalibur", 70],
      [3572, "Spirit Albarn", 70],
      [4724, "Arachne Gorgon", 67],
      [5023, "Justin Law", 54],
      [5202, "Marie Mjolnir", 64],
      [5624, "Mifune", 52],
      [5935, "Eruka Frog", 54]

    ]

  },


  {
    series: "NO GAME NO LIFE",

    characters: [

      [52, "Shiro", 681],
      [229, "Jibril", 362],
      [619, "Schwi Dola", 238],
      [1093, "Stephanie Dola", 163],
      [1122, "Sora (NGNL)", 114],
      [1587, "Izuna Hatsuse", 131],
      [1832, "Tet", 126],
      [2273, "Miko", 107],
      [4315, "Riku Dola", 47],
      [4641, "Schira Ha", 76],
      [4741, "Couronne Dola", 70],
      [5185, "Chlammy Zell", 65],
      [5404, "Azriel", 63],
      [5531, "Feel Nilvalen", 61],
      [6081, "Horou", 62],
      [6606, "Shinku Nilvalen", 59]

    ]

  },


  {
    series: "MONOGATARI",

    characters: [

      [175, "Shinobu Oshino", 437],
      [272, "Hitagi Senjougahara", 352],
      [567, "Tsubasa Hanekawa", 229],
      [715, "Black Hanekawa", 243],
      [895, "Nadeko Sengoku", 185],
      [1066, "Mayoi Hachikuji", 144],
      [1100, "Koyomi Araragi", 99],
      [1383, "Suruga Kanbaru", 130],
      [1508, "Karen Araragi", 123],
      [1521, "Yotsugi Ononoki", 123],
      [1642, "Ougi Oshino", 130],
      [1838, "Tsukihi Araragi", 114],
      [3330, "Meme Oshino", 46],
      [3600, "Deishuu Kaiki", 38],
      [3954, "Sodachi Oikura", 65],
      [6304, "Izuko Gaen", 48]

    ]

  },


  {
    series: "SOLO LEVELING",

    characters: [

      [108, "Sung Jin-Woo", 454],
      [339, "Cha Hae-In", 334],
      [1148, "Igris", 118],
      [1863, "Beru", 88],
      [3139, "Esil Radir", 83],
      [3912, "Sung Jin-Ah", 76],
      [6239, "Statue of God", 64],
      [6923, "Lee Ju-Hee", 60],
      [7942, "Choi Jong-In", 49]

    ]

  },


  {
    series: "BERSERK",

    characters: [

      [59, "Guts", 582],
      [359, "Casca", 315],
      [368, "Griffith", 240],
      [3295, "Schnoz", 92],
      [3494, "Skull Knight", 70],
      [4211, "Puck (Berserk)", 62],
      [4846, "Schierke", 60],
      [5207, "Judeau", 51],
      [5406, "Farnese de Vandimion", 57],
      [6449, "Serpico", 48]

    ]

  },


  {
    series: "JIBAKU SHOUNEN HANAKO-KUN",

    characters: [

      [152, "Hanako-kun", 352],
      [276, "Nene Yashiro", 343],
      [672, "Kou Minamoto", 162],
      [729, "Sousuke Mitsuba", 148],
      [1089, "Tsukasa Yugi", 144],
      [1218, "Aoi Akane", 151],
      [1499, "Akane Aoi", 116],
      [1504, "Tsuchigomori", 104],
      [1769, "Teru Minamoto", 109],
      [2114, "Sakura Nanamine", 112],
      [3156, "Yako", 76],
      [4190, "Shijima-san of the Art Room", 70],
      [4298, "Natsuhiko Hyuuga", 67],
      [5346, "Mei Shijima", 59],
      [7737, "Sumire", 54]

    ]

  },


  {
    series: "BLACK BUTLER",

    characters: [

      [241, "Sebastian Michaelis", 284],
      [364, "Ciel Phantomhive", 225],
      [586, "Grell Sutcliff", 226],
      [682, "Undertaker", 155],
      [2124, "Alois Trancy", 98],
      [2293, "Mey-Rin", 96],
      [3023, "Snake (BB)", 76],
      [3622, "Finnian", 66],
      [3732, "Elizabeth Midford", 66],
      [4455, "Ran-Mao", 64],
      [4484, "Joker (BB)", 62],
      [4663, "Claude Faustus", 60],
      [5424, "Gregory Violet", 57],
      [5645, "Soma Asman Kadar", 54],
      [5722, "Vincent Phantomhive", 61],
      [5774, "Agni (BB)", 61],
      [5781, "Angelina Dalles", 61],
      [5870, "Ronald Knox", 52],
      [6388, "Doll", 49],
      [6959, "Pluto (BB)", 42],
      [7172, "Baldroy", 48],
      [7447, "Lau", 48]

    ]

  },


  {
    series: "DR. STONE",

    characters: [

      [252, "Senkuu Ishigami", 263],
      [738, "Kohaku", 203],
      [1059, "Gen Asagiri", 120],
      [1920, "Chrome", 84],
      [1921, "Suika", 115],
      [2361, "Ryusui Nanami", 76],
      [2462, "Ruri", 102],
      [2545, "Tsukasa Shishio", 80],
      [2924, "Yuzuriha Ogawa", 92],
      [3445, "Ukyo Saionji", 61],
      [4725, "Taiju Ooki", 57],
      [4973, "Hyouga", 60],
      [5735, "Stanley Snyder", 51],
      [5887, "Homura Momiji", 64],
      [5902, "Kinrou", 47],
      [6298, "Dr. Xeno", 51],
      [6593, "Byakuya Ishigami", 53],
      [6760, "Francois", 61],
      [7383, "Kaseki", 43]

    ]

  },


  {
    series: "MOB PSYCHO 100",

    characters: [

      [176, "Shigeo Kageyama", 330],
      [238, "Arataka Reigen", 334],
      [1989, "Ritsu Kageyama", 101],
      [2006, "Dimple", 86],
      [2092, "Teruki Hanazawa", 89],
      [4529, "Katsuya Serizawa", 52],
      [6410, "Tome Kurata", 53],
      [7054, "Shou Suzuki", 47]

    ]

  },


  {
    series: "NEON GENESIS EVANGELION",

    characters: [

      [67, "Rei Ayanami", 693],
      [107, "Asuka Langley Soryu", 618],
      [198, "Misato Katsuragi", 450],
      [304, "Shinji Ikari", 257],
      [449, "Kaworu Nagisa", 210],
      [1831, "Evangelion Unit-01", 145],
      [3004, "Ritsuko Akagi", 96],
      [3016, "Pen Pen", 67],
      [3053, "Ramiel", 90],
      [3779, "Evangelion Unit-02", 94],
      [4255, "Ryouji Kaji", 65],
      [6254, "Gendou Ikari", 56],
      [6951, "Evangelion Unit-00", 63],
      [7349, "Lilith (NGE)", 65]

    ]

  },


  {
    series: "SPY X FAMILY",

    characters: [

      [63, "Yor Forger", 712],
      [153, "Anya Forger", 469],
      [270, "Loid Forger", 280],
      [1954, "Bond", 101],
      [2187, "Fiona Frost", 120],
      [2649, "Yuri Briar", 88],
      [3719, "Damian Desmond", 72],
      [4691, "Sylvia Sherwood", 72],
      [4774, "Becky Blackbell", 67],
      [7435, "Franky Franklin", 50]

    ]

  },


  {
    series: "GACHIAKUTA",

    characters: [

      [740, "Rudo", 142],
      [908, "Riyo", 171],
      [978, "Enjin", 135],
      [1404, "Zanka Nijiku", 111],
      [1434, "Amo Empool", 136],
      [1942, "Jabber Wonger", 98],
      [2610, "Tamsy", 84],
      [3097, "Semiu", 78],
      [3716, "Guita Hebby Fantasia", 77],
      [4997, "Follo", 59],
      [5804, "Zodyl Typhon", 59],
      [6198, "August Stilza", 57],
      [6570, "Eishia Stilza", 59],
      [6635, "Gris Rubion", 52],
      [6909, "Too Lily", 55],
      [7659, "Fu Orostor", 51]

    ]

  },


  {
    series: "DANDADAN",

    characters: [

      [300, "Momo Ayase", 348],
      [627, "Ken Takakura", 168],
      [1315, "Seiko Ayase", 161],
      [1967, "Aira Shiratori", 130],
      [2651, "Jin Enjoji", 87],
      [2733, "Turbo Granny", 97],
      [4450, "Vamola", 71],
      [6677, "Evil Eye", 61]

    ]

  },


  {
    series: "ASSASSINATION CLASSROOM",

    characters: [

      [261, "Karma Akabane", 229],
      [424, "Nagisa Shiota", 199],
      [538, "Koro-sensei", 194],
      [1236, "Irina Jelavić", 153],
      [2180, "Kaede Kayano", 106],
      [3123, "Ritsu", 74],
      [3375, "Tadaomi Karasuma", 64],
      [4111, "Itona Horibe", 54],
      [4296, "Rio Nakamura", 66],
      [6512, "Gakushuu Asano", 51],
      [7032, "Yuuma Isogai", 43]

    ]

  },


  {
    series: "OWARI NO SERAPH",

    characters: [

      [336, "Shinoa Hiiragi", 298],
      [357, "Mikaela Hyakuya", 194],
      [418, "Krul Tepes", 267],
      [823, "Yuichiro Hyakuya", 132],
      [907, "Guren Ichinose", 126],
      [1969, "Shinya Hiiragi", 75],
      [2366, "Ferid Bathory", 74],
      [2811, "Ashuramaru", 69],
      [3476, "Crowley Eusford", 65],
      [3747, "Chess Belle", 75],
      [4062, "Yoichi Saotome", 57],
      [4241, "Mahiru Hiiragi", 70],
      [4504, "Mitsuba Sanguu", 63],
      [6708, "Shihou Kimizuki", 50],
      [7542, "Lacus Welt", 47]

    ]

  },


  {
    series: "CODE GEASS",

    characters: [

      [81, "C.C.", 636],
      [142, "Lelouch Lamperouge", 374],
      [853, "Kallen Stadtfeld", 188],
      [2063, "Suzaku Kururugi", 84],
      [2659, "Euphemia li Britannia", 88],
      [3542, "Shirley Fenette", 73],
      [4088, "Cornelia li Britannia", 70],
      [4742, "Nunnally Lamperouge", 64],
      [5871, "Milly Ashford", 58],
      [7596, "Villetta Nu", 51]

    ]

  },


  {
    series: "A SONG OF ICE AND FIRE",

    characters: [

      [2129, "Daenerys Targaryen", 105],
      [2676, "Jon Snow", 72],
      [4262, "Arya Stark", 61],
      [6396, "Tyrion Lannister", 48],
      [6625, "Sansa Stark", 50],
      [8396, "Jaime Lannister", 42],
      [9480, "Margaery Tyrell", 45],
      [9496, "Robb Stark", 43],
      [9918, "Drogon", 50],
      [10719, "Ned Stark", 38],
      [11476, "Cersei Lannister", 40],
      [11613, "Brienne of Tarth", 34],
      [13974, "Sandor Clegane", 35],
      [17714, "Ygritte", 33],
      [18018, "Khal Drogo", 31],
      [20583, "Ghost (GoT)", 34],
      [22133, "Rhaegal", 38],
      [23916, "Melisandre", 35],
      [24029, "Oberyn Martell", 28],
      [25544, "Catelyn Stark", 31],
      [25910, "Viserion", 35],
      [26030, "Theon Greyjoy", 32],
      [27935, "Bran Stark", 30],
      [30078, "Tywin Lannister", 29],
      [30638, "Varys", 29],
      [31469, "Petyr Baelish", 30],
      [32775, "Olenna Tyrell", 28],
      [33140, "Hodor", 29],
      [33273, "Samwell Tarly", 29],
      [34397, "The Night King", 30],
      [34836, "Robert Baratheon", 30],
      [34891, "Bronn", 30],
      [36892, "Missandei", 29],
      [37399, "Jorah Mormont", 27],
      [39126, "Stannis Baratheon", 29],
      [44443, "Davos Seaworth", 27],
      [44543, "Jaqen H'ghar", 27],
      [45327, "Aegon Targaryen", 30],
      [46842, "Nymeria", 28],
      [48699, "Ramsay Snow", 27],
      [48801, "Rhaegar Targaryen", 29],
      [52120, "Arthur Dayne", 27],
      [53710, "Grey Worm", 27],
      [55270, "Asha Greyjoy", 26],
      [56938, "Viserys Targaryen", 28],
      [59733, "Joffrey Baratheon", 27],
      [59748, "Shireen Baratheon", 26],
      [59757, "Barristan Selmy", 26],
      [60185, "Euron Greyjoy", 26],
      [60753, "Myrcella Baratheon", 26],
      [60767, "Loras Tyrell", 27],
      [61342, "Arianne Martell", 27],
      [61510, "Tormund", 25],
      [64708, "Podrick Payne", 25],
      [65053, "The Mountain", 26],
      [72066, "Benjen Stark", 26],
      [72729, "Osha", 25],
      [73227, "Renly Baratheon", 26],
      [74530, "Daario Naharis", 25],
      [78541, "Tommen Baratheon", 25],
      [79181, "Shae", 26],
      [80394, "Rickon Stark", 25],
      [81809, "Gendry", 26],
      [84395, "Roose Bolton", 25],
      [84605, "Jeor Mormont", 25],
      [87959, "Maester Aemon", 25],
      [93399, "Meera Reed", 24],
      [96095, "Other", 25],
      [96205, "Beric Dondarrion", 25],
      [96633, "Brynden Rivers", 25],
      [96660, "Edmure Tully", 25],
      [96851, "Aerys Targaryen", 25],
      [98881, "Brynden Tully", 25],
      [99714, "Elia Martell", 24],
      [105428, "Val (GoT)", 24],
      [106901, "Syrio Forel", 24],
      [108199, "Nymeria Sand", 24],
      [111648, "The High Sparrow", 24],
      [111702, "Alliser Thorne", 24],
      [113142, "Aeron Greyjoy", 25],
      [113155, "Jojen Reed", 24],
      [113407, "Mance Rayder", 24],
      [113537, "Doran Martell", 24],
      [113564, "Randyll Tarly", 24],
      [113920, "Tyene Sand", 24],
      [114149, "Lysa Arryn", 24],
      [116554, "Dolorous Edd", 24],
      [117389, "Jon Connington", 24],
      [117548, "Walder Frey", 24],
      [119686, "Balon Greyjoy", 24],
      [121288, "Kevan Lannister", 24],
      [122036, "Lancel Lannister", 24],
      [123852, "Strong Belwas", 24],
      [124530, "Victarion Greyjoy", 24],
      [125771, "Aurane Waters", 24],
      [126097, "Grand Maester Pycelle", 24],
      [126305, "Quentyn Martell", 24],
      [126880, "Robert Arryn", 24],
      [127706, "Qyburn", 24],
      [127715, "Areo Hotah", 24],
      [127890, "Coldhands", 24],
      [128717, "Thoros of Myr", 24],
      [131316, "Wyman Manderly", 24],
      [131827, "Patchface", 24],
      [132293, "Vargo Hoat", 24],
      [133320, "Donal Noye", 24],
      [138256, "Jon Arryn", 24],
      [108396, "Rodrik Forrester", 24],
      [113273, "Talia Forrester", 24],
      [115245, "Mira Forrester", 24],
      [115402, "Asher Forrester", 24],
      [119988, "Gared Tuttle", 24],
      [8250, "Rhaenyra Targaryen", 45],
      [15786, "Daemon Targaryen", 37],
      [25516, "Alicent Hightower", 32],
      [29619, "Aemond Targaryen", 32],
      [30446, "Caraxes", 32],
      [35671, "Syrax", 32],
      [39279, "Helaena Targaryen", 27],
      [46376, "Vhagar", 29],
      [48910, "Jacaerys Velaryon", 26],
      [50388, "Meleys", 29],
      [56520, "Rhaenys II Targaryen", 27],
      [59781, "Vermithor", 27],
      [60704, "Aegon II Targaryen", 26],
      [62218, "Rhaena Targaryen", 28],
      [64963, "Cregan Stark", 26],
      [68574, "Lucerys Velaryon", 26],
      [71019, "Baela Targaryen", 26],
      [73633, "Corlys Velaryon", 25],
      [82452, "Viserys I Targaryen", 25],
      [91437, "Otto Hightower", 24],
      [92054, "Aegon III Targaryen", 26],
      [96196, "Criston Cole", 24],
      [116830, "Larys Strong", 24],
      [27213, "Duncan the Tall", 29],
      [59981, "Aegon V Targaryen", 26],
      [67067, "Baelor Targaryen", 25],
      [72221, "Lyonel Baratheon", 25],
      [76876, "Aerion Targaryen", 25],
      [105259, "Raymun Fossoway", 24],
      [107252, "Maekar I Targaryen", 24],
      [115023, "Rohanne Webber", 24],
      [35730, "Rhaenys Targaryen", 31],
      [37781, "Visenya Targaryen", 31],
      [38901, "Balerion", 29],
      [43932, "Aegon I Targaryen", 30],
      [81580, "Daemon Blackfyre", 25],
      [85143, "Shiera Seastar", 26],
      [87363, "Jaehaerys I Targaryen", 26],
      [100435, "Maegor Targaryen", 25],
      [101575, "Nymeria of Ny Sar", 24],
      [115524, "Aegor Rivers", 24],
      [137641, "Rhaena Targaryen (ASoIaF)", 25]

    ]

  },


  {
    series: "DUNGEON MESHI",

    characters: [

      [816, "Marcille Donato", 181],
      [883, "Falin Touden", 165],
      [934, "Laios Touden", 130],
      [1463, "Izutsumi", 122],
      [1539, "Senshi", 94],
      [2618, "Chilchuck Tims", 72],
      [3088, "Kabru", 66],
      [4954, "Captain Mithrun", 54],
      [5260, "Thistle", 50]

    ]

  },


  {
    series: "SAIKI K",

    characters: [

      [182, "Saiki Kusuo", 338],
      [866, "Kaidou Shun", 141],
      [1586, "Teruhashi Kokomi", 119],
      [2532, "Kuboyasu Aren", 79],
      [3013, "Aiura Mikoto", 84],
      [3020, "Nendou Riki", 74],
      [6695, "Pushi", 39],
      [7625, "Toritsuka Reita", 56]

    ]

  },


  {
    series: "POKÉDEX",

    characters: [

      [746, "Eevee", 240],
      [772, "Mewtwo", 240],
      [800, "Mew", 231],
      [884, "Vaporeon", 218],
      [919, "Sylveon", 215],
      [957, "Rayquaza", 203],
      [1123, "Ralts", 148],
      [1292, "Umbreon", 171],
      [1313, "Charmander", 164],
      [1395, "Mimikyu", 168],
      [1455, "Arceus", 161],
      [1503, "Giratina", 153],
      [1566, "Snorlax", 156],
      [1785, "Espeon", 141],
      [1798, "Glaceon", 137],
      [1923, "Gastly", 114],
      [1962, "Leafeon", 127],
      [1975, "Riolu", 119],
      [2117, "Reshiram", 123],
      [2154, "Lugia", 126],
      [2222, "Ditto", 123],
      [2291, "Mudkip", 116],
      [2528, "Bulbasaur", 115],
      [2544, "Squirtle", 116],
      [2656, "Jirachi", 102],
      [2726, "Jolteon", 107],
      [2727, "Darkrai", 104],
      [2822, "Sprigatito", 97],
      [2826, "Kyogre", 103],
      [2898, "Zekrom", 101],
      [2911, "Pikachu (Species)", 114],
      [2948, "Litten", 93],
      [3027, "Groudon", 100],
      [3041, "Froakie", 88],
      [3101, "Dialga", 96],
      [3216, "Flareon", 95],
      [3243, "Magikarp", 93],
      [3264, "Piplup", 92],
      [3312, "Zorua", 85],
      [3412, "Wooper", 86],
      [3457, "Palkia", 88],
      [3575, "Rowlet", 82],
      [3692, "Buneary", 74],
      [3711, "Absol", 91],
      [3773, "Shinx", 73],
      [3903, "Oshawott", 84],
      [3906, "Dratini", 77],
      [4118, "Fennekin", 75],
      [4150, "Celebi", 79],
      [4164, "Latias", 69],
      [4231, "Torchic", 75],
      [4233, "Snom", 73],
      [4263, "Scorbunny", 73],
      [4278, "Suicune", 79],
      [4356, "Articuno", 76],
      [4360, "Gible", 71],
      [4390, "Meloetta", 71],
      [4397, "Deoxys", 77],
      [4411, "Yveltal", 78],
      [4494, "Snivy", 75],
      [4505, "Cyndaquil", 77],
      [4524, "Victini", 74],
      [4563, "Vulpix", 72],
      [4675, "Shaymin", 72],
      [4680, "Psyduck", 77],
      [4782, "Zeraora", 74],
      [4858, "Xerneas", 73],
      [5116, "Litwick", 62],
      [5137, "Popplio", 67],
      [5157, "Ho-Oh", 73],
      [5269, "Goomy", 63],
      [5438, "Zapdos", 71],
      [5443, "Espurr", 68],
      [5538, "Marshadow", 68],
      [5630, "Latios", 57],
      [5658, "Mawile", 63],
      [5702, "Turtwig", 63],
      [5710, "Lapras", 67],
      [5857, "Lunala", 69],
      [5890, "Regigigas", 68],
      [5967, "Growlithe", 63],
      [6040, "Kyurem", 65],
      [6156, "Totodile", 65],
      [6163, "Entei", 65],
      [6285, "Wooloo", 60],
      [6312, "Mareep", 61],
      [6322, "Diancie", 62],
      [6334, "Treecko", 62],
      [6364, "Sentret", 55],
      [6423, "Rockruff", 60],
      [6763, "Moltres", 64],
      [6808, "Bidoof", 62],
      [6839, "Chespin", 57],
      [7026, "Necrozma", 63],
      [7112, "Noibat", 55],
      [7132, "Alolan Vulpix", 64],
      [7211, "Hatenna", 43],
      [7231, "Chimchar", 57],
      [7332, "Togepi", 58],
      [7517, "Spheal", 58],
      [7651, "Skitty", 57],
      [7797, "Raikou", 58],
      [7861, "Fuecoco", 55],
      [7949, "Beldum", 53],
      [7995, "Feebas", 52],
      [8015, "Hisuian Zorua", 57],
      [8030, "Abra", 60],
      [8044, "Zacian", 59],
      [8089, "Tinkatink", 44],
      [8224, "Chikorita", 57],
      [8238, "Dreepy", 50],
      [8395, "Trapinch", 49],
      [8459, "Charcadet", 49],
      [8479, "Larvitar", 53],
      [8597, "Hoopa", 54],
      [8623, "Joltik", 52],
      [8739, "Regirock", 56],
      [8752, "Cubone", 57],
      [8833, "Pheromosa", 55],
      [8917, "Milcery", 42],
      [8981, "Tepig", 52],
      [9026, "Zygarde", 56],
      [9056, "Sobble", 53],
      [9117, "Porygon", 54],
      [9152, "Slowpoke", 54],
      [9171, "Axew", 53],
      [9248, "Caterpie", 52],
      [9312, "Aron", 49],
      [9379, "Misdreavus", 52],
      [9452, "Regice", 54],
      [9489, "Magearna", 53],
      [9510, "Tapu Lele", 54],
      [9584, "Scyther", 51],
      [9683, "Deino", 46],
      [9937, "Koraidon", 52],
      [9993, "Keldeo", 47],
      [10137, "Miraidon", 53],
      [10149, "Clefairy", 53],
      [10266, "Solgaleo", 54],
      [10315, "Swablu", 47],
      [10332, "Registeel", 52],
      [10395, "Ponyta", 50],
      [10617, "Tapu Fini", 51],
      [10651, "Bagon", 46],
      [10788, "Roselia", 48],
      [10879, "Cosmog", 51],
      [10922, "Sandile", 47],
      [10999, "Emolga", 49],
      [11075, "Sneasel", 47],
      [11079, "Larvesta", 43],
      [11173, "Snorunt", 45],
      [11223, "Minccino", 48],
      [11326, "Honedge", 45],
      [11339, "Venipede", 44],
      [11383, "Paldean Wooper", 50],
      [11388, "Houndour", 45],
      [11563, "Gligar", 45],
      [11650, "Manaphy", 46],
      [11656, "Azelf", 48],
      [11670, "Fomantis", 44],
      [11792, "Sableye", 48],
      [11795, "Ogerpon", 43],
      [11806, "Plusle", 48],
      [11821, "Shuckle", 47],
      [11862, "Minun", 48],
      [11903, "Toxel", 42],
      [11921, "Poliwag", 48],
      [11927, "Applin", 46],
      [11938, "Bounsweet", 36],
      [11953, "Cresselia", 42],
      [12011, "Stufful", 46],
      [12028, "Wimpod", 41],
      [12056, "Tandemaus", 48],
      [12084, "Scraggy", 47],
      [12126, "Buizel", 45],
      [12364, "Zamazenta", 49],
      [12384, "Phantump", 46],
      [12571, "Genesect", 46],
      [12682, "Marill", 47],
      [12845, "Mesprit", 46],
      [12872, "Solosis", 44],
      [12925, "Gothita", 42],
      [12956, "Machop", 43],
      [13014, "Nihilego", 47],
      [13065, "Rotom", 46],
      [13109, "Quaxly", 46],
      [13158, "Eternatus", 49],
      [13203, "Pachirisu", 45],
      [13211, "Grookey", 44],
      [13293, "Salandit", 41],
      [13319, "Shuppet", 41],
      [13385, "Audino", 46],
      [13421, "Teddiursa", 44],
      [13445, "Iron Valiant", 46],
      [13461, "Yamper", 44],
      [13513, "Tapu Koko", 45],
      [13632, "Uxie", 45],
      [13713, "Buzzwole", 45],
      [13761, "Dedenne", 46],
      [13954, "Galarian Ponyta", 46],
      [14003, "Petilil", 40],
      [14004, "Xurkitree", 44],
      [14233, "Rookidee", 42],
      [14244, "Murkrow", 42],
      [14319, "Sewaddle", 42],
      [14405, "Spinda", 43],
      [14407, "Cottonee", 42],
      [14409, "Starly", 43],
      [14584, "Blacephalon", 43],
      [14605, "Amaura", 42],
      [14638, "Jigglypuff (Species)", 48],
      [14735, "Fidough", 41],
      [14779, "Oddish", 44],
      [14801, "Meltan", 44],
      [14815, "Poochyena", 42],
      [14869, "Pumpkaboo", 43],
      [14942, "Type: Null", 42],
      [15067, "Duskull", 42],
      [15138, "Zubat", 43],
      [15353, "Celesteela", 43],
      [15484, "Heracross", 43],
      [15567, "Cutiefly", 42],
      [15747, "Foongus", 42],
      [15779, "Zangoose", 41],
      [15833, "Lotad", 43],
      [15863, "Virizion", 41],
      [15981, "Zigzagoon", 42],
      [16025, "Shroomish", 41],
      [16119, "Bellsprout", 44],
      [16147, "Onix", 43],
      [16150, "Pidgey", 44],
      [16245, "Kubfu", 39],
      [16681, "Pawmi", 41],
      [16736, "Galarian Zigzagoon", 42],
      [16753, "Guzzlord", 42],
      [16936, "Poipole", 41],
      [17095, "Pawniard", 37],
      [17115, "Diglett", 44],
      [17175, "Magnemite", 41],
      [17239, "Deerling", 40],
      [17341, "Hisuian Sneasel", 40],
      [17359, "Wailmer", 42],
      [17436, "Sandshrew", 42],
      [17481, "Cobalion", 42],
      [17491, "Wingull", 39],
      [17637, "Flabébé", 35],
      [17697, "Litleo", 39],
      [17699, "Miltank", 38],
      [17751, "Chien-Pao", 41],
      [17764, "Cubchoo", 41],
      [17831, "Spiritomb", 40],
      [17873, "Chansey", 39],
      [17883, "Mareanie", 39],
      [17894, "Lillipup", 39],
      [17989, "Meowth (Species)", 44],
      [18296, "Mankey", 40],
      [18305, "Trubbish", 39],
      [18313, "Nickit", 37],
      [18334, "Morpeko", 41],
      [18495, "Weedle", 41],
      [18651, "Seel", 40],
      [18663, "Yamask", 38],
      [18943, "Pancham", 40],
      [18963, "Swirlix", 40],
      [19269, "Flutter Mane", 40],
      [19324, "Wurmple", 40],
      [19334, "Mr. Mime", 40],
      [19465, "Terapagos", 38],
      [19528, "Smeargle", 39],
      [19555, "Staryu", 39],
      [19730, "Spectrier", 40],
      [19746, "Tyrunt", 38],
      [19747, "Natu", 38],
      [19868, "Lechonk", 39],
      [19957, "Grimer", 39],
      [20188, "Togedemaru", 39],
      [20215, "Smoliv", 37],
      [20310, "Drifloon", 38],
      [20340, "Tatsugiri", 38],
      [20342, "Phione", 39],
      [20350, "Munna", 36],
      [20376, "Furfrou", 38],
      [20381, "Glameow", 37],
      [20799, "Maractus", 38],
      [20812, "Fletchling", 38],
      [20965, "Golett", 37],
      [21039, "Phanpy", 38],
      [21088, "Purrloin", 38],
      [21119, "Spoink", 38],
      [21215, "Horsea", 38],
      [21250, "Pyukumuku", 37],
      [21295, "Roggenrola", 37],
      [21333, "Unown", 39],
      [21504, "Pidove", 38],
      [21522, "Tyrogue", 29],
      [21528, "Corsola", 38],
      [21536, "Kabuto", 37],
      [21777, "Combee", 36],
      [21829, "Skarmory", 37],
      [21926, "Jangmo-o", 36],
      [21997, "Sinistea", 36],
      [21998, "Impidimp", 31],
      [22102, "Rhyhorn", 37],
      [22138, "Ekans", 38],
      [22661, "Hoppip", 36],
      [22668, "Tapu Bulu", 36],
      [22726, "Nincada", 34],
      [22728, "Falinks", 36],
      [22939, "Grubbin", 35],
      [22941, "Chimecho", 36],
      [23025, "Swinub", 36],
      [23074, "Aerodactyl", 39],
      [23084, "Inkay", 36],
      [23308, "Rattata", 38],
      [23396, "Dwebble", 37],
      [23424, "Hawlucha", 37],
      [23478, "Mienfoo", 34],
      [23634, "Landorus", 33],
      [23636, "Heatran", 37],
      [23663, "Archen", 35],
      [23764, "Skiddo", 36],
      [23773, "Walking Wake", 37],
      [23805, "Kartana", 36],
      [23837, "Indeedee", 37],
      [23913, "Lickitung", 39],
      [23981, "Tynamo", 35],
      [24180, "Yanma", 34],
      [24220, "Nidoran♂", 33],
      [24272, "Klefki", 35],
      [24374, "Chi-Yu", 36],
      [24376, "Gimmighoul", 36],
      [24389, "Krabby", 37],
      [24444, "Frillish", 33],
      [24548, "Electabuzz", 36],
      [24696, "Thundurus", 33],
      [24714, "Pansage", 36],
      [24739, "Dunsparce", 37],
      [24784, "Croagunk", 36],
      [24829, "Exeggcute", 36],
      [25328, "Tropius", 36],
      [25561, "Girafarig", 34],
      [25642, "Regidrago", 37],
      [25815, "Aipom", 35],
      [26003, "Wobbuffet (Species)", 38],
      [26005, "Mantine", 36],
      [26007, "Regieleki", 37],
      [26012, "Geodude", 37],
      [26325, "Kangaskhan", 34],
      [26331, "Omanyte", 36],
      [26372, "Magmar", 35],
      [26627, "Sizzlipede", 34],
      [26894, "Hoothoot", 35],
      [26913, "Eiscue", 36],
      [26959, "Shellos", 35],
      [27209, "Torkoal", 35],
      [27219, "Hisuian Growlithe", 36],
      [27397, "Slither Wing", 35],
      [27414, "Vanillite", 35],
      [27447, "Galarian Farfetch'd", 34],
      [27670, "Comfey", 35],
      [27831, "Scream Tail", 36],
      [27954, "Anorith", 34],
      [28030, "Slugma", 35],
      [28061, "Farfetch'd", 36],
      [28079, "Tornadus", 32],
      [28246, "Volcanion", 36],
      [28311, "Greavard", 34],
      [28352, "Mudbray", 33],
      [28492, "Chinchou", 34],
      [28728, "Terrakion", 34],
      [28779, "Venonat", 35],
      [28797, "Cherubi", 35],
      [28804, "Drowzee", 34],
      [28954, "Alolan Meowth", 36],
      [29017, "Gulpin", 35],
      [29125, "Drilbur", 33],
      [29193, "Whismur", 34],
      [29395, "Woobat", 33],
      [29536, "Morelull", 34],
      [29550, "Cacnea", 34],
      [29639, "Finizen", 32],
      [30126, "Luvdisc", 34],
      [30177, "Skorupi", 33],
      [30305, "Dracovish", 34],
      [30429, "Galarian Zapdos", 36],
      [30497, "Oricorio", 33],
      [30583, "Galarian Articuno", 36],
      [30727, "Corphish", 35],
      [30761, "Dhelmise", 33],
      [30879, "Castform", 34],
      [30900, "Makuhita", 33],
      [30930, "Zarude", 32],
      [30985, "Cranidos", 33],
      [31098, "Scatterbug", 33],
      [31529, "Galarian Yamask", 33],
      [31563, "Blitzle", 33],
      [31716, "Cramorant", 33],
      [31859, "Seviper", 32],
      [31952, "Sudowoodo", 34],
      [32102, "Browt", 32],
      [32154, "Seedot", 33],
      [32161, "Carvanha", 33],
      [32174, "Surskit", 34],
      [32222, "Ferroseed", 33],
      [32299, "Tangela", 34],
      [32322, "Darumaka", 33],
      [32355, "Glastrier", 33],
      [32387, "Shroodle", 32],
      [32505, "Drampa", 33],
      [32731, "Electrike", 33],
      [32821, "Pombon", 32],
      [33095, "Rufflet", 29],
      [33125, "Tauros", 30],
      [33233, "Stakataka", 33],
      [33288, "Sunkern", 32],
      [33348, "Numel", 32],
      [33369, "Koffing", 34],
      [33699, "Doduo", 33],
      [33708, "Tadbulb", 31],
      [33898, "Nidoran♀", 31],
      [34245, "Delibird", 33],
      [34313, "Shellder", 33],
      [34317, "Paras", 33],
      [34360, "Galarian Corsola", 32],
      [34361, "Lunatone", 33],
      [34447, "Panpour", 34],
      [34454, "Solrock", 32],
      [34468, "Pikipek", 31],
      [34564, "Kecleon", 32],
      [34898, "Dracozolt", 33],
      [35245, "Ledyba", 32],
      [35276, "Voltorb", 34],
      [35460, "Calyrex", 32],
      [35569, "Pansear", 33],
      [35615, "Wishiwashi", 33],
      [35709, "Jynx", 32],
      [35738, "Ducklett", 32],
      [35890, "Slakoth", 32],
      [35908, "Skrelp", 31],
      [36071, "Nacli", 31],
      [36185, "Lileep", 31],
      [36234, "Wiglett", 33],
      [36280, "Nosepass", 33],
      [36294, "Taillow", 32],
      [36787, "Dewpider", 30],
      [37164, "Tympole", 32],
      [37286, "Okidogi", 28],
      [37405, "Tentacool", 32],
      [37490, "Snubbull", 31],
      [37524, "Galarian Meowth", 32],
      [37585, "Galarian Moltres", 34],
      [37652, "Gecqua", 30],
      [38046, "Timburr", 31],
      [38117, "Relicanth", 31],
      [38309, "Iron Moth", 33],
      [38392, "Spinarak", 32],
      [38419, "Klink", 31],
      [38690, "Goldeen", 32],
      [38826, "Iron Leaves", 32],
      [39010, "Galarian Slowpoke", 33],
      [39103, "Helioptile", 32],
      [39109, "Tirtouga", 31],
      [39152, "Wo-Chien", 32],
      [39202, "Spearow", 32],
      [39419, "Chatot", 31],
      [39592, "Roaring Moon", 33],
      [39620, "Minior", 31],
      [39741, "Clamperl", 31],
      [39975, "Carbink", 32],
      [40532, "Druddigon", 32],
      [40580, "Duraludon", 32],
      [41397, "Arctozolt", 31],
      [41654, "Frigibax", 30],
      [41709, "Pinsir", 32],
      [41770, "Komala", 32],
      [41943, "Cetoddle", 31],
      [41954, "Clobbopus", 31],
      [42193, "Skwovet", 31],
      [42512, "Bunnelby", 31],
      [42640, "Snover", 30],
      [43191, "Sandygast", 30],
      [43849, "Durant", 31],
      [43906, "Nymble", 30],
      [43999, "Flittle", 29],
      [44374, "Enamorus", 28],
      [44695, "Elgyem", 30],
      [44734, "Blipbug", 30],
      [44965, "Iron Hands", 30],
      [45185, "Raging Bolt", 31],
      [45254, "Bronzor", 31],
      [45497, "Glimmet", 30],
      [46063, "Alolan Sandshrew", 32],
      [46453, "Rolycoly", 30],
      [46550, "Burmy", 30],
      [46965, "Stunky", 30],
      [47518, "Gossifleur", 30],
      [47760, "Poltchageist", 30],
      [48058, "Iron Bundle", 30],
      [48160, "Shieldon", 30],
      [48775, "Remoraid", 30],
      [48975, "Sawk", 28],
      [49102, "Finneon", 29],
      [49311, "Pincurchin", 30],
      [49515, "Dondozo", 30],
      [49543, "Stunfisk", 30],
      [49702, "Fezandipiti", 28],
      [49717, "Maschiff", 29],
      [49778, "Cryogonal", 30],
      [49834, "Kricketot", 30],
      [49892, "Bouffalant", 29],
      [50235, "Chewtle", 30],
      [50307, "Capsakid", 28],
      [50333, "Cyclizar", 30],
      [50565, "Barboach", 30],
      [50811, "Iron Jugulis", 30],
      [51106, "Flamigo", 30],
      [51225, "Spritzee", 30],
      [51694, "Hisuian Basculin", 29],
      [51758, "Carnivine", 30],
      [52232, "Clauncher", 30],
      [52574, "Orthworm", 29],
      [52867, "Sigilyph", 30],
      [53217, "Bergmite", 29],
      [53489, "Hippopotas", 29],
      [53723, "Silicobra", 28],
      [53970, "Iron Thorns", 30],
      [53996, "Bombirdier", 29],
      [54153, "Alolan Diglett", 31],
      [54236, "Ting-Lu", 29],
      [54341, "Karrablast", 29],
      [54467, "Iron Crown", 30],
      [54715, "Bramblin", 29],
      [54978, "Wattrel", 28],
      [55084, "Pineco", 29],
      [55462, "Baltoy", 29],
      [55900, "Alolan Rattata", 30],
      [56535, "Shelmet", 29],
      [56546, "Great Tusk", 29],
      [56649, "Binacle", 29],
      [56678, "Tarountula", 29],
      [56689, "Toedscool", 29],
      [58529, "Cufant", 28],
      [58549, "Volbeat", 26],
      [58681, "Sandy Shocks", 29],
      [58923, "Patrat", 29],
      [59085, "Stantler", 28],
      [59434, "Gouging Fire", 30],
      [59521, "Varoom", 29],
      [59638, "Alomomola", 29],
      [59695, "Pecharunt", 29],
      [60573, "Passimian", 28],
      [60722, "Yungoos", 28],
      [60738, "Illumise", 27],
      [61021, "Stonjourner", 29],
      [62241, "Throh", 27],
      [62284, "Basculin", 29],
      [62311, "Meditite", 29],
      [62331, "Alolan Geodude", 29],
      [63319, "Heatmor", 28],
      [63361, "Arctovish", 28],
      [63876, "Arrokuda", 28],
      [64133, "Turtonator", 29],
      [65277, "Alolan Grimer", 29],
      [65397, "Rellor", 27],
      [66675, "Oranguru", 28],
      [66680, "Paldean Tauros", 27],
      [66896, "Klawf", 28],
      [66957, "Bruxish", 28],
      [67300, "Galarian Darumaka", 28],
      [69882, "Crabrawler", 28],
      [70165, "Vullaby", 26],
      [70417, "Brute Bonnet", 28],
      [71523, "Hisuian Qwilfish", 28],
      [72169, "Galarian Stunfisk", 28],
      [72551, "Munkidori", 26],
      [72794, "Veluza", 27],
      [73630, "Qwilfish", 28],
      [77238, "Hisuian Voltorb", 27],
      [84516, "Iron Boulder", 27],
      [85178, "Iron Treads", 27],
      [92536, "Squawkabilly", 27]

    ]

  }

];



/*
==================================================
COMBINE PART 1 + PART 2
==================================================
*/

const allCharacterSeries = [

  ...characterSeriesPart1,

  ...characterSeriesPart2

];



/*
==================================================
CREATE SAFE CHARACTER IDS
==================================================

Example:

"ONE PIECE"
becomes:
one_piece

Then rank 6 becomes:

one_piece_6
==================================================
*/

function makeSeriesId(seriesName) {

  return seriesName

    .toLowerCase()

    .normalize("NFD")

    .replace(
      /[\u0300-\u036f]/g,
      ""
    )

    .replace(
      /[^a-z0-9]+/g,
      "_"
    )

    .replace(
      /^_+|_+$/g,
      ""
    );

}



/*
==================================================
BUILD FULL CHARACTER DATABASE
==================================================
*/

const characterDatabase = [];


for (
  const seriesGroup
  of allCharacterSeries
) {

  const seriesId =
    makeSeriesId(
      seriesGroup.series
    );


  for (
    const characterData
    of seriesGroup.characters
  ) {

    const rank =
      characterData[0];


    const name =
      characterData[1];


    const value =
      characterData[2];


    const characterId =

      seriesId

      +

      "_"

      +

      rank;


    characterDatabase.push({

      type: "character",

      id: characterId,

      name: name,

      series:
        seriesGroup.series,

      rank: rank,

      value: value,


      /*
      IMPORTANT:

      Rank and spawn weight are
      intentionally separate.

      For now every character has
      equal base weight.

      We will decide the real rarity
      formula later.
      */

      spawnWeight: 1,


      /*
      If you manually added an image
      at the top of data.js, use it.

      Otherwise use no image.
      */

      image:
        characterImages[
          characterId
        ]
        ?? ""

    });

  }

}



/*
==================================================
CURRENCY ROLLS
==================================================

You requested:

+1
+1

+2
+2

+3
+3

...

+1250
+1250


That means:

1250 amounts
×
2 copies each

=

2,500 currency roll entries.
==================================================
*/

const currencyRolls = [];


for (
  let amount = 1;
  amount <= 1250;
  amount++
) {

  /*
  First copy.
  */

  currencyRolls.push({

    type: "currency",

    id:
      "currency_"
      +
      amount
      +
      "_a",

    amount: amount,

    spawnWeight: 1

  });


  /*
  Second copy.
  */

  currencyRolls.push({

    type: "currency",

    id:
      "currency_"
      +
      amount
      +
      "_b",

    amount: amount,

    spawnWeight: 1

  });

}



/*
==================================================
EMPTY :( ROLLS
==================================================

Exactly 1,000 separate empty results.
==================================================
*/

const emptyRolls = [];


for (
  let number = 1;
  number <= 1000;
  number++
) {

  emptyRolls.push({

    type: "empty",

    id:
      "empty_"
      +
      number,

    spawnWeight: 1

  });

}



/*
==================================================
FINAL ROLL DATABASE
==================================================

This is the variable app.js uses.

It contains:

ALL characters
+
2,500 currency results
+
1,000 empty results
==================================================
*/

const rollDatabase = [

  ...characterDatabase,

  ...currencyRolls,

  ...emptyRolls

];



/*
==================================================
DATABASE INFORMATION
==================================================

These variables are useful for debugging
and later Settings / Statistics pages.
==================================================
*/

const databaseInfo = {

  characters:
    characterDatabase.length,

  currencyRolls:
    currencyRolls.length,

  emptyRolls:
    emptyRolls.length,

  totalRolls:
    rollDatabase.length

};



/*
==================================================
DEBUGGING
==================================================

If you ever open the browser console,
these will tell you whether the database
loaded properly.
==================================================
*/

console.log(
  "Characters:",
  databaseInfo.characters
);


console.log(
  "Currency rolls:",
  databaseInfo.currencyRolls
);


console.log(
  "Empty rolls:",
  databaseInfo.emptyRolls
);


console.log(
  "Total roll pool:",
  databaseInfo.totalRolls
);


/*
==================================================
END OF DATA.JS
==================================================
*/
