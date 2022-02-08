import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeFormComponentComponent } from './recipe-form-component.component';

describe('RecipeFormComponentComponent', () => {
  let component: RecipeFormComponentComponent;
  let fixture: ComponentFixture<RecipeFormComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecipeFormComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipeFormComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
