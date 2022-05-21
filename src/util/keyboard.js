import hotkeys from "hotkeys-js";

const observerMap = {};
export function addKeyObserver(key, callback) {
  console.log('addKeyObserver');
  if(!observerMap[key]) {
    observerMap[key] = [];
    hotkeys(key, () => {
      console.log(key);
      executeCallback(key);
    });
  }
  observerMap[key].push(callback);
}

export function removeKeyObserver(key, callback) {
  console.log('removeKeyObserver');
  observerMap[key] = observerMap[key].filter(item => item !== callback);
}

function executeCallback(key) {
  console.dir(observerMap[key]);
  for(const ob of observerMap[key]) {
    ob();
  }
}