import { prismaClient } from "@repo/db/prismaclient";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { AuthOptions } from "@/app/lib/auth";

export async function POST(req: NextRequest, res: NextResponse) {
  const session = await getServerSession(AuthOptions);
  if (!session?.user) {
    return NextResponse.json(
      {
        message: "Please login first to create rooms",
      },
      {
        status: 401,
      },
    );
  }
  const body = await req.json();

  if (!body.slug) {
    return NextResponse.json(
      {
        message: "Invalid room slug",
      },
      {
        status: 401,
      },
    );
  }

  const response = await prismaClient.room.create({
    data: { slug: body.slug, userid: session?.user?.id },
  });

  return NextResponse.json(
    {
      message: "Hello successsy",
      data: response,
    },
    {
      status: 201,
    },
  );
}

export async function GET(req: NextRequest, res: NextResponse) {
  const rooms = await prismaClient.room.findMany({});
  return NextResponse.json({
    data: rooms,
  });
}
