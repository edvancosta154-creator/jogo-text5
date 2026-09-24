/**
 * RPG 2D - Arena dos Campeões (Mobile Optimized Edition)
 * Lógica do jogo, simulação procedural, controles por toque e renderização em Canvas
 */

/* ----------------------------------------------------
   SISTEMA DE ÁUDIO PROCEDURAL (OTIMIZADO PARA MOBILE)
---------------------------------------------------- */
class SoundEngine {
    constructor() {
        this.ctx = null;
        this.enabled = true;
        this.masterGain = null;
    }

    init() {
        if (!this.ctx) {
            const AudioContextClass = window.AudioContext || window.webkitAudioContext;
            if (AudioContextClass) {
                this.ctx = new AudioContextClass();
                this.masterGain = this.ctx.createGain();
                this.masterGain.gain.setValueAtTime(0.7, this.ctx.currentTime);
                this.masterGain.connect(this.ctx.destination);
            }
        }
        if (this.ctx && this.ctx.state === 'suspended') {
            this.ctx.resume().catch(() => {});
        }
    }

    playSlash() {
        if (!this.enabled || !this.ctx) return;
        try {
            const now = this.ctx.currentTime;
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(360, now);
            osc.frequency.exponentialRampToValueAtTime(70, now + 0.12);
            gain.gain.setValueAtTime(0.24, now);
            gain.gain.exponentialRampToValueAtTime(0.01, now + 0.12);
            osc.connect(gain);
            gain.connect(this.masterGain);
            osc.start(now);
            osc.stop(now + 0.12);
        } catch(e) {}
    }

    playShoot() {
        if (!this.enabled || !this.ctx) return;
        try {
            const now = this.ctx.currentTime;
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(650, now);
            osc.frequency.exponentialRampToValueAtTime(180, now + 0.09);
            gain.gain.setValueAtTime(0.2, now);
            gain.gain.exponentialRampToValueAtTime(0.01, now + 0.09);
            osc.connect(gain);
            gain.connect(this.masterGain);
            osc.start(now);
            osc.stop(now + 0.09);
        } catch(e) {}
    }

    playHit() {
        if (!this.enabled || !this.ctx) return;
        try {
            const now = this.ctx.currentTime;
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = 'square';
            osc.frequency.setValueAtTime(160, now);
            osc.frequency.exponentialRampToValueAtTime(35, now + 0.1);
            gain.gain.setValueAtTime(0.28, now);
            gain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
            osc.connect(gain);
            gain.connect(this.masterGain);
            osc.start(now);
            osc.stop(now + 0.1);
        } catch(e) {}
    }

    playCrit() {
        if (!this.enabled || !this.ctx) return;
        try {
            const now = this.ctx.currentTime;
            const osc1 = this.ctx.createOscillator();
            const osc2 = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc1.type = 'triangle';
            osc2.type = 'sine';
            osc1.frequency.setValueAtTime(440, now);
            osc1.frequency.exponentialRampToValueAtTime(880, now + 0.1);
            osc2.frequency.setValueAtTime(880, now);
            osc2.frequency.exponentialRampToValueAtTime(1760, now + 0.1);
            gain.gain.setValueAtTime(0.25, now);
            gain.gain.exponentialRampToValueAtTime(0.01, now + 0.2);
            osc1.connect(gain);
            osc2.connect(gain);
            gain.connect(this.masterGain);
            osc1.start(now); osc1.stop(now + 0.2);
            osc2.start(now); osc2.stop(now + 0.2);
        } catch(e) {}
    }

    playCoin() {
        if (!this.enabled || !this.ctx) return;
        try {
            const now = this.ctx.currentTime;
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(987, now);
            osc.frequency.setValueAtTime(1318, now + 0.06);
            gain.gain.setValueAtTime(0.18, now);
            gain.gain.exponentialRampToValueAtTime(0.01, now + 0.22);
            osc.connect(gain);
            gain.connect(this.masterGain);
            osc.start(now);
            osc.stop(now + 0.22);
        } catch(e) {}
    }

    playSpecial() {
        if (!this.enabled || !this.ctx) return;
        try {
            const now = this.ctx.currentTime;
            const notes = [440, 554, 659, 880, 1108];
            notes.forEach((freq, i) => {
                const osc = this.ctx.createOscillator();
                const gain = this.ctx.createGain();
                osc.type = 'sawtooth';
                osc.frequency.setValueAtTime(freq, now + i * 0.05);
                gain.gain.setValueAtTime(0.2, now + i * 0.05);
                gain.gain.exponentialRampToValueAtTime(0.01, now + i * 0.05 + 0.35);
                osc.connect(gain);
                gain.connect(this.masterGain);
                osc.start(now + i * 0.05);
                osc.stop(now + i * 0.05 + 0.35);
            });
        } catch(e) {}
    }

    playVampireRoar() {
        if (!this.enabled || !this.ctx) return;
        try {
            const now = this.ctx.currentTime;
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(140, now);
            osc.frequency.exponentialRampToValueAtTime(620, now + 0.16);
            osc.frequency.exponentialRampToValueAtTime(70, now + 0.45);
            gain.gain.setValueAtTime(0.3, now);
            gain.gain.exponentialRampToValueAtTime(0.01, now + 0.45);
            osc.connect(gain);
            gain.connect(this.masterGain);
            osc.start(now);
            osc.stop(now + 0.45);
        } catch(e) {}
    }

    playDash() {
        if (!this.enabled || !this.ctx) return;
        try {
            const now = this.ctx.currentTime;
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(220, now);
            osc.frequency.exponentialRampToValueAtTime(800, now + 0.12);
            gain.gain.setValueAtTime(0.2, now);
            gain.gain.exponentialRampToValueAtTime(0.01, now + 0.12);
            osc.connect(gain);
            gain.connect(this.masterGain);
            osc.start(now);
            osc.stop(now + 0.12);
        } catch(e) {}
    }

    playLevelUp() {
        if (!this.enabled || !this.ctx) return;
        try {
            const now = this.ctx.currentTime;
            const chords = [523.25, 659.25, 783.99, 1046.50];
            chords.forEach((freq, i) => {
                const osc = this.ctx.createOscillator();
                const gain = this.ctx.createGain();
                osc.type = 'triangle';
                osc.frequency.setValueAtTime(freq, now + i * 0.08);
                gain.gain.setValueAtTime(0.26, now + i * 0.08);
                gain.gain.exponentialRampToValueAtTime(0.01, now + i * 0.08 + 0.6);
                osc.connect(gain);
                gain.connect(this.masterGain);
                osc.start(now + i * 0.08);
                osc.stop(now + i * 0.08 + 0.6);
            });
        } catch(e) {}
    }

    playCardSelect() {
        if (!this.enabled || !this.ctx) return;
        try {
            const now = this.ctx.currentTime;
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(600, now);
            osc.frequency.exponentialRampToValueAtTime(1200, now + 0.15);
            gain.gain.setValueAtTime(0.28, now);
            gain.gain.exponentialRampToValueAtTime(0.01, now + 0.25);
            osc.connect(gain);
            gain.connect(this.masterGain);
            osc.start(now);
            osc.stop(now + 0.25);
        } catch(e) {}
    }

    playExplosion() {
        if (!this.enabled || !this.ctx) return;
        try {
            const now = this.ctx.currentTime;
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(120, now);
            osc.frequency.exponentialRampToValueAtTime(20, now + 0.25);
            gain.gain.setValueAtTime(0.3, now);
            gain.gain.exponentialRampToValueAtTime(0.01, now + 0.25);
            osc.connect(gain);
            gain.connect(this.masterGain);
            osc.start(now);
            osc.stop(now + 0.25);
        } catch(e) {}
    }

    playGameOver() {
        if (!this.enabled || !this.ctx) return;
        try {
            const now = this.ctx.currentTime;
            const notes = [440, 415, 392, 349];
            notes.forEach((freq, i) => {
                const osc = this.ctx.createOscillator();
                const gain = this.ctx.createGain();
                osc.type = 'triangle';
                osc.frequency.setValueAtTime(freq, now + i * 0.14);
                gain.gain.setValueAtTime(0.24, now + i * 0.14);
                gain.gain.exponentialRampToValueAtTime(0.01, now + i * 0.14 + 0.45);
                osc.connect(gain);
                gain.connect(this.masterGain);
                osc.start(now + i * 0.14);
                osc.stop(now + i * 0.14 + 0.45);
            });
        } catch(e) {}
    }
}

const audio = new SoundEngine();

function triggerHaptic(pattern = 10) {
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
        try { navigator.vibrate(pattern); } catch(e) {}
    }
}

function toggleFullscreen() {
    try {
        if (!document.fullscreenElement && !document.webkitFullscreenElement) {
            const elem = document.documentElement;
            if (elem.requestFullscreen) elem.requestFullscreen();
            else if (elem.webkitRequestFullscreen) elem.webkitRequestFullscreen();
        } else {
            if (document.exitFullscreen) document.exitFullscreen();
            else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
        }
    } catch(e) {}
}

/* ----------------------------------------------------
   CATÁLOGO DE CHAPÉUS & ELMOS
---------------------------------------------------- */
const SHOP_HATS = [
    { id: 'hat_none', name: 'Nenhum Chapéu', price: 0, rarity: 'common', icon: '❌', desc: 'Estilo clássico e sem proteção na cabeça.', type: 'none' },
    { id: 'hat_bandana', name: 'Bandana Shinobi', price: 60, rarity: 'common', icon: '🔴', desc: 'Faixa de guerreiro ninja com pontas esvoaçantes.', type: 'bandana', color: '#e74c3c' },
    { id: 'hat_cowboy', name: 'Chapéu do Velho Oeste', price: 110, rarity: 'common', icon: '🤠', desc: 'Chapéu de couro resistente de pistoleiro.', type: 'cowboy', color: '#8d6e63' },
    { id: 'hat_hood', name: 'Capuz das Sombras', price: 180, rarity: 'rare', icon: '👤', desc: 'Oculta o rosto revelando olhos espectrais luminosos.', type: 'hood', color: '#2c3e50' },
    { id: 'hat_mage', name: 'Chapéu Arcano Estelar', price: 260, rarity: 'rare', icon: '🎩', desc: 'Chapéu pontudo de bruxo imbuído de mana cósmica.', type: 'wizard', color: '#6c5ce7' },
    { id: 'hat_pirate', name: 'Bicórnio dos 7 Mares', price: 340, rarity: 'rare', icon: '🏴‍☠️', desc: 'Chapéu pirata elegante com caveira dourada e pluma.', type: 'pirate', color: '#1e272e' },
    { id: 'hat_viking', name: 'Elmo Nórdico de Valhala', price: 450, rarity: 'epic', icon: '🪖', desc: 'Elmo de ferro forjado com grandes chifres ferozes.', type: 'viking', color: '#7f8c8d' },
    { id: 'hat_cyber_visor', name: 'Visor Cyber Neon 2077', price: 600, rarity: 'epic', icon: '🥽', desc: 'Scanner holográfico com mira laser em tempo real.', type: 'visor', color: '#00cec9' },
    { id: 'hat_samurai', name: 'Kabuto do Samurai Supremo', price: 750, rarity: 'epic', icon: '👹', desc: 'Elmo ancestral com meia-lua dourada e máscara.', type: 'samurai', color: '#b33939' },
    { id: 'hat_demon', name: 'Chifres do Lorde Demoníaco', price: 900, rarity: 'legend', icon: '🔥', desc: 'Chifres ardentes que soltam brasas incandescentes.', type: 'demon', color: '#c0392b' },
    { id: 'hat_halo', name: 'Auréola Celestial Divina', price: 1100, rarity: 'legend', icon: '👼', desc: 'Anel sagrado dourado flutuante com centelhas de luz.', type: 'halo', color: '#f1c40f' },
    { id: 'hat_crown', name: 'Coroa Imperial de Ouro', price: 1400, rarity: 'legend', icon: '👑', desc: 'Cravejada de gemas reais e envolta em aura de glória.', type: 'crown', color: '#f1c40f' }
];

