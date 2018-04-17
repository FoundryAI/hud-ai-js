export interface StockAlert {
    id: string;
    companyId: string;
    firstValue: number;
    firstValueOccurredAt: Date;
    secondValue: number;
    secondValueOccurredAt: Date;
    createdAt: Date;
    updatedAt: Date;
}
