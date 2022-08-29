import fetch from 'node-fetch'
import {VercelRequest, VercelResponse} from '@vercel/node'

enum StatusCode {
  CREATED = 201,
}

enum RegisterResponseMessage {
  CREATED = 'Address register successful',
}

export default async function registerWalletAddressToChainalysis(
  req: VercelRequest,
  res: VercelResponse,
) {
  const {walletAddress} = req.query

  const bodyObject = {
    address: walletAddress,
  }

  const response = await fetch('https://api.chainalysis.com/api/risk/v2/entities/', {
    method: 'POST',
    body: JSON.stringify(bodyObject),
    headers: {
      Accept: 'application/json',
      Token: `${process.env.REACT_APP_CHAINALYSIS_KEY_TEST}`,
    },
  })

  if (response.status === StatusCode.CREATED) {
    res.status(200).json({message: RegisterResponseMessage.CREATED})
  }
}
