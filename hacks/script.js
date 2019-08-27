const n = 13;

const el = (name, props) => Object.assign(document.createElement(name), props)
const style = (element, props) => Object.assign(element.style, props)
const append = el => document.body.appendChild(el)

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


const render = () => {
  const i = window.history.state

  dom(base, text(i).split(''), (value, el, i) => {
    el.innerText = value

    style(el, {
      position: 'absolute',
      left: '50%',
      bottom: '1vh',
      transform: `translate(-50%, 0) translate(${(i - n/2) * 5}vw, 0)`
    })
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

  const button = el('a', {
    textContent: '[START]',
    onclick: (e) => {
      button.remove()
      e.preventDefault()
  
      for (let i = 0; i < n; i++) {
        history.pushState(i, "num" + i, '?' + text(i))
      }
  
      history.go(~~-n/2)
  
      render()
    }
  });

  style(button, {
    cursor: 'pointer'
  })

  append(button)


} else {
  console.log("FIRE")

  render()

  const loop = () => {
    const now = + new Date;

    dom(bulletsBase, bullets, (value, el) => {
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