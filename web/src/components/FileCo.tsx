"use client";
import { useEffect, useRef, useState } from 'react';
import { ChakraProvider } from '@chakra-ui/react'
import { Input, InputGroup } from '@chakra-ui/react'

import Image from "next/image";
import Head from "next/head";
import styles from "@/styles/file.module.scss";

const FileCo = ({ states: {
    defDocuments, setDefDocuments,
    documents, setDocuments,
    allDocs,
    documentInd, setDocumentInd,

    addDoc
}}) => {

    const [inputValue, setInputValue] = useState('');
    const handleSend = () => {
        if (inputValue.trim() !== '') {
            addDoc(inputValue.slice(0, 15));
            setDocumentInd(allDocs.length);
            setInputValue('');
          }
    };
    const handleChange = (e) => {
        if (e.key == "Enter") {
          handleSend();
          return;
        }
        setInputValue(e.target.value);
    };

    return (
        <ChakraProvider>
        <div className={styles.fileMain}>
            <div className={styles.box}>
                <p className={styles.boxTitle}>
                    DEFAULT
                </p>
                {defDocuments.map((obj, ind) => (
                    <div className={styles.buttonItem}>
                    <button className={
                        styles.item + ' ' + ((ind == documentInd) ? styles.selected : '')
                    }
                        onClick={() => setDocumentInd(ind)}>
                        <p key={ind}>{obj}</p>
                    </button>
                    </div>
                ))}
            </div>
            <div className={styles.border}></div>
            <div className={styles.box}>
                <p className={styles.boxTitle}>
                    CUSTOM
                </p>
                {documents.map((obj, ind) => (
                    <div className={styles.buttonItem}>
                    <button className={
                        styles.item + ' ' + ((ind+defDocuments.length == documentInd) ? styles.selected : '')
                    }
                        onClick={() => setDocumentInd(ind+defDocuments.length)}>
                        <p key={ind}>{obj}</p>
                    </button>
                    </div>
                ))}

                <div className={styles.inputDiv}>
                <InputGroup>
                    <Input fontSize='15px' placeholder='New document' borderRadius='5px'
                    value={inputValue} onChange={handleChange} onSubmit={handleSend} 
                    onKeyDown={(e) => {if (e.key === 'Enter') handleSend();}}
                    sx={{
                        fontFamily: 'Gill Sans, Gill Sans MT, Calibri, Trebuchet MS, sans-serif',
                        textAlign: 'center'
                    }}/>
                </InputGroup>
                </div>
            </div>
        </div>
        </ChakraProvider>
    );
};
export default FileCo;