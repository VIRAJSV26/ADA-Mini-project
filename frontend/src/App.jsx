import { useState } from 'react';
import InputSection from './components/InputSection';
import OutputSection from './components/OutputSection';

function App() {
  const [items, setItems] = useState([{ profit: '', weight: '' }]);
  const [capacity, setCapacity] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleOptimize = async () => {
    // Validate inputs
    if (!capacity || isNaN(capacity) || parseInt(capacity) <= 0) {
      setError('Please enter a valid capacity');
      return;
    }

    const validItems = items.filter(
      (item) => item.profit !== '' && item.weight !== '' && !isNaN(item.profit) && !isNaN(item.weight)
    );

    if (validItems.length === 0) {
      setError('Please enter at least one valid item');
      return;
    }

    setError('');
    setLoading(true);
    setResult(null);

    try {
      const payload = {
        n: validItems.length,
        capacity: parseInt(capacity),
        items: validItems.map((item) => ({
          profit: parseInt(item.profit),
          weight: parseInt(item.weight),
        })),
      };

      const response = await fetch('http://localhost:3000/api/optimize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Failed to optimize');
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError('Error connecting to backend or invalid response');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <div className="glass-card">
        <h1>SmartPack</h1>
        <p style={{ textAlign: 'center', marginBottom: '2rem', color: 'var(--text-secondary)' }}>
          Knapsack Optimizer
        </p>

        <InputSection
          items={items}
          setItems={setItems}
          capacity={capacity}
          setCapacity={setCapacity}
          onOptimize={handleOptimize}
          loading={loading}
        />

        {error && <div style={{ color: 'var(--danger)', marginTop: '1rem', textAlign: 'center' }}>{error}</div>}
      </div>

      <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <OutputSection result={result} loading={loading} />
      </div>
    </div>
  );
}

export default App;
