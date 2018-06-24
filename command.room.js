var commandRoom = {

    /** @param {RoomObject} room **/
    run: function(room) {
        if(!room.controller || !room.controller.my){
            console.log('Room has no controller: ' + room.name);
        }
        var constructionSites = room.find(FIND_CONSTRUCTION_SITES);
        if (room.controller.level == 2){
           var extensions = room.find(FIND_MY_STRUCTURES, {filter: {structureType: STRUCTURE_EXTENSION}});
           if(extensions.length < 5 && constructionSites.length < 1) {
                console.log('Building extension in room: ' +  room.name);
                //room.controller.say('build extension');
                var ypos = 22+extensions.length;
                room.createConstructionSite(44, ypos, STRUCTURE_EXTENSION);    
           }
       }
       if (room.controller.level == 3){
           var towers = room.find(FIND_MY_STRUCTURES, {filter: {structureType: STRUCTURE_TOWER}});
           if(towers.length == 0 && constructionSites.length < 1) {
                //room.controller.say('build tower');
                console.log('Building tower in room: ' +  room.name);
                room.createConstructionSite(37, 26, STRUCTURE_TOWER);    
           }
       }
	}

};

module.exports = commandRoom;