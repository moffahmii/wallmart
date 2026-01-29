'use server'

import getUserToken from "@/app/helpers/getUserToken";

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
        if (!res.ok) throw new Error("Failed to fetch cart");
        return await res.json();
    } catch (error) {
        console.error("Get Cart Action Error:", error);
        return { status: 'error', message: 'Could not retrieve cart data' };
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
        return data;
    } catch (error) {
        console.error("Update Cart Action Error:", error);
        return { status: 'error', message: 'Failed to update item count' };
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
        return data;
    } catch (error) {
        console.error("Remove From Cart Action Error:", error);
        return { status: 'error', message: 'Failed to remove item' };
    }
}


export async function clearCartAction() {
    try {
        const headers = await getAuthHeaders();
        const res = await fetch(BASE_URL, {
            method: 'DELETE',
            headers
        });
        const data = await res.json();
        return data;
    } catch (error) {
        console.error("Clear Cart Action Error:", error);
        return { status: 'error', message: 'Failed to clear cart' };
    }
}