import SignupEnterDevicename from './device-name/container'
import SignupEnterEmail from './email/container'
import SignupEnterUsername from './username/container'
import SignupEnterPhoneNumber from './phone-number/container'
import SignupVerifyPhoneNumber from './phone-number/verify-container'

export const newRoutes = {
  signupEnterDevicename: {
    getScreen: (): typeof SignupEnterDevicename => require('./device-name/container').default,
    upgraded: true,
  },
  signupEnterEmail: {
    getScreen: (): typeof SignupEnterEmail => require('./email/container').default,
    upgraded: true,
  },
  signupEnterUsername: {
    getScreen: (): typeof SignupEnterUsername => require('./username/container').default,
    upgraded: true,
  },
}

// Some screens in signup show up after we've actually signed up
export const newModalRoutes = {
  signupEnterPhoneNumber: {
    getScreen: (): typeof SignupEnterPhoneNumber => require('./phone-number/container').default,
    upgraded: true,
  },
  signupVerifyPhoneNumber: {
    getScreen: (): typeof SignupVerifyPhoneNumber => require('./phone-number/verify-container').default,
    upgraded: true,
  },
}
