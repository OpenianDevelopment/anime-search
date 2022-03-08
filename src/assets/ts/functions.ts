export function cleanQuery(str: string) {
    if(!str) return str
    return str.replace(/%20/g, " ").replace(/\+/g, " ");
}
