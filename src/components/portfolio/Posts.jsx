import React from 'react'
import PortfolioGallery from './PortfolioGallery'
import { post, post1, post2, post3, post4, post5, post6, post7 } from '../../assets'

const images = [
  { src: post, alt: 'Social Media Post 1' },
  { src: post1, alt: 'Social Media Post 2' },
  { src: post2, alt: 'Social Media Post 3' },
  { src: post3, alt: 'Social Media Post 4' },
  { src: post4, alt: 'Social Media Post 5' },
  { src: post5, alt: 'Social Media Post 6' },
  { src: post6, alt: 'Social Media Post 7' },
  { src: post7, alt: 'Social Media Post 8' },
]

const Posts = ({ searchQuery = "", viewType = "grid" }) => {
  return <PortfolioGallery items={images} searchQuery={searchQuery} viewType={viewType} />
}

export default Posts
