'use server'

export async function registerAction(formData: any) {
    try {
        const response = await fetch(`${process.env.API_URL}/auth/signup`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.message || "Registration failed");

        return { success: true };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}