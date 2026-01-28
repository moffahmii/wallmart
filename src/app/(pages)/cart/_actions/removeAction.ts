'use server'

import { CartResponse } from "@/interfaces"

export default async function removeFromCartAction(productId: string) {
    const response = await fetch(
        `${process.env.API_URL}/cart/` + productId,
        {
            method: 'DELETE',
            headers: {
                token:
                    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5NzRmOTdjZmM5YTIxZTBlNjUxODViNiIsIm5hbWUiOiJNb2hhbWVkIEZhaG1pIiwicm9sZSI6InVzZXIiLCJpYXQiOjE3NjkzNzA5MTMsImV4cCI6MTc3NzE0NjkxM30.SlvFLZd5Y6RqTOIyAu_W3N217XTdayTcEWJ3uUBx3yw',
            },
        })
    const data: CartResponse = await response.json()
    return data
}