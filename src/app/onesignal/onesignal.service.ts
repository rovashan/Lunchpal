import { Injectable } from '@angular/core';

let OneSignal;

@Injectable({
  providedIn: 'root'
})
export class OnesignalService {
  constructor() { }

  //init the OneSignal service
  public init(){
    OneSignal = window['OneSignal'] || [];
    console.log("init OneSignal...");
    
    OneSignal.push(function(){
      //initialize oneSignal service
      OneSignal.init({
        appId: "9f70c0b5-ef71-4685-a610-73dc415b0d3d",
        autoRegister: false,
        allowLocalhostAsSecureOrigin: true,
        notifyButton: {
          enable: false
        }
      })
    });
  
    OneSignal.getUserId()
    .then((userId)=>{
      if(userId) {
        OneSignal.registerForPushNotifications();
      }else{
        OneSignal.showHttpPrompt();
      }
    })
    
  }

  //update user changes
  updateChanges(){
    OneSignal.push(function () {
      // Occurs when the user's subscription changes to a new value.
      OneSignal.on('subscriptionChange', function (isSubscribed) {
        console.log("The user's subscription state is now:", isSubscribed);
        OneSignal.getUserId().then(function (userId) {
          console.log("User ID is", userId);
        });
      });
    });  
  }


  //in app custom notification
  sendReminder(){
 
    OneSignal.sendSelfNotification(
      /* Title (defaults if unset) */
      "Welcome To LunchPal",
      /* Message (defaults if unset) */
      "Take a look at our weekly and monthly meal plans, and find a fit for you.", 
       /* URL (defaults if unset) */
      'https://localhost:4200/plans',
      /* Icon */
      'https://onesignal.com/images/notification_logo.png',
      
    );
  
    // only for debugging OneSignal
    //OneSignal.log.setLevel('trace')
  }

  customNotification(title: string, message: string){
    OneSignal.sendSelfNotification(
      title,
      message,
      'https://localhost:4200/plans',
      'https://onesignal.com/images/notification_logo.png',
      
    );
  }



}

