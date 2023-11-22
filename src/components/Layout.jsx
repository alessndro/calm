import React from "react"
import { Outlet } from "react-router-dom"
import Navbar from "./Navbar"


export default function Layout() {
   return (
       <div className="h-full w-full flex flex-col border border-yellow-400 mx-auto md:flex-row">
           <Navbar />
           <Outlet />
       </div>
   )
}
