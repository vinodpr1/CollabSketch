import { RoomRepository } from "../repository";
const roomRepository = new RoomRepository();

class RoomServices{
    constructor(){}
  
    async CreateRoom(data:any){
       try {
          const response = await roomRepository.CreateRoom(data);
          return response;
       } catch (error) {
         console.log("Eoor has occured at user controller");
         throw error;
       } 
    }

    async GetRooms(){
        try {
           const response = await roomRepository.GetRooms();
           return response;
        } catch (error) {
          console.log("Eoor has occured at user controller");
          throw error;
        } 
     }

};

export {
    RoomServices
}