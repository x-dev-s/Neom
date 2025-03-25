"use client";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "./siteConfig";

const navigation = [
  {
    name: "SLD",
    href: siteConfig.baseLinks.sld,
  },
  {
    name: "PV",
    href: siteConfig.baseLinks.pv.self,
    children: [
      { name: "Inverter 1", href: siteConfig.baseLinks.pv.i1 },
      { name: "Inverter 2", href: siteConfig.baseLinks.pv.i2 },
      { name: "Inverter 3", href: siteConfig.baseLinks.pv.i3 },
      { name: "Inverter 4", href: siteConfig.baseLinks.pv.i4 },
      { name: "Inverter 5", href: siteConfig.baseLinks.pv.i5 },
      { name: "Inverter 6", href: siteConfig.baseLinks.pv.i6 },
    ],
  },
  {
    name: "Meteo",
    href: siteConfig.baseLinks.meteo,
  },
  {
    name: "Genset",
    href: siteConfig.baseLinks.genset.self,
    children: [
      { name: "Generator 1", href: siteConfig.baseLinks.genset.g1 },
      { name: "Generator 2", href: siteConfig.baseLinks.genset.g2 },
      { name: "Generator 3", href: siteConfig.baseLinks.genset.g3 },
    ],
  },
];

const findBreadcrumbs = (pathname, items, path = []) => {
  for (const item of items) {
    if (pathname === item.href) {
      return [...path, item];
    }
    if (item.children) {
      const found = findBreadcrumbs(pathname, item.children, [...path, item]);
      if (found.length) return found;
    }
  }
  return [];
};

export default function Breadcrumbs() {
  const pathname = usePathname();
  const breadcrumbs = findBreadcrumbs(pathname, navigation);

  return (
    <nav aria-label="Breadcrumb" className="ml-2 overflow-auto">
      <ol role="list" className="flex items-center space-x-3 text-sm">
        <li className="flex">
          <Link
            href="/"
            className="text-gray-500 transition hover:text-gray-700 dark:text-gray-400 hover:dark:text-gray-300"
          >
            Dashboard
          </Link>
        </li>
        {breadcrumbs.map((crumb, index) => (
          <li key={crumb.href} className="flex items-center">
            <ChevronRight
              className="size-4 shrink-0 text-gray-600 dark:text-gray-400"
              aria-hidden="true"
            />
            <Link
              href={crumb.href}
              className={`ml-2 ${index === breadcrumbs.length - 1 ? "text-gray-900 dark:text-gray-50 text-nowrap" : "text-gray-500 transition hover:text-gray-700 dark:text-gray-400 hover:dark:text-gray-300 text-nowrap"}`}
              aria-current={index === breadcrumbs.length - 1 ? "page" : undefined}
            >
              {crumb.name}
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  );
}
