import { useState } from "react";
import NavBar from './sections/NavBar'
import Hero from './sections/Hero'
import Menu from './sections/Menu'
import Gallery from './sections/Gallery'
import About from './sections/About'
import Contact from './sections/Contact'
import Footer from './sections/Footer'
import CartPanel from './sections/CartPanel'

export default function App() 
{
  const [cart, setCart] = useState([])
  const [cartOpen, setCartOpen] = useState(false)

  function addToCart(name, price) 
  {
    setCart(prev => 
    {
      const existing = prev.find(i => i.name === name)
      if (existing) 
    {
        return prev.map(i => i.name === name ? { ...i, qty: i.qty + 1 } : i)
    }
      return [...prev, { name, price, qty: 1 }]
    })
  }

  function removeOneFromCart(name) 
  {
    setCart(prev => 
    {
      const existing = prev.find(i => i.name === name)
      if (existing.qty === 1) 
      {
        return prev.filter(i => i.name !== name)
      }
      return prev.map(i => i.name === name ? { ...i, qty: i.qty - 1 } : i)
    })
  }

  function removeFromCart(name) 
  {
    setCart(prev => prev.filter(i => i.name !== name))
  }

  function clearCart() 
  {
    setCart([])
  }

  const cartCount = cart.reduce((sum, i) => sum + i.qty, 0)
  const cartTotal = cart.reduce((sum, i) => sum + i.price * i.qty, 0)

  return (
    <div className="bg-[#f5f0e8] text-[#1a1208]">
      <NavBar cartCount={cartCount} onCartOpen={() => setCartOpen(true)} />
      <CartPanel
        cart={cart}
        cartTotal={cartTotal}
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        onRemoveOne={removeOneFromCart}
        onAddOne={addToCart}
        onRemoveAll={removeFromCart}
        onClear={clearCart}
      />
      <Hero />
      <Menu onAdd={addToCart} />
      <Gallery />
      <About />
      <Contact />
      <Footer />
    </div>
  )
}