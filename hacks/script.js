const n = 13;

const r = (length, s) => Array.from({ length }, _ => s).join('')
const text = (i) => r(i, '.') + '△' + r(n - i - 1, '.')

const el = document.createElement('div')
el.className = 'base'
document.body.appendChild(el);

const render = () => {
  const i = window.history.state
  el.innerText = text(i)
}

window.addEventListener('popstate', render)


const k = '_'
let bullets = JSON.parse(sessionStorage.getItem(k) || '[]')
window.addEventListener('beforeunload', () => {
  bullets.push(+ new Date)

  sessionStorage.setItem(k, JSON.stringify(bullets))
})



if (!window.history.state) {
  const a = document.createElement('a')
  a.textContent = '[START]'
  a.style.cursor = 'pointer'
  a.onclick = (e) => {
    a.remove()
    e.preventDefault()

    for (let i = 0; i < n; i++) {
      history.pushState(i, "num" + i, '?' + text(i))
    }

    history.go(~~-n/2)

    render()
  }

  document.body.appendChild(a);

} else {
  console.log("FIRE")

  render()

  // const x = document.createElement('div')
  // x.className = 'bullet'
  // x.textContent = '▲'
  // document.body.appendChild(x);

  // const at = + new Date;

  // const fire = [+ new Date];

  const loop = () => {
    const now = + new Date;

    for(const el of document.querySelectorAll('.bullet')) {
      el.remove()
    }


    bullets
      .forEach(b => {

        const x = document.createElement('div')
        x.className = 'bullet'
        x.textContent = '▲'
        x.style.transform = `translate(-50%, ${(b - now) / 25}vh)`
        document.body.appendChild(x);

      })

    bullets
      = bullets.filter(b => 
        ((b - now) / 25) > -100
      )

    requestAnimationFrame(loop)
  }

  loop()

}

