type Post = {
    //data we are collecting for the sitemap from datasource
    userId: number
    id: number
    title: string
    body: string
}

export default async function sitemap() {
    const res = await fetch('https//jsonplaceholder.typicode.com/posts')
    const allPosts = (await res.json()) as Post[]

    const posts = allPosts.map((post) => ({
        url: `http://localhost:3000/quote/${post.id}`,
        lastModified: new Date().toISOString()
    })) 

    // const routes = ['', '/about', 'quotes'].map((route)) => ({
    //     url: `http://localhost:3000${route}`,
    //     lastModified: new Date().toISOString()
    // })

    return [...posts]
}