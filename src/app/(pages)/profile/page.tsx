import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Package, Globe, ShieldCheck } from "lucide-react"
import { getServerSession } from "next-auth"
import { getAddressesAction, getUserOrdersAction } from "./_actions/Profile.actions"
import { authOptions } from "@/auth"
import AddAddressModal from "./_components/AddAddressModal"
import AddressCard from "./_components/AddressCard"
import OrdersSection from "./_components/OrdersSection"
import SecuritySettingsModal from "./_components/SecuritySettingsModal"
import EditProfileModal from "./_components/EditProfileModal"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default async function ProfilePage() {
    const session = await getServerSession(authOptions)
    const userId = (session?.user as any)?.id
    const user = session?.user

    const [addressesData, orders] = await Promise.all([
        getAddressesAction(),
        getUserOrdersAction(userId)
    ])

    const addresses = addressesData.data || []

    return (
        <main className="min-h-screen bg-white selection:bg-slate-900 selection:text-white">
            <div className="container mx-auto py-16 px-6 max-w-7xl">

                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
                    <div className="space-y-2">
                        <div className="flex items-center gap-2 mb-4">
                            <span className="h-px w-8 bg-slate-900"></span>
                            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">Dashboard</span>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-black text-slate-900 uppercase italic tracking-tighter leading-none">
                            My Account
                        </h1>
                        <p className="text-slate-400 font-medium text-lg max-w-md">
                            Manage your personal identity, delivery spots, and purchase flow.
                        </p>
                    </div>
                    <div className="flex gap-3">
                        <div className="hidden lg:flex flex-col items-end px-6 border-r border-slate-100">
                            <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Saved Spots</span>
                            <span className="text-2xl font-black italic text-slate-900">{addresses.length}</span>
                        </div>
                        <div className="hidden lg:flex flex-col items-end px-6">
                            <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Total Orders</span>
                            <span className="text-2xl font-black italic text-slate-900">{orders?.length || 0}</span>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

                    <aside className="lg:col-span-4 xl:col-span-3 space-y-6">
                        <Card className="rounded-[3rem] border-none bg-slate-50/50 shadow-xs overflow-hidden sticky top-24">
                            <div className="relative h-32 bg-slate-900 overflow-hidden">
                                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-500 via-transparent to-transparent"></div>
                                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
                            </div>
                            <CardContent className="relative pt-20 text-center pb-10 px-8">
                                <div className="absolute -top-14 left-1/2 -translate-x-1/2 size-28 rounded-full bg-white p-1.5 shadow-2xl">
                                    <div className="size-full rounded-full bg-slate-900 flex items-center justify-center text-white text-4xl font-black italic border-4 border-slate-50">
                                        {user?.name?.charAt(0) || 'U'}
                                    </div>
                                </div>

                                <div className="mb-8">
                                    <h2 className="text-2xl font-black text-slate-900 uppercase italic tracking-tight truncate px-2">
                                        {user?.name}
                                    </h2>
                                    <p className="text-slate-400 text-sm mt-4 font-medium break-all lowercase">
                                        {user?.email}
                                    </p>
                                </div>
                                <div className="space-y-3">
                                    <EditProfileModal user={user} />
                                    <SecuritySettingsModal />
                                    <div className="grid grid-cols-2 gap-2">
                                        <div className="p-3 bg-white rounded-2xl border border-slate-100 flex flex-col items-center justify-center gap-1 hover:border-blue-100 transition-colors cursor-default group">
                                            <ShieldCheck className="size-4 text-slate-300 group-hover:text-blue-500 transition-colors" />
                                            <span className="text-[8px] font-black uppercase text-slate-400 tracking-tighter">Auth 2FA</span>
                                        </div>
                                        <div className="p-3 bg-white rounded-2xl border border-slate-100 flex flex-col items-center justify-center gap-1 hover:border-blue-100 transition-colors cursor-default group">
                                            <Globe className="size-4 text-slate-300 group-hover:text-blue-500 transition-colors" />
                                            <span className="text-[8px] font-black uppercase text-slate-400 tracking-tighter">Global / EN</span>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </aside>
                    <div className="lg:col-span-8 xl:col-span-9">
                        <Tabs defaultValue="addresses" className="w-full">
                            <TabsList className="bg-slate-50 p-2 rounded-[2.5rem] mb-12 w-full md:w-fit border border-slate-100 shadow-inner inline-flex">
                                <TabsTrigger value="addresses" className="rounded-[2rem] px-12 py-4 font-black uppercase text-[10px] tracking-widest data-[state=active]:bg-white data-[state=active]:text-slate-950 data-[state=active]:shadow-2xl data-[state=active]:shadow-slate-200 transition-all duration-500 group">
                                    <MapPin className="size-3 mr-2 group-data-[state=active]:text-blue-600" /> Addresses
                                </TabsTrigger>
                                <TabsTrigger value="orders" className="rounded-[2rem] px-12 py-4 font-black uppercase text-[10px] tracking-widest data-[state=active]:bg-white data-[state=active]:text-slate-950 data-[state=active]:shadow-2xl data-[state=active]:shadow-slate-200 transition-all duration-500 group">
                                    <Package className="size-3 mr-2 group-data-[state=active]:text-blue-600" /> Order History
                                </TabsTrigger>
                            </TabsList>
                            <TabsContent value="addresses" className="mt-0 focus-visible:outline-none animate-in fade-in slide-in-from-bottom-4 duration-700">
                                <div className="flex items-center justify-between mb-10 pl-2">
                                    <div className="space-y-1">
                                        <h3 className="text-3xl font-black text-slate-900 uppercase italic tracking-tighter">Saved Points</h3>
                                        <p className="text-sm text-slate-400 font-medium italic">Manage your default shipping locations.</p>
                                    </div>
                                    <AddAddressModal />
                                </div>
                                {addresses.length > 0 ? (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        {addresses.map((addr: any) => (
                                            <AddressCard key={addr._id} addr={addr} />
                                        ))}
                                    </div>
                                ) : (
                                    <div className="bg-slate-50/50 border-4 border-dashed border-slate-100 rounded-[4rem] py-32 text-center group hover:border-slate-200 transition-colors duration-500">
                                        <div className="bg-white size-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl group-hover:scale-110 transition-transform duration-500">
                                            <MapPin className="size-8 text-slate-200" />
                                        </div>
                                        <p className="text-slate-400 font-black uppercase tracking-[0.3em] text-[10px]">Territory is currently empty</p>
                                    </div>
                                )}
                            </TabsContent>
                            <TabsContent value="orders" className="mt-0 focus-visible:outline-none animate-in fade-in slide-in-from-bottom-4 duration-700">
                                <div className="mb-10 pl-2 space-y-1">
                                    <h3 className="text-3xl font-black text-slate-900 uppercase italic tracking-tighter">Manifest History</h3>
                                    <p className="text-sm text-slate-400 font-medium italic">Tracking all previous and current transactions.</p>
                                </div>
                                <OrdersSection orders={orders} />
                            </TabsContent>
                        </Tabs>
                    </div>
                </div>
            </div>
        </main>
    )
}