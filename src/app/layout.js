import { Inter } from "next/font/google";
import "./globals.css";
import Provider from "@/lib/provider";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "CMA - Cerence Marketing Assistant",
  description: "CMA - Cerence Marketing Assistant",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider>
          <Navbar />
          {children}
          <Footer />
        </Provider>
      </body>
    </html>
  );
}
