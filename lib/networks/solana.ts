import { Connection, PublicKey } from "@solana/web3.js"
import Big from "big.js"

const getSupplyAndPreMintBalance = (
  address: string,
  preMintAddress: string
) => {
  const connection = new Connection("https://api.mainnet-beta.solana.com")
  const token = new PublicKey(address)
  const preMint = new PublicKey(preMintAddress)

  return Promise.all([
    connection.getTokenSupply(token),
    connection.getTokenAccountBalance(preMint)
  ])
}

export const fetchSolanaSupply = async (
  address: string = "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
  preMintAddress: string = "3emsAVdmGKERbHjmGfQ6oZ1e35dkf5iYcS6U4CPKFVaa"
): Promise<Big> => {
  const [tokenInfo, preMintBalance] = await getSupplyAndPreMintBalance(
    address,
    preMintAddress
  )

  const premintSupply = new Big(preMintBalance.value.amount)
  const totalSupply = new Big(tokenInfo.value.amount)
  const supply = totalSupply.minus(premintSupply)

  const decimals = new Big(tokenInfo.value.decimals)
  const exponent = new Big(10).pow(decimals.toNumber())

  return supply.div(exponent)
}
