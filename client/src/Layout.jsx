import { Outlet, useLocation } from "react-router-dom"

import Banner from "./components/Banner"
import Header from "./components/Header"
import Footer from "./components/Footer"

export default function Layout() {
  const location = useLocation()

  return (
    <div>
      <Header />
      {location.pathname === "/" && <Banner />}
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
