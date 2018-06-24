var autospawnModule = require('util.autospawn');
var autoSpawnUtil = new autospawnModule();

var commandSpawn = {

    /** @param {StructureSpawn} spawn **/
    run: function(spawn) {

        if(spawn.spawning){
            return;
        }
        
        autoSpawner.autoSpawn(spawn);          
        
        if(spawn.spawning) { 
            var spawningCreep = Game.creeps[spawn.spawning.name];
            spawn.room.visual.text(
                '🛠️' + spawningCreep.memory.role,
                spawn.pos.x + 1, 
                spawn.pos.y, 
                {align: 'left', opacity: 0.8});
        }
	}

};
	
var autoSpawner = {
    /** @param {StructureSpawn} spawn **/
	autoSpawn: function(spawn) {
	    var wantedBuilders = 4;
	    var wantedUpgraders = 3;
	    var wantedHarvesters = 6;
	    var wantedDefenders = 4;

	    if(spawn.room.energy < 200) {
            return;
	    }
	    
        var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
        if(builders.length < wantedBuilders) {
            if (autoSpawnUtil.builderHarvester(spawn, 'Builder') == OK) {
                console.log('Spawning new builder');
            }
            return;
        }
                
        var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
        if(upgraders.length < wantedUpgraders) {
            var newName = 'Upgrader' + Game.time;
            console.log('Spawning new upgrader: ' + newName);
            spawn.spawnCreep([WORK,CARRY,MOVE], newName, {memory: {role: 'upgrader'}});
            //spawn.spawnCreep([WORK,WORK,CARRY,CARRY,MOVE,MOVE,MOVE], newName, {memory: {role: 'upgrader'}});
            return;
        }
        
        var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
        if(harvesters.length < wantedHarvesters) {
            if (autoSpawnUtil.builderHarvester(spawn, 'Harvester') == OK) {
                console.log('Spawning new Harvester');
            }
            /*
            var newName = 'Harvester' + Game.time;
            console.log('Spawning new harvester: ' + newName);
            spawn.spawnCreep([WORK,CARRY,MOVE], newName, {memory: {role: 'harvester'}});
            //spawn.spawnCreep([WORK,WORK,WORK,CARRY,MOVE,MOVE,MOVE], newName, {memory: {role: 'harvester'}});
            return;
            */
        }
        
        //if(wantedDefenders)
	}
}
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