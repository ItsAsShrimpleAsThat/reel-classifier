const overlayElement = document.createElement("div");
overlayElement.style = "position: fixed; top: 40%; right: 3%; width: 26%; height: 100px; display:flex; background-color: rgb(24, 21, 30); border-radius: 5px; flex-wrap: wrap";
overlayElement.innerHTML = `<h2 style="text-align: center; justify-self: center; margin: 5px auto; font-size:large;">Reels Classifier</h2>
<div style="width: 100%; display: flex; justify-content: center; height:30px">
    <p style="margin-right: 4px; margin-top: 2px;">Not Funny</p>
    <input type="range" min="-100" max="100" style="width: 60%" value="0" class="slider" id="funnyslider">
    <p style="margin-left: 4px; margin-top: 2px;">Funny</p>
</div>
<div style="width: 100%; display: flex; justify-content: center; height:auto">
    <p id="lastrecordedvalue">Last Recorded: null</p>
</div>`
document.body.appendChild(overlayElement)   

const funnySlider = document.getElementById("funnyslider");
const lastrecordedvalue = document.getElementById("lastrecordedvalue");

if(localStorage.getItem("reels") == null)
{
    localStorage.setItem("reels") = [];
}

const currentReelsData = localStorage.getItem("reels")

funnySlider.addEventListener("change", function()
{
    let recordedValue = parseInt(funnySlider.value);
    lastrecordedvalue.innerHTML = "Last Recorded: " + recordedValue;
    
    currentReelsData.push({
        "reel_url": window.location.href,
        "score": funnySlider.value,
        "rating_timestamp": Date.now(),
    })

    funnySlider.value = 0; 
});