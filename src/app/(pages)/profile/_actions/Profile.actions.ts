"use server"

import getUserToken from "@/app/helpers/getUserToken";
import { revalidateTag } from "next/cache";

async function getHeaders() {
    const token = await getUserToken();
    return {
        "Content-Type": "application/json",
        "token": token || "",
    };
}

export async function getAddressesAction() {
    const headers = await getHeaders();
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/addresses`, {
        headers,
        next: { tags: ['addresses'] }
    });
    return await res.json();
}

export async function addAddressAction(formData: { name: string, details: string, phone: string, city: string }) {
    try {
        const headers = await getHeaders();
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/addresses`, {
            method: "POST",
            headers,
            body: JSON.stringify(formData),
        });
        if (res.ok) {
            revalidateTag("addresses", '');
            return { success: true };
        }
        const data = await res.json();
        return { success: false, message: data.message || "Failed to add address" };
    } catch (error) {
        return { success: false, message: "Network error" };
    }
}

export async function updateAddressAction(addressId: string, payload: any) {
    try {
        const headers = await getHeaders();
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/addresses/${addressId}`, {
            method: "PUT",
            headers,
            body: JSON.stringify(payload)
        });

        if (res.ok) {
            revalidateTag("addresses", '');
            return { success: true };
        }
        const data = await res.json();
        return { success: false, message: data.message };
    } catch (error) {
        return { success: false, message: "Network error" };
    }
}

export async function deleteAddressAction(addressId: string) {
    try {
        const headers = await getHeaders();
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/addresses/${addressId}`, {
            method: "DELETE",
            headers,
        });

        if (res.ok) {
            revalidateTag("addresses", '');
            return { success: true };
        }
        const data = await res.json();
        return { success: false, message: data.message || "Failed to delete" };
    } catch (error) {
        return { success: false, message: "Network error" };
    }
}


export async function getUserOrdersAction(userId: string) {
    if (!userId) return [];
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders/user/${userId}`, {
            cache: 'no-store'
        });
        const data = await res.json();
        return Array.isArray(data) ? data : [];
    } catch (error) {
        return [];
    }
}

// أضف هذا الاستيراد في أعلى الملف
import { revalidatePath } from "next/cache";

export async function updateMeAction(payload: { name: string, email: string, phone: string }) {
    try {
        const headers = await getHeaders();
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/updateMe`, {
            method: "PUT",
            headers: {
            },
            body: JSON.stringify(payload)
        });
        const data = await res.json();
        if (res.ok) {
            revalidatePath("/", "layout");
            return { success: true, data: data.user };
        }
        return { success: false, message: data.message || "Update failed" };
    } catch (error) {
        return { success: false, message: "Network error" };
    }
}

export async function changePasswordAction(formData: any) {
    try {
        const headers = await getHeaders();
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/changeMyPassword`, {
            method: "PUT",
            headers,
            body: JSON.stringify(formData),
        });

        const data = await res.json();
        return res.ok ? { success: true } : { success: false, message: data.errors?.msg || data.message };
    } catch (error) {
        return { success: false, message: "Network error" };
    }
}