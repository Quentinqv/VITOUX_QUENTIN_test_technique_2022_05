class PhoneBills {
  constructor(content = {}) {
    this._content = content
    this._bills = []

    this._content.forEach(row => {
      const call = row.split(";")

      // Duration of the call
      let duration = PhoneBills.getTime(call[0], call[1])

      // Price of the call
      let amount = PhoneBills.getAmount(duration)

      // Month of the call
      let dateMonth = new Date(call[0])
      let month = `${dateMonth.getFullYear()}-${dateMonth.getMonth() + 1 < 10 ? '0' + (dateMonth.getMonth() + 1) : dateMonth.getMonth() + 1}`
      
      // Add the bill to the array
      let subscriber = this._bills.filter(bill => bill.subscriber === call[2])
      if (subscriber.length === 0) {
        this._bills.push({
          subscriber: call[2],
          amount: amount,
          month: month,
        })
      } else {
        subscriber[0].amount += amount
      }
    });

    this.rewardMostExpensiveBill()
  }

  /**
   * Returns the phone history
   */
  get content() {
    return this._content
  }

  /**
   * Returns the phone bills
   */
  get bills() {
    return this._bills
  }

  /**
   * Returns the most expensive bill
   */
  mostExpensiveBill(month) {
    let monthBills = this._bills.filter(bill => bill.month === month)

    return monthBills.reduce((prev, current) => {
      return prev.amount > current.amount ? prev : current
    })
  }

  /**
   * Rewards of the most expensive bill with 5€ on the total amount
   */
  rewardMostExpensiveBill() {
    let uniqueMonths = [...new Set( this._bills.map(obj => obj.month)) ]

    uniqueMonths.forEach(month => {
      // Find the most expensive bill index
      let meb = this.mostExpensiveBill(month)
      let indexMEB = this._bills.findIndex(bill => bill == meb)
  
      // Subscriber with the most expensive bill is rewarded with 5€ free call
      if (this._bills[indexMEB].amount - 5 < 0) {
        // If the subscriber with the most expensive bill has less than 5€, set the amount to 0
        this._bills[indexMEB].amount = 0
      } else {
        // If the subscriber with the most expensive bill has more than 5€, set the amount to the difference
        this._bills[indexMEB].amount = Math.round((this._bills[indexMEB].amount - 5) * 100) / 100
      }
    });
  }

  /**
   * Returns the duration of the call (In minutes)
   * @param {string} start String date start of the call. ISO 8601 format
   * @param {string} end String date end of the call. ISO 8601 format
   * @returns {integer} Duration of the call in minutes
   */
  static getTime(start, end) {
    start = new Date(start)
    end = new Date(end)
    let diff = end.getTime() - start.getTime()
    let time = Math.ceil((diff / 1000) / 60)
    return time
  }

  /**
   * Returns the price of the call
   * First 5 minutes costs 0.60 each, next minutes costs 0.30 each
   * @param {int} time Duration of the call in minutes
   * @returns {float} Price of the call
   */
  static getAmount(time) {
    if (time <= 5) {
      return time * 0.6
    } else {
      let num = 5 * 0.6 + (time - 5) * 0.3
      return Math.round(num * 100) / 100 // Round to 2 decimals
    }
  }
}

module.exports = PhoneBills