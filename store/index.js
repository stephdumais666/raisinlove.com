const siteURL = "https://admin.raisinlove.com"

export const state = () => ({
  posts: [],
  tags: [],
  illustrations: [],
  illustrationtags: []
})

export const mutations = {
  updatePosts: (state, posts) => {
    state.posts = posts
  },
  updateTags: (state, tags) => {
    state.tags = tags
  },
  updateIllustrations: (state, illustrations) => {
    state.illustrations = illustrations
  },
  updateIllustrationTags: (state, illustrationtags) => {
    state.illustrationtags = illustrationtags
  }
}

export const actions = {
  async getPosts({ state, commit, dispatch }) {
    if (state.posts.length) return

    try {
      let posts = await fetch(
        `${siteURL}/wp-json/wp/v2/posts?page=1&per_page=20&_embed=1`
      ).then(res => res.json())

      posts = posts
        .filter(el => el.status === "publish")
        .map(({ id, slug, title, excerpt, date, tags, content }) => ({
          id,
          slug,
          title,
          excerpt,
          date,
          tags,
          content
        }))

      commit("updatePosts", posts)
    } catch (err) {
      console.log(err)
    }
  },
  async getTags({ state, commit }) {
    if (state.tags.length) return

    let allTags = state.posts.reduce((acc, item) => {
      return acc.concat(item.tags)
    }, [])
    allTags = allTags.join()

    try {
      let tags = await fetch(
        `${siteURL}/wp-json/wp/v2/tags?page=1&per_page=40&include=${allTags}`
      ).then(res => res.json())

      tags = tags.map(({ id, name }) => ({
        id,
        name
      }))

      commit("updateTags", tags)
    } catch (err) {
      console.log(err)
    }
  },
  async getIllustrations({ state, commit, dispatch }) {

    if (state.illustrations.length) return

    try {
      let illustrations = await fetch(
        `${siteURL}/wp-json/wp/v2/illustrations?page=1&per_page=100&_embed=1`
      ).then(res => res.json())

      illustrations = illustrations
        .filter(el => el.status === "publish")
        .map(({ id, slug, title, illustrationtags, _embedded }) => ({
          id,
          slug,
          title,
          illustrationtags,
          _embedded
        })).sort( () => Math.random() - 0.5) //randomize output



      commit("updateIllustrations", illustrations)
    } catch (err) {
      console.log(err)
    }
  },
  async getIllustrationTags({ state, commit }) {

    if (state.illustrationtags.length) return

    let allTags = state.illustrations.reduce((acc, item) => {
      return acc.concat(item.illustrationtags)
    }, [])
    allTags = allTags.join()

    try {
      let illustrationtags = await fetch(
        `${siteURL}/wp-json/wp/v2/illustrationtags?page=1&hide_empty=true&per_page=40&include=${allTags}`
      ).then(res => res.json())

      illustrationtags = illustrationtags
        .map(({ id, name }) => ({
          id,
          name
        }))

      commit("updateIllustrationTags", illustrationtags)
    } catch (err) {
      console.log(err)
    }
  }
}
