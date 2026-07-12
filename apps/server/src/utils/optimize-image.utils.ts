import sharp from 'sharp'

const MAX_WIDTH = 1600 // limite de largura, mantendo proporção
const WEBP_QUALITY = 82 // 80-85 é o ponto ideal de qualidade x tamanho

export async function optimizeImage(file: File): Promise<Buffer> {
  const buffer = Buffer.from(await file.arrayBuffer())

  return sharp(buffer)
    .rotate() // corrige orientação EXIF (fotos de celular vêm rotacionadas)
    .resize({
      width: MAX_WIDTH,
      withoutEnlargement: true, // não aumenta imagens menores que o limite
    })
    .webp({ quality: WEBP_QUALITY })
    .toBuffer()
}
