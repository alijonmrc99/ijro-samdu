export interface ILoginQuery {
    username: string,
    password: string,
    remember?: boolean
}

export interface ILogin {
    error: any,
    result: ILoginResult,
    role: string[]
}

export interface ILoginResult {
    step: string,
    result: {
        token: string,
        user: {}
    }
}