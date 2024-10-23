import { Meal } from './../../models/Meal';
import { CommonModule } from '@angular/common';
import { FoodServiceService } from '../../services/foodService/food-service.service';
import { FoodListComponent } from '../food-list/food-list.component';
import { Food } from './../../models/Food';
import { Component ,Input, OnInit} from '@angular/core';

import { MealServiceService } from '../../services/meal_Service/meal-service.service';

@Component({
  selector: 'app-meal',
  standalone: true,
  imports: [CommonModule,FoodListComponent],
  templateUrl: './meal.component.html',
  styleUrls: ['./meal.component.css']
})

//obtiene los alimentos diponibles desde el foodService y pasa la lista de alimentos a FoodListComponetn a traves de [foods]="availableFoods"
export class MealComponent implements OnInit{
 
  @Input() mealName!: string;//Nombre de la comida (desayuno,almuerzo , cena)

  foodsInMeal: Food[]=[];//alimentos agregados a la comida
  availableFoods: Food[]=[];//alimentos disponibles desde la lista
  meals: Meal[]=[];//comidas diponibles

  constructor(
    private foodService: FoodServiceService,
    private mealService: MealServiceService


  ){};

  ngOnInit(): void {
      //cargar los alimentos disponibles desde el servicio (api simuladad)
      this.getFoods();

      this.getMeals();

      console.log('Alimentos disponibles:', this.availableFoods);
      console.log('Comidas:', this.meals);
  }


  //definir el metodo getFoods() para obtener los alimentos del foodService
  getFoods(): void{
    this.foodService.getFoods().subscribe({
    next: (foods: Food[])=>{
      this.availableFoods=foods;//asigna los alimentos obtenidos a availableFoods
    },
    error: (err)=>{
      console.log("eroor al obtner",err);
    }});
  
  }

  //obtener la lista de alimentos del meal service
  getMeals(): void
  {
    this.mealService.getMeals().subscribe({
      next: (meals: Meal[])=>{
        this.meals=meals;//asignar las comidas obtenidas
      }, error: (err)=>{
        console.log("eroor al obtner",err);
      }

    })
  }

  addFoodToMeal(event: {mealId: number; food: Food}): void{
    const {mealId,food}=event;
    this.mealService.addFoodToMeal(mealId,food);//agregar el alimento a la comida seleccionada

    console.log(`Agregar ${food.name} a la comida con ID ${mealId}`);
  }

}
