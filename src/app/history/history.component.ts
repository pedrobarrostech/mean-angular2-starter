import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { FormGroup, FormControl, Validators, FormBuilder }  from '@angular/forms';

import { HistoryService } from '../shared/_services/history.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.template.html',
  styleUrls: ['./history.style.css']
})
export class HistoryComponent implements OnInit {

  private histories = [];
  private isLoading = true;

  private history = {};
  private isEditing = false;

  private addHistoryForm: FormGroup;
  private user = new FormControl("", Validators.required);
  private comments = new FormControl("", Validators.required);
  
  private infoMsg = { body: "", type: "info"};

  constructor(private http: Http,
              private _historyService: HistoryService,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.getHistory();

    this.addHistoryForm = this.formBuilder.group({
      user: this.user,
      comments: this.comments
    });

  }

  getHistory() {
    this._historyService.getAll().subscribe(
      data => this.history = data,
      error => console.log(error),
      () => this.isLoading = false
    );
  }

  addHistory() {
    this._historyService.add(this.addHistoryForm.value).subscribe(
      res => {
        var newHistory = res;
        this.histories.push(newHistory);
        this.addHistoryForm.reset();
        this.sendInfoMsg("item added successfully.", "success");
      },
      error => console.log(error)
    );
  }

  enableEditing(history) {
    this.isEditing = true;
    this.history = history;
  }

  cancelEditing() {
    this.isEditing = false;
    this.history = {};
    this.sendInfoMsg("item editing cancelled.", "warning");
    // reload the history to reset the editing
    this.getHistory();
  }

  editHistory(history) {
    this._historyService.update(history).subscribe(
      res => {
        this.isEditing = false;
        this.history = history;
        this.sendInfoMsg("item edited successfully.", "success");
      },
      error => console.log(error)
    );
  }

  deleteHistory(history) {
    if(window.confirm("Are you sure you want to permanently delete this item?")) {
      this._historyService.remove(history).subscribe(
        res => {
          var pos = this.histories.map(history => { return history._id }).indexOf(history._id);
          this.histories.splice(pos, 1);
          this.sendInfoMsg("item deleted successfully.", "success");
        },
        error => console.log(error)
      );
    }
  }

  sendInfoMsg(body, type, time = 3000) {
    this.infoMsg.body = body;
    this.infoMsg.type = type;
    window.setTimeout(() => this.infoMsg.body = "", time);
  }

}
