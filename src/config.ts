const configClass = class {
  readonly siteName = 'TwinkleOps.com'
  readonly customIdPrefix = 'c22f0135_'
  readonly maxRandomTime = 2 // Minutes
  readonly minRandomTime = 4 // Seconds
  readonly baseURL = 'https://twinkleops.com/'
  constructor() {}
}

export default new configClass()
