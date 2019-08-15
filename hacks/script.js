const n = 20;

if(!window.history.state) {
  for(let i = 0; i < n; i++) {
    history.pushState(i, "num" + i, "?h-" + i)
  }
}

const r = (length, s) => Array.from({length}, _ => s).join('') 

const render = () => {
  const i = window.history.state
  document.body.innerText = r(i, '.') + '|' + r(n - i - 1, '.')

  document.body.style.transform = 
    `translateX(${((i/n) - 0.5) * 20}%)`
}

render()

window.addEventListener('popstate', render)