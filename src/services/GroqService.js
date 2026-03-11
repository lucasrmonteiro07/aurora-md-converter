import Groq from 'groq-sdk'

export class GroqService {
  static client = null

  static initialize() {
    const apiKey = import.meta.env.VITE_GROQ_API_KEY
    if (!apiKey) {
      throw new Error(
        'VITE_GROQ_API_KEY não configurada. Adicione a chave no arquivo .env'
      )
    }
    this.client = new Groq({
      apiKey,
      dangerouslyAllowBrowser: true,
    })
  }

  static async convertToMarkdown(text) {
    if (!this.client) {
      this.initialize()
    }

    const systemPrompt = `Você é um especialista em formatação de documentos. Sua tarefa é converter o conteúdo fornecido em Markdown bem formatado.

Regras importantes:
1. Estruture o conteúdo com títulos apropriados (# para principais, ## para seções, ### para subseções)
2. Use listas com - para itens e indentação para subitens
3. Use **negrito** para termos importantes e *itálico* para ênfase
4. Formate código entre backticks triplos \`\`\`
5. Crie tabelas quando apropriado usando formato Markdown
6. Preserve toda a informação do documento original
7. Mantenha a hierarquia e estrutura lógica do conteúdo
8. Adicione espaçamento adequado entre seções para legibilidade
9. Use blockquotes > para citações ou destaque
10. Escreva o Markdown puro, sem explicações adicionais

Responda APENAS com o conteúdo em Markdown formatado, sem nenhum texto adicional.`

    const userPrompt = `Por favor, converta o seguinte conteúdo em Markdown bem formatado:\n\n${text}`

    const completion = await this.client.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      max_tokens: 4096,
      messages: [
        {
          role: 'system',
          content: systemPrompt,
        },
        {
          role: 'user',
          content: userPrompt,
        },
      ],
    })

    const content = completion.choices[0]?.message?.content
    if (!content) {
      throw new Error('Resposta inesperada da API')
    }

    return content
  }
}
