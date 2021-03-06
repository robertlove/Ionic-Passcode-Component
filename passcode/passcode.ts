import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'passcode',
  templateUrl: 'passcode.html'
})

export class PasscodeComponent {

  @Input('name') name: string = '';

  @Input('show-backspace-button') showBackspaceButton: any = 'true';

  @Input('show-clear-button') showClearButton: any = 'true';

  @Input('show-letters') showLetters: any = 'true';

  @Input('size') size: any = 4;

  @Input('value') value: string = '';

  @Output() changed: EventEmitter<any> = new EventEmitter();

  @Output() cleared: EventEmitter<any> = new EventEmitter();

  @Output() completed: EventEmitter<any> = new EventEmitter();

  @Output() decremented: EventEmitter<any> = new EventEmitter();

  @Output() incremented: EventEmitter<any> = new EventEmitter();

  @Output() initialized: EventEmitter<any> = new EventEmitter();

  isComplete: boolean = false;

  length: number = 0;

  constructor() {}

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

  clear(): void {
    this.length = 0;
    this.value = '';
    this.isComplete = false;
    this.cleared.emit(this);
    this.changed.emit(this);
  }

  decrement(): void {
    if (this.length > 0) {
      this.value = this.value.slice(0, -1);
      this.length = this.value.length;
      this.isComplete = false;
      this.decremented.emit(this);
      this.changed.emit(this);
    }
  }

  increment(number): void {
    if (this.length < this.size) {
      this.value += number;
      this.length = this.value.length;
      this.incremented.emit(this);
      this.changed.emit(this);
      this.check();
    }
  }

  private check(): void {
    if (this.length >= this.size) {
      this.isComplete = true;
      this.completed.emit(this);
    }
  }

  private range(length): any {
    return Array.from({
      length: length
    });
  }

}
