type BlogPost = {
    title: string,
    intro: string,
    outro: string,
    photos: BlogPhoto[]
}

type BlogPhoto = {
    text: string,
    alt: string,
    source: string
}