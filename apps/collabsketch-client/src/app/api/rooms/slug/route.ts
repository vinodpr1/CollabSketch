import { prismaClient } from "@repo/db/prismaclient";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { AuthOptions } from "@/app/lib/auth";

export async function GET(req: NextRequest, res: NextResponse) {
  const slug = new URL(req.url);
  const searchparam = new URLSearchParams(slug.search).get("slug");

  if (!searchparam) {
    return NextResponse.json({
      message: "Invalid Search param slug",
    });
  }

  const response = await prismaClient.room.findFirst({
    where: { slug: searchparam },
  });

  return NextResponse.json({
    room: response,
  });
}
