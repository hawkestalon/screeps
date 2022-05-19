const roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {

        if(creep.memory.building && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.building = false;
            creep.say('🔄 harvest');
        }
        if(!creep.memory.building && creep.store.getFreeCapacity() == 0) {
            creep.memory.building = true;
            creep.say('🚧 build');
        }

        if(creep.memory.building) {
            const targets = creep.room.find(FIND_CONSTRUCTION_SITES);
            if(targets.length) {
                if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            } else {
                const containers = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_CONTAINER) &&
                            structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                    }
                });
                if(containers) {
                    if(creep.transfer(containers[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(containers[0]);
                    }
                }
            }
        } else {
            // const sources = creep.room.find(FIND_SOURCES);
            // const builderMiner = _.filter(Game.creeps, (creep) => {
            //     return creep.memory.role === 'miner' && creep.memory.source === 0;
            // });
            // if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
            //     creep.moveTo(sources[0])
            // }
            // if(creep.pos.getRangeTo(builderMiner) > 7) {
            //     creep.moveTo(builderMiner);
            // } else{
            //     const target = creep.pos.findClosestByRange(FIND_DROPPED_RESOURCES);
            //     if(creep.pickup(target) == ERR_NOT_IN_RANGE) {
            //         if(creep.pos.getRangeTo(target) < 3) {
            //             creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
            //         } else {
            //             creep.moveTo(builderMiner);
            //         }
            //     }
            // }
            const containers = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_CONTAINER) &&
                        structure.store.getUsedCapacity(RESOURCE_ENERGY) > 0;
                }
            })
            const sources = creep.room.find(FIND_SOURCES);
            if(containers && false) {
                if(containers[2] && creep.withdraw(containers[2], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(containers[2], {visualizePathStyle: {stroke: '#ffaa00'}})
                }
            } else if(creep.harvest(sources[1]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[1], {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
    }
};

module.exports = roleBuilder;