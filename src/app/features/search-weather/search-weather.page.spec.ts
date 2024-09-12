import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchWeatherPage } from './search-weather.page';

describe('SearchWeatherPage', () => {
  let component: SearchWeatherPage;
  let fixture: ComponentFixture<SearchWeatherPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchWeatherPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
