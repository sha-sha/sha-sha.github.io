function init() {
  // query all buttons elements (<button> tags)
  // and add a click event listener to each
  // that shows an alert when clicked
  const buttons = document.querySelectorAll('button');
  buttons.forEach(button => {
    // if button has data-toggle attribute, then add a click event listener
    if (button.hasAttribute('data-toggle')) {
      const toggle = button.getAttribute('data-toggle');
      const targetId = button.getAttribute('data-target');
      const targetElement = document.querySelector(targetId);
      button.addEventListener('click', () => {
        targetElement.classList.toggle(toggle);
      });
    }
  });
}

init();
