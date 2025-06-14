# CREDIT SWAP

## Roles

- Capital Holder [CH]
- Trust DAO [TD]
- Proxy Buyer [PB]
- Asset [A] (could be house, stock, any asset purchased by PB on behalf of CH/TD)

## User journey

🟩 1. Capital Holder
- Create Request: for property X, stating desired loan/payback structure.
- View Proposals: compare rates, loan offers, candidate reputations.
- Accept Proposal: from Proxy Buyer.
- Monitor Fulfillment: track proof uploads from I (loan accepted, payments made).
- Approve Completion: release final fee + ownership transfer to Trust DAO.

🟦 2. Proxy Buyer
- Browse Requests: see open requests posted by AHs.
- Submit Proposal: offer loan terms, repayment schedule.
- Fulfill Proposal: upload required proof docs (loan initiation, monthly payments).
- Receive Payment: from Trust DAO paying off "private loan" over time
- Note: When pay off of private loan complete, Asset ownership transfered to Trust DAO automatically

🟨 3. Trust DAO
Facilitates legal control: executes ownership transfer if required.
Signs documents, holds yield-producing collateral.
Validates proposal completions.
Earns a cut when proposals are completed.

## Functions

Core:

- Create Request [CH]
  - Either 'one-time-off' or recurring fulfillments
  - Deposits collateral either for direct payment to [PB] or collateral which will generate yield to repay [PB]
- Make Request Proposal [PB]
  - Provide competitive offer compared to other proposals
- Accept Proposal [CH]
  - Choose proposal from all that were made
- Fulfill Proposal [PB]
  - submitting proof, either initial one like acceptance of a loan or sequential proof e.g. completed monthly repayment of a loan (during month X / Y)
- Finish Proposal [TD]
  - If partial:
    - Gives partial payment from [CH] vault's yield or underlying assets to [PB]
  - If fully finished:
    - Gives collateral back to [AH]
    - Pays finished fee to [PB] and [TD] after confirmation from [CH]
    - Legal ownership of asset is taken away from [PB] to [TD] if it's illiquid asset like a house and wasn't already shipped to [CH]

Extended:

- Dispute [AH/PB/TD]
- Resolve Dispute [TD governance]
- Renegotiate [AH/PB]
- Manage Assets [TD]