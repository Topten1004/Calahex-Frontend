import React from 'react'
import DataUpdater from './DataUpdater'

class datafeeds extends React.Component {
    constructor(self) {
        super(self)
        this.self = self
        this.barsUpdater = new DataUpdater(this)
        this.defaultConfiguration = this.defaultConfiguration.bind(this)
    }
    onReady(callback) {
        // console.log('=============onReady running')
        return new Promise((resolve) => {
            let configuration = this.defaultConfiguration()
            if (this.self.getConfig) {
                configuration = Object.assign(this.defaultConfiguration(), this.self.getConfig())
            }
            resolve(configuration)
        }).then(data => callback(data))
    }
    getBars(symbolInfo, resolution, rangeStartDate, rangeEndDate, onDataCallback) {
        const onLoadedCallback = (data) => {
            data && data.length ? onDataCallback(data, { noData: false }) : onDataCallback([], { noData: true })
        }
        this.self.getBars(symbolInfo, resolution, rangeStartDate, rangeEndDate, onLoadedCallback)

    }
    resolveSymbol(symbolName, onSymbolResolvedCallback, onResolveErrorCallback) {
        return new Promise((resolve) => {
            // reject
            let symbolInfoName
            if (this.self.symbolName) {
                symbolInfoName = this.self.symbolName
            }
            let symbolInfo = {
                name: symbolInfoName,
                ticker: symbolInfoName,
                pricescale: 10000,
            }
            const { points } = this.props.props
            const array = points.filter(item => item.name === symbolInfoName)
            if (array) {
                symbolInfo.pricescale = 10 ** array[0].pricePrecision
            }
            symbolInfo = Object.assign(this.defaultConfiguration(), symbolInfo)
            resolve(symbolInfo)
        }).then(data => onSymbolResolvedCallback(data)).catch(err => onResolveErrorCallback(err))
    }
    subscribeBars(symbolInfo, resolution, onRealtimeCallback, subscriberUID, onResetCacheNeededCallback) {
        this.barsUpdater.subscribeBars(symbolInfo, resolution, onRealtimeCallback, subscriberUID, onResetCacheNeededCallback)
    }
    unsubscribeBars(subscriberUID) {
        this.barsUpdater.unsubscribeBars(subscriberUID)
    }
    defaultConfiguration = () => {
        const object = {
            session: '24x7',
            timezone: 'Asia/Shanghai',
            minmov: 1,
            minmov2: 0,
            description: 'www.coinoak.com',
            pointvalue: 1,
            volume_precision: 4,
            hide_side_toolbar: false,
            fractional: false,
            supports_search: false,
            supports_group_request: false,
            supported_resolutions: ['1', '15', '60', '1D'],
            supports_marks: false,
            supports_timescale_marks: false,
            supports_time: true,
            has_intraday: true,
            intraday_multipliers: ['1', '15', '60', '1D'],
        }
        return object
    }
}

export default datafeeds