(function() {
  const replaceLongText = (selector, maxLength) => {
    document.querySelectorAll(selector).forEach(desc => {
      if (desc.textContent.length > maxLength) {
        const newDesc = desc.textContent.slice(0, maxLength - 2)
        desc.textContent = newDesc + '...'
      }
    })
  }

  // calls
  replaceLongText('.PostPreview-Desc', 195)
  replaceLongText('.PostPreview-Title', 85)
})()