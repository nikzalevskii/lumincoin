export type RouteType = {
    route: string | undefined,
    title?: string,
    filePathTemplate?: string,
    useLayout?: string | boolean,
    load?():void,
    unload?():void,
    styles?: string[],
    scripts?: string[]
}