import {Observable} from 'rxjs';
import {TextInputType} from './TextInputType';

export class TextInputSetting {
  public readonly settingName: string;

  public settingDefaultValue: string;
  public settingValue: string;
  public newValue: string;

  public inputType: string;
  public label: string;

  private readonly valueObservable: Observable<string>;
  private readonly valueChangeFunction: (value: string, defaultValue: string) => void;

  public constructor(settingName: string, inputType: TextInputType, label: string, settingDefaultValue: string, settingValue: string,
                     valueObservable: Observable<string>, func: (value: string, defaultValue: string) => void) {
    this.settingName = settingName;
    this.inputType = inputType;
    this.label = label;
    this.settingDefaultValue = settingDefaultValue;
    this.settingValue = settingValue ? settingValue : settingDefaultValue;
    this.newValue = settingValue ? settingValue : settingDefaultValue;
    this.valueObservable = valueObservable;
    this.valueObservable.subscribe(value => {this.settingValue = value; this.newValue = value; });
    this.valueChangeFunction = func;
  }

  triggerValueChange(): void {
    this.valueChangeFunction(this.newValue, this.settingDefaultValue);
  }

}
