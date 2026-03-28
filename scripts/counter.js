#!/usr/bin/env node

// Base-60 Counting Script - Right Hand (Base 12) × Left Hand (Base 5)
// Ancient Babylonian/Sumerian counting system
// Integrated with Declaration of Independence word sequence
// Usage: node scripts/counter.js [max_number] [interval_ms]

const declaration = require('./declaration-of-independence.js')

const maxCount = parseInt(process.argv[2]) || 59
const intervalMs = parseInt(process.argv[3]) || 500

let currentCount = 0
let rightHand = 0     // Base 12 (0-11) - counts phalanges
let leftHand = 0      // Base 5 (0-4) - counts fingers
let prevStructure = null

console.log('═══════════════════════════════════════════════════════════════')
console.log('🤚 BASE-60 SYNCHRONIZED HAND COUNTING SYSTEM')
console.log('   WITH DECLARATION OF INDEPENDENCE + ROOT LAW ANALYSIS')
console.log('═══════════════════════════════════════════════════════════════')
console.log('Right Hand: Base 12 (phalanges) × Left Hand: Base 5 (fingers)')
console.log(`ROOT SEAL: ${declaration.rootSeal} | Total Words: ${declaration.totalWords}`)
console.log(`Counting to ${maxCount} with ${intervalMs}ms interval`)
console.log('Chronologically sequentially ordered - No alteration - No transformation')
console.log('═══════════════════════════════════════════════════════════════\n')

const counter = setInterval(() => {
  const rightDisplay = '█'.repeat(rightHand) + '░'.repeat(11 - rightHand)
  const leftDisplay = '█'.repeat(leftHand) + '░'.repeat(4 - leftHand)

  const wordNumber = currentCount + 1
  const word = declaration.words[currentCount] || '[END]'
  const struct = declaration.getStructure(wordNumber)

  // Announce structural transitions
  const isNew = !prevStructure || prevStructure.type !== struct.type || prevStructure.id !== struct.id
  if (isNew) {
    if (struct.type === 'CAUSE') {
      console.log(`\n  ┌─ [${struct.id}] CAUSE: ${struct.label}`)
    } else if (struct.type === 'GRIEVANCE') {
      console.log(`\n  ┌─ [${struct.id}] GRIEVANCE: ${struct.label}`)
      console.log(`  └─→ grounded in [${struct.cause}]: ${struct.causeLabel}`)
    } else if (!prevStructure || prevStructure.type !== struct.type) {
      console.log(`\n  ▬ ${struct.label}`)
    }
    prevStructure = struct
  }

  const tag = struct.type === 'CAUSE' ? `[${struct.id}]` :
              struct.type === 'GRIEVANCE' ? `[${struct.id}→${struct.cause}]` : ''

  console.log(`L:[${leftDisplay}] R:[${rightDisplay}] | L:${leftHand} R:${rightHand.toString().padStart(2)} =${currentCount.toString().padStart(5)} | #${wordNumber.toString().padStart(4)}: ${word.padEnd(20)} ${tag}`)

  if (currentCount >= maxCount) {
    clearInterval(counter)
    console.log('\n═══════════════════════════════════════════════════════════════')
    console.log('✓ COUNTING COMPLETE')
    if (currentCount >= declaration.rootSeal - 1) {
      console.log(`🔒 ROOT SEAL REACHED: ${declaration.rootSeal} words`)
    }
    console.log('═══════════════════════════════════════════════════════════════')
    return
  }

  currentCount++
  rightHand++
  if (rightHand >= 12) {
    rightHand = 0
    leftHand++
    if (leftHand >= 5) leftHand = 0
  }
}, intervalMs)
