import { fetchTotalSupply } from "../lib"

const main = async () => {
  const {
    algorandSupply,
    avalancheSupply,
    ethereumSupply,
    hederaSupply,
    solanaSupply,
    stellarSupply,
    tronSupply,
    totalSupply
  } = await fetchTotalSupply()

  console.log(`Algorand: $${algorandSupply.toString()}`)
  console.log(`Avalanche: $${avalancheSupply.toString()}`)
  console.log(`Ethereum: $${ethereumSupply.toString()}`)
  console.log(`Hedera: $${hederaSupply.toString()}`)
  console.log(`Solana: $${solanaSupply.toString()}`)
  console.log(`Stellar: $${stellarSupply.toString()}`)
  console.log(`Tron: $${tronSupply.toString()}`)
  console.log("----------")
  console.log(`Total: $${totalSupply.toString()}`)
}

main()
  .then(() => {
    process.exit(0)
  })
  .catch((err) => {
    console.error(err)
    process.exit(1)
  })
