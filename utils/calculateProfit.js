export const calculateProfit = (amount, level) => {
    if(level === 1) return amount* 0.05; // 5% for Level 1
    if(level === 2) return amount* 0.03; // 3% for Level 2
    return 0;
} 