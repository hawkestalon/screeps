const actions = require('./actions');

function runStrategy(creep, strategy) {
  const strategyFunction = STRATEGIES[strategy];
  if(strategy) return strategyFunction(creep);
  return STRATEGIES.none(creep);
}

function run(creep) {
  const source = creep.room.find(FIND_SOURCES);
  const targets = creep.room.find(FIND_CONSTRUCTION_SITES);
  const containers = shouldPullFromContainers();
  const sourceToUse = containers ? containers[0] : source[3]; // change the hardcoded values
  if(targets) return runCoreBehavior(creep, sourceToUse, targets[0]);
  return fillContainers(creep, source[3]);
}

function runCoreBehavior(creep, source, target) {
  if(creep.memory.building && creep.store[RESOURCE_ENERGY] === 0) {
    creep.memory.building = false;
  }
  if(!creep.memory.building && creep.store.getFreeCapacity() === 0) {
    creep.memory.building = true;
  }

  if(creep.memory.building) {
    actions.build(creep, target);
  } else {
    if(source.energyCapacity) return actions.harvest(creep, source);
    actions.withdraw(creep, source);
  }
}

function shouldPullFromContainers(creep) {
  return creep.room.find(FIND_STRUCTURES, {
    filter: (structure) => {
        return (structure.structureType == STRUCTURE_CONTAINER) &&
            structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
    }
  });
}

// rethink this one.
function fillContainers(creep, source) {
  const target = shouldPullFromContainers(creep);
  if(!target) return;
  if(creep.store.getFreeCapacity() > 0) {
    actions.harvest(creep, source);
  } else {
    actions.transferEnergy(creep, target.shift);
  }
}

const STRATEGIES = {
  none: run,
  build: run,
}

module.exports = {
  run,
  runStrategy,
}