/*
	背景音乐 来源：网易云音乐
	Created by Luzhipeng in 2019.01.23
*/
import React, { Component } from 'react';
export default class Music extends Component {
  state = {
    musicList: [
      '398080', // 歌唱祖国
      '494388081', // 东方之珠
      '34516734', // 强军战歌
      '34516731', // 游击队之歌
      '28191819' // 喀秋莎
    ],
    target: Math.floor(Math.random() * 5)
  }
  render() {
    let { musicList, target } = this.state
    return <iframe style={{ display: 'none' }} src={`https://music.163.com/outchain/player?type=2&id=${musicList[target]}&auto=1&height=66`}></iframe>
  }
}