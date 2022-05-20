// main js file is where the game loop lives
const harvesterRole = require('./harvester');

module.exports.loop = () => {
  for(const name in Game.creeps) {
    const creep = Game.creeps[name];
    if(creep.memory.role === 'harvester') {
      harvesterRole.run(creep);
    }
  }
}

// tasks for screeps
// keep screeps populated
// keep each role running
// manage tower
// make sure rcl is being upgraded
// roles: harvester, builder, upgrader, miner, container manager?
// different creep configurations depending on rcl level
// level 1: harvester, upgrader, builder
// level 2: harvester, upgrader, builder, miner?
// level 3: harvester, upgrader, builder, miner, containerManager
// level 4: harvester, upgrader, builder, miner, containerManager, defender?
// builder needs to be most flexible because it's not always busy.
// how to manage different energy sources. Should reliably mine 2 energy sources?
// how to manage resources between container, spawn, tower?
// how to switch between strategies

// Files Needed:
// 