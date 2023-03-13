import { apiV2 } from 'src/boot/axios.js'
import { User } from 'src/models/User.js'
import { ProductList } from 'src/models/Product.js'
import { CartItemList } from 'src/models/CartItem.js'
import APIRepository from '../classes/APIRepository'
import { FavoredList } from 'src/models/Favored'

export default class UserAPI extends APIRepository {
  constructor() {
    super('user', apiV2, '/user', new User())
    this.APIAdresses = {
      base: '/user',
      favored: '/user/favored',
      purchasedProducts: '/user/products',
      bankAccounts: '/bank-accounts',
      mobileResend: '/mobile/resend',
      mobileVerify: '/mobile/verify',
      ordersById: (id) => '/user/' + id + '/orders',
      getOrders: '/orders',
      orderStatus: '/payment/status',
      formData: '/megaroute/getUserFormData',
      showUser: '/getUserFor3a',
      eventResult: '/eventresult',
      baseAdmin: '/admin/user',
      nationalCard: '/national-card-photo'
    }
    this.CacheList = {
      base: this.name + this.APIAdresses.base,
      purchasedProducts: this.name + this.APIAdresses.purchasedProducts,
      favored: this.name + this.APIAdresses.favored,
      mobileResend: this.name + this.APIAdresses.base,
      mobileVerify: this.name + this.APIAdresses.base,
      bankAccounts: this.name + this.APIAdresses.bankAccounts,
      ordersById: (id) => this.name + this.APIAdresses.ordersById(id),
      getOrders: this.name + this.APIAdresses.base,
      orderStatus: this.name + this.APIAdresses.base,
      formData: this.name + this.APIAdresses.base,
      showUser: this.name + this.APIAdresses.base,
      eventResult: this.name + this.APIAdresses.base,
      baseAdmin: this.name + this.APIAdresses.baseAdmin,
      nationalCard: this.name + this.APIAdresses.nationalCard
    }
    this.restUrl = (id) => this.APIAdresses.base + '/' + id
    /* Setting the callback functions for the CRUD operations. */
    this.setCrudCallbacks({
      get: (response) => { return new User(response.data.data) },
      post: (response) => { return new User(response.data.data) },
      put: (response) => { return new User(response.data.data) },
      delete: (response) => { return new User(response.data.data) }
    })
  }

  nationalCard(data) {
    return this.sendRequest({
      apiMethod: 'post',
      api: this.api,
      request: this.APIAdresses.nationalCard,
      cacheKey: this.CacheList.nationalCard,
      data,
      resolveCallback: (response) => {
        return response
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  storeBankAccounts (data = {}) {
    return this.sendRequest({
      apiMethod: 'post',
      api: this.api,
      request: this.APIAdresses.bankAccounts,
      cacheKey: this.CacheList.bankAccounts,
      data: this.getNormalizedSendData({
        preShabaNumber: 'IR', // String
        shabaNumber: '' // String
      }, data),
      resolveCallback: (response) => {
        return response
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  getBankAccounts () {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.bankAccounts,
      cacheKey: this.CacheList.bankAccounts,
      resolveCallback: (response) => {
        return response
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  mobileResend(data = {}) {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.mobileResend,
      cacheKey: this.CacheList.mobileResend,
      ...(data.cache && { cache: data.cache }),
      resolveCallback: (response) => {
        return {
          code: response
        }
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  mobileVerify(data) {
    return this.sendRequest({
      apiMethod: 'post',
      api: this.api,
      request: this.APIAdresses.mobileVerify,
      cacheKey: this.CacheList.mobileVerify,
      ...(data.cache && { cache: data.cache }),
      resolveCallback: (response) => {
        return {
          status: response
        }
      },
      rejectCallback: (error) => {
        return error
      },
      data: this.getNormalizedSendData({
        code: null // number - string
      }, data)
    })
  }

  ordersById(data = {}) {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.ordersById(data.data.userId),
      cacheKey: this.CacheList.ordersById(data.data.userId),
      ...(data.cache && { cache: data.cache }),
      resolveCallback: (response) => {
        return {
          cartItemList: new CartItemList(response.data.data)
        }
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  getOrders(data = {}) {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.getOrders,
      cacheKey: this.CacheList.getOrders,
      ...(data.cache && { cache: data.cache }),
      resolveCallback: (response) => {
        return response
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  orderStatus(data = {}) {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.orderStatus,
      cacheKey: this.CacheList.orderStatus,
      ...(data.cache && { cache: data.cache }),
      resolveCallback: (response) => {
        return response
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  formData(data = {}) {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.formData,
      cacheKey: this.CacheList.formData,
      ...(data.cache && { cache: data.cache }),
      resolveCallback: (response) => {
        return {
          genders: response.data.data.genders,
          grades: response.data.data.grades,
          majors: response.data.data.majors,
          provinces: response.data.data.provinces,
          cities: response.data.data.cities
        }
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  showUser(data = {}) {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.showUser,
      cacheKey: this.CacheList.showUser,
      ...(data.cache && { cache: data.cache }),
      resolveCallback: (response) => {
        return response
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  eventResult(data = {}) {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.eventResult,
      cacheKey: this.CacheList.eventResult,
      ...(data.cache && { cache: data.cache }),
      resolveCallback: (response) => {
        return response
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  adminIndex(data = {}) {
    const routeWithParams = function(defaultRoute, payload) {
      if (typeof payload.rollId === 'object') {
        const hasRoll = []
        payload.rollId.forEach(rollId => {
          hasRoll.push(rollId)
        })
        return defaultRoute.concat('?hasRole[]=', hasRoll)
      }
      return defaultRoute.concat('?hasRole[]=', payload.rollId)
    }
    const requestRoute = routeWithParams(this.APIAdresses.baseAdmin, {
      rollId: data.data.rollId // array or number
    })
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: requestRoute,
      cacheKey: this.CacheList.baseAdmin,
      ...(data.cache && { cache: data.cache }),
      // paramSerializer: '/?hasRoll[]=10',
      // params: this.getPayload({
      //   hasRoll: [] // array
      // }, data.data),
      resolveCallback: (response) => {
        return {
          list: response.data.data,
          links: response.data.links,
          meta: response.data.meta
        }
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  getPurchasedProducts (data = {}, cache = { TTL: 6000000 }) {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.purchasedProducts,
      cacheKey: this.CacheList.purchasedProducts,
      ...(cache !== undefined && { cache }),
      data: this.getNormalizedSendData({
        page: 1 // Number
      }, data),
      resolveCallback: (response) => {
        return {
          referralCodeList: new ProductList(response.data.data),
          paginate: response.data.meta
          // {
          //   current_page: 1,
          //   from: 1,
          //   last_page: 1,
          //   path: '...',
          //   per_page: 15,
          //   to: 10,
          //   total: 10
          // }
        }
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  getFavored (data = {}, cache) {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.favored,
      cacheKey: this.CacheList.favored + JSON.stringify(data),
      ...(cache !== undefined && { cache }),
      data: this.getNormalizedSendData({
        page: 1 // Number
      }, data),
      resolveCallback: (response) => {
        return {
          favoredList: new FavoredList(response.data.data),
          paginate: response.data.meta
          // {
          //   current_page: 1,
          //   from: 1,
          //   last_page: 1,
          //   path: '...',
          //   per_page: 15,
          //   to: 10,
          //   total: 10
          // }
        }
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }
}
