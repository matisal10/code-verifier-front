import React, { Fragment, useState } from "react";

import Editor from "react-simple-code-editor";
import Highlight, { Language, defaultProps } from "prism-react-renderer";
import theme from "prism-react-renderer/themes/nightOwl";


const codeSnippet =
    `
import axios from "axios";

const getUser = () =>{
    return axios.get("http://randomuser.me/api")
    
}
`

const styles: any = {
    root: {
        boxSizing: 'border-box',
        fontFamily: '"Fira code", "Fira Mono", monospace',
        color: 'white',
        ...theme.plain
    }
}


const language: Language[] = [
    'tsx',
    'jsx',
    'javascript',
    'typescript'
]

const HighlightElement = (code: string) => (
    <Highlight {...defaultProps} theme={theme} code={code} language={language[0]}>
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
            <Fragment>
                {tokens.map((line, i) => (
                    <div {...getLineProps({ line, key: i })}>
                        {line.map((token, key) => <span {...getTokenProps({ token, key })} />)}
                    </div>
                ))}
            </Fragment>
        )}
    </Highlight>


)


export const NewEditor = () => {
    const [code, setCode] = useState(codeSnippet)
    const [laguageSelected, setLaguageSelected] = useState(language[0])

    const handleChange = (newCode: string) => {
        setCode(newCode)
    }
    const handleLanguageChange = (newLang: any) => {
        setLaguageSelected(newLang)
    }

    return (
        <div>
            <select>
                {
                    language.map((language, index) => (
                        <option onChange={(value) => handleLanguageChange(value)} value={language} key={index}>{language}</option>
                    ))
                }

            </select>
            <Editor
                value={code}
                onValueChange={handleChange}
                highlight={HighlightElement}
                padding={10}
                style={styles.root}
            />
        </div>

    )
}