import { forwardRef } from 'react'
import DrunkEffect from './DrunkEffect'

export default forwardRef((props: any, ref) => {
  const effect = new DrunkEffect(props)

  return <primitive ref={ ref } object={ effect } />
})
