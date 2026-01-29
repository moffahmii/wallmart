'use server';
export async function verifyResetCodeAction(resetCode: string) {
    try {
        const response = await fetch(`${process.env.API_URL}/auth/verifyResetCode`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ resetCode }),
        });
        const data = await response.json();
                if (data.status !== "Success") {
            throw new Error(data.message || "Invalid or expired code");
        }

        return { success: true };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}