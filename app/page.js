export default function Home() {
  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh', 
      fontFamily: 'sans-serif' 
    }}>
      <div style={{ textAlign: 'center', padding: '20px', background: '#fff', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
        <h2>Sistem Redirect Aktif 🚀</h2>
        <p>Cara penggunaan: <code>/?q=https://link-offer.com</code></p>
      </div>
    </div>
  );
}
