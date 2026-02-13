'use client';

import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useState } from 'react';

export default function ComplianceDocsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const sidebarContent = (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-semibold text-[#6A6A6A] uppercase tracking-wider mb-3">Overview</h3>
        <ul className="space-y-2">
          <li><a href="#introduction" className="text-[#6A6A6A] hover:text-[#2855FF]" onClick={() => setSidebarOpen(false)}>Introduction</a></li>
          <li><a href="#dashboard" className="text-[#6A6A6A] hover:text-[#2855FF]" onClick={() => setSidebarOpen(false)}>Dashboard</a></li>
          <li><a href="#tiers" className="text-[#6A6A6A] hover:text-[#2855FF]" onClick={() => setSidebarOpen(false)}>Subscription Tiers</a></li>
        </ul>
      </div>
      <div>
        <h3 className="text-sm font-semibold text-[#6A6A6A] uppercase tracking-wider mb-3">Features</h3>
        <ul className="space-y-2">
          <li><a href="#accounts" className="text-[#6A6A6A] hover:text-[#2855FF]" onClick={() => setSidebarOpen(false)}>Accounts</a></li>
          <li><a href="#rules" className="text-[#6A6A6A] hover:text-[#2855FF]" onClick={() => setSidebarOpen(false)}>Rules</a></li>
          <li><a href="#violations" className="text-[#6A6A6A] hover:text-[#2855FF]" onClick={() => setSidebarOpen(false)}>Violations</a></li>
          <li><a href="#reports" className="text-[#6A6A6A] hover:text-[#2855FF]" onClick={() => setSidebarOpen(false)}>Reports</a></li>
          <li><a href="#audit-log" className="text-[#6A6A6A] hover:text-[#2855FF]" onClick={() => setSidebarOpen(false)}>Audit Log</a></li>
        </ul>
      </div>
      <div>
        <h3 className="text-sm font-semibold text-[#6A6A6A] uppercase tracking-wider mb-3">How-To Guides</h3>
        <ul className="space-y-2">
          <li><a href="#add-account" className="text-[#6A6A6A] hover:text-[#2855FF]" onClick={() => setSidebarOpen(false)}>Add an Account</a></li>
          <li><a href="#create-rule" className="text-[#6A6A6A] hover:text-[#2855FF]" onClick={() => setSidebarOpen(false)}>Create a Rule</a></li>
          <li><a href="#review-violation" className="text-[#6A6A6A] hover:text-[#2855FF]" onClick={() => setSidebarOpen(false)}>Review a Violation</a></li>
        </ul>
      </div>
      <div>
        <h3 className="text-sm font-semibold text-[#6A6A6A] uppercase tracking-wider mb-3">Reference</h3>
        <ul className="space-y-2">
          <li><a href="#api-reference" className="text-[#6A6A6A] hover:text-[#2855FF]" onClick={() => setSidebarOpen(false)}>API Reference</a></li>
          <li><a href="#rule-types" className="text-[#6A6A6A] hover:text-[#2855FF]" onClick={() => setSidebarOpen(false)}>Rule Types</a></li>
        </ul>
      </div>
      <div>
        <Link href="/docs" className="text-[#2855FF] hover:underline text-sm flex items-center gap-1">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Docs
        </Link>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white text-black">
      <Header activePage="docs" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-12">
        {/* Mobile sidebar toggle */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="lg:hidden mb-4 flex items-center gap-2 px-4 py-2 rounded-lg bg-[#F5F6F7] border border-[#E6E7E9] text-sm font-medium"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          Documentation Menu
        </button>

        {/* Mobile sidebar drawer */}
        {sidebarOpen && (
          <div className="lg:hidden fixed inset-0 z-50 bg-black/50" onClick={() => setSidebarOpen(false)}>
            <div
              className="absolute left-0 top-0 bottom-0 w-72 bg-white p-6 overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSidebarOpen(false)}
                className="absolute top-4 right-4 p-2 rounded-lg hover:bg-[#F5F6F7]"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              {sidebarContent}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block lg:col-span-1" aria-label="Documentation navigation">
            <nav className="sticky top-8">
              {sidebarContent}
            </nav>
          </aside>

          {/* Main Content */}
          <main className="lg:col-span-3">
            <header className="mb-8 sm:mb-12">
              <div className="flex items-center gap-2 mb-4">
                <span className="px-3 py-1 rounded-full bg-red-100 text-red-700 text-xs font-medium">Enterprise Feature</span>
                <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-medium">Auditable</span>
              </div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">Compliance & AML</h1>
              <p className="text-base sm:text-lg md:text-xl text-[#6A6A6A]">
                Enterprise compliance monitoring and anti-money laundering alerting for the Stellar network.
              </p>
            </header>

            {/* Introduction */}
            <section id="introduction" className="mb-10 sm:mb-16">
              <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 pb-2 border-b border-[#E6E7E9]">Introduction</h2>
              <p className="text-[#6A6A6A] mb-4 text-sm sm:text-base">
                The Compliance & AML service provides comprehensive monitoring for Stellar network accounts.
                Designed for exchanges, custodians, and financial institutions, it helps meet regulatory requirements
                with configurable rules, automated violation detection, and immutable audit logging.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
                <div className="p-4 rounded-lg bg-blue-50 border border-blue-200">
                  <div className="text-blue-600 text-xl mb-2">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold mb-1 text-sm">Rule-Based Detection</h3>
                  <p className="text-xs text-[#6A6A6A]">10 evaluator types including sanctions, velocity, and patterns</p>
                </div>
                <div className="p-4 rounded-lg bg-green-50 border border-green-200">
                  <div className="text-green-600 text-xl mb-2">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                    </svg>
                  </div>
                  <h3 className="font-semibold mb-1 text-sm">Immutable Audit Log</h3>
                  <p className="text-xs text-[#6A6A6A]">Hash-chain verified audit trail for compliance</p>
                </div>
                <div className="p-4 rounded-lg bg-purple-50 border border-purple-200">
                  <div className="text-purple-600 text-xl mb-2">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold mb-1 text-sm">Regulatory Reports</h3>
                  <p className="text-xs text-[#6A6A6A]">Generate compliance reports in multiple formats</p>
                </div>
              </div>
            </section>

            {/* Dashboard */}
            <section id="dashboard" className="mb-10 sm:mb-16">
              <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 pb-2 border-b border-[#E6E7E9]">Dashboard Overview</h2>
              <p className="text-[#6A6A6A] mb-4 text-sm sm:text-base">
                The Compliance dashboard at <code className="px-2 py-1 rounded bg-[#F5F6F7] text-[#2855FF] text-xs">/compliance</code> provides
                a central view of your compliance status and pending actions.
              </p>

              <h3 className="text-base sm:text-lg font-semibold mt-6 mb-3">Status Metrics</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
                <div className="p-4 rounded-lg bg-[#F5F6F7] border border-[#E6E7E9]">
                  <h4 className="font-semibold mb-1 text-sm">Monitored Accounts</h4>
                  <p className="text-xs text-[#6A6A6A]">Current vs. maximum allowed for your tier</p>
                </div>
                <div className="p-4 rounded-lg bg-[#F5F6F7] border border-[#E6E7E9]">
                  <h4 className="font-semibold mb-1 text-sm">Active Rules</h4>
                  <p className="text-xs text-[#6A6A6A]">Enabled compliance rules and limits</p>
                </div>
                <div className="p-4 rounded-lg bg-[#F5F6F7] border border-[#E6E7E9]">
                  <h4 className="font-semibold mb-1 text-sm">Active Violations</h4>
                  <p className="text-xs text-[#6A6A6A]">Unresolved violations requiring attention</p>
                </div>
                <div className="p-4 rounded-lg bg-[#F5F6F7] border border-[#E6E7E9]">
                  <h4 className="font-semibold mb-1 text-sm">Pending Review</h4>
                  <p className="text-xs text-[#6A6A6A]">Violations awaiting manual review</p>
                </div>
                <div className="p-4 rounded-lg bg-[#F5F6F7] border border-[#E6E7E9]">
                  <h4 className="font-semibold mb-1 text-sm">High-Risk Accounts</h4>
                  <p className="text-xs text-[#6A6A6A]">Accounts with risk score &ge; 70</p>
                </div>
                <div className="p-4 rounded-lg bg-[#F5F6F7] border border-[#E6E7E9]">
                  <h4 className="font-semibold mb-1 text-sm">Last Scan</h4>
                  <p className="text-xs text-[#6A6A6A]">Timestamp of last compliance scan</p>
                </div>
              </div>
            </section>

            {/* Subscription Tiers */}
            <section id="tiers" className="mb-10 sm:mb-16">
              <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 pb-2 border-b border-[#E6E7E9]">Subscription Tiers</h2>
              <p className="text-[#6A6A6A] mb-4 text-sm sm:text-base">
                Compliance features are available across three tiers with increasing capabilities.
              </p>

              <div className="overflow-x-auto">
                <table className="w-full min-w-[600px] text-sm">
                  <thead>
                    <tr className="border-b border-[#E6E7E9] bg-[#F5F6F7]">
                      <th className="text-left py-3 px-4 font-medium">Feature</th>
                      <th className="text-center py-3 px-4 font-medium">Basic ($49/mo)</th>
                      <th className="text-center py-3 px-4 font-medium">Standard ($149/mo)</th>
                      <th className="text-center py-3 px-4 font-medium">Enterprise</th>
                    </tr>
                  </thead>
                  <tbody className="text-xs sm:text-sm">
                    <tr className="border-b border-[#E6E7E9]">
                      <td className="py-3 px-4">Monitored Accounts</td>
                      <td className="py-3 px-4 text-center">100</td>
                      <td className="py-3 px-4 text-center">500</td>
                      <td className="py-3 px-4 text-center">Unlimited</td>
                    </tr>
                    <tr className="border-b border-[#E6E7E9]">
                      <td className="py-3 px-4">Custom Rules</td>
                      <td className="py-3 px-4 text-center">10</td>
                      <td className="py-3 px-4 text-center">50</td>
                      <td className="py-3 px-4 text-center">Unlimited</td>
                    </tr>
                    <tr className="border-b border-[#E6E7E9]">
                      <td className="py-3 px-4">Rule Types</td>
                      <td className="py-3 px-4 text-center">3 (basic)</td>
                      <td className="py-3 px-4 text-center">7 (+ advanced)</td>
                      <td className="py-3 px-4 text-center">10 (all)</td>
                    </tr>
                    <tr className="border-b border-[#E6E7E9]">
                      <td className="py-3 px-4">Sanctions Screening</td>
                      <td className="py-3 px-4 text-center text-red-500">No</td>
                      <td className="py-3 px-4 text-center text-green-500">Yes</td>
                      <td className="py-3 px-4 text-center text-green-500">Yes</td>
                    </tr>
                    <tr className="border-b border-[#E6E7E9]">
                      <td className="py-3 px-4">Cycle Detection</td>
                      <td className="py-3 px-4 text-center text-red-500">No</td>
                      <td className="py-3 px-4 text-center text-green-500">Yes</td>
                      <td className="py-3 px-4 text-center text-green-500">Yes</td>
                    </tr>
                    <tr className="border-b border-[#E6E7E9]">
                      <td className="py-3 px-4">Reports</td>
                      <td className="py-3 px-4 text-center">Monthly only</td>
                      <td className="py-3 px-4 text-center">All types</td>
                      <td className="py-3 px-4 text-center">All types</td>
                    </tr>
                    <tr className="border-b border-[#E6E7E9]">
                      <td className="py-3 px-4">Audit Retention</td>
                      <td className="py-3 px-4 text-center">90 days</td>
                      <td className="py-3 px-4 text-center">365 days</td>
                      <td className="py-3 px-4 text-center">Unlimited</td>
                    </tr>
                    <tr className="border-b border-[#E6E7E9]">
                      <td className="py-3 px-4">Webhooks</td>
                      <td className="py-3 px-4 text-center text-red-500">No</td>
                      <td className="py-3 px-4 text-center text-green-500">Yes</td>
                      <td className="py-3 px-4 text-center text-green-500">Yes</td>
                    </tr>
                    <tr className="border-b border-[#E6E7E9]">
                      <td className="py-3 px-4">Slack Integration</td>
                      <td className="py-3 px-4 text-center text-red-500">No</td>
                      <td className="py-3 px-4 text-center text-red-500">No</td>
                      <td className="py-3 px-4 text-center text-green-500">Yes</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* Accounts */}
            <section id="accounts" className="mb-10 sm:mb-16">
              <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 pb-2 border-b border-[#E6E7E9]">Monitored Accounts</h2>
              <p className="text-[#6A6A6A] mb-4 text-sm sm:text-base">
                Manage accounts you want to monitor for compliance at{' '}
                <code className="px-2 py-1 rounded bg-[#F5F6F7] text-[#2855FF] text-xs">/compliance/accounts</code>.
              </p>

              <h3 className="text-base sm:text-lg font-semibold mt-6 mb-3">Account Data</h3>
              <div className="bg-[#0D0D0D] rounded-lg p-4 mb-6 overflow-x-auto">
                <pre className="text-xs sm:text-sm text-gray-300">
{`{
  "id": "acc_123",
  "accountId": "GABC...XYZ",           // Stellar public key
  "label": "Company Treasury",          // Optional friendly name
  "monitoringLevel": "STANDARD",        // BASIC | STANDARD | ENHANCED | RESTRICTED
  "riskScore": 45,                      // 0-100 (updated by scans)
  "riskFactors": { ... },               // Risk breakdown
  "lastAssessed": "2026-02-13T10:00:00Z",
  "lastActivity": "2026-02-13T09:45:00Z",
  "totalVolume30d": "5000000000000",    // Volume in stroops
  "txCount30d": 152,                    // Transaction count
  "addedAt": "2026-02-01T12:00:00Z"
}`}
                </pre>
              </div>

              <h3 className="text-base sm:text-lg font-semibold mt-6 mb-3">Monitoring Levels</h3>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[400px] text-sm">
                  <thead>
                    <tr className="border-b border-[#E6E7E9] bg-[#F5F6F7]">
                      <th className="text-left py-3 px-4 font-medium">Level</th>
                      <th className="text-left py-3 px-4 font-medium">Description</th>
                    </tr>
                  </thead>
                  <tbody className="text-xs sm:text-sm">
                    <tr className="border-b border-[#E6E7E9]">
                      <td className="py-3 px-4"><span className="px-2 py-1 rounded bg-gray-100 text-gray-700 font-medium">BASIC</span></td>
                      <td className="py-3 px-4 text-[#6A6A6A]">Regular monitoring with standard thresholds</td>
                    </tr>
                    <tr className="border-b border-[#E6E7E9]">
                      <td className="py-3 px-4"><span className="px-2 py-1 rounded bg-blue-100 text-blue-700 font-medium">STANDARD</span></td>
                      <td className="py-3 px-4 text-[#6A6A6A]">Default level with all standard rules applied</td>
                    </tr>
                    <tr className="border-b border-[#E6E7E9]">
                      <td className="py-3 px-4"><span className="px-2 py-1 rounded bg-yellow-100 text-yellow-700 font-medium">ENHANCED</span></td>
                      <td className="py-3 px-4 text-[#6A6A6A]">Enhanced monitoring with lower thresholds</td>
                    </tr>
                    <tr className="border-b border-[#E6E7E9]">
                      <td className="py-3 px-4"><span className="px-2 py-1 rounded bg-red-100 text-red-700 font-medium">RESTRICTED</span></td>
                      <td className="py-3 px-4 text-[#6A6A6A]">Close monitoring for high-risk accounts</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h3 className="text-base sm:text-lg font-semibold mt-6 mb-3">Risk Score</h3>
              <p className="text-[#6A6A6A] mb-4 text-sm">
                Each account has a risk score from 0-100, calculated based on:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-lg bg-green-50 border border-green-200 text-center">
                  <div className="text-lg font-bold text-green-600">0-39</div>
                  <div className="text-xs text-green-600">Low Risk</div>
                </div>
                <div className="p-4 rounded-lg bg-yellow-50 border border-yellow-200 text-center">
                  <div className="text-lg font-bold text-yellow-600">40-69</div>
                  <div className="text-xs text-yellow-600">Medium Risk</div>
                </div>
                <div className="p-4 rounded-lg bg-red-50 border border-red-200 text-center">
                  <div className="text-lg font-bold text-red-600">70-100</div>
                  <div className="text-xs text-red-600">High Risk</div>
                </div>
              </div>
            </section>

            {/* Rules */}
            <section id="rules" className="mb-10 sm:mb-16">
              <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 pb-2 border-b border-[#E6E7E9]">Compliance Rules</h2>
              <p className="text-[#6A6A6A] mb-4 text-sm sm:text-base">
                Configure detection rules at{' '}
                <code className="px-2 py-1 rounded bg-[#F5F6F7] text-[#2855FF] text-xs">/compliance/rules</code>.
                Rules are evaluated against monitored accounts to detect violations.
              </p>

              <h3 className="text-base sm:text-lg font-semibold mt-6 mb-3">Rule Structure</h3>
              <div className="bg-[#0D0D0D] rounded-lg p-4 mb-6 overflow-x-auto">
                <pre className="text-xs sm:text-sm text-gray-300">
{`{
  "id": "rule_123",
  "name": "High Volume Alert",
  "description": "Alert on transactions over $100K/day",
  "ruleType": "VOLUME_LIMIT",
  "enabled": true,
  "priority": 75,                       // 1-100 (higher = evaluated first)
  "conditions": {
    "maxAmountPerDay": 100000,
    "assetCode": "USDC"
  },
  "severity": "WARNING",                // INFO | WARNING | CRITICAL
  "autoBlock": false,                   // Auto-block account on violation
  "requireReview": true,                // Require manual review
  "violationCount": 12                  // Times this rule triggered
}`}
                </pre>
              </div>

              <h3 className="text-base sm:text-lg font-semibold mt-6 mb-3">Rule Settings</h3>
              <div className="space-y-3">
                <div className="p-4 rounded-lg bg-[#F5F6F7] border border-[#E6E7E9]">
                  <h4 className="font-semibold mb-1 text-sm">Priority (1-100)</h4>
                  <p className="text-xs text-[#6A6A6A]">Higher priority rules are evaluated first. Use for ordering rule execution.</p>
                </div>
                <div className="p-4 rounded-lg bg-[#F5F6F7] border border-[#E6E7E9]">
                  <h4 className="font-semibold mb-1 text-sm">Severity</h4>
                  <p className="text-xs text-[#6A6A6A]">INFO (low), WARNING (medium), or CRITICAL (high) - affects violation priority.</p>
                </div>
                <div className="p-4 rounded-lg bg-[#F5F6F7] border border-[#E6E7E9]">
                  <h4 className="font-semibold mb-1 text-sm">Require Review</h4>
                  <p className="text-xs text-[#6A6A6A]">When enabled, violations start as PENDING and require manual review.</p>
                </div>
                <div className="p-4 rounded-lg bg-[#F5F6F7] border border-[#E6E7E9]">
                  <h4 className="font-semibold mb-1 text-sm">Auto-Block</h4>
                  <p className="text-xs text-[#6A6A6A]">Automatically restrict the account when a violation is detected.</p>
                </div>
              </div>
            </section>

            {/* Violations */}
            <section id="violations" className="mb-10 sm:mb-16">
              <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 pb-2 border-b border-[#E6E7E9]">Violations</h2>
              <p className="text-[#6A6A6A] mb-4 text-sm sm:text-base">
                View and manage detected violations at{' '}
                <code className="px-2 py-1 rounded bg-[#F5F6F7] text-[#2855FF] text-xs">/compliance/violations</code>.
              </p>

              <h3 className="text-base sm:text-lg font-semibold mt-6 mb-3">Violation Status Workflow</h3>
              <div className="p-4 rounded-lg bg-[#F5F6F7] border border-[#E6E7E9] mb-6">
                <div className="text-center text-sm">
                  <div className="inline-block">
                    <span className="px-3 py-1 rounded bg-yellow-100 text-yellow-700 font-medium">PENDING</span>
                    <div className="text-[#6A6A6A] text-xs mt-1 mb-2">↓</div>
                  </div>
                  <div className="flex justify-center gap-4 flex-wrap">
                    <span className="px-3 py-1 rounded bg-blue-100 text-blue-700 font-medium">UNDER_REVIEW</span>
                    <span className="px-3 py-1 rounded bg-green-100 text-green-700 font-medium">CLEARED</span>
                    <span className="px-3 py-1 rounded bg-orange-100 text-orange-700 font-medium">CONFIRMED</span>
                  </div>
                  <div className="text-[#6A6A6A] text-xs my-2">↓</div>
                  <div className="flex justify-center gap-4 flex-wrap">
                    <span className="px-3 py-1 rounded bg-red-100 text-red-700 font-medium">ESCALATED</span>
                    <span className="px-3 py-1 rounded bg-purple-100 text-purple-700 font-medium">REPORTED</span>
                  </div>
                </div>
              </div>

              <h3 className="text-base sm:text-lg font-semibold mt-6 mb-3">Status Definitions</h3>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[500px] text-sm">
                  <thead>
                    <tr className="border-b border-[#E6E7E9] bg-[#F5F6F7]">
                      <th className="text-left py-3 px-4 font-medium">Status</th>
                      <th className="text-left py-3 px-4 font-medium">Description</th>
                      <th className="text-left py-3 px-4 font-medium">Next Actions</th>
                    </tr>
                  </thead>
                  <tbody className="text-xs sm:text-sm">
                    <tr className="border-b border-[#E6E7E9]">
                      <td className="py-3 px-4"><span className="px-2 py-1 rounded bg-yellow-100 text-yellow-700">PENDING</span></td>
                      <td className="py-3 px-4 text-[#6A6A6A]">New violation awaiting review</td>
                      <td className="py-3 px-4 text-[#6A6A6A]">Review, Clear, Confirm</td>
                    </tr>
                    <tr className="border-b border-[#E6E7E9]">
                      <td className="py-3 px-4"><span className="px-2 py-1 rounded bg-blue-100 text-blue-700">UNDER_REVIEW</span></td>
                      <td className="py-3 px-4 text-[#6A6A6A]">Being actively investigated</td>
                      <td className="py-3 px-4 text-[#6A6A6A]">Clear, Confirm, Escalate</td>
                    </tr>
                    <tr className="border-b border-[#E6E7E9]">
                      <td className="py-3 px-4"><span className="px-2 py-1 rounded bg-green-100 text-green-700">CLEARED</span></td>
                      <td className="py-3 px-4 text-[#6A6A6A]">False positive, no action needed</td>
                      <td className="py-3 px-4 text-[#6A6A6A]">Final state</td>
                    </tr>
                    <tr className="border-b border-[#E6E7E9]">
                      <td className="py-3 px-4"><span className="px-2 py-1 rounded bg-orange-100 text-orange-700">CONFIRMED</span></td>
                      <td className="py-3 px-4 text-[#6A6A6A]">Verified as legitimate violation</td>
                      <td className="py-3 px-4 text-[#6A6A6A]">Escalate, Report</td>
                    </tr>
                    <tr className="border-b border-[#E6E7E9]">
                      <td className="py-3 px-4"><span className="px-2 py-1 rounded bg-red-100 text-red-700">ESCALATED</span></td>
                      <td className="py-3 px-4 text-[#6A6A6A]">Escalated to senior compliance</td>
                      <td className="py-3 px-4 text-[#6A6A6A]">Confirm, Report</td>
                    </tr>
                    <tr className="border-b border-[#E6E7E9]">
                      <td className="py-3 px-4"><span className="px-2 py-1 rounded bg-purple-100 text-purple-700">REPORTED</span></td>
                      <td className="py-3 px-4 text-[#6A6A6A]">Included in compliance report</td>
                      <td className="py-3 px-4 text-[#6A6A6A]">Final state</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h3 className="text-base sm:text-lg font-semibold mt-6 mb-3">Violation Severity</h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="p-4 rounded-lg bg-blue-50 border border-blue-200 text-center">
                  <span className="px-2 py-1 rounded bg-blue-100 text-blue-700 font-semibold text-xs">INFO</span>
                  <p className="text-xs text-blue-600 mt-2">Informational</p>
                </div>
                <div className="p-4 rounded-lg bg-yellow-50 border border-yellow-200 text-center">
                  <span className="px-2 py-1 rounded bg-yellow-100 text-yellow-700 font-semibold text-xs">WARNING</span>
                  <p className="text-xs text-yellow-600 mt-2">Needs attention</p>
                </div>
                <div className="p-4 rounded-lg bg-red-50 border border-red-200 text-center">
                  <span className="px-2 py-1 rounded bg-red-100 text-red-700 font-semibold text-xs">CRITICAL</span>
                  <p className="text-xs text-red-600 mt-2">Urgent action</p>
                </div>
              </div>
            </section>

            {/* Reports */}
            <section id="reports" className="mb-10 sm:mb-16">
              <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 pb-2 border-b border-[#E6E7E9]">Compliance Reports</h2>
              <p className="text-[#6A6A6A] mb-4 text-sm sm:text-base">
                Generate regulatory reports at{' '}
                <code className="px-2 py-1 rounded bg-[#F5F6F7] text-[#2855FF] text-xs">/compliance/reports</code>.
              </p>

              <h3 className="text-base sm:text-lg font-semibold mt-6 mb-3">Report Types</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div className="p-4 rounded-lg bg-[#F5F6F7] border border-[#E6E7E9]">
                  <h4 className="font-semibold mb-1 text-sm">Monthly Report</h4>
                  <p className="text-xs text-[#6A6A6A]">Summary of all compliance activity for a calendar month</p>
                </div>
                <div className="p-4 rounded-lg bg-[#F5F6F7] border border-[#E6E7E9]">
                  <h4 className="font-semibold mb-1 text-sm">Quarterly Report</h4>
                  <p className="text-xs text-[#6A6A6A]">Comprehensive quarterly compliance overview (Standard+)</p>
                </div>
              </div>

              <h3 className="text-base sm:text-lg font-semibold mt-6 mb-3">Report Contents</h3>
              <div className="bg-[#0D0D0D] rounded-lg p-4 mb-6 overflow-x-auto">
                <pre className="text-xs sm:text-sm text-gray-300">
{`{
  "summary": {
    "totalViolations": 42,
    "violationsByType": { "VELOCITY_LIMIT": 25, "VOLUME_LIMIT": 17 },
    "violationsBySeverity": { "CRITICAL": 2, "WARNING": 25, "INFO": 15 },
    "violationsByStatus": { "CONFIRMED": 15, "CLEARED": 17, "PENDING": 10 },
    "accountsWithViolations": 8,
    "newAccountsMonitored": 2,
    "riskScoreDistribution": { "low": 45, "medium": 32, "high": 8 }
  },
  "metrics": {
    "transactionsScanned": 15000,
    "accountsScanned": 85,
    "rulesEvaluated": 12,
    "sanctionsChecks": 5,
    "cyclesDetected": 0
  }
}`}
                </pre>
              </div>

              <h3 className="text-base sm:text-lg font-semibold mt-6 mb-3">Export Formats</h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="p-4 rounded-lg bg-[#F5F6F7] border border-[#E6E7E9] text-center">
                  <code className="text-[#2855FF]">JSON</code>
                  <p className="text-xs text-[#6A6A6A] mt-1">Structured data</p>
                </div>
                <div className="p-4 rounded-lg bg-[#F5F6F7] border border-[#E6E7E9] text-center">
                  <code className="text-[#2855FF]">CSV</code>
                  <p className="text-xs text-[#6A6A6A] mt-1">Spreadsheet format</p>
                </div>
                <div className="p-4 rounded-lg bg-[#F5F6F7] border border-[#E6E7E9] text-center">
                  <code className="text-[#2855FF]">PDF</code>
                  <p className="text-xs text-[#6A6A6A] mt-1">Printable report</p>
                </div>
              </div>
            </section>

            {/* Audit Log */}
            <section id="audit-log" className="mb-10 sm:mb-16">
              <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 pb-2 border-b border-[#E6E7E9]">Audit Log</h2>
              <p className="text-[#6A6A6A] mb-4 text-sm sm:text-base">
                View the immutable audit trail at{' '}
                <code className="px-2 py-1 rounded bg-[#F5F6F7] text-[#2855FF] text-xs">/compliance/audit</code>.
                All compliance actions are recorded with cryptographic verification.
              </p>

              <h3 className="text-base sm:text-lg font-semibold mt-6 mb-3">Audit Entry Structure</h3>
              <div className="bg-[#0D0D0D] rounded-lg p-4 mb-6 overflow-x-auto">
                <pre className="text-xs sm:text-sm text-gray-300">
{`{
  "id": "audit_456",
  "action": "CONFIRM",
  "entityType": "violation",
  "entityId": "vio_123",
  "actorType": "USER",
  "actorEmail": "compliance@example.com",
  "timestamp": "2026-02-13T14:00:00Z",
  "contentHash": "e3b0c44298fc1c149...",
  "chainValid": true,
  "previousState": {
    "status": "PENDING"
  },
  "newState": {
    "status": "CONFIRMED",
    "reviewedBy": "compliance@example.com"
  }
}`}
                </pre>
              </div>

              <h3 className="text-base sm:text-lg font-semibold mt-6 mb-3">Audit Actions</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                <div className="p-3 rounded-lg bg-green-50 border border-green-200 text-center">
                  <code className="text-xs text-green-700">CREATE</code>
                </div>
                <div className="p-3 rounded-lg bg-blue-50 border border-blue-200 text-center">
                  <code className="text-xs text-blue-700">UPDATE</code>
                </div>
                <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-center">
                  <code className="text-xs text-red-700">DELETE</code>
                </div>
                <div className="p-3 rounded-lg bg-purple-50 border border-purple-200 text-center">
                  <code className="text-xs text-purple-700">REVIEW</code>
                </div>
                <div className="p-3 rounded-lg bg-orange-50 border border-orange-200 text-center">
                  <code className="text-xs text-orange-700">ESCALATE</code>
                </div>
                <div className="p-3 rounded-lg bg-green-50 border border-green-200 text-center">
                  <code className="text-xs text-green-700">CLEAR</code>
                </div>
                <div className="p-3 rounded-lg bg-yellow-50 border border-yellow-200 text-center">
                  <code className="text-xs text-yellow-700">CONFIRM</code>
                </div>
                <div className="p-3 rounded-lg bg-indigo-50 border border-indigo-200 text-center">
                  <code className="text-xs text-indigo-700">REPORT</code>
                </div>
                <div className="p-3 rounded-lg bg-gray-50 border border-gray-200 text-center">
                  <code className="text-xs text-gray-700">EXPORT</code>
                </div>
              </div>

              <h3 className="text-base sm:text-lg font-semibold mt-6 mb-3">Hash Chain Verification</h3>
              <div className="p-4 rounded-lg bg-blue-50 border border-blue-200">
                <div className="flex items-center gap-2 mb-2">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <span className="font-semibold text-blue-700 text-sm">Cryptographic Integrity</span>
                </div>
                <p className="text-xs sm:text-sm text-blue-700">
                  Each audit entry contains a SHA256 hash of its content plus the previous entry&apos;s hash,
                  creating an immutable chain. Any tampering or deletion is immediately detectable.
                </p>
              </div>
            </section>

            {/* How to Add an Account */}
            <section id="add-account" className="mb-10 sm:mb-16">
              <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 pb-2 border-b border-[#E6E7E9]">How to Add an Account</h2>
              <p className="text-[#6A6A6A] mb-4 text-sm sm:text-base">
                Follow these steps to add a Stellar account for compliance monitoring.
              </p>

              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-[#F5F6F7] border border-[#E6E7E9]">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="w-6 h-6 rounded-full bg-[#2855FF] text-white text-xs flex items-center justify-center font-bold">1</span>
                    <h4 className="font-semibold text-sm">Navigate to Accounts</h4>
                  </div>
                  <p className="text-xs text-[#6A6A6A] ml-9">Go to <code className="px-1 py-0.5 rounded bg-white text-[#2855FF]">/compliance/accounts</code> and click the &quot;Add Account&quot; button.</p>
                </div>

                <div className="p-4 rounded-lg bg-[#F5F6F7] border border-[#E6E7E9]">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="w-6 h-6 rounded-full bg-[#2855FF] text-white text-xs flex items-center justify-center font-bold">2</span>
                    <h4 className="font-semibold text-sm">Enter Account Details</h4>
                  </div>
                  <div className="ml-9 text-xs text-[#6A6A6A]">
                    <p className="mb-2">Fill in the form:</p>
                    <ul className="list-disc list-inside space-y-1">
                      <li><strong>Stellar Account ID</strong> (required): Must start with &quot;G&quot; and be 56 characters</li>
                      <li><strong>Label</strong> (optional): A friendly name like &quot;Company Treasury&quot;</li>
                    </ul>
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-[#F5F6F7] border border-[#E6E7E9]">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="w-6 h-6 rounded-full bg-[#2855FF] text-white text-xs flex items-center justify-center font-bold">3</span>
                    <h4 className="font-semibold text-sm">Submit</h4>
                  </div>
                  <p className="text-xs text-[#6A6A6A] ml-9">Click &quot;Add Account&quot;. The account will be added with STANDARD monitoring level and an initial risk assessment.</p>
                </div>
              </div>

              <h3 className="text-base sm:text-lg font-semibold mt-6 mb-3">API Method</h3>
              <div className="bg-[#0D0D0D] rounded-lg p-4 overflow-x-auto">
                <pre className="text-xs sm:text-sm text-gray-300">
{`POST /api/compliance/accounts
Content-Type: application/json

{
  "accountId": "GABC...XYZ",
  "label": "Company Treasury"
}

Response (201):
{
  "id": "acc_123",
  "accountId": "GABC...XYZ",
  "label": "Company Treasury",
  "monitoringLevel": "STANDARD",
  "riskScore": 0,
  "addedAt": "2026-02-13T12:00:00Z"
}`}
                </pre>
              </div>

              <div className="p-4 rounded-lg bg-yellow-50 border border-yellow-200 mt-4">
                <div className="flex items-center gap-2 mb-2">
                  <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <span className="font-semibold text-yellow-700 text-sm">Account Limit</span>
                </div>
                <p className="text-xs sm:text-sm text-yellow-700">
                  Each tier has a maximum number of monitored accounts. Check your limits on the dashboard before adding accounts.
                </p>
              </div>
            </section>

            {/* How to Create a Rule */}
            <section id="create-rule" className="mb-10 sm:mb-16">
              <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 pb-2 border-b border-[#E6E7E9]">How to Create a Rule</h2>
              <p className="text-[#6A6A6A] mb-4 text-sm sm:text-base">
                Follow these steps to create a custom compliance rule.
              </p>

              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-[#F5F6F7] border border-[#E6E7E9]">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="w-6 h-6 rounded-full bg-[#2855FF] text-white text-xs flex items-center justify-center font-bold">1</span>
                    <h4 className="font-semibold text-sm">Navigate to Rules</h4>
                  </div>
                  <p className="text-xs text-[#6A6A6A] ml-9">Go to <code className="px-1 py-0.5 rounded bg-white text-[#2855FF]">/compliance/rules</code> and click &quot;Create Rule&quot;.</p>
                </div>

                <div className="p-4 rounded-lg bg-[#F5F6F7] border border-[#E6E7E9]">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="w-6 h-6 rounded-full bg-[#2855FF] text-white text-xs flex items-center justify-center font-bold">2</span>
                    <h4 className="font-semibold text-sm">Enter Basic Information</h4>
                  </div>
                  <div className="ml-9 text-xs text-[#6A6A6A]">
                    <ul className="list-disc list-inside space-y-1">
                      <li><strong>Name</strong> (required): A descriptive name like &quot;Daily Volume Limit&quot;</li>
                      <li><strong>Description</strong>: Explain what the rule detects</li>
                      <li><strong>Rule Type</strong>: Select from available types for your tier</li>
                    </ul>
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-[#F5F6F7] border border-[#E6E7E9]">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="w-6 h-6 rounded-full bg-[#2855FF] text-white text-xs flex items-center justify-center font-bold">3</span>
                    <h4 className="font-semibold text-sm">Configure Conditions</h4>
                  </div>
                  <p className="text-xs text-[#6A6A6A] ml-9">Set the rule-specific conditions. These vary by rule type (see Rule Types section below).</p>
                </div>

                <div className="p-4 rounded-lg bg-[#F5F6F7] border border-[#E6E7E9]">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="w-6 h-6 rounded-full bg-[#2855FF] text-white text-xs flex items-center justify-center font-bold">4</span>
                    <h4 className="font-semibold text-sm">Set Options</h4>
                  </div>
                  <div className="ml-9 text-xs text-[#6A6A6A]">
                    <ul className="list-disc list-inside space-y-1">
                      <li><strong>Severity</strong>: INFO, WARNING, or CRITICAL</li>
                      <li><strong>Priority</strong>: 1-100 (higher = evaluated first)</li>
                      <li><strong>Require Review</strong>: Enable for manual review of violations</li>
                      <li><strong>Auto-Block</strong>: Automatically restrict account on violation</li>
                    </ul>
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-[#F5F6F7] border border-[#E6E7E9]">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="w-6 h-6 rounded-full bg-[#2855FF] text-white text-xs flex items-center justify-center font-bold">5</span>
                    <h4 className="font-semibold text-sm">Save Rule</h4>
                  </div>
                  <p className="text-xs text-[#6A6A6A] ml-9">Click &quot;Create Rule&quot;. The rule will be enabled immediately and start evaluating monitored accounts.</p>
                </div>
              </div>

              <h3 className="text-base sm:text-lg font-semibold mt-6 mb-3">API Method</h3>
              <div className="bg-[#0D0D0D] rounded-lg p-4 overflow-x-auto">
                <pre className="text-xs sm:text-sm text-gray-300">
{`POST /api/compliance/rules
Content-Type: application/json

{
  "name": "High Volume Alert",
  "description": "Alert on transactions over $100K/day",
  "ruleType": "VOLUME_LIMIT",
  "conditions": {
    "maxAmountPerDay": 100000
  },
  "severity": "WARNING",
  "priority": 75,
  "requireReview": true,
  "autoBlock": false,
  "enabled": true
}

Response (201):
{
  "id": "rule_123",
  "name": "High Volume Alert",
  ...
}`}
                </pre>
              </div>
            </section>

            {/* Review a Violation */}
            <section id="review-violation" className="mb-10 sm:mb-16">
              <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 pb-2 border-b border-[#E6E7E9]">How to Review a Violation</h2>
              <p className="text-[#6A6A6A] mb-4 text-sm sm:text-base">
                Follow these steps to review and resolve a compliance violation.
              </p>

              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-[#F5F6F7] border border-[#E6E7E9]">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="w-6 h-6 rounded-full bg-[#2855FF] text-white text-xs flex items-center justify-center font-bold">1</span>
                    <h4 className="font-semibold text-sm">View Violation Details</h4>
                  </div>
                  <p className="text-xs text-[#6A6A6A] ml-9">Click on a violation to view full details including match data, evidence, and audit trail.</p>
                </div>

                <div className="p-4 rounded-lg bg-[#F5F6F7] border border-[#E6E7E9]">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="w-6 h-6 rounded-full bg-[#2855FF] text-white text-xs flex items-center justify-center font-bold">2</span>
                    <h4 className="font-semibold text-sm">Analyze Evidence</h4>
                  </div>
                  <p className="text-xs text-[#6A6A6A] ml-9">Review the match details, transaction data, and account context to determine if the violation is valid.</p>
                </div>

                <div className="p-4 rounded-lg bg-[#F5F6F7] border border-[#E6E7E9]">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="w-6 h-6 rounded-full bg-[#2855FF] text-white text-xs flex items-center justify-center font-bold">3</span>
                    <h4 className="font-semibold text-sm">Update Status</h4>
                  </div>
                  <div className="ml-9 text-xs text-[#6A6A6A]">
                    <p className="mb-2">Choose the appropriate action:</p>
                    <ul className="list-disc list-inside space-y-1">
                      <li><strong>Clear</strong>: False positive, no further action</li>
                      <li><strong>Confirm</strong>: Valid violation, needs resolution</li>
                      <li><strong>Escalate</strong>: Requires senior review</li>
                    </ul>
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-[#F5F6F7] border border-[#E6E7E9]">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="w-6 h-6 rounded-full bg-[#2855FF] text-white text-xs flex items-center justify-center font-bold">4</span>
                    <h4 className="font-semibold text-sm">Add Resolution Notes</h4>
                  </div>
                  <p className="text-xs text-[#6A6A6A] ml-9">Document your findings and any actions taken. This is recorded in the audit log.</p>
                </div>
              </div>
            </section>

            {/* API Reference */}
            <section id="api-reference" className="mb-10 sm:mb-16">
              <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 pb-2 border-b border-[#E6E7E9]">API Reference</h2>

              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-[#F5F6F7] border border-[#E6E7E9]">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="px-2 py-1 rounded bg-green-100 text-green-700 font-mono text-xs">GET</span>
                    <code className="text-[#6A6A6A] text-sm">/api/compliance/status</code>
                  </div>
                  <p className="text-xs text-[#6A6A6A]">Get compliance status, tier info, and metrics</p>
                </div>

                <div className="p-4 rounded-lg bg-[#F5F6F7] border border-[#E6E7E9]">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="px-2 py-1 rounded bg-green-100 text-green-700 font-mono text-xs">GET</span>
                    <span className="px-2 py-1 rounded bg-[#2855FF]/10 text-[#2855FF] font-mono text-xs">POST</span>
                    <code className="text-[#6A6A6A] text-sm">/api/compliance/accounts</code>
                  </div>
                  <p className="text-xs text-[#6A6A6A]">List or add monitored accounts</p>
                </div>

                <div className="p-4 rounded-lg bg-[#F5F6F7] border border-[#E6E7E9]">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="px-2 py-1 rounded bg-green-100 text-green-700 font-mono text-xs">GET</span>
                    <span className="px-2 py-1 rounded bg-[#2855FF]/10 text-[#2855FF] font-mono text-xs">POST</span>
                    <code className="text-[#6A6A6A] text-sm">/api/compliance/rules</code>
                  </div>
                  <p className="text-xs text-[#6A6A6A]">List or create compliance rules</p>
                </div>

                <div className="p-4 rounded-lg bg-[#F5F6F7] border border-[#E6E7E9]">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="px-2 py-1 rounded bg-green-100 text-green-700 font-mono text-xs">GET</span>
                    <code className="text-[#6A6A6A] text-sm">/api/compliance/violations</code>
                  </div>
                  <p className="text-xs text-[#6A6A6A]">List violations with filters (status, severity, date range)</p>
                </div>

                <div className="p-4 rounded-lg bg-[#F5F6F7] border border-[#E6E7E9]">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="px-2 py-1 rounded bg-yellow-100 text-yellow-700 font-mono text-xs">PUT</span>
                    <code className="text-[#6A6A6A] text-sm">/api/compliance/violations/&#123;id&#125;</code>
                  </div>
                  <p className="text-xs text-[#6A6A6A]">Update violation status, add resolution/notes</p>
                </div>

                <div className="p-4 rounded-lg bg-[#F5F6F7] border border-[#E6E7E9]">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="px-2 py-1 rounded bg-green-100 text-green-700 font-mono text-xs">GET</span>
                    <span className="px-2 py-1 rounded bg-[#2855FF]/10 text-[#2855FF] font-mono text-xs">POST</span>
                    <code className="text-[#6A6A6A] text-sm">/api/compliance/reports</code>
                  </div>
                  <p className="text-xs text-[#6A6A6A]">List or generate compliance reports</p>
                </div>

                <div className="p-4 rounded-lg bg-[#F5F6F7] border border-[#E6E7E9]">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="px-2 py-1 rounded bg-green-100 text-green-700 font-mono text-xs">GET</span>
                    <code className="text-[#6A6A6A] text-sm">/api/compliance/audit</code>
                  </div>
                  <p className="text-xs text-[#6A6A6A]">List audit log entries with filters</p>
                </div>
              </div>
            </section>

            {/* Rule Types */}
            <section id="rule-types" className="mb-10 sm:mb-16">
              <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 pb-2 border-b border-[#E6E7E9]">Rule Types Reference</h2>
              <p className="text-[#6A6A6A] mb-4 text-sm sm:text-base">
                10 rule evaluator types are available, with availability based on your tier.
              </p>

              <div className="space-y-4">
                {/* Basic Tier Rules */}
                <div className="p-4 rounded-lg bg-gray-50 border border-gray-200">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-2 py-1 rounded bg-gray-200 text-gray-700 text-xs font-medium">BASIC TIER</span>
                  </div>

                  <div className="space-y-3">
                    <div className="p-3 rounded bg-white border border-gray-200">
                      <h4 className="font-semibold text-sm mb-1">VELOCITY_LIMIT</h4>
                      <p className="text-xs text-[#6A6A6A] mb-2">Monitor transaction frequency</p>
                      <code className="text-xs text-[#6A6A6A] block">maxTransactionsPerHour, maxTransactionsPerDay, maxTransactionsPerWeek</code>
                    </div>
                    <div className="p-3 rounded bg-white border border-gray-200">
                      <h4 className="font-semibold text-sm mb-1">VOLUME_LIMIT</h4>
                      <p className="text-xs text-[#6A6A6A] mb-2">Monitor transaction amounts</p>
                      <code className="text-xs text-[#6A6A6A] block">maxAmountPerTransaction, maxAmountPerDay, assetCode</code>
                    </div>
                    <div className="p-3 rounded bg-white border border-gray-200">
                      <h4 className="font-semibold text-sm mb-1">DORMANT_ACTIVATION</h4>
                      <p className="text-xs text-[#6A6A6A] mb-2">Alert on dormant account activation</p>
                      <code className="text-xs text-[#6A6A6A] block">dormantDays, minActivityThreshold</code>
                    </div>
                  </div>
                </div>

                {/* Standard Tier Rules */}
                <div className="p-4 rounded-lg bg-blue-50 border border-blue-200">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-2 py-1 rounded bg-blue-200 text-blue-700 text-xs font-medium">STANDARD TIER</span>
                  </div>

                  <div className="space-y-3">
                    <div className="p-3 rounded bg-white border border-blue-200">
                      <h4 className="font-semibold text-sm mb-1">SANCTIONS_SCREENING</h4>
                      <p className="text-xs text-[#6A6A6A] mb-2">Check against OFAC/SDN lists</p>
                      <code className="text-xs text-[#6A6A6A] block">sources (OFAC, SDN, EU, UN), checkCounterparties</code>
                    </div>
                    <div className="p-3 rounded bg-white border border-blue-200">
                      <h4 className="font-semibold text-sm mb-1">CIRCULAR_PAYMENT</h4>
                      <p className="text-xs text-[#6A6A6A] mb-2">Detect circular payment patterns</p>
                      <code className="text-xs text-[#6A6A6A] block">minHops, maxHops, timeWindowMinutes, minAmount</code>
                    </div>
                    <div className="p-3 rounded bg-white border border-blue-200">
                      <h4 className="font-semibold text-sm mb-1">MIXER_DETECTION</h4>
                      <p className="text-xs text-[#6A6A6A] mb-2">Identify potential mixer services</p>
                      <code className="text-xs text-[#6A6A6A] block">mixerThreshold, timeWindow</code>
                    </div>
                    <div className="p-3 rounded bg-white border border-blue-200">
                      <h4 className="font-semibold text-sm mb-1">UNUSUAL_PATTERN</h4>
                      <p className="text-xs text-[#6A6A6A] mb-2">ML-based anomaly detection</p>
                      <code className="text-xs text-[#6A6A6A] block">sensitivity (low/medium/high), lookbackDays</code>
                    </div>
                    <div className="p-3 rounded bg-white border border-blue-200">
                      <h4 className="font-semibold text-sm mb-1">COUNTERPARTY_RISK</h4>
                      <p className="text-xs text-[#6A6A6A] mb-2">Assess counterparty risk</p>
                      <code className="text-xs text-[#6A6A6A] block">minRiskScore, includeIndirect</code>
                    </div>
                  </div>
                </div>

                {/* Enterprise Tier Rules */}
                <div className="p-4 rounded-lg bg-purple-50 border border-purple-200">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-2 py-1 rounded bg-purple-200 text-purple-700 text-xs font-medium">ENTERPRISE TIER</span>
                  </div>

                  <div className="space-y-3">
                    <div className="p-3 rounded bg-white border border-purple-200">
                      <h4 className="font-semibold text-sm mb-1">CONTRACT_ABUSE</h4>
                      <p className="text-xs text-[#6A6A6A] mb-2">Monitor Soroban contract abuse</p>
                      <code className="text-xs text-[#6A6A6A] block">contractIds, functionNames, gasThreshold</code>
                    </div>
                    <div className="p-3 rounded bg-white border border-purple-200">
                      <h4 className="font-semibold text-sm mb-1">STRUCTURING</h4>
                      <p className="text-xs text-[#6A6A6A] mb-2">Detect transaction structuring</p>
                      <code className="text-xs text-[#6A6A6A] block">reportingThreshold, timeWindowHours, minTransactions</code>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Support */}
            <section className="p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-[#2855FF] text-white">
              <h2 className="text-lg sm:text-xl font-bold mb-2">Enterprise Compliance</h2>
              <p className="text-white/80 mb-4 text-sm sm:text-base">Need custom compliance rules or dedicated support? Contact us about Enterprise plans.</p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <Link href="/compliance" className="px-4 py-2 rounded-lg bg-white text-[#2855FF] text-sm font-medium hover:bg-gray-100 transition-colors text-center">
                  Go to Compliance
                </Link>
                <a href="mailto:enterprise@lumenquery.io" className="px-4 py-2 rounded-lg bg-white/20 text-white text-sm font-medium hover:bg-white/30 transition-colors text-center">
                  Contact Enterprise Sales
                </a>
              </div>
            </section>
          </main>
        </div>
      </div>

      <Footer />
    </div>
  );
}
