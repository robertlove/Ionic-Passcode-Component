# Ionic Passcode Component

An Ionic Framework Component for creating a Passcode or PIN input.

![Ionic Passcode Component](screenshot.png)

## Features

* Extremely flexible and easily configurable via HTML attributes
* Extensively themeable with plenty of wrapping markup and CSS hooks
* Can be used stand-alone or as a form control

## Installation

1. Copy the `passcode` folder to `/src/components`

2. Import the Ionic Passcode Component in `/src/app/app.module.ts`

```javascript
import { PasscodeComponent } from '../components/passcode/passcode';
```

3. Add the Ionic Passcode Component to your declarations in `/src/app/app.module.ts`

```javascript
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    PasscodeComponent
    ...
```

4. Start using the Ionic Passcode Component in your views like so:

```html
<passcode></passcode>
```

## Attributes

The Ionic Passcode Component is easily configurable via HTML attributes. All attributes are optional.

Name      | Type    | Default | Description
--------- | ------- | ------- | -----------
backspace | boolean | true    | Whether to show the backspace button.
clear     | boolean | true    | Whether to show the clear button.
letters   | boolean | true    | Whether to show letters on the number buttons.
name      | string  |         | The name attribute value of the hidden input element.
size      | number  | 4       | The size of the passcode. Must be a number greater than 0.
value     | number  |         | The current value of the passcode and the value attribute value of the hidden input element.

## Events

Name        | Description
----------- | -----------
cleared     | Emitted whenever the passcode is cleared.
completed   | Emitted whenever the passcode is completed.
decremented | Emitted whenever the passcode is decremented.
incremented | Emitted whenever the passcode is incremented.
initialized | Emitted after the component view has been initialized.

## Properties

Name       | Type    | Default | Description
---------- | ------- | ------- | -----------
isComplete | boolean | false   | Whether the passcode has been completed.
length     | number  | 0       | The current length of the passcode.

## Methods

Name      | Arguments      | Returns | Description
--------- | -------------- | ------- | -----------
check     |                | void    | Checks if the passcode is completed and, if so, emits the `completed` event.
clear     |                | void    | Clears the passcode and emits the `cleared` event.
decrement |                | void    | Decrements the passcode by one character and emits the `decremented` event.
increment | number: number | void    | Increments the passcode with `number` and emits the `incremented` event.
range     | length: number | array   | Returns an array with a length of `length`.

## Example Usage

The following example assumes you have a Home Page at `/src/pages/home`. If not, just replace home in the example with your page.

1. Update `/src/pages/home/home.html` with the following:

```html
<ion-header>
  <ion-navbar>
    <ion-title>Passcode</ion-title>
  </ion-navbar>
</ion-header>
<ion-content padding>
  <passcode
    backspace="true"
    clear="true"
    letters="true"
    name="user_passcode"
    size="6"
    value=""
    (cleared)="onPasscodeCleared($event)"
    (completed)="onPasscodeCompleted($event)"
    (decremented)="onPasscodeDecremented($event)"
    (incremented)="onPasscodeIncremented($event)"
    (initialized)="onPasscodeInitialized($event)"
  ></passcode>
</ion-content>
```

2. Update `/src/pages/home/home.ts` with the following:

```javascript
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  constructor(public navCtrl: NavController) {}

  onPasscodeCleared(passcode): void {
    console.log('Passcode Cleared:', passcode);
  }

  onPasscodeCompleted(passcode): void {
    console.log('Passcode Completed:', passcode);
  }

  onPasscodeDecremented(passcode): void {
    console.log('Passcode Decremented:', passcode);
  }

  onPasscodeIncremented(passcode): void {
    console.log('Passcode Incremented:', passcode);
  }

  onPasscodeInitialized(passcode): void {
    console.log('Passcode Initialized:', passcode);
  }

}
```
