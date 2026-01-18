import "./globals.css";
import { Layout } from "@/components/layout/Layout";
import Providers from "./providers";

export const metadata = {
  title: "Unit Converter By Afaq",
  description: "Convert between units instantly",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Layout>{children}</Layout>
        </Providers>
      </body>
    </html>
  );
}
