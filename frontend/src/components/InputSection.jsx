import React from 'react';

const InputSection = ({ items, setItems, capacity, setCapacity, onOptimize, loading, result }) => {
  const handleAddItem = () => {
    setItems([...items, { profit: '', weight: '' }]);
  };

  const handleRemoveItem = (index) => {
    if (items.length > 1) {
      const newItems = [...items];
      newItems.splice(index, 1);
      setItems(newItems);
    }
  };

  const handleItemChange = (index, field, value) => {
    const newItems = [...items];
    newItems[index][field] = value;
    setItems(newItems);
  };

  const isValidNumber = (val) => {
    if (val === '') return true; // empty is handled separately, just avoid showing error while typing
    const num = Number(val);
    return !isNaN(num) && num > 0;
  };

  return (
    <div>
      <div className="form-group">
        <label>Knapsack Capacity (max weight)</label>
        <input
          type="number"
          placeholder="Enter maximum weight capacity"
          value={capacity}
          onChange={(e) => setCapacity(e.target.value)}
          className={capacity !== '' && !isValidNumber(capacity) ? 'input-error' : ''}
          min="1"
        />
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h2>Items ({items.length})</h2>
        <button className="btn btn-secondary" onClick={handleAddItem} disabled={loading}>
          <span>+</span> Add Item
        </button>
      </div>

      <div className="items-list">
        {items.map((item, index) => {
          const isProfitInvalid = item.profit !== '' && !isValidNumber(item.profit);
          const isWeightInvalid = item.weight !== '' && !isValidNumber(item.weight);
          
          // Check if this item is selected in the result (1-indexed from backend)
          const isSelected = result && result.selected_items && result.selected_items.includes(index + 1);

          return (
            <div key={index} className={`item-row ${isSelected ? 'selected-highlight' : ''}`}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ color: isSelected ? 'var(--neon-success)' : 'var(--text-secondary)', fontWeight: 'bold' }}>#{index + 1}</span>
                {isSelected && (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--neon-success)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ marginTop: '4px' }}>
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                )}
              </div>
              <div className="flex-1">
                <input
                  type="number"
                  placeholder="Profit ($)"
                  value={item.profit}
                  onChange={(e) => handleItemChange(index, 'profit', e.target.value)}
                  className={isProfitInvalid ? 'input-error' : ''}
                  min="1"
                />
              </div>
              <div className="flex-1">
                <input
                  type="number"
                  placeholder="Weight (kg)"
                  value={item.weight}
                  onChange={(e) => handleItemChange(index, 'weight', e.target.value)}
                  className={isWeightInvalid ? 'input-error' : ''}
                  min="1"
                />
              </div>
              {items.length > 1 && (
                <button
                  className="btn btn-danger"
                  style={{ padding: '0.85rem' }}
                  onClick={() => handleRemoveItem(index)}
                  disabled={loading}
                  title="Remove item"
                >
                  ✕
                </button>
              )}
            </div>
          );
        })}
      </div>

      <button className="btn btn-primary btn-full" onClick={onOptimize} disabled={loading}>
        {loading ? (
          <>
            <div className="loader" style={{ width: '20px', height: '20px', borderWidth: '3px' }}></div>
            <span>Optimizing...</span>
          </>
        ) : (
          'Optimize Load'
        )}
      </button>
    </div>
  );
};

export default InputSection;
