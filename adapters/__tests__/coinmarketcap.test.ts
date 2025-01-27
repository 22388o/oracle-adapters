
import nock from 'nock'
import coinmarketcap from '../src/coinmarketcap'
import BigNumber from 'bignumber.js'

describe('multi price fetch', () => {
  afterEach(() => {
    jest.clearAllMocks()
    nock.cleanAll()
  })

  it('should fetch price from defichain dex using config', async () => {
    nock('https://pro-api.coinmarketcap.com')
      .get('/v1/cryptocurrency/quotes/latest?symbol=BTC,ETH,DOGE&CMC_PRO_API_KEY=API_TOKEN')
      .reply(200, function (_) {
        return `{
          "status":{
             "timestamp":"2021-07-28T08:31:48.282Z",
             "error_code":0,
             "error_message":null,
             "elapsed":11,
             "credit_count":1,
             "notice":null
          },
          "data":{
             "BTC":{
                "id":1,
                "name":"Bitcoin",
                "symbol":"BTC",
                "slug":"bitcoin",
                "num_market_pairs":8974,
                "date_added":"2013-04-28T00:00:00.000Z",
                "tags":[
                   "mineable",
                   "pow",
                   "sha-256",
                   "store-of-value",
                   "state-channels",
                   "coinbase-ventures-portfolio",
                   "three-arrows-capital-portfolio",
                   "polychain-capital-portfolio",
                   "binance-labs-portfolio",
                   "arrington-xrp-capital",
                   "blockchain-capital-portfolio",
                   "boostvc-portfolio",
                   "cms-holdings-portfolio",
                   "dcg-portfolio",
                   "dragonfly-capital-portfolio",
                   "electric-capital-portfolio",
                   "fabric-ventures-portfolio",
                   "framework-ventures",
                   "galaxy-digital-portfolio",
                   "huobi-capital",
                   "alameda-research-portfolio",
                   "a16z-portfolio",
                   "1confirmation-portfolio",
                   "winklevoss-capital",
                   "usv-portfolio",
                   "placeholder-ventures-portfolio",
                   "pantera-capital-portfolio",
                   "multicoin-capital-portfolio",
                   "paradigm-xzy-screener"
                ],
                "max_supply":21000000,
                "circulating_supply":18769031,
                "total_supply":18769031,
                "is_active":1,
                "platform":null,
                "cmc_rank":1,
                "is_fiat":0,
                "last_updated":"2021-07-28T08:31:02.000Z",
                "quote":{
                   "USD":{
                      "price":39633.853292688436,
                      "volume_24h":37710676579.97187,
                      "percent_change_1h":-0.23588857,
                      "percent_change_24h":5.99841627,
                      "percent_change_7d":28.64080617,
                      "percent_change_30d":13.83469735,
                      "percent_change_60d":10.37540104,
                      "percent_change_90d":-26.45663113,
                      "market_cap":743889021099.9214,
                      "last_updated":"2021-07-28T08:31:02.000Z"
                   }
                }
             },
             "DOGE":{
                "id":74,
                "name":"Dogecoin",
                "symbol":"DOGE",
                "slug":"dogecoin",
                "num_market_pairs":371,
                "date_added":"2013-12-15T00:00:00.000Z",
                "tags":[
                   "mineable",
                   "pow",
                   "scrypt",
                   "medium-of-exchange",
                   "memes",
                   "payments",
                   "doggone-doggerel"
                ],
                "max_supply":null,
                "circulating_supply":130624233305.68314,
                "total_supply":130624233305.68314,
                "is_active":1,
                "platform":null,
                "cmc_rank":7,
                "is_fiat":0,
                "last_updated":"2021-07-28T08:31:03.000Z",
                "quote":{
                   "USD":{
                      "price":0.20917968613823,
                      "volume_24h":2280538128.5076814,
                      "percent_change_1h":1.9999761,
                      "percent_change_24h":3.91207181,
                      "percent_change_7d":17.79316141,
                      "percent_change_30d":-18.85458171,
                      "percent_change_60d":-32.169139,
                      "percent_change_90d":-32.17281662,
                      "market_cap":27323936124.929726,
                      "last_updated":"2021-07-28T08:31:03.000Z"
                   }
                }
             },
             "ETH":{
                "id":1027,
                "name":"Ethereum",
                "symbol":"ETH",
                "slug":"ethereum",
                "num_market_pairs":5627,
                "date_added":"2015-08-07T00:00:00.000Z",
                "tags":[
                   "mineable",
                   "pow",
                   "smart-contracts",
                   "ethereum",
                   "coinbase-ventures-portfolio",
                   "three-arrows-capital-portfolio",
                   "polychain-capital-portfolio",
                   "binance-labs-portfolio",
                   "arrington-xrp-capital",
                   "blockchain-capital-portfolio",
                   "boostvc-portfolio",
                   "cms-holdings-portfolio",
                   "dcg-portfolio",
                   "dragonfly-capital-portfolio",
                   "electric-capital-portfolio",
                   "fabric-ventures-portfolio",
                   "framework-ventures",
                   "hashkey-capital-portfolio",
                   "kinetic-capital",
                   "huobi-capital",
                   "alameda-research-portfolio",
                   "a16z-portfolio",
                   "1confirmation-portfolio",
                   "winklevoss-capital",
                   "usv-portfolio",
                   "placeholder-ventures-portfolio",
                   "pantera-capital-portfolio",
                   "multicoin-capital-portfolio",
                   "paradigm-xzy-screener"
                ],
                "max_supply":null,
                "circulating_supply":116872773.9365,
                "total_supply":116872773.9365,
                "is_active":1,
                "platform":null,
                "cmc_rank":2,
                "is_fiat":0,
                "last_updated":"2021-07-28T08:31:02.000Z",
                "quote":{
                   "USD":{
                      "price":2297.4646020723612,
                      "volume_24h":22086088225.256454,
                      "percent_change_1h":0.90552822,
                      "percent_change_24h":3.72585092,
                      "percent_change_7d":22.93531648,
                      "percent_change_30d":11.74267414,
                      "percent_change_60d":-6.62473684,
                      "percent_change_90d":-15.33379107,
                      "market_cap":268511061065.114,
                      "last_updated":"2021-07-28T08:31:02.000Z"
                   }
                }
             }
          }
       }`
      })

    const symbols = ['BTC', 'ETH', 'DOGE']
    const prices = await coinmarketcap(symbols, 'API_TOKEN')
    expect(prices).toStrictEqual([
      {
        token: 'BTC',
        amount: new BigNumber('39633.853292688436'),
        currency: 'USD',
        timestamp: new BigNumber('1627461062000')
      },
      {
        token: 'DOGE',
        amount: new BigNumber('0.20917968613823'),
        currency: 'USD',
        timestamp: new BigNumber('1627461063000')
      },
      {
        token: 'ETH',
        amount: new BigNumber('2297.4646020723612'),
        currency: 'USD',
        timestamp: new BigNumber('1627461062000')
      }
    ])
  })
})
