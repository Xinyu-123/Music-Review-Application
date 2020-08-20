import { Component, OnInit } from '@angular/core';
import { HttpService } from '../_services/http.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  form: FormGroup;
  constructor(private http: HttpService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      make_admin :'',
      remove_admin: ''
    });
  }

  delete_songs(){
    this.http.delete_songs().subscribe();
  }

  delete_users() {
    this.http.delete_users().subscribe();
  }

  create_admin(){
    //make user an admin
    this.http.makeAdmin(this.form.value.make_admin).subscribe();
  }

  remove_admin(){
    this.http.removeAdmin(this.form.value.remove_admin).subscribe();
  }

}
