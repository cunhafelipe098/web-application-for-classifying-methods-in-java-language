export class ImpossibleClassify extends Error {
  constructor () {
    super('Impossible to classify')
    this.name = 'ImpossibleClassify'
  }
}
