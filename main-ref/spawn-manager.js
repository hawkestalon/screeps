const NUMBER_OF_UPGRADERS = 4;
const NUMBER_OF_BUILDERS = 4;
const NUMBER_OF_HARVESTERS = 5;
const NUMBER_OF_MINERS = 2;


function run(spawnName) {
  const harvesters = _.filter(Game.creeps, (creep) => creep.memory.role === 'harvester');
  const builders = _.filter(Game.creeps, (creep) => creep.memory.role === 'builder');
  const upgraders = _.filter(Game.creeps, (creep) => creep.memory.role === 'upgrader');
  const miners = _.filter(Game.creeps, (creep) => creep.memory.role === 'miner');
  if(harvesters.length < NUMBER_OF_HARVESTERS) {
    spawnCreep('harvester', spawnName);
  }
  if(miners.length < NUMBER_OF_MINERS) {
    spawnCreep('miner', spawnName, 1);
  }
  if(builders.length < NUMBER_OF_BUILDERS) {
    spawnCreep('builder', spawnName);
  }
  if(upgraders.length < NUMBER_OF_UPGRADERS) {
    spawnCreep('upgrader', spawnName);
  }

  clearCreepMemory();

  console.log('Number of Creeps ', builders.length + upgraders.length + harvesters.length);
}

function spawnCreep(creepType, spawnName, source) {
  console.log("Spawning new creep -- ", creepType);
  Game.spawns[spawnName].spawnCreep(creepParts[creepType], generateName(creepType), generateMemory(creepType, source));
}

function spawnMiner(creepType, spawnName) {
  const spawn = Game.spawns[spawnName];
  let numberOfMiners = spawn.memory.miners;
  if(!numberOfMiners) {
    numberOfMiners = 1;
    spawn.memory.miners = 1;
  } else {
    spawn.memory.miners += 1;
  }
  const source = numberOfMiners % 2;
  spawnCreep(creepType, spawnName, source);
}

function generateName(spawnType) {
  return spawnType + Date.now();
}

function generateMemory(spawnType, source) {
  return {
    memory: {
      role: spawnType,
      source, 
    }
  }
}

function clearCreepMemory() {
  for(const name in Memory.creeps) {
    if(!Game.creeps[name]) {
        delete Memory.creeps[name];
        console.log('Clearing non-existing creep memory:', name);
    }
  }
}

const creepParts = {
  harvester: [WORK,CARRY,MOVE],
  upgrader: [WORK,WORK,CARRY,CARRY,MOVE,MOVE],
  builder: [WORK,WORK, WORK, WORK, CARRY,CARRY,MOVE, MOVE, MOVE],
  miner: [WORK,WORK,WORK,WORK,MOVE,MOVE]
}
module.exports = {run}