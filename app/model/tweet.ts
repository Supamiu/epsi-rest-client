//Modèle d'un tweet basique.
export interface Tweet {
    id_str: string;
    text: string;
    user: {name: string};
    created_at: string;
    truncated: boolean;
    link: string;
}