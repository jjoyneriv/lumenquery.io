import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Script from 'next/script';

const posts: Record<string, {
  title: string;
  date: string;
  readTime: string;
  category: string;
  content: string;
}> = {
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
              <tr key={tx.id} className="border-b hover:bg-gray-50">
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
              <tr key={ledger.id} className="border-b hover:bg-gray-50">
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
      <div className="p-4 bg-white rounded-lg shadow">
        <div className="text-sm text-gray-500">Latest Ledger</div>
        <div className="text-2xl font-bold">{state.ledger.toLocaleString()}</div>
      </div>
      <div className="p-4 bg-white rounded-lg shadow">
        <div className="text-sm text-gray-500">Protocol</div>
        <div className="text-2xl font-bold">v{state.protocolVersion}</div>
      </div>
      <div className="p-4 bg-white rounded-lg shadow">
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
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description,
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
            <div key={index} className="bg-[#0D0D0D] rounded-lg p-3 sm:p-4 my-4 overflow-x-auto">
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
                <tr className="border-b border-[#E6E7E9] bg-[#F5F6F7]">
                  {tableRows[0]?.map((cell, i) => (
                    <th key={i} className="text-left py-2 sm:py-3 px-2 sm:px-4 font-medium">{cell}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {tableRows.slice(1).map((row, rowIndex) => (
                  <tr key={rowIndex} className="border-b border-[#E6E7E9]">
                    {row.map((cell, cellIndex) => (
                      <td key={cellIndex} className="py-2 sm:py-3 px-2 sm:px-4 text-[#6A6A6A]">{cell}</td>
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
          <h2 key={index} className="text-xl sm:text-2xl font-bold mt-8 sm:mt-10 mb-3 sm:mb-4 pb-2 border-b border-[#E6E7E9]">
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
        elements.push(<hr key={index} className="border-[#E6E7E9] my-8" />);
        return;
      }

      if (line.startsWith('- ')) {
        elements.push(
          <li key={index} className="text-[#6A6A6A] ml-4 mb-2 list-disc text-sm sm:text-base">
            {renderInlineFormatting(line.slice(2))}
          </li>
        );
        return;
      }

      if (/^\d+\.\s/.test(line)) {
        elements.push(
          <li key={index} className="text-[#6A6A6A] ml-4 mb-2 list-decimal text-sm sm:text-base">
            {renderInlineFormatting(line.replace(/^\d+\.\s/, ''))}
          </li>
        );
        return;
      }

      if (line.trim() === '') {
        return;
      }

      elements.push(
        <p key={index} className="text-[#6A6A6A] leading-relaxed mb-4 text-sm sm:text-base">
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
          <code key={i} className="px-2 py-1 rounded bg-[#F5F6F7] text-[#2855FF] text-sm border border-[#E6E7E9]">
            {part.slice(1, -1)}
          </code>
        );
      }
      const boldParts = part.split(/(\*\*[^*]+\*\*)/g);
      return boldParts.map((bp, j) => {
        if (bp.startsWith('**') && bp.endsWith('**')) {
          return <strong key={`${i}-${j}`} className="font-semibold text-black">{bp.slice(2, -2)}</strong>;
        }
        const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
        const linkParts = bp.split(linkRegex);
        if (linkParts.length > 1) {
          const result: (string | JSX.Element)[] = [];
          for (let k = 0; k < linkParts.length; k += 3) {
            if (linkParts[k]) result.push(linkParts[k]);
            if (linkParts[k + 1] && linkParts[k + 2]) {
              result.push(
                <Link key={`${i}-${j}-${k}`} href={linkParts[k + 2]} className="text-[#2855FF] hover:underline">
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
    <div className="min-h-screen bg-white text-black">
      <Script
        id="article-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <Header activePage="blog" />

      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-12 md:py-16">
        <nav className="mb-6 sm:mb-8" aria-label="Breadcrumb">
          <Link href="/blog" className="text-[#6A6A6A] hover:text-[#2855FF] text-sm">
            ← Back to Blog
          </Link>
        </nav>

        <article>
          <header className="mb-8 sm:mb-12">
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
              <span className="px-2 sm:px-3 py-1 rounded-full bg-[rgba(40,85,255,0.1)] text-[#2855FF] text-xs font-medium">
                {post.category}
              </span>
              <time dateTime={post.date} className="text-[#6A6A6A] text-xs sm:text-sm">{post.date}</time>
              <span className="text-[#6A6A6A] text-xs sm:text-sm hidden sm:inline">•</span>
              <span className="text-[#6A6A6A] text-xs sm:text-sm hidden sm:inline">{post.readTime}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight">
              {post.title}
            </h1>
          </header>

          <section className="prose prose-gray max-w-none" aria-label="Article content">
            {renderContent(post.content)}
          </section>

          <aside className="mt-10 sm:mt-16 p-5 sm:p-8 rounded-xl sm:rounded-2xl bg-[#2855FF] text-white text-center">
            <h2 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3">Ready to Get Started?</h2>
            <p className="text-white/80 mb-4 sm:mb-6 text-sm sm:text-base">
              Sign up for free and start building on Stellar with LumenQuery today.
            </p>
            <Link href="/auth/signup" className="inline-block px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg bg-white text-[#2855FF] font-medium hover:bg-gray-100 transition-colors text-sm sm:text-base">
              Create Free Account
            </Link>
          </aside>
        </article>
      </main>

      <Footer />
    </div>
  );
}
