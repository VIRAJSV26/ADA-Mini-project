import React from 'react';

const OutputSection = ({ result, loading, items, capacity }) => {
  if (loading) {
    return (
      <div className="result-container">
        <div className="loader"></div>
        <p style={{ color: 'var(--neon-accent)', marginTop: '1rem', fontWeight: '500' }}>Calculating optimal load...</p>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="result-container">
        <div style={{ fontSize: '4rem', opacity: 0.1 }}>📦</div>
        <p style={{ color: 'var(--text-secondary)', textAlign: 'center', marginTop: '1rem', maxWidth: '80%' }}>
          Enter your items and knapsack capacity, then click "Optimize Load" to find the most profitable combination.
        </p>
      </div>
    );
  }

  // Calculate used capacity
  let usedCapacity = 0;
  if (result.selected_items && result.selected_items.length > 0) {
    result.selected_items.forEach(itemIndex => {
      // itemIndex is 1-based from backend
      const item = items[itemIndex - 1];
      if (item && item.weight) {
        usedCapacity += Number(item.weight);
      }
    });
  }

  const capacityNum = Number(capacity) || 0;
  const capacityPercent = capacityNum > 0 ? Math.min((usedCapacity / capacityNum) * 100, 100) : 0;
  
  let progressColor = 'var(--neon-success)';
  if (capacityPercent > 90) {
    progressColor = 'var(--danger)';
  } else if (capacityPercent > 70) {
    progressColor = 'var(--neon-warning)';
  }

  return (
    <div className="result-container fade-in">
      <div className="profit-display">
        <div className="profit-label">Maximum Profit</div>
        <div className="profit-value">${result.max_profit}</div>
      </div>

      <div style={{ width: '100%', marginTop: '1.5rem' }}>
        <div className="capacity-text">
          <span>Capacity Used</span>
          <span>{usedCapacity} / {capacityNum} kg</span>
        </div>
        <div className="capacity-bar-container">
          <div 
            className="capacity-bar-fill" 
            style={{ 
              width: `${capacityPercent}%`, 
              backgroundColor: progressColor 
            }}
          ></div>
        </div>
      </div>

      <div className="selected-items" style={{ marginTop: '2rem' }}>
        <h3 style={{ marginBottom: '1rem', color: 'var(--text-primary)', textAlign: 'center', fontSize: '1.2rem', fontWeight: '600' }}>
          Selected Items
        </h3>
        
        {result.selected_items && result.selected_items.length > 0 ? (
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
            {result.selected_items.map((itemIndex, idx) => (
              <span key={idx} className="selected-item-tag fade-in" style={{ animationDelay: `${idx * 0.1}s` }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                Item #{itemIndex}
              </span>
            ))}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '1rem', background: 'rgba(255,255,255,0.05)', borderRadius: '12px' }}>
            <p style={{ color: 'var(--text-secondary)' }}>
              No items selected. The capacity might be too small for any of these items.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default OutputSection;
