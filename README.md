# Ionic Passcode Component

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

## Configuration

The Ionic Passcode Component is easily configurable via HTML attributes.

Name      | Type    | Default | Description
--------- | ------- | ------- | -----------
backspace | boolean | true    | Whether to show the backspace button
clear     | boolean | true    | Whether to show the clear button
letters   | boolean | true    | Whether to show letters on the number buttons
name      | string  |         | The name attribute value of the hidden input element
size      | number  | 4       | The size of the passcode. Must be a number greater than 0
value     | number  |         | The current value of the passcode and the value attribute value of the hidden input element

## Events

Name        | Description
----------- | -----------
cleared     | Emitted whenever the passcode has been cleared
completed   | Emitted whenever the passcode has been completed
decremented | Emitted whenever the passcode has been decremented
incremented | Emitted whenever the passcode has been incremented

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
    console.log('onPasscodeCleared', passcode);
  }

  onPasscodeCompleted(passcode): void {
    console.log('onPasscodeCompleted', passcode);
  }

  onPasscodeDecremented(passcode): void {
    console.log('onPasscodeDecremented', passcode);
  }

  onPasscodeIncremented(passcode): void {
    console.log('onPasscodeIncremented', passcode);
  }

}
```
