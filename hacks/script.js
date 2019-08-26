const n = 13;

const dom = (parent, array, cb) => {
  if(parent.children.length !== array.length) {
    parent.innerHTML = ''
    array.forEach((value, i) => {
      const el = document.createElement('div')
      parent.appendChild(el)
      cb(value, el, i);
    }) 
  } else {
    array.forEach((value, i) => {
      cb(value, parent.children[i], i);
    }) 
  }
}

const base  =  document.createElement('div')
document.body.appendChild(base);

const bulletsBase  =  document.createElement('div')
document.body.appendChild(bulletsBase);


const r = (length, s) => Array.from({ length }, _ => s).join('')
const text = (i) => r(i, '.') + '△' + r(n - i - 1, '.')


const el = document.createElement('div')
el.className = 'base'
document.body.appendChild(el);

const render = () => {
  const i = window.history.state
  // el.innerText = text(i)

  dom(base, text(i).split(''), (value, el, i) => {
    el.innerText = value
    Object.assign(
      el.style, {
        position: 'absolute',
        left: '50%',
        bottom: '1vh',
        transform: `translate(-50%, 0) translate(${(i - n/2) * 5}vw, 0)`
      }
    )
  })

}

window.addEventListener('popstate', render)


const k = '_'
let bullets = JSON.parse(sessionStorage.getItem(k) || '[]')
window.addEventListener('beforeunload', () => {
  bullets.push([window.history.state, + new Date])

  sessionStorage.setItem(k, JSON.stringify(bullets))
})



if (window.history.state === undefined || window.history.state === null) {
  
  console.log("START")

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

  const loop = () => {
    const now = + new Date;


    dom(bulletsBase, bullets, (value, el) => {
      // debugger;
      const [i, b] = value

      el.className = 'bullet'
      el.textContent = '▲'
      el.style.transform = `translate(-50%, ${(b - now) / 25}vh) translateX(${(i - n/2) * 5}vw)`
    })

    bullets
      = bullets.filter(([_, b]) => 
        ((b - now) / 25) > -100
      )

    requestAnimationFrame(loop)
  }

  loop()

}