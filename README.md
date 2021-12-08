<img src="./usdc-dealwithit.png" align="right" />

# usdc.cool

> Get the latest USDC supply across all chains.

## Installation

```sh
npm i usdc.cool
```

## Usage

### Typescript

All API methods are async and return a [Big](https://mikemcl.github.io/big.js/) number, capable of arbitrary-precision arithmetic.

Type definitions are provided as well.

#### Fetch total supply across all chains

```typescript
// This code is extracted from the usdc.cool CLI
import { fetchTotalSupply } from "usdc.cool"

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
```

#### Fetch individual chain supply

```typescript
// Algorand
import { fetchAlgorandSupply } from "usdc.cool"
const supply = await fetchAlgorandSupply()
```

```typescript
// Avalanche
import { fetchAvalancheSupply } from "usdc.cool"
const supply = await fetchAvalancheSupply()
```

```typescript
// Ethereum
import { fetchEthereumSupply } from "usdc.cool"
const supply = await fetchEthereumSupply()
```

```typescript
// Hedera
import { fetchHederaSupply } from "usdc.cool"
const supply = await fetchHederaSupply()
```

```typescript
// Solana
import { fetchSolanaSupply } from "usdc.cool"
const supply = await fetchSolanaSupply()
```

```typescript
// Stellar
import { fetchStellarSupply } from "usdc.cool"
const supply = await fetchStellarSupply()
```

```typescript
// Tron
import { fetchTronSupply } from "usdc.cool"
const supply = await fetchTronSupply()
```

### CLI

This package comes with a CLI interface to get the latest USDC supply

```sh
npx usdc.cool
```

```text
Algorand: $367204848.210376
Avalanche: $57601840.18
Ethereum: $43292534566.73594
Hedera: $7730280.27
Solana: $4042508613.944785
Stellar: $140155434.6371344
Tron: $517042294.73
----------
Total: $48424777878.7082354
```
