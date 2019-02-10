import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, NgForm, Validators} from '@angular/forms';
import {User} from '../shared/models/user.model';
import {AuthService} from '../shared/services/auth.service';
import {UserService} from '../shared/services/user.service';
import {ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'max-fill-profile',
  templateUrl: './fill-profile.component.html',
  styleUrls: ['./fill-profile.component.sass']
})
export class FillProfileComponent implements OnInit {

  constructor(private authService: AuthService, private userServise: UserService, private route: ActivatedRoute) {
  }

  confessions = ['religious', 'irreligious'];
  marritalStatuses = ['single', 'married', 'couple'];
  foodPreferences = ['kosher', 'vegeterian', 'non-vegetarian'];
  genders = ['female', 'male'];
  languages = ['Hebrew', 'English', 'French', 'Russian', 'Spain'];

  form: FormGroup;

  showError = false;

  ngOnInit() {
    this.route.queryParams
      .subscribe((params: Params) => {
      if (params['emptyProfile']) {
        this.showError = true;
        setTimeout(() => {
          this.showError = false;
        }, 3500);
      }
    })
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
    const user = JSON.parse(window.localStorage.getItem('user'));
    const {email, password, pictureLink, banner, rate, numberOfVotes, id} = user;
    console.log(email, password, form.value);

    const newUser = new User(email, password, form.value.firstName, form.value.lastName, form.value.phoneNumber, form.value.birthDate,
      form.value.marritalStatus, form.value.gender, form.value.confession, form.value.languages,
      form.value.foodPreference, form.value.aboutMySelf,
      pictureLink, banner, rate, numberOfVotes, id);
    console.log(newUser);

    this.authService.fillFullProfile();
    this.userServise.fillProfile(newUser)
      .subscribe((u: User) => {
        window.localStorage.clear();
        window.localStorage.setItem('user', JSON.stringify(u));
      });


  }

}
