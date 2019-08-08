import { inject, TestBed } from '@angular/core/testing';
import { ValidationService } from './validation.service';


describe('ValidationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ValidationService]
    });
  });

  it('should be created', inject([ValidationService], (service: ValidationService) => {
    expect(service).toBeTruthy();
  }));

  it('should return false for invalid URL format', inject([ValidationService], (service: ValidationService) => {
    // list from: https://mathiasbynens.be/demo/url-regex
    const testArray = [
      'http://',
      'http://.',
      'http://..',
      'http://../',
      'http://?',
      'http://??',
      'http://??/',
      'http://#',
      'http://##',
      'http://##/',
      'http://foo.bar?q=Spaces should be encoded',
      '//',
      '//a',
      '///a',
      '///',
      'http:///a',
      'rdar://1234',
      'h://test',
      'http:// shouldfail.com',
      ':// should fail',
      'ftps://foo.bar/',
      'http://.www.foo.bar/',
      'http://www.foo.bar./',
      'http://.www.foo.bar./',
    ];

    testArray.forEach(element => {
      expect(service.checkURL(element)).toBeFalsy();
    });
  }));

  it('should return true for valid URL format', inject([ValidationService], (service: ValidationService) => {
    // list from: https://mathiasbynens.be/demo/url-regex
    const testArray = [
      'http://foo.com/blah_blah',
      'http://foo.com/blah_blah/',
      'http://foo.com/blah_blah_(wikipedia)',
      'http://foo.com/blah_blah_(wikipedia)_(again)',
      'http://www.example.com/wpstyle/?p=364',
      'https://www.example.com/foo/?bar=baz&inga=42&quux',
      'http://userid:password@example.com:8080',
      'http://userid:password@example.com:8080/',
      'http://userid@example.com',
      'http://userid@example.com/',
      'http://userid@example.com:8080',
      'http://userid@example.com:8080/',
      'http://userid:password@example.com',
      'http://userid:password@example.com/',
      'http://142.42.1.1/',
      'http://142.42.1.1:8080/',
      'http://foo.com/blah_(wikipedia)#cite-1',
      'http://foo.com/blah_(wikipedia)_blah#cite-1',
      'http://foo.com/(something)?after=parens',
      'http://code.google.com/events/#&product=browser',
      'http://j.mp',
      'ftp://foo.bar/baz',
      'http://1337.net',
      'http://a.b-c.de',
      'http://223.255.255.254'
    ];

    testArray.forEach(element => {
      expect(service.checkURL(element)).toBeTruthy();
    });
  }));

});
