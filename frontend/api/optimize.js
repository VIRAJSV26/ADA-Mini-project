export default function handler(req, res) {
  // CORS headers if needed, though Vercel handles relative paths natively
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { n, capacity, items } = req.body;

    if (!n || !capacity || !items || !Array.isArray(items)) {
      return res.status(400).json({ error: 'Invalid input format' });
    }

    // 1-indexed arrays to match your C logic exactly
    const w = [0];
    const p = [0];
    
    items.forEach(item => {
      p.push(item.profit);
      w.push(item.weight);
    });

    // The exact C recursive logic translated to JS
    const knap = (i, m) => {
      if (i === n) return w[i] > m ? 0 : p[i];
      if (w[i] > m) return knap(i + 1, m);
      return Math.max(knap(i + 1, m), knap(i + 1, m - w[i]) + p[i]);
    };

    const max_profit = knap(1, capacity);

    // Return the response matching the C output format
    res.status(200).json({
      max_profit,
      selected_items: []
    });
  } catch (error) {
    console.error('Optimization error:', error);
    res.status(500).json({ error: 'Failed to optimize' });
  }
}
