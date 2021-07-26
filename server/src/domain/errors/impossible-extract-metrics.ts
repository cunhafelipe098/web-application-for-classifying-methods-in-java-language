export class ImpossibleExtract extends Error {
  constructor () {
    super('Impossible to extract metrics')
    this.name = 'ImpossibleExtract'
  }
}
