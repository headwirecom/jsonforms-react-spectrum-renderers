# JSONForms - More Forms. Less Code

## Complex Forms in the blink of an eye

JSONForms eliminates the tedious task of writing fully-featured forms by hand by leveraging the capabilities of JSON, JSON Schema and Javascript.

# Spectrum Renderers Package

!!!! Work in Progress !!!

# Custom options

<!--
### Custom options for Grid Array Control and Table Array Control

 ```json
{
  "type": "Control",
  "scope": "#/properties/myArray",
  "options": {
    "addButtonPosition": "top", // "top" or "bottom"
    "addButtonLabel": "Add item", // optional custom label for Add button
    "addButtonLabelType": "tooltip", // "tooltip" or "inline"
    "table": true, // When true, uses @react-spectrum/table. When false, uses Grid component from React Spectrum (default: false)
    "spacing": [3, 1], // Numbers correspond to proportions of column widths (defaults to 1). Has effect only when table=false
  }
}
```

#### Custom options for Horizontal Layout

```json
{
  "type": "HorizontalLayout",
  "elements": [ ... ],
  "options": {
    "spacing": [3, 1], // numbers correspond to proportions of column widths (defaults to 1)
  }
}
``` -->

# Text Area Component

## How to use it

### Schema

```json
{
  "type": "object",
  "properties": {
    "textarea": {
      "type": "string"
    }
  },
  "required": ["textarea"] //If it should be required
}
```

### UI Schema and Custom options

```json
UI Schema
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
        "placeholder": "Enter text",
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
| "description"        | no       | null                                              | Any Description you want                                                | A Description for your Text Area. Will be displayed if no error is displayed.                                                            |
| "errorMessage"       | no       | Error Message based on minLength and/or maxLength | Any Error Message you want or false                                     | Create a Custom Error Message.                                                                                                           |
| "focus"              | no       | false                                             | true or false                                                           | If true it will be focused after it rendered.                                                                                            |
| "inputMode"          | no       | "none"                                            | "decimal", "email", "none", "numeric", "search", "tel", "text" or "url" | Helper for the User Agent. [See MDN](https://html.spec.whatwg.org/multipage/interaction.html#input-modalities:-the-inputmode-attribute). |
| "isQuiet"            | no       | false                                             | true or false                                                           | Changes the appearance.                                                                                                                  |
| "labelAlign"         | no       | "start"                                           | "start" or "end"                                                        | Has only effect when labelPosition="top". Place the Label at the start or end of the control.                                            |
| "labelPosition"      | no       | "top"                                             | "top" or "side"                                                         | Position of the Label.                                                                                                                   |
| "maxLength"          | no       | Infinity                                          | Any positive Number you want                                            | When the Length is above maxLength, a warning icon will be displayed inside the Component + Error Message.                               |
| "minLength"          | no       | 0                                                 | Any positive Number you want                                            | When the Length is below minLength, a warning icon will be displayed inside the Component + Error Message.                               |
| "multi"              | yes      | Without "multi" it's a Text Field                 | true or false                                                           | If true it's a Text Area if false it's a Text Field.                                                                                     |
| "necessityIndicator" | no       | false                                             | "label", "icon" or false                                                | Decide if the necessity indicator should be displayed, icon = \*, label = "required" or "optional" in the Browser Language.              |
| "placeholder"        | no       | null                                              | Any Placeholdertext you want                                            | Text which is displayed inside the Component if it's empty.                                                                              |
| "trim"               | no       | false                                             | true or false                                                           | If false the Component uses 100% width, else the Component will be trimmed.                                                              |
| "type"               | no       | "text"                                            | "password", "search", "tel", "email", "text", "url"                     | Define what Type it should be. [See MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#htmlattrdeftype).               |

# Time Component (React Spectrum Alpha)

## How to use it

### Schema

```json
{
  "type": "object",
  "properties": {
    "time": {
      "type": "string",
      "format": "time"
    }
  },
  "required": ["time"] //If it should be required
}
```

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
        "labelPosition": "top",
        "labelAlign": "end",
        "minValue": "12:58",
        "maxValue": "13:38",
        "necessityIndicator": "label",
        "trim": true
      }
    }
  ]
}
```

#### Custom Options Overview

| Option               | Required | Default (Option not used)   | Values                                  | Description                                                                                                                 |
| -------------------- | -------- | --------------------------- | --------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| "focus"              | no       | false                       | true or false                           | If true it will be focused after it rendered.                                                                               |
| "granularity"        | no       | "minute"                    | "minute" or "hour"                      | Decide if you want only hours or hours and minutes.                                                                         |
| "hideTimeZone"       | no       | true                        | true or false                           | Hides Time Zone or not.                                                                                                     |
| "hourCycle"          | no       | Uses the Browser hour cycle | "12" or "24"                            | Decide if the User should use 12 or 24 hour format.                                                                         |
| "isQuiet"            | no       | false                       | true or false                           | Changes the appearance.                                                                                                     |
| "labelAlign"         | no       | "start"                     | "start" or "end"                        | Has only effect when labelPosition="top". Place the Label at the start or end of the control.                               |
| "labelPosition"      | no       | "top"                       | "top" or "side"                         | Position of the Label.                                                                                                      |
| "maxValue"           | no       | null                        | Any Time you want in the Format "HH:mm" | When the Value is above maxValue, a warning icon will be displayed inside the Component.                                    |
| "minValue"           | no       | null                        | Any Time you want in the Format "HH:mm" | When the Value is below minValue, a warning icon will be displayed inside the Component.                                    |
| "necessityIndicator" | no       | false                       | "label", "icon" or false                | Decide if the necessity indicator should be displayed, icon = \*, label = "required" or "optional" in the Browser Language. |
| "trim"               | no       | false                       | true or false                           | If false the Component uses 100% width, else the Component will be trimmed.                                                 |
