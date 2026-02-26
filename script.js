const apiKey="4c632c119febf27a6dd59e5c06ed3acf";
const btn=document.getElementById("btn");
btn.onclick=getWeather;
document.getElementById("city").addEventListener("keypress",e=>{if(e.key==="Enter")getWeather();});

async function getWeather(){
const city=document.getElementById("city").value.trim();
if(!city)return;

try{
const res=await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
if(!res.ok) throw new Error("City not found");
const data=await res.json();

name.innerText=`${data.name}, ${data.sys.country}`;
temp.innerText=`Temperature: ${data.main.temp} °C`;
desc.innerText=`Condition: ${data.weather[0].description}`;

suggestion.innerText=generateSuggestion(data);
card.classList.remove("hidden");
error.innerText="";
}catch(err){error.innerText=err.message;card.classList.add("hidden");}
}

function generateSuggestion(d){
const t=d.main.temp;const w=d.weather[0].main;
if(w==="Rain")return"☔ Carry umbrella";
if(w==="Snow")return"🧤 Wear warm clothes";
if(t>35)return"🥵 Avoid sun & drink water";
if(t<12)return"🧥 Cold outside";
if(w==="Clear"&&t>=20&&t<=30)return"🏃 Perfect outdoor weather";
return"🙂 Normal day";
}