// main js file is where the game loop lives
const harvesterRole = require('./harvester');
const upgraderRole = require('./upgrader');
const builderRole = require('./builder');
const minerRole = require('./miner');
const spawnManager = require('./spawn-manager');

module.exports.loop = () => {
  spawnManager.runStrategy('Spawn1');

  for(const name in Game.creeps) {
    const creep = Game.creeps[name];
    if(creep.memory.role === 'harvester') {
      harvesterRole.run(creep);
    } else if (creep.memory.role === 'upgrader') {
      upgraderRole.run(creep);
    } else if (creep.memory.role === 'builder') {
      builderRole.run(creep);
    } else if (creep.memory.role === 'miner') {
      minerRole.run(creep);
    }
  }
}

// bugs, miner not moving, builders and upgraders only gather once instead of all they can carry,
// actually need to implement strategies. 
