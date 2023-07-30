function setVh() {
  const { documentElement } = document;
  const { innerHeight } = window;
  const vh = (innerHeight / 100).toFixed(2);
  documentElement.style.setProperty("--vh", `${vh}px`);
}

export default setVh;
