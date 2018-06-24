
function autoSpawnModule() {

    /** @param {StructureSpawn} spawn **/
    this.builderHarvester = function(spawn, roleName){
        var newName = roleName + Game.time;
        var maxEnergy = spawn.energyCapacityAvailable;
        var bodyCost = 200;
        var body;
        if (maxEnergy <= 200) {
            body = [WORK,CARRY,MOVE];
        } else if (maxEnergy <= 400) {
            body = [WORK,WORK,CARRY,CARRY,MOVE,MOVE];
        } else if (maxEnergy <= 550) {
            body = [WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE,MOVE];
        }  else if (maxEnergy <= 800) {
            body = [WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE,MOVE];
        }
        /*
        body.push(WORK);
        body.push(CARRY);
        body.push(MOVE);
        var buildFinished = false;
        for (var i = 0; !buildFinished; i++) {
          if(maxEnergy < bodyCost + 100) {
              buildFinished = true;
              break;
          }
          if(i % 2 == 0) {
            body.push(CARRY);
            body.push(MOVE);
            bodyCost += 100;
          } else {
            body.push(WORK);
            bodyCost += 100;
          }
          
        }
        */
        return spawn.spawnCreep(body, newName, {memory: {role: roleName}});
    }
    
    
    /** @param {StructureSpawn} spawn **/
    this.upgrader = function(spawn){
        var newName = 'Upgrader' + Game.time;
        console.log('Spawning new upgrader: ' + newName);
        return spawn.spawnCreep([WORK,CARRY,MOVE], newName, {memory: {role: 'upgrader'}});
    }
    /** @param {StructureSpawn} spawn **/
    this.harvester = function(spawn){
        var newName = 'Harvester' + Game.time;
        console.log('Spawning new harvester: ' + newName);
        return spawn.spawnCreep([WORK,CARRY,MOVE], newName, {memory: {role: 'harvester'}});
    }
    
    /*
     MOVE: "move",
    WORK: "work",
    CARRY: "carry",
    ATTACK: "attack",
    RANGED_ATTACK: "ranged_attack",
    TOUGH: "tough",
    HEAL: "heal",
    CLAIM: "claim",

    BODYPART_COST: {
        "move": 50,
        "work": 100,
        "attack": 80,
        "carry": 50,
        "heal": 250,
        "ranged_attack": 150,
        "tough": 10,
        "claim": 600
    },
    */
}

module.exports = autoSpawnModule;