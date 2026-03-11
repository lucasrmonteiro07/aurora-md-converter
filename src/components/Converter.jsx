import { FileExtractor } from '../services/FileExtractor'
import { GroqService } from '../services/GroqService'

class Converter {
  static async convert(file) {
    if (!file) {
      throw new Error('Nenhum arquivo selecionado')
    }

    // Validar tamanho do arquivo (máximo 10MB)
    const maxSize = 10 * 1024 * 1024
    if (file.size > maxSize) {
      throw new Error('Arquivo muito grande. Máximo 10MB permitido.')
    }

    // Extrair texto do arquivo
    const extractedText = await FileExtractor.extractText(file)

    if (!extractedText || extractedText.trim().length === 0) {
      throw new Error('Arquivo vazio ou não foi possível extrair o texto')
    }

    // Truncar texto se muito grande (GROQ tem limite de tokens)
    const maxChars = 15000
    let textToConvert = extractedText

    if (extractedText.length > maxChars) {
      textToConvert = extractedText.substring(0, maxChars)
      console.warn(
        `Arquivo truncado de ${extractedText.length} para ${maxChars} caracteres`
      )
    }

    // Converter para Markdown usando GROQ
    const markdown = await GroqService.convertToMarkdown(textToConvert)

    return markdown
  }
}

export default Converter
