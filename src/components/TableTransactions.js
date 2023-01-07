import { useEffect, useState } from 'react'
import { getBlockNumber, getBlock, convertToEth } from '../utils'

export const TableTransactions = () => {
  const [lastTransactions, setLastTransactions] = useState([])

  useEffect(async () => {
    async function getLastsNBlocks (num = 5) {
      const lastBlock = await getBlockNumber()
      const lastBlockInfo = await getBlock(lastBlock, true)
      const transactions = lastBlockInfo.transactions.slice(0, 5)

      for (const id in transactions) {
        transactions[id].value = convertToEth(transactions[id].value)
      }

      return transactions
    }

    const transactions = await getLastsNBlocks()
    setLastTransactions(transactions)
  }, [])

  if (!lastTransactions || lastTransactions.length === 0) { return ('Getting data...') }
  if (lastTransactions.length > 0) {
    return (
      <div className='flex flex-col'>
        <div className='w-full'>
          <div className='inline-block min-w-full'>
            <div className='overflow-hidden'>
              <table className='min-w-full'>
                <thead className='border-b'>
                  <tr>
                    <th scope='col' className='text-sm font-medium text-gray-900 p-2 pl-0 text-left'>
                      #
                    </th>
                    <th scope='col' className='text-sm font-medium text-gray-900 p-2 pl-0 text-left'>
                      From / To
                    </th>
                    <th scope='col' className='text-sm font-medium text-gray-900 p-2 pl-0 text-left'>
                      Value
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {lastTransactions.map((item, index) => {
                    return (
                      <tr className='border-b' key={index}>
                        <td className='text-sm font-light text-gray-900 p-2 pl-0 whitespace-nowrap'>
                          <a className='underline' href={`/tx/${item.hash}`} title=''>{item.hash.slice(0, 6)}...</a>
                        </td>
                        <td className='text-sm font-light text-gray-900 p-2 pl-0 whitespace-nowrap'>
                          From <a className='underline' href={`/address/${item.from}`} title=''>{item.from.slice(0, 6)}...</a>
                          <br />
                          To <a className='underline' href={`/address/${item.to}`} title=''>{item.to.slice(0, 6)}...</a>
                        </td>
                        <td className='text-sm font-light text-gray-900 p-2 pl-0 whitespace-nowrap'>
                          {item.value} ETH
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
