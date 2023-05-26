import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CenterprofileComponent } from './centerprofile.component';

describe('CenterprofileComponent', () => {
  let component: CenterprofileComponent;
  let fixture: ComponentFixture<CenterprofileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CenterprofileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CenterprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
