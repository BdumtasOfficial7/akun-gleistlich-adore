// =====================
// ELEMENT (AMAN)
// =====================
const scoreEl = document.getElementById("score");
const levelEl = document.getElementById("level");
const progressEl = document.getElementById("progress");
const textEl = document.getElementById("text");
const nameEl = document.getElementById("name");
const choicesEl = document.getElementById("choices");
const charEl = document.getElementById("char");

// SOUND
let correctSound = new Audio("sound/benar2.mp3");
let wrongSound = new Audio("sound/salah.mp3");

// SPEAK
function speak(t){
let msg=new SpeechSynthesisUtterance(t);
msg.lang="en-US";
speechSynthesis.speak(msg);
}

// DATA
let studentName="";
let i=0;
let score=0;

let scenes=[

{type:"name"},

{type:"story",text:"Hallo! my name is Alley."},
{type:"story",text:"Let's practice english!"},
{type:"story",text:"Please give me a good answer."},
// {type:"story",text:""},

{type:"mc",q:"Please introduce your self!",c:["My name is Rilly","I live in manado","I am 7 years old"],a:"my name is rilly"},
{type:"mc",q:"How old are you?",c:["My name is Rilly","I live in Manado","I am 7 years old"],a:"i am 7 years old"},
{type:"mc",q:"Where do you live?",c:["My name is Rilly","I live in Manado","I am 7 years old"],a:"i live in manado"},
{type:"mc",q:"What is your hobby?",c:["My hobby is traveling","My favorite color is white","I want to be a doctor"],a:"my hobby is traveling"},
{type:"mc",q:"What is your dream?",c:["My hobby is traveling","My favorite color is white","I want to be a doctor"],a:"i want to be a doctor"},
{type:"mc",q:"What is your favorite color?",c:["My hobby is traveling","My favorite color is white","I want to be a doctor"],a:"my favorite color is white"},
{type:"mc",q:"We use our two legs to?",c:["Walk or Run","Talk","Write"],a:"walk or run"},

{type:"match",q:"Head = ?",a:"kepala"},
{type:"match",q:"Ear = ?",a:"telinga"},
{type:"match",q:"Nose = ?",a:"hidung"},
{type:"match",q:"Mouth = ?",a:"mulut"},
{type:"match",q:"Eye = ?",a:"mata"},
{type:"match",q:"Lips = ?",a:"bibir"},
{type:"match",q:"Arm = ?",a:"lengan"},
{type:"match",q:"Legs = ?",a:"kaki"},
{type:"match",q:"Hair = ?",a:"rambut"},
{type:"match",q:"Finger = ?",a:"jari"},

{type:"fill",q:"I _ a student",a:"am"},
{type:"fill",q:"My name _ Reyhard",a:"is"},
{type:"fill",q:"I _ fine, thank you",a:"am"},
{type:"fill",q:"I _ in Manado",a:"live"},
{type:"fill",q:"You _ 14 years old",a:"are"},

// {type:"essay",q:"Sebutkan 2 warna",a:["red","blue"]},
// {type:"essay",q:"Sebutkan 2 warna",a:["red","blue"]},
// {type:"essay",q:"Sebutkan 2 warna",a:["red","blue"]},
// {type:"essay",q:"Sebutkan 2 warna",a:["red","blue"]},
// {type:"essay",q:"Sebutkan 2 warna",a:["red","blue"]},

{type:"voice",q:"Say 'good morning'",a:"good morning"},
{type:"voice",q:"Say 'good evening'",a:"good evening"},
{type:"voice",q:"Say 'good afternoon'",a:"good afternoon"},
{type:"voice",q:"Say 'see you later'",a:"see you later"},
{type:"voice",q:"Say 'my name is'",a:"my name is"},
{type:"voice",q:"Say 'i am fine'",a:"i am fine"},
{type:"voice",q:"Say 'how do you do'",a:"how do you do"},
{type:"voice",q:"Say 'i live in'",a:"i live in"},

{type:"image",q:"Ini apa?",img:"https://cdn-icons-png.flaticon.com/512/616/616408.png",a:"dog"},
// {type:"image",q:"Ini apa?",img:"https://cdn-icons-png.flaticon.com/512/616/616408.png",a:"dog"},
// {type:"image",q:"Ini apa?",img:"https://cdn-icons-png.flaticon.com/512/616/616408.png",a:"dog"},
// {type:"image",q:"Ini apa?",img:"https://cdn-icons-png.flaticon.com/512/616/616408.png",a:"dog"},
// {type:"image",q:"Ini apa?",img:"https://cdn-icons-png.flaticon.com/512/616/616408.png",a:"dog"},

{type:"story",text:"Finish!"}

];

