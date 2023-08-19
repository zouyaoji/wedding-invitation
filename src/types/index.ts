/*
 * @Author: zouyaoji@https://github.com/zouyaoji
 * @Date: 2022-04-13 09:54:01
 * @LastEditTime: 2022-04-13 10:04:35
 * @LastEditors: zouyaoji
 * @Description:
 * @FilePath: \wedding-invitation\src\types\index.ts
 */

export type GlobalData = {
  innerAudioContext: WechatMiniprogram.InnerAudioContext
  musicList: Array<{
    id: string
    url: string
  }>
  musicIndex: number
  animations: Array<
    | `bounce`
    | `flash`
    | `pulse`
    | `rubberBand`
    | `shake`
    | `headShake`
    | `swing`
    | `tada`
    | `wobble`
    | `jello`
    | `bounceIn`
    | `bounceInDown`
    | `bounceInLeft`
    | `bounceInRight`
    | `bounceInUp`
    | `fadeIn`
    | `fadeInDown`
    | `fadeInDownBig`
    | `fadeInLeft`
    | `fadeInLeftBig`
    | `fadeInRight`
    | `fadeInRightBig`
    | `fadeInUp`
    | `fadeInUpBig`
    | `flipInX`
    | `flipInY`
    | `lightSpeedIn`
    | `rotateIn`
    | `rotateInDownLeft`
    | `rotateInDownRight`
    | `rotateInUpLeft`
    | `rotateInUpRight`
    | `jackInTheBox`
    | `rollIn`
    | `zoomIn`
    | `zoomInDown`
    | `zoomInLeft`
    | `zoomInRight`
    | `zoomInUp`
    | `slideInDown`
    | `slideInLeft`
    | `slideInRight`
    | `slideInUp`
    | `heartBeat`
  >
}
