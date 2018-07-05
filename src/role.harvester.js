let protocolModule = require('util.protocols');
let protocols = new protocolModule();

let Tasks = Object.freeze({HARVEST: 1, BUILD: 2, CHARGE: 3, UPGRADE: 4});

let roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
        // find out what to do
        if (!creep.memory.task || creep.carry.energy === 0 && creep.memory.task !== Tasks.HARVEST) {
            creep.memory.task = Tasks.HARVEST;
            creep.say('🔄 harvest');
        } else if (creep.carry.energy === creep.carryCapacity && creep.memory.task !== Tasks.CHARGE) {
            creep.memory.task = Tasks.CHARGE;
            creep.say('⚡ charge');
        }

        // do task or fallback to next task
        switch (creep.memory.task) {
            case Tasks.HARVEST:
                protocols.harvest(creep);
                break;
            case Tasks.CHARGE:
                let isRechargingStructure = protocols.recharge(creep);
                if(isRechargingStructure) {
                    break;
                }
            case Tasks.BUILD:
                let isBuilding = protocols.build(creep);
                if(isBuilding) {
                    break;
                }
            default:
                creep.say('⛔ idle');
                let target = creep.room.getPositionAt(30, 25);
                creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
        }
    }

};

module.exports = roleHarvester;