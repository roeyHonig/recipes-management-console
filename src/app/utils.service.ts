import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, addDoc, updateDoc, query } from 'firebase/firestore/lite';
import { Recipe } from './listings-page/listings.service';

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

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }

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
