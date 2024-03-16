const loadingEl = document.getElementsByClassName('loading-indicator')[0];
const errorText = document.getElementsByClassName('error-text')[0];
const bodySection = document.getElementsByClassName('body-section-layout')[0];


const hideLoadingComponent = function hideLoadingComponent() {
  loadingEl.classList.add('display-none');
};


const hideErrorComponent = function hideErrorComponent() {
  errorText.classList.add('display-none');
};


const hideBodyComponent = function hideBodyComponent() {
  bodySection.classList.add('display-none');
};


const showLoadingComponent = function showLoadingComponent() {
  hideErrorComponent();
  hideBodyComponent();
  loadingEl.classList.remove('display-none');
};


const showErrorComponent = function showErrorComponent(msg) {
  hideLoadingComponent();
  hideBodyComponent();
  errorText.textContent = msg;
  errorText.classList.remove('display-none');
};


const showBodyComponent = function showBodyComponent() {
  hideLoadingComponent();
  hideErrorComponent();
  bodySection.classList.remove('display-none');
};


export {
  showLoadingComponent,
  hideLoadingComponent,
  showErrorComponent,
  showBodyComponent,
};
