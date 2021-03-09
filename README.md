# Curriculum
 Curriculum Generator

Online demo for my own use @ https://curriculum-wr786.vercel.app/

## Build Instruction for Self-Hosting

1. `npm install`

2. Edit `src/courses.json` to add your own courses. The JSON should seem like this:

   ```json
   {
       "courses": [
           {
               "name": "计算机图形学",
               "times": [
                   {
                       "type": "every",
                       "weekday": 1,
                       "classes": [10, 11, 12]
                   }
               ],
               "place": "理教408"
           },
           {
               "name": "自动控制原理",
               "times": [
                   {
                       "type": "every",
                       "weekday": 5,
                       "classes": [1, 2]
                   },
                   {
                       "type": "even",
                       "weekday": 3,
                       "classes": [1, 2]
                   }
               ],
               "place": "二教505"
           },
           {
               "name": "高等动力学",
               "times": [
                   {
                       "type": "every",
                       "weekday": 1,
                       "classes": [1, 2]
                   },
                   {
                       "type": "odd",
                       "weekday": 3,
                       "classes": [7, 8]
                   }
               ],
               "place": "三教501"
           }
   	]
   }
   ```

   (You can also check `src/courses.json` as it is already a template)

3. `yarn start` or `npm run build`

## Advance Settings

### Class number per day

In *Peking University*, there is 12 classes per day.

But for personal use, you can edit the `state` in `src/Curriculum.js`:

```javascript
class Curriculum extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dates: 7,
      validDates: 7,
      totclasses: 12,					// The number of classes per day
      classes: Array(84).fill({         // Should be 7 * {totclasses}
        classname: "__DISABLED",
        classroom: "",
        timetype: "every",
      }),
    };
// ...
```

### Colors

You can edit `src/Courses.js` to change the colors, obviously.