function generateRandomString() {
  var text = "";
  var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

  for (let i=0; i < 6; i++) {
    text += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return text;
}

console.log(generateRandomString())