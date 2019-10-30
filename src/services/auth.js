import axios from 'axios'
import config from '../config'
import uuid from 'uuidv4'

class Auth {
  constructor (c) {
    this.config = (typeof c === 'undefined') ? config : c
    this.esgAuthStorage = window.localStorage
    this.authService = axios.create({
      baseURL: this.config.authServer,
      timeout: 30000
    })
    this.hasLoginSession = false
    this.userProfile = {}
  }

  get isAuthenticated() {
    return this.hasLoginSession
  }

  async isLoggedIn() {
    if (this.hasLoginSession) { return true }
    if (!this.esgAuthStorage.getItem('jwt-token')) { return false }

    try {
      const response = await this.authService.get('/verify', {
        headers: {
          'Authorization': `Bearer ${this.esgAuthStorage.getItem('jwt-token')}`
        }
      })
      if (response.status === 200) {
        this.hasLoginSession = true
        this.userProfile = response.data.data
        return true
      }
    } catch (err) {
      console.error(err.message)
    }

    return true
  }

  loginUrl(from) {
    this.esgAuthStorage.setItem('from-url', from.pathname)

    const codeChallenge = uuid()
    this.esgAuthStorage.setItem('code-verifier', codeChallenge)

    const oauthState = uuid()
    this.esgAuthStorage.setItem('oauth-state', oauthState)

    return `${this.config.authServer}/auth?client_id=${this.config.clientId}&redirect_uri=${this.config.callbackUri}&code_challenge=${codeChallenge}&state=${oauthState}`
  }

  async exchangeAuthToken(authToken, state) {
    if (state !== this.esgAuthStorage.getItem('oauth-state')) {
      throw new Error('Invalid state')
    }

    const response = await this.authService.post('/auth/token', {
      client_id: this.config.clientId,
      redirect_uri: this.config.callbackUri,
      code: authToken,
      code_verifier: this.esgAuthStorage.getItem('code-verifier')
    })

    if (response.status === 200) {
      const returnUrl = this.esgAuthStorage.getItem('from-url')
      this.esgAuthStorage.clear()
      this.esgAuthStorage.setItem('jwt-token', response.data.access_token)
      this.userProfile = response.data.data
      this.hasLoginSession = true
      return { returnUrl }
    }

    return false
  }

  logout(cb) {
    this.hasLoginSession = false
    this.esgAuthStorage.clear()
    cb()
  }
}

export default Auth