/* ----------------------------------------------------
   CARTAS DE MELHORIA (ROGUELIKE UPGRADES)
---------------------------------------------------- */
const UPGRADE_CARDS_POOL = [
    {
        id: 'card_dmg',
        name: 'Força Titânica',
        icon: '⚔️',
        rarity: 'common',
        desc: 'Aumenta o dano de todos os seus golpes e disparos em +35%.',
        apply: (p) => { p.damageBoost += 0.35; }
    },
    {
        id: 'card_atk_speed',
        name: 'Fúria Veloz',
        icon: '⚡',
        rarity: 'common',
        desc: 'Aumenta a velocidade de ataque em +25% (reduz tempo de recarga).',
        apply: (p) => { p.attackSpeedBoost += 0.25; }
    },
    {
        id: 'card_max_hp',
        name: 'Constituição de Titã',
        icon: '❤️',
        rarity: 'common',
        desc: '+50 HP Máximo e recupera 60 HP imediatamente.',
        apply: (p) => {
            p.maxHp += 50;
            p.hp = Math.min(p.maxHp, p.hp + 60);
        }
    },
    {
        id: 'card_move_speed',
        name: 'Passo do Vento',
        icon: '💨',
        rarity: 'common',
        desc: 'Aumenta sua velocidade de corrida em +20%.',
        apply: (p) => { p.speedBoost += 0.20; }
    },
    {
        id: 'card_crit',
        name: 'Precisão Mortal',
        icon: '🎯',
        rarity: 'rare',
        desc: '+20% de Chance de Acerto Crítico (causa 200% de dano).',
        apply: (p) => { p.critChance += 0.20; }
    },
    {
        id: 'card_lifesteal',
        name: 'Sede Vampírica',
        icon: '🩸',
        rarity: 'rare',
        desc: 'Recupera 5% da sua vida máxima a cada inimigo abatido.',
        apply: (p) => { p.lifestealPct += 0.05; }
    },
    {
        id: 'card_defense',
        name: 'Pele de Ferro',
        icon: '🛡️',
        rarity: 'rare',
        desc: 'Reduz em 20% todo o dano recebido de inimigos.',
        apply: (p) => { p.damageReduction += 0.20; }
    },
    {
        id: 'card_dash_cdr',
        name: 'Esquiva Relâmpago',
        icon: '⏱️',
        rarity: 'rare',
        desc: 'Reduz o tempo de recarga da Esquiva (Dash) em 35%.',
        apply: (p) => { p.dashCdrPct += 0.35; }
    },
    {
        id: 'card_magnet',
        name: 'Vórtice Magnético',
        icon: '🧲',
        rarity: 'rare',
        desc: 'Triplica o alcance de atração de moedas e poções.',
        apply: (p) => { p.magnetRangeMultiplier += 2.0; }
    },
    {
        id: 'card_mana_regen',
        name: 'Fonte Arcana',
        icon: '🔮',
        rarity: 'rare',
        desc: '+40 MP Máximo e dobra a regeneração contínua de Mana.',
        apply: (p) => {
            p.maxMana += 40;
            p.mana = Math.min(p.maxMana, p.mana + 40);
            p.manaRegenMultiplier += 1.0;
        }
    },
    {
        id: 'card_multishot',
        name: 'Eco de Ataque',
        icon: '🏹',
        rarity: 'epic',
        desc: 'Adiciona +1 projétil extra a cada disparo ou onda cortante.',
        apply: (p) => { p.extraProjectiles += 1; }
    },
    {
        id: 'card_corpse_explosion',
        name: 'Detonação Cadavérica',
        icon: '💥',
        rarity: 'epic',
        desc: 'Inimigos derrotados explodem causando 65 de dano em área.',
        apply: (p) => { p.corpseExplosionLevel += 1; }
    },
    {
        id: 'card_giant_area',
        name: 'Expansão Dimensional',
        icon: '🌪️',
        rarity: 'epic',
        desc: 'Aumenta em +35% a área de corte da espada e o tamanho dos projéteis.',
        apply: (p) => { p.areaMultiplier += 0.35; }
    },
    {
        id: 'card_midas',
        name: 'Toque de Midas',
        icon: '👑',
        rarity: 'legend',
        desc: 'Dobra o valor de todas as moedas coletadas (+100%).',
        apply: (p) => { p.coinMultiplier += 1.0; }
    }
];

/* ----------------------------------------------------
   DADOS DO JOGADOR (PERSISTÊNCIA)
---------------------------------------------------- */
const STORAGE_KEY = 'rpg_2d_mobile_save_v5';

let playerData = {
    coins: 100000,
    highScore: 0,
    totalKills: 0,
    selectedClass: 'guerreiro',
    unlockedHats: ['hat_none'],
    equippedHat: 'hat_none'
};

function loadSavedData() {
    try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
            playerData = Object.assign(playerData, JSON.parse(saved));
        } else {
            const oldSaved = localStorage.getItem('rpg_2d_save_data_v4');
            if (oldSaved) {
                playerData = Object.assign(playerData, JSON.parse(oldSaved));
            }
        }
    } catch(e) {
        console.warn("Erro ao carregar dados salvos:", e);
    }
    if (!playerData.unlockedHats.includes('hat_none')) playerData.unlockedHats.push('hat_none');
    updateCurrencyDisplays();
}

function savePlayerData() {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(playerData));
    } catch(e) {
        console.warn("Erro ao salvar dados:", e);
    }
    updateCurrencyDisplays();
}

function updateCurrencyDisplays() {
    const lobbyEl = document.getElementById('lobby-coins');
    const shopEl = document.getElementById('shop-coins');
    const selectEl = document.getElementById('select-coins');
    const ingameEl = document.getElementById('ingame-coins');
    if (lobbyEl) lobbyEl.innerText = playerData.coins;
    if (shopEl) shopEl.innerText = playerData.coins;
    if (selectEl) selectEl.innerText = playerData.coins;
    if (ingameEl) ingameEl.innerText = playerData.coins;
}

/* ----------------------------------------------------
   CLASSES DE HERÓIS
---------------------------------------------------- */
const CLASSES = {
    guerreiro: { name: 'Guerreiro', icon: '🛡️', type: 'guerreiro', maxHp: 190, maxMana: 60,  damage: 38, speed: 3.2, manaCost: 5,  cooldown: 280, dashCd: 1200 },
    mago:      { name: 'Mago',      icon: '🔮', type: 'mago',      maxHp: 95,  maxMana: 130, damage: 55, speed: 3.4, manaCost: 14, cooldown: 380, dashCd: 1400 },
    atirador:  { name: 'Atirador',  icon: '🏹', type: 'atirador',  maxHp: 115, maxMana: 85,  damage: 26, speed: 4.0, manaCost: 8,  cooldown: 170, dashCd: 1000 },
    assassino: { name: 'Assassino', icon: '🗡️', type: 'assassino', maxHp: 105, maxMana: 65,  damage: 24, speed: 5.0, manaCost: 3,  cooldown: 95,  dashCd: 800 },
    vampiro:   { name: 'Vampiro',   icon: '🧛', type: 'vampiro',   maxHp: 150, maxMana: 70,  damage: 32, speed: 4.2, manaCost: 4,  cooldown: 170, dashCd: 900 }
};

/* ----------------------------------------------------
   ESTADO E VARIÁVEIS DO JOGO
---------------------------------------------------- */
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let canvasWidth = window.innerWidth;
let canvasHeight = window.innerHeight;
let dpr = 1;

let gameRunning = false;
let gamePaused = false;
let isUpgradingWave = false;
let score = 0;
let elapsedSeconds = 0;
let runCoinsEarned = 0;
let keys = {};
let mousePos = { x: 400, y: 300 };
let isMouseDown = false;
let isMobileAttacking = false;

let player = null;
let enemies = [];
let projectiles = [];
let dropPickups = [];
let damageTexts = [];
let slashVisuals = [];
let clawVisuals = [];
let particleEffects = [];
let shockwaveEffects = [];
let dashGhosts = [];
let shadowMinions = [];

let screenShake = 0;
let lastAttackTime = 0;
let spawnInterval = null;
let timerInterval = null;
let lastFrameTime = performance.now();

// SISTEMA DE ONDAS: RIGOROSAMENTE 50 INIMIGOS POR ONDA
const ENEMIES_PER_WAVE = 50;
let waveLevel = 1;
let waveEnemiesSpawned = 0;
let waveEnemiesKilled = 0;
let enemyHpMultiplier = 1.0;
let enemySpeedMultiplier = 1.0;

// CONTROLES TOUCH VIRTUAIS
let joystickActive = false;
let joystickTouchId = null;
let joystickCenter = { x: 0, y: 0 };
let joystickVector = { x: 0, y: 0 };
const JOYSTICK_MAX_RADIUS = 42;

/* ----------------------------------------------------
   REDIMENSIONAMENTO COM SUPORTE A DPR OTIMIZADO
---------------------------------------------------- */
function resizeGame() {
    dpr = Math.min(window.devicePixelRatio || 1, 1.75); // Limite inteligente para evitar aquecimento em telas 3K/4K de celular
    canvasWidth = window.innerWidth;
    canvasHeight = window.innerHeight;

    canvas.width = Math.floor(canvasWidth * dpr);
    canvas.height = Math.floor(canvasHeight * dpr);
    canvas.style.width = `${canvasWidth}px`;
    canvas.style.height = `${canvasHeight}px`;

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    if (player) {
        player.x = Math.max(player.radius, Math.min(canvasWidth - player.radius, player.x));
        player.y = Math.max(player.radius, Math.min(canvasHeight - player.radius, player.y));
    }
}

window.addEventListener('resize', resizeGame);
window.addEventListener('orientationchange', () => setTimeout(resizeGame, 200));

/* ----------------------------------------------------
   EFEITOS VISUAIS COM CONTROLE DE DESEMPENHO
---------------------------------------------------- */
class Particle {
    constructor(x, y, color, speed = 3, size = 3, life = 16) {
        this.x = x;
        this.y = y;
        this.color = color;
        const angle = Math.random() * Math.PI * 2;
        const spd = (Math.random() * 0.7 + 0.3) * speed;
        this.vx = Math.cos(angle) * spd;
        this.vy = Math.sin(angle) * spd;
        this.size = size;
        this.maxLife = life;
        this.life = life;
    }
    update(dt) {
        this.x += this.vx * dt;
        this.y += this.vy * dt;
        this.vx *= Math.pow(0.94, dt);
        this.vy *= Math.pow(0.94, dt);
        this.life -= dt;
    }
    draw() {
        const progress = Math.max(0, this.life / this.maxLife);
        ctx.save();
        ctx.globalAlpha = progress;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, Math.max(0.5, this.size * progress), 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }
}

class ShockwaveEffect {
    constructor(x, y, maxRadius = 45, color = '#66fcf1', lineWidth = 2.5) {
        this.x = x;
        this.y = y;
        this.radius = 5;
        this.maxRadius = maxRadius;
        this.color = color;
        this.lineWidth = lineWidth;
        this.life = 12;
        this.maxLife = 12;
    }
    update(dt) {
        this.radius += ((this.maxRadius - this.radius) * 0.25 + 1.5) * dt;
        this.life -= dt;
    }
    draw() {
        const progress = Math.max(0, this.life / this.maxLife);
        ctx.save();
        ctx.globalAlpha = progress;
        ctx.strokeStyle = this.color;
        ctx.lineWidth = Math.max(1, this.lineWidth * progress);
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
    }
}

class DashGhost {
    constructor(x, y, angle, color, radius) {
        this.x = x;
        this.y = y;
        this.angle = angle;
        this.color = color;
        this.radius = radius;
        this.life = 9;
        this.maxLife = 9;
    }
    update(dt) {
        this.life -= dt;
    }
    draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        ctx.globalAlpha = Math.max(0, (this.life / this.maxLife) * 0.35);
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(0, 0, this.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }
}

class DropPickup {
    constructor(x, y, type) {
        this.x = x;
        this.y = y;
        this.type = type;
        this.radius = type === 'coin' ? 8 : 10;
        this.life = 600;
        this.bob = Math.random() * Math.PI * 2;
        this.vx = (Math.random() - 0.5) * 3;
        this.vy = (Math.random() - 0.5) * 3;
    }

    update(dt) {
        this.life -= dt;
        this.bob += 0.08 * dt;

        if (Math.abs(this.vx) > 0.05 || Math.abs(this.vy) > 0.05) {
            this.x += this.vx * dt;
            this.y += this.vy * dt;
            this.vx *= Math.pow(0.9, dt);
            this.vy *= Math.pow(0.9, dt);
        }

        if (player) {
            const magnetDist = 130 * player.magnetRangeMultiplier;
            const dist = Math.hypot(player.x - this.x, player.y - this.y);
            if (dist < magnetDist) {
                const angle = Math.atan2(player.y - this.y, player.x - this.x);
                const speed = Math.min(11, 4 + (magnetDist - dist) * 0.06);
                this.x += Math.cos(angle) * speed * dt;
                this.y += Math.sin(angle) * speed * dt;
            }
            if (dist < player.radius + this.radius) {
                this.collect();
                return false;
            }
        }
        return this.life > 0;
    }

    collect() {
        triggerHaptic(12);
        if (this.type === 'coin') {
            const baseAmount = Math.floor(Math.random() * 3) + 3;
            const amount = Math.round(baseAmount * player.coinMultiplier);
            playerData.coins += amount;
            runCoinsEarned += amount;
            savePlayerData();
            audio.playCoin();
            damageTexts.push(new DamageText(this.x, this.y - 10, `+${amount} 🪙`, '#f1c40f', 13, true));
            if (shockwaveEffects.length < 10) {
                shockwaveEffects.push(new ShockwaveEffect(this.x, this.y, 20, '#f1c40f', 2));
            }
        } else if (this.type === 'heal') {
            const heal = Math.round(player.maxHp * 0.35);
            player.hp = Math.min(player.maxHp, player.hp + heal);
            damageTexts.push(new DamageText(this.x, this.y - 10, `+${heal} HP`, '#2ecc71', 13, true));
            if (shockwaveEffects.length < 10) {
                shockwaveEffects.push(new ShockwaveEffect(this.x, this.y, 25, '#2ecc71', 2));
            }
            audio.playCoin();
        } else if (this.type === 'mana') {
            const manaGain = Math.round(player.maxMana * 0.5);
            player.mana = Math.min(player.maxMana, player.mana + manaGain);
            damageTexts.push(new DamageText(this.x, this.y - 10, `+${manaGain} MP`, '#3498db', 13, true));
            if (shockwaveEffects.length < 10) {
                shockwaveEffects.push(new ShockwaveEffect(this.x, this.y, 25, '#3498db', 2));
            }
            audio.playCoin();
        }
        updateHUD();
    }

