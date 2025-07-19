import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { files } from "@/lib/db/schema";
import { eq, and } from "drizzle-orm"
import ImageKit from "imagekit";

import { v4 as uuidv4 } from "uuid";
import { NextRequest, NextResponse } from "next/server";

const imagekit = new ImageKit({
    publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY || "",
    privateKey: process.env.NEXT_PUBLIC_IMAGEKIT_PRIVATE_KEY || "",
    urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT|| "",
})

export async function POST(request: NextRequest) {
    try {
        const { userId } = await auth();
        if (!userId) {
            return NextResponse.json({error: "Unauthorized"}, {status: 401})
        }
        const formData = await request.formData();
        const file = formData.get("file") as File;
        const formUserId = formData.get("userId") as string;
        const parentId = formData.get("parentId") as string || null;

        if (formUserId != userId) {
            return NextResponse.json({error: "Unauthorized"}, {status: 401})
        }

        if (!file) {
            return NextResponse.json({error: "No file provided"}, {status: 405})
        }

        if (parentId) {
            const [parentFolder] = await db
                .select()
                .from(files)
                .where(
                    and(
                        eq(files.id, parentId),
                        eq(files.userId, userId),
                        eq(files.isFolder, true)
                )
            )

            if (!parentFolder) {
                return NextResponse.json({error: "Folder does not exist"})
            }
        } else {
            // return NextResponse.json({error: "Parent folder not found"}, {status: 404})
        }
        console.log(file)

        if (!file.type.startsWith("image/") && file.type != "application/pdf") {
            return NextResponse.json({error: "Only images and pdf are supported"}, {status: 405})
        }

        const buffer = await file.arrayBuffer();
        const fileBuffer = Buffer.from(buffer);

        const folderPath = parentId ? `/droply/${userId}/folder/${parentId}` : `/droply/${userId}`
        const originalName = file.name;
        const uniqueFileName = `${uuidv4()}.${originalName.split(".").pop() || ""}`
        const uploadFile = await imagekit.upload({
            file: fileBuffer,
            fileName: uniqueFileName,
            folder: folderPath,
            useUniqueFileName: true
        })

        console.log(uploadFile)

        const fileData = {
            name: originalName,
            path: uploadFile.filePath,
            size: file.size,
            type: file.type,
            imagekitId: uploadFile.fileId,
            fileUrl: uploadFile.url,
            thumbnailUrl: uploadFile.thumbnailUrl || null,
            userId: userId,
            parentId: parentId,
            isFolder: false,
            isStarred: false,
            isTrash: false,
        }

        const [newFile] = await db.insert(files).values(fileData).returning()

        return NextResponse.json({success: true, message: "A file has been uploaded", file:newFile })

    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: "Internal server error" }, { status : 500})
    }
}