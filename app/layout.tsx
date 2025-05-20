"use client";
import "./globals.css";
import { cairo } from "./utils/fonts/main.font";
import SideBar from "./components/side-bar/side-bar";
import Header from "./components/header/header";
import { usePathname } from "next/navigation";
import { PopupProvider } from "./utils/contexts/popup-contexts";
import CustomSnackbar from "./components/common/custom-snakebar";
import { UserProvider } from "./utils/contexts/UserContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isLoginRoute = pathname === "/log-in";

  return (
    <html lang="en">
      <body
        className={`${cairo.className} antialiased bg-myLight !text-secDark ${
          !isLoginRoute ? "mr-[240px] mt-[80px]" : ""
        }`}
      >
        <PopupProvider>
          <UserProvider>
            <CustomSnackbar />
            {!isLoginRoute && <SideBar />}
            {!isLoginRoute && <Header />}
            {children}
          </UserProvider>
        </PopupProvider>
      </body>
    </html>
  );
}
