import ApolloClient from 'apollo-boost'
import config from '../config'

class Events {
  constructor(c) {
    this.config = (typeof c === 'undefined') ? config : c
    this.esgAuthStorage = window.localStorage

    this.client = new ApolloClient({
      uri: this.config.eventsApiServer,
      request: (operation) => {
        const token = this.esgAuthStorage.getItem('jwt-token')
        operation.setContext({
          headers: {
            authorization: token ? `Bearer ${token}` : ''
          }
        })
      }
    })
  }

  resetStore() {
    this.client.resetStore()
  }
}

export default Events
