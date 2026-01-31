'use server'

import getUserToken from "@/app/helpers/getUserToken";
import { revalidateTag } from "next/cache";

const BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}/wishlist`;

async function getHeaders() {
    const token = await getUserToken();
    if (!token) return null;
    return {
        'Content-Type': 'application/json',
        'token': token
    };
}

export async function getUserWishlist() {
    try {
        const headers = await getHeaders();
        if (!headers) return { status: 'success', data: [] };
        const res = await fetch(BASE_URL, {
            method: 'GET',
            headers,
            next: { tags: ['wishlist'] }
        });
        return await res.json();
    } catch (error) {
        return { status: 'error', data: [] };
    }
}

export async function addToWishlist(productId: string) {
    try {
        const headers = await getHeaders();
        if (!headers) return { status: 'error' };
        const res = await fetch(BASE_URL, {
            method: 'POST',
            headers,
            body: JSON.stringify({ productId })
        });
        const data = await res.json();
        if (res.ok) {
            revalidateTag("wishlist",'');
        }
        return data;
    } catch (error) {
        return { status: 'error' };
    }
}

export async function removeFromWishlist(productId: string) {
    try {
        const headers = await getHeaders();
        if (!headers) return { status: 'error' };
        const res = await fetch(`${BASE_URL}/${productId}`, {
            method: 'DELETE',
            headers
        });
        const data = await res.json();
        if (res.ok) {
            revalidateTag("wishlist",'');
        }
        return data;
    } catch (error) {
        return { status: 'error' };
    }
}