import { AxiosError } from "axios";
import { http } from "../../pages/vise-reactor-docs";
import { IFile } from "../constants";
import { IResponse } from "../models";

type TupleEntry<T extends readonly unknown[], I extends unknown[] = [], R = never> =
    T extends readonly [infer Head, ...infer Tail] ?
    TupleEntry<Tail, [...I, unknown], R | [`${I['length']}`, Head]> :
    R

// eslint-disable-next-line @typescript-eslint/ban-types
type ObjectEntry<T extends {}> =
    // eslint-disable-next-line @typescript-eslint/ban-types
    T extends object ?
    { [K in keyof T]: [K, Required<T>[K]] }[keyof T] extends infer E ?
    E extends [infer K, infer V] ?
    K extends string | number ?
    [`${K}`, V] :
    never :
    never :
    never :
    never

// eslint-disable-next-line @typescript-eslint/ban-types
export type Entry<T extends {}> =
    T extends readonly [unknown, ...unknown[]] ?
    TupleEntry<T> :
    T extends ReadonlyArray<infer U> ?
    [`${number}`, U] :
    ObjectEntry<T>

// eslint-disable-next-line @typescript-eslint/ban-types
export function typedEntries<T extends {}>(object: T): ReadonlyArray<Entry<T>> {
    return Object.entries(object) as unknown as ReadonlyArray<Entry<T>>;
}


export function keysFromObject<T extends object>(object: T): (keyof T)[] {
    return Object.keys(object) as (keyof T)[];
}

export const printPage = () => {
    window.print()
}

export const formatDate = (date: Date) => {
    const today: Date = new Date(date);
    const yyyy = today.getFullYear();
    let mm: any = today.getMonth() + 1; // Months start at 0!
    let dd: any = today.getDate();

    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;

    return yyyy + '-' + mm + '-' + dd;
}

export const uploadFile = async (file: any, type: string) => {
    const formData = new FormData();
    formData.append('file', file);

    try {
        const result: IResponse<IFile> = await http.post(`/file/${type}/store`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        if (result.success) {
            return { id: result.data.fileName }
        }
    } catch (err) {
        const error = err as AxiosError;


        return { error: error.message }

    }

}
