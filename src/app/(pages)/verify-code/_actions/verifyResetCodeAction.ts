export async function verifyResetCodeAction(resetCode: string) {
    try {
        const response = await fetch(`https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ resetCode }),
        });

        const data = await response.json();
        
        // API Route يرجع status: "Success" عند نجاح الكود
        if (data.status !== "Success") {
            throw new Error(data.message || "Invalid or expired code");
        }

        return { success: true };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}