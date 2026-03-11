import mammoth from 'mammoth'
import * as XLSX from 'xlsx'

export class FileExtractor {
  static async extractText(file) {
    const extension = file.name.split('.').pop().toLowerCase()

    switch (extension) {
      case 'txt':
        return await this.extractTxt(file)
      case 'docx':
        return await this.extractDocx(file)
      case 'xlsx':
      case 'xls':
        return await this.extractExcel(file)
      case 'csv':
        return await this.extractCsv(file)
      case 'pdf':
        return await this.extractPdf(file)
      default:
        throw new Error(`Formato de arquivo não suportado: ${extension}`)
    }
  }

  static extractTxt(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = (e) => resolve(e.target.result)
      reader.onerror = () => reject(new Error('Erro ao ler arquivo TXT'))
      reader.readAsText(file)
    })
  }

  static extractDocx(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = async (e) => {
        try {
          const result = await mammoth.extractRawText({
            arrayBuffer: e.target.result,
          })
          resolve(result.value)
        } catch (error) {
          reject(new Error('Erro ao processar arquivo DOCX'))
        }
      }
      reader.onerror = () => reject(new Error('Erro ao ler arquivo DOCX'))
      reader.readAsArrayBuffer(file)
    })
  }

  static extractExcel(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = (e) => {
        try {
          const workbook = XLSX.read(e.target.result, { type: 'binary' })
          let text = ''

          workbook.SheetNames.forEach((sheetName) => {
            const worksheet = workbook.Sheets[sheetName]
            text += `## ${sheetName}\n\n`
            const csv = XLSX.utils.sheet_to_csv(worksheet)
            text += csv + '\n\n'
          })

          resolve(text)
        } catch (error) {
          reject(new Error('Erro ao processar arquivo Excel'))
        }
      }
      reader.onerror = () => reject(new Error('Erro ao ler arquivo Excel'))
      reader.readAsBinaryString(file)
    })
  }

  static extractCsv(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = (e) => {
        try {
          const csv = e.target.result
          const workbook = XLSX.read(csv, { type: 'string' })
          const worksheet = workbook.Sheets[workbook.SheetNames[0]]
          let text = XLSX.utils.sheet_to_csv(worksheet)
          resolve(text)
        } catch (error) {
          reject(new Error('Erro ao processar arquivo CSV'))
        }
      }
      reader.onerror = () => reject(new Error('Erro ao ler arquivo CSV'))
      reader.readAsText(file)
    })
  }

  static async extractPdf(file) {
    // Para PDF, usando uma solução alternativa com pdfjs-dist
    try {
      // Se você quiser adicionar suporte a PDF completo, pode usar pdfjs-dist
      // Por enquanto, vamos informar que PDF requer upload manual ou processamento específico
      throw new Error(
        'PDF requer processamento especial. Por favor, use TXT, DOCX, XLSX ou CSV.'
      )
    } catch (error) {
      throw error
    }
  }
}
