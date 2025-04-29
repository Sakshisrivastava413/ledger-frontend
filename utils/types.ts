export type TransactionType = {
    id: string;
    date: string;
    description: string;
    amount: number;
    entries: {
        accountId: string;
        amount: number;
    }[];
}

export type FiltersType = {
    accountId: string;
    startDate: string;
    endDate: string;
}