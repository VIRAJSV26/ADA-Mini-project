#include<stdio.h>

// Increased array size slightly to 100 to prevent crashes if UI sends more than 10 items
int w[100],p[100],n;

int max(int a,int b)
{
    return a>b?a:b;
}

int knap(int i,int m)
{
    // The user's exact recursive knapsack logic
    if(i==n) return w[i]>m?0:p[i];
    if(w[i]>m) return knap(i+1,m);
    return max(knap(i+1,m),knap(i+1,m-w[i])+p[i]);
}

int main()
{
    int m,i,max_profit;
    
    // Read number of objects and capacity from standard input (sent by Node.js server)
    if (scanf("%d", &n) != 1) return 1;
    if (scanf("%d", &m) != 1) return 1;
    
    // Read profit followed by weight
    for(i=1; i<=n; i++)
        scanf("%d %d",&p[i],&w[i]);
        
    max_profit=knap(1,m);
    
    // Output JSON format so the frontend can parse it correctly.
    // Note: Since this recursive approach doesn't track selected items easily, we return an empty array for selected_items.
    printf("{\"max_profit\": %d, \"selected_items\": []}\n", max_profit);
    
    return 0;
}
