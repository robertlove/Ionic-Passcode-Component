import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Events } from 'ionic-angular';

@Component({
  selector: 'passcode',
  templateUrl: 'passcode.html'
})

export class PasscodeComponent {

  @Input('backspace') showBackspaceButton: any = 'true';

  @Input('clear') showClearButton: any = 'true';

  @Input('letters') showLetters: any = 'true';

  @Input('name') name: string = '';

  @Input('size') size: any = 4;

  @Input('value') value: string = '';

  @Output() cleared: EventEmitter<any> = new EventEmitter();

  @Output() completed: EventEmitter<any> = new EventEmitter();

  @Output() decremented: EventEmitter<any> = new EventEmitter();

  @Output() incremented: EventEmitter<any> = new EventEmitter();

  @Output() initialized: EventEmitter<any> = new EventEmitter();

  isComplete: boolean = false;

  length: number = 0;

  constructor(public events: Events) {
    // Listen for the passcode:clear event.
    this.events.subscribe('passcode:clear', () => {
      this.clear();
    });
  }

  ngAfterViewInit() {

    // Ensure size is a number greater than 0. If it isn't, set it to 4.
    this.size = Number(this.size);
    if (isNaN(this.size) || this.size <= 0) {
      this.size = 4;
    }

    // Ensure the value is not longer than the size.
    this.value = this.value.substr(0, this.size);

    // Store the current length of the passcode for comparison.
    this.length = this.value.length;

    // Strings to booleans
    this.showBackspaceButton = (this.showBackspaceButton == 'true') ? true : false;
    this.showClearButton = (this.showClearButton == 'true') ? true : false;
    this.showLetters = (this.showLetters == 'true') ? true : false;

    // Emit the initialized event.
    this.initialized.emit(this);

    // Run the check.
    this.check();
  }

  check(): void {
    if (this.length >= this.size) {
      this.isComplete = true;
      this.completed.emit(this);
    }
  }

  clear(): void {
    this.length = 0;
    this.value = '';
    this.isComplete = false;
    this.cleared.emit(this);
  }

  decrement(): void {
    if (this.length > 0) {
      this.value = this.value.slice(0, -1);
      this.length = this.value.length;
      this.isComplete = false;
      this.decremented.emit(this);
    }
  }

  increment(number): void {
    if (this.length < this.size) {
      this.value += number;
      this.length = this.value.length;
      this.incremented.emit(this);
      this.check();
    }
  }

  range(length): any {
    return Array.from({
      length: length
    });
  }

}
