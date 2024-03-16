import { showErrorComponent } from './component-controller';

const displayErrorMsg = function displayErrorMsg(msg) {
  const errorMsg = msg.replaceAll('"', '').split('Error: ')[1];
  showErrorComponent(errorMsg);
};

export default displayErrorMsg;
