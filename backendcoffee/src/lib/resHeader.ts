import { NextResponse } from "next/server";
import { corsHeaders } from "./option";

export function cors(data: any, status = 200) {
    return NextResponse.json(data, {
        status,
        headers: corsHeaders,
    });
}