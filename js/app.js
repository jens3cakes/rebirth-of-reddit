const getElem = document.getElementById('main');

redditReq('Eyebleach');

function convertedDate(utc) {
  return new Date(utc * 1000).toLocaleDateString();
}

function redditReq(subReddit) {

  const getRedditPage = new XMLHttpRequest();

  getRedditPage.addEventListener('load', function () {
    const dataReq = JSON.parse(this.responseText);
    const posts = dataReq.data.children;

    const cleanedData = posts.map(function (post) {
      return {
        title: post.data.title,
        author: post.data.author_fullname,
        date: convertedDate(post.data.created_utc),
        img: post.data.thumbnail,
        subText: post.data.selftext,
        fetch: post.data.url,
      }
    })
    const container = document.createElement('div')
    container.className = "container"

    cleanedData.forEach((cardData) => {
      const newCard = makeCard(cardData);
      container.appendChild(newCard);
    })

    getElem.innerHTML = "";
    getElem.appendChild(container);
  })

  getRedditPage.open("GET", `https://www.reddit.com/r/${subReddit}.json`)
  getRedditPage.send();
}

function makeCard(cardData) {
  //a tag for clickable event
  const makeSubCard = document.createElement('div')
  makeSubCard.className = 'subCards'
  
  const makeCardImg = document.createElement('img');
  makeCardImg.className = 'image'
  makeCardImg.src = cardData.img;
  //makeCardImg.addEventListener('click', cardData.fetch )
  makeSubCard.appendChild(makeCardImg);

  const createCardTitle = document.createElement('h3');
  createCardTitle.className = 'title'
  createCardTitle.innerText = 'title: ' + cardData.title;
  makeSubCard.appendChild(createCardTitle);

  const subCardData = document.createElement('div')
  subCardData.className = 'cardData'
  createCardTitle.appendChild(subCardData)

  const subAuthor = document.createElement('div');
  subAuthor.className = 'Author';
  subAuthor.innerText = 'author: ' + cardData.author;
  subCardData.appendChild(subAuthor)

  const subRText = document.createElement('p');
  subRText.className = 'subText';
  subRText.innerHTML = cardData.subText;
  subAuthor.append(subRText);

  const subDate = document.createElement('div');
  subDate.className = 'date';
  subDate.innerHTML = cardData.date;
  subAuthor.appendChild(subDate)

  return makeSubCard;
}

const getBtn1 = document.getElementById('sub1');
getBtn1.addEventListener('click', eyeBleachButtonEvent);

const getBtn2 = document.getElementById('sub2');
getBtn2.addEventListener('click', marvelButtonEvent);

const getBtn3 = document.getElementById('sub3');
getBtn3.addEventListener('click', picturesButtonEvent);

function eyeBleachButtonEvent() {
  redditReq("Eyebleach");
}

function marvelButtonEvent() {
  redditReq("Marvel");
}

function picturesButtonEvent() {
redditReq('Pictures');
}

const faceBookButton = document.getElementsByTagName('footer');
