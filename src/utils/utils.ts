
export const findItem = (id:string,items:any[],identifier:string) => {
    return items.find((e:any) => e[identifier] == id)
}