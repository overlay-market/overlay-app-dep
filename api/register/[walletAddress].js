const fetch = require('node-fetch')

const StatusCode = {
  CREATED: 201,
}

const RegisterResponseMessage = {
  CREATED: 'Address register successful',
}

async function registerWalletAddressToChainalysis(req, res) {
  const {walletAddress} = req.query

  const bodyObject = {
    address: walletAddress,
  }

  const response = await fetch('https://api.chainalysis.com/api/risk/v2/entities/', {
    method: 'POST',
    body: JSON.stringify(bodyObject),
    headers: {
      Accept: 'application/json',
      Token: `${process.env.REACT_APP_CHAINALYSIS_KEY}`,
    },
  })

  if (response.status === StatusCode.CREATED) {
    res.status(200).json({message: RegisterResponseMessage.CREATED})
  }
}

module.exports = registerWalletAddressToChainalysis
