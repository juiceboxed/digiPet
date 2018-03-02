function Tamogotchi(tamoName) {
    //
    this.petName;
    this.initialFood = 60;
    this.food;
    this.talkTimer;
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
   this.compliments = [
       'bork you have the shiniest nose hairs!',
       `bork is awesome!`,
       `If you look in the dictionary next to awesome, you'll find a picture of bork!`,
       `bork is the greatest!`,
       `bork, you are fine! Damn!`,
       `bork, did it hurt when you fell out of heaven?`,
       `bork, you have style!`,
       `bork, I'd hug you if I weren't just pixels!`,
       `bork, I bet you sweat glitter!`,
   ];

    /*
        add an array of favourite foods(at least 10)
        each element of the array should have
        -food name
        -food value
        -chance of food poisoning
    */
   this.foods = [
       {foodName: "Oysters", foodValue:5, foodPoisoning:.4},
       {foodName: "Sushi", foodValue:25, foodPoisoning:.2},
       {foodName: "Pizza", foodValue:35, foodPoisoning:.15},
       {foodName: "Falafel", foodValue:50, foodPoisoning:.05},
       {foodName: "Sweetbreads", foodValue:30, foodPoisoning:.2},
       {foodName: "Mussels", foodValue:12, foodPoisoning:.3},
       {foodName: "Eggs Florentine", foodValue:60, foodPoisoning:.3},
       {foodName: "Chocolate Cake", foodValue:10, foodPoisoning:.01},
       {foodName: "Chicken Sashimi", foodValue:25, foodPoisoning:.75},
       {foodName: "Balut", foodValue:25, foodPoisoning:.8},
       {foodName: "Poison", foodValue:1, foodPoisoning:1}
   ]

    this.init = () => {
        this.petName = tamoName;
        this.showTamogotchi(document.querySelector("#tamoHome"));
        this.talkBox = document.querySelector("#tamoVoice");
        this.statsCounter = document.querySelector("#petStats");
        this.hatch();
    }
    this.init();
}
Tamogotchi.prototype.displayStats = function(){
    if(this.food>0){
        this.statsCounter.innerText = `${this.food} of ${this.initialFood}`;
    }else{
        this.statsCounter.innerText = `${this.petName} is dead!`;
    }
}
Tamogotchi.prototype.resetFood = function(){
    this.food=this.initialFood;
}

Tamogotchi.prototype.hatch = function(){
    this.resetFood();
    this.startMetabolism();
    this.initFace();
    this.useMouth(`Hi!  I'm ${this.petName}`, this.neutralMouth);
    this.displayStats();
}
Tamogotchi.prototype.die = function(){
    clearInterval(this.metabolism);
    this.show_deadEyes();
    this.useMouth("I am dead!", this.sadMouth);
}
Tamogotchi.prototype.startMetabolism = function(){
    this.metabolism = setInterval(()=> {
        this.food -=1;
        this.displayStats();
        if(this.food<=0){
            this.die();
        }
    },this.metabolismRate);
}

Tamogotchi.prototype.eatLasagna = function() {
    this.useMouth(`can I see the food? ${this.food}`, this.happyMouth);
    this.food +=20;
}

//to add

//a drink coffee command that speeds up the metabolism of your pet
Tamogotchi.prototype.drinkCoffee = function(){
    if(this.food>0){
        this.useMouth("Yum!  Coffee!!!!! :D", this.happyMouth);
        this.changeMetabolism(500);
    }else{
        this.useMouth("the dead do not drink coffee!", this.sadMouth);
    }
}

//a drink beer command that slows down the metabolism of your pet
Tamogotchi.prototype.drinkBeer = function(){
    if(this.food>0){
        this.useMouth("Yum!  Beer!!!!!! :D", this.happyMouth);
        this.changeMetabolism(2000);
    }else{
        this.useMouth("the dead do not drink beer!", this.sadMouth);
    }
}
Tamogotchi.prototype.changeMetabolism = function(newRate){
    clearInterval(this.metabolism);
    this.metabolismRate = newRate;
    this.startMetabolism();
}
/*
an eat food command that will select a random food that will 
-check if the pet gets food poisoning
-add points to the pets food count if they don't get food poisoning
-remove points from the pets food count if they do get food poisoning
*/
Tamogotchi.prototype.eatFood = function(){
    if(this.food>0){
        const chosenFood = this.foods[Math.floor(Math.random()*this.foods.length)];
        const poisonChance = Math.random();
        const isPoisoned = Math.random()<chosenFood.foodPoisoning;
        if(isPoisoned==true){
            this.food -=chosenFood.foodValue;
            this.useMouth(`Yuck!  I just lost ${chosenFood.foodValue} from eating ${chosenFood.foodName}`, this.sadMouth);
            this.poison_eyes();
        }else{
            this.food +=chosenFood.foodValue;
            this.useMouth(`Yummy!  I just gained ${chosenFood.foodValue} from eating ${chosenFood.foodName}`, this.happyMouth);
        }
    }
};
// a command that takes in a mood and returns a phrase
Tamogotchi.prototype.talk = function(mood){
    let endFace = this.neutralMouth;
    switch (mood){
        case "happy":
            endFace = this.happyMouth;
            break;
        case "sad":
            endFace = this.sadMouth;
            break;
        case "angry":
            endFace = this.neutralMouth;
            break;
    }
    const moodPhrases  = this.sayings.filter(saying => saying.mood == mood);
    if(moodPhrases.length>0){
        const moodPhrase = moodPhrases[Math.floor(Math.random()*moodPhrases.length)];
        this.useMouth(moodPhrase.saying, endFace);
        
    }else{
        this.useMouth("derp derp!", endFace);
    }
}
Tamogotchi.prototype.useMouth = function(words, mouthType){
    this.startTalking(mouthType);
    this.talkBox.innerText = words;
}

