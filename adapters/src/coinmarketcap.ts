import { AssetPrice, newAssetPrice, fetchAsJson, FetchResponse } from '@defichain/salmon-fetch'
import BigNumber from 'bignumber.js'
const COINMARKETCAP_URL = 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest'

export default async function (symbols: string[], apiToken: string): Promise<AssetPrice[]> {
  const fetchPath = `${COINMARKETCAP_URL}?symbol=${symbols.join(',')}&CMC_PRO_API_KEY=${apiToken}`
  const res: FetchResponse = await fetchAsJson(fetchPath, {
    method: 'GET'
  })
  const json = res.data.data
  return Object.keys(json).map((asset: any) => {
    const data = json[asset]
    return newAssetPrice(
      asset,
      new BigNumber(data.quote.USD.price),
      'USD',
      new BigNumber(Date.parse(data.last_updated))
    )
  })
}
