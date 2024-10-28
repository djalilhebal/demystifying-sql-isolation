import type { MDXComponents } from 'mdx/types'
import { MDXCode } from './app/components/RunnableCodeBlock'
 
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    code: MDXCode,
  }
}
