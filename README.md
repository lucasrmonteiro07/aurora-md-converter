# Aurora MD Converter

Transforme seus documentos (TXT, DOCX, XLSX, CSV) em Markdown profissional com IA usando a API GROQ.

## 🚀 Funcionalidades

- ✨ Suporte para múltiplos formatos: TXT, DOCX, XLSX, XLS, CSV
- 🤖 Conversão inteligente com IA (GROQ API)
- 💅 Interface moderna com branding Aurora Business Intelligence
- 📥 Drag & drop para upload de arquivos
- 📥 Preview em tempo real do Markdown
- ⬇️ Download direto em .md
- 📋 Copiar para clipboard
- 📱 Responsivo para desktop e mobile

## 📋 Pré-requisitos

- Node.js 16+
- npm ou yarn
- Chave API GROQ (gratuita em https://console.groq.com/keys)

## 🔧 Instalação

1. Clone ou abra o projeto:
```bash
cd aurora-md-converter
```

2. Instale as dependências:
```bash
npm install
```

3. Configure a chave API GROQ:
```bash
# Copie o arquivo .env.example para .env
cp .env.example .env

# Adicione sua chave GROQ API
VITE_GROQ_API_KEY=sua_chave_aqui
```

## 🎯 Uso Local

```bash
# Desenvolvimento com HMR
npm run dev

# Build para produção
npm run build

# Preview do build
npm run preview
```

## 🌐 Deploy na Vercel

1. Push do projeto para GitHub:
```bash
git init
git add .
git commit -m "Initial commit: Aurora MD Converter"
git remote add origin https://github.com/seu-usuario/aurora-md-converter.git
git push -u origin main
```

2. Na Vercel:
   - Conecte seu repositório GitHub
   - Configure a variável de ambiente: `VITE_GROQ_API_KEY`
   - Deploy automático ativado

## 🎨 Tecnologias

- React 19
- Vite
- GROQ SDK
- Mammoth (DOCX)
- XLSX (Excel/CSV)
- CSS3 com gradientes e animações

## 📐 Estrutura do Projeto

```
src/
├── components/
│   ├── FileUpload.jsx      # Upload e seleção de arquivos
│   └── Converter.jsx       # Orquestração da conversão
├── services/
│   ├── FileExtractor.js    # Extração de texto dos arquivos
│   └── GroqService.js      # Integração com API GROQ
├── App.jsx                 # Componente principal
├── App.css                 # Estilos com branding Aurora
└── main.jsx                # Entrada da aplicação
```

## 🔑 Variáveis de Ambiente

```
VITE_GROQ_API_KEY=your_groq_api_key_here
```

## 📝 Formatos Suportados

- **TXT** - Arquivo de texto simples
- **DOCX** - Microsoft Word
- **XLSX** - Microsoft Excel
- **XLS** - Excel (versão antiga)
- **CSV** - Comma-separated values

## ⚠️ Limitações

- Tamanho máximo de arquivo: 10MB
- Texto máximo para conversão: 15.000 caracteres
- PDF: não suportado no momento

## 🎨 Branding Aurora

Cores principais:
- Purple: #7c3aed
- Magenta: #d946ef
- Blue: #3b82f6
- Cyan: #06b6d4
- Green: #10b981

## 📄 Licença

Aurora Business Intelligence © 2024
