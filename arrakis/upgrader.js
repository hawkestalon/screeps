const actions = require('./actions');

function runStrategy(creep, strategy) {
  const strategyFunction = STRATEGIES[strategy];
  if(strategy) return strategyFunction(creep);
  return STRATEGIES.none(creep);
}

function run(creep) {
  const source = creep.pos.findClosestByPath(FIND_SOURCES);
  const target = creep.room.controller;
  return runCoreBehavior(creep, source, target);
}

function runCoreBehavior(creep, source, target) {
  if(creep.memory.upgrading && creep.store[RESOURCE_ENERGY] === 0) {
    creep.memory.upgrading = false;
  }
  if(!creep.memory.upgrading && creep.store.getFreeCapacity() === 0) {
    creep.memory.upgrading = true;
  }

  if(creep.memory.upgrading) {
    actions.upgrade(creep, target);
  } else {
    actions.harvest(creep, source);
  }
}

const STRATEGIES = {
  none: run,
  upgrade: run,
}

module.exports = {
  run,
  runStrategy
}