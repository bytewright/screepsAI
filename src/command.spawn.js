let autospawnModule = require('util.autospawn');
let autoSpawnUtil = new autospawnModule();

let commandSpawn = {

    /** @param {StructureSpawn} spawn **/
    run: function(spawn) {

        if(spawn.spawning){
            return;
        }

        autoSpawner.autoSpawn(spawn);

        if(spawn.spawning) {
            let spawningCreep = Game.creeps[spawn.spawning.name];
            spawn.room.visual.text(
                '🛠️' + spawningCreep.memory.role,
                spawn.pos.x + 1,
                spawn.pos.y,
                {align: 'left', opacity: 0.8});
        }
    }

};

let autoSpawner = {
    /** @param {StructureSpawn} spawn **/
    autoSpawn: function(spawn) {
        let wantedBuilders = 4;
        let wantedUpgraders = 3;
        let wantedHarvesters = 7;
        let wantedDefenders = 1;

        if(spawn.room.energy < 200) {
            return;
        }

        let harvesters = _.filter(Game.creeps, (creep) => creep.memory.role === 'harvester');
        //console.log('harvester: '+harvester);
        if(!harvesters || harvesters.length < wantedHarvesters) {
            let resp = autoSpawnUtil.builderHarvester(spawn, 'harvester');
            if (resp === OK) {
                console.log('Spawning new harvester');
            } else if(resp === ERR_NOT_ENOUGH_ENERGY) {
                console.log('charging to build new harvester');
            } else {
                console.log('Error while spawning new harvester:'+resp);
            }
            return;
        }

        let builders = _.filter(Game.creeps, (creep) => creep.memory.role === 'builder');
        //console.log('builders: '+builders);
        if(!builders || builders.length < wantedBuilders) {
            let resp = autoSpawnUtil.builderHarvester(spawn, 'builder');
            if (resp === OK) {
                console.log('Spawning new builder');
            } else if(resp === ERR_NOT_ENOUGH_ENERGY) {
                console.log('charging to build new builder');
            } else {
                console.log('Error while spawning new builder:'+resp);
            }
            return;
        }

        let upgraders = _.filter(Game.creeps, (creep) => creep.memory.role === 'upgrader');
        //console.log('upgraders: '+upgraders);
        if(!upgraders || upgraders.length < wantedUpgraders) {
            let newName = 'Upgrader' + Game.time;
            console.log('Spawning new upgrader: ' + newName);
            spawn.spawnCreep([WORK,CARRY,MOVE], newName, {memory: {role: 'upgrader'}});
            //spawn.spawnCreep([WORK,WORK,CARRY,CARRY,MOVE,MOVE,MOVE], newName, {memory: {role: 'upgrader'}});
            return;
        }

        let defenders = _.filter(Game.creeps, (creep) => creep.memory.role === 'defender');
        if(!defenders || defenders.length < wantedDefenders) {
            let resp = autoSpawnUtil.defender(spawn, 'defender');
            if (resp === OK) {
                console.log('Spawning new defender');
            } else if(resp === ERR_NOT_ENOUGH_ENERGY) {
                console.log('charging to build new defender');
            } else {
                console.log('Error while spawning new defender:' + resp);
            }
            return;
        }
    }
};
/*
    BODYPART_COST: {
       "move": 50,
       "work": 100,
       "attack": 80,
       "carry": 50,
       "heal": 250,
       "ranged_attack": 150,
       "tough": 10,
       "claim": 600
   }
*/
module.exports = commandSpawn;