import Image from "next/image"

import mainImage from '@/assets/imgs/main.png'

import Activities from "@/components/Activities"


export default function Main() {
  return (
    <>

      <div style={{
        textAlign: 'center',
        fontSize: 20,
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column'

      }} className="mt-9">
        <div className="m-9"> Everything you see is built in React</div>

        <Activities />
        {/* Intro */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}>

          <div>
      <Image src={mainImage} style={{ width: '40%', display: 'block', margin: 'auto' }} />

            <h1>Welcome to <pre>Rustam Karimov's Projects! </pre> This website showcases a collection of projects undertaken by Rustam Karimov.</h1>
            <a href="https://github.com/rustamPy/rocket-game"><mark>Source code</mark></a>
          </div>

          <iframe style={{ minWidth: 200, width: '90%', height: 460 }} scrolling="no" seamless="seamless" srcdoc='<html><body><style type="text/css">.gist .gist-data { height: 400px; }</style><script src="https://gist.github.com/rustamPy/04b1760cb107924ac0ff24c2ba117796.js"></script></body></html>'>
          </iframe>

        </div>

      </div>

    </>
  )
}