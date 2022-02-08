import { Component, OnInit } from '@angular/core';
import { Recipe } from '../listings-page/listings.service';
import { UtilsService } from '../utils.service';
import { RecipeFormComponentComponent } from './recipe-form-component/recipe-form-component.component';

@Component({
  selector: 'app-add-page',
  templateUrl: './add-page.component.html',
  styleUrls: ['./add-page.component.css']
})
export class AddPageComponent implements OnInit {

  constructor(private utilsService: UtilsService) { }

  ngOnInit(): void {
  }

  addRecipe(newRecipe : Recipe) {
    this.utilsService.writeRecipeToFirebaseCloudFireStoreDataBase(newRecipe);
  }

}
