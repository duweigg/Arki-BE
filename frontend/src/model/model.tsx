export type Role = "Parent" | "Child" | "Co-Parent";





export type HistoricalValue = {
    date: string;
    value: number;
};

export type Portfolio = {
    portfolioValue: number;
    monthlyChange: number;
    historicalValues: HistoricalValue[];
};

// If you want to type the entire JSON object (i.e., userId → Portfolio map)
export type PortfolioMap = {
    [userId: string]: Portfolio;
};




export type Investment = {
    symbol: string;
    name: string;
    logoUrl: string;
    funFact: string;
};

// If you're typing the entire JSON object (userId → array of holdings):
export type InvestmentMap = {
    [userId: string]: Investment[];
};






export type Message = {
    familyId: string | null;
    senderId: string | null;
    role: Role | null;
    message: string;
    timestamp: string;
};
