import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SongReviewComponent } from './song-review.component';

describe('SongReviewComponent', () => {
  let component: SongReviewComponent;
  let fixture: ComponentFixture<SongReviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SongReviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SongReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
