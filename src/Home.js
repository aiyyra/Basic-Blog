import Feed from "./Feed"

const Home = ({ posts }) => {
  return (
    <main className="Home">
      {posts.length ? (
        <Feed posts={posts} />
      ) : (
        <p style={{margginTop: "2rem" }}>No posts to display</p>
      )}
    </main>
  )
}

export default Home