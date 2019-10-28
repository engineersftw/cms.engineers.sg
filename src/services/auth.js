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
  }

  async isLoggedIn() {
    if (!this.esgAuthStorage.getItem('jwt-token')) { return false }

    try {
      const response = await this.authService.get('/verify')
      if (response.code == 200) { return true }
    } catch (err) {
      console.error(err.message)
    }

    return false
  }

  get loginUrl() {
    const codeChallenge = uuid()
    this.esgAuthStorage.setItem('code-verifier', codeChallenge)

    const oauthState = uuid()
    this.esgAuthStorage.setItem('oauth-state', oauthState)

    return `${this.config.authServer}/auth?client_id=${this.config.clientId}&redirect_uri=${this.config.callbackUri}&code_challenge=${codeChallenge}&state=${oauthState}`
  }
}

export default Auth
