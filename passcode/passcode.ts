import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'passcode',
  templateUrl: 'passcode.html'
})

export class PasscodeComponent {

  /**
   * @input {any} Whether to show the backspace button.
   */
  @Input('backspace') showBackspaceButton: any = 'true';

  /**
   * @input {any} Whether to show the clear button.
   */
  @Input('clear') showClearButton: any = 'true';

  /**
   * @input {any} Whether to show letters on the number buttons.
   */
  @Input('letters') showLetters: any = 'true';

  /**
   * @input {string} The name attribute value of the hidden input element.
   */
  @Input('name') name: string = '';

  /**
   * @input {any} The size of the passcode. Must be a number greater than 0.
   */
  @Input('size') size: any = 4;

  /**
   * @input {string} The current value of the passcode and the value attribute value of the hidden input element.
   */
  @Input('value') value: string = '';

  /**
   * @output {EventEmitter} Emitted whenever the passcode has been cleared.
   */
  @Output() cleared: EventEmitter<any> = new EventEmitter();

  /**
   * @output {EventEmitter} Emitted whenever the passcode has been completed.
   */
  @Output() completed: EventEmitter<any> = new EventEmitter();

  /**
   * @output {EventEmitter} Emitted whenever the passcode has been decremented.
   */
  @Output() decremented: EventEmitter<any> = new EventEmitter();

  /**
   * @output {EventEmitter} Emitted whenever the passcode has been incremented.
   */
  @Output() incremented: EventEmitter<any> = new EventEmitter();

  /**
   * @var {boolean} Whether the passcode is complete.
   */
  isComplete: boolean = false;

  /**
   * @var {number} The current length of the passcode.
   */
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

    // Run the check.
    this.check();
  }

  /**
  * Check if the passcode is complete.
  */
  check(): void {
    if (this.length >= this.size) {
      this.isComplete = true;
      this.completed.emit(this);
    }
  }

  /**
  * Clear the passcode completely.
  */
  clear(): void {
    this.length = 0;
    this.value = '';
    this.isComplete = false;
    this.cleared.emit(this);
  }

  /**
  * Decrement the passcode by 1.
  */
  decrement(): void {
    if (this.length > 0) {
      this.value = this.value.slice(0, -1);
      this.length = this.value.length;
      this.isComplete = false;
      this.decremented.emit(this);
    }
  }

  /**
  * Increment the passcode with 'number'.
  */
  increment(number): void {
    if (this.length < this.size) {
      this.value += number;
      this.length = this.value.length;
      this.incremented.emit(this);
      this.check();
    }
  }

  /**
  * Get an array of length 'length'.
  */
  range(length): any {
    return Array.from({
      length: length
    });
  }

}
