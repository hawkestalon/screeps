const roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
	    if(creep.store.getUsedCapacity(RESOURCE_ENERGY) < creep.store.getCapacity(RESOURCE_ENERGY)) {
            // const target = creep.pos.findClosestByRange(FIND_DROPPED_RESOURCES);
            const target = creep.pos.findClosestByRange(FIND_SOURCES);
            if(creep.pickup(target) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target);
            }
        } else {
            const structureTypesToTarget = getStructureTypesToTarget(creep.room);
            console.log('Harvesters targeting --> ', structureTypesToTarget);
            const targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return structureTypesToTarget.includes(structure.structureType) &&
                            structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                    }
            });
            if(targets.length > 0) {
                if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
        }
	}
};

function getStructureTypesToTarget(room) {
    const spawn = Game.spawns['Spawn1'];
    let structureTypesToTarget = [STRUCTURE_EXTENSION, STRUCTURE_SPAWN]
    const towers = room.find(FIND_STRUCTURES, {
        filter: (structure) => structure.structureType == STRUCTURE_TOWER
    });
    if(towers[0].store.getFreeCapacity([RESOURCE_ENERGY]) > 250 && spawn.store.getFreeCapacity([RESOURCE_ENERGY]) == 0) {
        return structureTypesToTarget.concat([STRUCTURE_TOWER]);
    } else if(spawn.store.getFreeCapacity([RESOURCE_ENERGY]) == 0) {
        console.log('NO FREE CAPACITY')
        return structureTypesToTarget.concat([STRUCTURE_TOWER, STRUCTURE_CONTAINER]);
    }
    return structureTypesToTarget;
}

module.exports = roleHarvester;