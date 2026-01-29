'use server'
import getUserToken from "@/app/helpers/getUserToken"
import { CartResponse } from "@/interfaces"

export default async function clearCartAction() {
    const token = await getUserToken()
    const response = await fetch(
        `${process.env.API_URL}/cart/`,
        {
            method: 'DELETE',
            headers: {
                token: String(token)
            },
        }
    )
    const data: CartResponse = await response.json()
    return data
}