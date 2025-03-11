import FooterContact from "@/components/FooterContact";
import Header from "@/components/Header";
import { UserAuthProvider } from "@/context/UserAuthContext";
import { ShoppingCartProvider } from "@/context/ShoppingCartContext";

import "@/styles/globals.css";

export default function RootLayout({ children }) {
  return (
    <UserAuthProvider>
      <ShoppingCartProvider>
        <Header />
        {children}
        <FooterContact />
      </ShoppingCartProvider>
    </UserAuthProvider>
  );
}