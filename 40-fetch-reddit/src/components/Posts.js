import React from 'react'
import PropTypes from 'prop-types'

const Posts = ({posts}) => (
  <ul>
    {posts
      .sort((a, b) => b.score - a.score)
      .map((post, i) =>
        <li key={i}><a href={post.url}>{post.title}</a> <small>&#9734;{post.score}</small></li>
      )}
  </ul>
)

Posts.propTypes = {
  posts: PropTypes.array.isRequired
}

export default Posts
