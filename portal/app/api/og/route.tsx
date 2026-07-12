import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const title = searchParams.get('title') || 'Enterprise Stellar Horizon API & Soroban RPC';
  const subtitle = searchParams.get('subtitle') || 'Build on Stellar with LumenQuery';

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #1D1E26 0%, #262932 50%, #7366FF 150%)',
          padding: '60px 80px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '40px' }}>
          <div
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '12px',
              background: '#7366FF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: '16px',
            }}
          >
            <span style={{ color: 'white', fontSize: '24px', fontWeight: 'bold' }}>L</span>
          </div>
          <span style={{ color: '#A8A9AD', fontSize: '24px', fontWeight: '500' }}>LumenQuery</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', maxWidth: '900px' }}>
          <h1
            style={{
              color: 'white',
              fontSize: '52px',
              fontWeight: 'bold',
              lineHeight: 1.2,
              margin: 0,
            }}
          >
            {title}
          </h1>
          <p style={{ color: '#A8A9AD', fontSize: '24px', marginTop: '20px', lineHeight: 1.4 }}>
            {subtitle}
          </p>
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            position: 'absolute',
            bottom: '60px',
            left: '80px',
            gap: '16px',
          }}
        >
          <span style={{ color: '#7366FF', fontSize: '18px', fontWeight: '600' }}>
            lumenquery.io
          </span>
          <span style={{ color: '#A8A9AD', fontSize: '16px' }}>•</span>
          <span style={{ color: '#A8A9AD', fontSize: '16px' }}>Stellar Infrastructure</span>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
