export interface IPageable<T> {
    items: T[],
    meta: {
        lastPage: number,
        currentPage: number,
        total: number,
        perPage: number
    }
}