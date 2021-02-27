import React, { useState } from 'react'
import './App.css'
const myArray = require('./test.json')

function App() {
  const table = myArray.data.products_list.products
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('')

  const handleSearch = (event) => {
    setSearch(event.target.value)
  }

  const filterTable = (info) => {
    switch (filter) {
      case 'SKU':
        return (
          info.map((item) => {
            if (item.product_identifiers[1].value.toLowerCase().includes(search.toLowerCase())) {
              return item
            } else return null
          })
        )

      case 'UPC':
        return (
          info.map((item) => {
            if (item.product_identifiers[0].value.toLowerCase().includes(search.toLowerCase())) {
              return item
            } else return null
          })
        )

      case 'Full Description':
        return (
          info.map((item) => {
            if (item.product_locale[0].value.toLowerCase().includes(search.toLowerCase())) {
              return item
            } else return null
          })
        )

      case 'Item Description':
        return (
          info.map((item) => {
            if (item.product_locale[1].value.toLowerCase().includes(search.toLowerCase())) {
              return item
            } else return null
          })
        )

      default:
        return info
    }
  }

  const filteredTable = filterTable(table)

  return (
    <div>
      <div className="search">
        <h1>Filtrar información</h1>
        <input type="text" value={search} placeholder="Filtrar..." onChange={handleSearch} />
        <select value={filter} onChange={e => setFilter(e.target.value)}>
          <option hidden defaultValue>Selecciona una opción</option>
          <option>SKU</option>
          <option>UPC</option>
          <option>Full Description</option>
          <option>Item Description</option>
        </select>
        <p>*Para el bonus, aqui pondría otro filtro con los diferentes lobs, misma logica que el select (que escoges sku, upc, etc). Para hacer la validacion solo le agregas un AND en cada caso para que cumpla la validacion de ese lob.</p>
      </div>
      <table>
        <tbody>
          <tr>
            <th>SKU</th>
            <th>UPC</th>
            <th>Full descripction</th>
            <th>Item Description</th>
            <th>Image</th>
          </tr>
          {/* {filteredTable.map((item, index) => { */}
          {filteredTable &&
            filteredTable.map((item, index) => {
              if (item !== null || undefined) {
                return (
                  < tr key={index}>
                    <td>{item.product_identifiers[1].value}</td>
                    <td>{item.product_identifiers[0].value}</td>
                    <td>{item.product_locale[0].value}</td>
                    <td>{item.product_locale[1].value}</td>
                    <td><img src={item.images[0]} alt="" /></td>
                  </tr>
                )
              } else {
                return null
              }
            })
          }
        </tbody>
      </table>
    </div >
  );
}

export default App;
