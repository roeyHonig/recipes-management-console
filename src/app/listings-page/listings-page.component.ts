import { Component, OnInit } from '@angular/core';
import { ListingsService, Recipe } from './listings.service';

@Component({
  selector: 'app-listings-page',
  templateUrl: './listings-page.component.html',
  styleUrls: ['./listings-page.component.css']
})
export class ListingsPageComponent implements OnInit {
  recipes: Array<Recipe> = [];

  constructor(private listingsService: ListingsService) { }

  ngOnInit(): void {
    this.recipes = this.listingsService.getRecipes();
  }

}