    draw() {
        ctx.save();
        const yOffset = Math.sin(this.bob) * 3;
        ctx.translate(this.x, this.y + yOffset);

        if (this.type === 'coin') {
            ctx.fillStyle = '#f39c12';
            ctx.beginPath();
            ctx.arc(0, 0, 7, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillStyle = '#f1c40f';
            ctx.beginPath();
            ctx.arc(0, 0, 5, 0, Math.PI * 2);
            ctx.fill();
        } else if (this.type === 'heal') {
            ctx.fillStyle = '#2ecc71';
            ctx.beginPath();
            ctx.arc(0, 0, 7, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillStyle = '#ffffff';
            ctx.fillRect(-1.5, -4, 3, 8);
            ctx.fillRect(-4, -1.5, 8, 3);
        } else if (this.type === 'mana') {
            ctx.fillStyle = '#3498db';
            ctx.beginPath();
            ctx.moveTo(0, -8);
            ctx.lineTo(6, 2);
            ctx.lineTo(0, 8);
            ctx.lineTo(-6, 2);
            ctx.closePath();
            ctx.fill();
        }
        ctx.restore();
    }
}

class ShadowMinion {
    constructor(x, y, index) {
        this.x = x + (index === 0 ? -35 : 35);
        this.y = y + 20;
        this.maxHp = 180;
        this.hp = 180;
        this.damage = 42;
        this.speed = 3.6;
        this.radius = 16;
        this.lastAttack = 0;
        this.cooldown = 480;
    }

    update(dt) {
        let nearestEnemy = null;
        let minDist = Infinity;
        enemies.forEach(enemy => {
            const dist = Math.hypot(enemy.x - this.x, enemy.y - this.y);
            if (dist < minDist) {
                minDist = dist;
                nearestEnemy = enemy;
            }
        });

        if (nearestEnemy) {
            const angle = Math.atan2(nearestEnemy.y - this.y, nearestEnemy.x - this.x);
            if (minDist > 32) {
                this.x += Math.cos(angle) * this.speed * dt;
                this.y += Math.sin(angle) * this.speed * dt;
            } else {
                const now = Date.now();
                if (now - this.lastAttack > this.cooldown) {
                    nearestEnemy.takeDamage(this.damage, angle, 6);
                    this.lastAttack = now;
                    slashVisuals.push(new SlashEffect(this.x, this.y, angle, 75, '#9b59b6'));
                    audio.playSlash();
                }
            }
        } else if (player) {
            const distToPlayer = Math.hypot(player.x - this.x, player.y - this.y);
            if (distToPlayer > 50) {
                const angle = Math.atan2(player.y - this.y, player.x - this.x);
                this.x += Math.cos(angle) * this.speed * dt;
                this.y += Math.sin(angle) * this.speed * dt;
            }
        }
    }

    takeDamage(amount) {
        this.hp -= amount;
        damageTexts.push(new DamageText(this.x, this.y - 10, Math.round(amount), "#9b59b6", 12));
        if (this.hp <= 0) {
            const idx = shadowMinions.indexOf(this);
            if (idx > -1) shadowMinions.splice(idx, 1);
        }
    }

    draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.fillStyle = '#c0392b';
        ctx.fillRect(-15, -this.radius - 8, 30, 4);
        ctx.fillStyle = '#9b59b6';
        ctx.fillRect(-15, -this.radius - 8, Math.max(0, (this.hp / this.maxHp) * 30), 4);

        ctx.beginPath();
        ctx.arc(0, 0, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = '#4a235a';
        ctx.fill();
        ctx.lineWidth = 2;
        ctx.strokeStyle = '#9b59b6';
        ctx.stroke();

        ctx.fillStyle = '#d7bde2';
        ctx.fillRect(5, -2, 8, 3);
        ctx.restore();
    }
}

class SlashEffect {
    constructor(x, y, angle, length = 85, color = '#66fcf1') {
        this.x = x !== undefined ? x : Math.random() * canvasWidth;
        this.y = y !== undefined ? y : Math.random() * canvasHeight;
        this.angle = angle !== undefined ? angle : Math.random() * Math.PI * 2;
        this.length = length;
        this.color = color;
        this.life = 11;
        this.maxLife = 11;
    }
    update(dt) {
        this.life -= dt;
    }
    draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        const alpha = Math.max(0, this.life / this.maxLife);
        ctx.globalAlpha = alpha;

        ctx.beginPath();
        ctx.moveTo(-this.length / 2, -4);
        ctx.quadraticCurveTo(0, 15, this.length / 2, -4);
        ctx.strokeStyle = this.color;
        ctx.lineWidth = 3.5 * alpha;
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(-this.length * 0.4, -2);
        ctx.quadraticCurveTo(0, 9, this.length * 0.4, -2);
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 1.8 * alpha;
        ctx.stroke();

        ctx.restore();
    }
}

class ClawSlashEffect {
    constructor(x, y, angle, length = 75) {
        this.x = x;
        this.y = y;
        this.angle = angle;
        this.length = length;
        this.life = 12;
        this.maxLife = 12;
    }
    update(dt) {
        this.life -= dt;
    }
    draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        const alpha = Math.max(0, this.life / this.maxLife);
        ctx.globalAlpha = alpha;
        ctx.strokeStyle = '#ff1744';
        ctx.lineWidth = 3 * alpha;

        const offsets = [-10, 0, 10];
        offsets.forEach(off => {
            ctx.beginPath();
            ctx.moveTo(-this.length / 2, off - 5);
            ctx.quadraticCurveTo(0, off + 14, this.length / 2, off - 5);
            ctx.stroke();
        });
        ctx.restore();
    }
}

class DamageText {
    constructor(x, y, text, color = '#ff4d4d', size = 13, isCrit = false) {
        this.x = x + (Math.random() - 0.5) * 12;
        this.y = y;
        this.text = text;
        this.color = color;
        this.size = isCrit ? size * 1.3 : size;
        this.life = isCrit ? 45 : 36;
        this.maxLife = this.life;
        this.isCrit = isCrit;
        this.vy = isCrit ? -1.3 : -0.85;
    }
    update(dt) {
        this.y += this.vy * dt;
        this.vy *= Math.pow(0.95, dt);
        this.life -= dt;
    }
    draw() {
        ctx.save();
        const alpha = Math.max(0, this.life / this.maxLife);
        ctx.globalAlpha = alpha;
        ctx.font = `bold ${this.size}px 'Segoe UI', system-ui, sans-serif`;
        ctx.fillStyle = this.color;
        ctx.fillText(this.text, this.x, this.y);
        ctx.restore();
    }
}

class Projectile {
    constructor(x, y, angle, speed, damage, type = 'arrow', isCrit = false) {
        this.x = x;
        this.y = y;
        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed;
        this.damage = damage;
        this.type = type;
        this.isCrit = isCrit;
        this.radius = type === 'fireball' ? (13 * (player ? player.areaMultiplier : 1)) : 
                     (type === 'mecha_bullet' ? 5.5 : (4.5 * (player ? player.areaMultiplier : 1)));
        this.markedForDeletion = false;
        this.range = Math.max(canvasWidth, canvasHeight) * 0.85;
        this.traveled = 0;
    }

    update(dt) {
        const moveDist = Math.hypot(this.vx, this.vy) * dt;
        this.x += this.vx * dt;
        this.y += this.vy * dt;
        this.traveled += moveDist;

        if (Math.random() < 0.25 && particleEffects.length < 35) {
            const trailColor = this.type === 'fireball' ? '#f39c12' : (this.type === 'mecha_bullet' ? '#f1c40f' : '#2ecc71');
            particleEffects.push(new Particle(this.x, this.y, trailColor, 1.5, 2, 8));
        }

        if (this.traveled >= this.range || this.x < -30 || this.x > canvasWidth + 30 || this.y < -30 || this.y > canvasHeight + 30) {
            this.markedForDeletion = true;
        }

        for (let i = 0; i < enemies.length; i++) {
            const enemy = enemies[i];
            const dist = Math.hypot(this.x - enemy.x, this.y - enemy.y);
            if (dist < this.radius + enemy.radius) {
                enemy.takeDamage(this.damage, Math.atan2(this.vy, this.vx), 5, this.isCrit);
                this.markedForDeletion = true;
                if (shockwaveEffects.length < 10) {
                    shockwaveEffects.push(new ShockwaveEffect(this.x, this.y, 22, this.type === 'fireball' ? '#e67e22' : '#2ecc71', 2));
                }
                if (particleEffects.length < 35) {
                    for (let p = 0; p < 2; p++) {
                        particleEffects.push(new Particle(this.x, this.y, '#f39c12', 2.8, 2.2, 10));
                    }
                }
                break;
            }
        }
    }

    draw() {
        ctx.save();
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);

        if (this.type === 'fireball') {
            ctx.fillStyle = '#f39c12';
            ctx.fill();
            ctx.strokeStyle = '#ffffff';
            ctx.lineWidth = 2;
            ctx.stroke();
        } else if (this.type === 'mecha_bullet') {
            ctx.fillStyle = '#ffffff';
            ctx.fill();
            ctx.strokeStyle = '#e67e22';
            ctx.lineWidth = 1.8;
            ctx.stroke();
        } else {
            ctx.fillStyle = '#2ecc71';
            ctx.fill();
            ctx.strokeStyle = '#ffffff';
            ctx.lineWidth = 1.4;
            ctx.stroke();
        }
        ctx.restore();
    }
}

/* ----------------------------------------------------
   CLASSE DO JOGADOR
---------------------------------------------------- */
class Player {
    constructor(classKey) {
        const config = CLASSES[classKey];
        this.type = config.type;
        this.className = config.name;
        this.classIcon = config.icon || '🛡️';
        this.baseMaxHp = config.maxHp;
        this.maxHp = config.maxHp;
        this.hp = config.maxHp;
        this.baseMaxMana = config.maxMana;
        this.maxMana = config.maxMana;
        this.mana = config.maxMana;
        this.baseDamage = config.damage;
        this.damage = config.damage;
        this.baseSpeed = config.speed;
        this.speed = config.speed;
        this.manaCost = config.manaCost;
        this.baseCooldown = config.cooldown;
        this.cooldown = config.cooldown;
        this.baseDashCd = config.dashCd || 1200;
        this.dashCd = this.baseDashCd;
        
        this.x = canvasWidth / 2;
        this.y = canvasHeight / 2;
        this.radius = 18;
        this.angle = 0;
        this.isAttacking = false;

        // Modificadores de Upgrades
        this.damageBoost = 1.0;
        this.attackSpeedBoost = 1.0;
        this.speedBoost = 1.0;
        this.critChance = 0.05;
        this.lifestealPct = 0.0;
        this.damageReduction = 0.0;
        this.dashCdrPct = 0.0;
        this.extraProjectiles = 0;
        this.magnetRangeMultiplier = 1.0;
        this.corpseExplosionLevel = 0;
        this.manaRegenMultiplier = 1.0;
        this.coinMultiplier = 1.0;
        this.areaMultiplier = 1.0;
        this.acquiredUpgrades = {};

        this.isDashing = false;
        this.lastDashTime = 0;
        this.dashDuration = 180;
        this.dashSpeedMultiplier = 3.2;
        this.dashAngle = 0;

        // Habilidades e Temporizadores Integrados ao Delta Time
        this.fury = 0;
        this.isFireMode = false;
        this.fireModeTimer = 0;

        this.mechaCharge = 0;
        this.isMechaMode = false;
        this.mechaMaxHp = 380;
        this.mechaHp = 380;

        this.mageCharge = 0;

        this.assassinCharge = 0;
        this.isThousandSlashes = false;
        this.thousandSlashesTimer = 0;
        this.slashTick = 0;

        this.vampireCharge = 0;
        this.isVampireFrenzy = false;
        this.vampireFrenzyTimer = 0;
        this.isImmortal = false;
        this.frenzyTick = 0;

        this.equippedHat = playerData.equippedHat || 'hat_none';
    }

    dash() {
        const now = Date.now();
        const realDashCd = this.dashCd * Math.max(0.3, 1 - this.dashCdrPct);
        if (now - this.lastDashTime < realDashCd) return;

        this.lastDashTime = now;
        this.isDashing = true;
        this.dashAngle = this.angle;
        audio.playDash();
        triggerHaptic(20);

        const ghostColor = (this.type === 'vampiro') ? '#ff1744' : '#1abc9c';
        if (shockwaveEffects.length < 10) {
            shockwaveEffects.push(new ShockwaveEffect(this.x, this.y, 40, ghostColor, 2.5));
        }

        if (particleEffects.length < 35) {
            for (let i = 0; i < 5; i++) {
                particleEffects.push(new Particle(this.x, this.y, ghostColor, 3.5, 2.5, 12));
            }
        }

        setTimeout(() => {
            this.isDashing = false;
        }, this.dashDuration);
    }

    addSpecialCharge(amount) {
        if (this.type === 'guerreiro' && !this.isFireMode) {
            this.fury = Math.min(100, this.fury + amount);
            if (this.fury >= 100) this.activateFireMode();
        } else if (this.type === 'atirador' && !this.isMechaMode) {
            this.mechaCharge = Math.min(100, this.mechaCharge + amount);
        } else if (this.type === 'mago') {
            this.mageCharge = Math.min(100, this.mageCharge + amount);
        } else if (this.type === 'assassino' && !this.isThousandSlashes) {
            this.assassinCharge = Math.min(100, this.assassinCharge + amount);
        } else if (this.type === 'vampiro' && !this.isVampireFrenzy) {
            this.vampireCharge = Math.min(100, this.vampireCharge + amount);
        }
        updateHUD();
    }

