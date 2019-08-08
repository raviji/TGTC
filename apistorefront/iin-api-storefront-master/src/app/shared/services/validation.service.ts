import { Injectable } from '@angular/core';

/**
 * This class provides the ValidationService service
 */
@Injectable()
export class ValidationService {
  // check URL format
  checkURL(str) {
    const strRegex = '^((https|http|ftp|rtsp|mms)?://)'
    + '?(([0-9a-z_!~*\'().&=+$%-]+: )?[0-9a-z_!~*\'().&=+$%-]+@)?' // ftp's user@
    + '(([0-9]{1,3}.){3}[0-9]{1,3}' // IP format URL- 199.194.52.184
    + '|' // allow IP and DOMAIN
    + '([0-9a-z_!~*\'()-]+.)*' // DOMAIN- www.
    + '([0-9a-z][0-9a-z-]{0,61})?[0-9a-z].' // Secondart DOMAIN
    + '[a-z]{2,6})' // first level domain- .com or .museum
    + '(:[0-9]{1,4})?' // port- :80
    + '((/?)|' // a slash isn't required if there is no file name
    + '(/[0-9a-z_!~*\'().;?:@&=+$,%#-]+)+/?)$';

    const re = new RegExp(strRegex);

    if (re.test(str)) {
      return (true);
    } else {
      return (false);
    }
  }
}

