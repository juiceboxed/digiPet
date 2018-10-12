function Tamogotchi(tamoName) {
    //
    this.petName;
    this.initialFood = 60;
    this.metabolismRate = 1000;

    /*
        add an array of objects
        -20 items
        -each element of the array has the following
            -mood(angry, happy, sad, joke)
            -mood percentage
            -saying(a saying relating the the mood)
    */
    this.moodArray = [
    	{mood: "angry", percentage: 1, saying: "I am angry!"},
    	{mood: "angry", percentage: 2, saying: "I am very mad!"},
    	{mood: "angry", percentage: 3, saying: "I couldn't be madder!"},
    	{mood: "angry", percentage: 4, saying: "Don't talk to me...!"},
    	{mood: "angry", percentage: 5, saying: "B!@$#!"},
    	{mood: "happy", percentage: 1, saying: "I am happy!"},
    	{mood: "happy", percentage: 2, saying: "Whatcha doing?!"},
    	{mood: "happy", percentage: 3, saying: "Bonjour!"},
    	{mood: "happy", percentage: 4, saying: "How are you?"},
    	{mood: "happy", percentage: 5, saying: "hi!"},
    	{mood: "sad", percentage: 1, saying: "I am sad!"},
    	{mood: "sad", percentage: 2, saying: "I don't feel happy..."},
    	{mood: "sad", percentage: 3, saying: "Today was a bad day."},
    	{mood: "sad", percentage: 4, saying: "Do you have advil?"},
    	{mood: "sad", percentage: 5, saying: "Sigh...."},
    	{mood: "joke", percentage: 1, saying: "Why did the chicken cross the road?"},
    	{mood: "joke", percentage: 2, saying: "What do you call a car with two trunks?"},
    	{mood: "joke", percentage: 3, saying: "What is a preist without a church?"},
    	{mood: "joke", percentage: 4, saying: "Oreos without the cream are just cookies..."},
    	{mood: "joke", percentage: 5, saying: "Is a worm just a baby snake?"}
    ]


    /*
        an array of compliments
        -10 items
    */
    this.compliments = [
                    "you're the best!", 
                    "I can't imagine a world without you.", 
                    "you're amazing!",
                    "I love you!",
                    "you're the best pet owner ever!",
                    "I love what you feed me!",
                    "I had a dream about you!",
                    "you're always so nice to me!",
                    "you're so sweet!",
                    "you're hilarious!"
                ]

    /*
        add an array of favourite foods(at least 10)
        each element of the array should have
        -food name
        -food value
        -chance of food poisoning
    */
    this.foods = [
    	{name: "cookie", value: 5, probability: "8"},
    	{name: "cake", value: 50, probability: "2"},
    	{name: "apple", value: 10, probability: "6"},
    	{name: "pie", value: 20, probability: "5"},
    	{name: "tuna", value: 30, probability: "9"},
    	{name: "pizza", value: 40, probability: "4"},
    	{name: "salad", value: 15, probability: "3"},
    	{name: "biscuit", value: 2, probability: "2"},
    	{name: "burger", value: 90, probability: "6"},
    	{name: "fries", value: 60, probability: "4"},

    ]

    this.init = () => {
        this.petName = tamoName;
        console.log(`Hi!  I'm ${this.petName}`);
        this.hatch();
    }
    this.init();
}
Tamogotchi.prototype.resetFood = function(){
    this.food=this.initialFood;
}

Tamogotchi.prototype.hatch = function(){
    this.resetFood();
    this.startMetabolism();
}
Tamogotchi.prototype.die = function(){
    clearInterval(this.metabolism);
    console.log("I am dead!");
}
Tamogotchi.prototype.startMetabolism = function(){
    this.metabolism = setInterval(()=> {
        this.food -=1;
        console.log(`${this.food} until I starve`);
        if(this.food<=0){
            this.die();
        }
    },this.metabolismRate);
}

Tamogotchi.prototype.eatLasagna = function() {
    console.log(`can I see the food? ${this.food}`);
    this.food +=20;
}

//to add

//a drink coffee command that speeds up the metabolism of your pet
Tamogotchi.prototype.drinkCoffee = function(){
	clearInterval(this.metabolism);
	this.metabolismRate = this.metabolismRate / 2;
	this.startMetabolism();
}
//a drink beer command that slows down the metabolism of your pet
Tamogotchi.prototype.drinkBeer = function(){
	clearInterval(this.metabolism);
	this.metabolismRate = this.metabolismRate * 2;
	this.startMetabolism();
}
/*
an eat food command that will select a random food that will 
-check if the pet gets food poisoning
-add points to the pets food count if they don't get food poisoning
-remove points from the pets food count if they do get food poisoning
*/

Tamogotchi.prototype.eat = function() {
	var random = Math.floor(Math.random() * 10);
	var random2 = Math.floor(Math.random() * 10);
	const meal = this.foods[random];
	if (meal.probability > random2) {
		console.log("Found a poisonous " + meal.name);
		this.food -=meal.value;
	}
	else {
		console.log("Found a " + meal.name);
		this.food +=meal.value;
	}
}

// a command that takes in a mood and returns a phrase
Tamogotchi.prototype.moodPhrase = function(moodToFind){

var prob = (Math.floor(Math.random() * 5)+1);
console.log(prob);
const result = this.moodArray.find( m => m.mood === moodToFind && m.percentage === prob)

	console.log(result.saying);
}
/*
    a command that takes in your name and returns you a compliment structured using template
*/

Tamogotchi.prototype.compliment = function(owner){
	var random = Math.floor(Math.random() * 10);
	const comp = this.compliments[random];
	this.ownerName = owner;

	console.log(`Hey ${this.ownerName}, ` + comp);

}