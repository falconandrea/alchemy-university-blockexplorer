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

export const getBlockNumber = async () => {
  return await alchemy.core.getBlockNumber()
}

export const getBlock = async (block, withTransactions = false) => {
  if (withTransactions) return await alchemy.core.getBlockWithTransactions(block)
  else return await alchemy.core.getBlock(block)
}

export const getTransaction = async (hash) => {
  return await alchemy.core.getTransaction(hash)
}

export const getBalance = async (hash) => {
  return await alchemy.core.getBalance(hash)
}

export const convertToEth = (value) => {
  return Utils.formatUnits(value, 'ether')
}
