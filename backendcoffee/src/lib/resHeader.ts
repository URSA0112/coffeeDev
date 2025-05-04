import { NextResponse } from "next/server";
import { corsHeaders } from "./cors";

export function cors(data: any, status = 200) {
    return NextResponse.json(data, {
        status,
        headers: corsHeaders,
    });
}