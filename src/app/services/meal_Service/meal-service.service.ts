import { Meal } from '../../models/Meal';
import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';//es un stream de datos que hace que se
import { Food } from '../../models/Food';
//guarden los cambios en la comidad cada vez que se actualizen
@Injectable({
  providedIn: 'root'
})
export class MealServiceService {
  //MealService maneja las comidas, permitiendo agregar alimentos y calcular las calorías totales.
  constructor() { }

  //es donde vamos a almacenar nuestras comidas
  private meals: Meal[] = [
    { id: 1, name: "Desayuno", foods: [] },
    { id: 2, name: "Almuerzo", foods: [] },
    { id: 3, name: "Cena", foods: [] },

  ]

  //BehaviorSubjetct para que los componentes puedan sucrbirse a los cambios,osea recibir esos cambios
  private mealsSubject = new BehaviorSubject<Meal[]>(this.meals);

  meals$ = this.mealsSubject.asObservable();
  //ES UN OBSERVABLE que los componentes pueden utilizar para escuchar los cambios
  //en la lista de comidas(meals).Es para matener los componentes actualizados sin necesidad de recargar la pagina


  getMeals() {
    return this.meals$;
    //este metodo devuelve el observable meals$.Cuando un componente(como el meal-list.componente) se suscriba a este observable
    //recibira la lista de comidas actual , y cualquier cambio furtuo en esa lista
  }

  addFoodToMeal(mealId: number, food: Food) {
    const meal = this.meals.find((m) => m.id == mealId);

    if (meal) {
      meal.foods.push(food);
      this.mealsSubject.next([...this.meals]);//emitir una actualizacion
    }

    //este metodo permite agregar un alimento (food) a una comida (meal)
    //mealId: es el identificador de la comida , donde quieres agrefar el alimento
    //Food: es el alimento que quieres agregar

  }

  calculateTotalCalories(mealId: number): number {
    const meal = this.meals.find((m) => m.id === mealId);
    return meal?.foods.reduce((sum, food) => sum + food.calories, 0) || 0

    //1: Encuentra la comida (meal) usando el mealId
    //2: usa el metodo reduce() en el array de alimentos (foods) para sumar las calorias de todos los alimentos que estan entro de essa comida
    //3:devuelve la suma de las calorias o 0 si no hay alimentos en la comida

  }

}
