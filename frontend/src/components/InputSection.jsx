import React from 'react';

const InputSection = ({ items, setItems, capacity, setCapacity, onOptimize, loading }) => {
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

  return (
    <div>
      <div className="form-group">
        <label>Knapsack Capacity</label>
        <input
          type="number"
          placeholder="Enter maximum weight capacity"
          value={capacity}
          onChange={(e) => setCapacity(e.target.value)}
        />
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h2>Items ({items.length})</h2>
        <button className="btn btn-secondary" onClick={handleAddItem} disabled={loading}>
          + Add Item
        </button>
      </div>

      <div className="items-list">
        {items.map((item, index) => (
          <div key={index} className="item-row">
            <span style={{ color: 'var(--text-secondary)', fontWeight: 'bold' }}>#{index + 1}</span>
            <div className="flex-1">
              <input
                type="number"
                placeholder="Profit ($)"
                value={item.profit}
                onChange={(e) => handleItemChange(index, 'profit', e.target.value)}
              />
            </div>
            <div className="flex-1">
              <input
                type="number"
                placeholder="Weight (kg)"
                value={item.weight}
                onChange={(e) => handleItemChange(index, 'weight', e.target.value)}
              />
            </div>
            {items.length > 1 && (
              <button
                className="btn btn-danger"
                style={{ padding: '0.75rem' }}
                onClick={() => handleRemoveItem(index)}
                disabled={loading}
              >
                ✕
              </button>
            )}
          </div>
        ))}
      </div>

      <button className="btn btn-primary btn-full" onClick={onOptimize} disabled={loading}>
        {loading ? 'Optimizing...' : 'Optimize Load'}
      </button>
    </div>
  );
};

export default InputSection;
