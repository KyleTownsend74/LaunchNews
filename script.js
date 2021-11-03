// HTML elements to modify
const intro = document.querySelector(".intro");
const loader = document.querySelector("#loader");

// Keep track of when articles have been loaded
let loaded = false;

// Make initial content visible, wait until page loads to trigger CSS transition
window.onload = () => {
    intro.classList.remove("invisible");
    loader.classList.remove("invisible");
}

// Remove loader after articles have loaded and fading to invisible transition is complete
loader.addEventListener("transitionend", () => {
    if(loaded) {
        loader.style.display = "none";
    }
});

// Make network request for articles
async function getArticles() {
    const res = await axios.get("https://api.spaceflightnewsapi.net/v3/articles");
    return res.data;
}

// Display articles from API request
async function displayArticles() {
    try {
        // Get articles to display
        const articles = await getArticles();

        // Notify script that articles have been loaded
        loaded = true;

        // Set up variables to display content
        const mainContent = document.querySelector("main");
        let articleUrl;
        let title;
        let imageUrl;
        let summary;

        // Parse through article data
        for(let article of articles) {
            // Assign proper values to variables
            title = article.title;
            articleUrl = article.url;
            imageUrl = article.imageUrl;
            summary = article.summary;

            // Create and insert the HTML
            mainContent.insertAdjacentHTML("beforeend", 
            `<div class="item">
                <a href="${articleUrl}" target="_blank" rel="noopener noreferrer">
                    <div class="box">
                        <img src="${imageUrl}" alt="article image">
                        <div class="item-text">
                            <h2>
                                ${title}
                            </h2>
                            <p>
                                ${summary}
                            </p>
                        </div>
                    </div>
                </a>
            </div>`);
        }

        // After all items are added to page, change visibility of elements
        loader.classList.add("invisible");
        mainContent.classList.remove("invisible");
    } catch(e) {
        console.log("Error getting article data:", e);
    }
}