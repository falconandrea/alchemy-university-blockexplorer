import { TableBlock } from '../Components/TableBlock'
import { TableTransactions } from '../Components/TableTransactions'

function Home () {
  return (
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
  )
}

export default Home
