const cors = require('cors');

module.exports.corsConfig = cors({
  option: [
    /http:\/\/localhost(:\d+)?/,
    'https://diplom-portfolio-vorobeva.nomoredomains.rocks',
    'http://diplom-portfolio-vorobeva.nomoredomains.rocks',
  ],
  origin: [
    /http:\/\/localhost(:\d+)?/,
    'https://diplom-portfolio-vorobeva.nomoredomains.rocks',
    'http://diplom-portfolio-vorobeva.nomoredomains.rocks',
  ],
  credentials: true,
});
