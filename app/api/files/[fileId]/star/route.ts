import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { files } from "@/lib/db/schema";
import { NextRequest, NextResponse } from "next/server";
import { and, eq } from "drizzle-orm";


export async function PATCH(request: NextRequest, prop: {params: Promise<{fileId:string}>}) {
    try {
        const { userId } = await auth()
        if (!userId) {
            return NextResponse.json({error: "Unauthorized"}, {status: 401})
        }

        const { fileId } = await prop.params;
        if (!fileId) {
            return NextResponse.json({error: "file id is required"}, {status: 405})
        }

        const [file] = await db
            .select()
            .from(files)
            .where(
            and(
                eq(files.id, fileId),
                eq(files.userId, userId)
            )
        )
        if (!file) {
            return NextResponse.json({error: "File not found"}, {status: 404})
        }

        // Toggle starred

       const updatedFiles = await db.update(files).set({ isStared: !file.isStared }).where(
            and(
                eq(files.id, fileId),
                eq(files.userId, userId)
            )
        ).returning()
        const updatedFile = updatedFiles[0]
        return NextResponse.json({ success: true, file: updatedFile }, {status: 201})

    } catch (error) {
        console.error(error)
        return NextResponse.json({error: "Internal server error"}, {status: 500})
    }
}