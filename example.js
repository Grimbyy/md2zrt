const md2rt = require('./index');

const examples = [
    `# Hello World`,
    `## Hello World`,
    `### Hello world`,
    `# Hello
# my
# world!`,
    `# Hello
## to the
### world!`,
`[this is a link](https://example.com)
# Hello`
]

examples.forEach((example, i) => {
    const [txt, richText] = md2rt(example);
    console.log('Markdown:', txt);
    console.log('Rich Text:', richText);
})