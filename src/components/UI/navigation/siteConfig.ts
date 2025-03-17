export const siteConfig = {
    name: "Dashboard",
    url: "https://neom.vercel.app",
    description: "The only dashboard you will ever need.",
    baseLinks: {
      home: "/",
      overview: "/overview",
      details: "/details",
      settings: {
        general: "/settings/general",
        billing: "/settings/billing",
        users: "/settings/users",
      },
    },
  }
  
  export type siteConfig = typeof siteConfig
  