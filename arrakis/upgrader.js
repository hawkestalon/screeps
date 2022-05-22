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
  if(creep.store[RESOURCE_ENERGY] === 0) {
    actions.harvest(creep, source);
  } else {
    actions.upgrade(creep, target);
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