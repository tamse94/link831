"use client";

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

function RedirectHandler() {
  const searchParams = useSearchParams();
  const targetUrl = searchParams.get('q');
  const [isFb, setIsFb] = useState(false);

  useEffect(() => {
    if (!targetUrl) return;

    // Deteksi Facebook
    const ua = navigator.userAgent || navigator.vendor || window.opera;
    const isFacebook = ua.includes('FBAN') || ua.includes('FBAV');

    if (isFacebook) {
      // Jika dari FB, tampilkan layar petunjuk
      setIsFb(true);
    } else {
      // Jika sudah di Chrome/browser luar, langsung jalankan link offer!
      const normalUrl = targetUrl.startsWith('http') ? targetUrl : `https://${targetUrl}`;
      window.location.replace(normalUrl);
    }
  }, [targetUrl]);

  if (!targetUrl) {
    return (
      <div style={{ textAlign: 'center', marginTop: '100px', fontFamily: 'sans-serif' }}>
        <h2>Sistem Siap 🚀</h2>
        <p>Gunakan format: <code>/?q=tes.com</code></p>
      </div>
    );
  }

  // TAMPILAN JIKA DIBUKA DI DALAM FACEBOOK
  if (isFb) {
    return (
      <div style={{ 
        position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.9)', // Latar belakang gelap agar fokus
        color: 'white',
        fontFamily: 'sans-serif',
        zIndex: 9999,
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
        {/* Panah menunjuk ke pojok kanan atas (menu FB) */}
        <div style={{ position: 'absolute', top: '10px', right: '20px', fontSize: '50px', transform: 'rotate(-45deg)' }}>
          ↗️
        </div>
        
        <div style={{ marginTop: '120px', textAlign: 'center', maxWidth: '300px' }}>
          <h2 style={{ color: '#ff4757', marginBottom: '10px' }}>Tindakan Diperlukan!</h2>
          <p style={{ fontSize: '18px', lineHeight: '1.5' }}>
            Untuk melihat halaman ini dengan aman, ikuti langkah berikut:
          </p>
          <div style={{ background: '#333', padding: '15px', borderRadius: '8px', textAlign: 'left', marginTop: '20px' }}>
            <p>1. Klik ikon <b>titik tiga</b> di pojok kanan atas.</p>
            <p>2. Pilih menu <b>"Buka di Chrome"</b> atau <b>"Buka di Browser Sistem"</b>.</p>
          </div>
        </div>
      </div>
    );
  }

  // Layar loading sebentar
  return <div style={{ textAlign: 'center', marginTop: '50px' }}>Memproses link...</div>;
}

export default function Home() {
  return (
    <Suspense fallback={<div style={{ textAlign: 'center', marginTop: '50px' }}>Loading...</div>}>
      <RedirectHandler />
    </Suspense>
  );
}
