import jest from 'jest'
import Auth from './auth'

describe('Auth', () => {
  it('#loginUrl', () => {
    const fakeConfig = {
      authServer: 'http://localhost:3002',
      clientId: '12345678',
      callbackUri: 'http://localhost:3000/auth/callback'
    }

    const auth = new Auth(fakeConfig)

     expect(auth.loginUrl({pathName: '/'})).toMatch(/^http:\/\/localhost\:3002\/auth\?client_id=12345678&redirect_uri=http\:\/\/localhost:3000\/auth\/callback/)
  })
})
