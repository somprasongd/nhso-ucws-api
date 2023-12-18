const PORT = process.env.PORT || 3000;
const URL_WSDL =
  process.env.URL_WSDL ||
  'http://ucws.nhso.go.th:80/ucwstokenp1/UCWSTokenP1?wsdl';

// "APPNAME_CORS_WHITELIST": "http://www.example.com,http://www.example2.com"
const whitelist = process.env.HOSCONNECT_CORS_WHITELIST
  ? process.env.HOSCONNECT_CORS_WHITELIST.split(',')
  : [];

const CORS_OPTIONS = { origin: '*' };
if (whitelist.length > 0) {
  CORS_OPTIONS.origin = (origin, callback) => {
    // !origin: unblock REST tools or server-to-server requests
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  };
}

module.exports = {
  CORS_OPTIONS,
  PORT,
  URL_WSDL,
};
