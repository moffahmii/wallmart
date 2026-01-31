"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { addAddressAction, updateAddressAction } from "../_actions/Profile.actions"
import { toast } from "sonner"
import { Loader2 } from "lucide-react"

export default function AddressForm({
    onSuccess,
    initialData
}: {
    onSuccess: () => void,
    initialData?: any
}) {
    const [isLoading, setIsLoading] = useState(false);

    async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setIsLoading(true);

        const formData = new FormData(e.currentTarget);
        const payload = {
            name: formData.get("name") as string,
            city: formData.get("city") as string,
            phone: formData.get("phone") as string,
            details: formData.get("details") as string,
        };

        try {
            const result = initialData
                ? await updateAddressAction(initialData._id, payload)
                : await addAddressAction(payload);

            if (result.success) {
                toast.success(initialData ? "Address updated successfully" : "Address added successfully");
                onSuccess();
            } else {
                toast.error(result.message || "Something went wrong");
            }
        } catch (error) {
            toast.error("Connection error");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <form onSubmit={onSubmit} className="space-y-5 pt-4">
            {/* Label Field */}
            <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 pl-1">
                    Address Label
                </Label>
                <Input
                    name="name"
                    defaultValue={initialData?.name}
                    placeholder="e.g. Home / Work"
                    required
                    className="rounded-xl h-12 border-slate-100 bg-slate-50/50 focus:bg-white transition-colors"
                />
            </div>

            {/* City & Phone Grid */}
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 pl-1">
                        City
                    </Label>
                    <Input
                        name="city"
                        defaultValue={initialData?.city}
                        placeholder="Giza"
                        required
                        className="rounded-xl h-12 border-slate-100 bg-slate-50/50 focus:bg-white transition-colors"
                    />
                </div>
                <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 pl-1">
                        Phone
                    </Label>
                    <Input
                        name="phone"
                        defaultValue={initialData?.phone}
                        placeholder="010XXXXXXXX"
                        required
                        className="rounded-xl h-12 border-slate-100 bg-slate-50/50 focus:bg-white transition-colors"
                    />
                </div>
            </div>

            {/* Details Field */}
            <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 pl-1">
                    Full Details
                </Label>
                <Input
                    name="details"
                    defaultValue={initialData?.details}
                    placeholder="Street, Building, Flat"
                    required
                    className="rounded-xl h-12 border-slate-100 bg-slate-50/50 focus:bg-white transition-colors"
                />
            </div>

            {/* Action Button */}
            <Button
                disabled={isLoading}
                className="w-full h-12 rounded-xl bg-slate-950 hover:bg-blue-600 font-bold uppercase italic tracking-tighter transition-all duration-300 mt-2 shadow-lg shadow-slate-200"
            >
                {isLoading ? (
                    <>
                        <Loader2 className="animate-spin h-5 w-5 mr-2" />
                        Processing...
                    </>
                ) : (
                    initialData ? "Update Address" : "Save New Address"
                )}
            </Button>
        </form>
    );
}