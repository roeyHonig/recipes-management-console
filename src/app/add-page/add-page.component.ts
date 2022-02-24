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

  isUserSignedIn = false; // TODO: think of a better archticture to not duplicate this everytime

  constructor(private utilsService: UtilsService) { }

  ngOnInit(): void {
    // TODO: think of a better archticture to not duplicate this everytime
    this.utilsService.getObservableForAuthChange().subscribe((user) => {
      this.isUserSignedIn = this.utilsService.userSignedIn ? true : false;
    });
  }

  addRecipe(newRecipe : Recipe) {
    this.utilsService.writeRecipeToFirebaseCloudFireStoreDataBase(newRecipe);
  }

  public signOutBtnClicked(){
    this.utilsService.signOutUsingFirebase();
  }

  public signInWithGoogleBtnClicked() {
    this.utilsService.signInWithFirebaseUsingGoogleAccount()
  }

}
