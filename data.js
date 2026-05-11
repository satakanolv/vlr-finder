// data.js
export const players = [
    { 
        id: 1, 
        name: "imissher", 
        rank: "Radiant", 
        agent: "Jett", 
        role: "Duelist",
        rankClass: "radiant", 
        winrate: 62,
        isSmurf: true 
    },
    { 
        id: 2, 
        name: "haikoto", 
        rank: "Ascendant 1", 
        agent: "Omen", 
        role: "Controller",
        rankClass: "ascendant", 
        winrate: 54,
        isSmurf: false 
    },
    { 
        id: 3, 
        name: "satakano", 
        rank: "Immortal 2", 
        agent: "Reyna", 
        role: "Duelist",
        rankClass: "immortal", 
        winrate: 51,
        isSmurf: false 
    },
    { 
        id: 4, 
        name: "vanyapro228", 
        rank: "Iron 1", 
        agent: "Sage", 
        role: "Sentinel",
        rankClass: "iron", 
        winrate: 45,
        isSmurf: false 
    },
    { 
        id: 5, 
        name: "sxkino", 
        rank: "Platinum 3", 
        agent: "Skye", 
        role: "Initiator",
        rankClass: "platinum", 
        winrate: 58,
        isSmurf: false 
    },
    { 
       id: 8, 
       name: "nothingness.", 
       rank: "Gold 3", 
       agent: "Phoenix", 
       rankClass: "gold",
       winrate: 53,
       isSmurf: false
    },
];

export const customMatches = [
    {
        id: 1,
        title: "Night Club Scrims",
        map: "Ascent",
        rank: "Immortal+",
        players: "8/10",
        status: "Open"
    },
    {
        id: 2,
        title: "Chill 5v5",
        map: "Haven",
        rank: "Any",
        players: "4/10",
        status: "Open"
    }
];

export const tournamentPlayers = [
  { id: 1, riotId: "SkyWalker#EU", rank: "Ascendant 2", rr: 1450, role: "Duelist", isCaptain: true },
  { id: 2, riotId: "Shadow#001", rank: "Platinum 1", rr: 920, role: "Smoker", isCaptain: false },
  { id: 3, riotId: "ViperMain#🐍", rank: "Diamond 3", rr: 1280, role: "Controller", isCaptain: true },
  { id: 4, riotId: "NoobMaster69#99", rank: "Silver 2", rr: 650, role: "Sentinel", isCaptain: false },
  { id: 5, riotId: "AceHunter#123", rank: "Immortal 1", rr: 1650, role: "Duelist", isCaptain: true },
  { id: 6, riotId: "ChillGuy#EUW", rank: "Gold 3", rr: 880, role: "Initiator", isCaptain: false },
  { id: 7, riotId: "FlashBang#BOOM", rank: "Platinum 2", rr: 980, role: "Initiator", isCaptain: false },
  { id: 8, riotId: "Ghost#UA", rank: "Diamond 1", rr: 1100, role: "Duelist", isCaptain: false },
  { id: 9, riotId: "SlowMo#000", rank: "Silver 3", rr: 690, role: "Smoker", isCaptain: false },
  { id: 10, riotId: "RadiantDream#77", rank: "Ascendant 3", rr: 1520, role: "Sentinel", isCaptain: true },
  { id: 11, riotId: "ToxicBoi#666", rank: "Gold 1", rr: 720, role: "Duelist", isCaptain: false },
  { id: 12, riotId: "Medic#911", rank: "Platinum 3", rr: 1050, role: "Sentinel", isCaptain: false },
  { id: 13, riotId: "OneTap#GOD", rank: "Immortal 2", rr: 1850, role: "Duelist", isCaptain: true },
  { id: 14, riotId: "SmokesOut#101", rank: "Diamond 2", rr: 1180, role: "Smoker", isCaptain: false },
  { id: 15, riotId: "LuckyShot#🍀", rank: "Silver 1", rr: 610, role: "Initiator", isCaptain: false },
  { id: 16, riotId: "IronGamer#007", rank: "Gold 2", rr: 810, role: "Sentinel", isCaptain: false },
  { id: 17, riotId: "Blade#RUN", rank: "Ascendant 1", rr: 1390, role: "Duelist", isCaptain: true },
  { id: 18, riotId: "WallHacker#NO", rank: "Diamond 3", rr: 1295, role: "Initiator", isCaptain: false },
  { id: 19, riotId: "CampingKing#🏕️", rank: "Platinum 1", rr: 915, role: "Controller", isCaptain: false },
  { id: 20, riotId: "Zabuza#Kiri", rank: "Immortal 1", rr: 1710, role: "Smoker", isCaptain: true },
  { id: 21, riotId: "Neko#Meow", rank: "Silver 2", rr: 640, role: "Duelist", isCaptain: false },
  { id: 22, riotId: "CptAmerica#USA", rank: "Gold 3", rr: 895, role: "Sentinel", isCaptain: false },
  { id: 23, riotId: "Storm#⚡", rank: "Diamond 1", rr: 1120, role: "Initiator", isCaptain: false },
  { id: 24, riotId: "YuriClone#002", rank: "Ascendant 2", rr: 1480, role: "Smoker", isCaptain: true },
  { id: 25, riotId: "FireBall#🔥", rank: "Platinum 2", rr: 975, role: "Duelist", isCaptain: false },
  { id: 26, riotId: "IceCold#❄️", rank: "Silver 3", rr: 685, role: "Controller", isCaptain: false },
  { id: 27, riotId: "Phantom#999", rank: "Immortal 3", rr: 2100, role: "Duelist", isCaptain: true },
  { id: 28, riotId: "SupportMe#PLS", rank: "Gold 1", rr: 730, role: "Sentinel", isCaptain: false },
  { id: 29, riotId: "VandalEnjoyer#🎯", rank: "Diamond 2", rr: 1190, role: "Initiator", isCaptain: false },
  { id: 30, riotId: "OmenLover#🌑", rank: "Platinum 3", rr: 1060, role: "Smoker", isCaptain: false },
  { id: 31, riotId: "RazeMain#🚀", rank: "Ascendant 1", rr: 1350, role: "Duelist", isCaptain: true },
  { id: 32, riotId: "Guardian#UA", rank: "Silver 2", rr: 630, role: "Sentinel", isCaptain: false },
  { id: 33, riotId: "Zenith#Top", rank: "Diamond 3", rr: 1310, role: "Initiator", isCaptain: false },
  { id: 34, riotId: "Bullet#Fast", rank: "Gold 2", rr: 825, role: "Duelist", isCaptain: false },
  { id: 35, riotId: "DeepSea#🌊", rank: "Immortal 1", rr: 1680, role: "Smoker", isCaptain: true },
  { id: 36, riotId: "Pixel#Art", rank: "Platinum 1", rr: 940, role: "Sentinel", isCaptain: false },
  { id: 37, riotId: "Void#Empty", rank: "Ascendant 3", rr: 1550, role: "Initiator", isCaptain: true },
  { id: 38, riotId: "Lurker#Hidden", rank: "Diamond 1", rr: 1140, role: "Duelist", isCaptain: false },
  { id: 39, riotId: "SovaPro#🏹", rank: "Gold 3", rr: 870, role: "Initiator", isCaptain: false },
  { id: 40, riotId: "LastHero#001", rank: "Silver 1", rr: 600, role: "Smoker", isCaptain: false }
];

