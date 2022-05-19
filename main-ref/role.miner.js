module.exports = {
  run: function(creep) {
    const sources = creep.room.find(FIND_SOURCES);
    const harvesterSource = creep.memory.source;
    console.log('source --> ', creep.name,  harvesterSource)
    if(creep.harvest(sources[harvesterSource]) == ERR_NOT_IN_RANGE) {
      creep.moveTo(sources[harvesterSource], {visualizePathStyle: {stroke: '#ffaa00'}});
    }
    if(creep.store.getFreeCapacity < 0) {
      creep.drop(creep.store.getFreeCapacity());
    }
  }
};