    activateFireMode() {
        this.isFireMode = true;
        this.fireModeTimer = 10;
        audio.playSpecial();
        triggerHaptic(40);
        damageTexts.push(new DamageText(this.x - 45, this.y - 35, "🔥 MODO FOGO! 🔥", "#ff4500", 18, true));
        shockwaveEffects.push(new ShockwaveEffect(this.x, this.y, 90, '#e67e22', 3.5));
    }

    activateThousandSlashes() {
        this.isThousandSlashes = true;
        this.thousandSlashesTimer = 10;
        this.assassinCharge = 0;
        this.slashTick = 0;
        audio.playSpecial();
        triggerHaptic(40);
        damageTexts.push(new DamageText(this.x - 65, this.y - 35, "⚔️ 1000 CORTES! ⚔️", "#e74c3c", 20, true));
        shockwaveEffects.push(new ShockwaveEffect(this.x, this.y, 100, '#e74c3c', 4));
    }

    activateVampireFrenzy() {
        this.isVampireFrenzy = true;
        this.isImmortal = true;
        this.vampireFrenzyTimer = 5;
        this.vampireCharge = 0;
        this.frenzyTick = 0;
        audio.playVampireRoar();
        triggerHaptic([40, 40, 100]);
        damageTexts.push(new DamageText(this.x - 65, this.y - 40, "🦇 FRENESI IMORTAL! 🦇", "#ff1744", 20, true));
        shockwaveEffects.push(new ShockwaveEffect(this.x, this.y, 100, '#ff1744', 4));
    }

    triggerShadowSummon() {
        this.mageCharge = 0;
        audio.playSpecial();
        triggerHaptic(35);
        updateHUD();
        shadowMinions = [];
        shadowMinions.push(new ShadowMinion(this.x, this.y, 0));
        shadowMinions.push(new ShadowMinion(this.x, this.y, 1));
        damageTexts.push(new DamageText(this.x - 60, this.y - 40, "👥 SOMBRAS!", "#9b59b6", 18, true));
        shockwaveEffects.push(new ShockwaveEffect(this.x, this.y, 75, '#9b59b6', 3.5));
    }

    activateMechaMode() {
        this.isMechaMode = true;
        this.mechaHp = this.mechaMaxHp;
        this.radius = 30;
        audio.playSpecial();
        triggerHaptic(35);
        damageTexts.push(new DamageText(this.x - 65, this.y - 35, "🤖 MECHA TITAN!", "#f1c40f", 20, true));
        shockwaveEffects.push(new ShockwaveEffect(this.x, this.y, 90, '#f1c40f', 4));
        updateHUD();
    }

    triggerSpecialAbility() {
        if (this.type === 'vampiro' && this.vampireCharge >= 100 && !this.isVampireFrenzy) {
            this.activateVampireFrenzy();
        } else if (this.type === 'atirador' && this.mechaCharge >= 100 && !this.isMechaMode) {
            this.activateMechaMode();
        } else if (this.type === 'mago' && this.mageCharge >= 100) {
            this.triggerShadowSummon();
        } else if (this.type === 'assassino' && this.assassinCharge >= 100) {
            this.activateThousandSlashes();
        } else if (this.type === 'guerreiro' && this.fury >= 100 && !this.isFireMode) {
            this.activateFireMode();
        } else {
            this.useAbility();
        }
    }

    takeDamage(amount) {
        if (this.isDashing || this.isImmortal) return;

        const actualDamage = amount * Math.max(0.15, 1 - this.damageReduction);
        triggerHaptic(18);

        if (this.isMechaMode) {
            this.mechaHp -= actualDamage;
            audio.playHit();
            damageTexts.push(new DamageText(this.x, this.y - 15, `-${Math.round(actualDamage)}`, '#f39c12'));
            if (this.mechaHp <= 0) {
                this.isMechaMode = false;
                this.mechaCharge = 0;
                this.radius = 18;
                damageTexts.push(new DamageText(this.x - 55, this.y - 35, "ROBÔ DESTRUÍDO!", "#e74c3c", 17, true));
                shockwaveEffects.push(new ShockwaveEffect(this.x, this.y, 65, '#e74c3c', 3.5));
            }
        } else {
            this.hp -= actualDamage;
            audio.playHit();
            damageTexts.push(new DamageText(this.x, this.y - 10, `-${Math.round(actualDamage)}`, '#e74c3c'));
            if (this.hp <= 0) triggerGameOver();
        }
        updateHUD();
    }

    updateTimers(dt) {
        // Modo Fogo (Guerreiro)
        if (this.isFireMode) {
            this.fireModeTimer -= (dt / 60);
            if (this.fireModeTimer <= 0) {
                this.isFireMode = false;
                this.fury = 0;
                this.fireModeTimer = 0;
            }
        }

        // 1000 Cortes (Assassino)
        if (this.isThousandSlashes) {
            this.thousandSlashesTimer -= (dt / 60);
            this.slashTick += dt;
            if (this.slashTick >= 3) {
                this.slashTick = 0;
                screenShake = 3.5;
                if (slashVisuals.length < 8) {
                    slashVisuals.push(new SlashEffect(undefined, undefined, undefined, 85 + Math.random() * 50, '#ff3838'));
                }
                for (let i = enemies.length - 1; i >= 0; i--) {
                    const enemy = enemies[i];
                    if (enemy) {
                        enemy.takeDamage(18 * this.damageBoost, Math.random() * Math.PI * 2, 2);
                    }
                }
            }
            if (this.thousandSlashesTimer <= 0) {
                this.isThousandSlashes = false;
                this.thousandSlashesTimer = 0;
            }
        }

        // Frenesi Vampírico (Vampiro)
        if (this.isVampireFrenzy) {
            this.vampireFrenzyTimer -= (dt / 60);
            this.frenzyTick += dt;
            if (this.frenzyTick >= 3) {
                this.frenzyTick = 0;
                const auraRadius = 110 * this.areaMultiplier;
                for (let i = enemies.length - 1; i >= 0; i--) {
                    const enemy = enemies[i];
                    if (enemy) {
                        const dist = Math.hypot(this.x - enemy.x, this.y - enemy.y);
                        if (dist < auraRadius + enemy.radius) {
                            const lethalDamage = (enemy.isElite ? 110 : 320) * this.damageBoost;
                            enemy.takeDamage(lethalDamage, Math.atan2(enemy.y - this.y, enemy.x - this.x), 12, true);
                            if (clawVisuals.length < 6) {
                                clawVisuals.push(new ClawSlashEffect(enemy.x, enemy.y, Math.random() * Math.PI * 2, 60));
                            }
                        }
                    }
                }
            }
            if (this.vampireFrenzyTimer <= 0) {
                this.isVampireFrenzy = false;
                this.isImmortal = false;
                this.vampireFrenzyTimer = 0;
            }
        }
    }

    move(dt) {
        this.updateTimers(dt);

        let dx = 0, dy = 0;

        // Analógico Mobile (Prioridade)
        if (joystickActive) {
            dx += joystickVector.x;
            dy += joystickVector.y;
        }

        // Teclado (para testes no desktop)
        if (keys['w'] || keys['W'] || keys['ArrowUp']) dy -= 1;
        if (keys['s'] || keys['S'] || keys['ArrowDown']) dy += 1;
        if (keys['a'] || keys['A'] || keys['ArrowLeft']) dx -= 1;
        if (keys['d'] || keys['D'] || keys['ArrowRight']) dx += 1;

        let currentSpeed = (this.isMechaMode ? this.speed * 0.85 : this.speed) * this.speedBoost;
        
        if (this.isVampireFrenzy) {
            currentSpeed *= 2.2;
            if (dashGhosts.length < 8) {
                dashGhosts.push(new DashGhost(this.x, this.y, this.angle, '#ff1744', this.radius));
            }
        }

        if (this.isDashing) {
            this.x += Math.cos(this.dashAngle) * (currentSpeed * this.dashSpeedMultiplier) * dt;
            this.y += Math.sin(this.dashAngle) * (currentSpeed * this.dashSpeedMultiplier) * dt;
            if (dashGhosts.length < 8) {
                dashGhosts.push(new DashGhost(this.x, this.y, this.angle, this.type === 'vampiro' ? '#ff1744' : '#1abc9c', this.radius));
            }
        } else if (dx !== 0 || dy !== 0) {
            const len = Math.hypot(dx, dy);
            const normX = dx / (len > 1 ? len : 1);
            const normY = dy / (len > 1 ? len : 1);
            this.x += normX * currentSpeed * dt;
            this.y += normY * currentSpeed * dt;

            if (!isMouseDown && !isMobileAttacking) {
                this.angle = Math.atan2(dy, dx);
            }

            if (this.type === 'assassino' && Math.random() < 0.15 && dashGhosts.length < 6) {
                dashGhosts.push(new DashGhost(this.x, this.y, this.angle, '#8e44ad', this.radius));
            }
        }

        this.x = Math.max(this.radius, Math.min(canvasWidth - this.radius, this.x));
        this.y = Math.max(this.radius, Math.min(canvasHeight - this.radius, this.y));

        // Mira Automática para Celular
        if (isMobileAttacking || isMouseDown) {
            let nearestEnemy = null;
            let minDist = 520;
            enemies.forEach(e => {
                const dist = Math.hypot(e.x - this.x, e.y - this.y);
                if (dist < minDist) {
                    minDist = dist;
                    nearestEnemy = e;
                }
            });

            if (nearestEnemy) {
                this.angle = Math.atan2(nearestEnemy.y - this.y, nearestEnemy.x - this.x);
            } else if (isMouseDown) {
                this.angle = Math.atan2(mousePos.y - this.y, mousePos.x - this.x);
            }
        }

        if (this.mana < this.maxMana) {
            this.mana = Math.min(this.maxMana, this.mana + (0.06 * this.manaRegenMultiplier) * dt);
        }
    }

    useAbility() {
        const now = Date.now();
        const realCooldown = (this.isMechaMode ? 140 : this.cooldown) / this.attackSpeedBoost;
        if (now - lastAttackTime < realCooldown) return;

        if (!this.isMechaMode && this.mana < this.manaCost) {
            damageTexts.push(new DamageText(this.x, this.y - 18, "Sem Mana!", "#3498db"));
            return;
        }

        if (!this.isMechaMode) {
            this.mana -= this.manaCost;
        }
        lastAttackTime = now;
        updateHUD();

        const isCrit = Math.random() < this.critChance;
        const finalDamage = this.damage * this.damageBoost * (isCrit ? 2.0 : 1.0);
        if (isCrit) audio.playCrit();

        // CLASSE VAMPIRO
        if (this.type === 'vampiro') {
            audio.playSlash();
            this.isAttacking = true;
            const baseRadius = 75;
            const attackRadius = baseRadius * this.areaMultiplier;

            enemies.forEach(enemy => {
                const dist = Math.hypot(this.x - enemy.x, this.y - enemy.y);
                if (dist < attackRadius + enemy.radius) {
                    const angle = Math.atan2(enemy.y - this.y, enemy.x - this.x);
                    enemy.takeDamage(finalDamage, angle, 8, isCrit);
                    
                    const heal = Math.max(1, Math.round(finalDamage * 0.16));
                    this.hp = Math.min(this.maxHp, this.hp + heal);
                    damageTexts.push(new DamageText(this.x, this.y - 12, `+${heal} HP`, '#2ecc71', 11));
                }
            });

            clawVisuals.push(new ClawSlashEffect(this.x + Math.cos(this.angle) * 25, this.y + Math.sin(this.angle) * 25, this.angle, attackRadius * 1.5));
            
            if (particleEffects.length < 35) {
                for (let i = 0; i < 3; i++) {
                    particleEffects.push(new Particle(this.x + Math.cos(this.angle) * 25, this.y + Math.sin(this.angle) * 25, '#ff1744', 3, 2.5, 10));
                }
            }

            setTimeout(() => { this.isAttacking = false; }, 110);
        }
        else if (this.isMechaMode) {
            audio.playShoot();
            const gunOffset = 18;
            const cos = Math.cos(this.angle);
            const sin = Math.sin(this.angle);
            const xRight = this.x + cos * 20 - sin * gunOffset;
            const yRight = this.y + sin * 20 + cos * gunOffset;
            const xLeft  = this.x + cos * 20 + sin * gunOffset;
            const yLeft  = this.y + sin * 20 - cos * gunOffset;
            
            const spreadAngles = [-0.12, 0, 0.12];
            if (this.extraProjectiles > 0) spreadAngles.push(-0.24, 0.24);

            spreadAngles.forEach(spread => {
                projectiles.push(new Projectile(xRight, yRight, this.angle + spread, 13, finalDamage * 0.75, 'mecha_bullet', isCrit));
                projectiles.push(new Projectile(xLeft, yLeft, this.angle + spread, 13, finalDamage * 0.75, 'mecha_bullet', isCrit));
            });
            screenShake = 2.5;
        }
        else if (this.type === 'guerreiro' || this.type === 'assassino') {
            audio.playSlash();
            this.isAttacking = true;
            const baseRadius = this.type === 'assassino' ? 58 : (this.isFireMode ? 125 : 68);
            const attackRadius = baseRadius * this.areaMultiplier;
            
            enemies.forEach(enemy => {
                const dist = Math.hypot(this.x - enemy.x, this.y - enemy.y);
                if (dist < attackRadius + enemy.radius) {
                    const angle = Math.atan2(enemy.y - this.y, enemy.x - this.x);
                    enemy.takeDamage(finalDamage, angle, 9, isCrit);
                }
            });

            const slashColor = this.isFireMode ? '#ff4500' : (this.type === 'assassino' ? '#e74c3c' : '#66fcf1');
            slashVisuals.push(new SlashEffect(this.x + Math.cos(this.angle) * 25, this.y + Math.sin(this.angle) * 25, this.angle, attackRadius * 1.6, slashColor));

            if (this.extraProjectiles > 0) {
                slashVisuals.push(new SlashEffect(this.x + Math.cos(this.angle) * 45, this.y + Math.sin(this.angle) * 45, this.angle, attackRadius * 1.2, '#f1c40f'));
            }

            setTimeout(() => { this.isAttacking = false; }, 120);
        } 
        else if (this.type === 'mago') {
            audio.playShoot();
            projectiles.push(new Projectile(this.x, this.y, this.angle, 9.0, finalDamage, 'fireball', isCrit));
            if (this.extraProjectiles > 0) {
                for (let i = 1; i <= this.extraProjectiles; i++) {
                    projectiles.push(new Projectile(this.x, this.y, this.angle + i * 0.18, 9.0, finalDamage * 0.85, 'fireball', isCrit));
                    projectiles.push(new Projectile(this.x, this.y, this.angle - i * 0.18, 9.0, finalDamage * 0.85, 'fireball', isCrit));
                }
            }
        } 
        else if (this.type === 'atirador') {
            audio.playShoot();
            projectiles.push(new Projectile(this.x, this.y, this.angle - 0.08, 12, finalDamage, 'arrow', isCrit));
            projectiles.push(new Projectile(this.x, this.y, this.angle + 0.08, 12, finalDamage, 'arrow', isCrit));
            if (this.extraProjectiles > 0) {
                for (let i = 1; i <= this.extraProjectiles; i++) {
                    projectiles.push(new Projectile(this.x, this.y, this.angle + 0.18 * i, 12, finalDamage, 'arrow', isCrit));
                    projectiles.push(new Projectile(this.x, this.y, this.angle - 0.18 * i, 12, finalDamage, 'arrow', isCrit));
                }
            }
        }
    }

