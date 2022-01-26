#!/usr/bin/env node
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

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  });

  console.log(` Algorand: ${formatter.format(algorandSupply.toNumber()).padStart(20)}`)
  console.log(`Avalanche: ${formatter.format(avalancheSupply.toNumber()).padStart(20)}`)
  console.log(` Ethereum: ${formatter.format(ethereumSupply.toNumber()).padStart(20)}`)
  console.log(`   Hedera: ${formatter.format(hederaSupply.toNumber()).padStart(20)}`)
  console.log(`   Solana: ${formatter.format(solanaSupply.toNumber()).padStart(20)}`)
  console.log(`  Stellar: ${formatter.format(stellarSupply.toNumber()).padStart(20)}`)
  console.log(`     Tron: ${formatter.format(tronSupply.toNumber()).padStart(20)}`)
  console.log("-------------------------------")
  console.log(`    Total: ${formatter.format(totalSupply.toNumber()).padStart(20)}`)
}

main()
  .then(() => {
    process.exit(0)
  })
  .catch((err) => {
    console.error(err)
    process.exit(1)
  })
