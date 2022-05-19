
const { transferEnergy } = require('../actions/transfer-energy');

function run(creep) {
  const source = creep.pos.findClosestByPath(FIND_SOURCES);
  const target = creep.room.find(structures, {
    filter: (structure) => structure.type === STRUCTURE_SPAWN && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0
  });
  transferEnergy(creep, source, target);
}

module.exports = {
  run
}