    restoreManaOnKill() {
        const amount = this.maxMana * 0.35;
        this.mana = Math.min(this.maxMana, this.mana + amount);
        
        let totalHealPct = this.lifestealPct;
        if (this.type === 'vampiro') totalHealPct += 0.06;

        if (totalHealPct > 0) {
            const heal = Math.round(this.maxHp * totalHealPct);
            this.hp = Math.min(this.maxHp, this.hp + heal);
            damageTexts.push(new DamageText(this.x, this.y - 12, `+${heal} HP`, '#2ecc71', 12));
        }
        updateHUD();
    }

    draw(targetCtx = ctx, isPreview = false) {
        targetCtx.save();
        targetCtx.translate(this.x, this.y);
        targetCtx.rotate(this.angle);

        if (this.isVampireFrenzy) {
            targetCtx.save();
            targetCtx.strokeStyle = '#ff1744';
            targetCtx.lineWidth = 3;
            targetCtx.beginPath();
            targetCtx.arc(0, 0, this.radius + 15, 0, Math.PI * 2);
            targetCtx.stroke();
            targetCtx.fillStyle = 'rgba(255, 23, 68, 0.22)';
            targetCtx.fill();
            targetCtx.restore();
        }

        if (this.isMechaMode) {
            targetCtx.beginPath();
            targetCtx.arc(0, 0, this.radius, 0, Math.PI * 2);
            targetCtx.fillStyle = '#2c3e50';
            targetCtx.fill();
            targetCtx.lineWidth = 3;
            targetCtx.strokeStyle = '#f1c40f';
            targetCtx.stroke();

            targetCtx.beginPath();
            targetCtx.arc(0, 0, 14, 0, Math.PI * 2);
            targetCtx.fillStyle = '#e67e22';
            targetCtx.fill();

            targetCtx.fillStyle = '#7f8c8d';
            targetCtx.fillRect(12, 13, 28, 10);
            targetCtx.fillRect(12, -23, 28, 10);
            targetCtx.fillStyle = '#e74c3c';
            targetCtx.fillRect(40, 15, 4, 6);
            targetCtx.fillRect(40, -21, 4, 6);
        } else {
            if (this.isAttacking && this.type === 'guerreiro') {
                targetCtx.beginPath();
                targetCtx.arc(0, 0, (this.isFireMode ? 125 : 68) * this.areaMultiplier, 0, Math.PI * 2);
                targetCtx.fillStyle = this.isFireMode ? 'rgba(230, 126, 34, 0.4)' : 'rgba(102, 252, 241, 0.22)';
                targetCtx.fill();
            }

            let classColor = '#34495e';
            let outlineColor = '#ffffff';

            if (this.type === 'guerreiro') classColor = '#2c3e50';
            if (this.type === 'mago') classColor = '#3b2875';
            if (this.type === 'atirador') classColor = '#16a085';
            if (this.type === 'assassino') classColor = '#1e272e';
            if (this.type === 'vampiro') {
                classColor = '#3a0d14';
                outlineColor = '#ff1744';
            }

            targetCtx.beginPath();
            targetCtx.arc(0, 0, this.radius, 0, Math.PI * 2);
            targetCtx.fillStyle = classColor;
            targetCtx.fill();
            targetCtx.lineWidth = 2.5;
            targetCtx.strokeStyle = outlineColor;
            targetCtx.stroke();

            if (this.type === 'vampiro') {
                targetCtx.fillStyle = '#ff1744';
                targetCtx.fillRect(10, 4, 12, 3);
                targetCtx.fillRect(10, -7, 12, 3);
                targetCtx.fillStyle = '#ffffff';
                targetCtx.fillRect(9, 2, 2, 3);
                targetCtx.fillRect(13, 2, 2, 3);
            } else {
                targetCtx.fillStyle = '#bdc3c7';
                targetCtx.fillRect(10, 4, 14, 4);
                targetCtx.fillStyle = '#ffffff';
                targetCtx.fillRect(8, -2, 6, 4);
            }

            this.drawHat(targetCtx, this.equippedHat);
        }

        targetCtx.restore();
    }

    drawHat(targetCtx, hatId) {
        const hat = SHOP_HATS.find(h => h.id === hatId);
        if (!hat || hat.type === 'none') return;

        targetCtx.save();
        if (hat.type === 'bandana') {
            targetCtx.fillStyle = hat.color;
            targetCtx.fillRect(-12, -11, 24, 7);
            targetCtx.beginPath();
            targetCtx.moveTo(-12, -8);
            targetCtx.lineTo(-24, -4);
            targetCtx.lineTo(-20, -12);
            targetCtx.closePath();
            targetCtx.fill();
        } 
        else if (hat.type === 'cowboy') {
            targetCtx.fillStyle = hat.color;
            targetCtx.beginPath();
            targetCtx.ellipse(0, -9, 22, 9, 0, 0, Math.PI * 2);
            targetCtx.fill();
            targetCtx.fillStyle = '#5d4037';
            targetCtx.beginPath();
            targetCtx.arc(0, -13, 11, Math.PI, 0);
            targetCtx.fill();
            targetCtx.fillStyle = '#f1c40f';
            targetCtx.fillRect(-10, -12, 20, 3);
        } 
        else if (hat.type === 'hood') {
            targetCtx.fillStyle = hat.color;
            targetCtx.beginPath();
            targetCtx.arc(0, -2, this.radius + 3, Math.PI * 0.75, Math.PI * 2.25);
            targetCtx.fill();
            targetCtx.fillStyle = '#66fcf1';
            targetCtx.fillRect(6, -3, 6, 3);
        } 
        else if (hat.type === 'wizard') {
            targetCtx.fillStyle = hat.color;
            targetCtx.beginPath();
            targetCtx.ellipse(0, -7, 22, 7, 0, 0, Math.PI * 2);
            targetCtx.fill();
            targetCtx.beginPath();
            targetCtx.moveTo(-14, -7);
            targetCtx.lineTo(2, -32);
            targetCtx.lineTo(14, -7);
            targetCtx.closePath();
            targetCtx.fill();
            targetCtx.fillStyle = '#f1c40f';
            targetCtx.beginPath();
            targetCtx.arc(0, -16, 4, 0, Math.PI * 2);
            targetCtx.fill();
        } 
        else if (hat.type === 'pirate') {
            targetCtx.fillStyle = hat.color;
            targetCtx.beginPath();
            targetCtx.moveTo(-20, -6);
            targetCtx.lineTo(0, -24);
            targetCtx.lineTo(20, -6);
            targetCtx.lineTo(0, -10);
            targetCtx.closePath();
            targetCtx.fill();
            targetCtx.strokeStyle = '#f1c40f';
            targetCtx.lineWidth = 1.5;
            targetCtx.stroke();
        } 
        else if (hat.type === 'viking') {
            targetCtx.fillStyle = '#7f8c8d';
            targetCtx.fillRect(-15, -12, 30, 7);
            targetCtx.fillStyle = '#f5f6fa';
            targetCtx.beginPath();
            targetCtx.moveTo(-15, -10);
            targetCtx.quadraticCurveTo(-26, -22, -18, -26);
            targetCtx.lineTo(-13, -12);
            targetCtx.closePath();
            targetCtx.fill();
            targetCtx.beginPath();
            targetCtx.moveTo(15, -10);
            targetCtx.quadraticCurveTo(26, -22, 18, -26);
            targetCtx.lineTo(13, -12);
            targetCtx.closePath();
            targetCtx.fill();
        } 
        else if (hat.type === 'visor') {
            targetCtx.fillStyle = '#00cec9';
            targetCtx.fillRect(4, -7, 14, 6);
        } 
        else if (hat.type === 'samurai') {
            targetCtx.fillStyle = hat.color;
            targetCtx.fillRect(-16, -11, 32, 6);
            targetCtx.strokeStyle = '#f1c40f';
            targetCtx.lineWidth = 3.5;
            targetCtx.beginPath();
            targetCtx.arc(0, -18, 10, 0.2 * Math.PI, 0.8 * Math.PI, true);
            targetCtx.stroke();
        } 
        else if (hat.type === 'demon') {
            targetCtx.fillStyle = '#c0392b';
            targetCtx.beginPath();
            targetCtx.moveTo(-12, -8);
            targetCtx.quadraticCurveTo(-24, -28, -8, -26);
            targetCtx.lineTo(-6, -10);
            targetCtx.closePath();
            targetCtx.fill();
            targetCtx.beginPath();
            targetCtx.moveTo(12, -8);
            targetCtx.quadraticCurveTo(24, -28, 8, -26);
            targetCtx.lineTo(6, -10);
            targetCtx.closePath();
            targetCtx.fill();
        } 
        else if (hat.type === 'halo') {
            targetCtx.strokeStyle = '#f1c40f';
            targetCtx.lineWidth = 3;
            targetCtx.beginPath();
            targetCtx.ellipse(0, -22, 16, 6, 0, 0, Math.PI * 2);
            targetCtx.stroke();
        } 
        else if (hat.type === 'crown') {
            targetCtx.fillStyle = '#f1c40f';
            targetCtx.beginPath();
            targetCtx.moveTo(-14, -9);
            targetCtx.lineTo(-14, -22);
            targetCtx.lineTo(-7, -15);
            targetCtx.lineTo(0, -25);
            targetCtx.lineTo(7, -15);
            targetCtx.lineTo(14, -22);
            targetCtx.lineTo(14, -9);
            targetCtx.closePath();
            targetCtx.fill();
        }
        targetCtx.restore();
    }
}

/* ----------------------------------------------------
   CLASSE DE INIMIGOS
---------------------------------------------------- */
class Enemy {
    constructor(isFast = false, isElite = false, isCreeper = false) {
        this.isElite = isElite;
        this.isFast = isFast;
        this.isCreeper = isCreeper;
        this.radius = isElite ? 26 : (isFast ? 13 : (isCreeper ? 15 : 17));

        if (Math.random() < 0.5) {
            this.x = Math.random() < 0.5 ? -30 : canvasWidth + 30;
            this.y = Math.random() * canvasHeight;
        } else {
            this.x = Math.random() * canvasWidth;
            this.y = Math.random() < 0.5 ? -30 : canvasHeight + 30;
        }

        let baseHp = isElite ? 240 : (isFast ? 42 : (isCreeper ? 50 : 80));
        let baseSpeed = isElite ? 1.6 : (isFast ? 2.8 : (isCreeper ? 2.2 : 1.5));

        this.hp = Math.round(baseHp * enemyHpMultiplier);
        this.maxHp = this.hp;
        this.speed = baseSpeed * enemySpeedMultiplier;

        this.damage = isElite ? 28 : (isFast ? 10 : (isCreeper ? 45 : 16));
        this.color = isElite ? '#8e44ad' : (isCreeper ? '#f1c40f' : (isFast ? '#e67e22' : '#c0392b'));
        
        this.lastHit = 0;
        this.knockbackX = 0;
        this.knockbackY = 0;
        this.hitFlash = 0;
    }

