// Make network request for articles
async function getArticles() {
    const res = await axios.get("https://api.spaceflightnewsapi.net/v3/articles");
    return res.data;
}

// Display articles from API request
async function displayArticles() {
    try {
        const articles = await getArticles();

        // Parse through article data
        for(let article of articles) {
            console.log(article.title);
        }
    } catch(e) {
        console.log("Error getting article data:", e);
    }
}