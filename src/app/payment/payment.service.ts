import { Injectable } from '@angular/core';

const INITIATE_URL = 'https://secure.paygate.co.za/payweb3/initiate.trans';
const REDIRECT_URL = 'https://secure.paygate.co.za/payweb3/process.trans';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor() { }
}
