import Big from "big.js"
import fetch from "cross-fetch"

export const fetchStellarSupply = async (
  code: string,
  issuer: string
): Promise<Big> => {
  const data = await fetch(
    `https://horizon.stellar.org/assets?asset_code=${code}&asset_issuer=${issuer}`
  )
  const json = await data.json()

  return new Big(json._embedded.records[0].amount)
}
