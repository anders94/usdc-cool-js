import Big from "big.js"
import fetch from "cross-fetch"

export const fetchAlgorandSupply = async (assetID: string = "31566704"): Promise<Big> => {
  const data = await fetch(
    `https://indexer.algoexplorerapi.io/v2/assets/${assetID}?include-all=true`
  )
  const json = await data.json()

  const circulatingSupply = new Big(json.asset.params["circulating-supply"])
  const decimals = new Big(json.asset.params.decimals)
  const exponent = new Big(10).pow(decimals.toNumber())

  return circulatingSupply.div(exponent)
}
