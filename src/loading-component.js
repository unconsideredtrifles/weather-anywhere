const loadingEl = document.getElementsByClassName('loading-indicator')[0];
const bodySection = document.getElementsByClassName('body-section-layout')[0];


const startLoading = function startLoading() {
  loadingEl.classList.remove('display-none');
  bodySection.classList.add('display-none');
};


const stopLoading = function stopLoading() {
  loadingEl.classList.add('display-none');
  bodySection.classList.remove('display-none');
}


export {
  startLoading,
  stopLoading
};