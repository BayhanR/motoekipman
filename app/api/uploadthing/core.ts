import { createUploadthing, type FileRouter } from "uploadthing/next"
import { auth } from "@/lib/auth"

const f = createUploadthing()

export const ourFileRouter = {
    productImage: f({
        image: {
            maxFileSize: "4MB",
            maxFileCount: 4,
        },
    })
        .middleware(async ({ req }) => {
            const session = await auth()
            if (!session?.user?.role || (session.user.role !== "ADMIN" && session.user.role !== "SUPERADMIN")) {
                throw new Error("Unauthorized")
            }
            return { userId: session.user.id }
        })
        .onUploadComplete(async ({ metadata, file }) => {
            console.log("Upload complete for userId:", metadata.userId)
            return { uploadedBy: metadata.userId }
        }),
} satisfies FileRouter

export type OurFileRouter = typeof ourFileRouter
