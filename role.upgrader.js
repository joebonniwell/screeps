var roleUpgrader = {
  run: function (creep) {
    if (creep.memory.upgrading && creep.carry.energy == 0) {
      creep.memory.upgrading = false
    }
    else if (!creep.memory.upgrading && creep.carry.energy == creep.carryCapacity) {
      creep.memory.upgrading = true
    }

    if (creep.memory.upgrading) {
      // Upgrade
      if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
        creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#ffaa00'}})
      }
    } else {
      // Harvest Energy
      var sources = creep.room.find(FIND_SOURCES)
      if (!creep.memory.activeSource) {
        var aSource = Math.floor(Math.random() * (sources.length))
        creep.memory.activeSource = aSource + 1
      }

      var creepSource = sources[creep.memory.activeSource - 1]

      if (creep.harvest(creepSource) == ERR_NOT_IN_RANGE) {
        creep.moveTo(creepSource, {visualizePathStyle: {stroke: '#ffaa00'}})
      }
    }
  }
}

module.exports = roleUpgrader
