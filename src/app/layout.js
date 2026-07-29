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
  return (
    <html lang="en" data-theme="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#2C1810" />
      </head>
      <body className={`${playfair.variable} ${cormorant.variable} ${inter.variable}`} suppressHydrationWarning>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
