import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Package, Clock, MapPin, CheckCircle2, CreditCard, ChevronDown } from "lucide-react"

export default function OrdersSection({ orders = [] }: { orders: any[] }) {
    // التأكد من أننا نتعامل مع مصفوفة دائمًا
    const safeOrders = Array.isArray(orders) ? orders : [];

    if (safeOrders.length === 0) {
        return (
            <div className="bg-slate-50/50 border-4 border-dashed border-slate-100 rounded-[3rem] py-32 text-center group">
                <Package className="mx-auto size-16 text-slate-200 mb-6 group-hover:scale-110 transition-transform duration-500" />
                <p className="text-slate-400 font-black uppercase tracking-[0.3em] text-[10px]">No manifest history found</p>
            </div>
        )
    }

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-6 duration-1000">
            {safeOrders.map((order) => (
                <Card key={order._id} className="rounded-[2.5rem] border-slate-100 shadow-xl shadow-slate-200/40 overflow-hidden group hover:border-blue-200 transition-all duration-500">
                    <CardContent className="p-0">
                        {/* 1. Order Top Bar (Info & Status) */}
                        <div className="bg-slate-50/80 p-6 md:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-100">
                            <div className="space-y-1">
                                <div className="flex items-center gap-3">
                                    <Badge className="bg-slate-950 text-white rounded-full px-4 py-1 text-[10px] font-black uppercase tracking-widest">
                                        Order #{order.id}
                                    </Badge>
                                    <span className="text-xs font-bold text-slate-400 flex items-center gap-1 uppercase italic">
                                        <Clock className="size-3" /> {new Date(order.createdAt).toLocaleDateString('en-GB')}
                                    </span>
                                </div>
                                <div className="flex items-center gap-2 text-[10px] text-slate-400 font-black uppercase tracking-tighter pt-1">
                                    <MapPin className="size-3" /> {order.shippingAddress?.city} • {order.shippingAddress?.details}
                                </div>
                            </div>

                            <div className="flex items-center gap-4 w-full md:w-auto">
                                <div className="text-right hidden md:block">
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Total Amount</p>
                                    <h4 className="text-2xl font-black text-slate-900 italic tracking-tighter leading-none">
                                        {order.totalOrderPrice} <span className="text-xs font-bold uppercase">EGP</span>
                                    </h4>
                                </div>
                                {order.isDelivered ? (
                                    <Badge className="bg-emerald-50 text-emerald-600 border-emerald-100 px-4 py-2 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-sm">
                                        <CheckCircle2 className="size-3 mr-2" /> Delivered
                                    </Badge>
                                ) : (
                                    <Badge className="bg-blue-50 text-blue-600 border-blue-100 px-4 py-2 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-sm">
                                        <Package className="size-3 mr-2" /> In Transit
                                    </Badge>
                                )}
                            </div>
                        </div>

                        {/* 2. Products List */}
                        <div className="p-6 md:p-8">
                            <div className="grid grid-cols-1 gap-6">
                                {order.cartItems?.map((item: any) => (
                                    <div key={item._id} className="flex items-center gap-6 group/item">
                                        <div className="relative size-20 md:size-24 flex-shrink-0 overflow-hidden rounded-3xl border border-slate-100 shadow-sm group-hover/item:scale-105 transition-transform duration-500">
                                            <img
                                                src={item.product.imageCover}
                                                alt={item.product.title}
                                                className="size-full object-cover"
                                            />
                                            <div className="absolute top-1 right-1 bg-slate-950 text-white text-[10px] size-6 rounded-full flex items-center justify-center font-black italic border-2 border-white shadow-lg">
                                                x{item.count}
                                            </div>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-[9px] font-black text-blue-600 uppercase tracking-widest mb-1">
                                                {item.product.category?.name}
                                            </p>
                                            <h5 className="font-bold text-slate-900 text-sm md:text-md truncate pr-4">
                                                {item.product.title}
                                            </h5>
                                            <p className="text-xs font-black text-slate-400 italic mt-1">
                                                {item.price} EGP <span className="text-[10px] not-italic font-medium text-slate-300 ml-2">Unit Price</span>
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* 3. Bottom Footer (Payment Info) */}
                        <div className="bg-slate-50/30 px-8 py-5 flex items-center justify-between border-t border-slate-100/50">
                            <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                <CreditCard className="size-3" /> Method: <span className="text-slate-900 italic">{order.paymentMethodType}</span>
                            </div>
                            <button className="text-[10px] font-black text-blue-600 uppercase tracking-[0.2em] flex items-center gap-1 hover:gap-2 transition-all">
                                View Full Manifest <ChevronDown className="size-3" />
                            </button>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}