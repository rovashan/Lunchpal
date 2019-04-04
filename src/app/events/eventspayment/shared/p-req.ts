export class PReq {
    VERSION: string;    //21
    PAYGATE_ID: string;     //10011072130
    REFERENCE: string;  //we need to generate this for storage

    AMOUNT: number; //cents
    CURRENCY: string;   //ZAR
    RETURN_URL: string; //redirect after payment
    TRANSACTION_DATE: string;   //2019-02-11 18:30 - UTC
    EMAIL: string;  //customer email

    SUBS_START_DATE: string;    //2019-02-18 - next monday on calendar
    SUBS_END_DATE: string;      //2019-02-18 - some date in future in 7 day increments
    SUBS_FREQUENCY: string;     //112
    PROCESS_NOW: string;    //YES
    PROCESS_NOW_AMOUNT: number; // same as AMOUNT
    CHECKSUM: string;
}