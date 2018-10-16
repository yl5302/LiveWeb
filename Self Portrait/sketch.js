let outputP;
let myVideo = document.getElementById("video1");
let button = document.getElementById("myBtn");
let outPut = document.getElementById("outputDiv");

function setup() {
  noCanvas();
  background(255);
  textAlign(LEFT, TOP);
  textSize(24);
  myVideo.currentTime = 0.5;
  outputP = createP("");
  outputP.parent('outputDiv');
}

function draw() {}

function keyPressed() {
  if (keyCode == '37') { //left arrow
    myVideo.currentTime -= 0.5;
  }

  if (keyCode == '39') { //right arrow
    myVideo.currentTime += 0.5;
  }

  if (keyCode == '38') { //up arrow
    myVideo.currentTime -= 5;
  }

  if (keyCode == '40') { //down arrow
    myVideo.currentTime += 5;
  }
}

function mousePressed() {
  //button.onclick = changeText();
  //speak('hello world!');
  //
  //   document.getElementById("click").innerHTML = "<span style ='margin:50px'>Keep Clicking.</span>";
  //   document.getElementById("click").margin = 50;
}
function changeButton() {
  button.innnerHTML="Keep clicking";
  console.log("ButtonChanged");
}

function changeText() {
  console.log("TextChanged");
  changeButton();
  outputDiv.style.borderStyle = "double";
  outputDiv.style.borderColor = "lightgray";
  outputDiv.style.backgroundColor = "#f2f2f2";

  var grammar = tracery.createGrammar(grammarSource);
  grammar.addModifiers(tracery.baseEngModifiers);
  var output = grammar.flatten("#origin#");
  outputP.html(output);
  //document.getElementById("click").innerHTML = "<span style ='margin:50px'>Keep Clicking so I can tell you random stories.</span>";
  //document.getElementById("click").margin = 50;
}

