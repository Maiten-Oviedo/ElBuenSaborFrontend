import Header from "@/common/components/layout/header/Header";
import "./globals.css";
import { Montserrat , Oi} from 'next/font/google';
import LayoutWrapper from "./LayoutWrapper";

const oi = Oi({
  subsets: ['latin'],
  weight: '400',
  variable: '--titleFont',
});

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--textFont',
});


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${oi.variable} ${montserrat.variable}`}>
      <body className="transition-colors duration-200"> 
          <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  );
}
