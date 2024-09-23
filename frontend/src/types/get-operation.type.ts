export type GetOperationType = {
    "id": number,
    "type": IncomeExpenseType,
    "amount": number,
    "date": Date | string,
    "comment": string | null,
    "category": string
}

export type IncomeExpenseType = "income" | "expense";