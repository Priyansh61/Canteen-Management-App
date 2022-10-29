import { TestBed } from '@angular/core/testing';

import { TokenIntercepInterceptor } from './token-intercep.interceptor';

describe('TokenIntercepInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      TokenIntercepInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: TokenIntercepInterceptor = TestBed.inject(TokenIntercepInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
