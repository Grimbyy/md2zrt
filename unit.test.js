describe("Format Markdown", () => {

    const md2zt = require('./index');
    
    const examples = [
        {
            name: 'Title',
            markdown: `# Hello World`,
            expected: [
                `Hello World`,
                [
                    {
                        format_type: 'Paragraph',
                        format_attr: 'h1',
                        start_position: 0,
                        end_position: 10
                    }
                ]
            ]
        },
        {
            name: 'Many Titles',
            markdown: `# Hello World\n## HELLO THERE\n### Can you see me?`,
            expected: [
                `Hello World\nHELLO THERE\nCan you see me?`,
                [
                    {
                        format_type: 'Paragraph',
                        format_attr: 'h1',
                        start_position: 0,
                        end_position: 10
                    },
                    {
                        format_type: 'Paragraph',
                        format_attr: 'h2',
                        start_position: 12,
                        end_position: 22
                    },
                    {
                        format_type: 'Paragraph',
                        format_attr: 'h3',
                        start_position: 24,
                        end_position: 38
                    }
                ]
            ]
        },
        {
            name: 'Bold and Italic',
            markdown: `** Hello World ** *HELLO THERE* __Three's a crowd__ _two's compliment_`,
            expected: [
                ` Hello World  HELLO THERE Three's a crowd two's compliment`,
                [
                    {
                        format_type: 'Bold',
                        format_attr: '',
                        start_position: 0,
                        end_position: 12
                    },
                    {
                        format_type: 'Italic',
                        format_attr: '',
                        start_position: 14,
                        end_position: 24
                    },
                    {
                        format_type: 'Bold',
                        format_attr: '',
                        start_position: 26,
                        end_position: 40
                    },
                    {
                        format_type: 'Italic',
                        format_attr: '',
                        start_position: 42,
                        end_position: 57
                    }
                ]
            ]
        }
    ];
    examples.forEach((example) => {
        test(example.name, (done) => {
            expect(md2zt(example.markdown)).toEqual(example.expected);
            done();
        })
    })
})