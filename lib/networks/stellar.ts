import Big from "big.js"
import fetch from "cross-fetch"

export const fetchStellarSupply = async (
  code: string = "USDC",
  issuer: string = "GA5ZSEJYB37JRC5AVCIA5MOP4RHTM335X2KGX3IHOJAPP5RE34K4KZVN"
): Promise<Big> => {
  const data = await fetch(
    `https://horizon.stellar.org/assets?asset_code=${code}&asset_issuer=${issuer}`
  )
  const json = await data.json()

  return new Big(json._embedded.records[0].amount)
}
