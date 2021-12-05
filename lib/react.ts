import Big from "big.js"
import useSWR from "swr"

import {
  fetchAlgorandSupply,
  fetchEthereumSupply,
  fetchHederaSupply,
  fetchSolanaSupply,
  fetchStellarSupply,
  fetchTronSupply
} from "./networks"

type Supply = {
  supply?: Big
  isLoading: boolean
  error?: Error
  timestamp: Date
}

type Fetcher = (...args: string[]) => Promise<Big | undefined>

const useSupply = (args: string | string[], fetcher: Fetcher) => {
  const { data: supply, error } = useSWR(args, fetcher)

  return {
    supply,
    error,
    isLoading: !error && !supply,
    timestamp: new Date()
  }
}

/**
 * Algorand
 */
export const useAlgorandSupply = (): Supply => {
  return useSupply("31566704", fetchAlgorandSupply)
}

/**
 * Ethereum
 */
export const useEthereumSupply = (): Supply => {
  return useSupply(
    "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
    fetchEthereumSupply
  )
}

/**
 * Hedera
 */
export const useHederaSupply = (): Supply => {
  return useSupply(["0.0.456858", "0.0.439717"], fetchHederaSupply)
}

/**
 * Solana
 */
export const useSolanaSupply = (): Supply => {
  return useSupply(
    [
      "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
      "3emsAVdmGKERbHjmGfQ6oZ1e35dkf5iYcS6U4CPKFVaa"
    ],
    fetchSolanaSupply
  )
}

/**
 * Stellar
 */
export const useStellarSupply = (): Supply => {
  return useSupply(
    ["USDC", "GA5ZSEJYB37JRC5AVCIA5MOP4RHTM335X2KGX3IHOJAPP5RE34K4KZVN"],
    fetchStellarSupply
  )
}

/**
 * Tron
 */
export const useTronSupply = (): Supply => {
  return useSupply("TEkxiTehnzSmSe2XqrBj4w32RUN966rdz8", fetchTronSupply)
}

/**
 * Total Supply
 */
export const useTotalSupply = (): Supply => {
  const { supply: algorandSupply, error: algorandError } = useAlgorandSupply()
  const { supply: ethereumSupply, error: ethereumError } = useEthereumSupply()
  const { supply: hederaSupply, error: hederaError } = useHederaSupply()
  const { supply: solanaSupply, error: solanaError } = useSolanaSupply()
  const { supply: stellarSupply, error: stellarError } = useStellarSupply()
  const { supply: tronSupply, error: tronError } = useTronSupply()

  const supply = [
    algorandSupply,
    ethereumSupply,
    hederaSupply,
    solanaSupply,
    stellarSupply,
    tronSupply
  ].reduce((acc?: Big, curr?: Big) => {
    return acc!.plus(curr ?? 0)
  }, new Big(0))

  const error =
    algorandError ||
    ethereumError ||
    hederaError ||
    solanaError ||
    stellarError ||
    tronError

  return {
    supply,
    error,
    isLoading: !error && !supply?.gt(0),
    timestamp: new Date()
  }
}
