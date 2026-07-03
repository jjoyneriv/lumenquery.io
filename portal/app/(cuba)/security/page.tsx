import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Security at LumenQuery',
  description: 'Learn how LumenQuery approaches API key security, data handling, infrastructure security, abuse protection, and enterprise security reviews.',
  keywords: ['LumenQuery security', 'Stellar API security', 'API key security', 'blockchain data security', 'enterprise security review', 'HTTPS API'],
  alternates: { canonical: 'https://lumenquery.io/security' },
  openGraph: {
    title: 'Security at LumenQuery',
    description: 'Learn how LumenQuery approaches API key security, data handling, infrastructure security, abuse protection, and enterprise security reviews.',
    type: 'website',
    url: 'https://lumenquery.io/security',
  },
  robots: { index: true, follow: true },
};

const securitySections = [
  {
    id: 'api-key-security',
    title: 'API Key Security',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" />
      </svg>
    ),
    points: [
      'API keys are generated using cryptographically secure random number generators',
      'Keys are transmitted exclusively over HTTPS (TLS 1.2+) and never sent in plaintext',
      'API keys can be revoked immediately from the dashboard at any time',
      'Keys are hashed before storage in the database and cannot be retrieved in plaintext after creation',
      'Each API key is scoped to a single user account and cannot access other accounts\' data',
    ],
  },
  {
    id: 'authentication',
    title: 'Authentication',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
      </svg>
    ),
    points: [
      'User sessions are managed via NextAuth.js with JWT tokens and a 7-day expiry',
      'Passwords must be at least 8 characters with uppercase, lowercase, and numeric characters',
      'Passwords are hashed with bcrypt before storage and are never stored in plaintext',
      'Secure, HTTP-only cookies are used in production to prevent XSS-based session theft',
      'Password reset tokens are single-use, expire after 1 hour, and invalidate all existing sessions',
    ],
  },
  {
    id: 'data-handling',
    title: 'Data Handling',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
      </svg>
    ),
    points: [
      'LumenQuery provides read-only access to public blockchain data and does not store private keys, seed phrases, or signing credentials',
      'The platform cannot sign transactions or move funds on behalf of any user',
      'Portfolio features read account balances via the public Horizon API and do not require account authorization',
      'User data (email, usage logs, API keys) is stored in a PostgreSQL database with access restricted to application services only',
      'Redis is used for caching public blockchain data with short TTLs and does not store sensitive user information',
    ],
  },
  {
    id: 'infrastructure',
    title: 'Infrastructure Security',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25" />
      </svg>
    ),
    points: [
      'All traffic is served over HTTPS with TLS certificates managed by Let\'s Encrypt via Traefik',
      'HSTS is enforced with a 1-year max-age, includeSubDomains, and preload directives',
      'Content Security Policy (CSP) restricts script execution, frame embedding, and resource loading',
      'Additional headers include X-Frame-Options: SAMEORIGIN, X-Content-Type-Options: nosniff, and X-XSS-Protection',
      'All services run in isolated Docker containers with no shared file system access',
      'UFW firewall restricts port access to only necessary services, with monitoring ports limited to internal networks',
    ],
  },
  {
    id: 'rate-limiting',
    title: 'Rate Limiting & Abuse Protection',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m0-10.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
    points: [
      'Multi-layer rate limiting is applied at both the Traefik reverse proxy level and the application middleware level',
      'Authentication endpoints have strict limits: 5 signups per hour, 10 sign-ins per minute, 3 password resets per email per hour',
      'General API endpoints are limited to 60 requests per minute for authenticated users',
      'Rate limit responses include Retry-After headers so clients can implement proper backoff',
      'Excessive abuse triggers temporary IP-level blocks at the infrastructure layer',
    ],
  },
  {
    id: 'monitoring',
    title: 'Logging & Monitoring',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605" />
      </svg>
    ),
    points: [
      'Prometheus collects metrics from all application services, databases, and infrastructure components',
      'cAdvisor monitors container-level resource usage including CPU, memory, network, and disk I/O',
      'Dedicated exporters track PostgreSQL query performance and Redis cache health',
      'Admin actions are logged to an immutable audit trail with IP address and user agent information',
      'Access logs are maintained at the Traefik layer for all incoming requests',
    ],
  },
];

