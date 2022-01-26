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
 Algorand:      $364,560,546.38
Avalanche:       $65,247,946.05
 Ethereum:   $43,411,718,292.40
   Hedera:        $9,144,626.45
   Solana:    $4,040,804,648.82
  Stellar:      $140,143,240.91
     Tron:      $517,042,294.73
-------------------------------
    Total:   $48,548,661,595.74
```
