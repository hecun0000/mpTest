/*
 * @Author: your name
 * @Date: 2020-06-24 08:48:53
 * @LastEditTime: 2020-06-24 08:49:37
 * @LastEditors: hecun
 * @Description:
 * @FilePath: \my-project\src\api\coupon.js
 * @可以输入预定的版权声明、个性签名、空行等
 */
import fly from '@/utils/fly'

export function getCoupon (data) {
  return fly.get('/coupon', data)
}
