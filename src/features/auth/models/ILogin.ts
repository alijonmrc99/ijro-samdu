export interface ILoginQuery {
    username: string,
    password: string,
    remember?: boolean
}

export interface ILogin {
    error: any,
    data: ILoginResult,
    role: string[]
}

export interface ILoginResult {
    step: string,
    accessToken: string,
}