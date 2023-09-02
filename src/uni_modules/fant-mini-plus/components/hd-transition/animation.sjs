function show(newValue, oldValue, ownerInstance) {
  if (newValue === true && oldValue === false) {
    createAnimation('enter', ownerInstance)
  } else if (newValue === false && oldValue === true) {
    createAnimation('leave', ownerInstance)
  }
}

function createAnimation(type, ownerInstance) {
  if (type === 'enter') {
    ownerInstance.requestAnimationFrame(function () {
      enterAnimation(ownerInstance)
    })
  } else {
    ownerInstance.requestAnimationFrame(function () {
      leaveAnimation(ownerInstance)
    })
  }
}

function enterAnimation(ownerInstance, index = 0) {
  if (index === 0) {
    ownerInstance.callMethod('enter')
    index += 1
    ownerInstance.requestAnimationFrame(function () {
      enterAnimation(ownerInstance, index)
    })
  } else if (index === 1) {
    ownerInstance.callMethod('doEnter')
    index += 1
    ownerInstance.requestAnimationFrame(function () {
      enterAnimation(ownerInstance, index)
    })
  } else if (index === 4) {
    ownerInstance.callMethod('doEnterTo')
  } else if (index < 4) {
    index += 1
    ownerInstance.requestAnimationFrame(function () {
      enterAnimation(ownerInstance, index)
    })
  }
}

function leaveAnimation(ownerInstance, index = 0) {
  if (index === 0) {
    ownerInstance.callMethod('leave')
    index += 1
    ownerInstance.requestAnimationFrame(function () {
      leaveAnimation(ownerInstance, index)
    })
  } else if (index === 1) {
    ownerInstance.callMethod('doLeave')
    index += 1
    ownerInstance.requestAnimationFrame(function () {
      leaveAnimation(ownerInstance, index)
    })
  } else if (index === 2) {
    ownerInstance.callMethod('doLeaveTo')
  } else if (index < 2) {
    index += 1
    ownerInstance.requestAnimationFrame(function () {
      leaveAnimation(ownerInstance, index)
    })
  }
}

export default {
  show
}
