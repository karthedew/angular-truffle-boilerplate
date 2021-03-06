import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WalletInformationComponent } from './wallet-information.component';

describe('WalletInformationComponent', () => {
  let component: WalletInformationComponent;
  let fixture: ComponentFixture<WalletInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WalletInformationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WalletInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
