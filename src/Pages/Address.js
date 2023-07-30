import { useEffect, useState } from 'react'
import { getBalance, convertToEth } from '../utils'
import { useParams } from 'react-router-dom'

function Address () {
  const { hash } = useParams()
  const [account, setAccount] = useState({})

  useEffect(() => {
    async function fetchData() {
      const result = await getBalance(hash)
      setAccount({ hash: hash, balance: convertToEth(result) })
    }
    fetchData()
  }, [hash])

  return (
    <div className='lg:flex lg:flex-row lg:space-x-4'>
      <div className='w-full bg-white shadow-md rounded p-8 mb-4'>
        <p className='block text-sm mb-4 pb-2 border-b-2'><strong className='text-gray-700'>Info account</strong></p>
        <p className='block text-sm mb-4 text-gray-700'><strong>Hash:</strong> {account.hash}</p>
        <p className='block text-sm mb-4 text-gray-700'><strong>Balance:</strong> {account.balance} ETH</p>
      </div>
    </div>
  )
}

export default Address
