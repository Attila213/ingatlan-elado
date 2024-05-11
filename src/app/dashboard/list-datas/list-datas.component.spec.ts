import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDatasComponent } from './list-datas.component';

describe('ListDatasComponent', () => {
  let component: ListDatasComponent;
  let fixture: ComponentFixture<ListDatasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListDatasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListDatasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
