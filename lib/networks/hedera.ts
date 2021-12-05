import Big from "big.js"
import fetch from "cross-fetch"
import { BalanceNotFoundError } from "../error"

type HederaApiBalance = {
  account: string
  balance: number
}

type HederaApiBalancesResponse = {
  timestamp: number
  balances: HederaApiBalance[]
}

type DrangonglassBalance = {
  tokenId: string
  balance: number
}

type DragonglassBalancesResponse = {
  accountID: string
  tokenBalance: DrangonglassBalance[]
}

const getTokenInfo = async (tokenID: string) => {
  try {
    const data = await fetch(
      `https://mainnet-public.mirrornode.hedera.com/api/v1/tokens/${tokenID}`
    )

    return data.json()
  } catch (e) {
    return {
      total_supply: "250010000000000",
      decimals: "6"
    }
  }
}

const getPreMintBalance = async (tokenID: string, preMintAccount: string) => {
  try {
    const data = await fetch(
      `https://mainnet-public.mirrornode.hedera.com/api/v1/tokens/${tokenID}/balances?account.id=${preMintAccount}`
    )

    const json: HederaApiBalancesResponse = await data.json()

    const preMintBalance = json.balances.find(
      (b) => b.account === preMintAccount
    )

    if (!preMintBalance) {
      throw new BalanceNotFoundError("Hedera")
    }

    return new Big(preMintBalance.balance)
  } catch (e) {
    const data = await fetch(
      `https://api.dragonglass.me/hts/v1/accounts/${preMintAccount}/balances`
    )

    const json: DragonglassBalancesResponse = await data.json()

    const preMintBalance = json.tokenBalance.find((b) => b.tokenId === tokenID)

    if (!preMintBalance) {
      throw new BalanceNotFoundError("Hedera")
    }
    return new Big(preMintBalance.balance)
  }
}

export const fetchHederaSupply = async (
  tokenID: string,
  preMintAccount: string
): Promise<Big> => {
  const [tokenInfo, premintSupply] = await Promise.all([
    getTokenInfo(tokenID),
    getPreMintBalance(tokenID, preMintAccount)
  ])

  const totalSupply = new Big(tokenInfo.total_supply)
  const supply = totalSupply.minus(premintSupply)
  const decimals = new Big(tokenInfo.decimals)
  const exponent = new Big(10).pow(decimals.toNumber())
  return supply.div(exponent)
}
