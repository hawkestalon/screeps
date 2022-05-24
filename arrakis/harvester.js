
const actions = require('./actions');

function run(creep) {
  const source = creep.pos.findClosestByPath(FIND_SOURCES);
  const targets = creep.room.find(FIND_STRUCTURES, {
    filter: (structure) => {
        return (structure.structureType == STRUCTURE_SPAWN  || structure.structureType === STRUCTURE_EXTENSION || structure.structureType === STRUCTURE_CONTAINER) &&
            structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
    }
  });
  const droppedSources = creep.pos.findClosestByPath(FIND_DROPPED_RESOURCES);
  if(isMinerPresent() && droppedSources) {
    return runMinerBehavior(creep, droppedSources, targets[0]);
  } 
  return runCoreBehavior(creep, source, targets[0]);
}

function prioritizeStructure() {
  // find the structure in most need of resources
}

function runStrategy(creep, strategy) {
  const strategyFunction = STRATEGIES[strategy];
  if(strategyFunction) {
    return strategyFunction(creep);
  }
  return STRATEGIES.none(creep);
}

function runCoreBehavior(creep, source, target) {
  if(creep.store.getFreeCapacity() > 0) {
    actions.harvest(creep, source);
  } else {
    actions.transferEnergy(creep, target);
  }
}

function runMinerBehavior(creep, source, target) {
  if(creep.store.getFreeCapacity() > 0) {
    actions.pickup(creep, source);
  } else {
    actions.transferEnergy(creep, target);
  }
}

function isMinerPresent() {
  for(const name in Game.creeps) {
    if(Game.creeps[name].memory.role === 'miner') {
      return true;
    }
  }
  return false;
}

const STRATEGIES = {
  none: run,
  harvest: run,
}

module.exports = {
  run,
  runStrategy
}