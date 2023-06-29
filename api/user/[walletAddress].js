// import fetch from 'node-fetch'
// import {VercelRequest, VercelResponse} from '@vercel/node'

const fetch = require('node-fetch')

const StatusCode = {
  FOUND: 200,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
}

const ErrorMessage = {
  FORBIDDEN: 'Invalid Token in Headers',
  NOT_REGISTERED: 'Wallet address not registered.',
}

async function getWalletAddressRiskInfo(req, res) {
  const {walletAddress} = req.query

  const response = await fetch(`https://api.chainalysis.com/api/risk/v2/entities/${walletAddress}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Token: `${process.env.REACT_APP_CHAINALYSIS_KEY}`,
    },
  })

  if (response.status === StatusCode.FOUND) {
    const json = await response.json()
    res.status(200).json(json)
  }

  if (response.status === StatusCode.NOT_FOUND) {
    res.status(200).json({error: ErrorMessage.NOT_REGISTERED})
  }

  if (response.status === StatusCode.FORBIDDEN) {
    res.status(200).json({error: ErrorMessage.FORBIDDEN})
  }
}

module.exports = getWalletAddressRiskInfo
