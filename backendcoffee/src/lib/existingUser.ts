import { prisma } from "@/lib/prisma";

export async function checkUserExists(email: string | null, userId: string) {
    return await prisma.user.findFirst({
        where: {
            OR: [{ userId }, { email }],
        },
    });
}

export async function checkProfileExists(email: string | null, userId: string) {
    return await prisma.profile.findFirst({
        where: {
            OR: [{ userId }],
        },
    });
}

