import Big from "big.js"
import { ethers } from "ethers"

export const fetchAvalancheSupply = async (): Promise<Big> => {
  const address = "0xB97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E"
  const provider = new ethers.providers.JsonRpcProvider(
    "https://api.avax.network/ext/bc/C/rpc"
    // "mainnet"
  )
  const abi = [
    "function totalSupply() view returns (uint256)",
    "function decimals() view returns (uint8)"
  ]
  const contract = new ethers.Contract(address, abi, provider)
  const totalSupply = await contract.totalSupply()
  const decimals = await contract.decimals()
  const exponent = new Big(10).pow(decimals)

  return new Big(totalSupply.toString()).div(exponent)
}
