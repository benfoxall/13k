const n = 20;

if (!window.history.state) {
  const a = document.createElement('a')
  a.textContent = 'start'
  a.href = "#"
  a.onclick = () => {

    for (let i = 0; i < n; i++) {
      history.pushState(i, "num" + i, "?h-" + i)
    }

    a.remove()
    render()
  }

  document.body.appendChild(a);

}

const r = (length, s) => Array.from({ length }, _ => s).join('')

const el = document.createElement('div')
document.body.appendChild(el);

const render = () => {
  const i = window.history.state
  el.innerText = r(i, '.') + '|' + r(n - i - 1, '.')

  document.body.style.transform =
    `translateX(${((i / n) - 0.5) * 20}%)`
}

render()


window.addEventListener('popstate', render)
