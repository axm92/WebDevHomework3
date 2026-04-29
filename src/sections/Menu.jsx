import { useState } from 'react'

const menuItems = [
  { name: 'Wagyu Patacon', description: 'A5 wagyu steak on fried plantain buns, with pico de gallo, salad, spicy mayo and ajo', price: 18 },
  { name: 'Chulleta Curry', description: 'Fried Porkchop, white rice, flavorful curry', price: 12 },
  { name: 'Veggie Ramen', description: 'Tofu, mushrooms, green onion, vegetable base, half egg', price: 14 },
  { name: 'Matcha Tres Leches', description: 'Spongecake soaked in rich matcha', price: 7 },
  { name: 'Dulce de Leche Cheesecake', description: 'Fluffy Japanese cheesecake with caramel', price: 10 },
  { name: 'Pina Ramune', description: '', price: 6 },
  { name: 'Iced Matcha', description: '', price: 8 },
  { name: 'Cafe con Leche', description: '', price: 5 },
]

export default function Menu({ onAdd }) {
  const [added, setAdded] = useState({})

  function handleAdd(name, price) {
    onAdd(name, price)
    setAdded(prev => ({ ...prev, [name]: true }))
    setTimeout(() => setAdded(prev => ({ ...prev, [name]: false })), 1000)
  }

  return (
    <section id="menu" className="bg-[#1a1208] text-[#f5f0e8] py-28 px-8 md:px-16">
      <h2 className="font-serif text-4xl md:text-5xl font-light mb-2">
        Our <em className="italic text-4x1">Menu</em>
      </h2>
      <div className="w-14 h-px bg-[#d4a843] mt-4 mb-12" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
        {menuItems.map(item => (
          <div key={item.name}
            className="flex justify-between items-start px-4 py-5 border-b border-[#f5f0e8]/07 hover:bg-[#f5f0e8]/03 transition-colors duration-200 gap-4">
            <div className="flex-1">
              <h4 className="font-serif text-lg font-normal mb-1">{item.name}</h4>
              {item.description && (
                <p className="text-xs text-[#f5f0e8]/50 leading-relaxed max-w-xs">{item.description}</p>
              )}
              <button
                onClick={() => handleAdd(item.name, item.price)}
                className={`mt-3 px-3 py-1 text-[10px] uppercase tracking-widest border transition-all duration-200
                  ${added[item.name]
                    ? 'bg-[#4a5240] border-[#4a5240] text-[#f5f0e8]'
                    : 'border-[#d4a843]/30 text-[#d4a843]/70 hover:bg-[#d4a843] hover:border-[#d4a843] hover:text-[#1a1208]'
                  }`}>
                {added[item.name] ? '✓ Added' : '+ Add to Cart'}
              </button>
            </div>
            <span className="font-serif text-[#d4a843] text-lg flex-shrink-0">${item.price}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
