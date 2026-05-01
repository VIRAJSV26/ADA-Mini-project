#include <stdio.h>

int w[105], p[105], n;
int dp[105][10005]; 

int max(int a, int b) { return (a > b) ? a : b; }

int main() {
    int m, i, j;
    
    // Read number of objects and capacity
    if (scanf("%d", &n) != 1) return 1;
    if (scanf("%d", &m) != 1) return 1;
    
    // Read profit followed by weight
    for(i = 1; i <= n; i++)
        scanf("%d %d", &p[i], &w[i]);
        
    // DP logic
    for (i = 0; i <= n; i++) {
        for (j = 0; j <= m; j++) {
            if (i == 0 || j == 0)
                dp[i][j] = 0;
            else if (w[i] <= j)
                dp[i][j] = max(p[i] + dp[i-1][j - w[i]], dp[i-1][j]);
            else
                dp[i][j] = dp[i-1][j];
        }
    }
    
    int max_profit = dp[n][m];
    
    // Backtracking to find selected items
    int selected[105] = {0};
    int res = max_profit;
    int cur_w = m;
    
    for (i = n; i > 0 && res > 0; i--) {
        if (res == dp[i-1][cur_w]) {
            continue;
        } else {
            selected[i] = 1;
            res = res - p[i];
            cur_w = cur_w - w[i];
        }
    }
    
    // Output JSON format
    printf("{\"max_profit\": %d, \"selected_items\": [", max_profit);
    int first = 1;
    for (i = 1; i <= n; i++) {
        if (selected[i]) {
            if (!first) printf(", ");
            printf("%d", i);
            first = 0;
        }
    }
    printf("]}\n");
    
    return 0;
}
