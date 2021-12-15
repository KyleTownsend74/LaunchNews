// HTML elements to modify
const intro = document.querySelector(".intro");
const primaryLoader = document.querySelector("#primary-loader");
const secondaryLoader = document.querySelector("#secondary-loader");
const loadMoreButton = document.querySelector("button");

// Disable load more button by default
loadMoreButton.disabled = true;

// Keep track of how many articles have been loaded
let articlesLoaded = 0;

// Keep track of when articles have been loaded
let loaded = false;

// Make initial content visible, wait until page loads to trigger CSS transition
window.onload = () => {
    makeVisible(intro);
    makeVisible(primaryLoader);
}

// Remove loader after articles have loaded and fading to invisible transition is complete
primaryLoader.addEventListener("transitionend", () => {
    if(loaded) {
        displayNone(primaryLoader);
    }
});

// Display articles on page
displayArticles();

// Make network request for articles
async function getArticles() {
    // Set up configuration for network request
    const config = {
        params: {
            _start: articlesLoaded
        }
    };

    // Make the actual request
    const res = await axios.get("https://api.spaceflightnewsapi.net/v3/articles", config);
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
        const content = document.querySelector("#content");
        let articleUrl;
        let title;
        let imageUrl;
        let summary;

        // Parse through article data
        for(let article of articles) {
            // Add an article to articles loaded
            articlesLoaded++;

            // Assign proper values to variables
            title = article.title;
            articleUrl = article.url;
            imageUrl = article.imageUrl;
            summary = article.summary;

            // Create and insert the HTML
            content.insertAdjacentHTML("beforeend", 
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
        makeInvisible(primaryLoader);
        makeVisible(content);
        makeVisible(loadMoreButton);

        // Enable load more button
        loadMoreButton.disabled = false;
        displayElement(loadMoreButton);
        displayNone(secondaryLoader);
    } catch(e) {
        console.log("Error getting article data:", e);
    }
}

// Load more articles on click
loadMoreButton.addEventListener("mouseup", () => {
    displayArticles();
    loadMoreButton.disabled = true;
    displayNone(loadMoreButton);
    displayElement(secondaryLoader);
});

// Make passed in element visible
function makeVisible(element) {
    element.classList.remove("invisible");
}

// Make passed in element invisible
function makeInvisible(element) {
    element.classList.add("invisible");
}

// Remove display none class from passed in element
function displayElement(element) {
    element.classList.remove("removed");
}

// Add display none class to passed in element
function displayNone(element) {
    element.classList.add("removed");
}