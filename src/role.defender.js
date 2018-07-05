
let roleDefender = {

    /** @param {Creep} creep **/
    run: function(creep) {
        let closestHostile = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if(closestHostile) {
            let resp = creep.attack(closestHostile);
            if(resp !== OK) {
                creep.moveTo(closestHostile.pos);
            }
            return;
        }
        if (creep.pos !== creep.room.getPositionAt(25,25)){
            creep.moveTo(creep.room.getPositionAt(25,25));
        }
    }
};

module.exports = roleDefender;