const faqs = [
  {
    question: 'Do you store private keys?',
    answer: 'No. LumenQuery never stores private keys, seed phrases, secret keys, or any signing credentials. The platform provides read-only access to public blockchain data. There is no mechanism for LumenQuery to access or control any Stellar account.',
  },
  {
    question: 'Can LumenQuery sign transactions?',
    answer: 'No. LumenQuery is a data infrastructure platform that reads from the Stellar blockchain. It does not have transaction signing capabilities and cannot submit transactions, move funds, or modify any on-chain state on behalf of users.',
  },
  {
    question: 'How are API keys protected?',
    answer: 'API keys are generated using cryptographically secure random number generation, transmitted exclusively over HTTPS, and hashed with bcrypt before database storage. Keys can be revoked instantly from the user dashboard. After initial creation, the plaintext key cannot be retrieved from the system.',
  },
  {
    question: 'Do you support enterprise security reviews?',
    answer: 'Yes. Enterprise customers can request a security review that covers our infrastructure architecture, data handling practices, access controls, and incident response procedures. Contact our sales team at support@lumenquery.io to arrange a review.',
  },
  {
    question: 'Do you provide audit logs?',
    answer: 'Yes. Administrative actions are logged to an immutable audit trail that records the action type, administrator identity, target user, IP address, user agent, and timestamp. API usage is tracked per key with request counts, response times, and data transfer volumes.',
  },
  {
    question: 'What security headers do you set?',
    answer: 'LumenQuery sets HSTS (1 year, includeSubDomains, preload), Content-Security-Policy (strict script and resource loading), X-Frame-Options: SAMEORIGIN, X-Content-Type-Options: nosniff, X-XSS-Protection: 1; mode=block, Referrer-Policy: strict-origin-when-cross-origin, and Permissions-Policy (camera, microphone, and geolocation disabled).',
  },
];

