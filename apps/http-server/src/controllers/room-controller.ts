import { RoomServices } from "../services/room-service";
const roomServices = new RoomServices();

export const CreateRoom = async (req: any, res: any) => {
    try {
        const data = req.body;
        const response = await roomServices.CreateRoom("vinod");
        res.status(200).json({
            message: "Room created successfully",
            response: response
        });
    } catch (error) {
        res.status(400).json({
            message: "Room can't created successfully",
            err: error
        })

    }
}

export const GetRooms = async(req: any, res: any) => {
    try {
        const response = await roomServices.GetRooms(); 
        res.status(200).json({
            message: "All room finded successfully",
            response: response,
        });
    } catch (error) {
        res.status(400).json({
            message: "Room can't find successfully",
            err: error
        })

    }
}