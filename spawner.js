var spawner = {
  spawn: function () {
    var totalHarvesters = _(Game.creeps).filter({ memory: { role: 'harvester' }}).value().length;
    //console.log('total harvesters: ' + totalHarvesters)

    if (totalHarvesters < 3) {
      Game.spawns.Spawn1.createCreep([WORK, CARRY, CARRY, MOVE], undefined, {role: 'harvester'})
      return
    }

    var totalUpgraders = _(Game.creeps).filter({ memory: {role: 'upgrader'}}).value().length;
    //console.log('total upgraders: ' + totalUpgraders)

    if (totalUpgraders < 10) {
      Game.spawns.Spawn1.createCreep([WORK, CARRY, MOVE, MOVE], undefined, {role: 'upgrader', upgrading: false})
      return
    }

    // Builders
    var totalBuilders = _(Game.creeps).filter({ memory: {role: 'builder'}}).value().length;
    //console.log('total builders: ' + totalBuilders)

    if (totalBuilders < 3) {
      Game.spawns.Spawn1.createCreep([WORK, CARRY, MOVE, MOVE], undefined, {role: 'builder', building: false})
      return
    }
  }
};

module.exports = spawner;
