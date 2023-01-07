import { useEffect, useState } from 'react'
import { Alchemy, Network, Utils } from 'alchemy-sdk'

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

export const TableTransactions = () => {
  const [lastTransactions, setLastTransactions] = useState([])

  useEffect(async () => {
    async function getLastsNBlocks (num = 5) {
      const lastBlock = await alchemy.core.getBlockNumber()
      const lastBlockInfo = await alchemy.core.getBlock(lastBlock)
      const transactionsIds = lastBlockInfo.transactions.slice(0, 5)

      const transactions = []
      for (const tx of transactionsIds) {
        const info = await alchemy.core.getTransaction(tx)
        info.value = Utils.formatUnits(info.value, 'ether')
        console.log(info)
        transactions.push(info)
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
                          <a className='underline' href='' title=''>{item.hash.slice(0, 6)}...</a>
                        </td>
                        <td className='text-sm font-light text-gray-900 p-2 pl-0 whitespace-nowrap'>
                          From <a className='underline' href='' title=''>{item.from.slice(0, 6)}...</a>
                          <br />
                          To <a className='underline' href='' title=''>{item.to.slice(0, 6)}...</a>
                        </td>
                        <td className='text-sm font-light text-gray-900 p-2 pl-0 whitespace-nowrap'>
                          <a className='underline' href='' title=''>{item.value} ETH</a>
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
