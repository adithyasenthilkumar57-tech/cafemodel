import { Playfair_Display, Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeContext";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata = {
  title: "Velvet Bean — Premium Artisan Coffee House | New York",
  description:
    "Experience world-class handcrafted coffee, artisan desserts, and unforgettable moments at Velvet Bean — New York's award-winning specialty café since 2018.",
  keywords:
    "specialty coffee, artisan café, New York coffee shop, latte art, cold brew, premium café, brunch, private dining",
  openGraph: {
    title: "Velvet Bean — Premium Artisan Coffee House",
    description:
      "Handcrafted coffee, artisan desserts, and unforgettable moments in the heart of New York.",
    type: "website",
    locale: "en_US",
    siteName: "Velvet Bean Coffee",
  },
  twitter: {
    card: "summary_large_image",
    title: "Velvet Bean — Premium Artisan Coffee House",
    description: "New York's most beautiful specialty café. Reserve your table today.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    "name": "Velvet Bean — Premium Artisan Coffee House",
    "image": "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1200&q=80",
    "@id": "https://cafemodel-kopl.vercel.app/",
    "url": "https://cafemodel-kopl.vercel.app/",
    "telephone": "+1-212-555-0198",
    "priceRange": "$$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "742 Fifth Avenue",
      "addressLocality": "New York",
      "addressRegion": "NY",
      "postalCode": "10019",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 40.7624,
      "longitude": -73.9738
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "07:00",
        "closes": "22:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Saturday", "Sunday"],
        "opens": "08:00",
        "closes": "23:00"
      }
    ],
    "servesCuisine": ["Specialty Coffee", "Artisan Bakery", "Fine Dining Desserts", "Gourmet Brunch"],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "1280"
    }
  };

  return (
    <html lang="en" data-theme="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#0F0F10" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${playfair.variable} ${cormorant.variable} ${inter.variable}`} suppressHydrationWarning>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
