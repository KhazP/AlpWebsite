import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function levenshteinDistance(a: string, b: string): number {
  if (a.length === 0) return b.length
  if (b.length === 0) return a.length

  const matrix = []

  // increment along the first column of each row
  for (let i = 0; i <= b.length; i++) {
    matrix[i] = [i]
  }

  // increment each column in the first row
  for (let j = 0; j <= a.length; j++) {
    matrix[0][j] = j
  }

  // Fill in the rest of the matrix
  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1]
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1, // substitution
          Math.min(
            matrix[i][j - 1] + 1, // insertion
            matrix[i - 1][j] + 1 // deletion
          )
        )
      }
    }
  }

  return matrix[b.length][a.length]
}

export function findBestMatch(input: string, keywords: string[]): string | null {
  const normalizedInput = input.toLowerCase()
  let bestMatch = null
  let lowestDistance = Infinity

  for (const keyword of keywords) {
    const normalizedKeyword = keyword.toLowerCase()

    // Direct inclusion check first (fast path)
    if (normalizedInput.includes(normalizedKeyword)) {
      return keyword
    }

    // Check words in input against keyword
    const inputWords = normalizedInput.split(/\s+/)
    for (const word of inputWords) {
      const distance = levenshteinDistance(word, normalizedKeyword)
      // Allow 1 error for short words (<=4 chars), 2 for longer
      const maxErrors = normalizedKeyword.length <= 4 ? 1 : 2

      if (distance <= maxErrors && distance < lowestDistance) {
        lowestDistance = distance
        bestMatch = keyword
      }
    }
  }

  return bestMatch
}
