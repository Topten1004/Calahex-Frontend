class DataUpdater {
  constructor(datafeeds) {
      this.subscribers = {}
      this.requestsPending = 0
      this.historyProvider = datafeeds
  }
  subscribeBars(symbolInfonwq, resolutionInfo, newDataCallback, listenerGuid) {
      this.subscribers[listenerGuid] = {
          lastBarTime: null,
          listener: newDataCallback,
          resolution: resolutionInfo,
          symbolInfo: symbolInfonwq
      }
  }
  unsubscribeBars(listenerGuid) {
      delete this.subscribers[listenerGuid]
  }
  updateData() {
      if (this.requestsPending) return
      this.requestsPending = 0
      for (let listenerGuid in this.subscribers) {
          this.requestsPending++
          this.updateDataForSubscriber(listenerGuid).then(() => this.requestsPending--).catch(() => this.requestsPending--)
      }
  }
  updateDataForSubscriber(listenerGuid) {
      return new Promise(function (resolve, reject) {
        var subscriptionRecord = this.subscribers[listenerGuid];
        var rangeEndTime = parseInt((Date.now() / 1000).toString());
        var rangeStartTime = rangeEndTime - this.periodLengthSeconds(subscriptionRecord.resolution, 10);
        this.historyProvider.getBars(subscriptionRecord.symbolInfo, subscriptionRecord.resolution, rangeStartTime, rangeEndTime, function (bars) {
          this.onSubscriberDataReceived(listenerGuid, bars);
          resolve();
        }, function () {
          reject();
        });
      });
  }
  onSubscriberDataReceived(listenerGuid, bars) {
      if (!this.subscribers.hasOwnProperty(listenerGuid)) return
      if (!bars.length) return
      const lastBar = bars[bars.length - 1]
      const subscriptionRecord = this.subscribers[listenerGuid]
      if (subscriptionRecord.lastBarTime !== null && lastBar.time < subscriptionRecord.lastBarTime) return
      const isNewBar = subscriptionRecord.lastBarTime !== null && lastBar.time > subscriptionRecord.lastBarTime
      if (isNewBar) {
          if (bars.length < 2) {
              throw new Error('Not enough bars in history for proper pulse update. Need at least 2.');
          }
          const previousBar = bars[bars.length - 2]
          subscriptionRecord.listener(previousBar)
      }
      subscriptionRecord.lastBarTime = lastBar.time
      console.log(lastBar)
      subscriptionRecord.listener(lastBar)
  }
  periodLengthSeconds =(resolution, requiredPeriodsCount) => {
      let daysCount = 0
      if (resolution === 'D' || resolution === '1D') {
          daysCount = requiredPeriodsCount
      } else if (resolution === 'M' || resolution === '1M') {
          daysCount = 31 * requiredPeriodsCount
      } else if (resolution === 'W' || resolution === '1W') {
          daysCount = 7 * requiredPeriodsCount
      } else {
          daysCount = requiredPeriodsCount * parseInt(resolution) / (24 * 60)
      }
      return daysCount * 24 * 60 * 60
  }
}
export default DataUpdater