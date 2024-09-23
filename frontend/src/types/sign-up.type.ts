export type SignUpType = {
    user: UserSignUpType
}

export type UserSignUpType = {
    id: number,
    email: string,
    name: string,
    lastName: string
}