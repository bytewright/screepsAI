var protocolModule = require('util.protocols');
var protocols = new protocolModule();

var Tasks = Object.freeze({HARVEST: 1, BUILD: 2, CHARGE: 3, UPGRADE: 4});
var roleUpgrader = {

    /** @param {Creep} creep **/
    run: function(creep) {
        // find out what to do
	    if (!creep.memory.task || creep.carry.energy == 0 && creep.memory.task != Tasks.HARVEST) {
            creep.memory.task = Tasks.HARVEST;
            creep.say('🔄 harvest');
	    } else if (creep.carry.energy == creep.carryCapacity && creep.memory.task != Tasks.UPGRADE) {
            creep.memory.task = Tasks.UPGRADE;
	        creep.say('🚧 upgrade');
	    }
	    
	    // do task or fallback to next task
	    switch (creep.memory.task) {
	        case Tasks.HARVEST:
	            protocols.harvest(creep);
	            break;
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

module.exports = roleUpgrader;