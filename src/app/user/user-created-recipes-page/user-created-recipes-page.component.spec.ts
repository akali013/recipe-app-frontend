import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCreatedRecipesPageComponent } from './user-created-recipes-page.component';

describe('UserCreatedRecipesPageComponent', () => {
  let component: UserCreatedRecipesPageComponent;
  let fixture: ComponentFixture<UserCreatedRecipesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserCreatedRecipesPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserCreatedRecipesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
