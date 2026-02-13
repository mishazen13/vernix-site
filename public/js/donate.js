fetch('/api/donate')
  .then((response) => response.json())
  .then((data) => {
    document.getElementById('donate-title').textContent = data.title;
    document.getElementById('packs').innerHTML = data.packs
      .map((pack) => `
        <article class="pack">
          <h3>${pack.name}</h3>
          <p><strong>${pack.price}</strong></p>
          <p>${pack.perks}</p>
        </article>
      `)
      .join('');
  });
