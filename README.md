# vue-rainbow-piechart

A Vue component that shows Piechart

![Screenshot](/screen-capture.gif?raw=true "Example usage")

## Note: 'Vue only' version

This is a direct export of a Vue SFC, ES5/JS version is not included.

## Installation

```js
npm i --save vue-rainbow-piechart
```

## Usage

Once installed, it can be used in a template as simply as:

```js
import VueRainbowPiechart from "vue-rainbow-piechart";
```
```html
<vue-rainbow-piechart
  :list="list"
  :autoplay="false"
  :rotate="false"
/>

 list: [
        {
          key: "CARE GIVING",
          value: "Holistic approach to childcare",
          color: "#003ce5"
        },
        {
          key: "HEALTH CARE",
          value: "Enabling Childcare Homes",
          color: "#e91598"
        },
        {
          key: "EDUCATION",
          value: "To ensure guidance and support ",
          color: "#e5541a"
        },
        {
          key: "INFRASTRUCTURE",
          value: "To ensure academic excellence",
          color: "#d3b91c"
        },
        {
          key: "AFTERCARE",
          value: "Volunteer intervention",
          color: "#10e288"
        }
      ]


```
