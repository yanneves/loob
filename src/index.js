import parse from './runtime'

function loob(context: mixed) {
  return { parse: (expression: string) => parse(expression, context) }
}

loob.parse = parse
export default loob
