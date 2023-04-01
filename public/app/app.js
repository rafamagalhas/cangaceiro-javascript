document
.querySelector('#myButton')
.onclick = () =>
  fetch('http://localhost:3000/notasx')
    .then(res => {
      if (res.ok) return res.json;
      return Promise.reject(res.statusText)
    })
    .then(notas => console.log(notas))
    .catch(console.log);