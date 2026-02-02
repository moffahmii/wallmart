import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import { getUserOrdersAction } from "../profile/_actions/Profile.actions";
import OrdersSection from "../profile/_components/OrdersSection";

export default async function AllOrdersPage() {
    const session = await getServerSession(authOptions);
    const userId = session?.user?._id as string;
    const orders = await getUserOrdersAction(userId);
    return (
        <main className="min-h-screen bg-white py-20">
            <div className="container mx-auto px-6 max-w-5xl">
                <h1 className="text-5xl font-black uppercase italic tracking-tighter mb-12">Manifest History</h1>
                <OrdersSection orders={orders} />
            </div>
        </main>
    );
}
