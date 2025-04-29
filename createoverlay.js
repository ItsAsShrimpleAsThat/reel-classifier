const overlayElement = document.createElement("div");
overlayElement.style = "position: fixed; top: 40%; right: 3%; width: 26%; height: 100px; display:flex; background-color: rgb(24, 21, 30); border-radius: 5px; flex-wrap: wrap";
overlayElement.innerHTML = `<h2 style="text-align: center; justify-self: center; margin: 5px auto; font-size:large;">Reels Classifier</h2>
<div style="width: 100%; display: flex; justify-content: center; height:30px">
    <p style="margin-right: 4px; margin-top: 2px;">Not Funny</p>
    <input type="range" min="1" max="100" style="width: 60%" value="50" class="slider" id="myRange">
    <p style="margin-left: 4px; margin-top: 2px;">Funny</p>
</div>
<div style="width: 100%; display: flex; justify-content: center; height:auto">
    <p>Last Recorded: null</p>
</div>`
document.body.appendChild(overlayElement)   