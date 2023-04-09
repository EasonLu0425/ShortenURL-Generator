// const urlData = []
function generateShortenURL (URL) {
  // receive original url and check if the url is already in the data
  // const exsistURL = urlData.find(element => element.originalURL === URL)
  // if (exsistURL) {
  //   return exsistURL.shortenURL
  // }
  // generate a random id for shorten url
  const URLId = generateID()
  // check if URLId is already exsist
  // if (urlData.find(element => element.shortenURL === URLId)) {
  //   return generateShortenURL
  // }
  
  // urlData.push({
  //   originalURL: URL,
  //   shortenURL: URLId
  // })

  // console.log(urlData)
  // console.log(`this will generate shorten url`)
  return URLId
}

// 抽取ID號碼
function generateID() {
  let Id = ''
  const collection = '1234567890abcdefghijklmnopqrstuvwxyz'
  for (let i = 0; i <= 6 ; i++) {
    let index = Math.floor(Math.random() * collection.length)
    Id += collection[index]
  }
  return Id
}

generateShortenURL()


module.exports = generateShortenURL