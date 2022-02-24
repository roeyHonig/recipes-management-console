import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, addDoc, updateDoc, query, where } from 'firebase/firestore/lite';
import { getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut, User } from "firebase/auth"; // TODO: maybe move this to firebase auth utils service
import { Recipe } from './listings-page/listings.service';
import { Observable, Observer, Subject } from 'rxjs';

const firebaseConfig = {
  apiKey: "AIzaSyAWZO70q5GI-VWaC3jSoqQLehEdYwKqp1U",
  authDomain: "recipes-management-console.firebaseapp.com",
  projectId: "recipes-management-console",
  storageBucket: "recipes-management-console.appspot.com",
  messagingSenderId: "702983449327",
  appId: "1:702983449327:web:234de27201893751a9c91a",
  measurementId: "G-V08PV6L961"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(); // TODO: maybe move this to firebase auth utils service
const googleAuthProvider = new GoogleAuthProvider(); // TODO: maybe move this to firebase auth utils service

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  userSignedIn: User | null = null; // TODO: maybe move this to firebase auth utils service
  userSignInBrodcaster: Subject<User | null> = new Subject();

  constructor() {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        console.log("we have a user from FB")
        this.userSignedIn = user;
        this.userSignInBrodcaster.next(user);
      } else {
        this.userSignedIn = null;
        this.userSignInBrodcaster.next(null);
      }
    });
  }

  public getArrayOfUTF16FromString(str: string): Array<number> {
    let arrayOfUTF16Code: Array<number> = [];
    for (let index = 0; index < str.length; index++) {
      arrayOfUTF16Code.push(str.charCodeAt(index));
    }
    return arrayOfUTF16Code;
  }

  public getStringFromUTF16Array(arr: Array<number>): string {
    return String.fromCharCode.apply(String ,arr);
  }

  public newRecipeUTF16FromRecipe(recipe: Recipe): RecipeUTF16 {
    return {
      id: recipe.id,
      title: this.getArrayOfUTF16FromString(recipe.title),
      ing1Title: this.getArrayOfUTF16FromString(recipe.ing1Title),
      ing1: this.getArrayOfUTF16FromString(recipe.ing1),
      ing2Title: this.getArrayOfUTF16FromString(recipe.ing2Title),
      ing2: this.getArrayOfUTF16FromString(recipe.ing2),
      ing3Title: this.getArrayOfUTF16FromString(recipe.ing3Title),
      ing3: this.getArrayOfUTF16FromString(recipe.ing3),
      instructions: this.getArrayOfUTF16FromString(recipe.instructions)    
    };
  }

  public newRecipeFromRecipeUTF16(rec16: RecipeUTF16): Recipe {
    return {
      id: rec16.id,
      title: this.getStringFromUTF16Array(rec16.title),
      ing1Title: this.getStringFromUTF16Array(rec16.ing1Title),
      ing1: this.getStringFromUTF16Array(rec16.ing1),
      ing2Title: this.getStringFromUTF16Array(rec16.ing2Title),
      ing2: this.getStringFromUTF16Array(rec16.ing2),
      ing3Title: this.getStringFromUTF16Array(rec16.ing3Title),
      ing3: this.getStringFromUTF16Array(rec16.ing3),
      instructions: this.getStringFromUTF16Array(rec16.instructions)    
    };
  }

  public async writeRecipeToFirebaseCloudFireStoreDataBase(recipe: Recipe) {
    const recipeUTF16 = this.newRecipeUTF16FromRecipe(recipe);
    try {
      const docRef = await addDoc(collection(db, "recipes"), recipeUTF16);
      console.log("Document written with ID: ", docRef.id);
      await updateDoc(docRef, 'id', docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  public async readRecipesUTF16FromFirebaseCloudStoreDataBaseAndConvertToRecipes(): Promise<Array<Recipe>> {
    let returnValues: Array<Recipe> = [];
    const q = query(collection(db, "recipes"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log("title as array of utf16 numbers: " + doc.get("title"));
      console.log(doc.id, " => ", doc.data()["title"]);
      const recipeUTF16 = {
        id: doc.id,
        title: doc.data()["title"],
        ing1Title: doc.data()["ing1Title"],
        ing1: doc.data()["ing1"],
        ing2Title: doc.data()["ing2Title"],
        ing2: doc.data()["ing2"],
        ing3Title: doc.data()["ing3Title"],
        ing3: doc.data()["ing3"],
        instructions: doc.data()["instructions"]      
      };
      const recipe = this.newRecipeFromRecipeUTF16(recipeUTF16);
      returnValues.push(recipe);
    });
    return returnValues;
  }

  public async updateRecipeIdWithTheFollowingNewData(recipeId: string, newRecipe: Recipe) {
    console.log("trying to update id: " + recipeId);
    const newRecipeUTF16 = this.newRecipeUTF16FromRecipe(newRecipe);
    const q = query(collection(db, "recipes"), where("id", "==", recipeId));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.docs.length == 1) {
      await updateDoc(querySnapshot.docs[0].ref, {
        'title': newRecipeUTF16.title,
        'ing1': newRecipeUTF16.ing1,
        'ing1Title': newRecipeUTF16.ing1Title,
        'ing2': newRecipeUTF16.ing2,
        'ing2Title': newRecipeUTF16.ing2Title,
        'ing3': newRecipeUTF16.ing3,
        'ing3Title': newRecipeUTF16.ing3Title,
        'instructions': newRecipeUTF16.instructions,
      });
    }
  }

  public async findRecipeIdFromFirebaseCloudStoreDataBaseAndConvertToRecipe(recipeId: string): Promise<Recipe> {
    let returnValues: Array<Recipe> = [];
    const q = query(collection(db, "recipes"), where("id", "==", recipeId));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.docs.length == 1) {
      querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log("title as array of utf16 numbers: " + doc.get("title"));
      console.log(doc.id, " => ", doc.data()["title"]);
      const recipeUTF16 = {
        id: doc.id,
        title: doc.data()["title"],
        ing1Title: doc.data()["ing1Title"],
        ing1: doc.data()["ing1"],
        ing2Title: doc.data()["ing2Title"],
        ing2: doc.data()["ing2"],
        ing3Title: doc.data()["ing3Title"],
        ing3: doc.data()["ing3"],
        instructions: doc.data()["instructions"]      
      };
      const recipe = this.newRecipeFromRecipeUTF16(recipeUTF16);
      returnValues.push(recipe);
    });
    return returnValues[0];

    } else {
      /* maybe we need to reject */
      return {
        id: '', /* id is set when writing to the DB */
        title: '',
        ing1Title: '',
        ing1: '',
        ing2Title: '',
        ing2: '',
        ing3Title: '',
        ing3: '',
        instructions: ''
      };
    }
  }

  // TODO: maybe move this to firebase auth utils service
  public signInWithFirebaseUsingGoogleAccount() {
    signInWithPopup(auth, googleAuthProvider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential?.accessToken;
      // The signed-in user info.
      const user = result.user;
      //...
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
  }

  // TODO: maybe move this to firebase auth utils service
  public signOutUsingFirebase() {
    signOut(auth)
    .then(() => {
      console.log("sign out successful");
    })
    .catch((error) => {
      console.log("sign out error happened");
    })
  }

  // TODO: maybe move this to firebase auth utils service
  public getObservableForAuthChange(): Subject<User | null> {
    return this.userSignInBrodcaster;
  }
}

export interface RecipeUTF16 {
  id: string,
  title: Array<number>,
  ing1Title: Array<number>,
  ing1: Array<number>,
  ing2Title: Array<number>,
  ing2: Array<number>,
  ing3Title: Array<number>,
  ing3: Array<number>,
  instructions: Array<number>
}
