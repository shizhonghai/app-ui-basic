module.exports = {
    // 一行最多多少个字符
    printWidth: 175,
    // 指定每个缩进级别的空格数
    tabWidth: 4,
    // 使用空格而不是制表符缩进行
    useTabs: false,
    // 在语句末尾打印分号
    semi: true,
    // 使用单引号而不是双引号
    singleQuote: true,
    // 更改引用对象属性的时间 可选值"<as-needed|consistent|preserve>"
    quoteProps: 'as-needed',
    // 在JSX中使用单引号而不是双引号
    jsxSingleQuote: false,
    // 多行时尽可能打印尾随逗号。（例如，单行数组永远不会出现逗号结尾。） 可选值"<none|es5|all>"，默认none
    trailingComma: 'es5',
    // 在对象文字中的括号之间打印空格
    bracketSpacing: true,
    // 不使用prettier格式化的文件填写在项目的.prettierignore文件中
    ignorePath: '.prettierignore',
    // jsx 标签的反尖括号需要换行
    jsxBracketSameLine: false,
    // (x) => {} 箭头函数参数只有一个时是否要有小括号。 always：(x) => x \ avoid：x => x
    arrowParens: 'avoid',
    // 这两个选项可用于格式化以给定字符偏移量（分别包括和不包括）开始和结束的代码
    rangeStart: 0,
    rangeEnd: Infinity,
    // 指定要使用的解析器，不需要写文件开头的 @prettier
    requirePragma: false,
    // 不需要自动在已被preitter格式化的文件顶部加上标注 @prettier
    insertPragma: false,
    // 使用默认的折行标准 always\never\preserve
    proseWrap: 'preserve',
    // 指定HTML文件的全局空格敏感度 css\strict\ignore
    htmlWhitespaceSensitivity: 'css',
    // Vue文件脚本和样式标签缩进
    vueIndentScriptAndStyle: false,
    // 换行符使用 lf 结尾是 可选值"<auto|lf|crlf|cr>"
    endOfLine: 'lf',
    // 不让prettier使用stylelint的代码格式进行校验
    stylelintIntegration: false,
    // 不让prettier使用eslint的代码格式进行校验
    // eslintIntegration: false,
};
