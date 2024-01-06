export interface IResponse<T> {
    error: string,
    success: boolean,
    data: T
}