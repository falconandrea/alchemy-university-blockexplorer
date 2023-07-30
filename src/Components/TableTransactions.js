import { useEffect, useState } from 'react'
import { getBlockNumber, getBlock, convertToEth } from '../utils'
import { Link } from 'react-router-dom'

export const TableTransactions = ({ listTransactions = [] }) => {
  const [lastTransactions, setLastTransactions] = useState([])

  useEffect(() => {
    async function getLastsNBlocks(num = 5) {
      const lastBlock = await getBlockNumber();
      const lastBlockInfo = await getBlock(lastBlock, true);
      const transactions = lastBlockInfo.transactions.slice(0, num);
      return transactions;
    }

    async function fetchData() {
      if (listTransactions.length > 0) {
        setLastTransactions(listTransactions);
      } else {
        const transactions = await getLastsNBlocks();
        setLastTransactions(transactions);
      }
    }

    fetchData();
  });

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
                          <Link className='underline' to={`/tx/${item.hash}`} title=''>{item.hash.slice(0, 6)}...</Link>
                        </td>
                        <td className='text-sm font-light text-gray-900 p-2 pl-0 whitespace-nowrap'>
                          From {item.from ? <Link className='underline' to={`/address/${item.from}`} title=''>{item.from.slice(0, 6)}...</Link> : '-'}
                          <br />
                          To {item.to ? <Link className='underline' to={`/address/${item.to}`} title=''>{item.to.slice(0, 6)}...</Link> : '-'}
                        </td>
                        <td className='text-sm font-light text-gray-900 p-2 pl-0 whitespace-nowrap'>
                          {convertToEth(item.value)} ETH
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