    takeDamage(amount, angle, knockbackForce = 6, isCrit = false) {
        this.hp -= amount;
        this.hitFlash = 4;
        this.knockbackX = Math.cos(angle) * (this.isElite ? knockbackForce * 0.35 : knockbackForce);
        this.knockbackY = Math.sin(angle) * (this.isElite ? knockbackForce * 0.35 : knockbackForce);
        
        const damageColor = isCrit ? "#f1c40f" : "#ff4d4d";
        const displayTxt = isCrit ? `💥 ${Math.round(amount)}` : `${Math.round(amount)}`;
        damageTexts.push(new DamageText(this.x, this.y - 12, displayTxt, damageColor, this.isElite ? 15 : 13, isCrit));

        if (particleEffects.length < 35) {
            for (let i = 0; i < 2; i++) {
                particleEffects.push(new Particle(this.x, this.y, isCrit ? '#f1c40f' : '#e74c3c', 2.8, 2.2, 10));
            }
        }

        if (this.hp <= 0) {
            this.die();
        }
    }

    die() {
        const idx = enemies.indexOf(this);
        if (idx > -1) {
            enemies.splice(idx, 1);
            score += 1;
            waveEnemiesKilled += 1;
            playerData.totalKills += 1;

            if (player) {
                player.restoreManaOnKill();
                player.addSpecialCharge(this.isElite ? 35 : 14);

                if (player.corpseExplosionLevel > 0) {
                    const explosionDmg = 65 * player.corpseExplosionLevel * player.damageBoost;
                    audio.playExplosion();
                    if (shockwaveEffects.length < 10) {
                        shockwaveEffects.push(new ShockwaveEffect(this.x, this.y, 75, '#e67e22', 3.5));
                    }
                    enemies.forEach(other => {
                        const d = Math.hypot(this.x - other.x, this.y - other.y);
                        if (d < 75) {
                            other.takeDamage(explosionDmg, Math.atan2(other.y - this.y, other.x - this.x), 7);
                        }
                    });
                }
            }

            if (shockwaveEffects.length < 10) {
                shockwaveEffects.push(new ShockwaveEffect(this.x, this.y, this.radius * 2, this.color, 2.5));
            }
            
            if (particleEffects.length < 35) {
                for (let i = 0; i < (this.isElite ? 7 : 4); i++) {
                    particleEffects.push(new Particle(this.x, this.y, this.color, 3.5, 2.5, 12));
                }
            }
            
            dropPickups.push(new DropPickup(this.x, this.y, 'coin'));
            if (this.isElite || Math.random() < 0.25) {
                dropPickups.push(new DropPickup(this.x + 10, this.y, 'coin'));
            }
            if (Math.random() < 0.14) {
                dropPickups.push(new DropPickup(this.x - 10, this.y, 'heal'));
            }
            if (Math.random() < 0.14) {
                dropPickups.push(new DropPickup(this.x, this.y + 10, 'mana'));
            }

            checkWaveProgress();
        }
    }

    draw() {
        ctx.save();
        ctx.translate(this.x, this.y);

        ctx.fillStyle = '#c0392b';
        ctx.fillRect(-14, -this.radius - 7, 28, 3.5);
        ctx.fillStyle = '#2ecc71';
        ctx.fillRect(-14, -this.radius - 7, Math.max(0, (this.hp / this.maxHp) * 28), 3.5);

        if (this.isElite) {
            ctx.strokeStyle = '#f1c40f';
            ctx.lineWidth = 2.5;
            ctx.beginPath();
            ctx.arc(0, 0, this.radius + 4, 0, Math.PI * 2);
            ctx.stroke();
        }

        ctx.beginPath();
        ctx.arc(0, 0, this.radius, 0, Math.PI * 2);

        if (this.hitFlash > 0) {
            ctx.fillStyle = '#ffffff';
            this.hitFlash--;
        } else {
            ctx.fillStyle = this.color;
        }
        ctx.fill();
        ctx.lineWidth = 2;
        ctx.strokeStyle = '#000000';
        ctx.stroke();

        if (this.isCreeper) {
            ctx.fillStyle = '#e74c3c';
            ctx.fillRect(-3, -3, 6, 6);
        }

        ctx.restore();
    }

    update(dt) {
        if (!player) return;

        if (Math.abs(this.knockbackX) > 0.1 || Math.abs(this.knockbackY) > 0.1) {
            this.x += this.knockbackX * dt;
            this.y += this.knockbackY * dt;
            this.knockbackX *= Math.pow(0.82, dt);
            this.knockbackY *= Math.pow(0.82, dt);
            return;
        }

        let target = player;
        let minDist = Math.hypot(player.x - this.x, player.y - this.y);
        let targetType = 'player';
        let targetIndex = -1;

        shadowMinions.forEach((sm, idx) => {
            const dist = Math.hypot(sm.x - this.x, sm.y - this.y);
            if (dist < minDist) {
                minDist = dist;
                target = sm;
                targetType = 'shadow';
                targetIndex = idx;
            }
        });

        const angle = Math.atan2(target.y - this.y, target.x - this.x);
        this.x += Math.cos(angle) * this.speed * dt;
        this.y += Math.sin(angle) * this.speed * dt;

        if (minDist < target.radius + this.radius) {
            const now = Date.now();
            if (now - this.lastHit > 750) {
                this.lastHit = now;
                if (targetType === 'player') {
                    player.takeDamage(this.damage);
                } else if (shadowMinions[targetIndex]) {
                    shadowMinions[targetIndex].takeDamage(this.damage);
                }

                if (this.isCreeper) {
                    audio.playExplosion();
                    if (shockwaveEffects.length < 10) {
                        shockwaveEffects.push(new ShockwaveEffect(this.x, this.y, 55, '#f1c40f', 3));
                    }
                    this.die();
                }
            }
        }
    }
}

/* ----------------------------------------------------
   GERENCIADOR DE ONDAS (50 INIMIGOS POR HORDA)
---------------------------------------------------- */
function checkWaveProgress() {
    const waveBar = document.getElementById('wave-bar');
    const waveText = document.getElementById('wave-progress-text');
    const leftText = document.getElementById('wave-enemies-left');
    
    const remaining = Math.max(0, ENEMIES_PER_WAVE - waveEnemiesKilled);
    const pct = Math.min(100, (waveEnemiesKilled / ENEMIES_PER_WAVE) * 100);
    
    if (waveBar) waveBar.style.width = `${pct}%`;
    if (waveText) waveText.innerText = `${waveEnemiesKilled}/${ENEMIES_PER_WAVE}`;
    if (leftText) leftText.innerText = `${remaining}`;

    if (waveEnemiesKilled >= ENEMIES_PER_WAVE && enemies.length === 0 && !isUpgradingWave) {
        triggerWaveUpgrade();
    }
}

function triggerWaveUpgrade() {
    isUpgradingWave = true;
    gamePaused = true;
    audio.playLevelUp();
    triggerHaptic([40, 60, 100]);

    const subtitleEl = document.getElementById('upgrade-modal-subtitle');
    if (subtitleEl) {
        subtitleEl.innerText = `Onda ${waveLevel} Concluída! Você eliminou todos os 50 monstros. Escolha seu poder para a Onda ${waveLevel + 1}:`;
    }
    renderUpgradeCards();
    const modalEl = document.getElementById('upgrade-cards-modal');
    if (modalEl) modalEl.classList.remove('hidden');
}

function renderUpgradeCards() {
    const container = document.getElementById('cards-grid-container');
    if (!container) return;
    container.innerHTML = '';

    const shuffled = [...UPGRADE_CARDS_POOL].sort(() => 0.5 - Math.random());
    const chosenCards = shuffled.slice(0, 3);

    chosenCards.forEach(card => {
        const cardEl = document.createElement('div');
        cardEl.className = `upgrade-card card-${card.rarity}`;
        
        let rarityLabel = 'Comum';
        let rarityColor = '#3498db';
        if (card.rarity === 'rare') { rarityLabel = 'Raro'; rarityColor = '#9b59b6'; }
        if (card.rarity === 'epic') { rarityLabel = 'Épico'; rarityColor = '#e67e22'; }
        if (card.rarity === 'legend') { rarityLabel = 'Lendário'; rarityColor = '#f1c40f'; }

        const currentCount = (player && player.acquiredUpgrades[card.id]) ? player.acquiredUpgrades[card.id] : 0;
        const levelBadge = currentCount > 0 ? `<div style="font-size:0.65rem; color:var(--cyan-bright); margin-bottom:4px;">Nível: ${currentCount} ➔ ${currentCount+1}</div>` : '';

        cardEl.innerHTML = `
            <div class="card-rarity-badge" style="background:${rarityColor}22; color:${rarityColor}; border:1px solid ${rarityColor};">${rarityLabel}</div>
            <div class="card-icon">${card.icon}</div>
            <div class="card-title">${card.name}</div>
            ${levelBadge}
            <div class="card-desc">${card.desc}</div>
            <button class="card-btn">Escolher Habilidade</button>
        `;

        cardEl.onclick = () => selectUpgradeCard(card);
        container.appendChild(cardEl);
    });
}

function selectUpgradeCard(card) {
    audio.playCardSelect();
    triggerHaptic(25);

    if (player) {
        card.apply(player);
        player.acquiredUpgrades[card.id] = (player.acquiredUpgrades[card.id] || 0) + 1;
    }

    const modalEl = document.getElementById('upgrade-cards-modal');
    if (modalEl) modalEl.classList.add('hidden');
    
    waveLevel++;
    waveEnemiesSpawned = 0;
    waveEnemiesKilled = 0;
    enemyHpMultiplier += 0.22;
    enemySpeedMultiplier += 0.06;

    showBannerNotification(`🌊 ONDA ${waveLevel} INICIADA! (50 Monstros)`);
    renderActiveUpgradesHUD();
    updateHUD();

    setTimeout(() => {
        gamePaused = false;
        isUpgradingWave = false;
    }, 400);
}

function renderActiveUpgradesHUD() {
    const bar = document.getElementById('active-upgrades-bar');
    const pauseList = document.getElementById('pause-upgrades-list');
    if (!bar) return;

    bar.innerHTML = '';
    let pauseHtml = '<strong>Melhorias Ativas:</strong><br>';

    if (!player || Object.keys(player.acquiredUpgrades).length === 0) {
        pauseHtml += 'Nenhuma melhoria ainda.';
    } else {
        Object.keys(player.acquiredUpgrades).forEach(cardId => {
            const card = UPGRADE_CARDS_POOL.find(c => c.id === cardId);
            const count = player.acquiredUpgrades[cardId];
            if (card) {
                const badge = document.createElement('div');
                badge.className = 'upgrade-badge';
                badge.innerHTML = `${card.icon} x${count}`;
                bar.appendChild(badge);
                pauseHtml += `${card.icon} ${card.name} (Nvl ${count})<br>`;
            }
        });
    }

    if (pauseList) pauseList.innerHTML = pauseHtml;
}

function showBannerNotification(text) {
    const banner = document.getElementById('banner-notification');
    if (!banner) return;
    banner.innerText = text;
    banner.classList.remove('hidden');
    setTimeout(() => {
        banner.classList.add('hidden');
    }, 2600);
}

function spawnEnemy() {
    if (gameRunning && !gamePaused && waveEnemiesSpawned < ENEMIES_PER_WAVE && enemies.length < 22) {
        waveEnemiesSpawned++;
        const isElite = (waveLevel >= 3 && Math.random() < 0.18);
        const isCreeper = (!isElite && waveLevel >= 2 && Math.random() < 0.22);
        const isFast = (!isElite && !isCreeper && Math.random() > 0.45);
        enemies.push(new Enemy(isFast, isElite, isCreeper));
        updateHUD();
    }
}

/* ----------------------------------------------------
   INTERFACE, LOBBY & LOJA
---------------------------------------------------- */
let shopSelectedHatItem = null;

function openClassSelect() {
    audio.init();
    document.getElementById('lobby-screen').classList.add('hidden');
    document.getElementById('class-select-screen').classList.remove('hidden');
}

function returnToLobbyFromClass() {
    document.getElementById('class-select-screen').classList.add('hidden');
    document.getElementById('lobby-screen').classList.remove('hidden');
    renderLobbyPreview();
}

function openShop() {
    audio.init();
    document.getElementById('lobby-screen').classList.add('hidden');
    document.getElementById('shop-screen').classList.remove('hidden');
    renderShopHats();
}

function closeShop() {
    document.getElementById('shop-screen').classList.add('hidden');
    document.getElementById('lobby-screen').classList.remove('hidden');
    renderLobbyPreview();
}

function renderShopHats() {
    const grid = document.getElementById('shop-items-grid');
    if (!grid) return;
    grid.innerHTML = '';

    SHOP_HATS.forEach(hat => {
        const isUnlocked = playerData.unlockedHats.includes(hat.id) || hat.price === 0;
        const isEquipped = (playerData.equippedHat === hat.id);

        const card = document.createElement('div');
        card.className = `shop-item-card rarity-${hat.rarity} ${isEquipped ? 'equipped' : ''}`;
        card.onclick = () => previewHatInShop(hat);

        let actionBtnHtml = '';
        if (isEquipped) {
            actionBtnHtml = `<button class="btn-shop-action btn-equipped">✓ Equipado</button>`;
        } else if (isUnlocked) {
            actionBtnHtml = `<button class="btn-shop-action btn-equip" onclick="event.stopPropagation(); equipHat('${hat.id}')">Equipar</button>`;
        } else {
            const canAfford = playerData.coins >= hat.price;
            actionBtnHtml = `<button class="btn-shop-action btn-buy" style="${canAfford ? '' : 'opacity:0.6;'}" onclick="event.stopPropagation(); buyHat('${hat.id}', ${hat.price})">🪙 ${hat.price}</button>`;
        }

        card.innerHTML = `
            <div class="item-icon-preview">${hat.icon}</div>
            <div class="shop-item-title">${hat.name}</div>
            <div class="shop-item-desc">${hat.desc}</div>
            ${actionBtnHtml}
        `;

        grid.appendChild(card);
    });

    const current = SHOP_HATS.find(h => h.id === playerData.equippedHat) || SHOP_HATS[0];
    previewHatInShop(current);
}

