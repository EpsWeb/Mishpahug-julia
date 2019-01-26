import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, NgForm, Validators} from '@angular/forms';

@Component({
  selector: 'max-fill-profile',
  templateUrl: './fill-profile.component.html',
  styleUrls: ['./fill-profile.component.sass']
})
export class FillProfileComponent implements OnInit {

  constructor() {
  }

  confessions = ['religious', 'irreligious'];
  marritalStatuses = ['Single', 'Married', 'Divorced', 'In a civil union', 'In a relationship', 'Widowed'];
  foodPreferences = ['Kosher', 'Vegeterian', 'Any'];
  genders = ['Female', 'Male'];
  languages = ['Hebrew', 'English', 'French', 'Russian', 'Spain'];

  form: FormGroup;

  ngOnInit() {
    this.form = new FormGroup({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      phoneNumber: new FormControl('', [Validators.required]),
      confession: new FormControl('', [Validators.required]),
      birthDate: new FormControl('', [Validators.required]),
      marritalStatus: new FormControl('', [Validators.required]),
      foodPreference: new FormControl('', [Validators.required]),
      gender: new FormControl('', [Validators.required]),
      languages: new FormControl('', [Validators.required]),
      aboutMySelf: new FormControl('', [Validators.required])
    });
  }

  onSubmit(form: NgForm) {
    console.log(form);
  }

}
