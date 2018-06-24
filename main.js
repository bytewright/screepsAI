var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var structureCommand = require('command.tower');
var commandSpawn = require('command.spawn');
var commandRoom = require('command.room');

module.exports.loop = function () {
    
    for(var roomName in Game.rooms){
        
        commandRoom.run(Game.rooms[roomName]);
        
        var roomTowers = Game.rooms[roomName].find(FIND_MY_STRUCTURES, {filter: {structureType: STRUCTURE_TOWER}});
        for (var tower in roomTowers) {
            structureCommand.run(tower);
        }
    }
    
    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }
    
    for (var spawn in Game.spawns) {
        commandSpawn.run(Game.spawns[spawn]);
    }
    
    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if(creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
    }
    console.log('--------------');
}