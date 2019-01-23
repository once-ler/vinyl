### For testing on browser

Update tcomb-form-native/lib/templates/bootstrap/index.js
```javascript
 textbox: require("./textbox"),
  checkbox: require("./checkbox"),
  select: null, // require("./select"),
  datepicker: null, //require("./datepicker"),
  struct: require("./struct"),
  list: require("./list")
};
```
