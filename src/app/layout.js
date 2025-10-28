import { ClerkProvider } from "@clerk/nextjs";
import './globals.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ReducerTheme from "@/components/reducerTheme";


export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      
      <html lang="en">
      <body className="h-full">
        <ReducerTheme>
          <Header />
          <main className="grow">{children}</main>
          <Footer />
        </ReducerTheme>
        </body>

      </html>
      
    </ClerkProvider>
  );
}
