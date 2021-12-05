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
    fetchAlgorandSupply("31566704"),
    fetchEthereumSupply("0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48"),
    fetchHederaSupply("0.0.456858", "0.0.439717"),
    fetchSolanaSupply(
      "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
      "3emsAVdmGKERbHjmGfQ6oZ1e35dkf5iYcS6U4CPKFVaa"
    ),
    fetchStellarSupply(
      "USDC",
      "GA5ZSEJYB37JRC5AVCIA5MOP4RHTM335X2KGX3IHOJAPP5RE34K4KZVN"
    ),
    fetchTronSupply("TEkxiTehnzSmSe2XqrBj4w32RUN966rdz8")
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
