import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators } from "@angular/forms";
import { AfirestoreService } from 'src/app/afirestore.service';
import { AuthService } from 'src/app/auth/auth.service';


@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  settings: any;
  dailyLimitSetting: boolean;
  remindersSetting: boolean;

  constructor(private afirestore: AfirestoreService,
              private authService: AuthService) { }

  ngOnInit() {
    this.afirestore.getSettings(this.authService.userDocId).subscribe( settings => {
      this.dailyLimitSetting = settings['dailyLimit'];
      this.remindersSetting = settings['reminders'];
      console.log('dailyLimitSetting: ', this.dailyLimitSetting);
    });
  }

  updateDailyLimitSetting(event) {
    this.afirestore.updateDailyLimitSetting(this.authService.userDocId, event.checked);
  } 

  updateRemindersSetting(event) {
    this.afirestore.updateRemindersSetting(this.authService.userDocId, event.checked);
  }
}
