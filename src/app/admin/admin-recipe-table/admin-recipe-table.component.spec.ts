import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminRecipeTableComponent } from './admin-recipe-table.component';

describe('AdminRecipeTableComponent', () => {
  let component: AdminRecipeTableComponent;
  let fixture: ComponentFixture<AdminRecipeTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminRecipeTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminRecipeTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
