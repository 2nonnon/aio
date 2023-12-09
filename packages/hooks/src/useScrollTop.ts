import { useEffect, useState } from 'react'
import throttle from '@non/utils/src/throttle'

export default function useScrollTop() {
  const [scrollTop, setScrollTop] = useState(0)

  useEffect(() => {
    function callback() {
      setScrollTop(document.documentElement.scrollTop)
    }

    const throttleCallback = throttle(callback)

    callback()

    window.addEventListener('scroll', throttleCallback)
    return () => {
      window.removeEventListener('scroll', throttleCallback)
    }
  }, [])

  return scrollTop
}
