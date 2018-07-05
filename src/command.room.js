
/*
0 	— 	Roads, 5 Containers
1 	200 	Roads, 5 Containers, 1 Spawn
2 	45,000 	Roads, 5 Containers, 1 Spawn, 5 Extensions (50 capacity), Ramparts (300K max hits), Walls
3 	135,000 	Roads, 5 Containers, 1 Spawn, 10 Extensions (50 capacity), Ramparts (1M max hits), Walls, 1 Tower
4 	405,000 	Roads, 5 Containers, 1 Spawn, 20 Extensions (50 capacity), Ramparts (3M max hits), Walls, 1 Tower, Storage
5 	1,215,000 	Roads, 5 Containers, 1 Spawn, 30 Extensions (50 capacity), Ramparts (10M max hits), Walls, 2 Towers, Storage, 2 Links
6 	3,645,000 	Roads, 5 Containers, 1 Spawn, 40 Extensions (50 capacity), Ramparts (30M max hits), Walls, 2 Towers, Storage, 3 Links, Extractor, 3 Labs, Terminal
7 	10,935,000 	Roads, 5 Containers, 2 Spawns, 50 Extensions (100 capacity), Ramparts (100M max hits), Walls, 3 Towers, Storage, 4 Links, Extractor, 6 Labs, Terminal
8 	— 	Roads, 5 Containers, 3 Spawns, 60 Extensions (200 capacity), Ramparts (300M max hits), Walls, 6 Towers, Storage, 6 Links, Extractor, 10 Labs, Terminal, Observer, Power Spawn
*/

let builder = new buildModule();

let commandRoom = {

    /** @param {RoomObject} room **/
    run: function(room) {
        if(!room.controller || !room.controller.my){
            console.log('Room has no controller: ' + room.name);
            return;
        }
        let constructionSites = room.find(FIND_CONSTRUCTION_SITES);

        let buildableExtensionCount = builder.getExtensionCount(room);
        if (buildableExtensionCount > 0) {
            if (constructionSites.length < 2) {
                console.log('Building extension in room: ' +  room.name);
                builder.buildExtension(room);
            }
        }

        let buildableTowerCount = builder.getTowerCount(room);
        if (buildableTowerCount > 0) {
            let towers = room.find(FIND_MY_STRUCTURES, {filter: {structureType: STRUCTURE_TOWER}});
            if (towers.length !== 1 && constructionSites.length < 1) {
                console.log('Building tower in room: ' +  room.name);
                // todo dynamic positions
                room.createConstructionSite(12, 27, STRUCTURE_TOWER);
            }
        }
        if(room.memory.initRoads){
            console.log('Building roads in room: ' +  room.name);
            builder.buildRoads(room);
            room.memory.hasRoadsInited = true;
        } else {
            if(!room.memory.hasRoadsInited) {
                if(room.find(FIND_CREEPS).length > 5){
                    room.memory.initRoads = true;
                }
                // iff creep count > 6 =>room.memory.initRoads=true
            }
        }
    }
};

function buildModule() {

    /** @param {RoomObject} room **/
    this.getExtensionCount = function(room){
        let extensions = room.find(FIND_MY_STRUCTURES, {filter: {structureType: STRUCTURE_EXTENSION}}).length;
        switch (room.controller.level) {
            case 0:
            case 1:
                return 0;
            case 2:
                return 5-extensions;
            default:
                return (room.controller.level - 2) * 10 - extensions;
        }
    };

    /** @param {RoomObject} room **/
    this.getTowerCount = function(room){
        let extensions = room.find(FIND_MY_STRUCTURES, {filter: {structureType: STRUCTURE_TOWER}}).length;
        switch (room.controller.level) {
            case 3:
            case 4:
                return 1;
            case 5:
            case 6:
                return 2;
            case 7:
                return 3;
            case 8:
                return 6;
            default:
                return 0;
        }
    };

    /** @param {RoomObject} room **/
    this.buildExtension = function(room){
        let spawn = room.find(FIND_MY_STRUCTURES, {filter: {structureType: STRUCTURE_SPAWN}})[0];
        let x;
        let y;
        for (let offset = 2 ; offset <= 12 ; offset = offset + 2) {
            for (x = spawn.pos.x - offset; x <= spawn.pos.x + offset; x = x + 2) {
                for (y = spawn.pos.y - offset; y <= spawn.pos.y + offset; y = y + 2) {
                    if(room.createConstructionSite(x, y, STRUCTURE_EXTENSION) === OK) {
                        console.log('Building extension in room: ' +  room.name+', at x,y:'+x+','+y);
                        builder.buildRoadTo(room, spawn.pos, new RoomPosition(x,y,room.name));
                        return;
                    }
                }
            }
        }
        console.log('failed to find possible placement for extension!');
    };

    /** @param {RoomObject} room **/
    this.buildRoads = function(room){

        // todo controller to nearest source
        // todo alle felder um source
        // todo alle felder um spawn
        // todo road to minerals
        // todo shortest roads, ignore swamps

        let spawn = room.find(FIND_MY_STRUCTURES, {filter: {structureType: STRUCTURE_SPAWN}})[0];
        let sources = room.find(FIND_SOURCES);
        for (let sourceIndex in sources){
            builder.buildRoadTo(room, spawn.pos, sources[sourceIndex].pos);
        }
        let extensions = room.find(FIND_MY_STRUCTURES, {filter: {structureType: STRUCTURE_EXTENSION}});
        for (let sourceIndex in extensions){
            builder.buildRoadTo(room, spawn.pos, extensions[sourceIndex].pos);
        }

        builder.buildRoadTo(room, spawn.pos, room.controller.pos);
        room.memory.initRoads = false;
    };

    /**
     * @param {RoomObject} room
     * @param {RoomPosition} startPos
     * @param {RoomPosition} targetPos
     */
    this.buildRoadTo = function(room, startPos, targetPos){
        console.log('searching for path from ' + startPos + ' to ' + targetPos);
        let foundPath = PathFinder.search(startPos, targetPos);
        /*
        if(foundPath.incomplete){
            console.log('cound not find path to source '+source.pos);
            continue;
        }
        */
        let currentConstrutions = room.find(FIND_CONSTRUCTION_SITES).length;
        for (let roomPos in foundPath.path){
            let pos = foundPath.path[roomPos];
            if (true || currentConstrutions < 10) {
                console.log('constructing road at' + pos);
                if(room.createConstructionSite(pos, STRUCTURE_ROAD) === OK){
                    currentConstrutions++;
                }
            }
        }
    };
}

module.exports = commandRoom;
