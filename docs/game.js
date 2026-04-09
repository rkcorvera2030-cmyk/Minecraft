// ==================== ENUMS ====================
const BlockType = {
    AIR: 0,
    STONE: 1,
    DIRT: 2,
    GRASS: 3,
    OAK_LOG: 4,
    OAK_LEAVES: 5,
    SAND: 6,
    GRAVEL: 7,
    GOLD_ORE: 8,
    IRON_ORE: 9,
    DIAMOND_ORE: 10,
    LAVA: 11,
    WATER: 12,
    NETHERRACK: 13,
    SOUL_SAND: 14,
    GLOWSTONE: 15,
    BEDROCK: 16
};

const BlockNames = {
    0: 'Air',
    1: 'Stone',
    2: 'Dirt',
    3: 'Grass',
    4: 'Oak Log',
    5: 'Oak Leaves',
    6: 'Sand',
    7: 'Gravel',
    8: 'Gold Ore',
    9: 'Iron Ore',
    10: 'Diamond Ore',
    11: 'Lava',
    12: 'Water',
    13: 'Netherrack',
    14: 'Soul Sand',
    15: 'Glowstone',
    16: 'Bedrock'
};

const ItemType = {
    WOODEN_PICKAXE: 1,
    STONE_PICKAXE: 2,
    IRON_PICKAXE: 3,
    DIAMOND_PICKAXE: 4,
    WOODEN_AXE: 5,
    STONE_AXE: 6,
    IRON_AXE: 7,
    WOOD: 8,
    STONE: 9,
    IRON_INGOT: 10,
    DIAMOND: 11,
    GOLD_INGOT: 12,
    APPLE: 13,
    COOKED_BEEF: 14
};

const ItemNames = {
    1: 'Wooden Pickaxe',
    2: 'Stone Pickaxe',
    3: 'Iron Pickaxe',
    4: 'Diamond Pickaxe',
    5: 'Wooden Axe',
    6: 'Stone Axe',
    7: 'Iron Axe',
    8: 'Wood',
    9: 'Stone',
    10: 'Iron Ingot',
    11: 'Diamond',
    12: 'Gold Ingot',
    13: 'Apple',
    14: 'Cooked Beef'
};

const MobType = {
    ZOMBIE: 1,
    SKELETON: 2,
    CREEPER: 3,
    ENDERMAN: 4,
    PIGMAN: 5,
    COW: 6,
    PIG: 7,
    SHEEP: 8
};

const MobNames = {
    1: 'Zombie',
    2: 'Skeleton',
    3: 'Creeper',
    4: 'Enderman',
    5: 'Pigman',
    6: 'Cow',
    7: 'Pig',
    8: 'Sheep'
};

const Dimension = {
    OVERWORLD: 1,
    NETHER: 2
};

const DimensionNames = {
    1: 'Overworld',
    2: 'Nether'
};

// ==================== CLASSES ====================
class Block {
    constructor(type = BlockType.AIR, metadata = 0) {
        this.type = type;
        this.metadata = metadata;
    }
    
    isSolid() {
        return this.type !== BlockType.AIR && this.type !== BlockType.WATER && this.type !== BlockType.LAVA;
    }
    
    getHardness() {
        const hardness = {
            [BlockType.STONE]: 1.5,
            [BlockType.DIRT]: 0.5,
            [BlockType.GRASS]: 0.6,
            [BlockType.OAK_LOG]: 2.0,
            [BlockType.SAND]: 0.5,
            [BlockType.GRAVEL]: 0.6,
            [BlockType.GOLD_ORE]: 3.0,
            [BlockType.IRON_ORE]: 1.5,
            [BlockType.DIAMOND_ORE]: 3.0,
            [BlockType.NETHERRACK]: 0.4,
            [BlockType.SOUL_SAND]: 0.5,
            [BlockType.BEDROCK]: -1
        };
        return hardness[this.type] || 0;
    }
    
