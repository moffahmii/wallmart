'use server'

import { revalidateTag } from "next/cache";
import getUserToken from "@/app/helpers/getUserToken"; // تأكد من المسار الصحيح للهيلبر عندك

const BASE_URL = `${process.env.API_URL}/wishlist`;

/**
 * هيلبر داخلي لجلب الهيدرز بالتوكن
 */
async function getHeaders() {
    const token = await getUserToken();
    return {
        'Content-Type': 'application/json',
        'token': token || ''
    };
}

/**
 * 1. إضافة منتج لقائمة الأمنيات
 */
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
            revalidateTag('wishlist',''); // تحديث البيانات في الصفحات التي تعرض الويش ليست
        }
        return data;
    } catch (error) {
        console.error("Add to Wishlist Error:", error);
        return { status: 'error', message: 'Network connection failed' };
    }
}

/**
 * 2. حذف منتج من قائمة الأمنيات
 */
export async function removeFromWishlist(productId: string) {
    try {
        const headers = await getHeaders();
        const res = await fetch(`${BASE_URL}/${productId}`, {
            method: 'DELETE',
            headers
        });

        const data = await res.json();
        if (data.status === 'success') {
            revalidateTag('wishlist','');
        }
        return data;
    } catch (error) {
        console.error("Remove from Wishlist Error:", error);
        return { status: 'error', message: 'Network connection failed' };
    }
}

/**
 * 3. جلب كافة منتجات قائمة الأمنيات الخاصة بالمستخدم
 */
export async function getUserWishlist() {
    try {
        const headers = await getHeaders();
        const res = await fetch(BASE_URL, {
            method: 'GET',
            headers,
            next: { tags: ['wishlist'] } // لتمكين الـ Cache والـ Revalidation
        });

        return await res.json();
    } catch (error) {
        console.error("Get Wishlist Error:", error);
        return { status: 'error', data: [] };
    }
}