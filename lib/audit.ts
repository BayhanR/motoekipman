import { prisma } from "@/lib/prisma"
import { Prisma } from "@prisma/client"

interface LogActionParams {
    userId: string
    action: string
    entity: string
    entityId: string
    oldValue?: object
    newValue?: object
}

export async function logAction({
    userId,
    action,
    entity,
    entityId,
    oldValue,
    newValue,
}: LogActionParams) {
    try {
        await prisma.auditLog.create({
            data: {
                userId,
                action,
                entity,
                entityId,
                oldValue: (oldValue || null) as Prisma.InputJsonValue,
                newValue: (newValue || null) as Prisma.InputJsonValue,
            },
        })
    } catch (error) {
        console.error("Failed to write audit log:", error)
    }
}
