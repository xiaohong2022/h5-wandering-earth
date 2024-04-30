!function () {
    const version = "v1.0.6";
    function update() {
        var a = document.querySelector(".app-stage-role-top-left-left span").offsetLeft;
        var b = document.querySelector(".app-stage-role").offsetLeft;
        var c = document.querySelector(".app-stage-role-bottom");
        c.style.marginLeft = `${a - b}px`

        var d = document.querySelector(".app-stage-role-top-left-left span");
        d.style.lineHeight = `${d.offsetHeight}px`
    }
    window.addEventListener('DOMContentLoaded', update);
    window.addEventListener("resize", update);
    update();
    !function () {
        document.querySelectorAll(".app-canedit").forEach(e => {
            e.default = e.innerText;
            e.onclick = function () {
                var j = false;
                var f = document.createElement("input");
                var i = document.createElement("div");
                i.className = "app-shade";
                function g() {
                    var a = e.offsetLeft;
                    var b = e.offsetTop;
                    var c = e.offsetWidth;
                    var d = e.offsetHeight;
                    var h = getComputedStyle(e);
                    f.style.position = "fixed";
                    f.style.zIndex = 99999999;
                    f.style.color = h.color;
                    f.style.fontSize = h.fontSize;
                    f.style.fontFamily = h.fontFamily;
                    f.style.textTransform = h.textTransform;
                    f.style.padding = "0";
                    f.style.background = "none";
                    f.style.border = "none";
                    f.style.top = `${b}px`;
                    f.style.left = `${a}px`;
                    f.style.width = `${c}px`;
                    f.style.height = `${d}px`;
                    update();
                };
                f.value = e.innerText;
                g();
                f.oninput = function () {
                    e.innerText = f.value;
                    g();
                    setTimeout(g);
                    setTimeout(g, 50);
                };
                e.classList.add("app-editing");
                document.body.append(i, f);
                f.focus();
                f.addEventListener("blur", function () {
                    if (j) return;
                    j = true;
                    if (!f.value) {
                        e.innerText = e.default
                    };
                    i.remove();
                    f.remove();
                    e.classList.remove("app-editing");
                });
            }
        })
    }();
    !function () {
        function w() {
            return {
                v: `${version}`,
                t: Date.now(),
                d: [].slice.call(document.querySelectorAll(".app-canedit")).map(v => v.innerText)
            };
        };
        function t(o) {
            var a = document.querySelectorAll(".app-canedit");
            if (!o) return false;
            if (typeof o !== "object") return false;
            if (Array.isArray(o)) return false;
            if (Object.keys(o).length !== 3) return false;
            if (!o.v) return false;
            if (!o.t) return false;
            if (!o.d) return false;
            if (typeof o.v !== "string") return false;
            if (typeof o.t !== "number") return false;
            if (typeof o.d !== "object") return false;
            if (!Array.isArray(o.d)) return false;
            if (o.d.length !== a.length) return false;
            a.forEach((v, i) => {
                v.innerText = o.d[i];
            });
            return true;
        };
        var b = {
            async alert(w = "", f = () => { }) {
                await swal("", w, {
                    buttons: {
                        text: "确认",
                    },
                });
                f();
                return;
            },
            async confirm(w = "", f = () => { }) {
                const a = await swal("", w, {
                    buttons: ["取消", "确认"],
                });
                f(a);
                return a;
            },
            async prompt(w = "", p = "", f = () => { }) {
                const a = await swal("", w, {
                    buttons: true,
                    content: {
                        element: "input",
                        attributes: {
                            placeholder: "请输入",
                            type: "text",
                            value: p,
                        },
                    },
                    buttons: ["取消", "确认"],
                });
                f(a);
                return a;
            },
            async select(w = "", o = [], f = () => { }) {
                var s = {
                    cancel: false,
                    confirm: false,
                };
                Object.assign(s, o.map((v, i) => {
                    return {
                        text: v,
                        value: i,
                    }
                }))
                const a = await swal("", w, {
                    buttons: s,
                });
                f(a);
                return a;
            },
        };
        var a = document.querySelector("#app");
        a.oncontextmenu = function () {
            b.select("菜单", ["转换为图片", "文件", "关于"], async function (r) {
                if (r !== null) {
                    if (r === 0) {
                        const canvas = await html2canvas(
                            document.querySelector(".app-stage-role"),
                            {
                                scale: 1,
                                allowTaint: true,
                                useCORS: true,
                                logging: false,
                            }
                        );
                        var img = document.createElement("img");
                        img.src = canvas.toDataURL();
                        swal({
                            content: img,
                            buttons: {
                                confirm: "下载",
                                0: {
                                    text: "复制",
                                    value: "copy"
                                }
                            }
                        }).then(v => {
                            if (v === "copy") {
                                canvas.toBlob(function (blob) {
                                    if (blob) {
                                        if (navigator.clipboard) {
                                            try {
                                                const clipboardItem = new ClipboardItem({
                                                    "image/png": blob,
                                                });
                                                navigator.clipboard.write([clipboardItem]).then(() => {
                                                    swal({
                                                        icon: "success",
                                                        buttons: [null, "确认"],
                                                        title: "复制成功！",
                                                    })
                                                }, () => {
                                                    swal({
                                                        icon: "error",
                                                        buttons: [null, "确认"],
                                                        title: "复制出错！",
                                                    })
                                                })
                                            } catch (e) {
                                                swal({
                                                    icon: "error",
                                                    buttons: [null, "确认"],
                                                    title: "复制出错！",
                                                })
                                            }
                                        } else {
                                            swal({
                                                icon: "error",
                                                buttons: [null, "确认"],
                                                title: "复制出错！",
                                            })
                                        }
                                    }
                                })
                            } else if (v) {
                                canvas.toBlob(function (blob) {
                                    if (blob) {
                                        const urlOBj = (URL || webkitURL || window.URL || window.webkitURL || window)
                                        let url = urlOBj.createObjectURL(blob);
                                        var s = document.createElement("a");
                                        s.download = "下载.png";
                                        s.href = url;
                                        s.click();
                                        urlOBj.revokeObjectURL(url);
                                    }
                                })
                            }
                        })
                    } else if (r === 1) {
                        b.select("文件", ["保存", "打开"], function (r) {
                            if (r === 0) {
                                const blob = new Blob([JSON.stringify(w())])
                                const urlOBj = (URL || webkitURL || window.URL || window.webkitURL || window)
                                let url = urlOBj.createObjectURL(blob);
                                var s = document.createElement("a");
                                s.download = "新作品.xhwdeh5";
                                s.href = url;
                                s.click();
                                urlOBj.revokeObjectURL(url);
                            } else if (r === 1) {
                                var s = document.createElement("input");
                                s.type = "file";
                                s.accept = ".xhwdeh5";
                                s.onchange = function () {
                                    var file = s.files[0];
                                    var fileread = new FileReader();
                                    fileread.onload = () => {
                                        var v = fileread.result;
                                        try {
                                            if (v) {
                                                var u = t(JSON.parse(v));
                                                if (!u) {
                                                    swal({
                                                        icon: "error",
                                                        buttons: [null, "确认"],
                                                        title: "打开失败！",
                                                    })
                                                }
                                            } else {
                                                swal({
                                                    icon: "error",
                                                    buttons: [null, "确认"],
                                                    title: "打开失败！",
                                                })
                                            }
                                        } catch (e) {
                                            swal({
                                                icon: "error",
                                                buttons: [null, "确认"],
                                                title: "打开失败！",
                                            })
                                        }
                                    };
                                    fileread.readAsText(file, "UTF-8");
                                };
                                s.click()
                            }
                        });
                    } else {
                        swal({
                            icon: "info",
                            buttons: false,
                            title: "关于",
                            text: `《流浪地球2》倒计时制作 ${version}
                            
                            Copyright (c) 2023 xiaohong2022
                            
                            特别鸣谢：
                            @CodeKpy 提供仓库名
                            https://www.bilibili.com/read/cv21439547（提供字体）
                            https://sweetalert.js.org/（提供弹窗）
                            https://html2canvas.hertzen.com/（提供图片转换）`
                        })
                    }
                }
            })
        }
    }();
    !function () {
        var a = document.body;
        a.oncontextmenu = function ({ target }) {
            if (target) {
                if ("textarea input img".split(" ").includes(target.localName)) {
                    return true;
                }
            }
            return false;
        }
    }();
}();