(function() {
  const replaceLongText = (selector, maxLength) => {
    document.querySelectorAll(selector).forEach(el => {
      if (el.textContent.length > maxLength) {
        const newDesc = el.textContent.slice(0, maxLength - 2)
        el.textContent = newDesc + '...'
      }
    })
  }

  // calls
  replaceLongText('.PostPreview-Desc', 195)
  replaceLongText('.PostPreview-Title', 85)
})()