    getColor() {
        const colors = {
            [BlockType.AIR]: 0x87CEEB,
            [BlockType.STONE]: 0x808080,
            [BlockType.DIRT]: 0x8B4513,
            [BlockType.GRASS]: 0x228B22,
            [BlockType.OAK_LOG]: 0x654321,
            [BlockType.OAK_LEAVES]: 0x228B22,
            [BlockType.SAND]: 0xFFD700,
            [BlockType.GRAVEL]: 0xA9A9A9,
            [BlockType.GOLD_ORE]: 0xFFD700,
            [BlockType.IRON_ORE]: 0xC0C0C0,
            [BlockType.DIAMOND_ORE]: 0x00FFFF,
            [BlockType.LAVA]: 0xFF4500,
            [BlockType.WATER]: 0x1E90FF,
            [BlockType.NETHERRACK]: 0x8B0000,
            [BlockType.SOUL_SAND]: 0x654321,
            [BlockType.GLOWSTONE]: 0xFFFF00,
            [BlockType.BEDROCK]: 0x1a1a1a
        };
        return colors[this.type] || 0xFFFFFF;
    }
}

class Item {
    constructor(type, stackSize = 1) {
        this.type = type;
        this.stackSize = stackSize;
    }
    
    getToolType() {
        const tools = {
            [ItemType.WOODEN_PICKAXE]: 'pickaxe',
            [ItemType.STONE_PICKAXE]: 'pickaxe',
            [ItemType.IRON_PICKAXE]: 'pickaxe',
            [ItemType.DIAMOND_PICKAXE]: 'pickaxe',
            [ItemType.WOODEN_AXE]: 'axe',
            [ItemType.STONE_AXE]: 'axe',
            [ItemType.IRON_AXE]: 'axe'
        };
        return tools[this.type] || null;
    }
    
    getToolSpeed() {
        const speeds = {
            [ItemType.WOODEN_PICKAXE]: 1.0,
            [ItemType.STONE_PICKAXE]: 1.2,
            [ItemType.IRON_PICKAXE]: 1.5,
            [ItemType.DIAMOND_PICKAXE]: 2.0,
            [ItemType.WOODEN_AXE]: 0.9,
            [ItemType.STONE_AXE]: 1.1,
            [ItemType.IRON_AXE]: 1.4
        };
        return speeds[this.type] || 0;
    }
}

class Mob {
    constructor(type, x, y, z) {
        this.type = type;
        this.x = x;
        this.y = y;
        this.z = z;
        this.maxHealth = type === MobType.ZOMBIE || type === MobType.SKELETON ? 20 : 
                        type === MobType.CREEPER ? 20 : 40;
        this.health = this.maxHealth;
        this.mesh = null;
        this.hostile = [MobType.ZOMBIE, MobType.SKELETON, MobType.CREEPER, MobType.ENDERMAN, MobType.PIGMAN].includes(type);
    }
    
    takeDamage(amount) {
        this.health = Math.max(0, this.health - amount);
    }
    
    isAlive() {
        return this.health > 0;
    }
    
    getDrops() {
        const drops = {
            [MobType.ZOMBIE]: [{ type: ItemType.COOKED_BEEF, count: Math.floor(Math.random() * 3) }],
            [MobType.SKELETON]: [{ type: ItemType.STONE, count: Math.floor(Math.random() * 3) + 1 }],
            [MobType.CREEPER]: [{ type: ItemType.STONE, count: Math.floor(Math.random() * 2) + 1 }],
            [MobType.ENDERMAN]: [{ type: ItemType.DIAMOND, count: Math.floor(Math.random() * 2) }],
            [MobType.PIGMAN]: [{ type: ItemType.GOLD_INGOT, count: Math.floor(Math.random() * 2) + 1 }],
            [MobType.COW]: [{ type: ItemType.COOKED_BEEF, count: Math.floor(Math.random() * 3) + 1 }],
            [MobType.PIG]: [{ type: ItemType.COOKED_BEEF, count: Math.floor(Math.random() * 2) + 1 }],
            [MobType.SHEEP]: [{ type: ItemType.WOOD, count: Math.floor(Math.random() * 2) + 1 }]
        };
        return drops[this.type] || [];
    }
}

class Player {
    constructor(name = "Steve") {
        this.name = name;
        this.x = 8;
        this.y = 70;
        this.z = 8;
        this.health = 20;
        this.hunger = 20;
        this.inventory = [];
        this.selectedSlot = 0;
        this.dimension = Dimension.OVERWORLD;
        this.velocityY = 0;
        this.isGrounded = false;
    }
    
    takeDamage(amount) {
        this.health = Math.max(0, this.health - amount);
    }
    
