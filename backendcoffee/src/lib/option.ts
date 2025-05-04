
export const corsHeaders = {
    "Access-Control-Allow-Origin": "http://localhost:3000",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export function RequestOptions() {
    return new Response(null, {
        status: 204,
        headers: corsHeaders,
    });
}