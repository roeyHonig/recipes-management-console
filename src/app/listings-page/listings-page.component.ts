import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UtilsService } from '../utils.service';
import { ListingsService, Recipe } from './listings.service';



@Component({
  selector: 'app-listings-page',
  templateUrl: './listings-page.component.html',
  styleUrls: ['./listings-page.component.css']
})
export class ListingsPageComponent implements OnInit {
  recipes: Array<Recipe> = [];
  isUserSignedIn = false; // TODO: think of a better archticture to not duplicate this everytime

  constructor(
    private listingsService: ListingsService,
    private utilsService: UtilsService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.updateRecipes();
    // TODO: think of a better archticture to not duplicate this everytime
    this.utilsService.getObservableForAuthChange().subscribe((user) => {
      this.isUserSignedIn = this.utilsService.userSignedIn ? true : false;
    });
  }

  public updateRecipes() {
    this.listingsService.getRecipes().then((recipesList) => {
      this.recipes = recipesList;
    });
  }

  public onRecipeClicked(recipe: Recipe) {
    this.router.navigateByUrl(`/details/${ recipe.id }`);
  }

  public signOutBtnClicked(){
    this.utilsService.signOutUsingFirebase();
  }

  public signInWithGoogleBtnClicked() {
    this.utilsService.signInWithFirebaseUsingGoogleAccount()
  }
}


