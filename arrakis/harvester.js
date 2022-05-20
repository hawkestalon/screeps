
const { transferEnergy } = require('./transfer-energy');

function run(creep) {
  const source = creep.pos.findClosestByPath(FIND_SOURCES);
  const target = creep.room.find(FIND_STRUCTURES, {
    filter: (structure) => structure.type === STRUCTURE_SPAWN && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0
  });
  if(creep.store.getFreeCapacity(RESOURCE_ENERGY) === 0) {
    
  }
}

module.exports = {
  run
}