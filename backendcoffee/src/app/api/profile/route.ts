import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { corsHeaders, RequestOptions } from "@/lib/option";
import { checkProfileExists } from "@/lib/existingUser";
import { cors } from "@/lib/resHeader";

export function OPTIONS() {
    return RequestOptions();
}

// ✅ Create Profile
export async function POST(req: NextRequest) {
    try {
        const { userId, name, image, about, socialUrl } = await req.json();

        const existingUser = await checkProfileExists(null, userId)
        if (existingUser) {
            return NextResponse.json({ success: false, message: "User already exists" },
                { status: 409, headers: corsHeaders })
        }

        if (!userId || !name) {
            return NextResponse.json(
                { success: false, message: "userId and name are required" },
                { status: 400, headers: corsHeaders }
            );
        }

        const newProfile = await prisma.profile.create({
            data: {
                userId,
                name,
                image,
                about,
                socialUrl,
            },
        });

        return cors({ success: true, newProfile });

    } catch (error: any) {
        return NextResponse.json({ success: false, message: error.message }, { status: 500, headers: corsHeaders });
    }
}


export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    try {
        if (userId) {
            // ✅ Get ONE Profile
            const profile = await prisma.profile.findUnique({
                where: { userId },
            });

            if (!profile) {
                return cors({ success: false, message: "Profile not found" }, 404);
            }

            return cors({ success: true, profile }, 200);
        } else {
            // ✅ Get ALL Profiles
            const profiles = await prisma.profile.findMany({
                include: {
                    user: true,
                },
            });

            return cors({ success: true, profiles }, 200);
        }
    } catch (error: any) {
        return cors({ success: false, message: error.message }, 500);
    }
}


// ✅ Update Profile
export async function PUT(req: NextRequest) {
    try {
        const { userId, name, image, about, socialUrl } = await req.json();

        if (!userId) {
            return NextResponse.json({ success: false, message: "userId is required" }, { status: 400 });
        }

        const updatedProfile = await prisma.profile.update({
            where: { userId },
            data: {
                name,
                image,
                about,
                socialUrl,
            },
        });

        return NextResponse.json({ success: true, updatedProfile }, { headers: corsHeaders });
    } catch (error: any) {
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
}

// ✅ Delete Profile
export async function DELETE(req: NextRequest) {
    try {
        const { userId } = await req.json();

        if (!userId) {
            return NextResponse.json({ success: false, message: "userId is required" }, { status: 400 });
        }

        await prisma.profile.delete({ where: { userId } });

        return NextResponse.json({ success: true, message: "Profile deleted successfully" });
    } catch (error: any) {
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
}