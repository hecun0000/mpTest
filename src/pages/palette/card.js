export default class LastMayday {
  cardInfo = {}

  do (cardInfo) {
    this.cardInfo = JSON.parse(JSON.stringify(cardInfo))
    return this._template()
  }

  TEXT_SMALL = {
    fontSize: '24rpx'
  }

  compouted (width, px) {
    return px / 750 * width + 'px'
  }

  _template () {
    const res = wx.getSystemInfoSync()
    const width = res.windowWidth
    // const info = {
    //   title: 'F18初秋新款 德瑞毛茸高跟鞋标题标题标题标题标题可爱可爱可爱可爱可爱 …'
    // }
    console.log(width)
    // const height = res.windowHeight
    // console.log(res.model)
    // console.log(res.pixelRatio)
    // console.log(res.windowWidth)
    // console.log(res.windowHeight)
    // console.log(res.language)
    // console.log(res.version)
    // console.log(res.platform)
    return ({
      'width': '654px',
      'height': '1000px',
      'background': '#ffffff',
      'views': [
        {
          'type': 'rect',
          'css': {
            'background': '#f8d4d4',
            'width': '1202.0852409358918px',
            'height': '733.2719969708938px',
            'top': '0px',
            'left': '-213.34444392206177px',
            'rotate': '0',
            'borderRadius': '',
            'shadow': '',
            'color': '#f8d4d4'
          }
        },
        {
          'type': 'image',
          'url': 'https://desk-fd.zol-img.com.cn/t_s960x600c5/g5/M00/0F/08/ChMkJlauzXWIDrXBAAdCg2xP7oYAAH9FQOpVAIAB0Kb342.jpg',
          'css': {
            'width': '615.3889780914604px',
            'height': '384.6181113071628px',
            'top': '30.00000054931644px',
            'left': '15.000195987007373px',
            'rotate': '0',
            'borderRadius': '',
            'borderWidth': '',
            'borderColor': '#000000',
            'shadow': '',
            'mode': 'auto'
          }
        },
        {
          'type': 'text',
          'text': '别跟我谈感情，谈感情伤钱。',
          'css': {
            'color': '#000000',
            'background': 'rgba(0,0,0,0)',
            'width': '610.0080006562765px',
            'height': '42.89999999999999px',
            'top': '753.9999995117187px',
            'left': '16.99990853939653px',
            'rotate': '0',
            'borderRadius': '',
            'borderWidth': '',
            'borderColor': '#000000',
            'shadow': '',
            'padding': '0px',
            'fontSize': '30px',
            'fontWeight': 'normal',
            'maxLines': '2',
            'lineHeight': '43.290000000000006px',
            'textStyle': 'fill',
            'textDecoration': 'none',
            'fontFamily': '',
            'textAlign': 'left'
          }
        },
        {
          'type': 'qrcode',
          'content': '哈哈哈',
          'css': {
            'color': '#000000',
            'background': '#ffffff',
            'width': '158.99676991749786px',
            'height': '158.99676991749786px',
            'top': '796.9999978027342px',
            'left': '458.999973868399px',
            'rotate': '0',
            'borderRadius': ''
          }
        },
        {
          'type': 'text',
          'text': '现价: ',
          'css': {
            'color': '#000000',
            'background': 'rgba(0,0,0,0)',
            'width': '115.00182053264413px',
            'height': '37.18000000000001px',
            'top': '806px',
            'left': '22px',
            'rotate': '0',
            'borderRadius': '',
            'borderWidth': '',
            'borderColor': '#000000',
            'shadow': '',
            'padding': '0px',
            'fontSize': '26px',
            'fontWeight': 'normal',
            'maxLines': '2',
            'lineHeight': '37.51800000000001px',
            'textStyle': 'fill',
            'textDecoration': 'none',
            'fontFamily': '',
            'textAlign': 'left'
          }
        },
        {
          'type': 'text',
          'text': '$139.00',
          'css': {
            'color': 'red',
            'background': 'rgba(0,0,0,0)',
            'width': '200px',
            'height': '42.89999999999999px',
            'top': '803.0000008544923px',
            'left': '104.99993467099756px',
            'rotate': '0',
            'borderRadius': '',
            'borderWidth': '',
            'borderColor': '#000000',
            'shadow': '',
            'padding': '0px',
            'fontSize': '30px',
            'fontWeight': 'normal',
            'maxLines': '2',
            'lineHeight': '43.290000000000006px',
            'textStyle': 'fill',
            'textDecoration': 'none',
            'fontFamily': '',
            'textAlign': 'left'
          }
        },
        {
          'type': 'text',
          'text': '现价',
          'css': {
            'color': '#000000',
            'background': 'rgba(0,0,0,0)',
            'width': '200px',
            'height': '42.89999999999999px',
            'top': '873px',
            'left': '20px',
            'rotate': '0',
            'borderRadius': '',
            'borderWidth': '',
            'borderColor': '#000000',
            'shadow': '',
            'padding': '0px',
            'fontSize': '30px',
            'fontWeight': 'normal',
            'maxLines': '2',
            'lineHeight': '43.290000000000006px',
            'textStyle': 'fill',
            'textDecoration': 'none',
            'fontFamily': '',
            'textAlign': 'left'
          }
        },
        {
          'type': 'text',
          'text': '599.00',
          'css': {
            'color': '#000000',
            'background': 'rgba(0,0,0,0)',
            'width': '200px',
            'height': '42.89999999999999px',
            'top': '872.0000009765625px',
            'left': '100.99993467099753px',
            'rotate': '0',
            'borderRadius': '',
            'borderWidth': '',
            'borderColor': '#000000',
            'shadow': '',
            'padding': '0px',
            'fontSize': '30px',
            'fontWeight': 'normal',
            'maxLines': '2',
            'lineHeight': '43.290000000000006px',
            'textStyle': 'fill',
            'textDecoration': 'line-through',
            'fontFamily': '',
            'textAlign': 'left'
          }
        }
      ]
    })
  }
}
