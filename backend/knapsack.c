#include<stdio.h>

// Array size 100 to prevent crashes
int w[100], p[100], n;
int current_selection[100];
int best_selection[100];
int max_profit = 0;

void knap(int i, int m, int current_profit) {
    if (i > n) {
        if (current_profit > max_profit) {
            max_profit = current_profit;
            for(int j = 1; j <= n; j++) {
                best_selection[j] = current_selection[j];
            }
        }
        return;
    }
    
    // Option 1: Exclude item i
    current_selection[i] = 0;
    knap(i + 1, m, current_profit);
    
    // Option 2: Include item i
    if (w[i] <= m) {
        current_selection[i] = 1;
        knap(i + 1, m - w[i], current_profit + p[i]);
    }
}

int main() {
    int m, i;
    
    // Read number of objects and capacity
    if (scanf("%d", &n) != 1) return 1;
    if (scanf("%d", &m) != 1) return 1;
    
    // Read profit followed by weight
    for(i = 1; i <= n; i++)
        scanf("%d %d", &p[i], &w[i]);
        
    knap(1, m, 0);
    
    // Output JSON format
    printf("{\"max_profit\": %d, \"selected_items\": [", max_profit);
    int first = 1;
    for (i = 1; i <= n; i++) {
        if (best_selection[i]) {
            if (!first) printf(", ");
            printf("%d", i);
            first = 0;
        }
    }
    printf("]}\n");
    
    return 0;
}
