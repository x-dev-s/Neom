export const siteConfig = {
    name: "Dashboard",
    url: "https://neom.vercel.app",
    description: "The only dashboard you will ever need.",
    baseLinks: {
      dashboard: "/",
      pv: {
        self: "/pv",
        i1: "/pv/inverter1",
        i2: "/pv/inverter2",
        i3: "/pv/inverter3",
        i4: "/pv/inverter4",
        i5: "/pv/inverter5",
        i6: "/pv/inverter6",
      },
      meteo : '/meteo',
      genset: {
        self: "/genset",
        g1: "/genset/genrator1",
        g2: "/genset/genrator2",
        g3: "/genset/genrator3",
      },      
      details: "/details",
      settings: {
        general: "/settings/general",
        billing: "/settings/billing",
        users: "/settings/users",
      },
    },
  }
  
  export type siteConfig = typeof siteConfig
  