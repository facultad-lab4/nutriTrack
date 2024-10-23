import { Injectable } from '@angular/core';
import { Food } from '../../models/Food';
import { Observable,of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FoodServiceService {
//FoodService es responsable de proporcionar la lista de alimentos.

  constructor() { }
//la idea seria que aca poner la logica de busqueda de un alimento para agregarla a la comida
  private foods: Food[] = [
    { id: 1, name: 'Manzana', calories: 52, proteins: 0.3, fats: 0.2, carbs: 14, quantity: 100 },
    { id: 2, name: 'Pollo', calories: 165, proteins: 31, fats: 3.6, carbs: 0, quantity: 100 },
    { id: 3, name: 'pescado', calories: 165, proteins: 31, fats: 3.6, carbs: 0, quantity: 100 },
    
    // Otros alimentos
    //despues aca seri llamar a la funcion que busca el alimento que quieres manejar
  ];

  getFoods():Observable<Food[]>
  {
    return of (this.foods);// Simula la obtención de alimentos

  }

  
}
