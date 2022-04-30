import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from '../listings.service';

@Component({
  selector: 'app-recipe-listing',
  templateUrl: './recipe-listing.component.html',
  styleUrls: ['./recipe-listing.component.css']
})
export class RecipeListingComponent implements OnInit {

  @Input() recipe: Recipe | null | undefined;
  title = '';

  constructor() { }

  ngOnInit(): void {
    this.title = this.recipe?.title ?? '';
    
  }

  onRecipeClicked() {
    console.log('recipe clicked');

  }

  onEditRecipeClicked() {
    console.log('edit recipe clicked');

  }

}
