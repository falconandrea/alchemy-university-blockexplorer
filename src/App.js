import { Alchemy, Network } from 'alchemy-sdk'
import { useEffect, useState } from 'react'

import './App.css'

// Refer to the README doc for more information about using API
// keys in client-side code. You should never do this in production
// level code.
const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET
}

// In this week's lessons we used ethers.js. Here we are using the
// Alchemy SDK is an umbrella library with several different packages.
//
// You can read more about the packages here:
//   https://docs.alchemy.com/reference/alchemy-sdk-api-surface-overview#api-surface
const alchemy = new Alchemy(settings)

function App () {
  const [blockNumber, setBlockNumber] = useState()

  useEffect(() => {
    async function getBlockNumber () {
      setBlockNumber(await alchemy.core.getBlockNumber())
    }

    getBlockNumber()
  })

  return (
    <div class='w-full max-w-xs mx-auto mt-8'>
      <form class='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'>
        <div class='mb-4'>
          <label class='block text-gray-700 text-sm font-bold mb-2' for='blockNumber'>
            Insert a block number
          </label>
          <input class='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' id='blockNumber' type='text' placeholder='Insert a block number' />
        </div>
        <div class='flex items-center justify-between'>
          <button class='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline' type='button'>
            Get info
          </button>
        </div>
      </form>
    </div>
  )
}

export default App
