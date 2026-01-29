'use server';
export async function forgotPasswordAction(email: string) {
    try {
        const response = await fetch(`${process.env.API_URL}/auth/forgotPasswords`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email }),
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