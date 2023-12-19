/* eslint-disable linebreak-style */
const input = document.querySelector('.input');
const inputButton = document.querySelector('.button');
const rusContainer = document.querySelector('.rus');
const engContainer = document.querySelector('.eng');
const deleteIcon = document.querySelector('.delete');
const clearButton = document.querySelector('.clear');

function addNewWord() {
  if (input.value) {
    const index = document.createElement('span');
    const newRus = document.createElement('div');
    const newEng = document.createElement('div');
    const rusDiv = document.createElement('div');
    const engDiv = document.createElement('div');
    const ruResult = document.createElement('div');
    const engResult = document.createElement('div');

    index.className = 'index';
    newRus.className = 'rus';
    newEng.className = 'eng';
    rusDiv.className = 'word';
    engDiv.className = 'translit';
    ruResult.className = 'rus_word';
    engResult.className = 'eng_word';

    const allIndexes = document.querySelectorAll('.index');
    const allRuResults = document.querySelectorAll('.rus_word');
    const allEngResults = document.querySelectorAll('.eng_word');

    allRuResults.forEach((result, index) => {
      if (index !== allRuResults.length) {
        result.style.borderBottom = '1px solid black';
      }
    });

    allEngResults.forEach((result, index) => {
      if (index !== allEngResults.length) {
        result.style.borderBottom = '1px solid black';
      }
    });

    index.innerText = `${allIndexes.length + 1}.`;

    const newDeleteIcon = deleteIcon.cloneNode(true);

    newDeleteIcon.addEventListener('click', () => {
      const divToRemove = newDeleteIcon.parentNode;
      const newDivtoRemove = index.parentNode;
      divToRemove.remove();
      newDivtoRemove.remove();

      const allIndexes = document.querySelectorAll('.index');
      allIndexes.forEach((index, i) => {
        index.innerText = i + 1;
      });
    });

    if (input.value.length > 7) {
      rusDiv.innerText = `${input.value.substr(0, 7)}...`;
      engDiv.innerText = translit(rusDiv.innerText);

      const tooltipRu = document.createElement('div');
      tooltipRu.className = 'tooltip';
      tooltipRu.innerText = input.value;

      ruResult.addEventListener('mouseenter', () => {
        tooltipRu.style.display = 'block';
      });

      ruResult.addEventListener('mouseleave', () => {
        tooltipRu.style.display = 'none';
      });

      ruResult.prepend(tooltipRu);

      const tooltipEng = document.createElement('div');
      tooltipEng.className = 'tooltip';
      tooltipEng.innerText = translit(input.value);

      engResult.addEventListener('mouseenter', () => {
        tooltipEng.style.display = 'block';
      });

      engResult.addEventListener('mouseleave', () => {
        tooltipEng.style.display = 'none';
      });

      engResult.prepend(tooltipEng);
    } else {
      rusDiv.innerText = input.value.substr(0, 7);
      engDiv.innerText = translit(rusDiv.innerText);
    }

    rusContainer.append(newRus);
    newRus.prepend(ruResult);
    ruResult.prepend(index, rusDiv);

    engContainer.append(newEng);
    newEng.prepend(engResult);
    engResult.prepend(engDiv, newDeleteIcon);
  }
  input.value = '';
}

inputButton.addEventListener('click', addNewWord);

input.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    addNewWord();
  }
});

clearButton.addEventListener('click', () => {
  window.location = '/';
});

function translit(str) {
  let translitStr = '';
  const goTranslit = {
    а: 'a',
    А: 'A',
    б: 'b',
    Б: 'B',
    в: 'v',
    В: 'V',
    г: 'g',
    Г: 'G',
    д: 'd',
    Д: 'D',
    е: 'e',
    Е: 'E',
    ё: 'e',
    Ё: 'E',
    ж: 'zh',
    Ж: 'ZH',
    з: 'z',
    З: 'Z',
    и: 'i',
    И: 'I',
    й: 'y`',
    Й: 'Y`',
    к: 'k',
    К: 'K',
    л: 'l',
    Л: 'L',
    м: 'm',
    М: 'M',
    н: 'n',
    Н: 'N',
    о: 'o',
    О: 'O',
    п: 'p',
    П: 'P',
    р: 'r',
    Р: 'R',
    с: 's',
    С: 'S',
    т: 't',
    Т: 'T',
    у: 'u',
    У: 'U',
    ф: 'f',
    Ф: 'F',
    х: 'h',
    Х: 'H',
    ц: 'c',
    Ц: 'C',
    ч: 'ch',
    Ч: 'CH',
    ш: 'sh',
    Ш: 'SH',
    щ: 'shh',
    Щ: 'SHH',
    ь: "'",
    Ь: "'",
    ы: 'y',
    Ы: 'Y',
    ъ: '`',
    Ъ: '`',
    э: 'e',
    Э: 'E',
    ю: 'yu',
    Ю: 'YU',
    я: 'ya',
    Я: 'YA',
  };

  for (let i = 0; i < str.length; i += 1) {
    if (goTranslit.hasOwnProperty(str[i])) {
      translitStr += goTranslit[str[i]];
    } else {
      translitStr += str[i];
    }
  }

  return translitStr;
}

