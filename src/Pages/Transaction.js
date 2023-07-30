import { useEffect, useState } from 'react'
import { getTransaction, convertToEth } from '../utils'
import { Link, useParams } from 'react-router-dom'

function Transaction () {
  const { hash } = useParams()
  const [transaction, setTransaction] = useState({})

  useEffect(() => {
    async function fetchData() {
      const result = await getTransaction(hash)
      result.value = convertToEth(result.value)
      setTransaction(result)
    }
    fetchData()
  }, [hash])

  return (
    <div className='lg:flex lg:flex-row lg:space-x-4'>
      <div className='w-full bg-white shadow-md rounded p-8 mb-4'>
        <p className='block text-sm mb-4 pb-2 border-b-2'><strong className='text-gray-700'>Info transaction</strong></p>
        <p className='block text-sm mb-4 text-gray-700'><strong>Hash:</strong> {transaction.hash}</p>
        <p className='block text-sm mb-4 text-gray-700'><strong>Block number:</strong> <Link className='underline' to={`/block/${transaction.blockNumber}`}>{transaction.blockNumber}</Link></p>
        <p className='block text-sm mb-4 text-gray-700'><strong>From:</strong> <Link className='underline' to={`/address/${transaction.from}`}>{transaction.from}</Link></p>
        <p className='block text-sm mb-4 text-gray-700'><strong>To:</strong> <Link className='underline' to={`/address/${transaction.to}`}>{transaction.to}</Link></p>
        <p className='block text-sm mb-4 text-gray-700'><strong>Nonce:</strong> {transaction.nonce} </p>
        <p className='block text-sm mb-4 text-gray-700'><strong>Value:</strong> {transaction.value} ETH</p>
      </div>
    </div>
  )
}

export default Transaction
