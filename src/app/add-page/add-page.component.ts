import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  userUID = '';

  constructor(
    private utilsService: UtilsService,
    private router: Router) { 
    this.isUserSignedIn = this.utilsService.userSignedIn ? true : false; // TODO: think of a better archticture to not duplicate this everytime
    this.userUID = this.utilsService.signedUserUid;
  }

  ngOnInit(): void {
    // TODO: think of a better archticture to not duplicate this everytime
    this.utilsService.getObservableForAuthChange().subscribe((user) => {
      this.isUserSignedIn = this.utilsService.userSignedIn ? true : false;
      this.userUID = user?.uid ?? '';
    });
  }

  addRecipe(newRecipe : Recipe) {
    this.utilsService.writeRecipeToFirebaseCloudFireStoreDataBase(newRecipe).then((writeSuccessful) => {
      if (writeSuccessful) {
        // navigate back to the listing page
        this.router.navigateByUrl('/listings'); /* todo: move this to the parent element */
      } else {
        // TODO: present alaert or error message
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
