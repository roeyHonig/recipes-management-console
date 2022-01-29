import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ListingsService {

  constructor() { }

  private getMockData(): Array<Recipe> {
    return [
      {
        id: '1',
        title: 'מרק חרירה',
        ing1Title: 'חומרים למרק',
        ing1: 'גזר - 3',
        instructions: 'מכינים מרק טעים'
      },
      {
        id: '2',
        title: 'עוגת שוקולד',
        ing1Title: 'חומרים לעוגת השוקולד',
        ing1: 'חבילת שוקולד - 3',
        instructions: 'מכינים עוגה טעים'
      },
      {
        id: '3',
        title: 'שקשוקה',
        ing1Title: 'חומרים לשקשוקה',
        ing1: 'עגבניות - 3',
        instructions: 'מכינים שקשוקה טעימה'
      }
    ];
  }

  public getRecipes(): Array<Recipe> {
    return this.getMockData(); /* TODO: get it from FB DB */
  }
}

export interface Recipe {
  id: string, /* TODO: should be an integer? */
  title: string,
  ing1Title: string,
  ing1: string,
  ing2Title?: string,
  ing2?: string,
  ing3Title?: string,
  ing3?: string,
  instructions: string,
}