export const tournaments = [
    // --- ЗАРАЗ ТРИВАЮТЬ (ONGOING) ---
    {
        id: 1,
        title: "Neon City Brawl",
        status: "ongoing",
        date: "2 Травня, 2026",
        prizePool: "100,000 VP",
        teams: "16/16",
        image: "" 
    },
    {
        id: 2,
        title: "Radiant Spring Clash",
        status: "ongoing",
        date: "1-3 Травня, 2026",
        prizePool: "$5,000",
        teams: "32/32",
        image: ""
    },
    {
        id: 3,
        title: "VLR Weekend Scrims",
        status: "ongoing",
        date: "2 Травня, 2026",
        prizePool: "15,000 VP",
        teams: "8/8",
        image: ""
    },

    // --- МАЙБУТНІ (ANNOUNCED) ---
    {
        id: 4,
        title: "Spring Radiant Cup",
        status: "announced",
        date: "15 Травня, 2026",
        prizePool: "50,000 VP",
        teams: "12/32",
        image: ""
    },
    {
        id: 5,
        title: "Bind Only Tournament",
        status: "announced",
        date: "20 Травня, 2026",
        prizePool: "10,000 VP",
        teams: "4/16",
        image: ""
    },
    {
        id: 6,
        title: "VCT Offseason Showmatch",
        status: "announced",
        date: "1 Червня, 2026",
        prizePool: "$10,000",
        teams: "8/16",
        image: ""
    },
    {
        id: 7,
        title: "Iron Weekly Trash-Talk",
        status: "announced",
        date: "5 Червня, 2026",
        prizePool: "5,000 VP",
        teams: "2/8",
        image: ""
    },
    {
        id: 8,
        title: "Night Market Cup",
        status: "announced",
        date: "12 Червня, 2026",
        prizePool: "25,000 VP",
        teams: "0/16",
        image: ""
    },

    // --- МИНУЛІ (FINISHED) ---
    {
        id: 9,
        title: "Winter Invitational",
        status: "finished",
        date: "20 Лютого, 2026",
        prizePool: "$15,000",
        teams: "16/16",
        image: ""
    },
    {
        id: 10,
        title: "Ascendant Tryouts",
        status: "finished",
        date: "10 Березня, 2026",
        prizePool: "25,000 VP",
        teams: "32/32",
        image: ""
    },
    {
        id: 11,
        title: "VLR Local LAN",
        status: "finished",
        date: "15 Квітня, 2026",
        prizePool: "$2,000",
        teams: "8/8",
        image: ""
    },
    {
        id: 12,
        title: "Split Farewell Tourney",
        status: "finished",
        date: "28 Квітня, 2026",
        prizePool: "10,000 VP",
        teams: "16/16",
        image: ""
    }
];