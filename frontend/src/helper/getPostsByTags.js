const getPostByTags = async (Contract, tags, limit) => {
    let posts = await Contract.getPostsByTags(tags, limit);
    posts = posts.map((post) => {
        let _post = {
            id: parseInt(post.id._hex.substring(2)),
            title: post.headline,
            description: post.content,
            tags: post.tags.map((tag) => {
                return {
                    id: tag,
                    name: `Option ${tag}`,//should add db query here
                }
            })
        }
        return _post;
    })
    return posts;
}

export default getPostByTags;