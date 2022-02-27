import { Component, OnInit } from '@angular/core';
import { Recipe } from '../listings-page/listings.service';
import { RecipeFormComponentComponent } from '../add-page/recipe-form-component/recipe-form-component.component';
import { UtilsService } from '../utils.service';

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.css']
})
export class EditPageComponent implements OnInit {

  recipeToEdit: Recipe | undefined;
  isUserSignedIn = false; // TODO: think of a better archticture to not duplicate this everytime
  userUID = '';

  constructor(private utilsService: UtilsService) {
    this.isUserSignedIn = this.utilsService.userSignedIn ? true : false; // TODO: think of a better archticture to not duplicate this everytime
    this.userUID = this.utilsService.signedUserUid;
   }

  ngOnInit(): void {
    this.recipeToEdit = history.state.data as Recipe; //TODO: if we don't have a recipe we should try to get it from reading the FB database based on id
    console.log(this.recipeToEdit.title);
    // TODO: think of a better archticture to not duplicate this everytime
    this.utilsService.getObservableForAuthChange().subscribe((user) => {
      this.isUserSignedIn = this.utilsService.userSignedIn ? true : false;
      this.userUID = user?.uid ?? '';
    });
  }

  public signOutBtnClicked(){
    this.utilsService.signOutUsingFirebase();
  }

  public signInWithGoogleBtnClicked() {
    this.utilsService.signInWithFirebaseUsingGoogleAccount()
  }

  editRecipe(newRecipe : Recipe) {
    this.utilsService.updateRecipeIdWithTheFollowingNewData(this.recipeToEdit?.id ?? '', newRecipe).then(() => {
      console.log("update sucess");
    });
  }

}