/*
    a command that takes in your name and returns you a compliment structured using template
*/
Tamogotchi.prototype.wooMe = function(compName){
    let phrase =this.compliments[Math.floor(Math.random()*this.compliments.length)];
    let updatedPhrase = phrase.replace(/bork/g, compName);
    this.useMouth(updatedPhrase, this.happyMouth);
};

/* create a visual for the tamogotchi */
Tamogotchi.prototype.showTamogotchi = function(tamoNode){
    tamoNode.innerHTML = `
        <svg width=180px height=180px>
            <g id='head'>
                <rect x="10" y="10" width="140" height="160" fill="yellow" stroke="navy" stroke-width="5" />
                <g id='left_eye'>
                    <rect x="25" y="25" width="40" height="10" fill="brown" class="brow"/>
                    <ellipse cx="45" cy="70" rx="15" ry="30" style="stroke: black; fill: none;" />
                    <circle cx="45" cy="70" r="5" class="live_eye"/>
                    <g class="dead_eye">
                        <line x1="35" y1="60" x2="55" y2="80" stroke="red" stroke-width="5" />
                        <line x1="55" y1="60" x2="35" y2="80" stroke="red" stroke-width="5" />
                    </g>
                </g>
                <g id='right_eye'>
                    <rect x="90" y="25" width="40" height="10" fill="brown" class="brow"/>
                    <ellipse cx="110" cy="70" rx="30" ry="15" stroke="black" fill="none" />
                    <circle cx="110" cy="70" r="5" class="live_eye"/>
                    <g class="dead_eye">
                        <line x1="100" y1="60" x2="120" y2="80" stroke="red" stroke-width="5" />
                        <line x1="120" y1="60" x2="100" y2="80" stroke="red" stroke-width="5" />
                    </g>
                </g>
                <g id="mouth">
                    <rect id="talk_mouth" class="hidden" x="20" y="120" width="120" height="30" fill="orange" stroke="navy" stroke-width="5" />
                    <path id="happy_mouth" class="hidden" d="M 20,120 Q 80,140 140,120" stroke="navy" fill="none" stroke-width="5" />
                    <path id="sad_mouth" class="hidden" d="M 20,160 Q 80,140 140,160" stroke="navy" fill="none" stroke-width="5" />
                    <path id="neutral_mouth" d="M 20,140 Q 80,140 140,140" stroke="navy" fill="none" stroke-width="5" />
                </g>
                <!--g id="speach_bubble">
                    <polygon fill="white" stroke="black" stroke-width="3" points="145,120 180,80 180,10 400,10 400,100 200,100, 145,120" />
                </g-->
            </g>
        </svg>
        <p id="tamoVoice">I am the voice of the pet!</p>
        <p id="petStats"></p>
    `;
}
/* here we control the mouth of the Pet */
Tamogotchi.prototype.initFace = function(){
    this.mouth = document.querySelector("#mouth");
    this.happyMouth = document.querySelector("#happy_mouth");
    this.sadMouth = document.querySelector("#sad_mouth");
    this.neutralMouth = document.querySelector("#neutral_mouth");
    this.talkMouth = document.querySelector("#talk_mouth");

    this.deadEye_left = document.querySelector("#left_eye .dead_eye");
    this.deadEye_right = document.querySelector("#right_eye .dead_eye");
    this.deadEyes = [this.deadEye_left, this.deadEye_right];
    this.hide_deadEyes();
}

Tamogotchi.prototype.hideMouths = function(){
    this.happyMouth.classList.add("hidden");
    this.sadMouth.classList.add("hidden");
    this.neutralMouth.classList.add("hidden");
    this.talkMouth.classList.add("hidden");
}
Tamogotchi.prototype.changeExpression = function(mouthType){
    this.hideMouths();
    (mouthType).classList.remove("hidden");
}
Tamogotchi.prototype.startTalking = function(mouthType){
    this.hideMouths();
    this.talkMouth.classList.remove("hidden");
    this.talkMouth.classList.add("talking"); 
    clearTimeout(this.talkTimer);
    this.talkTimer = setTimeout(() => this.stopTalking(mouthType), 2000);
}
Tamogotchi.prototype.stopTalking = function(mouthType){
    this.hideMouths();
    this.changeExpression(mouthType);
    this.mouth.classList.remove("talking");
}

/* here we control the eyes of the pet */
/* hiding the dead state of the eyes */
Tamogotchi.prototype.hide_deadEyes = function(){
    this.deadEyes.forEach(eye => {
        eye.classList.add("hidden");
        eye.classList.remove("poisoned");
    });
}
/* showing the dead state of th eyes */
Tamogotchi.prototype.show_deadEyes = function(){
    this.deadEyes.forEach(eye => eye.classList.remove("hidden"));
}
Tamogotchi.prototype.poison_eyes = function(){
    this.show_deadEyes();
    this.deadEyes.forEach(eye => eye.classList.add("poisoned"));
    this.poisonTimeout = setTimeout(() => this.hide_deadEyes(), 2000);
}

let bob;
window.onload = function(){
    bob = new Tamogotchi("Bob");
};