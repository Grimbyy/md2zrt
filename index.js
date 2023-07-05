
/**
 * @typedef {object} rich_text
 * @property {number} start_position The start position of the rich text in the message string. 
 * @property {number} end_position The end position of the rich text.
 * @property {("Bold"|"Italic"|"Strikethrough"|"BulletedList"|"NumberedList"|"Underline"|"FontSize"|"FontColor"|"BackgroundColor"|"LeftIndent"|"Paragraph"|"Quote"|"AddLink")} format_type
 * @property {string} format_attr
 */

/**
 * @typedef {object} FinderInfo
 * @property {("Bold"|"Italic"|"Strikethrough"|"BulletedList"|"NumberedList"|"Underline"|"FontSize"|"FontColor"|"BackgroundColor"|"LeftIndent"|"Paragraph"|"Quote"|"AddLink")} format_type
 * @property {string} format_attr
 * @property {RegExp} regex Regex for finding whole element
 * @property {RegExp} _replace Regex for replacing elements characteristic
 * @property {string} [text] Calculated text replacement for whole element
 * @property {function} [buildRTObj] Function used to do further regex on a whole element
 */

/** @type {Array<FinderInfo>} */
const FINDERS = Object.freeze([
    {
        format_type: 'Paragraph',
        format_attr: 'h1',
        regex: /(^#{1})[^#]+?(?=$)/gm,
        _replace: /(^#{1} )/g
    },
    {
        format_type: 'Paragraph',
        format_attr: 'h2',
        regex: /(^#{2})[^#]+?(?=$)/gm,
        _replace: /(^#{2} )/g
    },
    {
        format_type: 'Paragraph',
        format_attr: 'h3',
        regex: /(^#{3})[^#]+?(?=$)/gm,
        _replace: /(^#{3} )/g
    },
    {
        format_type: 'Bold',
        format_attr: '',
        regex: /(?<= |^)([\*_]{2})[^_*\n]+?\1/gm,
        _replace: /[*_]/g
    },
    {
        format_type: 'Italic',
        format_attr: '',
        regex: /(?<= |^)([\*_]{1})[^_*\n]+?\1/gm,
        _replace: /[*_]/g
    },
    {
        format_type: 'AddLink',
        format_attr: '',
        regex: /\[.*?]\((https:\/\/|http:\/\/).*?\)/gm,
        get buildRTObj() {
            return (result) => ({
                text: result.match(/(?<=\[).*?(?=])/g)[0],
                format_attr: result.match(/(?<=\().*?(?=\))/g)[0]
            })
        }
    },
    {
        format_type: 'BackgroundColor',
        format_attr: 'FFFFFF',
        regex: /(?<=^\t|^)(>{1} )[\s\S]+?$/gm,
        _replace: /(?<=^\t|^)(>{1} )/gm
    }
]);

/**
 * Convert Text with markdown to Zoom API Compatable Rich Text
 * @param {string} txt Markdown filled document
 * @returns {[string, Array<rich_text>]}
 */
function MD2RT(txt) {
    const documents = [];
    FINDERS.forEach((finder) => {
        let arr;
        while ((arr = finder.regex.exec(txt)) !== null) {
            const richObj = {
                format_type: finder.format_type,
                format_attr: finder.format_attr,
                ...(finder.buildRTObj || (() => ({})))(arr[0]),
                excerpt: arr[0],
                get corrected() {
                    return this.text || this.excerpt.replace(finder._replace, '')
                },
                start_position: arr.index
            }

            documents.push(richObj);
        }
    });

    let totalShift = 0;
    /** @type {Array<rich_text>} */
    const richObjects = [];
    documents.sort((d1, d2) => txt.indexOf(d1.excerpt) - txt.indexOf(d2.excerpt)).forEach((richObj) => {
        const shift = richObj.corrected.length - richObj.excerpt.length;

        richObj.start_position += totalShift;
        richObj.end_position = richObj.start_position + richObj.corrected.length-1

        txt = txt.replace(richObj.excerpt, richObj.corrected);

        totalShift += shift;

        richObjects.push({
            format_type: richObj.format_type,
            format_attr: richObj.format_attr,
            start_position: richObj.start_position,
            end_position: richObj.end_position
        });
    });

    return [txt, richObjects];
}

module.exports = MD2RT