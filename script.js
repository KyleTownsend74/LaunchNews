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
                <a href="${articleUrl}">
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
    } catch(e) {
        console.log("Error getting article data:", e);
    }
}