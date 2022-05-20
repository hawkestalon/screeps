

function harvest(creep, source) {
  if(creep.harvest(source, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
    creep.moveTo(source);
  }
}

function transferEnergy(creep, target) {
  if(creep.transfer(target, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
    creep.moveTo(target);
  }
}

function upgrade(creep, target) {
  if(creep.upgradeController(target) === ERR_NOT_IN_RANGE) {
    creep.moveTo(target);
  }
}

function build(creep, target) {
  if(creep.build(target) === ERR_NOT_IN_RANGE) {
    creep.moveTo(target);
  }
}


module.exports = {
  harvest,
  transferEnergy,
  upgrade,
  build,
}