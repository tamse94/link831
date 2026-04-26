"use client";

import { useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

function RedirectHandler() {
  const searchParams = useSearchParams();
  const targetUrl = searchParams.get('q');

  useEffect(() => {
    if (!targetUrl) return;

    // Bersihkan URL dari http/https untuk format intent
    const cleanUrl = targetUrl.replace(/^https?:\/\//, '');
    const intentUrl = `intent://${cleanUrl}#Intent;scheme=https;package=com.android.chrome;end`;
    
    // Pastikan URL normal punya awalan https://
    const normalUrl = targetUrl.startsWith('http') ? targetUrl : `https://${targetUrl}`;

    // Deteksi Facebook dari User Agent di browser
    const ua = navigator.userAgent || navigator.vendor || window.opera;
    const isFacebook = ua.includes('FBAN') || ua.includes('FBAV');

    if (isFacebook) {
      // JIKA FB: Jalankan intent via JavaScript secara paksa
      window.location.href = intentUrl;
    } else {
      // JIKA BUKAN FB: Arahkan ke link normal
      window.location.replace(normalUrl);
    }
  }, [targetUrl]);

  // Jika tidak ada parameter ?q=
  if (!targetUrl) {
    return (
      <div style={{ textAlign: 'center', marginTop: '100px', fontFamily: 'sans-serif' }}>
        <h2>Sistem Redirect Aktif 🚀</h2>
        <p>Cara penggunaan: <code>/?q=https://link-offer.com</code></p>
      </div>
    );
  }

  // Tampilan sebentar saat di dalam Facebook + Tombol Cadangan
  const cleanUrl = targetUrl.replace(/^https?:\/\//, '');
  const intentFallback = `intent://${cleanUrl}#Intent;scheme=https;package=com.android.chrome;end`;

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column',
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh', 
      fontFamily: 'sans-serif',
      backgroundColor: '#f8f9fa',
      padding: '20px',
      textAlign: 'center'
    }}>
      <h3 style={{ color: '#333' }}>Membuka di luar Facebook...</h3>
      <p style={{ color: '#666', marginBottom: '30px' }}>
        Jika halaman tidak terbuka otomatis, silakan klik tombol di bawah ini:
      </p>
      <a 
        href={intentFallback} 
        style={{
          padding: '15px 30px', 
          backgroundColor: '#007bff', 
          color: '#fff', 
          textDecoration: 'none', 
          borderRadius: '8px',
          fontWeight: 'bold',
          fontSize: '16px',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
        }}
      >
        Buka di Google Chrome
      </a>
    </div>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<div style={{ textAlign: 'center', marginTop: '50px' }}>Loading...</div>}>
      <RedirectHandler />
    </Suspense>
  );
}
