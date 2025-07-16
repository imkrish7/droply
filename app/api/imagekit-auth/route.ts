import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import ImageKit from 'imagekit';

const imagekit = new ImageKit({
    publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY || "",
    privateKey: process.env.NEXT_PUBLIC_IMAGEKIT_PRIVATE_KEY || "",
    urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT|| "",
})


export async function GET() {
    const { userId } = await auth();
    try {
        if (userId) {
        const authParams = imagekit.getAuthenticationParameters();

        return NextResponse.json({authParams})
        
        } else {
            return NextResponse.json({error: "Unauthorized"}, {status: 401})
        }
        
    } catch (_error) {
        console.error(_error)
        return NextResponse.json({error: "Unauthorized" }, {status: 401})
    }
  
}
