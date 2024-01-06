export interface IPageable<T> {
    items: T[],
    meta: {
        pageSize: number,
        totalElements: number,
        totalPage: number,
        page: number
    }
}