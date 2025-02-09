import { prismaClient } from "@repo/db/prismaclient";

class RoomRepository {
  constructor() {}

  async CreateRoom(slug: string, userid: number) {
    try {
      const response = await prismaClient.room.create({
        data: { slug: slug, userid: userid },
      });
      return response;
    } catch (error) {
      console.log("Eoor has occured at user controller");
      throw error;
    }
  }

  async GetRooms() {
    try {
      const response = await prismaClient.room.findMany();
      return response;
    } catch (error) {
      console.log("Eoor has occured at repository controller");
      throw error;
    }
  }

  async GetRoomBySlug(slug: string) {
    try {
      const response = await prismaClient.room.findFirst({
        where: { slug: slug },
      });
      return response;
    } catch (error) {
      console.log("Eoor has occured at repository controller");
      throw error;
    }
  }
}

export { RoomRepository };
