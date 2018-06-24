
function protocolModule() {

    /** @param {Creep} creep **/
    this.harvest = function(creep){
        if(!creep.memory.isSourceSeleted) {
            console.log('finding harvest source for ' + creep.name);
            // todo max 4 an eine source
            var sources = creep.room.find(FIND_SOURCES);
            var source;
            for (var index in sources) {
                var srcId = sources[index].id;
                var count = _.filter(Game.creeps, (creep) => creep.memory.sourceId == srcId).length;
                if (count < 4) {
                    source = sources[index];
                    break;
                }
            }
            if(!source) {
                source = sources[0];
            }
            
            console.log('choosing source at ' + source.pos);
            creep.memory.sourceId = source.id;
            creep.memory.isSourceSeleted = true;
        }
        var targetSource = Game.getObjectById(creep.memory.sourceId);
        var resp = creep.harvest(targetSource);
        if(resp == ERR_NOT_IN_RANGE) {
            creep.moveTo(targetSource, {visualizePathStyle: {stroke: '#ffaa00'}});
        } else if (resp == OK || resp == ERR_BUSY){
            //creep.memory.isSourceSeleted = false;
        } else {
            creep.memory.isSourceSeleted = false;
            console.log('error while harvesting: ' + resp);
        }
    }
    
    /** @param {Creep} creep **/
    this.recharge = function(creep){
        var rechargeTargets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION ||
                                structure.structureType == STRUCTURE_SPAWN ||
                                structure.structureType == STRUCTURE_TOWER) && structure.energy < structure.energyCapacity;
                    }
                });
        if(rechargeTargets.length > 0) {
            var target = rechargeTargets[0];
            //console.log('protocolRecharge: ' + target);
            if(creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
            }
            return true;
        } else {
            return false;
        }
    }
    
    /** @param {Creep} creep **/
    this.build = function(creep){
        var buildSites = creep.room.find(FIND_CONSTRUCTION_SITES);
        //{
        //    filter: (structure) => { return structure.structureType != STRUCTURE_ROAD; }
        //});
        if(buildSites.length) {
            if(creep.build(buildSites[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(buildSites[0], {visualizePathStyle: {stroke: '#ffffff'}});
            }
            return true;
        } else {
            return false;
        }
    }
    
        
    /** @param {Creep} creep **/
    this.upgrade = function(creep){
        var resp = creep.upgradeController(creep.room.controller);
        if (resp == ERR_NOT_IN_RANGE) {
            creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#ffffff'}});
        } else if (resp != OK) {
            console.log('Error while upgrading controller: '+resp);
        }
    }
}

module.exports = protocolModule;