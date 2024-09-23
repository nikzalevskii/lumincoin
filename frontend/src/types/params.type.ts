export type ParamsType = {
    method: string,
    headers: HeadersType,
    body?: string,
}

export type HeadersType = {
    'Content-type': string,
    'Accept': string,
    'x-auth-token'?: string
}