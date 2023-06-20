const cors = require('cors');

module.exports.corsConfig = cors({
  option: [
    'http://localhost:3000',
    'https://diplom-portfolio-vorobeva.nomoredomains.rocks',
    'http://diplom-portfolio-vorobeva.nomoredomains.rocks',
    'https://api.portfolio-vorobeva.nomoredomains.rocks',
    'http://api.portfolio-vorobeva.nomoredomains.rocks',

  ],
  origin: [
    'http://localhost:3000',
    'https://diplom-portfolio-vorobeva.nomoredomains.rocks',
    'http://diplom-portfolio-vorobeva.nomoredomains.rocks',
    'https://api.portfolio-vorobeva.nomoredomains.rocks',
    'http://api.portfolio-vorobeva.nomoredomains.rocks',
  ],
  credentials: true,
});
