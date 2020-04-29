/**
 * Auth: zhangjian
 * Date： 2019/05/01
 * Desc: 高德POI检索操作操作，从前端直接请求,涉及跨域
 */


const o = {
    basePath: "https://restapi.amap.com/v3/place/text",
    key: "178d0d60fd12eebd9d444eb8cd53c95b",
    getGaoPOI: function (addr) {
        let offset = 50, url = this.basePath + "?key=" + this.key + "&keywords=" + addr + "&offset=" + offset;
        return this.getJsonp(url);
    },
    getJsonp: function (url) {
        if (!url) {
            return;
        }
        return new Promise((resolve, reject) => {
            window.jsonCallBack = (result) => {
                resolve(result)
            }
            let jsonP = document.createElement("script");
            jsonP.type = "text/javascript";
            jsonP.src = `${url}&callback=jsonCallBack`;
            document.getElementsByTagName("head")[0].appendChild(jsonP);
            setTimeout(() => {
                document.getElementsByTagName("head")[0].removeChild(jsonP)
            }, 500)
        })
    }
}
export default o;