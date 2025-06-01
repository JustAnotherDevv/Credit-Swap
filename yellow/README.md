# Scaffold Nitrolite

A devtooling to kickstart your nitrolite project using minimal setup

## Features

- Full setup of websocket connection to Clearnode
- Nitrolite server RPC and onchain integration setup
- Boilerplate for routes to connect with client
- Client connection to the server

**ToDo**

- Auction Bidding example:
  - Asset Holder creates auction in the smart contract with the specific requirements, date, price ranges and metadata
  - Individuals wanting to participate register in the smart contract and open channel, deposit initial amount of USDC
  - At the time of auction start individuals and asset holder open new session, then the bidding/negotiation process starts
  - Once negotiations were completed, amopunt of tokens agreed upon both parties goes to the smart contract vault and the rest is returned to the original users, the sessions are closed for users

## Setup

### Server

- `cd server`
- `npm i`
- fill out `.env` with vars

```
WS_URL=wss://clearnet.yellow.com/ws
SERVER_PRIVATE_KEY=
CHAIN_ID=137
POLYGON_RPC_URL=https://polygon-rpc.com
PORT=8080
```

- `node index.js`

### Client

- `cd client`
- `npm i`
- `npm run dev`
