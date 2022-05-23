const actions = require('./actions');

function runStrategy(creep, strategy) {
  const strategyFunction = STRATEGIES[strategy];
  if(strategy) return strategyFunction(creep);
  return STRATEGIES.none(creep);
}

function run(creep) {
  const source = creep.pos.findClosestByPath(FIND_SOURCES);
  const targets = creep.room.find(FIND_CONSTRUCTION_SITES);
  return runCoreBehavior(creep, source, targets[0]);
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
    actions.harvest(creep, source);
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