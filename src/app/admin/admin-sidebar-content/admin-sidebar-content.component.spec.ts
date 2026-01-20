import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSidebarContentComponent } from './admin-sidebar-content.component';

describe('AdminSidebarContentComponent', () => {
  let component: AdminSidebarContentComponent;
  let fixture: ComponentFixture<AdminSidebarContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminSidebarContentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminSidebarContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
