const moveOptions = {visualizePathStyle: {stroke: '#ffaa00'}}

var roleHarvester = {
  run: function (creep) {
    if (creep.carry.energy < creep.carryCapacity) {
      // Harvest Energy

      var sources = creep.room.find(FIND_SOURCES)
      if (!creep.memory.activeSource) {
        var aSource = Math.floor(Math.random() * (sources.length))
        creep.memory.activeSource = aSource + 1
      }

      var creepSource = sources[creep.memory.activeSource - 1]
      if (creep.harvest(creepSource) == ERR_NOT_IN_RANGE) {
        creep.moveTo(creepSource, moveOptions)
      }

    } else {
      // Return Energy
      creep.memory.activeSource = 0
      var targets = creep.room.find(FIND_STRUCTURES, {
        filter: (structure) => {
          return (structure.structureType === STRUCTURE_EXTENSION ||
                  structure.structureType === STRUCTURE_SPAWN ||
                  structure.structureType === STRUCTURE_TOWER) && structure.energy < structure.energyCapacity
        }
      })
      if (targets.length > 0) {
        if (creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
          creep.moveTo(targets[0], moveOptions)
        }
      }
    }
  }
}

module.exports = roleHarvester
