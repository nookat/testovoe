(function() {
  const like = () => {
    document.querySelectorAll('.Likes-Icon').forEach(icon => {
      icon.addEventListener('click', function () {
        this.classList.add('Likes-Icon_active')
      })
    })
  }

  // calls
  like()
})()