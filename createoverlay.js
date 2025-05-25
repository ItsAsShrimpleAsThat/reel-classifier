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

if(localStorage.getItem("reels") == null || localStorage.getItem("reels") == "")
{
    localStorage.setItem("reels", JSON.stringify([]));
}

const currentReelsData = JSON.parse(localStorage.getItem("reels"));

funnySlider.addEventListener("change", function()
{
    let recordedValue = parseInt(funnySlider.value);
    lastrecordedvalue.innerHTML = "Last Recorded: " + recordedValue;
    
    currentReelsData.push({
        "reel_url": window.location.href,
        "score": funnySlider.value,
        "rating_timestamp": Date.now(),
    })

    localStorage.setItem("reels", JSON.stringify(currentReelsData));

    funnySlider.value = 0; 
});

let commentBox = null;
openComments()

async function openComments()
{
    let bestContendor = null;
    setTimeout(()=>{
        let comments = $('svg[aria-label="Comment"]');
        for(let comment of comments)
        {
            let rect = comment.getBoundingClientRect();

            if(rect.width > 0 && rect.height > 0 && rect.top >= 0 && rect.bottom <= window.innerHeight)
            {
                bestContendor = comment;
                break;
            }
        }

        bestContendor.parentElement.parentElement.click();
    }, 300)

    await new Promise((resolve, reject) => {
        const start = Date.now();
        const check = () => {
            if ($('svg[aria-label="Close"]').length != 0) return resolve();
            if (Date.now() - start > 5000) return reject('Comment box loading timed out');
            requestAnimationFrame(check);
        };
        check();
    })
    .then(commentBox = $('svg[aria-label="Close"]')[0]);  
    
    console.log($('svg[aria-label="Close"]'))
    console.log(commentBox)
}

function onNewPage()
{
    console.log("New URL detected")
    let closeButton = $('svg[aria-label="Close"]')
    // console.log(closeButton)
    if(closeButton.length == 0)
    {
        openComments();
    }
    // openComments()
}

async function waitForCommentsToLoad(commentParent, timeout)
{
    return new Promise((resolve, reject) => {
    const start = Date.now();
    const check = () => {
        const el = $('aria-label="Loading..."');
        if (el) return resolve(el);
        if (Date.now() - start > timeout) return reject('Timeout');
      requestAnimationFrame(check);
    };
    check();
  });
}

// == Detect new URL ==
let currentUrl = location.href;
const fireUrlChange = () => {
    const newUrl = location.href;
    if (newUrl !== currentUrl) {
        currentUrl = newUrl;
        onNewPage()
    }
};
setInterval(fireUrlChange, 500);