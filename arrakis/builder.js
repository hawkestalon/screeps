const actions = require('./actions');

function runStrategy(creep, strategy) {
  const strategy = STRATEGIES[strategy];
  if(strategy) return strategy(creep);
  return STRATEGIES.none(creep);
}

function run(creep) {
  const source = creep.pos.findClosestByPath(FIND_SOURCES);
  const targets = creep.room.find(FIND_CONSTRUCTION_SITES);
  return runCoreBehavior(creep, source, targets[0]);
}

function runCoreBehavior(creep, source, target) {
  if(creep.store.getFreeCapacity(RESOURCE_ENERGY) > 0) {
    actions.harvest(creep, source);
  } else {
    actions.build(creep, target);
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