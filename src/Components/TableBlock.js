import { useEffect, useState } from 'react'
import { getBlockNumber, getBlock } from '../utils'
import { Link } from 'react-router-dom'

export const TableBlock = () => {
  const [lastBlocks, setLastBlocks] = useState([])

  useEffect(() => {
    async function getLastsNBlocks(num = 5) {
      const lastBlock = await getBlockNumber();
      const blocks = [];
      for (let i = 0; i < num; i++) {
        const block = await getBlock(lastBlock - i);
        blocks.push(block);
      }
      return blocks;
    }

    async function fetchData() {
      const blocks = await getLastsNBlocks();
      setLastBlocks(blocks);
    }

    fetchData();
  }, [])

  if (!lastBlocks || lastBlocks.length === 0) { return ('Getting data...') }
  if (lastBlocks.length > 0) {
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
                      N° Transactions
                    </th>
                    <th scope='col' className='text-sm font-medium text-gray-900 p-2 pl-0 text-left'>
                      Block time
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {lastBlocks.map((item, index) => {
                    return (
                      <tr className='border-b' key={index}>
                        <td className='text-sm font-light text-gray-900 p-2 pl-0 whitespace-nowrap'>
                          <Link className='underline' to={`/block/${item.number}`} title=''>{item.number}</Link>
                        </td>
                        <td className='text-sm text-gray-900 font-light p-2 pl-0 whitespace-nowrap'>
                          {item.transactions ? item.transactions.length : '-'}
                        </td>
                        <td className='text-sm text-gray-900 font-light p-2 pl-0 whitespace-nowrap'>
                          {new Date(item.timestamp * 1000).toLocaleString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: false })}
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
