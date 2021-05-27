import Popup from './Popup';

const errorHandler = (error) => {
  if (error.message !== 'Network Error') {
    switch (error.response.status) {
      case 500:
        Popup.open(
          'ERROR_MESSAGE',
          'Something went wrong on our server, try again later'
        );
        break;
      case 401:
        Popup.open(
          'ERROR_MESSAGE',
          'You are not authorised to do this, contact your system adminstrator'
        );
        break;
      case 422:
        Popup.open('ERROR_MESSAGE', 'Server is unable to process the request');
        break;

      default:
        Popup.open('ERROR_MESSAGE', error.message);
        break;
    }
  } else {
    Popup.open('ERROR_MESSAGE', error.message);
  }
};

export default errorHandler;
