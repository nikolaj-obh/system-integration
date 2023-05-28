const date = new Date();
console.log(date);

console.log(Date());

//Region specifik

console.log("==============REGION TIME==================")
console.log(new Intl.DateTimeFormat("en-US").format(date))
console.log(new Intl.DateTimeFormat("da-DK").format(date))