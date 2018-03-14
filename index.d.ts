declare namespace Ali {
    interface city {
        name: string,
        adcode: string,
        pinyin?: string
    }

    /*
        1. 支付成功：
        ‘9000’：订单支付成功;

        2. 支付结果未知(可能已支付成功)：
        ‘8000’：后台获取支付结果超时，暂时未拿到支付结果;
        ‘6004’：支付过程中网络出错， 暂时未拿到支付结果;

        3. 支付失败或者支付中途退出：
        ‘7001’：客户端-钱包中止快捷支付;
        ‘6002’: 普通网络出错;
        ‘6001’: 用户中途取消;
        ‘4000’: 订单支付失败;
        ‘99’: 用户点击忘记密码快捷界面退出(only iOS since 9.5);
        其他: 其他支付异常;
     */
    interface tradePayResult {
        resultCode: '9000' | '8000' | '6004' | '7001' | '6002' | '6001' | '4000' | '99' | string,
        callbackUrl: string,
        memo: string,
        result: string
    }

    namespace Funcs {
        interface popWindow {
            data?: { [key: string]: string }
        }

        interface popTo {
            index?: number,
            data?: { [key: string]: string },
            url?: string,
            urlPattern?: string,
        }

        interface setTitle {
            title: string,
            subtitle?: string,
            dropdownList?: Array<optionMenu>,
            dropdownInit?: number
        }

        interface alert {
            title?: string,
            message: string,
            button?: string
        }

        interface openInBrowser {
            url?: string
        }

        interface pushWindow {
            url: string,
            param?: {
                readTitle?: boolean,
                defaultTitle?: boolean,
                showToolBar?: boolean
            },
        }

        interface showLoading {
            text?: string,
            delay?: number
        }

        interface optionMenu {
            icon?: string,
            title: string
        }

        interface checkJSAPI {
            api: string
        }

        interface checkApp {
            appId: string,
            stageCode?: 'firstScreen' | 'secondScreen' | 'urgentA' | 'contactA' | string
        }

        interface isInstalledApp {
            scheme: string,
            packagename: string
        }

        interface toast {
            content: string,
            type?: 'none' | 'success' | 'fail',
            duration?: number
        }

        interface setToolbarMenu {
            menus: Array<{
                name: string,
                tag: string,
                icon?: string
            }>
            override?: boolean,
            reset?: boolean
        }

        interface confirm {
            title?: string,
            message: string,
            okButton?: string,
            cancelButton?: string
        }

        interface photo {
            dataType?: string,
            imageFormat?: 'jpg' | 'png',
            quality?: number,
            maxWidth?: number,
            maxHeight?: number,
            allowEdit?: boolean
        }

        interface scan {
            type: 'qr' | 'bar' | 'card'
        }

        interface share {
            keepOrder?: boolean,
            channels: Array<{
                name: string,
                param: {
                    title: string,
                    content: string,
                    imageUrl: string,
                    captureScreen?: boolean,
                    url: string
                }
            }>
        }

        interface getCities {
            currentCity: string,
            adcode: string,
            needHotCity?: boolean,
            customHotCities: Array<city>,
            customCities ?: Array<city>
        }

        interface tradePay {
            tradeNO?: string
            partnerID?: string
            bizType?: string
            bizSubType?: string
            displayPayResult?: boolean
            bizContext?: string
            orderStr?: string
        }
    }

    interface AlipayJSBridge {
        startupParams: any;

        call(name: 'popWindow', param?: Funcs.popWindow): void;

        call(name: 'setTitle', param: Funcs.setTitle): void;

        call(name: 'popTo', param?: Funcs.popTo, success?: () => void): void;

        call(name: 'alert', param: Funcs.alert, success?: () => void): void;

        call(name: 'confirm', param: Funcs.confirm, success?: (result: { ok: boolean }) => void): void;

        call(name: 'pushWindow', param: Funcs.pushWindow): void;

        call(name: 'openInBrowser', param?: Funcs.openInBrowser): void;

        call(name: 'showLoading', param?: Funcs.showLoading): void;

        call(name: 'hideLoading'): void;

        call(name: 'showTitlebar'): void;

        call(name: 'hideTitlebar'): void;

        call(name: 'showToolbar'): void;

        call(name: 'hideToolbar'): void;

        call(name: 'showOptionMenu'): void;

        call(name: 'hideOptionMenu'): void;

        call(name: 'toast', param?: Funcs.toast, success?: () => void): void;

        call(name: 'setOptionMenu', param?: Funcs.optionMenu): void;

        call(name: 'checkJSAPI', param?: Funcs.checkJSAPI, success?: (result: { available: boolean }) => void): void;

        call(name: 'checkApp', param?: Funcs.checkApp, success?: (result: { exist: boolean, status: string, extStatus?: 'online' | 'uninstall' | 'installing' | 'offline', version?: string, type?: 'microApp' }) => void): void;

        call(name: 'isInstalledApp', param?: Funcs.isInstalledApp, success?: (result: { installed: boolean }) => void): void;

        call(name: 'setToolbarMenu', param?: Funcs.setToolbarMenu, success?: (result: { success: "true" | string }) => void): void;

        call(name: 'closeWebview'): void;

        call(name: 'getNetworkType', success?: (result: { err_msg?: string, networkType: 'fail' | 'wifi' | 'wwan', networkAvailable: boolean }) => void): void;

        call(name: 'photo', param?: Funcs.photo, success?: (result: { dataURL?: string, fileURL?: string, error?: number }) => void): void;

        call(name: 'scan', param?: Funcs.scan, success?: (result: { barCode?: string, qrCode?: string, cardNumber?: string, error?: number }) => void): void;

        call(name: 'share', param?: Funcs.share, success?: (result: { channelName: string, shareResult: boolean, error?: number, message?: string }) => void): void;

        call(name: 'getCities', param?: Funcs.getCities, success?: (result: city) => void): void;

        call(name: 'vibrate'): void;

        call(name: 'watchShake', success?: () => void): void;

        call(name: 'tradePay', params?: Funcs.tradePay, success?: (result: tradePayResult) => void): void;
    }
}

declare const AlipayJSBridge: Ali.AlipayJSBridge;

declare module 'Ali' {
    global {
        interface Window {
            AlipayJSBridge: Ali.AlipayJSBridge;
        }
    }
    export = AlipayJSBridge;
}