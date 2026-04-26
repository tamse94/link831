import { NextResponse } from 'next/server';

export function middleware(request) {
  const url = request.nextUrl;
  
  // Ambil nilai dari parameter ?q=
  const targetUrl = url.searchParams.get('q');

  // Kalau tidak ada parameter ?q= (misal user cuma buka web utamanya saja)
  if (!targetUrl) {
    return NextResponse.next();
  }

  // Bersihkan URL dari http:// atau https://
  // Ini PENTING karena format intent:// tidak boleh mengandung https:// lagi di tengahnya
  const cleanUrl = targetUrl.replace(/^https?:\/\//, '');

  // Cek User-Agent dari pengunjung
  const userAgent = request.headers.get('user-agent') || '';
  const isFacebook = userAgent.includes('FBAN') || userAgent.includes('FBAV');

  if (isFacebook) {
    // JIKA DARI FACEBOOK: Tendang ke Chrome
    const intentUrl = `intent://${cleanUrl}#Intent;scheme=https;package=com.android.chrome;end`;
    return NextResponse.redirect(intentUrl);
  }

  // JIKA BUKAN DARI FACEBOOK: Redirect biasa
  // Kita pastikan link tujuan punya https:// agar valid
  const finalUrl = targetUrl.startsWith('http') ? targetUrl : `https://${targetUrl}`;
  return NextResponse.redirect(finalUrl);
}

// Atur middleware agar hanya berjalan di halaman utama (root)
export const config = {
  matcher: '/',
};
