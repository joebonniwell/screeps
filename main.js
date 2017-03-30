var spawner = require('spawner')

var roleHarvester = require('role.harvester')
var roleUpgrader = require('role.upgrader')
var roleBuilder = require('role.builder')

module.exports.loop = function  () {

  // Clean Memory
  for (let aCreepMemory in Memory.creeps) {
    if (!Game.creeps[aCreepMemory]) {
      delete Memory.creeps[aCreepMemory]
    }
  }

  // Spawn Creep
  spawner.spawn()

  // Make Creep Creep n things
  for (let creepName in Game.creeps) {
    let creep = Game.creeps[creepName]
    //console.log('' + creep.name + ' (' + creep.memory.role + ') running')
    if (creep.memory.role == 'harvester') {
      roleHarvester.run(creep);
    }
    else if (creep.memory.role == 'upgrader') {
      roleUpgrader.run(creep);
    }
    else if (creep.memory.role == 'builder') {
      roleBuilder.run(creep);
    }
  }
}
