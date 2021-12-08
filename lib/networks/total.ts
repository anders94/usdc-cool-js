import Big from "big.js"
import { fetchAlgorandSupply } from "./algorand"
import { fetchEthereumSupply } from "./ethereum"
import { fetchHederaSupply } from "./hedera"
import { fetchSolanaSupply } from "./solana"
import { fetchStellarSupply } from "./stellar"
import { fetchTronSupply } from "./tron"

export const fetchTotalSupply = async (): Promise<{
  totalSupply: Big
  algorandSupply: Big
  ethereumSupply: Big
  hederaSupply: Big
  solanaSupply: Big
  stellarSupply: Big
  tronSupply: Big
}> => {
  const [
    algorandSupply,
    ethereumSupply,
    hederaSupply,
    solanaSupply,
    stellarSupply,
    tronSupply
  ] = await Promise.all([
    fetchAlgorandSupply(),
    fetchEthereumSupply(),
    fetchHederaSupply(),
    fetchSolanaSupply(),
    fetchStellarSupply(),
    fetchTronSupply()
  ])

  const totalSupply = [
    algorandSupply,
    ethereumSupply,
    hederaSupply,
    solanaSupply,
    stellarSupply,
    tronSupply
  ].reduce((acc, curr) => {
    return acc.plus(curr ?? 0)
  }, new Big(0))

  return {
    totalSupply,
    algorandSupply,
    ethereumSupply,
    hederaSupply,
    solanaSupply,
    stellarSupply,
    tronSupply
  }
}
