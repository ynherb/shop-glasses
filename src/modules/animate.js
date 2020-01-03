export default function (duration, draw) {
  let start = performance.now()
  console.log(start)
  requestAnimationFrame(function animate (time) {
    let timeFraction = (time - start) / duration
    if (timeFraction > 1) timeFraction = 1
    draw(timeFraction)
    if (timeFraction < 1) {
      requestAnimationFrame(animate)
    }
  })
}
