import { APIGateway } from 'src/api/APIGateway.js'

class Ewano {
  static login (uuid) {
    // send uuid to back and get new token
    // est new token and call onWebAppReady method
    return APIGateway.ewano.login(uuid)
  }

  static onWebAppReady () {
    return window.ewano.onWebAppReady()
  }

  // callbackUrl must start with '/'
  static pay (amount, orderId, callbackUrl = '') {
    return window.ewano.pay(amount, orderId, callbackUrl)
  }

  static paymentResult (resultCallback) {
    window.ewano.paymentResult = (status) => { // status: Boolean
      console.log('Ewano paymentResult status', status)
      resultCallback(status)
    }
    return window.ewano.paymentResult
  }

  // return IOS, ANDROID, WEB, null
  static getPlatform () {
    return window.ewano.getPlatform()
  }
}

export default Ewano