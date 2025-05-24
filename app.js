let btn = document.querySelector("button");
let clickSound = document.querySelector("#clickSound");
let shareBtn = document.querySelector("#shareBtn");

btn.addEventListener("click", async () => {
  clickSound.currentTime = 0;
  clickSound.play();

  let fact = await getFacts();
  let p = document.querySelector("#result");
  p.innerText = fact;

  // Show share button after fact appears
  shareBtn.style.display = "inline-block";
});

// Share button logic
shareBtn.addEventListener("click", () => {
  clickSound.currentTime = 0;
  clickSound.play();

  const fact = document.querySelector("#result").innerText;
  const shareText = `${fact}\n\n🐱 For more facts: https://apoorvdarshan.github.io/random-cat-facts`;

  if (navigator.share) {
    navigator
      .share({
        title: "Cat Fact",
        text: shareText,
        // 🚫 do NOT include the url field here — it overrides text on mobile!
      })
      .catch((err) => console.log("Sharing failed:", err));
  } else {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      shareText
    )}`;
    window.open(twitterUrl, "_blank");
  }
});

let url = "https://catfact.ninja/fact";

async function getFacts() {
  try {
    let res = await axios.get(url);
    return res.data.fact;
  } catch (e) {
    return "No fact found";
  }
}

// Add click sound to social media icons
document.querySelectorAll(".social-click").forEach((link) => {
  link.addEventListener("click", () => {
    clickSound.currentTime = 0;
    clickSound.play();
  });
});
