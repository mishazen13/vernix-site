fetch('/api/home')
  .then((response) => response.json())
  .then((data) => {
    document.getElementById('hero-title').textContent = data.title;
    document.getElementById('hero-description').textContent = data.description;
    document.getElementById('hero-ip').textContent = data.ip;
    document.getElementById('hero-online').textContent = `${data.online} игроков`;
  });
