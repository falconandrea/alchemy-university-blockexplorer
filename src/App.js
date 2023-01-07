import { useState } from 'react'

import './App.css'

import { TableBlock } from './components/TableBlock'
import { TableTransactions } from './components/TableTransactions'

function App () {
  const [blockNumber, setBlockNumber] = useState('')

  const searchData = (event) => {
    event.preventDefault()
    console.log('get')
  }

  return (
    <div className='w-5/6 mx-auto mt-8'>
      <h1 className='font-bold text-2xl mb-4'>Ethereum Block Explorer</h1>
      <form className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4' onSubmit={searchData}>
        <div className='mb-4'>
          <label className='block text-gray-700 text-sm font-bold mt-4 mb-2' htmlFor='blockNumber'>
            Insert a block number, transaction hash or an address...
          </label>
          <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' onChange={(e) => setBlockNumber(e.target.value)} value={blockNumber} id='blockNumber' type='text' placeholder='Insert here...' />
        </div>
        <div className='flex items-center justify-between'>
          <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline' type='submit'>
            Search
          </button>
        </div>
      </form>
      <div className='lg:flex lg:flex-row lg:space-x-4'>
        <div className='w-full lg:w-1/2 bg-white shadow-md rounded p-8 mb-4'>
          <p className='block text-sm mb-4'><strong className='text-gray-700'>Last 5 blocks</strong></p>
          <TableBlock />
        </div>
        <div className='w-full lg:w-1/2 bg-white shadow-md rounded p-8 mb-4'>
          <p className='block text-sm mb-4'><strong className='text-gray-700'>Last 5 transactions</strong></p>
          <TableTransactions />
        </div>
      </div>
    </div>
  )
}

export default App
