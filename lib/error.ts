export class BalanceNotFoundError extends Error {
  constructor(network: string) {
    super(`No balance found for network ${network}`)
  }
}
