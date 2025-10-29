import { ClerkProvider } from "@clerk/nextjs";
import './globals.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ReducerTheme from "@/components/reducerTheme";

export const metadata = {
  title: "LeaseLink, One App. Every Issue. No Hassle",
  description:
    "Manage properties, connect with tenants, track repairs, and simplify renting with LeaseLink.",
  openGraph: {
    title: "LeaseLink, One App. Every Issue. No Hassle",
    description:
      "Manage properties, tenants, repairs, and feedback efficiently.",
    url: "https://lease-link-nu.vercel.app/",
    images: [
      {
        url: "/homes.jpeg", 
        width: 1200,
        height: 630,
        alt: "LeaseLink, resolves every issue",
      },
    ],
  },
  icons: {
    icon: "/logo.png", 
  },
};



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
