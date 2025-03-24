export const siteConfig = {
    name: "Dashboard",
    url: "https://neom.vercel.app",
    description: "The only dashboard you will ever need.",
    baseLinks: {
      dashboard: "/",
      pv: {
        self: "/pv/",
        i1: "/pv/inverter1/",
        i2: "/pv/inverter2/",
        i3: "/pv/inverter3/",
        i4: "/pv/inverter4/",
        i5: "/pv/inverter5/",
        i6: "/pv/inverter6/",
      },
      meteo : '/meteo/',
      genset: {
        self: "/genset/",
        g1: "/genset/generator1/",
        g2: "/genset/generator2/",
        g3: "/genset/generator3/",
      },      
      sld: "/sld/",
    },
  }
  
  export type siteConfig = typeof siteConfig
  