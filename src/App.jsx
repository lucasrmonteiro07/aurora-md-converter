import { useState } from 'react'
import './App.css'
import FileUpload from './components/FileUpload'
import Converter from './components/Converter'

function App() {
  const [file, setFile] = useState(null)
  const [isConverting, setIsConverting] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)
  const [copied, setCopied] = useState(false)

  const handleFileSelect = (selectedFile) => {
    setFile(selectedFile)
    setResult(null)
    setError(null)
  }

  const handleConvert = async (selectedFile) => {
    setIsConverting(true)
    setError(null)
    try {
      const markdown = await Converter.convert(selectedFile)
      setResult(markdown)
    } catch (err) {
      setError(err.message)
    } finally {
      setIsConverting(false)
    }
  }

  const handleDownload = () => {
    if (!result) return
    const element = document.createElement('a')
    const blob = new Blob([result], { type: 'text/markdown' })
    element.href = URL.createObjectURL(blob)
    element.download = 'converted-document.md'
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(result)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="app-wrapper">
      <div className="bg-aurora" aria-hidden="true">
        <div className="aurora-orb orb-1" />
        <div className="aurora-orb orb-2" />
        <div className="aurora-orb orb-3" />
      </div>

      <header className="header">
        <div className="header-inner">
          <div className="brand">
            <img
              src="/LOGO_2026_3.png"
              alt="Aurora Business Intelligence"
              className="brand-logo"
            />
            <div className="brand-text">
              <span className="brand-name">MD Converter</span>
              <span className="brand-tag">Powered by GROQ AI</span>
            </div>
          </div>
          <p className="header-subtitle">
            Transforme documentos em Markdown com inteligência artificial
          </p>
        </div>
      </header>

      <main className="main-content">
        {!result ? (
          <div className="card converter-card">
            <div className="card-header">
              <div className="card-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round"
                    d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                </svg>
              </div>
              <div>
                <h2 className="card-title">Converter Documento</h2>
                <p className="card-desc">Selecione ou arraste seu arquivo para começar</p>
              </div>
            </div>

            <div className="card-body">
              <FileUpload
                onFileSelect={handleFileSelect}
                onConvert={handleConvert}
                file={file}
                isLoading={isConverting}
              />

              {error && (
                <div className="alert alert-error">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="alert-icon">
                    <path strokeLinecap="round" strokeLinejoin="round"
                      d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                  </svg>
                  <span>{error}</span>
                </div>
              )}
            </div>

            <div className="formats-strip">
              {['TXT', 'DOCX', 'XLSX', 'XLS', 'CSV', 'PDF'].map((fmt) => (
                <span key={fmt} className="fmt-chip">{fmt}</span>
              ))}
            </div>
          </div>
        ) : (
          <div className="card result-card">
            <div className="card-header">
              <div className="card-icon success">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round"
                    d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h2 className="card-title">Conversão Concluída!</h2>
                <p className="card-desc">Seu documento foi convertido para Markdown com sucesso</p>
              </div>
              <button
                className="btn-ghost"
                onClick={() => { setResult(null); setFile(null) }}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                </svg>
                Novo Arquivo
              </button>
            </div>

            <div className="card-body">
              <div className="preview-wrapper">
                <div className="preview-toolbar">
                  <span className="preview-label">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="preview-label-icon">
                      <path strokeLinecap="round" strokeLinejoin="round"
                        d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
                    </svg>
                    markdown
                  </span>
                  <span className="preview-chars">{result.length} caracteres</span>
                </div>
                <textarea
                  readOnly
                  value={result}
                  className="markdown-preview"
                />
              </div>
            </div>

            <div className="result-actions">
              <button className="btn btn-primary" onClick={handleDownload}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round"
                    d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                </svg>
                Download .md
              </button>
              <button className={`btn btn-secondary ${copied ? 'copied' : ''}`} onClick={handleCopy}>
                {copied ? (
                  <>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                    Copiado!
                  </>
                ) : (
                  <>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round"
                        d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75" />
                    </svg>
                    Copiar Markdown
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </main>

      <footer className="footer">
        <img src="/LOGO_2026_3.png" alt="Aurora" className="footer-logo" />
        <span>Aurora Business Intelligence © {new Date().getFullYear()}</span>
        <span className="footer-sep">·</span>
        <span>Powered by GROQ AI</span>
      </footer>
    </div>
  )
}

export default App
