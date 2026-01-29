'use server'

import getUserToken from "@/app/helpers/getUserToken"
import { CartResponse } from "@/interfaces"
import { get } from "http"
export default async function removeFromCartAction(productId: string) {
    const token = await getUserToken()
    const response = await fetch(
        `${process.env.API_URL}/cart/` + productId,
        {
            method: 'DELETE',
            headers: {
                token: token!
            },
        })
    const data: CartResponse = await response.json()
    return data
}