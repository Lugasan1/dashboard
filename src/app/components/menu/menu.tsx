import { Coins, Home, Undo2 } from "lucide-react";


export default function Menu() {
    return (
        <aside className="w-64 h-screen bg-white border">
            <div className="flex p-6">
                <h2 className="text-lg font-bold">DASHBOARD</h2>
            </div>

            <div className="flex flex-col ml-6 mt-14">
                <span className="text-sm font-bold text-blue-600">SALDO DISPONÍVEL</span>
                <span className="text-xl font-light">R$4.000,00</span>
            </div>
            <nav className="p-6 mt-24">
                <a href="" className="flex justify-start w-full">
                    <Home />
                    <span className="px-4">
                    Controle de vendas
                    </span>
                </a>
                <a href="" className="flex justify-start w-full mt-6">
                    <Coins />
                    <span className="px-4">
                    Reembolsos
                    </span>
                </a>
                <a href="" className="flex justify-start w-full mt-6">
                    <Undo2 />
                    <span className="px-4">
                    Chargeback
                    </span>
                </a>
            </nav>
        </aside>
    )
}