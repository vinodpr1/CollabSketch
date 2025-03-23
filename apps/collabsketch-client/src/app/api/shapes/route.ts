import { prismaClient } from "@repo/db/prismaclient";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { AuthOptions } from "@/app/lib/auth";

export async function GET(req: NextRequest, res: NextResponse) {
  const session = await getServerSession(AuthOptions);
  if (!session?.user) {
    return NextResponse.json(
      {
        message: "Please login first to get shapes",
      },
      {
        status: 401,
      },
    );
  }

  const url = new URL(req.url);
  const searchparams = new URLSearchParams(url.search);
  const slug = searchparams.get("slug");
  if (!slug) {
    return NextResponse.json(
      {
        message: "Invalid room",
      },
      {
        status: 401,
      },
    );
  }

  const room = await prismaClient.room.findFirst({ where: { slug: slug } });

  const response = await prismaClient.chat.findMany({
    where: {
      roomid: room?.id,
    },
  });

  return NextResponse.json(
    {
      message: "Hello successsy",
      response: response,
    },
    {
      status: 201,
    },
  );
}
