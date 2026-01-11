#!/usr/bin/env node

// Simple counting script
// Usage: node scripts/counter.js [max_number]

const maxCount = parseInt(process.argv[2]) || 10

console.log('Starting count...')
for (let i = 1; i <= maxCount; i++) {
  console.log(`Count: ${i}`)
}
console.log('Counting complete!')
