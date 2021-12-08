import Big from "big.js"
import fetch from "cross-fetch"
import { BalanceNotFoundError } from "../error"

type TRC20Token = {
  issue_ts: number
  contract_address: string
  symbol: string
  decimals: number
  total_supply_with_decimals: string
}

type TronResponse = {
  total: number
  contractMap: Record<string, boolean>
  rangeTotal: number
  trc20_tokens: TRC20Token[]
}

export const fetchTronSupply = async (
  contractAddress: string = "TEkxiTehnzSmSe2XqrBj4w32RUN966rdz8"
): Promise<Big> => {
  const data = await fetch(
    `https://apilist.tronscan.org/api/token_trc20?contract=${contractAddress}`
  )
  const json: TronResponse = await data.json()
  const tokenInfo = json.trc20_tokens.find(
    (t) => t.contract_address === contractAddress
  )

  if (!tokenInfo) {
    throw new BalanceNotFoundError("Tron")
  }

  const totalSupply = new Big(tokenInfo.total_supply_with_decimals)
  const decimals = new Big(tokenInfo.decimals)
  const exponent = new Big(10).pow(decimals.toNumber())
  return totalSupply.div(exponent)
}
