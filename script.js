let shots = 6; // Limite de tiros
let bulletPosition = Math.floor(Math.random() * 6) + 1; // Posição inicial da bala (1-6)

// Temas
const lightTheme = {
  backgroundColor: '#f4f4f4',
  buttonColor: '#003366',
  textColor: '#000',
  buttonBackgroundColor: '#003366',
  buttonHoverColor: '#002244',
  resultTextColor: '#000',
  footerTextColor: '#333',
  buttonTextColor: '#fff'
};

const darkTheme = {
  backgroundColor: '#333',
  buttonColor: '#003366',
  textColor: '#fff',
  buttonBackgroundColor: '#003366',
  buttonHoverColor: '#002244',
  resultTextColor: '#fff',
  footerTextColor: '#ccc',
  buttonTextColor: '#fff'
};

// Função para mudar o tema
function toggleTheme() {
  const currentTheme = document.body.style.backgroundColor === darkTheme.backgroundColor ? 'light' : 'dark';
  changeTheme(currentTheme);
}

function changeTheme(theme) {
  const selectedTheme = theme === 'light' ? lightTheme : darkTheme;
  document.body.style.backgroundColor = selectedTheme.backgroundColor;
  document.body.style.color = selectedTheme.textColor;
  document.getElementById('spinButton').style.backgroundColor = selectedTheme.buttonBackgroundColor;
  document.getElementById('spinButton').style.color = selectedTheme.buttonTextColor;
  document.querySelectorAll('button').forEach(button => {
    button.style.backgroundColor = selectedTheme.buttonBackgroundColor;
    button.style.color = selectedTheme.buttonTextColor;
  });
  document.querySelectorAll('button').forEach(button => {
    button.onmouseover = function () {
      button.style.backgroundColor = selectedTheme.buttonHoverColor;
    };
    button.onmouseout = function () {
      button.style.backgroundColor = selectedTheme.buttonBackgroundColor;
    };
  });
  document.getElementById('result').style.color = selectedTheme.resultTextColor;
  document.querySelector('footer').style.color = selectedTheme.footerTextColor;
  document.getElementById('shotsRemaining').style.color = selectedTheme.textColor;
}

// Função para ativar a vibração
function vibrateOnMobile() {
  if (navigator.vibrate) {
    navigator.vibrate(1000); // Vibra por 1 segundo
  }
}

// Função de click no botão
document.getElementById('spinButton').addEventListener('click', () => {
  if (shots > 0) {
    shots--;
    const playerShot = shots + 1;

    const resultElement = document.getElementById('result');
    const shotsRemainingElement = document.getElementById('shotsRemaining');

    const shotSound = document.getElementById('shotSound');

    if (playerShot === bulletPosition) {
      resultElement.textContent = "Você perdeu! 💥";
      resultElement.style.color = 'red';
      shotSound.play(); // Som de tiro
      vibrateOnMobile(); // Vibração para dispositivos móveis
      document.getElementById('spinButton').disabled = true;
      document.getElementById('refreshButton').style.display = 'block';
      localStorage.setItem('lastScore', `Você perdeu com ${6 - shots} tiros restantes`);
    } else {
      resultElement.textContent = "Você sobreviveu! 🎉";
      resultElement.style.color = 'green';
    }

    shotsRemainingElement.textContent = `Tiros restantes: ${shots}`;

    if (shots === 0) {
      document.getElementById('spinButton').disabled = true;
    }
  }
});

function refreshGame() {
  shots = 6;
  bulletPosition = Math.floor(Math.random() * 6) + 1;
  document.getElementById('spinButton').disabled = false;
  document.getElementById('refreshButton').style.display = 'none';
  document.getElementById('result').textContent = '';
  document.getElementById('shotsRemaining').textContent = `Tiros restantes: ${shots}`;
}

// Inicializa com o tema claro
changeTheme('light');