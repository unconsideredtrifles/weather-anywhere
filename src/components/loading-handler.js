import { showLoadingComponent, hideLoadingComponent, showBodyComponent } from './component-controller';


const startLoading = function startLoading() {
  showLoadingComponent();
};


const stopLoading = function stopLoading() {
  hideLoadingComponent();
  showBodyComponent();
};


export {
  startLoading,
  stopLoading,
};
