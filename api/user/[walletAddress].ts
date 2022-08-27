import fetch from 'node-fetch'
import {VercelRequest, VercelResponse} from '@vercel/node'

enum StatusCode {
  FORBIDDEN = 403,
  NOT_FOUND = 404,
}

enum ErrorMessage {
  NOT_REGISTERED = 'Wallet address not registered.',
}

export default async function getWalletAddressRiskInfo(req: VercelRequest, res: VercelResponse) {
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

  if (response.status === StatusCode.NOT_FOUND) {
    res.status(200).json({error: ErrorMessage.NOT_REGISTERED})
  }
  // if (response.status !== 200) {
  //   console.log(`Non-200 response code from Chainalysis: ${response.status}`)
  //   console.log(process.env.REACT_APP_CHAINALYSIS_KEY_TEST)
  //   return response
  // }
}
