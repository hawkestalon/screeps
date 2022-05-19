// hardcode resource energy in there. Future iterations will need to be resource agnostic
// Actions.js: transferEnergy
  // transferEnergy(source, target) -> moves the source to the target.
    // source -> any source of energy(resource, container, dropped resource)
    // target -> any recepient of energy(spawn, container, tower, extension)
    // switch on target: 
      // if target is construction site, build
      // if target is controller, upgrade
      // if target is container, spawn, extension, tower, transfer
    // source
      // if source is energy source, harvest
      // if source is container withdraw
      // if source is dropped_resource pickup

// what if the source is full!?!?!?!?!

function transferEnergy(creep, source, target) {
  const gatherAction = determineSourceAction(creep, source);
  const targetAction = determineTargetAction(creep, target);
  if(creep.store.getUsedCapacity() === 0){
    if(gatherAction(target, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
      creep.moveTo(target, {visualizePathStyle: {stroke: '#ffaa00'}});
    }
  } else {
    if(targetAction(target, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
      creep.moveTo(target, {visualizePathStyle: {stroke: '#ffaa00'}});
    }
  }
}

function determineSourceAction(creep, source) {
  if(source.energyCapacity) {
    return creep.harvest;
  } else if (source.resourceType) {
    return creep.pickup;
  } else {
    return creep.withdraw;
  }
}

function determineTargetAction(creep, target) {
  if(target.structureType) {
    if(target.structureType === STRUCTRE_CONTROLLER) return creep.upgradeController;
    return creep.transfer;
  } else if(target.progress) {
    return creep.build;
  }
}

module.exports = {
  transferEnergy,
}