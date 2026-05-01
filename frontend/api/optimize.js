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

    // Dynamic Programming table
    const dp = Array(n + 1).fill().map(() => Array(capacity + 1).fill(0));
    
    for (let i = 0; i <= n; i++) {
      for (let j = 0; j <= capacity; j++) {
        if (i === 0 || j === 0) {
          dp[i][j] = 0;
        } else if (w[i] <= j) {
          dp[i][j] = Math.max(p[i] + dp[i - 1][j - w[i]], dp[i - 1][j]);
        } else {
          dp[i][j] = dp[i - 1][j];
        }
      }
    }

    const max_profit = dp[n][capacity];
    const selected_items = [];
    
    let rem_profit = max_profit;
    let cur_w = capacity;
    
    for (let i = n; i > 0 && rem_profit > 0; i--) {
      if (rem_profit === dp[i - 1][cur_w]) {
        continue;
      } else {
        selected_items.unshift(i);
        rem_profit = rem_profit - p[i];
        cur_w = cur_w - w[i];
      }
    }

    // Return the response matching the C output format
    res.status(200).json({
      max_profit,
      selected_items
    });
  } catch (error) {
    console.error('Optimization error:', error);
    res.status(500).json({ error: 'Failed to optimize' });
  }
}
