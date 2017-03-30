var roleBuilder = {
  run: function (creep) {
    if (creep.memory.building && creep.carry.energy == 0) {
      creep.memory.building = false
    }
    else if (!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
      creep.memory.building = true
    }

    if (creep.memory.building) {
      // Repair / Build

      var sites = creep.room.find(FIND_MY_STRUCTURES, {
        filter: (structure) => structure.hits < structure.hitsMax
      })
      sites = sites.concat(creep.room.find(FIND_CONSTRUCTION_SITES).sort((site1, site2) =>  (site1.progressTotal - site1.progress) - (site2.progressTotal - site2.progress)))

      var creepSite = sites[0]

      if (creep.build(creepSite) == ERR_NOT_IN_RANGE) {
        creep.moveTo(creepSite, {visualizePathStyle: {stroke: '#ffaa00'}})
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

module.exports = roleBuilder
