// app/layout.tsx
import './globals.css';

import { I18nProvider } from "@/providers/i18n-provider";
import Header from '@/app/components/layouts/Header';
import Footer from '@/app/components/layouts/Footer';
import SideBar from '@/app/components/layouts/SideBar';
import ScrollToTop from './components/layouts/ScrollToTop';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        <I18nProvider> 
          <Header />
            <div className="container mx-auto flex flex-wrap py-6">
              {children}
              <SideBar />
            </div>
          <Footer />
          <ScrollToTop />
        </I18nProvider>
      </body>
    </html>
  );
}



