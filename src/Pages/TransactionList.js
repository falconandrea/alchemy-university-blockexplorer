import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { TableTransactions } from '../Components/TableTransactions'
import { getBlock } from '../utils'

function TransactionList () {
  const [listTransactions, setListTransactions] = useState([])
  const { hash } = useParams()

  useEffect(() => {
    async function fetchData() {
      const result = await getBlock(hash, true)
      setListTransactions(result.transactions)
    }
    fetchData()
  })

  return (
    <div className='lg:flex lg:flex-row lg:space-x-4'>
      <div className='w-full bg-white shadow-md rounded p-8 mb-4'>
        <p className='block text-sm mb-4 pb-2 border-b-2'><strong className='text-gray-700'>List transactions</strong></p>
        {listTransactions.length > 0 ? <TableTransactions listTransactions={listTransactions} /> : 'Getting data...'}
      </div>
    </div>
  )
}

export default TransactionList
