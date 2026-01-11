#!/usr/bin/env node

// Base-60 Counting Script - Right Hand (Base 12) × Left Hand (Base 5)
// Ancient Babylonian/Sumerian counting system
// Usage: node scripts/counter.js [max_number] [interval_ms]

const maxCount = parseInt(process.argv[2]) || 59
const intervalMs = parseInt(process.argv[3]) || 500

let currentCount = 0
let rightHand = 0  // Base 12 (0-11) - counts phalanges
let leftHand = 0   // Base 5 (0-4) - counts fingers

console.log('🤚 Base-60 Synchronized Hand Counting System')
console.log('Right Hand: Base 12 (phalanges) × Left Hand: Base 5 (fingers)')
console.log(`Counting to ${maxCount} with ${intervalMs}ms interval\n`)

const counter = setInterval(() => {
  // Display current state
  const rightDisplay = '█'.repeat(rightHand) + '░'.repeat(11 - rightHand)
  const leftDisplay = '█'.repeat(leftHand) + '░'.repeat(4 - leftHand)

  console.log(`L:[${leftDisplay}] R:[${rightDisplay}] | L:${leftHand} R:${rightHand.toString().padStart(2)} = ${currentCount}`)

  if (currentCount >= maxCount) {
    clearInterval(counter)
    console.log('\n✓ Counting complete!')
    return
  }

  // Increment
  currentCount++
  rightHand++

  // When right hand completes a cycle (12 phalanges), increment left hand
  if (rightHand >= 12) {
    rightHand = 0
    leftHand++

    // When left hand completes (5 fingers), reset both
    if (leftHand >= 5) {
      leftHand = 0
    }
  }
}, intervalMs)
