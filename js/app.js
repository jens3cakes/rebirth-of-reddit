

function redditReq(subReddit, callback) {
  const getRedditPage = new XMLHttpRequest();
  getRedditPage.addEventListener('load', function () {
    const dataReq = JSON.parse(this.responseText)
    const posts = dataReq.data.children
    const getImg = posts.data
    
    const cleanedData = posts.map(function (post) {

      return {
        title: post.data.title,
        author: post.data.author_fullname,
        date: convertedDate(post.data.created_utc),
        img: post.preview
      }
    })
    console.log(posts)
    console.log(getImg)
  });
  getRedditPage.open("GET", `https://www.reddit.com/r/${subReddit}.json`)
  getRedditPage.send();
}
const getElem = document.getElementById('main');
redditReq('Eyebleach')

function convertedDate(utc) {
  return new Date(utc * 1000).toLocaleDateString();
}

function makeCards() {
  const makeSubCard = document.createElement('div')
  makeSubCard.className = 'subCards'
  getElem.appendChild(makeSubCard)
  // cleanedData.map(() => {
  const createCardTitle = document.createElement('h3');
  createCardTitle.className = 'title'
  createCardTitle.innerText = cleanedData.title
  makeSubCard.appendChild(createCardTitle);

  const subCardData = document.createElement('div')
  subCardData.className = 'cardData'
  createCardTitle.appendChild(subCardData)

  const subAuthor = document.createElement('div');
  subAuthor.className = 'Author';
  subAuthor.innerText = cleanedData.author
  subCardData.appendChild(subAuthor)

  const subRText = document.createElement('p');
  subRText.className = 'subText';
  subRText.innerHTML = cleanedData.subRText
  subAuthor.append(subRText);

  const subDate = document.createElement('div');
  subDate.className = 'date';
  subDate.innerHTML = utcConversion();
  subAuthor.appendChild(subDate)
}



