import { useState } from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Home from './Pages/Home'
import Transaction from './Pages/Transaction'
import TransactionList from './Pages/TransactionList'
import Address from './Pages/Address'
import Block from './Pages/Block'
import { getBlock } from './utils'
import './App.css'

function App () {
  const [searchTerm, setSearchTerm] = useState('')

  const searchData = async (event) => {
    event.preventDefault()
    if (searchTerm.startsWith('0x')) {
      if (searchTerm.length === 42) {
        // Address
        window.location.replace(`/address/${searchTerm}`)
      } else if (searchTerm.length === 66) {
        // Transaction or block hash??
        if (await getBlock(searchTerm)) window.location.replace(`/block/${searchTerm}`)
        else window.location.replace(`/tx/${searchTerm}`)
      }
    } else {
      // Block number
      window.location.replace(`/block/${searchTerm}`)
    }
  }

  return (
    <BrowserRouter>
      <div className='w-5/6 mx-auto mt-8'>
        <h1 className='font-bold text-2xl mb-4'><Link to='/' title=''>Ethereum Block Explorer</Link></h1>
        <form className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4' onSubmit={searchData}>
          <div className='mb-4'>
            <label className='block text-gray-700 text-sm font-bold mt-4 mb-2' htmlFor='searchTerm'>
              Insert a block number, transaction hash or an address...
            </label>
            <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' onChange={(e) => setSearchTerm(e.target.value)} value={searchTerm} id='searchTerm' type='text' placeholder='Insert here...' />
          </div>
          <div className='flex items-center justify-between'>
            <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline' type='submit'>
              Search
            </button>
          </div>
        </form>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/tx/:hash' element={<Transaction />} />
          <Route path='/address/:hash' element={<Address />} />
          <Route path='/block/:hash' element={<Block />} />
          <Route path='/block/:hash/tx' element={<TransactionList />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
