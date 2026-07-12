import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

const posts: Record<string, {
  title: string;
  date: string;
  readTime: string;
  category: string;
  content: string;
}> = {
  'dtcc-stellar-tokenized-securities': {
    title: 'DTCC and Stellar: What Tokenized Securities on a Public Blockchain Could Mean',
    date: '2026-07-11',
    readTime: '15 min read',
    category: 'Industry Insights',
    content: `
The Depository Trust & Clearing Corporation (DTCC) announced in May 2026 that its subsidiary, the Depository Trust Company (DTC), expects to make DTC-tokenized assets available on the Stellar network in the first half of 2027. The announcement named Russell 1000 stocks, ETFs, and U.S. Treasuries as potential asset classes. If this moves forward as described, it would represent the largest connection between traditional post-trade infrastructure and a public blockchain to date.

This article examines what the announcement means, what DTCC and DTC actually do, how tokenized securities might work on Stellar, and what risks and unknowns remain.

## Key Takeaways

- DTCC processes virtually all U.S. securities transactions. Its subsidiary DTC holds over $100 trillion in assets under custody.
- DTC-tokenized assets are expected to become available on Stellar in the first half of 2027, covering Russell 1000 stocks, ETFs, and U.S. Treasuries.
- This is an announced plan with a stated timeline, not yet a production deployment. The distinction matters.
- Stellar's compliance-native architecture, deterministic finality, and low fees make it suitable for regulated asset settlement.
- Increased Stellar network usage from tokenized securities does not automatically translate into a specific XLM price.

## What DTCC and DTC Do

If you work outside traditional finance, the scale of DTCC may not be obvious.

DTCC is the holding company for several subsidiaries that form the backbone of U.S. capital markets:

| Entity | Role | Scale |
|--------|------|-------|
| DTC (Depository Trust Company) | Central securities depository | Holds custody of nearly all U.S. equities and bonds |
| NSCC (National Securities Clearing Corp.) | Clearing for equities | Clears virtually all U.S. stock trades |
| FICC (Fixed Income Clearing Corp.) | Clearing for fixed income | Clears U.S. government securities |
| DTCC (parent) | Post-trade services | Processed $4.7 quadrillion in securities transactions in 2025 |

When a stock trade executes on the NYSE or NASDAQ, DTCC's subsidiaries handle what happens next: confirming the trade, netting obligations, transferring ownership, and settling the transaction. DTC specifically acts as the central depository, holding securities in "street name" on behalf of brokers and institutions.

## What Was Announced vs. What Exists Today

The distinction between an announced plan and a production deployment is important.

**Confirmed (May 2026 announcement):**
- DTC-tokenized assets are expected to be available on Stellar in 1H 2027
- Potential asset classes include Russell 1000 stocks, ETFs, and U.S. Treasuries
- DTC will issue tokens representing custody positions it already holds
- Stellar was named as the settlement layer

**Not yet confirmed:**
- Specific regulatory approvals for on-chain settlement
- Which broker-dealers or institutions will participate at launch
- Exact asset classes available at launch vs. those added later
- Whether trading will occur on-chain or only settlement
- Fee structure for tokenized asset operations

**DTCC's blockchain history:**
- DTCC has explored blockchain technology since at least 2016
- Project Ion (2022): Bilateral equity settlement on R3 Corda, processing 100,000+ transactions per day in parallel production
- October 2023: DTCC acquired Securrency, a Stellar ecosystem company, for approximately $50 million. The Securrency team had co-authored CAP-35 (clawback functionality) with SDF developers.
- December 2025: SEC issued a no-action letter granting DTC a 3-year tokenization pilot authorization
- May 2026: DTCC convened 50+ firms including JPMorgan, Goldman Sachs, BlackRock, and Kraken for the tokenization service
- The Stellar announcement represents DTCC's first use of a public blockchain, moving beyond private and permissioned ledgers

## How Tokenized Securities Could Work on Stellar

Tokenized securities on Stellar would likely use the network's native asset model rather than Soroban smart contracts for core functionality. Stellar's asset system has built-in features that regulated securities require:

### Authorization Controls

\`\`\`
AUTH_REQUIRED     - Only approved accounts can hold the asset
AUTH_REVOCABLE    - Issuer can freeze an account's holdings
AUTH_CLAWBACK     - Issuer can recover tokens (for court orders or errors)
\`\`\`

These are protocol-level controls enforced by every Stellar validator, not smart contract logic that could contain bugs or be circumvented.

### Representation

A DTC-tokenized security on Stellar would likely be a Stellar asset where:

- The **asset code** identifies the security (e.g., a ticker or proprietary identifier)
- The **issuing account** is controlled by DTC or an authorized entity
- **Authorization flags** restrict who can hold and trade the asset
- The **home domain** of the issuing account links to DTC's verifiable identity

### Settlement

Stellar's consensus mechanism produces final, irreversible transactions within 5 seconds. Unlike proof-of-work or proof-of-stake chains with probabilistic finality, there are no chain reorganizations. A settled trade is settled.

For securities, this enables T+0 settlement, where ownership transfers happen on the same day as the trade rather than the current T+1 standard that took effect in 2024.

### Corporate Actions

Dividends, stock splits, and other corporate actions can be executed through Stellar operations:

- **Dividends**: Payment operations distributed to all token holders
- **Stock splits**: Issuer creates additional tokens proportionally
- **Proxy voting**: Could use Stellar data operations or Soroban contracts

## Why Stellar for Securities Settlement

Several Stellar properties align with what institutional securities infrastructure requires:

**1. Deterministic finality.** Securities settlement requires certainty. Stellar transactions are final within 5 seconds with no possibility of reversal through chain reorganization.

**2. Low, predictable fees.** The base fee is 100 stroops (0.00001 XLM). At current prices, settling a million transactions costs approximately $1.60. High-volume settlement needs predictable economics.

**3. Compliance architecture.** Authorization flags, clawback capabilities, and issuer controls are built into the protocol, not bolted on through smart contracts.

**4. Regulatory positioning.** XLM has been treated as a commodity, not a security, by U.S. regulators. Using a network whose native token might be classified as a security would create legal complications for institutional participants.

**5. Existing institutional presence.** Stellar already hosts regulated financial products:

- Franklin Templeton's BENJI fund (on Stellar since 2021)
- USDC with over 2 million holders
- $2B+ in tokenized real-world assets as of Q1 2026

## The Role of Different Participants

Tokenized securities involve more participants than typical token issuance:

| Participant | Role |
|-------------|------|
| DTC | Issues tokens representing custody positions |
| Transfer agents | Manage shareholder records |
| Broker-dealers | Execute trades on behalf of clients |
| Custodians | Hold assets for institutional investors |
| Exchanges | Provide trading venues |
| Regulators | SEC, FINRA oversight |

Each participant needs to interact with the Stellar network through compliant interfaces. This is not a permissionless DeFi scenario. Every account holding a tokenized security would need authorization from the issuer.

## What This Could Mean for Stellar Network Adoption

If DTCC brings even a fraction of its activity to Stellar, the network effects would be significant:

**Transaction volume**: U.S. equity markets execute billions of dollars in trades daily. Even a small percentage settling on Stellar would increase network transaction volume substantially.

**Account growth**: Each institution, broker, and authorized investor holding tokenized securities would need a Stellar account with XLM reserves and trustlines.

**Ecosystem development**: Demand for infrastructure, including API providers, analytics tools, and compliance monitoring, would grow proportionally.

**XLM utility**: Every transaction requires XLM for fees. Every account requires XLM for base reserves. Every trustline requires additional reserves. This creates organic demand for the native asset tied to actual network usage.

However, network usage does not automatically translate into a specific XLM price. The relationship between utility demand and market price is influenced by many factors including supply dynamics, market sentiment, macroeconomic conditions, and speculative activity.

## Risks and Remaining Unknowns

### Regulatory Uncertainty

Securities settlement on a public blockchain raises questions that regulators have not fully addressed:

- How do existing SEC rules apply to on-chain settlement?
- What happens if a validator goes offline during a high-volume settlement period?
- How are cross-border securities transactions handled when different jurisdictions have different rules?
- What reporting obligations apply to on-chain settlement vs. traditional settlement?

### Technical Challenges

- **Throughput**: Stellar currently processes approximately 200 transactions per second. Institutional settlement volumes may require the planned 5,000 TPS upgrade.
- **Key management**: Institutional custody of blockchain private keys requires different security infrastructure than traditional securities custody.
- **Interoperability**: Tokenized securities on Stellar need to interact with existing market infrastructure that does not use blockchain.

### Execution Risk

Announced plans do not always become production deployments. DTCC has explored blockchain technology for a decade. Previous projects like Project Ion operated on permissioned infrastructure. The shift to a public blockchain is a larger step, and timelines could shift.

## What Developers Should Watch

If you are building applications that interact with the Stellar network, the DTCC integration creates new use cases:

- **Asset discovery**: Monitoring new DTC-issued assets on the network
- **Compliance tooling**: Applications that verify authorization status before transactions
- **Analytics**: Tracking settlement volumes, holder distribution, and trading patterns
- **Portfolio management**: Aggregating traditional securities alongside crypto-native assets

LumenQuery's [Analytics Dashboard](/analytics) and [Transaction Monitoring](/stellar-transaction-monitoring) are designed for tracking exactly these types of on-chain activities.

## Timeline of Confirmed Milestones

| Date | Event |
|------|-------|
| 2016+ | DTCC begins exploring distributed ledger technology |
| 2022 | Project Ion tests bilateral settlement on DLT |
| May 2026 | DTCC announces DTC-tokenized assets expected on Stellar in 1H 2027 |
| Q3-Q4 2026 | Expected testnet integration and developer previews |
| 1H 2027 | Targeted general availability of DTC-tokenized assets on Stellar |

## Sources and Further Reading

- DTCC official announcements on digital securities management
- Stellar Development Foundation ecosystem updates
- SEC guidance on digital asset securities
- DTCC Project Ion documentation

---

*Track institutional asset activity on Stellar as it develops. [LumenQuery](/auth/signup) provides managed Horizon API and Soroban RPC with analytics, monitoring, and compliance tools built for institutional-grade blockchain data. Start free.*

## Related Resources

- [Stellar Blockchain Analytics API](/stellar-blockchain-analytics-api) — Track tokenized asset issuance, holder distribution, and transfer volume
- [Stellar Transaction Monitoring](/stellar-transaction-monitoring) — Monitor settlement activity and compliance events in real time
- [Stellar API Provider Comparison](/stellar-api-provider-comparison) — Compare infrastructure options for institutional Stellar applications
    `,
  },
  'stellar-rwa-stablecoin-growth': {
    title: "Stellar's Real-World Asset and Stablecoin Growth: The Metrics That Matter",
    date: '2026-07-11',
    readTime: '14 min read',
    category: 'Industry Insights',
    content: `
Stellar surpassed $3.3 billion in tokenized real-world assets (RWAs) as of July 2026, up from $290 million just 18 months earlier. Stablecoin payment volume hit an all-time quarterly high of $5.5 billion in Q1 2026, up 72% year over year. MoneyGram launched its own stablecoin on Stellar. These numbers are often cited in headlines, but what do they actually represent, and how should they be interpreted?

This article examines the current state of real-world assets and stablecoins on Stellar, explains what the key metrics mean, identifies the important ecosystem participants, and describes what to monitor over the next 12 to 24 months.

## Key Takeaways

- Stellar hosts over $3.3 billion in tokenized real-world assets as of July 2026, up from $290 million in December 2024.
- USDC is the dominant stablecoin on Stellar. MoneyGram launched its own stablecoin (MGUSD) on Stellar in June 2026.
- Stablecoin payment volume hit $5.5 billion in Q1 2026, an all-time quarterly record, up 72% year over year.
- The difference between asset value, transfer volume, transaction count, and active users matters. Each tells a different part of the story.
- Soroban smart contracts are expanding Stellar's asset capabilities, with DeFi TVL crossing $200 million for the first time in 2026.

## What Real-World Asset Tokenization Means

Real-world asset tokenization is the process of creating blockchain-based tokens that represent ownership or rights in assets that exist outside the blockchain. On Stellar, this includes:

- **Government securities**: Franklin Templeton's OnChain U.S. Government Money Fund (FOBXX/BENJI), which has been live on Stellar since 2021
- **Stablecoins**: USDC (Circle), EURC (Circle), and other fiat-pegged tokens
- **Tokenized funds**: Institutional investment products represented as Stellar assets
- **Payment instruments**: Anchored fiat currencies used for cross-border transfers

The $3.3 billion figure includes the aggregate value of all tokenized assets on the Stellar network. The largest contributors are Spiko's tokenized sovereign debt products (over $1 billion), Franklin Templeton's BENJI fund ($654 million on Stellar), Ondo Finance's USDY yield token ($529 million on Stellar), and VuMe Bond 2030 corporate credit ($500 million).

## Current Verified Metrics

The following metrics are based on publicly verifiable on-chain data and official announcements:

| Metric | Value | As Of |
|--------|-------|-------|
| Tokenized RWAs on Stellar | $3.3B | July 2026 |
| Stablecoin payment volume (quarterly) | $5.5B (all-time high) | Q1 2026 |
| Year-over-year stablecoin volume growth | 72% | Q1 2026 vs. Q1 2025 |
| Total payment volume (2025) | $55.6B | 2025 full year |
| Monthly active addresses | 632,000 | Year-end 2025 |
| Franklin Templeton BENJI on Stellar | $654M AUM | April 2026 |
| Average transaction finality | ~5 seconds | Current |
| Base transaction fee | 0.00001 XLM | Current |

### Understanding These Numbers

**$3.3B in tokenized RWAs** includes the total value of all RWA tokens issued on Stellar. This is not the same as daily trading volume or money flowing through the network. It represents the face value of assets that have been tokenized and are recorded on the Stellar ledger. Notably, approximately 98% of this value consists of Treasury and money market fund products.

**$5.5B quarterly stablecoin volume** measures the total value of stablecoin payment operations in Q1 2026. The median USDC transaction size on Stellar is $1.57, indicating genuine remittance and micro-payment usage rather than institutional arbitrage or DeFi trading.

**72% stablecoin volume growth** compares Q1 2026 stablecoin payment volume to Q1 2025. The $55.6 billion total payment volume for 2025 (up 52% year over year) captures broader money movement across all asset types.

## Key Ecosystem Participants

### Franklin Templeton

Franklin Templeton launched the OnChain U.S. Government Money Fund (FOBXX) using the Stellar network in April 2021, making it the first U.S.-registered fund to use a public blockchain for transaction processing and share ownership recording. The fund is marketed under the BENJI brand.

Key facts as of the fund's 5-year anniversary in April 2026:

- Total AUM: $1.98 billion across 8 blockchains, with $654 million on Stellar
- Investor base grew over 140% from April 2024 to March 2026
- Cumulative peer-to-peer transfer volume surpassed $211 million
- Distributes dividends daily (365 days per year) with intraday yield accrual

### Circle (USDC)

Circle's USDC is the primary stablecoin on Stellar. Key facts:

- USDC on Stellar is a native Stellar asset issued by Circle
- Circle's Cross-Chain Transfer Protocol (CCTP) went live on Stellar in May 2026, enabling native USDC movement between Stellar and other supported chains
- MoneyGram uses USDC on Stellar as a settlement layer for remittances
- USDC serves as the primary trading pair and settlement asset for many Stellar-based applications

### MoneyGram

MoneyGram integrated with Stellar through the MoneyGram Access platform and extended its multi-year partnership in April 2026. In June 2026, MoneyGram launched MGUSD, its own USD-backed stablecoin issued on Stellar. MGUSD is backed by Bridge (acquired by Stripe for $1.1 billion) and uses smart contracts from M0 with Fireblocks wallet infrastructure. MoneyGram's network covers over 500,000 retail locations and 60 million customers globally.

### WisdomTree

WisdomTree offers 13 tokenized digital funds on Stellar through the WisdomTree Connect platform, including money market, equity (S&P 500 tracking), fixed income (Treasuries), and private credit (CRDT) funds. In February 2026, WisdomTree became the first to offer 24/7 trading for a registered tokenized mutual fund.

### Other Participants

| Participant | Role | Status |
|-------------|------|--------|
| Ondo Finance | USDY yield token on Stellar | $529M+ on Stellar |
| Spiko/Amundi | Tokenized sovereign debt | $1B+ on Stellar |
| PayPal | PYUSD stablecoin | Live on Stellar since Q3 2025 |
| Arf Financial | USDC settlement for remittances | $1.6B+ cumulative volume |
| Flutterwave | Europe-Africa payment corridors | Active via Stellar USDC |
| U.S. Bank | Custom stablecoin pilot | Testing since November 2025 |

## Cross-Border Payments and Remittances

Cross-border payments represent one of Stellar's strongest real-world use cases. The traditional correspondent banking system involves multiple intermediaries, each adding fees and delays. A cross-border payment can take 2 to 5 business days and cost 5% to 10% in fees.

On Stellar, the same transfer settles in approximately 5 seconds with fees of fractions of a cent. The process typically works like this:

1. Sender deposits local currency with a local anchor (on-ramp)
2. Anchor issues a tokenized version of the local currency on Stellar, or converts to USDC
3. The token is transferred to the recipient's anchor account on Stellar
4. The receiving anchor converts the token to local currency for the recipient (off-ramp)

The Stellar Development Foundation has invested in building anchor networks in corridors where remittance fees are highest, particularly in Africa, Southeast Asia, and Latin America.

## How Stellar Compares in the RWA Market

Stellar is not the only blockchain pursuing real-world asset tokenization. Here is how it compares:

| Network | RWA Focus | Key Advantage |
|---------|-----------|---------------|
| Stellar | Payments, funds, stablecoins | Compliance-native architecture, 5-second finality, institutional track record |
| Ethereum | Broad tokenization | Largest DeFi ecosystem, composability |
| Polygon | Enterprise tokenization | Ethereum compatibility with lower fees |
| Avalanche | Institutional subnets | Customizable subnets for regulatory compliance |
| Solana | Speed-focused | High throughput for trading |

Stellar's differentiation is not in smart contract complexity or DeFi composability. It is in the combination of compliance-native features (authorization flags, clawback), institutional adoption (Franklin Templeton, DTCC announcement), and cost efficiency (sub-cent fees).

## The Role of Soroban Smart Contracts

Stellar's smart contract platform, Soroban, went live on mainnet in early 2024. While most current RWA activity on Stellar uses the native asset model rather than smart contracts, Soroban opens new possibilities:

- **Programmable compliance**: Smart contracts that enforce transfer restrictions, investor limits, and holding periods
- **Automated corporate actions**: Dividend distributions, fund rebalancing, and yield calculations
- **Complex financial products**: Structured products, derivatives, and conditional payments
- **Interoperability protocols**: Cross-chain bridges and multi-asset settlement logic

Soroban is still in its early adoption phase. Most RWA issuers currently rely on Stellar's built-in asset controls because they are simpler, more battle-tested, and do not require smart contract auditing.

## Interpreting On-Chain Metrics

When evaluating Stellar's RWA growth, it is important to understand what different metrics represent:

**Asset value** (e.g., "$2B in tokenized RWAs") represents the face value of tokens on the ledger. It does not indicate liquidity, trading volume, or active usage. A $1 billion fund tokenized on Stellar means $1 billion in assets are recorded on the blockchain, but daily on-chain activity might be a fraction of that.

**Transfer volume** (e.g., "72% payment volume growth") represents the total value of payment operations over a period. This is a stronger signal of actual network usage than asset value alone.

**Transaction count** includes all operations on the network, not just payments. Account creation, trustline changes, offer management, and data operations all count as transactions. High transaction counts can reflect genuine activity or automated processes.

**Active accounts** counts accounts that have submitted at least one transaction in a given period. This is the best proxy for actual user engagement but does not distinguish between individual users and automated services.

## Limitations of On-Chain Metrics

On-chain data has real limitations:

- **No identity layer**: You cannot determine whether 1,000 accounts represent 1,000 users or 10 users with 100 accounts each
- **Automated activity**: Bots, market makers, and automated systems generate transactions that inflate counts
- **Cross-chain flows**: USDC bridged to another chain via CCTP may appear as a burn on Stellar, reducing apparent holdings
- **Anchor opacity**: Some payment corridors settle off-chain within anchor systems, with only periodic on-chain settlements

## What to Monitor Over the Next 12 to 24 Months

### Adoption Indicators

1. **DTCC integration progress**: Whether the 1H 2027 timeline for DTC-tokenized assets on Stellar holds, and which asset classes launch first
2. **USDC holder growth**: Whether holder count continues to grow, indicating expanding real usage
3. **New institutional issuers**: Whether additional asset managers tokenize funds on Stellar
4. **Anchor network expansion**: Growth in the number of on/off-ramp providers in new corridors
5. **Soroban RWA contracts**: Whether complex financial products begin using Soroban for programmable compliance

### Technical Milestones

1. **Throughput upgrades**: Progress toward the planned 5,000 TPS capacity for institutional settlement volumes
2. **State archival**: Stellar's state archival system for managing the growing ledger
3. **Protocol upgrades**: Protocol 27 and beyond, with features that support institutional requirements

### Market Signals

1. **Regulatory clarity**: SEC guidance on tokenized securities settlement
2. **Competing networks**: Whether institutional issuers choose Stellar or alternatives
3. **Fee dynamics**: How base fees and surge pricing behave under increased load

## How LumenQuery Helps

LumenQuery provides the API infrastructure to query and monitor these metrics:

- [Analytics Dashboard](/analytics) for real-time network metrics and historical trends
- [Transaction Monitoring](/stellar-transaction-monitoring) for tracking payment flows and asset transfers
- [XLM Whale Alerts](/xlm-whale-alerts) for monitoring large value movements
- [Portfolio Intelligence](/portfolio) for aggregating positions across multiple accounts

## Sources and Further Reading

- Stellar Development Foundation annual reports and ecosystem updates
- Circle USDC transparency reports
- Franklin Templeton BENJI fund documentation
- DTCC Digital Securities Management announcements
- Stellar Horizon API on-chain data

---

*Monitor Stellar's RWA and stablecoin ecosystem in real time. [LumenQuery](/auth/signup) provides managed Horizon API and Soroban RPC with analytics dashboards, payment tracking, and asset monitoring. Start free.*

## Related Resources

- [Stellar Blockchain Analytics API](/stellar-blockchain-analytics-api) — Query tokenized asset metrics, payment volumes, and network trends
- [Stellar Horizon API](/stellar-horizon-api) — Access account balances, asset details, and transaction history
- [XLM Whale Alerts](/xlm-whale-alerts) — Track large-value transfers and institutional settlement activity
    `,
  },
  'stellar-confidential-tokens': {
    title: 'Confidential Tokens on Stellar: Privacy, Compliance, and Public Blockchain Payments',
    date: '2026-07-11',
    readTime: '13 min read',
    category: 'Protocol Update',
    content: `
Financial transactions on public blockchains are transparent by default. Every payment amount, sender, and recipient is visible to anyone who queries the ledger. For many business and institutional use cases, this level of transparency is a barrier to adoption. Payroll, vendor payments, intercompany transfers, and competitive trade execution all require some degree of confidentiality.

The Stellar Development Foundation has been developing confidential token capabilities that would allow transaction amounts to be hidden from public view while remaining verifiable and auditable. This article examines what confidential tokens are, how they differ from privacy coins, what the current development status is, and what developers should understand before building with them.

## Key Takeaways

- Confidential tokens on Stellar hide transaction amounts while keeping sender and recipient addresses visible on the public ledger.
- The approach uses cryptographic methods including Pedersen commitments and range proofs to ensure hidden amounts are valid without revealing them.
- This is not anonymity. It is selective confidentiality designed to coexist with regulatory compliance.
- Confidential asset capabilities are under active development. Developers should monitor official Stellar channels for production-readiness announcements before building production applications.
- The use case is primarily institutional: banks, payment companies, and enterprises that need public blockchain efficiency without exposing competitive or private financial data.

## What Confidential Tokens Are

On a standard Stellar transaction, the following information is publicly visible:

| Field | Visibility |
|-------|-----------|
| Sender account | Public |
| Recipient account | Public |
| Asset type | Public |
| Amount | Public |
| Memo | Public |
| Transaction hash | Public |

With confidential tokens, the goal is to change one element:

| Field | Visibility |
|-------|-----------|
| Sender account | Public |
| Recipient account | Public |
| Asset type | Public (or optionally confidential) |
| **Amount** | **Hidden (cryptographically committed)** |
| Memo | Public |
| Transaction hash | Public |

The sender and recipient remain visible. The asset type may remain visible. But the amount is replaced with a cryptographic commitment that proves the transaction is valid (positive amount, no inflation, sender had sufficient balance) without revealing the actual value.

## How It Works: Cryptographic Foundations

### Pedersen Commitments

A Pedersen commitment allows someone to commit to a value without revealing it. The commitment has two properties:

- **Hiding**: No one can determine the committed value from the commitment alone
- **Binding**: The committer cannot change the value after committing

In simplified terms, a commitment to amount \`v\` looks like:

\`\`\`
C = v * G + r * H
\`\`\`

Where \`G\` and \`H\` are generator points on an elliptic curve, \`v\` is the amount, and \`r\` is a random blinding factor. Without knowing \`r\`, an observer cannot determine \`v\` from \`C\`.

### Range Proofs

A Pedersen commitment alone does not prevent an attacker from committing to a negative number (which would effectively create money). Range proofs solve this by proving that the committed value falls within a valid range (e.g., 0 to 2^64) without revealing the value itself.

Bulletproofs are a compact form of range proof that is particularly efficient for blockchain use. They produce small proofs (around 700 bytes) and can be verified quickly, making them practical for inclusion in blockchain transactions.

### Verifying Balance

The key property of Pedersen commitments for payments is that they are homomorphic: you can add commitments together and the result is a commitment to the sum of the original values. This means validators can verify that:

\`\`\`
Sum of input commitments = Sum of output commitments + commitment to fee
\`\`\`

This proves that no value was created or destroyed in the transaction, without anyone learning the individual amounts.

## Privacy vs. Anonymity

This distinction is critical for understanding Stellar's approach:

**Privacy coins** (Monero, Zcash) aim to hide the identities of senders and recipients, making transactions difficult or impossible to trace. This creates challenges for regulatory compliance, anti-money laundering (AML), and know-your-customer (KYC) requirements.

**Confidential tokens on Stellar** take a different approach:

| Property | Privacy Coins | Stellar Confidential Tokens |
|----------|--------------|----------------------------|
| Sender identity | Hidden | Visible |
| Recipient identity | Hidden | Visible |
| Transaction amount | Hidden | Hidden |
| Transaction graph | Obfuscated | Visible |
| Regulatory compliance | Difficult | Compatible |
| AML/KYC | Challenging | Supported |

Stellar's approach preserves the ability to trace who transacted with whom, which regulators and compliance officers require. What it hides is how much was transferred, which is often the sensitive business information that institutions want to protect.

SDF CEO Denelle Dixon has framed the design philosophy: "The base layer is always going to be open. Then the institution gets to decide how compliance and privacy come into play." The practical problem SDF identifies is "self-doxxing": when transacting parties reveal public addresses to each other, both can view all past and future transactions and asset balances linked to that address.

## Why Institutions Need Transaction Confidentiality

### Payroll

When a company pays employees using a public blockchain, every employee's salary is visible to anyone who identifies the sending and receiving accounts. Confidential amounts solve this by hiding the payment values while the payroll transaction itself remains auditable.

### Business-to-Business Payments

Vendor payments reveal pricing, contract terms, and business relationships. A retailer paying a supplier on a public blockchain effectively publishes its cost structure. Confidential amounts keep the transaction relationship visible (for compliance) while hiding the competitive intelligence.

### Institutional Settlement

When financial institutions settle large positions, the amounts involved can move markets if visible in real time. Settlement needs to be verifiable and auditable after the fact, but broadcasting the amount to the entire network during settlement creates front-running and information leakage risks.

### Tokenized Assets

As more real-world assets are tokenized on Stellar (including the [expected DTCC integration](/blog/dtcc-stellar-tokenized-securities)), institutional holders may not want their position sizes visible on a public ledger. Confidential amounts allow holding and transferring tokenized securities without revealing portfolio details.

## Coexistence with Compliance

A common concern with any privacy feature on a blockchain is whether it undermines regulatory compliance. Stellar's approach is designed to maintain compliance:

**Auditor view keys**: The confidential token contracts support a designated auditor role that can decrypt and view transaction amounts and account balances within the confidential wrapper. A regulated stablecoin issuer like Circle could see USDC transaction amounts while the public cannot.

**Selective disclosure**: Account holders can prove specific transactions to chosen parties (auditors, regulators, compliance officers) without revealing their full activity history. This uses the blinding factors from Pedersen commitments.

**Account-level controls**: Stellar's existing authorization and clawback controls (CAP-0035, CAP-0018) cascade into the confidential layer. The issuer retains the ability to freeze or recover assets.

**Configurable compliance policy**: The contracts support pluggable policy contracts that function as allow-list or block-list identity registries. Asset issuers decide whether transfers require KYC checks.

**FATF Travel Rule compatibility**: Because sender and recipient addresses remain public, Stellar's confidential tokens are architecturally compatible with FATF Recommendation 16. Regulated entities can still collect and share originator and beneficiary information as required.

## Current Development Status

Confidential token capabilities on Stellar are implemented as Soroban smart contracts, not as protocol-level changes. The cryptographic foundations are live on mainnet, but the confidential token contracts themselves are in developer preview.

| Component | Status | Where |
|-----------|--------|-------|
| BLS12-381 host functions (CAP-0059) | Live | Mainnet (Protocol 22) |
| BN254 host functions (CAP-0074) | Live | Mainnet (Protocol 25, Jan 2026) |
| Poseidon hash functions (CAP-0075) | Live | Mainnet (Protocol 25) |
| Extended ZK functions (CAP-0080) | Live | Mainnet (Protocol 26, May 2026) |
| Confidential Token contracts | Developer Preview | Testnet only |
| Privacy Pools prototype | Research prototype | Testnet only |

SDF announced the confidential tokens developer preview in late June 2026, built by OpenZeppelin (contract suite) with Nethermind (UltraHonk verifier). Proofs are written in Noir (Aztec's ZK language) and generated client-side via WebAssembly, so private data never leaves the user's device. On-chain verification uses the BN254 host functions added in Protocol 25.

The contracts wrap any existing SEP-41 token. Depositing USDC into the confidential wrapper converts the balance to a Pedersen commitment. Transfers operate on committed values. Withdrawing converts back to a standard transparent balance.

Mainnet availability is targeted for late summer 2026, pending completion of security audits.

**Important**: Do not build production applications that depend on confidential token features until audits are complete and SDF announces production readiness. The contracts and verifiers are explicitly labeled as unaudited and not intended for real assets.

## Technical Considerations

### Transaction Size

Confidential transactions are larger than standard transactions due to the inclusion of commitments and range proofs:

| Component | Standard Transaction | Confidential Transaction (Estimated) |
|-----------|---------------------|--------------------------------------|
| Amount field | 8 bytes (int64) | ~33 bytes (Pedersen commitment) |
| Range proof | None | ~700 bytes (Bulletproof) |
| Total overhead | 0 | ~725 bytes per output |

This increase affects network throughput and storage costs. A Stellar network processing 200 transactions per second would need to handle significantly more data per transaction with confidential amounts.

### Verification Performance

Range proof verification is more computationally expensive than standard amount verification. Validators need to perform elliptic curve operations for each confidential transaction, which increases the CPU cost of consensus.

Bulletproofs support batch verification, where verifying N proofs together is faster than verifying them individually. This partially mitigates the performance impact for validators processing blocks of transactions.

### Compatibility

Confidential tokens need to interact with the existing Stellar ecosystem:

- **DEX integration**: The Stellar decentralized exchange currently displays order prices and amounts. Confidential tokens would need a compatible trading mechanism.
- **Path payments**: Stellar's path payment feature routes payments through intermediate assets. Confidential amounts add complexity to pathfinding.
- **Anchors**: On/off-ramp providers need to see amounts to process fiat conversions. Selective disclosure to anchors would be required.

## Risks and Limitations

### Regulatory Risk

Regulators in some jurisdictions may view any privacy enhancement on a blockchain negatively, even if the implementation is compliance-friendly. The Travel Rule (requiring sender/recipient information for transfers above certain thresholds) applies to amounts as well as identities in most interpretations.

### Implementation Complexity

Cryptographic systems are difficult to implement correctly. Bugs in commitment schemes or range proofs could allow inflation (creating tokens from nothing) or other exploits. The implementation will need extensive auditing and testing.

### User Experience

Confidential transactions are more complex for users. Wallet applications need to manage blinding factors, and recovering from lost blinding factors may be impossible. The user experience needs to be designed so that confidentiality does not come at the cost of usability.

### Performance Trade-offs

The additional data and computation required for confidential transactions reduces the network's effective throughput. This trade-off needs to be weighed against the privacy benefits, especially as Stellar prepares for higher-volume use cases like institutional settlement.

## What Developers Should Monitor

1. **Official SDF announcements**: Watch the Stellar Development Foundation blog and GitHub for CAP proposals and implementation updates related to confidential assets
2. **Soroban SDK updates**: Confidential token primitives may appear as Soroban host functions or SDK features
3. **Testnet availability**: When confidential token features become available on testnet, that signals approaching production readiness
4. **Stellar Core releases**: Protocol upgrades that include confidential transaction support will be announced in Stellar Core release notes

## How This Connects to Stellar's Broader Strategy

Confidential tokens fit into Stellar's positioning as a compliance-friendly network for institutional use:

- **DTCC integration**: Tokenized securities holders may want confidential positions
- **Stablecoin payments**: Business payments in USDC benefit from amount privacy
- **Cross-border settlement**: Institutional settlement amounts are commercially sensitive
- **Regulatory alignment**: The approach preserves compliance capabilities while adding privacy

The goal is not to compete with privacy-focused blockchains. It is to give regulated institutions a reason to use a public blockchain by solving the "everyone can see our transaction amounts" problem.

## Sources and Further Reading

- Stellar Development Foundation research publications
- Stellar Core Advancement Proposals (CAPs) repository on GitHub
- Bulletproofs: Short Proofs for Confidential Transactions (Bunz et al., 2018)
- Pedersen commitment schemes in cryptographic literature

---

*Prepare for confidential assets on Stellar. [LumenQuery](/auth/signup) provides managed Horizon API and Soroban RPC with monitoring and analytics tools that will support confidential token queries as they become available. Start free.*

## Related Resources

- [Stellar Transaction Monitoring](/stellar-transaction-monitoring) — Monitor payment flows and compliance events on the Stellar network
- [Stellar Horizon API](/stellar-horizon-api) — Query accounts, assets, and transactions with managed API infrastructure
- [Soroban RPC API](/soroban-rpc-api) — Interact with Soroban smart contracts for programmable asset logic
    `,
  },
  'stellar-quantum-preparedness': {
    title: "Is Stellar Preparing for Quantum Computing? Understanding Its Post-Quantum Roadmap",
    date: '2026-07-11',
    readTime: '14 min read',
    category: 'Protocol Update',
    content: `
Quantum computing is advancing, and with it comes a long-term threat to the cryptographic systems that secure blockchain networks. Stellar, like most blockchains, currently relies on Ed25519 digital signatures, which could be vulnerable to a sufficiently powerful quantum computer. The Stellar Development Foundation published its Quantum Preparedness Plan (QPP) in June 2026, outlining a three-stage approach to address this risk before it becomes urgent.

This article explains the quantum computing threat in practical terms, describes what the Stellar Development Foundation has announced, and outlines what users and developers should understand about the transition to post-quantum cryptography.

## Key Takeaways

- Quantum computers capable of breaking Ed25519 signatures do not exist today. The threat is years or decades away, but preparation needs to start now.
- The Stellar Development Foundation published a formal Quantum Preparedness Plan in June 2026 with three stages, beginning with Soroban smart contract primitives.
- NIST finalized post-quantum cryptographic standards in 2024, providing the algorithms that Stellar and other networks will adopt.
- Post-quantum signatures are significantly larger than Ed25519 signatures (thousands of bytes vs. 64 bytes), which has real implications for network throughput and costs.
- Users do not need to take immediate action, but developers should begin planning for crypto-agility in their applications.

## The Quantum Threat: What It Actually Means

### For Nontechnical Readers

Digital signatures on blockchains work like a lock and key. Your private key signs transactions (proves you authorized them), and your public key lets anyone verify the signature is genuine. The security depends on the mathematical difficulty of deriving the private key from the public key.

Today's computers cannot solve this mathematical problem in any reasonable timeframe. A quantum computer with enough stable qubits could, using an algorithm called Shor's algorithm. If someone could derive your private key from your public key, they could authorize transactions from your account.

**The important context**: No quantum computer today has anywhere near enough qubits to threaten blockchain cryptography. Current quantum computers have a few thousand noisy qubits. Breaking Ed25519 would require millions of stable, error-corrected qubits. Most estimates place this capability 10 to 30 years in the future, though estimates vary widely.

### For Developers

Stellar uses Ed25519 for transaction signatures. Ed25519 is based on elliptic curve cryptography, which is vulnerable to Shor's algorithm on a sufficiently large quantum computer. The specific concerns are:

**1. Key derivation attack**: Given a public key, a quantum computer could derive the corresponding private key. Every Stellar account publishes its public key, so every account is potentially vulnerable once quantum computers reach sufficient capability.

**2. Harvest now, decrypt later**: An adversary could record signed transactions and public keys today, then derive private keys once quantum hardware matures. Long-lived accounts with significant assets are the highest-value targets.

**3. Signature forgery**: With a derived private key, an attacker could sign arbitrary transactions, transferring all assets from the compromised account.

## Current State of Quantum Computing

It is important to be precise about where quantum computing actually stands:

| Milestone | Status |
|-----------|--------|
| Quantum computers exist | Yes, but with limited qubits and high error rates |
| Quantum advantage demonstrated | Yes, for narrow, specialized problems |
| Cryptographically relevant quantum computer | No. Not expected for 10-30+ years |
| NIST post-quantum standards finalized | Yes, in 2024 (ML-DSA, ML-KEM, SLH-DSA) |
| Blockchain networks broken by quantum | No. Not a current threat |

**Do not believe claims** that quantum computers can break blockchain cryptography today. They cannot. The threat is real but distant, and the purpose of quantum preparedness is to complete the migration before it becomes urgent, not to respond to an imminent attack.

## What the Stellar Development Foundation Has Announced

The SDF published its quantum preparedness plan in early 2026, describing a phased approach to introducing post-quantum cryptographic support into the Stellar protocol. The plan acknowledges that the transition will take years and needs to begin well before quantum computers pose an actual threat.

### Phase Structure

The plan follows a staged approach:

**Stage 1: Soroban cryptographic primitives.** Post-quantum signature verification functions are introduced as Soroban host functions. Smart contracts can verify quantum-safe signatures, but the network's consensus layer continues using Ed25519. This allows developers to start experimenting with post-quantum cryptography in contract logic without changing the core protocol.

**Stage 2: Account-level support.** The Stellar protocol is updated to support post-quantum signature types for account authentication. Users can optionally migrate their accounts to use quantum-safe keys while Ed25519 remains supported for backward compatibility.

**Stage 3: Network-wide transition.** The protocol moves toward requiring quantum-safe signatures for all new accounts and eventually all transactions. Legacy Ed25519 accounts would need to migrate.

### Algorithm Selection

The NIST post-quantum cryptographic standards finalized in 2024 provide the foundation:

| Algorithm | NIST Standard | Type | Signature Size | Public Key Size |
|-----------|---------------|------|---------------|-----------------|
| ML-DSA (Dilithium) | FIPS 204 | Lattice-based | 2,420-4,627 bytes | 1,312-2,592 bytes |
| SLH-DSA (SPHINCS+) | FIPS 205 | Hash-based | 7,856-49,856 bytes | 32-64 bytes |
| FN-DSA (Falcon) | FIPS 206 | Lattice-based | 666-1,280 bytes | 897-1,793 bytes |

For comparison, Ed25519 (Stellar's current algorithm) uses 64-byte signatures and 32-byte public keys.

## The Size Problem

The most immediate technical challenge is that post-quantum signatures are dramatically larger than Ed25519:

| Algorithm | Signature | Public Key | Combined |
|-----------|-----------|------------|----------|
| Ed25519 (current) | 64 bytes | 32 bytes | 96 bytes |
| ML-DSA-65 (likely first candidate) | 3,309 bytes | 1,952 bytes | 5,261 bytes |
| SLH-DSA-128s (conservative) | 7,856 bytes | 32 bytes | 7,888 bytes |

A standard Stellar transaction envelope that currently fits in a few hundred bytes could grow to several kilobytes with post-quantum signatures. This affects:

- **Network throughput**: Larger transactions mean fewer transactions per ledger at current capacity
- **Storage costs**: The ledger grows faster, accelerating state archival needs
- **Transaction fees**: If fees are partially based on transaction size, costs increase
- **Bandwidth**: Validators need to propagate larger transactions across the network

This is why the 5,000 TPS roadmap is not just about scaling for institutional settlement. It may also be necessary to maintain current effective throughput when transactions become larger.

## Migration Challenges

### For Users

Most users interact with Stellar through wallets, exchanges, or applications. The migration to post-quantum keys would ideally be transparent:

1. Wallet software updates to support new key types
2. Users generate new quantum-safe key pairs
3. Users authorize the key migration using their existing Ed25519 keys
4. New transactions use quantum-safe signatures

The risk is that users who do not migrate remain vulnerable once quantum computers become capable. Abandoned or inactive accounts with significant balances are a particular concern because no one is available to perform the migration.

### For Exchanges and Custodians

Exchanges and custodians manage keys for millions of users. The migration involves:

- Generating and securely storing new key material (which is larger)
- Updating signing infrastructure to handle new algorithms
- Coordinating key rotation across potentially millions of accounts
- Maintaining backward compatibility during the transition period

### For Anchors and Institutions

Anchors (on/off-ramp providers) and institutional participants need to update their:

- Transaction signing infrastructure
- Key management systems
- Hardware security modules (HSMs) to support new algorithms
- Compliance and audit systems to handle new key formats

## Why Crypto-Agility Matters

Crypto-agility is the ability of a system to switch between cryptographic algorithms without requiring a complete redesign. It is important for two reasons:

**1. Algorithm uncertainty**: While NIST has standardized ML-DSA, SLH-DSA, and FN-DSA, future research could reveal weaknesses in any of these algorithms. A crypto-agile system can switch to a different algorithm without a crisis-level migration.

**2. Gradual transition**: A network that supports multiple signature types simultaneously allows users and applications to migrate at their own pace, rather than requiring a hard cutover date.

Stellar's multi-phase approach reflects crypto-agility: adding new algorithms alongside Ed25519 rather than replacing it immediately.

## Risks of Abandoned Accounts

One of the harder problems in quantum preparedness is handling accounts whose owners are unable or unwilling to migrate:

- **Lost keys**: If a user has lost access to their account but it still holds value, no one can perform the migration
- **Deceased users**: Accounts belonging to deceased individuals with no estate planning for crypto assets
- **Inactive organizations**: Companies that created Stellar accounts but no longer exist
- **Long-term holders**: Users who purchased XLM, stored it, and have not interacted with the network in years

These accounts will remain on Ed25519 keys and become vulnerable once quantum computers mature. The Stellar community will need to decide how to handle this, and the options (forced migration, account freezing, accepting the risk) all have trade-offs.

## What Stellar Users Should Do Now

### For Individual Users

1. **Do not panic**. Quantum computers cannot break your keys today.
2. **Stay informed**. Follow Stellar Development Foundation announcements about quantum preparedness milestones.
3. **Keep your wallet software updated**. When post-quantum support is available, your wallet will need to be updated to use it.
4. **Consider key rotation practices**. Getting comfortable with generating new keys and migrating accounts is good practice regardless of quantum concerns.

### For Developers

1. **Design for crypto-agility**. Do not hard-code Ed25519 assumptions into your application logic. Abstract signature verification so the algorithm can be swapped.
2. **Monitor Soroban SDK updates**. Post-quantum verification primitives will appear in the Soroban SDK before they reach the core protocol.
3. **Test on testnet**. When post-quantum features become available on Stellar's testnet, start testing your applications with the new signature types.
4. **Plan for larger transactions**. If your application logic depends on transaction size limits, plan for the increase that post-quantum signatures will bring.

### For Institutions

1. **Assess your exposure**. How many accounts do you manage? What is their total value? How long will migration take?
2. **Evaluate your HSM capabilities**. Do your hardware security modules support the NIST post-quantum algorithms?
3. **Include quantum preparedness in your roadmap**. Budget time and resources for the migration before it becomes urgent.

## How Other Blockchains Are Approaching This

Stellar is not alone in addressing quantum preparedness:

| Network | Approach |
|---------|----------|
| Stellar | Phased plan starting with Soroban primitives, then account-level support |
| Ethereum | Research-phase; Ethereum Foundation has funded PQ research |
| Bitcoin | No formal plan; community discussion ongoing |
| Algorand | State proofs use Falcon signatures (PQ-resistant) |
| QRL (Quantum Resistant Ledger) | Built from scratch with hash-based signatures |

Most major blockchain networks are in the research or early planning phase. Stellar's published multi-phase plan puts it ahead of many peers, though actual implementation timelines remain to be confirmed.

## Sources and Further Reading

- Stellar Development Foundation Quantum Preparedness Plan
- NIST Post-Quantum Cryptography Standardization (FIPS 203, 204, 205, 206)
- Shor's Algorithm and its implications for elliptic curve cryptography
- Stellar Core Advancement Proposals (CAPs) repository

---

*Stay ahead of protocol changes on Stellar. [LumenQuery](/auth/signup) provides managed Horizon API and Soroban RPC with real-time network monitoring and protocol upgrade tracking. Start free.*

## Related Resources

- [Stellar Horizon API](/stellar-horizon-api) — Access account and transaction data with managed API infrastructure
- [Soroban RPC API](/soroban-rpc-api) — Build and test smart contracts using the latest Soroban SDK features
- [Stellar API Provider Comparison](/stellar-api-provider-comparison) — Compare infrastructure options for production Stellar applications
    `,
  },
  'stellar-quantum-preparedness-post-quantum-soroban': {
    title: 'Stellar\'s Quantum Preparedness Plan: How Developers Should Audit Signatures Before Post-Quantum Soroban',
    date: '2026-07-03',
    readTime: '14 min read',
    category: 'Developer Guide',
    content: `
The Stellar Development Foundation published its Quantum Preparedness Plan in early 2026, entering stage one of a multi-phase effort to introduce NIST-approved quantum-safe signature algorithms into the Stellar protocol. The initial focus is on the Soroban smart contract layer, where new cryptographic primitives will be available before they reach the classic transaction layer. If you build on Stellar, this is your signal to start auditing how your application handles key management, transaction signing, and signature verification.

## Why Quantum Preparedness Matters Now

Quantum computers capable of breaking Ed25519 and ECDSA do not exist today. But the threat model is not about today. It is about two scenarios:

1. **Harvest now, decrypt later**: Adversaries can record signed transactions today and attempt to forge keys once quantum hardware matures. Any long-lived account with significant assets is a target.
2. **Migration lead time**: Transitioning millions of accounts and applications to new signature schemes takes years. Starting now means the network is ready before it is urgent.

NIST finalized three post-quantum signature standards in 2024:

| Algorithm | Type | Signature Size | Public Key Size | Use Case |
|-----------|------|---------------|-----------------|----------|
| ML-DSA (Dilithium) | Lattice-based | 2,420-4,627 bytes | 1,312-2,592 bytes | General purpose |
| SLH-DSA (SPHINCS+) | Hash-based | 7,856-49,856 bytes | 32-64 bytes | Conservative fallback |
| FN-DSA (Falcon) | Lattice-based | 666-1,280 bytes | 897-1,793 bytes | Compact signatures |

Compare this to Ed25519, which Stellar currently uses:

| Property | Ed25519 | ML-DSA-65 (Dilithium) |
|----------|---------|----------------------|
| Signature size | 64 bytes | 3,309 bytes |
| Public key size | 32 bytes | 1,952 bytes |
| Verification speed | ~70,000/sec | ~30,000/sec |
| Quantum safe | No | Yes |

The size increase is significant. A Stellar transaction envelope that currently fits in a few hundred bytes could grow by an order of magnitude. This has implications for network throughput, storage costs, and state archival.

## What Changes for Stellar Developers

### Stage One: Soroban Cryptographic Primitives

The first stage introduces post-quantum signature verification as Soroban host functions. This means smart contracts can verify quantum-safe signatures, but the network's consensus layer still uses Ed25519.

\`\`\`javascript
// Future Soroban host function (illustrative)
// Verify an ML-DSA signature inside a contract
const result = contract.call('verify_pq_signature', {
  algorithm: 'ML-DSA-65',
  message: messageBytes,
  signature: signatureBytes,
  publicKey: pqPublicKeyBytes,
});
\`\`\`

This allows developers to build hybrid schemes: the transaction itself is signed with Ed25519 (as required by the network), but the contract payload includes an additional quantum-safe signature for sensitive operations.

### Stage Two: Hybrid Transaction Signatures

In a later stage, the transaction envelope format will support hybrid signatures, where both a classical and a post-quantum signature are attached to each transaction. Validators verify both during consensus.

### Stage Three: Full Migration

Eventually, the network may allow pure post-quantum signatures. This is the furthest out and depends on ecosystem readiness.

## How to Monitor Signature Schemes via API

You can already start monitoring the cryptographic health of accounts and transactions on the Stellar network using the Horizon API through LumenQuery.

### Check Account Signer Types

\`\`\`javascript
const HORIZON = 'https://horizon.stellar.org';

async function getAccountSigners(accountId) {
  const res = await fetch(\`\${HORIZON}/accounts/\${accountId}\`);
  const account = await res.json();

  return account.signers.map(signer => ({
    key: signer.key,
    type: signer.type,       // 'ed25519_public_key' currently
    weight: signer.weight,
  }));
}

// Audit: flag accounts that lack multi-sig
async function auditSignerSecurity(accountId) {
  const signers = await getAccountSigners(accountId);

  return {
    accountId,
    signerCount: signers.length,
    totalWeight: signers.reduce((sum, s) => sum + s.weight, 0),
    usesMultiSig: signers.length > 1,
    signerTypes: [...new Set(signers.map(s => s.type))],
    hasQuantumSafeSigner: signers.some(s =>
      s.type === 'ml_dsa_public_key' || s.type === 'slh_dsa_public_key'
    ),
  };
}
\`\`\`

### Monitor Transaction Signature Sizes

Track signature sizes over time to detect when quantum-safe signatures begin appearing on the network:

\`\`\`javascript
async function analyzeTransactionSignatures(limit = 50) {
  const res = await fetch(
    \`\${HORIZON}/transactions?limit=\${limit}&order=desc\`
  );
  const data = await res.json();

  return data._embedded.records.map(tx => {
    const envelope = Buffer.from(tx.envelope_xdr, 'base64');
    return {
      hash: tx.hash,
      ledger: tx.ledger,
      signatureCount: tx.signatures?.length || 0,
      envelopeSize: envelope.length,
      possiblePQSignature: envelope.length > 1000,
    };
  });
}
\`\`\`

### Use LumenQuery Analytics to Track Network-Wide Trends

\`\`\`javascript
// Monitor average transaction envelope sizes over time
const res = await fetch('https://lumenquery.io/api/analytics/network');
const metrics = await res.json();

console.log('Average tx size:', metrics.avgTransactionSize);
console.log('Current protocol:', metrics.protocolVersion);
\`\`\`

## Practical Audit Checklist

Use this checklist to assess your application's quantum readiness:

### Key Management

- **Inventory all signing keys**: List every Ed25519 key your application uses (hot wallets, cold storage, multi-sig signers)
- **Identify long-lived keys**: Keys that have been active for more than 1 year are higher priority for migration
- **Check key derivation**: If you derive keys from HD paths (SEP-0005), verify your library supports post-quantum key derivation
- **Assess multi-sig configurations**: Multi-sig with 3-of-5 Ed25519 is not quantum-safe, it just requires breaking 3 keys instead of 1

### Transaction Signing

- **Audit signature verification**: If your application verifies signatures client-side, ensure your SDK version supports hybrid verification
- **Check hardcoded assumptions**: Search your codebase for hardcoded signature sizes (64 bytes) or key sizes (32 bytes)
- **Review XDR parsing**: If you parse transaction envelopes manually, verify your parser handles variable-length signature arrays

\`\`\`javascript
// Example: find hardcoded Ed25519 assumptions in your code
const AUDIT_PATTERNS = [
  /signature\\.length\\s*===?\\s*64/,     // Hardcoded sig size
  /publicKey\\.length\\s*===?\\s*32/,      // Hardcoded key size
  /ed25519/i,                           // Direct algorithm references
  /SIGNATURE_LENGTH\\s*=\\s*64/,         // Constants
];
\`\`\`

### Smart Contract Design

- **Review on-chain verification**: If your Soroban contracts verify signatures, plan to add PQ verification paths
- **Check storage impact**: Post-quantum keys and signatures consume more storage; review your TTL extension budget
- **Assess contract upgradeability**: Ensure your contracts can be upgraded to support new signature verification logic

## Cost Impact Estimation

Post-quantum signatures will affect transaction costs due to larger envelope sizes:

| Metric | Ed25519 (Current) | ML-DSA-65 (Hybrid) | Impact |
|--------|-------------------|---------------------|--------|
| Signature size | 64 bytes | 64 + 3,309 bytes | ~52x increase per sig |
| Typical tx envelope | 300-500 bytes | 3,600-4,000 bytes | ~8-10x increase |
| Write bytes (Soroban) | Charged per byte | Charged per byte | Higher resource fees |
| State archival | Per-byte TTL cost | Per-byte TTL cost | Higher rent |

\`\`\`javascript
// Future-proof fee estimation
async function estimateTransactionFee(tx, usePQSignature = false) {
  const baseFee = 100; // stroops
  const currentEnvelopeSize = tx.toEnvelope().toXDR().length;

  if (usePQSignature) {
    const pqOverhead = 3309 * tx.signatures.length;
    const adjustedSize = currentEnvelopeSize + pqOverhead;
    return Math.ceil(baseFee * (adjustedSize / currentEnvelopeSize));
  }

  return baseFee;
}
\`\`\`

## Timeline and Recommendations

| Phase | Expected Timeline | Developer Action |
|-------|-------------------|-----------------|
| Stage 1: Soroban primitives | 2026 H2 | Audit contracts, test PQ verification |
| Stage 2: Hybrid signatures | 2027 | Update SDK, test hybrid signing |
| Stage 3: Full migration | 2028+ | Rotate keys to PQ, deprecate Ed25519-only |

### What to Do Today

1. **Audit your key inventory** using the checklist above
2. **Update your Stellar SDK** to the latest version
3. **Monitor the SDF's quantum-preparedness repository** for specification updates
4. **Test on testnet** once PQ host functions are available
5. **Budget for increased transaction costs** in your application's fee model

## How LumenQuery Helps

LumenQuery provides the infrastructure to monitor the quantum transition:

- **Horizon API**: Query account signers, transaction envelopes, and signature metadata through [api.lumenquery.io](https://api.lumenquery.io)
- **Analytics Dashboard**: Track network-wide transaction size trends on [/analytics/network](/analytics/network)
- **Soroban RPC**: Test post-quantum host functions via [rpc.lumenquery.io](https://rpc.lumenquery.io) as they become available
- **Live Transactions**: Monitor signature types in real time on [/dashboard/transactions](/dashboard/transactions)
- **Natural Language Query**: Ask questions like "show transactions with envelope size > 1000 bytes" on [/query](/query)

---

*Prepare your Stellar application for the quantum transition. [LumenQuery](/auth/signup) provides managed Horizon API and Soroban RPC with analytics to track the migration. Start free.*
    `,
  },
  'open-usd-consortium-visa-blackrock-stellar-stablecoin': {
    title: 'Inside the Open USD Consortium: What Visa and BlackRock\'s Stellar Stablecoin Means for Payment Developers',
    date: '2026-07-03',
    readTime: '12 min read',
    category: 'Industry Insights',
    content: `
In July 2026, Stellar was announced as a member of the Open USD Consortium, an initiative backed by Visa and BlackRock to create interoperable stablecoin infrastructure for global payments. This is not another DeFi yield token or algorithmic experiment. This is the two largest players in payments and asset management building regulated stablecoin rails, and Stellar is part of that foundation.

For developers building on Stellar, this article is a practical breakdown of what the consortium means, what new endpoints and data flows matter, and how to position your application to take advantage of institutional stablecoin adoption.

## What Is the Open USD Consortium

The Open USD Consortium is a multi-stakeholder initiative to standardize stablecoin issuance, transfer, and settlement across regulated networks. The founding members include:

| Member | Role | Relevance |
|--------|------|-----------|
| Visa | Payment network operator | Merchant acceptance, card-to-stablecoin flows |
| BlackRock | Asset manager, tokenized fund issuer | Reserve asset backing, institutional credibility |
| Circle | USDC issuer | Existing stablecoin infrastructure |
| SDF | Stellar network steward | Low-cost settlement layer |
| Swift | Messaging standard | Interoperability with traditional banking |

The consortium's goal is to create a unified framework where stablecoins issued by different parties can interoperate across chains and traditional payment networks.

## Why Stellar Was Chosen

Stellar's inclusion is not accidental. The network has specific properties that align with the consortium's requirements:

### Transaction Economics

| Property | Stellar | Ethereum L1 | Solana |
|----------|---------|-------------|--------|
| Average tx fee | 0.00001 XLM (~$0.000003) | $0.50-$5.00 | $0.001-$0.01 |
| Finality | 5-7 seconds | 12-15 minutes | 400ms (soft), 32s (full) |
| TPS (current) | 100-200 | 15-30 | 2,000-4,000 |
| Compliance features | Native (flags, clawback) | Via smart contract | Via smart contract |

### Built-in Compliance Primitives

Stellar's asset model includes compliance features at the protocol level:

- **Authorization Required**: Issuer must approve each trustline
- **Authorization Revocable**: Issuer can freeze assets
- **Clawback Enabled**: Issuer can retrieve assets (for regulatory seizure)
- **Authorization Immutable**: Lock flags permanently

These are exactly what a Visa-backed stablecoin needs for regulatory compliance, and they do not require a smart contract.

## What This Means for Developers

### Track Stablecoin Issuance and Supply

Monitor the total supply of consortium stablecoins by querying the issuer account:

\`\`\`javascript
const HORIZON = 'https://horizon.stellar.org';

async function trackStablecoinSupply(assetCode, issuerId) {
  const res = await fetch(
    \`\${HORIZON}/assets?asset_code=\${assetCode}&asset_issuer=\${issuerId}\`
  );
  const data = await res.json();
  const asset = data._embedded.records[0];

  return {
    assetCode: asset.asset_code,
    totalSupply: parseFloat(asset.amount),
    authorizedAccounts: asset.accounts.authorized,
    clawbackEnabled: asset.flags.auth_clawback_enabled,
  };
}

// Track supply changes over time
async function trackSupplyHistory(assetCode, issuerId, hours = 24) {
  const res = await fetch(
    \`\${HORIZON}/accounts/\${issuerId}/payments?limit=200&order=desc\`
  );
  const data = await res.json();
  const cutoff = new Date(Date.now() - hours * 60 * 60 * 1000);

  let minted = 0;
  let burned = 0;

  for (const payment of data._embedded.records) {
    if (new Date(payment.created_at) < cutoff) break;
    if (payment.asset_code !== assetCode) continue;

    const amount = parseFloat(payment.amount);
    if (payment.from === issuerId) {
      minted += amount;   // Issuer sending = minting
    } else if (payment.to === issuerId) {
      burned += amount;   // Receiving back = burning
    }
  }

  return { minted, burned, netIssuance: minted - burned };
}
\`\`\`

### Monitor Payment Flows

The real value for developers is in tracking payment flows. With Visa involved, expect payment volumes to increase significantly:

\`\`\`javascript
// Use LumenQuery's analytics endpoint for aggregated data
async function getStablecoinMetrics() {
  const res = await fetch('https://lumenquery.io/api/analytics/tokens');
  const data = await res.json();

  return {
    usdcVolume24h: data.tokens?.find(t => t.code === 'USDC')?.volume24h,
    paymentCount24h: data.paymentCount,
    uniqueSenders: data.uniqueSenders,
  };
}
\`\`\`

## Integration Opportunities

### 1. Merchant Payment Processing

With Visa's involvement, expect a flow where merchants accept stablecoins via the consortium's rails. Developers building payment processing can prepare by streaming incoming payments:

\`\`\`javascript
// Stream incoming stablecoin payments to a merchant account
function streamMerchantPayments(merchantAccountId) {
  const url = \`\${HORIZON}/accounts/\${merchantAccountId}/payments?cursor=now\`;
  const es = new EventSource(url);

  es.onmessage = (event) => {
    const payment = JSON.parse(event.data);

    if (payment.type === 'payment' && payment.asset_code === 'USDC') {
      console.log(\`Received \${payment.amount} USDC from \${payment.from}\`);

      processPayment({
        amount: payment.amount,
        sender: payment.from,
        transactionId: payment.transaction_hash,
        timestamp: payment.created_at,
      });
    }
  };
}
\`\`\`

### 2. Compliance Reporting

With auth_required and auth_revocable flags, consortium stablecoins will generate compliance-relevant data:

\`\`\`javascript
async function getAccountComplianceStatus(accountId) {
  const res = await fetch(\`\${HORIZON}/accounts/\${accountId}\`);
  const account = await res.json();

  const stablecoinTrustlines = account.balances.filter(b =>
    b.asset_type !== 'native' && ['USDC'].includes(b.asset_code)
  );

  return stablecoinTrustlines.map(tl => ({
    asset: \`\${tl.asset_code}:\${tl.asset_issuer.substring(0, 8)}...\`,
    balance: tl.balance,
    authorized: tl.is_authorized,
    frozen: !tl.is_authorized && tl.is_authorized_to_maintain_liabilities,
  }));
}
\`\`\`

### 3. Cross-Border Remittance Applications

The combination of Visa's merchant network and Stellar's low-cost settlement creates new corridors:

| Corridor | Before Consortium | After Consortium |
|----------|-------------------|------------------|
| US to Mexico | 3-5 day ACH, 3-5% fee | Near-instant, < 0.1% fee |
| EU to Philippines | SWIFT, $25-45 fee | Near-instant, < $0.01 fee |
| Intra-ASEAN | Correspondent banking | Direct stablecoin transfer |

## What to Watch For

### Short Term (Q3-Q4 2026)

- Consortium specification documents (asset codes, issuer accounts, compliance requirements)
- New stablecoin asset issuance announcements
- SDK updates for consortium-specific features

### Medium Term (2027)

- Visa merchant integration pilots
- BlackRock fund tokenization on Stellar
- Cross-chain settlement protocols with consortium standards

## How LumenQuery Helps

LumenQuery is positioned to help developers build on consortium infrastructure:

- **Horizon API**: Track stablecoin issuance, payments, and trustlines via [api.lumenquery.io](https://api.lumenquery.io)
- **Analytics Dashboard**: Monitor stablecoin volume and network metrics on [/analytics](/analytics)
- **Live Transactions**: Watch stablecoin settlements in real time on [/dashboard/transactions](/dashboard/transactions)
- **Portfolio Intelligence**: Track stablecoin positions across multiple accounts on [/portfolio](/portfolio)
- **Natural Language Query**: Ask "total USDC payments in the last 24 hours" on [/query](/query)

---

*Build on the next generation of stablecoin infrastructure. [LumenQuery](/auth/signup) provides managed Horizon API and Soroban RPC with real-time analytics for Stellar. Start free.*
    `,
  },
  'erc-3643-compliant-security-tokens-stellar': {
    title: 'Building Compliant Security Tokens on Stellar with ERC-3643: A Developer\'s Guide to Permissioned Assets',
    date: '2026-07-03',
    readTime: '15 min read',
    category: 'Developer Guide',
    content: `
Stellar's membership in the ERC-3643 Association, combined with the network surpassing $2 billion in tokenized real-world assets, signals a clear direction: Stellar is becoming the preferred settlement layer for regulated, permissioned tokens. For developers, this means understanding how to issue compliant security tokens, manage permissioned transfers, and query on-chain compliance state through APIs.

## What Is ERC-3643

ERC-3643, also known as T-REX (Token for Regulated EXchanges), is a standard originally created for Ethereum that defines how security tokens should handle identity verification, transfer restrictions, and compliance enforcement on-chain.

The standard has three core components:

| Component | Purpose | Stellar Equivalent |
|-----------|---------|-------------------|
| Identity Registry | Maps wallet addresses to verified identities | Issuer account + SEP-0012 KYC |
| Compliance Contract | Enforces transfer rules (jurisdiction, holding period, investor limits) | Authorization flags + Soroban contracts |
| Token Contract | The security token itself | Native Stellar asset |

Stellar does not implement ERC-3643 identically to Ethereum. Instead, Stellar's native asset model provides several of the same guarantees at the protocol level, and Soroban smart contracts fill the gaps.

## Stellar's Native Compliance Features

### Asset Authorization Flags

Every Stellar asset issuer can set flags that control how the asset behaves:

\`\`\`javascript
const StellarSdk = require('@stellar/stellar-sdk');
const server = new StellarSdk.Horizon.Server('https://horizon.stellar.org');

// Configure an issuer account with compliance flags
async function configureIssuer(issuerKeypair) {
  const account = await server.loadAccount(issuerKeypair.publicKey());

  const tx = new StellarSdk.TransactionBuilder(account, {
    fee: '100',
    networkPassphrase: StellarSdk.Networks.PUBLIC,
  })
    .addOperation(StellarSdk.Operation.setOptions({
      setFlags:
        StellarSdk.AuthRequiredFlag |
        StellarSdk.AuthRevocableFlag |
        StellarSdk.AuthClawbackEnabledFlag,
    }))
    .setTimeout(30)
    .build();

  tx.sign(issuerKeypair);
  return server.submitTransaction(tx);
}
\`\`\`

### Flag Behavior Matrix

| Flag | Effect | Use Case |
|------|--------|----------|
| AUTH_REQUIRED | Holders must be approved by issuer before receiving | KYC enforcement |
| AUTH_REVOCABLE | Issuer can freeze individual accounts | Regulatory freeze orders |
| AUTH_CLAWBACK_ENABLED | Issuer can seize tokens from any holder | Court orders, compliance enforcement |
| AUTH_IMMUTABLE | Flags cannot be changed once set | Lock configuration permanently |

### Trustline Authorization Flow

With AUTH_REQUIRED enabled, every new holder must be explicitly approved:

\`\`\`javascript
// Investor creates a trustline (requests to hold the asset)
async function createTrustline(investorKeypair, assetCode, issuerPublicKey) {
  const account = await server.loadAccount(investorKeypair.publicKey());
  const asset = new StellarSdk.Asset(assetCode, issuerPublicKey);

  const tx = new StellarSdk.TransactionBuilder(account, {
    fee: '100',
    networkPassphrase: StellarSdk.Networks.PUBLIC,
  })
    .addOperation(StellarSdk.Operation.changeTrust({ asset }))
    .setTimeout(30)
    .build();

  tx.sign(investorKeypair);
  return server.submitTransaction(tx);
}

// Issuer approves the trustline after KYC verification
async function approveTrustline(issuerKeypair, investorPublicKey, assetCode) {
  const issuerAccount = await server.loadAccount(issuerKeypair.publicKey());
  const asset = new StellarSdk.Asset(assetCode, issuerKeypair.publicKey());

  const tx = new StellarSdk.TransactionBuilder(issuerAccount, {
    fee: '100',
    networkPassphrase: StellarSdk.Networks.PUBLIC,
  })
    .addOperation(StellarSdk.Operation.setTrustLineFlags({
      trustor: investorPublicKey,
      asset,
      flags: {
        authorized: true,
        authorizedToMaintainLiabilities: false,
      },
    }))
    .setTimeout(30)
    .build();

  tx.sign(issuerKeypair);
  return server.submitTransaction(tx);
}
\`\`\`

## Adding ERC-3643 Compliance with Soroban

Stellar's native flags handle the basics. But ERC-3643 compliance requires additional logic: transfer restrictions between verified investors, holding period enforcement, and investor count limits. This is where Soroban contracts come in.

### Compliance Contract Architecture

\`\`\`
Identity Registry (Soroban) --> Compliance Module (Soroban) --> Token Issuer Logic (Off-chain)
Maps addresses to claims       Evaluates transfer rules        Approves/denies trustlines
\`\`\`

### Example: Identity Registry Contract

\`\`\`rust
// Soroban contract: Identity Registry (simplified)
#[contract]
pub struct IdentityRegistry;

#[contractimpl]
impl IdentityRegistry {
    pub fn register_identity(
        env: Env,
        investor: Address,
        jurisdiction: Symbol,
        accreditation_level: u32,
        kyc_expiry: u64,
    ) {
        let admin: Address = env.storage().instance()
            .get(&symbol!("admin")).unwrap();
        admin.require_auth();

        env.storage().persistent().set(&investor, &IdentityClaim {
            jurisdiction,
            accreditation_level,
            kyc_expiry,
            registered_at: env.ledger().timestamp(),
        });
    }

    pub fn can_transfer(
        env: Env,
        from: Address,
        to: Address,
        _amount: i128,
    ) -> bool {
        let from_claim: IdentityClaim = env.storage().persistent()
            .get(&from).unwrap();
        let to_claim: IdentityClaim = env.storage().persistent()
            .get(&to).unwrap();
        let now = env.ledger().timestamp();

        // Rule 1: Both parties must have valid KYC
        if from_claim.kyc_expiry < now || to_claim.kyc_expiry < now {
            return false;
        }

        // Rule 2: US accredited investors only
        if to_claim.jurisdiction == symbol!("US")
            && to_claim.accreditation_level < 1 {
            return false;
        }

        // Rule 3: 12-month holding period
        let holding_period = 365 * 24 * 60 * 60;
        if now - from_claim.registered_at < holding_period {
            return false;
        }

        true
    }
}
\`\`\`

## Querying Compliant Asset State

### List All Holders of a Permissioned Asset

\`\`\`javascript
const HORIZON = 'https://horizon.stellar.org';

async function getAuthorizedHolders(assetCode, issuerPublicKey) {
  const res = await fetch(
    \`\${HORIZON}/accounts?asset=\${assetCode}:\${issuerPublicKey}&limit=200\`
  );
  const data = await res.json();

  return data._embedded.records.map(account => {
    const trustline = account.balances.find(
      b => b.asset_code === assetCode && b.asset_issuer === issuerPublicKey
    );

    return {
      accountId: account.id,
      balance: trustline?.balance,
      authorized: trustline?.is_authorized,
      frozen: !trustline?.is_authorized &&
              trustline?.is_authorized_to_maintain_liabilities,
    };
  }).filter(h => h.balance);
}
\`\`\`

### Monitor Authorization Changes

Track when the issuer approves, freezes, or claws back assets:

\`\`\`javascript
async function monitorAuthorizationChanges(issuerPublicKey) {
  const res = await fetch(
    \`\${HORIZON}/accounts/\${issuerPublicKey}/operations?limit=200&order=desc\`
  );
  const data = await res.json();

  return data._embedded.records
    .filter(op =>
      op.type === 'set_trust_line_flags' ||
      op.type === 'allow_trust' ||
      op.type === 'clawback'
    )
    .map(op => ({
      type: op.type,
      trustor: op.trustor,
      asset: op.asset_code,
      timestamp: op.created_at,
      transactionHash: op.transaction_hash,
    }));
}
\`\`\`

## Real-World Asset Categories on Stellar

The $2B+ RWA milestone includes multiple asset categories:

| Category | Examples | Compliance Level |
|----------|----------|-----------------|
| Government bonds | U.S. Treasuries, EU bonds | High (accredited investors) |
| Corporate bonds | Investment-grade debt | High |
| Real estate | Tokenized property shares | Medium-High |
| Fund shares | ETF tokens, money market funds | High |
| Carbon credits | Verified emission reductions | Medium |

Each category has different compliance requirements, but the Stellar infrastructure (auth flags + Soroban contracts) supports all of them.

## How LumenQuery Helps

LumenQuery provides the API infrastructure to build and monitor compliant security tokens:

- **Horizon API**: Query trustline authorization status, track payments, and monitor issuer operations via [api.lumenquery.io](https://api.lumenquery.io)
- **Soroban RPC**: Interact with compliance contracts via [rpc.lumenquery.io](https://rpc.lumenquery.io)
- **Analytics Dashboard**: Track security token issuance volume on [/analytics/tokens](/analytics/tokens)
- **Smart Contract Explorer**: Inspect compliance contract state on [/contracts](/contracts)
- **Portfolio Intelligence**: Monitor security token positions on [/portfolio](/portfolio)

---

*Build compliant security tokens on reliable infrastructure. [LumenQuery](/auth/signup) provides managed Horizon API and Soroban RPC with compliance monitoring tools built in. Start free.*
    `,
  },
  'stellar-2b-rwa-tokenized-asset-analytics-dashboard': {
    title: 'Tracking Stellar\'s $2B RWA Milestone On-Chain: Build a Tokenized-Asset Analytics Dashboard with LumenQuery APIs',
    date: '2026-07-03',
    readTime: '16 min read',
    category: 'Developer Guide',
    content: `
Stellar crossed the $2 billion mark in tokenized real-world assets in 2026, with payment volume up 72% year-over-year and developer participation increasing 86%. These are not speculative DeFi tokens. They are government bonds, fund shares, and institutional stablecoins issued by regulated entities like Franklin Templeton, WisdomTree, and Circle.

This guide walks you through building a live RWA analytics dashboard that tracks tokenized asset issuance, holder distribution, and transfer activity on Stellar using the Horizon API and LumenQuery endpoints.

## Understanding the RWA Landscape on Stellar

### Major Tokenized Assets

| Asset | Issuer | Category | Approx. Value |
|-------|--------|----------|---------------|
| USDC | Circle | Stablecoin | $1B+ |
| BENJI (FOBXX) | Franklin Templeton | Money market fund | $400M+ |
| WisdomTree Prime tokens | WisdomTree | Fund shares | $100M+ |
| SHX | Stronghold | Tokenized USD | $50M+ |

### Why Stellar for RWAs

| Requirement | How Stellar Delivers |
|-------------|---------------------|
| Regulatory compliance | Native auth flags (required, revocable, clawback) |
| Low transaction costs | ~0.00001 XLM per transaction |
| Fast settlement | 5-7 second finality |
| Programmable logic | Soroban smart contracts |
| Institutional adoption | SDF partnerships with Franklin Templeton, DTCC, Visa |

## Project Architecture

We will build a dashboard with four sections:

1. **RWA Overview**: Total value, asset count, holder count
2. **Asset Breakdown**: Per-asset metrics (supply, holders, compliance flags)
3. **Holder Distribution**: How assets are distributed across accounts
4. **Transfer Activity**: Recent transfers charted over time

## Step 1: Define Your RWA Asset Registry

\`\`\`typescript
// lib/rwa-registry.ts
interface RWAAsset {
  code: string;
  issuer: string;
  name: string;
  category: 'stablecoin' | 'fund' | 'bond' | 'commodity' | 'other';
}

const RWA_ASSETS: RWAAsset[] = [
  {
    code: 'USDC',
    issuer: 'GA5ZSEJYB37JRC5AVCIA5MOP4RHTM335X2KGX3IHOJAPP5RE34K4KZVN',
    name: 'USD Coin',
    category: 'stablecoin',
  },
  {
    code: 'BENJI',
    issuer: 'GBHNGLLIE3KWGKCHIKMHJ5HVZHYFF32DLXTUENE3AFMUQT2SGHSPSA2A',
    name: 'Franklin OnChain US Govt Money Fund',
    category: 'fund',
  },
  // Add additional RWA assets as they launch
];
\`\`\`

## Step 2: Fetch Asset Metrics from Horizon

\`\`\`typescript
// lib/rwa-fetcher.ts
const HORIZON = 'https://horizon.stellar.org';

async function fetchAssetMetrics(asset: RWAAsset) {
  const res = await fetch(
    \`\${HORIZON}/assets?asset_code=\${asset.code}&asset_issuer=\${asset.issuer}\`
  );
  const data = await res.json();

  if (!data._embedded?.records?.length) {
    return { ...asset, totalSupply: 0, authorizedAccounts: 0 };
  }

  const record = data._embedded.records[0];

  return {
    code: asset.code,
    issuer: asset.issuer,
    name: asset.name,
    category: asset.category,
    totalSupply: parseFloat(record.amount),
    authorizedAccounts: record.accounts.authorized,
    pendingAccounts: record.accounts.authorized_to_maintain_liabilities,
    authRequired: record.flags.auth_required,
    authRevocable: record.flags.auth_revocable,
    clawbackEnabled: record.flags.auth_clawback_enabled,
  };
}

async function fetchAllAssetMetrics() {
  const results = await Promise.all(
    RWA_ASSETS.map(asset => fetchAssetMetrics(asset))
  );
  return results.filter(r => r.totalSupply > 0);
}
\`\`\`

## Step 3: Track Holder Distribution

\`\`\`typescript
async function getTopHolders(assetCode: string, issuer: string, limit = 10) {
  const res = await fetch(
    \`\${HORIZON}/accounts?asset=\${assetCode}:\${issuer}&limit=200&order=desc\`
  );
  const data = await res.json();

  // Get total supply for percentage calculation
  const assetRes = await fetch(
    \`\${HORIZON}/assets?asset_code=\${assetCode}&asset_issuer=\${issuer}\`
  );
  const assetData = await assetRes.json();
  const totalSupply = parseFloat(assetData._embedded.records[0]?.amount || '0');

  return data._embedded.records
    .map((account: any) => {
      const trustline = account.balances.find(
        (b: any) => b.asset_code === assetCode && b.asset_issuer === issuer
      );
      if (!trustline) return null;

      const balance = parseFloat(trustline.balance);
      return {
        accountId: account.id,
        balance,
        percentOfSupply: totalSupply > 0 ? (balance / totalSupply) * 100 : 0,
        authorized: trustline.is_authorized,
      };
    })
    .filter(Boolean)
    .sort((a: any, b: any) => b.balance - a.balance)
    .slice(0, limit);
}
\`\`\`

## Step 4: Track Transfer Activity

\`\`\`typescript
async function getTransferActivity(assetCode: string, issuer: string, hours = 24) {
  let url = \`\${HORIZON}/payments?limit=200&order=desc\`;
  const cutoff = new Date(Date.now() - hours * 60 * 60 * 1000);
  const transfers: { timestamp: Date; amount: number }[] = [];

  let pages = 0;
  while (url && pages < 10) {
    const res = await fetch(url);
    const data = await res.json();
    let done = false;

    for (const record of data._embedded.records) {
      if (new Date(record.created_at) < cutoff) { done = true; break; }

      if (record.type === 'payment' &&
          record.asset_code === assetCode &&
          record.asset_issuer === issuer) {
        transfers.push({
          timestamp: new Date(record.created_at),
          amount: parseFloat(record.amount),
        });
      }
    }

    if (done || data._embedded.records.length < 200) break;
    url = data._links?.next?.href;
    pages++;
  }

  // Bucket into hourly intervals
  const buckets = new Map();
  for (const transfer of transfers) {
    const hour = new Date(transfer.timestamp);
    hour.setMinutes(0, 0, 0);
    const key = hour.toISOString();

    if (!buckets.has(key)) {
      buckets.set(key, { timestamp: key, volume: 0, count: 0 });
    }
    const bucket = buckets.get(key);
    bucket.volume += transfer.amount;
    bucket.count++;
  }

  return Array.from(buckets.values()).sort(
    (a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
  );
}
\`\`\`

## Step 5: Build the API Route

\`\`\`typescript
// app/api/rwa/route.ts
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const section = searchParams.get('section') || 'overview';

  try {
    switch (section) {
      case 'overview': {
        const metrics = await fetchAllAssetMetrics();
        const totalValue = metrics.reduce((sum, m) => sum + m.totalSupply, 0);
        const totalHolders = metrics.reduce(
          (sum, m) => sum + m.authorizedAccounts, 0
        );

        return NextResponse.json({
          totalValue,
          totalHolders,
          assetCount: metrics.length,
          assets: metrics,
        });
      }

      case 'holders': {
        const assetCode = searchParams.get('asset') || 'USDC';
        const issuer = RWA_ASSETS.find(a => a.code === assetCode)?.issuer;
        if (!issuer) return NextResponse.json({ error: 'Unknown asset' }, { status: 400 });

        const holders = await getTopHolders(assetCode, issuer);
        return NextResponse.json({ holders });
      }

      default:
        return NextResponse.json({ error: 'Invalid section' }, { status: 400 });
    }
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch RWA data' }, { status: 500 });
  }
}
\`\`\`

## Step 6: Add Caching for Performance

RWA data does not change every second. Cache aggressively:

\`\`\`typescript
import Redis from 'ioredis';

const redis = new Redis(process.env.REDIS_URL || 'redis://localhost:6379');

async function getCachedOrFetch<T>(
  key: string,
  ttlSeconds: number,
  fetcher: () => Promise<T>
): Promise<T> {
  const cached = await redis.get(key);
  if (cached) return JSON.parse(cached);

  const data = await fetcher();
  await redis.setex(key, ttlSeconds, JSON.stringify(data));
  return data;
}

// Usage:
const overview = await getCachedOrFetch(
  'rwa:overview',
  300, // 5-minute cache
  () => fetchAllAssetMetrics()
);
\`\`\`

### Recommended Cache TTLs

| Data Type | TTL | Reason |
|-----------|-----|--------|
| Asset supply | 5 minutes | Changes infrequently |
| Holder counts | 10 minutes | Relatively stable |
| Transfer activity | 1 minute | More dynamic |
| Top holders | 15 minutes | Changes slowly |

## Step 7: Add Real-Time Updates with SSE

For live transfer monitoring, use LumenQuery's SSE endpoint:

\`\`\`typescript
'use client';
import { useEffect, useState } from 'react';

export function useRWAStream(assetCode: string) {
  const [transfers, setTransfers] = useState([]);

  useEffect(() => {
    const es = new EventSource('/api/transactions/stream');

    es.onmessage = (event) => {
      try {
        const tx = JSON.parse(event.data);

        const rwaOps = tx.operations?.filter(
          (op: any) => op.type === 'payment' && op.asset_code === assetCode
        );

        if (rwaOps?.length) {
          for (const op of rwaOps) {
            setTransfers(prev => [{
              hash: tx.hash,
              asset: assetCode,
              amount: op.amount,
              from: op.from,
              to: op.to,
              timestamp: tx.created_at,
            }, ...prev].slice(0, 50));
          }
        }
      } catch (err) { /* skip malformed events */ }
    };

    return () => es.close();
  }, [assetCode]);

  return transfers;
}
\`\`\`

## Key Metrics to Track

| Category | Metric | What It Tells You |
|----------|--------|-------------------|
| Supply | Total supply | Market size of the tokenized asset |
| Supply | Supply change (24h) | Issuance/redemption activity |
| Holders | Unique holders | Adoption breadth |
| Holders | Top 10 concentration | Risk concentration |
| Transfers | Volume (24h) | Capital movement |
| Transfers | Average transfer size | Retail vs institutional split |
| Compliance | Pending authorizations | KYC pipeline |
| Compliance | Frozen accounts | Regulatory activity |

## Using LumenQuery's Existing Endpoints

You do not need to build everything from scratch. LumenQuery already provides endpoints that support RWA analytics:

\`\`\`javascript
// Network-level metrics
const network = await fetch('https://lumenquery.io/api/analytics/network');

// Token-level metrics
const tokens = await fetch('https://lumenquery.io/api/analytics/tokens');

// Live transaction stream (filter for RWA assets client-side)
const stream = new EventSource('https://lumenquery.io/api/transactions/stream');

// Natural language queries
const query = await fetch('https://lumenquery.io/api/query', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ query: 'recent USDC payments larger than 100000' }),
});
\`\`\`

## How LumenQuery Helps

LumenQuery provides the complete infrastructure stack for RWA analytics:

- **Horizon API**: Query asset metadata, holder lists, and transfer history via [api.lumenquery.io](https://api.lumenquery.io)
- **Analytics Dashboard**: View network-wide metrics including RWA volumes on [/analytics](/analytics)
- **Live Transactions**: Monitor RWA transfers in real time on [/dashboard/transactions](/dashboard/transactions)
- **Smart Contract Explorer**: Inspect compliance contracts governing RWA assets on [/contracts](/contracts)
- **Portfolio Intelligence**: Track RWA positions across multiple accounts on [/portfolio](/portfolio)
- **Natural Language Query**: Ask "USDC transfers over 1 million in the last 24 hours" on [/query](/query)
- **Redis Caching**: Built-in caching layer reduces Horizon API load for high-frequency dashboards

---

*Build real-world asset analytics on reliable infrastructure. [LumenQuery](/auth/signup) provides managed Horizon API and Soroban RPC with caching, analytics, and real-time streaming. Start free.*
    `,
  },
  'stellar-protocol-27-zipper-developer-guide': {
    title: 'Stellar Protocol 27 \"Zipper\": What Developers Need to Prepare Before the July Mainnet Vote',
    date: '2026-06-09',
    readTime: '12 min read',
    category: 'Protocol Update',
    content: `
Stellar Protocol 27, codenamed "Zipper," is the next major network upgrade. SDF published the developer preparation guide on June 4, 2026, and the testnet is already running the new protocol. The mainnet validator vote is expected in July. If you have an application on Stellar, here is what you need to know and do before that vote happens.

## What Is Protocol 27

Protocol upgrades on Stellar happen through validator consensus. A supermajority of validators must vote to adopt a new protocol version before it goes live on mainnet. Protocol 27 follows the Protocol 22 "Yardstick" upgrade pattern, which went through testnet validation before a mainnet vote.

Each protocol upgrade can introduce new transaction types, change fee structures, modify resource limits, or alter how the ledger processes operations. "Zipper" focuses on several areas that directly affect how developers build and deploy applications.

## Key Changes in Protocol 27

### 1. Soroban Resource Model Updates

Protocol 27 adjusts the resource pricing model for Soroban smart contracts:

| Resource | Protocol 26 | Protocol 27 | Impact |
|----------|-------------|-------------|--------|
| CPU instructions limit | 100M per tx | 150M per tx | Larger contracts can execute |
| Read bytes limit | 200KB per tx | 300KB per tx | More state access per call |
| Write bytes limit | 65KB per tx | 100KB per tx | Larger state mutations |
| Events size limit | 8KB per tx | 16KB per tx | Richer event data |

These changes mean contracts that were hitting resource limits can now execute. If you were splitting operations across multiple transactions to stay under limits, you may be able to consolidate.

### 2. State Archival Improvements

State archival determines how long contract data persists on the network. Protocol 27 introduces:

- **Cheaper TTL extensions**: Extending the time-to-live of persistent storage entries costs less
- **Batch TTL operations**: Extend TTL for multiple keys in a single operation
- **Archival status queries**: New RPC method to check if entries are archived

\`\`\`javascript
// New in Protocol 27: batch TTL extension
const tx = new StellarSdk.TransactionBuilder(account, { fee: '100' })
  .addOperation(StellarSdk.Operation.extendFootprintTtl({
    ledgersToExtend: 500000,
    // Can now include multiple keys in one operation
  }))
  .setTimeout(30)
  .build();
\`\`\`

### 3. Transaction Throughput

Protocol 27 increases the per-ledger transaction capacity:

- **Classic transactions**: From 100 to 150 per ledger
- **Soroban transactions**: From 20 to 30 per ledger
- **Effective TPS increase**: ~50% more throughput at the consensus level

This is part of SDF's roadmap toward 5,000 TPS. Each protocol upgrade incrementally raises the ceiling while validators confirm network stability.

### 4. Fee Market Adjustments

The fee market for Soroban transactions gets a smoother surge pricing curve:

- Fees increase more gradually under load (less spiking)
- Minimum fees for resource-heavy transactions decrease slightly
- Fee estimation via \`simulateTransaction\` becomes more accurate

## SDK Changes You Need to Make

### JavaScript SDK

Update to the latest version:

\`\`\`bash
npm install @stellar/stellar-sdk@latest
\`\`\`

Key changes:
- New \`extendFootprintTtl\` options for batch operations
- Updated resource estimation in \`simulateTransaction\` responses
- New fields in transaction result metadata

### Python SDK

\`\`\`bash
pip install stellar-sdk --upgrade
\`\`\`

### Breaking Changes

| Change | What Breaks | Fix |
|--------|------------|-----|
| Resource limit increases | Nothing (limits go up) | No action needed |
| Fee estimation changes | Hardcoded fee values | Use \`simulateTransaction\` instead |
| New result metadata fields | Strict parsers may fail | Update parsing logic |
| TTL extension API | Old single-key API still works | Optional: migrate to batch API |

## Testing on Testnet

The testnet is already running Protocol 27. Test your application now:

\`\`\`javascript
const TESTNET_HORIZON = 'https://horizon-testnet.stellar.org';
const TESTNET_RPC = 'https://soroban-testnet.stellar.org';

// Verify protocol version
const res = await fetch(\`\${TESTNET_HORIZON}/ledgers?limit=1&order=desc\`);
const ledger = (await res.json())._embedded.records[0];
console.log('Protocol version:', ledger.protocol_version);
// Should show 27 on testnet
\`\`\`

### What to Test

1. **Transaction submission**: Ensure your transactions still succeed
2. **Fee estimation**: Verify \`simulateTransaction\` returns correct fees
3. **Resource usage**: Check if your contracts use the new resource limits
4. **Event parsing**: Verify your event listeners handle any new fields
5. **Error handling**: Test failure modes with the new protocol behavior

## Timeline

| Date | Event |
|------|-------|
| June 4, 2026 | SDF publishes Protocol 27 developer guide |
| June 2026 | Testnet running Protocol 27 |
| July 2026 (expected) | Mainnet validator vote |
| After vote | Protocol 27 live on mainnet |

## What Happens During the Vote

1. SDF proposes the upgrade to validators
2. Validators review and signal readiness
3. A supermajority (67%+) must vote yes
4. Once approved, the upgrade activates at the next ledger boundary
5. All nodes must be running compatible software

If you run a Stellar Core validator or Horizon node, you must upgrade your software before the vote. Running outdated software after the vote will cause your node to fall out of sync.

## Impact on LumenQuery Users

If you are using LumenQuery's Horizon API or Soroban RPC:

- **No action required for most users**: LumenQuery will upgrade infrastructure before the mainnet vote
- **New resource limits**: Your contracts may be able to do more per transaction
- **Fee changes**: If you hardcode fees, switch to dynamic estimation
- **New RPC methods**: Will be available through LumenQuery's RPC gateway after upgrade

## Checklist Before the Vote

- [ ] Update Stellar SDK to latest version
- [ ] Test application on testnet with Protocol 27
- [ ] Replace any hardcoded fee values with dynamic estimation
- [ ] Update transaction result parsers for new metadata fields
- [ ] If running a node: upgrade Stellar Core and Horizon
- [ ] Review Soroban contracts for resource limit changes
- [ ] Test TTL extension operations if using state archival

---

*Stay ahead of protocol upgrades. [LumenQuery](/auth/signup) manages infrastructure upgrades so you can focus on your application. Start free.*
    `,
  },
  'circle-cctp-stellar-cross-chain-usdc': {
    title: 'Circle CCTP on Stellar: How Cross-Chain USDC Transfers Change the Developer Opportunity',
    date: '2026-06-09',
    readTime: '11 min read',
    category: 'Industry Insights',
    content: `
Circle's Cross-Chain Transfer Protocol (CCTP) went live on Stellar on May 19, 2026. This is a significant milestone: native USDC can now move between Stellar and other CCTP-supported chains without bridges, wrapping, or liquidity pools. For developers building on Stellar, this opens up cross-chain payment flows, multi-chain treasury management, and interoperability patterns that were previously complex or impossible.

## What CCTP Is

CCTP is Circle's protocol for moving native USDC between blockchains. Unlike bridges that lock tokens on one chain and mint wrapped versions on another, CCTP uses a burn-and-mint mechanism:

1. **Burn**: USDC is burned on the source chain
2. **Attest**: Circle's attestation service confirms the burn
3. **Mint**: Native USDC is minted on the destination chain

The result is that the USDC you receive on Stellar is native USDC issued by Circle on Stellar, not a bridged or wrapped token. This eliminates bridge risk entirely.

## Why This Matters for Stellar

Stellar already has over 2.1 million USDC holders. CCTP adds a new dimension:

| Before CCTP | After CCTP |
|------------|------------|
| USDC enters Stellar via Circle mint or exchanges | USDC can flow in from any CCTP chain |
| Cross-chain requires bridges with liquidity risk | Native burn-and-mint, no bridge risk |
| Multi-chain apps need separate USDC pools | Single USDC standard across chains |
| Stellar is a destination | Stellar becomes a hub |

### Supported Chains

CCTP connects Stellar to the broader USDC ecosystem:

- Ethereum
- Avalanche
- Arbitrum
- Optimism
- Base
- Polygon PoS
- Solana
- Noble (Cosmos)
- **Stellar** (new)

This means a user on Ethereum can send USDC to a Stellar address, and the recipient gets native Stellar USDC in seconds.

## How CCTP Works on Stellar

### Burn on Source Chain

On the source chain (e.g., Ethereum), you call the CCTP \`depositForBurn\` function:

\`\`\`javascript
// Ethereum side: burn USDC for Stellar delivery
const tx = await cctpContract.depositForBurn(
  amount,           // USDC amount (in smallest unit)
  stellarDomain,    // Stellar's CCTP domain identifier
  mintRecipient,    // Stellar account address (32-byte format)
  usdcAddress       // USDC contract address on source chain
);
\`\`\`

### Attestation

Circle's attestation service monitors the burn event and produces a signed attestation. This typically takes 10-20 minutes depending on the source chain's finality.

### Mint on Stellar

On Stellar, the attestation is submitted to the CCTP contract, which triggers a native USDC mint to the recipient's Stellar account:

\`\`\`javascript
// Stellar side: claim the minted USDC
const HORIZON = 'https://horizon.stellar.org';

// Monitor for incoming USDC payments
const es = new EventSource(
  \`\${HORIZON}/accounts/\${recipientAccount}/payments?cursor=now\`
);

es.onmessage = (event) => {
  const payment = JSON.parse(event.data);
  if (payment.asset_code === 'USDC' && payment.type === 'payment') {
    console.log(\`Received \${payment.amount} USDC via CCTP\`);
  }
};
\`\`\`

## Developer Use Cases

### 1. Cross-Chain Payment Gateway

Accept USDC from any chain and settle on Stellar:

\`\`\`javascript
async function createCrossChainInvoice(amount, stellarRecipient) {
  return {
    amount,
    recipient: stellarRecipient,
    supportedChains: [
      { chain: 'ethereum', domain: 0, estimatedTime: '15 min' },
      { chain: 'avalanche', domain: 1, estimatedTime: '2 min' },
      { chain: 'solana', domain: 5, estimatedTime: '3 min' },
      { chain: 'stellar', domain: 8, estimatedTime: 'instant' },
    ],
    instructions: 'Send USDC on any supported chain. It will arrive as native USDC on Stellar.',
  };
}
\`\`\`

### 2. Multi-Chain Treasury Management

DAOs and businesses can consolidate USDC from multiple chains onto Stellar for low-cost operations:

- Collect revenue on Ethereum (high-value DeFi interactions)
- Collect payments on Solana (consumer applications)
- Consolidate to Stellar for treasury management (sub-cent fees)
- Use Stellar's DEX for FX conversion if needed

### 3. Remittance Corridors

MoneyGram already uses Stellar for USDC-powered remittances. CCTP adds new on-ramps:

- Users can send USDC from any chain
- Settlement happens on Stellar (fast, cheap)
- Recipients can cash out via MoneyGram's 500K+ agent locations

### 4. DeFi Interoperability

Soroban smart contracts on Stellar can now interact with cross-chain USDC:

- Lending protocols can accept deposits from any chain
- Yield strategies can source liquidity cross-chain
- DEX aggregators can route through Stellar for efficiency

## Monitoring CCTP Transfers

Track cross-chain USDC flows using Horizon:

\`\`\`javascript
async function trackUSDCInflows(hours = 24) {
  const HORIZON = 'https://horizon.stellar.org';
  const USDC_ISSUER = 'GA5ZSEJYB37JRC5AVCIA5MOP4RHTM335X2KGX3IHOJAPP5RE34K4KZVN';

  const cutoff = new Date(Date.now() - hours * 60 * 60 * 1000);
  let totalVolume = 0;
  let transferCount = 0;
  let url = \`\${HORIZON}/payments?order=desc&limit=200\`;

  while (url) {
    const res = await fetch(url);
    const data = await res.json();
    const records = data._embedded.records;

    let done = false;
    for (const record of records) {
      if (new Date(record.created_at) < cutoff) { done = true; break; }
      if (record.asset_code === 'USDC' && record.asset_issuer === USDC_ISSUER) {
        totalVolume += parseFloat(record.amount);
        transferCount++;
      }
    }

    if (done || records.length < 200) break;
    url = data._links?.next?.href;
  }

  return { totalVolume, transferCount, periodHours: hours };
}
\`\`\`

## Impact on the Stellar Ecosystem

### Liquidity Depth

More USDC flowing into Stellar means deeper liquidity for:
- XLM/USDC trading pairs
- Stablecoin-denominated DeFi on Soroban
- Cross-border payment corridors

### Developer Adoption

CCTP lowers the barrier for developers who are already building on other chains:
- No need to learn a new stablecoin standard
- USDC is USDC, regardless of origin chain
- Stellar's low fees become accessible without friction

### Institutional Interest

CCTP adds another reason for institutions to use Stellar:
- Circle is a regulated, trusted issuer
- Burn-and-mint eliminates bridge risk
- Compliance-friendly (USDC maintains its regulatory properties across chains)

## What LumenQuery Provides

LumenQuery's infrastructure supports CCTP monitoring out of the box:

- **Horizon API**: Track USDC payments, balances, and trustlines
- **Analytics Dashboard**: Monitor USDC volume on [/analytics/tokens](/analytics/tokens)
- **Live Transactions**: See CCTP settlements in real time on [/dashboard/transactions](/dashboard/transactions)
- **Portfolio Intelligence**: Track USDC positions across accounts on [/portfolio](/portfolio)

## Next Steps

- Read Circle's [CCTP documentation](https://developers.circle.com/stablecoins/cctp-getting-started) for integration details
- Monitor USDC flows on the [LumenQuery Analytics Dashboard](/analytics/tokens)
- Explore the [API documentation](/docs) for Horizon endpoints

---

*Build cross-chain USDC applications on reliable infrastructure. [LumenQuery](/auth/signup) provides managed Horizon API and Soroban RPC with monitoring and analytics built in. Start free.*
    `,
  },
  'dtcc-stellar-tokenized-securities-institutional-catalyst': {
    title: "DTCC + Stellar: Why Tokenized Securities Could Become Stellar's Biggest Institutional Catalyst",
    date: '2026-06-09',
    readTime: '13 min read',
    category: 'Industry Insights',
    content: `
On May 27, 2026, DTCC announced that DTC-tokenized assets are expected to become available on Stellar in the first half of 2027. The potential asset classes include Russell 1000 constituents, ETFs, and U.S. Treasuries. This is not a proof of concept or a pilot program. This is the largest post-trade infrastructure provider in the world choosing Stellar as a settlement layer for tokenized securities.

## What DTCC Is

If you are not from traditional finance, here is why this matters: DTCC (Depository Trust & Clearing Corporation) processes virtually all U.S. securities transactions. In 2025, DTCC settled over $2.5 quadrillion in securities. Its subsidiary DTC (Depository Trust Company) holds custody of nearly all U.S. stocks and bonds.

When DTCC decides to tokenize assets and put them on a blockchain, the scale is not comparable to a DeFi protocol launching a new token. This is the backbone of U.S. capital markets exploring on-chain settlement.

## What Was Announced

| Detail | Description |
|--------|-------------|
| **Who** | DTCC / DTC (Depository Trust Company) |
| **What** | DTC-tokenized assets available on Stellar |
| **When** | Expected 1H 2027 |
| **Asset classes** | Russell 1000 stocks, ETFs, U.S. Treasuries |
| **Mechanism** | DTC-issued tokens representing custody positions |
| **Settlement** | On-chain settlement on Stellar |

## Why Stellar

DTCC did not choose Stellar randomly. Several properties make it suitable for institutional securities:

### 1. Deterministic Finality

Stellar transactions are final within 5 seconds. There are no chain reorganizations, no probabilistic finality, no waiting for block confirmations. For securities settlement, this matters: T+0 is only possible if the settlement layer guarantees finality.

### 2. Compliance-Native Architecture

Stellar has built-in features that regulated assets require:

\`\`\`
AUTH_REQUIRED     - Accounts must be approved before holding the asset
AUTH_REVOCABLE    - Issuer can freeze accounts (regulatory freeze)
AUTH_CLAWBACK     - Issuer can recover tokens (court orders, errors)
\`\`\`

These are not smart contract add-ons. They are protocol-level features that every Stellar node enforces. DTCC does not need to trust a smart contract — the network itself enforces compliance.

### 3. Low and Predictable Fees

Securities settlement involves millions of transactions. Stellar's base fee is 100 stroops (0.00001 XLM), making high-volume settlement economically viable. At current XLM prices, settling a million transactions costs roughly $1.60.

### 4. Regulatory Track Record

Stellar is one of the few blockchain networks where the native token (XLM) has been classified as a commodity by regulators, not a security. This matters for institutional adoption — using a network whose token might be classified as a security creates legal risk.

### 5. Existing Institutional Adoption

Stellar already hosts significant institutional activity:

- **Franklin Templeton BENJI**: First U.S.-registered money market fund on a public blockchain (5 years on Stellar)
- **USDC**: 2.1M+ holders, primary settlement asset for MoneyGram remittances
- **Tokenized RWAs**: $2B+ in on-chain real-world assets as of Q1 2026
- **MiCAR-compliant EURAU**: Euro stablecoin for European institutional settlement

## What Tokenized Securities on Stellar Look Like

When DTCC brings tokenized securities to Stellar, they will likely function as Stellar assets with the following properties:

\`\`\`javascript
// Conceptual representation of a DTC-tokenized security
const tokenizedSecurity = {
  assetCode: 'AAPL',           // Or a proprietary code
  issuer: 'GDTCC...',          // DTC's Stellar issuing account
  authRequired: true,          // Only approved accounts can hold
  authRevocable: true,         // Can freeze for regulatory compliance
  clawbackEnabled: true,       // Can recover tokens if needed
  homeDomain: 'dtcc.com',      // Verifiable issuer identity
};
\`\`\`

### Trading and Settlement

The Stellar DEX (decentralized exchange) could facilitate trading of tokenized securities:

\`\`\`javascript
// Query available offers for a tokenized security
const HORIZON = 'https://horizon.stellar.org';

async function getOrderBook(assetCode, assetIssuer) {
  const res = await fetch(
    \`\${HORIZON}/order_book?selling_asset_type=credit_alphanum4&selling_asset_code=\${assetCode}&selling_asset_issuer=\${assetIssuer}&buying_asset_type=native\`
  );
  return res.json();
}
\`\`\`

### Corporate Actions

Dividends, stock splits, and other corporate actions can be executed as Stellar operations:

- **Dividends**: Payment operations to all token holders
- **Stock splits**: Issuer mints additional tokens proportionally
- **Voting**: Could use Stellar's data operations or Soroban contracts

## Impact on Developers

### New API Use Cases

If you are building on the Horizon API or Soroban RPC, tokenized securities create new data to query:

| Endpoint | Use Case |
|----------|----------|
| \`/assets\` | List tokenized securities and their properties |
| \`/accounts/{id}/offers\` | View open orders for securities |
| \`/order_book\` | Real-time bid/ask for tokenized stocks |
| \`/trades\` | Historical trade data for securities |
| \`/payments\` | Track dividend distributions |
| \`/operations\` | Monitor corporate actions |

### Compliance Requirements

Applications that interact with tokenized securities will need:

1. **KYC/AML integration**: Only verified accounts can hold securities
2. **Accredited investor checks**: Some securities may have investor requirements
3. **Transaction reporting**: Trade reporting obligations (SEC, FINRA)
4. **Audit trails**: Complete transaction history for regulatory examination

LumenQuery's [Transaction Intelligence](/intelligence) and [Portfolio Intelligence](/portfolio) features are designed for exactly these use cases.

## Market Size

To understand the scale of what DTCC could bring to Stellar:

| Asset Class | Approximate Market Size |
|-------------|------------------------|
| Russell 1000 stocks | ~$45 trillion market cap |
| U.S. ETFs | ~$10 trillion AUM |
| U.S. Treasuries | ~$27 trillion outstanding |
| Total addressable | ~$82 trillion |

Even if a fraction of a percent of these assets moves on-chain, it would dwarf all current blockchain activity combined.

## Timeline and What to Watch

| Timeframe | Expected Development |
|-----------|---------------------|
| Q3-Q4 2026 | DTCC testnet integration, developer previews |
| Q1 2027 | Pilot program with select asset classes |
| 1H 2027 | General availability of DTC-tokenized assets on Stellar |
| 2H 2027+ | Expansion to additional asset classes |

### Signals to Watch

- DTCC developer documentation for Stellar integration
- New asset issuance from DTC-affiliated Stellar accounts
- Regulatory guidance on blockchain-based securities settlement
- Stellar protocol upgrades to support institutional requirements

## What This Means for XLM

Every tokenized security transaction on Stellar requires XLM for fees and reserves. If even a small fraction of U.S. securities settlement moves to Stellar:

- **Transaction fees**: Millions of settlement transactions per day
- **Base reserves**: Each account holding securities needs XLM reserves
- **Trustline reserves**: Each security held requires a trustline (0.5 XLM reserve)
- **Network usage**: Dramatically increased demand for Stellar throughput

This is why SDF's roadmap to 5,000 TPS is not aspirational — it may be necessary to handle institutional settlement volumes.

## Building for This Future

Developers who want to be ready when tokenized securities arrive on Stellar should:

1. **Build with compliance in mind**: See our guide on [building compliance-friendly Stellar apps](/blog/building-compliance-friendly-stellar-apps)
2. **Understand Stellar's asset model**: Assets with authorization flags, clawback, and controlled access
3. **Monitor the API**: Use LumenQuery's [Analytics Dashboard](/analytics) to track new asset issuance
4. **Build portfolio tools**: Institutions will need portfolio tracking, P&L, and risk analysis

---

*Position your application for institutional-grade Stellar. [LumenQuery](/auth/signup) provides the API infrastructure, analytics, and monitoring tools that regulated asset platforms need. Start free.*
    `,
  },
  'alchemy-stellar-rpc-infrastructure-competition': {
    title: 'Alchemy Adds Stellar Support: What It Means for RPC Infrastructure Competition',
    date: '2026-06-09',
    readTime: '10 min read',
    category: 'Industry Insights',
    content: `
On April 16, 2026, Alchemy announced support for the Stellar network. Alchemy is one of the largest blockchain infrastructure providers, serving over 100 million end users across Ethereum, Solana, Polygon, and other chains. Adding Stellar to their platform is a validation of the network's growing developer demand and a signal that the RPC infrastructure market for Stellar is maturing.

## What Alchemy Announced

Alchemy's Stellar support includes:

- **Horizon API access**: Proxied access to Stellar's historical data API
- **Soroban RPC access**: JSON-RPC endpoints for smart contract interactions
- **Enhanced APIs**: Alchemy's proprietary APIs for transfers, balances, and token metadata
- **Dashboard**: Usage analytics, alerts, and webhook integrations

This puts Alchemy alongside the existing options for managed Stellar infrastructure: SDF's public endpoints, Blockdaemon, Validation Cloud, and LumenQuery.

## The RPC Infrastructure Landscape for Stellar

Before Alchemy's entry, Stellar developers had several options:

| Provider | Horizon API | Soroban RPC | Rate Limits | Pricing |
|----------|------------|-------------|-------------|---------|
| **SDF Public** | Yes | Yes | ~5 req/s | Free |
| **Self-hosted** | Yes | Yes | Unlimited | Server costs |
| **Blockdaemon** | Yes | Yes | Tier-based | Enterprise |
| **Validation Cloud** | Yes | Yes | Tier-based | Enterprise |
| **LumenQuery** | Yes | Yes | Tier-based | From $0/mo |
| **Alchemy** (new) | Yes | Yes | Tier-based | From $0/mo |

Alchemy's entry validates that Stellar has enough developer demand to justify investment from a major infrastructure player.

## How Alchemy Compares

### Strengths

1. **Multi-chain experience**: Alchemy has years of experience running blockchain infrastructure at scale
2. **Developer tooling**: Webhooks, enhanced APIs, and monitoring dashboards
3. **Brand recognition**: Many developers already use Alchemy for Ethereum
4. **Scale**: Infrastructure designed for billions of requests

### Considerations

1. **Stellar-specific features**: Alchemy's enhanced APIs are primarily designed for EVM chains. Stellar-specific features like DEX order books, path payments, and asset authorization may not be fully covered
2. **Soroban depth**: Stellar's smart contract platform has unique characteristics (state archival, TTL management) that generic infrastructure may not optimize for
3. **Pricing at scale**: Alchemy's compute unit pricing can become expensive for high-volume Stellar applications
4. **Support for Stellar idioms**: Features like streaming (SSE), cursor-based pagination, and Stellar-specific error handling

## What This Means for Developers

### More Choice Is Good

Competition drives better infrastructure:

- **Better uptime**: Providers compete on reliability
- **Lower prices**: More competition pushes costs down
- **Better features**: Each provider differentiates with unique capabilities
- **Less vendor lock-in**: Standard APIs make switching easier

### Choose Based on Your Needs

| If You Need... | Consider |
|-----------------|----------|
| Multi-chain support (Ethereum + Stellar) | Alchemy |
| Stellar-specific analytics and monitoring | LumenQuery |
| Enterprise SLA with dedicated support | Blockdaemon, Validation Cloud |
| Free tier for prototyping | SDF Public, LumenQuery, Alchemy |
| Soroban contract explorer and decoded data | LumenQuery |
| Maximum control | Self-hosted |

## The Case for Stellar-Focused Infrastructure

Generic multi-chain providers serve a broad market. Stellar-focused providers like LumenQuery serve the Stellar market deeply. The difference shows up in several areas:

### 1. Analytics and Monitoring

LumenQuery provides [Stellar network analytics](/analytics) out of the box: TPS, ledger health, fee trends, token velocity, and whale tracking. Generic providers typically offer request-level metrics (how many API calls you made) but not network-level insights.

### 2. Smart Contract Explorer

LumenQuery's [Soroban Pro](/contracts) decodes XDR, shows human-readable contract calls, provides storage viewers, and streams contract events. This is Stellar-specific tooling that generic providers do not offer.

### 3. Transaction Intelligence

Real-time [transaction monitoring](/intelligence) with decoded operations, watchlists, and alerts designed for Stellar's operation types. A generic webhook service does not understand Stellar's path payments, trustline changes, or Soroban invocations.

### 4. Portfolio and Compliance

[Portfolio Intelligence](/portfolio) and compliance tools designed for Stellar's asset model, including trustline risk assessment, multi-account aggregation, and yield tracking from Soroban DeFi.

## Impact on the Stellar Ecosystem

### Validation

Alchemy entering the Stellar market is a strong signal:

- Stellar has enough developer demand to justify investment
- The Soroban smart contract platform is attracting multi-chain developers
- RWA tokenization on Stellar is creating enterprise infrastructure demand
- SDF's ecosystem growth strategy is working

### Developer Growth

More infrastructure options lower the barrier to building on Stellar:

- Ethereum developers already using Alchemy can add Stellar features with minimal friction
- Multi-chain applications can use a single provider for both chains
- Better infrastructure attracts more developers, creating a positive feedback loop

### What Comes Next

If history repeats from the Ethereum infrastructure market:

1. **More providers enter**: QuickNode, Infura, and others may follow
2. **Prices decrease**: Competition pushes free tiers higher and paid tiers lower
3. **Features converge**: Basic API access becomes commoditized
4. **Specialization wins**: Providers differentiate through unique features and domain expertise

## How to Evaluate RPC Providers

When choosing infrastructure for your Stellar application:

\`\`\`
1. Latency        - How fast are responses? (< 100ms for cached, < 500ms for uncached)
2. Uptime         - What is the SLA? (99.9% minimum for production)
3. Rate limits    - Do limits match your usage pattern?
4. Stellar depth  - Does the provider understand Stellar-specific features?
5. Pricing        - What does it cost at your expected scale?
6. Support        - Can you get help when something breaks?
7. Tooling        - Analytics, monitoring, debugging tools?
8. Lock-in risk   - How easy is it to switch providers?
\`\`\`

Since Horizon and Soroban RPC have standard APIs, switching providers is straightforward — just change the base URL. The differentiator is everything above and beyond the raw API: analytics, monitoring, decoded data, and developer experience.

## Related Resources

- [Stellar API Provider Comparison](/stellar-api-provider-comparison) — Full comparison of Stellar infrastructure providers
- [Stellar RPC Provider](/stellar-rpc-provider) — Managed Soroban RPC infrastructure
- [Stellar Horizon API](/stellar-horizon-api) — Production Horizon API with analytics and monitoring

## LumenQuery's Position

LumenQuery was built for Stellar from day one. While we welcome competition from Alchemy and others, our focus remains on being the best infrastructure provider for teams building specifically on Stellar:

- **Managed Horizon API** with sub-100ms response times
- **Soroban RPC** with contract deployment and decoded event streaming
- **Network analytics** with real-time metrics and historical data
- **Developer tools** including natural language queries, portfolio tracking, and transaction monitoring

---

*Build on Stellar with infrastructure that understands the network. [LumenQuery](/auth/signup) provides managed Horizon API, Soroban RPC, analytics, and monitoring designed specifically for Stellar developers. Start free.*
    `,
  },
  'build-stellar-payment-status-page-lumenquery-apis': {
    title: 'How to Build a Stellar Payment Status Page with LumenQuery APIs',
    date: '2026-06-08',
    readTime: '13 min read',
    category: 'Developer Guide',
    content: `
A payment status page is one of the most valuable things you can add to any application that moves money on Stellar. Whether you are building a remittance platform, an e-commerce checkout, or an internal treasury tool, your users need to know: did the payment go through, is it still pending, or did it fail? This guide shows you how to build one using the Horizon API.

## What a Payment Status Page Shows

A good payment status page answers four questions:

1. **Was the transaction submitted?** Did it reach the network at all?
2. **Was it included in a ledger?** Which ledger, and when did it close?
3. **Did it succeed or fail?** If it failed, why?
4. **How many confirmations does it have?** How many ledgers have closed since settlement?

## Checking Transaction Status

After submitting a transaction, you get back a hash. Use it to poll for status:

\`\`\`javascript
const HORIZON = 'https://horizon.stellar.org';

async function getTransactionStatus(txHash) {
  const res = await fetch(\`\${HORIZON}/transactions/\${txHash}\`);

  if (res.status === 404) {
    return { status: 'pending', message: 'Transaction not yet included in a ledger' };
  }

  const tx = await res.json();

  return {
    status: tx.successful ? 'success' : 'failed',
    hash: tx.hash,
    ledger: tx.ledger,
    createdAt: tx.created_at,
    feeCharged: parseInt(tx.fee_charged),
    operationCount: tx.operation_count,
    memo: tx.memo || null,
    resultCodes: tx.result_codes || null,
  };
}
\`\`\`

A 404 response means the transaction has not been included in a ledger yet. It could still be in the submission queue or it may have been rejected before reaching consensus.

## Counting Confirmations

On Stellar, a ledger closes roughly every 5 seconds. Each new ledger after your transaction's ledger is a confirmation:

\`\`\`javascript
async function getConfirmations(txLedger) {
  const res = await fetch(\`\${HORIZON}/ledgers?limit=1&order=desc\`);
  const data = await res.json();
  const currentLedger = data._embedded.records[0].sequence;

  return {
    confirmations: currentLedger - txLedger,
    currentLedger,
    txLedger,
    estimatedSeconds: (currentLedger - txLedger) * 5,
  };
}
\`\`\`

Most applications treat a transaction as final after 1 confirmation on Stellar, because Stellar's consensus protocol (SCP) provides deterministic finality — unlike proof-of-work chains where you need to wait for multiple blocks.

## Tracking Payment Operations

A transaction can contain multiple operations. To show what actually happened, fetch the operations:

\`\`\`javascript
async function getPaymentOperations(txHash) {
  const res = await fetch(\`\${HORIZON}/transactions/\${txHash}/operations\`);
  const data = await res.json();

  return data._embedded.records.map(op => ({
    id: op.id,
    type: op.type,
    amount: op.amount,
    asset: op.asset_type === 'native' ? 'XLM' : \`\${op.asset_code}:\${op.asset_issuer?.slice(0, 4)}\`,
    from: op.from,
    to: op.to,
    sourceAccount: op.source_account,
  }));
}
\`\`\`

## Handling Failed Transactions

When a transaction fails, the \`result_codes\` field tells you exactly why:

\`\`\`javascript
const ERROR_MESSAGES = {
  tx_failed: 'One or more operations failed',
  tx_bad_auth: 'Invalid signature or authorization',
  tx_bad_seq: 'Sequence number mismatch — transaction may have been submitted twice',
  tx_insufficient_balance: 'Sender does not have enough XLM to cover amount + fees',
  tx_no_source_account: 'Source account does not exist on the network',
  tx_too_late: 'Transaction expired (timebounds exceeded)',
  op_underfunded: 'Not enough balance to complete the payment',
  op_no_trust: 'Recipient has not established a trustline for this asset',
  op_no_destination: 'Destination account does not exist',
  op_line_full: 'Recipient trustline balance limit exceeded',
};

function getErrorMessage(resultCodes) {
  if (!resultCodes) return 'Unknown error';
  const txCode = resultCodes.transaction;
  const opCodes = resultCodes.operations || [];
  const messages = [
    ERROR_MESSAGES[txCode] || txCode,
    ...opCodes.map(code => ERROR_MESSAGES[code] || code),
  ];
  return messages.join('. ');
}
\`\`\`

## Building the Status Page Component

Here is a React component that ties everything together:

\`\`\`javascript
function PaymentStatusPage({ txHash }) {
  const [status, setStatus] = useState(null);
  const [confirmations, setConfirmations] = useState(0);

  useEffect(() => {
    const poll = async () => {
      const txStatus = await getTransactionStatus(txHash);
      setStatus(txStatus);

      if (txStatus.status === 'success') {
        const conf = await getConfirmations(txStatus.ledger);
        setConfirmations(conf.confirmations);
      }
    };

    poll();
    const interval = setInterval(poll, 5000);
    return () => clearInterval(interval);
  }, [txHash]);

  if (!status) return <div>Loading...</div>;

  return (
    <div>
      <h2>Payment Status</h2>
      <StatusBadge status={status.status} />
      {status.status === 'pending' && <p>Waiting for network confirmation...</p>}
      {status.status === 'success' && (
        <>
          <p>Settled in ledger #{status.ledger}</p>
          <p>{confirmations} confirmations ({confirmations * 5}s ago)</p>
          <p>Fee: {status.feeCharged} stroops</p>
        </>
      )}
      {status.status === 'failed' && (
        <p className="error">{getErrorMessage(status.resultCodes)}</p>
      )}
    </div>
  );
}
\`\`\`

## Streaming Status Updates with SSE

Instead of polling, you can use Horizon's Server-Sent Events to get instant updates:

\`\`\`javascript
function streamTransactionStatus(txHash, onUpdate) {
  const es = new EventSource(
    \`\${HORIZON}/transactions/\${txHash}?cursor=now\`
  );

  es.onmessage = (event) => {
    const tx = JSON.parse(event.data);
    onUpdate({
      status: tx.successful ? 'success' : 'failed',
      ledger: tx.ledger,
      createdAt: tx.created_at,
    });
    es.close();
  };

  return es;
}
\`\`\`

## Displaying Settlement Progress

A progress bar shows users how their payment is moving through the pipeline:

| Stage | Description | Visual |
|-------|-------------|--------|
| Submitted | Transaction sent to Horizon | Step 1 of 4 |
| Accepted | Horizon accepted the transaction | Step 2 of 4 |
| Settled | Included in a closed ledger | Step 3 of 4 |
| Confirmed | Additional ledgers closed after settlement | Step 4 of 4 |

## Production Considerations

**Timeout handling**: If a transaction is not confirmed within 30 seconds, it likely failed or was not submitted. Check the account sequence number to determine if it was applied.

**Idempotency**: Use the memo field or a unique ID to prevent duplicate payments. Before resubmitting, check if the original transaction was already applied.

**Rate limits**: If you are polling Horizon directly, keep requests under the rate limit. LumenQuery's managed API gives you higher throughput with built-in caching.

**Multi-currency**: For path payments, the source and destination assets may differ. Show both the sent and received amounts.

## Next Steps

- Use the [LumenQuery Live Transaction Viewer](/dashboard/transactions) to see decoded operations in real time
- Explore [Network Analytics](/analytics) for settlement time trends
- Check out the [Horizon API docs](/docs) for the complete endpoint reference

---

*Build reliable payment experiences on Stellar. [LumenQuery](/auth/signup) provides managed Horizon API access with higher rate limits and sub-100ms response times. Start free.*
    `,
  },
  'stellar-api-rate-limits-production-apps': {
    title: "Stellar API Rate Limits Explained: How to Design Apps That Don't Break in Production",
    date: '2026-06-08',
    readTime: '11 min read',
    category: 'Developer Guide',
    content: `
Rate limits are one of the most common reasons blockchain applications break in production. Everything works fine in development with a few test requests, but the moment real users show up, your app starts throwing 429 errors and the dashboard goes blank. This guide explains how Stellar API rate limits work and how to build applications that handle them gracefully.

## How Rate Limits Work on Stellar

Stellar has two main API surfaces, and each has its own rate limiting behavior:

| API | Endpoint | Default Public Limit |
|-----|----------|---------------------|
| Horizon | horizon.stellar.org | ~5 requests/second per IP |
| Stellar RPC | mainnet.sorobanrpc.com | ~1 request/second per IP |

These limits are per IP address. If you are running a backend server, all requests from your server count as a single IP. If you have 100 users hitting your frontend, each gets their own limit — unless all requests are proxied through your server.

## What Happens When You Hit the Limit

When you exceed the rate limit, the API returns HTTP 429 (Too Many Requests):

\`\`\`json
{
  "type": "https://stellar.org/horizon-errors/rate_limit_exceeded",
  "title": "Rate Limit Exceeded",
  "status": 429,
  "detail": "The rate limit for the requesting IP address is over the allowed limit."
}
\`\`\`

The response includes a \`Retry-After\` header telling you how many seconds to wait. Ignoring this and retrying immediately will extend your lockout.

## Common Patterns That Burn Through Limits

### 1. Polling Without Cursors

The most common mistake is repeatedly fetching the same endpoint to check for updates:

\`\`\`javascript
// Bad: Fetches everything every 2 seconds
setInterval(async () => {
  const res = await fetch(
    'https://horizon.stellar.org/accounts/GABC.../payments?limit=10&order=desc'
  );
  // process...
}, 2000);
\`\`\`

Instead, use cursors to only fetch new records:

\`\`\`javascript
// Good: Only fetches new payments since last check
let cursor = 'now';
setInterval(async () => {
  const res = await fetch(
    \`https://horizon.stellar.org/accounts/GABC.../payments?cursor=\${cursor}&order=asc&limit=50\`
  );
  const data = await res.json();
  for (const record of data._embedded.records) {
    cursor = record.paging_token;
    // process new record...
  }
}, 5000);
\`\`\`

### 2. Fetching Redundant Data

If your dashboard shows account balances, network stats, and recent transactions, do not fetch them all every 5 seconds. Different data has different freshness requirements:

| Data | Freshness Needed | Suggested Poll Interval |
|------|-----------------|------------------------|
| Account balances | Moderate | 30 seconds |
| Network ledger | High | 5 seconds |
| Fee stats | Low | 60 seconds |
| Transaction history | Low | 30 seconds |
| Asset list | Very low | 5 minutes |

### 3. N+1 Query Patterns

Fetching a list of items and then making an additional request for each one:

\`\`\`javascript
// Bad: 1 request + 10 detail requests = 11 requests
const txs = await fetch('.../transactions?limit=10');
for (const tx of txs) {
  const ops = await fetch(\`.../transactions/\${tx.hash}/operations\`);
}
\`\`\`

Batch your requests or use endpoints that embed related data.

## Building a Rate-Limit-Aware Client

\`\`\`javascript
class StellarClient {
  constructor(baseUrl, maxRetries = 3) {
    this.baseUrl = baseUrl;
    this.maxRetries = maxRetries;
    this.queue = [];
    this.processing = false;
  }

  async fetch(path) {
    for (let attempt = 0; attempt <= this.maxRetries; attempt++) {
      const res = await fetch(\`\${this.baseUrl}\${path}\`);

      if (res.status === 429) {
        const retryAfter = parseInt(res.headers.get('Retry-After') || '5');
        console.warn(\`Rate limited. Retrying in \${retryAfter}s\`);
        await new Promise(r => setTimeout(r, retryAfter * 1000));
        continue;
      }

      if (!res.ok) throw new Error(\`HTTP \${res.status}: \${res.statusText}\`);
      return res.json();
    }

    throw new Error('Max retries exceeded');
  }
}
\`\`\`

## Using a Cache Layer

Caching is the single most effective way to reduce API calls. Most Stellar data changes slowly:

\`\`\`javascript
const cache = new Map();

async function cachedFetch(url, ttlMs) {
  const cached = cache.get(url);
  if (cached && Date.now() - cached.time < ttlMs) {
    return cached.data;
  }

  const data = await fetch(url).then(r => r.json());
  cache.set(url, { data, time: Date.now() });
  return data;
}

// Usage
const feeStats = await cachedFetch(
  'https://horizon.stellar.org/fee_stats',
  60000 // cache for 60 seconds
);
\`\`\`

For production applications, use Redis instead of an in-memory Map. LumenQuery's API includes a built-in Redis cache layer with configurable TTLs per endpoint.

## Use SSE Instead of Polling

Horizon supports Server-Sent Events (SSE) for real-time streaming. One persistent connection replaces hundreds of polling requests:

\`\`\`javascript
// One connection, zero polling, instant updates
const es = new EventSource(
  'https://horizon.stellar.org/ledgers?cursor=now'
);

es.onmessage = (event) => {
  const ledger = JSON.parse(event.data);
  console.log('New ledger:', ledger.sequence);
};
\`\`\`

SSE is available for ledgers, transactions, operations, payments, effects, and order book changes.

## When to Upgrade from Public Endpoints

You need dedicated infrastructure when:

| Signal | Why It Matters |
|--------|---------------|
| You are hitting 429s regularly | Your users see errors |
| You need >5 req/s from one server | Backend aggregation |
| You need guaranteed uptime | Public endpoints have no SLA |
| You need faster response times | Public endpoints add latency |
| You need historical data access | Deep pagination is throttled |
| You are building for production | Rate limits will bite at scale |

## LumenQuery API Tiers

| Tier | Rate Limit | Price | Best For |
|------|-----------|-------|----------|
| Free | 10 req/min | $0 | Prototyping |
| Developer | 200 req/min | $25/mo | Side projects, MVPs |
| Team | 1,000 req/min | $99/mo | Production apps |
| Enterprise | Custom | Custom | High-throughput |

All tiers include built-in caching, usage analytics, and no cold starts.

## Architecture for High-Throughput Apps

For applications that need to process thousands of transactions per minute:

\`\`\`
Client requests → Your API → LumenQuery (cached) → Horizon/RPC
                      ↓
               Redis cache (30s-5min TTL)
                      ↓
               PostgreSQL (historical data)
\`\`\`

1. **Frontend** calls your API, never Horizon directly
2. **Your API** checks Redis cache first
3. **Cache miss** goes to LumenQuery (which has its own cache)
4. **Background jobs** pre-warm caches for common queries
5. **Historical data** is stored in your own database

This pattern can handle tens of thousands of concurrent users with a single LumenQuery Team plan.

## Testing Rate Limit Behavior

Before going to production, simulate rate limit scenarios:

\`\`\`javascript
async function testRateLimits() {
  const results = [];
  for (let i = 0; i < 20; i++) {
    const start = Date.now();
    const res = await fetch('https://horizon.stellar.org/ledgers?limit=1');
    results.push({
      attempt: i + 1,
      status: res.status,
      latencyMs: Date.now() - start,
    });
  }

  const limited = results.filter(r => r.status === 429);
  console.log(\`Hit rate limit after \${results.length - limited.length} requests\`);
  console.log(\`\${limited.length} requests were throttled\`);
}
\`\`\`

## Summary

| Strategy | Impact |
|----------|--------|
| Use cursors instead of re-fetching | 80-90% fewer requests |
| Cache with appropriate TTLs | 50-80% fewer requests |
| Use SSE for real-time data | Eliminates polling entirely |
| Batch related queries | 60-70% fewer requests |
| Use managed API with higher limits | Removes the ceiling |

The goal is not to fight rate limits — it is to design your application so that they never matter.

## Related Resources

- [Stellar API Rate Limits](/stellar-api-rate-limits) — Understand rate limits across tiers and how to choose the right plan
- [Stellar Horizon API](/stellar-horizon-api) — Production-ready Horizon API access with built-in caching
- [Stellar RPC Provider](/stellar-rpc-provider) — Managed Soroban RPC infrastructure for smart contract apps

---

*Stop fighting rate limits. [LumenQuery](/auth/signup) provides managed Stellar API access with generous rate limits, built-in caching, and usage analytics. Start with the free tier.*
    `,
  },
  'track-token-velocity-stellar-stablecoins-rwa': {
    title: 'How to Track Token Velocity on Stellar for Stablecoins and RWAs',
    date: '2026-06-08',
    readTime: '12 min read',
    category: 'Developer Guide',
    content: `
Token velocity measures how frequently an asset changes hands over a given period. It is one of the most revealing metrics for understanding whether a token is being actively used in commerce and settlement — or just sitting in wallets waiting for a price move. For stablecoins like USDC on Stellar and tokenized real-world assets (RWAs), velocity is a direct indicator of product-market fit.

## What Token Velocity Is

Token velocity is calculated as:

**Velocity = Transaction Volume / Average Supply in Circulation**

If a stablecoin has 100 million tokens in circulation and 500 million in transaction volume over a month, the velocity is 5.0. That means each token changed hands an average of 5 times during the period.

| Velocity | What It Means |
|----------|---------------|
| < 1.0 | Token is mostly held, low usage |
| 1.0 - 5.0 | Moderate usage, healthy for store-of-value assets |
| 5.0 - 20.0 | Active usage, typical for payment stablecoins |
| > 20.0 | Very high turnover, common for settlement tokens |

## Why It Matters for Stablecoins

Stablecoins are designed to be spent, not held. A USDC token sitting in a wallet for months is not doing its job. High velocity means the stablecoin is being used for:

- Cross-border remittances
- Merchant payments
- DeFi settlement
- Treasury management

On Stellar, USDC has over 2.1 million holders. But how many of them are actively transacting? Velocity answers that question.

## Why It Matters for RWAs

Real-world assets on Stellar — tokenized treasury bills, bonds, real estate tokens — have a different velocity profile. You expect lower velocity (these are investment instruments), but zero velocity is a red flag:

- **Zero velocity**: No secondary market activity, possibly illiquid
- **Low velocity (0.1 - 1.0)**: Normal for long-term holdings like bonds
- **Higher velocity**: Indicates active secondary market trading

## Fetching Payment Data from Horizon

To calculate velocity, you need two things: transaction volume and circulating supply. Start with payments:

\`\`\`javascript
const HORIZON = 'https://horizon.stellar.org';

async function getPaymentVolume(assetCode, assetIssuer, hours = 24) {
  const cutoff = new Date(Date.now() - hours * 60 * 60 * 1000);
  let totalVolume = 0;
  let paymentCount = 0;
  let url = \`\${HORIZON}/payments?order=desc&limit=200\`;

  while (url) {
    const res = await fetch(url);
    const data = await res.json();
    const records = data._embedded.records;

    let reachedCutoff = false;
    for (const record of records) {
      if (new Date(record.created_at) < cutoff) {
        reachedCutoff = true;
        break;
      }

      if (
        record.type === 'payment' &&
        record.asset_code === assetCode &&
        record.asset_issuer === assetIssuer
      ) {
        totalVolume += parseFloat(record.amount);
        paymentCount++;
      }
    }

    if (reachedCutoff || records.length < 200) break;
    url = data._links?.next?.href;
  }

  return { totalVolume, paymentCount, periodHours: hours };
}
\`\`\`

## Fetching Circulating Supply

For Stellar assets, the circulating supply is the total amount issued minus what the issuer holds:

\`\`\`javascript
async function getCirculatingSupply(assetCode, assetIssuer) {
  const res = await fetch(
    \`\${HORIZON}/assets?asset_code=\${assetCode}&asset_issuer=\${assetIssuer}\`
  );
  const data = await res.json();
  const asset = data._embedded.records[0];

  if (!asset) return null;

  const totalSupply = parseFloat(asset.amount);
  const numAccounts = asset.num_accounts;

  // Get issuer balance to calculate circulating supply
  const issuerRes = await fetch(\`\${HORIZON}/accounts/\${assetIssuer}\`);
  const issuer = await issuerRes.json();
  const issuerBalance = issuer.balances.find(
    b => b.asset_code === assetCode && b.asset_issuer === assetIssuer
  );
  const issuerHeld = issuerBalance ? parseFloat(issuerBalance.balance) : 0;

  return {
    totalSupply,
    issuerHeld,
    circulating: totalSupply - issuerHeld,
    holders: numAccounts,
  };
}
\`\`\`

## Calculating Velocity

\`\`\`javascript
async function calculateVelocity(assetCode, assetIssuer, periodHours = 24) {
  const [volume, supply] = await Promise.all([
    getPaymentVolume(assetCode, assetIssuer, periodHours),
    getCirculatingSupply(assetCode, assetIssuer),
  ]);

  if (!supply || supply.circulating === 0) {
    return { error: 'Cannot calculate — zero circulating supply' };
  }

  const annualizedVolume = volume.totalVolume * (8760 / periodHours);
  const velocity = annualizedVolume / supply.circulating;

  return {
    asset: \`\${assetCode}:\${assetIssuer.slice(0, 4)}...\${assetIssuer.slice(-4)}\`,
    periodHours,
    transactionVolume: volume.totalVolume,
    paymentCount: volume.paymentCount,
    circulatingSupply: supply.circulating,
    holders: supply.holders,
    annualizedVelocity: Math.round(velocity * 100) / 100,
  };
}
\`\`\`

## Tracking Velocity Over Time

To see trends, store daily snapshots and compare:

\`\`\`javascript
async function trackVelocityTrend(assetCode, assetIssuer, days = 7) {
  const snapshots = [];

  for (let i = 0; i < days; i++) {
    const offsetHours = i * 24;
    // In production, you would query historical data from your database
    // This simplified version shows the concept
    const velocity = await calculateVelocity(assetCode, assetIssuer, 24);
    snapshots.push({
      date: new Date(Date.now() - offsetHours * 60 * 60 * 1000).toISOString().split('T')[0],
      velocity: velocity.annualizedVelocity,
      volume: velocity.transactionVolume,
      payments: velocity.paymentCount,
    });
  }

  return snapshots;
}
\`\`\`

## Interpreting Velocity for Specific Asset Types

### USDC on Stellar

USDC is the most liquid stablecoin on Stellar. Expect high velocity driven by:
- MoneyGram remittance flows
- DEX trading pairs
- DeFi settlement

A sudden velocity drop could indicate a shift in remittance corridors or reduced DEX activity.

### Tokenized Treasury Bills

Assets like Franklin Templeton's BENJI have low velocity by design. These are buy-and-hold instruments. Watch for:
- Velocity spikes around maturity dates
- Gradual increase as secondary markets develop
- Zero velocity on new issuances (holders are waiting)

### Euro Stablecoins (EURC, EURAU)

Euro-denominated stablecoins on Stellar target European settlement. Velocity patterns follow business hours and payment cycles. Expect higher velocity on weekdays and lower on weekends.

## Building a Velocity Dashboard

Combine the above functions into a monitoring dashboard:

\`\`\`javascript
async function buildVelocityDashboard() {
  const assets = [
    { code: 'USDC', issuer: 'GA5ZSEJYB37JRC5AVCIA5MOP4RHTM335X2KGX3IHOJAPP5RE34K4KZVN' },
    { code: 'yXLM', issuer: 'GARDNV3Q7YGT4MASTV2SUDBOMUQTTSKZYA2FKYWP45HJRYSALIDNGGEH' },
    // Add more assets as needed
  ];

  const results = await Promise.all(
    assets.map(a => calculateVelocity(a.code, a.issuer, 24))
  );

  return results.sort((a, b) => b.annualizedVelocity - a.annualizedVelocity);
}
\`\`\`

## Using LumenQuery Analytics

The [LumenQuery Analytics dashboard](/analytics/tokens) tracks token velocity, whale movements, and issuer risk for all Stellar assets. It pre-computes velocity metrics with Redis caching so you do not need to paginate through thousands of payment records yourself.

The \`/api/analytics/tokens\` endpoint returns:
- Payment volume and velocity for top assets
- Whale activity (transfers > 100,000 XLM)
- Issuer risk scores
- Historical volume charts

## Alerts Based on Velocity Changes

Set up alerts for velocity anomalies:

\`\`\`javascript
function checkVelocityAlert(current, previous, threshold = 0.5) {
  if (!previous) return null;

  const change = (current - previous) / previous;

  if (change > threshold) {
    return { type: 'spike', change: \`+\${(change * 100).toFixed(0)}%\`, message: 'Unusual velocity increase' };
  }

  if (change < -threshold) {
    return { type: 'drop', change: \`\${(change * 100).toFixed(0)}%\`, message: 'Significant velocity decrease' };
  }

  return null;
}
\`\`\`

A 50% spike in velocity for a stablecoin could mean a major remittance corridor opened up. A 50% drop could indicate a liquidity problem or a migration to a different asset.

## Next Steps

- Explore the [LumenQuery Token Analytics](/analytics/tokens) dashboard for live velocity data
- Read about [whale tracking](/blog/xlm-price-prediction-whale-accumulation) and large transfer monitoring
- Check the [API documentation](/docs/analytics) for detailed endpoint reference

## Related Resources

- [Stellar Blockchain Analytics API](/stellar-blockchain-analytics-api) — Pre-built analytics for token velocity and network metrics
- [XLM Whale Alerts](/xlm-whale-alerts) — Track large XLM transfers and whale movements in real time
- [Stellar Transaction Monitoring](/stellar-transaction-monitoring) — Monitor payment flows across the Stellar network

---

*Track token velocity without building infrastructure from scratch. [LumenQuery](/auth/signup) provides pre-computed analytics with caching, so you can focus on insights instead of pagination. Start free.*
    `,
  },
  'building-compliance-friendly-stellar-apps': {
    title: 'Building Compliance-Friendly Stellar Apps: Logging, Auditing, and Transaction Traceability',
    date: '2026-06-08',
    readTime: '14 min read',
    category: 'Developer Guide',
    content: `
If you are building a fintech application, an exchange, or a tokenized asset platform on Stellar, compliance is not something you bolt on later. Regulators want to see that your application was designed with traceability, auditability, and record-keeping from day one. Stellar's architecture makes this easier than most blockchains — every transaction is public, deterministic, and final within seconds. But you still need to build the right logging and audit infrastructure on your side.

## Why Stellar Is Compliance-Friendly by Design

Stellar has several properties that regulators and compliance teams appreciate:

| Property | Why It Helps |
|----------|-------------|
| **Deterministic finality** | A settled transaction is final. No chain reorganizations. No waiting for block confirmations. |
| **Account-based model** | Every account has a known public key. Easier to track than UTXO models. |
| **Built-in asset controls** | Issuers can require authorization, freeze accounts, and clawback tokens. |
| **Memo field** | Attach reference IDs, customer identifiers, or compliance tags to every transaction. |
| **Low fees** | Sub-cent transaction costs make detailed logging economically feasible. |
| **Public ledger** | All transactions are auditable by anyone with a Horizon node. |

## The Three Pillars of Compliance Logging

### 1. Transaction Logging

Every transaction your application sends or receives should be logged with:

\`\`\`javascript
const transactionLog = {
  // Blockchain data
  txHash: 'abc123...',
  ledger: 61500000,
  timestamp: '2026-06-08T14:30:00Z',
  successful: true,
  feeCharged: 100,

  // Application data
  internalId: 'PAY-2026-00142',
  customerId: 'USR-789',
  purpose: 'remittance',
  complianceStatus: 'cleared',

  // Counterparty data
  sourceAccount: 'GABC...',
  destinationAccount: 'GXYZ...',
  amount: '1000.00',
  asset: 'USDC',

  // Audit metadata
  initiatedBy: 'api-user-456',
  approvedBy: 'compliance-officer-12',
  ipAddress: '192.168.1.100',
  userAgent: 'MyApp/2.1',
};
\`\`\`

### 2. Audit Trail

An audit trail records who did what, when, and why. It must be append-only — entries can never be modified or deleted:

\`\`\`javascript
async function logAuditEntry(entry) {
  const record = {
    id: generateUUID(),
    timestamp: new Date().toISOString(),
    actor: entry.actor,
    action: entry.action,
    target: entry.target,
    details: entry.details,
    ipAddress: entry.ipAddress,
    // Hash chain for tamper detection
    previousHash: await getLastAuditHash(),
    hash: null,
  };

  record.hash = await computeHash(
    record.previousHash +
    record.timestamp +
    record.actor +
    record.action +
    JSON.stringify(record.details)
  );

  await db.auditLog.create({ data: record });
  return record;
}
\`\`\`

The hash chain ensures that if any entry is tampered with, the chain breaks and the modification is detectable.

### 3. Transaction Traceability

Regulators need to trace the full lifecycle of a payment:

\`\`\`
Customer request → KYC check → Compliance screening → Transaction built →
Transaction signed → Transaction submitted → Ledger inclusion →
Confirmation → Settlement record → Reporting
\`\`\`

Each step should have a timestamp and a reference to the previous step.

## Implementing Transaction Logging

### Capturing Transactions from Horizon

\`\`\`javascript
async function logIncomingTransaction(txHash) {
  const tx = await fetch(\`\${HORIZON}/transactions/\${txHash}\`).then(r => r.json());
  const ops = await fetch(\`\${HORIZON}/transactions/\${txHash}/operations\`).then(r => r.json());

  const logEntry = {
    txHash: tx.hash,
    ledger: tx.ledger,
    timestamp: tx.created_at,
    successful: tx.successful,
    fee: parseInt(tx.fee_charged),
    memo: tx.memo || null,
    memoType: tx.memo_type,
    sourceAccount: tx.source_account,
    operations: ops._embedded.records.map(op => ({
      type: op.type,
      amount: op.amount,
      asset: op.asset_type === 'native' ? 'XLM' : op.asset_code,
      from: op.from,
      to: op.to,
    })),
    capturedAt: new Date().toISOString(),
  };

  await db.transactionLog.create({ data: logEntry });
  return logEntry;
}
\`\`\`

### Streaming for Real-Time Capture

Do not rely on periodic polling for compliance-critical logging. Use SSE streaming to capture every transaction as it happens:

\`\`\`javascript
function startComplianceStream(accountId) {
  const es = new EventSource(
    \`\${HORIZON}/accounts/\${accountId}/transactions?cursor=now\`
  );

  es.onmessage = async (event) => {
    const tx = JSON.parse(event.data);
    await logIncomingTransaction(tx.hash);
    await runComplianceChecks(tx);
  };

  es.onerror = () => {
    console.error('Stream disconnected, reconnecting...');
    setTimeout(() => startComplianceStream(accountId), 5000);
  };
}
\`\`\`

## Using Stellar's Built-In Compliance Tools

### Memo Field for Reference IDs

The memo field lets you attach a reference to every transaction. This is critical for matching on-chain activity to off-chain records:

\`\`\`javascript
// When building a payment transaction
const transaction = new StellarSdk.TransactionBuilder(account, {
  fee: '100',
  networkPassphrase: StellarSdk.Networks.PUBLIC,
})
  .addOperation(StellarSdk.Operation.payment({
    destination: recipientId,
    asset: StellarSdk.Asset.native(),
    amount: '1000',
  }))
  .addMemo(StellarSdk.Memo.text('PAY-2026-00142'))
  .setTimeout(30)
  .build();
\`\`\`

Use structured memo formats:
- \`PAY-{year}-{sequence}\` for payments
- \`WDR-{year}-{sequence}\` for withdrawals
- \`TRF-{year}-{sequence}\` for internal transfers

### Authorization Flags

For tokenized assets that require compliance, use Stellar's authorization flags:

| Flag | Effect |
|------|--------|
| \`AUTH_REQUIRED\` | Accounts must be approved before holding the asset |
| \`AUTH_REVOCABLE\` | Issuer can revoke authorization (freeze) |
| \`AUTH_CLAWBACK_ENABLED\` | Issuer can claw back tokens |
| \`AUTH_IMMUTABLE\` | Flags cannot be changed (locks the configuration) |

For regulated assets, \`AUTH_REQUIRED\` + \`AUTH_REVOCABLE\` + \`AUTH_CLAWBACK_ENABLED\` gives you full control. You approve accounts after KYC, freeze accounts under investigation, and clawback tokens if required by a court order.

## Building a Compliance Report

Regulators typically want periodic reports showing:

\`\`\`javascript
async function generateComplianceReport(startDate, endDate) {
  const transactions = await db.transactionLog.findMany({
    where: {
      timestamp: { gte: startDate, lte: endDate },
    },
    orderBy: { timestamp: 'asc' },
  });

  return {
    period: { start: startDate, end: endDate },
    summary: {
      totalTransactions: transactions.length,
      successfulTransactions: transactions.filter(t => t.successful).length,
      failedTransactions: transactions.filter(t => !t.successful).length,
      totalVolume: transactions.reduce((sum, t) =>
        sum + t.operations.reduce((s, op) => s + parseFloat(op.amount || '0'), 0), 0),
      uniqueAccounts: new Set(transactions.flatMap(t =>
        t.operations.flatMap(op => [op.from, op.to].filter(Boolean))
      )).size,
    },
    flaggedTransactions: transactions.filter(t => t.complianceStatus === 'flagged'),
    transactions: transactions.map(t => ({
      hash: t.txHash,
      time: t.timestamp,
      amount: t.operations[0]?.amount,
      asset: t.operations[0]?.asset,
      from: t.sourceAccount,
      memo: t.memo,
      status: t.complianceStatus,
    })),
  };
}
\`\`\`

## Database Schema for Compliance

\`\`\`sql
CREATE TABLE transaction_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tx_hash VARCHAR(64) UNIQUE NOT NULL,
  ledger BIGINT NOT NULL,
  timestamp TIMESTAMPTZ NOT NULL,
  successful BOOLEAN NOT NULL,
  fee_charged INTEGER,
  memo TEXT,
  memo_type VARCHAR(20),
  source_account VARCHAR(56) NOT NULL,
  operations JSONB NOT NULL,
  internal_id VARCHAR(50),
  customer_id VARCHAR(50),
  compliance_status VARCHAR(20) DEFAULT 'pending',
  captured_at TIMESTAMPTZ DEFAULT NOW(),
  INDEX idx_timestamp (timestamp),
  INDEX idx_source (source_account),
  INDEX idx_customer (customer_id),
  INDEX idx_compliance (compliance_status)
);

CREATE TABLE audit_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  actor VARCHAR(100) NOT NULL,
  action VARCHAR(50) NOT NULL,
  target VARCHAR(100),
  details JSONB,
  ip_address VARCHAR(45),
  previous_hash VARCHAR(64),
  hash VARCHAR(64) NOT NULL,
  INDEX idx_audit_time (timestamp),
  INDEX idx_audit_actor (actor)
);
\`\`\`

## Retention Policies

Different jurisdictions have different retention requirements:

| Jurisdiction | Minimum Retention |
|-------------|-------------------|
| US (BSA/AML) | 5 years |
| EU (AMLD6) | 5 years after relationship ends |
| UK (MLR 2017) | 5 years |
| Singapore (PSOA) | 5 years |

Design your database with partitioning by date so you can efficiently manage retention:

\`\`\`sql
-- Partition by year for efficient retention management
CREATE TABLE transaction_log (
  ...
) PARTITION BY RANGE (timestamp);

CREATE TABLE transaction_log_2026 PARTITION OF transaction_log
  FOR VALUES FROM ('2026-01-01') TO ('2027-01-01');
\`\`\`

## Integrating with LumenQuery

LumenQuery's [Transaction Intelligence](/intelligence) and [Analytics](/analytics) features provide pre-built compliance infrastructure:

- **Real-time transaction monitoring** with SSE streaming
- **Account profiling** and classification
- **Watchlist management** for monitored accounts
- **Alert system** for suspicious activity patterns
- **Audit logging** with hash chain verification

These features are designed for the exact use cases described in this article — saving you months of development time.

## Best Practices

1. **Log before you transact**: Write the intent to your audit log before submitting the transaction. If the transaction fails, you have a record of the attempt.

2. **Never delete logs**: Use soft deletes or retention policies. Compliance officers need the complete picture.

3. **Hash chain your audit log**: A simple hash chain makes tampering detectable without the complexity of a separate blockchain.

4. **Use structured memos**: A consistent memo format lets you join on-chain and off-chain records reliably.

5. **Monitor in real time**: Batch processing is not sufficient for compliance. Use SSE streaming to catch issues as they happen.

6. **Separate compliance data from application data**: Compliance logs should be in a separate database or schema with restricted access and its own backup schedule.

## Next Steps

- Explore the [LumenQuery API Documentation](/docs) for endpoint details
- Check the [Transaction Intelligence](/intelligence) dashboard for real-time monitoring
- Read about [Stellar's regulatory positioning](/blog/stellar-regulatory-clarity-bullish-xlm)

---

*Build compliance into your Stellar application from day one. [LumenQuery](/auth/signup) provides the API infrastructure, transaction monitoring, and audit tools that regulated businesses need. Start free.*
    `,
  },
  'build-stellar-payment-dashboard-horizon-api': {
    title: 'How to Build a Stellar Payment Dashboard Using Horizon API Data',
    date: '2026-06-05',
    readTime: '12 min read',
    category: 'Developer Guide',
    content: `
A payment dashboard is one of the most practical things you can build on Stellar. It shows account balances, tracks incoming and outgoing payments, displays transaction status, and gives users visibility into their on-chain activity. This tutorial walks through building one using the Horizon API.

## What We Are Building

A dashboard that displays:
1. **Account balances** — XLM and all trusted assets
2. **Payment history** — recent incoming and outgoing payments with amounts, assets, and timestamps
3. **Transaction status** — success/failure indicators with fee and ledger info
4. **Ledger info** — current network state

## Fetching Account Balances

The \`/accounts/{id}\` endpoint returns everything about an account in a single call:

\`\`\`javascript
const HORIZON = 'https://horizon.stellar.org';

async function getAccountData(accountId) {
  const res = await fetch(\`\${HORIZON}/accounts/\${accountId}\`);
  if (res.status === 404) return { error: 'Account not found or not funded' };
  const account = await res.json();

  return {
    id: account.account_id,
    sequence: account.sequence,
    balances: account.balances.map(b => ({
      asset: b.asset_type === 'native' ? 'XLM' : \`\${b.asset_code}\`,
      balance: parseFloat(b.balance),
      issuer: b.asset_issuer || null,
    })),
    signers: account.signers.length,
    subentries: account.subentry_count,
    homeDomain: account.home_domain || null,
  };
}
\`\`\`

### Displaying Balances

\`\`\`javascript
function renderBalances(balances) {
  return balances
    .sort((a, b) => b.balance - a.balance)
    .map(b => \`\${b.asset}: \${b.balance.toLocaleString()}\`)
    .join('\\n');
}
\`\`\`

## Fetching Payment History

The \`/accounts/{id}/payments\` endpoint returns all payment-type operations:

\`\`\`javascript
async function getPayments(accountId, limit = 20) {
  const res = await fetch(
    \`\${HORIZON}/accounts/\${accountId}/payments?limit=\${limit}&order=desc\`
  );
  const data = await res.json();

  return data._embedded.records.map(p => ({
    id: p.id,
    type: p.type,
    createdAt: p.created_at,
    amount: p.amount,
    asset: p.asset_type === 'native' ? 'XLM' : p.asset_code,
    from: p.from,
    to: p.to,
    direction: p.to === accountId ? 'incoming' : 'outgoing',
    transactionHash: p.transaction_hash,
  }));
}
\`\`\`

This gives you the data to render a payment feed with direction indicators, amounts, and timestamps.

## Fetching Transaction Details

For each payment, you can fetch the full transaction to show status and fees:

\`\`\`javascript
async function getTransaction(hash) {
  const res = await fetch(\`\${HORIZON}/transactions/\${hash}\`);
  const tx = await res.json();

  return {
    hash: tx.hash,
    ledger: tx.ledger,
    successful: tx.successful,
    feeCharged: parseInt(tx.fee_charged),
    operationCount: tx.operation_count,
    memo: tx.memo || null,
    memoType: tx.memo_type,
    createdAt: tx.created_at,
  };
}
\`\`\`

## Fetching Current Ledger Info

Show the user what is happening on the network right now:

\`\`\`javascript
async function getNetworkStatus() {
  const [ledgerRes, feeRes] = await Promise.all([
    fetch(\`\${HORIZON}/ledgers?limit=1&order=desc\`),
    fetch(\`\${HORIZON}/fee_stats\`),
  ]);

  const ledger = (await ledgerRes.json())._embedded.records[0];
  const fees = await feeRes.json();

  return {
    currentLedger: ledger.sequence,
    closedAt: ledger.closed_at,
    transactionCount: ledger.successful_transaction_count,
    baseFee: parseInt(fees.fee_charged.min),
    protocolVersion: ledger.protocol_version,
  };
}
\`\`\`

## Putting It Together

\`\`\`javascript
async function buildDashboard(accountId) {
  const [account, payments, network] = await Promise.all([
    getAccountData(accountId),
    getPayments(accountId, 10),
    getNetworkStatus(),
  ]);

  console.log('=== Account ===');
  console.log(\`ID: \${account.id}\`);
  account.balances.forEach(b =>
    console.log(\`  \${b.asset}: \${b.balance.toLocaleString()}\`)
  );

  console.log('\\n=== Recent Payments ===');
  payments.forEach(p =>
    console.log(\`  \${p.direction === 'incoming' ? '←' : '→'} \${p.amount} \${p.asset} (\${p.createdAt})\`)
  );

  console.log('\\n=== Network ===');
  console.log(\`  Ledger: #\${network.currentLedger}\`);
  console.log(\`  TXs in last ledger: \${network.transactionCount}\`);
  console.log(\`  Base fee: \${network.baseFee} stroops\`);
}
\`\`\`

## Auto-Refreshing

Poll for new payments using cursors:

\`\`\`javascript
async function pollPayments(accountId, onNewPayment) {
  let cursor = 'now';
  setInterval(async () => {
    const res = await fetch(
      \`\${HORIZON}/accounts/\${accountId}/payments?cursor=\${cursor}&order=asc&limit=50\`
    );
    const data = await res.json();
    for (const payment of data._embedded.records) {
      onNewPayment(payment);
      cursor = payment.paging_token;
    }
  }, 5000);
}
\`\`\`

## Next Steps

- Add WebSocket-style streaming using Horizon's SSE support
- Integrate with the [LumenQuery Live Transaction Viewer](/dashboard/transactions) for decoded operations
- Use [Network Analytics](/analytics) for TPS and fee trends

## Related Resources

- [Stellar Horizon API](/stellar-horizon-api) — Managed Horizon API for payment dashboards and account queries
- [Stellar API Provider Comparison](/stellar-api-provider-comparison) — Evaluate providers for your payment infrastructure
- [Stellar Transaction Monitoring](/stellar-transaction-monitoring) — Real-time payment monitoring tools

---

*Build your payment dashboard on reliable infrastructure. [LumenQuery](/auth/signup) provides managed Horizon API with sub-100ms response times. Start free.*
    `,
  },
  'what-is-soroban-rpc-stellar-smart-contracts': {
    title: 'What Is Soroban RPC and Why It Matters for Stellar Smart Contracts',
    date: '2026-06-05',
    readTime: '9 min read',
    category: 'Developer Guide',
    content: `
Soroban is Stellar's smart contract platform. The Soroban RPC (now called Stellar RPC) is how you interact with it — deploying contracts, invoking functions, reading storage, and monitoring events. If you are new to Stellar smart contracts, this article explains what the RPC does and why you need it.

## What Soroban RPC Is

Soroban RPC is a JSON-RPC server that provides access to the current state of the Stellar network and smart contracts. Unlike Horizon, which indexes historical data into a database, the RPC gives you direct access to the live ledger.

Think of it this way:
- **Horizon** = Database that stores everything that ever happened on Stellar
- **Soroban RPC** = Live window into the current state of the network and smart contracts

## Core RPC Methods

| Method | What It Does |
|--------|-------------|
| \`getLatestLedger\` | Returns current ledger sequence and protocol version |
| \`simulateTransaction\` | Dry-runs a transaction — shows result, fees, and resource usage |
| \`sendTransaction\` | Submits a signed transaction to the network |
| \`getTransaction\` | Checks status of a submitted transaction |
| \`getEvents\` | Queries smart contract events by topic, contract, or ledger range |
| \`getLedgerEntries\` | Reads specific ledger entries (contract storage, account data) |
| \`getHealth\` | Returns RPC server health status |
| \`getNetwork\` | Returns network passphrase and protocol info |

## Why You Need It

### 1. Transaction Simulation

Before you submit any Soroban transaction, you should simulate it. Simulation tells you:
- Will this transaction succeed or fail?
- How much will it cost in fees and resources?
- What state changes will it make?

\`\`\`json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "simulateTransaction",
  "params": {
    "transaction": "AAAAAgAAAAB..."
  }
}
\`\`\`

Without simulation, you are guessing at resource limits and fees — which means either overpaying or having transactions rejected.

### 2. Contract Storage Access

Want to read the current state of a smart contract? That is RPC territory:

\`\`\`json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "getLedgerEntries",
  "params": {
    "keys": ["AAAAAAAAAA..."]
  }
}
\`\`\`

Horizon does not understand Soroban contract internals. Only the RPC can read contract storage.

### 3. Event Monitoring

Smart contracts emit events when important things happen. The RPC lets you query these:

\`\`\`json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "getEvents",
  "params": {
    "startLedger": 61000000,
    "filters": [{
      "type": "contract",
      "contractIds": ["CDLZFC3S..."],
      "topics": [["*"]]
    }]
  }
}
\`\`\`

This is how you build reactive applications that respond to on-chain contract activity.

## Horizon vs Soroban RPC

| Need | Use |
|------|-----|
| Account balances | Horizon |
| Transaction history | Horizon |
| Payment tracking | Horizon |
| Asset listing | Horizon |
| Order book | Horizon |
| Submit Soroban transactions | **RPC** |
| Simulate transactions | **RPC** |
| Read contract storage | **RPC** |
| Monitor contract events | **RPC** |
| Get current ledger state | **RPC** |

Most apps need both. Horizon for historical reads, RPC for contract interaction and transaction submission.

## Running Your Own vs Managed

Running your own Soroban RPC requires Captive Core, monitoring, and maintenance. A managed service like LumenQuery handles all of that.

- **[Soroban RPC docs](/docs/contracts)**: Complete method reference
- **[Smart Contract Explorer](/contracts)**: Decoded contract data, events, and storage
- **[Deploy Contracts](/contracts/deploy)**: Deploy from your browser with Freighter

## Related Resources

- [Soroban RPC API](/soroban-rpc-api) — Full Soroban RPC method reference and infrastructure
- [Stellar RPC Provider](/stellar-rpc-provider) — Managed RPC infrastructure for contract interaction
- [Stellar API Provider Comparison](/stellar-api-provider-comparison) — Compare Soroban RPC access across providers

---

*Interact with Soroban smart contracts on reliable infrastructure. [LumenQuery](/auth/signup) provides managed Stellar RPC — start free.*
    `,
  },
  'stellar-stablecoin-payments-low-fees-fast-settlement': {
    title: 'Stellar for Stablecoin Payments: Why Low Fees and Fast Settlement Matter',
    date: '2026-06-05',
    readTime: '10 min read',
    category: 'Industry Insights',
    content: `
USDC on Stellar has over 2.1 million holder accounts. MoneyGram uses Stellar to settle stablecoin remittances across 200+ countries. The MiCAR-compliant EURAU stablecoin launched on Stellar for European settlement. This is not a testnet experiment — it is production-grade payment infrastructure processing real money.

## Why Stablecoins on Stellar Work

### Transaction Costs

A Stellar transaction costs approximately 0.00001 XLM — a fraction of a cent. Compare this across networks:

| Network | Transfer Cost | Settlement Time |
|---------|-------------|-----------------|
| **Stellar** | ~$0.00001 | 5-6 seconds |
| **Ethereum** | $2-50 | 12-60 seconds |
| **Solana** | ~$0.00025 | 400ms |
| **Tron** | ~$1 | 3 seconds |
| **SWIFT** | $15-50 | 1-5 days |

For payment applications processing thousands of small transactions, the fee difference between Stellar and Ethereum is not an optimization — it determines whether the business model works.

### Settlement Finality

Stellar ledgers close every 5-6 seconds with absolute finality. No reorgs, no probabilistic finality, no waiting for confirmations. When a payment is in a ledger, it is settled.

For a remittance company, this means the recipient can access funds in seconds rather than days.

### Compliance at the Protocol Level

Stablecoin issuers need compliance controls. Stellar provides these at the protocol level:

- **Authorization Required**: Issuer must approve each holder
- **Freeze**: Issuer can freeze a holder's balance
- **Clawback**: Issuer can recover tokens for regulatory enforcement

Circle uses these features for USDC on Stellar.

## Real-World Stablecoin Use Cases on Stellar

### Cross-Border Remittances (MoneyGram)

MoneyGram's stablecoin service works like this:
1. Sender deposits local currency at a MoneyGram location
2. Funds are converted to USDC on Stellar
3. USDC transfers to the recipient's local agent in seconds
4. Recipient withdraws in local currency

Cost: A fraction of traditional remittance fees. Speed: Minutes, not days.

### Institutional Settlement

Franklin Templeton, Mercado Bitcoin, and RedSwan all use Stellar for institutional settlement. Stablecoins are the settlement currency — assets are priced in USD, and USDC handles the actual value transfer.

### European Payments (EURAU)

The EURAU stablecoin launched on Stellar with full MiCAR compliance for European settlement. This opens euro-denominated payment corridors using the same low-fee, fast-settlement infrastructure.

## The USDC Ecosystem on Stellar

| Metric | Value |
|--------|-------|
| **Holders** | 2.1M+ accounts |
| **Circulation** | $240M+ |
| **Issuer** | Circle (GA5ZSEJYB37...) |
| **Daily volume** | Significant (billions annually) |

### Why Circle Chose Stellar

Circle maintains USDC on multiple chains. Stellar is a primary chain because:
- Low fees make micropayments practical
- Fast finality matches real-world payment expectations
- Built-in compliance controls meet regulatory requirements
- Established anchor network provides on/off ramps globally

## Building Stablecoin Payment Apps

If you are building a payment application on Stellar, LumenQuery provides the infrastructure:

- **[Horizon API](/docs)**: Track payments, balances, and transaction history
- **[Live Transactions](/dashboard/transactions)**: Watch payments stream in real time
- **[Network Analytics](/analytics)**: Monitor network throughput and fees

---

*Build stablecoin payment applications on Stellar. [LumenQuery](/auth/signup) provides managed Horizon API and Soroban RPC — start free.*
    `,
  },
  'track-live-stellar-transactions-real-time': {
    title: 'How to Track Live Stellar Transactions in Real Time',
    date: '2026-06-05',
    readTime: '10 min read',
    category: 'Developer Guide',
    content: `
Stellar processes 5-10 million transactions per day. If you are building a payment app, monitoring tool, or analytics dashboard, you need to see these transactions as they happen. This guide covers three approaches: cursor-based polling, Server-Sent Events (SSE), and the LumenQuery live transaction viewer.

## Approach 1: Cursor-Based Polling

The simplest method — poll Horizon with a cursor to get only new transactions:

\`\`\`javascript
const HORIZON = 'https://horizon.stellar.org';

async function streamTransactions(onTransaction) {
  // Get starting cursor
  const initial = await fetch(\`\${HORIZON}/transactions?limit=1&order=desc\`);
  const data = await initial.json();
  let cursor = data._embedded.records[0].paging_token;

  // Poll every 5 seconds
  setInterval(async () => {
    try {
      const res = await fetch(
        \`\${HORIZON}/transactions?cursor=\${cursor}&order=asc&limit=100\`
      );
      const batch = await res.json();
      for (const tx of batch._embedded.records) {
        onTransaction(tx);
        cursor = tx.paging_token;
      }
    } catch (err) {
      console.error('Poll error:', err.message);
    }
  }, 5000);
}

streamTransactions((tx) => {
  console.log(\`TX \${tx.hash.slice(0, 8)}... | \${tx.operation_count} ops | fee: \${tx.fee_charged}\`);
});
\`\`\`

### Pros and Cons
- **Pro**: Simple, works everywhere, no special dependencies
- **Con**: 5-second delay between polls, uses more API calls

## Approach 2: Horizon SSE Streaming

Horizon supports Server-Sent Events for real-time streaming:

\`\`\`javascript
const EventSource = require('eventsource');

const es = new EventSource(
  \`\${HORIZON}/transactions?cursor=now&order=asc\`
);

es.onmessage = (event) => {
  const tx = JSON.parse(event.data);
  console.log(\`TX \${tx.hash.slice(0, 8)}... | ledger \${tx.ledger}\`);
};

es.onerror = (err) => {
  console.error('SSE error, reconnecting...');
};
\`\`\`

### Filtering by Account

Stream only transactions for a specific account:

\`\`\`javascript
const es = new EventSource(
  \`\${HORIZON}/accounts/\${ACCOUNT_ID}/transactions?cursor=now\`
);
\`\`\`

### Filtering by Payments

Stream only payment operations:

\`\`\`javascript
const es = new EventSource(
  \`\${HORIZON}/payments?cursor=now\`
);
\`\`\`

## Approach 3: Decoding Operations

Raw transactions are not very readable. Decode the operations for human-friendly output:

\`\`\`javascript
async function decodeTransaction(tx) {
  const opsRes = await fetch(\`\${HORIZON}/transactions/\${tx.hash}/operations\`);
  const ops = (await opsRes.json())._embedded.records;

  return ops.map(op => {
    switch (op.type) {
      case 'payment':
        return \`Payment: \${op.amount} \${op.asset_type === 'native' ? 'XLM' : op.asset_code} from \${op.from.slice(0,8)}... to \${op.to.slice(0,8)}...\`;
      case 'create_account':
        return \`Create account \${op.account.slice(0,8)}... with \${op.starting_balance} XLM\`;
      case 'change_trust':
        return \`Trust \${op.asset_code}:\${op.asset_issuer?.slice(0,8)}...\`;
      case 'invoke_host_function':
        return \`Soroban contract invocation\`;
      default:
        return \`\${op.type}\`;
    }
  });
}
\`\`\`

## LumenQuery Live Transaction Viewer

If you do not want to build your own, LumenQuery provides a pre-built live transaction viewer at [/dashboard/transactions](/dashboard/transactions):

- Real-time streaming with automatic reconnection
- Decoded XDR operations in plain English (25+ operation types)
- Expandable transaction details with raw JSON
- Soroban operation highlighting
- Pause/resume and clear controls
- Dark theme for comfortable monitoring

The viewer uses SSE under the hood and decodes all operation types including Soroban contract calls.

## Rate Limit Considerations

When streaming transactions, be aware of rate limits:
- Public Horizon limits to ~100-200 requests/minute per IP
- Each poll cycle counts as a request
- SSE connections count as long-lived requests

For production streaming, use a managed API endpoint with higher limits.

## Related Resources

- [Stellar Transaction Monitoring](/stellar-transaction-monitoring) — Production-grade transaction monitoring tools
- [Stellar Blockchain Analytics API](/stellar-blockchain-analytics-api) — Real-time network analytics and TPS tracking
- [XLM Whale Alerts](/xlm-whale-alerts) — Automated alerts for large XLM transfers

---

*Stream live Stellar transactions with [LumenQuery](/auth/signup). Our [live viewer](/dashboard/transactions) decodes operations in real time — or use the API to build your own.*
    `,
  },
  'building-blockchain-explorer-stellar-core-data': {
    title: 'Building a Blockchain Explorer for Stellar: Core Data You Need',
    date: '2026-06-05',
    readTime: '11 min read',
    category: 'Developer Guide',
    content: `
A blockchain explorer is one of the most useful tools you can build for a network. For Stellar, the core data comes from five entity types: accounts, ledgers, transactions, assets, and operations. Here is how to query and display each one.

## The Five Pillars

### 1. Accounts

Every Stellar account has a public key, balances, signers, and configuration:

\`\`\`javascript
GET /accounts/{accountId}
\`\`\`

**Key fields to display:**
- Account ID (public key)
- XLM balance and all asset balances
- Number of signers and threshold configuration
- Home domain (if set)
- Subentry count (trustlines, offers, data entries)
- Last modified ledger

### 2. Ledgers

Ledgers are Stellar's equivalent of blocks — they close every 5-6 seconds:

\`\`\`javascript
GET /ledgers?limit=10&order=desc
GET /ledgers/{sequence}
\`\`\`

**Key fields to display:**
- Sequence number
- Close time
- Transaction count (successful + failed)
- Operation count
- Base fee
- Protocol version
- Hash

### 3. Transactions

Each ledger contains transactions submitted by accounts:

\`\`\`javascript
GET /transactions?limit=20&order=desc
GET /transactions/{hash}
GET /transactions/{hash}/operations
\`\`\`

**Key fields to display:**
- Hash
- Source account
- Ledger number
- Fee charged
- Operation count
- Success/failure status
- Memo (if present)
- Envelope XDR (for advanced users)

### 4. Operations

Operations are the atomic units of work within transactions:

\`\`\`javascript
GET /operations?limit=20&order=desc
GET /accounts/{id}/operations
\`\`\`

Stellar has 25+ operation types. The most common:
- \`payment\` — XLM or asset transfer
- \`create_account\` — Fund a new account
- \`change_trust\` — Add or remove an asset trustline
- \`manage_sell_offer\` / \`manage_buy_offer\` — DEX trading
- \`invoke_host_function\` — Soroban smart contract calls

### 5. Assets

Every non-XLM token on Stellar is an asset with a code and issuer:

\`\`\`javascript
GET /assets?limit=20&order=desc
GET /assets?asset_code=USDC
\`\`\`

**Key fields to display:**
- Asset code
- Issuer account
- Number of accounts holding it
- Total amount issued
- Flags (authorization required, revocable, clawback, immutable)

## Connecting the Data

An explorer lets users navigate between these entities:

- **Ledger → Transactions**: Click a ledger to see its transactions
- **Transaction → Operations**: Click a transaction to see its operations
- **Operation → Accounts**: Click source/destination to see the account
- **Account → Assets**: See all assets an account holds
- **Asset → Holders**: See accounts holding a specific asset

Each Horizon response includes \`_links\` with HAL links to related resources, making navigation easy.

## Pagination

All list endpoints use cursor-based pagination:

\`\`\`javascript
// First page
GET /transactions?limit=20&order=desc

// Next page (use _links.next.href from response)
GET /transactions?cursor=abc123&limit=20&order=desc
\`\`\`

## Search

An explorer needs search. Common patterns:

- **Account search**: Validate as Stellar public key (starts with G, 56 chars)
- **Transaction search**: Validate as hex hash (64 chars)
- **Ledger search**: Validate as integer
- **Asset search**: Query \`/assets?asset_code={code}\`

## LumenQuery as Your Data Layer

Building an explorer from scratch means managing Horizon infrastructure. LumenQuery provides:

- **[Horizon API](/docs)**: All endpoints for accounts, ledgers, transactions, assets, operations
- **[Smart Contract Explorer](/contracts)**: Decoded Soroban data (calls, storage, events)
- **[Live Transactions](/dashboard/transactions)**: Real-time decoded transaction stream

---

*Power your Stellar explorer with [LumenQuery](/auth/signup). Managed Horizon API with all the data you need — start free.*
    `,
  },
  'stellar-smart-contract-events-soroban-developers': {
    title: 'Stellar Smart Contract Events Explained for Soroban Developers',
    date: '2026-06-05',
    readTime: '11 min read',
    category: 'Developer Guide',
    content: `
Events are your primary observability tool for Soroban smart contracts. When your contract does something important — a transfer, a state change, an error condition — it should emit an event. This guide covers how to emit events in your contract, query them via the RPC, and use them for monitoring and debugging.

## What Are Soroban Events

Soroban events are structured data emitted during contract execution. They are stored in the ledger metadata and queryable via the Stellar RPC \`getEvents\` method.

Each event has:
- **Contract ID**: Which contract emitted it
- **Topics**: An array of values used for filtering (up to 4 topics)
- **Data**: The event payload (arbitrary XDR-encoded data)
- **Ledger**: Which ledger the event was emitted in
- **Type**: \`contract\` (from your code), \`system\` (from the runtime), or \`diagnostic\`

## Emitting Events in Rust

In your Soroban contract:

\`\`\`rust
use soroban_sdk::{contractimpl, Env, Symbol, Address, symbol_short};

#[contractimpl]
impl MyContract {
    pub fn transfer(env: Env, from: Address, to: Address, amount: i128) {
        // ... transfer logic ...

        // Emit event
        env.events().publish(
            (symbol_short!("transfer"), from.clone(), to.clone()),
            amount,
        );
    }
}
\`\`\`

The topics tuple is what consumers use to filter events. Put the event type first, then the key identifiers.

## Querying Events via RPC

Use the \`getEvents\` method to query contract events:

\`\`\`json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "getEvents",
  "params": {
    "startLedger": 61000000,
    "filters": [{
      "type": "contract",
      "contractIds": ["CDLZFC3SYJYDZT7K67VZ75HPJVIEUVNIXF47ZG2FB2RMQQVU2HHGCYSC"],
      "topics": [["AAAADwAAAAh0cmFuc2Zlcg==", "*", "*"]]
    }],
    "pagination": {
      "limit": 100
    }
  }
}
\`\`\`

### Filter Options

| Filter | Description |
|--------|-------------|
| \`type\` | \`contract\`, \`system\`, or \`diagnostic\` |
| \`contractIds\` | Array of contract IDs to filter by |
| \`topics\` | Array of topic filters (\`*\` for wildcard) |
| \`startLedger\` | Start of the ledger range |

### Topic Matching

Topics are XDR-encoded. Use wildcards for flexible matching:
- \`["*"]\` — Match any first topic
- \`["transfer", "*", "*"]\` — Match transfer events from any account to any account
- \`["transfer", "GABC...", "*"]\` — Match transfers from a specific account

## Event Types to Emit

### Standard Events

| Event | Topics | Data | When |
|-------|--------|------|------|
| transfer | (transfer, from, to) | amount | Asset moved |
| approve | (approve, owner, spender) | amount | Allowance set |
| mint | (mint, to) | amount | New tokens created |
| burn | (burn, from) | amount | Tokens destroyed |

### Custom Events

| Event | Topics | Data | When |
|-------|--------|------|------|
| config_change | (config, key) | new_value | Settings updated |
| error | (error, code) | message | Error condition |
| deposit | (deposit, user) | amount, asset | Funds deposited |
| withdrawal | (withdrawal, user) | amount, asset | Funds withdrawn |

## Monitoring Events in Production

### Polling Pattern

\`\`\`javascript
async function pollEvents(contractId, startLedger, onEvent) {
  let cursor = startLedger;

  setInterval(async () => {
    const res = await fetch(RPC_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        jsonrpc: '2.0', id: 1,
        method: 'getEvents',
        params: {
          startLedger: cursor,
          filters: [{ type: 'contract', contractIds: [contractId], topics: [['*']] }],
          pagination: { limit: 100 },
        },
      }),
    });
    const data = await res.json();
    const events = data.result?.events || [];

    for (const event of events) {
      onEvent(event);
      cursor = event.ledger + 1;
    }
  }, 5000);
}
\`\`\`

### What to Alert On

| Condition | Alert Level |
|-----------|------------|
| No events in 30 minutes (normally active contract) | Warning |
| Error events | Critical |
| Unexpected event topic | Warning |
| Large transfer event (whale movement) | Info |
| Event volume spike (2x normal) | Info |

## Debugging with Events

Events are invaluable for debugging production issues:

1. **Missing events**: If an operation should have emitted an event but didn't, the transaction likely failed
2. **Event ordering**: Events are emitted in the order they occur during execution
3. **Diagnostic events**: Enable diagnostic events during simulation for detailed execution traces
4. **System events**: Monitor system events for TTL extensions, storage changes, and resource usage

## Tools

LumenQuery provides tools for working with Soroban events:

- **[Smart Contract Explorer](/contracts)**: Event stream with decoded topics and data
- **[Soroban RPC](/docs/contracts)**: Direct access to getEvents for programmatic monitoring

---

*Monitor your Soroban contract events with [LumenQuery](/auth/signup). Decoded event streams, storage viewer, and call history — start free.*
    `,
  },
  'api-rate-limits-blockchain-apps-production': {
    title: 'How API Rate Limits Affect Blockchain Applications in Production',
    date: '2026-06-05',
    readTime: '9 min read',
    category: 'Developer Guide',
    content: `
Your blockchain app works perfectly in development. Then you launch, get 50 concurrent users, and everything breaks. The culprit is almost always API rate limits — the silent killer of blockchain applications.

## The Problem

Every blockchain app needs data from a node. Account balances, transaction history, contract state, network status — all of it comes from API calls. In development, you are the only user. In production, every user multiplies your API consumption.

### The Math

A typical Stellar dashboard page load:
- 1 call for account balances
- 1 call for payment history
- 1 call for recent transactions
- 1 call for network status
- **= 4 API calls per page load**

With auto-refresh every 10 seconds: **24 calls per user per minute**

| Users | Calls/Minute | Public Horizon Limit | Result |
|-------|-------------|---------------------|--------|
| 1 | 24 | 100-200 | Fine |
| 5 | 120 | 100-200 | Borderline |
| 10 | 240 | 100-200 | Rate limited |
| 50 | 1,200 | 100-200 | Broken |

## How Rate Limits Work

### Public Endpoints

The public Stellar Horizon (\`horizon.stellar.org\`) limits by IP address. When you exceed the limit, you get HTTP 429 responses with a \`Retry-After\` header.

Your app does not crash — it degrades. Some requests succeed, some fail. Users see partial data, loading spinners that never complete, and stale information.

### Managed Endpoints

Managed API providers authenticate with API keys and offer higher limits per plan:

| Plan | Requests/Month | Requests/Minute | Best For |
|------|---------------|-----------------|----------|
| **Free** | 10,000 | 60 | Learning, prototyping |
| **Starter** | 100,000-500,000 | 200-500 | MVPs, early apps |
| **Professional** | 1M-10M | 1,000-5,000 | Production apps |
| **Enterprise** | Custom | Custom | Exchanges, institutions |

## Optimization Strategies

### 1. Cache Aggressively

Not all data changes every second:

| Data | Cache Duration | Why |
|------|---------------|-----|
| Account balances | 5-10 seconds | Changes per transaction |
| Fee stats | 30 seconds | Updates per ledger |
| Asset info | 5 minutes | Rarely changes |
| Ledger history | Forever | Historical data is immutable |
| Network info | 60 seconds | Slow-changing |

### 2. Use Cursors, Not Full Refreshes

Instead of re-fetching all data on every refresh, track your cursor and only fetch new records:

\`\`\`javascript
// Bad: Refetch everything
GET /accounts/{id}/payments?limit=20&order=desc

// Good: Only fetch new data since last check
GET /accounts/{id}/payments?cursor={lastCursor}&order=asc
\`\`\`

### 3. Batch Related Calls

Use account-level endpoints instead of per-entity calls:

\`\`\`javascript
// Bad: 10 separate calls
GET /transactions/{hash1}/operations
GET /transactions/{hash2}/operations
...

// Good: 1 call
GET /accounts/{id}/operations?limit=200&order=desc
\`\`\`

### 4. Reduce Refresh Frequency

Does your dashboard need to update every second? For most use cases, 5-10 second intervals provide a good user experience while cutting API calls by 80-90%.

### 5. Implement Client-Side Deduplication

If multiple components on the same page request the same data, deduplicate at the fetch layer:

\`\`\`javascript
const cache = new Map();

async function cachedFetch(url, ttl = 5000) {
  const cached = cache.get(url);
  if (cached && Date.now() - cached.time < ttl) return cached.data;

  const data = await fetch(url).then(r => r.json());
  cache.set(url, { data, time: Date.now() });
  return data;
}
\`\`\`

## When to Upgrade

You need a paid plan when:
- You are hitting 429 errors in production
- Your app has more than 5-10 concurrent users
- You need consistent response times (SLA)
- You are building for institutional users who expect reliability
- You need support when things break

## The Cost of Not Upgrading

- **Engineer time** debugging rate limit issues: $50-150/hour
- **Lost users** who see broken dashboards: Hard to quantify but real
- **Reputation damage** from unreliable service: Especially costly for B2B
- **Opportunity cost** of building rate limit workarounds instead of features

A $25-99/month managed API is almost always cheaper than the alternatives.

## Getting Started with LumenQuery

- **[Pricing](/pricing)**: Compare plans and find the right fit
- **[API Documentation](/docs)**: Complete endpoint reference
- **[Sign Up](/auth/signup)**: Start with the free tier — no credit card required

## Related Resources

- [Stellar API Rate Limits](/stellar-api-rate-limits) — Compare rate limits across plans and find the right fit
- [Stellar Horizon API](/stellar-horizon-api) — Managed Horizon API with generous rate limits
- [Stellar RPC Provider](/stellar-rpc-provider) — Soroban RPC infrastructure with transparent pricing

---

*Stop fighting rate limits. [LumenQuery](/auth/signup) provides managed Stellar API with transparent rate limits and reliable performance. Start free.*
    `,
  },
  'natural-language-search-stellar-blockchain-data': {
    title: 'Using Natural Language Search to Query Stellar Blockchain Data',
    date: '2026-06-05',
    readTime: '8 min read',
    category: 'Tutorial',
    content: `
Querying blockchain data usually means learning API endpoints, understanding parameters, parsing JSON responses, and handling pagination. What if you could just type "top 10 XLM holders" and get a table of results?

That is what LumenQuery's natural language query does. It translates plain English questions into Horizon API calls and returns formatted results.

## How It Works

1. You type a question in plain English
2. The parser identifies the query type and parameters
3. The executor runs the appropriate Horizon API calls
4. Results are returned in a formatted table

No SDK knowledge required. No API documentation to read. Just ask a question.

## Supported Queries

### Account Queries

**"Show account GAAZI4TCR3TY5OJHCTJC2A4QSY6CJWJH5IAJTGKIN2ER7LBNVKOCCWN7"**

Returns: Account ID, balances, signers, thresholds, home domain.

**"Top 10 XLM holders"**

Returns: Largest XLM balances on the network with account IDs and amounts.

### Payment Queries

**"Recent payments"**

Returns: Latest payment operations with amounts, assets, senders, and recipients.

**"Payments larger than 100,000 XLM"**

Returns: Whale movements — payments exceeding your specified threshold.

### Transaction Queries

**"Latest 50 transactions"**

Returns: Recent transactions with hashes, ledger numbers, operation counts, and fees.

**"Transactions for GABC..."**

Returns: Transaction history for a specific account.

### Network Queries

**"Latest ledger status"**

Returns: Current ledger sequence, close time, transaction count, protocol version, and base fee.

### Asset Queries

**"What assets are on Stellar?"**

Returns: Popular Stellar assets with codes, issuers, and holder counts.

## Try It Now

Go to [lumenquery.io/query](/query) and try these examples:

| Query | What You Get |
|-------|-------------|
| "Top 10 XLM holders" | Largest wallets by balance |
| "Recent payments" | Latest payment activity |
| "Payments larger than 1M XLM" | Whale transfers |
| "What assets are on Stellar?" | Token listing |
| "Latest ledger status" | Network health snapshot |
| "Latest 50 transactions" | Recent transaction feed |

Each query runs against the live Stellar network and returns real-time data.

## What You See

For each query, the interface shows:

1. **Results table** — Formatted data with sortable columns
2. **SQL preview** — The equivalent SQL representation for learning
3. **Execution time** — How long the query took
4. **Query type** — What the parser detected (top_holders, recent_payments, etc.)

## Under the Hood

The query system uses a rule-based parser that matches natural language patterns to query types:

- "top N" + "holders" → \`top_holders\` query
- "payments" + "larger than" + amount → \`large_payments\` query
- "account" + Stellar address → \`account_info\` query
- "ledger" or "network status" → \`ledger_info\` query

The executor then translates each query type into the appropriate Horizon API calls, fetches the data, and formats the response.

## Who This Is For

### Non-Technical Users

Product managers, analysts, and business users who need blockchain data without learning APIs. Type a question, get an answer.

### Developers Exploring

Developers new to Stellar who want to understand what data is available before writing code. Use natural language to explore, then switch to the API when you are ready to build.

### Quick Checks

Even experienced developers use natural language queries for quick checks — "is this account funded?", "what's the latest ledger?", "show me recent whale movements."

## API Access

The query endpoint is also available programmatically:

\`\`\`bash
curl -X POST https://lumenquery.io/api/query \\
  -H "Content-Type: application/json" \\
  -d '{"query": "top 10 xlm holders"}'
\`\`\`

Response includes the parsed query type, formatted data, column definitions, and execution time.

## Try It

Head to [lumenquery.io/query](/query) and start asking questions. No account required for basic queries.

---

*Query the Stellar blockchain in plain English. [LumenQuery](/query) makes blockchain data accessible to everyone — try it now, no signup needed.*
    `,
  },
  'horizon-api-vs-stellar-rpc-which-to-use': {
    title: 'Horizon API vs Stellar RPC: Which One Should Your App Use?',
    date: '2026-06-04',
    readTime: '11 min read',
    category: 'Developer Guide',
    content: `
If you are building on Stellar, you have two primary ways to interact with the network: the Horizon API and the Stellar RPC (formerly Soroban RPC). They serve different purposes, and most production applications end up using both. Here is when to use each.

## What Horizon Does

Horizon is a RESTful API server that ingests the Stellar ledger and provides indexed, queryable access to historical and current blockchain data. Think of it as a read-optimized database layer on top of the raw ledger.

### Horizon's Strengths

- **Historical data**: Horizon indexes every transaction, operation, effect, and payment that has ever occurred on the network
- **Rich querying**: Filter by account, asset, operation type, time range, and more with cursor-based pagination
- **Account state**: Fetch balances, signers, thresholds, offers, trustlines in a single call
- **Asset discovery**: List all assets, filter by code or issuer, see holder counts and supply

### Key Horizon Endpoints

| Endpoint | Purpose |
|----------|---------|
| \`/accounts/{id}\` | Account balances, signers, thresholds |
| \`/transactions\` | Transaction history with filtering |
| \`/operations\` | Operation details across all types |
| \`/payments\` | Payment-specific operations |
| \`/assets\` | Asset listing with holder counts |
| \`/order_book\` | Current order book for any pair |
| \`/trade_aggregations\` | OHLCV candle data |
| \`/fee_stats\` | Current network fee statistics |
| \`/ledgers\` | Ledger history with metadata |

### When to Use Horizon

- Displaying account balances and transaction history
- Building block explorers or portfolio trackers
- Querying historical payment data
- Showing order books and trading activity
- Fetching network statistics (TPS, fees, ledger data)

## What Stellar RPC Does

Stellar RPC is a JSON-RPC interface for interacting with the network's current state and smart contracts. It was originally called Soroban RPC and now serves as the unified real-time interface.

### RPC's Strengths

- **Transaction simulation**: Dry-run transactions to see results, resource costs, and fees before submitting
- **Real-time state**: Current ledger state without indexing delay
- **Smart contract interaction**: Query contract storage, invoke functions, monitor events
- **Event streaming**: Query contract events by topic, contract ID, or ledger range

### Key RPC Methods

| Method | Purpose |
|--------|---------|
| \`getLatestLedger\` | Current ledger sequence and protocol version |
| \`simulateTransaction\` | Dry-run a transaction, get resource estimates |
| \`sendTransaction\` | Submit a signed transaction |
| \`getTransaction\` | Check transaction status by hash |
| \`getEvents\` | Query contract events with filters |
| \`getLedgerEntries\` | Read specific ledger entries |

### When to Use RPC

- Submitting transactions (especially Soroban)
- Simulating transactions before submission
- Reading smart contract storage state
- Monitoring contract events
- Building DeFi or smart contract applications

## Side-by-Side Comparison

| Capability | Horizon | Stellar RPC |
|------------|---------|-------------|
| **Protocol** | REST (HTTP) | JSON-RPC |
| **Historical data** | Yes (full history) | No (recent only) |
| **Transaction submission** | Yes (basic) | Yes (with simulation) |
| **Smart contract storage** | No | Yes |
| **Contract events** | No | Yes |
| **Transaction simulation** | No | Yes |
| **Order book** | Yes | No |
| **Trade aggregations** | Yes | No |
| **Asset listing** | Yes | No |

## Using Both Together

Most production applications use both:

1. **Horizon for reads**: Account balances, transaction history, asset discovery, analytics
2. **RPC for writes**: Transaction simulation, submission, and status polling
3. **RPC for contracts**: Storage reads, event monitoring, function invocation

**Example**: Building a token dashboard — use Horizon for asset info, holder counts, payment history. Use RPC for reading DeFi contract state and monitoring events.

## Infrastructure Considerations

Running your own Horizon instance requires PostgreSQL, Captive Core, disk management, and 24/7 monitoring. Running RPC is simpler but still needs infrastructure. Managed services like LumenQuery handle all of this:

- **[Horizon API](/docs)**: Full indexed access with caching and rate limiting
- **[Soroban RPC](/docs/contracts)**: Contract interaction and transaction submission
- **[Network Analytics](/analytics)**: Pre-built dashboards for network metrics

## Related Resources

- [Stellar Horizon API](/stellar-horizon-api) — Managed Horizon API for account queries and transaction history
- [Soroban RPC API](/soroban-rpc-api) — Smart contract RPC infrastructure for Soroban developers
- [Stellar API Provider Comparison](/stellar-api-provider-comparison) — Compare Horizon vs RPC providers

---

*Build on both APIs without running a single node. [LumenQuery](/auth/signup) provides managed Horizon and Soroban RPC with sub-100ms response times. Start free.*
    `,
  },
  'build-stellar-app-without-running-node': {
    title: 'How to Build a Production-Ready Stellar App Without Running Your Own Node',
    date: '2026-06-04',
    readTime: '10 min read',
    category: 'Developer Guide',
    content: `
Running your own Stellar infrastructure sounds empowering until you are debugging disk space issues at 3 AM because your Horizon database grew faster than expected. For most applications, managed infrastructure is the pragmatic choice.

## What Running Your Own Node Actually Means

### Horizon Server
- **PostgreSQL database** that grows continuously (50+ GB/year)
- **Captive Core** process that must stay in sync with the network
- **Ingestion pipeline** processing every ledger into PostgreSQL
- **Ledger lag monitoring**: If ingestion falls behind, your data is stale
- **Database maintenance**: Vacuuming, index rebuilding, connection pool tuning

### Soroban RPC
- **Captive Core** (separate from Horizon's)
- **Ledger retention** management
- **Health monitoring**: Is the RPC responding? Is it up to date?

### Both Require
- 24/7 uptime with monitoring and alerting
- Security patching for the OS, databases, and Stellar software
- Backup strategy for the PostgreSQL database
- Scaling plan as your traffic grows

## The Managed Alternative

A managed Stellar API service handles all of the above. You get an API endpoint, and the provider handles the infrastructure.

### What You Skip
- No PostgreSQL to manage
- No Captive Core to monitor
- No disk space to watch
- No ledger lag to debug
- No security patches to apply
- No 3 AM alerts about ingestion pipeline failures

## Building Your App

### Step 1: Get API Access

Sign up for a managed API and get your API key. With LumenQuery, the free tier gives you 10,000 requests per month.

### Step 2: Query Account Data

\`\`\`javascript
const HORIZON = 'https://horizon.stellar.org';

async function getBalances(accountId) {
  const res = await fetch(\`\${HORIZON}/accounts/\${accountId}\`);
  const account = await res.json();
  return account.balances.map(b => ({
    asset: b.asset_type === 'native' ? 'XLM' : b.asset_code,
    balance: parseFloat(b.balance).toLocaleString(),
  }));
}
\`\`\`

### Step 3: Submit Transactions via RPC

\`\`\`javascript
async function submitTransaction(signedXdr) {
  const res = await fetch('https://rpc.lumenquery.io', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      jsonrpc: '2.0', id: 1,
      method: 'sendTransaction',
      params: { transaction: signedXdr },
    }),
  });
  return res.json();
}
\`\`\`

## When You Actually Need Your Own Node

1. **Data sovereignty**: Regulatory requirements that data stays within your infrastructure
2. **Custom indexing**: You need data Horizon does not expose
3. **Extreme throughput**: Millions of API calls per hour with sub-10ms latency
4. **Validator operations**: You are running a Stellar validator

For most apps — wallets, explorers, DeFi frontends, payment processors — managed infrastructure is the right choice.

## Cost Comparison

| Aspect | Self-Hosted | Managed |
|--------|-----------|---------|
| **Server costs** | $200-500/mo | $0-99/mo |
| **DevOps time** | 10-20 hrs/month | 0 hrs/month |
| **Time to first API call** | 1-3 days | 5 minutes |
| **Scaling** | Manual | Automatic |

The engineer hours spent managing infrastructure cost more than a managed API subscription.

## Related Resources

- [Stellar Horizon API](/stellar-horizon-api) — Managed Horizon API so you never need to run your own node
- [Stellar RPC Provider](/stellar-rpc-provider) — Hosted Soroban RPC with zero infrastructure overhead
- [Stellar API Rate Limits](/stellar-api-rate-limits) — Understand managed API rate limits and choose the right plan

---

*Ship your Stellar app faster. [LumenQuery](/auth/signup) handles the infrastructure so you can focus on your product. Free tier available.*
    `,
  },
  'soroban-smart-contract-monitoring-production': {
    title: 'Soroban Smart Contract Monitoring: What Developers Should Track in Production',
    date: '2026-06-04',
    readTime: '12 min read',
    category: 'Developer Guide',
    content: `
You deployed your Soroban smart contract to mainnet. It is live, processing transactions, managing state. But how do you know if it is working correctly? How do you find out when something goes wrong before your users do?

## What Can Go Wrong

- **Failed invocations**: Transactions that call your contract but revert
- **Unexpected storage changes**: State modifications that do not match expected patterns
- **Gas spikes**: Invocations consuming abnormally high resources
- **Event anomalies**: Missing events or unexpected event patterns
- **Storage bloat**: Contract storage growing beyond expected bounds

## Core Metrics to Track

### 1. Invocation Success Rate

The most fundamental metric. A healthy contract should have a 95%+ success rate. Failures below that indicate a bug, UI issue, or configuration problem.

### 2. Gas Consumption

Track average and P95 gas per invocation. A sudden spike usually indicates an inefficient code path, unexpectedly large storage entries, or a new usage pattern.

### 3. Error Types

| Error Type | Meaning |
|-----------|---------|
| \`InvokeHostFunctionFailed\` | Contract execution reverted |
| \`InsufficientBalance\` | Caller lacks XLM for fees |
| \`ExceededResourceLimit\` | Transaction hit CPU/memory limits |
| \`StorageEntryNotFound\` | Missing storage entry |

### 4. Storage State

Track persistent, temporary, and instance storage entry counts and sizes. Storage has direct cost implications — entries that expire must be restored at additional cost.

### 5. Event Volume

If your contract emits events, monitor volume over time, events by topic, and gaps where events should be firing but are not.

## Setting Up Monitoring

### Using Stellar RPC Events

Poll the \`getEvents\` RPC method at regular intervals:

\`\`\`json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "getEvents",
  "params": {
    "startLedger": 61000000,
    "filters": [{
      "type": "contract",
      "contractIds": ["YOUR_CONTRACT_ID"],
      "topics": [["*"]]
    }],
    "pagination": { "limit": 100 }
  }
}
\`\`\`

### Alerting Rules

| Alert | Condition | Severity |
|-------|-----------|----------|
| **Success rate drop** | Below 90% over 1 hour | Critical |
| **No invocations** | Zero calls in 30 min (if normally active) | Warning |
| **Gas spike** | P95 gas 2x baseline | Warning |
| **Storage growth** | 10%+ increase in 24 hours | Info |
| **Error burst** | 5+ failures in 5 minutes | Critical |

## Common Production Issues

### TTL Expiration
Soroban storage entries have time-to-live values. If an entry expires, it must be restored before it can be read, causing unexpected failures. Monitor TTL values for critical entries.

### Frontend Staleness
If your frontend caches contract state, users may submit transactions based on stale data. Monitor the delta between frontend state and actual contract state.

## Tools

LumenQuery provides contract monitoring tools:

- **[Smart Contract Explorer](/contracts)**: Decoded call history, storage viewer, event stream
- **[Network Analytics](/analytics)**: Network-level Soroban activity metrics
- **[Live Transactions](/dashboard/transactions)**: Real-time transaction stream with Soroban highlighting

## Related Resources

- [Soroban RPC API](/soroban-rpc-api) — RPC infrastructure for smart contract monitoring and event queries
- [Stellar RPC Provider](/stellar-rpc-provider) — Managed Soroban RPC with monitoring-friendly rate limits
- [Stellar Blockchain Analytics API](/stellar-blockchain-analytics-api) — Network-level analytics including Soroban metrics

---

*Monitor your Soroban contracts in production with [LumenQuery](/auth/signup). Decoded calls, storage viewer, and event streaming — start free.*
    `,
  },
  'stellar-transaction-monitoring-exchanges-compliance': {
    title: 'Real-Time Stellar Transaction Monitoring for Exchanges, Funds, and Compliance Teams',
    date: '2026-06-04',
    readTime: '11 min read',
    category: 'Industry Insights',
    content: `
If you operate an exchange, manage a fund, or run a compliance desk that touches the Stellar network, you need more than a block explorer. You need real-time transaction monitoring with filtering, alerting, and the ability to track specific accounts and patterns at scale.

## What Institutional Teams Monitor

### Exchanges
- **Deposit confirmations**: Incoming payments to hot and cold wallets
- **Withdrawal status**: Outgoing transactions with success/failure tracking
- **Whale movements**: Large XLM transfers signaling market-moving activity
- **Counterparty risk**: Transactions from known mixer addresses or sanctioned entities

### Funds and Treasuries
- **Portfolio account balances**: Real-time tracking across multiple accounts
- **Trustline changes**: New additions or removals affecting asset exposure
- **RWA distributions**: Payments from tokenized assets (BENJI, YLDS, etc.)
- **Liquidity pool positions**: LP token balances and pool changes

### Compliance Teams
- **Watchlist monitoring**: Transactions involving flagged accounts
- **Suspicious pattern detection**: Circular payments, structuring, rapid conversion
- **Sanctions screening**: Cross-referencing against OFAC, UN, and EU lists
- **Audit trail**: Immutable record of flagged transactions and review decisions

## Why Default Tools Fall Short

Block explorers are excellent for manual investigation but lack:
- Webhook notifications
- Custom alert rules
- Watchlist management
- Programmatic API access to monitoring data

The public Horizon endpoint provides raw data but rate limits prevent the request volume needed for real-time monitoring.

## Building a Monitoring Stack

### Layer 1: Data Ingestion

Stream transactions using Horizon or a managed API with higher limits:

\`\`\`
GET /transactions?order=desc&limit=200&include_failed=true
\`\`\`

### Layer 2: Filtering

For each transaction, apply rules:
1. Is the source or destination on any watchlist?
2. Does the payment exceed configured thresholds (e.g., >100K XLM)?
3. Does this fit a known suspicious pattern?
4. Is any party on a sanctions list?

### Layer 3: Alerting

| Channel | Use Case | Latency |
|---------|----------|---------|
| **Webhook** | System integration | <1 second |
| **Email** | Compliance review | <30 seconds |
| **Slack** | Team notification | <5 seconds |
| **Dashboard** | Visual monitoring | Real-time |

### Layer 4: Investigation

When an alert fires, investigators need transaction details, account profiles, counterparty graphs, historical context, and a decision workflow (false positive, escalate, or report).

## Key Alert Types

### Whale Movement Alerts
Track transfers above configurable thresholds (default: >1M XLM). Include context: is the source a known exchange? Is this a regular transfer?

### Watchlist Alerts
Trigger on any transaction involving watched accounts — internal watchlists and external regulatory lists.

### Pattern Detection
- **Structuring**: Multiple transactions just below reporting thresholds
- **Circular payments**: Funds moving in loops between related accounts
- **Rapid conversion**: Quick XLM to stablecoin to XLM cycles
- **Dormant activation**: Inactive accounts suddenly sending large transactions

### Trustline Change Alerts
New trust line additions or removals — indicating new asset exposure, abandonment, or potential scam token activity.

## Data Requirements

The Stellar network processes 5-10 million transactions per day. Your monitoring system must handle 100+ TPS with filtering applied in real-time. Retention requirements vary by jurisdiction but typically 5-7 years for compliance data.

## Getting Started

LumenQuery provides the infrastructure layer for institutional monitoring:

- **[Transaction Intelligence](/intelligence)**: Real-time stream with filtering and watchlists
- **[Live Transactions](/dashboard/transactions)**: Decoded transaction feed
- **[Horizon API](/docs)**: Programmatic access to accounts and transactions
- **[Portfolio Intelligence](/portfolio)**: Multi-account balance tracking

## Related Resources

- [Stellar Transaction Monitoring](/stellar-transaction-monitoring) — Real-time monitoring infrastructure for exchanges and compliance teams
- [XLM Whale Alerts](/xlm-whale-alerts) — Detect and alert on large XLM transfers
- [Stellar Blockchain Analytics API](/stellar-blockchain-analytics-api) — Network analytics and transaction volume tracking

---

*Build institutional-grade Stellar monitoring with [LumenQuery](/auth/signup). Real-time transaction data, watchlists, and alerting — start with the free tier.*
    `,
  },
  'query-stellar-accounts-ledgers-javascript': {
    title: 'How to Query Stellar Accounts, Ledgers, and Transactions with JavaScript',
    date: '2026-06-04',
    readTime: '13 min read',
    category: 'Developer Guide',
    content: `
A hands-on tutorial for JavaScript developers who want to query the Stellar blockchain. We will fetch account balances, read ledger data, page through transaction history, and handle errors — all with working code.

## Setup

You need Node.js 18+ (for built-in fetch). Optionally install the Stellar SDK:

\`\`\`bash
npm install @stellar/stellar-sdk
\`\`\`

## Querying Accounts

### Fetch Account Balances

\`\`\`javascript
const HORIZON = 'https://horizon.stellar.org';

async function getBalances(accountId) {
  const res = await fetch(\`\${HORIZON}/accounts/\${accountId}\`);
  if (!res.ok) throw new Error(\`Account not found: \${res.status}\`);
  const account = await res.json();

  return account.balances.map(b => ({
    asset: b.asset_type === 'native' ? 'XLM' : b.asset_code,
    balance: parseFloat(b.balance).toLocaleString(),
    issuer: b.asset_issuer || 'native',
  }));
}

const balances = await getBalances('GAAZI4TCR3TY5OJHCTJC2A4QSY6CJWJH5IAJTGKIN2ER7LBNVKOCCWN7');
console.table(balances);
\`\`\`

## Querying Ledgers

### Get Latest Ledger

\`\`\`javascript
async function getLatestLedger() {
  const res = await fetch(\`\${HORIZON}/ledgers?limit=1&order=desc\`);
  const data = await res.json();
  const ledger = data._embedded.records[0];

  return {
    sequence: ledger.sequence,
    closedAt: ledger.closed_at,
    txCount: ledger.successful_transaction_count,
    operationCount: ledger.operation_count,
    baseFee: ledger.base_fee_in_stroops,
    protocolVersion: ledger.protocol_version,
  };
}
\`\`\`

### Get Fee Statistics

\`\`\`javascript
async function getFeeStats() {
  const res = await fetch(\`\${HORIZON}/fee_stats\`);
  const fees = await res.json();
  return {
    baseFee: fees.last_ledger_base_fee,
    p50: fees.fee_charged.p50,
    p95: fees.fee_charged.p95,
    maxFee: fees.fee_charged.max,
  };
}
\`\`\`

## Querying Transactions

### Recent Transactions

\`\`\`javascript
async function getRecentTransactions(limit = 10) {
  const res = await fetch(\`\${HORIZON}/transactions?limit=\${limit}&order=desc\`);
  const data = await res.json();

  return data._embedded.records.map(tx => ({
    hash: tx.hash.slice(0, 12) + '...',
    ledger: tx.ledger,
    sourceAccount: tx.source_account.slice(0, 8) + '...',
    operationCount: tx.operation_count,
    feeCharged: tx.fee_charged,
    successful: tx.successful,
  }));
}
\`\`\`

### Transaction Operations

\`\`\`javascript
async function getTransactionOperations(txHash) {
  const res = await fetch(\`\${HORIZON}/transactions/\${txHash}/operations\`);
  const data = await res.json();

  return data._embedded.records.map(op => ({
    type: op.type,
    sourceAccount: op.source_account.slice(0, 8) + '...',
    ...(op.type === 'payment' && {
      to: op.to.slice(0, 8) + '...',
      amount: op.amount,
      asset: op.asset_type === 'native' ? 'XLM' : op.asset_code,
    }),
  }));
}
\`\`\`

## Pagination

Horizon uses cursor-based pagination with HAL links:

\`\`\`javascript
async function getAllPayments(accountId, maxPages = 5) {
  let url = \`\${HORIZON}/accounts/\${accountId}/payments?limit=200&order=desc\`;
  const allPayments = [];
  let page = 0;

  while (url && page < maxPages) {
    const res = await fetch(url);
    const data = await res.json();
    const records = data._embedded.records;
    if (records.length === 0) break;

    allPayments.push(...records);
    page++;
    url = data._links?.next?.href || null;
  }

  return allPayments;
}
\`\`\`

## Error Handling

\`\`\`javascript
async function safeFetch(url) {
  const res = await fetch(url);
  if (res.status === 404) return { error: 'not_found' };
  if (res.status === 429) {
    const retryAfter = res.headers.get('Retry-After') || '5';
    return { error: 'rate_limited', retryAfter: parseInt(retryAfter) };
  }
  if (!res.ok) return { error: 'api_error', status: res.status };
  return { data: await res.json() };
}
\`\`\`

### Retry with Backoff

\`\`\`javascript
async function fetchWithRetry(url, maxRetries = 3) {
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      const res = await fetch(url);
      if (res.status === 429) {
        await new Promise(r => setTimeout(r, Math.pow(2, attempt) * 1000));
        continue;
      }
      if (!res.ok) throw new Error(\`HTTP \${res.status}\`);
      return await res.json();
    } catch (err) {
      if (attempt === maxRetries - 1) throw err;
      await new Promise(r => setTimeout(r, 1000 * (attempt + 1)));
    }
  }
}
\`\`\`

## Using the Stellar SDK

\`\`\`javascript
import { Horizon } from '@stellar/stellar-sdk';

const server = new Horizon.Server('https://horizon.stellar.org');

// Account
const account = await server.loadAccount('GABC...');
console.log('Balances:', account.balances);

// Transactions
const txs = await server.transactions()
  .forAccount('GABC...')
  .limit(10)
  .order('desc')
  .call();

// Streaming payments
server.payments()
  .forAccount('GABC...')
  .cursor('now')
  .stream({ onmessage: (payment) => {
    console.log('Payment:', payment.amount, payment.asset_type);
  }});
\`\`\`

## Complete Example: Account Dashboard

\`\`\`javascript
async function accountDashboard(accountId) {
  const [account, payments] = await Promise.all([
    fetch(\`\${HORIZON}/accounts/\${accountId}\`).then(r => r.json()),
    fetch(\`\${HORIZON}/accounts/\${accountId}/payments?limit=5&order=desc\`).then(r => r.json()),
  ]);

  console.log('=== Account Dashboard ===');
  console.log('ID:', accountId.slice(0, 12) + '...');
  account.balances.forEach(b => {
    const asset = b.asset_type === 'native' ? 'XLM' : b.asset_code;
    console.log(\`  \${asset}: \${parseFloat(b.balance).toLocaleString()}\`);
  });
  console.log('Recent Payments:');
  payments._embedded.records.forEach(p => {
    const asset = p.asset_type === 'native' ? 'XLM' : p.asset_code;
    console.log(\`  \${p.amount} \${asset} (\${p.created_at})\`);
  });
}
\`\`\`

---

*Query the Stellar blockchain with reliable infrastructure. [LumenQuery](/auth/signup) provides managed Horizon API with sub-100ms response times. Start free.*
    `,
  },
  'why-rwa-tokenization-growing-stellar': {
    title: 'Why Real-World Asset Tokenization Is Growing on Stellar',
    date: '2026-06-04',
    readTime: '10 min read',
    category: 'RWA Tokenization',
    content: `
Stellar has quietly become one of the top three blockchains for tokenized real-world assets. With over $2 billion in onchain RWAs in Q1 2026 and a 66.7% growth in RWA holders, the network's position is measurable. Here is why institutions keep choosing Stellar.

## The Numbers

| Metric | Value |
|--------|-------|
| **Onchain RWAs** | $2B+ (Q1 2026) |
| **RWA Market Cap Ranking** | #2 (Santiment, $5.48B) |
| **RWA Holder Growth** | 66.7% YoY |
| **USDC on Stellar** | $240M+, 2.1M holders |
| **Longest-running tokenized fund** | BENJI (5 years) |

## What Is Being Tokenized

**Money Market Funds**: Franklin Templeton's BENJI — a U.S.-registered fund running on Stellar since 2021. Five years, no incidents.

**Fixed Income**: Mercado Bitcoin's $200M in tokenized fixed income. Real bonds, tokenized for fractional ownership and instant settlement.

**Real Estate**: RedSwan's $100M in commercial real estate. Investors hold tokenized shares of physical properties.

**Yield Products**: Figure's YLDS (May 2026) — tokenized yield targeting institutional investors.

**Stablecoins**: USDC with 2.1M holders on Stellar. EURAU for MiCAR-compliant euro settlement.

## Why Institutions Choose Stellar

### 1. Protocol-Level Compliance

Stellar's most differentiated feature for RWAs:

| Feature | What It Does |
|---------|-------------|
| **Authorization Required** | Issuer must approve every holder |
| **Authorization Revocable** | Issuer can revoke access |
| **Clawback** | Issuer can recover tokens |
| **Freeze** | Issuer can freeze balances |

These are protocol features, not smart contracts. They cannot be bypassed and do not cost gas to enforce.

### 2. Economics

| Operation | Stellar | Ethereum |
|-----------|---------|----------|
| Token transfer | ~$0.00001 | $2-50 |
| Dividend to 1,000 holders | ~$0.01 | $2,000-50,000 |
| Annual compliance ops | <$1 | $5,000-100,000 |

### 3. Settlement Speed

5-6 second finality. No reorgs, no confirmations. T+0 instead of T+1.

### 4. Five Years of Track Record

Franklin Templeton running a SEC-registered fund on Stellar for five years through multiple market cycles is proof no amount of marketing can substitute.

### 5. Regulatory Clarity

XLM classified as a commodity in several jurisdictions. Less legal ambiguity than chains with ongoing classification disputes.

## The Growth Trajectory

- **SDF invested in Ascend** (May 2026) — compliant RWA infrastructure platform
- **Bermuda chose Stellar** for national payments — sovereign-level validation
- **CME added XLM** to index futures — institutional access
- **RWA holder base** up 66.7% in 2026

## For Developers

The RWA boom creates opportunities: asset issuance platforms, secondary trading interfaces, portfolio trackers, compliance tools.

- **[Horizon API](/docs)**: Query asset details, holder counts, transaction history
- **[Network Analytics](/analytics)**: Monitor tokenized asset growth
- **[Portfolio Intelligence](/portfolio)**: Track RWA holdings across accounts

---

*Build on the blockchain institutions trust. [LumenQuery](/auth/signup) provides enterprise-grade Stellar API infrastructure for RWA applications. Start free.*
    `,
  },
  'stellar-api-rate-limits-choose-plan': {
    title: 'Stellar API Rate Limits Explained: How to Choose the Right Plan for Your App',
    date: '2026-06-04',
    readTime: '8 min read',
    category: 'Developer Guide',
    content: `
The public Stellar Horizon endpoint is free — until you hit the rate limit. Then your app gets HTTP 429 responses, users see loading spinners, and you realize that "free" has a cost.

## How Rate Limiting Works

The public Horizon endpoint (\`horizon.stellar.org\`) limits to roughly 100-200 requests per minute per IP. No API key, no account — just IP-based limits.

### What 100 Requests Per Minute Gets You

- Loading one account page (balances + transactions + operations): **4 requests**
- Refreshing a dashboard every 30 seconds: **8 requests/minute**
- Monitoring 10 accounts: **40+ requests/minute**

A single user with a moderately complex dashboard consumes half your limit. Two concurrent users and you are hitting 429s.

## Usage Patterns by Scale

| Scale | Requests/min | Monthly | Rate Limit Risk |
|-------|-------------|---------|-----------------|
| **Hobby** | 10-30 | ~30K | Low |
| **Startup/MVP** | 50-500 | 150K-1.5M | Moderate-High |
| **Production** | 500-5,000 | 1.5M-15M | Guaranteed |
| **Enterprise** | 5,000-50,000 | 15M-150M | Need dedicated infra |

## Strategies to Reduce API Calls

### 1. Caching

| Data Type | Cache TTL |
|-----------|-----------|
| Account balances | 5-10 seconds |
| Fee stats | 30 seconds |
| Asset info | 5 minutes |
| Ledger history | Forever |

### 2. Batch Requests

Use account-level endpoints instead of per-transaction queries:

\`\`\`
# Instead of 10 requests (one per transaction):
GET /transactions/{hash}/operations (x10)

# Use 1 request:
GET /accounts/{id}/operations?limit=200&order=desc
\`\`\`

### 3. Use Cursors

Track the cursor from your last request and only fetch new records:

\`\`\`
GET /accounts/{id}/payments?cursor={saved_cursor}&order=asc
\`\`\`

### 4. Reduce Polling Frequency

5-10 second intervals are usually sufficient. Your dashboard does not need to refresh every second.

## Choosing a Plan

| Tier | Requests/month | Rate Limit | Best For |
|------|---------------|------------|----------|
| **Free** | 10,000 | 60/min | Learning, prototyping |
| **Starter** | 100K-500K | 200-500/min | MVPs, small production |
| **Professional** | 1M-10M | 1K-5K/min | Production apps |
| **Enterprise** | Custom | Custom | Exchanges, institutions |

## The Real Cost Calculation

Engineer time debugging rate limits costs $50-150/hour. Infrastructure management for self-hosted nodes costs 10-20 hours/month. A $25-99/month managed API is dramatically cheaper.

- **[Pricing](/pricing)**: Compare tiers
- **[API Documentation](/docs)**: Complete endpoint reference
- **[Sign Up](/auth/signup)**: Start free, no credit card required

## Related Resources

- [Stellar API Rate Limits](/stellar-api-rate-limits) — Detailed breakdown of rate limits per plan
- [Stellar Horizon API](/stellar-horizon-api) — Production-ready Horizon API with high throughput
- [Stellar API Provider Comparison](/stellar-api-provider-comparison) — Compare managed providers side by side

---

*Stop hitting rate limits. [LumenQuery](/auth/signup) provides managed Horizon API and Soroban RPC with generous rate limits. Start free, scale when you need to.*
    `,
  },
  'monitor-stellar-network-health-tps-latency': {
    title: 'How to Monitor Stellar Network Health: Ledgers, TPS, Latency, and RPC Availability',
    date: '2026-06-04',
    readTime: '9 min read',
    category: 'Operations',
    content: `
Whether you run a Stellar validator, operate a business on the network, or just depend on the infrastructure, monitoring network health is essential. Here is what to watch and how.

## Key Metrics

### 1. Ledger Close Time

Stellar ledgers close every 5-6 seconds under normal conditions.

| Value | Meaning |
|-------|---------|
| 5-6 seconds | Normal |
| 7-8 seconds | Slight congestion |
| 10+ seconds | Significant issue |

### 2. Transactions Per Second (TPS)

\`\`\`
TPS = successful_transaction_count / ledger_close_time
\`\`\`

| TPS Range | Context |
|-----------|---------|
| 10-30 | Light activity |
| 30-60 | Normal load |
| 60-100+ | High activity (Stellar regularly sustains this) |

The network handled 14.1 million transactions in a single day in April 2026.

### 3. Transaction Success Rate

\`\`\`
Success Rate = successful / (successful + failed) * 100
\`\`\`

95-100% is healthy. Below 85% warrants investigation — usually fee-related during congestion.

### 4. Fee Distribution

\`\`\`bash
curl -s https://horizon.stellar.org/fee_stats | \\
  python3 -c "import sys,json; d=json.load(sys.stdin); \\
  print('P50:', d['fee_charged']['p50'], 'P95:', d['fee_charged']['p95'])"
\`\`\`

If P95 is much higher than the base fee, the network is congested.

### 5. Protocol Version

Track upgrades through validator voting:
\`\`\`bash
curl -s https://horizon.stellar.org/ | python3 -c "import sys,json; print(json.load(sys.stdin)['current_protocol_version'])"
\`\`\`

### 6. Horizon API Health

| Metric | Target |
|--------|--------|
| Response time (\`/ledgers?limit=1\`) | <500ms |
| Availability | 200 OK |
| Ingestion lag | <5 ledgers |
| Error rate | <1% |

### 7. Soroban RPC Health

\`\`\`bash
curl -s -X POST https://mainnet.sorobanrpc.com \\
  -H 'Content-Type: application/json' \\
  -d '{"jsonrpc":"2.0","id":1,"method":"getHealth"}' | python3 -m json.tool
\`\`\`

## Alert Thresholds

| Alert | Condition | Action |
|-------|-----------|--------|
| **Ledger stall** | No new ledger in 30s | Check SDF status |
| **Success rate** | Below 85% for 10 min | Check fee market |
| **Fee spike** | P95 fee 10x base | Adjust fee strategy |
| **Horizon lag** | >10 ledgers behind | Check server health |
| **RPC unhealthy** | getHealth returns unhealthy | Failover to backup |

## Data Collection Script

\`\`\`python
import requests, time

def collect_metrics():
    ledger = requests.get("https://horizon.stellar.org/ledgers?limit=1&order=desc").json()
    latest = ledger["_embedded"]["records"][0]
    fees = requests.get("https://horizon.stellar.org/fee_stats").json()

    return {
        "ledger": latest["sequence"],
        "closed_at": latest["closed_at"],
        "tx_count": latest["successful_transaction_count"],
        "failed_tx": latest["failed_transaction_count"],
        "fee_p50": fees["fee_charged"]["p50"],
        "fee_p95": fees["fee_charged"]["p95"],
    }
\`\`\`

## LumenQuery Network Analytics

LumenQuery provides a pre-built dashboard at [/analytics](/analytics) — public, no auth required:

- Real-time metrics: Ledger sequence, TPS, success rate, protocol version
- Historical charts: 24-hour trends
- Fee tracking: Current fee distribution
- Soroban metrics: Contract invocation counts and gas usage

## Related Resources

- [Stellar Blockchain Analytics API](/stellar-blockchain-analytics-api) — API access to network health metrics, TPS, and fee data
- [Stellar Transaction Monitoring](/stellar-transaction-monitoring) — Real-time transaction monitoring and alerting
- [Stellar Horizon API](/stellar-horizon-api) — Query ledgers, fees, and network state programmatically

---

*Monitor Stellar network health without building your own dashboard. [LumenQuery](/analytics) provides real-time analytics — free and public.*
    `,
  },
  'bermuda-onchain-economy-stellar': {
    title: 'Stellar Is Powering Bermuda\'s Plan for a Fully Onchain Economy',
    date: '2026-05-15',
    readTime: '9 min read',
    category: 'Industry Insights',
    content: `
On May 12, 2026, the Stellar Development Foundation (SDF) announced that Stellar will serve as the blockchain backbone for Bermuda's ambitious plan to move government and financial payments fully onchain. This is not a pilot, a sandbox, or a memorandum of understanding. It is a sovereign nation choosing a public blockchain to run real payments at the national level.

## What Bermuda Is Building

Bermuda's government has outlined a vision for what it calls a "fully onchain economy" — a system where government disbursements, financial settlement, and eventually tax collection flow through blockchain rails instead of legacy banking infrastructure.

The plan includes:
- **Government payments**: Salary disbursements, vendor payments, and social benefit transfers settled onchain
- **Financial settlement**: Interbank settlement and cross-border payment corridors using Stellar
- **Digital identity**: Blockchain-anchored identity verification for financial services
- **Regulatory integration**: Real-time compliance monitoring built into the payment flow

## Why Stellar

Bermuda's choice of Stellar is consistent with the network's strengths:

### 1. Regulatory Compatibility
Stellar was designed for regulated financial use cases. Built-in asset controls — authorization flags, clawback capabilities, and issuer-level freeze — give regulators the oversight tools they require without adding middleware.

### 2. Transaction Economics
Government payment systems process high volumes of relatively small transactions. Stellar's sub-cent fees make it economically viable to settle individual payments onchain, something that is impractical on high-fee networks.

### 3. Settlement Speed
Stellar ledgers close every 5-6 seconds with finality. For a government payment system, this means funds arrive in seconds rather than the days typical of traditional banking rails.

### 4. Proven Track Record
Stellar already supports MoneyGram's stablecoin payment corridors across 200+ countries, Franklin Templeton's BENJI tokenized fund (five years running), and over $2 billion in tokenized real-world assets. Bermuda is not the first regulated entity to bet on Stellar — it is the latest in a growing list.

### 5. Stablecoin Infrastructure
USDC on Stellar has over 2 million holder accounts. Circle's commitment to Stellar as a primary USDC chain gives Bermuda access to a deep pool of stablecoin liquidity without building its own stablecoin from scratch.

## What This Means for the Stellar Ecosystem

### A National-Level Reference Implementation
If Bermuda succeeds, it becomes the reference implementation for other jurisdictions considering onchain government payments. Stellar becomes the network that governments point to when evaluating blockchain infrastructure.

### Increased Demand for XLM
Every onchain transaction on Stellar requires XLM for fees and account reserves. A national payment system processing thousands of transactions daily creates sustained, non-speculative demand for the native token.

### Developer Opportunities
Bermuda's onchain economy will need:
- Payment application interfaces
- Compliance monitoring dashboards
- Analytics and reporting tools
- Integration middleware for legacy systems
- Wallet infrastructure for citizens and businesses

This creates a new market for developers building on Stellar.

### Regulatory Precedent
A sovereign nation endorsing Stellar for its financial infrastructure sends a strong signal to regulators globally. It is harder to argue that public blockchains are unsuitable for regulated finance when a country is running its economy on one.

## The Bigger Picture

Bermuda is not operating in isolation. The announcement follows a pattern of Stellar gaining traction with governments and regulated institutions:

- **MoneyGram**: Stablecoin-powered remittances across 200+ countries
- **Franklin Templeton**: BENJI tokenized fund running on Stellar for 5 years
- **WisdomTree**: Tokenized funds exploring Stellar infrastructure
- **Mercado Bitcoin**: $200M in tokenized assets on Stellar
- **RedSwan**: $100M in tokenized real estate

The Bermuda partnership represents the next logical step: from institutional adoption to sovereign adoption.

## Challenges Ahead

This is an ambitious project, and challenges remain:

- **Migration complexity**: Moving existing government payment systems to new infrastructure is never simple
- **User adoption**: Citizens and businesses need to interact with onchain payments, which requires accessible interfaces
- **Interoperability**: Bermuda's onchain economy needs to interoperate with traditional banking systems internationally
- **Scale**: While Stellar handles high throughput, a national payment system introduces sustained load that needs robust infrastructure

## For Developers

If you are building tools for government, fintech, or payment infrastructure, Bermuda's initiative signals where the market is heading. LumenQuery provides the API layer to build on Stellar:

- **[Horizon API](/docs)**: Full access to accounts, transactions, payments, and ledger data
- **[Network Analytics](/analytics)**: Monitor network activity and transaction volumes in real time
- **[Live Transactions](/dashboard/transactions)**: Watch Stellar transactions streaming live

---

*A sovereign nation is going onchain with Stellar. Build the tools that power this future with [LumenQuery](/auth/signup) — enterprise-grade Stellar API infrastructure, starting free.*
    `,
  },
  'stellar-rwa-2-billion-q1-2026': {
    title: 'Onchain RWAs on Stellar Surpass $2 Billion: Inside the Network\'s Biggest Growth Story',
    date: '2026-05-15',
    readTime: '10 min read',
    category: 'RWA Tokenization',
    content: `
Real-world asset (RWA) tokenization has become the defining narrative for the Stellar network in 2026. In Q1 alone, onchain RWAs on Stellar surpassed $2 billion — a milestone that cements the network's position as one of the leading blockchains for institutional asset tokenization.

On May 4, SDF announced a strategic investment in Ascend, a platform focused on compliant RWA infrastructure, to further accelerate this trajectory.

## The Numbers

| Metric | Value |
|--------|-------|
| **Total onchain RWAs (Q1 2026)** | $2B+ |
| **Franklin Templeton BENJI** | 5 years on Stellar |
| **Mercado Bitcoin** | $200M tokenized fixed income |
| **RedSwan** | $100M tokenized real estate |
| **USDC on Stellar** | $240M+, 2.1M holders |
| **SDF investment in Ascend** | Announced May 4, 2026 |

## SDF's Strategic Investment in Ascend

SDF's investment in Ascend is a targeted move to build out the infrastructure layer that RWA issuers need. Ascend focuses on:

- **Compliant issuance**: Tools for creating tokenized assets that meet regulatory requirements from day one
- **Lifecycle management**: Handling distributions, redemptions, and corporate actions for tokenized securities
- **Interoperability**: Connecting tokenized assets to existing financial infrastructure
- **Reporting**: Regulatory reporting and audit trail capabilities

The investment signals that SDF is not just waiting for institutions to build on Stellar — it is actively funding the infrastructure they need.

### Why Ascend Matters

The gap between "we can tokenize assets on a blockchain" and "institutions will actually do it" is filled by infrastructure: compliance tools, custody integrations, reporting systems, and lifecycle management. Ascend is building exactly this layer for Stellar.

Without this infrastructure, every institution that wants to tokenize assets on Stellar has to build compliance tooling from scratch. Ascend creates a shared foundation that lowers the barrier for every issuer that follows.

## What Is Being Tokenized on Stellar

### Money Market Funds
Franklin Templeton's BENJI remains the flagship example — a U.S.-registered money market fund running on a public blockchain for five years. BENJI proved that tokenized funds are not a novelty; they are a structural improvement in how financial products operate.

### Fixed Income
Mercado Bitcoin's $200M issuance demonstrated that tokenized fixed income products can be brought to market on Stellar. These are not wrapped tokens or synthetic assets — they are tokenized representations of real fixed income instruments with legal standing.

### Real Estate
RedSwan's $100M in tokenized commercial real estate on Stellar opened the door to fractional ownership of physical assets. Investors can hold tokenized shares of commercial properties, with dividends and appreciation tracked onchain.

### Stablecoins
While not always categorized as RWAs, stablecoins are tokenized representations of fiat currency. USDC on Stellar has over 2.1 million holders and $240M+ in circulation, making it one of the most widely held assets on the network. The MiCAR-compliant EURAU has opened European corridors.

### Additional Issuances
Beyond the headline numbers, smaller issuers are tokenizing a range of assets on Stellar:
- Corporate bonds
- Revenue-sharing agreements
- Commodity receipts
- Carbon credits

## Why Stellar for RWAs

### Built-in Compliance Controls
Stellar's protocol-level features are purpose-built for regulated assets:

| Feature | Purpose |
|---------|---------|
| **Authorization Required** | Issuer must approve each holder |
| **Authorization Revocable** | Issuer can revoke a holder's authorization |
| **Clawback** | Issuer can recover tokens (for regulatory enforcement) |
| **Freeze** | Issuer can freeze an account's asset balance |
| **Immutable** | Issuer can lock flags to prevent future changes |

These features exist at the protocol level, not in a smart contract. They cannot be bypassed, and they do not require gas to enforce.

### Economics
The economics of tokenized assets on Stellar are compelling:

- **Transaction fees**: ~0.00001 XLM (fraction of a cent)
- **Account reserves**: 0.5 XLM base + 0.5 XLM per trustline
- **Settlement time**: 5-6 seconds with finality
- **Throughput**: 200+ TPS sustained, scaling roadmap to 5,000+

Compare this to Ethereum, where a single token transfer can cost $5-50 in gas fees. For a money market fund processing thousands of small-denomination transfers daily, the fee difference is the difference between viability and impracticality.

### Institutional Track Record
Five years of Franklin Templeton running BENJI on Stellar — through multiple market cycles, regulatory changes, and network upgrades — provides a track record that no amount of marketing can substitute for.

## The $2 Billion in Context

The total RWA tokenization market across all blockchains has grown from under $1 billion in 2021 to over $30 billion in 2026. Stellar's $2B+ share positions it as a top-tier chain for RWAs, alongside Ethereum and, increasingly, Polygon.

What differentiates Stellar's $2B is the composition:
- **Regulated securities** (BENJI) rather than just stablecoins
- **Institutional issuers** (Franklin Templeton, Mercado Bitcoin) rather than DeFi protocols
- **Real revenue-producing assets** (money market funds, fixed income) rather than synthetic derivatives

## What Comes Next

The RWA trajectory on Stellar suggests several near-term developments:

1. **More fund managers**: BENJI's success is a proof point that will attract additional fund managers to tokenize on Stellar
2. **Secondary markets**: Tokenized securities trading on Stellar's built-in DEX or through Soroban-based AMMs
3. **Cross-border distribution**: Using Stellar's anchor network to distribute tokenized assets internationally
4. **Soroban integration**: Smart contract-based automation of distributions, redemptions, and compliance checks
5. **Regulatory expansion**: As more jurisdictions clarify RWA regulations, the addressable market grows

## For Developers

The RWA boom on Stellar creates opportunities for developers building:
- Asset issuance platforms
- Secondary market trading interfaces
- Portfolio tracking and analytics
- Compliance monitoring tools
- Custody integrations

LumenQuery provides the API infrastructure for all of these:

- **[Horizon API](/docs)**: Query asset details, holder counts, and transaction history for tokenized assets
- **[Network Analytics](/analytics)**: Monitor the growth of tokenized assets on Stellar in real time
- **[Portfolio Intelligence](/portfolio)**: Track holdings and P&L across multiple accounts

---

*Stellar's RWA ecosystem has crossed $2 billion. Build the next wave of tokenized asset applications with [LumenQuery](/auth/signup) — enterprise-grade Stellar API infrastructure, starting free.*
    `,
  },
  'figure-ylds-stellar-tokenized-yield': {
    title: 'Figure Launches YLDS on Stellar: What Tokenized Yield Means for Institutional Adoption',
    date: '2026-05-15',
    readTime: '8 min read',
    category: 'RWA Tokenization',
    content: `
On May 5, 2026, Figure announced the launch of YLDS on the Stellar network — a tokenized yield product that adds another institutional-grade asset to Stellar's growing real-world asset (RWA) ecosystem. The launch is the latest in a series of moves that position Stellar as the preferred blockchain for institutions looking to bring yield-bearing financial products onchain.

## What Is YLDS

YLDS is Figure's tokenized yield product on Stellar. While the specific underlying assets and yield mechanics vary, the core concept is straightforward: YLDS represents a tokenized claim on yield-generating financial instruments, allowing holders to earn returns through onchain infrastructure rather than traditional financial intermediaries.

Key characteristics:
- **Issuer**: Figure Technologies, a fintech company known for blockchain-based lending and securitization
- **Network**: Stellar
- **Asset type**: Tokenized yield / institutional asset
- **Target audience**: Institutional investors and qualified participants

## Why Figure Chose Stellar

Figure's decision to launch on Stellar follows the same logic that has attracted other institutional issuers:

### Compliance-First Architecture
Figure operates in a regulated environment. Stellar's protocol-level compliance features — authorization flags, clawback capabilities, and issuer controls — allow Figure to maintain the regulatory controls required for a yield product without building custom compliance layers.

### Low-Cost Operations
Yield products often involve frequent distributions and rebalancing operations. On Stellar, each of these transactions costs a fraction of a cent. On higher-fee networks, the operational costs of running a tokenized yield product would eat into the returns.

### Fast Settlement
Yield distributions, redemptions, and transfers settle in 5-6 seconds on Stellar. This is significantly faster than the T+1 or T+2 settlement typical of traditional securities.

### Existing Institutional Ecosystem
By launching on Stellar, YLDS joins an ecosystem that already includes Franklin Templeton's BENJI, Mercado Bitcoin's tokenized fixed income, and over $2 billion in total onchain RWAs. This existing institutional presence provides credibility and potential interoperability.

## Figure's Blockchain Track Record

Figure is not new to blockchain. The company has been one of the more active institutional players in the space:

- **Figure Lending**: Home equity line of credit (HELOC) origination on blockchain
- **Provenance Blockchain**: Figure helped develop the Provenance blockchain for financial services
- **Securitization**: Figure has used blockchain for loan securitization, bringing transparency to traditionally opaque processes

The launch of YLDS on Stellar represents an expansion of Figure's blockchain strategy to a new network, driven by Stellar's specific advantages for tokenized financial products.

## What YLDS Means for Stellar

### Validation of the RWA Thesis
Each new institutional issuer on Stellar reinforces the network's RWA thesis. YLDS adds yield-bearing products to a tokenized asset ecosystem that already includes money market funds, fixed income, real estate, and stablecoins.

### Expanding the Asset Spectrum
Before YLDS, Stellar's tokenized asset ecosystem was weighted toward fixed-income and money market products. A tokenized yield product adds a new asset class, diversifying the network's RWA portfolio.

### Institutional Liquidity
Institutional assets bring institutional liquidity. As more yield products launch on Stellar, the network becomes a more attractive venue for institutional capital, creating a flywheel effect.

### Developer Opportunities
YLDS and similar products create demand for:
- **Wallet infrastructure** that supports institutional custody requirements
- **Analytics platforms** that track yield performance and distributions
- **Integration tools** that connect onchain yield products to traditional portfolio management systems
- **Compliance dashboards** that provide regulatory reporting for tokenized yield positions

## The Growing Tokenized Yield Market

YLDS is part of a broader trend of tokenized yield products across the blockchain industry:

| Product | Network | Type |
|---------|---------|------|
| **BENJI (Franklin Templeton)** | Stellar | Tokenized money market fund |
| **BUIDL (BlackRock)** | Ethereum | Tokenized treasury fund |
| **USDY (Ondo Finance)** | Multiple | Yield-bearing stablecoin |
| **yXLM** | Stellar | XLM staking yield token |
| **YLDS (Figure)** | Stellar | Tokenized yield product |

The trend is clear: institutional players are moving yield products onchain for the operational advantages — transparency, instant settlement, and reduced intermediary costs.

## Implications for XLM

Tokenized yield products on Stellar have a direct, if modest, impact on XLM demand:

1. **Account reserves**: Every YLDS holder needs an XLM balance for account reserves and trustlines
2. **Transaction fees**: Every distribution, transfer, and redemption requires XLM for fees
3. **Network activity**: More institutional activity means more transactions, which increases the network's utility metrics

These are not speculative demand drivers — they are structural requirements of operating on the Stellar network.

## For Developers

The institutional yield space on Stellar is growing. LumenQuery provides the infrastructure to build applications around these products:

- **[Horizon API](/docs)**: Query asset details, holder distributions, and transaction history
- **[Portfolio Intelligence](/portfolio)**: Track yield positions across multiple accounts
- **[Network Analytics](/analytics)**: Monitor institutional asset activity on Stellar

---

*Figure's YLDS launch adds another institutional asset to Stellar. Build applications for the tokenized yield economy with [LumenQuery](/auth/signup) — enterprise-grade Stellar API infrastructure, starting free.*
    `,
  },
  'xlm-price-016-may-2026-outlook': {
    title: 'XLM at $0.16 in May 2026: On-Chain Strength Behind a Quiet Price',
    date: '2026-05-15',
    readTime: '7 min read',
    category: 'Market Analysis',
    content: `
Stellar Lumens (XLM) is trading around $0.16 as of May 15, 2026. Yahoo Finance shows XLM near $0.162, Kraken lists it in the $0.15-$0.16 range, and market chatter is focused on whether the token can establish a floor in the $0.16-$0.17 zone. The price has been quiet — but the network underneath has not.

## Current Market Snapshot

| Metric | Value |
|--------|-------|
| **Price** | ~$0.162 |
| **24h Range** | $0.155 - $0.167 |
| **Market Cap** | ~$4.8 billion |
| **Circulating Supply** | ~30 billion XLM |
| **Market Cap Rank** | #18-20 |
| **Key Resistance** | $0.17 - $0.18 |
| **Key Support** | $0.14 - $0.15 |

## Why the Price Matters Less Than You Think

XLM's price has been range-bound for weeks, and that tends to generate two types of commentary: "it is dead" or "it is coiling for a breakout." Neither is particularly useful without looking at what the network is actually doing.

Here is what the network is doing:

### Bermuda Goes Onchain
On May 12, SDF announced that Stellar will power Bermuda's plan for a fully onchain economy. A sovereign nation choosing Stellar for its payment infrastructure is not priced into a $0.16 token. This is the kind of adoption milestone that takes months or years to fully manifest in network activity and, eventually, price.

### $2 Billion in Tokenized RWAs
Onchain real-world assets on Stellar surpassed $2 billion in Q1 2026. This is not speculative volume — it is institutional capital (Franklin Templeton, Mercado Bitcoin, RedSwan, Figure) using Stellar as financial infrastructure.

### SDF Invests in Ascend
SDF's May 4 strategic investment in Ascend, a compliant RWA infrastructure platform, signals that the foundation is deploying capital to accelerate institutional adoption. This is a long-term supply-side investment in the network's RWA capabilities.

### Figure Launches YLDS
Figure's YLDS tokenized yield product went live on Stellar on May 5, adding another institutional-grade asset to the network. Each new tokenized product brings structured demand for XLM (reserves, fees) and increases the network's utility.

## On-Chain Fundamentals

The gap between XLM's price and its on-chain fundamentals continues to widen:

### Network Activity
- **Daily transactions**: 5-10 million per day
- **Record**: 14.1 million transactions in a single day (April 2026)
- **TPS**: Regularly sustaining 60-100+ transactions per second
- **Active accounts**: Over 10.5 million funded accounts

### Stablecoin Ecosystem
- **USDC holders**: 2.1 million+ accounts
- **USDC volume**: Billions in annual settlement
- **EURAU**: MiCAR-compliant euro stablecoin launched
- **MoneyGram**: Active stablecoin remittance corridors in 200+ countries

### Institutional Adoption
| Institution | Product | Status |
|-------------|---------|--------|
| Franklin Templeton | BENJI tokenized fund | 5 years running |
| MoneyGram | Stablecoin remittances | 200+ countries |
| Mercado Bitcoin | Tokenized fixed income | $200M issued |
| RedSwan | Tokenized real estate | $100M issued |
| Figure | YLDS tokenized yield | Launched May 2026 |
| Circle | USDC on Stellar | 2.1M holders |
| Bermuda | National payment system | Announced May 2026 |

## The $0.16-$0.17 Range

Market participants are watching two things:

### Support at $0.14-$0.15
XLM has established a floor in the $0.14-$0.15 range over the past several months. This level has held through broader crypto market weakness, suggesting that there is structural buying interest at these levels. The growing institutional use of the network creates non-speculative demand that puts a floor under the price.

### Resistance at $0.17-$0.18
The $0.17-$0.18 zone has been the ceiling for recent price action. Breaking above this level would require a catalyst — which could come from the Bermuda implementation timeline, additional RWA issuances, or a broader crypto market recovery.

### Volume Profile
Daily trading volume of $100-150 million against a ~$4.8 billion market cap indicates healthy liquidity without excessive speculation. The volume-to-market-cap ratio suggests genuine trading interest rather than wash trading.

## What Could Move XLM Higher

Several potential catalysts sit on the horizon:

1. **Bermuda implementation milestones**: As Bermuda's onchain economy moves from announcement to implementation, each milestone could increase attention on Stellar
2. **Additional RWA issuances**: The $2B Q1 figure could grow significantly if additional institutional issuers join the network
3. **Protocol 26 (Yardstick)**: The upcoming network upgrade could boost developer activity and network capacity
4. **Stablecoin growth**: Continued USDC and EURC expansion directly increases XLM demand for reserves
5. **Broader crypto recovery**: XLM tends to outperform during broad market rallies due to its relatively low market cap and strong fundamentals
6. **Regulatory clarity**: The GENIUS Act and continued regulatory progress in the U.S. could unlock institutional capital

## What Could Keep XLM Subdued

Honest analysis requires considering the downside:

- **Macro headwinds**: If the broader crypto market continues to trade sideways, XLM is unlikely to break out on its own
- **Narrative competition**: Memecoins, AI tokens, and L2s tend to capture retail attention, leaving infrastructure plays like Stellar underweighted in speculative portfolios
- **Token supply**: With ~30 billion XLM circulating out of ~50 billion total, future supply increases could dilute price appreciation

## For Builders, Not Speculators

The disconnect between XLM's price and Stellar's network fundamentals creates an unusual situation: the network is more useful, more adopted, and more institutionally embedded than ever, while the token trades near levels it has visited multiple times.

For developers and builders, this is arguably the best time to build on Stellar. The infrastructure is mature, the institutional partners are real, and the developer tools are production-grade.

Track Stellar's network health in real time:

- **[Network Analytics](/analytics)**: Live ledger metrics, TPS, and fee data
- **[Live Transactions](/dashboard/transactions)**: Watch Stellar transactions in real time
- **[Horizon API](/docs)**: Query any account, transaction, or asset on the network

---

*XLM's price is quiet but the network is not. Monitor Stellar's on-chain fundamentals with [LumenQuery](/auth/signup) — real-time analytics and enterprise-grade API access, starting free.*
    `,
  },
  'franklin-templeton-benji-stellar-5-years': {
    title: 'Franklin Templeton and Stellar Mark 5 Years of BENJI: The Tokenized Money Market Fund That Started It All',
    date: '2026-05-03',
    readTime: '9 min read',
    category: 'RWA Tokenization',
    content: `
In May 2026, Franklin Templeton and the Stellar network mark a significant milestone: five years since the launch of the Franklin OnChain U.S. Government Money Fund, better known by its ticker symbol BENJI. It was the first U.S.-registered fund to use a public blockchain for processing transactions and recording share ownership — and it chose Stellar.

## What Is BENJI?

BENJI is a tokenized money market fund that holds U.S. government securities. Each share of the fund is represented as a token on the Stellar blockchain, making it one of the earliest and most prominent examples of real-world asset (RWA) tokenization by a major financial institution.

Key facts about BENJI:
- **Issuer**: Franklin Templeton, a $1.5 trillion asset manager
- **Underlying assets**: U.S. government securities (T-bills, repos)
- **Blockchain**: Stellar (primary), with Polygon as secondary
- **Launch**: 2021, making it one of the first tokenized funds on a public chain
- **Regulation**: Fully registered with the SEC as a mutual fund

## Why Stellar?

Franklin Templeton's decision to build on Stellar was deliberate. The network's characteristics aligned with the requirements of regulated financial products:

### 1. Low and Predictable Fees
Stellar transactions cost a fraction of a cent. For a money market fund processing thousands of share transfers daily, this is critical. Ethereum gas fees would make small-denomination transfers economically impractical.

### 2. Fast Settlement
Stellar ledgers close every 5-6 seconds with finality. There are no reorgs, no waiting for confirmations. For a financial product where investors expect near-instant settlement, this matters.

### 3. Regulatory Compatibility
Stellar's built-in compliance features — including authorization flags on assets and clawback capabilities — allow issuers to maintain the regulatory controls required for registered securities.

### 4. Network Stability
Over five years, Stellar has maintained 99.99% uptime. For a fund that needs to process transactions every business day, network reliability is non-negotiable.

## The Broader RWA Tokenization Movement

BENJI was early, but it was not alone for long. The five years since its launch have seen an explosion of tokenized real-world assets on Stellar and other blockchains:

- **Tokenized Treasuries**: BlackRock's BUIDL, Ondo Finance's USDY, and others have followed Franklin Templeton's lead
- **Real Estate**: RedSwan brought $100M in tokenized commercial real estate to Stellar
- **Fixed Income**: Mercado Bitcoin issued $200M in tokenized fixed income on the network
- **Stablecoins**: USDC on Stellar now has over 2 million holders and $240M in circulation

The total tokenized RWA market has grown from under $1 billion when BENJI launched to over $30 billion across all chains in 2026.

## What Five Years of BENJI Proves

### Institutional Blockchain Adoption Is Real
A $1.5 trillion asset manager running a regulated fund on a public blockchain for five years is not an experiment. It is a production deployment that has processed millions of transactions and operated through multiple market cycles.

### Stellar Works for Financial Infrastructure
The network has handled BENJI's requirements without incident for half a decade. The low fees, fast settlement, and compliance features that made Stellar attractive in 2021 remain its core strengths.

### Tokenization Is Not a Fad
BENJI's five-year track record demonstrates that tokenized funds are not a novelty — they are a structural improvement in how financial products can operate. On-chain settlement, transparent record-keeping, and programmable compliance are genuine advantages.

## What Comes Next

The next phase of RWA tokenization on Stellar is likely to include:

1. **More fund types**: Beyond money markets to bond funds, equity funds, and structured products
2. **Secondary market trading**: Tokenized fund shares trading peer-to-peer on the Stellar DEX
3. **Soroban integration**: Smart contracts enabling complex DeFi interactions with tokenized RWAs
4. **Cross-border distribution**: Leveraging Stellar's global anchor network to distribute tokenized funds internationally
5. **Interoperability**: Cross-chain bridges allowing tokenized RWAs to move between Stellar and other networks

## For Developers

If you are building in the RWA tokenization space, Stellar's infrastructure is mature and battle-tested. LumenQuery provides the API layer you need:

- **[Horizon API](/docs)**: Query asset details, holder counts, and transaction history for tokenized assets
- **[Network Analytics](/analytics)**: Monitor the growth of tokenized assets on Stellar in real time
- **[Stellar Explorer](/stellar)**: See all Stellar assets, including tokenized funds, in one dashboard

---

*Franklin Templeton's BENJI has proven that public blockchains can serve institutional finance. Build on the same network with [LumenQuery](/auth/signup) — enterprise-grade Stellar infrastructure, starting free.*
    `,
  },
  'xlm-price-may-2026-market-cap-ranking': {
    title: 'XLM at $0.159: Stellar Holds Steady at #19 by Market Cap in May 2026',
    date: '2026-05-03',
    readTime: '7 min read',
    category: 'Market Analysis',
    content: `
As of May 3, 2026, Stellar Lumens (XLM) is trading at approximately $0.159, with CoinMarketCap placing it at #19 by total market capitalization. While not making headlines with dramatic price swings, XLM's steady positioning in the top 20 reflects the underlying strength and growing utility of the Stellar network.

## Current Market Snapshot

| Metric | Value |
|--------|-------|
| **Price** | ~$0.159 |
| **Market Cap Rank** | #19 |
| **Market Cap** | ~$4.7 billion |
| **24h Volume** | ~$120-150 million |
| **Circulating Supply** | ~30 billion XLM |
| **Total Supply** | ~105.4 billion XLM |

## What the #19 Ranking Means

XLM's position in the top 20 is notable for several reasons:

### Staying Power
Stellar has maintained a top-20 market cap position through multiple bear and bull cycles. Unlike many projects that surge during hype cycles and disappear, XLM's valuation is supported by consistent network usage and institutional adoption.

### Relative Valuation
At $4.7 billion, Stellar's market cap is a fraction of competitors like Ripple (XRP) or Solana. This is despite Stellar processing comparable real-world transaction volume and having institutional partners like Franklin Templeton, MoneyGram, and Circle.

### Volume-to-Market-Cap Ratio
Daily trading volume of $120-150 million against a $4.7 billion market cap suggests healthy liquidity without excessive speculation. The ratio indicates genuine trading interest rather than wash trading or artificial inflation.

## On-Chain Fundamentals

The price tells one story, but the on-chain data tells another — often a more important one:

### Network Activity
- **Daily transactions**: Averaging 5-10 million per day
- **Active accounts**: Over 10.5 million funded accounts
- **USDC holders**: Over 2.1 million accounts holding USDC on Stellar
- **TPS**: Regularly sustaining 60-100+ transactions per second

### Asset Ecosystem
Stellar hosts a diverse and growing asset ecosystem:
- **USDC**: $240M+ in circulation with 2.1M holders
- **AQUA**: 190K+ holders driving DeFi activity
- **SHX**: 87K+ holders in the Stronghold ecosystem
- **yXLM**: 52K+ holders earning yield on their XLM

### Developer Activity
The Soroban smart contract platform continues to attract developer interest, with increasing contract deployments and invocations visible on the network.

## Why $0.159 May Be Undervalued

Several metrics suggest XLM's current price does not fully reflect the network's fundamentals:

### 1. Payment Volume
Stellar processes billions of dollars in payment volume annually. Few networks outside of Ethereum and Tron handle comparable real-money movement, yet both have significantly higher valuations.

### 2. Institutional Adoption
Having Franklin Templeton, MoneyGram, Circle, and Mercado Bitcoin building on your network is a level of institutional validation that most blockchain projects cannot claim.

### 3. Regulatory Clarity
XLM has been classified as a commodity in several jurisdictions, giving it regulatory clarity that many competing tokens lack. This clarity is increasingly important as institutional adoption grows.

### 4. Real Utility
Unlike many top-20 tokens whose value is primarily speculative, XLM is used daily for cross-border payments, stablecoin settlement, and RWA transactions. This real utility provides a valuation floor.

## What Could Move the Price

Potential catalysts for XLM appreciation:
- **Protocol 26 (Yardstick)**: The upcoming network upgrade could boost developer activity and network capacity
- **Additional RWA issuances**: More tokenized funds and securities on Stellar would increase XLM demand for reserves and fees
- **Stablecoin growth**: Continued USDC and EURC growth on Stellar directly increases XLM demand (every account needs XLM for reserves)
- **Broader crypto recovery**: A rising tide in the overall crypto market would lift XLM, potentially disproportionately if fundamentals are currently undervalued

## Tracking XLM in Real Time

Monitor XLM and the Stellar network live on LumenQuery:

- **[Stellar Explorer](/stellar)**: Real-time XLM price, market cap, network TPS, and top assets
- **[Network Analytics](/analytics)**: Detailed ledger metrics, transaction counts, and fee data
- **[Live Transactions](/dashboard/transactions)**: Watch Stellar transactions streaming in real time

---

*Stay on top of the Stellar network with [LumenQuery](/stellar). Live price, on-chain metrics, and real-time transaction data — all in one dashboard.*
    `,
  },
  'stellar-payments-defi-rwa-positioning-2026': {
    title: 'Stellar in 2026: How SDF Is Positioning the Network Around Payments, DeFi, and Asset Tokenization',
    date: '2026-05-03',
    readTime: '10 min read',
    category: 'Industry Insights',
    content: `
The Stellar Development Foundation (SDF) has been steadily executing a three-pillar strategy: payments, decentralized finance (DeFi), and real-world asset (RWA) tokenization. In 2026, these three pillars are no longer aspirational — they are operational, with real institutions and real money flowing through the network.

## Pillar 1: Payments and Remittances

Payments have been Stellar's core use case since its founding, and the network's payment infrastructure is now among the most mature in the blockchain industry.

### Cross-Border Remittances
Stellar's partnership with MoneyGram, extended in 2026, enables stablecoin-powered remittances across 200+ countries through 500,000+ agent locations. This is not a pilot program — it is a production system processing real transfers for real people.

The mechanics are straightforward:
1. A sender deposits local currency at a MoneyGram location
2. The funds are converted to USDC on Stellar
3. USDC is transferred to the recipient's local MoneyGram agent
4. The recipient withdraws in local currency

Total settlement time: minutes, not days. Cost: a fraction of traditional remittance fees.

### Stablecoin Settlement
USDC on Stellar has crossed 2.1 million holder accounts, making it one of the most widely held assets on the network. Circle's commitment to Stellar as a primary USDC chain has been a significant driver of network growth.

The addition of EURC (Euro Coin) and MiCAR-compliant stablecoins has opened European corridors, while local stablecoin anchors serve markets in Latin America, Southeast Asia, and Africa.

### Anchor Network
Stellar's anchor network — the on-and-off-ramp providers that bridge traditional finance to the blockchain — continues to expand. More anchors mean more corridors, which means more utility for the network.

## Pillar 2: Decentralized Finance (DeFi)

With the launch of Soroban, Stellar gained smart contract capabilities that enable a full DeFi stack.

### Soroban Smart Contracts
Soroban, Stellar's smart contract platform built on WebAssembly (WASM), has been live on mainnet since 2024. In 2026, the ecosystem has matured significantly:

- **AMMs and DEXs**: Automated market makers and decentralized exchanges built on Soroban
- **Lending protocols**: Borrow-and-lend platforms using Stellar assets as collateral
- **Yield aggregators**: Protocols like yXLM (52K+ holders) that optimize yield across the network
- **Bridges**: Cross-chain bridges connecting Stellar to Ethereum, Polygon, and other networks

### AQUA Token
The AQUA token, with over 190,000 holders, has become the de facto governance and incentive token for DeFi on Stellar. The Aquarius protocol uses AQUA to reward liquidity providers and govern the distribution of DEX incentives.

### Built-in DEX
Stellar's protocol-level decentralized exchange remains operational alongside Soroban-based AMMs. The built-in DEX offers atomic path payments that can route through multiple order books to find the best exchange rate — a feature unique to Stellar at the protocol level.

## Pillar 3: Real-World Asset Tokenization

This is where Stellar's 2026 story gets most interesting. The network has become a serious contender in the RWA tokenization space.

### Tokenized Treasuries and Money Market Funds
- **Franklin Templeton's BENJI**: Five years running on Stellar, the first U.S.-registered tokenized fund
- **Other fund managers** are exploring Stellar for tokenized treasuries, attracted by BENJI's track record and Stellar's low fees

### Tokenized Securities
- **Mercado Bitcoin**: $200M in tokenized fixed income on Stellar
- **RedSwan**: $100M in tokenized commercial real estate
- **RIO (Realio)**: 22K+ holders of tokenized real estate and fund tokens

### Why Institutions Choose Stellar for RWAs
1. **Compliance features**: Asset authorization, clawback, and freeze capabilities at the protocol level
2. **Low fees**: Fractions of a cent per transaction, making small-denomination securities economical
3. **Fast finality**: 5-6 second settlement with no reorgs
4. **Track record**: Five years of Franklin Templeton running a regulated fund on-chain
5. **Regulatory clarity**: XLM classified as a commodity, reducing legal risk for building on the network

## SDF's Institutional Strategy

The Stellar Development Foundation's approach has been distinctly different from many blockchain foundations:

### Focus on Compliance
Rather than pursuing maximum decentralization at the expense of regulatory compatibility, SDF has worked to make Stellar friendly to regulated institutions. This pragmatic approach has paid off with partnerships that other networks cannot match.

### Real Use Cases Over Hype
SDF consistently highlights measurable outcomes: payment volume processed, assets tokenized, accounts created. The marketing focuses on what the network does, not what it might do someday.

### Developer Tooling
SDF invests heavily in developer experience:
- Comprehensive SDKs (JavaScript, Go, Python, Java, Rust)
- Soroban development tools and testnet
- Horizon API for querying network state
- Extensive documentation and tutorials

## What This Means for Developers

Stellar in 2026 offers a mature platform across all three pillars:

- **Payments**: Build remittance apps, payment processors, or stablecoin services on proven infrastructure
- **DeFi**: Create lending protocols, AMMs, or yield products using Soroban
- **RWAs**: Tokenize securities, real estate, or fund shares with built-in compliance tools

LumenQuery provides the API infrastructure to build on all three:
- **[Horizon API](/docs)**: Full access to accounts, transactions, assets, and payments
- **[Soroban RPC](/docs/contracts)**: Deploy and interact with smart contracts
- **[Stellar Explorer](/stellar)**: Monitor all assets and network activity in real time

---

*Stellar's three-pillar strategy is delivering real results. Build your next payments, DeFi, or RWA application with [LumenQuery](/auth/signup) — enterprise-grade Stellar infrastructure, starting free.*
    `,
  },
  'xlm-technical-analysis-breakout-levels-may-2026': {
    title: 'XLM Technical Analysis: Can Stellar Break Above $0.20, or Is $0.14 Support the Next Test?',
    date: '2026-05-03',
    readTime: '8 min read',
    category: 'Market Analysis',
    content: `
XLM has been consolidating in a range that has market participants watching two key zones: resistance at $0.18-$0.20 and support at $0.14-$0.16. With the token currently trading around $0.159, the next significant move will likely be determined by a combination of broader crypto sentiment, on-chain fundamentals, and key technical levels.

## Current Price Structure

As of early May 2026, XLM is trading in what technicians would call a consolidation range:

| Level | Price | Significance |
|-------|-------|-------------|
| **Major Resistance** | $0.20 | Psychological level, previous rejection zone |
| **Near Resistance** | $0.18 | Multi-week high, first hurdle to clear |
| **Current Price** | ~$0.159 | Mid-range, neutral positioning |
| **Near Support** | $0.155 | Recent accumulation zone |
| **Major Support** | $0.14 | Must hold to maintain bullish structure |

## The Bull Case: Breaking Above $0.20

For XLM to break convincingly above $0.20, several conditions would likely need to align:

### 1. Broader Crypto Market Momentum
XLM does not move in isolation. Bitcoin and Ethereum leading a market-wide rally would provide the tailwind needed for XLM to test higher levels. Historically, XLM tends to outperform during broad-based altcoin rallies.

### 2. Volume Confirmation
A breakout above $0.18 on increasing volume would be the first signal. Without volume, any push above resistance is likely to be a fakeout. Traders should look for daily volume exceeding $200M+ on the breakout candle.

### 3. On-Chain Catalysts
Network-specific catalysts that could drive buying pressure:
- **Protocol 26 (Yardstick) mainnet launch**: Scheduled for May/June 2026
- **New institutional RWA issuances**: Additional tokenized funds or securities on Stellar
- **Stablecoin growth milestones**: USDC crossing 2.5M or 3M holders on Stellar
- **Major partnership announcements**: New MoneyGram corridors or institutional integrations

### 4. Price Targets If $0.20 Breaks
If XLM clears $0.20 with conviction, the next levels to watch are:
- **$0.22-$0.24**: Previous consolidation zone from earlier in the cycle
- **$0.28-$0.30**: Major psychological and technical resistance
- **$0.35+**: Requires significant market euphoria or network-specific catalyst

## The Bear Case: Testing $0.14 Support

Downside risk remains real, and traders should be prepared for a retest of lower levels:

### 1. Broader Market Weakness
If Bitcoin drops below its own key support levels, XLM will almost certainly follow. Altcoins typically fall faster than Bitcoin during market-wide selloffs.

### 2. Risk-Off Sentiment
Macroeconomic factors — interest rate decisions, inflation data, geopolitical events — can drive capital out of crypto assets quickly. XLM, as a mid-cap altcoin, is more vulnerable to these flows than large-cap tokens.

### 3. Support Levels If $0.155 Breaks
- **$0.14-$0.145**: Critical support zone; a close below here would signal a shift in market structure
- **$0.12-$0.13**: Next significant demand zone if $0.14 fails
- **$0.10**: Psychological floor, would represent a significant correction

## What On-Chain Data Says

Beyond price charts, on-chain metrics provide additional context:

### Network Activity Is Strong
- **10.5M+ accounts**: The network is not shrinking
- **USDC at 2.1M holders**: Genuine utility driving account creation
- **Daily transactions**: Consistently in the millions
- **TPS**: Sustaining 60-100+ transactions per second

### Holder Distribution
Large holder (whale) activity can signal direction:
- **Accumulation signals**: Exchange outflows suggest holders are moving XLM to private wallets, reducing sell pressure
- **Active addresses**: Steady growth in unique active addresses supports the fundamental thesis
- **Staking and yield**: Tokens locked in yXLM and DeFi protocols reduce circulating supply

### Fee Revenue
Stellar's fee model is different from proof-of-stake chains — fees are minimal by design. However, the number of fee-paying transactions is a direct measure of network demand, and this metric continues to trend upward.

## Trading Considerations

### For Short-Term Traders
- Watch the $0.155-$0.160 zone closely — this is the current battleground
- A daily close above $0.165 on above-average volume would be the first bullish signal
- Use the $0.14 level as a stop-loss reference for long positions
- Be cautious of fakeouts around $0.18 — wait for volume confirmation

### For Long-Term Holders
- The on-chain fundamentals (network activity, institutional adoption, RWA growth) remain strong regardless of short-term price action
- Dollar-cost averaging in the $0.14-$0.16 range has historically been a favorable entry zone
- Focus on network metrics rather than daily price movements

### For Developers
- Token price is secondary to network health when evaluating a platform for building
- Stellar's consistent network activity, growing user base, and institutional partnerships are more relevant than short-term price movements
- LumenQuery's [Stellar Explorer](/stellar) provides real-time network metrics to help assess network health independent of price

## Key Dates to Watch

| Date | Event | Potential Impact |
|------|-------|-----------------|
| May 2026 | Protocol 26 validator vote | High — could drive narrative and activity |
| May/June 2026 | Protocol 26 mainnet | High — network upgrade visibility |
| Ongoing | USDC holder milestones | Medium — organic demand signal |
| Ongoing | RWA issuance announcements | Medium to High — institutional signal |

## Monitor in Real Time

Track the metrics that matter for XLM price analysis:

- **[Stellar Explorer](/stellar)**: Live XLM price, market cap, and network stats
- **[Network Analytics](/analytics)**: Transaction volume, TPS, and success rates
- **[Live Transactions](/dashboard/transactions)**: Watch real-time network activity

---

*Technical analysis is one input among many. For a complete picture of the Stellar network, monitor on-chain fundamentals alongside price at [lumenquery.io/stellar](/stellar). Enterprise-grade data, starting free.*
    `,
  },
  'stellar-record-14-million-transactions': {
    title: 'Stellar Hits Record 14.1 Million Transactions in a Single Day',
    date: '2026-04-19',
    readTime: '8 min read',
    category: 'Network Performance',
    content: `
The Stellar network has reached a historic milestone: over 14.1 million transactions processed in a single 24-hour period. This new record underscores the growing adoption of Stellar for real-world financial applications, smart contracts, and cross-border payments.

## The Numbers Behind the Record

On April 15, 2026, the Stellar network processed 14,127,843 transactions across approximately 14,400 ledgers. At peak throughput, the network sustained over 250 transactions per second (TPS), well within its current capacity and a testament to the efficiency of the Stellar Consensus Protocol (SCP).

Key metrics from the record-setting day:
- **Total Transactions**: 14.1 million
- **Peak TPS**: ~250
- **Average Ledger Close Time**: 5.2 seconds
- **Success Rate**: 97.3%
- **Total Operations**: 28.4 million (average 2.01 operations per transaction)

## What's Driving the Growth?

Several factors have converged to push Stellar's transaction volume to new heights:

### 1. Real World Asset (RWA) Tokenization

The surge in RWA issuance on Stellar has generated significant on-chain activity. With Mercado Bitcoin's $200M issuance and RedSwan's $100M in tokenized real estate, institutional players are bringing substantial transaction volume to the network.

### 2. Soroban Smart Contract Adoption

Since Soroban's mainnet launch, smart contract interactions have grown steadily. DeFi protocols, automated market makers, and lending platforms built on Soroban are contributing an increasing share of daily transactions.

### 3. Stablecoin Settlement

Cross-border settlement using USDC and other stablecoins on Stellar continues to grow. The integration of MiCAR-compliant stablecoins like EURAU has opened new corridors for European institutional settlement.

### 4. Anchor Network Expansion

Stellar's anchor network, which bridges traditional financial systems to the blockchain, has expanded significantly. More on- and off-ramps mean more transactions flowing through the network.

## What This Means for Developers

For developers building on Stellar, the record transaction volume validates the network's scalability. The upcoming Protocol 26 (Yardstick) upgrade promises to push capacity even further, with the SDF targeting 5,000+ TPS.

If you're building on Stellar, LumenQuery provides the infrastructure you need to keep up with this growing network. Our Horizon API and Soroban RPC endpoints handle millions of queries daily with sub-100ms response times.

## Looking Ahead

With Protocol 26 on the horizon and institutional adoption accelerating, Stellar is well-positioned for continued growth. The 14.1 million transaction milestone is likely just the beginning. As more real-world assets move on-chain and DeFi protocols mature on Soroban, we can expect these records to be broken regularly.

Monitor Stellar network performance in real-time with LumenQuery's free analytics dashboard at [lumenquery.io/analytics](/analytics).
`,
  },
  'stellar-protocol-26-yardstick-upgrade': {
    title: "Protocol 26 (Yardstick): Stellar's Next Major Upgrade Goes Live on Testnet",
    date: '2026-04-19',
    readTime: '10 min read',
    category: 'Protocol Update',
    content: `
On April 16, 2026, the Stellar Development Foundation (SDF) launched the testnet for Protocol 26, codenamed "Yardstick." This upgrade represents a significant step forward in Stellar's capabilities, with a mainnet validator vote scheduled for May 2026.

## What Is Protocol 26 (Yardstick)?

Protocol 26 is the next major upgrade to the Stellar network, building on the foundation laid by Protocol 21 (Soroban launch) and subsequent improvements. The "Yardstick" codename reflects its focus on establishing new benchmarks for network performance and capability.

## Key Changes in Protocol 26

### 1. Enhanced Transaction Throughput

Yardstick introduces optimizations to the Stellar Consensus Protocol (SCP) that enable higher transaction throughput. The target is to support sustained 5,000+ TPS under production conditions, up from the current practical limit of approximately 1,000 TPS.

Key improvements include:
- **Parallel ledger close processing**: Multiple ledger components can now be finalized simultaneously
- **Optimized nomination rounds**: Reduced consensus overhead for faster agreement
- **Batch transaction validation**: Groups of transactions validated together for efficiency

### 2. Soroban VM Improvements

The Soroban smart contract runtime receives several enhancements:
- **Increased compute budget**: Smart contracts can perform more complex operations per invocation
- **Memory optimizations**: Reduced memory overhead for contract execution
- **New host functions**: Additional built-in functions for common operations (hashing, cryptographic verification)
- **Improved state archival**: More efficient handling of archived contract state

### 3. Network Fee Refinements

Protocol 26 introduces a more dynamic fee model:
- **Surge pricing improvements**: Smoother fee scaling during high-demand periods
- **Fee estimation API**: New RPC method for accurate fee prediction
- **Resource-based pricing**: Fees more closely reflect actual computational resources consumed

### 4. Cross-Chain Interoperability Primitives

New protocol-level features to support cross-chain communication:
- **Hash time-locked contracts (HTLCs)** at the protocol level for atomic swaps
- **Standardized bridge message format** for interoperability protocols
- **Merkle proof verification** as a native operation

## Testnet Timeline

| Milestone | Date | Status |
|-----------|------|--------|
| Testnet Launch | April 16, 2026 | Active |
| Developer Preview | April 21, 2026 | Upcoming |
| Public Testing Period | April 21 - May 10, 2026 | Upcoming |
| Validator Vote | May 2026 | Scheduled |
| Mainnet Activation | May/June 2026 | Pending Vote |

## What Developers Should Do

### 1. Test Your Applications

If you have applications running on Stellar, test them against the Protocol 26 testnet. Focus on:
- Transaction submission and fee estimation
- Soroban contract interactions
- Any custom logic that depends on protocol-specific behavior

### 2. Update Your SDKs

The Stellar SDK team will release updated versions of all official SDKs (JavaScript, Go, Python, Java) with Protocol 26 support. Update early to take advantage of new features.

### 3. Review New Host Functions

If you're building Soroban contracts, review the new host functions available in Protocol 26. These can simplify your contract code and reduce gas costs.

## How to Connect to the Testnet

You can connect to the Protocol 26 testnet using:

\`\`\`bash
# Horizon API (testnet)
curl https://horizon-testnet.stellar.org/ledgers?limit=1

# Soroban RPC (testnet)
curl -X POST https://soroban-testnet.stellar.org \\
  -H "Content-Type: application/json" \\
  -d '{"jsonrpc":"2.0","id":1,"method":"getHealth"}'
\`\`\`

## Impact on LumenQuery

LumenQuery will fully support Protocol 26 features as they become available on mainnet. Our Horizon API and Soroban RPC endpoints will be updated to handle new transaction types, fee models, and host functions. No action is required from LumenQuery users; the transition will be seamless.

Stay informed about Protocol 26 progress through our analytics dashboard and documentation at [lumenquery.io/docs](/docs).
`,
  },
  'stellar-institutional-rwa-adoption-2026': {
    title: 'Mercado Bitcoin and RedSwan Bring $300M in Real World Assets to Stellar',
    date: '2026-04-19',
    readTime: '9 min read',
    category: 'Industry Insights',
    content: `
Two major announcements have positioned Stellar as a leading blockchain for Real World Asset (RWA) tokenization: Mercado Bitcoin's $200 million RWA issuance and RedSwan's $100 million in tokenized commercial real estate. Together, these represent $300 million in institutional assets coming to the Stellar network.

## Mercado Bitcoin: $200M RWA Issuance

Mercado Bitcoin, Latin America's largest cryptocurrency exchange, announced a $200 million Real World Asset issuance on the Stellar network. The issuance covers a diversified portfolio of assets including:

- **Government bonds**: Brazilian treasury securities tokenized for fractional ownership
- **Corporate debt**: Fixed-income instruments from major Latin American corporations
- **Receivables**: Trade finance receivables providing yield to token holders

### Why Stellar?

Mercado Bitcoin chose Stellar for several key reasons:
- **Speed**: 5-second finality enables near-instant settlement
- **Cost**: Transaction fees of fractions of a cent make micro-transactions viable
- **Compliance**: Stellar's built-in compliance features (authorization flags, clawback) meet regulatory requirements
- **Interoperability**: Integration with existing financial infrastructure through Stellar anchors

## RedSwan: $100M Tokenized Real Estate

RedSwan, a commercial real estate tokenization platform, brought $100 million in tokenized properties to Stellar. The portfolio includes:

- **Class A office buildings** in major U.S. metropolitan areas
- **Industrial warehouses** supporting e-commerce logistics
- **Multi-family residential** properties in high-growth markets

### How It Works

RedSwan's tokenization model on Stellar allows investors to:
1. Purchase fractional ownership in commercial real estate
2. Receive proportional rental income distributions via Stellar payments
3. Trade tokens on secondary markets with instant settlement
4. Access institutional-grade properties with minimums as low as $1,000

## The Broader RWA Trend on Stellar

These announcements are part of a larger trend. Stellar has become a preferred blockchain for RWA tokenization due to its design philosophy, which prioritizes real-world financial use cases over speculative DeFi.

### Total RWA Volume on Stellar

| Category | Volume | Growth (YoY) |
|----------|--------|--------------|
| Government Bonds | $450M | +180% |
| Corporate Debt | $320M | +150% |
| Real Estate | $280M | +220% |
| Commodities | $150M | +90% |
| Trade Finance | $200M | +160% |

### Stellar's RWA Advantages

1. **Regulatory Alignment**: Built-in compliance primitives that regulators understand
2. **Institutional Track Record**: MoneyGram, Circle (USDC), and Franklin Templeton already on Stellar
3. **Global Anchor Network**: On/off ramps in 30+ countries for fiat conversion
4. **Soroban Smart Contracts**: Programmable compliance, automated distributions, and complex financial logic

## What This Means for Developers

For developers building on Stellar, the RWA wave presents significant opportunities:

- **Payment infrastructure**: Build settlement and distribution systems for tokenized assets
- **Analytics platforms**: Create dashboards for tracking RWA performance and flows
- **Compliance tools**: Develop monitoring and reporting systems for regulated assets
- **Trading interfaces**: Build secondary market platforms for tokenized securities

LumenQuery provides the API infrastructure developers need to build these applications. Our Horizon API gives access to all on-chain RWA transaction data, while our analytics dashboard tracks asset flows in real-time.

Explore Stellar's growing RWA ecosystem through [LumenQuery Analytics](/analytics) and start building with our [API documentation](/docs).
`,
  },
  'micar-eurau-stablecoin-stellar': {
    title: 'MiCAR-Compliant EURAU Stablecoin Launches on Stellar for European Settlement',
    date: '2026-04-19',
    readTime: '7 min read',
    category: 'Stablecoins',
    content: `
The European institutional crypto landscape has reached a new milestone with the integration of EURAU, a MiCAR-compliant euro stablecoin, on the Stellar network. Designed specifically for institutional settlement, EURAU bridges the gap between European regulatory requirements and blockchain efficiency.

## What Is EURAU?

EURAU is a euro-denominated stablecoin fully compliant with the European Union's Markets in Crypto-Assets Regulation (MiCAR). Key characteristics include:

- **1:1 Euro Backing**: Every EURAU token is backed by euro reserves held in regulated European financial institutions
- **MiCAR Compliance**: Meets all requirements for electronic money tokens (EMTs) under EU regulation
- **Institutional Focus**: Designed for settlement between financial institutions, not retail speculation
- **Stellar Native**: Issued as a Stellar asset with built-in compliance controls

## Why MiCAR Matters

MiCAR, which came into full effect in 2025, establishes a comprehensive regulatory framework for crypto-assets in the European Union. For stablecoins, MiCAR requires:

1. **Reserve requirements**: Full backing with high-quality liquid assets
2. **Transparency**: Regular audits and public disclosures of reserves
3. **Consumer protection**: Clear rights for token holders to redeem at par value
4. **Operational resilience**: Robust IT systems and business continuity planning
5. **Governance**: Strong internal controls and risk management frameworks

EURAU meets all these requirements, making it one of the first fully MiCAR-compliant stablecoins available on a public blockchain.

## Why Stellar?

The choice of Stellar as the settlement layer is strategic:

### Speed and Cost
- 5-second finality vs. minutes or hours on other chains
- Transaction fees of ~0.00001 XLM (~$0.000005) make high-frequency settlement viable

### Compliance Infrastructure
- **Authorization Required flag**: Only approved accounts can hold EURAU
- **Clawback capability**: Regulatory requirement for frozen or seized assets
- **KYC/AML integration**: Stellar's SEP standards for identity verification

### Existing Financial Network
- Circle's USDC already established on Stellar
- MoneyGram corridor for fiat on/off-ramps
- Anchor network in European markets

## Use Cases for EURAU on Stellar

### 1. Cross-Border Settlement
European institutions can settle cross-border payments in seconds using EURAU, eliminating the 1-3 day delays of traditional SEPA transfers for large transactions.

### 2. RWA Distributions
Tokenized real world assets denominated in euros can use EURAU for automated dividend and interest distributions to European investors.

### 3. FX Settlement
EURAU paired with USDC on Stellar enables near-instant EUR/USD settlement without traditional correspondent banking chains.

### 4. Trade Finance
European trade finance instruments can settle using EURAU, reducing counterparty risk and accelerating working capital cycles.

## Impact on the Stellar Ecosystem

The EURAU integration strengthens Stellar's position as the blockchain of choice for regulated financial services. Combined with USDC and other fiat-backed assets, Stellar now supports a growing multi-currency settlement network that meets the world's most stringent regulatory standards.

Track EURAU activity and other stablecoin flows on Stellar using [LumenQuery Analytics](/analytics/tokens).
`,
  },
  'lobstr-xrp-ledger-cross-chain': {
    title: 'LOBSTR Wallet Adds XRP Ledger Support: Cross-Chain Utility Expands',
    date: '2026-04-19',
    readTime: '6 min read',
    category: 'Ecosystem',
    content: `
LOBSTR, one of the most popular wallets in the Stellar ecosystem with over 2 million users, has announced support for the XRP Ledger (XRPL). This cross-chain integration marks a significant step toward greater interoperability between two of the most established payment-focused blockchains.

## What Changed?

LOBSTR users can now:
- **View XRP balances** alongside their Stellar holdings
- **Send and receive XRP** directly within the LOBSTR app
- **Manage XRPL trustlines** for issued assets on the XRP Ledger
- **Swap between XLM and XRP** through integrated bridge functionality
- **Track portfolio value** across both networks in a unified dashboard

## Why This Matters

### 1. Unified User Experience

Previously, users who held assets on both Stellar and XRPL needed separate wallets. LOBSTR's integration eliminates this friction, providing a single interface for managing assets across both networks.

### 2. Cross-Chain Liquidity

By connecting Stellar and XRPL users through a common wallet, LOBSTR creates natural pathways for liquidity to flow between the two networks. This benefits both ecosystems:

- **Stellar users** gain access to XRPL's deep order books and trading pairs
- **XRPL users** gain access to Stellar's stablecoin ecosystem and anchor network

### 3. Network Effect

LOBSTR's 2+ million user base represents a significant distribution channel for XRPL. Similarly, XRPL's established community gains easy access to Stellar's growing DeFi and RWA ecosystem.

## Technical Implementation

LOBSTR's cross-chain support is built on several key technologies:

### Multi-Chain Key Management
- Separate key derivation paths for Stellar and XRPL
- Unified backup and recovery through a single seed phrase
- Hardware wallet support for both networks

### Bridge Integration
- Atomic swaps between XLM and XRP
- Bridge transactions settle in under 10 seconds
- Competitive exchange rates sourced from multiple DEXs

### Unified Asset Display
- Real-time price feeds for both XLM and XRP
- Combined portfolio value tracking
- Transaction history across both networks

## Community Reaction

The Stellar community has largely welcomed the move, seeing it as validation of the network's interoperability vision. Both Stellar and XRPL share a focus on payments and real-world financial applications, making the integration a natural fit.

## What's Next for Cross-Chain Wallets?

LOBSTR's move reflects a broader industry trend toward multi-chain wallets. As blockchain ecosystems mature, users increasingly need tools that work across multiple networks without the complexity of managing separate applications.

For developers building on Stellar, this expansion means more potential users and a broader ecosystem to tap into. LumenQuery's API infrastructure supports developers building cross-chain applications with reliable Horizon API and Soroban RPC access.

Learn more about building on Stellar at [lumenquery.io/docs](/docs).
`,
  },
  'xlm-market-performance-outpacing-crypto': {
    title: "XLM Outpaces the Crypto Market: What's Driving Stellar's Strong Performance",
    date: '2026-04-19',
    readTime: '8 min read',
    category: 'Market Analysis',
    content: `
Stellar Lumens (XLM) has been one of the standout performers in the cryptocurrency market, with weekly gains recently outpacing the average cryptocurrency. While the broader market has shown modest growth, XLM has demonstrated remarkable strength. Let's analyze the catalysts driving this performance.

## XLM Performance Snapshot

Recent performance metrics for XLM:

| Period | XLM Performance | Market Average | Outperformance |
|--------|----------------|----------------|----------------|
| 7 Days | +18.4% | +5.2% | +13.2% |
| 30 Days | +42.7% | +12.1% | +30.6% |
| 90 Days | +85.3% | +28.4% | +56.9% |

*Note: Market average based on top 100 cryptocurrencies by market cap.*

## Key Catalysts

### 1. Record Network Activity

Stellar's network just processed over 14.1 million transactions in a single day, a new all-time record. On-chain activity is one of the most fundamental indicators of a blockchain's utility, and Stellar's growth in this metric has attracted significant investor attention.

### 2. Institutional RWA Adoption

The $300 million in Real World Assets announced by Mercado Bitcoin and RedSwan represents a tangible, revenue-generating use case for the Stellar network. Unlike speculative DeFi protocols, RWA tokenization brings real economic value on-chain, which supports the long-term demand for XLM (required for transaction fees and account reserves).

### 3. Protocol 26 Anticipation

The upcoming Protocol 26 (Yardstick) upgrade, with its promise of 5,000+ TPS and enhanced Soroban capabilities, has generated positive sentiment among developers and investors alike. Protocol upgrades historically correlate with increased network activity and token price appreciation.

### 4. Regulatory Clarity

Stellar's compliance-first approach has positioned it well as global crypto regulation crystallizes. The MiCAR-compliant EURAU stablecoin integration demonstrates that Stellar can operate within the world's most stringent regulatory frameworks, reducing regulatory risk for XLM holders.

### 5. Cross-Chain Expansion

LOBSTR's XRP Ledger integration and other cross-chain developments have expanded XLM's addressable market. More touchpoints for users mean more utility for the token.

## On-Chain Metrics Support the Rally

Beyond price action, several on-chain metrics confirm that XLM's rally is backed by genuine usage growth:

### Active Accounts
The number of active Stellar accounts (those with at least one transaction in the past 30 days) has reached new highs, indicating growing adoption rather than speculative positioning.

### Developer Activity
GitHub commits to Stellar-related repositories have increased, suggesting a growing developer ecosystem building on the network.

### Stablecoin Volume
USDC volume on Stellar has grown consistently, reflecting increased usage for real payment and settlement use cases.

## Technical Analysis

From a technical perspective, XLM has broken above several key resistance levels and is trading with strong momentum. Key observations:

- **Support levels**: Well-established at recent consolidation zones
- **Volume**: Trading volume has increased substantially, confirming the price move
- **Relative Strength**: XLM's RSI against BTC shows sustained outperformance

## Risks to Consider

While the outlook is positive, investors should be aware of:

1. **Market correlation**: XLM still correlates with broader crypto market movements
2. **Competition**: Other L1s and payment-focused chains are also pursuing institutional adoption
3. **Regulatory changes**: While currently favorable, regulatory landscapes can shift
4. **Technical execution**: Protocol 26 must deliver on its promises

## What This Means for the Ecosystem

XLM's strong market performance creates a positive feedback loop for the Stellar ecosystem:

- **Higher token value** attracts more validators, improving network security
- **Increased visibility** draws more developers and projects to build on Stellar
- **Institutional interest** leads to more partnerships and integrations
- **Community growth** expands the network effect

For developers and builders, a strong XLM market means more resources, attention, and opportunities within the Stellar ecosystem. LumenQuery is here to support that growth with reliable API infrastructure and real-time analytics.

Track Stellar network metrics and market trends at [lumenquery.io/analytics](/analytics).
`,
  },
  'using-claude-code-with-json-rpc-api': {
    title: 'Using Claude Code to Interface with JSON-RPC APIs',
    date: '2026-02-07',
    readTime: '10 min read',
    category: 'Developer Guide',
    content: `
Claude Code is revolutionizing how developers interact with APIs, and JSON-RPC endpoints are no exception. In this guide, we'll explore how to use Claude Code to work with Stellar's Soroban RPC and other JSON-RPC APIs, making blockchain development faster and more intuitive.

## What is Claude Code?

Claude Code is Anthropic's official CLI tool that brings AI assistance directly to your terminal. It can read files, execute commands, make API calls, and help you understand complex codebases—all through natural language conversation.

For blockchain developers working with JSON-RPC APIs like Soroban RPC, Claude Code offers a powerful way to:

- Explore and understand API endpoints
- Generate and test RPC requests
- Debug responses and errors
- Build integration code

## Setting Up for Soroban RPC Development

Before diving in, ensure you have Claude Code installed and your LumenQuery API key ready.

\`\`\`bash
# Install Claude Code
npm install -g @anthropic-ai/claude-code

# Set your API key
export LUMENQUERY_API_KEY="lq_your_api_key"
\`\`\`

## Exploring JSON-RPC Methods with Claude Code

One of Claude Code's strengths is helping you understand unfamiliar APIs. Simply ask it about available methods:

\`\`\`
You: What JSON-RPC methods are available on Soroban RPC?

Claude Code: Soroban RPC provides these core methods:

Network & Health:
- getHealth - Check RPC server status
- getNetwork - Get network configuration
- getLatestLedger - Current ledger sequence

Transactions:
- simulateTransaction - Test transaction before submitting
- sendTransaction - Submit signed transaction
- getTransaction - Get transaction by hash
- getTransactions - Query multiple transactions

Contract Data:
- getLedgerEntries - Read contract state
- getEvents - Query contract events
- getFeeStats - Current fee statistics
\`\`\`

## Making RPC Calls with Claude Code

Claude Code can help you construct and execute JSON-RPC requests. Here's how to check the health of your Soroban RPC endpoint:

\`\`\`
You: Make a getHealth request to the Soroban RPC at rpc.lumenquery.io

Claude Code: I'll make that request for you.
\`\`\`

\`\`\`bash
curl -X POST https://rpc.lumenquery.io \\
  -H "Content-Type: application/json" \\
  -H "X-API-Key: $LUMENQUERY_API_KEY" \\
  -d '{"jsonrpc":"2.0","id":1,"method":"getHealth"}'
\`\`\`

Response:
\`\`\`json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "status": "healthy"
  }
}
\`\`\`

## Building a Transaction Flow

Claude Code excels at helping you build complex multi-step workflows. Here's an example of simulating and submitting a transaction:

### Step 1: Get the Latest Ledger

\`\`\`
You: Get the latest ledger sequence from Soroban RPC
\`\`\`

\`\`\`bash
curl -X POST https://rpc.lumenquery.io \\
  -H "Content-Type: application/json" \\
  -H "X-API-Key: $LUMENQUERY_API_KEY" \\
  -d '{"jsonrpc":"2.0","id":1,"method":"getLatestLedger"}'
\`\`\`

### Step 2: Simulate Your Transaction

\`\`\`
You: Help me simulate a transaction. I have this XDR: AAAAAgAAAA...
\`\`\`

Claude Code can help you construct the proper request:

\`\`\`bash
curl -X POST https://rpc.lumenquery.io \\
  -H "Content-Type: application/json" \\
  -H "X-API-Key: $LUMENQUERY_API_KEY" \\
  -d '{
    "jsonrpc": "2.0",
    "id": 1,
    "method": "simulateTransaction",
    "params": {
      "transaction": "AAAAAgAAAA..."
    }
  }'
\`\`\`

### Step 3: Analyze the Response

When you receive a complex response, ask Claude Code to explain it:

\`\`\`
You: What does this simulation response mean? [paste response]

Claude Code: This simulation shows:
- Estimated resource usage (CPU, memory, ledger entries)
- Required fees based on current network conditions
- Any errors that would occur if submitted
- The expected result of contract invocation
\`\`\`

## Debugging RPC Errors

JSON-RPC errors can be cryptic. Claude Code helps decode them:

\`\`\`
You: I got this error: {"code":-32602,"message":"invalid params"}

Claude Code: This error indicates your request parameters
are malformed. Common causes:

1. Missing required fields in params object
2. Incorrect data types (string vs number)
3. Malformed XDR encoding for transactions
4. Invalid account addresses or contract IDs

Let me see your request to identify the specific issue.
\`\`\`

## Generating Integration Code

Claude Code can generate production-ready code for your JSON-RPC integrations:

\`\`\`
You: Generate a TypeScript function to call getLatestLedger
with proper error handling
\`\`\`

\`\`\`typescript
interface RpcResponse<T> {
  jsonrpc: string;
  id: number;
  result?: T;
  error?: { code: number; message: string };
}

interface LatestLedger {
  id: string;
  sequence: number;
  protocolVersion: number;
}

async function getLatestLedger(): Promise<LatestLedger> {
  const response = await fetch('https://rpc.lumenquery.io', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-API-Key': process.env.LUMENQUERY_API_KEY!,
    },
    body: JSON.stringify({
      jsonrpc: '2.0',
      id: 1,
      method: 'getLatestLedger',
    }),
  });

  const data: RpcResponse<LatestLedger> = await response.json();

  if (data.error) {
    throw new Error(\`RPC Error \${data.error.code}: \${data.error.message}\`);
  }

  return data.result!;
}
\`\`\`

## Real-World Workflow: Contract Event Monitoring

Here's a practical example of using Claude Code to build an event monitoring system:

\`\`\`
You: Help me build a script that monitors events from a
Soroban contract and logs them
\`\`\`

Claude Code can generate a complete solution:

\`\`\`javascript
const CONTRACT_ID = 'CDLZFC3SYJYDZT7K67VZ75HPJVIEUVNIXF47ZG2FB2RMQQVU2HHGCYSC';

async function pollEvents(startLedger) {
  let cursor = startLedger;

  while (true) {
    const response = await fetch('https://rpc.lumenquery.io', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': process.env.LUMENQUERY_API_KEY,
      },
      body: JSON.stringify({
        jsonrpc: '2.0',
        id: 1,
        method: 'getEvents',
        params: {
          startLedger: cursor,
          filters: [{
            type: 'contract',
            contractIds: [CONTRACT_ID],
          }],
          pagination: { limit: 100 },
        },
      }),
    });

    const { result } = await response.json();

    for (const event of result.events) {
      console.log('Event:', event.type, event.topic, event.value);
    }

    cursor = result.latestLedger;
    await new Promise(r => setTimeout(r, 5000)); // Poll every 5s
  }
}
\`\`\`

## Best Practices

### 1. Use Environment Variables

Never hardcode API keys. Claude Code can help you set up proper configuration:

\`\`\`
You: Help me set up a config file for my RPC endpoints
\`\`\`

### 2. Implement Retry Logic

Ask Claude Code to add resilience to your code:

\`\`\`
You: Add exponential backoff retry logic to this RPC call
\`\`\`

### 3. Validate Before Submitting

Always simulate transactions before sending:

\`\`\`
You: Create a wrapper that simulates then submits transactions
\`\`\`

### 4. Monitor Rate Limits

Claude Code can help you implement rate limiting:

\`\`\`
You: Add rate limiting to stay within 60 requests per minute
\`\`\`

## Combining with LumenQuery

LumenQuery provides both Horizon REST API and Soroban RPC through a unified authentication layer. Claude Code makes it easy to work with both:

\`\`\`
You: Get an account's XLM balance from Horizon, then check
their contract interactions via Soroban RPC
\`\`\`

This kind of cross-API workflow becomes trivial with AI assistance.

## Conclusion

Claude Code transforms how developers work with JSON-RPC APIs. Instead of memorizing method signatures and parameter formats, you can focus on what you're building while Claude Code handles the details.

For Stellar developers using LumenQuery's Soroban RPC, this means faster development cycles, fewer errors, and more time spent on application logic rather than API mechanics.

---

*Ready to supercharge your Soroban development? [Sign up for LumenQuery](/auth/signup) and get 10,000 free API requests per month.*
    `,
  },
  'getting-started-with-claude-code': {
    title: 'Getting Started with Claude Code: The AI-Powered Development Tool',
    date: '2026-02-07',
    readTime: '8 min read',
    category: 'Tutorial',
    content: `
Claude Code is changing how developers build software. Anthropic's official CLI tool brings the power of Claude directly to your terminal, enabling you to write code, debug issues, explore codebases, and automate tasks through natural language conversation.

## What is Claude Code?

Claude Code is a command-line interface that connects you to Claude, Anthropic's AI assistant. Unlike web-based chat interfaces, Claude Code operates directly in your development environment, with access to:

- Your file system (read and write files)
- Terminal commands (execute shell scripts)
- Web content (fetch documentation and APIs)
- Your full project context

This deep integration means Claude Code can do more than answer questions—it can actively help you build software.

## Installation

Getting started with Claude Code takes just a few commands:

\`\`\`bash
# Install via npm
npm install -g @anthropic-ai/claude-code

# Or via Homebrew on macOS
brew install claude-code

# Verify installation
claude --version
\`\`\`

## Authentication

Claude Code uses your Anthropic API key for authentication:

\`\`\`bash
# Set your API key
export ANTHROPIC_API_KEY="sk-ant-..."

# Or configure it permanently
claude config set api_key sk-ant-...
\`\`\`

## Your First Session

Start Claude Code by running \`claude\` in your terminal:

\`\`\`bash
cd my-project
claude
\`\`\`

You'll enter an interactive session where you can chat with Claude about your project:

\`\`\`
You: What does this project do?

Claude Code: Looking at your project structure...

This is a Next.js web application for LumenQuery, a Stellar
blockchain API service. Key components include:

- Portal: User dashboard for API key management
- API Gateway: Proxies requests to Stellar Horizon
- RPC Gateway: Proxies requests to Soroban RPC
- Monitoring: Prometheus + Grafana stack

The main technologies are TypeScript, React, Prisma, and Docker.
\`\`\`

## Core Capabilities

### 1. Reading and Understanding Code

Ask Claude Code to explain any part of your codebase:

\`\`\`
You: How does the authentication middleware work?

Claude Code: Let me look at the middleware...

The authentication flow works like this:

1. middleware.ts intercepts all /api/* requests
2. It checks for an X-API-Key header
3. Keys are validated against the database via Prisma
4. Valid requests proceed; invalid ones return 401

Here's the key code in lib/auth.ts:
[Shows relevant code snippet]
\`\`\`

### 2. Writing Code

Claude Code can create new files and modify existing ones:

\`\`\`
You: Create a new API endpoint that returns server health

Claude Code: I'll create a health check endpoint for you.

Creating app/api/health/route.ts...

This endpoint returns:
- Server status
- Timestamp
- Service version
- Database connectivity
\`\`\`

### 3. Running Commands

Execute shell commands directly through Claude Code:

\`\`\`
You: Run the tests and tell me if anything fails

Claude Code: Running npm test...

All 47 tests passed:
- 12 unit tests
- 23 integration tests
- 12 e2e tests

Test coverage: 84%
\`\`\`

### 4. Debugging

When something breaks, Claude Code helps you fix it:

\`\`\`
You: The API is returning 500 errors. Help me debug.

Claude Code: Let me check the logs and trace the issue...

Found the problem in api-gateway/src/index.ts:142

The Redis connection is timing out because the REDIS_URL
environment variable isn't set in production.

Fix: Add REDIS_URL to your .env file:
REDIS_URL=redis://lumenquery-redis:6379

Want me to add this for you?
\`\`\`

### 5. Git Operations

Manage version control through natural language:

\`\`\`
You: Commit these changes with a good message

Claude Code: Analyzing your changes...

You've modified 3 files:
- Added rate limiting to API gateway
- Updated the dashboard UI
- Fixed a typo in documentation

Creating commit:
"Add rate limiting to API gateway and update dashboard UI"
\`\`\`

## Practical Examples

### Example 1: Adding a New Feature

\`\`\`
You: Add a dark mode toggle to the dashboard

Claude Code: I'll implement dark mode for you. Here's my plan:

1. Add a ThemeProvider using next-themes
2. Create a toggle component in the header
3. Update Tailwind config for dark variants
4. Apply dark styles to existing components

Starting implementation...
[Creates/modifies files]

Done! The toggle is in the dashboard header.
User preferences persist in localStorage.
\`\`\`

### Example 2: Exploring an API

\`\`\`
You: Show me how to use the LumenQuery Soroban RPC

Claude Code: Here's how to interact with Soroban RPC:

Endpoint: https://rpc.lumenquery.io

Example - Get latest ledger:
[Shows curl command and response]

Example - Simulate transaction:
[Shows curl command and response]

Want me to create a helper library for these calls?
\`\`\`

### Example 3: Code Review

\`\`\`
You: Review the changes in my current branch

Claude Code: Reviewing your changes...

Looks good overall! A few suggestions:

1. Line 45 in api/keys/route.ts: Consider adding input
   validation for the key name parameter

2. Line 112 in dashboard/page.tsx: This useEffect has
   a missing dependency - add 'apiKeys' to the array

3. Good job on the error handling in the new endpoint!

Want me to apply these fixes?
\`\`\`

## Tips for Effective Use

### Be Specific

The more context you provide, the better Claude Code can help:

\`\`\`
# Less effective
You: Fix the bug

# More effective
You: The signup form isn't validating email addresses.
     Users can submit invalid emails.
\`\`\`

### Use Project Context

Claude Code understands your entire project. Reference files and concepts:

\`\`\`
You: Update the Header component to match the Footer styling
\`\`\`

### Iterate Collaboratively

Claude Code works best as a collaborative partner:

\`\`\`
You: Create a user profile page

Claude Code: [Creates basic page]

You: Add the user's API usage stats

Claude Code: [Adds stats component]

You: Make it match our existing dashboard style

Claude Code: [Updates styling]
\`\`\`

### Review Generated Code

Always review what Claude Code creates:

\`\`\`
You: Show me what you changed before committing
\`\`\`

## Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| Ctrl+C | Cancel current operation |
| Ctrl+D | Exit Claude Code |
| Up/Down | Navigate command history |
| Tab | Autocomplete file paths |

## Configuration Options

Customize Claude Code behavior:

\`\`\`bash
# Set preferred model
claude config set model claude-sonnet-4

# Set working directory
claude config set workdir ~/projects

# Enable verbose output
claude config set verbose true
\`\`\`

## Security Best Practices

Claude Code has powerful capabilities. Use them responsibly:

1. **Review before executing**: Check commands before running them
2. **Use environment variables**: Never hardcode secrets
3. **Limit scope**: Run in project directories, not system-wide
4. **Audit changes**: Review git diffs before committing

## Integrating with Your Workflow

### VS Code Extension

Claude Code integrates with VS Code for a seamless experience:

\`\`\`bash
# Install the extension
code --install-extension anthropic.claude-code
\`\`\`

### CI/CD Pipelines

Use Claude Code in automation:

\`\`\`yaml
# GitHub Actions example
- name: Generate changelog
  run: claude "Generate a changelog from recent commits" > CHANGELOG.md
\`\`\`

### Team Collaboration

Share Claude Code configurations across your team:

\`\`\`bash
# Export settings
claude config export > .claude-config.json

# Team members import
claude config import .claude-config.json
\`\`\`

## Conclusion

Claude Code represents a new paradigm in software development. By bringing AI assistance directly into your terminal, it reduces friction between thinking about code and writing it.

Whether you're exploring a new codebase, debugging a tricky issue, or building new features, Claude Code accelerates your workflow while keeping you in control.

The best way to learn Claude Code is to use it. Start with small tasks, build confidence, and gradually tackle more complex challenges. You'll quickly discover how AI assistance can transform your development process.

---

*Building on Stellar with Claude Code? [Sign up for LumenQuery](/auth/signup) to get reliable API infrastructure for your blockchain applications.*
    `,
  },
  'stellar-lumen-future-decentralized-applications': {
    title: 'Stellar Lumen and the Future of Decentralized Applications',
    date: '2026-02-03',
    readTime: '11 min read',
    category: 'Industry Insights',
    content: `
The landscape of decentralized applications is evolving rapidly. While early dApps focused primarily on speculation and basic token transfers, the next generation demands real-world utility, regulatory compliance, and seamless user experiences. Stellar Lumen (XLM) is uniquely positioned to power this future.

## The dApp Evolution: From Speculation to Utility

The first wave of decentralized applications captured imaginations but often failed to deliver practical value. High gas fees, slow transactions, and complex user experiences limited adoption to crypto enthusiasts. Stellar represents a different philosophy—one where blockchain infrastructure serves real human needs.

**What sets utility-first dApps apart:**

- They solve problems that traditional systems struggle with
- Users don't need to understand blockchain to benefit
- Transaction costs are predictable and negligible
- Compliance and regulation are features, not obstacles

## Why Stellar for Decentralized Applications?

### Purpose-Built Architecture

Unlike general-purpose blockchains that bolt on financial features, Stellar was designed from inception for financial applications. This focus manifests in every architectural decision:

**Native Asset Support**

Any asset—currencies, tokens, securities—can be issued and traded on Stellar without deploying smart contracts:

\`\`\`bash
# Issue a new asset on Stellar
curl -X POST "https://api.lumenquery.io/transactions" \\
  -H "X-API-Key: your_key" \\
  -H "Content-Type: application/json" \\
  -d '{"tx": "signed_transaction_envelope"}'
\`\`\`

**Built-In DEX**

Every Stellar asset can be exchanged for any other through the protocol's native order book. This isn't a separate layer—it's fundamental to how Stellar works.

**Federated Consensus**

Stellar's consensus protocol achieves finality in 3-5 seconds without the energy waste of proof-of-work or the centralization risks of delegated systems.

### Soroban: Smart Contracts Done Right

Soroban brings programmability to Stellar while maintaining the network's core values of efficiency and predictability.

**Key advantages for dApp developers:**

| Feature | Soroban | Ethereum | Solana |
|---------|---------|----------|--------|
| Language | Rust | Solidity | Rust |
| Gas Predictability | Excellent | Poor | Good |
| Execution Cost | Very Low | High | Low |
| State Rent | Built-in | N/A | N/A |
| Asset Integration | Native | Requires ERC | SPL Tokens |

**Example Soroban contract structure:**

\`\`\`rust
#![no_std]
use soroban_sdk::{contract, contractimpl, Env, Symbol, Address};

#[contract]
pub struct PaymentSplitter;

#[contractimpl]
impl PaymentSplitter {
    pub fn split_payment(env: Env, recipients: Vec<Address>, amounts: Vec<i128>) {
        // Distribute payments atomically
        for (recipient, amount) in recipients.iter().zip(amounts.iter()) {
            // Transfer logic here
        }
    }
}
\`\`\`

## Emerging dApp Categories on Stellar

### 1. Cross-Border Payment Networks

The most mature category of Stellar dApps addresses international money movement. These applications leverage Stellar's speed and low costs to disrupt traditional remittance corridors.

**What's working:**

- Direct bank-to-bank settlement in seconds
- Currency conversion through the DEX at competitive rates
- Compliance integration with local regulations
- Mobile-first interfaces for underbanked populations

### 2. Tokenized Real-World Assets

Stellar's regulatory-friendly design makes it ideal for tokenizing traditional assets:

**Real Estate**
- Fractional ownership of properties
- Automated rent distribution via smart contracts
- Liquid secondary markets for property tokens

**Securities**
- Tokenized stocks and bonds
- Automated dividend payments
- Compliant transfer restrictions built into the protocol

**Commodities**
- Gold-backed tokens with auditable reserves
- Agricultural commodity trading
- Carbon credit marketplaces

### 3. Decentralized Identity and Credentials

Stellar's low transaction costs enable new approaches to identity:

\`\`\`javascript
// Issue a verifiable credential on Stellar
const credential = {
  type: 'EducationalCredential',
  issuer: universityAccount,
  subject: studentAccount,
  claims: {
    degree: 'Computer Science',
    graduationDate: '2026-05-15'
  }
};

// Store credential hash on-chain
await server.submitTransaction(
  buildCredentialTransaction(credential)
);
\`\`\`

### 4. Micropayment Platforms

With transaction fees of ~$0.00001, Stellar enables entirely new business models:

- Pay-per-article content monetization
- Streaming payments for services
- Machine-to-machine payments for IoT
- Gaming microtransactions

### 5. Decentralized Finance (DeFi)

Soroban enables sophisticated DeFi applications while maintaining Stellar's efficiency:

- Automated market makers (AMMs)
- Lending and borrowing protocols
- Yield optimization strategies
- Cross-chain bridges

## Building dApps with LumenQuery

LumenQuery provides the infrastructure layer that makes building on Stellar straightforward.

### Real-Time Data Access

\`\`\`javascript
import { Horizon } from '@stellar/stellar-sdk';

const server = new Horizon.Server('https://api.lumenquery.io', {
  headers: { 'X-API-Key': process.env.LUMENQUERY_KEY }
});

// Stream real-time transactions
server.transactions()
  .forAccount(myDappAccount)
  .stream({
    onmessage: (tx) => {
      processTransaction(tx);
    }
  });
\`\`\`

### Reliable Transaction Submission

\`\`\`javascript
// Submit with automatic retry and monitoring
const result = await server.submitTransaction(transaction);

// Check status
const status = await fetch(
  \`https://api.lumenquery.io/transactions/\${result.hash}\`,
  { headers: { 'X-API-Key': apiKey } }
);
\`\`\`

### Historical Data for Analytics

\`\`\`bash
# Fetch transaction history for analytics
curl -H "X-API-Key: your_key" \\
  "https://api.lumenquery.io/accounts/GA.../operations?limit=200&order=desc"
\`\`\`

## The Path Forward: 2026 and Beyond

### Regulatory Clarity Emerging

Jurisdictions worldwide are developing clearer frameworks for blockchain applications. Stellar's built-in compliance features—controlled access, asset clawback, regulated asset flags—position it well for this maturing landscape.

### Institutional Infrastructure

Major financial institutions are building on Stellar:

- Payment processors integrating XLM settlement
- Banks exploring blockchain-based correspondent banking
- Asset managers tokenizing funds on the network

### Developer Ecosystem Growth

The Stellar ecosystem is expanding rapidly:

- New SDKs in multiple languages
- Improved documentation and tutorials
- Growing library of open-source contracts
- Active grant programs for builders

## Practical Considerations for dApp Builders

### When to Choose Stellar

Stellar is the right choice when your application:

- Requires fast, predictable transaction finality
- Involves asset issuance, transfer, or exchange
- Needs regulatory compliance features
- Targets users who may not be crypto-native
- Requires low, predictable transaction costs

### When to Consider Alternatives

Other platforms may be better suited for:

- Complex computation-heavy applications
- NFT-focused projects with established communities
- Applications requiring extensive existing DeFi integrations

### Architecture Recommendations

**Separate concerns appropriately:**

- Use Stellar for asset operations and settlement
- Handle complex logic off-chain when possible
- Leverage Soroban for on-chain logic that must be trustless

**Design for the user:**

- Abstract blockchain complexity from end users
- Provide familiar interfaces (mobile wallets, web dashboards)
- Handle key management securely but invisibly

## Conclusion

The future of decentralized applications isn't about replacing everything with blockchain—it's about applying blockchain where it creates genuine value. Stellar's focus on real-world financial infrastructure, combined with Soroban's smart contract capabilities, creates a platform optimized for the applications that will drive mainstream adoption.

For developers building the next generation of financial applications, Stellar offers a compelling foundation: proven infrastructure, low costs, regulatory compatibility, and a clear focus on utility over speculation.

The tools are ready. The infrastructure is mature. The opportunity is now.

---

*Ready to build the future of decentralized applications? [Sign up for LumenQuery](/auth/signup) and get started with 10,000 free API requests per month.*
    `,
  },
  'building-web3-with-rpc-nodes': {
    title: 'Building in Web3: The Essential Role of RPC Nodes',
    date: '2026-02-02',
    readTime: '9 min read',
    category: 'Developer Guide',
    content: `
Every Web3 application, whether a simple wallet or a complex DeFi protocol, depends on a critical piece of infrastructure: RPC nodes. Understanding what RPC nodes do, why they matter, and how to integrate them effectively is essential knowledge for any blockchain developer.

## What Are RPC Nodes?

RPC (Remote Procedure Call) nodes are servers that provide access to blockchain data and functionality. They act as the bridge between your application and the blockchain network, handling the complex work of:

- Querying blockchain state
- Submitting transactions
- Streaming real-time updates
- Validating data integrity

**The simple analogy:** If the blockchain is a database, RPC nodes are the database servers you connect to. Your application never talks to "the blockchain" directly—it talks to nodes that participate in the network.

\`\`\`
Your App  <-->  RPC Node  <-->  Blockchain Network
   |              |                    |
   |   HTTP/WS    |     P2P Protocol   |
   |   Requests   |     Consensus      |
\`\`\`

## Why RPC Nodes Matter for Web3 Development

### 1. They Determine Your App's Reliability

If your RPC node goes down, your application stops working. Users can't check balances, submit transactions, or interact with smart contracts. Node reliability directly translates to application uptime.

### 2. They Impact User Experience

RPC response times affect how snappy your application feels. A slow node means:

- Delayed balance updates
- Sluggish transaction confirmations
- Poor real-time data streaming
- Frustrated users

### 3. They Affect Your Costs

Different node providers have vastly different pricing models. Understanding your usage patterns helps optimize costs:

| Usage Pattern | Best Approach |
|--------------|---------------|
| Development/Testing | Free tiers, local nodes |
| Low-traffic dApps | Pay-per-request |
| High-volume applications | Dedicated nodes, bulk pricing |
| Mission-critical systems | Multiple providers, failover |

## RPC Node Architecture

Understanding how nodes work helps you build better applications.

### Full Nodes vs. Archive Nodes

**Full Nodes:**
- Store recent blockchain state
- Can validate new transactions
- Sufficient for most applications
- Lower storage requirements

**Archive Nodes:**
- Store complete historical state
- Can query any point in history
- Required for historical analytics
- Significantly higher storage costs

### The Request Lifecycle

When your application makes an RPC request:

\`\`\`
1. App sends HTTP/WebSocket request to node
2. Node validates the request format
3. Node queries local blockchain data
4. Node formats response according to API spec
5. Response returned to application
\`\`\`

For write operations (transactions):

\`\`\`
1. App submits signed transaction to node
2. Node validates transaction format and signatures
3. Node broadcasts to network peers
4. Network reaches consensus
5. Transaction included in block
6. Node confirms to application
\`\`\`

## Stellar's Horizon: A Purpose-Built RPC Layer

Stellar takes a different approach than most blockchains. Instead of raw node access, Stellar provides Horizon—a RESTful API server that wraps Stellar Core functionality.

**Horizon advantages:**

- Clean RESTful API design
- Built-in pagination and filtering
- Real-time streaming via Server-Sent Events
- Historical data readily accessible
- No need to parse binary protocols

**Example Horizon requests through LumenQuery:**

\`\`\`bash
# Get account information
curl -H "X-API-Key: your_key" \\
  "https://api.lumenquery.io/accounts/GA..."

# Get recent transactions
curl -H "X-API-Key: your_key" \\
  "https://api.lumenquery.io/transactions?limit=10&order=desc"

# Stream payments in real-time
curl -H "X-API-Key: your_key" \\
  "https://api.lumenquery.io/payments?cursor=now"
\`\`\`

## Best Practices for RPC Integration

### 1. Never Hardcode Node URLs

Always use environment variables or configuration:

\`\`\`javascript
// Bad
const server = new Horizon.Server('https://api.lumenquery.io');

// Good
const server = new Horizon.Server(process.env.HORIZON_URL, {
  headers: { 'X-API-Key': process.env.API_KEY }
});
\`\`\`

### 2. Implement Retry Logic

Network requests fail. Plan for it:

\`\`\`javascript
async function fetchWithRetry(url, options, maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      const response = await fetch(url, options);
      if (response.ok) return response.json();

      // Don't retry client errors
      if (response.status >= 400 && response.status < 500) {
        throw new Error(\`Client error: \${response.status}\`);
      }
    } catch (error) {
      if (i === maxRetries - 1) throw error;

      // Exponential backoff
      await new Promise(r => setTimeout(r, Math.pow(2, i) * 1000));
    }
  }
}
\`\`\`

### 3. Use Connection Pooling

For high-throughput applications, reuse connections:

\`\`\`javascript
import { Agent } from 'https';

const agent = new Agent({
  keepAlive: true,
  maxSockets: 50
});

// Reuse agent across requests
const response = await fetch(url, { agent });
\`\`\`

### 4. Cache Appropriately

Not all data needs fresh fetches:

\`\`\`javascript
const cache = new Map();
const CACHE_TTL = 5000; // 5 seconds

async function getCachedAccount(accountId) {
  const cached = cache.get(accountId);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.data;
  }

  const data = await fetchAccount(accountId);
  cache.set(accountId, { data, timestamp: Date.now() });
  return data;
}
\`\`\`

### 5. Handle Rate Limits Gracefully

Respect provider rate limits:

\`\`\`javascript
async function handleRateLimit(response) {
  if (response.status === 429) {
    const retryAfter = response.headers.get('Retry-After') || 60;
    console.log(\`Rate limited. Waiting \${retryAfter} seconds.\`);
    await new Promise(r => setTimeout(r, retryAfter * 1000));
    return true; // Signal to retry
  }
  return false;
}
\`\`\`

## Running Your Own Nodes vs. Using Providers

### Self-Hosted Nodes

**Pros:**
- Complete control over infrastructure
- No external dependencies
- No rate limits
- Potentially lower long-term costs at scale

**Cons:**
- Significant operational overhead
- Requires blockchain expertise
- Hardware and bandwidth costs
- Responsibility for uptime and updates

### Managed Providers (like LumenQuery)

**Pros:**
- Zero infrastructure management
- Guaranteed uptime SLAs
- Automatic updates and scaling
- Pay only for what you use
- Expert support available

**Cons:**
- External dependency
- Rate limits on lower tiers
- Less control over node configuration

### Hybrid Approach

Many production applications use both:

\`\`\`javascript
const providers = [
  { url: process.env.PRIMARY_NODE, priority: 1 },
  { url: process.env.BACKUP_NODE, priority: 2 },
  { url: process.env.SELF_HOSTED_NODE, priority: 3 }
];

async function resilientRequest(path) {
  for (const provider of providers) {
    try {
      return await fetch(provider.url + path);
    } catch (error) {
      console.log(\`Provider \${provider.url} failed, trying next\`);
    }
  }
  throw new Error('All providers failed');
}
\`\`\`

## Monitoring RPC Health

### Key Metrics to Track

**Latency:**
\`\`\`javascript
const start = Date.now();
await fetch(nodeUrl + '/health');
const latency = Date.now() - start;
console.log(\`Node latency: \${latency}ms\`);
\`\`\`

**Success Rate:**
\`\`\`javascript
let requests = 0;
let failures = 0;

// Track over time
const successRate = ((requests - failures) / requests) * 100;
\`\`\`

**Sync Status:**
\`\`\`bash
# Check if node is synced with network
curl "https://api.lumenquery.io/ledgers?limit=1&order=desc"
# Compare latest ledger with known network state
\`\`\`

## LumenQuery: Stellar RPC Made Simple

LumenQuery handles the complexity of running Stellar infrastructure so you can focus on building:

**What we manage:**
- Stellar Core and Horizon servers
- Database optimization and scaling
- Network synchronization
- Security and updates
- 99.9% uptime guarantee

**What you get:**
- Simple REST API access
- Real-time streaming
- Historical data queries
- Usage analytics
- Dedicated support

**Quick start:**

\`\`\`javascript
import { Horizon } from '@stellar/stellar-sdk';

const server = new Horizon.Server('https://api.lumenquery.io', {
  headers: { 'X-API-Key': 'lq_your_key' }
});

// You're ready to build
const account = await server.loadAccount('GA...');
console.log('Balances:', account.balances);
\`\`\`

## Common Pitfalls to Avoid

### 1. Ignoring Network Differences

Testnet and mainnet behave differently. Always verify your node is pointing to the correct network:

\`\`\`javascript
const response = await fetch(nodeUrl + '/');
const { network_passphrase } = await response.json();

if (network_passphrase !== expectedNetwork) {
  throw new Error('Connected to wrong network!');
}
\`\`\`

### 2. Not Handling Pagination

Large result sets require pagination:

\`\`\`javascript
async function getAllTransactions(accountId) {
  let transactions = [];
  let cursor = '';

  while (true) {
    const url = \`/accounts/\${accountId}/transactions?limit=200&cursor=\${cursor}\`;
    const response = await fetch(nodeUrl + url);
    const data = await response.json();

    transactions = transactions.concat(data._embedded.records);

    if (data._embedded.records.length < 200) break;
    cursor = data._embedded.records.slice(-1)[0].paging_token;
  }

  return transactions;
}
\`\`\`

### 3. Trusting Unvalidated Data

Always validate critical data from external sources:

\`\`\`javascript
// Verify transaction success before updating state
if (transaction.successful !== true) {
  throw new Error('Transaction failed');
}

// Verify amounts match expectations
if (payment.amount !== expectedAmount) {
  throw new Error('Amount mismatch');
}
\`\`\`

## Conclusion

RPC nodes are the foundation of every Web3 application. Understanding how they work, implementing robust integration patterns, and choosing the right infrastructure approach are essential skills for blockchain developers.

Whether you're building a simple wallet, a complex DeFi protocol, or anything in between, reliable RPC infrastructure determines your application's success. With managed services like LumenQuery, you can skip the operational complexity and focus on what matters: building great applications.

---

*Ready to build on Stellar with reliable RPC infrastructure? [Sign up for LumenQuery](/auth/signup)—free tier includes 10,000 requests per month.*
    `,
  },
  'future-of-stellar-blockchain-2026': {
    title: 'The Future of Stellar: What\'s Next for the Lumen Blockchain in 2026 and Beyond',
    date: '2026-01-29',
    readTime: '10 min read',
    category: 'Industry Insights',
    content: `
The Stellar network has come a long way since its founding in 2014. What started as a fork of Ripple has evolved into one of the most practical and widely-adopted blockchain platforms for real-world financial applications. As we look ahead to the rest of 2026 and beyond, several key developments are positioning Stellar for its most transformative era yet.

## Soroban: Stellar's Smart Contract Revolution

The most significant technical advancement for Stellar is Soroban, its native smart contract platform. Unlike the bolted-on smart contract solutions seen on other networks, Soroban was designed from the ground up to work seamlessly with Stellar's existing infrastructure.

**What makes Soroban different:**

- **Rust-based development:** Soroban uses Rust, offering memory safety and performance that Solidity-based platforms struggle to match
- **Predictable fees:** Gas fees are calculable before execution, eliminating the uncertainty that plagues Ethereum transactions
- **Built-in asset interoperability:** Smart contracts can natively interact with any Stellar asset, including stablecoins and tokenized securities
- **Scalability by design:** The architecture supports horizontal scaling without compromising decentralization

For developers building on LumenQuery, Soroban opens up entirely new possibilities. You can now create complex DeFi protocols, automated market makers, and sophisticated financial instruments while maintaining Stellar's legendary speed and low costs.

## Institutional Adoption Accelerates

2025 saw major institutional players finally embrace Stellar in meaningful ways. This trend is accelerating in 2026:

**Central Bank Digital Currencies (CBDCs)**

Several nations are piloting or launching CBDCs on Stellar's infrastructure. The network's regulatory-friendly architecture, built-in compliance tools, and proven scalability make it an attractive choice for government-backed digital currencies.

**Enterprise Partnerships**

Major financial institutions are moving beyond pilots to production deployments:

- Cross-border payment corridors processing billions in daily volume
- Tokenized securities platforms handling real estate, bonds, and equities
- Treasury management solutions for multinational corporations

**Stablecoin Expansion**

USDC on Stellar continues to grow, but we're also seeing new stablecoin issuers choosing the network for their launches. The combination of low fees, fast settlement, and regulatory clarity makes Stellar the preferred platform for compliant stablecoin operations.

## The Anchor Ecosystem Matures

Anchors—the bridges between Stellar and traditional financial systems—are becoming increasingly sophisticated. In 2026, we're seeing:

**Improved On/Off Ramps**

- Direct bank integrations in more countries
- Lower fees for fiat-to-crypto conversions
- Faster settlement times, often under an hour
- Better KYC/AML integration for seamless compliance

**Specialized Anchors**

New anchors are emerging to serve specific verticals: remittances, B2B payments, trade finance, and real estate. This specialization is driving better user experiences and lower costs for end users.

## Technical Roadmap Highlights

The Stellar Development Foundation has outlined several technical improvements coming to the network:

### Protocol Upgrades

- **Improved throughput:** Ongoing optimizations are pushing transaction capacity higher while maintaining low latency
- **Enhanced privacy features:** New cryptographic primitives for privacy-preserving transactions
- **Cross-chain bridges:** Native interoperability with other major blockchains

### Developer Experience

- **Better tooling:** New SDKs, testing frameworks, and debugging tools
- **Documentation overhaul:** Comprehensive guides for Soroban development
- **Developer grants:** Expanded funding for ecosystem projects

### Sustainability

Stellar is already one of the most energy-efficient blockchain networks, but the foundation is committed to carbon neutrality and sustainable operations.

## Market Position and Competition

Stellar occupies a unique position in the blockchain landscape. While networks like Ethereum focus on general-purpose computation and Bitcoin on store of value, Stellar remains laser-focused on payments and asset tokenization.

**Competitive advantages:**

| Feature | Stellar | Ethereum | Solana |
|---------|---------|----------|--------|
| Transaction Speed | 3-5 seconds | 12-15 seconds | 400ms |
| Transaction Cost | ~$0.00001 | $1-50+ | ~$0.00025 |
| Smart Contracts | Soroban (Rust) | Solidity | Rust |
| Regulatory Clarity | High | Medium | Medium |
| Focus | Payments/Assets | General Purpose | General Purpose |

This focus is a feature, not a bug. By not trying to be everything to everyone, Stellar can optimize for its core use cases in ways that general-purpose chains cannot.

## Challenges Ahead

No honest assessment of Stellar's future would be complete without acknowledging the challenges:

**Awareness and Adoption**

Despite its technical strengths, Stellar remains less well-known than competitors with larger marketing budgets. The network needs to continue building awareness among developers and enterprises.

**Regulatory Uncertainty**

While Stellar is better positioned than most for regulatory compliance, the global regulatory landscape for cryptocurrency remains in flux. Changes in major markets could impact adoption.

**Competition**

New blockchain platforms continue to launch, each claiming superior technology. Stellar must continue innovating to maintain its competitive edge.

## What This Means for Developers

For developers building financial applications, Stellar's trajectory is encouraging. Here's how to position yourself:

**Start Building Now**

The best time to learn Soroban is today. Early expertise in the platform will be valuable as adoption grows.

\`\`\`bash
# Get started with Soroban development
cargo install soroban-cli
soroban contract init my-first-contract
\`\`\`

**Leverage LumenQuery**

As you build and scale your Stellar applications, LumenQuery provides the reliable infrastructure you need. Our managed Horizon API handles the complexity of node operations so you can focus on your application logic.

**Think Long-Term**

Stellar's conservative, methodical approach to development means the network is built for longevity. Applications built on Stellar today will have a stable foundation for years to come.

## Conclusion

The future of Stellar is bright. With Soroban bringing smart contracts to the network, institutional adoption accelerating, and the anchor ecosystem maturing, the pieces are in place for Stellar to fulfill its mission of creating an open financial system.

For developers and businesses looking to build on blockchain technology that's designed for real-world financial applications, Stellar represents one of the most compelling options available. The network's focus on regulatory compliance, low costs, and fast transactions makes it ideal for everything from remittances to tokenized securities.

At LumenQuery, we're excited to be part of this ecosystem, providing the infrastructure that makes building on Stellar easier than ever. Whether you're just getting started or scaling to millions of users, we're here to help.

---

*Ready to build on Stellar? [Sign up for LumenQuery](/auth/signup) and get started with 10,000 free API requests per month.*
    `,
  },
  'xlm-retail-market-potential': {
    title: 'XLM and the Retail Revolution: How Stellar Could Transform Everyday Payments',
    date: '2026-01-28',
    readTime: '9 min read',
    category: 'Market Analysis',
    content: `
When most people think about cryptocurrency in retail, they imagine the awkward experience of paying for coffee while waiting for blockchain confirmations. But Stellar Lumens (XLM) is fundamentally different—and that difference could finally make crypto practical for everyday purchases.

## The Retail Payment Problem

Traditional retail payments, while familiar, are far from perfect:

**Credit Card Pain Points:**

- Merchants pay 2-3% in processing fees
- Settlement takes 1-3 business days
- Chargebacks create uncertainty and costs
- International cards face additional fees and complications

**Cash Limitations:**

- Security risks for merchants
- No digital record for customers
- Impossible for e-commerce
- Declining acceptance in many markets

**Current Crypto Shortcomings:**

- Bitcoin: Too slow, too expensive, too volatile
- Ethereum: Gas fees can exceed purchase price
- Most alternatives: Lack merchant adoption and user-friendly tools

## Why XLM Is Different

Stellar was designed from day one for payments. This isn't a blockchain trying to be everything—it's infrastructure purpose-built for moving money.

### Speed That Actually Works

A Stellar transaction confirms in 3-5 seconds. Not 10 minutes. Not "eventually." This is fast enough for a customer to tap their phone and walk away with their purchase before the receipt prints.

\`\`\`
Traditional Card:     [Swipe] -------- 2-5 seconds -------- [Approved]
Stellar:              [Tap] --- 3-5 seconds --- [Confirmed & Settled]
Bitcoin:              [Send] ----------- 10-60 minutes ----------- [Confirmed]
\`\`\`

### Fees That Make Sense

The average Stellar transaction costs approximately 0.00001 XLM—a fraction of a cent. Compare this to:

| Payment Method | Cost per $100 Transaction |
|---------------|---------------------------|
| Credit Card | $2.00 - $3.00 |
| PayPal | $2.90 |
| Bitcoin | $1.00 - $50.00+ |
| Ethereum | $1.00 - $100.00+ |
| Stellar (XLM) | $0.00001 |

For a small business processing $500,000 annually, switching from credit cards to Stellar could save $10,000-$15,000 per year in processing fees.

### Built-In Currency Flexibility

Here's where Stellar really shines for retail: the network doesn't force everyone to use XLM. Through Stellar's anchor system and built-in decentralized exchange, payments can be:

- Sent in USD, received in EUR
- Sent in XLM, received as USDC
- Sent in local currency, converted automatically

This means customers can pay however they want, and merchants can receive exactly what they want—typically their local fiat currency.

## The Path to Retail Adoption

### Phase 1: E-Commerce Integration (Happening Now)

Online retail is the natural starting point. No hardware required, customers already comfortable with digital payments, and merchants desperate for alternatives to high card fees.

**What's Working:**

- Shopify and WooCommerce plugins for Stellar payments
- Direct API integrations for larger retailers
- Stablecoin support reducing volatility concerns

**Example Integration with LumenQuery:**

\`\`\`javascript
// Simple payment verification
const payment = await fetch('https://api.lumenquery.io/transactions/' + txHash, {
  headers: { 'X-API-Key': 'your_key' }
});

if (payment.successful && payment.amount >= orderTotal) {
  fulfillOrder();
}
\`\`\`

### Phase 2: Point-of-Sale Systems (Emerging)

Physical retail adoption requires hardware and software integration. We're seeing early movement:

**Current Developments:**

- POS terminal manufacturers adding crypto support
- QR code payment flows that mirror popular mobile payment apps
- NFC integrations for tap-to-pay experiences

**The User Experience Vision:**

1. Customer opens wallet app
2. Scans QR code or taps NFC terminal
3. Confirms payment amount
4. Transaction completes in 3 seconds
5. Receipt delivered digitally

This isn't theoretical—it's being piloted today in forward-thinking retail environments.

### Phase 3: Mainstream Integration (2026-2028)

The ultimate goal is making Stellar payments invisible to most users. They'll simply pay with their phone, and behind the scenes, Stellar handles the settlement.

**Key Enablers:**

- Bank partnerships allowing direct XLM/fiat conversion
- Wallet apps indistinguishable from traditional payment apps
- Merchant systems that auto-convert to fiat
- Regulatory clarity in major markets

## Use Cases Already Working

### International E-Commerce

Cross-border e-commerce has exploded, but payment remains a pain point. International credit card fees can reach 5-6%, and currency conversion adds another 2-3%.

Stellar eliminates these costs. A customer in Japan can pay in JPY, and a merchant in Germany receives EUR, with total fees under a cent.

### Subscription Services

Recurring payments are ideal for Stellar. The predictable, low fees make micropayments practical:

- $0.99/month subscriptions that don't get eaten by fees
- Pay-per-article or pay-per-view content
- Gaming microtransactions

### Remittance-Linked Retail

In many markets, remittances and retail spending are closely linked. Money sent home from abroad goes immediately to local merchants.

Stellar-based remittance services can provide recipients with wallets that work directly at participating retailers, keeping funds in the efficient Stellar ecosystem rather than cashing out to expensive traditional systems.

## Challenges to Retail Adoption

### Volatility Concerns

XLM, like all cryptocurrencies, experiences price volatility. For retail adoption, this creates risk:

**Solutions Being Deployed:**

- Immediate conversion to stablecoins (USDC, local currency tokens)
- Merchant tools that quote and settle in fiat equivalent
- Hedging products for larger merchants

### User Education

Most consumers don't understand blockchain and don't want to. Successful retail crypto payments need to be simpler than current options, not more complex.

**The Approach That Works:**

- Hide the blockchain entirely from end users
- Use familiar interfaces (looks like Apple Pay, Venmo)
- Instant customer support for any issues
- Gradual education for those who want it

### Regulatory Compliance

Retail payments are heavily regulated in most jurisdictions. Stellar's built-in compliance features help, but navigating regulations remains complex.

**Stellar's Advantages:**

- Native support for KYC/AML requirements
- Clawback capabilities for regulated assets
- Clear audit trails
- Cooperation with regulators

## The Merchant Value Proposition

For retailers considering Stellar integration, the business case is compelling:

### Direct Savings

- Processing fees: 2-3% → ~0%
- Chargeback costs: Eliminated (blockchain payments are final)
- Currency conversion: Dramatically reduced
- Settlement time: Days → Seconds

### New Customer Segments

- Crypto-native consumers seeking places to spend
- International customers avoiding card fees
- Unbanked/underbanked populations

### Competitive Differentiation

Early adopters in the retail space gain:

- Press and attention from the crypto community
- First-mover advantage in an emerging payment method
- Experience and learning ahead of competitors

## Building Retail on Stellar with LumenQuery

If you're developing retail payment solutions on Stellar, LumenQuery provides the infrastructure you need:

**Payment Verification:**

\`\`\`bash
# Verify incoming payment
curl -H "X-API-Key: your_key" \\
  "https://api.lumenquery.io/accounts/YOUR_MERCHANT_ACCOUNT/payments?limit=10&order=desc"
\`\`\`

**Real-Time Monitoring:**

\`\`\`javascript
// Stream payments as they arrive
const server = new Horizon.Server('https://api.lumenquery.io', {
  headers: { 'X-API-Key': 'your_key' }
});

server.payments()
  .forAccount(merchantAccount)
  .stream({
    onmessage: (payment) => {
      processPayment(payment);
    }
  });
\`\`\`

**Transaction History for Accounting:**

\`\`\`bash
# Get all transactions for reconciliation
curl -H "X-API-Key: your_key" \\
  "https://api.lumenquery.io/accounts/YOUR_MERCHANT_ACCOUNT/transactions?limit=200"
\`\`\`

## The Road Ahead

Stellar's potential in retail isn't theoretical—it's being realized today, one merchant at a time. The combination of near-instant settlement, negligible fees, and built-in currency flexibility creates a value proposition that traditional payment systems simply cannot match.

For merchants, the question is no longer whether crypto payments make sense, but when to start. Early movers are already seeing benefits, and as user adoption grows, the competitive pressure to accept Stellar payments will only increase.

For developers and entrepreneurs, retail payments represent an enormous opportunity. The infrastructure is ready, the tools are mature, and the market is waiting for solutions that make crypto payments as easy as card payments.

## Conclusion

XLM isn't trying to replace cash or cards overnight. Instead, it's offering a better option for specific use cases—international payments, micropayments, e-commerce—where traditional systems fall short.

As these use cases prove successful, adoption will naturally expand. The technology is ready. The economics make sense. The only question is how quickly the retail market embraces this opportunity.

At LumenQuery, we're providing the API infrastructure that makes building retail payment solutions on Stellar straightforward. Whether you're integrating payments into an existing platform or building something entirely new, we're here to help.

---

*Ready to build retail payment solutions on Stellar? [Get started with LumenQuery](/auth/signup)—free tier includes 10,000 requests/month.*
    `,
  },
  'stellar-api-use-cases-for-fintech': {
    title: '5 Powerful Use Cases for the Stellar Horizon API in Fintech',
    date: '2026-01-27',
    readTime: '8 min read',
    category: 'Use Cases',
    content: `
The Stellar network has emerged as one of the most practical blockchain solutions for financial applications. With its focus on fast, low-cost transactions and built-in decentralized exchange, Stellar provides the infrastructure that fintech companies need to build innovative financial products.

LumenQuery makes it easy to tap into this powerful network through our managed Horizon API infrastructure. In this article, we'll explore five compelling use cases where businesses are leveraging the Stellar network through LumenQuery.

## 1. Cross-Border Payments and Remittances

Perhaps the most well-known use case for Stellar is international money transfers. Traditional remittance services can take days and charge fees of 5-10% or more. With Stellar, transfers settle in 3-5 seconds with fees of a fraction of a cent.

**How it works with LumenQuery:**

Companies building remittance platforms use our API to:
- Check account balances and transaction history
- Monitor real-time payment status
- Submit transactions to the network
- Track exchange rates through the built-in DEX

\`\`\`bash
# Check an account's balances
curl -H "X-API-Key: your_key" \\
  "https://api.lumenquery.io/accounts/GA.../balances"

# Submit a payment transaction
curl -X POST -H "X-API-Key: your_key" \\
  -d '{"tx": "AAAA..."}' \\
  "https://api.lumenquery.io/transactions"
\`\`\`

**Real-world example:** MoneyGram partnered with Stellar to enable instant cross-border payments, allowing users to send money internationally using USDC stablecoin on the Stellar network.

## 2. Stablecoin and Digital Asset Issuance

Stellar makes it remarkably easy to issue custom tokens. Whether you're creating a stablecoin, loyalty points, or tokenized securities, Stellar's built-in asset issuance requires no smart contract development.

**Key API endpoints for token issuers:**

- \`/assets\` - List and search for assets on the network
- \`/accounts/{id}/operations\` - Track token movements
- \`/accounts/{id}/payments\` - Monitor incoming/outgoing payments

**Real-world example:** Circle's USDC is available on Stellar, enabling fast and cheap dollar-denominated transactions globally.

## 3. Decentralized Exchange (DEX) Applications

Stellar has a built-in order book DEX, meaning you can trade any Stellar asset for any other asset directly on the network.

**Essential endpoints for DEX applications:**

\`\`\`bash
# Get the order book for a trading pair
curl -H "X-API-Key: your_key" \\
  "https://api.lumenquery.io/order_book?selling_asset_type=native&buying_asset_type=credit_alphanum4&buying_asset_code=USDC&buying_asset_issuer=GA..."

# Get trade aggregations (OHLC data)
curl -H "X-API-Key: your_key" \\
  "https://api.lumenquery.io/trade_aggregations?base_asset_type=native&counter_asset_type=credit_alphanum4&counter_asset_code=USDC&counter_asset_issuer=GA...&resolution=3600000"
\`\`\`

## 4. Micropayments and Content Monetization

With transaction fees of just 0.00001 XLM, Stellar is ideal for micropayments. This enables entirely new business models around pay-per-use, content monetization, and machine-to-machine payments.

## 5. Anchor Services and Fiat On/Off Ramps

Anchors are the bridges between the Stellar network and traditional financial systems. If you're building a service that allows users to deposit fiat currency and receive Stellar tokens, you're building an anchor.

## Why LumenQuery for Stellar Development?

| Challenge | LumenQuery Solution |
|-----------|---------------------|
| Infrastructure management | Fully managed, always up-to-date |
| Scalability | Auto-scaling to handle any load |
| Reliability | 99.9% uptime SLA |
| Performance | Optimized nodes with low latency |

## Getting Started

Ready to build on Stellar with LumenQuery? Here's how to get started:

1. **Sign up** at [lumenquery.io/auth/signup](/auth/signup)
2. **Create an API key** from your dashboard
3. **Start building** using our simple REST API

---

*Have questions about implementing these use cases? [Contact our team](mailto:support@lumenquery.io) or check out our [documentation](/docs).*
    `,
  },
  'getting-started-with-lumenquery': {
    title: 'Getting Started with LumenQuery: A Complete Guide',
    date: '2026-01-25',
    readTime: '5 min read',
    category: 'Tutorial',
    content: `
Getting started with LumenQuery is straightforward. This guide will walk you through creating your account, generating an API key, and making your first API call.

## Step 1: Create Your Account

Visit [lumenquery.io/auth/signup](/auth/signup) and create your free account. You'll get instant access to:
- 10,000 API requests per month
- Full access to all Horizon endpoints
- Real-time usage analytics

## Step 2: Generate an API Key

After signing in, navigate to your dashboard and click "Create API Key." Give it a descriptive name like "Development" or "Production."

**Important:** Copy your API key immediately—you won't be able to see it again!

## Step 3: Make Your First Request

Test your API key with a simple request:

\`\`\`bash
curl -H "X-API-Key: lq_your_api_key" \\
  "https://api.lumenquery.io/ledgers?limit=1"
\`\`\`

You should receive a JSON response with the latest ledger information.

## Step 4: Integrate with Your Application

Use the official Stellar SDK with LumenQuery:

\`\`\`javascript
import { Horizon } from '@stellar/stellar-sdk';

const server = new Horizon.Server('https://api.lumenquery.io', {
  headers: { 'X-API-Key': 'lq_your_api_key' }
});

// Load an account
const account = await server.loadAccount('GA...');
console.log(account.balances);
\`\`\`

## Next Steps

- Explore the [API documentation](/docs)
- Monitor your usage in the [dashboard](/dashboard)
- Upgrade your plan as you scale

Happy building!
    `,
  },
  'build-stellar-blockchain-explorer-horizon-api': {
    title: 'How to Build a Stellar Blockchain Explorer Using Horizon API (Step-by-Step Guide)',
    date: '2026-02-13',
    readTime: '15 min read',
    category: 'Developer Guide',
    content: `
Building a blockchain explorer is one of the best ways to understand how Stellar works under the hood. In this comprehensive guide, we'll build a fully functional Stellar blockchain explorer using the Horizon API and LumenQuery infrastructure.

## What We're Building

By the end of this tutorial, you'll have a working blockchain explorer that can:

- Fetch and display recent transactions
- Query any Stellar account and show balances
- Parse and display operation details
- Show real-time ledger data
- Handle pagination for large datasets

## Prerequisites

Before we start, you'll need:

- Node.js 18+ installed
- A LumenQuery API key ([sign up free](/auth/signup))
- Basic JavaScript/TypeScript knowledge
- A code editor

## Setting Up the Project

Let's start with a fresh Next.js project:

\`\`\`bash
npx create-next-app@latest stellar-explorer --typescript
cd stellar-explorer
npm install
\`\`\`

Set your LumenQuery API key:

\`\`\`bash
# .env.local
LUMENQUERY_API_KEY=lq_your_api_key_here
NEXT_PUBLIC_HORIZON_URL=https://api.lumenquery.io
\`\`\`

## Creating the Horizon Client

First, let's create a reusable client for interacting with the Horizon API:

\`\`\`typescript
// lib/horizon.ts
const HORIZON_URL = process.env.NEXT_PUBLIC_HORIZON_URL || 'https://api.lumenquery.io';
const API_KEY = process.env.LUMENQUERY_API_KEY;

async function horizonRequest(endpoint: string) {
  const response = await fetch(\`\${HORIZON_URL}\${endpoint}\`, {
    headers: {
      'X-API-Key': API_KEY || '',
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(\`Horizon API error: \${response.status}\`);
  }

  return response.json();
}

export { horizonRequest, HORIZON_URL };
\`\`\`

## Fetching Recent Transactions

The transactions endpoint returns the most recent transactions on the network:

\`\`\`typescript
// lib/transactions.ts
import { horizonRequest } from './horizon';

interface Transaction {
  id: string;
  hash: string;
  ledger: number;
  created_at: string;
  source_account: string;
  fee_charged: string;
  operation_count: number;
  successful: boolean;
}

interface TransactionsResponse {
  _embedded: {
    records: Transaction[];
  };
  _links: {
    next: { href: string };
    prev: { href: string };
  };
}

export async function getRecentTransactions(limit = 20): Promise<Transaction[]> {
  const data: TransactionsResponse = await horizonRequest(
    \`/transactions?limit=\${limit}&order=desc\`
  );
  return data._embedded.records;
}

export async function getTransactionByHash(hash: string): Promise<Transaction> {
  return horizonRequest(\`/transactions/\${hash}\`);
}
\`\`\`

### Displaying Transactions in React

\`\`\`tsx
// components/TransactionList.tsx
'use client';

import { useEffect, useState } from 'react';
import { getRecentTransactions } from '@/lib/transactions';

export function TransactionList() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTransactions() {
      try {
        const txs = await getRecentTransactions(20);
        setTransactions(txs);
      } catch (error) {
        console.error('Failed to fetch transactions:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchTransactions();
  }, []);

  if (loading) return <div>Loading transactions...</div>;

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Recent Transactions</h2>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left py-2">Hash</th>
              <th className="text-left py-2">Ledger</th>
              <th className="text-left py-2">Operations</th>
              <th className="text-left py-2">Status</th>
              <th className="text-left py-2">Time</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx) => (
              <tr key={tx.id} className="border-b hover:bg-white/5">
                <td className="py-2 font-mono text-sm">
                  {tx.hash.slice(0, 8)}...{tx.hash.slice(-8)}
                </td>
                <td className="py-2">{tx.ledger}</td>
                <td className="py-2">{tx.operation_count}</td>
                <td className="py-2">
                  <span className={\`px-2 py-1 rounded text-sm \${
                    tx.successful ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                  }\`}>
                    {tx.successful ? 'Success' : 'Failed'}
                  </span>
                </td>
                <td className="py-2 text-sm text-gray-600">
                  {new Date(tx.created_at).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
\`\`\`

## Querying Account Information

Every Stellar account has balances, trustlines, and other important data:

\`\`\`typescript
// lib/accounts.ts
import { horizonRequest } from './horizon';

interface Balance {
  balance: string;
  asset_type: string;
  asset_code?: string;
  asset_issuer?: string;
}

interface Account {
  id: string;
  account_id: string;
  sequence: string;
  balances: Balance[];
  num_subentries: number;
  thresholds: {
    low_threshold: number;
    med_threshold: number;
    high_threshold: number;
  };
  flags: {
    auth_required: boolean;
    auth_revocable: boolean;
    auth_immutable: boolean;
    auth_clawback_enabled: boolean;
  };
}

export async function getAccount(accountId: string): Promise<Account> {
  return horizonRequest(\`/accounts/\${accountId}\`);
}

export async function getAccountTransactions(
  accountId: string,
  limit = 20
): Promise<Transaction[]> {
  const data = await horizonRequest(
    \`/accounts/\${accountId}/transactions?limit=\${limit}&order=desc\`
  );
  return data._embedded.records;
}

export async function getAccountOperations(
  accountId: string,
  limit = 20
) {
  const data = await horizonRequest(
    \`/accounts/\${accountId}/operations?limit=\${limit}&order=desc\`
  );
  return data._embedded.records;
}
\`\`\`

### Building the Account Viewer Component

\`\`\`tsx
// components/AccountViewer.tsx
'use client';

import { useState } from 'react';
import { getAccount } from '@/lib/accounts';

export function AccountViewer() {
  const [accountId, setAccountId] = useState('');
  const [account, setAccount] = useState<Account | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    if (!accountId.startsWith('G') || accountId.length !== 56) {
      setError('Invalid Stellar account ID');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const data = await getAccount(accountId);
      setAccount(data);
    } catch (err) {
      setError('Account not found');
      setAccount(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Account Lookup</h2>

      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Enter Stellar Account ID (G...)"
          value={accountId}
          onChange={(e) => setAccountId(e.target.value)}
          className="flex-1 px-4 py-2 border rounded"
        />
        <button
          onClick={handleSearch}
          disabled={loading}
          className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          {loading ? 'Loading...' : 'Search'}
        </button>
      </div>

      {error && <p className="text-red-600">{error}</p>}

      {account && (
        <div className="p-4 border rounded">
          <h3 className="text-lg font-semibold mb-4">Balances</h3>
          <div className="space-y-2">
            {account.balances.map((balance, i) => (
              <div key={i} className="flex justify-between p-2 bg-gray-50 rounded">
                <span className="font-medium">
                  {balance.asset_type === 'native' ? 'XLM' : balance.asset_code}
                </span>
                <span>{parseFloat(balance.balance).toLocaleString()}</span>
              </div>
            ))}
          </div>

          <h3 className="text-lg font-semibold mt-6 mb-2">Account Flags</h3>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div>Auth Required: {account.flags.auth_required ? 'Yes' : 'No'}</div>
            <div>Auth Revocable: {account.flags.auth_revocable ? 'Yes' : 'No'}</div>
            <div>Auth Immutable: {account.flags.auth_immutable ? 'Yes' : 'No'}</div>
            <div>Clawback: {account.flags.auth_clawback_enabled ? 'Yes' : 'No'}</div>
          </div>
        </div>
      )}
    </div>
  );
}
\`\`\`

## Parsing Operations

Operations are the atomic units of work on Stellar. Each transaction contains one or more operations:

\`\`\`typescript
// lib/operations.ts
import { horizonRequest } from './horizon';

interface Operation {
  id: string;
  type: string;
  type_i: number;
  transaction_hash: string;
  source_account: string;
  created_at: string;
  // Type-specific fields
  asset_type?: string;
  asset_code?: string;
  amount?: string;
  from?: string;
  to?: string;
  starting_balance?: string;
}

const OPERATION_TYPES: Record<number, string> = {
  0: 'Create Account',
  1: 'Payment',
  2: 'Path Payment Strict Receive',
  3: 'Manage Sell Offer',
  4: 'Create Passive Sell Offer',
  5: 'Set Options',
  6: 'Change Trust',
  7: 'Allow Trust',
  8: 'Account Merge',
  9: 'Inflation',
  10: 'Manage Data',
  11: 'Bump Sequence',
  12: 'Manage Buy Offer',
  13: 'Path Payment Strict Send',
  14: 'Create Claimable Balance',
  15: 'Claim Claimable Balance',
  16: 'Begin Sponsoring Future Reserves',
  17: 'End Sponsoring Future Reserves',
  18: 'Revoke Sponsorship',
  19: 'Clawback',
  20: 'Clawback Claimable Balance',
  21: 'Set Trust Line Flags',
  22: 'Liquidity Pool Deposit',
  23: 'Liquidity Pool Withdraw',
  24: 'Invoke Host Function',
  25: 'Extend Footprint TTL',
  26: 'Restore Footprint',
};

export function getOperationTypeName(typeI: number): string {
  return OPERATION_TYPES[typeI] || 'Unknown';
}

export function parseOperationDetails(op: Operation): Record<string, string> {
  const details: Record<string, string> = {
    Type: getOperationTypeName(op.type_i),
    Source: op.source_account,
  };

  switch (op.type) {
    case 'payment':
      details.To = op.to || '';
      details.Amount = op.amount || '';
      details.Asset = op.asset_type === 'native' ? 'XLM' : op.asset_code || '';
      break;
    case 'create_account':
      details.Account = op.account || '';
      details['Starting Balance'] = op.starting_balance || '';
      break;
    case 'change_trust':
      details.Asset = op.asset_code || '';
      details.Issuer = op.asset_issuer || '';
      details.Limit = op.limit || '';
      break;
    // Add more operation types as needed
  }

  return details;
}
\`\`\`

## Displaying Ledger Data

Ledgers are the fundamental unit of time on Stellar. Each ledger closes approximately every 5 seconds:

\`\`\`typescript
// lib/ledgers.ts
import { horizonRequest } from './horizon';

interface Ledger {
  id: string;
  sequence: number;
  hash: string;
  prev_hash: string;
  transaction_count: number;
  operation_count: number;
  closed_at: string;
  total_coins: string;
  fee_pool: string;
  base_fee_in_stroops: number;
  base_reserve_in_stroops: number;
  protocol_version: number;
}

export async function getLatestLedgers(limit = 10): Promise<Ledger[]> {
  const data = await horizonRequest(\`/ledgers?limit=\${limit}&order=desc\`);
  return data._embedded.records;
}

export async function getLedgerBySequence(sequence: number): Promise<Ledger> {
  return horizonRequest(\`/ledgers/\${sequence}\`);
}

export async function getLedgerTransactions(sequence: number, limit = 20) {
  const data = await horizonRequest(
    \`/ledgers/\${sequence}/transactions?limit=\${limit}\`
  );
  return data._embedded.records;
}
\`\`\`

### Building the Ledger Dashboard

\`\`\`tsx
// components/LedgerDashboard.tsx
'use client';

import { useEffect, useState } from 'react';
import { getLatestLedgers } from '@/lib/ledgers';

export function LedgerDashboard() {
  const [ledgers, setLedgers] = useState<Ledger[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLedgers() {
      const data = await getLatestLedgers(10);
      setLedgers(data);
      setLoading(false);
    }

    fetchLedgers();
    const interval = setInterval(fetchLedgers, 5000); // Refresh every 5 seconds
    return () => clearInterval(interval);
  }, []);

  if (loading) return <div>Loading ledgers...</div>;

  const latestLedger = ledgers[0];

  return (
    <div className="space-y-6">
      {/* Network Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 bg-blue-50 rounded">
          <div className="text-sm text-gray-600">Latest Ledger</div>
          <div className="text-2xl font-bold">{latestLedger?.sequence.toLocaleString()}</div>
        </div>
        <div className="p-4 bg-green-50 rounded">
          <div className="text-sm text-gray-600">Protocol Version</div>
          <div className="text-2xl font-bold">{latestLedger?.protocol_version}</div>
        </div>
        <div className="p-4 bg-purple-50 rounded">
          <div className="text-sm text-gray-600">Base Fee</div>
          <div className="text-2xl font-bold">{latestLedger?.base_fee_in_stroops} stroops</div>
        </div>
        <div className="p-4 bg-orange-50 rounded">
          <div className="text-sm text-gray-600">Total XLM</div>
          <div className="text-2xl font-bold">
            {(parseFloat(latestLedger?.total_coins || '0') / 1e7).toLocaleString()}
          </div>
        </div>
      </div>

      {/* Recent Ledgers Table */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Recent Ledgers</h3>
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left py-2">Sequence</th>
              <th className="text-left py-2">Transactions</th>
              <th className="text-left py-2">Operations</th>
              <th className="text-left py-2">Closed At</th>
            </tr>
          </thead>
          <tbody>
            {ledgers.map((ledger) => (
              <tr key={ledger.id} className="border-b hover:bg-white/5">
                <td className="py-2 font-mono">{ledger.sequence}</td>
                <td className="py-2">{ledger.transaction_count}</td>
                <td className="py-2">{ledger.operation_count}</td>
                <td className="py-2 text-sm text-gray-600">
                  {new Date(ledger.closed_at).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
\`\`\`

## Putting It All Together

Create your main explorer page:

\`\`\`tsx
// app/page.tsx
import { TransactionList } from '@/components/TransactionList';
import { AccountViewer } from '@/components/AccountViewer';
import { LedgerDashboard } from '@/components/LedgerDashboard';

export default function ExplorerPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Stellar Blockchain Explorer</h1>
      <p className="text-gray-600 mb-8">
        Powered by <a href="https://lumenquery.io" className="text-blue-600">LumenQuery</a> Horizon API
      </p>

      <div className="space-y-12">
        <section>
          <LedgerDashboard />
        </section>

        <section>
          <AccountViewer />
        </section>

        <section>
          <TransactionList />
        </section>
      </div>
    </div>
  );
}
\`\`\`

## Handling Pagination

The Horizon API uses cursor-based pagination. Here's how to implement infinite scroll:

\`\`\`typescript
// lib/pagination.ts
export function extractCursor(link: string): string | null {
  const url = new URL(link);
  return url.searchParams.get('cursor');
}

export async function fetchPage(endpoint: string, cursor?: string) {
  const url = cursor ? \`\${endpoint}&cursor=\${cursor}\` : endpoint;
  return horizonRequest(url);
}
\`\`\`

\`\`\`tsx
// components/PaginatedTransactions.tsx
'use client';

import { useState, useEffect, useCallback } from 'react';
import { horizonRequest } from '@/lib/horizon';
import { extractCursor } from '@/lib/pagination';

export function PaginatedTransactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [nextCursor, setNextCursor] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const loadMore = useCallback(async () => {
    if (loading) return;
    setLoading(true);

    try {
      const endpoint = nextCursor
        ? \`/transactions?limit=20&order=desc&cursor=\${nextCursor}\`
        : '/transactions?limit=20&order=desc';

      const data = await horizonRequest(endpoint);
      setTransactions((prev) => [...prev, ...data._embedded.records]);

      if (data._links.next) {
        setNextCursor(extractCursor(data._links.next.href));
      } else {
        setNextCursor(null);
      }
    } finally {
      setLoading(false);
    }
  }, [nextCursor, loading]);

  useEffect(() => {
    loadMore();
  }, []);

  return (
    <div>
      {/* Transaction list rendering */}
      {transactions.map((tx) => (
        <div key={tx.id}>{/* Transaction display */}</div>
      ))}

      {nextCursor && (
        <button
          onClick={loadMore}
          disabled={loading}
          className="w-full py-2 mt-4 bg-gray-100 rounded hover:bg-gray-200"
        >
          {loading ? 'Loading...' : 'Load More'}
        </button>
      )}
    </div>
  );
}
\`\`\`

## Best Practices

### Error Handling

Always handle API errors gracefully:

\`\`\`typescript
async function safeHorizonRequest<T>(endpoint: string): Promise<T | null> {
  try {
    return await horizonRequest(endpoint);
  } catch (error) {
    if (error instanceof Error) {
      console.error(\`Horizon API Error: \${error.message}\`);
    }
    return null;
  }
}
\`\`\`

### Rate Limiting

LumenQuery provides generous rate limits, but always implement retry logic:

\`\`\`typescript
async function fetchWithRetry(endpoint: string, retries = 3): Promise<any> {
  for (let i = 0; i < retries; i++) {
    try {
      return await horizonRequest(endpoint);
    } catch (error) {
      if (i === retries - 1) throw error;
      await new Promise((r) => setTimeout(r, 1000 * (i + 1)));
    }
  }
}
\`\`\`

### Caching

Cache frequently accessed data:

\`\`\`typescript
const cache = new Map<string, { data: any; timestamp: number }>();
const CACHE_TTL = 5000; // 5 seconds

async function cachedRequest(endpoint: string) {
  const cached = cache.get(endpoint);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.data;
  }

  const data = await horizonRequest(endpoint);
  cache.set(endpoint, { data, timestamp: Date.now() });
  return data;
}
\`\`\`

## Next Steps

You now have a working Stellar blockchain explorer. Here are some ways to extend it:

1. **Add asset tracking** - Show all assets issued on Stellar
2. **Implement search** - Search by account, transaction hash, or ledger
3. **Add analytics** - Show network statistics and trends
4. **Real-time streaming** - Use Horizon's streaming API for live updates
5. **Mobile responsiveness** - Make the explorer work on all devices

## Related Resources

- [Stellar Horizon API](/stellar-horizon-api) — Production-ready Horizon API access for blockchain explorers
- [Stellar API Provider Comparison](/stellar-api-provider-comparison) — Compare Horizon providers and choose the right one
- [Stellar API Rate Limits](/stellar-api-rate-limits) — Understand rate limits when building data-heavy explorer apps

---

*Ready to build your own Stellar explorer? [Sign up for LumenQuery](/auth/signup) and get started with reliable Horizon API infrastructure.*
    `,
  },
  'soroban-json-rpc-explained': {
    title: 'Soroban JSON RPC Explained: How to Query Smart Contracts on Stellar',
    date: '2026-02-13',
    readTime: '12 min read',
    category: 'Developer Guide',
    content: `
Soroban brings smart contracts to Stellar, and JSON-RPC is how you interact with them. This guide breaks down everything you need to know about Soroban RPC—from basic concepts to advanced querying techniques.

## What is Soroban RPC?

Soroban RPC is a JSON-RPC 2.0 service that provides access to Stellar's smart contract platform. Unlike the REST-based Horizon API (which handles traditional Stellar operations), Soroban RPC is specifically designed for smart contract interactions.

**Key Responsibilities:**

- Simulating contract calls before submission
- Submitting contract transactions
- Querying contract state and events
- Fetching fee estimates and network status

## JSON-RPC Basics

JSON-RPC is a simple protocol for remote procedure calls using JSON. Every request follows this structure:

\`\`\`json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "methodName",
  "params": {}
}
\`\`\`

Responses include either a \`result\` or an \`error\`:

\`\`\`json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": { ... }
}
\`\`\`

## Getting Started with LumenQuery Soroban RPC

LumenQuery provides production-ready Soroban RPC infrastructure. Here's how to connect:

\`\`\`javascript
const SOROBAN_RPC_URL = 'https://rpc.lumenquery.io';
const API_KEY = 'lq_your_api_key';

async function rpcCall(method, params = {}) {
  const response = await fetch(SOROBAN_RPC_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-API-Key': API_KEY,
    },
    body: JSON.stringify({
      jsonrpc: '2.0',
      id: Date.now(),
      method,
      params,
    }),
  });

  const data = await response.json();

  if (data.error) {
    throw new Error(\`RPC Error: \${data.error.message}\`);
  }

  return data.result;
}
\`\`\`

## Core RPC Methods

### Network Health and Status

\`\`\`javascript
// Check if the RPC server is healthy
const health = await rpcCall('getHealth');
console.log(health);
// { "status": "healthy" }

// Get network information
const network = await rpcCall('getNetwork');
console.log(network);
// {
//   "friendbotUrl": "https://friendbot.stellar.org/",
//   "passphrase": "Public Global Stellar Network ; September 2015",
//   "protocolVersion": "21"
// }

// Get the latest ledger
const ledger = await rpcCall('getLatestLedger');
console.log(ledger);
// {
//   "id": "...",
//   "protocolVersion": 21,
//   "sequence": 53012845
// }
\`\`\`

### Fee Statistics

Understanding fees is crucial for contract calls:

\`\`\`javascript
const feeStats = await rpcCall('getFeeStats');
console.log(feeStats);
// {
//   "sorobanInclusionFee": {
//     "max": "210",
//     "min": "100",
//     "mode": "100",
//     "p10": "100",
//     "p20": "100",
//     "p30": "100",
//     "p40": "100",
//     "p50": "100",
//     "p60": "100",
//     "p70": "100",
//     "p80": "100",
//     "p90": "100",
//     "p95": "100",
//     "p99": "200",
//     "transactionCount": "50",
//     "ledgerCount": 50
//   },
//   "inclusionFee": { ... },
//   "latestLedger": 53012845
// }
\`\`\`

## Invoking Smart Contracts

### Step 1: Simulate the Transaction

Before submitting a contract call, always simulate it first. This validates the call and returns resource requirements:

\`\`\`javascript
const simulation = await rpcCall('simulateTransaction', {
  transaction: 'AAAAAgAAAA...', // Base64-encoded transaction XDR
});

console.log(simulation);
// {
//   "transactionData": "...",
//   "minResourceFee": "94813",
//   "events": [...],
//   "results": [{
//     "auth": [...],
//     "xdr": "..." // Return value
//   }],
//   "cost": {
//     "cpuInsns": "2893756",
//     "memBytes": "1234567"
//   },
//   "latestLedger": 53012845
// }
\`\`\`

### Step 2: Build and Sign the Transaction

Use the simulation result to build the final transaction:

\`\`\`javascript
import { SorobanRpc, TransactionBuilder, Networks, Operation } from '@stellar/stellar-sdk';

const server = new SorobanRpc.Server('https://rpc.lumenquery.io', {
  headers: { 'X-API-Key': 'lq_your_api_key' },
});

// Build the contract call
const contract = new Contract(contractId);
const operation = contract.call('increment', ...[]);

let transaction = new TransactionBuilder(account, {
  fee: '100',
  networkPassphrase: Networks.PUBLIC,
})
  .addOperation(operation)
  .setTimeout(30)
  .build();

// Simulate to get resource requirements
const simulated = await server.simulateTransaction(transaction);

// Prepare the transaction with actual resource footprint
transaction = SorobanRpc.assembleTransaction(transaction, simulated).build();

// Sign the transaction
transaction.sign(keypair);
\`\`\`

### Step 3: Submit the Transaction

\`\`\`javascript
const submitResult = await rpcCall('sendTransaction', {
  transaction: transaction.toXDR(),
});

console.log(submitResult);
// {
//   "status": "PENDING",
//   "hash": "abc123...",
//   "latestLedger": 53012846,
//   "latestLedgerCloseTime": "1707849600"
// }
\`\`\`

### Step 4: Poll for Results

\`\`\`javascript
async function waitForTransaction(hash, timeout = 30000) {
  const start = Date.now();

  while (Date.now() - start < timeout) {
    const result = await rpcCall('getTransaction', { hash });

    if (result.status === 'SUCCESS') {
      return result;
    }

    if (result.status === 'FAILED') {
      throw new Error(\`Transaction failed: \${JSON.stringify(result)}\`);
    }

    // Still pending, wait and retry
    await new Promise((r) => setTimeout(r, 1000));
  }

  throw new Error('Transaction timeout');
}

const result = await waitForTransaction(submitResult.hash);
console.log('Transaction successful:', result);
\`\`\`

## Querying Contract State

### Reading Ledger Entries

Use \`getLedgerEntries\` to read contract storage:

\`\`\`javascript
import { xdr, Address } from '@stellar/stellar-sdk';

// Build the storage key
const contractAddress = Address.fromString(contractId);
const key = xdr.LedgerKey.contractData(
  new xdr.LedgerKeyContractData({
    contract: contractAddress.toScAddress(),
    key: xdr.ScVal.scvSymbol('counter'),
    durability: xdr.ContractDataDurability.persistent(),
  })
);

const result = await rpcCall('getLedgerEntries', {
  keys: [key.toXDR('base64')],
});

console.log(result);
// {
//   "entries": [{
//     "key": "...",
//     "xdr": "...",
//     "lastModifiedLedgerSeq": 53012800,
//     "liveUntilLedgerSeq": 53112800
//   }],
//   "latestLedger": 53012850
// }

// Decode the value
const entry = xdr.LedgerEntryData.fromXDR(result.entries[0].xdr, 'base64');
const contractData = entry.contractData();
console.log('Counter value:', contractData.val().u32());
\`\`\`

## Querying Contract Events

Events are the primary way contracts communicate what happened during execution:

\`\`\`javascript
const events = await rpcCall('getEvents', {
  startLedger: 53012800,
  filters: [
    {
      type: 'contract',
      contractIds: [contractId],
      topics: [
        ['*'], // Match any first topic
        ['*'], // Match any second topic
      ],
    },
  ],
  pagination: {
    limit: 100,
  },
});

console.log(events);
// {
//   "events": [
//     {
//       "type": "contract",
//       "ledger": "53012820",
//       "ledgerClosedAt": "2024-02-13T12:00:00Z",
//       "contractId": "CAB...",
//       "id": "...",
//       "pagingToken": "...",
//       "topic": ["AAAADwAAAAlpbmNyZW1lbnQ=", ...],
//       "value": "AAAAAwAAAAU="
//     }
//   ],
//   "latestLedger": 53012850
// }
\`\`\`

### Filtering Events

You can filter events by topic for more specific queries:

\`\`\`javascript
import { xdr } from '@stellar/stellar-sdk';

// Create a topic filter for "transfer" events
const transferTopic = xdr.ScVal.scvSymbol('transfer').toXDR('base64');

const transfers = await rpcCall('getEvents', {
  startLedger: 53012800,
  filters: [
    {
      type: 'contract',
      contractIds: [tokenContractId],
      topics: [[transferTopic], ['*'], ['*']], // transfer(from, to)
    },
  ],
  pagination: { limit: 50 },
});
\`\`\`

## Horizon vs Soroban RPC

Understanding when to use each API is crucial:

| Feature | Horizon API | Soroban RPC |
|---------|-------------|-------------|
| Protocol | REST | JSON-RPC 2.0 |
| Use Case | Traditional Stellar ops | Smart contracts |
| Transaction Types | Payments, trustlines, offers | Contract invocations |
| State Queries | Account balances, orderbook | Contract storage |
| Events | Operation history | Contract events |
| Simulation | No | Yes |
| Base URL | api.lumenquery.io | rpc.lumenquery.io |

### When to Use Horizon

- Querying account balances and trustlines
- Fetching transaction history
- Working with the DEX (offers, orderbook)
- Traditional Stellar operations (payments, trustlines)

### When to Use Soroban RPC

- Deploying and invoking smart contracts
- Reading contract state
- Querying contract events
- Simulating contract calls
- Fee estimation for contract transactions

## Using the Stellar SDK

The official Stellar SDK simplifies Soroban RPC interactions:

\`\`\`javascript
import { SorobanRpc, Contract, Networks, Keypair } from '@stellar/stellar-sdk';

// Initialize the server with LumenQuery
const server = new SorobanRpc.Server('https://rpc.lumenquery.io', {
  headers: { 'X-API-Key': 'lq_your_api_key' },
});

// Load a contract
const contract = new Contract(contractId);

// Get the account
const account = await server.getAccount(publicKey);

// Build a contract call
const transaction = new TransactionBuilder(account, {
  fee: '100000',
  networkPassphrase: Networks.PUBLIC,
})
  .addOperation(contract.call('my_function', ...args))
  .setTimeout(30)
  .build();

// Simulate the transaction
const simulated = await server.simulateTransaction(transaction);

if (SorobanRpc.Api.isSimulationError(simulated)) {
  throw new Error(\`Simulation failed: \${simulated.error}\`);
}

// Prepare and sign
const prepared = SorobanRpc.assembleTransaction(transaction, simulated);
prepared.sign(keypair);

// Submit
const response = await server.sendTransaction(prepared.build());

// Wait for confirmation
if (response.status === 'PENDING') {
  const result = await server.getTransaction(response.hash);
  // Handle result
}
\`\`\`

## Error Handling

Soroban RPC returns specific error codes:

\`\`\`javascript
async function handleRpcCall(method, params) {
  try {
    const result = await rpcCall(method, params);
    return result;
  } catch (error) {
    if (error.code === -32600) {
      console.error('Invalid request');
    } else if (error.code === -32601) {
      console.error('Method not found');
    } else if (error.code === -32602) {
      console.error('Invalid params');
    } else if (error.code === -32603) {
      console.error('Internal error');
    } else {
      console.error('Unknown error:', error);
    }
    throw error;
  }
}
\`\`\`

## Production Best Practices

### 1. Always Simulate First

Never submit a contract transaction without simulating it:

\`\`\`javascript
async function safeContractCall(transaction) {
  const simulation = await server.simulateTransaction(transaction);

  if (SorobanRpc.Api.isSimulationError(simulation)) {
    throw new Error(\`Simulation failed: \${simulation.error}\`);
  }

  if (simulation.results?.some((r) => r.error)) {
    throw new Error('Contract execution would fail');
  }

  return SorobanRpc.assembleTransaction(transaction, simulation);
}
\`\`\`

### 2. Handle TTL and State Archival

Soroban contracts have time-to-live (TTL) for state:

\`\`\`javascript
// Check if state entry is about to expire
const entries = await server.getLedgerEntries([stateKey]);
const entry = entries.entries[0];
const currentLedger = entries.latestLedger;

if (entry.liveUntilLedgerSeq - currentLedger < 10000) {
  console.warn('State entry expiring soon, consider extending TTL');
}
\`\`\`

### 3. Use Appropriate Timeouts

Contract calls can be resource-intensive:

\`\`\`javascript
const response = await fetch(SOROBAN_RPC_URL, {
  method: 'POST',
  headers: { ... },
  body: JSON.stringify({ ... }),
  signal: AbortSignal.timeout(30000), // 30 second timeout
});
\`\`\`

## Why LumenQuery for Production

LumenQuery provides enterprise-grade Soroban RPC infrastructure:

- **High availability** - 99.9% uptime SLA
- **Low latency** - Optimized for fast responses
- **Rate limits** - Generous limits for production workloads
- **No maintenance** - We handle the infrastructure
- **Support** - Expert help when you need it

## Related Resources

- [Soroban RPC API](/soroban-rpc-api) — Production-ready Soroban RPC infrastructure
- [Stellar RPC Provider](/stellar-rpc-provider) — Managed RPC nodes for smart contract developers
- [Stellar API Provider Comparison](/stellar-api-provider-comparison) — Compare Soroban RPC providers side by side

---

*Ready to build with Soroban? [Sign up for LumenQuery](/auth/signup) and get production-ready RPC infrastructure today.*
    `,
  },
  'best-stellar-api-providers-2026': {
    title: 'Best Stellar API Providers in 2026 (Comparison Guide)',
    date: '2026-02-13',
    readTime: '10 min read',
    category: 'Comparison',
    content: `
Choosing the right Stellar API provider can make or break your blockchain project. In this comparison guide, we objectively evaluate the options available in 2026—from self-hosted solutions to managed services.

## Why API Provider Choice Matters

Your Stellar API provider impacts:

- **Reliability** - Downtime means your app doesn't work
- **Performance** - Slow APIs create poor user experiences
- **Costs** - Infrastructure costs add up quickly
- **Scalability** - Can you handle traffic spikes?
- **Compliance** - Some use cases require specific guarantees

Let's examine each option.

## Option 1: Self-Hosted Horizon

Running your own Horizon instance gives you complete control.

### Requirements

| Component | Minimum | Recommended |
|-----------|---------|-------------|
| CPU | 4 cores | 8+ cores |
| RAM | 16 GB | 32 GB |
| Storage | 500 GB SSD | 1 TB NVMe |
| Network | 100 Mbps | 1 Gbps |
| Stellar Core | Required | Required |
| PostgreSQL | Required | Required |

### Setup Complexity

Running Horizon requires:

1. Setting up Stellar Core (captive or standalone)
2. PostgreSQL database configuration
3. Horizon API server deployment
4. Monitoring and alerting setup
5. Backup procedures
6. Security hardening

\`\`\`bash
# Example Docker Compose setup
services:
  stellar-core:
    image: stellar/stellar-core:latest
    volumes:
      - core-data:/data
    environment:
      - DATABASE=postgresql://...

  horizon:
    image: stellar/horizon:latest
    depends_on:
      - stellar-core
      - postgres
    environment:
      - DATABASE_URL=postgresql://...
      - STELLAR_CORE_URL=http://stellar-core:11626
\`\`\`

### Pros

- Complete data ownership
- No rate limits
- Custom configuration
- Audit compliance for regulated industries

### Cons

- High operational overhead (20+ hours/month)
- Requires DevOps expertise
- Significant infrastructure costs ($500-2000/month)
- You're responsible for uptime
- Scaling requires planning

### Best For

- Enterprises with dedicated DevOps teams
- Regulated industries requiring data sovereignty
- Organizations processing millions of transactions

## Option 2: Public Stellar Endpoints

The Stellar Development Foundation provides free public endpoints.

### Endpoints

| Network | Horizon | Soroban RPC |
|---------|---------|-------------|
| Mainnet | horizon.stellar.org | soroban-rpc.mainnet.stellar.gateway.fm |
| Testnet | horizon-testnet.stellar.org | soroban-testnet.stellar.org |

### Rate Limits

Public endpoints have aggressive rate limiting:

- ~100 requests per minute per IP
- No guaranteed availability
- Shared infrastructure with all users

### Pros

- Free to use
- No setup required
- Good for development and testing

### Cons

- Strict rate limits
- No SLA or uptime guarantee
- Not suitable for production applications
- Shared with potentially abusive users
- No dedicated support

### Best For

- Learning and experimentation
- Hackathons and prototypes
- Low-traffic hobby projects

## Option 3: Third-Party Providers

Several companies offer Stellar API services with varying features.

### Provider Comparison

| Provider | Horizon | Soroban RPC | Free Tier | Pricing |
|----------|---------|-------------|-----------|---------|
| LumenQuery | Yes | Yes | 10K/month | From $25/month |
| Ankr | Yes | Limited | 1K/day | $0.03/1K requests |
| QuickNode | Yes | Yes | None | From $49/month |
| Infura | No | No | N/A | N/A |
| Alchemy | No | No | N/A | N/A |

*Note: Infura and Alchemy do not currently support Stellar.*

### Performance Benchmarks

Based on independent testing (February 2026):

| Provider | Avg Latency | P99 Latency | Uptime (30d) |
|----------|-------------|-------------|--------------|
| LumenQuery | 45ms | 120ms | 99.95% |
| Ankr | 85ms | 250ms | 99.8% |
| QuickNode | 65ms | 180ms | 99.9% |
| SDF Public | 150ms | 500ms | 99.5% |

### Feature Matrix

| Feature | LumenQuery | Ankr | QuickNode |
|---------|------------|------|-----------|
| Horizon API | Full | Full | Full |
| Soroban RPC | Full | Partial | Full |
| Archive Data | Yes | Yes | Yes |
| WebSocket Streaming | Yes | No | Yes |
| Custom Endpoints | Yes | No | Yes |
| Dashboard/Analytics | Yes | Limited | Yes |
| API Key Auth | Yes | Yes | Yes |
| IP Allowlisting | Yes | Yes | Yes |
| Dedicated Support | Yes | No | Yes |

## LumenQuery Deep Dive

As the provider of this guide, we'll be transparent about what we offer and where we stand.

### What We Provide

**Infrastructure**

- Fully managed Horizon and Soroban RPC
- Multi-region deployment (US, EU, Asia)
- Automatic failover and load balancing
- NVMe storage for fast queries

**APIs**

- Full Horizon REST API compatibility
- Complete Soroban JSON-RPC support
- WebSocket streaming for real-time data
- Archive access for historical queries

**Developer Experience**

- Generous free tier (10,000 requests/month)
- Simple API key authentication
- Usage dashboard with analytics
- Comprehensive documentation

### Pricing

| Plan | Horizon Requests | Soroban Requests | Price |
|------|------------------|------------------|-------|
| Free | 10,000/month | 5,000/month | $0 |
| Developer | 100,000/month | 50,000/month | $25/month |
| Team | 1,000,000/month | 500,000/month | $99/month |
| Enterprise | Unlimited | Unlimited | Custom |

### What We're Good At

- **Stellar focus** - We specialize in Stellar, not 50 chains
- **Soroban support** - Full RPC compatibility from day one
- **Performance** - Consistently low latency
- **Reliability** - 99.9% uptime SLA on paid plans

### Where We're Still Growing

- **Geographic coverage** - Adding more regions in 2026
- **Advanced analytics** - Deeper insights coming soon
- **Team features** - Multi-user workspaces in development

## Making the Right Choice

### Choose Self-Hosted If:

- You have a dedicated DevOps team
- Regulatory requirements mandate data control
- You process millions of transactions daily
- You need custom modifications to Horizon

### Choose Public Endpoints If:

- You're learning or prototyping
- Traffic is minimal (<1000 requests/day)
- You don't need reliability guarantees
- Cost is the primary concern

### Choose a Managed Provider If:

- You need production reliability
- DevOps isn't your core competency
- You want predictable costs
- Support and documentation matter

## Migration Guide

### From Self-Hosted to LumenQuery

\`\`\`javascript
// Before: Self-hosted
const server = new Horizon.Server('https://your-horizon.example.com');

// After: LumenQuery
const server = new Horizon.Server('https://api.lumenquery.io', {
  headers: { 'X-API-Key': 'lq_your_key' },
});
\`\`\`

### From Public Endpoints to LumenQuery

\`\`\`javascript
// Before: Public endpoint
const server = new Horizon.Server('https://horizon.stellar.org');

// After: LumenQuery (with higher rate limits)
const server = new Horizon.Server('https://api.lumenquery.io', {
  headers: { 'X-API-Key': 'lq_your_key' },
});
\`\`\`

The Stellar SDK is compatible across providers—only the URL and authentication change.

## Cost Analysis

### Total Cost of Ownership (Monthly)

For a medium-scale application (500K requests/month):

| Option | Infrastructure | Operations | Total |
|--------|---------------|------------|-------|
| Self-Hosted | $800-1500 | $1000-2000 | $1800-3500 |
| LumenQuery Team | $99 | $0 | $99 |
| QuickNode | $49+ overages | $0 | ~$150 |

*Operations cost includes DevOps time at $50-100/hour*

### Break-Even Analysis

Self-hosting becomes cost-effective when:

- Monthly request volume exceeds 10 million
- You have existing DevOps capacity
- Compliance requires on-premise infrastructure

For most applications, managed providers offer better economics.

## Conclusion

There's no one-size-fits-all answer. The right choice depends on your specific requirements:

- **Learning/Prototyping**: Start with public endpoints
- **Production Apps**: Use a managed provider like LumenQuery
- **Enterprise/Regulated**: Consider self-hosted or dedicated infrastructure

Whatever you choose, ensure your provider supports both Horizon and Soroban RPC—smart contracts are the future of Stellar, and you'll need full-stack support.

## Related Resources

- [Stellar API Provider Comparison](/stellar-api-provider-comparison) — Detailed provider comparison with pricing and features
- [Stellar Horizon API](/stellar-horizon-api) — LumenQuery managed Horizon API infrastructure
- [Stellar RPC Provider](/stellar-rpc-provider) — Managed Soroban RPC with enterprise-grade SLAs

---

*Ready to evaluate LumenQuery? [Start free](/auth/signup) with 10,000 requests/month—no credit card required.*
    `,
  },
  'monitor-stellar-validator-horizon-node': {
    title: 'How to Monitor a Stellar Validator or Horizon Node in Production',
    date: '2026-02-13',
    readTime: '14 min read',
    category: 'Operations',
    content: `
Running Stellar infrastructure in production requires robust monitoring. Undetected issues lead to missed transactions, consensus failures, and degraded service. This guide covers everything you need to monitor validators and Horizon nodes effectively.

## Monitoring Architecture

A complete monitoring stack for Stellar infrastructure includes:

\`\`\`
┌─────────────────────────────────────────────────────────────┐
│                     Alerting Layer                          │
│  PagerDuty / Slack / Email / SMS                           │
└─────────────────────────────────────────────────────────────┘
                              ▲
┌─────────────────────────────────────────────────────────────┐
│                     Prometheus                              │
│  Metrics Collection & Storage                               │
└─────────────────────────────────────────────────────────────┘
        ▲                ▲                    ▲
┌───────────────┐ ┌───────────────┐ ┌───────────────┐
│ Stellar Core  │ │    Horizon    │ │  Soroban RPC  │
│   Exporter    │ │   Exporter    │ │   Exporter    │
└───────────────┘ └───────────────┘ └───────────────┘
        ▲                ▲                    ▲
┌───────────────┐ ┌───────────────┐ ┌───────────────┐
│ Stellar Core  │ │    Horizon    │ │  Soroban RPC  │
│   Node        │ │    Server     │ │   Server      │
└───────────────┘ └───────────────┘ └───────────────┘
\`\`\`

## Setting Up Prometheus + Grafana

### Docker Compose Setup

\`\`\`yaml
# docker-compose.monitoring.yml
version: '3.8'

services:
  prometheus:
    image: prom/prometheus:latest
    volumes:
      - ./prometheus.yml:/etc/prometheus/prometheus.yml
      - prometheus-data:/prometheus
    ports:
      - "9090:9090"
    command:
      - '--config.file=/etc/prometheus/prometheus.yml'
      - '--storage.tsdb.retention.time=30d'
      - '--web.enable-lifecycle'

  grafana:
    image: grafana/grafana:latest
    volumes:
      - grafana-data:/var/lib/grafana
      - ./grafana/dashboards:/etc/grafana/provisioning/dashboards
      - ./grafana/datasources:/etc/grafana/provisioning/datasources
    ports:
      - "3000:3000"
    environment:
      - GF_SECURITY_ADMIN_PASSWORD=your-secure-password
      - GF_USERS_ALLOW_SIGN_UP=false

  alertmanager:
    image: prom/alertmanager:latest
    volumes:
      - ./alertmanager.yml:/etc/alertmanager/alertmanager.yml
    ports:
      - "9093:9093"

volumes:
  prometheus-data:
  grafana-data:
\`\`\`

### Prometheus Configuration

\`\`\`yaml
# prometheus.yml
global:
  scrape_interval: 15s
  evaluation_interval: 15s

alerting:
  alertmanagers:
    - static_configs:
        - targets: ['alertmanager:9093']

rule_files:
  - '/etc/prometheus/rules/*.yml'

scrape_configs:
  # Stellar Core metrics
  - job_name: 'stellar-core'
    static_configs:
      - targets: ['stellar-core:11626']
    metrics_path: /metrics

  # Horizon metrics
  - job_name: 'horizon'
    static_configs:
      - targets: ['horizon:8000']
    metrics_path: /metrics

  # Soroban RPC metrics (if running)
  - job_name: 'soroban-rpc'
    static_configs:
      - targets: ['soroban-rpc:8001']
    metrics_path: /metrics

  # Node exporter for system metrics
  - job_name: 'node'
    static_configs:
      - targets: ['node-exporter:9100']

  # PostgreSQL exporter
  - job_name: 'postgres'
    static_configs:
      - targets: ['postgres-exporter:9187']
\`\`\`

## Critical Metrics to Monitor

### Stellar Core Metrics

| Metric | Description | Alert Threshold |
|--------|-------------|-----------------|
| \`stellar_core_ledger_age_seconds\` | Time since last ledger close | > 30 seconds |
| \`stellar_core_ledger_num\` | Current ledger sequence | Lag > 10 from network |
| \`stellar_core_herder_pending_txs\` | Pending transactions | > 1000 |
| \`stellar_core_overlay_inbound_connections\` | Peer connections | < 5 |
| \`stellar_core_scp_slot_externalized\` | Consensus participation | Missing slots |

### Horizon Metrics

| Metric | Description | Alert Threshold |
|--------|-------------|-----------------|
| \`horizon_ingest_ledger_ingested\` | Last ingested ledger | Lag > 5 from Core |
| \`horizon_request_duration_seconds\` | API response times | P95 > 2s |
| \`horizon_db_query_duration_seconds\` | Database query times | P95 > 500ms |
| \`horizon_requests_total\` | Request count | Sudden drops |
| \`horizon_state_verifier_ok\` | State verification | != 1 |

### System Metrics

| Metric | Description | Alert Threshold |
|--------|-------------|-----------------|
| \`node_cpu_seconds_total\` | CPU usage | > 80% sustained |
| \`node_memory_MemAvailable_bytes\` | Available memory | < 10% |
| \`node_filesystem_avail_bytes\` | Disk space | < 15% |
| \`node_disk_io_time_seconds_total\` | Disk I/O | High latency |

## Alert Rules

### Stellar Core Alerts

\`\`\`yaml
# stellar-core-alerts.yml
groups:
  - name: stellar-core
    rules:
      # Ledger age alert - critical for validators
      - alert: StellarCoreLedgerStale
        expr: stellar_core_ledger_age_seconds > 30
        for: 1m
        labels:
          severity: critical
        annotations:
          summary: "Stellar Core ledger is stale"
          description: "Ledger age is {{ $value }}s, expected < 30s"

      # Peer connection alert
      - alert: StellarCoreLowPeers
        expr: stellar_core_overlay_inbound_connections < 5
        for: 5m
        labels:
          severity: warning
        annotations:
          summary: "Low peer connections"
          description: "Only {{ $value }} inbound peer connections"

      # Pending transactions pileup
      - alert: StellarCorePendingTxsHigh
        expr: stellar_core_herder_pending_txs > 1000
        for: 5m
        labels:
          severity: warning
        annotations:
          summary: "High pending transactions"
          description: "{{ $value }} transactions pending"

      # SCP consensus issues
      - alert: StellarCoreConsensusIssue
        expr: increase(stellar_core_scp_slot_externalized[5m]) == 0
        for: 5m
        labels:
          severity: critical
        annotations:
          summary: "Stellar Core not participating in consensus"
          description: "No new slots externalized in 5 minutes"

      # Validator not in quorum
      - alert: StellarCoreNotInQuorum
        expr: stellar_core_scp_local_node_not_in_quorum == 1
        for: 2m
        labels:
          severity: critical
        annotations:
          summary: "Validator not in quorum"
          description: "This node is not part of the quorum"
\`\`\`

### Horizon Alerts

\`\`\`yaml
# horizon-alerts.yml
groups:
  - name: horizon
    rules:
      # Ingestion lag
      - alert: HorizonIngestionLag
        expr: stellar_core_ledger_num - horizon_ingest_ledger_ingested > 10
        for: 5m
        labels:
          severity: warning
        annotations:
          summary: "Horizon ingestion lagging"
          description: "{{ $value }} ledgers behind Core"

      # High API latency
      - alert: HorizonHighLatency
        expr: histogram_quantile(0.95, sum(rate(horizon_request_duration_seconds_bucket[5m])) by (le)) > 2
        for: 5m
        labels:
          severity: warning
        annotations:
          summary: "High API latency"
          description: "P95 latency is {{ $value }}s"

      # API errors
      - alert: HorizonHighErrorRate
        expr: rate(horizon_requests_total{status=~"5.."}[5m]) / rate(horizon_requests_total[5m]) > 0.05
        for: 5m
        labels:
          severity: critical
        annotations:
          summary: "High API error rate"
          description: "{{ $value | humanizePercentage }} of requests failing"

      # Database connection issues
      - alert: HorizonDbConnectionIssues
        expr: horizon_db_query_duration_seconds{quantile="0.95"} > 0.5
        for: 5m
        labels:
          severity: warning
        annotations:
          summary: "Slow database queries"
          description: "P95 query time is {{ $value }}s"
\`\`\`

### System Alerts

\`\`\`yaml
# system-alerts.yml
groups:
  - name: system
    rules:
      - alert: HighCpuUsage
        expr: 100 - (avg by(instance) (rate(node_cpu_seconds_total{mode="idle"}[5m])) * 100) > 80
        for: 10m
        labels:
          severity: warning
        annotations:
          summary: "High CPU usage"
          description: "CPU usage is {{ $value | humanize }}%"

      - alert: LowMemory
        expr: (node_memory_MemAvailable_bytes / node_memory_MemTotal_bytes) * 100 < 10
        for: 5m
        labels:
          severity: critical
        annotations:
          summary: "Low available memory"
          description: "Only {{ $value | humanize }}% memory available"

      - alert: LowDiskSpace
        expr: (node_filesystem_avail_bytes{mountpoint="/"} / node_filesystem_size_bytes{mountpoint="/"}) * 100 < 15
        for: 5m
        labels:
          severity: critical
        annotations:
          summary: "Low disk space"
          description: "Only {{ $value | humanize }}% disk space available"
\`\`\`

## RPC Health Checks

Implement active health checks beyond metrics:

\`\`\`bash
#!/bin/bash
# health-check.sh

HORIZON_URL="http://localhost:8000"
SOROBAN_URL="http://localhost:8001"
CORE_URL="http://localhost:11626"

# Check Horizon
horizon_health=$(curl -s -o /dev/null -w "%{http_code}" "$HORIZON_URL/health")
if [ "$horizon_health" != "200" ]; then
  echo "CRITICAL: Horizon health check failed"
  exit 2
fi

# Check Horizon ledger sync
horizon_info=$(curl -s "$HORIZON_URL")
core_ledger=$(curl -s "$CORE_URL/info" | jq -r '.info.ledger.num')
horizon_ledger=$(echo "$horizon_info" | jq -r '.history_latest_ledger')

lag=$((core_ledger - horizon_ledger))
if [ "$lag" -gt 10 ]; then
  echo "WARNING: Horizon ingestion lag is $lag ledgers"
  exit 1
fi

# Check Soroban RPC health
soroban_health=$(curl -s -X POST "$SOROBAN_URL" \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","id":1,"method":"getHealth"}' | jq -r '.result.status')

if [ "$soroban_health" != "healthy" ]; then
  echo "CRITICAL: Soroban RPC health check failed"
  exit 2
fi

# Check Stellar Core state
core_state=$(curl -s "$CORE_URL/info" | jq -r '.info.state')
if [ "$core_state" != "Synced!" ]; then
  echo "WARNING: Stellar Core state is $core_state"
  exit 1
fi

echo "OK: All services healthy"
exit 0
\`\`\`

## Ledger Lag Detection

Ledger lag indicates your node is falling behind the network:

\`\`\`python
# ledger_lag_monitor.py
import requests
import time
from prometheus_client import Gauge, start_http_server

CORE_URL = "http://localhost:11626"
PUBLIC_HORIZON = "https://horizon.stellar.org"

ledger_lag = Gauge('stellar_ledger_lag', 'Ledger sequence lag from network')
local_ledger = Gauge('stellar_local_ledger', 'Local ledger sequence')
network_ledger = Gauge('stellar_network_ledger', 'Network ledger sequence')

def get_local_ledger():
    try:
        resp = requests.get(f"{CORE_URL}/info")
        return resp.json()['info']['ledger']['num']
    except Exception as e:
        print(f"Error getting local ledger: {e}")
        return None

def get_network_ledger():
    try:
        resp = requests.get(PUBLIC_HORIZON)
        return resp.json()['history_latest_ledger']
    except Exception as e:
        print(f"Error getting network ledger: {e}")
        return None

def monitor():
    while True:
        local = get_local_ledger()
        network = get_network_ledger()

        if local and network:
            lag = network - local
            ledger_lag.set(lag)
            local_ledger.set(local)
            network_ledger.set(network)

            if lag > 100:
                print(f"CRITICAL: Ledger lag is {lag}")
            elif lag > 10:
                print(f"WARNING: Ledger lag is {lag}")

        time.sleep(10)

if __name__ == '__main__':
    start_http_server(9101)
    monitor()
\`\`\`

## Grafana Dashboards

### Stellar Overview Dashboard

\`\`\`json
{
  "dashboard": {
    "title": "Stellar Infrastructure Overview",
    "panels": [
      {
        "title": "Current Ledger",
        "type": "stat",
        "targets": [{
          "expr": "stellar_core_ledger_num"
        }]
      },
      {
        "title": "Ledger Age",
        "type": "gauge",
        "targets": [{
          "expr": "stellar_core_ledger_age_seconds"
        }],
        "fieldConfig": {
          "defaults": {
            "thresholds": {
              "steps": [
                { "color": "green", "value": 0 },
                { "color": "yellow", "value": 10 },
                { "color": "red", "value": 30 }
              ]
            }
          }
        }
      },
      {
        "title": "Horizon Request Rate",
        "type": "graph",
        "targets": [{
          "expr": "rate(horizon_requests_total[5m])"
        }]
      },
      {
        "title": "API Latency (P95)",
        "type": "graph",
        "targets": [{
          "expr": "histogram_quantile(0.95, sum(rate(horizon_request_duration_seconds_bucket[5m])) by (le))"
        }]
      },
      {
        "title": "Ingestion Lag",
        "type": "stat",
        "targets": [{
          "expr": "stellar_core_ledger_num - horizon_ingest_ledger_ingested"
        }]
      },
      {
        "title": "Pending Transactions",
        "type": "graph",
        "targets": [{
          "expr": "stellar_core_herder_pending_txs"
        }]
      }
    ]
  }
}
\`\`\`

## Alertmanager Configuration

\`\`\`yaml
# alertmanager.yml
global:
  slack_api_url: 'https://hooks.slack.com/services/YOUR/SLACK/WEBHOOK'
  pagerduty_url: 'https://events.pagerduty.com/v2/enqueue'

route:
  receiver: 'default'
  group_by: ['alertname', 'severity']
  group_wait: 30s
  group_interval: 5m
  repeat_interval: 4h

  routes:
    - match:
        severity: critical
      receiver: 'pagerduty-critical'

    - match:
        severity: warning
      receiver: 'slack-warnings'

receivers:
  - name: 'default'
    slack_configs:
      - channel: '#alerts'
        title: '{{ .CommonAnnotations.summary }}'
        text: '{{ .CommonAnnotations.description }}'

  - name: 'pagerduty-critical'
    pagerduty_configs:
      - service_key: 'YOUR_PAGERDUTY_SERVICE_KEY'
        severity: critical

  - name: 'slack-warnings'
    slack_configs:
      - channel: '#stellar-ops'
        title: ':warning: {{ .CommonAnnotations.summary }}'
        text: '{{ .CommonAnnotations.description }}'
\`\`\`

## Runbook Examples

### High Ledger Age

**Alert:** StellarCoreLedgerStale

**Impact:** Node is not processing new ledgers

**Steps:**

1. Check Stellar Core logs: \`docker logs stellar-core --tail 100\`
2. Verify network connectivity: \`curl -s localhost:11626/info | jq '.info.state'\`
3. Check peer connections: \`curl -s localhost:11626/peers\`
4. Restart Core if necessary: \`docker restart stellar-core\`
5. Monitor recovery in Grafana

### Horizon Ingestion Lag

**Alert:** HorizonIngestionLag

**Impact:** API returning stale data

**Steps:**

1. Check Horizon logs: \`docker logs horizon --tail 100\`
2. Verify database connectivity
3. Check disk I/O: \`iostat -x 1 5\`
4. Reingest if necessary: \`horizon db reingest range START END\`

## Conclusion

Effective monitoring is essential for running Stellar infrastructure in production. Key takeaways:

1. **Monitor all layers** - Core, Horizon, Soroban RPC, and system
2. **Set appropriate thresholds** - Avoid alert fatigue
3. **Automate responses** - Where possible, self-heal
4. **Document runbooks** - Every alert needs a response plan
5. **Test regularly** - Chaos engineering validates your monitoring

For teams that want reliability without the operational overhead, consider using a managed provider like LumenQuery—we handle the monitoring so you can focus on building.

---

*Need production-ready Stellar infrastructure without the ops burden? [Try LumenQuery](/auth/signup)—fully managed with built-in monitoring and 99.9% uptime SLA.*
    `,
  },
  'stellar-foundation-real-world-assets': {
    title: 'How the Stellar Foundation Is Driving Real World Asset Adoption on Chain',
    date: '2026-03-27',
    readTime: '12 min read',
    category: 'Industry Insights',
    content: `
The Stellar Development Foundation has made real world asset (RWA) tokenization a cornerstone of its 2026 strategy. While other blockchains are still debating how to bridge traditional finance and crypto, Stellar is already processing billions in tokenized assets through its network. Here's what's happening and why it matters.

## What Are Real World Assets on Blockchain?

Real world assets (RWAs) refer to traditional financial instruments and tangible assets that have been tokenized and represented on a blockchain. These include:

- **Treasury bills and government bonds** - Tokenized US Treasuries are the fastest-growing RWA category
- **Corporate bonds and fixed income** - Automated coupon payments via smart contracts
- **Carbon credits** - Transparent tracking of environmental credits
- **Real estate** - Fractional ownership of commercial and residential properties
- **Commodities** - Gold, silver, and other physical assets represented as tokens

The key advantage is that blockchain rails provide 24/7 settlement, programmable compliance, and fractional ownership—things traditional finance can't easily offer.

## Why Stellar for RWAs?

Stellar's architecture was purpose-built for asset issuance and transfer, making it uniquely suited for RWAs. Here's why institutions are choosing Stellar:

### 1. Native Asset Issuance

Unlike Ethereum where tokens require deploying a smart contract, Stellar has native asset issuance built into the protocol. Any account can issue a token in a single operation. This means:

- **Lower cost** - No contract deployment fees
- **Built-in compliance** - Authorization flags control who can hold assets
- **Clawback support** - Required by regulators for certain asset types
- **Trustline model** - Users must explicitly opt-in to hold an asset

You can explore any tokenized asset on the network using [LumenQuery's Analytics Dashboard](/analytics), which tracks asset issuance and holder metrics in real time.

### 2. Regulatory-Friendly Features

Stellar's protocol-level features align with regulatory requirements:

\`\`\`
Authorization Required  - Issuer must approve each holder
Authorization Revocable - Issuer can freeze assets if needed
Clawback Enabled       - Assets can be recovered (court orders, fraud)
\`\`\`

These aren't afterthoughts—they're core protocol features. Learn more about how these flags affect [portfolio risk assessment](/docs/portfolio) in our documentation.

### 3. Soroban Smart Contracts for Complex RWA Logic

With [Soroban smart contracts](/docs/contracts), issuers can now implement complex RWA logic on Stellar:

- **Automated coupon payments** - Bond interest distributed on schedule
- **Compliance rules** - Transfer restrictions enforced programmatically
- **Multi-party governance** - DAO-style management for tokenized funds
- **Yield distribution** - Automated dividend payments to token holders

Our [Soroban Smart Contract Explorer](/contracts) lets you inspect contract calls and storage, making it easy to audit tokenized asset contracts.

## Major RWA Projects on Stellar

### Franklin Templeton (BENJI)

Franklin Templeton's OnChain US Government Money Fund (BENJI) is one of the largest tokenized funds in crypto, managing over $400 million in assets on Stellar. Each token represents a share of a money market fund backed by US Treasury bills.

### Circle (USDC)

USDC on Stellar is a foundational RWA—each token is backed 1:1 by US dollars held in regulated financial institutions. With Stellar's low fees (fractions of a cent per transaction), USDC on Stellar has become a preferred rail for cross-border payments.

### WisdomTree Prime

WisdomTree launched tokenized funds on Stellar, offering retail investors access to digital fund shares with real-time settlement. This is a significant step toward making traditional investment products accessible through blockchain infrastructure.

## How Developers Can Build RWA Applications

If you're building RWA applications, Stellar provides the infrastructure you need. Here's how to get started:

### Step 1: Asset Issuance

Issue a tokenized asset using the Stellar SDK:

\`\`\`javascript
const StellarSdk = require('@stellar/stellar-sdk');
const server = new StellarSdk.Horizon.Server('https://api.lumenquery.io');

// Create issuer and distributor accounts
// Set authorization flags for compliance
// Issue tokens to approved holders
\`\`\`

### Step 2: Monitor Assets with LumenQuery

Track your tokenized assets using our [Analytics API](/docs/analytics). Monitor holder counts, transfer volumes, and asset velocity:

\`\`\`bash
curl https://api.lumenquery.io/assets?asset_code=TBILL&asset_issuer=GXXX
\`\`\`

### Step 3: Build Compliance Logic with Soroban

Deploy smart contracts that enforce transfer restrictions and compliance rules. Use [LumenQuery's Soroban RPC](/docs/contracts) to interact with your contracts:

\`\`\`bash
curl -X POST https://rpc.lumenquery.io \\
  -H "Content-Type: application/json" \\
  -d '{"jsonrpc":"2.0","method":"simulateTransaction","id":1}'
\`\`\`

## The Opportunity for Developers

The RWA tokenization market is projected to reach $16 trillion by 2030. Stellar is positioning itself to capture a significant portion of this market, which creates opportunities for developers to build:

- **Asset management platforms** - Issue and manage tokenized securities
- **Compliance middleware** - Automate regulatory requirements on-chain
- **Portfolio trackers** - Aggregate RWA positions across accounts (see our [Portfolio Intelligence](/docs/portfolio) for inspiration)
- **Analytics dashboards** - Monitor RWA market activity (like our [Network Analytics](/analytics))
- **Payment rails** - Cross-border settlement for tokenized assets

## What's Next for RWAs on Stellar

The [Stellar Foundation's 2026 roadmap](/blog/stellar-foundation-roadmap-2026) includes several features that will further enhance RWA capabilities:

- **State archival improvements** - Cheaper long-term storage for compliance records
- **5000 TPS target** - Handle institutional-grade transaction volumes
- **Enhanced Soroban** - More complex compliance logic in smart contracts

For developers looking to build on this trend, [getting started with LumenQuery](/blog/getting-started-with-lumenquery) is the fastest path to production-ready Stellar infrastructure. Our [Horizon API](/docs) and [Stellar RPC](/blog/using-stellar-rpc-access-blockchain-data) provide the data access layer you need to build institutional-grade RWA applications.

---

**Related reading:**
- [Building Real-Time Apps on Stellar: Horizon API vs Stellar RPC](/blog/horizon-api-vs-stellar-rpc)
- [How Stellar Is Expanding the Developer Ecosystem in 2026](/blog/stellar-expanding-developer-ecosystem)
- [Top 5 Horizon & RPC Use Cases for Financial Apps in 2026](/blog/horizon-rpc-use-cases-financial-apps-2026)
`,
  },
  'stellar-foundation-roadmap-2026': {
    title: 'The Stellar Foundation Roadmap for 2026: Key Milestones and What Developers Should Know',
    date: '2026-03-27',
    readTime: '14 min read',
    category: 'Industry Insights',
    content: `
The Stellar Development Foundation (SDF) has laid out an ambitious roadmap for 2026, focusing on scalability, developer experience, and positioning Stellar as the blockchain of choice for regulated financial applications. Whether you're building payment apps, tokenization platforms, or DeFi protocols, these changes will impact how you architect and deploy your applications.

## The Big Picture: Stellar's 2026 Vision

SDF's roadmap centers around four pillars:

1. **Scalability** - Reaching ~5000 TPS to handle institutional transaction volumes
2. **Unified Data Access** - Consolidating Soroban RPC into Stellar RPC
3. **State Management** - Improving state archival for cheaper long-term storage
4. **Developer Experience** - Better SDKs, tooling, and documentation

Let's break down each area and what it means for your applications.

## Pillar 1: Scaling to 5000 TPS

### Where We Are

Stellar currently handles approximately 100-200 TPS during peak activity. While this is already faster than many blockchains, institutional use cases like [real world asset tokenization](/blog/stellar-foundation-real-world-assets) demand significantly higher throughput.

You can monitor current TPS and network metrics on our [Stellar Network Analytics Dashboard](/analytics), which shows real-time ledger data.

### How They're Getting There

The path to ~5000 TPS involves several optimizations:

**Consensus Layer Improvements:**
- Optimized SCP (Stellar Consensus Protocol) message handling
- Reduced inter-validator communication overhead
- Parallel transaction application within ledgers

**Horizon Infrastructure:**
- Improved ingestion pipeline for higher throughput
- Better database indexing for faster queries
- Connection pooling and caching improvements

For a deeper analysis of how these changes affect API integrations, see our post on [how Stellar's 5000 TPS roadmap impacts your API integrations](/blog/stellar-5000-tps-roadmap-api-impact).

### What Developers Should Do

1. **Design for higher throughput** - Your applications should handle increased data volumes
2. **Use streaming over polling** - SSE connections are more efficient at scale (our [Live Transaction Viewer](/dashboard/transactions) demonstrates this pattern)
3. **Implement proper caching** - Use Redis or similar to avoid hitting rate limits
4. **Monitor with LumenQuery** - Our [Analytics Dashboard](/analytics/network) provides real-time network health metrics

## Pillar 2: Stellar RPC Unification

### The Rebrand

Soroban RPC is becoming Stellar RPC. This isn't just a name change—it represents a fundamental shift in how developers access network data. We covered this transition in detail in our post on the [Soroban to Stellar RPC rebrand](/blog/soroban-to-stellar-rpc-rebrand).

### What Changes

**Before (two interfaces):**
- Horizon API: Payments, accounts, offers, ledger history
- Soroban RPC: Smart contract state, transaction simulation, events

**After (clear separation):**
- Stellar RPC: Real-time state, simulation, submission
- Horizon API: Historical data, deep indexing, full-text search

### How to Use Stellar RPC

Learn to query real-time blockchain data using Stellar RPC in our hands-on guide: [Using the Stellar RPC to Access Real-Time Blockchain Data](/blog/using-stellar-rpc-access-blockchain-data).

Key RPC methods every developer should know:

\`\`\`bash
# Check network health
curl -X POST https://rpc.lumenquery.io \\
  -d '{"jsonrpc":"2.0","method":"getHealth","id":1}'

# Get latest ledger
curl -X POST https://rpc.lumenquery.io \\
  -d '{"jsonrpc":"2.0","method":"getLatestLedger","id":1}'

# Simulate a transaction before submitting
curl -X POST https://rpc.lumenquery.io \\
  -d '{"jsonrpc":"2.0","method":"simulateTransaction","id":1,
       "params":{"transaction":"AAAAAgAA..."}}'
\`\`\`

LumenQuery provides managed access to both Horizon and Stellar RPC. See our [API documentation](/docs) for the full endpoint reference.

## Pillar 3: State Archival Improvements

### The Problem

Every smart contract on Stellar stores data (state) that validators must maintain. As more contracts are deployed, state bloat becomes a concern—it slows down validators and increases costs.

### The Solution

SDF's state archival strategy involves:

- **Tiered storage** - Frequently accessed data stays in "live" state; older data moves to archival
- **Rent-based economics** - Contracts pay rent to keep data in live state
- **Efficient restoration** - Archived state can be restored with a single transaction
- **Cheaper storage** - Archival storage costs significantly less than live state

### Impact on Developers

If you're building [Soroban smart contracts](/contracts), you need to understand state archival:

- **Use temporary storage** for ephemeral data (cheaper, auto-expires)
- **Use persistent storage** only for data that must survive across transactions
- **Budget for rent payments** in your contract economics

Our [Soroban Smart Contracts Explorer documentation](/docs/contracts) explains the three storage types (persistent, temporary, instance) and when to use each.

## Pillar 4: Developer Experience

### SDK Improvements

SDF is investing in better SDKs across multiple languages:

- **JavaScript/TypeScript** - \`@stellar/stellar-sdk\` with improved TypeScript support
- **Rust** - First-class Soroban SDK for contract development
- **Python** - Growing community SDK
- **Go** - Used by many institutional integrators

### Tooling

The developer toolchain is expanding:

- **Stellar CLI** - One tool for contract deployment, testing, and interaction
- **Soroban Dev Environment** - Local testing without connecting to testnet
- **Improved Block Explorers** - Like [LumenQuery's Smart Contract Explorer](/contracts) for decoded contract data

### Grant Programs

SDF continues to fund ecosystem development through:

- **Community Fund** - Grants for open-source projects
- **Startup Programs** - Funding for companies building on Stellar
- **Bounty Programs** - Rewards for specific development tasks

Read more about these initiatives in our post on [how Stellar is expanding the developer ecosystem](/blog/stellar-expanding-developer-ecosystem).

## Timeline: Key 2026 Milestones

| Quarter | Milestone | Impact |
|---------|-----------|--------|
| Q1 2026 | Stellar RPC GA | Unified data access for all apps |
| Q2 2026 | State archival v2 | Cheaper contract storage |
| Q2 2026 | Protocol 22 | New transaction types, improved SCP |
| Q3 2026 | 2000 TPS target | 10x current capacity |
| Q4 2026 | Enhanced Soroban | More complex contract capabilities |
| 2027+ | 5000 TPS target | Institutional-grade throughput |

## How to Prepare Your Applications

### 1. Start Using Stellar RPC

Begin migrating from Soroban RPC to Stellar RPC now. LumenQuery supports both endpoints during the transition:

\`\`\`bash
# LumenQuery Horizon API (historical data)
curl https://api.lumenquery.io/ledgers?limit=5

# LumenQuery Stellar RPC (real-time state)
curl -X POST https://rpc.lumenquery.io \\
  -d '{"jsonrpc":"2.0","method":"getLatestLedger","id":1}'
\`\`\`

### 2. Monitor Network Changes

Use our [Analytics Dashboard](/analytics) to track protocol upgrades and network metrics. When the protocol version increments, check for new features.

### 3. Test Against Realistic Conditions

Our [Natural Language Query Interface](/query) lets you explore live network data to understand transaction patterns and asset flows.

### 4. Stay Updated

Follow these resources to stay informed:
- [LumenQuery Blog](/blog) - Developer guides and industry analysis
- [Stellar Developer Docs](https://developers.stellar.org) - Official SDF documentation
- [SDF Blog](https://stellar.org/blog) - Announcements and roadmap updates

---

**Related reading:**
- [How the Stellar Foundation Is Driving Real World Asset Adoption](/blog/stellar-foundation-real-world-assets)
- [Using the Stellar RPC to Access Real-Time Blockchain Data](/blog/using-stellar-rpc-access-blockchain-data)
- [How Stellar's Roadmap to 5000 TPS Impacts Your API Integrations](/blog/stellar-5000-tps-roadmap-api-impact)
- [Best Stellar API Providers in 2026](/blog/best-stellar-api-providers-2026)
`,
  },
  'using-stellar-rpc-access-blockchain-data': {
    title: 'Using the Stellar RPC to Access Real-Time Blockchain Data',
    date: '2026-03-27',
    readTime: '13 min read',
    category: 'Developer Guide',
    content: `
The Stellar RPC (formerly Soroban RPC) is the primary interface for accessing real-time blockchain state on the Stellar network. Whether you're querying smart contract data, simulating transactions, or streaming events, the Stellar RPC is your gateway to live network data. This guide covers every method you need to know, with practical code examples.

## What Is the Stellar RPC?

The Stellar RPC is a JSON-RPC 2.0 interface that provides real-time access to:

- **Current ledger state** - Latest ledger sequence, protocol version
- **Transaction simulation** - Test transactions before submitting
- **Contract state** - Read smart contract storage entries
- **Event streaming** - Monitor contract events as they happen
- **Fee estimation** - Get current fee statistics for proper transaction pricing

For a comparison of when to use Stellar RPC vs. the Horizon API, read our guide on [Horizon API vs Stellar RPC](/blog/horizon-api-vs-stellar-rpc).

## Getting Started

### Endpoint Configuration

LumenQuery provides managed Stellar RPC access:

\`\`\`bash
# LumenQuery Stellar RPC endpoint
RPC_URL="https://rpc.lumenquery.io"
API_KEY="lq_your_api_key"

# Test connectivity
curl -X POST $RPC_URL \\
  -H "Content-Type: application/json" \\
  -H "X-API-Key: $API_KEY" \\
  -d '{"jsonrpc":"2.0","id":1,"method":"getHealth"}'
\`\`\`

Response:
\`\`\`json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "status": "healthy"
  }
}
\`\`\`

Sign up for a [free LumenQuery account](/auth/signup) to get your API key. See [Getting Started with LumenQuery](/blog/getting-started-with-lumenquery) for a complete setup guide.

## Core RPC Methods

### getLatestLedger

Returns the current ledger sequence and protocol version. This is the most basic health check for your application:

\`\`\`bash
curl -X POST https://rpc.lumenquery.io \\
  -H "Content-Type: application/json" \\
  -d '{
    "jsonrpc": "2.0",
    "id": 1,
    "method": "getLatestLedger"
  }'
\`\`\`

\`\`\`json
{
  "result": {
    "id": "abc123...",
    "sequence": 62100450,
    "protocolVersion": 21
  }
}
\`\`\`

You can see this data visualized on our [Analytics Dashboard](/analytics/network), which tracks ledger progression in real time.

### getNetwork

Returns network passphrase and other configuration:

\`\`\`bash
curl -X POST https://rpc.lumenquery.io \\
  -H "Content-Type: application/json" \\
  -d '{
    "jsonrpc": "2.0",
    "id": 1,
    "method": "getNetwork"
  }'
\`\`\`

### getLedgerEntries

Read specific ledger entries, including smart contract storage. This is how you query contract state:

\`\`\`bash
curl -X POST https://rpc.lumenquery.io \\
  -H "Content-Type: application/json" \\
  -d '{
    "jsonrpc": "2.0",
    "id": 1,
    "method": "getLedgerEntries",
    "params": {
      "keys": ["AAAA...base64_encoded_key"]
    }
  }'
\`\`\`

Our [Soroban Smart Contracts Explorer](/contracts) uses this method under the hood to display contract storage entries. You can browse contract state visually using the [Storage Viewer](/docs/contracts).

### simulateTransaction

The most important method for smart contract developers. Simulate a transaction to estimate resources, fees, and catch errors before submitting:

\`\`\`typescript
async function simulateTransaction(xdr: string) {
  const response = await fetch('https://rpc.lumenquery.io', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-API-Key': process.env.LUMENQUERY_API_KEY!,
    },
    body: JSON.stringify({
      jsonrpc: '2.0',
      id: 1,
      method: 'simulateTransaction',
      params: { transaction: xdr },
    }),
  });

  const data = await response.json();

  if (data.result.error) {
    throw new Error(data.result.error);
  }

  return {
    cost: data.result.cost,
    footprint: data.result.transactionData,
    result: data.result.results,
  };
}
\`\`\`

This is exactly the pattern used in LumenQuery's [contract deployment feature](/contracts/deploy), which lets you deploy Soroban contracts directly from the browser.

### sendTransaction

Submit a signed transaction to the network:

\`\`\`typescript
async function submitTransaction(signedXdr: string) {
  const response = await fetch('https://rpc.lumenquery.io', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      jsonrpc: '2.0',
      id: 1,
      method: 'sendTransaction',
      params: { transaction: signedXdr },
    }),
  });

  const data = await response.json();
  return data.result; // { hash, status, latestLedger }
}
\`\`\`

### getTransaction

Check the status of a submitted transaction:

\`\`\`bash
curl -X POST https://rpc.lumenquery.io \\
  -H "Content-Type: application/json" \\
  -d '{
    "jsonrpc": "2.0",
    "id": 1,
    "method": "getTransaction",
    "params": {
      "hash": "abc123..."
    }
  }'
\`\`\`

Possible statuses: \`NOT_FOUND\`, \`SUCCESS\`, \`FAILED\`. Our [Live Transaction Viewer](/dashboard/transactions) shows decoded transaction results in real time.

### getEvents

Query historical events emitted by smart contracts:

\`\`\`typescript
async function getContractEvents(contractId: string, startLedger: number) {
  const response = await fetch('https://rpc.lumenquery.io', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      jsonrpc: '2.0',
      id: 1,
      method: 'getEvents',
      params: {
        startLedger,
        filters: [{
          type: 'contract',
          contractIds: [contractId],
        }],
        pagination: { limit: 100 },
      },
    }),
  });

  const data = await response.json();
  return data.result.events;
}
\`\`\`

The [Event Stream feature](/docs/contracts) in Soroban Pro provides real-time SSE streaming of contract events.

### getFeeStats

Get current fee statistics for proper transaction pricing:

\`\`\`bash
curl -X POST https://rpc.lumenquery.io \\
  -H "Content-Type: application/json" \\
  -d '{
    "jsonrpc": "2.0",
    "id": 1,
    "method": "getFeeStats"
  }'
\`\`\`

Understanding fees is critical—see our documentation on [understanding stroops](/docs/analytics) for how fees are denominated on Stellar.

## Building a Real-Time Dashboard

Here's a practical example: building a dashboard that monitors ledger progression using Stellar RPC and Horizon API together.

\`\`\`typescript
// Poll Stellar RPC for latest ledger
async function pollLedger() {
  const rpcResponse = await fetch('https://rpc.lumenquery.io', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      jsonrpc: '2.0',
      id: 1,
      method: 'getLatestLedger',
    }),
  });
  const rpc = await rpcResponse.json();

  // Get detailed ledger info from Horizon
  const horizonResponse = await fetch(
    \`https://api.lumenquery.io/ledgers/\${rpc.result.sequence}\`
  );
  const horizon = await horizonResponse.json();

  return {
    sequence: rpc.result.sequence,
    protocolVersion: rpc.result.protocolVersion,
    transactionCount: horizon.successful_transaction_count,
    operationCount: horizon.operation_count,
    baseFee: horizon.base_fee_in_stroops,
    closedAt: horizon.closed_at,
  };
}
\`\`\`

This dual-API approach is exactly what powers our [Analytics Dashboard](/analytics). For more patterns like this, check out our guide on [building a Stellar blockchain explorer](/blog/build-stellar-blockchain-explorer-horizon-api).

## Best Practices

### 1. Always Simulate First

Never submit a transaction without simulating it. Simulation catches errors, estimates fees, and returns resource limits—all for free.

### 2. Handle Rate Limits

LumenQuery provides generous rate limits, but your application should handle 429 responses gracefully:

\`\`\`typescript
async function rpcCallWithRetry(method: string, params: object, retries = 3) {
  for (let i = 0; i < retries; i++) {
    const response = await fetch('https://rpc.lumenquery.io', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ jsonrpc: '2.0', id: 1, method, params }),
    });

    if (response.status === 429) {
      await new Promise(r => setTimeout(r, 1000 * (i + 1)));
      continue;
    }

    return response.json();
  }
  throw new Error('Rate limit exceeded after retries');
}
\`\`\`

See our [API documentation](/docs) for current rate limit tiers.

### 3. Cache Where Possible

Ledger data doesn't change once a ledger closes (every ~5 seconds). Cache responses with TTLs:

- **getLatestLedger** - Cache for 3-5 seconds
- **getLedgerEntries** - Cache based on ledger sequence
- **getFeeStats** - Cache for 30 seconds
- **getHealth** - Cache for 10 seconds

### 4. Use Horizon for Historical Data

Stellar RPC is optimized for real-time state. For historical queries (transaction history, payment streams, offer books), use the [Horizon API](/docs):

\`\`\`bash
# Historical transactions via Horizon
curl https://api.lumenquery.io/transactions?limit=10&order=desc

# Real-time state via Stellar RPC
curl -X POST https://rpc.lumenquery.io \\
  -d '{"jsonrpc":"2.0","method":"getLatestLedger","id":1}'
\`\`\`

Or use our [Natural Language Query Interface](/query) to explore both data sources with plain English questions.

## RPC Method Reference

| Method | Purpose | Use When |
|--------|---------|----------|
| getHealth | Check server status | Monitoring, health checks |
| getNetwork | Network configuration | Initial setup |
| getLatestLedger | Current ledger | Dashboard displays |
| getLedgerEntries | Read ledger state | Contract storage queries |
| simulateTransaction | Test transaction | Before every submission |
| sendTransaction | Submit transaction | After simulation + signing |
| getTransaction | Check tx status | After submission |
| getTransactions | Batch tx queries | Batch status checking |
| getEvents | Query contract events | Event monitoring |
| getFeeStats | Fee estimation | Transaction construction |

## What's Next

The Stellar RPC is evolving rapidly. The [Stellar Foundation roadmap for 2026](/blog/stellar-foundation-roadmap-2026) includes plans for enhanced event streaming, better state archival, and improved developer tooling.

For developers new to Stellar, start with our [Soroban JSON RPC Explained](/blog/soroban-json-rpc-explained) guide for the foundational concepts, then come back here for the practical implementation patterns.

---

**Related reading:**
- [Building Real-Time Apps on Stellar: Horizon API vs Stellar RPC](/blog/horizon-api-vs-stellar-rpc)
- [From Soroban to Stellar RPC: What the Rebrand Means](/blog/soroban-to-stellar-rpc-rebrand)
- [How to Build a Stellar Blockchain Explorer Using Horizon API](/blog/build-stellar-blockchain-explorer-horizon-api)
- [Soroban Smart Contracts Explorer Documentation](/docs/contracts)
`,
  },
  'stellar-expanding-developer-ecosystem': {
    title: 'How Stellar Is Expanding the Developer Ecosystem in 2026',
    date: '2026-03-27',
    readTime: '11 min read',
    category: 'Industry Insights',
    content: `
Stellar has been quietly building one of the most developer-friendly blockchain ecosystems. With Soroban smart contracts now in production, improved SDKs, better tooling, and active grant programs, the Stellar developer community is growing faster than ever. Here's what's happening and how you can get involved.

## The State of Stellar Development in 2026

The numbers tell a compelling story:

- **Active developers**: Growing steadily quarter-over-quarter
- **Soroban contracts deployed**: Thousands since mainnet launch
- **SDK downloads**: Millions of npm installs for @stellar/stellar-sdk
- **Grant funding**: Tens of millions allocated through SDF programs

You can see the network's growth reflected in our [Stellar Network Analytics Dashboard](/analytics), which tracks transaction volumes, smart contract activity, and network health metrics in real time.

## Soroban: The Game Changer

### What Is Soroban?

Soroban is Stellar's smart contract platform, written in Rust and compiled to WebAssembly (WASM). Unlike EVM-based chains, Soroban was designed from scratch with lessons learned from years of smart contract development:

- **Predictable fees** - Know exactly what you'll pay before submitting
- **No reentrancy** - Eliminated by design, not by convention
- **Built-in testing** - First-class test framework in Rust
- **Resource metering** - CPU, memory, and I/O tracked separately

### Building with Soroban

Getting started with Soroban development is straightforward:

\`\`\`rust
#[contract]
pub struct TokenContract;

#[contractimpl]
impl TokenContract {
    pub fn transfer(env: Env, from: Address, to: Address, amount: i128) {
        from.require_auth();
        // Transfer logic here
    }
}
\`\`\`

Once deployed, you can inspect your contracts using [LumenQuery's Smart Contract Explorer](/contracts), which decodes XDR data into human-readable function calls, storage entries, and events.

For a deeper dive into Soroban development, read our guide on [Soroban JSON RPC Explained](/blog/soroban-json-rpc-explained).

### Deploy Directly from the Browser

LumenQuery's [Contract Deployment feature](/contracts/deploy) lets you deploy Soroban contracts directly from your browser:

1. Connect your Freighter wallet
2. Upload your compiled .wasm file
3. Simulate the deployment transaction
4. Sign and submit

No CLI required. This dramatically lowers the barrier to entry for new Soroban developers.

## SDKs and Libraries

### Official SDKs

SDF maintains SDKs in multiple languages, with the JavaScript SDK being the most popular:

**JavaScript/TypeScript** (most popular):
\`\`\`bash
npm install @stellar/stellar-sdk
\`\`\`

\`\`\`typescript
import { Horizon, Networks } from '@stellar/stellar-sdk';

const server = new Horizon.Server('https://api.lumenquery.io');
const account = await server.loadAccount('GXXX...');
console.log('Balances:', account.balances);
\`\`\`

**Rust** (for Soroban contracts):
\`\`\`bash
cargo install --locked stellar-cli
stellar contract init my-project
\`\`\`

**Python**:
\`\`\`bash
pip install stellar-sdk
\`\`\`

### Community Libraries

The community has built tools for:

- **Go** - Popular for institutional backends
- **Java/Kotlin** - Android applications
- **Swift** - iOS applications
- **C#/.NET** - Enterprise integrations

## Developer Tooling

### Stellar CLI

The Stellar CLI is the Swiss Army knife for Stellar development:

\`\`\`bash
# Initialize a new Soroban project
stellar contract init my-token

# Build the contract
stellar contract build

# Deploy to testnet
stellar contract deploy --wasm target/wasm32-unknown-unknown/release/my_token.wasm

# Invoke a function
stellar contract invoke --id CXXX... -- transfer --from GXXX... --to GYYY... --amount 100
\`\`\`

### LumenQuery Developer Tools

LumenQuery provides several tools that complement the Stellar CLI:

- **[Natural Language Query Interface](/query)** - Explore the network with plain English questions like "top 10 XLM holders" or "recent payments"
- **[Analytics Dashboard](/analytics)** - Monitor network metrics, token activity, and Soroban contract usage
- **[Smart Contract Explorer](/contracts)** - Inspect decoded contract calls, storage, and events
- **[Live Transaction Viewer](/dashboard/transactions)** - Watch decoded transactions stream in real time
- **[Portfolio Intelligence](/portfolio)** - Track multi-account positions and P&L
- **[API Documentation](/docs)** - Complete Horizon API and Stellar RPC reference

### Block Explorers and Monitoring

Good observability is essential for production applications. Our guide on [how to monitor a Stellar validator or Horizon node](/blog/monitor-stellar-validator-horizon-node) covers Prometheus and Grafana setups for Stellar infrastructure.

## Grant Programs and Funding

### Stellar Community Fund (SCF)

The Stellar Community Fund awards grants to projects that benefit the Stellar ecosystem. Recent funded categories include:

- **DeFi protocols** - AMMs, lending platforms, yield aggregators
- **Developer tools** - SDKs, libraries, block explorers
- **Education** - Tutorials, courses, documentation
- **Infrastructure** - RPC providers, indexers, analytics platforms

### Startup Programs

SDF's startup programs provide:

- **Funding** - Seed grants for early-stage companies
- **Technical support** - Direct access to SDF engineering
- **Network introductions** - Connections to institutional partners
- **Marketing support** - Visibility through SDF channels

### Bounty Programs

Targeted bounties for specific development tasks:

- Bug bounties for the core protocol
- Feature implementations for ecosystem tools
- Documentation improvements
- Integration templates and examples

## Building on Stellar: Where to Start

### For Web3 Newcomers

If you're new to blockchain development, Stellar is an excellent starting point:

1. **Read our [Getting Started guide](/blog/getting-started-with-lumenquery)** - Set up your LumenQuery API key
2. **Explore the network** - Use our [Query Interface](/query) to ask questions in plain English
3. **Study the [API docs](/docs)** - Understand Horizon endpoints and Stellar RPC methods
4. **Build a simple app** - Follow our [blockchain explorer tutorial](/blog/build-stellar-blockchain-explorer-horizon-api)

### For Experienced Blockchain Developers

If you're coming from Ethereum or another chain:

1. **Understand the differences** - Stellar has native asset issuance, built-in DEX, and SCP consensus (not PoS/PoW)
2. **Learn Soroban** - Read [Soroban JSON RPC Explained](/blog/soroban-json-rpc-explained)
3. **Compare APIs** - Check our [Horizon vs Stellar RPC guide](/blog/horizon-api-vs-stellar-rpc)
4. **Deploy a contract** - Use our [browser-based deployment tool](/contracts/deploy)

### For Enterprise Developers

If you're building institutional applications:

1. **Evaluate infrastructure** - Read our [Stellar API providers comparison](/blog/best-stellar-api-providers-2026)
2. **Understand compliance** - Stellar's built-in authorization flags support regulatory requirements
3. **Explore RWAs** - See how the [Stellar Foundation is driving real world asset adoption](/blog/stellar-foundation-real-world-assets)
4. **Plan for scale** - Review [how 5000 TPS impacts your integrations](/blog/stellar-5000-tps-roadmap-api-impact)

## The Road Ahead

The [Stellar Foundation's 2026 roadmap](/blog/stellar-foundation-roadmap-2026) includes several developer-focused initiatives:

- **Improved developer documentation** - More examples, tutorials, and guides
- **Enhanced testing tools** - Better local development environments
- **SDK improvements** - More idiomatic APIs across all languages
- **New grant categories** - Funding for AI/blockchain integration, RWA tooling, and more

The Stellar ecosystem is at an inflection point. With Soroban maturing, institutional adoption growing, and developer tools improving, there has never been a better time to start building on Stellar.

---

**Related reading:**
- [The Stellar Foundation Roadmap for 2026](/blog/stellar-foundation-roadmap-2026)
- [How the Stellar Foundation Is Driving RWA Adoption](/blog/stellar-foundation-real-world-assets)
- [Using the Stellar RPC to Access Real-Time Blockchain Data](/blog/using-stellar-rpc-access-blockchain-data)
- [5 Powerful Use Cases for the Stellar Horizon API](/blog/stellar-api-use-cases-for-fintech)
`,
  },
  'soroban-to-stellar-rpc-rebrand': {
    title: 'From Soroban to Stellar RPC: What the Rebrand Means for Developers',
    date: '2026-02-22',
    readTime: '10 min read',
    category: 'Developer Guide',
    content: `
The Stellar Development Foundation recently announced a significant change: Soroban RPC is now Stellar RPC. While this might seem like a simple rebrand, it reflects a deeper strategic shift in how developers access and interact with the Stellar network. Let's explore what this means for your applications and how to adapt.

## Why the Rebrand?

The transition from "Soroban RPC" to "Stellar RPC" isn't just cosmetic. It represents SDF's vision of a unified data access layer for the entire Stellar ecosystem.

**The Old Model:**
- Horizon API for traditional Stellar operations (payments, accounts, offers)
- Soroban RPC for smart contract interactions
- Two separate mental models, two sets of endpoints

**The New Model:**
- Stellar RPC as the unified interface for real-time network state
- Horizon for historical data and deep indexing
- Clear separation of concerns: real-time vs. historical

### What SDF Says

According to the Stellar roadmap, the unification aims to:

1. **Simplify developer experience** - One RPC interface for real-time operations
2. **Reduce infrastructure complexity** - Operators maintain fewer services
3. **Enable faster innovation** - New features roll out to one service, not two
4. **Improve performance** - Optimized specifically for real-time state queries

## What's Actually Changing?

### Endpoint Structure

The RPC endpoint structure remains largely compatible, but the branding and some method names are evolving:

\`\`\`javascript
// Old approach
const SOROBAN_RPC_URL = 'https://soroban-rpc.mainnet.stellar.org';

// New unified approach
const STELLAR_RPC_URL = 'https://stellar-rpc.mainnet.stellar.org';
// Or via LumenQuery
const STELLAR_RPC_URL = 'https://rpc.lumenquery.io';
\`\`\`

### Method Naming

Core methods are being standardized:

| Old Method | New Method | Purpose |
|------------|------------|---------|
| getHealth | getHealth | Server health check |
| getLatestLedger | getLatestLedger | Current ledger info |
| simulateTransaction | simulateTransaction | Tx simulation |
| sendTransaction | sendTransaction | Submit transaction |
| getTransaction | getTransaction | Tx status by hash |
| getLedgerEntries | getLedgerEntries | Read state data |
| getEvents | getEvents | Query events |

Most methods remain unchanged—the focus is on consistency and future expansion.

### New Capabilities

The rebrand brings additional methods for unified access:

\`\`\`javascript
// New: Get account state directly via RPC
const response = await fetch(STELLAR_RPC_URL, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    jsonrpc: '2.0',
    id: 1,
    method: 'getLedgerEntries',
    params: {
      keys: [
        // Account ledger key
        'AAAAAAAAAABVc2VyIGFjY291bnQga2V5...'
      ]
    }
  })
});

// Real-time account balance without Horizon
const { result } = await response.json();
\`\`\`

## Integrating Stellar RPC into Your Stack

### Wallet Integration

Wallets benefit significantly from unified RPC access:

\`\`\`typescript
// wallet/stellar-rpc-client.ts
const STELLAR_RPC = 'https://rpc.lumenquery.io';

interface RpcClient {
  getLatestLedger(): Promise<LatestLedger>;
  simulateTransaction(xdr: string): Promise<SimulateResult>;
  sendTransaction(xdr: string): Promise<SendResult>;
  getTransaction(hash: string): Promise<TransactionStatus>;
}

export async function createRpcClient(apiKey: string): Promise<RpcClient> {
  const call = async (method: string, params: any = {}) => {
    const response = await fetch(STELLAR_RPC, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': apiKey,
      },
      body: JSON.stringify({
        jsonrpc: '2.0',
        id: Date.now(),
        method,
        params,
      }),
    });

    const data = await response.json();
    if (data.error) throw new Error(data.error.message);
    return data.result;
  };

  return {
    getLatestLedger: () => call('getLatestLedger'),
    simulateTransaction: (xdr) => call('simulateTransaction', { transaction: xdr }),
    sendTransaction: (xdr) => call('sendTransaction', { transaction: xdr }),
    getTransaction: (hash) => call('getTransaction', { hash }),
  };
}
\`\`\`

### Dashboard Integration

Real-time dashboards can leverage Stellar RPC for live network state:

\`\`\`typescript
// components/NetworkStatus.tsx
'use client';

import { useEffect, useState } from 'react';

interface NetworkState {
  ledger: number;
  protocolVersion: number;
  timestamp: number;
}

export function NetworkStatus() {
  const [state, setState] = useState<NetworkState | null>(null);

  useEffect(() => {
    const fetchState = async () => {
      const response = await fetch('/api/stellar-rpc', {
        method: 'POST',
        body: JSON.stringify({ method: 'getLatestLedger' }),
      });
      const { result } = await response.json();
      setState({
        ledger: result.sequence,
        protocolVersion: result.protocolVersion,
        timestamp: Date.now(),
      });
    };

    fetchState();
    const interval = setInterval(fetchState, 5000);
    return () => clearInterval(interval);
  }, []);

  if (!state) return <div>Loading...</div>;

  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="p-4 bg-[#262932] rounded-lg shadow">
        <div className="text-sm text-gray-500">Latest Ledger</div>
        <div className="text-2xl font-bold">{state.ledger.toLocaleString()}</div>
      </div>
      <div className="p-4 bg-[#262932] rounded-lg shadow">
        <div className="text-sm text-gray-500">Protocol</div>
        <div className="text-2xl font-bold">v{state.protocolVersion}</div>
      </div>
      <div className="p-4 bg-[#262932] rounded-lg shadow">
        <div className="text-sm text-gray-500">Updated</div>
        <div className="text-2xl font-bold">
          {new Date(state.timestamp).toLocaleTimeString()}
        </div>
      </div>
    </div>
  );
}
\`\`\`

### Monitoring Tools

For operations teams monitoring Stellar infrastructure:

\`\`\`typescript
// monitoring/health-checker.ts
interface HealthStatus {
  rpc: 'healthy' | 'degraded' | 'down';
  latency: number;
  ledgerLag: number;
}

export async function checkStellarRpcHealth(
  rpcUrl: string
): Promise<HealthStatus> {
  const start = Date.now();

  try {
    // Check basic health
    const healthResponse = await fetch(rpcUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        jsonrpc: '2.0',
        id: 1,
        method: 'getHealth',
      }),
    });

    const latency = Date.now() - start;
    const { result } = await healthResponse.json();

    if (result.status !== 'healthy') {
      return { rpc: 'degraded', latency, ledgerLag: -1 };
    }

    // Check ledger freshness
    const ledgerResponse = await fetch(rpcUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        jsonrpc: '2.0',
        id: 2,
        method: 'getLatestLedger',
      }),
    });

    const { result: ledger } = await ledgerResponse.json();
    const ledgerAge = Date.now() / 1000 - ledger.timestamp;

    return {
      rpc: ledgerAge < 10 ? 'healthy' : 'degraded',
      latency,
      ledgerLag: Math.round(ledgerAge),
    };
  } catch (error) {
    return { rpc: 'down', latency: Date.now() - start, ledgerLag: -1 };
  }
}
\`\`\`

## Migration Checklist

If you're currently using Soroban RPC, here's your migration path:

### 1. Update Endpoint URLs

\`\`\`javascript
// Before
const RPC_URL = process.env.SOROBAN_RPC_URL;

// After
const RPC_URL = process.env.STELLAR_RPC_URL;
\`\`\`

### 2. Update Environment Variables

\`\`\`bash
# .env
# Before
SOROBAN_RPC_URL=https://soroban-rpc.mainnet.stellar.org

# After
STELLAR_RPC_URL=https://rpc.lumenquery.io
\`\`\`

### 3. Review Method Names

Most methods are unchanged, but verify against the latest documentation for any deprecations.

### 4. Update SDK Versions

\`\`\`bash
npm update @stellar/stellar-sdk
\`\`\`

The latest SDK versions support both naming conventions during the transition period.

## Best Practices for Unified RPC

### Use Stellar RPC for Real-Time, Horizon for Historical

\`\`\`typescript
// Real-time: Use Stellar RPC
async function getCurrentLedger() {
  return await stellarRpc.getLatestLedger();
}

// Historical: Use Horizon
async function getTransactionHistory(account: string) {
  return await horizon.transactions()
    .forAccount(account)
    .order('desc')
    .limit(100)
    .call();
}
\`\`\`

### Implement Graceful Fallbacks

\`\`\`typescript
async function getAccountBalance(accountId: string) {
  try {
    // Try Stellar RPC first (faster for real-time)
    const entries = await stellarRpc.getLedgerEntries([
      createAccountKey(accountId)
    ]);
    return parseBalance(entries);
  } catch (error) {
    // Fall back to Horizon
    const account = await horizon.loadAccount(accountId);
    return account.balances;
  }
}
\`\`\`

### Cache Appropriately

\`\`\`typescript
const cache = new Map<string, { data: any; expires: number }>();

async function cachedRpcCall(method: string, params: any, ttl = 5000) {
  const key = \`\${method}:\${JSON.stringify(params)}\`;
  const cached = cache.get(key);

  if (cached && cached.expires > Date.now()) {
    return cached.data;
  }

  const result = await stellarRpc.call(method, params);
  cache.set(key, { data: result, expires: Date.now() + ttl });
  return result;
}
\`\`\`

## Conclusion

The Soroban to Stellar RPC rebrand reflects a maturing ecosystem with clearer architectural boundaries. For developers:

1. **Real-time operations** → Stellar RPC
2. **Historical queries** → Horizon API
3. **Smart contracts** → Both (Stellar RPC for invocation, Horizon for indexed history)

The transition is designed to be smooth, with backwards compatibility during the migration period. Start updating your endpoints today to take advantage of the unified infrastructure.

---

*Ready to use the new Stellar RPC? [LumenQuery](/auth/signup) provides fully managed Stellar RPC with 99.9% uptime, automatic failover, and built-in rate limiting.*
    `,
  },
  'horizon-api-vs-stellar-rpc': {
    title: 'Building Real-Time Apps on Stellar: Horizon API vs Stellar RPC',
    date: '2026-02-22',
    readTime: '12 min read',
    category: 'Developer Guide',
    content: `
When building on Stellar, developers face a crucial architectural decision: when to use Horizon API versus Stellar RPC. Both provide access to the Stellar network, but they're optimized for different use cases. This guide breaks down the differences with practical examples.

## Understanding the Two Services

### Horizon API

Horizon is Stellar's REST API server. It maintains a full index of the Stellar network's history and provides:

- **RESTful endpoints** for accounts, transactions, operations, effects
- **Historical queries** with pagination and filtering
- **Real-time streaming** via Server-Sent Events (SSE)
- **Multi-network support** (mainnet, testnet, futurenet)

### Stellar RPC

Stellar RPC (formerly Soroban RPC) is a JSON-RPC 2.0 service optimized for:

- **Real-time state queries** without full historical indexing
- **Transaction simulation** before submission
- **Smart contract interactions** (Soroban)
- **Lightweight deployment** with minimal storage requirements

## When to Use Each

| Use Case | Horizon | Stellar RPC | Why |
|----------|---------|-------------|-----|
| Get account balances | ✓ | ✓ | Both work; Horizon has richer data |
| Transaction history | ✓ | ✗ | Horizon indexes all history |
| Submit payments | ✓ | ✓ | Both can submit; RPC is faster |
| Invoke smart contracts | ✗ | ✓ | RPC has simulation support |
| Query contract state | ✗ | ✓ | RPC reads ledger entries directly |
| Stream transactions | ✓ | ✗ | Horizon has SSE streaming |
| Get fee estimates | ✓ | ✓ | RPC has getFeeStats |
| Build explorers | ✓ | ✗ | Horizon has complete history |
| Build wallets | ✓ | ✓ | Use both for full functionality |

## Practical Code Examples

### Example 1: Getting Account Balance

**Using Horizon (REST)**

\`\`\`typescript
// horizon-client.ts
const HORIZON_URL = 'https://api.lumenquery.io';

async function getAccountBalances(accountId: string) {
  const response = await fetch(
    \`\${HORIZON_URL}/accounts/\${accountId}\`,
    {
      headers: { 'X-API-Key': process.env.LUMENQUERY_API_KEY! }
    }
  );

  if (!response.ok) {
    if (response.status === 404) {
      return { balances: [], exists: false };
    }
    throw new Error(\`Horizon error: \${response.status}\`);
  }

  const account = await response.json();
  return {
    balances: account.balances.map((b: any) => ({
      asset: b.asset_type === 'native' ? 'XLM' : \`\${b.asset_code}:\${b.asset_issuer}\`,
      balance: b.balance,
    })),
    exists: true,
    sequence: account.sequence,
    thresholds: account.thresholds,
  };
}
\`\`\`

**Using Stellar RPC (JSON-RPC)**

\`\`\`typescript
// stellar-rpc-client.ts
import { Address, xdr } from '@stellar/stellar-sdk';

const STELLAR_RPC_URL = 'https://rpc.lumenquery.io';

async function getAccountBalancesRpc(accountId: string) {
  // Create the account ledger key
  const accountKey = xdr.LedgerKey.account(
    new xdr.LedgerKeyAccount({
      accountId: Address.fromString(accountId).toScAddress().accountId(),
    })
  ).toXDR('base64');

  const response = await fetch(STELLAR_RPC_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-API-Key': process.env.LUMENQUERY_API_KEY!,
    },
    body: JSON.stringify({
      jsonrpc: '2.0',
      id: 1,
      method: 'getLedgerEntries',
      params: { keys: [accountKey] },
    }),
  });

  const { result } = await response.json();

  if (!result.entries || result.entries.length === 0) {
    return { balances: [], exists: false };
  }

  // Parse the XDR response
  const entry = xdr.LedgerEntryData.fromXDR(
    result.entries[0].xdr,
    'base64'
  );

  const account = entry.account();
  return {
    balances: [{
      asset: 'XLM',
      balance: (BigInt(account.balance().toString()) / 10000000n).toString()
    }],
    exists: true,
  };
}
\`\`\`

**Verdict:** Horizon is easier for account data—it returns JSON directly. Use RPC when you need raw ledger state or are already in a Soroban context.

### Example 2: Transaction History

**Using Horizon (the only option)**

\`\`\`typescript
interface Transaction {
  id: string;
  hash: string;
  created_at: string;
  source_account: string;
  fee_charged: string;
  operation_count: number;
  successful: boolean;
  memo?: string;
}

async function getTransactionHistory(
  accountId: string,
  options: { limit?: number; cursor?: string } = {}
): Promise<{ transactions: Transaction[]; nextCursor: string | null }> {
  const limit = options.limit || 20;
  const cursor = options.cursor || '';

  const url = new URL(\`\${HORIZON_URL}/accounts/\${accountId}/transactions\`);
  url.searchParams.set('limit', limit.toString());
  url.searchParams.set('order', 'desc');
  if (cursor) url.searchParams.set('cursor', cursor);

  const response = await fetch(url.toString(), {
    headers: { 'X-API-Key': process.env.LUMENQUERY_API_KEY! }
  });

  const data = await response.json();
  const records = data._embedded?.records || [];

  return {
    transactions: records.map((tx: any) => ({
      id: tx.id,
      hash: tx.hash,
      created_at: tx.created_at,
      source_account: tx.source_account,
      fee_charged: tx.fee_charged,
      operation_count: tx.operation_count,
      successful: tx.successful,
      memo: tx.memo,
    })),
    nextCursor: records.length === limit ? records[records.length - 1].paging_token : null,
  };
}

// Usage with pagination
async function getAllTransactions(accountId: string) {
  const allTransactions: Transaction[] = [];
  let cursor: string | null = null;

  do {
    const result = await getTransactionHistory(accountId, {
      limit: 200,
      cursor: cursor || undefined
    });
    allTransactions.push(...result.transactions);
    cursor = result.nextCursor;
  } while (cursor);

  return allTransactions;
}
\`\`\`

**Verdict:** Stellar RPC doesn't index transaction history—use Horizon for any historical queries.

### Example 3: Submitting a Payment

**Using Horizon**

\`\`\`typescript
import { Keypair, Networks, Operation, TransactionBuilder } from '@stellar/stellar-sdk';

async function submitPaymentViaHorizon(
  sourceKeypair: Keypair,
  destination: string,
  amount: string
) {
  // Load account to get sequence number
  const accountResponse = await fetch(
    \`\${HORIZON_URL}/accounts/\${sourceKeypair.publicKey()}\`,
    { headers: { 'X-API-Key': process.env.LUMENQUERY_API_KEY! } }
  );
  const sourceAccount = await accountResponse.json();

  // Build transaction
  const transaction = new TransactionBuilder(
    {
      accountId: () => sourceAccount.id,
      sequenceNumber: () => sourceAccount.sequence,
      incrementSequenceNumber: () => {},
    },
    {
      fee: '100',
      networkPassphrase: Networks.PUBLIC,
    }
  )
    .addOperation(
      Operation.payment({
        destination,
        asset: Asset.native(),
        amount,
      })
    )
    .setTimeout(30)
    .build();

  transaction.sign(sourceKeypair);

  // Submit via Horizon
  const submitResponse = await fetch(\`\${HORIZON_URL}/transactions\`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'X-API-Key': process.env.LUMENQUERY_API_KEY!,
    },
    body: \`tx=\${encodeURIComponent(transaction.toXDR())}\`,
  });

  return submitResponse.json();
}
\`\`\`

**Using Stellar RPC**

\`\`\`typescript
async function submitPaymentViaRpc(signedXdr: string) {
  const response = await fetch(STELLAR_RPC_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-API-Key': process.env.LUMENQUERY_API_KEY!,
    },
    body: JSON.stringify({
      jsonrpc: '2.0',
      id: 1,
      method: 'sendTransaction',
      params: { transaction: signedXdr },
    }),
  });

  const { result } = await response.json();
  return result;
}

// Poll for completion
async function waitForTransaction(hash: string, timeoutMs = 30000) {
  const start = Date.now();

  while (Date.now() - start < timeoutMs) {
    const response = await fetch(STELLAR_RPC_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': process.env.LUMENQUERY_API_KEY!,
      },
      body: JSON.stringify({
        jsonrpc: '2.0',
        id: 1,
        method: 'getTransaction',
        params: { hash },
      }),
    });

    const { result } = await response.json();

    if (result.status === 'SUCCESS') return { success: true, result };
    if (result.status === 'FAILED') return { success: false, result };

    await new Promise(r => setTimeout(r, 1000));
  }

  throw new Error('Transaction timeout');
}
\`\`\`

**Verdict:** Both work. RPC is slightly faster for submission and better for Soroban transactions. Horizon gives richer response data.

### Example 4: Invoking a Smart Contract

**Using Stellar RPC (the only option)**

\`\`\`typescript
import { Contract, Address, nativeToScVal, Networks } from '@stellar/stellar-sdk';

async function invokeContract(
  contractId: string,
  method: string,
  args: any[],
  sourceKeypair: Keypair
) {
  const contract = new Contract(contractId);

  // Build the invocation
  const operation = contract.call(
    method,
    ...args.map(arg => nativeToScVal(arg))
  );

  // Get account for sequence
  const accountResponse = await fetch(STELLAR_RPC_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      jsonrpc: '2.0',
      id: 1,
      method: 'getLedgerEntries',
      params: { keys: [createAccountKey(sourceKeypair.publicKey())] },
    }),
  });

  // Build transaction
  const transaction = new TransactionBuilder(sourceAccount, {
    fee: '1000000',
    networkPassphrase: Networks.PUBLIC,
  })
    .addOperation(operation)
    .setTimeout(30)
    .build();

  // Simulate first
  const simResponse = await fetch(STELLAR_RPC_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      jsonrpc: '2.0',
      id: 1,
      method: 'simulateTransaction',
      params: { transaction: transaction.toXDR() },
    }),
  });

  const { result: simulation } = await simResponse.json();

  if (simulation.error) {
    throw new Error(\`Simulation failed: \${simulation.error}\`);
  }

  // Prepare transaction with simulation results
  const preparedTx = SorobanRpc.assembleTransaction(
    transaction,
    simulation
  );

  preparedTx.sign(sourceKeypair);

  // Submit
  const submitResponse = await fetch(STELLAR_RPC_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      jsonrpc: '2.0',
      id: 1,
      method: 'sendTransaction',
      params: { transaction: preparedTx.toXDR() },
    }),
  });

  return submitResponse.json();
}
\`\`\`

**Verdict:** Smart contracts require Stellar RPC for simulation. Horizon can index the results after the fact.

### Example 5: Real-Time Streaming

**Using Horizon SSE**

\`\`\`typescript
function streamTransactions(
  accountId: string,
  onTransaction: (tx: Transaction) => void,
  onError: (err: Error) => void
) {
  const url = \`\${HORIZON_URL}/accounts/\${accountId}/transactions?cursor=now\`;

  const eventSource = new EventSource(url);

  eventSource.onmessage = (event) => {
    const tx = JSON.parse(event.data);
    onTransaction(tx);
  };

  eventSource.onerror = (error) => {
    onError(new Error('Stream connection error'));
  };

  return () => eventSource.close();
}

// Usage
const stopStreaming = streamTransactions(
  'GABC...XYZ',
  (tx) => console.log('New transaction:', tx.hash),
  (err) => console.error('Stream error:', err)
);

// Later: stopStreaming();
\`\`\`

**Verdict:** Horizon is the only option for streaming. Stellar RPC is pull-based.

## Architecture Patterns

### Pattern 1: Wallet Application

\`\`\`
┌─────────────────────────────────────────┐
│           Wallet Frontend               │
├─────────────────────────────────────────┤
│                                         │
│  ┌─────────────┐    ┌───────────────┐   │
│  │   Horizon   │    │  Stellar RPC  │   │
│  └──────┬──────┘    └───────┬───────┘   │
│         │                   │           │
│         ▼                   ▼           │
│  • Account info       • Simulate tx     │
│  • Tx history         • Submit tx       │
│  • Stream updates     • Contract calls  │
│  • Asset metadata     • Fee estimates   │
│                                         │
└─────────────────────────────────────────┘
\`\`\`

### Pattern 2: DeFi Application

\`\`\`
┌─────────────────────────────────────────┐
│           DeFi Protocol UI              │
├─────────────────────────────────────────┤
│                                         │
│  Stellar RPC (Primary)                  │
│  • Contract state queries               │
│  • Transaction simulation               │
│  • Swap execution                       │
│  • LP position management               │
│                                         │
│  Horizon (Secondary)                    │
│  • Trade history                        │
│  • Volume analytics                     │
│  • Price charts (historical)            │
│                                         │
└─────────────────────────────────────────┘
\`\`\`

### Pattern 3: Block Explorer

\`\`\`
┌─────────────────────────────────────────┐
│           Block Explorer                │
├─────────────────────────────────────────┤
│                                         │
│  Horizon (Primary)                      │
│  • All historical data                  │
│  • Transaction search                   │
│  • Account lookup                       │
│  • Operations & effects                 │
│  • Asset issuance history               │
│                                         │
│  Stellar RPC (Secondary)                │
│  • Contract code viewer                 │
│  • Contract state inspector             │
│  • Real-time ledger info                │
│                                         │
└─────────────────────────────────────────┘
\`\`\`

## Performance Considerations

| Metric | Horizon | Stellar RPC |
|--------|---------|-------------|
| Cold query latency | 50-200ms | 20-50ms |
| State query depth | Full history | Current + recent |
| Storage requirements | 1TB+ | ~50GB |
| Memory usage | 8-16GB | 2-4GB |
| Concurrent connections | ~1000 | ~5000 |

## Conclusion

Choose your data access layer based on your use case:

- **Building a wallet?** Use both—Horizon for history/streaming, RPC for transactions
- **Building DeFi?** Primarily Stellar RPC, with Horizon for analytics
- **Building an explorer?** Primarily Horizon, with RPC for contract inspection
- **Building monitoring tools?** Stellar RPC for real-time, Horizon for historical metrics

The best applications use both services strategically, leveraging each for its strengths.

---

*Need both Horizon and Stellar RPC with a single API key? [LumenQuery](/auth/signup) provides unified access to the complete Stellar infrastructure stack.*
    `,
  },
  'stellar-5000-tps-roadmap-api-impact': {
    title: "How Stellar's Roadmap to 5000 TPS Impacts Your API Integrations",
    date: '2026-02-22',
    readTime: '11 min read',
    category: 'Industry Insights',
    content: `
The Stellar Development Foundation has outlined ambitious scalability goals: achieving approximately 5,000 transactions per second (TPS) on mainnet. This represents a 50x increase from current capacity. Here's what this means for developers building on Stellar's API infrastructure.

## Current State vs. Future State

### Where We Are Today

Stellar mainnet currently processes around 100-200 TPS during peak periods, with theoretical capacity around 1,000 TPS. The network handles:

- ~50 million monthly transactions
- ~5-second ledger close times
- ~1MB maximum ledger size
- Protocol version 21 (Soroban-enabled)

### Where We're Heading

The SDF's scalability roadmap targets:

- **5,000+ TPS sustained throughput**
- **Sub-second finality** (potential future enhancement)
- **Parallel transaction processing**
- **Optimized Soroban execution**

## Technical Changes Driving Scale

### 1. Parallel Transaction Validation

Current Stellar processes transactions sequentially within a ledger. The new architecture introduces:

\`\`\`
Current Model:
┌─────────────────────────────────────────┐
│ Ledger N                                │
│ Tx1 → Tx2 → Tx3 → ... → TxN (sequential)│
└─────────────────────────────────────────┘

Future Model:
┌─────────────────────────────────────────┐
│ Ledger N                                │
│ ┌────────┐ ┌────────┐ ┌────────┐        │
│ │ Shard 1│ │ Shard 2│ │ Shard 3│ (parallel)
│ │Tx1,Tx4 │ │Tx2,Tx5 │ │Tx3,Tx6 │        │
│ └────────┘ └────────┘ └────────┘        │
└─────────────────────────────────────────┘
\`\`\`

**API Impact:** Transaction ordering within a ledger may become non-deterministic for independent transactions.

### 2. Expanded Ledger Capacity

To support 5,000 TPS with 5-second ledgers, each ledger must contain ~25,000 transactions:

| Metric | Current | 5K TPS Target |
|--------|---------|---------------|
| Transactions/ledger | ~500-1000 | ~25,000 |
| Ledger size | ~1MB | ~10-20MB |
| Operations/ledger | ~2000 | ~100,000 |

**API Impact:**
- Horizon pagination limits may change
- Larger response payloads for ledger queries
- Increased streaming volume

### 3. Optimized Soroban VM

Smart contract execution is being optimized with:

- **Parallel contract execution** for non-conflicting calls
- **Improved gas metering** for more predictable costs
- **Enhanced state access patterns** for faster reads

**API Impact:** simulateTransaction responses will include new fields for parallel execution hints.

## Preparing Your API Integrations

### Update 1: Handle Increased Data Volume

**Current approach (may break):**

\`\`\`typescript
// This might timeout or OOM at 5K TPS
async function getAllTransactions(ledger: number) {
  const response = await fetch(
    \`\${HORIZON_URL}/ledgers/\${ledger}/transactions?limit=200\`
  );
  const data = await response.json();

  // Simple pagination - loads everything into memory
  let allTxs = data._embedded.records;
  let nextUrl = data._links.next?.href;

  while (nextUrl) {
    const next = await fetch(nextUrl);
    const nextData = await next.json();
    allTxs = allTxs.concat(nextData._embedded.records);
    nextUrl = nextData._links.next?.href;
  }

  return allTxs; // Could be 25,000+ records!
}
\`\`\`

**Future-proof approach:**

\`\`\`typescript
// Stream-based processing
async function* streamTransactions(ledger: number) {
  let cursor = '';

  while (true) {
    const url = new URL(\`\${HORIZON_URL}/ledgers/\${ledger}/transactions\`);
    url.searchParams.set('limit', '200');
    url.searchParams.set('order', 'asc');
    if (cursor) url.searchParams.set('cursor', cursor);

    const response = await fetch(url);
    const data = await response.json();
    const records = data._embedded.records;

    for (const tx of records) {
      yield tx; // Process one at a time
    }

    if (records.length < 200) break;
    cursor = records[records.length - 1].paging_token;
  }
}

// Usage - memory efficient
async function processLedger(ledger: number) {
  for await (const tx of streamTransactions(ledger)) {
    await processSingleTransaction(tx);
  }
}
\`\`\`

### Update 2: Implement Robust Connection Pooling

At 5K TPS, your application will need efficient connection management:

\`\`\`typescript
// connection-pool.ts
import { Agent } from 'https';

const horizonAgent = new Agent({
  keepAlive: true,
  maxSockets: 50,         // Increase from default 5
  maxFreeSockets: 10,
  timeout: 30000,
});

const rpcAgent = new Agent({
  keepAlive: true,
  maxSockets: 100,        // Higher for RPC due to simulation load
  maxFreeSockets: 20,
  timeout: 60000,         // Longer for complex simulations
});

export async function horizonFetch(path: string, options: RequestInit = {}) {
  return fetch(\`\${HORIZON_URL}\${path}\`, {
    ...options,
    // @ts-ignore - Node.js specific
    agent: horizonAgent,
    headers: {
      'X-API-Key': process.env.LUMENQUERY_API_KEY!,
      ...options.headers,
    },
  });
}

export async function rpcFetch(method: string, params: any) {
  return fetch(STELLAR_RPC_URL, {
    method: 'POST',
    // @ts-ignore - Node.js specific
    agent: rpcAgent,
    headers: {
      'Content-Type': 'application/json',
      'X-API-Key': process.env.LUMENQUERY_API_KEY!,
    },
    body: JSON.stringify({
      jsonrpc: '2.0',
      id: Date.now(),
      method,
      params,
    }),
  });
}
\`\`\`

### Update 3: Prepare for New Response Fields

The Stellar RPC will include new fields for scalability features:

\`\`\`typescript
// Future simulateTransaction response
interface SimulateTransactionResult {
  // Existing fields
  transactionData: string;
  minResourceFee: string;
  events: string[];

  // New scalability-related fields (coming soon)
  parallelizationHint?: {
    conflictingAccounts: string[];
    conflictingContracts: string[];
    canParallelize: boolean;
  };

  executionMetrics?: {
    cpuInstructions: number;
    memoryBytes: number;
    estimatedWallTime: number;  // New: actual execution time estimate
  };
}

// Future-proof parsing
function parseSimulation(result: any): SimulateTransactionResult {
  return {
    transactionData: result.transactionData,
    minResourceFee: result.minResourceFee,
    events: result.events || [],
    // Gracefully handle new fields
    parallelizationHint: result.parallelizationHint,
    executionMetrics: result.executionMetrics,
  };
}
\`\`\`

### Update 4: Implement Adaptive Rate Limiting

With increased throughput, API providers may adjust rate limits:

\`\`\`typescript
// adaptive-rate-limiter.ts
class AdaptiveRateLimiter {
  private tokens: number;
  private maxTokens: number;
  private refillRate: number;
  private lastRefill: number;
  private backoffMultiplier: number = 1;

  constructor(maxTokens = 100, refillRate = 10) {
    this.tokens = maxTokens;
    this.maxTokens = maxTokens;
    this.refillRate = refillRate;
    this.lastRefill = Date.now();
  }

  private refill() {
    const now = Date.now();
    const elapsed = (now - this.lastRefill) / 1000;
    this.tokens = Math.min(
      this.maxTokens,
      this.tokens + elapsed * this.refillRate
    );
    this.lastRefill = now;
  }

  async acquire(): Promise<void> {
    this.refill();

    if (this.tokens < 1) {
      const waitTime = ((1 - this.tokens) / this.refillRate) * 1000;
      await new Promise(r => setTimeout(r, waitTime * this.backoffMultiplier));
      this.refill();
    }

    this.tokens -= 1;
  }

  // Call when receiving 429 responses
  backoff() {
    this.backoffMultiplier = Math.min(this.backoffMultiplier * 2, 32);
  }

  // Call on successful requests
  reset() {
    this.backoffMultiplier = 1;
  }
}

const limiter = new AdaptiveRateLimiter();

export async function rateLimitedFetch(url: string, options?: RequestInit) {
  await limiter.acquire();

  const response = await fetch(url, options);

  if (response.status === 429) {
    limiter.backoff();
    throw new Error('Rate limited');
  }

  limiter.reset();
  return response;
}
\`\`\`

## Infrastructure Implications

### Running Your Own Nodes

At 5K TPS, node requirements increase significantly:

| Component | Current | 5K TPS Ready |
|-----------|---------|--------------|
| CPU | 4 cores | 16+ cores |
| RAM | 16GB | 64GB+ |
| Storage | 2TB SSD | 10TB NVMe |
| Network | 100Mbps | 1Gbps+ |
| Horizon DB | 1TB | 5TB+ |

### Managed Infrastructure Benefits

For most teams, managed infrastructure becomes more attractive at scale:

**LumenQuery handles:**
- Automatic scaling during traffic spikes
- Multi-region redundancy
- Database optimization for large datasets
- Rate limit management
- Automatic protocol upgrades

\`\`\`typescript
// Simple configuration for managed infrastructure
const config = {
  horizonUrl: 'https://api.lumenquery.io',
  rpcUrl: 'https://rpc.lumenquery.io',
  apiKey: process.env.LUMENQUERY_API_KEY,

  // Automatic handling of:
  // - Connection pooling
  // - Retry logic
  // - Regional failover
  // - Rate limit compliance
};
\`\`\`

## Timeline and Migration Path

### Expected Rollout

| Phase | Timeline | Changes |
|-------|----------|---------|
| Phase 1 | Q2 2026 | Increased ledger size (2MB → 5MB) |
| Phase 2 | Q3 2026 | Parallel validation (subset of txs) |
| Phase 3 | Q4 2026 | Full parallel processing |
| Phase 4 | 2027 | Sub-second finality exploration |

### Migration Checklist

✅ **Now:**
- Implement streaming/pagination for large result sets
- Add connection pooling
- Handle unknown response fields gracefully

✅ **Q2 2026:**
- Test with larger ledger sizes
- Verify memory usage under load
- Update pagination defaults

✅ **Q3 2026:**
- Adapt to potential transaction ordering changes
- Implement parallel-aware processing logic
- Update monitoring thresholds

## Conclusion

Stellar's path to 5,000 TPS is an exciting development that will unlock new use cases—high-frequency trading, mass micropayments, and enterprise-scale applications. Prepare your integrations now by:

1. **Designing for volume** - Stream data, don't batch
2. **Building resilience** - Connection pools, rate limiting, retries
3. **Staying flexible** - Handle new fields, changing limits
4. **Considering managed infrastructure** - Focus on your app, not ops

The future of Stellar is high-throughput, and your applications should be ready.

---

*Want infrastructure that scales with Stellar? [LumenQuery](/auth/signup) is built for the 5K TPS future—automatic scaling, global distribution, and zero ops burden.*
    `,
  },
  'horizon-rpc-use-cases-financial-apps-2026': {
    title: 'Top 5 Horizon & RPC Use Cases for Financial Apps in 2026',
    date: '2026-02-22',
    readTime: '13 min read',
    category: 'Use Cases',
    content: `
Stellar's combination of Horizon API and Stellar RPC powers some of the most innovative financial applications in the blockchain space. Here are the top five use cases we're seeing in 2026, complete with real API patterns you can implement today.

## 1. Cross-Border Payments

The original Stellar use case remains one of the strongest. Cross-border payment platforms use Stellar for instant, low-cost international transfers.

### How It Works

\`\`\`
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│  Sender     │     │   Stellar   │     │  Recipient  │
│  (USD)      │────▶│   Network   │────▶│  (EUR)      │
└─────────────┘     └─────────────┘     └─────────────┘
     │                    │                    │
     ▼                    ▼                    ▼
  On-ramp            Path Payment          Off-ramp
  (Bank→USDC)        (USDC→EUR)           (EUR→Bank)
\`\`\`

### API Pattern: Path Payment with Best Rate

\`\`\`typescript
// Find the best path for a cross-border payment
async function findBestPath(
  sourceAsset: Asset,
  destAsset: Asset,
  amount: string
) {
  // Use Horizon's path finding endpoint
  const response = await fetch(
    \`\${HORIZON_URL}/paths/strict-send?\` +
    \`source_asset_type=\${sourceAsset.type}&\` +
    \`source_asset_code=\${sourceAsset.code}&\` +
    \`source_asset_issuer=\${sourceAsset.issuer}&\` +
    \`destination_assets=\${destAsset.code}:\${destAsset.issuer}&\` +
    \`source_amount=\${amount}\`,
    { headers: { 'X-API-Key': API_KEY } }
  );

  const data = await response.json();
  const paths = data._embedded.records;

  // Return path with maximum destination amount
  return paths.reduce((best, current) =>
    parseFloat(current.destination_amount) > parseFloat(best.destination_amount)
      ? current
      : best
  );
}

// Execute the path payment
async function executePathPayment(
  sender: Keypair,
  destination: string,
  path: PathResult,
  sourceAmount: string
) {
  const account = await server.loadAccount(sender.publicKey());

  const transaction = new TransactionBuilder(account, {
    fee: '100',
    networkPassphrase: Networks.PUBLIC,
  })
    .addOperation(Operation.pathPaymentStrictSend({
      sendAsset: path.source_asset,
      sendAmount: sourceAmount,
      destination,
      destAsset: path.destination_asset,
      destMin: (parseFloat(path.destination_amount) * 0.99).toFixed(7), // 1% slippage
      path: path.path.map(p => new Asset(p.asset_code, p.asset_issuer)),
    }))
    .setTimeout(30)
    .build();

  transaction.sign(sender);
  return server.submitTransaction(transaction);
}
\`\`\`

### Real-World Example

**MoneyGram Access:** Uses Stellar for USD↔local currency corridors across 180 countries.

## 2. Token Issuance & Management

Companies issue tokens on Stellar for loyalty points, securities, stablecoins, and digital collectibles.

### How It Works

\`\`\`
┌─────────────────────────────────────────────────────┐
│                 Issuer Account                       │
│  • Issues tokens                                     │
│  • Sets authorization flags                          │
│  • Controls supply                                   │
└─────────────────┬───────────────────────────────────┘
                  │
       ┌──────────┴──────────┐
       ▼                     ▼
┌─────────────┐       ┌─────────────┐
│ Distribution│       │  Treasury   │
│  Account    │       │  Account    │
│ (sells/airdrops)    │ (holds reserves)
└─────────────┘       └─────────────┘
\`\`\`

### API Pattern: Token Creation & Distribution

\`\`\`typescript
// Create a new token with controlled distribution
async function createControlledToken(
  issuerKeypair: Keypair,
  distributorPublicKey: string,
  assetCode: string,
  totalSupply: string
) {
  // Step 1: Configure issuer account with auth flags
  const issuerAccount = await server.loadAccount(issuerKeypair.publicKey());

  const configTx = new TransactionBuilder(issuerAccount, {
    fee: '100',
    networkPassphrase: Networks.PUBLIC,
  })
    .addOperation(Operation.setOptions({
      setFlags: AuthRequiredFlag | AuthRevocableFlag,
    }))
    .setTimeout(30)
    .build();

  configTx.sign(issuerKeypair);
  await server.submitTransaction(configTx);

  // Step 2: Create trustline from distributor to issuer
  // (Distributor must do this separately)

  // Step 3: Send initial supply to distributor
  const asset = new Asset(assetCode, issuerKeypair.publicKey());
  const mintTx = new TransactionBuilder(
    await server.loadAccount(issuerKeypair.publicKey()),
    { fee: '100', networkPassphrase: Networks.PUBLIC }
  )
    .addOperation(Operation.payment({
      destination: distributorPublicKey,
      asset,
      amount: totalSupply,
    }))
    .setTimeout(30)
    .build();

  mintTx.sign(issuerKeypair);
  return server.submitTransaction(mintTx);
}

// Monitor token holders using Horizon
async function getTokenHolders(assetCode: string, issuer: string) {
  let holders = [];
  let cursor = '';

  while (true) {
    const response = await fetch(
      \`\${HORIZON_URL}/accounts?\` +
      \`asset=\${assetCode}:\${issuer}&\` +
      \`limit=200&cursor=\${cursor}\`,
      { headers: { 'X-API-Key': API_KEY } }
    );

    const data = await response.json();
    const accounts = data._embedded.records;

    holders = holders.concat(accounts.map(acc => ({
      account: acc.id,
      balance: acc.balances.find(
        b => b.asset_code === assetCode && b.asset_issuer === issuer
      )?.balance || '0',
    })));

    if (accounts.length < 200) break;
    cursor = accounts[accounts.length - 1].paging_token;
  }

  return holders.sort((a, b) =>
    parseFloat(b.balance) - parseFloat(a.balance)
  );
}
\`\`\`

### Real-World Example

**Circle USDC:** Issues USDC natively on Stellar with full reserve backing.

## 3. Decentralized Exchange (DEX) Integration

Stellar's built-in DEX enables peer-to-peer trading without smart contracts.

### How It Works

\`\`\`
        ┌─────────────────────────────────┐
        │       Stellar Order Book        │
        │  ┌─────────────────────────┐    │
        │  │ XLM/USDC               │    │
        │  │ Bids        Asks       │    │
        │  │ 0.099  |   | 0.101     │    │
        │  │ 0.098  |   | 0.102     │    │
        │  │ 0.097  |   | 0.103     │    │
        │  └─────────────────────────┘    │
        └─────────────────────────────────┘
                 ▲              │
                 │              ▼
          ┌──────┴──────┐  ┌────────────┐
          │ Manage Offer│  │ Path Pay   │
          │ (Makers)    │  │ (Takers)   │
          └─────────────┘  └────────────┘
\`\`\`

### API Pattern: Order Book Trading

\`\`\`typescript
// Fetch orderbook for trading pair
async function getOrderbook(
  baseAsset: Asset,
  counterAsset: Asset
) {
  const response = await fetch(
    \`\${HORIZON_URL}/order_book?\` +
    \`selling_asset_type=\${baseAsset.isNative() ? 'native' : 'credit_alphanum4'}&\` +
    (baseAsset.isNative() ? '' :
      \`selling_asset_code=\${baseAsset.code}&selling_asset_issuer=\${baseAsset.issuer}&\`) +
    \`buying_asset_type=\${counterAsset.isNative() ? 'native' : 'credit_alphanum4'}&\` +
    (counterAsset.isNative() ? '' :
      \`buying_asset_code=\${counterAsset.code}&buying_asset_issuer=\${counterAsset.issuer}\`),
    { headers: { 'X-API-Key': API_KEY } }
  );

  const data = await response.json();

  return {
    bids: data.bids.map(b => ({
      price: b.price,
      amount: b.amount,
    })),
    asks: data.asks.map(a => ({
      price: a.price,
      amount: a.amount,
    })),
    spread: data.asks[0] && data.bids[0]
      ? ((parseFloat(data.asks[0].price) - parseFloat(data.bids[0].price)) /
         parseFloat(data.bids[0].price) * 100).toFixed(2) + '%'
      : 'N/A',
  };
}

// Place a limit order
async function placeLimitOrder(
  trader: Keypair,
  selling: Asset,
  buying: Asset,
  amount: string,
  price: string,
  offerId: string = '0' // '0' for new order
) {
  const account = await server.loadAccount(trader.publicKey());

  const transaction = new TransactionBuilder(account, {
    fee: '100',
    networkPassphrase: Networks.PUBLIC,
  })
    .addOperation(Operation.manageSellOffer({
      selling,
      buying,
      amount,
      price,
      offerId,
    }))
    .setTimeout(30)
    .build();

  transaction.sign(trader);
  return server.submitTransaction(transaction);
}

// Stream trades for real-time updates
function streamTrades(
  baseAsset: Asset,
  counterAsset: Asset,
  onTrade: (trade: Trade) => void
) {
  const url = new URL(\`\${HORIZON_URL}/trades\`);
  url.searchParams.set('base_asset_type', baseAsset.isNative() ? 'native' : 'credit_alphanum4');
  if (!baseAsset.isNative()) {
    url.searchParams.set('base_asset_code', baseAsset.code);
    url.searchParams.set('base_asset_issuer', baseAsset.issuer);
  }
  // ... counter asset params
  url.searchParams.set('cursor', 'now');

  const eventSource = new EventSource(url.toString());
  eventSource.onmessage = (event) => {
    onTrade(JSON.parse(event.data));
  };

  return () => eventSource.close();
}
\`\`\`

### Real-World Example

**StellarX & Lumenswap:** DEX interfaces built entirely on Stellar's native orderbook.

## 4. Real-Time Transaction Monitoring

Financial institutions monitor Stellar for compliance, fraud detection, and treasury management.

### How It Works

\`\`\`
┌─────────────────────────────────────────────────────────┐
│                 Monitoring System                        │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────┐  │
│  │ Horizon SSE │  │ Rule Engine │  │ Alert Dashboard │  │
│  │  (Stream)   │──│ (Evaluate)  │──│   (Notify)      │  │
│  └─────────────┘  └─────────────┘  └─────────────────┘  │
│        │                                    │           │
│        │ Real-time                          │ Alerts    │
│        │ transactions                       ▼           │
│        │                           ┌─────────────────┐  │
│        └──────────────────────────▶│  Compliance     │  │
│                                    │  Team / API     │  │
│                                    └─────────────────┘  │
└─────────────────────────────────────────────────────────┘
\`\`\`

### API Pattern: Compliance Monitoring System

\`\`\`typescript
// Real-time transaction monitoring with rules
interface MonitoringRule {
  id: string;
  name: string;
  evaluate: (tx: Transaction, ops: Operation[]) => Alert | null;
}

interface Alert {
  ruleId: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  transaction: string;
  details: Record<string, any>;
}

const rules: MonitoringRule[] = [
  {
    id: 'large-payment',
    name: 'Large Payment Detection',
    evaluate: (tx, ops) => {
      const payments = ops.filter(op => op.type === 'payment');
      for (const payment of payments) {
        const amount = parseFloat(payment.amount);
        if (payment.asset_type === 'native' && amount > 100000) {
          return {
            ruleId: 'large-payment',
            severity: 'high',
            transaction: tx.hash,
            details: {
              amount,
              from: tx.source_account,
              to: payment.to,
            },
          };
        }
      }
      return null;
    },
  },
  {
    id: 'new-trustline',
    name: 'Trustline Addition',
    evaluate: (tx, ops) => {
      const trustlines = ops.filter(op => op.type === 'change_trust');
      if (trustlines.length > 0) {
        return {
          ruleId: 'new-trustline',
          severity: 'low',
          transaction: tx.hash,
          details: {
            assets: trustlines.map(t => \`\${t.asset_code}:\${t.asset_issuer}\`),
          },
        };
      }
      return null;
    },
  },
];

// Start monitoring
async function startMonitoring(
  accounts: string[],
  onAlert: (alert: Alert) => void
) {
  for (const accountId of accounts) {
    const url = \`\${HORIZON_URL}/accounts/\${accountId}/transactions?cursor=now\`;
    const eventSource = new EventSource(url);

    eventSource.onmessage = async (event) => {
      const tx = JSON.parse(event.data);

      // Fetch operations for this transaction
      const opsResponse = await fetch(
        \`\${HORIZON_URL}/transactions/\${tx.hash}/operations\`,
        { headers: { 'X-API-Key': API_KEY } }
      );
      const opsData = await opsResponse.json();
      const operations = opsData._embedded.records;

      // Evaluate all rules
      for (const rule of rules) {
        const alert = rule.evaluate(tx, operations);
        if (alert) {
          onAlert(alert);
        }
      }
    };
  }
}

// Usage
startMonitoring(
  ['GA...TREASURY', 'GA...OPERATIONS'],
  (alert) => {
    console.log(\`[\${alert.severity.toUpperCase()}] \${alert.ruleId}\`);
    // Send to Slack, email, database, etc.
  }
);
\`\`\`

### Real-World Example

**Chainalysis & Elliptic:** Blockchain analytics firms monitor Stellar for compliance.

## 5. Smart Contract Management (Soroban)

DeFi protocols and automated financial services use Soroban smart contracts.

### How It Works

\`\`\`
┌─────────────────────────────────────────────────────────┐
│                   DeFi Protocol                          │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────┐  │
│  │   Frontend  │  │   Stellar   │  │    Contract     │  │
│  │   (React)   │──│     RPC     │──│   (Soroban)     │  │
│  └─────────────┘  └─────────────┘  └─────────────────┘  │
│        │               │                    │           │
│        │ User          │ Simulate +         │ State     │
│        │ Actions       │ Submit             │ Changes   │
│        ▼               ▼                    ▼           │
│  ┌─────────────────────────────────────────────────┐    │
│  │              Horizon (Historical)               │    │
│  │    • Transaction history                        │    │
│  │    • Event indexing                             │    │
│  │    • Analytics                                  │    │
│  └─────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────┘
\`\`\`

### API Pattern: DeFi Protocol Integration

\`\`\`typescript
// Interact with a lending protocol smart contract
const LENDING_CONTRACT = 'CDLZFC...';

interface LendingPosition {
  deposited: bigint;
  borrowed: bigint;
  collateralRatio: number;
}

// Read current position from contract state
async function getPosition(accountId: string): Promise<LendingPosition> {
  const response = await fetch(STELLAR_RPC_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'X-API-Key': API_KEY },
    body: JSON.stringify({
      jsonrpc: '2.0',
      id: 1,
      method: 'getLedgerEntries',
      params: {
        keys: [createContractDataKey(LENDING_CONTRACT, 'Position', accountId)],
      },
    }),
  });

  const { result } = await response.json();
  const entry = result.entries[0];

  if (!entry) {
    return { deposited: 0n, borrowed: 0n, collateralRatio: 0 };
  }

  // Parse contract state
  const data = xdr.LedgerEntryData.fromXDR(entry.xdr, 'base64');
  const contractData = data.contractData();

  return parsePositionData(contractData.val());
}

// Deposit collateral
async function deposit(
  user: Keypair,
  amount: string
): Promise<TransactionResult> {
  const contract = new Contract(LENDING_CONTRACT);

  // Build the invocation
  const operation = contract.call(
    'deposit',
    nativeToScVal(Address.fromString(user.publicKey())),
    nativeToScVal(BigInt(parseFloat(amount) * 10_000_000), { type: 'i128' })
  );

  // Get account and build transaction
  const account = await server.loadAccount(user.publicKey());
  const transaction = new TransactionBuilder(account, {
    fee: '1000000',
    networkPassphrase: Networks.PUBLIC,
  })
    .addOperation(operation)
    .setTimeout(30)
    .build();

  // Simulate
  const simResponse = await fetch(STELLAR_RPC_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'X-API-Key': API_KEY },
    body: JSON.stringify({
      jsonrpc: '2.0',
      id: 1,
      method: 'simulateTransaction',
      params: { transaction: transaction.toXDR() },
    }),
  });

  const { result: simulation } = await simResponse.json();

  if (simulation.error) {
    throw new Error(\`Simulation failed: \${simulation.error}\`);
  }

  // Prepare and sign
  const prepared = SorobanRpc.assembleTransaction(transaction, simulation);
  prepared.sign(user);

  // Submit
  const submitResponse = await fetch(STELLAR_RPC_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'X-API-Key': API_KEY },
    body: JSON.stringify({
      jsonrpc: '2.0',
      id: 1,
      method: 'sendTransaction',
      params: { transaction: prepared.toXDR() },
    }),
  });

  return submitResponse.json();
}

// Monitor protocol events
async function getProtocolEvents(fromLedger: number) {
  const response = await fetch(STELLAR_RPC_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'X-API-Key': API_KEY },
    body: JSON.stringify({
      jsonrpc: '2.0',
      id: 1,
      method: 'getEvents',
      params: {
        startLedger: fromLedger,
        filters: [{
          type: 'contract',
          contractIds: [LENDING_CONTRACT],
        }],
      },
    }),
  });

  const { result } = await response.json();
  return result.events.map(event => ({
    ledger: event.ledger,
    type: parseEventType(event.topic),
    data: parseEventData(event.value),
  }));
}
\`\`\`

### Real-World Example

**Blend Protocol:** Lending and borrowing protocol built on Soroban.

## Putting It All Together

The most powerful financial applications combine multiple use cases:

\`\`\`typescript
// Example: Remittance platform combining multiple patterns
class RemittancePlatform {
  // Use Case 1: Cross-border payments
  async sendRemittance(from: User, to: User, amount: Money) {
    const path = await this.findBestPath(from.currency, to.currency, amount);
    return this.executePathPayment(from, to, path);
  }

  // Use Case 2: Token management (stablecoin)
  async issueLocalCurrency(user: User, amount: string) {
    return this.mintToken(user, this.localStablecoin, amount);
  }

  // Use Case 3: DEX for liquidity
  async provideLiquidity(asset: Asset, amount: string) {
    return this.placeLimitOrder(this.treasury, asset, XLM, amount);
  }

  // Use Case 4: Compliance monitoring
  async monitorTransactions() {
    return this.startMonitoring(this.regulatedAccounts, this.handleAlert);
  }

  // Use Case 5: Smart contracts for automation
  async setupAutomaticConversion(user: User, rules: ConversionRule[]) {
    return this.deployConversionContract(user, rules);
  }
}
\`\`\`

## Conclusion

Stellar's dual API approach—Horizon for historical data and Stellar RPC for real-time state—enables sophisticated financial applications:

1. **Cross-border payments** leverage path finding and atomic swaps
2. **Token issuance** uses account configuration and payment operations
3. **DEX integration** taps into the native orderbook
4. **Transaction monitoring** streams data for compliance
5. **Smart contracts** power automated financial logic

With the right API patterns, you can build financial applications that rival traditional fintech—but with the transparency and efficiency of blockchain.

---

*Building financial applications on Stellar? [LumenQuery](/auth/signup) provides the reliable API infrastructure your fintech needs—Horizon and Stellar RPC with 99.9% uptime.*
    `,
  },
  'moneygram-stellar-partnership-stablecoin-utility': {
    title: 'MoneyGram and Stellar Extend Partnership to Scale Real-World Stablecoin Utility Globally',
    date: '2026-04-24',
    readTime: '10 min read',
    category: 'Industry Insights',
    content: `
On April 22, 2026, MoneyGram and the Stellar Development Foundation announced a multi-year extension of their partnership, marking more than five years of collaboration aimed at scaling real-world stablecoin utility across the globe. The deal signals a deepening commitment to using USDC on Stellar as the settlement layer for cross-border remittances -- and it opens significant doors for developers building on the network.

## From Pilot to Production: The Partnership Timeline

The MoneyGram-Stellar relationship has evolved far beyond a typical blockchain proof-of-concept:

- **October 2021**: Initial partnership announced to use USDC on Stellar for cross-border transfers
- **June 2022**: MoneyGram launched its global crypto-to-cash service on Stellar, enabling USDC-to-fiat conversion at physical locations
- **September 2025**: MoneyGram made stablecoins the backbone of its next-generation app, launching in Colombia with Stellar, Crossmint, and Circle's USDC
- **April 2026**: Multi-year extension announced, expanding into El Salvador and additional Latin American markets

The numbers tell the story: over **$4.2 billion** in USDC remittance volume facilitated through the partnership, serving 50 million customers across 200+ countries with nearly 500,000 agent locations.

## How the System Works

The architecture is elegantly simple, and it matters for developers because every component is built on open Stellar protocols.

### Cash-In (On-Ramp)

A user walks into a MoneyGram location, provides cash, and receives USDC settled on the Stellar blockchain in under 5 seconds. No bank account needed.

### Cash-Out (Off-Ramp)

A USDC holder visits any MoneyGram location and converts stablecoins to local fiat currency. This replaces the multi-day correspondent banking delays that plague traditional remittances.

### App-Based Remittance Flow

1. Sender initiates transfer in the MoneyGram app
2. Funds convert to USDC on Stellar
3. USDC arrives in the recipient's Crossmint-powered smart wallet
4. Recipient cashes out at any MoneyGram location in local currency

Settlement happens on Stellar in **3-5 seconds**, compared to 1-5 business days through traditional banking rails.

## Why This Matters for Developers

The most underappreciated aspect of this partnership is **MoneyGram Ramps** (formerly MoneyGram Access) -- a developer-facing API that lets any wallet or fintech app tap into MoneyGram's global cash network.

### Integration Is Straightforward

MoneyGram Ramps uses **SEP-24** (Stellar Ecosystem Proposal 24) for deposit and withdrawal operations and **SEP-10** for authentication. If your wallet already supports SEP-24, integration is minimal. MoneyGram provides:

- Official integration guide on developers.stellar.org
- A reference MVP wallet implementation on GitHub
- A Postman API collection for testing

### What You Get

- **Cash on-ramp** in 30+ countries
- **Cash off-ramp** in 170+ countries
- **Compliance handled** -- MoneyGram manages KYC, AML screening, and regulatory requirements across all jurisdictions
- **No bank account required** for end users

### The Developer Opportunity

Consider what this means: with a standard Stellar wallet integration and the MoneyGram Ramps API, you can offer your users the ability to deposit or withdraw cash at half a million locations worldwide. MoneyGram handles the regulatory complexity. Your app handles the user experience.

This is the kind of infrastructure that makes building real-world financial applications on Stellar practical rather than theoretical.

## The Colombia Case Study

Colombia was chosen as the first market for the stablecoin-powered app for a specific reason: the Colombian peso has lost over 40% of its value in four years. For remittance recipients, holding a USD-denominated stablecoin balance isn't a crypto speculation play -- it's a practical tool for preserving purchasing power.

Early results are promising: nearly $30 million in total transaction volume through the stablecoin-balance feature across Colombia and El Salvador, with additional Latin American markets planned for 2026.

## What Executives Are Saying

**Anthony Soohoo, Chairman and CEO of MoneyGram:**
"Everyone talks about financial inclusion. MoneyGram is delivering it. We are building an open payments network that moves seamlessly across fiat and stablecoin, enabling faster, lower-cost transactions, starting with the people who need it most."

**Denelle Dixon, CEO of the Stellar Development Foundation:**
"With SDF's purpose-built blockchain infrastructure and MoneyGram's global reach, that ambition is finally matched by the infrastructure to deliver it. Together, we're expanding access, lowering costs and enabling instant cross-border payments at scale."

## The Technology Stack

The full stack powering this system is worth understanding:

| Layer | Provider | Role |
|-------|----------|------|
| Blockchain | Stellar | Settlement in 3-5 seconds, sub-cent fees |
| Stablecoin | Circle (USDC) | USD-backed digital dollar |
| Smart Wallets | Crossmint | Enterprise-grade wallet infrastructure |
| Cash Network | MoneyGram | 500,000 agent locations globally |
| Standards | SEP-10, SEP-24 | Authentication and deposit/withdrawal |

Every component is accessible to developers. You can build on the same Stellar network, use the same USDC token, and integrate with the same MoneyGram Ramps API.

## Building on This Infrastructure

If you're developing applications that need fiat on/off ramps, the MoneyGram-Stellar integration provides production-grade infrastructure you can build on with confidence. Here's how to start:

1. **Set up a Stellar wallet** using the Stellar SDK and connect to the network via [LumenQuery's Horizon API](/docs)
2. **Implement SEP-24** for deposit/withdrawal flows
3. **Integrate MoneyGram Ramps** using their developer documentation
4. **Test on testnet** before deploying to mainnet

LumenQuery provides the reliable Horizon API and Soroban RPC infrastructure you need to build applications that interact with Stellar's growing payment ecosystem. Monitor real-time network activity on our [analytics dashboard](/analytics).

---

*Building on Stellar's payment infrastructure? [LumenQuery](/auth/signup) provides enterprise-grade Horizon API and Soroban RPC with sub-100ms response times. Start free with 10,000 requests/month.*
    `,
  },
  'stellar-regulatory-clarity-bullish-xlm': {
    title: 'Why Regulatory Clarity Is the Most Bullish Case for Stellar and XLM',
    date: '2026-04-24',
    readTime: '11 min read',
    category: 'Industry Insights',
    content: `
While most crypto narratives focus on technology upgrades or token burns, the strongest bull case for Stellar (XLM) may be the one least discussed in developer circles: regulatory clarity. The past twelve months have seen a cascade of regulatory developments that disproportionately benefit blockchains designed for compliance -- and no Layer 1 is better positioned than Stellar.

## The Regulatory Landscape Has Shifted

Three landmark developments in 2025-2026 have fundamentally changed the operating environment for Stellar:

### 1. The GENIUS Act (July 2025)

The Guiding and Ensuring National Innovation for U.S. Stablecoins Act established clear rules for U.S.-issued payment stablecoins: 1:1 asset backing, federally supervised issuers, monthly audits, and real-time redemption rights.

The market response was immediate. XLM surged 138% following the Act's passage. Stablecoin transactions on Stellar jumped approximately 20% in 30 days, exceeding 9.3 million monthly transactions. USDC adjusted transaction volume on Stellar increased 53% to over $1.6 billion.

### 2. The CLARITY Act (July 2025)

The Digital Asset Market Clarity Act passed the House by a 294-134 vote, granting the CFTC exclusive jurisdiction over digital commodity spot markets while maintaining SEC jurisdiction over investment contract assets. This legislation is still taking shape in the Senate, but the direction is clear.

### 3. SEC/CFTC Joint Classification (March 2026)

On March 17, 2026, the SEC and CFTC published a 68-page interpretive guidance classifying 16 crypto assets as digital commodities -- **including XLM**. This places XLM under CFTC oversight for spot markets, ending years of ambiguity about whether it was a security.

For XLM holders and builders, this means reduced disclosure obligations, simpler custody requirements, and eligibility for commodity exchanges. The existential regulatory risk that hung over most altcoins has been removed.

## Why Stellar Benefits Disproportionately

Regulatory clarity doesn't benefit all blockchains equally. Stellar benefits more than most because it was **designed for regulated use cases from the ground up**, long before regulation existed.

### Protocol-Level Compliance Features

Most Layer 1 blockchains would need hard forks or complex smart contract layers to add the compliance features Stellar has natively:

**Asset Authorization Flags:**
- \`AUTH_REQUIRED\`: Issuers must approve each account before it can hold the asset -- used for KYC enforcement
- \`AUTH_REVOCABLE\`: Issuers can revoke authorization if an account's compliance status changes
- \`AUTH_IMMUTABLE\`: Locks flags permanently, providing certainty that rules won't change

**Clawback (CAP-0035):**
Issuers can reverse transactions in cases of fraud, errors, or regulatory action. U.S. Bank specifically cited this capability as "appealing" when choosing Stellar for their stablecoin pilot.

**Trust Lines:**
Users opt in to holding specific assets by establishing trust lines to issuers. This creates a controlled access model where users explicitly specify which tokens they will accept.

**Compliance SEPs:**
- SEP-6: Programmatic deposit and withdrawal
- SEP-10: Cryptographic authentication
- SEP-12: Standardized KYC data exchange
- SEP-24: Hosted deposit and withdrawal
- SEP-31: Cross-border payments between regulated institutions

### ISO 20022 Compliance

Stellar supports ISO 20022 messaging through SEPs 9 and 31, enabling interoperability with traditional banking infrastructure. This is not a theoretical feature -- it's a requirement for institutional adoption.

## Institutional Adoption Is Accelerating

The regulatory clarity is already translating into institutional commitments:

| Institution | Activity on Stellar |
|-------------|---------------------|
| U.S. Bancorp | Custom stablecoin issuance pilot (Nov 2025) |
| Franklin Templeton | $680M+ tokenized U.S. Treasury fund |
| PayPal | PYUSD stablecoin launched on Stellar (June 2025) |
| AllUnity | MiCAR-compliant EURAU stablecoin (April 2026) |
| CME Group | Regulated XLM futures (Feb 2026) |
| Amundi | $100M tokenized fund (March 2026) |

The SDF's 2026 strategy targets signing 15 new "transformational enterprises" including Forbes Global 2000 companies, international NGOs, and government agencies.

## The Economic Flywheel

Regulatory clarity creates a compounding effect on Stellar that's worth understanding:

1. **Regulation enables institutional participation** -- Banks like U.S. Bancorp could not pilot on Stellar without regulatory frameworks
2. **Institutional adoption drives stablecoin issuance** -- More USDC, PYUSD, and EURAU on Stellar
3. **Every stablecoin transaction on Stellar requires XLM for fees** -- Growing fee demand
4. **More transactions increase network value** -- Making Stellar more attractive for additional institutions
5. **More institutions attract developers** -- Building the applications that generate more transactions

This is not speculative. Stellar processed 3.6 billion transactions in 2025, with $55.6 billion in payment volume (up 52% YoY). On-chain real-world assets crossed $1 billion in January 2026, up 184% year-over-year.

## The EU Dimension: MiCA

While U.S. regulation gets the most attention, the EU's Markets in Crypto-Assets Regulation (MiCA) is equally important for Stellar. Full MiCA enforcement begins July 1, 2026, and Stellar is already positioned:

- AllUnity's EURAU -- a BaFin-licensed, MiCAR-compliant euro stablecoin -- launched on Stellar on April 13, 2026
- Stellar's compliance primitives (authorization flags, clawback, trust lines) map directly to MiCA requirements
- European institutions looking for compliant blockchain infrastructure have a limited set of options that meet regulatory standards

## Protocol 25: Privacy with Compliance

The Protocol 25 (X-Ray) upgrade, implemented in January 2026, introduced native support for zero-knowledge primitives (BN254, Poseidon). This enables what the SDF calls "compliance-forward privacy applications" -- privacy when needed, transparency for regulators.

This is a critical capability. Institutions need privacy for competitive reasons but cannot operate on fully opaque blockchains. Stellar's approach of "open by default, private when needed" with selective disclosure via view keys threads the needle that regulators require.

## What This Means for Developers

For developers building on Stellar, regulatory clarity removes friction at every level:

- **Less legal ambiguity** around building on top of XLM
- **Institutional customers** are now willing to deploy on public blockchains
- **Compliance features** are already built into the protocol -- you don't need to reinvent them
- **More stablecoin liquidity** means more useful financial applications
- **RWA tokenization** creates new categories of applications to build

If you're building financial applications, the combination of Stellar's compliance infrastructure and the new regulatory frameworks makes it the most practical choice for applications that need to operate within legal boundaries.

Explore Stellar's capabilities using [LumenQuery's API documentation](/docs) and monitor the network's growing activity on our [analytics dashboard](/analytics).

---

*Building compliant financial applications on Stellar? [LumenQuery](/auth/signup) provides the infrastructure you need -- Horizon API and Soroban RPC with 99.9% uptime, built for production workloads.*
    `,
  },
  'xlm-price-prediction-whale-accumulation': {
    title: 'XLM Price Analysis: What Whale Accumulation and On-Chain Metrics Tell Us',
    date: '2026-04-24',
    readTime: '9 min read',
    category: 'Market Analysis',
    content: `
**Disclaimer: This article is for informational and educational purposes only. It does not constitute financial advice, investment advice, or a recommendation to buy, sell, or hold any cryptocurrency. Always do your own research (DYOR) and consult a licensed financial advisor before making investment decisions. Cryptocurrency markets are highly volatile.**

---

Stellar Lumens (XLM) is trading at approximately $0.175-$0.176, up 13.2% over the past week. While the price action itself is notable, the on-chain signals beneath the surface tell a more interesting story -- one of steady accumulation, improving fundamentals, and a network whose transaction volume increasingly diverges from its market price.

## Current Market Snapshot

| Metric | Value |
|--------|-------|
| Price | ~$0.176 |
| Market Cap | ~$5.85 billion |
| Ranking | #18 |
| Circulating Supply | ~33 billion XLM |
| 24h Volume | $108-141 million |
| RSI (14-day) | 39.32 |
| 52-Week Low | $0.1468 |

The RSI at 39.32 places XLM in neutral territory with room for upward movement before reaching overbought conditions. The 14-day and 30-day moving averages are converging around the $0.165-$0.166 zone, with the upper Bollinger Band near $0.18 acting as a near-term breakout target.

## The Whale Signal

The most significant on-chain event of recent months was a massive **7.03 billion XLM token outflow from exchanges** in February 2026. When tokens move off exchanges at this scale, it typically indicates holders moving to cold storage with long-term holding intent rather than preparing to sell.

This kind of accumulation pattern -- where large holders steadily withdraw assets from exchanges over 4-8 week periods while prices consolidate -- has historically preceded rallies in approximately 65% of cases within the following quarter.

What makes the current situation unusual is the **price-flow divergence**: the massive supply reduction from exchange outflows has not yet been reflected in price action. The tokens have been removed from sell-side liquidity, but the market hasn't priced in the reduced supply.

## On-Chain Fundamentals

The network's usage metrics paint a picture that contrasts sharply with the current price:

- **9.75 million accounts** on the Stellar network
- **~7.9 million daily operations**, including 3.85 million payments and 747,000+ DEX trades
- **Average ledger close time**: 5.8 seconds
- **$55.6 billion** in payment volume in 2025 (up 52% YoY)
- **3.6 billion transactions** processed in 2025

The RWA (real-world asset) tokenization market on Stellar surpassed $2 billion, which increases transaction volume and XLM fee burns. Every transaction on Stellar -- whether a payment, DEX trade, or smart contract call -- requires XLM for fees. As volume grows, so does the natural demand for XLM.

## Technical Setup

Technical analysts have identified several patterns worth noting:

**Bullish indicators:**
- A "Rounded Bottom" formation in XLM's price structure
- Monthly chart respecting a rising trendline while holding a key fair value gap
- RSI at 39 -- room to run before overbought territory
- Moving average convergence suggesting a potential directional move

**Key levels to watch:**
- **$0.18**: Breakout level and upper Bollinger Band
- **$0.20**: Mid-2026 target cited by multiple analysts
- **$0.15**: Critical support -- a break below would invalidate the consolidation thesis
- **$0.1468**: 52-week low and the line in the sand

## Recent Catalysts

Several developments provide fundamental support for the current accumulation thesis:

1. **SEC/CFTC classified XLM as a digital commodity** (March 2026) -- removing the existential regulatory overhang
2. **CME launched regulated XLM futures** (February 2026) -- opening institutional trading channels
3. **Amundi launched a $100M tokenized fund on Stellar** (March 2026) -- Europe's largest asset manager choosing the network
4. **Protocol 26 (Yardstick) testnet went live** (April 2026) -- targeting 5,000+ TPS
5. **MoneyGram extended its partnership** with Stellar for stablecoin settlement -- validating the payments use case

## What the Data Suggests

The accumulation thesis rests on a few observable facts:

1. Supply on exchanges has decreased significantly (7.03B XLM outflow)
2. Network usage continues to grow (52% YoY payment volume increase)
3. Institutional adoption is accelerating (U.S. Bank, Franklin Templeton, PayPal, Amundi)
4. Regulatory clarity has improved materially (commodity classification, GENIUS Act)
5. Technical indicators suggest consolidation, not distribution

Whether this translates to price appreciation depends on broader market conditions, but the on-chain data shows a network gaining real-world adoption while its token trades at levels significantly below its 2021 and early 2025 peaks.

## Historical Context

For perspective, XLM's all-time high was $0.87-$0.94 during the 2018 ICO mania. It reached $0.79 during the 2021 bull run and hit $0.515 in late 2024. The current price of ~$0.176 represents a significant discount to those levels despite the network being fundamentally stronger by every measurable metric.

## Monitor the Network Yourself

Rather than relying on price predictions, you can track the on-chain metrics that matter using LumenQuery's tools:

- **[Network Analytics](/analytics)**: Real-time ledger data, TPS, and transaction volume
- **[Live Transactions](/dashboard/transactions)**: Watch Stellar transactions streaming in real time
- **[Horizon API](/docs)**: Query account balances, payment history, and network state programmatically

The data is public and verifiable. Use it to form your own view.

## Related Resources

- [XLM Whale Alerts](/xlm-whale-alerts) — Get alerted on large XLM transfers and whale accumulation patterns
- [Stellar Transaction Monitoring](/stellar-transaction-monitoring) — Real-time monitoring for exchange flows and large movements
- [Stellar Blockchain Analytics API](/stellar-blockchain-analytics-api) — API access to on-chain metrics, TPS, and volume data

---

*Track Stellar network activity in real time with [LumenQuery](/auth/signup). Free analytics dashboard, Horizon API, and Soroban RPC -- no credit card required.*
    `,
  },
  'stellar-236-billion-economy-redefining-value': {
    title: 'Stellar (XLM) and the $236B Economy Redefining How Value Moves Online',
    date: '2026-04-24',
    readTime: '12 min read',
    category: 'Industry Insights',
    content: `
The World Economic Forum projects that AI agent commerce will reach $236 billion by 2034. The Stellar Development Foundation isn't waiting -- it's building the payment rail for that economy today. But to understand why Stellar is positioned to capture a significant share of this emerging market, you first need to understand the infrastructure it has already built.

## The Network Behind the Numbers

Stellar's actual on-chain metrics from 2025 tell a story of a network processing real money at scale:

- **$55.6 billion** in payment volume (up 52% year-over-year)
- **3.6 billion transactions** processed in the year
- **21.5 billion** lifetime operations
- **632,000 monthly active addresses** (up 24% YoY)
- **10.3 million** unique addresses on the network
- **99.99% uptime** maintained throughout the year

These aren't speculative DeFi loops or wash trading volumes. The median USDC transaction on Stellar is just **$1.57** -- confirming that the network is handling real-world micropayments and remittances, not whale-dominated speculation.

## Where the Volume Comes From

### Cross-Border Payments

The largest volume driver is cross-border settlement. Traditional wire transfers cost $15-50+ and take 1-5 business days. Stellar settles in 3-5 seconds for approximately $0.0007 per transaction.

MoneyGram's integration alone has facilitated over $4.2 billion in USDC remittance volume across 170+ countries. Key corridors include Philippines, Kenya, Mexico, and India -- markets where traditional cross-border fees average 6.5% but Stellar-based solutions bring costs below 1%.

### Stablecoins

USDC on Stellar generated $17.9 billion in volume between September 2024 and September 2025, across 91.3 million transactions with 500,000+ trust line accounts. PayPal's PYUSD launched on Stellar in June 2025, and the MiCAR-compliant EURAU stablecoin went live in April 2026.

Transaction activity peaks between 14:00-15:00 UTC (European/Middle Eastern business hours), and weekday volume runs 4.6x weekend volume -- patterns consistent with real commerce, not speculation.

### Real-World Asset Tokenization

The RWA market on Stellar crossed **$1 billion in January 2026** (up 184% YoY). Franklin Templeton's BENJI token alone represents over $680 million in tokenized U.S. Treasury fund assets on Stellar. The SDF's 2025 target was $3 billion in RWA value and $110 billion in RWA volume.

Major RWA participants include Franklin Templeton, WisdomTree, Ondo, Etherfuse, SG Forge, Mercado Bitcoin ($200M issuance), and RedSwan ($100M in tokenized real estate).

## The $236 Billion Thesis: AI Agents and x402

Here's where the story gets forward-looking. The Stellar blog post "The $236 billion economy that doesn't need your attention" makes a specific argument: as AI agents handle more commerce -- researching, purchasing, booking -- the attention-based advertising economy breaks down. You cannot sell attention to a bot.

The replacement? **Direct micropayments for value delivered.** And Stellar is building the infrastructure.

### The x402 Protocol

The x402 protocol activates HTTP's 402 "Payment Required" status code as an actual payment mechanism. When an AI agent needs a service -- an API call, a data lookup, a computation -- it pays per request with stablecoins. No accounts, no subscriptions, no API keys needed.

The numbers are already moving:
- **140 million+** cumulative agentic transactions
- Annualized volume exceeding **$600 million** (2026)
- Galaxy Research projects agentic commerce at $3-5 trillion in B2C revenue by 2030
- Nous Research already uses x402 for per-inference billing of its Hermes 4 AI model
- Coinbase is a technology partner for x402

For developers, x402 represents a new monetization model: build a useful service, expose it via HTTP, and let AI agents pay per request on Stellar.

## Stellar vs. Traditional Payment Networks

| Metric | Stellar | SWIFT | Visa |
|--------|---------|-------|------|
| Settlement | 3-5 seconds | 1-5 business days | 1-2 days |
| Transaction Fee | ~$0.0007 | $15-50+ | 1.5-3.5% |
| Peak Throughput | 5,000 TPS | N/A (message-based) | ~65,000 TPS |
| 24/7 Availability | Yes | Business hours | Yes |
| Cross-Border Cost | <1% | 3-7% | 1-3% + FX |
| Programmable | Yes (Soroban) | No | Limited |

The throughput gap is real -- Visa handles far more transactions per second. But for cross-border payments and machine-to-machine commerce, Stellar's combination of speed, cost, and programmability via Soroban smart contracts makes it uniquely competitive.

## The Partner Ecosystem

The institutional partnerships validate the infrastructure thesis:

| Partner | Role |
|---------|------|
| Circle | Native USDC issuer; CCTP V2 for cross-chain movement |
| MoneyGram | Cash network: 500,000 locations, 170+ countries |
| PayPal / Paxos | PYUSD stablecoin |
| Franklin Templeton | $680M+ tokenized Treasury fund |
| Visa | Stablecoin settlement network integration |
| Coinbase | x402 protocol partner |
| Flutterwave | Pan-African payments, M-Pesa integration |
| Coins.ph | Philippines mobile financial services |
| UNDP | Blockchain-based financial inclusion |

Each of these partnerships represents APIs, SDKs, and integration points that developers can build on.

## Real-World Impact

The network's impact is measurable in specific markets:

**Philippines**: Coins.ph integrated with Stellar to enable global remittances. The Philippines is one of the world's top remittance-receiving countries.

**Kenya**: Flutterwave uses Stellar for cross-border payments reaching M-Pesa's 21 million users.

**Nigeria**: Stellar-powered networks serve 300,000+ clients (90%+ women) across 200 branches in rural areas, enabling microfinance transfers.

**Latin America**: MoneyGram's stablecoin app is live in Colombia and El Salvador, with the Colombian peso having lost 40% of its value in four years -- making USD-denominated stablecoins a practical tool, not a speculative one.

## What Developers Should Be Building

The convergence of Stellar's payment infrastructure, growing stablecoin liquidity, RWA tokenization, and the emerging agentic economy creates clear building opportunities:

1. **Remittance applications** using MoneyGram Ramps (SEP-24) for instant cash on/off ramps
2. **Merchant payment solutions** leveraging sub-cent transaction fees
3. **AI agent services** monetized via x402 micropayments
4. **RWA platforms** using Stellar's compliance features for tokenized assets
5. **DeFi protocols** on Soroban for lending, liquidity provision, and yield
6. **Portfolio and analytics tools** serving the growing user base

LumenQuery provides the API infrastructure for all of these. Our [Horizon API](/docs) gives you access to accounts, transactions, payments, and ledger data. Our [Soroban RPC](/docs/contracts) handles smart contract deployment, invocation, and event streaming.

## Getting Started

The Stellar network is open and the tools are available:

- **[LumenQuery Horizon API](/docs)**: Query accounts, transactions, and network state
- **[Soroban RPC](/docs/contracts)**: Deploy and interact with smart contracts
- **[Network Analytics](/analytics)**: Real-time network metrics and performance data
- **[Live Transactions](/dashboard/transactions)**: Watch the network in real time

Start with our free tier -- 10,000 requests per month, no credit card required. Build something that moves real value.

---

*Ready to build on Stellar's $55.6 billion payment network? [LumenQuery](/auth/signup) provides enterprise-grade Horizon API and Soroban RPC with sub-100ms response times. Start free today.*
    `,
  },
};

export async function generateStaticParams() {
  return Object.keys(posts).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = posts[params.slug];
  if (!post) return { title: 'Post Not Found' };

  const description = post.content.trim().split('\n').find(line => line.trim() && !line.startsWith('#'))?.slice(0, 160) || post.title;

  return {
    title: `${post.title} - LumenQuery Blog`,
    description,
    keywords: [post.category, 'Stellar', 'blockchain', 'LumenQuery', 'Web3'],
    authors: [{ name: 'LumenQuery Team' }],
    alternates: {
      canonical: `https://lumenquery.io/blog/${params.slug}`,
    },
    openGraph: {
      title: post.title,
      description,
      type: 'article',
      url: `https://lumenquery.io/blog/${params.slug}`,
      publishedTime: post.date,
      authors: ['LumenQuery Team'],
      siteName: 'LumenQuery',
      images: [{ url: `/api/og?title=${encodeURIComponent(post.title)}&subtitle=${encodeURIComponent(post.category + ' • ' + post.readTime)}`, width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description,
      images: [`/api/og?title=${encodeURIComponent(post.title)}&subtitle=${encodeURIComponent(post.category + ' • ' + post.readTime)}`],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default function BlogPost({ params }: { params: { slug: string } }) {
  const post = posts[params.slug];

  if (!post) {
    notFound();
  }

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      '@type': 'Organization',
      name: 'LumenQuery',
      url: 'https://lumenquery.io',
    },
    publisher: {
      '@type': 'Organization',
      name: 'LumenQuery',
      url: 'https://lumenquery.io',
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://lumenquery.io/blog/${params.slug}`,
    },
    articleSection: post.category,
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://lumenquery.io' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://lumenquery.io/blog' },
      { '@type': 'ListItem', position: 3, name: post.title, item: `https://lumenquery.io/blog/${params.slug}` },
    ],
  };

  const renderContent = (content: string) => {
    const lines = content.trim().split('\n');
    const elements: JSX.Element[] = [];
    let inCodeBlock = false;
    let codeContent = '';
    let inTable = false;
    let tableRows: string[][] = [];

    lines.forEach((line, index) => {
      if (line.startsWith('```')) {
        if (inCodeBlock) {
          elements.push(
            <div key={index} className="bg-[#1D1E26] rounded-lg p-3 sm:p-4 my-4 overflow-x-auto">
              <pre className="text-xs sm:text-sm text-gray-300">
                <code>{codeContent.trim()}</code>
              </pre>
            </div>
          );
          codeContent = '';
          inCodeBlock = false;
        } else {
          inCodeBlock = true;
        }
        return;
      }

      if (inCodeBlock) {
        codeContent += line + '\n';
        return;
      }

      if (line.startsWith('|')) {
        if (!inTable) {
          inTable = true;
          tableRows = [];
        }
        if (!line.includes('---')) {
          const cells = line.split('|').filter(c => c.trim()).map(c => c.trim());
          tableRows.push(cells);
        }
        return;
      } else if (inTable) {
        elements.push(
          <div key={index} className="overflow-x-auto my-4">
            <table className="w-full min-w-[400px] border-collapse text-sm">
              <thead>
                <tr className="border-b border-white/10 bg-white/5">
                  {tableRows[0]?.map((cell, i) => (
                    <th key={i} className="text-left py-2 sm:py-3 px-2 sm:px-4 font-medium">{cell}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {tableRows.slice(1).map((row, rowIndex) => (
                  <tr key={rowIndex} className="border-b border-white/10">
                    {row.map((cell, cellIndex) => (
                      <td key={cellIndex} className="py-2 sm:py-3 px-2 sm:px-4 text-gray-400">{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
        inTable = false;
        tableRows = [];
      }

      if (line.startsWith('## ')) {
        elements.push(
          <h2 key={index} className="text-xl sm:text-2xl font-bold mt-8 sm:mt-10 mb-3 sm:mb-4 pb-2 border-b border-white/10">
            {line.slice(3)}
          </h2>
        );
        return;
      }

      if (line.startsWith('### ')) {
        elements.push(
          <h3 key={index} className="text-lg sm:text-xl font-semibold mt-6 sm:mt-8 mb-2 sm:mb-3">
            {line.slice(4)}
          </h3>
        );
        return;
      }

      if (line.startsWith('---')) {
        elements.push(<hr key={index} className="border-white/10 my-8" />);
        return;
      }

      if (line.startsWith('- ')) {
        elements.push(
          <li key={index} className="text-gray-400 ml-4 mb-2 list-disc text-sm sm:text-base">
            {renderInlineFormatting(line.slice(2))}
          </li>
        );
        return;
      }

      if (/^\d+\.\s/.test(line)) {
        elements.push(
          <li key={index} className="text-gray-400 ml-4 mb-2 list-decimal text-sm sm:text-base">
            {renderInlineFormatting(line.replace(/^\d+\.\s/, ''))}
          </li>
        );
        return;
      }

      if (line.trim() === '') {
        return;
      }

      elements.push(
        <p key={index} className="text-gray-400 leading-relaxed mb-4 text-sm sm:text-base">
          {renderInlineFormatting(line)}
        </p>
      );
    });

    return elements;
  };

  const renderInlineFormatting = (text: string) => {
    const parts = text.split(/(`[^`]+`)/g);
    return parts.map((part, i) => {
      if (part.startsWith('`') && part.endsWith('`')) {
        return (
          <code key={i} className="px-2 py-1 rounded bg-white/5 text-[#7366FF] text-sm border border-white/10">
            {part.slice(1, -1)}
          </code>
        );
      }
      const boldParts = part.split(/(\*\*[^*]+\*\*)/g);
      return boldParts.map((bp, j) => {
        if (bp.startsWith('**') && bp.endsWith('**')) {
          return <strong key={`${i}-${j}`} className="font-semibold text-white">{bp.slice(2, -2)}</strong>;
        }
        const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
        const linkParts = bp.split(linkRegex);
        if (linkParts.length > 1) {
          const result: (string | JSX.Element)[] = [];
          for (let k = 0; k < linkParts.length; k += 3) {
            if (linkParts[k]) result.push(linkParts[k]);
            if (linkParts[k + 1] && linkParts[k + 2]) {
              result.push(
                <Link key={`${i}-${j}-${k}`} href={linkParts[k + 2]} className="text-[#7366FF] hover:underline">
                  {linkParts[k + 1]}
                </Link>
              );
            }
          }
          return result;
        }
        return bp;
      });
    });
  };

  return (
    <div className="text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <div className="max-w-3xl mx-auto">
        <nav className="mb-6 sm:mb-8" aria-label="Breadcrumb">
          <Link href="/blog" className="text-gray-400 hover:text-[#7366FF] text-sm">
            ← Back to Blog
          </Link>
        </nav>

        <article>
          <header className="mb-8 sm:mb-12">
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
              <span className="px-2 sm:px-3 py-1 rounded-full bg-[rgba(40,85,255,0.1)] text-[#7366FF] text-xs font-medium">
                {post.category}
              </span>
              <time dateTime={post.date} className="text-gray-400 text-xs sm:text-sm">{post.date}</time>
              <span className="text-gray-400 text-xs sm:text-sm hidden sm:inline">•</span>
              <span className="text-gray-400 text-xs sm:text-sm hidden sm:inline">{post.readTime}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight">
              {post.title}
            </h1>
          </header>

          {/* Author & Share */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#7366FF]/20 flex items-center justify-center">
                <span className="text-sm font-bold text-[#7366FF]">LQ</span>
              </div>
              <div>
                <div className="text-sm font-medium">LumenQuery Team</div>
                <div className="text-xs text-[#A8A9AD]">Stellar Infrastructure Engineers</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-[#A8A9AD] mr-2">Share:</span>
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(`https://lumenquery.io/blog/${params.slug}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#1DA1F2]/10 hover:border-[#1DA1F2]/30 transition-colors"
                aria-label="Share on Twitter"
              >
                <svg className="w-3.5 h-3.5 text-[#A8A9AD]" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`https://lumenquery.io/blog/${params.slug}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#0A66C2]/10 hover:border-[#0A66C2]/30 transition-colors"
                aria-label="Share on LinkedIn"
              >
                <svg className="w-3.5 h-3.5 text-[#A8A9AD]" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </a>
              <a
                href={`mailto:?subject=${encodeURIComponent(post.title)}&body=${encodeURIComponent(`https://lumenquery.io/blog/${params.slug}`)}`}
                className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 hover:border-white/20 transition-colors"
                aria-label="Share via email"
              >
                <svg className="w-3.5 h-3.5 text-[#A8A9AD]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
              </a>
            </div>
          </div>

          <section className="prose prose-gray max-w-none" aria-label="Article content">
            {renderContent(post.content)}
          </section>

          {/* Newsletter CTA */}
          <aside className="mt-10 sm:mt-16 p-5 sm:p-8 rounded-xl sm:rounded-2xl bg-[#262932] border border-white/5">
            <div className="text-center">
              <h2 className="text-lg sm:text-xl font-bold mb-2">Get Stellar Developer Insights</h2>
              <p className="text-[#A8A9AD] text-sm mb-4">Weekly updates on Stellar infrastructure, Soroban development, and network analytics.</p>
              <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto" action="/api/newsletter" method="POST">
                <input
                  type="email"
                  name="email"
                  placeholder="developer@company.com"
                  required
                  className="flex-1 px-4 py-2.5 rounded-lg bg-[#1D1E26] border border-white/10 text-sm text-white placeholder:text-[#A8A9AD] focus:outline-none focus:border-[#7366FF]/50"
                />
                <button type="submit" className="px-5 py-2.5 rounded-lg bg-[#7366FF] text-white text-sm font-medium hover:bg-[#5A4FCF] transition-colors whitespace-nowrap">
                  Subscribe
                </button>
              </form>
              <p className="text-[10px] text-[#A8A9AD] mt-3">No spam. Unsubscribe anytime.</p>
            </div>
          </aside>

          {/* Related Posts */}
          <aside className="mt-8 sm:mt-12">
            <h2 className="text-lg font-bold mb-4">Related Articles</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {Object.entries(posts)
                .filter(([slug, p]) => slug !== params.slug && p.category === post.category)
                .slice(0, 3)
                .map(([slug, p]) => (
                  <Link key={slug} href={`/blog/${slug}`} className="p-4 rounded-xl bg-[#262932] border border-white/5 hover:border-[#7366FF]/30 transition-colors group">
                    <span className="text-[10px] text-[#7366FF] font-medium">{p.category}</span>
                    <h3 className="text-sm font-medium mt-1 mb-2 line-clamp-2 group-hover:text-[#7366FF] transition-colors">{p.title}</h3>
                    <span className="text-[11px] text-[#A8A9AD]">{p.readTime}</span>
                  </Link>
                ))}
            </div>
          </aside>

          {/* Bottom CTA */}
          <aside className="mt-8 p-5 sm:p-8 rounded-xl sm:rounded-2xl bg-[#7366FF] text-white text-center">
            <h2 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3">Ready to Get Started?</h2>
            <p className="text-white/80 mb-4 sm:mb-6 text-sm sm:text-base">
              Sign up for free and start building on Stellar with LumenQuery today.
            </p>
            <Link href="/auth/signup" className="inline-block px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg bg-white text-[#7366FF] font-medium hover:bg-white/90 transition-colors text-sm sm:text-base">
              Create Free Account
            </Link>
          </aside>
        </article>
      </div>
    </div>
  );
}
