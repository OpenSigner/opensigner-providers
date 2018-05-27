var web3 = window['web3']
var Provider = window['web3-provider']
var erc20ABI = [
  {
    constant: true,
    inputs: [],
    name: 'name',
    outputs: [
      {
        name: '',
        type: 'string'
      }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: true,
    inputs: [],
    name: 'totalSupply',
    outputs: [
      {
        name: '',
        type: 'uint256'
      }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: true,
    inputs: [],
    name: 'decimals',
    outputs: [
      {
        name: '',
        type: 'uint8'
      }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: true,
    inputs: [],
    name: 'symbol',
    outputs: [
      {
        name: '',
        type: 'string'
      }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        name: '_from',
        type: 'address'
      },
      {
        indexed: true,
        name: '_to',
        type: 'address'
      },
      {
        indexed: false,
        name: '_value',
        type: 'uint256'
      },
      {
        indexed: false,
        name: '_data',
        type: 'bytes'
      }
    ],
    name: 'Transfer',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        name: '_owner',
        type: 'address'
      },
      {
        indexed: true,
        name: '_spender',
        type: 'address'
      },
      {
        indexed: false,
        name: '_value',
        type: 'uint256'
      }
    ],
    name: 'Approval',
    type: 'event'
  },
  {
    constant: true,
    inputs: [
      {
        name: '_owner',
        type: 'address'
      }
    ],
    name: 'balanceOf',
    outputs: [
      {
        name: 'balance',
        type: 'uint256'
      }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: false,
    inputs: [
      {
        name: '_to',
        type: 'address'
      },
      {
        name: '_value',
        type: 'uint256'
      }
    ],
    name: 'transfer',
    outputs: [
      {
        name: 'success',
        type: 'bool'
      }
    ],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: false,
    inputs: [
      {
        name: '_to',
        type: 'address'
      },
      {
        name: '_value',
        type: 'uint256'
      },
      {
        name: '_data',
        type: 'bytes'
      }
    ],
    name: 'transfer',
    outputs: [
      {
        name: 'success',
        type: 'bool'
      }
    ],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: false,
    inputs: [
      {
        name: '_from',
        type: 'address'
      },
      {
        name: '_to',
        type: 'address'
      },
      {
        name: '_value',
        type: 'uint256'
      }
    ],
    name: 'transferFrom',
    outputs: [
      {
        name: 'success',
        type: 'bool'
      }
    ],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: false,
    inputs: [
      {
        name: '_spender',
        type: 'address'
      },
      {
        name: '_value',
        type: 'uint256'
      }
    ],
    name: 'approve',
    outputs: [
      {
        name: 'success',
        type: 'bool'
      }
    ],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: true,
    inputs: [
      {
        name: '_owner',
        type: 'address'
      },
      {
        name: '_spender',
        type: 'address'
      }
    ],
    name: 'allowance',
    outputs: [
      {
        name: 'remaining',
        type: 'uint256'
      }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  }
]

function getLoginTypedData(address) {
  return [
    {
      type: 'string',
      name: 'App',
      value: 'matic:wallet'
    },
    {
      type: 'string',
      name: 'Reason',
      value: 'login'
    },
    {
      type: 'address',
      name: 'Address',
      value: address
    }
  ]
}

var web3 = new Web3(
  new Provider({
    host: 'https://kovan.infura.io'
  })
)
var contract = new web3.eth.Contract(
  erc20ABI,
  '0x31ea8795EE32D782C8ff41a5C68Dcbf0F5B27f6d'
)

function signTx() {
  web3.eth
    .getAccounts()
    .then(data => {
      var account = data
      var params = [account, getLoginTypedData(account)]
      var method = 'eth_signTypedData'
      return new Promise((resolve, reject) => {
        web3.currentProvider.sendAsync(
          {
            method: method,
            params: params,
            address: account
          },
          (err, result) => {
            var e = err || (result && result.error)
            if (e) {
              reject(e)
            } else {
              resolve(result)
            }
          }
        )
      })
    })
    .then(result => {
      console.log(result)
    })
    .catch(e => {
      console.log('Wallet connect error', e)
    })
}

function sendTx() {
  web3.eth
    .getAccounts()
    .then(data => {
      var account = data
      return new Promise((resolve, reject) => {
        web3.eth.sendTransaction(
          {
            from: data[0],
            to: '0x80fAa2B517B84A5aec1078D3600eab4c0b3AFf56',
            gasPrice: 1,
            nonce: 100,
            gas: 50000,
            value: 0,
            dsl: {
              type: 'erc20',
              symbol: 'MANA',
              decimals: 18,
              amount: web3.utils.toWei('250000'),
              max: 5,
              time: '30 minutes'
            }
          },
          (err, result) => {
            if (err) {
              reject(err)
            } else {
              resolve(result)
            }
          }
        )
      })
    })
    .then(result => {
      console.log(result)
    })
    .catch(e => {
      console.log('Wallet connect error', e)
    })
}

sendTx()
