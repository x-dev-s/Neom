"use client"
import { siteConfig } from "@/components/UI/Navigation/siteConfig"
import { cx, focusRing } from "@/lib/utils"
import {
  RiHome2Line,
  RiListCheck,
  RiSettings5Line,
  RiLinkM,
} from "@remixicon/react"
import { FaSolarPanel } from "react-icons/fa6";
import { TiWeatherCloudy } from "react-icons/ti";
import { GiPowerGenerator } from "react-icons/gi";
import Link from "next/link"
import { usePathname } from "next/navigation"
import MobileSidebar from "./MobileSidebar"
import { UserProfileDesktop, UserProfileMobile } from "./UserProfile"

const navigation = [
  { name: "Dashboard", href: siteConfig.baseLinks.dashboard, icon: RiHome2Line },
  { name: "PV", href: siteConfig.baseLinks.pv.self, icon: FaSolarPanel },
  { name: "Meteo", href: siteConfig.baseLinks.meteo, icon: TiWeatherCloudy },
  { name: "Genset", href: siteConfig.baseLinks.genset.self, icon: GiPowerGenerator },
  { name: "Details", href: siteConfig.baseLinks.details, icon: RiListCheck },
  {
    name: "Settings",
    href: siteConfig.baseLinks.settings.general,
    icon: RiSettings5Line,
  },
] as const

const shortcuts = [
  {
    name: "Add new user",
    href: "/settings/users",
    icon: RiLinkM,
  },
  {
    name: "Workspace usage",
    href: "/settings/billing#billing-overview",
    icon: RiLinkM,
  },
  {
    name: "Cost spend control",
    href: "/settings/billing#cost-spend-control",
    icon: RiLinkM,
  },
  {
    name: "Overview – Rows written",
    href: "/overview#usage-overview",
    icon: RiLinkM,
  },
] as const

export default function Sidebar() {
  const pathname = usePathname()
  const isActive = (itemHref: string) => {
    if (itemHref === siteConfig.baseLinks.settings.general) {
      return pathname.startsWith("/settings")
    }
    return pathname === itemHref || pathname.startsWith(itemHref)
  }
  return (
    <>
      {/* sidebar (lg+) */}
      <nav className="hidden lg:sticky lg:inset-y-0 lg:z-40 lg:flex lg:w-[208px] grow lg:flex-col">
        <aside className="flex grow flex-col gap-y-6 overflow-y-auto border-r border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-950">
          {/* <WorkspacesDropdownDesktop /> */}
          {/* <div className="flex items-center justify-center w-full">
            <img src="/images/logo.png" alt="logo" className="w-32 object-contain" />
            <p className="text-xl font-serif font-bold text-center text-gray-900 dark:text-gray-50">
              Neom PV Diesel Automation
            </p>
          </div>
          <hr className="border-t border-gray-200 dark:border-gray-800" /> */}
          <nav
            aria-label="core navigation links"
            className="flex flex-1 flex-col space-y-10"
          >
            <ul role="list" className="space-y-0.5">
              {navigation.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={cx(
                      isActive(item.href)
                        ? "text-indigo-600 dark:text-indigo-400"
                        : "text-gray-700 hover:text-gray-900 dark:text-gray-400 hover:dark:text-gray-50",
                      "flex items-center gap-x-2.5 rounded-md px-2 py-1.5 text-sm font-medium transition hover:bg-gray-100 hover:dark:bg-gray-900",
                      focusRing,
                    )}
                  >
                    <item.icon className="size-4 shrink-0" aria-hidden="true" />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
            <div>
              <span className="text-xs font-medium leading-6 text-gray-500">
                {/* Shortcuts */}
              </span>
              <ul aria-label="shortcuts" role="list" className="space-y-0.5">
                {shortcuts.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className={cx(
                        pathname === item.href || pathname.startsWith(item.href)
                          ? "text-indigo-600 dark:text-indigo-400"
                          : "text-gray-700 hover:text-gray-900 dark:text-gray-400 hover:dark:text-gray-50",
                        "flex items-center gap-x-2.5 rounded-md px-2 py-1.5 text-sm font-medium transition hover:bg-gray-100 hover:dark:bg-gray-900",
                        focusRing,
                      )}
                    >
                      <item.icon
                        className="size-4 shrink-0"
                        aria-hidden="true"
                      />
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </nav>
          <div className="mt-auto">
            <UserProfileDesktop />
          </div>
        </aside>
      </nav>
      {/* top navbar (xs-lg) */}
      <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center justify-between border-b border-gray-200 bg-white px-2 shadow-sm sm:gap-x-6 sm:px-4 lg:hidden dark:border-gray-800 dark:bg-gray-950">
        {/* <WorkspacesDropdownMobile /> */}
        <div className="flex items-center gap-1 sm:gap-2">
          <UserProfileMobile />
          <MobileSidebar />
        </div>
      </div>
    </>
  )
}
