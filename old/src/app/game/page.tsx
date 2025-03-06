'use client';

import { useEffect, useState } from 'react';

export default function FutureGamePage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', textAlign: 'center' }}>
        <h1>Future Game</h1>
        {loading ? <p>Loading game details...</p> : <p>Stay tuned for something amazing!</p>}
      </div>
  );
}