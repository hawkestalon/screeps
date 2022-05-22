

function run(spawnName) {
  const { harvester, builder, upgrader } = _.reduce(Game.creeps, (result, creep) => {
    console.log('run', JSON.stringify(result), creep.memory.role)
    result[creep.memory.role] += 1;
    return result;
  }, { harvester: 0, builder: 0, upgrader: 0 });

  if(Game.spawns[spawnName].spawning) {
    console.log('Already Spawning')
  }

  console.log(harvester, getNumberOfRequiredCreeps('harvester'))
  if(harvester < getNumberOfRequiredCreeps('harvester')) {
    return spawnCreep('harvester', spawnName);
  }
    if(upgrader < getNumberOfRequiredCreeps('upgrader')) {
    return spawnCreep('upgrader', spawnName);
  }

  if(builder < getNumberOfRequiredCreeps('builder')) {
    return spawnCreep('builder', spawnName)
  }

}

function runStrategy(spawnName, strategy) {
  run(spawnName);
  clearCreepMemory();
}

function clearCreepMemory() {
  for(const name in Memory.creeps) {
    if(!Game.creeps[name]) {
        delete Memory.creeps[name];
    }
  }
}

function spawnCreep(creepType, spawnName) {
  console.log("Spawning new creep -- ", creepType);
  Game.spawns[spawnName].spawnCreep(creepParts[creepType], generateName(creepType), generateMemory(creepType));
}

function generateName(spawnType) {
  return spawnType + Date.now();
}

function generateMemory(creepType) {
  return {
    memory: {
      role: creepType,
    }
  }
}

function getNumberOfRequiredCreeps(creepType) {
  const { number, modifier} = creepRequirements[creepType];
  return Math.floor(number * modifier);
}

const creepRequirements = {
  harvester: {
    number: 3,
    modifier: 1,
  },
  builder: {
    number: 1,
    modifier: 1,
  },
  upgrader: {
    number: 1,
    modifier: 1,
  }
}

const creepParts = {
  harvester: [WORK, MOVE, CARRY],
  builder: [WORK, MOVE, CARRY],
  upgrader: [WORK, MOVE, CARRY]
}

module.exports = {
  run, 
  runStrategy,
}