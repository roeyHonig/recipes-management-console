import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { ListingsService, Recipe } from 'src/app/listings-page/listings.service';

@Component({
  selector: 'app-recipe-form-component',
  templateUrl: './recipe-form-component.component.html',
  styleUrls: ['./recipe-form-component.component.css']
})
export class RecipeFormComponentComponent implements OnInit {

  @Input() title: string = '';
  @Input() ing1Title: string = '';
  @Input() ing1: string = '';
  @Input() ing2Title: string = '';
  @Input() ing2: string = '';
  @Input() ing3Title: string = '';
  @Input() ing3: string = '';
  @Input() instructions: string = '';
  @Input() uid: string = '';

  @Output() onSubmitEvent = new EventEmitter<Recipe>();

  constructor(
    private router: Router,
    private listingService: ListingsService
    ) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    console.log("create new recipe");
    console.log(this.title);
    console.log(this.ing1Title);
    console.log(this.ing1);
    console.log(this.ing2Title);
    console.log(this.ing2);
    console.log(this.ing3Title);
    console.log(this.ing3);
    console.log(this.instructions);
    this.onSubmitEvent.emit(this.listingService.newRecipe(this.title, this.ing1Title, this.ing1, this.ing2Title, this.ing2, this.ing3Title, this.ing3, this.instructions, this.uid));
    this.router.navigateByUrl('/listings'); /* move this to the parent element */
  }

}
