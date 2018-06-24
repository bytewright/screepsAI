var protocolModule = require('util.protocols');
var protocols = new protocolModule();

var Tasks = Object.freeze({HARVEST: 1, BUILD: 2, CHARGE: 3, UPGRADE: 4});

var roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {
        // find out what to do
	    if (!creep.memory.task || creep.carry.energy == 0 && creep.memory.task != Tasks.HARVEST) {
	        creep.memory.sourceId = null;
            creep.memory.task = Tasks.HARVEST;
            creep.say('🔄 harvest');
	    } else if (creep.carry.energy == creep.carryCapacity && creep.memory.task != Tasks.BUILD) {
	        creep.memory.sourceId = null;
            creep.memory.task = Tasks.BUILD;
	        creep.say('🚧 build');
	    }
	    
	    // do task or fallback to next task
	    switch (creep.memory.task) {
	        case Tasks.HARVEST:
	            protocols.harvest(creep);
	            break;
	        case Tasks.BUILD:
    	        var isBuilding = protocols.build(creep);
    	        if(isBuilding) {
                    break;
                }
	        case Tasks.CHARGE:
                var isRechargingStructure = protocols.recharge(creep);
    	        if(isRechargingStructure) {
                    break;
                }
	        case Tasks.UPGRADE:
    	        protocols.upgrade(creep);
	            break;
	        default:
	            creep.say('⛔ idle');
                var target = creep.room.getPositionAt(30, 25);
                creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
	    }
	}
};

module.exports = roleBuilder;