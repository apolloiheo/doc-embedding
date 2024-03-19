"use client";
import { useEffect, useRef, useState } from 'react';
import FileCo from "@/components/FileCo";
import styles from "@/styles/main.module.scss";

export default function Page() {
    const [defDocuments, setDefDocuments] = useState<string[]>([]);
    const [documents, setDocuments] = useState<string[]>([]);
    const [documentInd, setDocumentInd] = useState(0);
    const [allDocs, setAllDocs] = useState<string[]>([]);

    useEffect(() => setDefDocuments(["Test", "Test 2"]), []);

    useEffect(() => {
      setAllDocs([...defDocuments, ...documents]);
    }, [defDocuments, documents]);

    const states = {
      defDocuments, setDefDocuments,
      documents, setDocuments,
      allDocs,
      documentInd, setDocumentInd
    }

    return (
        <div className={styles.container}>
        {/* Header with breadcrumbs */}
        <header className={styles.header}>
          <span>Document Embed</span>
          {allDocs.length ? <><span>/</span><span>{allDocs[documentInd]}</span></> : null}
        </header>
        <main className={styles.main}>
            {/* Table section */}
            <section className={styles.fileSection}>
                <FileCo states={states}/>
            </section>
            {/* Chat section */}
            <aside className={styles.docSection}>
                hi
            </aside>
        </main>
        </div>        
    );
}