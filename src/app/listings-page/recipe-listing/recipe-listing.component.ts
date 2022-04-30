import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Recipe } from '../listings.service';

@Component({
  selector: 'app-recipe-listing',
  templateUrl: './recipe-listing.component.html',
  styleUrls: ['./recipe-listing.component.css']
})
export class RecipeListingComponent implements OnInit {

  @Input() recipe: Recipe | undefined;
  @Output() onRecipeListingClicked = new EventEmitter<Recipe>();
  @Output() onRecipeListingEditClicked = new EventEmitter<Recipe>();
  @Output() onRecipeListingDeleteClicked = new EventEmitter<Recipe>();
  title = '';

  constructor() { }

  ngOnInit(): void {
    this.title = this.recipe?.title ?? '';
  }

  onRecipeClicked() {
    this.onRecipeListingClicked.emit(this.recipe);
  }

  onEditRecipeClicked() {
    this.onRecipeListingEditClicked.emit(this.recipe);
  }

  onDeleteRecipeClicked(event: any) {
    event.stopPropagation();
    this.onRecipeListingDeleteClicked.emit(this.recipe);
  }

}
