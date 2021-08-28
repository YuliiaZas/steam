import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UserI } from 'src/app/core/models/user';
import { ProfileService } from './profile.service';

@Component({
  // selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss'],
  // styleUrls: ['../../shared/form-style.scss', './profile-page.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfilePageComponent implements OnInit {
  public user!: UserI;
  public profileUserForm!: FormGroup;
  public isUpdated = false;
  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly profileService: ProfileService,
  ) { }

  public ngOnInit(): void {
    this.profileUserForm = new FormGroup({
      username: new FormControl(null),
      email: new FormControl(null, [Validators.required, Validators.email]),
      age: new FormControl(null, Validators.pattern(/^\d{1,2}$/)),
    });

    this.user = this.activatedRoute.snapshot.data.user;
    this.profileUserForm.patchValue(this.user);
  }

  public saveChanges() {
    this.profileService.saveChangesRequest(this.profileUserForm.value)
      .subscribe(result => {
        console.log(result.message);
        this.isUpdated = true;
      });
  }
}
