import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { corsHeaders, RequestOptions } from "@/lib/cors";
import { checkUserExists } from "@/lib/existingUser";

export function OPTIONS() {
    return RequestOptions();
}

// ✅ Create User
export async function POST(req: NextRequest) {
    try {
        const { userId, email, username } = await req.json();

        const existingUser = await checkUserExists(email, userId)
        if (existingUser) {
            return NextResponse.json({ success: false, message: "User already exists" },
                { status: 409, headers: corsHeaders })
        }

        if (!userId || !email || !username) {
            return NextResponse.json(
                { success: false, message: "userId, email, and username are required" },
                { status: 400 }
            );
        }

        const newUser = await prisma.user.create({
            data: {
                userId,
                email,
                username,
            },
        });

        return NextResponse.json({ success: true, newUser },
            
            { status: 201, headers: corsHeaders, });

    } catch (error: any) {
        return NextResponse.json({ success: false, message: error.message }, { status: 500, headers: corsHeaders });
    }
}


// ✅ Get All Users
export async function GET() {
    try {
        const users = await prisma.user.findMany({
            include: {
                profile: true,
                donations: true,
            },
        });

        return NextResponse.json({ success: true, users });
    } catch (error: any) {
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
}

// ✅ Update User
export async function PUT(req: NextRequest) {
    try {
        const { userId, email, username } = await req.json();

        if (!userId) {
            return NextResponse.json({ success: false, message: "userId is required" }, { status: 400 });
        }

        const updatedUser = await prisma.user.update({
            where: { userId },
            data: { email, username },
        });

        return NextResponse.json({ success: true, updatedUser });
    } catch (error: any) {
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
}

// ✅ Delete User
export async function DELETE(req: NextRequest) {
    try {
        const { userId } = await req.json();

        if (!userId) {
            return NextResponse.json({ success: false, message: "userId is required" }, { status: 400 });
        }

        await prisma.user.delete({ where: { userId } });

        return NextResponse.json({ success: true, message: "User deleted successfully" });
    } catch (error: any) {
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
}