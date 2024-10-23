import { Food } from "./Food";
export interface Meal {
    id:number;
    name:string;//desayuno,almuero o cena
    foods: Food[];//Lista
}
