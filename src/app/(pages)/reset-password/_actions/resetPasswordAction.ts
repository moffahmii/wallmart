'use server'
export async function resetPasswordAction(email: string, newPassword: string) {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/resetPassword`, {
            method: 'PUT', 
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, newPassword }),
        });
        const data = await response.json();
        if (!data.token) {
            throw new Error(data.message || "Failed to reset password");
        }
        return { success: true };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}
