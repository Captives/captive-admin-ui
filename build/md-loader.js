const Config = require('markdown-it-chain');
const anchorPlugin = require('markdown-it-anchor');
const slugify = require('transliteration').slugify;
const containers = require('./md-container');
const overWriteFenceRule = require('./md-fence');
const compiler = require('vue-template-compiler');
const { compileTemplate } = require('@vue/component-compiler-utils');
const path = require('path');

const config = new Config();
config.options.html(true).end()
    .plugin('anchor')
    .use(anchorPlugin, [{
        level: 2,
        slugify: slugify, //对锚链接id，中文转英文
        permalink: true,
        permalinkBefore: true
    }]).end()
    .plugin('containers')
    .use(containers).end();


const md = config.toMd();
overWriteFenceRule(md);


function stripScript(content) {
    const result = content.match(/<(script)>([\s\S]+)<\/\1>/);
    return result && result[2] ? result[2].trim() : '';
}

function stripStyle(content) {
    const result = content.match(/<(style)\s*>([\s\S]+)<\/\1>/);
    return result && result[2] ? result[2].trim() : '';
}

// 编写例子时不一定有 template。所以采取的方案是剔除其他的内容
function stripTemplate(content) {
    content = content.trim();
    if (!content) {
        return content;
    }
    return content.replace(/<(script|style)[\s\S]+<\/\1>/g, '').trim();
}

function genInlineComponentText(template, script) {
    // https://github.com/vuejs/vue-loader/blob/423b8341ab368c2117931e909e2da9af74503635/lib/loaders/templateLoader.js#L46
    const finalOptions = {
        source: `<div>${template}</div>`,
        filename: 'inline-component', // TODO：这里有待调整
        compiler
    };
    const compiled = compileTemplate(finalOptions);
    // tips
    if (compiled.tips && compiled.tips.length) {
        compiled.tips.forEach(tip => {
            console.warn(tip);
        });
    }
    // errors
    if (compiled.errors && compiled.errors.length) {
        console.error(
            `\n  Error compiling template:\n${pad(compiled.source)}\n` +
            compiled.errors.map(e => `  - ${e}`).join('\n') +
            '\n'
        );
    }
    let demoComponentContent = `
      ${compiled.code}
    `;
    // todo: 这里采用了硬编码有待改进
    script = script.trim();
    if (script) {
        script = script.replace(/export\s+default/, 'const democomponentExport =');
    } else {
        script = 'const democomponentExport = {}';
    }
    demoComponentContent = `(function() {
      ${demoComponentContent}
      ${script}
      return {
        render,
        staticRenderFns,
        ...democomponentExport
      }
    })()`;
    return demoComponentContent;
}

module.exports = function(source) {
    // console.log('md-loader', source);

    const content = md.render(source);

    const startTag = '<!--element-demo:';
    const startTagLen = startTag.length;
    const endTag = ':element-demo-->';
    const endTagLen = endTag.length;

    let componenetsString = '';
    let id = 0; // demo 的 id
    let output = []; // 输出的内容
    let start = 0; // 字符串开始位置

    let commentStart = content.indexOf(startTag);
    let commentEnd = content.indexOf(endTag, commentStart + startTagLen);
    while (commentStart !== -1 && commentEnd !== -1) {
        output.push(content.slice(start, commentStart));

        const commentContent = content.slice(commentStart + startTagLen, commentEnd);
        const html = stripTemplate(commentContent);
        const script = stripScript(commentContent);
        //生成内联组件文本
        let demoComponentContent = genInlineComponentText(html, script);
        const demoComponentName = `element-demo${id}`;
        output.push(`<template slot="source"><${demoComponentName} /></template>`);
        componenetsString += `${JSON.stringify(demoComponentName)}: ${demoComponentContent},`;

        // 重新计算下一次的位置
        id++;
        start = commentEnd + endTagLen;
        commentStart = content.indexOf(startTag, start);
        commentEnd = content.indexOf(endTag, commentStart + startTagLen);
    }

    // 仅允许在 demo 不存在时，才可以在 Markdown 中写 script 标签
    // todo: 优化这段逻辑
    let pageScript = '';
    if (componenetsString) {
        pageScript = `<script>
      export default {
        name: 'component-doc',
        components: {
          ${componenetsString}
        }
      }
    </script>`;
    } else if (content.indexOf('<script>') === 0) { // 硬编码，有待改善
        start = content.indexOf('</script>') + '</script>'.length;
        pageScript = content.slice(0, start);
    }

    output.push(content.slice(start));
    return `
    <template>
      <section class="content element-doc">
        ${output.join('')}
      </section>
    </template>
    ${pageScript}
  `;
}