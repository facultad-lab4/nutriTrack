import { Meal } from './../../models/Meal';
import { Component, EventEmitter,  Input, OnInit, Output} from '@angular/core';
import { Food } from '../../models/Food';
import { CommonModule } from '@angular/common';
import { MealComponent } from '../meal/meal.component';
@Component({
  selector: 'app-food-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './food-list.component.html',
  styleUrls: ['./food-list.component.css']
})
export class FoodListComponent {

  

  //usamos el input aca porque mealComponent es el padre y obtiene los alimentos de foodService que simula la api
  @Input() foods:Food[]=[];//lista de alimentos para esa comida
  @Input() meals: Meal[]=[];//comidas disponibles


  @ Output() selectFood=new EventEmitter<{mealId:number,food:Food}>();//Eveto para selccionar un alimento

  
  onMealSelect(event: Event,food: Food): void{
    const mealId= +(event.target as HTMLSelectElement).value;
    if(mealId)
    {
      //emitir un evento o llamar un metodo para agregar el alimento a la comida seleccionada
      this.selectFood.emit({mealId,food})
    }
  }

  

 
}
