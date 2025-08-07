// place files you want to import through the `$lib` alias in this folder.

export function copyRec(node) {
    if (typeof (node) === "object") {
        let cpy = {}
        for (var i in node) {
            if (i === "enabledPlugin") {
                continue
            }
            cpy[i] = copyRec(node[i])
        }
        return cpy
    }
    else if (typeof (node) === "function") {
        return {}
    }
    else {
        return node
    }
}

export function reshape(img: ImageData) {
    let width = img.width
    let height = img.height
    let data = Object.values(img.data)

    let out = []

    for (let y = 0; y < height; y++) {
        let line = []
        for (let x = 0; x < width; x++) {
            let pixel = []
            for (let c = 0; c < 4; c++) {
                pixel.push(data[y * width + x * 4 + c])
            }
            line.push(pixel)
        }
        out.push(line)
    }

    return out
}

export function add_webgl(canvas) {
    let gl = canvas.getContext("webgl");

    let wgl = {};

    if (gl != null) {
        var glext = gl.getSupportedExtensions();

        for (let j in glext) {
            var ext = gl.getExtension(glext[j]);
            console.log(ext);
            if (ext != null) {
                wgl[glext[j]] = {};
                for (var i in ext) {
                    try {
                        wgl[glext[j]][i] = gl.getParameter(ext[i]);
                    } catch (e) { }
                }
            }
        }
    }

    return wgl;
}