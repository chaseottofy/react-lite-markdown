/**
 * handleTheme
 * @param {setTheme} function
 * @description Cycles through the three themes 
 * @returns {void}
 */
export default function handleTheme({ store, setTheme }) {
  const root = document.documentElement;
  if (root.classList.contains("theme__dark")) {
    root.classList.remove("theme__dark");
    root.classList.add("theme__light");
    setTheme("theme__light");
    store.set('theme', 'theme__light')
  } else if (root.classList.contains("theme__light")) {
    root.classList.remove("theme__light");
    root.classList.add("theme__medium");
    setTheme("theme__medium");
    store.set('theme', 'theme__medium')
  } else {
    root.classList.remove("theme__medium");
    root.classList.add("theme__dark");
    setTheme("theme__dark");
    store.set('theme', 'theme__dark')
  }
};