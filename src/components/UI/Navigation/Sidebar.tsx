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
]

export default function Sidebar() {
  const pathname = usePathname()
  const isActive = (itemHref: string) => {
    return pathname === itemHref || pathname.startsWith(itemHref)
  }
  return (
    <>
      {/* sidebar (lg+) */}
      <nav className="grow hidden lg:flex lg:flex-col lg:inset-y-0 lg:sticky lg:w-[208px] lg:z-40 max-h-dvh">
        <aside className="flex flex-col bg-white border-gray-200 border-r p-4 dark:bg-gray-950 dark:border-gray-800 gap-y-6 grow overflow-y-auto">
          {/* <WorkspacesDropdownDesktop /> */}
          {/* <div className="flex justify-center w-full items-center">
            <img src="/images/logo.png" alt="logo" className="w-32 object-contain" />
            <p className="text-center text-gray-900 text-xl dark:text-gray-50 font-bold font-serif">
              Neom PV Diesel Automation
            </p>
          </div>
          <hr className="border-gray-200 border-t dark:border-gray-800" /> */}
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
                    <item.icon className="shrink-0 size-4" aria-hidden="true" />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
            <div>
            </div>
          </nav>
          <div className="mt-auto">
            <UserProfileDesktop />
          </div>
        </aside>
      </nav>
      {/* top navbar (xs-lg) */}
      <div className="flex bg-white border-b border-gray-200 h-16 justify-between shadow-sm dark:bg-gray-950 dark:border-gray-800 items-center lg:hidden px-2 shrink-0 sm:gap-x-6 sm:px-4 sticky top-0 z-40">
        {/* <WorkspacesDropdownMobile /> */}
        <div className="flex gap-1 items-center sm:gap-2">
          <UserProfileMobile />
          <MobileSidebar />
        </div>
      </div>
    </>
  )
}
