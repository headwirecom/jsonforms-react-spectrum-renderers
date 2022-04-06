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

## Time Component (React Spectrum Alpha)

### How to use it

```json
Schema
{
  "type": "object",
  "properties": {
    "time": {
      "type": "string",
      "format": "time"
    },
  }
}
```

### Custom options for Time

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
        "focus": true, //true or false, default is false. If true it will be focused after it rendered.
        "granularity": "hour", // "hour" or "minute". Decide if you want only hours or hours and minutes.
        "hideTimeZone": true, //true or false, default is true. Hide Time Zone or not.
        "hourCycle": "24", // "12" or "24", default uses the browser's hour cycle. Decide if the User should use 12 or 24 hour format.
        "isQuiet": false, //true or false, default is false. Changes the appearance.
        "labelPosition": "top", //"side" or "top", default is "top". Decide where the Label should be.
        "labelAlign": "end", //"start" or "end", default is "start". Has effect only when labelPosition="top". Decide if the Label should be aligned to the start or end of the control.
        "minValue": "12:58", //Any Time you want, when it's below this value, a warning icon will be displayed
        "maxValue": "13:38", //Any Time you want, when it's above this value, a warning icon will be displayed
        "necessityIndicator": "label", //"label", "icon" or false, default is false. Decide if the necessity indicator should be displayed, icon = *, label = "required" or "optional" in the Browser Language.
        "trim": true //true or false, default is false. If false the Component uses 100% width.
      }
    }
  ]
}
```
