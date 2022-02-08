import { Injectable } from '@angular/core';
import { collection, query } from 'firebase/firestore/lite';
import { filter, map } from 'rxjs';
import { UtilsService } from '../utils.service';

@Injectable({
  providedIn: 'root'
})
export class ListingsService {

  constructor(private utilsService: UtilsService) { }

  private getMockData(): Array<Recipe> {
    return [
      {
        id: '1',
        title: 'מרק חרירה',
        ing1Title: 'חומרים למרק',
        ing1: 'גזר - 3',
        ing2Title: '',
        ing2: '',
        ing3Title: '',
        ing3: '',
        instructions: 'מכינים מרק טעים'
      },
      {
        id: '2',
        title: 'עוגת שוקולד',
        ing1Title: 'חומרים לעוגת השוקולד',
        ing1: 'חבילת שוקולד - 3',
        ing2Title: '',
        ing2: '',
        ing3Title: '',
        ing3: '',
        instructions: 'מכינים עוגה טעים'
      },
      {
        id: '3',
        title: 'שקשוקה',
        ing1Title: 'חומרים לשקשוקה',
        ing1: 'עגבניות - 3',
        ing2Title: '',
        ing2: '',
        ing3Title: '',
        ing3: '',
        instructions: 'מכינים שקשוקה טעימה'
      }
    ];
  }

  public async getRecipes(): Promise<Array<Recipe>> {
    return this.utilsService.readRecipesUTF16FromFirebaseCloudStoreDataBaseAndConvertToRecipes();
  }

  public async getRecipeBasedOnId(id: string): Promise<Recipe> {
    return this.utilsService.findRecipeIdFromFirebaseCloudStoreDataBaseAndConvertToRecipe(id);
  }

  public newRecipe(t: string, ing1T: string, in1: string, ing2T: string, in2: string, ing3T: string, in3: string, inst: string) {
    return {
      id: '', /* id is set when writing to the DB */
      title: t,
      ing1Title: ing1T,
      ing1: in1,
      ing2Title: ing2T,
      ing2: in2,
      ing3Title: ing3T,
      ing3: in3,
      instructions: inst
    };
  }
}

export interface Recipe {
  id: string,
  title: string,
  ing1Title: string,
  ing1: string,
  ing2Title: string,
  ing2: string,
  ing3Title: string,
  ing3: string,
  instructions: string,
}
