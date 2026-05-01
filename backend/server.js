const express = require('express');
const cors = require('cors');
const { spawn } = require('child_process');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

const KNAPSACK_EXEC = path.join(__dirname, 'knapsack');

app.post('/api/optimize', (req, res) => {
    const { n, capacity, items } = req.body;

    // Validate inputs
    if (!n || !capacity || !items || !Array.isArray(items)) {
        return res.status(400).json({ error: 'Invalid input format' });
    }

    // Construct input string for the C program
    let inputStr = `${n} ${capacity}\n`;
    for (const item of items) {
        inputStr += `${item.profit} ${item.weight}\n`;
    }

    const child = spawn(KNAPSACK_EXEC);

    let output = '';
    let errorOutput = '';

    child.stdout.on('data', (data) => {
        output += data.toString();
    });

    child.stderr.on('data', (data) => {
        errorOutput += data.toString();
    });

    child.on('close', (code) => {
        if (code !== 0) {
            console.error('C program failed:', errorOutput);
            return res.status(500).json({ error: 'Failed to optimize' });
        }

        try {
            const result = JSON.parse(output);
            res.json(result);
        } catch (err) {
            console.error('Failed to parse output:', output);
            res.status(500).json({ error: 'Invalid output from optimizer' });
        }
    });

    child.on('error', (err) => {
        console.error('Failed to start child process:', err);
        res.status(500).json({ error: 'Server error' });
    });

    // Send input to the C program
    child.stdin.write(inputStr);
    child.stdin.end();
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Backend server running on http://localhost:${PORT}`);
});
