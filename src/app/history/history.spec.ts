import { TestComponentBuilder } from '@angular/compiler/testing';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  addProviders,
  inject
} from '@angular/core/testing';

// Load the implementations that should be tested
import { History } from './history.component';

describe('History', () => {
  // provide our implementations or mocks to the dependency injector
  beforeEach(() => addProviders([
    // provide a better mock
    {
      provide: ActivatedRoute,
      useValue: {
        data: {
          subscribe: (fn) => fn({yourData: 'yolo'})
        }
      }
    },
    History
  ]));

  it('should log ngOnInit', inject([ History ], (history) => {
    spyOn(console, 'log');
    expect(console.log).not.toHaveBeenCalled();

    history.ngOnInit();
    expect(console.log).toHaveBeenCalled();
  }));

});
