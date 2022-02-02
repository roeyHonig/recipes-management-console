import { Component, OnInit } from '@angular/core';
import { UtilsService } from '../utils.service';
import { ListingsService, Recipe } from './listings.service';



@Component({
  selector: 'app-listings-page',
  templateUrl: './listings-page.component.html',
  styleUrls: ['./listings-page.component.css']
})
export class ListingsPageComponent implements OnInit {
  recipes: Array<Recipe> = [];

  constructor(
    private listingsService: ListingsService,
    private utilsService: UtilsService
    ) { }

  ngOnInit(): void {
    this.listingsService.getRecipes().then((recipesList) => {
      this.recipes = recipesList;
    });
    const title = 'מרק עוף';
    const ingTitle = 'חומרים למרק';
    const ing = `1. אבקת מרק עוף
    2. תפוא`;
    const instr = 'להרתיח הכל'
    const myNewRecipe = this.listingsService.newRecipe(title, ingTitle, ing, '', '', '', '', instr)
    //this.utilsService.writeRecipeToFirebaseCloudFireStoreDataBase(myNewRecipe);

    

    
  }

  
}


