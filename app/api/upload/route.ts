import { auth } from "@clerk/nextjs/server"
import { files } from "@/lib/db/schema"
import { db } from "@/lib/db"
import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {

    try {

        const { userId } = await auth()
        if (!userId) {
            return NextResponse.json({error: "Unauthorized"}, {status: 401})
        }

        // parse request body

        const body = await request.json();
        const { imageKit, userId: bodyUserId } = body;

        if (bodyUserId != userId) {
            return NextResponse.json({ "error": "Unauthorized" }, { status: 401 });
        }

        if (!imageKit || !imageKit.url) {
            return NextResponse.json({
                error: "Invalid file upload data"
            }, {status: 401})
        }

        const fileData = {
            name: imageKit.name || "untitled",
            path: imageKit.filePath || `/droply/${userId}/${imageKit.name}`,
            userId: userId,
            size: imageKit.size || 0,
            type: imageKit.fileType || "image",
            fileUrl: imageKit.url,
            thumbnail: imageKit.thumbnailUrl || null,
            parentId: null,
            isFolder: false,
            isStarred: false,
            isTrash: false
        }

        const [newFile] = await db.insert(files).values(fileData).returning()
        return NextResponse.json({newFile})
    } catch (error) {
        console.error(error)
         return NextResponse.json({
                error: "Failed to save upload data into db"
            }, {status: 401})
    }
    
}