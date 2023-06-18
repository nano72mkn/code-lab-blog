import { FC, ReactNode } from "react";

import { Footer } from "components/Footer";
import { Header } from "components/Header";

import '../styles/globals.css';

interface LayoutProps {
    children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <html lang="ja">
      <body>
        <div className="bg-gray-50">
          <div className="container mx-auto px-5">
            <Header />
            <div className="mb-20">{children}</div>
            <Footer />
          </div>
        </div>
      </body>
    </html>
  );
};

export default Layout;
