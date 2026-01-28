import { CartResponse } from "@/interfaces"
import { NextResponse } from "next/server"

export async function GET() {
    const response = await fetch(
        'https://ecommerce.routemisr.com/api/v1/cart',
        {
            headers: {
                token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5NzRmOTdjZmM5YTIxZTBlNjUxODViNiIsIm5hbWUiOiJNb2hhbWVkIEZhaG1pIiwicm9sZSI6InVzZXIiLCJpYXQiOjE3NjkzNzA5MTMsImV4cCI6MTc3NzE0NjkxM30.SlvFLZd5Y6RqTOIyAu_W3N217XTdayTcEWJ3uUBx3yw"
            },
        })
    const data: CartResponse = await response.json()
    return NextResponse.json(data)
}