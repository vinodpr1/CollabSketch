import { UserServices } from "../services";

const userServices = new UserServices();

export const SignUp = async (req: any, res: any) => {
    try {
        const data = req.body;
        const user = await userServices.SignUp(data); 
        res.status(200).json({
            message: "signup successfully",
            user: user,
        });
    } catch (error) {
        res.status(400).json({
            message:"can't signup successfully",
            err: error
        })
    }
}

export const SignIn = async (req: any, res: any) => {
    try {
        const data = req.body;
        const user = await userServices.SignIn(data); 
        res.status(200).json({
            message: "signin successfully",
            user: user,
        });
    } catch (error) {
        res.status(400).json({
            message:"can't signin successfully",
            err: error
        })
    }
}

// export const JoinRoom = async (req: any, res: any) => {
//     try {
//         const token = req.headers.token 
//         const slug = req.query.slug;
//         const user = await userServices.JoinRoom(token, slug); 
//         res.status(200).json({
//             message: "Joined the room successfully",
//             user: user,
//         });
//     } catch (error) {
//         res.status(400).json({
//             message:"can't join room",
//             err: error
//         })
//     }
// }


// export const GetRoom = async (req: any, res: any) => {
//     try {
//         const user = await userServices.GetRoom(); 
//         res.status(200).json({
//             message: "fetched all room successfully",
//             rooms: user,
//         });
//     } catch (error) {
//         res.status(400).json({
//             message:"can't join room",
//             err: error
//         })
//     }
// }

