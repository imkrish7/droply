"use client"
import { ImageKitProvider } from "imagekitio-next"

const authenticater = async () => {
  try {
    const response = fetch("/api/imagekit-auth");
    const data = (await response).json()
    return data;
  } catch (error) {
    console.log("Authentication Error:", error)
    throw error;
  }
}

export function Providers({children}: { children: React.ReactNode }) {
  return (
      <ImageKitProvider authenticator={authenticater}
        publicKey={process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY || ""}
        urlEndpoint={process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT || ""}
      >
        {children}
      </ImageKitProvider>
  )
}