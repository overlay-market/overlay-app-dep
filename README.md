# Overlay Interface

The official Overlay v1 testnet is now live on Kovan network! 
 https://overlay-interface.vercel.app/

What has changed from the previous testnets?
We are “restarting” the testnet with updated contracts and new markets! This testnet deployment includes our updated v1-core contracts after completing several security/code audits. 

What this means:
Your prior trades won’t show up on the front end - however old trades are safu!

What should I do?
Go play with the testnet! Markets are live and ready to go. Adding in an additional market later today.

How do I get OVL tokens? 
Head over to https://ethdrop.dev/ to receive Kovan ETH. After receiving some ETH, you can swap for OVL on Uniswap (https://app.uniswap.org/#/swap?chain=kovan). When selecting the token to swap into, input OVL’s contract address (0x04020e4fF78b629D79CcBd163fc6044af73588DC). After swapping you’re ready to trade on Overlay! 

What markets are available on testnet? 
Currently we have the following markets: 
1. ETH/OVL 
2. ETH/DAI
3. DAI/OVL

How do I become an OVL Liquidity Provider? 
All (3) current markets have feeds created based on UniswapV3Pool contracts. All feeds are created based on the 0.05% fee tier. If you wish to act as an LP, please ensure you’re adding liquidity to the 0.05% fee tier. 

Currently, we only support the UniswapV3Factory feeds. Eventually we will support feeds from other platforms.

Kovan Testnet Contract Addresses: 
| Contract | Contract Address | Etherscan |
| --- | --- | --- |
| UniswapV3Factory | 0x1F98431c8aD98523631AE4a59f267346ea31F984 | https://kovan.etherscan.io/address/0x1F98431c8aD98523631AE4a59f267346ea31F984 |
| OverlayV1Factory | 0xc10e8E06b1b8DADB8E94120650414AFfedD17aF9 | https://kovan.etherscan.io/address/0xc10e8E06b1b8DADB8E94120650414AFfedD17aF9 |
| OverlayV1State | 0x06C76062730aD18aBdc3C9198b3EB283f7bb3627 | https://kovan.etherscan.io/address/0x06C76062730aD18aBdc3C9198b3EB283f7bb3627 |
| OverlayV1UniswapV3Factory | 0x7cAB53923401597AF8e89415aC42a8cb7071b877 | https://kovan.etherscan.io/address/0x7cAB53923401597AF8e89415aC42a8cb7071b877 |
| Kovan OVL | 0x04020e4fF78b629D79CcBd163fc6044af73588DC | https://kovan.etherscan.io/address/0x04020e4fF78b629D79CcBd163fc6044af73588DC |
| Kovan ETH | 0xd0A1E359811322d97991E03f863a0C30C2cF029C | https://kovan.etherscan.io/address/0xd0A1E359811322d97991E03f863a0C30C2cF029C |
| Kovan DAI | 0x4F96Fe3b7A6Cf9725f59d353F723c1bDb64CA6Aa | https://kovan.etherscan.io/address/0x4F96Fe3b7A6Cf9725f59d353F723c1bDb64CA6Aa |
| UniswapV3Pool (DAI/ETH, 0.05%) | 0x89007e48d47484245805679ab37114db117afab2 | https://kovan.etherscan.io/address/0x89007e48d47484245805679ab37114db117afab2 |
| UniswapV3Pool (OVL/ETH, 0.05%) | 0x01f2c984e3a2be4a5241792cb2945ce4a41fb2b9 | https://kovan.etherscan.io/address/0x01f2c984e3a2be4a5241792cb2945ce4a41fb2b9 |
| UniswapV3Pool (OVL/DAI, 0.05%) | 0x2bcaa1062d74bed2a548bea0ca462de86c38ffd3 | https://kovan.etherscan.io/address/0x2bcaa1062d74bed2a548bea0ca462de86c38ffd3 |
| OverlayV1UniswapV3Feed (ETH/OVL) | 0xBf7068678b49146862E8786af9111AE117Ef1207 | https://kovan.etherscan.io/address/0xBf7068678b49146862E8786af9111AE117Ef1207 |
| OverlayV1UniswapV3Feed (ETH/DAI) | 0x71E68CCeA79C577FFED8A76Bd13D826a87b7932b | https://kovan.etherscan.io/address/0x71E68CCeA79C577FFED8A76Bd13D826a87b7932b |
| OverlayV1UniswapV3Feed (OVL/DAI) | 0x2bcaa1062d74bed2a548bea0ca462de86c38ffd3 | https://kovan.etherscan.io/address/0x2bcaa1062d74bed2a548bea0ca462de86c38ffd3 |
| OverlayV1Market (ETH/OVL) | 0x7de9bec6702ec18955f822EdCc85c88EC9bD99f6 | https://kovan.etherscan.io/address/0x7de9bec6702ec18955f822EdCc85c88EC9bD99f6 |
| OverlayV1Market (ETH/DAI) | 0x988a8daA268a604b5260FCD1E521f87BE6d82fc4 | https://kovan.etherscan.io/address/0x988a8daA268a604b5260FCD1E521f87BE6d82fc4 |
| OverlayV1Market (OVL/DAI) | 0x4123E7CE71c30efF259d8Ef5F70D303CBFF921ff | https://kovan.etherscan.io/address/0x4123E7CE71c30efF259d8Ef5F70D303CBFF921ff |

Scripts:

To build project: `--npm run build`
<br/>
To spin up local instance: `--npm start`
