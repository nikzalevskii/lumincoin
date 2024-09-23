export type LoginType = {
    "tokens": TokensType,
    "user": UserLoginType
}

export type TokensType = {
    accessToken: string,
    refreshToken: string
}

export type UserLoginType = {
    name: string,
    lastName: string,
    id: number
}