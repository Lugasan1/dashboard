"use client";
import { DashboardStore } from "@/hooks/dashboard.store";
import { faAdd, faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Blocks,
  KeySquare,
  ShoppingBag,
  Store,
  WalletCards,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import SidebarLinkGroup from "./SidebarLinkGroup";

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}

const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  const { data: dashboard } = DashboardStore();
  const pathname = usePathname();
  const trigger = useRef<any>(null);
  const sidebar = useRef<any>(null);

  let storedSidebarExpanded = "true";

  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === "true",
  );

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ key }: KeyboardEvent) => {
      if (!sidebarOpen || key !== "Escape") return;
      setSidebarOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  useEffect(() => {
    localStorage.setItem("sidebar-expanded", JSON.stringify(sidebarExpanded));
    if (sidebarExpanded) {
      document.querySelector("body")?.classList.add("sidebar-expanded");
    } else {
      document.querySelector("body")?.classList.remove("sidebar-expanded");
    }
  }, [sidebarExpanded]);

  return (
    <aside
      ref={sidebar}
      className={`absolute left-0 top-0 z-9999 flex h-screen w-72.5 flex-col overflow-y-hidden bg-graydark duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      {/* <!-- SIDEBAR HEADER --> */}
      <div className="flex items-center justify-between gap-2 px-6 py-5.5 lg:py-6.5">
        <button
          ref={trigger}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-controls="sidebar"
          aria-expanded={sidebarOpen}
          className="block lg:hidden"
        >
          <svg
            className="fill-current"
            width="20"
            height="18"
            viewBox="0 0 20 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19 8.175H2.98748L9.36248 1.6875C9.69998 1.35 9.69998 0.825 9.36248 0.4875C9.02498 0.15 8.49998 0.15 8.16248 0.4875L0.399976 8.3625C0.0624756 8.7 0.0624756 9.225 0.399976 9.5625L8.16248 17.4375C8.31248 17.5875 8.53748 17.7 8.76248 17.7C8.98748 17.7 9.17498 17.625 9.36248 17.475C9.69998 17.1375 9.69998 16.6125 9.36248 16.275L3.02498 9.8625H19C19.45 9.8625 19.825 9.4875 19.825 9.0375C19.825 8.55 19.45 8.175 19 8.175Z"
              fill=""
            />
          </svg>
        </button>
      </div>
      {/* <!-- SIDEBAR HEADER --> */}

      <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
        {/* <!-- Sidebar Menu --> */}
        <nav className="mt-5 px-4 py-4 lg:mt-9 lg:px-6">
          {/* <!-- Menu Group --> */}
          <div>
            <div>
              <h3 className=" text-md ml-4 font-bold text-bodydark2">
                Saldo Disponível
              </h3>
              <span className="mb-4 ml-4 text-xl font-medium text-lime-600">
                $ {(dashboard?.balance?.total || 0) / 100}
              </span>
            </div>
            <h3 className="mb-4 ml-4 mt-8 text-sm font-semibold text-bodydark2">
              MENU
            </h3>

            <ul className="mb-6 flex flex-col gap-1.5">
              {/* <!-- Menu Item Dashboard --> */}
              <SidebarLinkGroup
                activeCondition={
                  pathname === "/" ||
                  pathname.includes("dashboard") ||
                  pathname.includes("products") ||
                  pathname.includes("shopify-store") ||
                  pathname.includes("client-transaction")
                }
              >
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <Accordion
                        type="single"
                        collapsible
                        defaultValue={
                          pathname === "/dashboard" || pathname === "/products"
                            ? "dashboard"
                            : undefined
                        }
                      >
                        <AccordionItem
                          value="dashboard"
                          className="border-b-0 no-underline"
                        >
                          <AccordionTrigger className="group  relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 no-underline duration-300 ease-in-out hover:bg-graydark hover:no-underline dark:hover:bg-meta-4 [&[data-state=open]]:bg-graydark">
                            <div className="flex items-center space-x-3">
                              <Blocks className="h-5 w-5" />
                              <span className="text-bodydark2">Início</span>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent>
                            <ul className="mb-5.5 mt-4 flex flex-col gap-2.5 pl-1">
                              <li>
                                <Link
                                  href="/dashboard"
                                  className={`border-gray-300 hover:bg-gray-700 group relative flex items-center gap-2.5 rounded-md border px-4 py-2 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ${pathname === "/dashboard" ? "bg-white text-black" : ""}`}
                                >
                                  <FontAwesomeIcon
                                    icon={faHome}
                                    className="text-bodydark2 duration-300 ease-in-out group-hover:text-white"
                                  />
                                  Dashboard
                                </Link>
                              </li>
                              <li>
                                <Link
                                  href="/products"
                                  className={`border-gray-300 hover:bg-gray-700 group relative flex items-center gap-2.5 rounded-md border px-4 py-2 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ${pathname === "/products" ? "bg-white text-black" : ""}`}
                                >
                                  <FontAwesomeIcon
                                    icon={faAdd}
                                    className="text-bodydark2 duration-300 ease-in-out group-hover:text-white"
                                  />
                                  Produtos
                                </Link>
                              </li>
                            </ul>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>

                      <Accordion
                        type="single"
                        collapsible
                        defaultValue={
                          pathname === "/shopify-credential" ||
                          pathname === "/shopify-store"
                            ? "shopify"
                            : undefined
                        }
                      >
                        <AccordionItem
                          value="shopify"
                          className="border-b-0 no-underline"
                        >
                          <AccordionTrigger className="group  relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 no-underline duration-300 ease-in-out hover:bg-graydark hover:no-underline dark:hover:bg-meta-4 [&[data-state=open]]:bg-graydark">
                            <div className="flex items-center space-x-3">
                              <ShoppingBag className="h-5 w-5" />
                              <span className="text-bodydark2">Shopify</span>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent>
                            <ul className="mb-5.5 mt-4 flex flex-col gap-2.5 pl-1">
                              <li>
                                <Link
                                  href="/shopify-credential"
                                  className={`border-gray-300 hover:bg-gray-700 group relative flex items-center gap-2.5 rounded-md border px-4 py-2 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ${pathname === "/shopify-credential" ? "bg-white text-black" : ""}`}
                                >
                                  <KeySquare className="h-5 w-5 text-bodydark2 duration-300 ease-in-out group-hover:text-white" />
                                  Credencial
                                </Link>
                              </li>
                              <li>
                                <Link
                                  href="/shopify-store"
                                  className={`border-gray-300 hover:bg-gray-700 group relative flex items-center gap-2.5 rounded-md border px-4 py-2 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ${pathname === "/shopify-store" ? "bg-white text-black" : ""}`}
                                >
                                  <Store className="h-5 w-5 text-bodydark2 duration-300 ease-in-out group-hover:text-white" />
                                  Lojas
                                </Link>
                              </li>
                            </ul>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>

                      <Accordion
                        type="single"
                        collapsible
                        defaultValue={
                          pathname === "/stripe-credential" ||
                          pathname === "/client-transaction"
                            ? "stripe"
                            : undefined
                        }
                      >
                        <AccordionItem
                          value="stripe"
                          className="border-b-0 no-underline"
                        >
                          <AccordionTrigger className="group  relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 no-underline duration-300 ease-in-out hover:bg-graydark hover:no-underline dark:hover:bg-meta-4 [&[data-state=open]]:bg-graydark">
                            <div className="flex items-center space-x-3">
                              <WalletCards className="h-5 w-5" />
                              <span className="text-bodydark2">Stripe</span>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent>
                            <ul className="mb-5.5 mt-4 flex flex-col gap-2.5 pl-1">
                              <li>
                                <Link
                                  href="/stripe-credential"
                                  className={`border-gray-300 hover:bg-gray-700 group relative flex items-center gap-2.5 rounded-md border px-4 py-2 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ${pathname === "/stripe-credential" ? "bg-white text-black" : ""}`}
                                >
                                  <KeySquare className="h-5 w-5 text-bodydark2 duration-300 ease-in-out group-hover:text-white" />
                                  Credencial
                                </Link>
                              </li>
                              <li>
                                <Link
                                  href="/client-transaction"
                                  className={`border-gray-300 hover:bg-gray-700 group relative flex items-center gap-2.5 rounded-md border px-4 py-2 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ${pathname === "/client-transaction" ? "bg-white text-black" : ""}`}
                                >
                                  <FontAwesomeIcon
                                    icon={faAdd}
                                    className="text-bodydark2 duration-300 ease-in-out group-hover:text-white"
                                  />
                                  Cliente/transações
                                </Link>
                              </li>
                            </ul>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>
            </ul>
          </div>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
