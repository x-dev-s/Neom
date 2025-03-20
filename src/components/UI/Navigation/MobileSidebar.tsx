import { siteConfig } from "@/components/UI/Navigation/siteConfig"
import { Button } from "@/components/Button"
import {
  Drawer,
  DrawerBody,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/Drawer"
import { cx, focusRing } from "@/lib/utils"
import {
  RiHome2Line,
  RiLinkM,
  RiListCheck,
  RiMenuLine,
  RiSettings5Line,
} from "@remixicon/react"
import { FaSolarPanel } from "react-icons/fa6";
import { TiWeatherCloudy } from "react-icons/ti";
import { GiPowerGenerator } from "react-icons/gi";
import Link from "next/link"
import { usePathname } from "next/navigation"

const navigation = [
  { name: "Dashboard", href: siteConfig.baseLinks.dashboard, icon: RiHome2Line },
  { name: "PV", href: siteConfig.baseLinks.pv.self, icon: FaSolarPanel },
  { name: "Meteo", href: siteConfig.baseLinks.meteo, icon: TiWeatherCloudy },
  { name: "Genset", href: siteConfig.baseLinks.genset.self, icon: GiPowerGenerator },
] as const

export default function MobileSidebar() {
  const pathname = usePathname()
  const isActive = (itemHref: string) => {
    return pathname === itemHref || pathname.startsWith(itemHref)
  }
  return (
    <>
      <Drawer>
        <DrawerTrigger asChild>
          <Button
            variant="ghost"
            aria-label="open sidebar"
            className="flex p-2 rounded-md text-sm data-[state=open]:bg-gray-100 data-[state=open]:bg-gray-400/10 font-medium group hover:bg-gray-100 hover:dark:bg-gray-400/10 items-center"
          >
            <RiMenuLine
              className="shrink-0 size-6 sm:size-5"
              aria-hidden="true"
            />
          </Button>
        </DrawerTrigger>
        <DrawerContent className="sm:max-w-lg">
          <DrawerBody>
            <nav
              aria-label="core mobile navigation links"
              className="flex flex-1 flex-col space-y-10"
            >
              <ul role="list" className="space-y-1.5">
                {navigation.map((item) => (
                  <li key={item.name}>
                    <DrawerClose asChild>
                      <Link
                        href={item.href}
                        className={cx(
                          isActive(item.href)
                            ? "text-indigo-600 dark:text-indigo-400"
                            : "text-gray-600 hover:text-gray-900 dark:text-gray-400 hover:dark:text-gray-50",
                          "flex items-center gap-x-2.5 rounded-md px-2 py-1.5 text-base font-medium transition hover:bg-gray-100 sm:text-sm hover:dark:bg-gray-900",
                          focusRing,
                        )}
                      >
                        <item.icon
                          className="shrink-0 size-5"
                          aria-hidden="true"
                        />
                        {item.name}
                      </Link>
                    </DrawerClose>
                  </li>
                ))}
              </ul>
            </nav>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  )
}
