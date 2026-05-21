const card = document.getElementById("card")
const inside = document.getElementById("inside")
const toggle = document.getElementById("toggle")
const music = document.getElementById("music")
const particles = document.querySelector(".particles")

for(let i = 0; i < 45; i++){

  const star = document.createElement("span")

  star.style.left = Math.random() * 100 + "%"
  star.style.top = Math.random() * 100 + "%"

  const size = Math.random() * 2 + 1

  star.style.width = size + "px"
  star.style.height = size + "px"

  star.style.animationDuration = 12 + Math.random() * 20 + "s"
  star.style.animationDelay = Math.random() * 8 + "s"

  particles.appendChild(star)
}

window.addEventListener("mousemove", e => {

  const rect = card.getBoundingClientRect()

  const x = e.clientX - rect.left
  const y = e.clientY - rect.top

  const centerX = rect.width / 2
  const centerY = rect.height / 2

  const rotateX = (y - centerY) / 26
  const rotateY = (x - centerX) / 26

  card.style.transform =
  `
  rotateX(${-rotateX}deg)
  rotateY(${rotateY}deg)
  scale(1.01)
  `

  inside.style.transform =
  `
  translateX(${rotateY * 0.8}px)
  translateY(${rotateX * 0.8}px)
  `

  const radiusA = 38 + (x / rect.width) * 12
  const radiusB = 38 + (y / rect.height) * 12

  card.style.borderRadius =
  `${radiusA}px ${radiusB}px ${radiusA}px ${radiusB}px`

  card.style.setProperty("--x", `${x}px`)
  card.style.setProperty("--y", `${y}px`)
})

window.addEventListener("mouseleave", () => {

  card.style.transform =
  `
  rotateX(0deg)
  rotateY(0deg)
  scale(1)
  `

  inside.style.transform =
  `
  translateX(0px)
  translateY(0px)
  `

  card.style.borderRadius = `38px`
})

music.volume = 0.35

let muted = true

music.muted = true

toggle.innerText = "sound on"

document.body.addEventListener("click", async () => {

  try {

    await music.play()

    music.muted = false

    muted = false

    toggle.innerText = "sound off"

  } catch(err) {}

}, { once:true })

toggle.addEventListener("click", () => {

  muted = !muted

  music.muted = muted

  toggle.innerText = muted
    ? "sound on"
    : "sound off"
})