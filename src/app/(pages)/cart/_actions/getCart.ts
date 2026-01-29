// app/cart/_actions/cartActions.ts

export async function getCartAction() {
    try {
        const headers = await getAuthHeaders(); // الهيلبر الذي جلبناه سابقاً
        const res = await fetch(`${BASE_URL}`, {
            method: 'GET',
            headers,
            next: { tags: ['cart'] } // لضمان تحديث البيانات
        });
        return await res.json();
    } catch (error) {
        console.error("Get Cart Error:", error);
        return null;
    }
}