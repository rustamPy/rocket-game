import Image from "next/image"

import mainImage from '@/assets/imgs/main.png'

export default function Main() {
  return (
    <div style={{ textAlign: 'center', margin: 20, fontSize: 20 }}>
      <Image src={mainImage} style={{ width: '40%', display: 'block', margin: 'auto' }} />
      <h1>Welcome to <pre>Rustam Karimov's Projects! </pre></h1>
      <p>This website showcases a collection of projects undertaken by Rustam Karimov. Here, you'll find a variety of creations, including:</p>
      <ul>
        <li>Game development projects</li>
        <li>University-related projects (e.g., coursework, research)</li>
        <li>Other creative endeavors</li>
      </ul>
    </div>

  )
}