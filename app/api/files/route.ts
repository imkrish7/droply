import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { files } from "@/lib/db/schema";
import { eq, and, isNull } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    try {
        const { userId } = await auth()
        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
            
        }

        const searchParams = request.nextUrl.searchParams;
        const queryUserId = searchParams.get("userId")
        const parentId = searchParams.get("parentId")
        
        if (!queryUserId || queryUserId != userId) {
             return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }
        let userFiles;
        if (parentId) {
            userFiles = await db
                .select()
                .from(files)
                .where(and(
                    eq(files.userId, userId),
                    eq(files.parent, parentId),
                ))
        } else {
            userFiles = await db
                .select()
                .from(files)
                .where(and(
                    eq(files.userId, userId),
                    isNull(files.parent)
                ))
        }

        return NextResponse.json({files: userFiles}, {status: 200})
    } catch (error) {
        console.error(error)
        return NextResponse.json({ error: "Internal server error" }, { status: 500 })
    }
}