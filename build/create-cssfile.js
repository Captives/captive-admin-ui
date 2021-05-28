const fs = require('fs');
const path = require('path');
const basepath = path.resolve(__dirname, './../packages/');

var Components = require('./../components.json');

const superTheme = "theme-chalk";

function copyDirectory(src, dest) {
    if (fs.existsSync(dest) == false) {
        fs.mkdirSync(dest);
    }

    if (fs.existsSync(src) == false) {
        return false;
    }

    console.log("src:" + src + ", dest:" + dest);
    // 拷贝新的内容进去
    var dirs = fs.readdirSync(src);
    dirs.forEach(function(item) {
        var item_path = path.join(src, item);
        var temp = fs.statSync(item_path);
        if (temp.isFile()) { // 是文件
            // console.log("Item Is File:" + item);
            fs.copyFileSync(item_path, path.join(dest, item));
        } else if (temp.isDirectory()) { // 是目录
            // console.log("Item Is Directory:" + item);
            copyDirectory(item_path, path.join(dest, item));
        }
    });
}

function delFile(path, reservePath) {
    if (fs.existsSync(path)) {
        if (fs.statSync(path).isDirectory()) {
            let files = fs.readdirSync(path);
            files.forEach((file, index) => {
                let currentPath = path + "/" + file;
                if (fs.statSync(currentPath).isDirectory()) {
                    delFile(currentPath, reservePath);
                } else {
                    fs.unlinkSync(currentPath);
                }
            });
            if (path != reservePath) {
                fs.rmdirSync(path);
            }
        } else {
            fs.unlinkSync(path);
        }
    }
}

const themes = ['theme'];
Components = Object.keys(Components);

function fileExists(filePath) {
    try {
        return fs.statSync(filePath).isFile();
    } catch (err) {
        return false;
    }
}

//根据组件列表，生成对应的scss的index.scss 列表页面
themes.forEach((theme) => {
    //拷贝主题模板
    copyDirectory(path.join(basepath, superTheme + "/src"), path.join(basepath, theme + "/super"));

    var isSCSS = theme !== 'theme-default';
    var indexContent = isSCSS ? '@import "./src/base.scss";\n' : '@import "./src/base.css";\n';
    Components.forEach(function(key) {
        if (['icon', 'option', 'option-group'].indexOf(key) > -1) return;
        var fileName = key + (isSCSS ? '.scss' : '.css');
        indexContent += '@import "./src/' + fileName + '";\n';
        var filePath = path.resolve(basepath, theme, 'src', fileName);
        if (!fileExists(filePath)) {
            fs.writeFileSync(filePath, '', 'utf8');
            console.log(theme, ' 创建遗漏的 ', fileName, ' 文件');
        }
    });

    console.log(indexContent);
    fs.writeFileSync(path.resolve(basepath, theme, "src", isSCSS ? 'index.scss' : 'index.css'), indexContent);
});

const process = require("child_process");
process.exec("gulp build --gulpfile packages/theme/gulpfile.js", (error, stdout, stderr) => {
    if (error) {
        console.log("error:" + error);
    } else {
        console.log("stdout:" + stdout);
    }

    if (stderr) {
        console.log("stderr:" + stderr);
    }

    themes.forEach((theme) => {
        copyDirectory(path.join(basepath, theme + "/css"), path.join(__dirname, './../lib/css'));
        delFile(path.join(basepath, theme + "/super"));
        delFile(path.join(basepath, theme + "/css"));
    });
});