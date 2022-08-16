* v2.0.0 (breaking change)
    - functional interface 
    - supported simple data formatter
    - supported column align center
    - renamed some options
migration from 1.x:
```js
// 1.x option hideHeaders (default false)
const data = {
    option: {
        hideHeaders: true
    }
}
// => 2.x options headerVisible (default true)
const data = {
    options: {
        headerVisible: false
    }
}

// 1.x render
const ConsoleGrid = require('console-grid');
const consoleGrid = new ConsoleGrid();
consoleGrid.render(data);
// => 2.x render
const CG = require('console-grid');
CG(data);

```

---

* v1.0.17
    - updated eight-colors

* v1.0.16
    - fixed empty name issue
    - fixed output log mixing
    - fixed option override issue

* v1.0.15
    - fixed invalid header name with column id
    - added row.innerBorder

* v1.0.14
    - support fullWidth Unicode