"use client";
import { useEffect, useRef, useState } from 'react';
import { ChakraProvider } from '@chakra-ui/react'
import { InputGroup, Input, Textarea } from '@chakra-ui/react';

import Image from "next/image";
import Head from "next/head";
import styles from "@/styles/doc.module.scss";

const RenderHighlights = ( value, highlights ) => {
    if (!value || value.trim() == '') return (
        `<span style="color: gray;"}>
            Start writing your story ...
        </span>`);
    console.log(highlights);

    let whites = 0;
    return value.split(/(\s+)/).map((word, index) => {
        if (/\s+/.test(word)) {
            whites++;

            return word.replace(/\n+/g, (match) => '<br/>'.repeat(
                Math.floor((match.length + 1) / 2)
            ));
        }

        return (highlights.includes(index-whites)) ? (
            `<span key=${index} style="background-color: yellow;"}>
                ${word}
            </span>`) : word;
    }).join("");
};

const DocView = ({ states: {
    defDocuments, setDefDocuments,
    documents, setDocuments,
    allDocs,
    documentInd, setDocumentInd,

    phrases, setPhrases,
    texts, setTexts,
    highlights, setHighlights,
}}) => {
    const [inputValue, setInputValue] = useState(phrases[documentInd]);
    const handleSend = () => {
        if (inputValue.trim() !== '') {
            //
            setInputValue('');
          }
    };
    const handleChange = (e) => {
        let phrasesCopy = [...phrases];
        phrasesCopy[documentInd] = e.target.value;
        setPhrases(phrasesCopy);

        if (e.key == "Enter") {
          handleSend();
          return;
        }
        setInputValue(e.target.value);
    };

    const [docValue, setDocValue] = useState(texts[documentInd]);
    const docChange = async (e) => {
        if (documentInd < defDocuments.length) return;
        let textsCopy = [...texts];
        textsCopy[documentInd] = e.target.innerText;
        setTexts(textsCopy);
        setDocValue(e.target.innerText);
    };
    const docSend = async () => {
        let request = await fetch('http://localhost:8000/highlight', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            document: docValue,
            query: hValue
          })
        });
        let request_data = await request.json();
        console.log('data', request_data);
        // setHValue(request_data.result);
    };

    const [hValue, setHValue] = useState<number[]>(highlights[documentInd]);

    useEffect(() => {
        if (docValue && hValue)
            docSend();
    }, [docValue, hValue]);

    useEffect(() => {
        let highlightsCopy = [...highlights];
        highlightsCopy[documentInd] = hValue;
        setHighlights(highlightsCopy);
    }, [hValue]);

    useEffect(() => {
        setInputValue(phrases[documentInd]);
        setDocValue(texts[documentInd]);
        setHValue(highlights[documentInd]);
    }, [documentInd]);

    const textareaRef = useRef(null);
    useEffect(() => {
        if (textareaRef.current) {
          textareaRef.current.style.height = 'auto'; // Reset height to recalculate
          textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
      }, [docValue]);

    useEffect(() => {
        if (docValue)
        console.log(docValue.split(/(\s+)/));
    }, [docValue]);

    return (
        <ChakraProvider>
        <div className={styles.docMain}>
            <div className={styles.box}>
                <div className={styles.inputDiv}>
                    <InputGroup>
                    <Input fontSize='15px' placeholder='Phrase to run similarity search ...'
                    borderRadius='5px'
                    value={inputValue} onChange={handleChange} onSubmit={handleSend} 
                    onKeyDown={(e) => {if (e.key === 'Enter') handleSend();}}
                    sx={{
                        fontFamily: 'Gill Sans, Gill Sans MT, Calibri, Trebuchet MS, sans-serif',
                        textAlign: 'center'
                    }}/>
                    </InputGroup>
                </div>
            </div>
            
            <div className={styles.box}>
                {!(documentInd < defDocuments.length) ? 
                    <div 
                        ref={textareaRef}
                        className={styles.myTextarea}
                        // resize='vertical'
                        // minHeight="73vh"
                        contentEditable
                        suppressContentEditableWarning={true}
                        onInput={docChange} />
                : null}
                <div className={styles.highlightFormat}
                    dangerouslySetInnerHTML={{__html: RenderHighlights(docValue, hValue)}}/>
            </div>
        </div>
        </ChakraProvider>
    );
};
export default DocView;