// cut and paste your grammar below (as the value for variable "grammarSource")
var grammarSource = {
  "origin": ["#[#setCharacter#][#setPlace#]story#"],
  "story": [
    "#dream# #walking#\n#hotWeather# #hotPlace# #sweating# #keepWalking#\n#seeing# #in that instant.capitalize#, #emotion# that #action#\n#falling# #approaching#"
  ],

  "setCharacter": ["[#setPronouns#][weapon:#weapons#]"],
  "setPronouns": [
    "[hero:woman][heroThey:she][heroThem:her][heroTheir:her][heroTheirs:hers][heroSelf:herself]",
    "[hero:man][heroThey:he][heroThem:him][heroTheir:his][heroTheirs:his][heroSelf:himself]",
    "[hero:guy][heroThey:he][heroThem:him][heroTheir:his][heroTheirs:his][heroSelf:himself]",
    "[hero:young man][heroThey:he][heroThem:him][heroTheir:his][heroTheirs:his][heroSelf:himself]",
    "[hero:young woman][heroThey:she][heroThem:her][heroTheir:her][heroTheirs:hers][heroSelf:herself]",
    "[hero:young lady][heroThey:she][heroThem:her][heroTheir:her][heroTheirs:hers][heroSelf:herself]"
  ],
  "setPlace": [
    "[place:desert][ground:leaves and gravel]",
    "[place:selva][ground:sand]"
  ],

  "frightening": ["frightening", "terrifying", "horrible"],
  "country": [
    "Afghanistan",
    "Albania",
    "Algeria",
    "Andorra",
    "Angola",
    "Antigua & Barbuda",
    "Argentina",
    "Armenia",
    "Australia",
    "Austria",
    "Azerbaijan",
    "Bahamas",
    "Bahrain",
    "Bangladesh",
    "Barbados",
    "Belarus",
    "Belgium",
    "Belize",
    "Benin",
    "Bhutan",
    "Bolivia",
    "Bosnia & Herzegovina",
    "Botswana",
    "Brazil",
    "Brunei",
    "Bulgaria",
    "Burkina Faso",
    "Burundi",
    "Cambodia",
    "Cameroon",
    "Canada",
    "Cape Verde",
    "Central African Republic",
    "Chad",
    "Chile",
    "China",
    "Colombia",
    "Comoros",
    "Congo",
    "Congo Democratic Republic",
    "Costa Rica",
    "Cote D'Ivoire",
    "Croatia",
    "Cuba",
    "Cyprus",
    "Czech Republic"
  ],

  "weapons": ["machete", "cleaver", "kitchen knife", "pocket knife"],


  "dream": ["One night, #hero.a# had a nightmare. It was the most #frightening# thing #heroThey# had ever experienced."],

  "walking": ["In the dream, #heroThey# found #heroSelf# walking in #place.a# in #country#. Somehow, #heroThey# had no idea how #heroThey# had gotten there, but #heroThey# knew #heroThey# was lost and alone. When #heroThey# looked down, #heroThey# realized #heroThey# was carrying a #weapon# in #heroTheir# hand. The long, cold steel blade looked razor-sharp."],

  "hotWeather": [
    "The sun was beating down and the heat was intense.",
    "Heat licked at #heroTheir# sunburned faces and coiled around #heroTheir# limbs like a great hot-blooded serpent.",
    "In the blinding light of the summer, the ground is like a semi-molten mirror."

  ],

  "hotPlace": ["#hotDesert#", "#hotSelva#"],

  "hotDesert": ["Heat rained down on #heroThem# like the breath of hell. The scorched sand shimmered in the intense white rays of the sun."],

  "hotSelva": ["The ground smoldered and sent up a disorientating haze. Even the birds were silent and the grass stood still as if too hot to move."],

  "sweating": [
    "The #hero# was sweating profusely.",
    "The perspiration surfaced on #heroTheir# forehead, #heroTheir# cheeks, the bridge of #heroTheir# nose, and run in rivulets down #heroTheir# face until #heroTheir# became sodden.",
    "#heroTheir# hat cocooned #heroTheir# heads in warm sweat, the arid heat burnt at #heroTheir# lung."
  ],

  "keepWalking": ["But #heroThey# kept walking, even though #heroThey# had no idea where #heroThey# was going."],

  "sometime": ["after some time", "suddenly", "at this point"],
  "in that instant": ["in that instant", "at that moment"],
  "emotion": ["#heroThey# was so overcome with fear"],

  "seeing": ["#sometime.capitalize#, #heroThey# saw a dark figure crouching down in the distance. As #heroThey# approached, #heroThey# saw that it was a person, lying on the ground. #heroThey# had been feeling extremely lonely, so #heroThey# was grateful to see another human being. #heroThey.capitalize# quickly ran up to the #hero# and bent over to help #heroThem# up. However, when #heroThey# turned the #hero# over, #heroThey# took one look at #heroTheir# face and recoiled in horror. #heroThey# was looking at #heroSelf#."],
  "action": ["#kill#", "#notKill#"],

  "kill": [
    "#heroThey# raised the #weapon# above #heroTheir# head and, without thinking, hacked the #hero# to death. Horrified by what #heroThey# had just done, #heroThey# #horrified#, driven by terror and panic."
  ],

  "notKill": [
    "#heroThey# raised the #weapon# above #heroTheir# head and almost wanted to kill the #hero#. But after thinking for one second, #heroThey# didn't. #heroThey.capitalize# #horrified#."
  ],

  "horrified": [
    "dropped the #weapon# and started running through the #place#, trying to get as far away from the place as possible. With every step, #heroTheir# feet sank further into the #ground#, but #heroThey# kept on going"
  ],

  "falling": ["Eventually, #heroThey# stumbled and fell to the ground. #heroThey# realized that #heroThey# had sprained #heroTheir# ankle. #heroThey# couldn’t walk another step. There was nothing #heroThey# could do except lying there where #heroThey# had fallen."],

  "approaching": ["#sometime#, #heroThey# looked up and saw something in the distance. It was the figure of #hero.a#, approaching across the wide expanse of #place#. As the #hero# approached, #heroThey# waited until #heroThey# could see #heroTheir# face clearly. To #heroTheir# horror, #heroThey# realized it was #heroSelf# and in #heroTheir# hand, #heroThey# was carrying a razor-sharp #weapon#…"]
};
