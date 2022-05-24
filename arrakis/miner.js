const actions = require('./actions');

function runCoreBehavior(creep) {
  const sources = creep.room.find(FIND_SOURCES);
  console.log('Sources for miner --> ', sources)
  actions.harvest(creep, sources[0]);
}

function run(creep) {
  runCoreBehavior(creep);
}

function runStrategy(creep, strategy) {
  const strategyFunction = STRATEGIES[strategy];
  if(strategyFunction) return strategyFunction(run);
  return STRATEGIES.none(creep);
}

const STRATEGIES = {
  none: run,
  mine: run
}

module.exports = {
  run,
  runStrategy,
}
