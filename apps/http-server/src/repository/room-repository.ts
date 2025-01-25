import {prismaClient} from "@repo/db/prismaclient"

class RoomRepository{
    constructor(){}

    async CreateRoom(data:any){
        try {
            console.log(data);
            return  1234;
        } catch (error) {
           console.log("Eoor has occured at user controller");
           throw error;
        }
    }

    async GetRooms(){
        try {
            const response = await prismaClient.room.findMany();
            return  response;
        } catch (error) {
           console.log("Eoor has occured at repository controller");
           throw error;
        }
    }

}


export {
    RoomRepository
}