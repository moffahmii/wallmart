export async function forgotPasswordAction(email: string) {
    try {
        const response = await fetch(`https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email }), // هنا بنبعت الإيميل بس زي ما طلبت
        });

        const data = await response.json();

        if (data.statusMsg === "fail") {
            throw new Error(data.message);
        }

        return { success: true, message: data.message };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}