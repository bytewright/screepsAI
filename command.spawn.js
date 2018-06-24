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
	    var wantedBuilders = 3;
	    var wantedUpgraders = 2;
	    var wantedHarvesters = 5;
	    if(spawn.energy < 200) {
            return;
	    }
	    
        var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
        var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
        var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
        if(builders.length < wantedBuilders) {
            var newName = 'Builder' + Game.time;
            console.log('Spawning new builder: ' + newName);
            spawn.spawnCreep([WORK,CARRY,MOVE], newName, {memory: {role: 'builder'}});
            //spawn.spawnCreep([WORK,WORK,WORK,CARRY,MOVE,MOVE,MOVE], newName, {memory: {role: 'builder'}});
            return;
        }
                
        if(upgraders.length < wantedUpgraders) {
            var newName = 'Upgrader' + Game.time;
            console.log('Spawning new upgrader: ' + newName);
            spawn.spawnCreep([WORK,CARRY,MOVE], newName, {memory: {role: 'upgrader'}});
            //spawn.spawnCreep([WORK,WORK,CARRY,CARRY,MOVE,MOVE,MOVE], newName, {memory: {role: 'upgrader'}});
            return;
        }
        
        if(harvesters.length < wantedHarvesters) {
            var newName = 'Harvester' + Game.time;
            console.log('Spawning new harvester: ' + newName);
            spawn.spawnCreep([WORK,CARRY,MOVE], newName, {memory: {role: 'harvester'}});
            //spawn.spawnCreep([WORK,WORK,WORK,CARRY,MOVE,MOVE,MOVE], newName, {memory: {role: 'harvester'}});
            return;
        }
	}
}
    
module.exports = commandSpawn;