    heal(amount) {
        this.health = Math.min(20, this.health + amount);
    }
    
    addItem(item) {
        if (this.inventory.length < 36) {
            this.inventory.push(item);
            return true;
        }
        return false;
    }
    
    getSelectedItem() {
        return this.inventory[this.selectedSlot] || null;
    }
    
    isAlive() {
        return this.health > 0;
    }
}

class World {
    constructor(seed = 42) {
        this.seed = seed;
        this.chunks = new Map();
        this.mobs = [];
        this.chunkSize = 16;
        this.chunkHeight = 256;
        this.meshes = new Map();
    }
    
    generateChunk(chunkX, chunkZ, dimension) {
        const chunk = [];
        
        for (let x = 0; x < this.chunkSize; x++) {
            chunk[x] = [];
            for (let y = 0; y < this.chunkHeight; y++) {
                chunk[x][y] = [];
                for (let z = 0; z < this.chunkSize; z++) {
                    if (dimension === Dimension.OVERWORLD) {
                        chunk[x][y][z] = this.generateOverworldBlock(chunkX, chunkZ, x, y, z);
                    } else {
                        chunk[x][y][z] = this.generateNetherBlock(chunkX, chunkZ, x, y, z);
                    }
                }
            }
        }
        
        if (dimension === Dimension.OVERWORLD) {
            this.spawnMobsOverworld(chunkX, chunkZ);
        } else {
            this.spawnMobsNether(chunkX, chunkZ);
        }
        
        return chunk;
    }
    
    generateOverworldBlock(chunkX, chunkZ, x, y, z) {
        const worldX = chunkX * this.chunkSize + x;
        const worldZ = chunkZ * this.chunkSize + z;
        
        if (y === 0) return new Block(BlockType.BEDROCK);
        
        const height = 64 + Math.floor(20 * (Math.random() - 0.5));
        
        if (y < height - 4) {
            if (y < 10) return new Block(BlockType.STONE);
            if (Math.random() < 0.05) return new Block(BlockType.IRON_ORE);
            if (Math.random() < 0.02) return new Block(BlockType.GOLD_ORE);
            if (Math.random() < 0.01) return new Block(BlockType.DIAMOND_ORE);
            return new Block(BlockType.DIRT);
        } else if (y === height - 4 || y === height - 3 || y === height - 2) {
            return new Block(BlockType.DIRT);
        } else if (y === height - 1) {
            return new Block(BlockType.GRASS);
        }
        
        return new Block(BlockType.AIR);
    }
    
    generateNetherBlock(chunkX, chunkZ, x, y, z) {
        if (y === 0) return new Block(BlockType.BEDROCK);
        if (y > 120) return new Block(BlockType.AIR);
        
        if (Math.random() < 0.02) return new Block(BlockType.LAVA);
        if (Math.random() < 0.03) return new Block(BlockType.SOUL_SAND);
        if (Math.random() < 0.01) return new Block(BlockType.GLOWSTONE);
        
        return new Block(BlockType.NETHERRACK);
    }
    
    spawnMobsOverworld(chunkX, chunkZ) {
        for (let i = 0; i < Math.floor(Math.random() * 4) + 2; i++) {
            const x = chunkX * this.chunkSize + Math.random() * this.chunkSize;
            const z = chunkZ * this.chunkSize + Math.random() * this.chunkSize;
            const types = [MobType.ZOMBIE, MobType.SKELETON, MobType.CREEPER, MobType.COW, MobType.PIG];
            const mobType = types[Math.floor(Math.random() * types.length)];
            this.mobs.push(new Mob(mobType, x, 70, z));
        }
    }
    
    spawnMobsNether(chunkX, chunkZ) {
        for (let i = 0; i < Math.floor(Math.random() * 6) + 3; i++) {
            const x = chunkX * this.chunkSize + Math.random() * this.chunkSize;
            const z = chunkZ * this.chunkSize + Math.random() * this.chunkSize;
            const types = [MobType.PIGMAN, MobType.ENDERMAN];
            const mobType = types[Math.floor(Math.random() * types.length)];
            this.mobs.push(new Mob(mobType, x, 50, z));
        }
    }
    
    getChunkKey(x, z, dimension) {
        return `${x},${z},${dimension}`;
    }
    
