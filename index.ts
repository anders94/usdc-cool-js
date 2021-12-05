import { fetchTotalSupply } from "./lib"

const main = async () => {
  const { totalSupply, solanaSupply } = await fetchTotalSupply()

  console.log(`Total supply: ${totalSupply.toString()}`)
  console.log(`Solana supply: ${solanaSupply.toString()}`)
}

main()
  .then(() => {
    process.exit(0)
  })
  .catch((err) => {
    console.error(err)
    process.exit(1)
  })
