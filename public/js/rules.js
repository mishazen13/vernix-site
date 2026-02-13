fetch('/api/rules')
  .then((response) => response.json())
  .then((data) => {
    document.getElementById('rules-title').textContent = data.title;
    document.getElementById('rules-list').innerHTML = data.rules
      .map((rule) => `<li>${rule}</li>`)
      .join('');
  });