    getBlock(x, y, z, dimension) {
        if (y < 0 || y >= this.chunkHeight) return new Block(BlockType.AIR);
        
        const chunkX = Math.floor(x / this.chunkSize);
        const chunkZ = Math.floor(z / this.chunkSize);
        const localX = ((x % this.chunkSize) + this.chunkSize) % this.chunkSize;
        const localZ = ((z % this.chunkSize) + this.chunkSize) % this.chunkSize;
        
        const key = this.getChunkKey(chunkX, chunkZ, dimension);
        
        if (!this.chunks.has(key)) {
            this.chunks.set(key, this.generateChunk(chunkX, chunkZ, dimension));
        }
        
        const chunk = this.chunks.get(key);
        return chunk[localX][y][localZ];
    }
    
    setBlock(x, y, z, block, dimension) {
        if (y < 0 || y >= this.chunkHeight) return;
        
        const chunkX = Math.floor(x / this.chunkSize);
        const chunkZ = Math.floor(z / this.chunkSize);
        const localX = ((x % this.chunkSize) + this.chunkSize) % this.chunkSize;
        const localZ = ((z % this.chunkSize) + this.chunkSize) % this.chunkSize;
        
        const key = this.getChunkKey(chunkX, chunkZ, dimension);
        
        if (!this.chunks.has(key)) {
            this.chunks.set(key, this.generateChunk(chunkX, chunkZ, dimension));
        }
        
        const chunk = this.chunks.get(key);
        chunk[localX][y][localZ] = block;
        
        // Invalidate mesh cache
        this.meshes.delete(key);
    }
}