function previewHatInShop(hat) {
    shopSelectedHatItem = hat;
    const infoEl = document.getElementById('shop-selected-info');
    if (infoEl) {
        infoEl.innerHTML = `
            <div style="font-weight:bold; color:#66fcf1; font-size:0.76rem;">${hat.name}</div>
            <div style="margin:2px 0; color:#f1c40f; font-size:0.65rem;">${hat.rarity.toUpperCase()} &bull; ${hat.price === 0 ? 'Grátis' : hat.price + ' Moedas'}</div>
            <div style="font-size:0.62rem;">${hat.desc}</div>
        `;
    }
    renderShopPreviewCanvas(hat);
}

function buyHat(hatId, price) {
    if (playerData.coins >= price) {
        playerData.coins -= price;
        if (!playerData.unlockedHats.includes(hatId)) {
            playerData.unlockedHats.push(hatId);
        }
        equipHat(hatId);
        audio.playCoin();
        triggerHaptic(20);
        savePlayerData();
        renderShopHats();
    } else {
        alert("Moedas insuficientes! Derrote monstros na arena para coletar mais ouro.");
    }
}

function equipHat(hatId) {
    playerData.equippedHat = hatId;
    audio.playCoin();
    triggerHaptic(15);
    savePlayerData();
    renderShopHats();
    renderLobbyPreview();
}

let previewRotation = 0;

function renderLobbyPreview() {
    const pCanvas = document.getElementById('previewCanvas');
    if (!pCanvas) return;
    const pCtx = pCanvas.getContext('2d');
    pCtx.clearRect(0, 0, pCanvas.width, pCanvas.height);

    const tempPlayer = new Player(playerData.selectedClass);
    tempPlayer.x = pCanvas.width / 2;
    tempPlayer.y = pCanvas.height / 2;
    tempPlayer.angle = previewRotation;
    tempPlayer.equippedHat = playerData.equippedHat;

    tempPlayer.draw(pCtx, true);

    const badge = document.getElementById('preview-class-badge');
    const name = document.getElementById('preview-player-name');
    const hat = document.getElementById('preview-hat-name');
    if (badge) badge.innerText = tempPlayer.className;
    if (name) name.innerText = `Herói ${tempPlayer.className}`;
    const hatObj = SHOP_HATS.find(h => h.id === playerData.equippedHat);
    if (hat) hat.innerText = hatObj ? `${hatObj.icon} ${hatObj.name}` : '❌ Sem Chapéu';
}

function renderShopPreviewCanvas(previewHat) {
    const sCanvas = document.getElementById('shopPreviewCanvas');
    if (!sCanvas) return;
    const sCtx = sCanvas.getContext('2d');
    sCtx.clearRect(0, 0, sCanvas.width, sCanvas.height);

    const tempPlayer = new Player(playerData.selectedClass);
    tempPlayer.x = sCanvas.width / 2;
    tempPlayer.y = sCanvas.height / 2;
    tempPlayer.angle = previewRotation;

    if (previewHat) {
        tempPlayer.equippedHat = previewHat.id;
    }

    tempPlayer.draw(sCtx, true);
}

setInterval(() => {
    previewRotation += 0.03;
    const lobby = document.getElementById('lobby-screen');
    if (lobby && !lobby.classList.contains('hidden')) {
        renderLobbyPreview();
    }
    const shop = document.getElementById('shop-screen');
    if (shop && !shop.classList.contains('hidden')) {
        renderShopPreviewCanvas(shopSelectedHatItem);
    }
}, 33);

function showStatsModal() {
    document.getElementById('stat-high-score').innerText = playerData.highScore;
    document.getElementById('stat-total-kills').innerText = playerData.totalKills;
    document.getElementById('stat-total-coins').innerText = playerData.coins;
    document.getElementById('stat-unlocked-items').innerText = `${playerData.unlockedHats.length}/${SHOP_HATS.length}`;
    document.getElementById('stats-modal').classList.remove('hidden');
}

function hideStatsModal() { document.getElementById('stats-modal').classList.add('hidden'); }
function showControlsModal() { document.getElementById('controls-modal').classList.remove('hidden'); }
function hideControlsModal() { document.getElementById('controls-modal').classList.add('hidden'); }

function toggleAudio() {
    audio.init();
    audio.enabled = !audio.enabled;
    const btn = document.getElementById('audio-toggle-btn');
    if (btn) btn.innerText = audio.enabled ? "🔊 Som: ON" : "🔇 Som: OFF";
}

function togglePauseGame() {
    if (!gameRunning || isUpgradingWave) return;
    gamePaused = !gamePaused;
    const pauseModal = document.getElementById('pause-modal');
    if (gamePaused) {
        renderActiveUpgradesHUD();
        if (pauseModal) pauseModal.classList.remove('hidden');
    } else {
        if (pauseModal) pauseModal.classList.add('hidden');
        lastFrameTime = performance.now();
    }
}

function startGameWithClass(classKey) {
    audio.init();
    resizeGame();
    playerData.selectedClass = classKey;
    savePlayerData();

    document.getElementById('class-select-screen').classList.add('hidden');
    document.getElementById('hud').classList.remove('hidden');
    document.getElementById('controls-hint').classList.remove('hidden');
    document.getElementById('mobile-controls').classList.remove('hidden');

    player = new Player(classKey);
    const avatar = document.getElementById('hud-avatar-icon');
    if (avatar) avatar.innerText = player.classIcon;

    score = 0;
    waveLevel = 1;
    waveEnemiesSpawned = 0;
    waveEnemiesKilled = 0;
    runCoinsEarned = 0;
    elapsedSeconds = 0;
    
    shadowMinions = [];
    screenShake = 0;
    enemyHpMultiplier = 1.0;
    enemySpeedMultiplier = 1.0;
    enemies = [];
    projectiles = [];
    dropPickups = [];
    damageTexts = [];
    slashVisuals = [];
    clawVisuals = [];
    particleEffects = [];
    shockwaveEffects = [];
    dashGhosts = [];

    renderActiveUpgradesHUD();
    updateHUD();

    gameRunning = true;
    gamePaused = false;
    isUpgradingWave = false;
    lastFrameTime = performance.now();

    if (spawnInterval) clearInterval(spawnInterval);
    spawnInterval = setInterval(spawnEnemy, 850);

    if (timerInterval) clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        if (gameRunning && !gamePaused) {
            elapsedSeconds++;
            const mins = String(Math.floor(elapsedSeconds / 60)).padStart(2, '0');
            const secs = String(elapsedSeconds % 60).padStart(2, '0');
            const timeEl = document.getElementById('final-time');
            if (timeEl) timeEl.innerText = `${mins}:${secs}`;
        }
    }, 1000);

    requestAnimationFrame(gameLoop);
}

function triggerGameOver() {
    gameRunning = false;
    clearInterval(spawnInterval);
    clearInterval(timerInterval);

    audio.playGameOver();
    triggerHaptic([50, 50, 150]);

    if (score > playerData.highScore) {
        playerData.highScore = score;
    }
    savePlayerData();

    const mins = String(Math.floor(elapsedSeconds / 60)).padStart(2, '0');
    const secs = String(elapsedSeconds % 60).padStart(2, '0');

    document.getElementById('final-score').innerText = score;
    document.getElementById('final-coins').innerText = `+${runCoinsEarned} 🪙`;
    document.getElementById('final-time').innerText = `${mins}:${secs}`;
    document.getElementById('final-wave').innerText = waveLevel;

    document.getElementById('hud').classList.add('hidden');
    document.getElementById('mobile-controls').classList.add('hidden');
    document.getElementById('game-over-screen').classList.remove('hidden');
}

function restartGame() {
    document.getElementById('game-over-screen').classList.add('hidden');
    startGameWithClass(playerData.selectedClass);
}

function goToLobbyFromGame() {
    gameRunning = false;
    gamePaused = false;
    isUpgradingWave = false;
    clearInterval(spawnInterval);
    clearInterval(timerInterval);

    document.getElementById('upgrade-cards-modal').classList.add('hidden');
    document.getElementById('pause-modal').classList.add('hidden');
    document.getElementById('game-over-screen').classList.add('hidden');
    document.getElementById('hud').classList.add('hidden');
    document.getElementById('mobile-controls').classList.add('hidden');
    document.getElementById('lobby-screen').classList.remove('hidden');
    renderLobbyPreview();
}

/* ----------------------------------------------------
   ATUALIZAÇÃO DO HUD MOBILE
---------------------------------------------------- */
function updateHUD() {
    if (player) {
        // Barra de HP
        const hpBar = document.getElementById('hp-bar');
        const hpText = document.getElementById('hp-text');
        if (hpBar && hpText) {
            if (player.isMechaMode) {
                hpBar.style.width = `${Math.max(0, (player.mechaHp / player.mechaMaxHp) * 100)}%`;
                hpText.innerText = `${Math.max(0, Math.round(player.mechaHp))}`;
            } else {
                hpBar.style.width = `${Math.max(0, (player.hp / player.maxHp) * 100)}%`;
                hpText.innerText = `${Math.max(0, Math.round(player.hp))}`;
            }
        }

        // Barra de Mana
        const manaBar = document.getElementById('mana-bar');
        const manaText = document.getElementById('mana-text');
        if (manaBar && manaText) {
            manaBar.style.width = `${Math.max(0, (player.mana / player.maxMana) * 100)}%`;
            manaText.innerText = `${Math.max(0, Math.round(player.mana))}`;
        }

        // Barra Especial Mobile
        const spBar = document.getElementById('special-bar-fill');
        const spLabel = document.getElementById('special-bar-label');
        const spText = document.getElementById('special-bar-text');
        const specialBtn = document.getElementById('btn-special');
        const specialBtnLabel = document.getElementById('mobile-special-label');

        if (spBar && spLabel && spText && specialBtn && specialBtnLabel) {
            if (player.type === 'vampiro') {
                spLabel.innerText = "BAT";
                spLabel.style.color = "#ff1744";
                spBar.style.background = "linear-gradient(90deg, #b71c1c, #ff1744)";
                if (player.isVampireFrenzy) {
                    spBar.style.width = `${(player.vampireFrenzyTimer / 5) * 100}%`;
                    spText.innerText = `${Math.ceil(player.vampireFrenzyTimer)}s`;
                    specialBtnLabel.innerText = `${Math.ceil(player.vampireFrenzyTimer)}s`;
                    specialBtn.classList.remove('charged');
                } else {
                    spBar.style.width = `${player.vampireCharge}%`;
                    spText.innerText = `${Math.round(player.vampireCharge)}%`;
                    specialBtnLabel.innerText = `${Math.round(player.vampireCharge)}%`;
                    specialBtn.classList.toggle('charged', player.vampireCharge >= 100);
                }
            } else if (player.type === 'guerreiro') {
                spLabel.innerText = "FÚR";
                spLabel.style.color = "#e67e22";
                spBar.style.background = "linear-gradient(90deg, #d35400, #f39c12)";
                if (player.isFireMode) {
                    spBar.style.width = `${(player.fireModeTimer / 10) * 100}%`;
                    spText.innerText = `${Math.ceil(player.fireModeTimer)}s`;
                    specialBtnLabel.innerText = `${Math.ceil(player.fireModeTimer)}s`;
                    specialBtn.classList.remove('charged');
                } else {
                    spBar.style.width = `${player.fury}%`;
                    spText.innerText = `${Math.round(player.fury)}%`;
                    specialBtnLabel.innerText = `${Math.round(player.fury)}%`;
                    specialBtn.classList.toggle('charged', player.fury >= 100);
                }
            } else if (player.type === 'atirador') {
                spLabel.innerText = "BOT";
                spLabel.style.color = "#f1c40f";
                spBar.style.background = "linear-gradient(90deg, #f39c12, #f1c40f)";
                if (player.isMechaMode) {
                    spBar.style.width = `${(player.mechaHp / player.mechaMaxHp) * 100}%`;
                    spText.innerText = "ATIVO";
                    specialBtnLabel.innerText = "ROBÔ";
                    specialBtn.classList.remove('charged');
                } else {
                    spBar.style.width = `${player.mechaCharge}%`;
                    spText.innerText = `${Math.round(player.mechaCharge)}%`;
                    specialBtnLabel.innerText = `${Math.round(player.mechaCharge)}%`;
                    specialBtn.classList.toggle('charged', player.mechaCharge >= 100);
                }
            } else if (player.type === 'mago') {
                spLabel.innerText = "ARC";
                spLabel.style.color = "#9b59b6";
                spBar.style.background = "linear-gradient(90deg, #8e44ad, #bb86fc)";
                spBar.style.width = `${player.mageCharge}%`;
                spText.innerText = `${Math.round(player.mageCharge)}%`;
                specialBtnLabel.innerText = `${Math.round(player.mageCharge)}%`;
                specialBtn.classList.toggle('charged', player.mageCharge >= 100);
            } else if (player.type === 'assassino') {
                spLabel.innerText = "COR";
                spLabel.style.color = "#e74c3c";
                spBar.style.background = "linear-gradient(90deg, #c0392b, #e74c3c)";
                if (player.isThousandSlashes) {
                    spBar.style.width = `${(player.thousandSlashesTimer / 10) * 100}%`;
                    spText.innerText = `${Math.ceil(player.thousandSlashesTimer)}s`;
                    specialBtnLabel.innerText = `${Math.ceil(player.thousandSlashesTimer)}s`;
                    specialBtn.classList.remove('charged');
                } else {
                    spBar.style.width = `${player.assassinCharge}%`;
                    spText.innerText = `${Math.round(player.assassinCharge)}%`;
                    specialBtnLabel.innerText = `${Math.round(player.assassinCharge)}%`;
                    specialBtn.classList.toggle('charged', player.assassinCharge >= 100);
                }
            }
        }

        // Onda e Progresso de Inimigos
        const waveBar = document.getElementById('wave-bar');
        const waveText = document.getElementById('wave-progress-text');
        const leftText = document.getElementById('wave-enemies-left');
        const diffText = document.getElementById('difficulty-text');
        const pct = Math.min(100, (waveEnemiesKilled / ENEMIES_PER_WAVE) * 100);
        
        if (waveBar) waveBar.style.width = `${pct}%`;
        if (waveText) waveText.innerText = `${waveEnemiesKilled}/${ENEMIES_PER_WAVE}`;
        if (leftText) leftText.innerText = `${Math.max(0, ENEMIES_PER_WAVE - waveEnemiesKilled)}`;
        if (diffText) diffText.innerText = `${waveLevel}`;
    }

    const scoreEl = document.getElementById('score-text');
    if (scoreEl) scoreEl.innerText = score;
    updateCurrencyDisplays();
}

