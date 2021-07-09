import { rawObject, AppModel } from './_utils'

export default class AppModelFormPost extends AppModel {
  static createFromRaw (raw) {
    const {
      name = '',
      phone = '',
      email = ''
    } = rawObject(raw)

    return Object.assign(new AppModelFormPost(), {
      name,
      email,
      phone
    })
  }
}
