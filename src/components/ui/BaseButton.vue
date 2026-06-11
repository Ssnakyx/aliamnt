<script setup lang="ts">
type Variant = 'primary' | 'secondary' | 'ghost' | 'outline'
type Size = 'sm' | 'md' | 'lg'
type As = 'button' | 'a'

interface Props {
  variant?: Variant
  size?: Size
  as?: As
  href?: string
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  as: 'button',
  disabled: false,
})
</script>

<template>
  <component
    :is="as"
    :href="as === 'a' ? href : undefined"
    :disabled="as === 'button' ? disabled : undefined"
    :aria-disabled="disabled ? true : undefined"
    :class="['base-btn', `base-btn--${variant}`, `base-btn--${size}`, { 'base-btn--disabled': disabled }]"
  >
    <span v-if="$slots.icon" class="base-btn__icon">
      <slot name="icon" />
    </span>
    <slot />
  </component>
</template>

<style scoped>
.base-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-family: var(--font-dm);
  font-weight: 600;
  border-radius: var(--radius-full);
  border: 1px solid transparent;
  text-decoration: none;
  white-space: nowrap;
  cursor: pointer;
  transition:
    background-color var(--duration-base) var(--ease-expo),
    color var(--duration-base) var(--ease-expo),
    border-color var(--duration-base) var(--ease-expo),
    box-shadow var(--duration-base) var(--ease-expo),
    transform 0.3s ease;
  user-select: none;
  outline: none;
  position: relative;
  overflow: hidden;
}

/* Sizes */
.base-btn--sm {
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  line-height: 1.25rem;
}

.base-btn--md {
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  line-height: 1.5rem;
}

.base-btn--lg {
  padding: 1rem 2rem;
  font-size: 1.125rem;
  line-height: 1.75rem;
}

/* Variant: primary */
.base-btn--primary {
  background-color: var(--color-green);
  color: #ffffff;
  border-color: var(--color-green);
}

.base-btn--primary:hover:not(.base-btn--disabled) {
  background-color: #6aaeff;
  border-color: #6aaeff;
  box-shadow: var(--shadow-green-md);
  transform: scale(1.02);
}

/* Variant: secondary */
.base-btn--secondary {
  background-color: transparent;
  color: var(--color-green);
  border-color: var(--color-green);
}

.base-btn--secondary:hover:not(.base-btn--disabled) {
  background-color: var(--color-green);
  color: #ffffff;
  transform: scale(1.02);
}

/* Variant: ghost */
.base-btn--ghost {
  background-color: transparent;
  color: var(--color-green);
  border-color: transparent;
}

.base-btn--ghost:hover:not(.base-btn--disabled) {
  background-color: rgba(65, 145, 255, 0.1);
  transform: scale(1.02);
}

/* Variant: outline */
.base-btn--outline {
  background-color: transparent;
  color: var(--color-white);
  border-color: var(--color-border);
}

.base-btn--outline:hover:not(.base-btn--disabled) {
  border-color: var(--color-green);
  transform: scale(1.02);
}

/* Disabled state */
.base-btn--disabled {
  opacity: 0.4;
  pointer-events: none;
}

/* Icon slot */
.base-btn__icon {
  display: inline-flex;
  align-items: center;
  flex-shrink: 0;
}
</style>
