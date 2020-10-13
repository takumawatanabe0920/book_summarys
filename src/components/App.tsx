import React from "react"

// components
import Header from "./layouts/Header"
import Footer from "./layouts/Footer"

// sections

function IndexPage() {
  return (
    <div>
      <Header />
      <div className="sections">contents</div>
      <div className="extendedFooter">
        <Footer />
      </div>
    </div>
  )
}

export default IndexPage
