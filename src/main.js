let roleHarvester = require('role.harvester');
let roleUpgrader = require('role.upgrader');
let roleBuilder = require('role.builder');
let roleDefender = require('role.defender');
let structureCommand = require('command.tower');
let commandSpawn = require('command.spawn');
let commandRoom = require('command.room');

module.exports.loop = function () {

    for(let roomName in Game.rooms){

        commandRoom.run(Game.rooms[roomName]);

        let roomTowers = Game.rooms[roomName].find(FIND_MY_STRUCTURES, {filter: {structureType: STRUCTURE_TOWER}});
        for (let tower in roomTowers) {
            structureCommand.run(roomTowers[tower]);
        }
    }

    for(let name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }

    for (let spawn in Game.spawns) {
        commandSpawn.run(Game.spawns[spawn]);
    }

    for(let name in Game.creeps) {
        let creep = Game.creeps[name];
        // todo if creep energy low, goto spawn
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if(creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
        if(creep.memory.role == 'defender') {
            roleDefender.run(creep);
        }
    }
    //console.log('--------------');
}