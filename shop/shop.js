export default class Shop {

    constructor(){
       
    }


   async getFurnitures(){
      await fetch('http://localhost:3000/rewards-shop')
        .then(res=>res.json())
        .then(response=>localStorage.setItem('shop',JSON.stringify(response)))
    }
}