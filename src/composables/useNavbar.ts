import { ref, onMounted, onUnmounted } from 'vue'

export function useNavbar() {
  const isScrolled = ref(false)
  const isMenuOpen = ref(false)
  const scrollY = ref(0)

  const handleScroll = () => {
    scrollY.value = window.scrollY
    isScrolled.value = window.scrollY > 60
  }

  const toggleMenu = () => {
    isMenuOpen.value = !isMenuOpen.value
    document.body.style.overflow = isMenuOpen.value ? 'hidden' : ''
  }

  const closeMenu = () => {
    isMenuOpen.value = false
    document.body.style.overflow = ''
  }

  onMounted(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
  })

  onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
    document.body.style.overflow = ''
  })

  return { isScrolled, isMenuOpen, scrollY, toggleMenu, closeMenu }
}
