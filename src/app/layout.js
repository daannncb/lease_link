import { ClerkProvider } from "@clerk/nextjs";
import './globals.css';
import Header from '../components/Header';
import Footer from '../components/Footer';


export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
      <body>
        <Header />
        {children}
        <Footer />
        </body>

      </html>
    </ClerkProvider>
  );
}
