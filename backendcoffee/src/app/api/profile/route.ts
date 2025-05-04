import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { corsHeaders, RequestOptions } from "@/lib/cors";
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

// ✅ Get All Profiles
export async function GET() {
    try {
        const profiles = await prisma.profile.findMany({
            include: {
                user: true,
            },
        });

        return NextResponse.json({ success: true, profiles });
    } catch (error: any) {
        return NextResponse.json({ success: false, message: error.message }, { status: 500, headers: corsHeaders });
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