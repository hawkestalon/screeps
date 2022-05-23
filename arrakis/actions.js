

function harvest(creep, source) {
  if(creep.harvest(source, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
    creep.moveTo(source, {visualizePathStyle: {stroke: '#ffffff'}});
  }
}

function transferEnergy(creep, target) {
  if(creep.transfer(target, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
    creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
  }
}

function upgrade(creep, target) {
  if(creep.upgradeController(target) === ERR_NOT_IN_RANGE) {
    creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
  }
}

function build(creep, target) {
  if(creep.build(target) === ERR_NOT_IN_RANGE) {
    creep.moveTo(target ,{visualizePathStyle: {stroke: '#ffffff'}});
  }
}

function pickup(creep, target) {
  if(creep.pickup(target, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
    creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
  }
}


module.exports = {
  harvest,
  transferEnergy,
  upgrade,
  build,
}