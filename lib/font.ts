import { Inter } from "next/font/google";
import localFont from "next/font/local";

export const fontHeading = localFont({
  src: "../assets/fonts/CalSans-SemiBold.woff2",
  variable: "--font-heading",
});

export const inter = Inter({ subsets: ["latin"] });
