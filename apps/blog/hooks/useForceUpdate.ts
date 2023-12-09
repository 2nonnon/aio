import { useCallback, useState } from 'react'

export default function useForceUpdate() {
  const [, setState] = useState(false)

  const forceUpdate = useCallback(
    () => {
      setState(prev => !prev)
    },
    [setState],
  )

  return forceUpdate
}
