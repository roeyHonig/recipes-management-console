import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListingsPageComponent } from './listings-page/listings-page.component';
import { DetailsPageComponent } from './details-page/details-page.component';
import { EditPageComponent } from './edit-page/edit-page.component';
import { AddPageComponent } from './add-page/add-page.component';
import { RecipeFormComponentComponent } from './add-page/recipe-form-component/recipe-form-component.component';
import { FormsModule } from '@angular/forms';
import { RecipeListingComponent } from './listings-page/recipe-listing/recipe-listing.component';

@NgModule({
  declarations: [
    AppComponent,
    ListingsPageComponent,
    DetailsPageComponent,
    EditPageComponent,
    AddPageComponent,
    RecipeFormComponentComponent,
    RecipeListingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

/** how to use firebase SDK
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAWZO70q5GI-VWaC3jSoqQLehEdYwKqp1U",
  authDomain: "recipes-management-console.firebaseapp.com",
  projectId: "recipes-management-console",
  storageBucket: "recipes-management-console.appspot.com",
  messagingSenderId: "702983449327",
  appId: "1:702983449327:web:234de27201893751a9c91a",
  measurementId: "G-V08PV6L961"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
 */
