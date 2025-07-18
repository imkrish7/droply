import { db } from "@/lib/db";
import { files } from "@/lib/db/schema";
import { auth } from "@clerk/nextjs/server";
import { eq, and } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    console.log("CALLEEED")
    try {
        const { userId } = await auth()
        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
            
        }
        const searchParams = request.nextUrl.searchParams;
        const queryUserId = searchParams.get("userId")
        const isTrash = Boolean(searchParams.get("trash"));
        console.log(queryUserId, userId, isTrash)
        if (!queryUserId || queryUserId != userId) {
             return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }
    
        const userFiles = await db
            .select()
            .from(files)
            .where(and(
                eq(files.userId, userId),
                eq(files.isTrash, isTrash)
            ))
        

        return NextResponse.json({files: userFiles}, {status: 200})
    } catch (error) {
        console.error(error)
        return NextResponse.json({ error: "Internal server error" }, { status: 500 })
    }
}