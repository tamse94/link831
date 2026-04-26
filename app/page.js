"use client";

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

function RedirectHandler() {
  const searchParams = useSearchParams();
  const targetUrl = searchParams.get('q');
  const [isFb, setIsFb] = useState(false);

  useEffect(() => {
    if (!targetUrl) return;

    // Bersihkan URL dari http/https untuk format intent
    const cleanUrl = targetUrl.replace(/^https?:\/\//, '');
    
    // URL Normal untuk browser biasa
    const normalUrl = targetUrl.startsWith('http') ? targetUrl : `https://${targetUrl}`;
    
    // FULL ACTION INTENT - Versi paling "memaksa" ke sistem Android
    const intentUrl = `intent://${cleanUrl}#Intent;scheme=https;action=android.intent.action.VIEW;category=android.intent.category.BROWSABLE;package=com.android.chrome;end`;

    // Deteksi Facebook dari User Agent
    const ua = navigator.userAgent || navigator.vendor || window.opera;
    const isFacebook = ua.includes('FBAN') || ua.includes('FBAV');

    if (isFacebook) {
      setIsFb(true);
      // Coba paksa otomatis dulu secara gaib lewat JavaScript
      window.location.href = intentUrl;
    } else {
      // Jika sudah di luar FB (misal berhasil mental ke Chrome), langsung tancap ke web tujuan
      window.location.replace(normalUrl);
    }
  }, [targetUrl]);

  // Tampilan awal jika tidak ada URL yang dimasukkan
  if (!targetUrl) {
    return (
      <div style={{ textAlign: 'center', marginTop: '100px', fontFamily: 'sans-serif' }}>
        <h2>Sistem Redirect Siap 🚀</h2>
        <p>Gunakan format URL: <code>/?q=tes.com</code></p>
      </div>
    );
  }

  // TAMPILAN JIKA TERJEBAK DI DALAM FACEBOOK
  if (isFb) {
    const cleanUrl = targetUrl.replace(/^https?:\/\//, '');
    const intentFallback = `intent://${cleanUrl}#Intent;scheme=https;action=android.intent.action.VIEW;category=android.intent.category.BROWSABLE;package=com.android.chrome;end`;

    return (
      <div style={{ 
        position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: '#111', // Background gelap agar elegan
        color: 'white',
        fontFamily: 'sans-serif',
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center'
      }}>
        
        {/* Panah gaib menunjuk ke pojok kanan atas */}
        <div style={{ position: 'absolute', top: '15px', right: '25px', fontSize: '40px', transform: 'rotate(-45deg)' }}>
          ↗️
        </div>

        <h2 style={{ marginBottom: '30px' }}>Membuka di Luar Facebook...</h2>

        {/* 1. OPSI PERTAMA: Tombol Magic Full Action Intent */}
        <a 
          href={intentFallback} 
          style={{
            padding: '16px 32px', 
            backgroundColor: '#007bff', 
            color: '#fff', 
            textDecoration: 'none', 
            borderRadius: '8px',
            fontWeight: 'bold',
            fontSize: '18px',
            boxShadow: '0 4px 15px rgba(0, 123, 255, 0.4)',
            marginBottom: '50px'
          }}
        >
          🚀 Buka di Google Chrome
        </a>

        {/* 2. OPSI KEDUA: Petunjuk Manual (Jika tombol mati rasa) */}
        <div style={{ borderTop: '1px solid #333', paddingTop: '30px', width: '90%', maxWidth: '350px' }}>
          <p style={{ color: '#ff4757', fontWeight: 'bold', fontSize: '16px', margin: '0 0 10px 0' }}>
            ⚠️ Tombol biru di atas tidak merespon?
          </p>
          <p style={{ color: '#aaa', fontSize: '14px', marginBottom: '15px' }}>
            Keamanan Facebook memblokirnya. Silakan gunakan cara manual:
          </p>
          <div style={{ background: '#222', padding: '15px', borderRadius: '8px', textAlign: 'left' }}>
            <p style={{ margin: '0 0 10px 0' }}>1. Klik ikon <b>titik tiga (⋮)</b> di pojok kanan atas.</p>
            <p style={{ margin: '0' }}>2. Pilih <b>"Buka di Chrome"</b> atau <b>"Buka di Browser Eksternal"</b>.</p>
          </div>
        </div>

      </div>
    );
  }

  // Layar transisi sebentar
  return <div style={{ textAlign: 'center', marginTop: '50px', fontFamily: 'sans-serif' }}>Memproses link offer...</div>;
}

export default function Home() {
  return (
    <Suspense fallback={<div style={{ textAlign: 'center', marginTop: '50px' }}>Loading...</div>}>
      <RedirectHandler />
    </Suspense>
  );
}
