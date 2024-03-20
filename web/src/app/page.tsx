"use client";
import { useEffect, useRef, useState } from 'react';
import FileCo from "@/components/FileCo";
import DocView from "@/components/DocView";
import styles from "@/styles/main.module.scss";

const exDocs = [
  "Story",
  "Code"
];

const exPhrases = ["", ""];
const exTexts = [
  "Random text",
  "Random text 2"
];
const exHighlights: number[][] = [[], [1]];

export default function Page() {
    const [defDocuments, setDefDocuments] = useState<string[]>([]);
    const [documents, setDocuments] = useState<string[]>([]);
    const [documentInd, setDocumentInd] = useState(-1);
    const [allDocs, setAllDocs] = useState<string[]>([]);

    const [phrases, setPhrases] = useState<string[]>([]);
    const [texts, setTexts] = useState<string[]>([]);
    const [highlights, setHighlights] = useState<number[][]>([]);

    const addDefDoc = (doc: string) => { 
      setAllDocs([...defDocuments, doc, ...documents]);
      setPhrases([...phrases.slice(0, defDocuments.length),
        "", ...phrases.slice(defDocuments.length, documents.length)]);
      setTexts([...texts.slice(0, defDocuments.length),
        "", ...texts.slice(defDocuments.length, documents.length)]);
      setHighlights([...highlights.slice(0, defDocuments.length),
        [], ...highlights.slice(defDocuments.length, documents.length)]);
      setDefDocuments([...defDocuments, doc]);
    };

    const addDoc = (doc: string) => {
      setAllDocs([...defDocuments, ...documents, doc]);
      setPhrases([...phrases, ""]);
      setTexts([...texts, ""]);
      setHighlights([...highlights, []]);
      setDocuments([...documents, doc]);
    };

    useEffect(() => {
      setDocuments(["New"]);

      setDefDocuments(exDocs);
      setAllDocs([...exDocs, "New"]);
      setPhrases([...exPhrases, ""]);
      setTexts([...exTexts, ""]);
      setHighlights([...exHighlights, []]);
      setDocumentInd(0);
    }, []);

    const states = {
      defDocuments, setDefDocuments,
      documents, setDocuments,
      allDocs,
      documentInd, setDocumentInd,

      phrases, setPhrases,
      texts, setTexts,
      highlights, setHighlights,

      addDefDoc, addDoc
    }

    return (
        <div className={styles.container}>
        {/* Header with breadcrumbs */}
        <header className={styles.header}>
          <span>Document Embed</span>
          {allDocs.length ? <><span>/</span><span>{allDocs[documentInd]}</span></> : null}
        </header>
        <main className={styles.main}>
            {/* File section */}
            <section className={styles.fileSection}>
                <FileCo states={states}/>
            </section>
            {/* Doc section */}
            <aside className={styles.docSection}>
                <DocView states={states}/>
            </aside>
        </main>
        </div>        
    );
}