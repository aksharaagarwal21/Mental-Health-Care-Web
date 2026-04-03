import { useState, useCallback } from 'react'

const CRISIS_PATTERNS = [
  /\b(suicid|kill myself|end my life|want to die|no point living|can't go on|harm myself|self.harm)\b/i,
  /\b(nobody cares|nobody will miss me|better off dead|can't take this anymore)\b/i,
  /\b(overdose|jump off|hang myself|slit my)\b/i,
]

export function useCrisisDetection() {
  const [crisisDetected, setCrisisDetected] = useState(false)

  const setCrisisText = useCallback((text) => {
    const detected = CRISIS_PATTERNS.some(pattern => pattern.test(text))
    if (detected) setCrisisDetected(true)
    return detected
  }, [])

  const reset = useCallback(() => setCrisisDetected(false), [])

  return { crisisDetected, setCrisisText, reset }
}
