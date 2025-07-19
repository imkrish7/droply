import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { files } from "@/lib/db/schema";
import { eq, and } from "drizzle-orm"
import ImageKit from "imagekit";

import { NextRequest, NextResponse } from "next/server";

const imagekit = new ImageKit({
    publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY || "",
    privateKey: process.env.NEXT_PUBLIC_IMAGEKIT_PRIVATE_KEY || "",
    urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT|| "",
})

export async function DELETE(request: NextRequest, prop: {params: Promise<{fileId: string}>}) {
    try {
        const { userId } = await auth();
        if (!userId) {
            return NextResponse.json({error: "Unauthorized"}, {status: 401})
        }

        const { fileId } = await prop.params
        
        if (!fileId) {
            return NextResponse.json({error: "File id is required"}, {status: 403})
        }
        const [file] = await db
            .select()
            .from(files)
            .where(
            and(
                eq(files.userId, userId),
                eq(files.id, fileId)
            )
        );

        if (!file) {
            return NextResponse.json({error: "File not found"}, {status: 404})
        }
        
        
        const deleteFromImagekit = await imagekit.deleteFile(file.imagekitId);

        console.log("imagekit response", deleteFromImagekit, "\n");
        
        const deleteFromDbFile = await db.delete(files).where(and(
            eq(files.userId, userId),
            eq(files.id, fileId)
        ));

        console.log(deleteFromDbFile, "dbResponse")

        return NextResponse.json({success: true, message: "A file has been deleted" })

    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: "Internal server error" }, { status : 500})
    }
}