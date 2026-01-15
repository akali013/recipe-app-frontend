import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeTablePageComponent } from './recipe-table-page.component';

describe('RecipeTablePageComponent', () => {
  let component: RecipeTablePageComponent;
  let fixture: ComponentFixture<RecipeTablePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecipeTablePageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecipeTablePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
