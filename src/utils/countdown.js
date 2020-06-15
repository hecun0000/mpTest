
// 倒计时
/**
 * timeStamp 时间戳
 * complete  倒计时完成的回调
 * callback  每次倒计时的回调
 */
let timer = null
function countdown (timeStamp, complete, callback) {
  clearTimeout(timer)
  // 获取当前时间
  let now = Math.round(new Date().getTime() / 1000)
  // 时间差
  let leftTime = timeStamp - now
  // 定义变量 d,h,m,s保存倒计时的时间
  let d, h, m, s
  if (leftTime > 0) {
    d = Math.floor(leftTime / 60 / 60 / 24)
    h = Math.floor(leftTime / 60 / 60 % 24)
    m = Math.floor(leftTime / 60 % 60)
    s = Math.floor(leftTime % 60)
    typeof callback === 'function' && callback(format(d), format(h), format(m), format(s))

    // 递归每秒调用countTime方法，显示动态时间效果
    timer = setTimeout(() => {
      countdown(timeStamp, complete, callback)
    }, 1000)
  } else {
    typeof complete === 'function' && complete()
  }
}

function format (str) {
  return str >= 10 ? str : '0' + str
}

export default countdown
