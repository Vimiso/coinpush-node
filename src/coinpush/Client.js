const Request = require('./Request')

module.exports = class Client extends Request
{
    /**
     * Pass the config to the parent constructor.
     *
     * @param {Config} config
     * @return {void}
     */
    constructor(config)
    {
        super(config)
    }

    /**
     * Convert the fiat amount into the given cryptocurrency.
     *
     * @param {string} fiat
     * @param {number} amount
     * @param {string} currency
     * @return {Array}
     */
    convert(fiat, amount, currency)
    {
        let path = this.makePath('/convert/' + fiat + '/' + amount + '/' + currency)
        let options = this.makeOptions()

        return this.setMethod('GET').setPath(path).setOptions(options).make()
    }

    /**
     * Create a new payment address given the cryptocurrency and parameters.
     *
     * @param {string} currency
     * @param {Object} params
     * @return {Array}
     */
    create(currency, params)
    {
        let path = this.makePath('/create/' + currency)
        let options = this.makeOptions(params)

        return this.setMethod('POST').setPath(path).setOptions(options).make()
    }

    /**
     * Create a new charge resource given the fiat and parameters.
     *
     * @param {string} fiat
     * @param {Object} params
     * @return {Array}
     */
    charge(fiat, params)
    {
        let path = this.makePath('/charge/' + fiat)
        let options = this.makeOptions(params)

        return this.setMethod('POST').setPath(path).setOptions(options).make()
    }

    /**
     * Check charge payment details given the token.
     *
     * @param {string} token
     * @return {Array}
     */
    chargeView(token)
    {
        let path = this.makePath('/charge/' + token)
        let options = this.makeOptions()

        return this.setMethod('GET').setPath(path).setOptions(options).make()
    }

    /**
     * Check payment statuses given the label.
     *
     * @param {string} label
     * @return {Array}
     */
    statuses(label)
    {
        let path = this.makePath('/statuses/' + label)
        let options = this.makeOptions()

        return this.setMethod('GET').setPath(path).setOptions(options).make()
    }

    /**
     * Check address details given the label.
     *
     * @param {string} label
     * @return {Array}
     */
    address(label)
    {
        let path = this.makePath('/address/' + label)
        let options = this.makeOptions()

        return this.setMethod('GET').setPath(path).setOptions(options).make()
    }
}
