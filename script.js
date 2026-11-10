const wall = document.querySelector('.wall');

for (let row = 0; row < 4; row++) {
  const order = Array.from({ length: 14 }, (_, index) => index + 1);

  for (let index = order.length - 1; index > 0; index--) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [order[index], order[randomIndex]] = [order[randomIndex], order[index]];
  }

  const images = order.map(number => '<img alt="" src="assets/' + number + '.jpg">').join('');
  const group = '<div class="group">' + images + '</div>';
  wall.insertAdjacentHTML('beforeend', '<div class="row"><div class="track">' + group + group + '</div></div>');
}

const observer = new IntersectionObserver(entries => {
  entries.forEach(({ target, isIntersecting }) => {
    target.classList.toggle('visible', isIntersecting);
    const link = document.querySelector('nav a[href="#' + target.id + '"]');

    if (isIntersecting) {
      link.setAttribute('aria-current', 'location');
    } else {
      link.removeAttribute('aria-current');
    }
  });
}, { threshold: 0.55 });

document.querySelectorAll('section').forEach(section => observer.observe(section));

document.querySelector('#signup').addEventListener('submit', event => {
  event.preventDefault();
  const lines = [...new FormData(event.currentTarget)].map(([key, value]) => key + '：' + value.trim());
  const url = URL.createObjectURL(new Blob([lines.join('\r\n')], { type: 'text/plain;charset=utf-8' }));
  const link = document.createElement('a');
  link.href = url;
  link.download = '校园偶像部报名.txt';
  link.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
  document.querySelector('#status').textContent = '已生成报名文件，请将文件转交给社团联系人。';
});
