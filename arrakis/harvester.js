
const actions = require('./actions');

function run(creep) {
  const source = creep.pos.findClosestByPath(FIND_SOURCES);
  const targets = creep.room.find(FIND_STRUCTURES, {
    filter: (structure) => {
        return (structure.structureType == STRUCTURE_SPAWN) &&
            structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
    }
  });
  runCoreBehavior(creep, source, targets[0]);
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
  if(creep.store[RESOURCE_ENERGY] === 0) {
    actions.harvest(creep, source);
  } else {
    actions.transferEnergy(creep, target);
  }
}

const STRATEGIES = {
  none: run,
  harvest: run,
}

module.exports = {
  run,
  runStrategy
}