// =====================
function show(){

let d=scenes[i];
choicesEl.innerHTML="";

// INPUT NAMA
if(d.type=="name"){
textEl.innerText="Masukkan nama:";
choicesEl.innerHTML=`<input id="nm"><button onclick="saveName()">Start</button>`;
return;
}

// STORY
if(d.type=="story"){
setChar("normal");
nameEl.innerText="Alley";
textEl.innerText=d.text;
speak(d.text);
choicesEl.innerHTML=`<div class="choice" onclick="next()">Next</div>`;
}

// MC
if(d.type=="mc"){
textEl.innerText=d.q;

d.c.forEach(x=>{
let div=document.createElement("div");
div.className="choice";
div.innerText=x;
div.onclick=()=>check(x,d.a);
choicesEl.appendChild(div);
});
}

// MATCH & FILL
if(d.type=="match"||d.type=="fill"){
textEl.innerText=d.q;
choicesEl.innerHTML=`<input id="inp"><button onclick="check(inp.value,'${d.a}')">Jawab</button>`;
}

// ESSAY
if(d.type=="essay"){
textEl.innerText=d.q;
choicesEl.innerHTML=`<input id="inp"><button onclick="essay(inp.value)">Jawab</button>`;
}

// VOICE
if(d.type=="voice"){
textEl.innerText=d.q;
choicesEl.innerHTML=`<div class="choice" onclick="voice('${d.a}')">Speak</div>`;
}

// IMAGE
if(d.type=="image"){
textEl.innerText=d.q;
choicesEl.innerHTML=`
<img src="${d.img}" width="150"><br>
<input id="inp"><button onclick="check(inp.value,'${d.a}')">Jawab</button>`;
}

updateUI();
}

// =====================
function saveName(){
studentName=document.getElementById("nm").value;
next();
}

// =====================
function check(u,a){
u=u.toLowerCase();

if(u.includes(a)){
score++;
setChar("happy");
correctSound.play();
}else{
setChar("sad");
wrongSound.play();
}

setTimeout(next,800);
}

// =====================
function essay(u){
u=u.toLowerCase();
let words=["red","blue"];
let count=0;

words.forEach(w=>{
if(u.includes(w)) count++;
});

score+=count;
setChar("happy");
setTimeout(next,1000);
}

// =====================
let rec;
if('webkitSpeechRecognition' in window){
rec=new webkitSpeechRecognition();
rec.lang="en-US";
}

function voice(ans){
rec.start();

rec.onresult=e=>{
let speech=e.results[0][0].transcript.toLowerCase();
let sim=similarity(speech,ans);

if(sim>80){
score++;
setChar("happy");
correctSound.play();
}
else if(sim>50){
score++;
setChar("normal");
}
else{
setChar("sad");
wrongSound.play();
}

setTimeout(next,1200);
};
}

// =====================
function setChar(m){
if(m=="happy") charEl.src="img/char_happy.png";
if(m=="sad") charEl.src="img/char_sad.png";
if(m=="normal") charEl.src="img/char_normal.png";
}

// =====================
function similarity(a,b){
let longer=a.length>b.length?a:b;
let shorter=a.length>b.length?b:a;
return ((longer.length-editDistance(longer,shorter))/longer.length)*100;
}

function editDistance(a,b){
let m=[];
for(let i=0;i<=b.length;i++){m[i]=[i];}
for(let j=0;j<=a.length;j++){m[0][j]=j;}

for(let i=1;i<=b.length;i++){
for(let j=1;j<=a.length;j++){
if(b[i-1]==a[j-1]){
m[i][j]=m[i-1][j-1];
}else{
m[i][j]=Math.min(
m[i-1][j-1]+1,
m[i][j-1]+1,
m[i-1][j]+1
);
}
}
}
return m[b.length][a.length];
}

// =====================
function next(){
i++;
if(i>=scenes.length){
end();
return;
}
show();
}

// =====================
function updateUI(){
scoreEl.innerText="Score: "+score;
levelEl.innerText="Level: "+Math.floor(i/2+1);
progressEl.style.width=(i/(scenes.length-1))*100+"%";
}

// =====================
function end(){

let percent=(score/scenes.length)*100;

// GANTI NOMOR WA
let wa="6285696422164";

if(percent>=50){

textEl.innerText="Selamat! Anda LULUS!";
setChar("happy");

let msg=`Halo Admin, saya ${studentName}, Score: ${score}`;
let link="https://wa.me/"+wa+"?text="+encodeURIComponent(msg);

choicesEl.innerHTML=`<div class="choice" onclick="window.open('${link}')">Kirim WA</div>`;

}else{

textEl.innerText="ANDA GAGAL!";
setChar("sad");

choicesEl.innerHTML=`<div class="choice" onclick="restart()">Ulang</div>`;
}
}

// =====================
function restart(){
i=0;
score=0;
show();
}

// START
show();
