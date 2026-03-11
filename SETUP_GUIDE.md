# 📖 Guia de Setup - Aurora MD Converter

## 1️⃣ Configuração Local

### Pré-requisitos
- Node.js v16 ou superior
- npm ou yarn
- Uma chave API GROQ (gratuita)

### Passos

1. **Obtenha a chave GROQ API**
   - Acesse: https://console.groq.com/keys
   - Faça login com sua conta Google ou crie uma nova
   - Copie sua chave API

2. **Configure o arquivo .env**
   ```bash
   # Edite o arquivo .env na raiz do projeto
   VITE_GROQ_API_KEY=sua_chave_api_groq_aqui
   ```

3. **Instale as dependências**
   ```bash
   npm install
   ```

4. **Inicie o servidor de desenvolvimento**
   ```bash
   npm run dev
   ```
   A aplicação abrirá em `http://localhost:5173`

## 2️⃣ Como Usar a Aplicação

### Upload de Arquivos
1. Clique na área de upload ou arraste um arquivo
2. Formatos suportados:
   - **.txt** - Arquivo de texto puro
   - **.docx** - Documentos Word
   - **.xlsx / .xls** - Planilhas Excel
   - **.csv** - Arquivos de dados tabulares

### Conversão para Markdown
1. Selecione seu arquivo
2. Clique em "✨ Converter para Markdown"
3. Aguarde o processamento (pode levar alguns segundos)
4. Veja a prévia do Markdown gerado

### Download e Compartilhamento
- **⬇️ Download .md** - Salva o arquivo em seu computador
- **📋 Copiar** - Copia para a área de transferência

## 3️⃣ Deploy na Vercel

### Opção A: Git + GitHub

1. **Prepare o repositório**
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Aurora MD Converter"
   ```

2. **Crie um repositório no GitHub**
   - Visite: https://github.com/new
   - Crie um repositório público (ex: `aurora-md-converter`)
   - NÃO inicialize com README

3. **Push para o GitHub**
   ```bash
   git remote add origin https://github.com/seu-usuario/aurora-md-converter.git
   git branch -M main
   git push -u origin main
   ```

4. **Deploy na Vercel**
   - Acesse: https://vercel.com/import
   - Selecione "Import Project from GitHub"
   - Selecione seu repositório `aurora-md-converter`
   - Configure as variáveis de ambiente:
     - **Nome**: `VITE_GROQ_API_KEY`
     - **Valor**: Sua chave GROQ API
   - Clique em "Deploy"

### Opção B: Deploy Manual

1. **Build para produção**
   ```bash
   npm run build
   ```

2. **Upload na Vercel**
   - Acesse: https://vercel.com/dashboard
   - Clique em "Upload Project"
   - Selecione a pasta `dist/` gerada
   - Configure as variáveis de ambiente
   - Deploy concluído!

## 4️⃣ Variáveis de Ambiente

### Desenvolvimento
Arquivo: `.env` (criado localmente, não comitado)
```
VITE_GROQ_API_KEY=gsk_0Z1QNawP31J87Jyq3GpIWGdyb3FYthYK0y1chZt6zmi0e20vPq
```

### Produção (Vercel)
Configurar em: Vercel Dashboard → Project Settings → Environment Variables
```
VITE_GROQ_API_KEY=sua_chave_aqui
```

## 5️⃣ Troubleshooting

### Erro: "VITE_GROQ_API_KEY não configurada"
- ✅ Verifique se o arquivo `.env` existe
- ✅ Verifique se a variável está corretamente nomeada
- ✅ Reinicie o servidor (`npm run dev`)

### Erro: "Formato de arquivo não suportado"
- ✅ Verifique a extensão do arquivo
- ✅ Suportamos: TXT, DOCX, XLSX, XLS, CSV
- ✅ PDF requer upload manual (não suportado automaticamente)

### Erro: "Arquivo muito grande"
- ✅ Limite máximo: 10MB
- ✅ Reduza o tamanho do arquivo
- ✅ Para arquivos muito grandes, considere dividir em partes

### Markdown vazio ou incompleto
- ✅ Verifique se o arquivo tem conteúdo de texto
- ✅ Imagens em DOCX são ignoradas
- ✅ Verifique se a API GROQ está respondendo

### Problema com API GROQ
- ✅ Verifique sua chave API em: https://console.groq.com/keys
- ✅ Verifique se não atingiu limite de requisições
- ✅ Tente novamente em alguns minutos

## 6️⃣ Recursos Adicionais

- **Documentação GROQ**: https://console.groq.com/docs
- **Documentação Vite**: https://vite.dev
- **Documentação Vercel**: https://vercel.com/docs
- **Markdown Guide**: https://www.markdownguide.org

## 7️⃣ Suporte

Para problemas ou sugestões:
1. Verifique este guia novamente
2. Consulte os logs do navegador (F12)
3. Verifique a console do servidor de desenvolvimento

---

**Aurora Business Intelligence © 2024**
Criado com ❤️ para transformar documentos em Markdown perfeito.
