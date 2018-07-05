
function autoSpawnModule() {

    /**
     * @param {StructureSpawn} spawn
     * @param roleName
     **/
    this.builderHarvester = function(spawn, roleName){
        let newName = roleName + Game.time;
        let maxEnergy = spawn.room.energyCapacityAvailable;
        let bodyCost = 200;
        let body;
        if (maxEnergy <= 300) {
            body = [WORK,CARRY,MOVE];
        } else if (maxEnergy <= 400) {
            body = [WORK,WORK,CARRY,CARRY,MOVE,MOVE];
        } else if (maxEnergy <= 550) {
            body = [WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE,MOVE];
        }  else {//if (maxEnergy <= 800) {
            body = [WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE,MOVE];
        }
        console.log('with '+maxEnergy+' energy, creating body: '+body);
        /*
        body.push(WORK);
        body.push(CARRY);
        body.push(MOVE);
        let buildFinished = false;
        for (let i = 0; !buildFinished; i++) {
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
    };


    /** @param {StructureSpawn} spawn **/
    this.upgrader = function(spawn){
        let newName = 'Upgrader' + Game.time;
        console.log('Spawning new upgrader: ' + newName);
        return spawn.spawnCreep([WORK,CARRY,MOVE], newName, {memory: {role: 'upgrader'}});
    };

    /**
     * @param {StructureSpawn} spawn
     * @param roleName
     */
    this.defender = function(spawn, roleName){
        let newName = roleName + Game.time;
        console.log('Spawning new ' + newName);
        let maxEnergy = spawn.room.energyCapacityAvailable;
        let bodyCost = 200;
        let body;
        if (maxEnergy <= 400) {
            body = [ATTACK,TOUGH,TOUGH,RANGED_ATTACK,MOVE,MOVE,MOVE];
        } else if (maxEnergy <= 550) {
            body = [ATTACK,ATTACK,ATTACK,TOUGH,RANGED_ATTACK,MOVE,MOVE,MOVE];
        }  else if (maxEnergy <= 800) {
            body = [ATTACK,ATTACK,ATTACK,TOUGH,RANGED_ATTACK,MOVE,MOVE,MOVE];
        } else {
            body = [ATTACK,TOUGH,TOUGH,MOVE,MOVE];
        }
        console.log('with ' + maxEnergy + ' energy, creating ' + roleName + ' body: ' + body);
        return spawn.spawnCreep(body, newName, {memory: {role: roleName}});
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