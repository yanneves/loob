const { expect } = require('chai')
const { SyntaxError } = require('../lib/parser')
const runtime = require('../lib/runtime')

describe('runtime', () => {
  it('should throw on syntax error', () => {
    expect(() => runtime('$^`')).to.throw(SyntaxError)
  })

  it('should resolve result in truthy expression', () => {
    const expr = 'IF 1 IS EQUAL TO 1 THEN result'
    expect(runtime(expr)).to.equal('result')
  })

  it('should resolve null in falsy expression', () => {
    const expr = 'IF 1 IS EQUAL TO 0 THEN result'
    expect(runtime(expr)).to.be.null
  })

  context('with else if statement', () => {
    it('should still resolve truthy expression', () => {
      const expr = `
        IF 1 IS EQUAL TO 1 THEN result
        ELSE IF 1 IS EQUAL TO 0 THEN another
      `.trim()

      expect(runtime(expr)).to.equal('result')
    })

    it('should resolve first truthy expression', () => {
      const expr = `
        IF 1 IS EQUAL TO 1 THEN result
        ELSE IF 1 IS EQUAL TO 1 THEN another
      `.trim()

      expect(runtime(expr)).to.equal('result')
    })

    it('should resolve truthy else if expression', () => {
      const expr = `
        IF 1 IS EQUAL TO 0 THEN result
        ELSE IF 1 IS EQUAL TO 1 THEN another
      `.trim()

      expect(runtime(expr)).to.equal('another')
    })

    it('should resolve null with falsy else if expression', () => {
      const expr = `
        IF 1 IS EQUAL TO 0 THEN result
        ELSE IF 1 IS EQUAL TO 0 THEN another
      `.trim()

      expect(runtime(expr)).to.be.null
    })
  })

  context('with additional else if statement', () => {
    it('should still resolve first truthy expression', () => {
      const expr = `
        IF 1 IS EQUAL TO 1 THEN result
        ELSE IF 1 IS EQUAL TO 1 THEN another
        ELSE IF 1 IS EQUAL TO 1 THEN additional
      `.trim()

      expect(runtime(expr)).to.equal('result')
    })

    it('should still resolve null with all falsy expressions', () => {
      const expr = `
        IF 1 IS EQUAL TO 0 THEN result
        ELSE IF 1 IS EQUAL TO 0 THEN another
        ELSE IF 1 IS EQUAL TO 0 THEN additional
      `.trim()

      expect(runtime(expr)).to.be.null
    })

    it('should resolve next truthy expression after falsy expression', () => {
      const expr = `
        IF 1 IS EQUAL TO 0 THEN result
        ELSE IF 1 IS EQUAL TO 1 THEN another
        ELSE IF 1 IS EQUAL TO 0 THEN additional
      `.trim()

      expect(runtime(expr)).to.equal('another')
    })

    it('should resolve truthy additional else if expression', () => {
      const expr = `
        IF 1 IS EQUAL TO 0 THEN result
        ELSE IF 1 IS EQUAL TO 0 THEN another
        ELSE IF 1 IS EQUAL TO 1 THEN additional
      `.trim()

      expect(runtime(expr)).to.equal('additional')
    })
  })

  context('with context object', () => {
    it('should resolve result in truthy expression', () => {
      const expr = 'IF 1 IS EQUAL TO 1 THEN result'
      expect(runtime(expr)).to.equal('result')
    })
  })
})
