# JSONForms - More Forms. Less Code

### Complex Forms in the blink of an eye

JSONForms eliminates the tedious task of writing fully-featured forms by hand by leveraging the capabilities of JSON, JSON Schema and Javascript.

# Spectrum Renderers Package

!!!! Work in Progress !!!

# Custom options

#### Custom options for Table Array Control
```js
{
  "type": "Control",
  "scope": "#/properties/myArray",
  "options": {
    "addButtonPosition": "top", // "top" or "bottom"
    "addButtonLabel": "Add item", // optional custom label for Add button
    "addButtonLabelType": "tooltip" // "tooltip" or "inline"
  }
}
```

#### Custom options for Horizontal Layout
```js
{
  "type": "HorizontalLayout",
  "elements": [ ... ],
  "options": {
    "spacing": [3, 1], // numbers correspond to proportions of column widths (defaults to 1)
  }
}
```