/* ----------------------------------------------------
   CONTROLES TOUCH / JOYSTICK MULTI-TOQUE ERGONÔMICOS
---------------------------------------------------- */
function initTouchControls() {
    const joystickZone = document.getElementById('joystick-zone');
    const joystickBase = document.getElementById('joystick-base');
    const joystickStick = document.getElementById('joystick-stick');
    const btnAttack = document.getElementById('btn-attack');
    const btnDash = document.getElementById('btn-dash');
    const btnSpecial = document.getElementById('btn-special');

    if (!joystickZone || !joystickBase || !joystickStick) return;

    joystickZone.addEventListener('touchstart', (e) => {
        e.preventDefault();
        audio.init();
        const touch = e.changedTouches[0];
        joystickTouchId = touch.identifier;
        joystickActive = true;

        const rect = joystickBase.getBoundingClientRect();
        joystickCenter = {
            x: rect.left + rect.width / 2,
            y: rect.top + rect.height / 2
        };

        updateJoystickPosition(touch.clientX, touch.clientY);
    }, { passive: false });

    window.addEventListener('touchmove', (e) => {
        if (!joystickActive) return;
        for (let i = 0; i < e.changedTouches.length; i++) {
            const touch = e.changedTouches[i];
            if (touch.identifier === joystickTouchId) {
                e.preventDefault();
                updateJoystickPosition(touch.clientX, touch.clientY);
                break;
            }
        }
    }, { passive: false });

    const endJoystick = (e) => {
        for (let i = 0; i < e.changedTouches.length; i++) {
            if (e.changedTouches[i].identifier === joystickTouchId) {
                joystickActive = false;
                joystickTouchId = null;
                joystickVector = { x: 0, y: 0 };
                joystickStick.style.transform = `translate3d(0px, 0px, 0px)`;
                break;
            }
        }
    };

    window.addEventListener('touchend', endJoystick);
    window.addEventListener('touchcancel', endJoystick);

    function updateJoystickPosition(touchX, touchY) {
        const dx = touchX - joystickCenter.x;
        const dy = touchY - joystickCenter.y;
        const dist = Math.hypot(dx, dy);
        const angle = Math.atan2(dy, dx);

        const clampedDist = Math.min(dist, JOYSTICK_MAX_RADIUS);
        const stickX = Math.cos(angle) * clampedDist;
        const stickY = Math.sin(angle) * clampedDist;

        joystickStick.style.transform = `translate3d(${stickX}px, ${stickY}px, 0px)`;
        joystickVector = {
            x: stickX / JOYSTICK_MAX_RADIUS,
            y: stickY / JOYSTICK_MAX_RADIUS
        };
    }

    // BOTÃO DE ATAQUE COM AUTO-DISPARO CONTÍNUO AO SEGURAR
    if (btnAttack) {
        btnAttack.addEventListener('touchstart', (e) => {
            e.preventDefault();
            audio.init();
            isMobileAttacking = true;
            btnAttack.classList.add('pressed');
            triggerHaptic(15);
            if (player && gameRunning && !gamePaused) player.useAbility();
        }, { passive: false });

        const endAttack = (e) => {
            e.preventDefault();
            isMobileAttacking = false;
            btnAttack.classList.remove('pressed');
        };
        btnAttack.addEventListener('touchend', endAttack, { passive: false });
        btnAttack.addEventListener('touchcancel', endAttack, { passive: false });
    }

    // DASH
    if (btnDash) {
        btnDash.addEventListener('touchstart', (e) => {
            e.preventDefault();
            audio.init();
            btnDash.classList.add('pressed');
            if (player && gameRunning && !gamePaused) player.dash();
        }, { passive: false });

        const endDash = (e) => {
            e.preventDefault();
            btnDash.classList.remove('pressed');
        };
        btnDash.addEventListener('touchend', endDash, { passive: false });
        btnDash.addEventListener('touchcancel', endDash, { passive: false });
    }

    // ESPECIAL
    if (btnSpecial) {
        btnSpecial.addEventListener('touchstart', (e) => {
            e.preventDefault();
            audio.init();
            btnSpecial.classList.add('pressed');
            if (player && gameRunning && !gamePaused) player.triggerSpecialAbility();
        }, { passive: false });

        const endSpecial = (e) => {
            e.preventDefault();
            btnSpecial.classList.remove('pressed');
        };
        btnSpecial.addEventListener('touchend', endSpecial, { passive: false });
        btnSpecial.addEventListener('touchcancel', endSpecial, { passive: false });
    }
}

// TOQUE DIRETO NO CANVÁS (MIRA OU DISPARO DIRETO)
canvas.addEventListener('touchstart', (e) => {
    audio.init();
    if (gameRunning && !gamePaused && e.touches.length > 0) {
        const touch = e.touches[0];
        mousePos.x = touch.clientX;
        mousePos.y = touch.clientY;
        if (player && !isMobileAttacking) {
            player.angle = Math.atan2(touch.clientY - player.y, touch.clientX - player.x);
            player.useAbility();
        }
    }
}, { passive: true });

// CONTROLES DE BACKUP (MOUSE E TECLADO PARA COMPUTADOR)
canvas.addEventListener('mousemove', (e) => {
    mousePos.x = e.clientX;
    mousePos.y = e.clientY;
});

canvas.addEventListener('mousedown', (e) => {
    audio.init();
    if (e.button === 0 && gameRunning && !gamePaused) {
        isMouseDown = true;
        if (player) player.useAbility();
    } else if (e.button === 2 && gameRunning && !gamePaused) {
        if (player) player.dash();
    }
});

canvas.addEventListener('mouseup', () => { isMouseDown = false; });
canvas.addEventListener('contextmenu', (e) => e.preventDefault());

window.addEventListener('keydown', (e) => {
    keys[e.key] = true;
    audio.init();
    if (e.code === 'Space' && gameRunning && !gamePaused) {
        if (player) player.useAbility();
    }
    if ((e.code === 'ShiftLeft' || e.code === 'ShiftRight') && gameRunning && !gamePaused) {
        if (player) player.dash();
    }
    if ((e.key === 'e' || e.key === 'E') && gameRunning && !gamePaused) {
        if (player) player.triggerSpecialAbility();
    }
    if (e.key === 'Escape' || e.key === 'p' || e.key === 'P') {
        togglePauseGame();
    }
});

window.addEventListener('keyup', (e) => { keys[e.key] = false; });

// PAUSA AUTOMÁTICA AO MINIMIZAR / MUDAR DE ABA
document.addEventListener('visibilitychange', () => {
    if (document.hidden && gameRunning && !gamePaused && !isUpgradingWave) {
        togglePauseGame();
    }
});

/* ----------------------------------------------------
   LOOP PRINCIPAL DO JOGO COM DELTA TIME
---------------------------------------------------- */
function gameLoop(currentTime) {
    if (!gameRunning) return;

    const deltaMs = currentTime - lastFrameTime;
    lastFrameTime = currentTime;
    
    // Normalização para 60 FPS (16.67ms por frame)
    let dt = deltaMs / 16.667;
    if (dt > 3.0) dt = 1.0; // Evita saltos colossais se o app for suspenso
    if (dt < 0.1) dt = 0.1;

    if (!gamePaused) {
        // Disparo contínuo com mira automática ao segurar
        if ((isMouseDown || isMobileAttacking) && player) {
            player.useAbility();
        }

        ctx.save();

        if (screenShake > 0) {
            ctx.translate((Math.random() - 0.5) * screenShake, (Math.random() - 0.5) * screenShake);
            screenShake *= Math.pow(0.88, dt);
            if (screenShake < 0.3) screenShake = 0;
        }

        // Fundo da Arena
        ctx.fillStyle = '#0b0f16';
        ctx.fillRect(-20, -20, canvasWidth + 40, canvasHeight + 40);

        // Grade sutil da arena
        ctx.strokeStyle = 'rgba(102, 252, 241, 0.035)';
        ctx.lineWidth = 1;
        for (let x = 0; x < canvasWidth; x += 48) {
            ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, canvasHeight); ctx.stroke();
        }
        for (let y = 0; y < canvasHeight; y += 48) {
            ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(canvasWidth, y); ctx.stroke();
        }

        // Alerta de Vida Crítica ou Frenesi
        if (player && (player.hp < player.maxHp * 0.3 || player.isVampireFrenzy)) {
            ctx.fillStyle = player.isVampireFrenzy ? 'rgba(255, 23, 68, 0.12)' : 'rgba(231, 76, 60, 0.1)';
            ctx.fillRect(0, 0, canvasWidth, canvasHeight);
        }

        // Rastros do Dash / Frenesi
        for (let i = dashGhosts.length - 1; i >= 0; i--) {
            dashGhosts[i].update(dt);
            dashGhosts[i].draw();
            if (dashGhosts[i].life <= 0) dashGhosts.splice(i, 1);
        }

        // Ondas de Choque
        for (let i = shockwaveEffects.length - 1; i >= 0; i--) {
            shockwaveEffects[i].update(dt);
            shockwaveEffects[i].draw();
            if (shockwaveEffects[i].life <= 0) shockwaveEffects.splice(i, 1);
        }

        // Coletáveis (Moedas e Poções)
        for (let i = dropPickups.length - 1; i >= 0; i--) {
            if (!dropPickups[i].update(dt)) {
                dropPickups.splice(i, 1);
            } else {
                dropPickups[i].draw();
            }
        }

        // Projéteis
        for (let i = projectiles.length - 1; i >= 0; i--) {
            projectiles[i].update(dt);
            projectiles[i].draw();
            if (projectiles[i].markedForDeletion) projectiles.splice(i, 1);
        }

        // Partículas
        for (let i = particleEffects.length - 1; i >= 0; i--) {
            particleEffects[i].update(dt);
            particleEffects[i].draw();
            if (particleEffects[i].life <= 0) particleEffects.splice(i, 1);
        }

        // Jogador
        player.move(dt);
        player.draw();

        // Sombras do Mago
        for (let i = shadowMinions.length - 1; i >= 0; i--) {
            shadowMinions[i].update(dt);
            shadowMinions[i].draw();
        }

        // Inimigos
        for (let i = 0; i < enemies.length; i++) {
            enemies[i].update(dt);
            enemies[i].draw();
        }

        // Efeitos de Garras e Cortes
        for (let i = clawVisuals.length - 1; i >= 0; i--) {
            clawVisuals[i].update(dt);
            clawVisuals[i].draw();
            if (clawVisuals[i].life <= 0) clawVisuals.splice(i, 1);
        }

        for (let i = slashVisuals.length - 1; i >= 0; i--) {
            slashVisuals[i].update(dt);
            slashVisuals[i].draw();
            if (slashVisuals[i].life <= 0) slashVisuals.splice(i, 1);
        }

        // Números de Dano
        for (let i = damageTexts.length - 1; i >= 0; i--) {
            damageTexts[i].update(dt);
            damageTexts[i].draw();
            if (damageTexts[i].life <= 0) damageTexts.splice(i, 1);
        }

        ctx.restore();
    }

    requestAnimationFrame(gameLoop);
}

/* ----------------------------------------------------
   INICIALIZAÇÃO DO APP
---------------------------------------------------- */
window.addEventListener('DOMContentLoaded', () => {
    loadSavedData();
    resizeGame();
    initTouchControls();
    renderLobbyPreview();
    
    // Desbloqueia o áudio no primeiro toque em qualquer lugar
    window.addEventListener('touchstart', () => audio.init(), { once: true });
    window.addEventListener('click', () => audio.init(), { once: true });
});