export default function SecurityPage() {
  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Security at LumenQuery',
    description: 'Learn how LumenQuery approaches API key security, data handling, infrastructure security, abuse protection, and enterprise security reviews.',
    url: 'https://lumenquery.io/security',
    publisher: { '@type': 'Organization', name: 'LumenQuery' },
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://lumenquery.io' },
      { '@type': 'ListItem', position: 2, name: 'Security', item: 'https://lumenquery.io/security' },
    ],
  };

  return (
    <>
      <div className="text-white">
        {/* Hero Section */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 pt-8 sm:pt-12 md:pt-16 pb-12">
          <nav className="mb-6 sm:mb-8" aria-label="Breadcrumb">
            <div className="flex items-center gap-2 text-sm text-[#A8A9AD]">
              <Link href="/" className="hover:text-[#7366FF]">Home</Link>
              <span>/</span>
              <span className="text-white">Security</span>
            </div>
          </nav>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Security at LumenQuery
          </h1>
          <p className="text-lg sm:text-xl text-[#A8A9AD] max-w-3xl">
            LumenQuery is designed for secure API access and blockchain data infrastructure.
            We do not store private keys, seed phrases, or signing credentials.
          </p>
        </section>

        {/* Key Principle Banner */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 pb-12">
          <div className="bg-[#262932] border border-[#7366FF]/20 rounded-2xl p-6 sm:p-8">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-[#7366FF]/10 flex items-center justify-center text-[#7366FF]">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                </svg>
              </div>
              <div>
                <h2 className="text-lg font-bold text-white mb-1">Core Security Principle</h2>
                <p className="text-[#A8A9AD]">
                  LumenQuery is a <span className="text-white font-medium">read-only</span> blockchain
                  data platform. It cannot sign transactions, move funds, or access private keys.
                  All data served through our APIs is publicly available on the Stellar network.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Security Sections */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 pb-16">
          <div className="space-y-6">
            {securitySections.map((section) => (
              <div
                key={section.id}
                id={section.id}
                className="bg-[#262932] border border-white/5 rounded-2xl p-6 sm:p-8"
              >
                <div className="flex items-start gap-4 mb-5">
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-[#7366FF]">
                    {section.icon}
                  </div>
                  <h2 className="text-xl font-bold text-white mt-1">{section.title}</h2>
                </div>
                <ul className="space-y-3 ml-14">
                  {section.points.map((point, i) => (
                    <li key={i} className="flex gap-3 text-sm text-[#A8A9AD] leading-relaxed">
                      <span className="text-[#7366FF] flex-shrink-0 mt-0.5">&#8226;</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Responsible Disclosure */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 pb-16">
          <h2 className="text-2xl font-bold mb-6">Responsible Disclosure</h2>

          <div className="bg-[#262932] border border-white/5 rounded-2xl p-6 sm:p-8">
            <p className="text-[#A8A9AD] mb-4 leading-relaxed">
              If you discover a security vulnerability in LumenQuery, we encourage you to report
              it responsibly. Please send details to{' '}
              <a
                href="mailto:support@lumenquery.io"
                className="text-[#7366FF] hover:underline"
              >
                support@lumenquery.io
              </a>{' '}
              with a description of the issue, steps to reproduce, and any relevant technical details.
            </p>
            <ul className="space-y-3 text-sm text-[#A8A9AD]">
              <li className="flex gap-3">
                <span className="text-[#7366FF] flex-shrink-0 mt-0.5">&#8226;</span>
                <span>Please allow us reasonable time to investigate and address the issue before public disclosure</span>
              </li>
              <li className="flex gap-3">
                <span className="text-[#7366FF] flex-shrink-0 mt-0.5">&#8226;</span>
                <span>Do not access or modify data belonging to other users during your research</span>
              </li>
              <li className="flex gap-3">
                <span className="text-[#7366FF] flex-shrink-0 mt-0.5">&#8226;</span>
                <span>We will acknowledge receipt of your report within 48 hours and provide updates on our investigation</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Enterprise Security Review */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 pb-16">
          <h2 className="text-2xl font-bold mb-6">Enterprise Security Review</h2>

          <div className="bg-[#262932] border border-white/5 rounded-2xl p-6 sm:p-8">
            <p className="text-[#A8A9AD] mb-4 leading-relaxed">
              Enterprise customers can request a detailed security review covering LumenQuery&apos;s
              infrastructure architecture, data handling practices, access controls, and incident
              response procedures. Security reviews are available as part of the Enterprise onboarding process.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
              <div className="bg-white/5 rounded-xl p-4">
                <h3 className="font-semibold text-white text-sm mb-2">What the review covers</h3>
                <ul className="space-y-1.5 text-sm text-[#A8A9AD]">
                  <li>Infrastructure architecture and isolation</li>
                  <li>Data flow and storage practices</li>
                  <li>Authentication and authorization model</li>
                  <li>Incident response procedures</li>
                  <li>Third-party dependency management</li>
                </ul>
              </div>
              <div className="bg-white/5 rounded-xl p-4">
                <h3 className="font-semibold text-white text-sm mb-2">How to request</h3>
                <ul className="space-y-1.5 text-sm text-[#A8A9AD]">
                  <li>Contact sales at support@lumenquery.io</li>
                  <li>Specify your compliance requirements</li>
                  <li>Include any questionnaires or frameworks</li>
                  <li>Reviews are typically completed within 2 weeks</li>
                  <li>NDA available upon request</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Security Headers Quick Reference */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 pb-16">
          <h2 className="text-2xl font-bold mb-6">Security Headers</h2>

          <div className="bg-[#262932] border border-white/5 rounded-2xl overflow-hidden">
            <div className="hidden sm:grid grid-cols-12 gap-4 px-6 py-4 border-b border-white/5 text-sm font-semibold text-[#A8A9AD]">
              <div className="col-span-5">Header</div>
              <div className="col-span-7">Value</div>
            </div>

            {[
              { header: 'Strict-Transport-Security', value: 'max-age=31536000; includeSubDomains; preload' },
              { header: 'X-Frame-Options', value: 'SAMEORIGIN' },
              { header: 'X-Content-Type-Options', value: 'nosniff' },
              { header: 'X-XSS-Protection', value: '1; mode=block' },
              { header: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
              { header: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
              { header: 'Content-Security-Policy', value: 'Strict script-src, style-src, img-src, connect-src directives' },
            ].map((row, i, arr) => (
              <div
                key={row.header}
                className={`grid grid-cols-1 sm:grid-cols-12 gap-1 sm:gap-4 px-6 py-3 ${
                  i < arr.length - 1 ? 'border-b border-white/5' : ''
                }`}
              >
                <div className="sm:col-span-5 font-mono text-sm text-white">{row.header}</div>
                <div className="sm:col-span-7 text-sm text-[#A8A9AD] break-all">{row.value}</div>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 pb-16">
          <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>

          <div className="space-y-4">
            {faqs.map((faq) => (
              <div
                key={faq.question}
                className="bg-[#262932] border border-white/5 rounded-2xl p-6"
              >
                <h3 className="font-semibold text-white mb-2">{faq.question}</h3>
                <p className="text-sm text-[#A8A9AD] leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 pb-16 sm:pb-20">
          <div className="bg-[#262932] border border-white/10 rounded-2xl p-8 sm:p-10 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">
              Questions about security?
            </h2>
            <p className="text-[#A8A9AD] max-w-2xl mx-auto mb-6">
              If you have security questions, need a detailed review for your compliance team,
              or want to report a vulnerability, we are here to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/support"
                className="bg-white text-[#7366FF] font-bold px-6 py-3 rounded-xl hover:bg-white/90 transition-colors text-center"
              >
                Contact Us
              </Link>
              <Link
                href="/pricing"
                className="border-2 border-white/30 text-white font-bold px-6 py-3 rounded-xl hover:border-white/50 transition-colors text-center"
              >
                View Enterprise Plan
              </Link>
            </div>
          </div>
        </section>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </>
  );
}