class MinecraftGame {
    constructor() {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('canvas'), antialias: true });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setClearColor(0x87CEEB);
        this.renderer.shadowMap.enabled = true;
        
        this.world = new World();
        this.player = new Player();
        this.running = true;
        this.tick = 0;
        this.frameCount = 0;
        this.lastTime = Date.now();
        this.fps = 60;
        
        // Controls
        this.keys = {};
        this.raycaster = new THREE.Raycaster();
        this.mouse = new THREE.Vector2();
        this.mouseDown = { left: false, right: false };
        
        // Mining
        this.isMining = false;
        this.miningProgress = 0;
        this.miningTarget = null;
        this.miningStartTime = 0;
        
        this.setupLights();
        this.setupControls();
        this.initializePlayer();
        this.setupUI();
        
        window.addEventListener('resize', () => this.onWindowResize());
        window.addEventListener('keydown', (e) => this.onKeyDown(e));
        window.addEventListener('keyup', (e) => this.onKeyUp(e));
        window.addEventListener('mousedown', (e) => this.onMouseDown(e));
        window.addEventListener('mouseup', (e) => this.onMouseUp(e));
        window.addEventListener('mousemove', (e) => this.onMouseMove(e));
        
        this.animate();
    }
    
    setupLights() {
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
        this.scene.add(ambientLight);
        
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
        directionalLight.position.set(100, 200, 100);
        directionalLight.castShadow = true;
        directionalLight.shadow.mapSize.width = 2048;
        directionalLight.shadow.mapSize.height = 2048;
        this.scene.add(directionalLight);
    }
    
    setupControls() {
        this.controls = {
            forward: false,
            backward: false,
            left: false,
            right: false,
            jump: false,
            sprint: false
        };
    }
    
    setupUI() {
        this.updateHotbar();
        this.updateHealthBar();
        this.updateHungerBar();
    }
    
    initializePlayer() {
        const startingItems = [
            new Item(ItemType.WOODEN_PICKAXE),
            new Item(ItemType.WOODEN_AXE),
            new Item(ItemType.STONE, 32),
            new Item(ItemType.APPLE, 5),
            new Item(ItemType.COOKED_BEEF, 5)
        ];
        
        startingItems.forEach(item => this.player.addItem(item));
    }
    
    onKeyDown(e) {
        this.keys[e.key.toLowerCase()] = true;
        
        if (e.key === 'w') this.controls.forward = true;
        if (e.key === 's') this.controls.backward = true;
        if (e.key === 'a') this.controls.left = true;
        if (e.key === 'd') this.controls.right = true;
        if (e.key === ' ') { this.controls.jump = true; e.preventDefault(); }
        if (e.key === 'Shift') this.controls.sprint = true;
        
        // Number keys for hotbar
        const num = parseInt(e.key);
        if (num >= 1 && num <= 9) {
            this.player.selectedSlot = num - 1;
            this.updateHotbar();
        }
        
        // ESC for menu
        if (e.key === 'Escape') {
            this.toggleMenu();
        }
        
        // T for dimension switch demo
        if (e.key === 't') {
            this.player.dimension = this.player.dimension === Dimension.OVERWORLD ? Dimension.NETHER : Dimension.OVERWORLD;
        }
    }
    
    onKeyUp(e) {
        this.keys[e.key.toLowerCase()] = false;
        
        if (e.key === 'w') this.controls.forward = false;
        if (e.key === 's') this.controls.backward = false;
        if (e.key === 'a') this.controls.left = false;
        if (e.key === 'd') this.controls.right = false;
        if (e.key === ' ') this.controls.jump = false;
        if (e.key === 'Shift') this.controls.sprint = false;
    }
    
    onMouseDown(e) {
        if (e.button === 0) this.mouseDown.left = true;
        if (e.button === 2) this.mouseDown.right = true;
    }
    
    onMouseUp(e) {
        if (e.button === 0) this.mouseDown.left = false;
        if (e.button === 2) this.mouseDown.right = false;
    }
    
    onMouseMove(e) {
        const deltaX = e.movementX || e.mozMovementX || 0;
        const deltaY = e.movementY || e.mozMovementY || 0;
        
        const sensitivity = 0.003;
        
        // Store camera rotation
        if (!this.camera.rotation.order) {
            this.camera.rotation.order = 'YXZ';
        }
        
        this.camera.rotation.y -= deltaX * sensitivity;
        this.camera.rotation.x -= deltaY * sensitivity;
        
        // Clamp pitch
        this.camera.rotation.x = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, this.camera.rotation.x));
    }
    
    onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }
    
    updateWorld() {
        // Load nearby chunks
        const playerChunkX = Math.floor(this.player.x / this.world.chunkSize);
        const playerChunkZ = Math.floor(this.player.z / this.world.chunkSize);
        
        for (let dx = -2; dx <= 2; dx++) {
            for (let dz = -2; dz <= 2; dz++) {
                const key = this.world.getChunkKey(playerChunkX + dx, playerChunkZ + dz, this.player.dimension);
                if (!this.world.chunks.has(key)) {
                    this.world.chunks.set(key, this.world.generateChunk(playerChunkX + dx, playerChunkZ + dz, this.player.dimension));
                }
            }
        }
        
        // Update mobs
        this.world.mobs = this.world.mobs.filter(mob => mob.isAlive());
        
        // Update player hunger
        if (this.tick % 100 === 0) {
            this.player.hunger = Math.max(0, this.player.hunger - 1);
        }
        
        // Regenerate health if hunger > 17
        if (this.player.hunger > 17 && this.player.health < 20 && this.tick % 200 === 0) {
            this.player.health++;
        }
    }
    
    updatePhysics() {
        const moveSpeed = this.controls.sprint ? 0.3 : 0.15;
        const forward = new THREE.Vector3();
        this.camera.getWorldDirection(forward);
        forward.y = 0;
        forward.normalize();
        
        const right = new THREE.Vector3();
        right.crossVectors(this.camera.up, forward);
        right.y = 0;
        right.normalize();
        
        if (this.controls.forward) {
            this.player.x += forward.x * moveSpeed;
            this.player.z += forward.z * moveSpeed;
        }
        if (this.controls.backward) {
            this.player.x -= forward.x * moveSpeed;
            this.player.z -= forward.z * moveSpeed;
        }
        if (this.controls.left) {
            this.player.x -= right.x * moveSpeed;
            this.player.z -= right.z * moveSpeed;
        }
        if (this.controls.right) {
            this.player.x += right.x * moveSpeed;
            this.player.z += right.z * moveSpeed;
        }
        
        // Gravity
        const groundBlock = this.world.getBlock(Math.floor(this.player.x), Math.floor(this.player.y - 1), Math.floor(this.player.z), this.player.dimension);
        if (groundBlock.isSolid()) {
            this.player.isGrounded = true;
            if (this.controls.jump) {
                this.player.velocityY = 0.3;
                this.player.isGrounded = false;
            }
        } else {
            this.player.isGrounded = false;
        }
        
        this.player.velocityY -= 0.015; // Gravity
        this.player.y += this.player.velocityY;
        
        // Collision detection
        const checkBlock = this.world.getBlock(Math.floor(this.player.x), Math.floor(this.player.y), Math.floor(this.player.z), this.player.dimension);
        if (checkBlock.isSolid()) {
            this.player.y = Math.floor(this.player.y) + 1;
            this.player.velocityY = 0;
        }
        
        // Keep player in bounds
        this.player.y = Math.max(1, Math.min(this.player.y, this.world.chunkHeight - 2));
        
        this.camera.position.set(this.player.x, this.player.y + 0.6, this.player.z);
    }
    
    handleMining() {
        if (!this.mouseDown.left) {
            this.isMining = false;
            this.miningProgress = 0;
            document.getElementById('miningBar').style.display = 'none';
            return;
        }
        
        const forward = new THREE.Vector3();
        this.camera.getWorldDirection(forward);
        
        const raycaster = new THREE.Raycaster(this.camera.position, forward);
        
        const targetDistance = 5;
        const targetPos = new THREE.Vector3();
        targetPos.copy(this.camera.position);
        targetPos.addScaledVector(forward, targetDistance);
        
        const targetX = Math.floor(targetPos.x);
        const targetY = Math.floor(targetPos.y);
        const targetZ = Math.floor(targetPos.z);
        
        const block = this.world.getBlock(targetX, targetY, targetZ, this.player.dimension);
        
        if (block.type === BlockType.AIR) {
            this.isMining = false;
            this.miningProgress = 0;
            document.getElementById('miningBar').style.display = 'none';
            return;
        }
        
        if (!this.isMining) {
            this.isMining = true;
            this.miningStartTime = Date.now();
            this.miningTarget = { x: targetX, y: targetY, z: targetZ };
        }
        
        if (this.isMining) {
            const elapsed = Date.now() - this.miningStartTime;
            const hardness = block.getHardness();
            const item = this.player.getSelectedItem();
            const miningTime = (hardness / (item ? item.getToolSpeed() : 0.1)) * 1000;
            
            this.miningProgress = Math.min((elapsed / miningTime) * 100, 100);
            
            const miningBar = document.getElementById('miningBar');
            miningBar.style.display = 'block';
            document.getElementById('miningProgress').style.width = this.miningProgress + '%';
            
            if (this.miningProgress >= 100) {
                this.breakBlock(targetX, targetY, targetZ);
                this.isMining = false;
            }
        }
    }
    
    breakBlock(x, y, z) {
        const block = this.world.getBlock(x, y, z, this.player.dimension);
        
        if (block.type === BlockType.AIR || block.type === BlockType.BEDROCK) return;
        
        this.world.setBlock(x, y, z, new Block(BlockType.AIR), this.player.dimension);
        
        // Drop items
        const drops = {
            [BlockType.STONE]: { type: ItemType.STONE, count: 1 },
            [BlockType.DIRT]: { type: ItemType.STONE, count: 1 },
            [BlockType.GRASS]: { type: ItemType.STONE, count: 1 },
            [BlockType.OAK_LOG]: { type: ItemType.WOOD, count: 1 },
            [BlockType.IRON_ORE]: { type: ItemType.IRON_INGOT, count: 1 },
            [BlockType.GOLD_ORE]: { type: ItemType.GOLD_INGOT, count: 1 },
            [BlockType.DIAMOND_ORE]: { type: ItemType.DIAMOND, count: 1 }
        };
        
        if (drops[block.type]) {
            const drop = drops[block.type];
            this.player.addItem(new Item(drop.type, drop.count));
        }
    }
    
    handlePlacing() {
        if (!this.mouseDown.right) return;
        
        const item = this.player.getSelectedItem();
        if (!item || item.getToolType()) return;
        
        const forward = new THREE.Vector3();
        this.camera.getWorldDirection(forward);
        
        const targetDistance = 5;
        const targetPos = new THREE.Vector3();
        targetPos.copy(this.camera.position);
        targetPos.addScaledVector(forward, targetDistance);
        
        const targetX = Math.floor(targetPos.x);
        const targetY = Math.floor(targetPos.y);
        const targetZ = Math.floor(targetPos.z);
        
        // Place block in front
        const placeX = Math.floor(targetPos.x + forward.x);
        const placeY = Math.floor(targetPos.y);
        const placeZ = Math.floor(targetPos.z + forward.z);
        
        const blockType = item.type === ItemType.STONE ? BlockType.STONE :
                         item.type === ItemType.WOOD ? BlockType.OAK_LOG :
                         item.type === ItemType.DIRT ? BlockType.DIRT : null;
        
        if (blockType) {
            this.world.setBlock(placeX, placeY, placeZ, new Block(blockType), this.player.dimension);
            item.stackSize--;
            if (item.stackSize <= 0) {
                this.player.inventory.splice(this.player.selectedSlot, 1);
            }
        }
    }
    
    render() {
        this.renderer.render(this.scene, this.camera);
    }
    
    updateUI() {
        // FPS
        this.frameCount++;
        const now = Date.now();
        if (now >= this.lastTime + 1000) {
            this.fps = this.frameCount;
            this.frameCount = 0;
            this.lastTime = now;
        }
        document.getElementById('fps').textContent = this.fps;
        
        // Position
        document.getElementById('pos').textContent = 
            `${Math.floor(this.player.x)}, ${Math.floor(this.player.y)}, ${Math.floor(this.player.z)}`;
        
        // Dimension
        document.getElementById('dimension').textContent = DimensionNames[this.player.dimension];
        
        // Block info
        const forward = new THREE.Vector3();
        this.camera.getWorldDirection(forward);
        const targetPos = new THREE.Vector3();
        targetPos.copy(this.camera.position);
        targetPos.addScaledVector(forward, 5);
        const blockType = this.world.getBlock(Math.floor(targetPos.x), Math.floor(targetPos.y), Math.floor(targetPos.z), this.player.dimension).type;
        document.getElementById('blockInfo').textContent = `Block: ${BlockNames[blockType]}`;
        
        this.updateHealthBar();
        this.updateHungerBar();
    }
    
    updateHealthBar() {
        const bar = document.getElementById('healthBar');
        bar.innerHTML = '';
        for (let i = 0; i < 20; i++) {
            const div = document.createElement('div');
            div.className = 'health-item';
            if (i < this.player.health) div.classList.add('full');
            bar.appendChild(div);
        }
    }
    
    updateHungerBar() {
        const bar = document.getElementById('hungerBar');
        bar.innerHTML = '';
        for (let i = 0; i < 20; i++) {
            const div = document.createElement('div');
            div.className = 'hunger-item';
            if (i < this.player.hunger) div.classList.add('full');
            bar.appendChild(div);
        }
    }
    
    updateHotbar() {
        const hotbar = document.getElementById('hotbar');
        hotbar.innerHTML = '';
        for (let i = 0; i < 9; i++) {
            const slot = document.createElement('div');
            slot.className = 'hotbar-slot';
            if (i === this.player.selectedSlot) slot.classList.add('selected');
            
            const item = this.player.inventory[i];
            if (item) {
                slot.textContent = ItemNames[item.type].substring(0, 3) + (item.stackSize > 1 ? ` x${item.stackSize}` : '');
            } else {
                slot.textContent = i + 1;
            }
            
            hotbar.appendChild(slot);
        }
    }
    
    toggleMenu() {
        const menu = document.getElementById('menu');
        menu.classList.toggle('active');
    }
    
    resumeGame() {
        document.getElementById('menu').classList.remove('active');
    }
    
    newGame() {
        this.world = new World();
        this.player = new Player();
        this.initializePlayer();
        this.setupUI();
        document.getElementById('menu').classList.remove('active');
    }
    
    animate() {
        requestAnimationFrame(() => this.animate());
        
        this.updateWorld();
        this.updatePhysics();
        this.handleMining();
        this.handlePlacing();
        this.updateUI();
        this.render();
        
        this.tick++;
    }
}

// Initialize game when page loads
let game;
window.addEventListener('DOMContentLoaded', () => {
    game = new MinecraftGame();
    
    // Lock pointer on click
    document.addEventListener('click', () => {
        document.body.requestPointerLock = document.body.requestPointerLock || document.body.mozRequestPointerLock;
        document.body.requestPointerLock();
    });
});
