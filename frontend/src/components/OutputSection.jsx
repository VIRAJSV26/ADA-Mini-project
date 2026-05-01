import React from 'react';

const OutputSection = ({ result, loading }) => {
  if (loading) {
    return (
      <div className="result-container">
        <div className="loader"></div>
        <p style={{ color: 'var(--neon-accent)' }}>Calculating optimal load...</p>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="result-container">
        <div style={{ fontSize: '4rem', opacity: 0.1 }}>📦</div>
        <p style={{ color: 'var(--text-secondary)', textAlign: 'center' }}>
          Enter items and capacity, then click "Optimize Load" to see the results.
        </p>
      </div>
    );
  }

  return (
    <div className="result-container">
      <div className="profit-display">
        <div className="profit-label">Maximum Profit</div>
        <div className="profit-value">${result.max_profit}</div>
      </div>

      <div className="selected-items" style={{ marginTop: '2rem' }}>
        <h3 style={{ marginBottom: '1rem', color: 'var(--text-primary)', textAlign: 'center' }}>
          Selected Items
        </h3>
        
        {result.selected_items && result.selected_items.length > 0 ? (
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
            {result.selected_items.map((itemIndex, idx) => (
              <span key={idx} className="selected-item-tag">
                Item #{itemIndex}
              </span>
            ))}
          </div>
        ) : (
          <p style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>
            No items could be selected (capacity might be too small).
          </p>
        )}
      </div>
    </div>
  );
};

export default OutputSection;
