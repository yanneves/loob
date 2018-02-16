const { expect } = require('chai')
const times = require('lodash/times')
const loob = require('../lib/index')

describe('loob', () => {
  it('should export a function', () => {
    expect(loob).to.be.a('function')
  })

  it('should export parse function', () => {
    expect(loob)
      .to.have.property('parse')
      .that.is.a('function')
  })

  it('should still export parse function when provided context', () => {
    expect(loob(new Object()))
      .to.have.property('parse')
      .that.is.a('function')
  })

  context('with context', () => {
    const context = Object.freeze({ key: 'value' })
    const expr = 'IF 1 IS EQUAL TO 1 THEN success'

    it('should execute parser when called', () => {
      expect(() => loob(context).parse(expr)).not.to.throw()
    })

    it('should be able to execute parser multiple times', () => {
      times(15, () => {
        expect(() => loob(context).parse(expr)).not.to.throw()
      })
    })

    it('should produce same result on subsequent calls', () => {
      const instance = loob(context)
      const res = instance.parse(expr)

      times(3, () => {
        expect(instance.parse(expr)).to.deep.equal(res)
      })
    })
  })
})
