import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UtilsService } from '../utils.service';
import { ListingsService, Recipe } from './listings.service';



@Component({
  selector: 'app-listings-page',
  templateUrl: './listings-page.component.html',
  styleUrls: ['./listings-page.component.css']
})
export class ListingsPageComponent implements OnInit {
  private _recipes: Array<Recipe> = [];
  get recipes() {
    return this._recipes;
  }
  set recipes(newRecipes: Array<Recipe>) {
    this._recipes = newRecipes;
    this.changeDetection.detectChanges();
  }
  isUserSignedIn = false; // TODO: think of a better archticture to not duplicate this everytime

  constructor(
    private listingsService: ListingsService,
    private utilsService: UtilsService,
    private router: Router,
    private changeDetection: ChangeDetectorRef
    ) {
      this.isUserSignedIn = this.utilsService.userSignedIn ? true : false; // TODO: think of a better archticture to not duplicate this everytime
      console.log("upper usersignedin: " + this.isUserSignedIn);
      if (this.isUserSignedIn) {
        this.updateRecipes();
      }
     }

  ngOnInit(): void {
    // TODO: think of a better archticture to not duplicate this everytime
    this.utilsService.getObservableForAuthChange().subscribe((user) => {
      this.isUserSignedIn = this.utilsService.userSignedIn ? true : false;
      console.log("bottom usersignedin: " + this.isUserSignedIn);
      if (this.isUserSignedIn) {
        this.updateRecipes();
      }
    });
  }

  public updateRecipes() {
    // todo: should start a buffer loading
    this.listingsService.getRecipes().then((recipesList) => {
      this.recipes = recipesList;
      // todo: should close buffer loading
    });
  }

  public onRecipeClicked(recipe: Recipe) {
    this.router.navigate([]).then(result => {window.open(`/details/${ recipe.id }`, '_blank');});
  }

  public onEditRecipeClicked(recipe: Recipe) {
    /*this.router.navigateByUrl(`/edit/${ recipe.id }`);*/
    this.router.navigate([`/edit/${ recipe.id }`], {
      state: {
        data: recipe
      }
    });
  }

  public onDeleteRecipeClicked(recipe: Recipe) {
    // TOOD: we need to stopPropegation on the event to prevent also clike on the recipe clicked. This means the entire recipe should be a component with outputs, so the click will only pass the event and not the recipe as now.
    this.utilsService.deleteFromFirebaseCloudFireStoreRecipeID(recipe.id).then((deletionSuccess) => {
      if (deletionSuccess) {
        this.updateRecipes();
      } else {
        console.log('deletion failure');
      }

    });
  }

  public signOutBtnClicked(){
    this.utilsService.signOutUsingFirebase();
  }

  public signInWithGoogleBtnClicked() {
    this.utilsService.signInWithFirebaseUsingGoogleAccount()
  }
}


