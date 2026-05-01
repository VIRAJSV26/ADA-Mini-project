import { useState } from 'react';
import InputSection from './components/InputSection';
import OutputSection from './components/OutputSection';

function App() {
  const [items, setItems] = useState([{ profit: '', weight: '' }]);
  const [capacity, setCapacity] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showHowItWorks, setShowHowItWorks] = useState(false);

  const handleOptimize = async () => {
    // Validate inputs
    if (!capacity || isNaN(capacity) || parseInt(capacity) <= 0) {
      setError('Please enter a valid positive capacity');
      return;
    }

    const validItems = items.filter(
      (item) => item.profit !== '' && item.weight !== '' && !isNaN(item.profit) && !isNaN(item.weight) && parseInt(item.profit) > 0 && parseInt(item.weight) > 0
    );

    if (validItems.length === 0) {
      setError('Please enter at least one valid item with positive profit and weight');
      return;
    }

    if (validItems.length !== items.length) {
      setError('Please ensure all entered items have valid positive numbers');
      return;
    }

    setError('');
    setLoading(true);
    setResult(null);

    // Artificial delay for better UX
    await new Promise(resolve => setTimeout(resolve, 1000));

    try {
      const payload = {
        n: validItems.length,
        capacity: parseInt(capacity),
        items: validItems.map((item) => ({
          profit: parseInt(item.profit),
          weight: parseInt(item.weight),
        })),
      };

      const response = await fetch('/api/optimize', {
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

  const loadSampleData = () => {
    setCapacity('20');
    setItems([
      { profit: '100', weight: '10' },
      { profit: '120', weight: '8' },
      { profit: '60', weight: '5' }
    ]);
    setResult(null);
    setError('');
  };

  const handleReset = () => {
    setCapacity('');
    setItems([{ profit: '', weight: '' }]);
    setResult(null);
    setError('');
  };

  return (
    <div className="app-container">
      <div className="glass-card fade-in">
        <h1>SmartPack</h1>
        <p className="subtitle">Knapsack Optimization Tool</p>

        <div className="button-group">
          <button className="btn btn-secondary" onClick={loadSampleData}>
            Load Demo Data
          </button>
          <button className="btn btn-secondary" onClick={handleReset}>
            Reset
          </button>
        </div>

        <InputSection
          items={items}
          setItems={setItems}
          capacity={capacity}
          setCapacity={setCapacity}
          onOptimize={handleOptimize}
          loading={loading}
          result={result}
        />

        {error && <div className="fade-in" style={{ color: 'var(--danger)', marginTop: '1.5rem', textAlign: 'center', background: 'rgba(239, 68, 68, 0.1)', padding: '0.8rem', borderRadius: '8px', border: '1px solid rgba(239, 68, 68, 0.3)' }}>{error}</div>}
      </div>

      <div className="glass-card fade-in" style={{ display: 'flex', flexDirection: 'column', animationDelay: '0.2s' }}>
        <OutputSection result={result} loading={loading} items={items} capacity={capacity} />

        <div className="how-it-works">
          <div className="how-it-works-header" onClick={() => setShowHowItWorks(!showHowItWorks)}>
            <h3 style={{ margin: 0, fontSize: '1.1rem' }}>How the Algorithm Works</h3>
            <span>{showHowItWorks ? '▼' : '▶'}</span>
          </div>
          
          {showHowItWorks && (
            <div className="how-it-works-content fade-in">
              <ol>
                <li><strong>Step 1:</strong> Each item has weight and profit.</li>
                <li><strong>Step 2:</strong> Build a Dynamic Programming (DP) table.</li>
                <li><strong>Step 3:</strong> Calculate the maximum profit for every capacity.</li>
                <li><strong>Step 4:</strong> Backtrack through the table to identify selected items.</li>
              </ol>
              <p><em>This implementation uses dynamic programming to efficiently solve the problem and trace back the optimal selection.</em></p>
            </div>
          )}
        </div>
      </div>
      
      <div style={{ gridColumn: '1 / -1' }}>
        <p className="footer">Built using C (Knapsack Algorithm) + Modern Web UI</p>
      </div>
    </div>
  );
}

export default App;
