<script setup lang="ts">
type Variant = 'default' | 'elevated' | 'bordered'
type Padding = 'sm' | 'md' | 'lg'

interface Props {
  variant?: Variant
  hoverable?: boolean
  padding?: Padding
}

withDefaults(defineProps<Props>(), {
  variant: 'default',
  hoverable: true,
  padding: 'md',
})
</script>

<template>
  <div
    :class="[
      'base-card',
      `base-card--${variant}`,
      `base-card--padding-${padding}`,
      { 'base-card--hoverable': hoverable },
    ]"
  >
    <slot />
  </div>
</template>

<style scoped>
.base-card {
  background-color: var(--color-surface);
  border-radius: var(--radius-md);
  border: 1px solid transparent;
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1),
    box-shadow 0.4s cubic-bezier(0.16, 1, 0.3, 1),
    border-color 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

/* Padding variants */
.base-card--padding-sm {
  padding: 1rem;
}

.base-card--padding-md {
  padding: 1.5rem;
}

.base-card--padding-lg {
  padding: 2.5rem;
}

/* Variant: default */
.base-card--default {
  box-shadow: none;
}

/* Variant: elevated */
.base-card--elevated {
  box-shadow: 0 8px 40px rgba(0, 0, 0, 0.4);
}

/* Variant: bordered */
.base-card--bordered {
  border-color: rgba(26, 224, 90, 0.15);
}

/* Hoverable effect */
.base-card--hoverable:hover {
  transform: translateY(-4px);
  box-shadow: 0 0 30px rgba(26, 224, 90, 0.15), 0 12px 40px rgba(0, 0, 0, 0.3);
  border-color: rgba(26, 224, 90, 0.25);
}

/* Elevated + hoverable */
.base-card--elevated.base-card--hoverable:hover {
  box-shadow: 0 0 30px rgba(26, 224, 90, 0.15), 0 16px 56px rgba(0, 0, 0, 0.5);
}
</style>
