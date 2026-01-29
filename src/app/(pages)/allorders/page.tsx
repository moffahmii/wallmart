'use client'
import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { Package, Truck, CheckCircle2, Clock, CreditCard, ShoppingBag, Loader2, AlertCircle } from 'lucide-react'

export default function AllOrders() {
    const { data: session, status } = useSession()
    const [orders, setOrders] = useState<any[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        // 1. استخراج الـ User ID الحقيقي (بنجرب الـ id والـ _id)
        const userData = session?.user as any;
        const userId = userData?._id || userData?.id;

        console.log("Status:", status);
        console.log("Full User Data from Session:", userData);
        console.log("Extracted User ID:", userId);

        if (status === "authenticated" && userId) {
            const fetchOrders = async () => {
                try {
                    setIsLoading(true);
                    const res = await fetch(`https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`);

                    if (!res.ok) throw new Error("Could not fetch orders from server");

                    const data = await res.json();
                    console.log("Orders received:", data);

                    // التأكد أن الداتا مصفوفة (Array)
                    setOrders(Array.isArray(data) ? data : []);
                } catch (err: any) {
                    console.error("Fetch Error:", err);
                    setError(err.message);
                } finally {
                    setIsLoading(false);
                }
            };
            fetchOrders();
        } else if (status === "unauthenticated") {
            setIsLoading(false);
            setError("You must be logged in to view orders.");
        } else if (status === "authenticated" && !userId) {
            // لو اليوزر مسجل دخول بس الـ ID مش واصل للسشن
            setIsLoading(false);
            setError("User ID not found in session. Check auth configuration.");
        }
    }, [status, session]);

    // حالة التحميل
    if (isLoading) {
        return (
            <div className="flex h-screen flex-col items-center justify-center gap-4">
                <Loader2 className="animate-spin size-12 text-blue-600" />
                <p className="font-black uppercase italic text-slate-400 animate-pulse">Loading your orders...</p>
            </div>
        )
    }

    return (
        <div className="max-w-5xl mx-auto p-6 min-h-screen bg-slate-50/20">
            {/* Header */}
            <div className="flex items-center gap-4 mb-10">
                <div className="bg-blue-600 p-3 rounded-2xl text-white shadow-lg shadow-blue-200">
                    <ShoppingBag size={28} />
                </div>
                <div>
                    <h1 className="text-3xl font-black uppercase italic tracking-tighter">Order History</h1>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Tracking your purchases at WallMart</p>
                </div>
            </div>

            {/* Error Message */}
            {error ? (
                <div className="bg-red-50 border-2 border-red-100 p-6 rounded-[28px] text-red-600 flex items-center gap-3 font-bold italic uppercase text-sm">
                    <AlertCircle /> {error}
                </div>
            ) : orders.length === 0 ? (
                <div className="text-center py-24 border-4 border-dashed rounded-[40px] border-slate-100 bg-white">
                    <Package className="mx-auto size-16 text-slate-200 mb-4" />
                    <p className="text-xl font-black uppercase italic text-slate-400">You haven't placed any orders yet</p>
                </div>
            ) : (
                <div className="grid gap-8">
                    {orders.map((order) => (
                        <div key={order._id} className="bg-white border-2 border-slate-100 rounded-[32px] overflow-hidden hover:shadow-2xl transition-all duration-500 group">
                            {/* Order Info Bar */}
                            <div className="bg-slate-50/80 p-6 border-b flex flex-wrap justify-between items-center gap-4">
                                <div className="space-y-1">
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Order ID</p>
                                    <p className="font-bold text-sm text-blue-600">#{order._id.slice(-8).toUpperCase()}</p>
                                </div>
                                <div className="flex gap-2">
                                    <StatusBadge active={order.isPaid} text={order.isPaid ? "Paid" : "Unpaid"} type="success" />
                                    <StatusBadge active={order.isDelivered} text={order.isDelivered ? "Delivered" : "Processing"} type="info" />
                                </div>
                            </div>

                            {/* Products List */}
                            <div className="p-6 space-y-4">
                                {order.cartItems.map((item: any) => (
                                    <div key={item._id} className="flex items-center gap-4 group/item">
                                        <div className="relative size-16 shrink-0 overflow-hidden rounded-xl border bg-slate-50">
                                            <img src={item.product.imageCover} alt="" className="object-cover size-full group-hover/item:scale-110 transition-transform" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h4 className="font-bold text-sm truncate uppercase tracking-tight">{item.product.title}</h4>
                                            <p className="text-[10px] font-black text-slate-400 italic">QTY: {item.count} × {item.price} EGP</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Order Total Footer */}
                            <div className="p-6 bg-slate-50/30 border-t flex justify-between items-end">
                                <div>
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Date</p>
                                    <p className="text-xs font-bold">{new Date(order.createdAt).toDateString()}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Total Order Price</p>
                                    <p className="text-2xl font-black italic text-blue-600">{order.totalOrderPrice} <span className="text-xs">EGP</span></p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

// Sub-component for Status Labels
function StatusBadge({ active, text, type }: { active: boolean, text: string, type: 'success' | 'info' }) {
    const colorClass = active
        ? (type === 'success' ? 'bg-green-100 text-green-700 border-green-200' : 'bg-blue-100 text-blue-700 border-blue-200')
        : 'bg-slate-100 text-slate-500 border-slate-200';

    return (
        <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase italic border shadow-sm flex items-center gap-1.5 ${colorClass}`}>
            {active ? <CheckCircle2 size={12} /> : <Clock size={12} />}
            {text}
        </span>
    );
}