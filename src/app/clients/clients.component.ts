import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Client } from '../shared/_models/client';
import { ClientService } from '../shared/_services/index';
import { Observable } from 'rxjs';

console.log('`Clients` component loaded asynchronously');

@Component({
  //moduleId: module.id,
  selector: 'clients',
  providers: [
    ClientService
  ],
  styleUrls: [ './clients.style.css' ],
  templateUrl: './clients.template.html'
})
export class ClientsComponent {
  localState;
  sex: string[] = ['Feminino', 'Masculino'];
  marital_status: string[] = ['Solteiro', 'Casado', 'Divorciado', 'Outros'];
  client: Client;  
  powers: string[];
  submitted: boolean = false;
  
  constructor(public route: ActivatedRoute, private clientService: ClientService) {

   }
  
  ngOnInit() {
      this.client = new Client(18, 'Dr IQ', 'Really Smart', 'Chuck Overstreet', 'iq@superhero.com');
      
  }

  onSubmit()  {
    console.log(this.clientService.add(this.client));
    this.submitted = true;
  }

  create(name) {
    let client = {name: name};
    this.clientService.add(client).subscribe(
       data => {
         // refresh the list
         //this.getAll();
         return true;
       },
       error => {
         console.error("Error saving client!");
         return Observable.throw(error);
       }
    );
  }
 
  edit(client) {
    this.clientService.update(client).subscribe(
       data => {
         // refresh the list
         //this.getAll();
         return true;
       },
       error => {
         console.error("Error saving client!");
         return Observable.throw(error);
       }
    );
  }
 
  remove(client) {
    if (confirm("Are you sure you want to delete " + client.name + "?")) {
      this.clientService.remove(client).subscribe(
         data => {
           // refresh the list
           //this.getAll();
           return true;
         },
         error => {
           console.error("Error deleting client!");
           return Observable.throw(error);
         }
      );
    }
  }
}
