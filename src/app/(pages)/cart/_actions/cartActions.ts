'use server'

import getUserToken from "@/app/helpers/getUserToken";
import { revalidateTag } from "next/cache";

const BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}/cart`;

async function getAuthHeaders() {
    const token = await getUserToken();
    return {
        'Content-Type': 'application/json',
        'token': token || ''
    };
}

export async function getCartAction() {
    try {
        const headers = await getAuthHeaders();
        const res = await fetch(BASE_URL, {
            method: 'GET',
            headers,
            next: { tags: ['cart'] }
        });
        if (res.status === 404) return { status: 'success', numOfCartItems: 0, data: { products: [] } };
        const data = await res.json();
        return res.ok ? data : { status: 'error', message: data.message };
    } catch (error) {
        return { status: 'error', message: 'Network connection failed' };
    }
}

export async function updateCartAction(productId: string, count: number) {
    try {
        const headers = await getAuthHeaders();
        const res = await fetch(`${BASE_URL}/${productId}`, {
            method: 'PUT',
            headers,
            body: JSON.stringify({ count })
        });
        const data = await res.json();
        if (res.ok) revalidateTag('cart', '');
        return data;
    } catch (error) {
        return { status: 'error' };
    }
}

export async function removeFromCartAction(productId: string) {
    try {
        const headers = await getAuthHeaders();
        const res = await fetch(`${BASE_URL}/${productId}`, {
            method: 'DELETE',
            headers
        });
        const data = await res.json();
        if (res.ok) revalidateTag('cart', '');
        return data;
    } catch (error) {
        return { status: 'error' };
    }
}