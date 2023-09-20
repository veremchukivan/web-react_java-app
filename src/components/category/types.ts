export interface ICategoryCreate{
    name: string;
    image: File | null;
    description: string;
}
export interface ICategoryEdit{
    id: number;
    name: string;
    image: File | null;
    description: string;
}
export interface ICategoryItem{
    id: number;
    name: string;
    image: string;
    description: string;
}