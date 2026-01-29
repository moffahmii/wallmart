'use server'

import { revalidateTag } from "next/cache";
import getUserToken from "@/app/helpers/getUserToken"

const BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}/wishlist`;

async function getHeaders() {
    const token = await getUserToken();
    return {
        'Content-Type': 'application/json',
        'token': token || ''
    };
}

export async function addToWishlist(productId: string) {
    try {
        const headers = await getHeaders();
        const res = await fetch(BASE_URL, {
            method: 'POST',
            headers,
            body: JSON.stringify({ productId })
        });
        const data = await res.json();
        if (data.status === 'success') {
            revalidateTag('wishlist', ''); 
        }
        return data;
    } catch (error) {
        console.error("Add to Wishlist Error:", error);
        return { status: 'error', message: 'Network connection failed' };
    }
}

export async function removeFromWishlist(productId: string) {
    try {
        const headers = await getHeaders();
        const res = await fetch(`${BASE_URL}/${productId}`, {
            method: 'DELETE',
            headers
        });
        const data = await res.json();
        if (data.status === 'success') {
            revalidateTag('wishlist', '');
        }
        return data;
    } catch (error) {
        console.error("Remove from Wishlist Error:", error);
        return { status: 'error', message: 'Network connection failed' };
    }
}

export async function getUserWishlist() {
    try {
        const headers = await getHeaders();
        const res = await fetch(BASE_URL, {
            method: 'GET',
            headers,
            next: { tags: ['wishlist'] } 
        });
        return await res.json();
    } catch (error) {
        console.error("Get Wishlist Error:", error);
        return { status: 'error', data: [] };
    }
}