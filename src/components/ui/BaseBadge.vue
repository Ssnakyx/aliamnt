<script setup lang="ts">
type Size = 'sm' | 'md'
type Variant = 'solid' | 'outline' | 'subtle'

interface Props {
  color?: string
  size?: Size
  variant?: Variant
}

const props = withDefaults(defineProps<Props>(), {
  color: '#1AE05A',
  size: 'sm',
  variant: 'subtle',
})

function hexToRgb(hex: string): string {
  const clean = hex.replace('#', '')
  const r = parseInt(clean.substring(0, 2), 16)
  const g = parseInt(clean.substring(2, 4), 16)
  const b = parseInt(clean.substring(4, 6), 16)
  if (isNaN(r) || isNaN(g) || isNaN(b)) return '26, 224, 90'
  return `${r}, ${g}, ${b}`
}

function isCssVar(value: string): boolean {
  return value.startsWith('var(')
}

function getBackgroundColor(): string {
  if (props.variant === 'solid') {
    return props.color
  }
  if (props.variant === 'subtle') {
    if (isCssVar(props.color)) return `color-mix(in srgb, ${props.color} 15%, transparent)`
    return `rgba(${hexToRgb(props.color)}, 0.15)`
  }
  return 'transparent'
}

function getBorderColor(): string {
  if (props.variant === 'subtle') {
    if (isCssVar(props.color)) return `color-mix(in srgb, ${props.color} 30%, transparent)`
    return `rgba(${hexToRgb(props.color)}, 0.3)`
  }
  return props.color
}

function getTextColor(): string {
  if (props.variant === 'solid') return '#000000'
  return props.color
}
</script>

<template>
  <span
    :class="['base-badge', `base-badge--${size}`]"
    :style="{
      backgroundColor: getBackgroundColor(),
      borderColor: getBorderColor(),
      color: getTextColor(),
    }"
  >
    <slot />
  </span>
</template>

<style scoped>
.base-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-mono);
  font-weight: 500;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  border-radius: var(--radius-full);
  border: 1px solid transparent;
  white-space: nowrap;
  line-height: 1;
}

.base-badge--sm {
  padding: 0.25rem 0.625rem;
  font-size: 0.6875rem;
}

.base-badge--md {
  padding: 0.375rem 0.875rem;
  font-size: 0.8125rem;
}
</style>
