# JSONForms - More Forms. Less Code

## Complex Forms in the blink of an eye

JSONForms eliminates the tedious task of writing fully-featured forms by hand by leveraging the capabilities of JSON, JSON Schema and Javascript.

# Spectrum Renderers Package

See how you can use the Spectrum renderers to render your forms.

# Grid Array Control

<details>
  <summary>Show me how to use it</summary>

### UI Schema and Custom options

```json
{
  "type": "Control",
  "scope": "#/properties/myArray",
  "options": {
    "addButtonLabel": "Add item",
    "addButtonLabelType": "tooltip",
    "addButtonPosition": "top"
  }
}
```

#### Custom Options Overview

| Option               | Required | Default (Option not used) | Values                | Description                                       |
| -------------------- | -------- | ------------------------- | --------------------- | ------------------------------------------------- |
| "addButtonLabel"     | no       | "Add to \${label}"        | String                | Custom add Button Label.                          |
| "addButtonLabelType" | no       | "tooltip"                 | "tooltip" or "inline" | Whether the Label should be inline or as tooltip. |
| "addButtonPosition"  | no       | "top"                     | "top" or "bottom"     | Position of the add Button.                       |

</details>
<br/>

# Horizontal Layout

<details>
  <summary>Show me how to use it</summary>

### UI Schema and Custom options

```json
{
  "type": "HorizontalLayout",
  "elements": [ ... ],
  "options": {
    "spacing": [3, 1]
  }
}
```

#### Custom Options Overview

| Option    | Required | Default (Option not used) | Values          | Description                 |
| --------- | -------- | ------------------------- | --------------- | --------------------------- |
| "spacing" | no       | 1                         | Array of Number | flex-grow for each element. |

</details>
<br/>

# Boolean Switch (Toggle) Component

