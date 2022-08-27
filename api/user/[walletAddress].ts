import fetch from 'node-fetch'
import {VercelRequest, VercelResponse} from '@vercel/node'

enum StatusCode {
  FOUND = 200,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
}

enum ErrorMessage {
  FORBIDDEN = 'Invalid Token in Headers',
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

  if (response.status === StatusCode.FOUND) {
    const json = await response.json()
    const {risk} = json
    res.status(200).json({risk: risk})
  }

  if (response.status === StatusCode.NOT_FOUND) {
    res.status(200).json({error: ErrorMessage.NOT_REGISTERED})
  }

  if (response.status === StatusCode.FORBIDDEN) {
    res.status(200).json({error: ErrorMessage.FORBIDDEN})
  }
}
