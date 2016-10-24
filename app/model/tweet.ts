export interface Tweet {
    id:number;
    text: string;
    user: {name: string};
    created_at:string;
    truncated:boolean;
    link:string;
}