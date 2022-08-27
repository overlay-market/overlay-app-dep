import fetch from 'node-fetch'

export default async function getWalletAddressRiskInfo(req: any, res: any) {
  const {walletAddress} = req.query

  const response = await fetch(
    `https://api.chainalysis.com/api/risk/v2/entities/${walletAddress}`,
    {
      headers: {
        Accept: 'application/json',
        Token: `${process.env.REACT_APP_CHAINALYSIS_KEY_TEST}`,
      },
    },
  )

  console.log(await response.text())

  // if (response.status !== 200) {
  //   console.log(`Non-200 response code from Chainalysis: ${response.status}`)
  //   console.log(process.env.REACT_APP_CHAINALYSIS_KEY_TEST)
  //   return response
  // }
}
