
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/1407ee60ef1542efb5fe703c93669b18)](https://www.codacy.com/app/LabEG/alertify.js?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=LabEG/alertify.js&amp;utm_campaign=Badge_Grade)
![David](https://img.shields.io/david/LabEG/alertify.js.svg)
![David](https://img.shields.io/david/dev/LabEG/alertify.js.svg)
![GitHub](https://img.shields.io/github/license/LabEG/alertify.js.svg)

# Alertify.js

Alertify is an unobtrusive customizable JavaScript notification system.

## Reporting Issues

If at all possible, please set up an example in [Plunkr](https://plnkr.co), [JS Bin](//jsbin.com), [Codepen](http://codepen.io/)
etc. That will greatly speed up the process of fixing the issue. If you need the issue fixed right away, a reproduce-able,
concrete example is your best way to get our attention! Not to say that we won't do our best to fix other issues, though :-)

## Usage and Examples

For code examples, stop by the [website at alertifyjs.org](https://labeg.github.io/alertify.js/)

## Contributing

Please follow the ESLint style guide to keep the code style uniform. Also
please add appropriate tests for each contribution. Test coverage is far from
complete, but if everyone adds a test for their contributions, plus one more
test, we should be able to get a reasonable amount of coverage quickly.

## Browser Support

Alertify uses the following JavaScript which may not work in anything
less than Internet Explorer 10, so you'll need to polyfill it.

- `element.classList` (Less than IE 10 needs polyfill)
- `document.querySelector` (Less than IE 7 needs polyfill)
- `element.addEventListener` (Less than IE 9 needs polyfill)
- `Array.prototype.map` (Less than IE 9 needs polyfill)
- `Array.prototype.forEach` (Less than IE 9 needs polyfill)

It should work on Opera Mini, but since Opera Mini doesn't support
transitions, the hiding of elements is not very pretty.

It's being tested on:

- Android 4.0 and Latest (should work on 2.1 and newer, though)
- Chrome (Latest)
- Firefox (Latest)
- Internet Explorer (Latest)
- Internet Explorer 10
- Safari (desktop and iOS)

## License

alertify.js is licensed under [MIT](http://www.opensource.org/licenses/MIT)
