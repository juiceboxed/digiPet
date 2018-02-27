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
    this.sayings = [
        {mood: "happy", perc:0.2, saying:"Today is the greatest day I've ever known."},
        {mood: "happy", perc:0.4, saying:"Bork Bork Bork!!"},
        {mood: "happy", perc:0.6, saying:"Damn Skippy!"},
        {mood: "happy", perc:0.8, saying:"Dinner Gurkins!"},
        {mood: "happy", perc:1, saying:"Awesome Sauce!!"},
        {mood: "angry", perc:0.2, saying:"Toasting my marshmallows"},
        {mood: "angry", perc:0.4, saying:"You are a sour grape twerplette!"},
        {mood: "angry", perc:0.6, saying:"Eat Dust!"},
        {mood: "angry", perc:0.8, saying:"You're a Muffin Stump!"},
        {mood: "angry", perc:1, saying:"Get Forked!"},
        {mood: "sad", perc:0.2, saying:"I'm a wet noodle of sadness :("},
        {mood: "sad", perc:0.4, saying:"I feel like someone went wee in my cornflakes :("},
        {mood: "sad", perc:0.6, saying:"I'm useless like a muffin stump :("},
        {mood: "sad", perc:0.8, saying:"My life is like cherry pits :("},
        {mood: "sad", perc:1, saying:"I'm so far behind that I'll never Ketchup :("},
        {mood: "joke", perc:0.2, saying:"Smoking will kill you... Bacon will kill you... But,smoking bacon will cure it."},
        {mood: "joke", perc:0.4, saying:"One day you're the best thing since sliced bread. The next, you're toast."},
        {mood: "joke", perc:0.6, saying:"I removed all the fattening food from my house. It was delicious."},
        {mood: "joke", perc:0.8, saying:"What is an alien's favorite candy? A Mars bar!"},
        {mood: "joke", perc:1, saying:"What do you call a cow during an earthquake? A milkshake."}
    ]
    /*
        an array of compliments
        -10 items
    */
   let compliments = [
       `${uname}, you have the shiniest nose hairs!`,
       `${uname} is awesome!`,
       `If you look in the dictionary next to awesome, you'll find a picture of ${uname}!`,
       `${uname} is the greatest!`,
       `${uname}, you are fine! Damn!`,
       `${uname}, did it hurt when you fell out of heaven?`,
       `${uname}, you have style!`,
       `${uname}, I'd hug you if I weren't just pixels!`,
       `${uname}, I bet you sweat glitter!`,
   ]

    /*
        add an array of favourite foods(at least 10)
        each element of the array should have
        -food name
        -food value
        -chance of food poisoning
    */

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

//a drink beer command that slows down the metabolism of your pet

/*
an eat food command that will select a random food that will 
-check if the pet gets food poisoning
-add points to the pets food count if they don't get food poisoning
-remove points from the pets food count if they do get food poisoning
*/

// a command that takes in a mood and returns a phrase

/*
    a command that takes in your name and returns you a compliment structured using template
*/