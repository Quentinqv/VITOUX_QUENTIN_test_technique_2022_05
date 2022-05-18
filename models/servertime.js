class Servertime {
  constructor(when = "now") {
    switch (when) {
      case "now":
        // Get the current time
        this._serverTime = {
          return: {
            value: new Date().toISOString(),
          },
          code: 200,
        }
        break
      case "tomorrow":
        // Add one day to the current date
        this._serverTime = {
          return: {
            value: new Date(new Date().getTime() + 86400000).toISOString(), // 24h * 60m * 60s * 1000ms
          },
          code: 200,
        }
        break
      case "yesterday":
        // Subtract one day from the current date
        this._serverTime = {
          return: {
            value: new Date(new Date().getTime() - 86400000).toISOString(), // 24h * 60m * 60s * 1000ms
          },
          code: 200,
        }
        break
      default:
        // If the user has not specified a time, return a 400 error
        this._serverTime = {
          return: {
            error: "Unknown parameter",
          },
          code: 400,
        }
        break
    }
  }

  /**
   * Returns the server time
   */
  get getServerTime() {
    return this._serverTime
  }
}

module.exports = Servertime
