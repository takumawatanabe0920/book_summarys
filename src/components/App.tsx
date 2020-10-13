import React from "react"
import { BrowserRouter as Router, Route } from "react-router-dom"

// components
import Header from "./layouts/Header"
import Footer from "./layouts/Footer"

// sections

function IndexPage() {
  return (
    <div>
      <Router>
        <Header />
        <div className="wrapper">
          <div className="main-contents">
            <div className="l-container">
              <div className="l-main">
                <div className="main-block">
                  <h2>要約一覧</h2>
                  <p>記事一覧です。</p>
                </div>
                <div className="side-bar">
                  <h3>総合ランキング</h3>
                  <div className="article-box">
                    <div className="article-item">
                      1位: 死ぬこと以外かすり傷 画像
                    </div>
                    <div className="article-item">2位: 強者の流儀 画像</div>
                    <div className="article-item">3位: GACKTの勝ち方 画像</div>
                  </div>
                  <h3>週間ランキング</h3>
                  <div className="article-box">
                    <div className="article-item">
                      1位: 死ぬこと以外かすり傷 画像
                    </div>
                    <div className="article-item">2位: 強者の流儀 画像</div>
                    <div className="article-item">3位: GACKTの勝ち方 画像</div>
                  </div>
                  <h3>月刊ランキング</h3>
                  <div className="article-box">
                    <div className="article-item">
                      1位: 死ぬこと以外かすり傷 画像
                    </div>
                    <div className="article-item">2位: 強者の流儀 画像</div>
                    <div className="article-item">3位: GACKTの勝ち方 画像</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="extendedFooter">
          <Footer />
        </div>
      </Router>
    </div>
  )
}

export default IndexPage
