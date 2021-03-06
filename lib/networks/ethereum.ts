import Big from "big.js"
import { ethers } from "ethers"

/**
 * Total USDC Balance of Blacklisted Addresses:
 *
 * https://dune.xyz/queries/374985
 */
const BLACKLIST_TOTAL = new Big(2_674_725.46361)

export const fetchEthereumSupply = async (): Promise<Big> => {
  const address = "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48"
  const provider = new ethers.providers.InfuraProvider(
    "mainnet",
    "e3bb406cb74343c18968f0018010ffc1"
  )
  const abi = [
    "function totalSupply() view returns (uint256)",
    "function decimals() view returns (uint8)"
  ]
  const contract = new ethers.Contract(address, abi, provider)
  const totalSupply = await contract.totalSupply()
  const decimals = await contract.decimals()
  const exponent = new Big(10).pow(decimals)

  const supply = new Big(totalSupply.toString()).div(exponent)

  return supply.minus(BLACKLIST_TOTAL)
}
