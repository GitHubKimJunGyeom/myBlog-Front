import { I18nProvider } from "@/providers/i18n-provider";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        <I18nProvider>{children}</I18nProvider>
      </body>
    </html>
  );
}