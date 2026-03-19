export const COMPANY = {
  name: "Global Distribuidora y Comercializadora, C.A.",
  shortName: "GDC",
  rif: "J-507783561",
  email: "globaldistribuidora2025@gmail.com",
  phone: {
    ve: "+58 416 832 53 85",
    es: "+34 686 72 77 15",
  },
  address: {
    street: "Av. el cortijo, casa #55",
    area: "Urbanización Los Rosales",
    city: "Caracas",
    state: "Distrito Capital",
    country: "Venezuela",
  },
  fullAddress:
    "Av. el cortijo, casa #55, Urbanización Los Rosales, Distrito Capital, Caracas-Venezuela",
} as const;

export const NAV_LINKS = [
  { id: "about", es: "Quiénes Somos", en: "About" },
  { id: "services", es: "Servicios", en: "Services" },
  { id: "mission", es: "Misión", en: "Mission" },
  { id: "vision", es: "Visión", en: "Vision" },
  { id: "contact", es: "Contacto", en: "Contact" },
] as const;
