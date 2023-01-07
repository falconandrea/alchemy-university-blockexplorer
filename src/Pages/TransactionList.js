import { TableTransactions } from '../Components/TableTransactions'

function TransactionList () {
  const listTransactions = []
  return (
    <div className='lg:flex lg:flex-row lg:space-x-4'>
      <div className='w-full bg-white shadow-md rounded p-8 mb-4'>
        <p className='block text-sm mb-4 pb-2 border-b-2'><strong className='text-gray-700'>List transactions</strong></p>
        <TableTransactions listTransactions={listTransactions} />
      </div>
    </div>
  )
}

export default TransactionList
