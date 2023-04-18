import React from 'react'
import Header from './Header'
const Layout = (props) => {
  return (
    <main>
        <Header />
        {props.children}
    </main>
  )
}

export default Layout