[React Spectrum Switch](https://react-spectrum.adobe.com/react-spectrum/Switch.html)

<details>
  <summary>Show me how to use it</summary>

### Schema

```json
{
  "type": "object",
  "properties": {
    "switch": {
      "type": "boolean",
      "default": true
    }
  },
  "required": ["switch"] //If it should be required
}
```

#### Custom Options Overview

| Option    | Required | Default (Option not used) | Values    | Description                                          |
| --------- | -------- | ------------------------- | --------- | ---------------------------------------------------- |
| "type"    | yes      | null                      | "boolean" | Must be Boolean.                                     |
| "default" | no       | null                      | Boolean   | Default Value (will be inserted only at rendertime). |

### UI Schema and Custom options

```json
{
  "type": "HorizontalLayout", //or any other layout
  "elements": [
    {
      "type": "Control",
      "scope": "#/properties/switch",
      "label": "Switch Component", //Optional Label, default label is the property name, in this example it would be Switch
      "options": {
        "focus": true,
        "isEmphasized": false,
        "toggle": true
      }
    }
  ]
}
```

#### Custom Options Overview

| Option         | Required | Default (Option not used)        | Values        | Description                                   |
| -------------- | -------- | -------------------------------- | ------------- | --------------------------------------------- |
| "focus"        | no       | false                            | true or false | If true it will be focused after it rendered. |
| "isEmphasized" | no       | false                            | true or false | Changes the appearance.                       |
| "toggle"       | yes      | Without "toggle" it's a Checkbox | true or false | If true the Component will be a toggle.       |

</details>
<br/>

# Boolean Checkbox (Toggle) Component

[React Spectrum Checkbox](https://react-spectrum.adobe.com/react-spectrum/RadioGroup.html)

<details>
  <summary>Show me how to use it</summary>

### Schema

```json
{
  "type": "object",
  "properties": {
    "checkbox": {
      "default": true,
      "type": "boolean"
    }
  },
  "required": ["checkbox"] //If it should be required
}
```

#### Custom Options Overview

| Option    | Required | Default (Option not used) | Values  | Description                                          |
| --------- | -------- | ------------------------- | ------- | ---------------------------------------------------- |
| "default" | no       | null                      | Boolean | Default Value (will be inserted only at rendertime). |
| "type"    | yes      | null                      | String  | Must be provided.                                    |

#### Custom Options Overview

| Option | Required | Default (Option not used) | Values    | Description      |
| ------ | -------- | ------------------------- | --------- | ---------------- |
| "type" | yes      | null                      | "boolean" | Must be Boolean. |

### UI Schema and Custom options

```json
{
  "type": "HorizontalLayout", //or any other layout
  "elements": [
    {
      "type": "Control",
      "scope": "#/properties/checkbox",
      "label": "Checkbox Component", //Optional Label, default label is the property name, in this example it would be Checkbox
      "options": {
        "focus": true,
        "isEmphasized": false
      }
    }
  ]
}
```

#### Custom Options Overview

| Option         | Required | Default (Option not used) | Values        | Description                                   |
| -------------- | -------- | ------------------------- | ------------- | --------------------------------------------- |
| "focus"        | no       | false                     | true or false | If true it will be focused after it rendered. |
| "isEmphasized" | no       | false                     | true or false | Changes the appearance.                       |

</details>
<br/>

# Boolean Button (Toggle) Component

[React Spectrum ToggleButton](https://react-spectrum.adobe.com/react-spectrum/ToggleButton.html)

<details>
  <summary>Show me how to use it</summary>

### Schema

```json
{
  "type": "object",
  "properties": {
    "booleanButton": {
      "type": "boolean",
      "default": true
    }
  },
  "required": ["booleanButton"] //If it should be required
}
```

#### Custom Options Overview

| Option    | Required | Default (Option not used) | Values    | Description                                          |
| --------- | -------- | ------------------------- | --------- | ---------------------------------------------------- |
| "type"    | yes      | null                      | "boolean" | Must be Boolean.                                     |
| "default" | no       | null                      | Boolean   | Default Value (will be inserted only at rendertime). |

### UI Schema and Custom options

```json
{
  "type": "HorizontalLayout", //or any other layout
  "elements": [
    {
      "type": "Control",
      "scope": "#/properties/switch",
      "label": "Switch Component", //Optional Label, default label is the property name, in this example it would be Switch
      "options": {
        "button": true,
        "focus": true,
        "isEmphasized": false,
        "isQuiet": false,
        "staticColor": "white"
      }
    }
  ]
}
```

#### Custom Options Overview

| Option         | Required | Default (Option not used)        | Values             | Description                                                                              |
| -------------- | -------- | -------------------------------- | ------------------ | ---------------------------------------------------------------------------------------- |
| "button"       | yes      | Without "button" it's a Checkbox | true or false      | If true the Component will be a Button.                                                  |
| "focus"        | no       | false                            | true or false      | If true it will be focused after it rendered.                                            |
| "isEmphasized" | no       | false                            | true or false      | Changes the appearance.                                                                  |
| "isQuiet"      | no       | false                            | true or false      | Changes the appearance.                                                                  |
| "staticColor"  | no       | false                            | "white" or "black" | The static color style to apply. Useful when the button appears over a color background. |

</details>
<br/>

# Date Component (React Spectrum Release candidate)

[React Spectrum DatePicker (RC)](https://reactspectrum.blob.core.windows.net/reactspectrum/91ca94fe52840b7a32b961ec08208f5fbdf65697/docs/react-spectrum/DatePicker.html)

<details>
  <summary>Show me how to use it</summary>

## How to use it

### Schema

```json
{
  "type": "object",
  "properties": {
    "date": {
      "default": "2022-03-01",
      "type": "string",
      "format": "date"
    }
  },
  "required": ["date"] //If it should be required
}
```

#### Custom Options Overview

| Option    | Required | Default (Option not used) | Values          | Description                                          |
| --------- | -------- | ------------------------- | --------------- | ---------------------------------------------------- |
| "default" | no       | null                      | Date (ISO 8601) | Default Value (will be inserted only at rendertime). |
| "format"  | yes      | null                      | "date"          | Must be Date, else it's a string.                    |
| "type"    | yes      | null                      | "string"        | Must be String.                                      |

### UI Schema and Custom options

```json
UI Schema
{
  "type": "HorizontalLayout", //or any other layout
  "elements": [
    {
      "type": "Control",
      "scope": "#/properties/date",
      "label": "Date Component", //Optional Label, default label is the property name, in this example it would be Date
      "options": {
            "description": "Custom description",
            "erroMessage": "Custom error message",
            "focus": true,
            "hideTimeZone": true,
            "isQuiet": true,
            "labelAlign": "end",
            "labelPosition": "top",
            "locale": "ja-Jpan-JP-u-ca-japanese-hc-h12",
            "maxValue": "2022-12-31",
            "maxVisibleMonths": 3,
            "minValue": "today",
            "necessityIndicator": "label",
            "trim": false
      }
    }
  ]
}
```

#### Custom Options Overview

| Option               | Required | Default (Option not used) | Values                                                                                                                               | Description                                                                                                                       |
| -------------------- | -------- | ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------- |
| "description"        | no       | null                      | String                                                                                                                               | A Description for your Date Component. Will be displayed if no error is displayed.                                                |
| "errorMessage"       | no       | null                      | String or false (no ErrorMessage)                                                                                                    | Create a Custom Error Message.                                                                                                    |
| "focus"              | no       | false                     | true or false                                                                                                                        | If true it will be focused after it rendered.                                                                                     |
| "hideTimeZone"       | no       | true                      | true or false                                                                                                                        | Hides Time Zone or not.                                                                                                           |
| "isQuiet"            | no       | false                     | true or false                                                                                                                        | Changes the appearance.                                                                                                           |
| "labelAlign"         | no       | "start"                   | "start" or "end"                                                                                                                     | Has only effect when labelPosition="top". Place the Label at the start or end of the control.                                     |
| "labelPosition"      | no       | "top"                     | "top" or "side"                                                                                                                      | Position of the Label.                                                                                                            |
| "locale"             | no       | "gregory"                 | String [See MDN for more Informations](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Locale) | Which Calendar should be used.                                                                                                    |
| "maxValue"           | no       | null                      | Date E.g. "2022-12-31" or "today"                                                                                                    | When the Value is above maxValue, a warning icon will be displayed inside the Component and you can't pick a Date after maxValue. |
| "maxVisibleMonths"   | no       | 1                         | Integer                                                                                                                              | How many Months should be displayed while Picking.                                                                                |
| "minValue"           | no       | null                      | Date E.g. "2022-12-31" or "today"                                                                                                    | When the Value is below minValue, a warning icon will be displayed inside the Component and you can't pick a Date befor minValue. |
| "necessityIndicator" | no       | false                     | "label", "icon" or false                                                                                                             | Decide if the necessity indicator should be displayed, icon = \*, label = "required" or "optional" in the Browser Language.       |
| "trim"               | no       | false                     | true or false                                                                                                                        | If false the Component uses 100% width, else the Component will be trimmed.                                                       |

</details>
<br/>

# Date Time Component (React Spectrum Release Candidate)

[React Spectrum DatePicker (RC)](https://reactspectrum.blob.core.windows.net/reactspectrum/91ca94fe52840b7a32b961ec08208f5fbdf65697/docs/react-spectrum/DatePicker.html)

<details>
  <summary>Show me how to use it</summary>

## How to use it

### Schema

```json
{
  "type": "object",
  "properties": {
    "dateTime": {
      "default": "2022-03-01T12:00:00",
      "type": "string",
      "format": "date-time"
    }
  },
  "required": ["dateTime"] //If it should be required
}
```

#### Custom Options Overview

| Option    | Required | Default (Option not used) | Values               | Description                                          |
| --------- | -------- | ------------------------- | -------------------- | ---------------------------------------------------- |
| "default" | no       | null                      | Date-Time (ISO 8601) | Default Value (will be inserted only at rendertime). |
| "format"  | yes      | null                      | "date-time"          | Must be Date-Time, else it's a string.               |
| "type"    | yes      | null                      | "string"             | Must be String.                                      |

### UI Schema and Custom options

```json
UI Schema
{
  "type": "HorizontalLayout", //or any other layout
  "elements": [
    {
      "type": "Control",
      "scope": "#/properties/dateTime",
      "label": "Date Time Component", //Optional Label, default label is the property name, in this example it would be Date Time
      "options": {
            "description": "Custom description",
            "erroMessage": "Custom error message",
            "focus": true,
            "granularity": "hour",
            "hideTimeZone": true,
            "hourCycle": "24",
            "isQuiet": true,
            "labelAlign": "end",
            "labelPosition": "top",
            "locale": "ja-Jpan-JP-u-ca-japanese-hc-h12",
            "maxValue": "2022-12-31",
            "maxVisibleMonths": 3,
            "minValue": "today",
            "necessityIndicator": "label",
            "trim": false
      }
    }
  ]
}
```

#### Custom Options Overview

| Option               | Required | Default (Option not used)   | Values                                                                                                                               | Description                                                                                                                       |
| -------------------- | -------- | --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------- |
| "description"        | no       | null                        | String                                                                                                                               | A Description for your Date Time Component. Will be displayed if no error is displayed.                                           |
| "errorMessage"       | no       | null                        | String or false (no ErrorMessage)                                                                                                    | Create a Custom Error Message.                                                                                                    |
| "focus"              | no       | false                       | true or false                                                                                                                        | If true it will be focused after it rendered.                                                                                     |
| "granularity"        | no       | "minute"                    | "minute" or "hour"                                                                                                                   | Decide if you want only hours or hours and minutes.                                                                               |
| "hideTimeZone"       | no       | true                        | true or false                                                                                                                        | Hides Time Zone or not.                                                                                                           |
| "hourCycle"          | no       | Uses the Browser hour cycle | "12" or "24"                                                                                                                         | Decide if the User should use 12 or 24 hour format.                                                                               |
| "isQuiet"            | no       | false                       | true or false                                                                                                                        | Changes the appearance.                                                                                                           |
| "labelAlign"         | no       | "start"                     | "start" or "end"                                                                                                                     | Has only effect when labelPosition="top". Place the Label at the start or end of the control.                                     |
| "labelPosition"      | no       | "top"                       | "top" or "side"                                                                                                                      | Position of the Label.                                                                                                            |
| "locale"             | no       | "gregory"                   | String [See MDN for more Informations](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Locale) | Which Calendar should be used.                                                                                                    |
| "maxValue"           | no       | null                        | Date(Time), E.g. ("2022-12-31T23:59:59" or "2022-12-31") or "today"                                                                  | When the Value is above maxValue, a warning icon will be displayed inside the Component and you can't pick a Date after maxValue. |
| "maxVisibleMonths"   | no       | 1                           | Integer                                                                                                                              | How many Months should be displayed while Picking.                                                                                |
| "minValue"           | no       | null                        | Date(Time), E.g. ("2022-12-31T00:00:00" or "2022-12-31") or "today"                                                                  | When the Value is below minValue, a warning icon will be displayed inside the Component and you can't pick a Date befor minValue. |
| "necessityIndicator" | no       | false                       | "label", "icon" or false                                                                                                             | Decide if the necessity indicator should be displayed, icon = \*, label = "required" or "optional" in the Browser Language.       |
| "trim"               | no       | false                       | true or false                                                                                                                        | If false the Component uses 100% width, else the Component will be trimmed.                                                       |

</details>
<br/>

# Time Component (React Spectrum Release Candidate)

[React Spectrum TimeField (RC)](https://reactspectrum.blob.core.windows.net/reactspectrum/91ca94fe52840b7a32b961ec08208f5fbdf65697/docs/react-spectrum/TimeField.html)

<details>
  <summary>Show me how to use it</summary>

## How to use it

### Schema

```json
{
  "type": "object",
  "properties": {
    "time": {
      "default": "12:00",
      "type": "string",
      "format": "time"
    }
  },
  "required": ["time"] //If it should be required
}
```

#### Custom Options Overview

| Option    | Required | Default (Option not used) | Values          | Description                                          |
| --------- | -------- | ------------------------- | --------------- | ---------------------------------------------------- |
| "default" | no       | null                      | Time (ISO 8601) | Default Value (will be inserted only at rendertime). |
| "format"  | yes      | null                      | "time"          | Must be Time, else it's a string.                    |
| "type"    | yes      | null                      | "string"        | Must be String.                                      |

### UI Schema and Custom options

```json
UI Schema
{
  "type": "HorizontalLayout", //or any other layout
  "elements": [
    {
      "type": "Control",
      "scope": "#/properties/time",
      "label": "Time Component", //Optional Label, default label is the property name, in this example it would be Time
      "options": {
        "focus": true,
        "granularity": "hour",
        "hideTimeZone": true,
        "hourCycle": "24",
        "isQuiet": false,
        "labelAlign": "end",
        "labelPosition": "top",
        "locale": "ja-Jpan-JP-u-ca-japanese-hc-h12",
        "maxValue": "13:38",
        "minValue": "12:58",
        "necessityIndicator": "label",
        "trim": true
      }
    }
  ]
}
```

#### Custom Options Overview

| Option               | Required | Default (Option not used)   | Values                                                                                                                               | Description                                                                                                                 |
| -------------------- | -------- | --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------- |
| "focus"              | no       | false                       | true or false                                                                                                                        | If true it will be focused after it rendered.                                                                               |
| "granularity"        | no       | "minute"                    | "minute" or "hour"                                                                                                                   | Decide if you want only hours or hours and minutes.                                                                         |
| "hideTimeZone"       | no       | true                        | true or false                                                                                                                        | Hides Time Zone or not.                                                                                                     |
| "hourCycle"          | no       | Uses the Browser hour cycle | "12" or "24"                                                                                                                         | Decide if the User should use 12 or 24 hour format.                                                                         |
| "isQuiet"            | no       | false                       | true or false                                                                                                                        | Changes the appearance.                                                                                                     |
| "labelAlign"         | no       | "start"                     | "start" or "end"                                                                                                                     | Has only effect when labelPosition="top". Place the Label at the start or end of the control.                               |
| "labelPosition"      | no       | "top"                       | "top" or "side"                                                                                                                      | Position of the Label.                                                                                                      |
| "locale"             | no       | "gregory"                   | String [See MDN for more Informations](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Locale) | Which Calendar should be used.                                                                                              |
| "maxValue"           | no       | null                        | Time in the Format "HH:mm"                                                                                                           | When the Value is above maxValue, a warning icon will be displayed inside the Component.                                    |
| "minValue"           | no       | null                        | Time in the Format "HH:mm"                                                                                                           | When the Value is below minValue, a warning icon will be displayed inside the Component.                                    |
| "necessityIndicator" | no       | false                       | "label", "icon" or false                                                                                                             | Decide if the necessity indicator should be displayed, icon = \*, label = "required" or "optional" in the Browser Language. |
| "trim"               | no       | false                       | true or false                                                                                                                        | If false the Component uses 100% width, else the Component will be trimmed.                                                 |

</details>

<br/>

# Enum Component

[React Spectrum Picker](https://react-spectrum.adobe.com/react-spectrum/Picker.html)

<details>
  <summary>Show me how to use it</summary>

### Schema

```jsonc
{
  "type": "object",
  "properties": {
    "enum": {
      "default": "foo",
      "enum": ["foo", "bar"],
      "type": "string"
    }
  },
  "required": ["enum"] //If it should be required
}
```

#### Custom Options Overview

| Option    | Required | Default (Option not used) | Values                 | Description                                          |
| --------- | -------- | ------------------------- | ---------------------- | ---------------------------------------------------- |
| "default" | no       | null                      | One of the Enum Values | Default Value (will be inserted only at rendertime). |
| "enum"    | yes      | null                      | "enum"                 | Must be enum.                                        |
| "type"    | no       | null                      | "string"               | Optional.                                            |

### UI Schema and Custom options

```json
{
  "type": "HorizontalLayout", //or any other layout
  "elements": [
    {
      "type": "Control",
      "scope": "#/properties/enum",
      "label": "Enum Component", //Optional Label, default label is the property name, in this example it would be Enum
      "options": {
        "align": "start",
        "autocomplete": false,
        "defaultOpen": true,
        "description": "ComboBox description",
        "direction": "top",
        "errorMessage": "Custom error message",
        "focus": true,
        "isQuiet": true,
        "labelAlign": "end",
        "labelPosition": "side",
        "menuWidth": "size-100",
        "necessityIndicator": "label",
        "placeholder": "Select an option",
        "shouldFlip": true,
        "trim": false
      }
    }
  ]
}
```

#### Custom Options Overview

| Option               | Required | Default (Option not used) | Values                                                                                                           | Description                                                                                                                 |
| -------------------- | -------- | ------------------------- | ---------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| "align"              | no       | "start"                   | "start" or "end"                                                                                                 | Alignment of the menu relative to the input target.                                                                         |
| "autocomplete"       | yes      | true                      | true or false                                                                                                    | Must be false for a Picker, else it's a ComboBox.                                                                           |
| "defaultOpen"        | no       | false                     | true or false                                                                                                    | Whether the Picker is open after it rendered or not.                                                                        |
| "description"        | no       | null                      | String                                                                                                           | A Description for your ComboBox. Will be displayed if no error is displayed.                                                |
| "direction"          | no       | "bottom"                  | "bottom" or "top"                                                                                                | Direction the menu will render relative to the ComboBox.                                                                    |
| "errorMessage"       | no       | null                      | String or false (no ErrorMessage)                                                                                | Create a Custom Error Message.                                                                                              |
| "focus"              | no       | false                     | true or false                                                                                                    | If true it will be focused after it rendered.                                                                               |
| "isQuiet"            | no       | false                     | true or false                                                                                                    | Changes the appearance.                                                                                                     |
| "labelAlign"         | no       | "start"                   | "start" or "end"                                                                                                 | Has only effect when labelPosition="top". Place the Label at the start or end of the control.                               |
| "labelPosition"      | no       | "top"                     | "top" or "side"                                                                                                  | Position of the Label.                                                                                                      |
| "menuWidth"          | no       | null                      | E.g. "size-100" [See all Options](https://react-spectrum.adobe.com/react-spectrum/styling.html#dimension-values) | Width of the menu.                                                                                                          |
| "necessityIndicator" | no       | false                     | "label", "icon" or false                                                                                         | Decide if the necessity indicator should be displayed, icon = \*, label = "required" or "optional" in the Browser Language. |
| "placeholder"        | no       | null                      | String                                                                                                           | Text which is displayed inside the Component if it's empty (Placeholdertext).                                               |
| "shouldFlip"         | no       | true                      | true or false                                                                                                    | Whether the menu should automatically flip direction when space is limited.                                                 |
| "trim"               | no       | false                     | true or false                                                                                                    | If false the Component uses 100% width, else the Component will be trimmed.                                                 |

</details>
<br/>

# Enum Autocomplete Component

[React Spectrum ComboBox](https://react-spectrum.adobe.com/react-spectrum/ComboBox.html)

<details>
  <summary>Show me how to use it</summary>

### Schema

```jsonc
{
  "type": "object",
  "properties": {
    "enumAutocomplete": {
      "default": "foo",
      "enum": ["foo", "bar"],
      "type": "string"
    }
  },
  "required": ["enumAutocomplete"] //If it should be required
}
```

#### Custom Options Overview

| Option    | Required | Default (Option not used) | Values                 | Description                                          |
| --------- | -------- | ------------------------- | ---------------------- | ---------------------------------------------------- |
| "default" | no       | null                      | One of the Enum Values | Default Value (will be inserted only at rendertime). |
| "enum"    | yes      | null                      | "enum"                 | Must be enum.                                        |
| "type"    | no       | null                      | "string"               | Optional.                                            |

### UI Schema and Custom options

```json
{
  "type": "HorizontalLayout", //or any other layout
  "elements": [
    {
      "type": "Control",
      "scope": "#/properties/enumAutocomplete",
      "label": "Enum Autocomplete Component", //Optional Label, default label is the property name, in this example it would be Enum Autocomplete
      "options": {
        "allowsCustomValue": true,
        "autocomplete": true,
        "description": "ComboBox description",
        "direction": "top",
        "errorMessage": "Custom error message",
        "focus": true,
        "isQuiet": true,
        "labelAlign": "end",
        "labelPosition": "side",
        "menuTrigger": "manual",
        "necessityIndicator": "label",
        "shouldFlip": true,
        "shouldFocusWrap": true,
        "trim": false
      }
    }
  ]
}
```

#### Custom Options Overview

| Option               | Required | Default (Option not used) | Values                            | Description                                                                                                                 |
| -------------------- | -------- | ------------------------- | --------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| "allowsCustomValue"  | no       | false                     | true or false                     | Whether the ComboBox allows a non-item matching input value to be set.                                                      |
| "autocomplete"       | yes      | true                      | true or false                     | Must be true for a ComboBox, else it's a Picker.                                                                            |
| "description"        | no       | null                      | String                            | A Description for your ComboBox. Will be displayed if no error is displayed.                                                |
| "direction"          | no       | "bottom"                  | "bottom" or "top"                 | Direction the menu will render relative to the ComboBox.                                                                    |
| "errorMessage"       | no       | null                      | String or false (no ErrorMessage) | Create a Custom Error Message.                                                                                              |
| "focus"              | no       | false                     | true or false                     | If true it will be focused after it rendered.                                                                               |
| "isQuiet"            | no       | false                     | true or false                     | Changes the appearance.                                                                                                     |
| "labelAlign"         | no       | "start"                   | "start" or "end"                  | Has only effect when labelPosition="top". Place the Label at the start or end of the control.                               |
| "labelPosition"      | no       | "top"                     | "top" or "side"                   | Position of the Label.                                                                                                      |
| "menuTrigger"        | no       | "input"                   | "input", "focus" or "manual"      | The interaction required to display the ComboBox menu. It has no effect on the mobile ComboBox.                             |
| "necessityIndicator" | no       | false                     | "label", "icon" or false          | Decide if the necessity indicator should be displayed, icon = \*, label = "required" or "optional" in the Browser Language. |
| "shouldFlip"         | no       | true                      | true or false                     | Whether the menu should automatically flip direction when space is limited.                                                 |
| "shouldFocusWrap"    | no       | false                     | true or false                     | Whether keyboard navigation is circular.                                                                                    |
| "trim"               | no       | false                     | true or false                     | If false the Component uses 100% width, else the Component will be trimmed.                                                 |

</details>
<br/>

# Integer Component

[React Spectrum NumberField](https://react-spectrum.adobe.com/react-spectrum/NumberField.html)

<details>
  <summary>Show me how to use it</summary>

### Schema

```json
{
  "type": "object",
  "properties": {
    "integer": {
      "default": 3,
      "maximum": 5,
      "minimum": 1,
      "type": "integer"
    }
  },
  "required": ["integer"] //If it should be required
}
```

#### Custom Options Overview

| Option    | Required | Default (Option not used) | Values               | Description                                          |
| --------- | -------- | ------------------------- | -------------------- | ---------------------------------------------------- |
| "default" | no       | null                      | Integer              | Default Value (will be inserted only at rendertime). |
| "maximum" | no       | null                      | Integer (>= minimum) | Highest Integer to accept.                           |
| "minimum" | no       | null                      | Integer              | Lowest Integer to accept.                            |
| "type"    | yes      | null                      | "integer"            | Must be Integer.                                     |

### UI Schema and Custom options

```json
{
  "type": "HorizontalLayout", //or any other layout
  "elements": [
    {
      "type": "Control",
      "scope": "#/properties/integer",
      "label": "Integer Component", //Optional Label, default label is the property name, in this example it would be Integer
      "options": {
        "decrementAriaLabel": "ARIALABELDOWN",
        "description": "Number Description",
        "errorMessage": "Custom Error",
        "focus": true,
        "formatOptions": {
          "style": "currency",
          "currency": "EUR"
        },
        "hideStepper": true,
        "incrementAriaLabel": "ARIALABELUP",
        "labelAlign": "end",
        "labelPosition": "side",
        "necessityIndicator": "label",
        "step": 2
      }
    }
  ]
}
```

#### Custom Options Overview

| Option               | Required | Default (Option not used)             | Values                                                                                                                                               | Description                                                                                                                 |
| -------------------- | -------- | ------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| "decrementAriaLabel" | no       | `Decrement -${step}`                  | String                                                                                                                                               | Create a Custom Aria Label for the Decrement Stepper.                                                                       |
| "description"        | no       | null                                  | String                                                                                                                                               | A Description for your Integer Field. Will be displayed if no error is displayed.                                           |
| "errorMessage"       | no       | Error Message based on min and/or max | String or false                                                                                                                                      | Create a Custom Error Message.                                                                                              |
| "focus"              | no       | false                                 | true or false                                                                                                                                        | If true it will be focused after it rendered.                                                                               |
| "formatOptions"      | no       | false                                 | E.g.{ style: 'percent' } [See MDN for Full List](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat) | The Display Format of the Value Label.                                                                                      |
| "hideStepper"        | no       | false                                 | true or false                                                                                                                                        | If true there is no visible Stepper.                                                                                        |
| "incrementAriaLabel" | no       | `Increment +${step}`                  | String                                                                                                                                               | Create a Custom Aria Label for the Increment Stepper.                                                                       |
| "labelAlign"         | no       | "start"                               | "start" or "end"                                                                                                                                     | Has only effect when labelPosition="top". Place the Label at the start or end of the control.                               |
| "labelPosition"      | no       | "top"                                 | "top" or "side"                                                                                                                                      | Position of the Label.                                                                                                      |
| "necessityIndicator" | no       | false                                 | "label", "icon" or false                                                                                                                             | Decide if the necessity indicator should be displayed, icon = \*, label = "required" or "optional" in the Browser Language. |
| "step"               | no       | 1                                     | positive Integer                                                                                                                                     | How much the value should increase or decrease for every step.                                                              |
| "trim"               | no       | false                                 | true or false                                                                                                                                        | If false the Component uses 100% width, else the Component will be trimmed.                                                 |

</details>
<br/>

# Number Component

[React Spectrum NumberField](https://react-spectrum.adobe.com/react-spectrum/NumberField.html)

<details>
  <summary>Show me how to use it</summary>

### Schema

```json
{
  "type": "object",
  "properties": {
    "number": {
      "default": 3.14,
      "maximum": 5,
      "minimum": 1,
      "type": "number"
    }
  },
  "required": ["number"] //If it should be required
}
```

#### Custom Options Overview

| Option    | Required | Default (Option not used) | Values              | Description                                          |
| --------- | -------- | ------------------------- | ------------------- | ---------------------------------------------------- |
| "default" | no       | null                      | Number              | Default Value (will be inserted only at rendertime). |
| "maximum" | no       | null                      | Number (>= minimum) | Highest Number to accept.                            |
| "minimum" | no       | null                      | Number              | Lowest Number to accept.                             |
| "type"    | yes      | null                      | "number"            | Must be Number.                                      |

### UI Schema and Custom options

```json
{
  "type": "HorizontalLayout", //or any other layout
  "elements": [
    {
      "type": "Control",
      "scope": "#/properties/number",
      "label": "Number Component", //Optional Label, default label is the property name, in this example it would be Number
      "options": {
        "decrementAriaLabel": "ARIALABELDOWN",
        "description": "Number Description",
        "errorMessage": "Custom Error",
        "focus": true,
        "formatOptions": {
          "style": "currency",
          "currency": "EUR"
        },
        "hideStepper": true,
        "incrementAriaLabel": "ARIALABELUP",
        "labelAlign": "end",
        "labelPosition": "side",
        "necessityIndicator": "label",
        "step": 2
      }
    }
    }
  ]
}
```

#### Custom Options Overview

| Option               | Required | Default (Option not used)             | Values                                                                                                                                               | Description                                                                                                                 |
| -------------------- | -------- | ------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| "decrementAriaLabel" | no       | `Decrement -${step}`                  | String                                                                                                                                               | Create a Custom Aria Label for the Decrement Stepper.                                                                       |
| "description"        | no       | null                                  | String                                                                                                                                               | A Description for your Integer Field. Will be displayed if no error is displayed.                                           |
| "errorMessage"       | no       | Error Message based on min and/or max | String or false                                                                                                                                      | Create a Custom Error Message.                                                                                              |
| "focus"              | no       | false                                 | true or false                                                                                                                                        | If true it will be focused after it rendered.                                                                               |
| "formatOptions"      | no       | false                                 | E.g.{ style: 'percent' } [See MDN for Full List](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat) | The Display Format of the Value Label.                                                                                      |
| "hideStepper"        | no       | false                                 | true or false                                                                                                                                        | If true there is no visible Stepper.                                                                                        |
| "incrementAriaLabel" | no       | `Increment +${step}`                  | String                                                                                                                                               | Create a Custom Aria Label for the Increment Stepper.                                                                       |
| "labelAlign"         | no       | "start"                               | "start" or "end"                                                                                                                                     | Has only effect when labelPosition="top". Place the Label at the start or end of the control.                               |
| "labelPosition"      | no       | "top"                                 | "top" or "side"                                                                                                                                      | Position of the Label.                                                                                                      |
| "necessityIndicator" | no       | false                                 | "label", "icon" or false                                                                                                                             | Decide if the necessity indicator should be displayed, icon = \*, label = "required" or "optional" in the Browser Language. |
| "step"               | no       | 0.1                                   | positive                                                                                                                                             | How much the value should increase or decrease for every step.                                                              |
| "trim"               | no       | false                                 | true or false                                                                                                                                        | If false the Component uses 100% width, else the Component will be trimmed.                                                 |

</details>
<br/>

# Star Rating Component

Custom Component with [Workflow Star Icon](https://react-spectrum.adobe.com/react-spectrum/workflow-icons.html)

<details>
  <summary>Show me how to use it</summary>

### Schema

```json
{
  "type": "object",
  "properties": {
    "rating": {
      "default": 3,
      "maximum": 10,
      "minimum": 1,
      "type": "integer"
    }
  },
  "required": ["rating"] //If it should be required
}
```

#### Custom Options Overview

| Option    | Required | Default (Option not used) | Values                        | Description                                          |
| --------- | -------- | ------------------------- | ----------------------------- | ---------------------------------------------------- |
| "default" | no       | null                      | Integer                       | Default Value (will be inserted only at rendertime). |
| "maximum" | no       | 5                         | positive Integer (>= minimum) | How much Stars should rendered.                      |
| "minimum" | no       | null                      | Integer between 0 and maximum | Lowest Integer to accept.                            |
| "type"    | yes      | null                      | "integer"                     | Must be Integer.                                     |

### UI Schema and Custom options

```json
{
  "type": "HorizontalLayout", //or any other layout
  "elements": [
    {
      "type": "Control",
      "scope": "#/properties/rating",
      "label": "Rating Component", //Optional Label, default label is the property name, in this example it would be Rating
      "options": {
        "necessityIndicator": "label",
        "orientation": "vertical",
        "rating": true,
        "trim": false
      }
    }
  ]
}
```

#### Custom Options Overview

| Option               | Required | Default (Option not used)             | Values                     | Description                                                                                                                 |
| -------------------- | -------- | ------------------------------------- | -------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| "necessityIndicator" | no       | false                                 | "label", "icon" or false   | Decide if the necessity indicator should be displayed, icon = \*, label = "required" or "optional" in the Browser Language. |
| "orientation"        | no       | "horizontal"                          | "horizontal" or "vertical" | How the Stars should be aligned.                                                                                            |
| "trim"               | no       | false                                 | true or false              | If false the Component uses 100% width, else the Component will be trimmed.                                                 |
| "rating"             | yes      | Without "rating" it's a Integer Field | true or false              | If true the Component will be a Star Rating.                                                                                |

</details>
<br/>

# Slider Component

[React Spectrum Slider](https://react-spectrum.adobe.com/react-spectrum/Slider.html)

<details>
  <summary>Show me how to use it</summary>

### Schema

```json
{
  "type": "object",
  "properties": {
    "range": {
      "default": 42,
      "maximum": 100,
      "minimum": 0,
      "multipleOf": 2,
      "type": "number"
    }
  },
  "required": ["range"] //If it should be required
}
```

#### Custom Options Overview

| Option       | Required | Default (Option not used) | Values                | Description                    |
| ------------ | -------- | ------------------------- | --------------------- | ------------------------------ |
| "default"    | yes      | null                      | Number                | Default Value.                 |
| "maximum"    | yes      | null                      | Number (>= minimum)   | Highest Number to accept.      |
| "minimum"    | yes      | null                      | Number                | Lowest Number to accept.       |
| "multipleOf" | no       | 1                         | Number                | How big a Step should be.      |
| "type"       | yes      | null                      | "integer" or "number" | Depends on the Value you need. |

### UI Schema and Custom options

```json
{
  "type": "HorizontalLayout", //or any other layout
  "elements": [
    {
      "type": "Control",
      "scope": "#/properties/range",
      "label": "Range Component", //Optional Label, default label is the property name, in this example it would be Range
      "options": {
        "formatOptions": {
          "style": "currency",
          "currency": "EUR"
        },
        "getValueLabel": "of 1",
        "trackGradient": ["#000000", "blue"],
        "fillOffset": 2,
        "isFilled": true,
        "slider": true,
        "trim": false
      }
    }
  ]
}
```

#### Custom Options Overview

| Option          | Required | Default (Option not used)                    | Values                                                                                                                                               | Description                                                                               |
| --------------- | -------- | -------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| "fillOffset"    | no       | false                                        | Number between minimum and maximum                                                                                                                   | The offset from which to start the fill.                                                  |
| "formatOptions" | no       | false                                        | E.g.{ style: 'percent' } [See MDN for Full List](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat) | The Display Format of the Value Label.                                                    |
| "getValueLabel" | no       | null                                         | String                                                                                                                                               | Custom Value Label, like "Bananas".                                                       |
| "isFilled"      | no       | false                                        | true or false                                                                                                                                        | Whether a fill color is shown between the start of the slider and the current value.      |
| "slider"        | yes      | Without "slider" it's a Number/Integer Field | true or false                                                                                                                                        | If true the Component will be a toggle instead of a Number Field.                         |
| "trackGradient" | no       | null                                         | Array of Color Values, HEX, RGB, RGBA, Color Name and HSL are supported                                                                              | The background of the track, specified as the stops for a CSS background: linear-gradient |
| "trim"          | no       | false                                        | true or false                                                                                                                                        | If false the Component uses 100% width, else the Component will be trimmed.               |

</details>
<br/>

# Text Field Component

[React Spectrum TextField](https://react-spectrum.adobe.com/react-spectrum/TextField.html)

<details>
  <summary>Show me how to use it</summary>

### Schema

```json
{
  "type": "object",
  "properties": {
    "textfield": {
      "default": "DefaultString",
      "type": "string"
    }
  },
  "required": ["textfield"] //If it should be required
}
```

#### Custom Options Overview

| Option    | Required | Default (Option not used) | Values   | Description                                          |
| --------- | -------- | ------------------------- | -------- | ---------------------------------------------------- |
| "default" | no       | null                      | String   | Default Value (will be inserted only at rendertime). |
| "type"    | yes      | null                      | "string" | Must be String.                                      |

### UI Schema and Custom options

```json
{
  "type": "HorizontalLayout", //or any other layout
  "elements": [
    {
      "type": "Control",
      "scope": "#/properties/textfield",
      "label": "TextField Component", //Optional Label, default label is the property name, in this example it would be Textfield
      "options": {
        "description": "Text Field Description",
        "errorMessage": "Custom Error Message!",
        "focus": true,
        "inputMode": "text",
        "isQuiet": false,
        "labelAlign": "end",
        "labelPosition": "top",
        "maxLength": 5,
        "minLength": 1,
        "necessityIndicator": "label",
        "trim": true,
        "type": "text"
      }
    }
  ]
}
```

#### Custom Options Overview

| Option               | Required | Default (Option not used)                         | Values                                                                  | Description                                                                                                                              |
| -------------------- | -------- | ------------------------------------------------- | ----------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| "description"        | no       | null                                              | String                                                                  | A Description for your Text Field. Will be displayed if no error is displayed.                                                           |
| "errorMessage"       | no       | Error Message based on minLength and/or maxLength | String or false (No ErrorMessage)                                       | Create a Custom Error Message.                                                                                                           |
| "focus"              | no       | false                                             | true or false                                                           | If true it will be focused after it rendered.                                                                                            |
| "inputMode"          | no       | "none"                                            | "decimal", "email", "none", "numeric", "search", "tel", "text" or "url" | Helper for the User Agent. [See MDN](https://html.spec.whatwg.org/multipage/interaction.html#input-modalities:-the-inputmode-attribute). |
| "isQuiet"            | no       | false                                             | true or false                                                           | Changes the appearance.                                                                                                                  |
| "labelAlign"         | no       | "start"                                           | "start" or "end"                                                        | Has only effect when labelPosition="top". Place the Label at the start or end of the control.                                            |
| "labelPosition"      | no       | "top"                                             | "top" or "side"                                                         | Position of the Label.                                                                                                                   |
| "maxLength"          | no       | Infinity                                          | Integer                                                                 | When the Length is above maxLength, a warning icon will be displayed inside the Component + Error Message.                               |
| "minLength"          | no       | 0                                                 | Integer                                                                 | When the Length is below minLength, a warning icon will be displayed inside the Component + Error Message.                               |
| "necessityIndicator" | no       | false                                             | "label", "icon" or false                                                | Decide if the necessity indicator should be displayed, icon = \*, label = "required" or "optional" in the Browser Language.              |
| "trim"               | no       | false                                             | true or false                                                           | If false the Component uses 100% width, else the Component will be trimmed.                                                              |
| "type"               | no       | "text"                                            | "password", "search", "tel", "email", "text", "url"                     | Define what Type it should be. [See MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#htmlattrdeftype).               |

</details>
<br/>

# Text Area Component

[React Spectrum TextArea](https://react-spectrum.adobe.com/react-spectrum/TextArea.html)

<details>
  <summary>Show me how to use it</summary>

### Schema

```json
{
  "type": "object",
  "properties": {
    "textarea": {
      "default": "DefaultString",
      "type": "string"
    }
  },
  "required": ["textarea"] //If it should be required
}
```

#### Custom Options Overview

| Option    | Required | Default (Option not used) | Values   | Description                                          |
| --------- | -------- | ------------------------- | -------- | ---------------------------------------------------- |
| "default" | no       | null                      | String   | Default Value (will be inserted only at rendertime). |
| "type"    | yes      | null                      | "string" | Must be String.                                      |

### UI Schema and Custom options

```json
{
  "type": "HorizontalLayout", //or any other layout
  "elements": [
    {
      "type": "Control",
      "scope": "#/properties/textarea",
      "label": "TextArea Component", //Optional Label, default label is the property name, in this example it would be Textarea
      "options": {
        "description": "Text Area Description",
        "errorMessage": "Custom Error Message!",
        "focus": true,
        "inputMode": "text",
        "isQuiet": false,
        "labelAlign": "end",
        "labelPosition": "top",
        "maxLength": 5,
        "minLength": 1,
        "multi": true,
        "necessityIndicator": "label",
        "trim": true,
        "type": "text"
      }
    }
  ]
}
```

#### Custom Options Overview

| Option               | Required | Default (Option not used)                         | Values                                                                  | Description                                                                                                                              |
| -------------------- | -------- | ------------------------------------------------- | ----------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| "description"        | no       | null                                              | String                                                                  | A Description for your Text Area. Will be displayed if no error is displayed.                                                            |
| "errorMessage"       | no       | Error Message based on minLength and/or maxLength | String or false (no ErrorMessage)                                       | Create a Custom Error Message.                                                                                                           |
| "focus"              | no       | false                                             | true or false                                                           | If true it will be focused after it rendered.                                                                                            |
| "inputMode"          | no       | "none"                                            | "decimal", "email", "none", "numeric", "search", "tel", "text" or "url" | Helper for the User Agent. [See MDN](https://html.spec.whatwg.org/multipage/interaction.html#input-modalities:-the-inputmode-attribute). |
| "isQuiet"            | no       | false                                             | true or false                                                           | Changes the appearance.                                                                                                                  |
| "labelAlign"         | no       | "start"                                           | "start" or "end"                                                        | Has only effect when labelPosition="top". Place the Label at the start or end of the control.                                            |
| "labelPosition"      | no       | "top"                                             | "top" or "side"                                                         | Position of the Label.                                                                                                                   |
| "maxLength"          | no       | Infinity                                          | Integer                                                                 | When the Length is above maxLength, a warning icon will be displayed inside the Component + Error Message.                               |
| "minLength"          | no       | 0                                                 | Integer                                                                 | When the Length is below minLength, a warning icon will be displayed inside the Component + Error Message.                               |
| "multi"              | yes      | Without "multi" it's a Text Field                 | true or false                                                           | If true it's a Text Area if false it's a Text Field.                                                                                     |
| "necessityIndicator" | no       | false                                             | "label", "icon" or false                                                | Decide if the necessity indicator should be displayed, icon = \*, label = "required" or "optional" in the Browser Language.              |
| "trim"               | no       | false                                             | true or false                                                           | If false the Component uses 100% width, else the Component will be trimmed.                                                              |
| "type"               | no       | "text"                                            | "password", "search", "tel", "email", "text", "url"                     | Define what Type it should be. [See MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#htmlattrdeftype).               |

</details>
