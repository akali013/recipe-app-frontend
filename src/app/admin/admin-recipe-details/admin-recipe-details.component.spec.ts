import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminRecipeDetailsComponent } from './admin-recipe-details.component';

describe('AdminRecipeDetailsComponent', () => {
  let component: AdminRecipeDetailsComponent;
  let fixture: ComponentFixture<AdminRecipeDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminRecipeDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminRecipeDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
