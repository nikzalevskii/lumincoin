export type NewItemBodyType = {
    type: string,
    amount: number | null,
    date: Date | string,
    comment: string,
    category_id: number | null,
}