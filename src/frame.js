export function getNewFrame({sessionId, sharedKey}) {
  let container = document.createElement('iframe')
  container.setAttribute(
    'src',
    `https://matic.network/opensigner/session?sessionId=${sessionId}&sharedKey=${sharedKey}`
  )
  container.setAttribute('allowtransparency', true)
  container.setAttribute(
    'style',
    `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      border: none;
      z-index: 999999;
  `
  )
  return container
}
