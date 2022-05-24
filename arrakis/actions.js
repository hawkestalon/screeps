

function harvest(creep, source) {
  if(creep.harvest(source, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
    creep.moveTo(source, {visualizePathStyle: {stroke: '#ff55ff'}});
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

function withdraw(creep, target) {
  if(creep.withdraw(target, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
    creep.moveTo(target, {visualizePathStyle: {stroke: '#ff00ff'}})
  }
}

function pickup(creep, target) {
  console.log('picking up target --> ', target);
  if(creep.pickup(target) === ERR_NOT_IN_RANGE) {
    console.log('Moving to the target --> ', target);
    creep.moveTo(target, {visualizePathStyle: {stroke: '#000000'}});
  }
}


module.exports = {
  harvest,
  transferEnergy,
  upgrade,
  build,
  pickup,
  withdraw
}