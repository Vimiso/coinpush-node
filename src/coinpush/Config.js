module.exports = class Config
{
    /**
     * If given, set a custom base URI on construct.
     *
     * @param {null|string} baseUri
     * @return {void}
     */
    constructor(baseUri)
    {
        this.VERSIONS = {1: 'api'}
        this.version = 1
        this.baseUri = 'https://coinpush.io'
        this.timeout = 30
        this.testnet = false

        if (baseUri) {
            this.setBaseUri(baseUri)
        }
    }

    /**
     * Enable developer mode.
     *
     * @return {Config}
     */
    enableDevMode()
    {
        this.setBaseUri('http://coinpush.test')

        return this
    }

    /**
     * Determine whether the testnet was enabled.
     *
     * @return {boolean}
     */
    isUsingTestnet()
    {
        return this.testnet
    }

    /**
     * Use the testnet.
     *
     * @return {Config}
     */
    useTestnet()
    {
        this.testnet = true

        return this
    }

    /**
     * Use the mainnet.
     *
     * @return {Config}
     */
    useMainnet()
    {
        this.testnet = false

        return this
    }

    /**
     * Use the given version if it's supported.
     *
     * @param {number} version
     * @return {Config}
     * @throws {Error}
     */
    useVersion(version)
    {
        if (version in this.VERSIONS) {
            this.version = version
        } else {
            throw new Error('API version [' + version + '] is not supported.')
        }

        return this
    }

    /**
     * Get the version number.
     *
     * @return {number}
     */
    getVersion()
    {
        return this.version
    }

    /**
     * Get the version's path segment.
     *
     * @return {string}
     */
    getVersionPathSegment()
    {
        return this.VERSIONS[this.version]
    }

    /**
     * Get the base URI.
     *
     * @return {string}
     */
    getBaseUri()
    {
        return this.baseUri
    }

    /**
     * Get the timeout seconds.
     *
     * @return {number}
     */
    getTimeout()
    {
        return this.timeout
    }

    /**
     * Set the given base URI.
     *
     * @param {string} baseUri
     * @return {void}
     */
    setBaseUri(baseUri)
    {
        this.baseUri = baseUri
    }

    /**
     * Set the given timeout seconds.
     *
     * @param {number} timeout
     * @return {void}
     */
    setTimeout(timeout)
    {
        this.timeout = timeout
    }
}
