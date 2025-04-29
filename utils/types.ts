export type TransactionType = {
    id: string;
    date: string;
    description: string;
    amount: number;
    entries: {
        accountId: number;
        amount: number;
    }[];
}

export type FiltersType = {
    accountId: number | null;
    startDate: string;
    endDate: string;
}